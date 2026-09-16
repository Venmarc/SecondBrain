---
tags: [design, backgrounds, backdrop-supply, code-replicable]
---

# Animated Loops

Looping 4K video backdrops, some with audio, including an animated ASCII landscape.

## Source collections
- Animated Backgrounds (`animated-backgrounds`), 5 free previews

## Palette (sampled from the cached freebies)
- **Animated Backgrounds** (832,464): `#181818 #303048 #303054 #241818 #302448`

## What it looks like
Looping 4K video backdrops, some with audio, including an animated ASCII landscape.

## Replicable in code?
**PARTIAL. Their MP4s are gated, but the shader route is better anyway.**

The freebies page exposes 10 files for this collection and all 10 are WebP stills; no MP4 appears anywhere in the public preview data. Verified by parsing the page payload.

## Recipe
The free tier exposes only still WebP previews of these, the MP4s sit behind the paid unlock. For a build, do not chase the video: the shader engine animates by default, every mode takes a speed or flow uniform, and a shader loop ships as a few KB of GLSL instead of a multi-megabyte video file with an LCP cost. Only reach for video when the motion is genuinely not procedural.

## Cached assets
- `assets/animated-backgrounds/ascii-art-2.webp` (source `https://app.backgrounds.supply/api/r2-public/previews/animated-backgrounds/ascii-art-2.webp`)

## Related
- [[03-Resources/Design/Backdrop-Supply/_index|Backdrop Supply index]]
- [[03-Resources/Design/Backdrop-Supply/08-Build-Runbook|Build runbook]]
- [[03-Resources/Design/Web-Garnish/_index|Web-Garnish]] (sibling collection, decorative page furniture rather than full-bleed backdrops)
