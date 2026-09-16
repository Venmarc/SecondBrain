---
tags: [design, backgrounds, backdrop-supply, code-replicable]
---

# Gradient and Mesh Backdrops

Soft multi-point colour fields.

## Source collections
- Gradient BGs (`gradient-bgs`), 6 free previews
- High-exposure Gradients (`high-exposure-gradients`), 4 free previews
- Gradience (`gradience`), 2 free previews
- Swirl (`swirl`), 2 free previews
- Smudge (`smudge`), 2 free previews
- Bloomhaze (`bloomhaze`), 5 free previews

## Palette (sampled from the cached freebies)
- **Gradient BGs** (1200,673): `#243c30 #183024 #3c3c24 #483c24 #303c24`
- **High-exposure Gradients** (1200,675): `#241860 #6c6090 #6c6c9c #f0f0fc #606090`
- **Gradience** (1200,673): `#000000 #0c0c0c #0c0000 #0c0c18 #00000c`
- **Swirl** (1200,673): `#185484 #6090c0 #6c90c0 #f0c0a8 #186090`
- **Smudge** (1200,673): `#e4cca8 #ccccc0 #d8ccc0 #e4d8b4 #e4d8c0`
- **Bloomhaze** (1200,673): `#0c180c #0c1818 #0c2418 #182418 #242418`

## What it looks like
Soft multi-point colour fields. No texture, no structure, no subject. The whole point is that they read as light rather than as an image.

## Replicable in code?
**CODE-REPLICABLE (verified)**

Vision comparison of the demo CSS/mesh tiles against cached freebie `gradient-bgs/frame-3` found the same continuous multi-colour blending principle; the difference is spatial frequency, the reference is a soft Gaussian blur and the shader carries finer ripple structure. Softening means lowering noise scale and raising softness.

## Recipe
Radial gradients stacked at different origins on a base linear ramp, blurred so the individual stops stop being readable. Grain on top, because flat gradients band on wide gamut displays. The demo tile `pure-css` does this in about eight lines of CSS with no JS at all, and the `mesh` shader does the animated version by summing weighted blobs against a noise field.

## Cached assets
- `assets/gradient-bgs/frame-3.webp` (source `https://app.backgrounds.supply/api/r2-public/previews/gradient-bgs/frame-3.webp`)
- `assets/high-exposure-gradients/1.webp` (source `https://app.backgrounds.supply/api/r2-public/previews/high-exposure-gradients/1.webp`)
- `assets/gradience/image-4.webp` (source `https://app.backgrounds.supply/api/r2-public/previews/gradience/image-4.webp`)
- `assets/swirl/image-15.webp` (source `https://app.backgrounds.supply/api/r2-public/previews/swirl/image-15.webp`)
- `assets/smudge/image-81.webp` (source `https://app.backgrounds.supply/api/r2-public/previews/smudge/image-81.webp`)
- `assets/bloomhaze/image-8.webp` (source `https://app.backgrounds.supply/api/r2-public/previews/bloomhaze/image-8.webp`)

## Related
- [[03-Resources/Design/Backdrop-Supply/_index|Backdrop Supply index]]
- [[03-Resources/Design/Backdrop-Supply/08-Build-Runbook|Build runbook]]
- [[03-Resources/Design/Web-Garnish/_index|Web-Garnish]] (sibling collection, decorative page furniture rather than full-bleed backdrops)
