> **One-line Summary**: Read-only visual, motion, and depth audit of Codon Labs at localhost:4321. Confirmed process S-curve puck leaves the viewport; mapped depth sandwich to Process only.

**Date:** 2026-09-21
**Agent:** Grok
**Project:** [[01-Projects/Clone-Website/Clone-Website|Clone-Website]] / `~/Documents/Codon-Labs`

## Goal
Audit live Codon Labs for depth and motion. No code edits. Record where the depth sandwich and other glossary depth methods belong. Diagnose the curved process SVG lag.

## Standing Directives Given This Session
- Audit only. Do not implement.
- CSS first. Justify Framer Motion if used.
- Use Brave + Playwright. Walk every route.
- Spin subagents.
- Victor asleep; finish without more questions.

## User Prompts (Extracted, Not Compressed)
- **Prompt:** Visual audit of Codon-Labs / Clone-Website at localhost:4321. Motion and depth, including depth sandwich and other glossary depth methods. Curved SVG lags on scroll. Recalibrate or keep the tracer in the screen center. CSS mainly. Framer only if justified. Find where depth and motion can be added per page. Do not run amok. Do not edit. Use Playwright / Brave CDP. Spin subagents. Victor going to bed.

## Reference Files / Media
- `~/Documents/Codon-Labs` live at `http://127.0.0.1:4321` (astro dev).
- Vault glossary: `03-Resources/Tools/Effects_Glossary.md`.
- Depth sandwich definition: `Documents/Halden/rebuild-direction.md`.
- Screenshots and JSON: `/tmp/codon-visual-audit/` (62 shots + `report.json` + `puck-desktop.json`).

## Root Cause Log
| Symptom | Root Cause | Fix Applied | Confidence |
|---|---|---|---|
| Process puck lags and leaves the viewport on the S-curve | Scroll progress maps to path *length*. Cubic Bezier between left/right cards is 1.21× the vertical span (2238px vs 1844px at 1440×900). Extra length is sideways. | None (audit). Recalibrate: invert path Y to the viewport center band. | Confirmed (Brave samples) |
| Intro and photo WebGL never painted on :4321 | Every route throws `TypeError: _jsxDEV is not a function`. React islands fail in this astro dev session. | None (audit). | Confirmed |
| Even a straight mobile spine leaves the viewport | Scroll window is 75vh start / 25vh end, so the puck is not locked to viewport center. | Same Y-invert as desktop. | Confirmed |

## Research Conducted
- Feel-router lanes: Extract, Find opportunities, Audit existing code, depth materials.
- Live Brave walk of 13 desktop routes + 5 mobile routes.
- Three read-only subagents: glossary depth catalog, inner-page recon, motion 8-category audit.

## Decisions & Pivots
- Depth sandwich applies to Process (home `#process` and `/process`). Optional second: Program with one facility still.
- Framer Motion is not required for the sandwich or the puck fix.
- No source edits this session.

## Next Actions
1. Recalibrate ProcessTimeline puck to viewport-center Y.
2. Unify `/` process UI and `/process`.
3. Design the Process depth sandwich (sticky scene + wash + content).
4. Diagnose `_jsxDEV` on astro dev before judging WebGL feel.
