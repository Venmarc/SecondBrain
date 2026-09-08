# Deep-dive 3 — Pen-line architecture strip footer

**Goal:** A wide pen/ink (or clean SVG line) elevation/skyline band under footer links. Detail stays readable (window rhythm, silhouette). SVG-first per Victor’s Footer_Design_Style.

## How it works

Footer = **text-safe band** (soft fill / “cloud” / solid) sitting on top of a **full-bleed line-art strip** (4:1–5:1 crop). Illustration is quieter under type, sharper at the bottom edge.

Public craft refs (illustration-as-footer / hand line for web):
- Jitesh Patel — Attestor Capital streetscape for web; Wellington pub pencil→digital pipeline — https://jiteshpatel.co.uk/portfolio/attestor-capitol-website/ · https://jiteshpatel.co.uk/portfolio/the-wellington-pub-illustration/
- Awwwards patterns: illustrated / parallax footers (*Our West is Whiskey*, *Sandy Shore* “Underground Footer”) — use as layout references, not clones
- Stock line skylines exist (SVG.now, GetIllustrations packs) — fine for layout tests; weak for a distinctive Victor post

## Build / art pipeline

### A. Hand → vector (highest craft signal)

1. Photo or on-site sketch of a building / street Victor cares about.
2. Pencil/pen elevation — prioritize silhouette + window grid + cornice.
3. Scan → Image Trace / manual vector in Illustrator/Inkscape.
4. Simplify paths; separate layers: skyline fill (optional), stroke lines, accent marks.
5. Export SVG; strip junk metadata; inline or `<img>` in footer.
6. CSS: place SVG `bottom:0; width:100%;` under a padded link grid with backdrop or gradient fade for text.

### B. Photo → controlled line (AI assist)

1. Straight façade photo (eye-level, minimal lens warp).
2. Edge lock: Canny / lineart preprocessor (Flux Canny or classic ControlNet lineart).
3. Prompt for pen-and-ink / architectural hatch — keep structure strength high so windows don’t melt.
4. Manual cleanup in vector or raster→SVG (autotrace only if cleaned).
5. Crop to wide strip; leave headroom for type.

### C. Template SVG (learning only)

Use a generic skyline SVG to prototype text-safe layout, then replace with custom line art before any post.

## Prompt recipes

**Pen elevation (with reference photo + edge control):**
```text
Architectural pen-and-ink drawing of [building], fine hatching, precise elevation,
white paper, no wash muddiness, preserve silhouette and window rhythm,
editorial portfolio style, wide footer crop
```

Negatives: `blurry windows, melted architecture, fantasy castle, extra floors, watercolor bleed, photoreal, text, watermark`

**Pencil construction (optional mid-step):**
```text
Pencil construction drawing of [building], light construction lines, accurate facade proportions,
clear window grid, architectural sketchbook, white background
```

## Layout rules (from Footer_Design_Style + this dive)

- Default **SVG**; keep file light (dedupe paths, no embedded bitmaps unless necessary).
- Art must stay **simple enough** that footer copy still communicates.
- Text zone: top third of footer = soft overlay / solid; art denser in lower third.
- Mobile: allow SVG to crop sides or swap to a shorter segment; never shrink type into the hatch.

## Post angle

1. Process carousel: photo → pen pass → SVG in footer mock.
2. Or single shot: “footer as elevation drawing” with before/after layout.
3. Tie to craft method: random alphanumeric seed defining stroke weight / hatch angle for a unique language.

## Effort + pitfalls

- **Effort:** Template layout = hours. Custom building elevation = 1–2 days (hand) or same-day with disciplined AI+cleanup.
- **Pitfalls:** Busy hatch under links; AI mushy windows; huge SVG path soup; copying stock skyline as the “hero” of a post.
- **Anti-slop:** one building or one street; limited stroke weights (1–2); no random city collage.

## Next executable steps

1. Pick one real building photo (Victor’s city / Halden-adjacent architecture).
2. Run pen prompt + Canny (or hand-ink one elevation).
3. Vector-clean → SVG footer mock with protected text band.
4. Compare 2 stroke styles; keep the quieter one.
5. Draft craft post from process frames (no publish until yes).
