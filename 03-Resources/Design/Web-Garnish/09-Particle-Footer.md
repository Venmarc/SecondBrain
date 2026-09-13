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

## What it is (evidence — partially unverified)
Near-black page (`#0c0c0c` dominates at 74%); the only lit region is a mid-right zone in dim olive-sand tones (`rgb(45,51,41)`-family) — i.e. a subtle particle/grain field, not a bright scene. Exact subject (particle text vs. particle dune/logo) could not be visually confirmed: my vision lane was down at capture time. **Verify against `assets/benjamin-sand-particles.jpg`.**

## Replication recipe
**Canvas particle system (the honest way)**
1. Offscreen canvas: render the *target* (a word, logo, or dune-shape path) in white on black at footer resolution.
2. `getImageData` → collect pixel positions where alpha > 0 → those are the particles' targets. Cap N (`600–2000`).
3. Each particle: random start position, target position, `pos += (target - pos) * 0.02`, plus small per-particle jitter/gravity so grains feel loose (they should *settle*, not weld).
4. Draw 1–2px rects in sand tones (`#b8a277`, `#9a8a63`, `#7d7054`) on `#0c0c0c`.
5. Entry animation: particles start scattered and drift into the shape (300–800ms ease) — that gathering moment IS the effect.

**Cheap variant (static)** — SVG `feTurbulence` grain (see [[07-Build-Runbook]] §grain) clipped to the word/phrase, sand fill on near-black. Same vibe, zero JS, no motion.

**Interactive bonus (optional, and it matches your mascot philosophy)**: pointer repels/attracts particles within a radius. Only if it earns its place and stays cheap.

**Performance rules**
- rAF loop only while the footer is on-screen (`IntersectionObserver` → stop loop when hidden).
- Reference the target texture once, never re-render per frame.
- `prefers-reduced-motion:` swap to the static grain variant.
- Prefer canvas 2D over WebGL until you need >5k particles; a footer never needs >5k.

**Assets:** `benjamin-sand-particles.jpg`.

**Tags:** #design #footer #particles #canvas #replication