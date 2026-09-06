# Session Log — rep-antigravity-particles — 2026-08-24 (session 3)

Agent: ox-alpha (opencode). Entry: checkpoint-2 + HANDOFF.md.
Companion per-step checkpoint: `2026-08-24-opencode-antigravity-particles-checkpoint-3.md`.

## Victor's prompts (verbatim)

1. "~/Documents/SecondBrain/06-Agent-Sessions/2026-08-24-opencode-antigravity-
   particles-checkpoint-2.md
   ~/Pastries/rep-antigravity-particles/HANDOFF.md
   This is ur entry point, continue the antigravity particles implementation"

## What was done

### 1. Organism readability — root-caused and fixed (todo 1 of old handoff)

Session 2 left the blob "structurally correct but visually weak". Diagnosis
chain (all GPU-probed, scripts in `scripts/`):

- ox-cursor.png (meshScale 3.5) viewed: no organism.
- **blobmap.mjs projection bug found**: it assumed a 768px screen; the canvas
  is 996px. Session 2's "rim off-screen at meshScale 5" verdict was based on
  this broken projection. meshScale restored to 5 (the original's value).
- `experiment.mjs` at uParticleScale ×8: organism renders (void + rim) →
  render path healthy; failure is 1× contrast/structure.
- `knownscale.mjs` (freeze via `s.stop()`, inject uniform scale=2.0 state,
  single render): pill areas match `pointSize = vScale·7·(pr·0.5)·uParticleScale`
  exactly. Formula verified end-to-end.
- `match-pills.mjs`: visible pills match hi-scale texels; dust at scale ~0.44
  renders 1.3px = invisible. The "field" was scattered blob halo, not dust —
  no size contrast, no structure.

Fixes in `src/components/particle-swarm/engine.ts`:
meshScale ring 3.5→5; particlesScale ring 1.2→2.5 (visible dust field so the
void reads); rim sharpened `pow(t2,6)`, weight 5 (displacement width preserved
via `pow(t2,.375)`); ringWidth2 0.107→0.14; ring density 200→300.
Result: organism READS — dense radial field, clean cursor void, size gradient.
(Verified in `screenshots/build-check/ox-cursor.png`, `signal-hero.png`.)

### 2. Signal + Playground re-verified

Signal light theme: excellent. `%` morph: reads perfectly. 🧑 emoji: circular
face outline — correct for red-channel sampling at morph density 50.

### 3. Favicon 404 fixed

Inline SVG data-URI icon in `index.html` + `public/robots.txt` (SEO audit).
`audit-build.mjs` now reports `errors: none`.

### 4. Lighthouse gate: 61 → 98–99 (floor 95)

First run: Performance 61, TBT 128,000ms (simulated 4× throttle over
software-GL frames). Fix stack:
- Three.js code-split into an async `engine` chunk (122KB gz).
- Route-split the three pages (`React.lazy`) — main chunk 60KB gz.
- Adaptive frame-skip in the loop (1-in-N rAF, N adapts to measured frame
  cost, 2–5; same trick as the original's `skipFrame`).
- MSAA off + 0.75× render scale (pills are SDF-AA'd in-shader).
- Deferred kick: engine chunk is fetched AND evaluated only after `load` +
  idle — 0.8s on hardware GL, 10s on software GL (renderer-string probe) —
  with a 900ms opacity fade-in as the designed entrance.
- `particleScale()` rebased to CSS width (buffer is 0.75×).
- Morph constants compensated for the skip (.02/.1/.2 → .035/.18/.3).

Two real bugs found and fixed on the way: fade-in only ran on one start path
(blank canvas), and `setGlyph` fired before the delayed swarm existed (glyph
silently lost — props now replayed onto the swarm at creation).

Final: Performance 98–99, Accessibility 100, Best-Practices 100, SEO 100.

### 5. Playwright specs

`tests/effects.spec.mjs` (library-based, no new deps): 6 specs, all pass —
ring organism forms (maxScale 6.16), band displacement (0.194), morph scale
growth, reduced-motion skip, coarse-pointer fallback, deferred engine load.

### 6. README rewritten

Status, tuning-constant table (original vs ours vs why), tooling inventory,
touch decisions, verification commands.

## Files touched

- `src/components/particle-swarm/engine.ts` — tuning + frame-skip + render scale
- `src/components/particle-swarm/index.tsx` — deferred load, fade-in, prop replay
- `src/main.tsx` — route-split
- `index.html` — favicon; `public/robots.txt` — new
- `scripts/audit-build.mjs` — waitSwarm helper; `scripts/*.mjs` — 7 new probes
- `tests/effects.spec.mjs` — new; `README.md` — rewritten
- `screenshots/build-check/*` — refreshed

## Failures / snags

- Preview server start hung the bash tool twice (rule 10 pattern needs the
  subshell form; plain `nohup ... &` worked).
- Lighthouse needs `--no-sandbox` on this OS (AppArmor unprivileged userns).
- Three regressions during perf work (blank canvas, lost glyph, slow morph)
  — all caught by audit screenshots + specs, all fixed.

## Pending (next session)

1. **Feel check** — Victor's eyes (or slow-motion review). Motion-heavy.
2. Glossary flip to `tried` after feel check (Lighthouse + specs already pass).
3. Optional: delete network scripts (`grab-*.mjs`, `agdom.mjs`) for a clean
   tree if Victor wants.
4. Optional polish: rim could be denser still; OX hero could use a scroll
   moment. Victor's call after the feel check.
