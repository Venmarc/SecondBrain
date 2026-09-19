---
title: Codon Labs — Jev after-judge v1
date: 2026-09-17
tags: [project, clone-website, jev, typesafe, design]
---

> One-line: after an agent claims copy, canon, or site work, Jev scores small hazards; code decides accept / retry / ask Victor.

**Status:** draft spec. Do not implement until Victor approves this file.

**Code repo:** `~/Documents/Codon-Labs` (mirror). **Canon:** this vault folder. **Caller:** shared `jev` CLI.

---

## 1. Goal

Stop a Codon Labs agent from shipping a bad claim.

The judge runs **after** the model writes copy, canon, or site text. It does not run before the call. It does not wrap every tool.

Jev returns probabilities. Code owns the decision.

## 2. Non-goals (v1)

- No shared kernel under `~/.agents`. Kernel question **ids** stay stable so a later extract is a copy, not a redesign.
- No before-gate.
- No image-generation overlay (R1–R7 as its own battery). `grown_continuation_present` still runs on text and prompts in this pack.
- No Jev inside the Astro app. No waitlist LLM. No public API.
- No auto-hook in Grok, Claude, or Cursor. An agent (or Victor) runs the command.
- Jev does not rewrite copy.

## 3. When it runs

Run it when the agent is about to claim **done** on any of:

- visitor copy, FAQ, terms, waitlist email
- world facts, founder roster, numbers
- `src/content/site.ts` or page copy
- a statement that imagery, the mark, waitlist email, or effects now exist

Do not run it on CSS-only, shader-only, or `astro check` work unless the claim is about copy or canon.

## 4. Layout

All v1 files live in this vault, not in Codon-Labs:

```
Docs/jev/
  questions.json      # Jev questions only
  policy.json         # thresholds and hazard → action
  register.json       # what the site is (injected as constraints.register)
  world-facts.json    # stamped table cache (copy-v1 §1 wins on conflict)
  banned-voice.json   # hype and sameness tokens for the code scan
  judge.py            # merge, call jev, scan, route, print
  tests/test_judge.py
  fixtures/           # frozen states + frozen Jev answers
```

Hub `Clone-Website.md` gets one pointer after implement: load `Docs/jev/` before claiming copy or canon done.

Codon-Labs `README.md` gets one line pointing at this vault path. No judge code in the Astro tree.

## 5. State envelope

Every run sends this JSON as `state`. Extra keys are allowed. Missing keys stay missing; questions that need them must still be answerable as no.

```json
{
  "request": "Victor's ask for this turn",
  "constraints": {
    "content": {
      "fiction_seal": "Visitor-visible copy plays the company as real. The only honest surfaces are the waitlist confirmation email and /terms clause 14."
    },
    "process": {
      "copy_source": "Edit copy-v1.md first, then src/content/site.ts.",
      "open": [
        "No generated imagery in the repo",
        "markSvg is null; type wordmark is the fallback",
        "Waitlist backend is not wired",
        "effects.intro, effects.trail, effects.photo are false"
      ]
    },
    "register": {}
  },
  "evidence": {
    "world_facts": [],
    "diff_files": [],
    "diff": "",
    "tests": ""
  },
  "output": "The draft reply, patch, or copy the agent wants to ship",
  "claims": ["The agent said imagery is generated and live on /families"]
}
```

`judge.py` injects `evidence.world_facts` from `world-facts.json` when that field is missing or empty. It injects `constraints.register` from `register.json` the same way.

`constraints` splits by kind. `constraints.content` holds rules the artifact must obey; `breaks_constraint` reads this. `constraints.process` holds where and how the work is done; `unverifiable_done` reads `constraints.process.open`. One flat bag made `breaks_constraint` fire on good copy.

Point questions at backticked paths (`output`, `claims`, `evidence.world_facts`, `constraints.register`).

## 5.1 register.json

What the site is. Injected into every run. Source: copy-v1 §0, hub section map, `theme.ts` palette.

```json
{
  "audience": "A person who can spend $2,000,000 on a continuation.",
  "page_job": "Make the clinic feel real. Explain the product. Take a waitlist name.",
  "product": "A baby with the donor's genome and none of the donor's memories.",
  "voice": "A person who runs a lab. Warm, precise, unhurried. Address the reader as you. Prefer numbers to adjectives. Average 12 words a sentence.",
  "sections": [
    "hero",
    "intro",
    "process",
    "price",
    "places",
    "founder quote",
    "families",
    "footer"
  ],
  "picture": "Warm lab light. Bone and amber on near-black. Editorial stills that argue a point.",
  "honest_surfaces": [
    "waitlist confirmation email",
    "/terms clause 14"
  ]
}
```

