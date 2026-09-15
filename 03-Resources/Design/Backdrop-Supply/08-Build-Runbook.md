---
tags: [design, backgrounds, backdrop-supply, runbook]
---

# Build Runbook

How to actually produce a backdrop for a build, and what is already proven to work.

## Readiness matrix

| Family | Rebuild in code | Needs a generated raster | Demo proof |
|---|---|---|---|
| Gradient / mesh | yes | no | `demos/backdrop-foundry` tile `pure-css` and `mesh` |
| Cosmic / cavern | yes | no | tiles `aurora`, `nebula` |
| Dither / ASCII | yes | no | tile `halftone` |
| Glass / iridescent, flat film | yes | no | tile `holographic` |
| Glass / iridescent, volumetric ribbon | no | yes | none, generate from a cached preview |
| Stylized landscape / diorama | no | yes | none |
| Surreal collage | no | yes | none |
| Animated loops | yes, as shaders | no | every engine mode takes a speed uniform |

## The three routes

**Route 1, pure CSS.** Highest value and lowest cost. Stacked radial gradients on a base linear ramp,
blurred until the stops stop reading as stops, grain over the top. No JS, no WebGL, no file, survives
`prefers-reduced-motion` by doing nothing at all. Use this for gradient and mesh family backdrops that sit
behind text.

**Route 2, fragment shader.** For anything with structure: aurora, nebula, halftone, film iridescence,
fluted glass. The engine in `engine/` holds the whole system, 32 modes and 61 named presets, extracted from
the public client bundle the Gradient Lab tool ships. `engine/modes.json` carries each mode's GLSL and its
full uniform spec with ranges and defaults. `engine/presets.json` carries the artist-tuned parameter sets.
`engine/FRAG_HEADER.glsl` carries the shared uniform block, the simplex and fbm helpers, `paletteAt` and
`writeColor`. Paste a mode's GLSL under the header and you have that look.

**Route 3, generate.** For anything with subject, depth or composition. Cached previews in `assets/` are the
reference images.

## Pitfalls, all hit for real while building the demo

- **Black in the palette plus `fract()` equals hard bands.** Iridescent modes compute a palette position
  wrapped with `fract()`. Every wrap crosses the whole palette instantly, so a palette containing black
  turns each wrap into a dark stripe. Keep black out of the palette and keep the interference term small.
- **Summed beams clip to white.** Prism sums three chromatic beams then multiplies by intensity, so raising
  intensity above roughly 0.6 blows the whole frame out. Keep it low.
- **Dark cosmic modes read as blank.** The first nebula build scored "flat or blank" on review. Brightness
  near 1.75 with gas contrast near 1.05 fixed it.
- **Prefer modes that ship a preset.** The artist-tuned presets hold up; bare defaults sometimes do not.
  Iridescent and prism have no preset and both needed hand work, while every preset-backed mode passed.
- **1200px is the ceiling.** Cache is a preview proxy, not the 3K original the site advertises.
- **Grain is not decoration, it is dithering.** Wide-gamut displays band on smooth gradients. A little noise
  over the top removes the steps and stops the panel looking like a broken export.
- **Write `#version 300 es` GLSL.** The engine targets WebGL2, `in vec2 v_uv`, `out vec4 outColor`.
- **Read the file back after extracting shader text.** Shader literals pulled out of a JS bundle were
  grabbed by the wrong anchor and silently captured a JSX string, which compiles to a `',' : syntax error`
  at column 1. Assert on a known function name like `writeColor` before trusting the extraction.

## Verification recipe

The demo is checked the same way any build should be. Serve it, screenshot it in real Chromium after the
animation settles, and read the pixels back:

```
python3 -m http.server 8899 --bind 127.0.0.1
node shot.js          # playwright-core, real time, no virtual-time budget
```

Then look at it. Screenshots under a virtual time budget lie about rAF canvases, and a per-tile
`readPixels` gives a mean and a distinct-colour count, which is enough to tell a live shader from a black
rectangle but not enough to tell good from bad. That call needs eyes on the image.

## Demo

`demos/backdrop-foundry/index.html` is self-contained, no network, no images, no libraries. Seven panels:
one pure CSS, six WebGL2. `preview.png` is the captured render. Last review: six of seven panels read as
polished designed backdrops, the seventh is the holographic foil mode which reads as faceted at this scale.
