# Session Checkpoint — 2026-08-24 — ox-alpha (opencode) — antigravity particles teardown

## Status
Research phase COMPLETE. Build phase NOT STARTED (awaiting concept pick + approval).

## User prompts (verbatim key parts)
1. "analyze why the scrolling on antigravity.google is soooo smooth... Find out the stack... why the images load much quicker..." → delivered full teardown.
2. "find out everything u can about the particles... how they're rendered... be absolutely sure that WE CAN RECREATE THE EXACT LOOK, FEEL, AND BEHAVIOR" → done, full shader source extracted.
3. "create a folder in ~/Pastries... 'rep-antigravity-particles'... store teh findings/discovery, goals, and we'll build from there... we are not gonna recreate antigravity.google, we'll just make up something, but use teh particles... for teh morphing particles '{}' and the circles. we can go with any other symbols/letters, even emojis"
4. Context rule from Victor: at 100k+ context he compacts/hands off; agents misbehave on bloat. Currently ~75k. Finish current unit of work before compaction.

## What was done this session
- Full reverse-engineering of antigravity.google (see memory entries mem_mt6dvl4h_9ce4878046bb and mem_mt6fgu9d_974598b1fd76).
- Files created:
  - ~/Pastries/rep-antigravity-particles/research/FINDINGS.md (complete spec)
  - ~/Pastries/rep-antigravity-particles/research/ag-particles.pretty.js (hero source)
  - ~/Pastries/rep-antigravity-particles/research/ag-morph.pretty.js (morph CTA source)
  - ~/Pastries/rep-antigravity-particles/research/ag-smooth.js (ScrollSmoother source)
  - ~/Pastries/rep-antigravity-particles/README.md (goals, tech decisions, 3 concept options A/B/C)

## Key facts needed to resume
- Architecture: GPGPU ping-pong, 256×256 RGBA state texture (xy=pos, z=scale, w=velocity), poisson-disk-sampling npm pkg layout, THREE.Points with sdRoundBox rotated pill sprites.
- Feel comes from: anchored homes (refPos relax), outward soft-ring displacement, layered snoise octaves, sway × clamp(dist,0,1), breathing radius, cursor lerp 0.02/frame, idle noise drift, scale-alpha pop in/out.
- Colors via low-freq spatial noise field, NOT cursor distance. Light theme #2c64ed→#f84242→#ffcf03; dark #7189ff→#3074f9→#000.
- Morph: PNG targets rasterized 500×500, variable-density PDS (red³), nearest-point assignment in Worker, GSAP hoverProgress tween (we replace with rAF lerp per no-GSAP rule).
- Emoji shapes feasible: draw white-on-black fillText, sample alpha channel instead of red.
- Three.js justified under Pastries hard rule 2 (GPGPU needs float RTs); justification comment required at import.
- Solo variant rep. Gates: Lighthouse 95+ on :4173 preview Brave incognito, touch fallback decided, Playwright spec asserting technique, glossary entry after pass, per-step checkpoints like this one.
- Servers must run `setsid nohup ... & disown`, never stream stdout into bash tool.

## Next step
Victor picks concept A ("Signal" product page) / B ("Type & Swarm" playground) / C ("OX" dark hero). Then: intake confirmation, scaffold Vite react-ts in rep folder, token setup gate, build particle-swarm primitive, compose, gates.

---

# UPDATE — end of build session (same day)

Build phase reached working milestone, then handed off at Victor's request (context budget).

## Built
- Full rep scaffold: Vite+React+TS+Tailwind4+router+Three.js in rep-antigravity-particles
- engine.ts: complete GPGPU ping-pong particle system, ring + morph modes, ported from FINDINGS.md spec
- 3 pages (OX dark hero / Signal light product / Playground morph), CapsuleHeader + FadeHeader
- Scripts: audit-build.mjs (screenshots), debug-probe.mjs (state texture probe via window.__swarm.probe())

## Verified working
- Build passes; preview :4173 serves all 3 routes
- Ring mode: state probe confirms ring response (maxScale 4.67, cursor tracking works)
- Morph mode: '%' glyph FORMS (screenshots/build-check/pg-percent.png) — milestone
- 5 bugs fixed: reversed smoothstep UB, cursor-goal accumulation, framing (morph cam z 8.8 / meshScale 5), DataTexture needsUpdate on creation, glyph sampling channel (red not alpha)

## Handoff
Full details: ~/Pastries/rep-antigravity-particles/HANDOFF.md (bugs, weaknesses, ordered remaining todos, verification commands). Next session starts there.
