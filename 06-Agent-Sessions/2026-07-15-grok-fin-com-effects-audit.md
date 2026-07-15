<!--
SESSION LOG — fin.com effects extraction into Effects Glossary
-->

> **One-line Summary**: *(Partial early log — superseded by [[06-Agent-Sessions/2026-07-15-grok-fin-com-effects-lab]].)* Reverse-engineered fin.com landing motion into glossary + Pastries audit folder; later status labels corrected (`extracted` vs `tried`).

**Date:** 2026-07-15
**Agent:** Grok
**Project:** none (Effects system / Pastries reference) — targets Ledger/Momentum later

## Goal

Extract and define the visual/motion techniques on https://www.fin.com/ (globe, connection lines, layering, card unwrap, cursor glow, load performance) so they can be replicated; store definitions in Effects Glossary; store Playwright tooling under Pastries.

## Standing Directives Given This Session

None.

## User Prompts (Extracted, Not Compressed)

- **Prompt:** "We are gonna be extracting the juices off the https://www.fin.com website hero page. … revolving globe … white lines that jump from one point … layered with the globe between the background and foreground texts. … api cards unwrap when u scroll … light follows the cursor … check the js/network sources in Devtools … site loads quickly too … store the definition/techniques and category in the effects_glossary. all the playwright tools u use however, will be stored in the fin website folder u create in Pastries. Do u have any questions? I'm open to them. If not, proceed"
  **Overrode/Added:** Full reverse-engineering session scoped to fin.com + glossary write + Pastries audit folder; user explicitly said proceed without blocking Q&A; required network/JS inspection not just visuals; performance curiosity secondary to technique extraction.

## Reference Files / Media

- `[[03-Resources/Tools/Effects_Glossary.md]]` — Target dictionary for technique entries
- `[[03-Resources/Tools/Effects_Playbook.md]]` — Investigation workflow (identify → classify → inspect → log)
- `[[~/.agents/playwright-core/BROWSER.md]]` — Brave + incognito + empty cache rules
- User screenshots of fin.com hero, scroll arcs, industries statues, curl API card (session assets)
- Live site: https://www.fin.com/

## Root Cause Log

| Symptom | Root Cause | Fix Applied | Confidence |
|---|---|---|---|
| "Cursor light" looked like mousemove spotlight on hero | Primary soft light is **scroll-driven CSS radial masks** on hash field + narrative hole-mask; true cursor spotlight is on **API cards** (`--spot-x/y` + screen blend), not hero root vars | Documented both distinctly in glossary | Confirmed |
| Assumed globe might be COBE/globe.gl | Canvas attrs `data-tres` / `data-engine` + texture paths + `__THREE__` r183 | Glossary updated to TresJS + Three r183 | Confirmed |
| Assumed Framer Motion for smooth motion | Bundle/window show GSAP 3.14.2 + Lenis; card unwrap is CSS `animation-timeline: view()` | Glossary notes no Framer Motion | Confirmed |
| Hex rain looks like WebGL particles | Separate `hash-canvas` with **2d** context | New Canvas 2D hex field entry | Confirmed |

## Research Conducted

- **Searched/Consulted:** Live Playwright DOM/network/script fingerprint; downloaded CSS (`index`, `use-globe-stage`, `code-block`, `default` layout); grepped Nuxt chunks for ScrollTrigger, Line2, earth-daymap, Lenis, hash-canvas; agentmemory (no prior fin.com notes)
- **Should have been consulted but wasn't:** Official TresJS/Three Line2 docs (not required for technique naming); real-device mobile Lighthouse (only empty-cache Performance API metrics)

## Subagent Snags

- First audit script hit default timeout (~2 min) and continued in background — completed successfully (~159s). Deep audit ~69s.
- Framer Motion keyword hit in Three minified bundle was a false positive; corrected via window globals + CSS evidence.

## Decisions & Pivots

- Stored all Playwright scripts/output under `~/Pastries/fin-website-audit/` (not vault) per user ask.
- Glossary status set to **`tried`** (inspected, not yet replicated in a product).
- Did not implement replications this session — definition-only as requested.
- Performance: honest "transfer/FCP measured, no Lighthouse score" in logs.

## Steps Taken / Actions

1. Intake: Effects Playbook + Glossary + BROWSER.md + Pastries layout
2. Built `scripts/audit-fin.mjs` — full page probe (canvas contexts, network, scroll, cursor, script fingerprint)
3. Built `scripts/audit-fin-deep.mjs` — mask var series, CSS rule extraction, JS keyword windows, code-section
4. Ran both against production fin.com with Brave clean context
5. Downloaded key CSS; wrote FINDINGS.md + README
6. Updated Effects_Glossary with ~12 verified/new bullets + verified log block
7. memory_save pattern for future sessions

## Files Touched

- `[[~/Pastries/fin-website-audit/]]` (new)
  - **Previous State:** did not exist
  - **After Change:** scripts, output JSON/CSS, screenshots, FINDINGS.md, README.md
  - **Related to:** User prompt (Playwright tools in Pastries fin folder)
- `[[03-Resources/Tools/Effects_Glossary.md]]`
  - **Previous State:** fin globe entry untested/generic; no sandwich/masks/card unwrap/spotlight details
  - **After Change:** verified techniques + logs; status tried
  - **Related to:** User prompt (store definitions in glossary)

## Vault Updates This Session

- Effects_Glossary.md expanded (CSS / Canvas / JS-lib / Perf sections + verified log + open gaps)
- Session log: this file
- No ANTI_PATTERNS.md change (library facts belong in glossary for now)
- No project AGENTS.md Session Conduct changes

## Open Loops / Next Steps

- Replicate P0 patterns in a Pastries sandbox (depth sandwich, card spotlight, marquee) before shipping to Ledger/Momentum
- Mobile viewport re-audit for globe simplify/disable path
- Optional Lighthouse on fin.com production (incognito) for a numeric perf baseline
- Progressive-enhancement policy for Scroll-Driven Animations browser support

## Failures

None this session (audits exited 0).

## User Prompts Verbatim (primary)

See "User Prompts" section — full extract stored in session prompt file under `.grok/sessions/…/prompts/prompt_0.txt`.
