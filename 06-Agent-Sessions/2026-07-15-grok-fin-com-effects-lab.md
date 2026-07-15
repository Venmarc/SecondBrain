<!--
AGENT: Session log — fin.com extraction through progressive lab + glossary hygiene.
Standing process rules for effects status/naming live in Effects_Glossary + Effects_Playbook (not only here).
-->

> **One-line Summary**: Reverse-engineered fin.com landing motion into the Effects Glossary (literal-first names + status gates), then built a progressive Pastries lab (P0→P2 + jumping-arcs page) with draw-on arcs fixed after mistaking glow for jump.

**Date:** 2026-07-15  
**Agent:** Grok  
**Project:** none (Effects system / Pastries) — future targets [[01-Projects/Ledger/Ledger|Ledger]] / [[01-Projects/Momentum/Momentum|Momentum]]

## Goal

Extract fin.com hero/landing visual and motion techniques with real DevTools/network evidence; document them for agent + Victor use; replicate progressively in Pastries so demos exist before any product adoption.

## Standing Directives Given This Session

These apply beyond this session — written into glossary/playbook where noted:

1. **Glossary status gates:** `extracted` = reverse-engineered / technique filled, no demo yet (default after inspect). `tried` = demo exists (e.g. Pastries). `adopted` = used in a real product project. Do not mark inspect-only work as `tried`.  
   → `[[03-Resources/Tools/Effects_Glossary.md]]` status key + `[[03-Resources/Tools/Effects_Playbook.md]]` Step 10 / checklist.

2. **Literal first, then technical:** When using the glossary, lead with the plain-language one-liner, then technique, then cost/options.  
   → Glossary “Agent rule: names”; Playbook naming note.

3. **Base form vs customization:** Optional behaviors (cursor-glow return-to-rest, trail delay, angles) are **Options** under one entry — not new glossary effects and not forced into base demos unless product asks.

4. **Playwright tooling for fin.com audits** lives under `~/Pastries/fin-website-audit/` (not the vault). Brave + incognito + empty cache per `~/.agents/playwright-core/BROWSER.md`.

5. **Never `git push` without explicit approval** (global; unchanged).

## User Prompts (Extracted, Not Compressed)

- **Prompt:** Extract juices from https://www.fin.com hero/landing — revolving globe, white lines jumping point-to-point, layering (globe between bg and text), API cards unwrap on scroll, cursor light/glow; check JS/network not only visuals; figure out load speed if possible; store definitions in effects_glossary; store Playwright tools in a fin folder under Pastries; questions welcome else proceed.
  **Overrode/Added:** Full reverse-engineering session; network/JS mandatory; Pastries folder for tooling; glossary as destination for techniques.

- **Prompt:** Build P0, P1, P2 on separate pages where page 1 = P0, page 2 = P0+P1, page 3 = P0+P1+P2; different design ideas per page so not duplicates but features clearly identifiable; install deps in fin folder; proceed with build; floor is yours / go crazy.
  **Overrode/Added:** Progressive lab architecture + creative distinct themes; implementation authorized without further design gate.

- **Prompt:** (Dev server) No dev server to view it?
  **Overrode/Added:** Operational — start Vite dev on :5173 (not a product change).

- **Prompt:** Arcs weren’t firing/jumping, only glowing/stationary; screenshot proves mid-jump arcs under 1000ms; are jumping lines a separate component usable off-globe? Can card flip angles be simple CSS degree edits?
  **Overrode/Added:** Corrected incomplete arc model (draw-on vs opacity pulse); confirmed arcs as portable primitive; confirmed unwrap tilt is keyframe angles.

- **Prompt:** Dumb down effect names with literal one-liners + technical; agent rule literal first; add jumping arcs to glossary after try; add to globe + page 4 long two-section viewport jumps; cursor-glow return-to-origin debated — prefer proposal/options over changing base form / flooding glossary with customizations; ask opinion.
  **Overrode/Added:** Glossary rewrite (Literal/Technique); implement draw-on arcs + `/arcs` page; base glow unchanged; rest-return as Options only.

- **Prompt:** Labeling extract as `tried` is wrong; add `extracted` gate; `tried` = demo; `adopted` = real project; write session summary from intro to this prompt using Agent-Session-Summary template + prior summaries for style.
  **Overrode/Added:** Status ladder corrected in glossary/playbook; this session log; supersedes incomplete partial log.

## Reference Files / Media

- `[[03-Resources/Tools/Effects_Glossary.md]]` — Primary dictionary (rewritten this session)
- `[[03-Resources/Tools/Effects_Playbook.md]]` — Investigation workflow + status/naming rules
- `[[~/.agents/playwright-core/BROWSER.md]]` + `clean-context.mjs` — Brave audit defaults
- `[[Templates/Agent-Session-Summary.md]]` — Log structure
- `[[06-Agent-Sessions/2026-07-15-grok-vault-lint-venmarc-pastries-lighthouse.md]]` — Prior effects/Pastries session style reference
- User screenshots: fin.com hero, scroll arcs, industries, API card; later mid-jump arc proof
- Live: https://www.fin.com/
- Lab: `~/Pastries/fin-website-audit/`

## Root Cause Log

