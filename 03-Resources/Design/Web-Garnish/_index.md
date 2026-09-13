---
title: Web Design Garnish — Footer & Landing Art Direction
date: 2026-09-07
tags:
  - design
  - inspiration
  - footer
  - landing-page
  - web-design
---

> **One-line Summary**: Collected X posts on making footers and landing pages feel hand-crafted — engraved vignettes, sticker/scrapbook footers, rubber-stamp marks, watercolor art prints, and perspective typography. Includes the copy-paste image prompts. See [[03-Resources/MOC-UI-UX-Lessons]] for the broader UI/UX graph.

## Why this collection exists
Victor wants the hand-made, iconic art element in web footers/landing pages instead of the generic flat footer. The style he could not name is an **engraved vignette / pictorial mark** — see [[01-Engraved-Vignette-Footer]].

## The groups

| Theme | Source posts | Asset |
|---|---|---|
| [[01-Engraved-Vignette-Footer\|Engraved vignette footer]] | [Adi](https://x.com/adityasur11/status/2096160317458030911) | Copperplate-engraving duotone footer (GLAUX "bookplate" look) |
| [[02-Sticker-Scrapbook-Footer\|Sticker / scrapbook footer]] | [Harshit 1](https://x.com/oiharshit/status/2095863570840125489) · [Harshit 2](https://x.com/oiharshit/status/2096219209550455207) | Playful sticker / torn-paper footer |
| [[03-Rubber-Stamp-Mark\|Rubber-stamp mark]] | [hamburgerai](https://x.com/hamburgerai/status/2090683415104557406) | Minimal multi-color rubber-stamp icon on cream paper — the "svg-style diagram" |
| [[04-Watercolor-Art-Print\|Watercolor art print]] | [Alina](https://x.com/alina_with_ai/status/2096555280306000120) | Premium stationery art-print, centered illustration + handwritten type |
| [[05-Perspective-Typography\|Perspective typography]] | [mrlarus](https://x.com/mrlarus/status/2096547229481759020) | Oversized type deformed by fabric/terrain/mirror/water — landing hero |
| [[06-Hermes-Skill-Stack\|Hermes skill stack]] | [painn](https://x.com/painn_x/status/2095060006127149480) | 19-skill Hermes rebuild list (agent ops, not design) |
| **[[07-Build-Runbook]]** | — | How to recreate any of these in code: fonts, swatches, SVG/CSS idioms, asset pipeline. Reference images in `assets/`. |
| [[08-Editorial-Scene-Footer]] | [alim 1](https://x.com/alimdesigner_/status/2097218379480232086) · [alim 2 (smoke)](https://x.com/alimdesigner_/status/2098305548508684373) | White page + warm arch-bridge scene at the bottom edge + animated smoke layer |
| [[09-Particle-Footer]] | [BenjaminUIX](https://x.com/BenjaminUIX/status/2071245795995836437) | Near-black page, shape/text rendered as drifting sand particles (canvas) |
| [[10-Night-Scene-Footer]] | [andrii](https://x.com/andriidesign1/status/2079542301966135441) | Full-bleed dark navy night scene, one glow, flat silhouettes (pure CSS) |
| [[11-Minimal-Gold-Footer]] | [amna](https://x.com/amnadesignn/status/2075962836036300876) | Cream + muted-gold strip, tiny tracked type, pure CSS |

## The key design insight (SVG vs image)
These looks are **raster by nature** — the charm is the imperfection (hatching, grain, ink bleed, torn paper, offset registration). Do not try to reproduce that in SVG; you get sterile vector slop. Use SVG only for the *crisp* mark (logo, stamp glyph, icon) that must scale; use a compressed raster asset (WebP/AVIF) for the textured illustration. Full reasoning: [[01-Engraved-Vignette-Footer]] §"SVG vs image".

## Assets & build
All 21 reference images + the interactive-stickers demo video live in `assets/` (see manifest in [[07-Build-Runbook]]). Sampled swatches, font stacks, and paste-ready SVG/CSS idioms are in [[07-Build-Runbook]].

**Tags:** #design #inspiration #footer #landing-page #web-design
