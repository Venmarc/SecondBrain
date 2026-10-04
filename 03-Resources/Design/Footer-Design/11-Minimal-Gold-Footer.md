---
title: Minimal Gold Footer
date: 2026-09-13
tags:
  - design
  - footer
  - minimal
  - gold
  - replication
---

> **One-line Summary**: Cream + muted gold, pure restraint — the cheapest and one of the most effective footers in the batch. Ivory page, gold strip at the bottom, tiny type.

**Source:** [Amna](https://x.com/amnadesignn/status/2075962836036300876) — "Footer Design" (721 likes).

## What it is (evidence)
Two light cream tones dominate (`#f6edd7` + white, ~44% combined), and the bottom row is a solid muted-gold band (`#83733a`, `#94844b`, `#997f3f` — olive-gold, not shiny). So: ivory page, gold terminates the page. "Simple but still awesome" — the entire effect is palette + proportion.

## Replication recipe (pure CSS)
1. **Palette:** page `#f6edd7` (or `#faf0e2`), gold block `#8a7a42` → `#99884b` (subtle vertical gradient), hairline rules `#d8c9a8`, ink `#3d3626`.
2. **Structure:** site content on ivory; the footer is either a gold full-width strip (links in ivory/white, 11–13px, `letter-spacing: .12em`, small caps) or a gold-ink wordmark on ivory with a thin gold hairline above the link row. Pick ONE anchor so it stays simple.
3. **Proportion is the design:** big vertical padding (96–160px), tiny type, one generous gap between the link groups. No borders boxes, no cards, no icons at first pass.
4. **Optional warmth:** 1–2% `feTurbulence` paper grain over the whole footer (see [[07-Build-Runbook]] §grain) — cream + grain reads as letterpress instead of flat.

**Rule from this one:** when the palette is doing the work, add nothing else. Every extra element is an apology.

**Assets:** `amna-gold-footer.jpg`.

**Tags:** #design #footer #minimal #gold #replication