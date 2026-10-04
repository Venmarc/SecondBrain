---
title: Editorial Scene Footer
date: 2026-09-13
tags:
  - design
  - footer
  - editorial
  - motion
  - replication
---

> **One-line Summary**: Ultra-light editorial footer — near-white page with a warm-grey illustrated scene (a train on a tall arch bridge) hugging the bottom edge; the follow-up adds an animated smoke layer. An "alive but quiet" footer.

**Sources:** [Exploration post (2 variants)](https://x.com/alimdesigner_/status/2097218379480232086) — "sometimes the best direction appears only after exploring a few wrong ones first" (228 likes) · [Smoke follow-up](https://x.com/alimdesigner_/status/2098305548508684373) — "still a draft, but the smoke came out right" (100 likes, video).

## What it is (evidence)
Two footer variants; the author picked the **second image, the train over a tall arch bridge** [[Web-Garnish assets|asset: `alim-editorial-train-bridge.jpg`]]. Pixel structure: ~62% white (`#fcfcfc`), scene row only at the very bottom in warm taupe/grey (`#a6988a`, `#a99b8d`). The rejected first variant (`alim-editorial-alt.jpg`) has more scene surface (large warm band, `#c0b0a1`-family). The follow-up adds a **smoke animation** streaming across the scene (`alim-smoke-animation.mp4`).

## Replication recipe
**Layout**
- Site content ends, footer is mostly whitespace; the illustration sits as a bottom strip (~20–30vh) or full-width band with copy above it.
- The scene: a tall stone arch bridge with a train. Build options:
  1. **Photo strip** — any arch-bridge photo, graded warm (grayscale → `sepia(.5) hue-rotate(-10deg)` → low opacity blend over `#fdfdfd`). Cheapest, instant.
  2. **Generated illustration** — image-gen prompt: *"minimal editorial line illustration of a tall stone arch bridge with a small train crossing, single warm taupe ink on cream-white paper, fine detail, generous white space, quiet archival mood"*.
  3. **Hand SVG** — 2–3 layered arch silhouettes, `#a6988a` at 40–70% opacity. Most controllable, ~1KB.
- The arch should read as a *frame*: the bridge arc containing the train = the single focal detail.

**Typography** — editorial: small-caps or light serif (Newsreader / Source Serif 4 / EB Garamond), ink `#3a3a3a`, loose tracking, tiny footnote-scale sizes. The page feels quiet because the type is small and the image is edge-hugging.

**The smoke layer (the "came out right" part)**
- Canvas 2D smoke emitter: 60–150 soft radial-gradient blobs drifting upward with slow turbulence (sine sway), `globalCompositeOperation = 'lighten'` or `'screen'` over the bridge, opacity 3–8%.
- Or prerender: loop the smoke clip (`alim-smoke-animation.mp4`) behind a `mix-blend-mode: screen` layer on the scene.
- Rules: subtle or it's a demo reel, not a footer; pause when off-viewport (`IntersectionObserver`); kill it under `prefers-reduced-motion` (swap to a static frost/veil gradient).

**Assets:** `alim-editorial-train-bridge.jpg` (picked direction), `alim-editorial-alt.jpg` (rejected variant — useful for the "wrong directions first" comparison), `alim-smoke-animation.mp4`.

**Tags:** #design #footer #editorial #motion #replication