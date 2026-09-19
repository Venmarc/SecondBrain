---
title: Codon Labs — Jev quality battery v1
date: 2026-09-17
tags: [project, clone-website, jev, typesafe, design, copy]
---

> One-line: a sibling to the after-judge. Where the after-judge checks hazards (Noul, non-compensating), this checks quality (Score, compensating) on copy, then on imagery.

**Status:** draft spec. No unit tests (Victor, 2026-09-17: "No tests. Build to work. We hook it, then run.").

**Sibling:** `Docs/jev/2026-09-17-jev-after-judge-design.md` (hazard battery). Same engine, `judge.py`.

**Caller:** shared `jev` CLI. Key stays in `~/.agents/.secrets/`.

---

## 1. Two batteries, one engine

| | Hazard battery | Quality battery (this doc) |
|---|---|---|
| Question type | Noul | Score |
| Behaviour | Non-compensating. One yes rejects. | Compensating. High offsets low, by weight. |
| Runs on | Text (copy, canon, claims) | Text now, image schema later |
| Question file | `questions.hazard.json` | `questions.copy.json` and later `questions.image.json` |
| First shipped | yes | yes (copy) |

`judge.py --battery both` merges every question into one Jev call. Questions run in parallel. Extra questions cost a few tokens and almost no time.

## 2. Where the standard comes from

No global rubric exists and none is planned. A rubric does not generalize. The engine generalizes; the register does not.

Codon Labs already wrote its standard:

| Source | Feeds |
|---|---|
| `Docs/copy-v1.md` §0 Voice Spec (14 rules) | `questions.copy.json`, `banned-voice.json` |
| `Docs/copy-v1.md` §1 World Facts | `world-facts.json` |
| `Docs/image-requirements-v1.md` R1–R7, §1 | `questions.image.json` (later) |
| `Docs/slotmap-motion-v1.md` Three Laws + Agy gate | `questions.image.json` (later) |
| `03-Resources/Design/Web-Garnish/07-Build-Runbook.md` | image rubric, motion rules (later) |

External authorities are optional, and only where a rule is silent. A reference site (White Desert) enters as a level `examples` anchor, never as the criterion. The instruction holds the property, so a result better than the reference still scores high.

## 3. Copy dimensions (compensating)

Each Score is one dimension, 0 to 3. Concrete levels, no degrees.

`voice_register` · `desire_strength` · `awareness_fit` · `hook_strength` · `cta_strength` · `specificity` · `emotional_steadiness` · `sentence_discipline`

Weights live in `policy.json`. Starting values weight desire and hook highest, because that is what the 8-CTA run showed separates winners.

## 4. Copy gates (non-compensating)

`promises_sameness` · `collective_benefit` · `hype_register`

A gate at or above `gate_threshold` forces `retry`, regardless of composite.

## 5. Deterministic layer (code, not Jev)

Runs before the call. A fired flag is a retry even if Jev is calm.

| Flag | Rule |
|---|---|
| `banned_voice` | `output` or `claims` contains a token from `banned-voice.json` (word boundary, case-insensitive). |
| `em_dash` | `output` contains `—` (Voice Spec rule 3). |
| `exclaim` | `output` contains `!` and the change is visitor copy. |
| `copy_in_code_only` | `evidence.diff_files` includes `src/content/site.ts` and does not include `copy-v1.md`. Skipped when `diff_files` is empty. |

Notes (reported, not a retry): sentence count, average words, longest sentence.

## 6. Routing

First match wins:

1. Any `code_flags` → `retry`
2. Any hazard `retry_ids` noul ≥ `action_threshold` → `retry`
3. Any copy gate ≥ `gate_threshold` → `retry`
4. Composite (normalized, weight-summed) < `composite_retry` → `retry`
5. Any hazard `retry_ids` noul ≥ `review_threshold` → `ask_human`
6. `answers_request` < `answers_request_floor` → `ask_human`
7. Composite < `composite_review` → `ask_human`
8. `next.confidence` < `next_confidence_floor` → `ask_human`
9. Else → `accept`

Thresholds are starting numbers. Tune them on Victor's labels.

## 6.1 Envelope amendment (from the first live runs)

Process rules and content rules in one `constraints` bag made `breaks_constraint` fire on good copy. The envelope now splits them:

- `constraints.content` — rules the artifact must obey (fiction seal, voice, product). `breaks_constraint` reads this.
- `constraints.process` — where and how the work is done (copy source, open items). `unverifiable_done` reads `constraints.process.open`.

`judge.py` defaults both to `{}` when missing. `constraints.register` is unchanged. Applied to the after-judge spec §5 on 2026-09-17.

Observed: `breaks_constraint` on the same good fixture read 0.41 and below 0.35 across runs, straddling `review_threshold` (0.35). Borderline copy flickered between `accept` and `ask_human`. Decision (2026-09-17): `breaks_constraint` moved out of `retry_ids` into `banner_ids`. It is reported and no longer gates. Hard violations stay in `retry_ids`.

## 7. Ranking N variants

`judge.py --rank variants.json`. Each variant gets its own Jev call and its own composite. Output is sorted high to low. This is the 8-CTA pattern. It is the primary use: generate N, judge all, keep the top.

## 8. Vision lane (Phase 2, built)

Status: built. `vision.py` transcribes an image to a schema, then the same engine judges it.

- **Backends:** `agy` (Antigravity CLI) primary, `vision-for-opencode/vision_proxy.py` fallback. `--backend auto|agy|proxy`. Default is `auto`: agy first, then the proxy.
- **agy facts:** use `--print` with `--model gemini-3.8-flash-low` and no other flags. `--sandbox` and `--output-format json` block the image read in headless mode. A heavier model idles on a background task until the 5-minute print timeout. About 2.5 minutes per image.
- **Why the proxy is the fallback:** `agy` is an agent with file tools. A hostile image can carry text that steers it. The proxy sends image bytes to a vision API and has no filesystem tools.
- **Rule:** the vision step is a transcription to a schema, not a critique. The schema *is* the rubric. See `vision-schema.md`.
- **Code first:** image code gates read schema booleans: text, watermark, extra fingers, identical adults, real person, neon glow, stock feel, cold tones outside instruments, and `anatomy_issues != none`.
- **Jev leaves:** `questions.image.json` — scores `register_match`, `slot_fit`, `evidence`, `restraint`; gates `grown_continuation_look`, `decorative_only`.

```bash
python3 judge.py --image shot.png --slot S2-4 --requirement "warm macro of fusion"
```

A criterion that cannot survive conversion to a schema field stays out of the Jev lane.

## 8.1 Per-battery weights and gates

`policy.json` keys weights and gate ids by battery:

- `batteries.copy` — 8 copy dimensions, 3 copy gates.
- `batteries.image` — 4 image scores, 2 image gates.
- `code_gates.image` — schema booleans that force a retry before any Jev call.

`judge.py --battery copy|image|hazard|both` picks the set. `hazard` and `both` keep Phase 1 behavior.

## 9. Verification (no unit tests)

1. `jev ping` returns.
2. `judge.py --dry-run` builds the payload and prints the scans without a network call.
3. One live run on a Codon fixture returns a decision with per-leaf values.
4. `--rank` on 3 hand-written variants returns an order that matches Victor's read.

## 10. Acceptance

A copy draft returns `decision` plus per-leaf probabilities, per-dimension scores, a composite, and gate reasons. The deterministic layer alone can force a retry.
