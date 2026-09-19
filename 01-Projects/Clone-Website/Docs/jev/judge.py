#!/usr/bin/env python3
"""Codon Labs judge. Deterministic scans, one Jev call, code owns the route.

Never prints the API key. The key lives in ~/.agents/.secrets/ and is read by the
shared `jev` CLI, not by this script.

Usage:
  python3 judge.py --state state.json
  python3 judge.py --state state.json --battery copy
  python3 judge.py --image shot.png --slot S2-4 --requirement "warm macro of fusion"
  python3 judge.py --rank variants.json
  python3 judge.py --state state.json --dry-run
"""
import argparse
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile

HERE = os.path.dirname(os.path.abspath(__file__))

EXIT = {"accept": 0, "retry": 10, "ask_human": 20}


def load(name, default=None):
    path = os.path.join(HERE, name)
    if not os.path.exists(path):
        if default is None:
            raise SystemExit(f"Error: missing {name}")
        return default
    with open(path, encoding="utf-8") as handle:
        return json.load(handle)


def jev_path():
    found = shutil.which("jev")
    if found:
        return found
    fallback = os.path.expanduser("~/.local/bin/jev")
    if os.path.exists(fallback):
        return fallback
    raise SystemExit("Error: jev CLI not found on PATH")


def ask_jev(payload, model=None):
    handle = tempfile.NamedTemporaryFile(
        "w", suffix=".json", delete=False, encoding="utf-8"
    )
    try:
        json.dump(payload, handle)
        handle.close()
        cmd = [jev_path(), "--file", handle.name]
        if model:
            cmd += ["--model", model]
        proc = subprocess.run(cmd, capture_output=True, text=True)
    finally:
        os.unlink(handle.name)
    if proc.returncode != 0:
        raise SystemExit(
            f"Error: jev failed ({proc.returncode}): {proc.stderr.strip()}"
        )
    try:
        return json.loads(proc.stdout)
    except json.JSONDecodeError:
        raise SystemExit("Error: jev returned non-JSON output")


def scan_text(text, tokens):
    low = text.lower()
    hits = []
    for token in tokens:
        pattern = r"(?<![a-z0-9])" + re.escape(token.lower()) + r"(?![a-z0-9])"
        if re.search(pattern, low):
            hits.append(token)
    return hits


def sentence_stats(text):
    parts = [p.strip() for p in re.split(r"(?<=[.!?])\s+", text.strip()) if p.strip()]
    counts = [len(p.split()) for p in parts if p.split()]
    if not counts:
        return {"sentences": 0, "avg_words": 0, "max_words": 0}
    return {
        "sentences": len(counts),
        "avg_words": round(sum(counts) / len(counts), 1),
        "max_words": max(counts),
    }


def scan_image(schema, policy, battery):
    if battery != "image":
        return []
    flags = []
    for key in policy.get("code_gates", {}).get("image", []):
        if schema.get(key) is True:
            flags.append(key)
    anatomy = schema.get("anatomy_issues")
    if isinstance(anatomy, str) and anatomy.strip().lower() not in ("", "none"):
        flags.append("anatomy_issues")
    return flags


def run_scans(state, banned, policy, battery):
    flags = []
    out = state.get("output") or ""
    if battery != "image":
        pieces = []
        if isinstance(out, str):
            pieces.append(out)
        claims = state.get("claims") or []
        if isinstance(claims, list):
            pieces += [c for c in claims if isinstance(c, str)]
        blob = "\n".join(pieces)

        if scan_text(blob, banned.get("tokens", [])):
            flags.append("banned_voice")
        if "\u2014" in out:
            flags.append("em_dash")
        if "!" in out:
            flags.append("exclaim")

        files = (state.get("evidence") or {}).get("diff_files") or []
        if files:
            if any("site.ts" in f for f in files) and not any(
                "copy-v1.md" in f for f in files
            ):
                flags.append("copy_in_code_only")

    schema = (state.get("evidence") or {}).get("image") or {}
    flags += scan_image(schema, policy, battery)

    return flags, sentence_stats(out if isinstance(out, str) else "")