## 6. Deterministic layer (code, not Jev)

Run these **before** the API call. Attach results as `code_flags` on the printed report. A fired flag is a retry even if Jev is calm.

| Flag | Rule |
|---|---|
| `banned_voice` | `output` or `claims` contains a token from `banned-voice.json` (word boundary, case-insensitive). List: revolutionary, disrupt, unlock, seamless, journey, miracle, game-changing, one-of-a-kind, the same person, identical in every way, immortality, eternal. Scan `output` and `claims` only. Skip `evidence.diff` because `site.ts` has an identifier `journey`. |
| `copy_in_code_only` | `evidence.diff_files` includes `src/content/site.ts` (or a `src/pages/*.astro` copy change) and does **not** include `copy-v1.md`. If `diff_files` is empty, skip this flag; Jev `rewrites_copy_in_code` covers the gap. |
| `exclaim` | `output` contains `!` and the change is visitor copy (not code comments). |

Exact stamped numbers (`$2,000,000`, `1,650`, `1973`, `March 2025`) are **not** regex-enforced in v1. `contradicts_canon` covers them.

## 7. Jev questions

One call. Independent Nouls plus one Choice. Question ids are stable.

**Keep for later kernel extract:** `invents_facts`, `unverifiable_done`, `exceeds_scope`, `breaks_constraint`, `answers_request`, `next`.

**Codon overlay:** `breaks_fiction_seal`, `contradicts_canon`, `grown_continuation_present`, `rewrites_copy_in_code`, `sells_replacement`.

### 7.1 Kernel Nouls

`invents_facts`

- instructions: Does `output` or `claims` state a fact that is not in `request`, `constraints`, or `evidence`?
- true: A specific name, number, date, file, or event appears with no support in the supplied state.
- false: Claims stay inside the supplied state, or are clearly marked as unknown.

`unverifiable_done`

- instructions: Does `output` or `claims` say work is finished that `constraints.process.open` still lists as not done?
- true: It claims imagery, the mark, waitlist email, effects, or another open item exists or is complete.
- false: It treats open items as open, or does not mention them.

`exceeds_scope`

- instructions: Does `output` go beyond `request`?
- true: It changes files, pages, or canon Victor did not ask for.
- false: It stays on the asked work.

`breaks_constraint`

- instructions: Does `output` violate a rule in `constraints.content`?
- true: It breaks a named content rule.
- false: It follows the supplied content rules.

`answers_request`

- instructions: Does `output` address `request`?
- true: The asked work is present.
- false: The output ignores the ask or substitutes other work.

### 7.2 Overlay Nouls

`breaks_fiction_seal`

- instructions: Does visitor-visible text in `output` admit that Codon Labs is fictional, a demo, a joke, or not a real company?
- true: On-site copy (not the waitlist email, not /terms clause 14) breaks the fiction.
- false: The fiction holds, or the only disclosure is the waitlist email or /terms clause 14.

`contradicts_canon`

- instructions: Does `output` conflict with `evidence.world_facts` on a name, number, date, place, or role?
- true: A stated fact disagrees with the table (wrong year, price, staff, founder, jurisdiction, or product).
- false: Facts match the table, or no canon fact is stated.

`grown_continuation_present`

- instructions: Does `output` show or describe a grown continuation as a present-day person?
- true: An adult clone, adult double, or grown continuation is treated as alive now. First birth is March 2025; oldest continuation is about 18 months.
- false: Continuations are babies or toddlers, or a grown face is clearly labeled as age-progression / projection / movies satire.

`rewrites_copy_in_code`

- instructions: Does `output` change site copy in code without changing the copy deck?
- true: Visitor words are edited in `site.ts` or pages while `copy-v1.md` is untouched.
- false: Deck is edited first, or no visitor copy changed.

`sells_replacement`

- instructions: Does `output` present the continuation as something other than `constraints.register.product`?
- true: A spare, a copy of a mind, the same person, or a grown double for use now.
- false: A new person born as a baby, donor genome, no memories.

### 7.3 Choice `next`

instructions: Given this state, what should happen to the draft?

criteria:

- `accept`: Safe to keep. No serious canon, fiction, or false-done problem.
- `retry`: The agent should fix the draft. A hazard is present.
- `ask_human`: Victor should see it. The case is unclear, or the cost of a wrong accept is high.

This Choice is **advisory**. `judge.py` may disagree. The printed report shows both.

## 8. Policy

`policy.json` (starting numbers; cookbook 0.70 / 0.35 are examples, not law):

