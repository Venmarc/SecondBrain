# 02 — Oil prompt pipeline (Victor’s method)

> Preferred path **now**: real photo **or** real painting → oil stylization (image-conditioned) → downscale / crop wide **4:1–5:1** footer strip → place under/behind links. Raster stays raster. Create→post with a before/after carousel.

## Goal

Document a **repeatable, anti-slop oil footer pipeline** that preserves architectural structure (windows, cornices, silhouette) by conditioning on a real reference — not text-only “oil painting of a city.” Output a wide strip suitable behind footer links, with readability protected by overlay / crop. Post the process; don’t need a live site.

Constraints: distinctive; protect text; old laptop → do heavy gen on cloud/GPU box, use light CSS on the demo page; SVG preferred for *line* art (dive 03), **not** for oil paint.

---

## How it works (concrete technique)

### Why image-conditioned beats text-only for architecture

Text-only prompts invent facades: melted windows, floating cornices, “beautiful building” averages. Architecture footers fail when **structure** drifts.

Image-conditioned tools lock composition:

| Tool | Role | Official / primary source |
|------|------|---------------------------|
| **FLUX.1 Redux** | Image variation / restyling adapter — image (+ optional prompt) → stylized cousin | [Introducing FLUX.1 Tools — Black Forest Labs](https://bfl.ai/blog/24-11-21-tools) · weights: [FLUX.1-Redux-dev on Hugging Face](https://huggingface.co/black-forest-labs/FLUX.1-Redux-dev) |
| **FLUX.1 Depth / Canny** | Structural guidance from depth map or canny edges + text | Same BFL post. **API deprecation note:** BFL states Depth & Canny are **deprecated on the BFL API**; open-weight checkpoints remain on Hugging Face for local/Comfy use. Prefer local weights or alternative ControlNets if API-only. |
| **MJ / SD img2img** | Denoise from reference; Midjourney `--sref` / image prompt / retexture-class flows | Product UIs change — treat as “img2img + low denoise + structure ref” pattern |
| **ControlNet Canny/Depth** (SD/Flux community) | Classic edge/depth lock for facades | ComfyUI / Automatic1111 ecosystems; archviz workflows e.g. community Flux tools writeups such as [Flux Tools overview](https://www.stablediffusiontutorials.com/2024/11/flux-tools.html) |

**BFL’s own framing:** Canny/Depth “preserve the original image’s structure through edge or depth maps” for retexturing; Redux “reproduce the image with slight variation” and supports restyling via image + prompt ([BFL Tools announcement](https://bfl.ai/blog/24-11-21-tools)). That is exactly Victor’s architecture need.

### Pipeline (Victor’s method, expanded)

```
[A] Real photo of building/street
        OR
    Real painting / art reference (photo of canvas OK)
            ↓
[B] Optional preprocess: crop to elevation-ish frame; straighten verticals
            ↓
[C] Oil stylization (Redux restyle / Depth|Canny + oil prompt / MJ·SD img2img)
            ↓
[D] Pick best: windows still count as windows
            ↓
[E] Downscale + crop to wide footer strip (4:1 – 5:1), art in lower portion
            ↓
[F] Place under/behind links with text-safe overlay (gradient or solid bar)
            ↓
[G] Export WebP/AVIF (+ PNG master); do NOT vectorize oil
```

### Raster vs SVG

| Asset type | Format | Why |
|------------|--------|-----|
| Oil paint strip | **Raster** (WebP/AVIF, PNG master) | Brush texture is continuous tone; SVG trace becomes muddy blobs or huge path soup |
| Pen/ink elevation | **SVG** (see dive 03) | Line art loves vectors |
| Hybrid | Raster oil + SVG line overlay | Advanced; optional later |

**Rule of thumb:** if it needs impasto / visible brush, stay raster. If it’s pure contour, go SVG.

### Footer placement

- Strip width 100vw; height ~140–240px art visible.  
- Links in upper safe zone (solid or heavy gradient).  
- `object-position: center 70%` (or bottom) so roofs aren’t cropped oddly.  
- Lazy-load the image (`loading="lazy"`) — footer is below the fold.  
- Provide a darker CSS fallback color matching the painting’s average so CLS doesn’t flash white.

---

## Build / art pipeline (step-by-step)

### 1. Gather reference (non-negotiable)

- **Photo:** shoot or license a facade / street you care about. Verticals corrected (Keystone / Lightroom upright).  
- **Painting:** photograph a real oil/acrylic you own or public-domain museum scan (check license).  
- Avoid: random Pinterest “AI building” as the *source* — that doubles slop.

### 2. Pre-crop for footer thinking

Before stylizing, crop a landscape frame that already feels like a strip (roughly 3:1 or wider). Generators struggle to invent a usable 5:1 later if the source is a tall portrait hero.

### 3. Stylize (pick one stack)

**Stack A — Flux Redux restyle (variation + prompt oil)**  
Local Comfy / diffusers `FluxPriorReduxPipeline` pattern per HF card; or BFL API Redux / Ultra restyle where available.

**Stack B — Structure lock**  
Local **Canny or Depth** weights (HF open weights even if API deprecated) + oil prompt; keep control weight high enough that mullions survive (iterate 0.55–0.85 range depending on stack).

**Stack C — Midjourney / SD img2img**  
Low–moderate denoise; image weight high; oil medium words; same negative list every run.

### 4. QA gate (kill bad gens)

Reject if:

- Windows unreadable or “melted”  
- Extra towers / gibberish signage  
- Plastic skin / oversharpen AI sheen  
- Composition no longer matches reference silhouette

### 5. Footer crop

- Canvas 2400×480 (5:1) or 2400×600 (4:1) @2x thinking.  
- Keep interest in lower 60%; leave calmer paint in upper band for type.  
- Mild vignette or painted soft edge optional — don’t crush contrast under text.

### 6. Demo page

Minimal HTML footer: links + © + `<img>` strip. Record carousel frames (see Post angle).

### Hardware note

Run diffusion on a cloud GPU / workstation. The **demo page** should be static HTML + one WebP — friendly to an old laptop. Avoid Three.js/Spline wrappers around a painting.

---

## Prompt recipes or asset brief (exact copy-pasteable)

### Universal oil positive (append to stack)

```
oil painting on linen, visible brushwork, impasto on cornices and rooflines,
architectural facade preserved, coherent window grid, muted natural palette,
museum quality, wide cinematic crop, no frame, no watermark
```

### Architecture photo → oil (structure-preserving)

```
Restyle this reference as a classical oil painting of the same buildings.
Keep exact facade proportions, window rhythm, and roofline.
Painterly strokes; soft atmospheric sky; rich but not neon color.
Orthographic-leaning street elevation feel suitable for a website footer banner.
```

### Real painting → oil variation (tighten / reformat)

```
Oil painting variation of the reference artwork, same composition and subjects,
refined brushwork, slightly clearer architectural edges, harmonious glaze,
wide banner crop, archival quality
```

### Negatives (reuse every run)

```
photoreal photograph, DSLR, HDR, CGI, unreal engine, 3d render,
melted windows, illegible architecture, extra limbs, text, letters, logos,
watermark, frame, border, lowres, oversharpen, plastic skin, anime,
neon cyberpunk, cluttered cars in foreground, fisheye
```

### Midjourney-shaped pattern (adjust to current MJ syntax)

```
[upload ref] classical oil painting of this exact facade, preserved windows and cornice,
visible brushwork, muted earth palette, wide banner --iw <high> --ar 5:1
```

*(Flags/version strings change — prioritize **image ref + low invention**; don’t cargo-cult outdated `--v` numbers.)*

### Flux Redux / Control pattern brief (operator checklist)

```
Input: straightened facade photo
Mode: Redux restyle OR Canny/Depth + prompt
Prompt: (oil positive above)
Negatives: (list above)
Control weight: start 0.7; raise if windows drift; lower if paint looks like photo paste
Seed: lock when you like a candidate; vary for alternatives
Output: pick 1 of 4; then Photoshop crop 5:1
```

### Asset brief for a collaborator

```
Deliver a wide oil-painted architectural strip for a website footer.
Source: provided photo/painting (must remain recognizable).
Aspect: 4:1 to 5:1. Resolution master ≥ 2400px on long edge.
Style: real oil brushwork, not plastic AI. Windows must stay countable.
Leave calmer area in upper 30% for HTML text overlay.
Formats: PNG master + WebP web. Do not vectorize.
```

---

## Named public references (with URLs)

| Ref | Why | URL |
|-----|-----|-----|
| BFL — FLUX.1 Tools (Fill, Depth, Canny, Redux) | Canonical definitions + API deprecation notice for Depth/Canny | https://bfl.ai/blog/24-11-21-tools |
| FLUX.1 Redux [dev] model card | Adapter usage / diffusers sketch | https://huggingface.co/black-forest-labs/FLUX.1-Redux-dev |
| Flux Tools tutorial overview | Practical Redux / Canny / Depth workflow map | https://www.stablediffusiontutorials.com/2024/11/flux-tools.html |
| Our West is Whiskey illustration footer | Raster/illustration footer as brand moment (parallax) | https://www.awwwards.com/inspiration/footer-with-parallax-and-illustration-our-west-is-whiskey |
| Jitesh Patel Attestor | Reminder that *structure-first* architecture art wins (hand analog to conditioning) | https://jiteshpatel.co.uk/portfolio/attestor-capitol-website/ |
| DICH Fashion Codrops | Craft-bar for “footer as art” posts | https://tympanus.net/codrops/2025/06/02/dich-fashion-a-new-era-of-futuristic-fashion/ |

**Not invented as oil-footer case studies:** use the above as *technique* and *footer craft* references. Victor’s oil strip is the novel craft object for the post.

---

## Post angle (what to show on X without shipping full site)

### Before/after carousel recipe

| Slide | Content | Caption beat |
|-------|---------|--------------|
| 1 | Real photo (or painting) reference | “Start from something real.” |
| 2 | Structure map optional (canny/depth preview) | “Lock the windows.” |
| 3 | Oil result full frame | “Oil pass.” |
| 4 | 5:1 crop alone | “Footer crop.” |
| 5 | Crop in fake footer under real link row | “Text still wins.” |
| 6 (optional) | Failed text-only gen vs conditioned | “Why img2img / Redux / Canny.” |

**Hook lines:**

- “Footer oil from a real facade — not a text prompt hallucination.”  
- “Photo → oil → 5:1 crop. Links on top. Windows still windows.”

**Recording tip:** same crop rectangle drawn on before and after so viewers see structure hold.

---

## Effort estimate + pitfalls / anti-slop

| Phase | Estimate |
|-------|----------|
| Ref photo + straighten + first gens | **2–4 hours** |
| Select + crop + footer mock + carousel | **2–3 hours** |
| Iterate to “distinctive, not slop” | **+0.5–2 days** |

**Pitfalls**

- Text-only gens used as final (slop magnet).  
- High denoise → pretty paint, dead architecture.  
- Vectorizing oil with Image Trace (mud).  
- Dark varnish under dark gray links (fail contrast).  
- Full-bleed 4K PNG in the demo (slow old laptop) — serve WebP ~150–300KB.  
- Relying on deprecated BFL **API** Depth/Canny without a local fallback.  
- Claiming museum authorship on a gen that only vaguely resembles the source.

**Anti-slop checklist**

- [ ] Source is a real photo or real painting  
- [ ] Side-by-side shows matching silhouette / window count  
- [ ] Limited, intentional palette (not rainbow HDR)  
- [ ] Visible brush, not plastic sharpen  
- [ ] Footer mock passes contrast on links  
- [ ] Process shown publicly (credibility)  

---

## Next executable steps (Schipper can run)

1. **Shoot or license one facade photo**; straighten verticals; crop a landscape working file.  
2. **Run 4 oil candidates** via Redux restyle *or* local Canny/Depth + oil prompt *or* MJ/SD img2img; reject any with melted windows.  
3. **Crop winner to 5:1**; export PNG master + WebP; drop into a 20-line HTML footer mock with gradient safe zone.  
4. **Build the 5-slide before/after carousel**; post as craft study with the “real reference → oil → crop” hook.  
5. **Park the WebP + mock** in the craft folder for later create→post sequels (dusk palette variant, second street, etc.).