def inject(state, register, world_facts):
    constraints = state.setdefault("constraints", {})
    constraints.setdefault("content", {})
    constraints.setdefault("process", {})
    if not constraints.get("register"):
        constraints["register"] = register
    evidence = state.setdefault("evidence", {})
    if not evidence.get("world_facts"):
        evidence["world_facts"] = world_facts
    return state


def build_questions(battery):
    hazard = load("questions.hazard.json")
    if battery == "hazard":
        return hazard
    if battery == "copy":
        return load("questions.copy.json")
    if battery == "image":
        merged = dict(hazard)
        merged.update(load("questions.image.json"))
        return merged
    merged = dict(hazard)
    merged.update(load("questions.copy.json"))
    return merged


def battery_cfg(policy, battery):
    batteries = policy.get("batteries", {})
    if battery == "copy":
        return batteries.get("copy", {})
    if battery == "image":
        return batteries.get("image", {})
    return batteries.get("copy", {})


def analyze(answers, questions, policy, cfg):
    banners, gates, scores, low_confidence = {}, {}, {}, []
    gate_ids = cfg.get("gate_ids", [])
    for qid, q in questions.items():
        answer = answers.get(qid)
        if not answer:
            continue
        if q.get("type") == "noul":
            value = answer.get("noul")
            if value is None:
                continue
            if qid in gate_ids:
                gates[qid] = value
            else:
                banners[qid] = value
        elif q.get("type") == "score":
            top = len(q.get("criteria", [])) - 1
            value = answer.get("score")
            if value is None or top <= 0:
                continue
            scores[qid] = {
                "score": value,
                "normalized": round(value / top, 3),
                "confidence": answer.get("confidence"),
            }
            floor = policy.get("dimension_confidence_floor")
            if floor is not None and answer.get("confidence", 1) < floor:
                low_confidence.append(qid)

    composite = None
    weights = cfg.get("weights", {})
    total = sum(weights.get(k, 0) for k in weights)
    if scores and total > 0:
        composite = round(
            sum(
                weights[k] * scores[k]["normalized"]
                for k in weights
                if k in scores
            )
            / total,
            3,
        )
    return banners, gates, scores, composite, low_confidence


def decide(flags, nouls, gates, composite, next_answer, policy, cfg):
    if flags:
        return "retry", [f"code:{f}" for f in flags]

    for qid in policy.get("retry_ids", []):
        value = nouls.get(qid)
        if value is not None and value >= policy["action_threshold"]:
            return "retry", [f"{qid}={value:.2f}"]

    for qid in cfg.get("gate_ids", []):
        value = gates.get(qid)
        if value is not None and value >= policy["gate_threshold"]:
            return "retry", [f"gate:{qid}={value:.2f}"]

    if composite is not None and composite < policy["composite_retry"]:
        return "retry", [f"composite={composite:.2f}"]

    reasons = []
    for qid in policy.get("retry_ids", []):
        value = nouls.get(qid)
        if value is not None and value >= policy["review_threshold"]:
            reasons.append(f"{qid}={value:.2f}")
    if reasons:
        return "ask_human", reasons

    value = nouls.get("answers_request")
    if value is not None and value < policy["answers_request_floor"]:
        return "ask_human", [f"answers_request={value:.2f}"]

    if composite is not None and composite < policy["composite_review"]:
        return "ask_human", [f"composite={composite:.2f}"]

    if next_answer and next_answer.get("confidence", 1) < policy["next_confidence_floor"]:
        return "ask_human", [f"next.confidence={next_answer['confidence']:.2f}"]

    return "accept", []


