# Effects Glossary

> **One-line Summary**: Visual effect names mapped to plain-language labels + techniques and performance cost — companion to [[03-Resources/Tools/Effects_Playbook|Effects Playbook]].

Translation table: **what you see** → **how it’s built**. Purpose is to eliminate vibe-based handoffs. Every entry must have **Literal**, **Technique**, and **Cost** filled in before it counts as “known” — if you can’t fill Technique/Cost, check devtools first, don’t guess.

Structured per-technology, matching `ANTI_PATTERNS.md`. Each entry is tagged `[Depth]`, `[Motion]`, `[Layout]`, or `[Perf]` — filter by searching the tag, not separate files.

**Status key (gates — do not skip):**

| Status | Means |
|--------|--------|
| `untested` | Guessed or described from vibes only — no live inspect yet. |
| `extracted` | **Default after reverse-engineering a real site.** Technique + cost filled from devtools/Playwright; **no lab demo yet.** |
| `tried` | We built a **demo** (usually under `~/Pastries/`) that exercises the effect. |
| `adopted` | Shipped in a real product project (Ledger, Momentum, etc.), not only a sandbox. |

Wrong: marking something `tried` just because it was extracted. Extraction alone → `extracted`.

---

## Agent rule: names (mandatory)

When using this glossary (writing, planning, implementing, or talking to Victor):

1. **Lead with the Literal line** — the plain one-liner a human can picture without jargon.
2. **Then Technique** — how to build it (APIs, CSS, libraries).
3. **Then Cost / status / options** — everything else.

Do **not** open with only a jargon title (“progressive multi-layer blur”, “radial mask”). Titles stay for search/tags; the **Literal** sentence is the shared language.

### Entry shape

```
- **[Tag] Short search title** —
  **Literal:** One sentence, everyday words. What it looks like / does.
  **Technique:** How it’s implemented (enough to rebuild).
  **Cost:** …
  **Options (not base form):** optional variants / product customizations — keep short; do not invent new top-level effects for every prop.
  — `status`
```

### Base form vs customization

- **Base form** = the minimum that makes the effect *itself* (e.g. glow sticks to the cursor while the pointer is over the card).
- **Options** = rest position, ease-back, delay/trail, colors, counts — document as a short **Options** line under the same entry.
- Do **not** add a new glossary effect for every customization. Prefer one entry + options.

---

## Motion tokens (use, don't redefine)

Every extracted Technique should tag the easing/duration it uses by **token name**, not an ad-hoc `cubic-bezier(...)`. The canonical tokens live in the shared motion reference at `~/.agents/skills/_shared/MOTION-STANDARDS.md` (the file the `motion-router`, `improve-animations`, and `review-animations` skills all load):

```css
:root {
  --ease-out:    cubic-bezier(0.23, 1, 0.32, 1);   /* strong ease-out — entrances, UI interactions */
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);    /* on-screen movement / morph */
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);     /* iOS-like drawer / sheet */
}

:root {
  --duration-fast:   150ms;   /* press feedback */
  --duration-normal: 200ms;   /* default UI transition */
  --duration-slow:   280ms;   /* entrances / larger surfaces */
}
```

Rules:

- When an extracted effect specifies a transition, write the **token name** (e.g. `transition: transform var(--duration-normal) var(--ease-out)`), not the raw curve. This keeps extracted curves consistent with what the build will ship.
- If the source site uses a curve that genuinely differs from these tokens (e.g. a drawer with a specific Ionic curve), document the literal `cubic-bezier(...)` once in the Technique line **and** add a note: `differs from --ease-* — adopt as a new token only if shipped to a real project`.
- Don't add new `--ease-*` tokens to this file casually — they propagate from `MOTION-STANDARDS.md`. If a new token is warranted, raise it as a standards change, not a glossary edit.

