---
title: Web-Garnish Build Runbook
date: 2026-09-13
tags:
  - design
  - footer
  - runbook
  - svg
  - css
  - build
---

> **One-line Summary**: How to recreate any Web-Garnish footer/landing style in real code — fonts, swatches (sampled from the reference assets), ready-to-paste SVG/CSS idioms, and the asset pipeline. All references live in `assets/`.

## Readiness: can a build reproduce these?

| Style | Note | Needs generated asset? | Hardest part |
|---|---|---|---|
| [[01-Engraved-Vignette-Footer]] | Code-only structure/type/duotone; illustration is the hard asset | The engraved landscape (raster via image-gen, or craft an SVG silhouette + hatch pattern) | The illustration |
| [[02-Sticker-Scrapbook-Footer]] | Postage stamp, torn paper, tilt, flat stickers — all doable in code | Optional: flat landmark stickers can be hand-SVG'd | The sticker set |
| [[03-Rubber-Stamp-Mark]] | Texture IS the design | **Yes** — image-gen with saved prompt, or live tool: https://stamp-poster-tool.vercel.app | Ink/paper texture |
| [[04-Watercolor-Art-Print]] | Texture IS the design | **Yes** — image-gen with saved prompts ([[04-Watercolor-Art-Print]]) | Watercolor texture |
| [[05-Perspective-Typography]] | Render IS the design | **Yes** — image-gen with saved prompt ([[05-Perspective-Typography]]) | Perspective render |

**Rule:** crisp marks (logo, stamp glyph, icon, monogram) → hand-written SVG. Textured illustrations → generated raster (WebP/AVIF). Never force texture into SVG; never ship a full-bleed raster footer without lazy-loading (LCP).

## Fonts (Google Fonts — verified names)

- **Serif wordmark** (GLAUX look): Fraunces, Playfair Display, Libre Caslon Display, Cormorant Garamond — all-caps, generous letter-spacing (0.18em+).
- **Editorial serif body/caption**: Newsreader, Source Serif 4, EB Garamond.
- **Handwritten caption** (watercolor prints): Caveat, Dancing Script, Homemade Apple.
- **Typewriter caption** (stamp posters): Special Elite, Courier Prime, VT323, IBM Plex Mono.
- **Sans** (sticker footers, modern CTA): Inter, Manrope, Geist.

## Palettes (sampled from reference assets)

- **Engraved duotone** (adi footers): paper `#fdf9ef` (warm ivory), ink `#466eb4` (line blue), deep ink `#33507a` for hairlines/shadow. Text = ink color, 1px hairlines at 60–80% opacity for depth. Ref: `assets/adi-giaux-footer.jpg`, `assets/adi-village-footer.jpg`.
- **Postrail sticker footer** (harshit): vermilion block `#ee4032`, paper white `#ffffff`, ink black/`#1a1a1a`. Ref: `assets/harshit-postrail-footer.jpg`.
- **Wandor sticker footer**: light sky blue field, terracotta/ochre landmarks, teal accent button — sample exact swatches from `assets/harshit-wandor-footer.jpg` at build time rather than trusting memory.
- **Stamp posters** (hamburgerai): cream panel ≈ `#f5ead6`-family (varies per poster), spot inks desaturated — charcoal `#3b3b3b`, brick `#8a4b38`, ochre `#b08d4f`, deep green `#4a5d3a`. Refs: `assets/stamp-*.jpg`.
- **Watercolor prints** (alina): ivory paper + deep cobalt/icy blue + one warm golden accent; handwritten ink = dark blue-grey. Refs: `assets/alina-*.jpg`.

## Code idioms (ready to paste)

### 1. Duotone (photo → two-color print)
```css
.duotone { filter: grayscale(1) sepia(0.45) saturate(2.6) hue-rotate(178deg) brightness(0.82) contrast(1.05); }
/* tune hue-rotate for ink hue; wrap in mix-blend-mode:multiply over the paper color for letterpress feel */
```

### 2. Hatch / engraving fill (SVG pattern — makes silhouettes look engraved)
```svg
<pattern id="hatch" width="6" height="6" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
  <rect width="6" height="6" fill="none"/>
  <line x1="0" y1="0" x2="0" y2="6" stroke="#466eb4" stroke-width="0.8"/>
</pattern>
<pattern id="hatch-x" width="6" height="6" patternTransform="rotate(-45)" patternUnits="userSpaceOnUse">
  <rect width="6" height="6" fill="none"/>
  <line x1="0" y1="0" x2="0" y2="6" stroke="#466eb4" stroke-width="0.8"/>
</pattern>
<!-- use: <path fill="url(#hatch)" .../> then <path fill="url(#hatch-x)" opacity="0.5" .../> for cross-hatch -->
```
Layer: base silhouette in ink at 15% opacity + hatch pattern = engraved vignette without any image asset.

