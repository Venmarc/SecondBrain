---
title: Codon Labs — vision transcription schema v1
date: 2026-09-17
tags: [project, clone-website, jev, vision, agy]
---

> One-line: the vision step transcribes an image to a fixed schema. It does not critique. Jev and code judge the schema.

**Status:** draft. Ships with `vision.py`.

**Backends:** `agy` (Antigravity CLI) primary, `vision-for-opencode/vision_proxy.py` fallback. One interface, either backend. `--backend auto` tries agy, then the proxy.

---

## 1. The rule

The vision step is a transcription to a schema, not a critique.

The judgment can be no better than the description. So the schema is engineered to carry exactly what the rubric needs, and nothing else. A criterion that cannot survive conversion to a schema field stays out of the Jev lane. It goes to Agy or to a human.

## 2. Two lanes, split by who can see

| Lane | Who | Examples |
|---|---|---|
| Exact values and visible facts | code, from the schema | text present, watermark, finger count, dominant hex, aspect |
| Semantic judgment over the schema | Jev | register match, slot fit, restraint, does it argue a point |

The vision model is the only thing that sees pixels. So it reports facts. Code and Jev reason over those facts.

## 3. Fields

Report only what is visible. Never judge quality in this step.

| Field | Type | Meaning |
|---|---|---|
| `subject` | string | One line: what the image shows. |
| `scene` | string | One line: setting and composition. |
| `composition` | string | Who is present, with apparent ages. |
| `art_style` | string | e.g. photorealistic, engraving, illustration. |
| `faces_adults` | integer | Count of adult faces. |
| `faces_children` | integer | Count of child faces. |
| `faces_infants` | integer | Count of infant faces. |
| `identical_adults` | boolean | Two or more adults who look like the same person. |
| `recognizable_real_person` | boolean | Any public figure or real likeness. |
| `text_present` | boolean | Any letters, labels, or UI text. |
| `watermark_present` | boolean | Any watermark or stock mark. |
| `extra_fingers` | boolean | Wrong finger count. |
| `anatomy_issues` | string | Describe, or `none`. |
| `palette_hex` | array | Up to 5 dominant hex values. |
| `dominant_light` | string | `warm`, `neutral`, `cold`, or `mixed`. |
| `cold_tones_outside_instruments` | boolean | Cold color outside a screen or instrument. |
| `neon_or_scifi_glow` | boolean | Glowing blue techno-scifi look. |
| `stock_photography_feel` | boolean | Generic stock look. |
| `aspect_ratio` | string | `width:height`. |
| `subject_alone` | boolean | One evidentiary subject, nothing competing. |
| `pair_family_resemblance` | string | `yes`, `no`, or `na`. |
| `baby_face_visible` | boolean | A full baby face is visible. |

## 4. Code gates (from the schema, no Jev)

A true on any of these is a retry:

`text_present`, `watermark_present`, `extra_fingers`, `identical_adults`, `recognizable_real_person`, `neon_or_scifi_glow`, `stock_photography_feel`, `cold_tones_outside_instruments`, or `anatomy_issues` not equal to `none`.

## 5. Jev leaves

Scores: `register_match`, `slot_fit`, `restraint`, `evidence`.
Gates: `grown_continuation_look`, `decorative_only`.

## 6. Backends

`vision.py --backend auto` (default) tries `agy` first, then falls back to the proxy.

- `agy` — the Antigravity CLI. Preferred. Slower (about 2.5 minutes per image).
- `proxy` — `vision-for-opencode/vision_proxy.py`. Fast (about 20 seconds). Fallback.

`agy` is an agent with file tools. A hostile image can carry text that steers it. The proxy sends image bytes to a vision API and has no filesystem tools. So the proxy is the safer fallback.

## 7. Known operational facts

- `agy` needs one light model and no output flags:
  - Works: `agy --print "<prompt>" --model gemini-3.8-flash-low`. It returns the JSON, sometimes fenced, sometimes repeated, always with a trailing `error: interrupted`.
  - `--sandbox` blocks the image read. `--output-format json` auto-denies the read tool in headless mode. Do not use either.
  - A heavier model can spawn a background task and idle until the 5-minute `--print-timeout`.
- `agy models` sometimes reports "Please sign in" on a token refresh. This is transient. Retry.
- `vision_proxy.py <image> "<prompt>"` returns clean JSON when the prompt demands only JSON.
- `vision_proxy.py` prints backend status lines to stderr. JSON goes to stdout.