| Symptom | Root Cause | Fix Applied | Confidence |
|---|---|---|---|
| Hero “cursor light” assumed global mousemove spotlight | Soft “light” is mostly **scroll-driven CSS radial masks** on hex bg + narrative hole-mask; real cursor glow is on **API cards** (`--spot-x/y`, screen blend) | Documented as separate entries (oval mask / hole text / card glow) | Confirmed |
| Globe assumed COBE / globe.gl / Framer | Canvas attrs `data-tres` / `data-engine` Three r183; GSAP 3.14.2 + Lenis; card unwrap is CSS `animation-timeline: view()` | Glossary stack notes TresJS + Three + GSAP + Lenis; no Framer | Confirmed |
| Hex rain assumed WebGL | Separate `hash-canvas` with **2d** context | Canvas 2D hex field entry + HashField demo | Confirmed |
| Lab arcs only “glowed,” didn’t jump | Implemented full paths + opacity pulse only — missing **draw progress** (setDrawRange / partial stroke) | JumpingGlobeArcs + JumpingArcs2D draw-on lifecycle | Confirmed |
| Glossary said `tried` after extract only | Status key had no `extracted`; agent treated inspect as try | Status gates: extracted → tried → adopted; reclassified entries | Confirmed |

## Research Conducted

- **Searched/Consulted:** Live fin.com via Playwright (DOM, canvas contexts, network, scroll series, script fingerprint, downloaded CSS: landing, code-block, use-globe-stage, default layout); performance resource transfer totals; prior Venmarc glossary patterns for format continuity
- **Should have been consulted but wasn't:** Official TresJS Line2 dash docs (not required for drawRange approach); real-device mobile Lighthouse on fin.com; full Scroll-Driven Animations browser matrix for product policy

## Subagent Snags

- agentmemory MCP timed out later in session — continued without memory tools
- First fin audit script hit default timeout (~2 min) but completed in background successfully
- create-vite cancelled on non-empty Pastries folder — manual Vite scaffold instead
- Framer keyword false positive in minified Three bundle — corrected via globals/CSS
- Preview/dev servers needed explicit start after user asked to view

## Decisions & Pivots

- Progressive three-page (then four-page) lab with distinct fictions: Terminal / Editorial / Atlas / Jump lines — not skin-swaps of one layout
- React + R3F for globe (not Vue/Tres) inside fin-website-audit; Atlas route lazy-loaded
- Cursor glow rest-return: **not** applied to base demo; recorded as Options only
- Jumping arcs treated as **own primitive** usable on globe or any surface
- Status `extracted` added mid-session after Victor corrected premature `tried` labels

## Steps Taken / Actions

1. Playwright audits (`audit-fin.mjs`, `audit-fin-deep.mjs`) → `output/`, `screenshots/`, `FINDINGS.md`
2. Initial glossary fill from fin.com (later corrected for status + literal names)
3. Scaffolded Vite/React/TS/Tailwind app in `fin-website-audit`; shared primitives + three progressive pages
4. Started dev server; user review found arcs wrong
5. Explained jump vs glow; confirmed card tilt is simple degree keyframes
6. Glossary literal-first rewrite + agent naming rule
7. Implemented draw-on arcs on globe + `/arcs` long page
8. Status ladder fix (`extracted` / `tried` / `adopted`) and reclassification
9. Session summary (this file)

## Files Touched

- `[[~/Pastries/fin-website-audit/]]` (created/expanded)
  - **Previous State:** empty then audit-only
  - **After Change:** full lab app + audit scripts/artifacts
  - **Related to:** build + arc fix prompts

- `[[03-Resources/Tools/Effects_Glossary.md]]`
  - **Previous State:** partial venmarc entries; jargon-heavy; `tried` misused
  - **After Change:** literal+technique entries; status gates; fin + jumping arcs; reclassified
  - **Related to:** extract, naming, status prompts

- `[[03-Resources/Tools/Effects_Playbook.md]]`
  - **Previous State:** inspect→log workflow without extracted gate / literal-first
  - **After Change:** naming note + status checklist/step
  - **Related to:** standing directives

- `[[06-Agent-Sessions/2026-07-15-grok-fin-com-effects-audit.md]]`
  - **Previous State:** partial early log
  - **After Change:** superseded by this fuller log (keep as partial snapshot if desired)
  - **Related to:** session summary ask

## Vault Updates This Session

- `[[ANTI_PATTERNS.md]]`: No changes — line count N/A. Split triggered: N/A  
- Project `AGENTS.md`: No project AGENTS change (effects rules live in Glossary + Playbook)  
- Effects Glossary + Playbook: status gates, literal-first rule, base vs options, fin.com + jumping arcs documentation  
- Session log: this file under `06-Agent-Sessions/`

## Open Questions & Next Steps

- Optional: implement cursor-glow `returnOnLeave` / rest position as a **prop** on lab CardSpotlight (demo option only)
- Optional: Lenis + GSAP ScrollTrigger stage demo if product needs multi-scene scrub (`extracted` until then)
- Mobile real-device pass for globe (simplify vs disable)
- When shipping to Ledger/Momentum: promote only needed effects from `tried` → `adopted` with product components
- Lighthouse on lab preview / fin.com production if performance claims need numbers beyond transfer totals

**Tags:** #agent-session #effects #fin-com #pastries #playwright #glossary