**Framer Motion / Motion library:** avoid by default, justify to use — see the library rule at the top of `MOTION-STANDARDS.md`. Most extracted effects use CSS + WAAPI + IntersectionObserver; document any Framer Motion use with the justification (gesture-driven interruptible motion, multi-element orchestration the View Transitions API can't cover).

---

**Identification cheat sheet** (eye vs devtools):

- Sharp at any zoom = vector (CSS/SVG). Soft/blurry when zoomed = raster image.
- Flat line art = usually SVG. Photographic detail / statues / photos = usually a real image.
- Smooth 3D spin, particles, jumping arcs on a globe = Canvas/WebGL — check scripts/network, not computed styles alone.
- Unsure → inspect, don’t guess.

---

## CSS

- **[Depth] Soft glow band behind text** —
  **Literal:** A fuzzy colored light sitting behind a headline so it feels lit, not flat.
  **Technique:** Linear/conic gradient blob, `filter: blur(60–100px)`, `position: absolute`, opacity 10–25%, z-index behind text. Animate only `transform`/`opacity`.
  **Cost:** Near-zero if static.
  — `untested`

- **[Depth] Soft light pooled at the bottom of a section** (Venmarc) —
  **Literal:** A gentle glow along the bottom edge of each block of the page, like light under a shelf.
  **Technique:** Absolute child at section bottom: `bottom-[-120px] left-1/2 h-[320px] w-[120%] -translate-x-1/2 blur-[120px]` + `radial-gradient(circle at 50% 100%, …)`. Theme via dark/light rgba. Parent `relative` + often `overflow-hidden`.
  **Cost:** Cheap if static; one blur layer per section max.
  — `tried`

- **[Layout] First screen fills the browser window** (Venmarc) —
  **Literal:** The top of the site is exactly one screen tall; you only see the next section after you scroll.
  **Technique:** First section `min-h-[100dvh]` + flex center; **not** `position: fixed` on the hero. Nav is fixed separately. Prefer `100dvh` over `100vh`.
  **Cost:** Near-zero CSS.
  — `tried`

- **[Depth] Frosted glass panel** —
  **Literal:** A see-through panel that blurs whatever is behind it, like frosted glass.
  **Technique:** `backdrop-filter: blur(Npx)` + semi-transparent fill + light border.
  **Cost:** Can lag if huge; keep panels modest.
  — `untested`

- **[Depth] Dark edges / vignette** —
  **Literal:** The middle of the frame is clearer; corners fade darker so focus stays center.
  **Technique:** `radial-gradient` transparent center → dark edges; optional `mix-blend-mode: multiply`.
  **Cost:** Free.
  — `untested`

- **[Depth] Dot or grid wallpaper** —
  **Literal:** A repeating pattern of tiny dots or a grid, no image file needed.
  **Technique:** `background-image: radial-gradient(circle, color 1px, transparent 1px)` + `background-size`.
  **Cost:** Free.
  — `untested`

- **[Depth] Light that follows the mouse (page/area)** —
  **Literal:** A soft spotlight that moves with the cursor over a large area.
  **Technique:** `radial-gradient` placed with CSS vars (`--x`, `--y`) updated on `mousemove` (rAF-throttled).
  **Cost:** Cheap if throttled.
  **Options (not base form):** trail/lerp delay; rest position when pointer leaves — product choice, not a new effect.
  — `untested`

- **[Depth] Warm glow on a card that sticks to the cursor** (fin.com) —
  **Literal:** When you move the mouse over a dark card, a soft warm light sits right under the pointer (no lag in the base form).
  **Technique:** Card `position: relative; overflow: hidden; contain: layout paint`. Pseudo or child: `width/height ~400px; border-radius: 50%; background: radial-gradient(circle, #886e5e 0, transparent 70%); mix-blend-mode: screen; opacity ~0.2; left/top: var(--spot-x)/var(--spot-y); transform: translate(-50%,-50%)`. Pointer sets vars relative to the card. On fine pointer hover, disable long transitions so it snaps to the cursor. **Mobile:** hide glow on coarse pointer.
  **Cost:** Near-zero.
  **Options (not base form):** *Rest position* — default `--spot-x/y` (center, bottom, corner); on `mouseleave`, ease vars back to that rest over ~0.4–0.8s. *Trail/delay* — only if product asks. Do not treat rest/return as a separate glossary effect.
  — `tried`

- **[Depth] Background texture only shows in a soft oval (scroll moves the oval)** (fin.com) —
  **Literal:** The fancy background (e.g. hex codes) isn’t full-screen evenly — it appears inside a soft oval spotlight that drifts as you scroll.
  **Technique:** Full-bleed layer + `mask-image: radial-gradient(ellipse var(--background-mask-radius-x) var(--background-mask-radius-y) at var(--background-mask-x) var(--background-mask-y), black 0, black 58%, transparent 100%)`. Scroll JS writes the CSS variables.
  **Cost:** Free if vars update on rAF.
  — `tried`

- **[Depth] Text with a soft hole so the scene shows through** (fin.com) —
  **Literal:** Paragraphs look like they’re written around a clear circular window; you see the globe (or whatever is behind) through the middle of the words.
  **Technique:** Inverted radial mask: transparent center (hidden text), opaque rim (visible text). Vars `--narrative-mask-x/y/inner/outer` updated on scroll. Fixed scene at lower z-index. Often `margin-top: -60dvh` so copy overlaps the scene.
  **Cost:** Mask compositing — OK if you don’t thrash layout props.
  — `tried`

- **[Layout] Stuff stacked: background, then scene, then words** (fin.com) —
  **Literal:** The page has layers like paper — decoration in the back, a fixed animated scene in the middle, real text and buttons in front so you can still click them.
  **Technique:** z-0 fixed decorative bg → z-1 fixed canvas/WebGL (`pointer-events: none` on wrapper) → z-2 relative scrolling HTML → optional z-10 fixed HUD → z-100 fixed header.
  **Cost:** Stacking free; pay for canvases only.
  — `tried`

- **[Depth] Dark soft oval so text stays readable over a bright picture/3D** (fin.com) —
  **Literal:** A blurry dark blob behind logos or stats so white text doesn’t get lost on a bright globe or photo.
  **Technique:** Absolute/fixed ellipse: dark radial-gradient + `filter: blur(20px)` + `pointer-events: none`. Smaller scrims on industry cards.
  **Cost:** One blur layer each — keep few.
  — `tried`

- **[Depth] Frosted nav that fades out as it goes down** (fin.com) —
  **Literal:** The top menu sits on a soft blur that is strong under the logo row and fades away lower down — not one hard frosted bar.
  **Technique:** 3–4 short stacked layers under the header, each with different `backdrop-filter` blur (e.g. 40 / 16 / 8) and a vertical `mask-image` gradient. Parent `fixed; z-index: 100; isolation: isolate`.
  **Cost:** Multiple backdrop-filters — keep height short, ≤4 layers.
  — `tried`

- **[Motion] Things fade/slide in when you scroll to them** —
  **Literal:** Blocks appear as they enter the screen instead of all being visible at once.
  **Technique:** `IntersectionObserver` + class → CSS `transition` on `opacity`/`transform`.
  **Cost:** Free — rarely needs Framer Motion.
  — `untested`

- **[Motion] Endless sideways logo strip** —
  **Literal:** Names or logos crawl sideways forever, like a stock ticker.
  **Technique:** `@keyframes` translateX; duplicate content for seamless loop.
  **Cost:** Free, no JS.
  — `untested`

- **[Motion] Logo strip that fades at the sides and disappears as you start scrolling** (fin.com) —
  **Literal:** Partner logos slide sideways; left/right edges fade out; the whole strip fades away after a little scroll.
  **Technique:** Transform marquee + `mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)`. Exit: `animation-timeline: scroll(root); animation-range: 0 125px`.
  **Cost:** Free when Scroll-Driven Animations exist; static fallback otherwise.
  — `tried`

- **[Motion] Two cards that tilt into place as you scroll** (fin.com) —
  **Literal:** Two panels start crooked and slide/rotate flat when the section hits the viewport — like a book cover opening.
  **Technique:** Sticky stage (`min-height: ~125vh` + sticky content). `animation-timeline: view()`; keyframes e.g. `rotate: 15deg` → `0` (and −15deg on the other). Change angle by editing those numbers. Mobile portrait: kill animation, stack full width.
  **Cost:** Near-zero JS when supported.
  — `tried`

- **[Motion] Stats bar that appears fixed at the bottom mid-story** (fin.com) —
  **Literal:** Numbers (speed, cost, uptime) fade in and stick to the bottom of the screen during a chapter, then leave.
  **Technique:** `position: fixed; bottom: 0; z-index: 10; will-change: opacity, translate`; toggle opacity/translate from scroll progress.
  **Cost:** Cheap.
  — `tried`

- **[Motion] List items enter one after another** —
  **Literal:** A list doesn’t pop in all at once — each row waits a beat after the last.
  **Technique:** `animation-delay` per item or IO + CSS delay vars.
  **Cost:** Free.
  — `untested`

- **[Motion] Section sticks while you scroll** —
  **Literal:** A block pins to the screen for a while as content moves, then releases.
  **Technique:** `position: sticky` (simple cases).
  **Cost:** Free.
  — `untested`

- **[Motion] Rule: only move and fade things, don’t resize the box** —
  **Literal:** Animations should slide/fade/scale with GPU-friendly properties so the page doesn’t feel laggy.
  **Technique:** Animate `transform` and `opacity` only — never `height`/`width`/`top`/`left`/`margin` for motion.
  **Cost:** N/A (discipline).
  — `untested`

## SVG

- **[Depth] Soft multicolor mesh background** —
  **Literal:** A smooth blended-color backdrop, not a photo.
  **Technique:** Layered radials or SVG blur blobs (Haikei etc.). Don’t rebuild on scroll.
  **Cost:** Cheap if static.
  — `untested`

- **[Depth] Film grain / noise** —
  **Literal:** Fine speckles over the UI so it feels less digital-flat.
  **Technique:** SVG `feTurbulence` or tiny tiled PNG.
  **Cost:** Very cheap.
  — `untested`

- **[Depth] Soft blob shape** —
  **Literal:** An organic rounded shape used as decoration.
  **Technique:** SVG path / `clip-path`; morph carefully if at all.
  **Cost:** Static cheap.
  — `untested`

- **[Depth] Sharp flat icons** —
  **Literal:** Crisp icons that stay sharp when zoomed.
  **Technique:** SVG paths; style with CSS fill/stroke.
  **Cost:** Free.
  — `untested`

## Raster Images

- **[Depth] Photo with gradient on top for depth** —
  **Literal:** A real picture (or detailed illustration) with a color wash so text can sit on it.
  **Technique:** Optimized AVIF/WebP + CSS gradient; optional parallax translate. Lazy-load + size attributes.
  **Cost:** Heaviest option — only when content is truly photographic/illustrated.
  — `untested`

- **[Depth] Photo cards with a dark fade for the title** (fin.com) —
  **Literal:** Tall image cards (e.g. statues) with a dark soft wash so the label is readable.
  **Technique:** CMS image (Sanity width/format params), `loading=lazy`, `object-fit: cover`, radial scrim + title.
  **Cost:** Image bytes — always lazy + width-capped.
  — `tried`

- **Decision rule:** Prefer CSS/SVG unless you need real photographic/illustrated detail.

## Canvas / WebGL

- **[Depth+Motion] Spinning 3D planet** (fin.com) —
  **Literal:** A globe that slowly turns in 3D behind (or under) the page text.
  **Technique:** WebGL canvas (fin.com: TresJS 5.2 + Three r183), fixed full-viewport layer, textures for land/stone. Identification: canvas + `webgl`/`webgl2`, library fingerprints in network.
  **Cost:** Heavy GPU + texture weight; one canvas; mobile fallback plan required.
  — `tried`

- **[Motion] Jumping connection lines (draw-on arcs)** (fin.com — lab verified) —
  **Literal:** Thin bright lines that *shoot* from one point to another in less than a second (half-drawn mid-flight), then vanish and jump somewhere else — not steady glowing roads.
  **Technique:** (1) Build a curve between two points — great-circle/bezier on a **globe**, or quadratic bezier in **flat screen space**. (2) Animate draw progress 0→1 by revealing only the first N% of the path (`BufferGeometry.setDrawRange`, or SVG/canvas stroke dash, or partial polyline). (3) Optional bright “head” at the tip. (4) Hold briefly, fade, pick new endpoints, repeat. Stagger several arcs.
  **Surface:** **Same effect on a globe or any surface** (viewport overlay, map, dashboard). Globe only supplies endpoints in 3D; the jump is the draw animation.
  **Not the same as:** static full routes that only pulse opacity.
  **Cost:** Cheap in 2D canvas; modest in WebGL if arc count stays low (few concurrent draws).
  **Lab:** `GlobeScene` (3D) + `JumpingArcs2D` + route `/arcs` (fixed viewport, long page).
  — `tried`

- **[Depth] Faint hex / code rain behind the hero** (fin.com) —
  **Literal:** Dim `0x…` code-like text filling the dark field behind the main scene.
  **Technique:** Separate **Canvas 2D** (not WebGL), full-viewport or section-local; optional mouse influence; often paired with the oval mask above.
  **Cost:** Cheaper than a second WebGL scene; throttle redraw if needed.
  — `tried`

- **Investigation note:** Canvas/WebGL has no useful “computed style story” — read scripts, network, and the canvas context type.

## JS animation libraries / performance

- **[Motion] Whole pages sliding over each other** —
  **Literal:** Navigating feels like sheets of paper sliding, not a hard cut.
  **Technique:** View Transitions API or library overlays. Check before assuming Framer.
  **Cost:** Native cheap; libs moderate.
  — `untested`

- **[Motion] Card tilts under the mouse** —
  **Literal:** A card tips toward the cursor in 3D.
  **Technique:** `mousemove` → `rotateX/Y` from offset to center; rAF throttle.
  **Cost:** Cheap.
  — `untested`

- **[Motion] Button that slightly chases the cursor** —
  **Literal:** A button nudges toward the mouse when you hover near it.
  **Technique:** Scoped `mousemove` + `translate`; CSS transition or WAAPI.
  **Cost:** Cheap if not global.
  — `untested`

- **[Motion] Soft blob that lags behind the cursor** —
  **Literal:** A gooey light that follows the mouse with a little delay.
  **Technique:** Same as spotlight + lerp/trail. **Base without trail** is just “follows cursor.”
  **Cost:** Cheap if throttled.
  **Options:** lag amount is customization.
  — `untested`

- **[Motion] Scroll-controlled multi-step stage (GSAP)** (fin.com) —
  **Literal:** As you scroll, several things move together on purpose (camera, masks, HUD) like a short film timed to the scrollbar.
  **Technique:** GSAP ScrollTrigger (+ Lenis on fin.com). Use only when CSS scroll timelines aren’t enough.
  **Cost:** Moderate JS.
  — `extracted`

- **[Perf] Heavy page that still feels fast** (fin.com) —
  **Literal:** Lots of motion and 3D, but first paint and scroll don’t feel like a slideshow of loading.
  **Technique:** Code-split heavy 3D; compress JS; one fixed WebGL canvas; 2D for simple fields; small textures; `contain`; lazy images; CSS timelines where possible; disable hover toys on touch.
  **Cost:** Discipline, not a magic library.
  — `extracted`

- **Library decision rule:** Prefer CSS + IntersectionObserver; reach for GSAP/Framer only when many elements must stay in sync.

---

## Log entry template

```
Date:
Source: [site/screenshot/link]
Entry: [existing bullet, or "NEW"]
Literal name: [one-liner]
Technique used:
Implementation notes:
Performance check: [or "not checked"]
Result: [adopted / needs rework / rejected / tried]
Project applied:
```

---

## Verified log (from real sites)

```
Date: 2026-07-15
Source: https://venmarcstudio.xyz/ + ~/Pastries/venmarc-viewport-glow-rep
Entry: First screen fills window; soft light at section bottoms
Result: tried
```

```
Date: 2026-07-15
Source: https://www.fin.com/ + ~/Pastries/fin-website-audit
Entry: Layer stack; spinning planet; hex field; oval mask; text hole; card cursor glow; tilting cards; logo strip; frosted nav; stats HUD; perf recipe
Result: tried (definitions + lab)
```

```
Date: 2026-07-15
Source: ~/Pastries/fin-website-audit (lab)
Entry: NEW — Jumping connection lines (draw-on arcs)
Literal: Lines that shoot A→B in <1s, not steady glowing roads
Technique: setDrawRange / partial path draw + tip head; 3D on globe, 2D fixed viewport on /arcs
Implementation notes: GlobeScene.tsx JumpingGlobeArcs; JumpingArcs2D.tsx; pages Atlas + /arcs
Performance check: not lighthouse; visual verified in lab
Result: tried
Project applied: Pastries fin-website-audit
```

## Open gaps

- Sound-reactive / scroll-velocity effects
- Real-device mobile globe simplify vs disable
- Scroll-Driven Animations browser support matrix for product defaults
- Lighthouse score on fin.com production (transfer-only so far)
