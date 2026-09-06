# Session Checkpoint — rep-antigravity-particles — 2026-08-24 (session 3)

Agent: ox-alpha (opencode). Entry: HANDOFF.md + checkpoint-2. All of session 2's
"unverified" items are now resolved. Build is console-clean.

**SUPERSEDED below "Next steps" — see the session log
`2026-08-24-opencode-antigravity-particles-session-3.md` for the final state
(Lighthouse 98–99, specs 6/6, README rewritten, pending = feel check only).**

## Victor's prompts (verbatim)

1. "~/Documents/SecondBrain/06-Agent-Sessions/2026-08-24-opencode-antigravity-
   particles-checkpoint-2.md + ~/Pastries/rep-antigravity-particles/HANDOFF.md
   This is ur entry point, continue the antigravity particles implementation"

## Root-cause work this session (all GPU-probed, evidence in scripts/)

The organism still didn't read after session 2. Diagnosis chain:

1. ox-cursor.png (meshScale 3.5 build) viewed: NO organism visible.
2. blobmap.mjs (projection FIXED: it hardcoded a 768px screen; canvas is
   996px — session 2's "rim off-screen at meshScale 5" verdict was based on
   this broken projection and was WRONG): rim is on-screen, 342 hi-scale
   particles, radius ~180–430px around the anchor.
3. experiment.mjs at uParticleScale ×8: organism IS there (void + rim) →
   render path works; failure is contrast/structure at 1×.
4. knownscale.mjs (freeze sim via s.stop(), inject state texture with
   scale=2.0 everywhere, render one frame): pill areas match
   pointSize = vScale·7·(pr·0.5)·uParticleScale exactly. Formula verified.
5. match-pills.mjs: visible pills match hi-scale texels (scale 2–4.4);
   "dust" at scale ~0.44 renders 1.3px = INVISIBLE. The visible field was
   scattered blob halo, not dust. No size contrast → no organism read.

## Fixes applied (src/components/particle-swarm/engine.ts)

1. meshScale ring default 3.5 → 5 (original's value; the 3.5 change was
   based on the broken projection).
2. particlesScale ring 1.2 → 2.5 — makes the dust field VISIBLE so the void
   reads as a hole (linear scale can't change contrast ratio; visibility of
   the baseline field can).
3. SIM_FRAG_RING: t2 = pow(t2,6) (was pow 3), t += t2*5 (was *3) — rim scale
   concentrates at the band peak. Displacement width preserved:
   pow(t2,.375) == original pow(pow(raw,3),.75). Commented in source.
4. ringWidth2 0.107 → 0.14 (more rim population under the sharper falloff).
5. Ring density 200 → 300 (~11k particles; GPU-trivial). Fills the rim.

## Result (VERIFIED, screenshots/build-check/ fresh)

- ox-cursor.png: organism READS — dense radial pill field, clean void around
  cursor, size gradient, rim pills 15–40px. Antigravity vibe achieved.
- signal-hero.png: excellent in light theme (blue→red gradient organism).
- pg-percent.png: "%" glyph morph reads perfectly. pg-emoji.png: circular
  face blob — correct for a smiley at morph density 50; pipeline verified.
- favicon 404 FIXED (inline SVG data-URI in index.html). audit-build.mjs:
  "errors: none". Build ✓.

## Taste deviations from the original (deliberate, per Victor's "make up
something" intent) — document in rep README

- particlesScale 2.5 (original main section ships 0.59/0.65) — needed for
  visible dust at headless DPR 1 / 1366px.
- t2 sharpening pow 6 + weight 5 (original pow 3 + weight 3) — rim density.
- ringWidth2 0.14, density 300 (original 0.107, 230).

## Next steps (in order)

1. Mobile/touch gate: decide per component (ring = pointer-driven; needs
   touch fallback or disable under hover:none; morph = fine on touch).
2. Lighthouse 95+ on :4173 (Brave incognito, BROWSER.md command). Watch
   bundle ~186KB gz (Three.js may need code-splitting).
3. tests/effects.spec.mjs — at least one spec per glossary entry.
4. Rep README (include the deviation list above + probe-tool inventory).
5. Glossary status → tried (Effects_Build_Playbook steps 7+8 must pass
   first: Lighthouse + feel check). Feel check still needs Victor's eyes
   or at minimum slow-motion review.
6. Session log + delete network scripts (grab-*.mjs, agdom.mjs) if Victor
   wants a clean tree.

## Verification commands (unchanged)

```bash
cd ~/Pastries/rep-antigravity-particles
npm run build
npm run preview   # :4173, currently RUNNING (nohup, pid 67706 may be stale)
NODE_PATH=~/.agents/playwright-core/node_modules node scripts/audit-build.mjs
```

New scripts this session: uniforms.mjs, probe-canvas.mjs, shrink-test.mjs,
knownscale.mjs, freeze-compare.mjs, match-pills.mjs (all in scripts/).
