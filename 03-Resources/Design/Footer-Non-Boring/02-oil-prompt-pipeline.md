# Deep-dive 2 — Oil prompt pipeline (Victor’s method)

**Goal:** Real photo **or** real painting → model produces an oil treatment that keeps architectural/photo detail → use a **smaller / wide-cropped** version as footer art. Prompt-driven; distinctive, not mushy AI buildings.

Victor’s framing (2026-09-08): create the oil painting from a real painting/photo, then use the smaller generated version in the footer.

## How it works

```text
[real photo OR real painting]
        │
        ▼
 structure lock (Flux Canny / Depth)  +  style prompt (oil)
   and/or Redux / img2img strength dial
        │
        ▼
 full oil result (hero / process post)
        │
        ▼
 crop wide 4:1–5:1  →  downscale for web  →  footer band under protected text
```

**Why not text-only “oil painting of a building”:** without a reference + structure signal, façades melt (windows, floors, cornice). Flux Tools vocabulary:
- **Canny** — keep silhouette / window grid / outline (best for elevations)
- **Depth** — keep volume / camera geometry / foreground–background
- **Redux** — reference variation / style influence (palette, brush feel) without inventing a new massing

Refs:
- FLUX Tools overview (Canny / Depth / Fill / Redux) — https://voor.ai/flux-tools/
- Flux Tools notes (structural conditioning) — https://sandner.art/flux-tools-new-outpainting-redux-ip-adapter-solution-and-controlnet-loras/
- SwarmUI / community walkthroughs for Redux + Depth/Canny pipelines (Civitai article 9426)

Stay **raster** for oil (WebP/AVIF/JPEG). SVG is for pen-line (dive 3), not brushwork.

## Step-by-step pipeline

1. **Source:** sharp façade or street photo, or a scan of a real painting Victor likes as *style* + a photo for *structure* (two-ref: Redux style + Canny structure when available).
2. **Prep:** straighten verticals lightly; crop distraction; note text-safe sky/upper band.
3. **Generate:** Flux Dev + Canny (or Depth) at moderate structure strength; oil prompt; optional oil LoRA.
4. **Pick:** choose the pass where windows still count as a grid.
5. **Footer crop:** wide cinematic strip; leave quieter paint where links will sit (or add CSS gradient scrim).
6. **Export:** 1× full for process post; 1× compressed footer asset (~1.5–2× DPR max width).

## Prompt recipes

**Oil from photo (structure locked):**
```text
An oil painting of the reference building, wide cinematic footer crop, eye-level,
accurate facade, clear window grid and roofline, visible cornice and door,
muted ivory and charcoal palette, visible brushstrokes, museum lighting,
no people, no text, no warped perspective
```

Negatives: `blurry windows, melted architecture, fantasy castle, extra floors, illegible facade, plastic skin, oversaturated HDR`

**Oil wash over pencil (hybrid look):**
```text
Pencil construction drawing of the reference building with light oil color wash,
unfinished sketch energy, readable structure lines under color, quiet luxury editorial
```

**If source is already a painting (style transfer / Redux):**
```text
Reinterpret the reference painting as a quieter oil study of [subject],
preserve composition and major shapes, softer brushwork, muted palette,
suitable as a website footer band, no added figures, no typography
```

## Layout

- Same text-safe rules as Footer_Design_Style: soft overlay / cloud band for links.
- Oil is busier than SVG line — increase scrim opacity or push paint lower.
- Mobile: crop to a calmer segment; don’t letterbox a noisy full city under 14px type.

## Post angle (create→post)

Carousel that matches Victor’s method:
1. Real photo (or real painting)
2. Oil result
3. Footer mock with the smaller crop

Caption: craft process, not “AI made my site.” One line on Canny/Depth so it reads intentional.

## Effort + pitfalls

- **Effort:** prompt + cherry-pick = hours; good cleanup + footer mock = same day.
- **Pitfalls:** text-only mush; structure strength too low; footer crop cutting faces of the building; posting the full noisy canvas under tiny links.
- **Anti-slop:** one building, muted palette, visible but controlled brush, no stock sunset skyline pack.

## Next executable steps

1. Victor drops 1–2 reference images (photo and/or painting).
2. Run Canny-locked oil batch (4–8); pick one with intact window rhythm.
3. Crop footer strip + scrim mock beside dive-3 SVG for A/B.
4. Export before/after/footer frames for a carousel draft.
5. Hold publish until exact yes.