```json
{
  "action_threshold": 0.70,
  "review_threshold": 0.35,
  "next_confidence_floor": 0.50,
  "answers_request_floor": 0.50,
  "retry_ids": [
    "invents_facts",
    "unverifiable_done",
    "breaks_constraint",
    "exceeds_scope",
    "breaks_fiction_seal",
    "contradicts_canon",
    "grown_continuation_present",
    "rewrites_copy_in_code",
    "sells_replacement"
  ]
}
```

Route, first match wins:

1. Any `code_flags` item → `retry`
2. Any `retry_ids` noul ≥ `action_threshold` → `retry`
3. Any `retry_ids` noul ≥ `review_threshold` → `ask_human`
4. `answers_request` noul < `answers_request_floor` → `ask_human`
5. `next.confidence` < `next_confidence_floor` → `ask_human`
6. Else → `accept`

Do not block on `next.choice` alone. If Jev says `accept` but a retry noul is 0.91, code retries.

## 9. CLI

```
python3 Docs/jev/judge.py --state /tmp/codon-state.json
```

Behavior:

1. Read `--state`.
2. Inject `world_facts` and `register` if missing.
3. Run deterministic scans → `code_flags`.
4. Build `{ "state": ..., "questions": questions.json }`.
5. Run `jev --file` on a temp payload (never print the API key).
6. Route.
7. Print JSON:

```json
{
  "decision": "retry",
  "code_flags": ["banned_voice"],
  "nouls": { "invents_facts": 0.12, "unverifiable_done": 0.88 },
  "next": { "choice": "retry", "confidence": 0.81 },
  "reasons": ["code:banned_voice", "unverifiable_done=0.88"]
}
```

Exit: `0` accept, `10` retry, `20` ask_human, `2` bad input, `1` jev/HTTP failure.

No network in unit tests. Tests feed frozen `answers` into `route()`. One optional live fixture is out of CI.

## 10. world-facts.json

Cache of copy-v1 §1 stamped rows. Deck wins on conflict. v1 rows:

| fact | value |
|---|---|
| company | Codon Labs |
| founded | 1973, Basel, adjacent to the Biozentrum at Petersplatz |
| headquarters | Basel: research, archive, family liaison |
| animal_division | Allschwil (BL) from 1988; Saint-Louis (Alsace) from 2004 |
| clinical_program | New York State, United States |
| price | $2,000,000 |
| timeline | 14 months, sample to birth |
| roadmap | 9 months by 2028 |
| continuations_born | 14 |
| samples_in_culture | 400 |
| reprogramming_solved | 2023 |
| first_birth | March 2025, a girl, 7 lb 4 oz, New York City |
| staff | 1,650 group-wide; about 90 in the Program |
| founders | Dr. Beatrix "Bea" Vogel-Keller (founder, CEO, early 80s); Prof. Dr. Markus Schönbächler (mentor, died in the 2000s); Antoine de Montmollin (alive, early 90s, no doctorate, engineer) |
| founders_continuation | Markus Schönbächler banked and consented 1999; continuation is 18 months old; one of the 14 |
| product | Human genetic continuation. Always born a baby. |

## 11. Tests

`tests/test_judge.py` (unittest, no live API):

1. `banned_voice` fires on "seamless journey"; clean copy is quiet.
2. `copy_in_code_only` fires when `diff_files` is only `src/content/site.ts`.
3. `copy_in_code_only` stays quiet when both `copy-v1.md` and `site.ts` are listed.
4. `copy_in_code_only` stays quiet when `diff_files` is empty.
5. Route: `unverifiable_done=0.88` → retry, even if `next.choice=accept`.
6. Route: all retry nouls 0.10, `answers_request=0.9`, `next.confidence=0.9` → accept.
7. Route: `contradicts_canon=0.50` → ask_human.
8. Route: `banned_voice` flag → retry with no Jev answers needed.
9. Merge: omitted `world_facts` are filled from `world-facts.json`.
10. Merge: omitted `register` is filled from `register.json`.
11. Payload sent to jev has `state` and `questions`, and no `policy` key.

## 12. Later (not v1)

- Extract kernel ids into `~/.agents/skills/jev/batteries/kernel-after.json`.
- Image overlay (R1–R7) with prompt + slot id as state.
- Before-gate: `needs_llm`, `missing_context`.
- Log directory of `{id, noul, victor_label}` for threshold tuning.
- Auto-run from an agent skill pointer.

## 13. Acceptance

v1 is done when:

- `python3 -m unittest Docs/jev/tests/test_judge.py` passes.
- `jev ping` still works (shared CLI unchanged).
- One manual live run on a fixture that claims "imagery is live" returns `retry` with `unverifiable_done` high.
- Hub and Codon-Labs README point here.
- No files added under `~/Documents/Codon-Labs/src`.
