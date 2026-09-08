# 03 — Pen-line architecture strip (wide footer band)

> Ink / pen elevation as a wide footer illustration band. Preserve window rhythm and silhouette. SVG preferred. Text-safe zone mandatory. Create→post craft demo, not a live ship.

## Goal

Produce a **distinctive pen/ink architectural elevation** that reads as a footer “skyline strip”: wide aspect, crisp lines, enough building detail to feel site-specific (or city-abstract), with a clear **text-safe zone** for links/legal. Prefer **SVG** for sharpness and weight. Show process on X (scan→vector or controlled AI line) so it doesn’t look like generic AI wallpaper.

Fits Footer_Design_Style: art simple enough not to fight text; SVG or sharp low-weight; site-related OR landscape/city abstract OK.

---

## How it works (concrete technique)

### The footer band pattern

Treat the footer as **two horizontal bands**:

1. **Text band (safe zone)** — solid fill, soft cloud/fog wash, or semi-opaque overlay where nav links + copyright live (AA contrast).
2. **Art band** — pen elevation sitting *below* or *behind* the text band; architecture occupies the lower 40–70% of footer height; sky/negative space above roofs keeps type clear.

Public cousins (illustration-heavy footers, not always pen-line):

- [Our West is Whiskey — Footer with parallax and illustration](https://www.awwwards.com/inspiration/footer-with-parallax-and-illustration-our-west-is-whiskey) · site page: [Our West is Whiskey](https://www.awwwards.com/sites/our-west-is-whiskey)
- [Sandy Shore — Underground Footer](https://www.awwwards.com/inspiration/underground-footer-sandy-shore) · case: [TUX — Sandy Shore](https://tux.co/en/work/detail/sandy-shore/) · live: https://sandyshore.ca
- Type-as-art footer energy (different technique, same “footer is a craft moment” bar): [DICH™ Fashion (Codrops)](https://tympanus.net/codrops/2025/06/02/dich-fashion-a-new-era-of-futuristic-fashion/) · demo site: https://dich-fashion.webflow.io/

### Gold-standard architectural line craft (hand→vector)

**Jitesh Patel** documents the exact pipeline Victor wants for pen architecture:

1. On-location / reference study  
2. **Detailed pencil sketch** capturing architectural detail  
3. Digital refine in Photoshop  
4. **Vectorise in Illustrator** for clean, scalable web art  

Attestor Capital (Portland Place street scene for corporate web):  
https://jiteshpatel.co.uk/portfolio/attestor-capitol-website/

Wellington Pub (hand-drawn pen linework + digital colour; print + web):  
https://jiteshpatel.co.uk/portfolio/the-wellington-pub-illustration/

Idea Digital’s Attestor write-up confirms illustration as the site’s differentiating scroll narrative: https://www.idea.ie/work/attestor/

**Takeaway for footer strip:** same craft, cropped to a **wide elevation** (not a deep street perspective). Windows and cornices stay readable at ~160–280px art height.

### Two production routes

#### Route 1 — Hand → scan → vector (highest distinctiveness)

1. Photo walk or licensed reference of a real block / invent a coherent fictional row.  
2. Ink on paper (or Procreate ink brush with pressure) — **line weights:** heavy silhouette, medium floors, light window mullions.  
3. Scan/export 300–600dpi; levels to pure B/W.  
4. Illustrator **Image Trace** (Black and White Logo or Line Art) → Expand → clean stray points.  
5. Or redraw key paths with Pen tool over a locked sketch layer (cleaner for window grids).  
6. SVGO optimize; place as `background-image` or inline `<svg>` under the text overlay.

#### Route 2 — AI line with **edge control** (faster, higher slop risk)

Use structure-conditioned generation, then **force it back into vector**:

- Prefer **Canny / lineart ControlNet** (or Flux Canny open weights historically — see oil dive for deprecation notes) so window grids survive.  
- Prompt for *pen and ink architectural elevation, continuous line, no fill / hatch sparingly*.  
- **Always** post-process: threshold → vectorize → hand-fix broken windows.  
- Never ship the raw raster as “SVG craft.”

**Why edge control matters:** text-only “ink city skyline” prompts invent random window rhythms and melted cornices — the anti-pattern of AI-slop footers.

### Keeping window rhythm / silhouette

Architectural readability at footer scale lives in **repetition + skyline**:

| Keep | Drop / simplify |
|------|------------------|
| Consistent floor-to-floor spacing | Interior furniture visible through windows |
| Vertical bay rhythm (A–B–A or equal bays) | Tiny ornament that becomes noise at 200px |
| Strong ground-floor base + roof silhouette | Perspective vanishing that fights a flat strip |
| Occasional landmark break (tower, pediment) | Five competing hero buildings |

**Composition tips for a 4:1–6:1 strip**

- Draw as a **flat elevation** (orthographic), not a dramatic 2-point perspective.  
- Align baseline of all buildings on one ground line.  
- Vary heights in a gentle skyline curve (low–high–mid), not random spikes.  
- Windows: draw a **module** (e.g. 2×3 pane) and duplicate; irregularity = hand craft, chaos = slop.  
- Leave **20–35% empty sky** at top of the art band for the text overlay.

### Text-safe zone layout

Three proven layouts:

1. **Cloud / fog band** — soft white-to-transparent gradient over the upper third of the SVG; links sit in the opaque zone.  
2. **Solid overlay bar** — `background: #111` (or brand paper) strip 64–88px tall; art peeks below.  
3. **Split footer** — links in a clean row; full-bleed pen strip only under the legal line (Sandy Shore “underground” energy, but with ink instead of roots).

CSS sketch:

```css
.footer {
  position: relative;
  color: #f5f0e8;
}
.footer__safe {
  position: relative;
  z-index: 2;
  padding: 1.25rem 1.5rem 1rem;
  background: linear-gradient(
    to bottom,
    #1a1a1a 0%,
    #1a1a1a 70%,
    rgba(26, 26, 26, 0.85) 100%
  );
}
.footer__art {
  display: block;
  width: 100%;
  height: auto;
  max-height: 220px;
  object-fit: cover;
  object-position: center bottom;
  pointer-events: none;
}
```

### SVG optimization notes

Unoptimized Illustrator/Figma exports carry metadata and insane float precision — bad for a full-width footer path dump.

Practical rules (industry SVGO guidance, e.g. [SVG Optimization for Developers (2026)](https://vectosolve.com/blog/svg-optimization-techniques-developers-2026), [yutils SVG guide](https://yutils.jdgrid.com/en/guides/svg-optimization)):

- Run **SVGO** with `multipass: true`.  
- **Keep `viewBox`** (`removeViewBox: false`) — required for responsive scaling.  
- `floatPrecision: 2` for UI icons; **`3` for detailed architecture**.  
- Strip editor metadata / hidden layers.  
- Prefer **external** `.svg` for a large strip (cacheable); inline only if you need CSS `currentColor` theming on strokes.  
- One stroke color + occasional hatch group beats 40 clipped groups.  
- Target: **under ~150–250KB** uncompressed for a detailed strip; gzip/brotli will crush further. If larger, simplify window mullions or split mid/foreground.

```js
// svgo.config.js — architecture strip friendly
module.exports = {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
          // convertPathData floatPrecision set via plugin options as needed
        },
      },
    },
    { name: 'removeDimensions', active: true },
  ],
};
```

---

## Build / art pipeline (step-by-step)

### A. Hand craft (recommended for create→post credibility)

1. Pick subject: real block you photographed **or** coherent fictional street (Attestor / Wellington spirit).  
2. Thumbnail 3 skylines at 6:1; choose clearest window rhythm.  
3. Ink final at wide format (e.g. 420×70mm or 4000×800px digital).  
4. Scan → threshold → Image Trace **or** manual Pen redraw of silhouette + windows.  
5. Separate layers in SVG: `silhouette`, `windows`, `details`, `ground`.  
6. SVGO → drop into footer mock with safe-zone overlay.  
7. Optional micro-motion for post only: CSS `translateY` parallax 4–8px on scroll (respect reduced motion) — see Our West is Whiskey parallax footer inspiration.

### B. AI-assisted line (speed path)

1. Start from **photo** of architecture (same as oil pipeline philosophy — structure first).  
2. Extract edges (Canny / lineart).  
3. Generate pen elevation with strong edge weight; desaturate.  
4. Vectorize; **manually** repair window grid for at least the 3 central bays.  
5. Proceed as hand path from SVGO onward.

### Demo page for the craft post

- Sticky-bottom footer on a short dummy landing (headline + 2 paragraphs).  
- Desktop 1440 capture + phone crop.  
- Toggle: “safe zone on/off” to prove readability (great carousel slide).

---

## Prompt recipes or asset brief (exact copy-pasteable)

### Hand-ink asset brief

```
Format: wide architectural ELEVATION strip for website footer, aspect ~5:1.
Style: pen and ink, black line on paper/transparent, varied line weight.
Content: continuous row of buildings on one ground line; readable window modules;
clear roof silhouette; leave upper 25–35% as empty sky for text overlay.
Detail: cornices, shopfronts, chimney rhythm OK; no cars, no tiny people unless 2–3 silhouettes max.
Deliverable: layered SVG (silhouette / windows / detail) + PNG preview @2x.
Avoid: perspective vanishing, watercolor wash muddying windows, photoreal shading.
```

### AI line starter (image-conditioned — feed photo or canny map)

```
Positive:
pen and ink architectural elevation drawing, continuous building row,
orthographic facade, clear window grid rhythm, varied line weight,
black ink on white, etching quality, skyline silhouette, wide panorama,
empty sky upper third, no people, no text

Negative:
photoreal, color photo, watercolor blobs, isometric, 3d render, messy scribbles,
illegible windows, melted architecture, watermark, logo, busy sky, cars, trees filling sky
```

### Control settings (pattern — tool-specific UI varies)

```
Edge / Canny strength: high (preserve mullions)
Denoise / creativity: low–mid (structure > invention)
Aspect: 5:1 or 4:1
Post: threshold → vectorize → hand-fix
```

---

## Named public references (with URLs)

| Ref | Why | URL |
|-----|-----|-----|
| Jitesh Patel — Attestor Capitol | Pencil → digital → Illustrator vector for web architecture | https://jiteshpatel.co.uk/portfolio/attestor-capitol-website/ |
| Jitesh Patel — Wellington Pub | Pen linework + architectural accuracy for hospitality | https://jiteshpatel.co.uk/portfolio/the-wellington-pub-illustration/ |
| Idea Digital — Attestor | Illustration as site differentiator | https://www.idea.ie/work/attestor/ |
| Our West is Whiskey footer | Parallax + illustration footer pattern | https://www.awwwards.com/inspiration/footer-with-parallax-and-illustration-our-west-is-whiskey |
| Sandy Shore underground footer | Footer as branded illustrative moment | https://www.awwwards.com/inspiration/underground-footer-sandy-shore |
| DICH Fashion Codrops | High craft footer / type experiment bar | https://tympanus.net/codrops/2025/06/02/dich-fashion-a-new-era-of-futuristic-fashion/ |
| SVGO optimization practice | Keep viewBox, precision, multipass | https://vectosolve.com/blog/svg-optimization-techniques-developers-2026 |

**Live site note:** Attestor’s corporate domain has been cited as attestorltd.co.uk / Attestor.com in case write-ups; treat portfolio pages above as the reliable sourced references if the live marketing site has changed.

---

## Post angle (what to show on X without shipping full site)

**Carousel (4–5 slides):**

1. Ink or pencil close-up (hand = anti-slop proof).  
2. Full wide strip on transparent / paper.  
3. Footer mock with links (safe zone ON).  
4. Same mock with safe zone OFF (show why the overlay exists).  
5. Optional: SVG node count / KB before→after SVGO (nerd bait).

**Hook lines:**

- “Footer skyline that still has windows, not AI mush.”  
- “Pen elevation → SVG. Links on top. Cornices intact.”

---

## Effort estimate + pitfalls / anti-slop

| Path | Estimate |
|------|----------|
| AI edge → vector → repair | **1–2 days** |
| Full hand ink → vector | **2–5 days** |

**Pitfalls**

- Perspective strip that can’t crop cleanly to 5:1.  
- Window noise at mobile width (mullions merge into mud).  
- Dark ink under dark text (no safe zone).  
- Shipping 2MB unoptimized SVG.  
- Parallax on old laptops without `prefers-reduced-motion` gate.  
- Calling a Midjourney skyline “bespoke illustration” without redraw — audience smells it.

**Anti-slop**

- [ ] Orthographic elevation, one ground line  
- [ ] Repeated window module with intentional irregularities  
- [ ] Hand-fixed central bays even if AI-started  
- [ ] SVGO’d, viewBox intact  
- [ ] Contrast-checked link row  

---

## Next executable steps (Schipper can run)

1. **Photo walk or pull 3 licensed facade refs**; crop a temporary 5:1 contact sheet for composition.  
2. **Ink one 5:1 elevation** (paper or Procreate) focusing on silhouette + window module only — skip tiny ornament.  
3. **Vectorize** (Image Trace or Pen redraw); split `silhouette` / `windows`; run SVGO; note file size.  
4. **Build a one-page footer mock** with solid safe-zone bar + SVG strip; screenshot desktop + mobile.  
5. **Post carousel** (process → strip → safe zone on/off); save the SVG as the reusable craft asset for later site work.
