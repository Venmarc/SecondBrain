---
tags: [design, backgrounds, backdrop-supply, index]
---

# Backdrop Supply

Free backdrop library at `backgrounds.supply/freebies`: 31 named collections, 1359 backgrounds behind a
paid unlock, and 117 of them offered free as previews. This collection turns that site from something you
browse into something an agent can use: every free preview is cached here with its palette sampled, and the
looks that can be rebuilt in code have a verified recipe.

For widgets, page motion, named transitions, and real-app details, see [[03-Resources/Design/UI-Collections/_index|UI Collections]].

## The one thing to know

The site splits into two kinds of asset and they need opposite handling:

- **Procedural looks** (gradients, cosmic, dithered, flat iridescence). Rebuild these in code. No file, no
  download, any resolution, animates for free. Verified working, see family notes 01, 03, 05.
- **Rendered and composed looks** (3D glass ribbons, painted landscapes, statue collages). Cannot be rebuilt
  with a shader. Feed a cached preview to the image tool as a reference and generate a replacement you own.

See [[03-Resources/Design/Backdrop-Supply/04-Stylized-Landscape|04-Stylized-Landscape]] and
[[03-Resources/Design/Backdrop-Supply/06-Surreal-Collage|06-Surreal-Collage]] for the honest limits.

## How an agent uses this

1. **Pick a look by description, not by filename.** The family notes are grouped so you can ask "glowing
   cavern" or "gradient mesh" and land in the right note.
2. **Cache first.** Files live in `assets/<collection>/`. Read `assets/manifest.json` for the local path,
   the source URL, the sampled palette and the resolution. Nothing needs re-scraping.
3. **To pull a specific preview live**, the URL pattern is
   `https://app.backgrounds.supply/api/r2-public/previews/<collection>/<filename>.webp`, no auth needed.
   `assets/inventory-all-previews.json` lists all 117 filenames. Any extra query parameter returns 403, so
   use the path exactly as written. Thumbnails sit at `.../r2-public/thumbs/...`.
4. **To build rather than borrow**, start from [[03-Resources/Design/Backdrop-Supply/08-Build-Runbook|08-Build-Runbook]]
   and the printable demo in `demos/backdrop-foundry/`.

## What the free previews actually are

Every cached preview is a **1200px wide WebP**, not the 3K the site advertises. The pitch claims roughly
2912x1632; the served file is 1200x665 and requesting a larger width from their image endpoint returns
byte-identical output, so 1200 is the source. Fine for cards, decks, OG images and small hero fields.
Marginal for a full-bleed retina hero, generate or upscale for that.

## Collections

