# 2026-09-09 grok lamalama rooms

Continued `~/Pastries/rep-lamalama-logo-grain`. Five visitable rooms already bound. This session fixed photo framing and re-ran the plan gates.

Root cause: grain FBO was photo+80px and used scale 1 while the JPEG used 1.25. That drew a ghost copy in the grid gaps and put the cursor hit about 80px off. Floor rest hover was 0.12, so hold did not read as a change. Press now hit-tests the frame on window pointerdown.

Fix: `photoGridFboSize` is inner photo size. Both layers use `PHOTO_SCALE` 1.25. Floor `data-hover="0.04"`.

Verification (fresh this turn):
- `npm run build` then `npm run test:effects` → units pass, Playwright 11/11. `{SCRATCH}/effects.log`
- `node tests/launch.mjs` every route twice HTTP 200. `{SCRATCH}/launch.log`
- Unique Direction grep: 0 hits in `src/pages` and `src/components`
- Five oracle visuals/structures are distinct
- Rest + driven screenshots in `{SCRATCH}/pages/`

Routes: http://127.0.0.1:4173/ `/` `/wait` `/patch` `/floor` `/hollow`

---

## 2026-09-09 later: Mario stamp + Yard Board

Victor accepted Floor 3 hold-to-reveal. Then asked to replace the Lamalama L grain on page one with `~/Downloads/files/Mario.svg`, allowed a new page and a different style.

Shipped:
- Intro tint shader `drawCell` samples Mario SVG when `u_use_glyph=1`
- Envelope `/` intro uses Mario after Open the flap
- New `/board` Yard Board: Solari split-flap, amber Mario multiply autoplays
- Asset `public/marks/mario.svg`

Verification:
- `npm run build`
- units + Playwright 14/14 including Mario occupancy, `/board` load, intro glyph=mario, gel hold photo hole
- Brave screenshots `{SCRATCH}/mario/board-early.png` (large amber M) and `envelope-mario.png` (cream M)

Preview: http://127.0.0.1:4173/board and http://127.0.0.1:4173/
