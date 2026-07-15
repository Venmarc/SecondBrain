<!--
AGENT: Fill every section below. Do not leave placeholders blank and do not skip a section because "nothing happened" — write "None this session."
This file is a SESSION LOG (episodic history). It is NOT the place to store rules, anti-patterns, or design decisions that should apply to future sessions:
  - Confirmed root causes tied to a third-party library/API → ANTI_PATTERNS.md (vault root, or its split file under 03-Resources/Principles/ if that technology's section has already been split — check for a pointer first).
  - Standing directives about how THIS project should be run → this project's own AGENTS.md, under Non-Negotiable Rules (Session Conduct subsection).
If this session produced either kind of lesson, you MUST write it into the correct file above, then just link to it here. If you only write it here, it will be lost — nobody re-reads old session logs before starting new work.
-->
 
> **One-line Summary**: <what happened in one sentence, plant the *outcome*, not the activity — e.g. "Fixed auth card charcoal-text bug (root cause: Clerk light-theme fallback)" not "Worked on Clerk styling">
 
**Date:** YYYY-MM-DD
**Agent:** Grok | AGY | OpenCode | other
**Project:** [[01-Projects/Momentum/Momentum|Momentum]] | [[01-Projects/Ledger/Ledger|Ledger]] | [[01-Projects/New_Project/New_Project|New_Project]] | none
 
## Goal
<!-- 1-2 sentences. What was this session actually trying to accomplish? -->
-
## Standing Directives Given This Session
<!--
AGENT: These are rules the user stated that apply BEYOND this session — process
rules, not task instructions. Signal words: "always", "never", "don't do X until
I say so", "from now on". If you find one, it goes here AND in this project's own
AGENTS.md (Non-Negotiable Rules → Session Conduct).
Example: "Don't declare a phase complete without explicit user sign-off."
If none were given, write "None."
-->
-
## User Prompts (Extracted, Not Compressed)
<!--
AGENT: Do NOT summarize the user's prompt into a shorter sentence. Do NOT use "...".
For each prompt that changed direction, added a constraint, or rejected your prior
output, capture:
  1. The specific constraint or ask, in the user's own words (trim greetings/filler only)
  2. What it overrode or added to (if it rejected a prior plan, say what was rejected)
Skip prompts that were pure acknowledgments ("ok proceed") unless they set a rule
(then log under Standing Directives, not here).
-->
- **Prompt:** "<constraint/ask in user's words>"
  **Overrode/Added:** <what this changed vs. what existed before>
## Reference Files / Media
- `[[path/to/reference]]` — Summary: <why it was provided, what it showed>
## Root Cause Log
<!--
AGENT: One row per distinct bug/problem investigated. This is the highest-value
section in the whole file — fill it precisely, even if short.
Confidence: "Confirmed" (verified by testing) or "Hypothesis" (plausible, untested).
-->
| Symptom | Root Cause | Fix Applied | Confidence |
|---|---|---|---|
| <what was observed, e.g. "black text on dark popover card"> | <mechanism, e.g. "colorBackground: transparent breaks Clerk's contrast engine, falls back to light theme"> | <what was changed> | Confirmed / Hypothesis |
 
## Research Conducted
<!--
AGENT: Be honest here even if the answer is "none." If a bug happened and no
research was done first, say so explicitly — that's a process gap worth flagging,
not a detail to omit.
-->
- **Searched/Consulted:** <docs, issues, changelogs actually checked — or "None">
- **Should have been consulted but wasn't:** <if applicable, or "N/A">
## Subagent Snags
<!-- Tooling/process failures during execution — missed staging, crashes, reviewer catches, etc. -->
-
## Decisions & Pivots
<!-- Design/architecture choices made and why. Not standing rules (those go above) — one-off calls for this session's scope. -->
-
## Steps Taken / Actions
-
## Files Touched
- `[[path/to/file]]`
  - **Previous State:** <state before change>
  - **After Change:** <state after change>
  - **Related to:** <link back to Root Cause Log row or Prompt, if applicable>
## Vault Updates This Session
<!--
AGENT: Did this session add an entry to ANTI_PATTERNS.md (or a split file under
03-Resources/Principles/) or add a Session Conduct rule to a project's AGENTS.md?
List exactly what was added. If nothing was added, and you logged a Standing
Directive or a Confirmed Root Cause above, that's a contradiction — go back and
update the correct file before ending this session.
Also: if you edited ANTI_PATTERNS.md, check its current line count. If it's
>= 200 lines, its own header comment describes a mandatory split into
03-Resources/Principles/ — do that before ending this session, and note it below.
-->
- `[[ANTI_PATTERNS.md]]`: <entry added, or "No changes"> — line count after edit: <N>. Split triggered: Yes / No / N/A
- Project `AGENTS.md`: <Session Conduct entry added, or "No changes">
## Open Questions & Next Steps
-
**Tags:** #agent-session