| Family note | Slug | Free previews | Cached resolution |
|---|---|---|---|
| [[03-Resources/Design/Backdrop-Supply/03-Cosmic-and-Cavern|Aether Glow]] | `aether-glow` | 4 | 1200,673 |
| [[03-Resources/Design/Backdrop-Supply/07-Animated-Loops|Animated Backgrounds]] | `animated-backgrounds` | 5 | 832,464 |
| [[03-Resources/Design/Backdrop-Supply/05-Dither-ASCII-Stipple|ASCII]] | `ascii` | 4 | 1200,1045 |
| [[03-Resources/Design/Backdrop-Supply/02-Glass-and-Iridescent|Aurorix]] | `aurorix` | 4 | 1200,665 |
| [[03-Resources/Design/Backdrop-Supply/01-Gradient-Mesh|Bloomhaze]] | `bloomhaze` | 5 | 1200,673 |
| [[03-Resources/Design/Backdrop-Supply/02-Glass-and-Iridescent|Chromatica]] | `chromatica` | 4 | 1200,665 |
| [[03-Resources/Design/Backdrop-Supply/03-Cosmic-and-Cavern|Dreamor]] | `dreamor` | 4 | 1200,665 |
| [[03-Resources/Design/Backdrop-Supply/06-Surreal-Collage|Elysian]] | `elysian` | 5 | 1200,672 |
| [[03-Resources/Design/Backdrop-Supply/03-Cosmic-and-Cavern|Etherial]] | `etherial` | 4 | 1200,673 |
| [[03-Resources/Design/Backdrop-Supply/02-Glass-and-Iridescent|Flora]] | `flora` | 2 | 1200,638 |
| [[03-Resources/Design/Backdrop-Supply/01-Gradient-Mesh|Gradience]] | `gradience` | 2 | 1200,673 |
| [[03-Resources/Design/Backdrop-Supply/01-Gradient-Mesh|Gradient BGs]] | `gradient-bgs` | 6 | 1200,673 |
| [[03-Resources/Design/Backdrop-Supply/01-Gradient-Mesh|High-exposure Gradients]] | `high-exposure-gradients` | 4 | 1200,675 |
| [[03-Resources/Design/Backdrop-Supply/03-Cosmic-and-Cavern|Horizon]] | `horizon` | 4 | 1200,665 |
| [[03-Resources/Design/Backdrop-Supply/02-Glass-and-Iridescent|Iridescence]] | `iridescence` | 3 | 1200,665 |
| [[03-Resources/Design/Backdrop-Supply/03-Cosmic-and-Cavern|Nebuluxe]] | `nebuluxe` | 3 | 1200,665 |
| [[03-Resources/Design/Backdrop-Supply/05-Dither-ASCII-Stipple|Nocturne]] | `nocturne` | 5 | 1200,673 |
| [[03-Resources/Design/Backdrop-Supply/04-Stylized-Landscape|Perplex]] | `perplex` | 4 | 1200,673 |
| [[03-Resources/Design/Backdrop-Supply/03-Cosmic-and-Cavern|Portals]] | `portals` | 2 | 1200,673 |
| [[03-Resources/Design/Backdrop-Supply/02-Glass-and-Iridescent|Prismal]] | `prismal` | 2 | 1200,673 |
| [[03-Resources/Design/Backdrop-Supply/06-Surreal-Collage|Reverie]] | `reverie` | 4 | 1200,673 |
| [[03-Resources/Design/Backdrop-Supply/04-Stylized-Landscape|Serenox]] | `serenox` | 5 | 1200,673 |
| [[03-Resources/Design/Backdrop-Supply/01-Gradient-Mesh|Smudge]] | `smudge` | 2 | 1200,673 |
| [[03-Resources/Design/Backdrop-Supply/02-Glass-and-Iridescent|Surrealis - 1]] | `surrealis-1` | 2 | 1200,673 |
| [[03-Resources/Design/Backdrop-Supply/02-Glass-and-Iridescent|Surrealis - 2]] | `surrealis-2` | 2 | 1200,673 |
| [[03-Resources/Design/Backdrop-Supply/02-Glass-and-Iridescent|Surrealis - 3]] | `surrealis-3` | 2 | 1200,673 |
| [[03-Resources/Design/Backdrop-Supply/01-Gradient-Mesh|Swirl]] | `swirl` | 2 | 1200,673 |
| [[03-Resources/Design/Backdrop-Supply/04-Stylized-Landscape|Velvex]] | `velvex` | 4 | 1200,673 |
| [[03-Resources/Design/Backdrop-Supply/02-Glass-and-Iridescent|Velvoura]] | `velvoura` | 3 | 1200,665 |
| [[03-Resources/Design/Backdrop-Supply/04-Stylized-Landscape|Viridian]] | `viridian` | 12 | 1200,673 |
| [[03-Resources/Design/Backdrop-Supply/04-Stylized-Landscape|Zephyr]] | `zephyr` | 3 | 1200,673 |

31 collections, 117 free previews, 31 cached locally (~3 MB) with 117 recorded in the manifest.

## Build notes

Prefer the code recipes in the family notes where the look allows: a shader is resolution-independent,
animates with no download, and carries no file weight. Where a build needs the actual rendered pixel,
generate from a cached preview as reference rather than hotlinking their CDN, because the endpoint 403s on
any parameter and the URL is not ours to depend on.

## Support files

- `assets/manifest.json` - per-collection file, local path, source URL, resolution, sampled palette
- `assets/inventory-all-previews.json` - all 117 free preview filenames by collection
- `engine/` - the generator's shader system: `FRAG_HEADER.glsl`, `VERTEX.glsl`, `modes.json`, `presets.json`
- `demos/backdrop-foundry/` - self-contained demo page plus `preview.png`

## Related
- [[03-Resources/Design/Web-Garnish/_index|Web-Garnish]] - footer and page garnish collection
- [[03-Resources/Design/48-Laws-of-Web-Design|48 Laws of Web Design]]
