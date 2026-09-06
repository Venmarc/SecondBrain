# Session Checkpoint — rep-antigravity-particles — 2026-08-24 (session 2, interrupted)

Agent: ox-alpha (opencode). Interrupted by Victor: PC dying. Handoff written to
`~/Pastries/rep-antigravity-particles/HANDOFF.md` (authoritative, read that first).

## Victor's prompts (verbatim)

1. "Pastries/rep-antigravity-particles/HANDOFF.md this is ur entry point.
   continue the antigravity particles implementation"
2. ". Yo. my pc is about to die. so u'll stop here and document what u've done
   so far, and ur next steps"
3. "continue ur writing of the handoff"

## What was done (todo 1 of previous handoff: ring blob contrast)

Diagnosis by live GPU probing (not guessing):
- Probe showed blob forms in sim (scale 2–4.6) but render showed no organism.
- Ruled out: uv/texel sampling (quadrant-debug build proved mapping correct),
  RT binding (`whichrt.mjs`: render reads rtA post-swap, correct), blending.
- Found: ~58k unused state texels park at (0,0) scale>1, polluting whole-
  texture stats; real blob = ~350 particles in the t2 band.
- Found rim off-screen: ring band to 0.28 mesh > screen half-height 0.2256
  mesh at meshScale 5 (blobmap.mjs projected blob particles at y −100…−190).

Fixes applied to `src/components/particle-swarm/engine.ts` (all built):
1. uColorScheme polarity fixed (original: dark=0, no velocity dimming).
2. particlesScale defaults: ring 1.2, morph 0.6.
3. Ring params → original's live DOM values: ringWidth 0.006, ringWidth2
   0.107, ringDisplacement 0.62 (from `scripts/agdom.mjs` dump).
4. Ring meshScale default 5 → 3.5 so the rim fits the frustum. UNVERIFIED.
5. Morph (todo 2, applied early): density 120→50 (engine + Playground.tsx),
   movement gain 0.01→0.02.

Verification: `npm run build` ✓, `scripts/audit-build.mjs` ✓ (only favicon 404
remains). Dust now matches reference (~4–5px pills, measured via PIL on the
original capture). Blob readability after meshScale 3.5 NOT yet judged —
screenshot `screenshots/build-check/ox-cursor.png` generated but unviewed.

New tooling in scripts/: correlate.mjs, whichrt.mjs, blobmap.mjs,
experiment.mjs, grab-reference.mjs, grab-main.mjs, agdom.mjs.
Reference captures in screenshots/reference/ (ag-hero-rest/cursor,
ag-main-rest/cursor).

## Key discovery for the glossary

antigravity.google's HERO swarm is non-interactive (interactive defaults
false); the famous cursor-following organism is the main-particles section
with ring-width 0.006 / ring-width2 0.107 / displacement 0.62. The FINDINGS
doc's ring params were class defaults, not the shipped look.

## Next step

View ox-cursor.png, judge the organism, tune meshScale 3–4 /
displacement 0.4–0.8 / ps 1.0–1.5 as needed, then proceed with the handoff's
step list (Signal/Playground re-check, emoji morph, favicon 404, Lighthouse,
specs, README, glossary, session log).
