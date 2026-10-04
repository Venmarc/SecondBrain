---
title: Night-Scene Footer
date: 2026-09-13
tags:
  - design
  - footer
  - night
  - gradient
  - replication
---

> **One-line Summary**: Full-bleed dark navy night-scene footer — layered silhouettes, one glowing light source, star field, grain. Mood over content.

**Source:** [Andrii](https://x.com/andriidesign1/status/2079542301966135441) — "Footer design" (178 likes).

## What it is (evidence, verified via AGY gemini lane)
Real design: **Afford**, "the AI finance OS for startups" — a dark-mode landing section, not a literal night landscape. Two visual tiers: (1) FAQ tier, two columns — pill tag "FAIR QUESTIONS", headline *"Asked before you asked."*, a founder-support card ("a human replies within a day – usually one of the founders") + "Ask us anything" button; right side an accordion of 5 question cards, one expanded; (2) a large rounded CTA + footer card — *"Stop guessing. Start asking."* + "Get early access", then footer nav: brand column (chevron `^` logo, tagline, AICPA SOC2 Type 2 badge), Product / Company / Stay in Touch columns, legal bar (© 2026 afford | Privacy | Terms). Palette: pitch black + deep navy surfaces, **electric/steel-blue and cyan radial glows** (the lit zone my pixel sampling caught at left-mid, `#0f192a`/`#1c2738`), pure white headings, white pill buttons.

## Replication recipe (100% CSS/SVG, zero images)
1. **Sky:** body of the footer = `linear-gradient(180deg, #050a14 0%, #0f192a 60%, #1c2738 100%)`.
2. **The light:** one radial glow (`radial-gradient(600px 300px at 25% 30%, #4a7ab5 0%, transparent 70%)`, `mix-blend-mode: screen`) — a single light source is what sells "night."
3. **Silhouettes:** 3–4 layered dark shapes (`#060b14`) at the bottom via SVG paths or inset box-shadows — hills/rooftops; flat, no detail (silhouette = dark is enough).
4. **Stars:** a `.star-field` of 30–60 `box-shadow` dots (tiny), 30–70% opacity, or one repeating tiny SVG dot pattern. No flicker without permission.
5. **Grain:** the [[07-Build-Runbook]] §grain turbulence overlay at 3–4% — kills the "flat CSS gradient" tell.
6. **Type:** white at 85–90% opacity, generous letter-spacing, small caps for links; numbers/timestamp in a mono accent if you want a "mission control" note.

**Where it fits:** brand-voice footers (premium, quiet, slightly cinematic). Works at any width; the trick is restraint: one light source, flat silhouettes, subtle grain. It must look *deliberate*, not like a video-game loading screen.

**Assets:** `andrii-night-footer.jpg`.

**Tags:** #design #footer #night #gradient #replication