---
tags: [design, backgrounds, backdrop-supply, code-replicable]
---

# Glass and Iridescent Surfaces

Two different things share this family name.

## Source collections
- Chromatica (`chromatica`), 4 free previews
- Prismal (`prismal`), 2 free previews
- Iridescence (`iridescence`), 3 free previews
- Velvoura (`velvoura`), 3 free previews
- Aurorix (`aurorix`), 4 free previews
- Flora (`flora`), 2 free previews
- Surrealis - 1 (`surrealis-1`), 2 free previews
- Surrealis - 2 (`surrealis-2`), 2 free previews
- Surrealis - 3 (`surrealis-3`), 2 free previews

## Palette (sampled from the cached freebies)
- **Chromatica** (1200,665): `#000c18 #000c0c #0c0c18 #000018 #000024`
- **Prismal** (1200,673): `#180048 #0c0048 #300060 #240060 #180054`
- **Iridescence** (1200,665): `#e4d8e4 #f0d8d8 #ccc0cc #c0c0d8 #ccccd8`
- **Velvoura** (1200,665): `#906cb4 #54246c #48246c #9c78c0 #54306c`
- **Aurorix** (1200,665): `#ccd8d8 #ccccd8 #d8d8e4 #c0ccd8 #d8d8d8`
- **Flora** (1200,638): `#180c3c #240c3c #0c0030 #0c0c30 #24183c`
- **Surrealis - 1** (1200,673): `#000000 #cce4f0 #f0ccc0 #6c90a8 #f0d8cc`
- **Surrealis - 2** (1200,673): `#000000 #0c0c0c #181818 #242424 #181824`
- **Surrealis - 3** (1200,673): `#000000 #0c0c0c #181818 #181824 #182424`

## What it looks like
Two different things share this family name. Flat iridescence is a colour surface that shifts hue with angle or thickness, like oil on water or foil. The other half is a rendered 3D scene, glossy glass ribbons and blobs with real depth, specular highlights and depth of field.

## Replicable in code?
**SPLIT. Flat iridescent film is code-replicable. The volumetric ribbon renders are not.**

Two independent vision passes compared a locally built iridescent/glass shader against cached freebies and both concluded different family: the references are photoreal 3D volumetric renders with real specular shading, the shader output is flat 2D procedural. The material language (gloss, sheen, refraction) matches; the geometry and depth do not. Do not promise a client a code replica of Chromatica.

## Recipe
For the flat film: sine interference modulated by an fbm thickness field, mapped through a palette, plus grain to break up the banding that `fract()` palette wrapping causes. The demo tile `holographic` is this technique. Keep shimmer low and keep black out of the palette or every wrap becomes a hard dark band. For the volumetric renders there is no shader recipe, generate them instead: the image tool takes reference images, so feed it a cached preview and ask for the same material and lighting at full resolution.

## Cached assets
- `assets/chromatica/image-4.webp` (source `https://app.backgrounds.supply/api/r2-public/previews/chromatica/image-4.webp`)
- `assets/prismal/image-3.webp` (source `https://app.backgrounds.supply/api/r2-public/previews/prismal/image-3.webp`)
- `assets/iridescence/image-1.webp` (source `https://app.backgrounds.supply/api/r2-public/previews/iridescence/image-1.webp`)
- `assets/velvoura/image-8.webp` (source `https://app.backgrounds.supply/api/r2-public/previews/velvoura/image-8.webp`)
- `assets/aurorix/image-5.webp` (source `https://app.backgrounds.supply/api/r2-public/previews/aurorix/image-5.webp`)
- `assets/flora/image-5.webp` (source `https://app.backgrounds.supply/api/r2-public/previews/flora/image-5.webp`)
- `assets/surrealis-1/image-10.webp` (source `https://app.backgrounds.supply/api/r2-public/previews/surrealis-1/image-10.webp`)
- `assets/surrealis-2/image-15.webp` (source `https://app.backgrounds.supply/api/r2-public/previews/surrealis-2/image-15.webp`)
- `assets/surrealis-3/image-6.webp` (source `https://app.backgrounds.supply/api/r2-public/previews/surrealis-3/image-6.webp`)

## Related
- [[03-Resources/Design/Backdrop-Supply/_index|Backdrop Supply index]]
- [[03-Resources/Design/Backdrop-Supply/08-Build-Runbook|Build runbook]]
- [[03-Resources/Design/Web-Garnish/_index|Web-Garnish]] (sibling collection, decorative page furniture rather than full-bleed backdrops)