def judge_one(state, questions, policy, cfg, register, world_facts, model, dry_run, battery):
    state = inject(state, register, world_facts)
    flags, notes = run_scans(state, load("banned-voice.json"), policy, battery)

    payload = {"state": state, "questions": questions}
    if dry_run:
        return {
            "decision": "retry" if flags else "accept",
            "code_flags": flags,
            "code_notes": notes,
            "reasons": [f"code:{f}" for f in flags],
            "dry_run": True,
        }

    response = ask_jev(payload, model)
    answers = response.get("answers", {})
    nouls, gates, scores, composite, low_conf = analyze(answers, questions, policy, cfg)
    next_answer = answers.get("next")
    decision, reasons = decide(flags, nouls, gates, composite, next_answer, policy, cfg)

    return {
        "decision": decision,
        "code_flags": flags,
        "code_notes": notes,
        "nouls": {k: round(v, 3) for k, v in sorted(nouls.items())},
        "gates": {k: round(v, 3) for k, v in sorted(gates.items())},
        "scores": scores,
        "composite": composite,
        "low_confidence": low_conf,
        "next": next_answer
        and {"choice": next_answer.get("choice"), "confidence": next_answer.get("confidence")},
        "reasons": reasons,
        "usage": response.get("usage"),
    }


def transcribe(image, slot, requirement, model):
    cmd = [sys.executable, os.path.join(HERE, "vision.py"), image]
    if slot:
        cmd += ["--slot", slot]
    if requirement:
        cmd += ["--requirement", requirement]
    if model:
        cmd += ["--model", model]
    proc = subprocess.run(cmd, capture_output=True, text=True)
    if proc.returncode != 0:
        raise SystemExit(f"Error: vision failed: {proc.stderr.strip()[-400:]}")
    return json.loads(proc.stdout)


def main():
    parser = argparse.ArgumentParser(description="Codon Labs judge")
    parser.add_argument("--state", help="state envelope JSON")
    parser.add_argument("--rank", help="variants JSON for N-way ranking")
    parser.add_argument("--image", help="image path; transcribes, then judges")
    parser.add_argument("--slot", help="slot id for --image")
    parser.add_argument("--requirement", help="slot requirement text for --image")
    parser.add_argument("--copy", help="copy text to judge with --image")
    parser.add_argument("--battery", default=None, choices=["both", "hazard", "copy", "image"])
    parser.add_argument("--model", help="override the jev model")
    parser.add_argument("--dry-run", action="store_true", help="scan only, no call")
    args = parser.parse_args()

    if not args.state and not args.rank and not args.image:
        parser.error("give --state, --rank, or --image")

    battery = args.battery or ("image" if args.image else "both")
    questions = build_questions(battery)
    policy = load("policy.json")
    cfg = battery_cfg(policy, battery)
    register = load("register.json")
    world_facts = load("world-facts.json")

    if args.image:
        schema = transcribe(args.image, args.slot, args.requirement, args.model)
        request = f"Asset for slot {args.slot}." if args.slot else "Asset for this slot."
        if args.requirement:
            request += f" Requirement: {args.requirement}"
        state = {
            "request": request,
            "constraints": {"content": {}, "process": {}},
            "evidence": {"image": schema},
            "output": args.copy or schema.get("subject", ""),
        }
        report = judge_one(
            state, questions, policy, cfg, register, world_facts, args.model, args.dry_run, battery
        )
        report["image"] = schema
        print(json.dumps(report, indent=2))
        return EXIT.get(report["decision"], 1)

    if args.state:
        with open(args.state, encoding="utf-8") as handle:
            state = json.load(handle)
        report = judge_one(
            state, questions, policy, cfg, register, world_facts, args.model, args.dry_run, battery
        )
        print(json.dumps(report, indent=2))
        return EXIT.get(report["decision"], 1)

    with open(args.rank, encoding="utf-8") as handle:
        bundle = json.load(handle)

    base = bundle.get("state", {})
    results = []
    for variant in bundle.get("variants", []):
        state = json.loads(json.dumps(base))
        state["output"] = variant.get("text", "")
        if variant.get("request"):
            state["request"] = variant["request"]
        report = judge_one(
            state, questions, policy, cfg, register, world_facts, args.model, args.dry_run, battery
        )
        results.append(
            {
                "id": variant.get("id"),
                "composite": report.get("composite"),
                "decision": report.get("decision"),
                "gates": report.get("gates"),
                "reasons": report.get("reasons"),
            }
        )

    results.sort(key=lambda r: (r["composite"] is None, -(r["composite"] or 0)))
    for rank, row in enumerate(results, 1):
        row["rank"] = rank
    print(json.dumps({"ranking": results}, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
