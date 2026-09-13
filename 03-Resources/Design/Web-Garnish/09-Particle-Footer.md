---
title: Particle / Sand-Grain Footer
date: 2026-09-13
tags:
  - design
  - footer
  - particles
  - canvas
  - replication
---

> **One-line Summary**: Dark footer where the design is rendered as a field of drifting sand particles — canvas/WebGL particle system assembling a shape or text from grain.

**Source:** [BenjaminUIX](https://x.com/BenjaminUIX/status/2071245795995836437) — "Simple but meaningful footer design!" (432 likes).

## What it is (evidence, verified via AGY gemini lane)
Real design: **ACQUIRE** (chat/automation SaaS) dark footer. Two human silhouettes built from glowing point-cloud particles stand on a rolling dune ridge, reaching toward each other in a handshake-grasp; luminous particle trails stream across the landscape into a black void with sparse star-dust. Below the particle visual: headline *"Provide your customers the assistance they need"* — the word "customers" rendered bright white while the rest is dim grey particle texture — plus a solid white "Schedule a demo" button. Then four clean link columns (System / Items / Help Center / Get Started Today) and a © 2026 copyright bar. Monochrome: near-black `#0c0c0c` canvas, white/silver particles. Pixel-sampled: lit particle zone sits mid-frame (`rgb(45,51,41)` olive-grey at capture scale).

## Replication recipe (v2 — antigravity morph-field, built & verified 2026-09-13)
**Interaction model**: field of drifting sand grains (homes on dune crests + sky dust) that assemble into the handshake pair on cursor hover, disperse on exit. Mechanics per [[03-Resources/Tools/Effects_Glossary|Effects_Glossary]] "Morphing particle field" entry: permanent homes; 3s spawn/grow/shrink/die/respawn life cycle per particle; `hoverProgress²` assembly easing; ~20–25% of particles never join (field stays alive); 1.5× scale boost near target.

1. **Silhouette target**: generate a flat black-on-white pair (image tool, prompt in `assets/handshake-silhouette-pair.png` provenance below; realistic proportions — inner arms clasped at center, outer arms relaxed at sides). Threshold to a binary mask (`ffmpeg geq lum<128 → black`), downscale ~640w, embed as base64 PNG (~4.4KB) — no network dependency, canvas never tainted.
2. **Decode + sample**: draw mask to offscreen canvas, `getImageData`, sample dark pixels at step 3 → ~3.9k shape points. Normalize to 0–1 stage space.
3. **Map to scene**: aspect-preserving fit (`SHAPE_ASPECT = bbox w/h ≈ 0.83`), height 48% of scene, **feet anchored on the front dune crest** at center (`oy = crestY - shapeH`).
4. **Assignment**: unique shuffled 1:1 (every shape point owned by exactly one particle) — NOT nearest-home, which starves torsos. Joiner pool sized ≈ shape-point count.
5. **Frame**: life-cycle envelope `env = sin(π·cyc/3)²`, spring `pos += (target − pos)·0.055` with ±1.4px wander, `hoverProg ±0.05/frame`, alpha 0.35–0.8, sand tones `#cfc19b/#b8a277/#9a8a63/#8f8468/#7d7054/#c2b28a`, 1–2.6px rects.
6. **Rules**: rAF + IntersectionObserver pause off-viewport; `prefers-reduced-motion` → static field at homes, no loop, no morph; ~4.6k particles at 1440px (budget `W·3.2`).

**Pitfalls found** (all bit hard, all fixed):
- Nearest-home assignment clusters wrong (sky dust all lands on heads, torsos starve) → use unique shuffled assignment.
- Normalizing bbox per-axis and stretching to a fixed box squashes standing figures into a horizontal band → aspect-preserving fit only.
- Radial aura gradient behind the figures reads as a circular mask artifact → the ACQUIRE reference has none; drop it.
- Clip-art silhouettes are busts (close-up hands / pictograms / waist-up) — generate the pair instead, verify proportions via vision before use.
- `--virtual-time-budget` screenshots catch frame 1–2 (scattered dust); only real-time waits verify a morph.

**Reference scale** (measured from `assets/benjamin-sand-particles.jpg`): figure zone = 15.3–34.4% of footer height (pair ~322px tall on a 1440px footer), feet planted on the front dune crest, handshake centered.

**Working build**: `demos/acquire-particle-footer/index.html` (+ `preview.png` = hover state, `preview-idle.png` = resting field).

**v1 recipe (static stickman, kept for reference)**: offscreen canvas drew capsule-limb figures, sampled lit pixels → home targets, grains lerp in + jitter; reads as stickmen — superseded by the silhouette-sampling v2 above.

**Cheap variant (static)** — SVG `feTurbulence` grain (see [[07-Build-Runbook]] §grain) clipped to the word/phrase, sand fill on near-black. Same vibe, zero JS, no motion.

**Interactive bonus (optional, and it matches your mascot philosophy)**: pointer repels/attracts particles within a radius. Only if it earns its place and stays cheap.

**Performance rules**
- rAF loop only while the footer is on-screen (`IntersectionObserver` → stop loop when hidden).
- Reference the target texture once, never re-render per frame.
- `prefers-reduced-motion:` swap to the static grain variant.
- Prefer canvas 2D over WebGL until you need >5k particles; a footer never needs >5k.

**Assets:** `benjamin-sand-particles.jpg` (reference) · `handshake-silhouette-pair.png` + `handshake-silhouette-pair-mask.png` (the build target pair; generated via Hermes image tool → fal FLUX, prompt: "Flat vector silhouette: two business professionals shaking hands. Both figures stand with weight evenly balanced, INNER arms extended toward each other clasping hands at the exact center, OUTER arms hanging relaxed and straight down at their sides. The two figures stand apart with a gap between them equal to their arm length, wide landscape composition, both fully visible head to toe, realistic adult human proportions, one figure slightly taller than the other, natural confident posture, solid pure black fill, clean smooth edges, pure white background, no shadows, no text, no ground line, minimalist" — proportions verified via AGY gemini before use).

**Tags:** #design #footer #particles #canvas #replication