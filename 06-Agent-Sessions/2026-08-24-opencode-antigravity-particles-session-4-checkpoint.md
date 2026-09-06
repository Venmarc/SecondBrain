# Session 4 — feel-check fixes — 2026-08-24 (checkpoint)

**Trigger:** Victor's review session on session-3 output (HANDOFF.md entry point).
He fed findings + screencasts. Verdict: "closest ever"; behavior/color/movement
correct, but particle sizes 2–3x too big and Playground input had focus/state bugs.

## Victor's findings (verbatim intent)

1. Unactivated dust (outside organism) must be tiny specs; ours matched the
   small activated pills. Activated pills 2–3x too big vs antigravity
   (reference screencast: 20-29-06.mp4 — 2–4px specks even in the dark hero).
2. OX: circular black patches on/around organism; OX pills bigger than Signal's.
3. Playground input: cannot clear (deleting last char repopulates `{`);
   shape only forms while input focused; preset hover fills input but doesn't
   form without caret. 3-char limit OK.
4. Intro text + input + presets block the formed shape; dark mode too dim.
5. Requests: draggable control panel; theme toggle with creative palettes
   (NO pure white/black; light = tints like peach/pink/indigo/yellow;
   dark = deep shades of a primary/secondary).

## Fixes shipped this step

- `engine.ts`: ring `particlesScale` 2.5 → **0.6** (~4x down; matches reference
  scale; restores dust-speck vs rim-pill contrast). Morph stays 0.6.
- `engine.ts`: new `setTheme(theme, colors?)` — live palette uniform swap.
- `particle-swarm/index.tsx`: theme/colors props synced to live engine via
  refs + effect; constructor now replays `themeRef`/`colorsRef` (Signal's light
  boot preserved).
- `components/control-panel/index.tsx` (NEW): DraggablePanel — pointer drag,
  transform-only, viewport-clamped, `preventDefault` on background drag
  (no text selection), skips input/button/a targets.
- `pages/Playground.tsx`: rewritten —
  - `text` state (input) separated from `glyph` state (shape); clearing keeps
    last glyph; placeholder shows current glyph.
  - `active={true}` always: shape no longer gated by input focus.
  - PALETTES: dark `#141433` deep indigo / light `#fdeee3` warm peach; no pure
    white/black. `--pg-bg/--pg-fg` overridden per theme so FadeHeader follows.
  - Theme toggle button inside the panel; swarm colors swap per theme via
    `setTheme` (dark: #9aa8ff/#4a5df9/#2a2a5e; light: #2c64ed/#f84242/#ffcf03).

## Verification (fresh evidence)

- `npm run build` — clean.
- `tests/effects.spec.mjs` — 6/6 PASS.
- `scripts/verify-behavior.mjs` (NEW, debug probe): cleared input value `""`
  (no repopulation); shape persists after blur (screenshot
  `screenshots/build-check/pg-blur-hold.png`); light theme
  (`pg-light.png`); panel drag dx -350 dy 200 (`pg-dragged.png`).
- Console errors: none.
- Lighthouse (prod preview :4173, Brave incognito): **Perf 99, A11y 100,
  BP 100, SEO 100**.
- OX size check: `ox-void-check.png` + `ox-cursor.png` — dust now 1–2px specks,
  rim pills ~8–10px (reference-matched).

## Gotchas discovered

- Headless Brave = SwiftShader → engine's 10s software-GL delay. Any probe
  script must wait ≥12s after networkidle before asserting on particles.
- `NODE_PATH` trick works for scripts under the rep root, not /tmp (ESM).

## Open items for Victor's round-2 eyes

1. Rim punch at 0.6 (his open question #1 — levers unchanged in README).
2. Circular black patches: not re-diagnosed this step; hypothesis = the
   `snoise*t3*.5` subtraction inside the ring dips scale below the alpha gate;
   at reference particle size this reads as texture (as in the original), not
   holes. Confirm on real GPU.
3. Fade-in entrance + morph speed (unchanged from session 3 open questions).
4. Palette taste: indigo/peach are defaults; veto freely.

## Next step

Victor reviews :4173 (real GPU). If good → flip glossary entry
(antigravity particles / GPGPU swarm) to `tried`, final session log.
