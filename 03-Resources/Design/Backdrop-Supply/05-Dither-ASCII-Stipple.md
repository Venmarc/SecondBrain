---
tags: [design, backgrounds, backdrop-supply, code-replicable]
---

# Dither, ASCII and Stipple

Continuous tone flattened into discrete marks.

## Source collections
- ASCII (`ascii`), 4 free previews
- Nocturne (`nocturne`), 5 free previews

## Palette (sampled from the cached freebies)
- **ASCII** (1200,1045): `#000000 #0c0c0c #242424 #303030 #182424`
- **Nocturne** (1200,673): `#000000 #0c0c0c #181818 #242424 #303030`

## What it looks like
Continuous tone flattened into discrete marks. Halftone dots on a grid, character ramps, stipple and stippled figures, always on a black ground with the light carried by mark density.

## Replicable in code?
**CODE-REPLICABLE (verified, same family)**

Direct vision comparison of the demo `halftone` tile against cached freebie `ascii/124-rectangle` returned SAME VISUAL FAMILY, matching on dot-matrix rasterisation, dark ground with luminous marks and dot dispersion standing in for light falloff. Differences named were subject (their figurative silhouette versus the abstract field) and palette, both adjustable.

## Recipe
Sample a luminance field, then quantise it. A halftone grid modulates dot radius by local luminance; an ASCII version maps luminance to a character ramp drawn into a canvas. The demo tile `halftone` is the dot-grid version. To match their figurative stipple pieces, feed a silhouette mask in as the luminance source instead of a noise field, and drop the palette to monochrome; the vision comparison named exactly those two changes as what would make it a drop-in match.

## Cached assets
- `assets/ascii/124-rectangle.webp` (source `https://app.backgrounds.supply/api/r2-public/previews/ascii/124-rectangle.webp`)
- `assets/nocturne/image-9.webp` (source `https://app.backgrounds.supply/api/r2-public/previews/nocturne/image-9.webp`)

## Related
- [[03-Resources/Design/Backdrop-Supply/_index|Backdrop Supply index]]
- [[03-Resources/Design/Backdrop-Supply/08-Build-Runbook|Build runbook]]
- [[03-Resources/Design/Web-Garnish/_index|Web-Garnish]] (sibling collection, decorative page furniture rather than full-bleed backdrops)