### 3. Paper grain (SVG turbulence overlay)
```svg
<filter id="paper">
  <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
  <feColorMatrix type="saturate" values="0"/>
</filter>
<rect width="100%" height="100%" filter="url(#paper)" opacity="0.035" style="mix-blend-mode:multiply"/>
```

### 4. Torn-paper edge (CSS clip-path or SVG wavy path)
```css
.torn-top { clip-path: polygon(0% 6%, 4% 2%, 9% 5%, 15% 1%, 22% 5%, 29% 2%, 37% 6%, 45% 1%, 53% 4%, 61% 1%, 68% 5%, 76% 2%, 84% 6%, 92% 2%, 100% 5%, 100% 100%, 0% 100%); }
```
(SVG wavy path with `q`/`t` curves on the top edge is the higher-fidelity version.)

### 5. Postage-stamp perforation (CSS mask)
```css
.stamp {
  -webkit-mask-image: radial-gradient(circle 6px at 12px 12px, transparent 5px, black 6px);
          mask-image: radial-gradient(circle 6px at 12px 12px, transparent 5px, black 6px);
  -webkit-mask-size: 24px 24px;  mask-size: 24px 24px;
  -webkit-mask-repeat: repeat;   mask-repeat: repeat;
}
/* wrap the mask element in a container with an inset border to keep the perforation from touching content */
```

### 6. Sticker tilt (the Postrail gesture)
```css
.sticker { transform: rotate(-3.5deg); box-shadow: 0 12px 30px rgba(0,0,0,0.18); transition: transform .2s ease; }
.sticker:hover { transform: rotate(0deg) translateY(-3px); } /* only if Victor approves interactivity */
```

## Asset pipeline (per style)
1. **Engraved footer** (recommended for product footers, LCP-safe): SVG skyline silhouette (2–3 layered `path`s) + `#hatch` pattern + duotone paper bg + serif wordmark. Zero images. ~2KB.
2. **Sticker footer**: SVG stickers (flat shapes + `#stamp` mask + `.sticker` tilt). Zero images.
3. **Stamp / watercolor / perspective type**: run the saved prompt (notes 03/04/05) through image-gen, export WebP/AVIF ≤150KB, `loading="lazy"` + explicit `width`/`height`, `content-visibility:auto`.

## Asset manifest (`assets/`)
- Footers: `adi-giaux-footer.jpg`, `adi-village-footer.jpg`, `adi-3col-footer.jpg`, `harshit-postrail-footer.jpg`, `harshit-wandor-footer.jpg`, `harshit-landmarks-slide.jpg`
- Interactive sticker demo: `harshit-interactive-stickers.mp4` (the "make stickers interactive" result)
- Stamp posters: `stamp-venice.jpg`, `stamp-snow-village.jpg`, `stamp-pagoda.jpg`, `stamp-coast.jpg`
- Watercolor prints: `alina-watercolor-cafe.jpg`, `alina-watercolor-house.jpg`
- Perspective type: `larus-{slice,leap,offset,fold}.jpg`, `larus-{tension,drift,focus,refract}.jpg`

## Related
- [[_index]] · [[01-Engraved-Vignette-Footer]] · [[02-Sticker-Scrapbook-Footer]] · [[03-Rubber-Stamp-Mark]] · [[04-Watercolor-Art-Print]] · [[05-Perspective-Typography]] · [[06-Hermes-Skill-Stack]]
- Halden-seed footer (photo + clear-band type) is a **different** footer direction — see `06-Agent-Sessions/2026-09-05-grok-halden-seed-footer.md`. Do not mix the two.
- **FOOTER-1 mascot track** (interactive CSS mascot-eyes footer for North Loft) is a third, separate footer direction — see `06-Agent-Sessions/2026-09-07-footer-1-research-brief.md` + `2026-09-08-footer-1-north-loft-polish.md`. This runbook covers the *illustrated art-direction* garnish only.

**Tags:** #design #footer #runbook #svg #css #build