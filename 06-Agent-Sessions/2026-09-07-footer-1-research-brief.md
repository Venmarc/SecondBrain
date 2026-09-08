# FOOTER-1 — Non-boring website footers (research brief)

**Ticket:** FOOTER-1 · **Owner:** Schipper · **For:** Victor (via Jeremy)  
**Date:** 2026-09-07 · Public web research (PC offline; no local Halden repo)  
**Lane:** Design craft / create→post. Do not ship or post without Victor’s yes.

Hook from Victor: footers shouldn’t always be boring. He cares about (1) pencil/pen + oil-paint treatments of buildings/photos that keep detail, (2) interactive blue fluffy nonchalant mascot whose eyes follow the cursor, (3) imagination first, agent executes.

---

## A. Technique map

Patterns studios use to make the last band of a site feel intentional:

| Pattern | What it is | Why it works | Public refs |
|--------|------------|--------------|-------------|
| **Illustration band** | Full-width drawing/painting under the link columns (or *as* the footer body) | Ends the page like a print spread, not a spreadsheet | Attestor Capital street scene (bespoke ink/vector city — [jiteshpatel.co.uk](https://jiteshpatel.co.uk/portfolio/attestor-capitol-website/)); Awwwards: *Our West is Whiskey* parallax illustrated footer; *Sandy Shore* “Underground Footer” |
| **Type-as-art / generative canvas** | Typography or lines react to pointer (waves, embossed wordmarks) | Footer becomes a playable object | Codrops **DICH™ Fashion** — canvas footer letters + physics ([tympanus.net](https://tympanus.net/codrops/2025/06/02/dich-fashion-a-new-era-of-futuristic-fashion/)); Interactive typographic wave footer demos |
| **Interactive mascot** | Character lives in/near footer; idle + reacts to cursor | Personality + shareable moment (create→post gold) | Awwwards: *Bike Time* 3D mascot footer; Codrops Valley Adventures / Rive mouse-track characters |
| **Parallax layers** | Foreground/mid/bg art move at different scroll rates | Depth without a full 3D scene | *Our West is Whiskey* footer parallax + illustration |
| **Mega / utility footers with motion** | Many links, but hover reveals, drawers, status | Functional but not dead | Animated-links footers (arrow slide-in); status-dot mega footers — use sparingly for craft posts |
| **SVG draw-on** | Paths animate as if drafted | Fits architecture / atelier brands | Architect templates with stroke-by-stroke elevations (pattern, not a must-copy) |
| **Oversized quiet wordmark** | Huge low-opacity house name + sparse columns | Luxury restraint (Victor already explored this on Halden) | Classic editorial footers; his own Footer_Design_Style recipes (merge when PC returns) |

**Anti-slop:** avoid “four columns + grey logo + social icons + © 2026” with a stock Midjourney sunset. One strong art idea + sparse type beats busy AI collage.

---

## B. Art pipeline — pencil/pen + oil-paint buildings (detail preserved)

Goal: buildings/photos that still read as *that* place (windows, cornice, silhouette), not mushy AI architecture.

### How people actually source the art

1. **Hand → digital (highest craft signal for a post)**  
   Pencil/pen on site or from photos → scan → Illustrator/Photoshop clean → optional light color.  
   Example pipeline: Attestor / Wellington pub work by Jitesh Patel — pencil then vector/digital color ([portfolio](https://jiteshpatel.co.uk/portfolio/the-wellington-pub-illustration/)).

2. **Photo → controlled style transfer (best for AI + accuracy)**  
   Use **image conditioning**, not text-only “oil painting of a building”:  
   - Reference photo of the façade  
   - Structure lock: Flux Depth / Canny / ControlNet-style edge or depth  
   - Style: oil or ink LoRA / “an oil painting” + brush language  
   - Research note: Flux.1 **Redux** + image conditioning keeps massing/façade articulation better than text-only Flux ([Architectural Intelligence / Springer Flux study](https://link.springer.com/article/10.1007/s44223-026-00134-6); ComfyUI facade style-transfer papers)

3. **Hybrid**  
   AI for underpainting → human ink pass over edges → crop for footer strip.

4. **Templates / packs**  
   Stock “cityscape footer SVG” packs exist — fast, usually generic. Fine for learning layout; weak for a distinctive Victor post.

### Starter prompt recipes (always attach a reference photo when possible)

**Oil, keep architecture:**
```text
An oil painting of [building / street], wide cinematic footer crop, eye-level, accurate facade,
clear window grid and roofline, visible cornice and door, muted ivory and charcoal palette,
visible brushstrokes, museum lighting, no people, no text, no warped perspective
```
+ image ref + depth/edge control. Negatives: `blurry windows, melted architecture, fantasy castle, extra floors, illegible facade`

**Pen / pencil line:**
```text
Architectural pen-and-ink drawing of [building], fine hatching, precise elevation,
white paper, no wash muddiness, preserve silhouette and window rhythm, editorial portfolio style
```

**Pencil then light oil wash:**
```text
Pencil construction drawing of [building] with light oil color wash, unfinished sketch energy,
readable structure lines under color, quiet luxury editorial
```

**Footer crop tip:** generate or crop **wide 4:1 / 5:1** strip so links can sit *in* or *above* the art without covering faces of the building.

---

## C. Cursor-follow creature (blue fluffy nonchalant)

### How the effect is usually built

| Approach | Fit | Notes |
|----------|-----|--------|
| **Rive state machine** (preferred for “alive” mascot) | Best | Separate layers: body idle, pupils/eyes; numeric inputs `lookX` / `lookY` (or mouse tracking constraints). React/Next: `@rive-app/react-canvas`. Codrops Valley Adventures; Rive ViewModel `lookX`/`lookY` patterns |
| **CSS/JS dual-eye** | Fast prototype | Two pupil divs; `pointermove` → map viewport to limited eye travel; `prefers-reduced-motion` = park eyes center |
| **Canvas / Pixi** | Custom fluff physics | More control, more code |
| **Lottie** | Weak for live track | Great loops; cursor-follow needs awkward JS workarounds — skip for this |
| **Spline / 3D** | High wow | Bike Time–style 3D footer mascot; heavier on old hardware (Victor’s E6320 caution) |

### Brief for illustrator / image model

**Character:** blue, fluffy, nonchalant — bored-cute, not hustle-bro. Soft silhouette, readable at ~120–200px tall in a footer.

**Must separate layers (for Rive):** head, body, L eye white, R eye white, L pupil, R pupil, optional brows. Flat or soft cel; pupils must be free to move inside whites.

**Mood refs:** “unimpressed cloud,” studio pet that doesn’t care you scrolled this far.

**Prompt sketch:**
```text
Cute fluffy round mascot, soft blue fur, small bored eyes, slight smirk, sitting,
simple shapes, mascot sheet, front 3/4 view, plain background, no text,
layers ready for animation, nonchalant expression
```

**Dev contract:** idle breathe + blink; eyes track pointer with clamp; hover can raise one brow; never block footer links (pointer-events on eyes only or mascot sits beside columns).

---

## D. What to deep-dive next (Victor picks one)

| Rank | Option | Effort | Post-worthiness (create→post) | Why |
|------|--------|--------|-------------------------------|-----|
| **1** | **Interactive blue fluffy mascot footer** (eyes follow cursor) | Medium — character + Rive (or CSS eyes first) + sparse link row | **Highest** — GIF/video of eyes tracking is native X bait; clear craft story | Matches his exact hook; unique language possible via random seed method |
| **2** | **Oil-paint / pen city band footer** | Medium — photo→Flux Redux/Depth or hand ink; wide crop; typography on quiet ivory | **High** — before/after photo→painting carousel posts well | Matches building/oil interest; Halden-adjacent luxury without shipping Halden |
| **3** | **Pen-line architecture strip + quiet type** (no oil) | Lower — line art only | **Medium-high** — craft-process thread | Faster to a post; less “painterly” wow than #2 |

**Recommendation:** Deep-dive **#1 mascot** for the first public post (interaction demo), keep **#2 oil band** as the second post or Halden footer candidate when PC is back. Avoid mega-footer templates as the hero idea.

---

## Sources (sampled)

- Codrops: DICH™ Fashion footer canvas + Spline monster — https://tympanus.net/codrops/2025/06/02/dich-fashion-a-new-era-of-futuristic-fashion/  
- Codrops: Rive mouse tracking (Valley Adventures) — https://tympanus.net/codrops/2025/05/12/integrating-rive-into-a-react-project-behind-the-scenes-of-valley-adventures/  
- Awwwards: Bike Time 3D mascot footer; Our West is Whiskey parallax illustrated footer; Sandy Shore underground footer; House at Khlebny watercolor site craft  
- Jitesh Patel: Attestor Capital / Wellington pub illustration pipelines  
- Flux architectural fidelity / Redux image conditioning — Architectural Intelligence (Springer) Flux.1 study  
- Rive mascot + lookX/lookY ViewModel patterns — DEV / Medium Rive guides  

**Note:** X API search was not used for quotes this pass (billing limits historically). When PC returns, merge with `Documents/Research_files/Footer_Design_Style.md` and Halden footer experiments.

---

## Success for Jeremy → Victor

Hand Victor this brief. Ask him to pick deep-dive **1, 2, or 3**. Schipper executes the chosen deep-dive (moodboards, prompts, tiny interaction demo plan) without posting until he says yes.
