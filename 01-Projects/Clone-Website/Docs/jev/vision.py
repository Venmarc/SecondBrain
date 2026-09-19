#!/usr/bin/env python3
"""Transcribe an image to the Codon vision schema. No judgment.

Backends:
  agy    Antigravity CLI  (preferred when signed in)
  proxy  vision-for-opencode/vision_proxy.py  (fallback)

Usage:
  python3 vision.py /path/to/image.png
  python3 vision.py /path/to/image.png --backend proxy
  python3 vision.py /path/to/image.png --out schema.json
"""
import argparse
import json
import os
import re
import shutil
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
PROXY = os.path.expanduser("~/vision-for-opencode/vision_proxy.py")

SCHEMA_FIELDS = {
    "subject": "string, one line",
    "scene": "string, one line",
    "composition": "string, who is present and apparent ages",
    "art_style": "string",
    "faces_adults": "integer",
    "faces_children": "integer",
    "faces_infants": "integer",
    "identical_adults": "boolean",
    "recognizable_real_person": "boolean",
    "text_present": "boolean",
    "watermark_present": "boolean",
    "extra_fingers": "boolean",
    "anatomy_issues": "string, describe or 'none'",
    "palette_hex": "array of up to 5 hex strings",
    "dominant_light": "warm | neutral | cold | mixed",
    "cold_tones_outside_instruments": "boolean",
    "neon_or_scifi_glow": "boolean",
    "stock_photography_feel": "boolean",
    "aspect_ratio": "string, width:height",
    "subject_alone": "boolean",
    "pair_family_resemblance": "yes | no | na",
    "baby_face_visible": "boolean",
}


def build_prompt(path, slot, requirement):
    fields = "\n".join(f'  "{k}": {v}' for k, v in SCHEMA_FIELDS.items())
    lines = [
        f"Read the image file at {path}.",
        "Report only what is visible. Do not judge quality or suitability.",
        "Output ONLY one valid JSON object. No prose. No markdown fences.",
        "Use exactly these keys:",
        "{",
        fields,
        "}",
    ]
    if slot:
        lines.append(f"Context: this image is a candidate for slot {slot}.")
    if requirement:
        lines.append(f"Slot requirement: {requirement}")
    return "\n".join(lines)


def extract_json(text):
    start = text.find("{")
    while start != -1:
        depth = 0
        in_str = False
        escape = False
        for i in range(start, len(text)):
            ch = text[i]
            if in_str:
                if escape:
                    escape = False
                elif ch == "\\":
                    escape = True
                elif ch == '"':
                    in_str = False
                continue
            if ch == '"':
                in_str = True
            elif ch == "{":
                depth += 1
            elif ch == "}":
                depth -= 1
                if depth == 0:
                    try:
                        return json.loads(text[start : i + 1])
                    except json.JSONDecodeError:
                        break
        start = text.find("{", start + 1)
    raise ValueError("no JSON object found in vision output")


def run_proxy(path, prompt, timeout):
    proc = subprocess.run(
        ["python3", PROXY, path, prompt], capture_output=True, text=True, timeout=timeout
    )
    if proc.returncode != 0:
        raise RuntimeError(f"vision_proxy failed ({proc.returncode}): {proc.stderr[-400:]}")
    return proc.stdout


def run_agy(path, prompt, timeout, model=None):
    exe = shutil.which("agy") or os.path.expanduser("~/.local/bin/agy")
    cmd = [exe, "--print", prompt]
    if model:
        cmd += ["--model", model]
    proc = subprocess.run(cmd, capture_output=True, text=True, timeout=timeout)
    if proc.returncode != 0:
        raise RuntimeError(f"agy failed ({proc.returncode}): {proc.stderr[-400:]}")
    return proc.stdout


def main():
    parser = argparse.ArgumentParser(description="Image to Codon vision schema")
    parser.add_argument("image")
    parser.add_argument("--backend", default="auto", choices=["proxy", "agy", "auto"])
    parser.add_argument("--slot")
    parser.add_argument("--requirement")
    parser.add_argument("--model")
    parser.add_argument("--agy-model", default="gemini-3.8-flash-low")
    parser.add_argument("--timeout", type=int, default=240)
    parser.add_argument("--out")
    args = parser.parse_args()

    path = os.path.abspath(args.image)
    if not os.path.exists(path):
        raise SystemExit(f"Error: image not found: {path}")

    if args.backend == "auto":
        order = ["agy", "proxy", "proxy"]
    elif args.backend == "agy":
        order = ["agy", "agy"]
    else:
        order = ["proxy", "proxy"]

    prompt = build_prompt(path, args.slot, args.requirement)
    payload = None
    last_error = None
    for attempt, backend in enumerate(order, 1):
        try:
            if backend == "agy":
                raw = run_agy(path, prompt, args.timeout, args.agy_model)
            else:
                raw = run_proxy(path, prompt, args.timeout)
            payload = extract_json(raw)
            break
        except (RuntimeError, ValueError, subprocess.TimeoutExpired) as exc:
            last_error = exc
            sys.stderr.write(f"vision attempt {attempt} ({backend}) failed: {exc}\n")
    if payload is None:
        raise SystemExit(f"Error: vision produced no JSON: {last_error}")

    payload["_backend"] = backend
    payload["_image"] = os.path.basename(path)

    text = json.dumps(payload, indent=2)
    if args.out:
        with open(args.out, "w", encoding="utf-8") as handle:
            handle.write(text + "\n")
    print(text)
    return 0


if __name__ == "__main__":
    sys.exit(main())
