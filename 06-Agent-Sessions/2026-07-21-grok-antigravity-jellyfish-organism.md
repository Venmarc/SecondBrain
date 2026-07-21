---
date: 2026-07-21
agent: grok
model: grok-4.5
project: feel-alive UI design system — antigravity reactive Build
status: jellyfish-baseline-organism-feel
tags: [session-summary, build-lane, antigravity, organism-swarm, jellyfish-ring]
---

> **One-line Summary**: Replaced GPGPU physics organism with deterministic **jellyfish ring** (pure function positions); soft ~1s cursor center-follow; Playwright feel shots + 4/4 tests green.

**Date:** 2026-07-21  
**Agent:** Grok  
**Project:** Pastries / Effects system (Build lane)

## Goal

Phase 4 only — organism look & feel under the new research baseline (no physics sim).

## Standing Directives Given This Session

- Blob is **invisible**: empty center sits under cursor (geometry, not repel forces).
- Swarm **always** waves; cursor only moves the center — soft ease, **no snap**.
- New baseline: `Documents/Research_files/antigravity-swarm.md` + `Jellyfish-swarm.html`.
- Iterate: implement → Playwright audit → compare to A* → stop for Victor review.

## User Prompts (Extracted, Not Compressed)

- **Prompt:** Run phases 4–6; soft bouncy blob hypothesis; vortex looks primitive.
- **Prompt (plan revise):** Research with Claude — **no simulation**; pure function of (row, angle, time, seed); jellyfish; center empty under cursor; follow with ease. Revamp whole plan.
- **Prompt (approval):** Follow cursor with ease whenever it moves — no snappy movement, steadily catches up. Iterate till good; Playwright audit when done.

## Reference Files / Media

- `Documents/Research_files/antigravity-swarm.md`
- `Documents/Research_files/Jellyfish-swarm.html`
- Extract A02/A03/A08 vs `screenshots/build-check/jelly-0*.png`
- User screenshot/screencast of old vortex primitive (2026-07-20)

## Root Cause Log

| Symptom | Root Cause | Fix Applied | Confidence |
|---|---|---|---|
| Thick purple vortex / styrofoam fan | Stateful GPGPU sim + tangential swirl | Delete sim path; pure polar function ring | Confirmed |
| Particles glued on cursor | Physics attract without geometric hole | Fixed `innerRadius` band; edge alpha fade | Confirmed |
| Snappy cursor feel risk | Instant mouse → particle forces | One center eased ~1s (`easeFollow`) | Confirmed |

## Research Conducted

- Victor + Claude research: Bramus `css-houdini-ringparticles` architecture (deterministic ring, not site decompile 1:1).
- Ported canvas reference math into `ring-math.ts`.

## Decisions & Pivots

- **Architecture pivot:** abandon GPGPU attractor for organism; canvas-2d pure function.
- Cursor = two signals: **follow** (center ease ~1s) + **influence** (speed → amplitude decay).
- Removed `shaders.ts` (dead GPGPU).
- Hero `deferMs=400` for feel loop (raise later for LH if needed).

## Steps Taken

1. Plan rewritten to jellyfish baseline.
2. Implemented `ring-math.ts` + rewrote `organism-swarm/index.tsx`.
3. Tuned sparsity/multi-hue against A02 (3 feel iterations).
4. `scripts/audit-jellyfish-feel.mjs` + Playwright shots.
5. `npm run build` green; `npm run test:effects` 4/4.

## Files Touched

- `src/components/organism-swarm/{index.tsx,ring-math.ts,index.css}` — new arch; deleted shaders
- `src/pages/Home.tsx` — copy + defer/followEase
- `tests/effects.spec.mjs` — canvas-2d engine
- `scripts/audit-jellyfish-feel.mjs`
- Session plan + this log

## Verification

- Build green; organism chunk ~5.7 KB (no Three for organism).
- Feel audit: `jelly-01`…`jelly-05` under `screenshots/build-check/`.
- Visual: empty center, multi-hue soft dashes, ring eases with cursor (not vortex fill).
- `test:effects` 4/4.

## What Next (for Victor)

1. **Review** preview `:4173` + jelly screenshots vs A02.
2. If close enough: optional mono density tune, restore longer defer for LH, glossary Technique note update (canvas pure-function vs GPGPU claim).
3. If not: param levers only (innerRadius/thickness/amplitude/rows) — **do not** reintroduce physics.

## Gaps still honest

- Research is Bramus recreation architecture, not confirmed minified antigravity.google GLSL.
- Still slightly more “ordered ring” than source’s ultra-sparse scatter — further density/amplitude knobs if Victor wants.
