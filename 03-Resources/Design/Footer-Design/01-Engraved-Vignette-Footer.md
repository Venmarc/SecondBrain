---
title: Engraved Vignette Footer
date: 2026-09-07
tags:
  - design
  - footer
  - engraving
  - web-design
---

> **One-line Summary**: The premium "bookplate" footer — a copperplate/woodcut engraving illustration in a duotone cream + ink palette, with an elegant letter-spaced serif wordmark. This is the style Victor could not name.

**Source:** [Adi — "Footer design"](https://x.com/adityasur11/status/2096160317458030911) (Guillermo Rauch: "so good"). Three slides. `~7.2k likes`.

## What it is
The footer is a **pictorial seal / engraved vignette**. Classic **copperplate engraving or etching** style: fine linework, cross-hatching, stippling. Strict **duotone** — warm cream/ivory paper + a deep Prussian blue / indigo ink. The top half is negative space carrying the brand wordmark (e.g. **GLAUX**) in an elegant, letter-spaced serif, plus a short tagline; the bottom half is a panoramic engraved landscape (Mediterranean/Tuscan villa, cypress trees, a stone bridge, still water). It reads like a high-end **bookplate, letterpress card, or certificate of authenticity**.

## Why it feels premium (not generic flat)
- **Hand-crafted illusion** — visible hatching mimics the physical labor of an engraver.
- **Print aesthetic** — cream + blue evokes lithography/letterpress; feels archival, not "designed in Figma."
- **Curated type** — classic serif, wide tracking, unhurried.
- **Negative space** — large clean area lets the dense engraving breathe.

## The "diagram" you could not name
The graphic element is an **engraved vignette** (the landscape); in book design that element is a **tailpiece** (decorative art at the end of a chapter). The wordmark is a **logomark / emblem**. The art style is **copperplate engraving / etching / woodcut**. If you want a *single small icon* instead of a full scene, that is a **seal / stamp / pictogram** — see [[03-Rubber-Stamp-Mark]].

## SVG vs image — the brutal truth
This look is **raster by nature**. The whole charm is the hatching, grain, and ink imperfections, which SVG reproduces as a sterile flat vector that reads as "AI slop with extra steps." Image models also will not hand you a *usable* SVG — they emit raster or messy paths.

The honest split:
- **Crisp, scalable mark** (logo, stamp glyph, monogram, icon) → **SVG**. Tiny, must scale 16px→400px, one/two colors. This is what SVG is for. Hand-write it or use an icon library; no image model needed.
- **Atmospheric textured illustration** (engraved scene, watercolor, rubber-stamp ink) → **raster** (WebP/AVIF). Generate it, export a transparent or compressed asset, ship as a static file.

**Performance caveat:** a full-bleed engraved raster footer is heavy and hurts LCP. For a real product footer (Ledger, Momentum), use the look as a **small decorative element** — a seal, a corner ornament, a thin vignette — not a full-bleed background.

**Tags:** #design #footer #engraving #web-design
