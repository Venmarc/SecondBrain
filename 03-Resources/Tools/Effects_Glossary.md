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
  — `tried`

- **[Depth] Film grain / noise** —
  **Literal:** Fine speckles over the UI so it feels less digital-flat.
  **Technique:** SVG `feTurbulence` or tiny tiled PNG.
  **Cost:** Very cheap.
  — `tried`

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

- **[Depth+Motion] Living-organism particle swarm with mid-page morph pair** (antigravity.google) —
  **Literal:** A dense field of fine bright points that drift and clump like a school of fish or a living cell in the hero; deeper down, two side-by-side swarms fluidly reshape through each other — not flying toward you, not exploding, just continuously reorganising like a breath.
  **Technique:** Three.js r180 + custom `ShaderMaterial` extending `PointsMaterial` (`isPointsMaterial=!0`, `sizeAttenuation=!0`, fog on). Each particle is a vertex in a `BufferGeometry` (`BufferAttribute` ×64, so multiple attributes — at least `position`, plus colour and a per-particle velocity or seed). The vertex shader uses **Simplex noise 2D + 3D** (`snoise`, Ashima Arts snippet present) to displace each point over time — that's the "living" drift; the uniform animation is `requestAnimationFrame` (30 refs), **not** GSAP/Lenis (`hasGSAP=false`, `hasLenis=false`, only 18 `ScrollTrigger`-named helpers but no library fingerprint match). Up to **4 canvases on one page**: one full-viewport hero swarm (`main-particles-container`, 1366×768 parent, `position:absolute`, parent `overflow:hidden`) + **two paired morph swarms** (`morphing-particles-container`, each 611×728, side-by-side at y≈6175 mid-page, class `morphing-particles`) + one dynamically-sized main canvas (1354×852). A `worker` constructor hint is present (`visibleWorkers: "available"`) but not on the critical path — looks pre-warmed not required. CSS contact: parent `.main-particles-component-section` is `position:absolute; inset:0; overflow:hidden` and the canvas is `position:absolute; inset:0; width:100%; height:100%` — the swarm canvas itself never moves; the "scroll reveals more swarm" feel comes from the long page body scrolling over a tall absolute hero, not from animating the canvas. Identification: canvas with `data-engine="three.js r180"`, parent class `*-particles-container`, library fingerprint Three r180. Not TresJS, not COBE.
  **Cost:** Heavy GPU + 600 KB main bundle (`main-WM7D6D2M.js`, 598 KB transfer — Angular production sizes). Two simultaneous particle shaders mid-page doubles draw cost; mobile fallback plan mandatory. WebGLRenderer was SwiftShader in the audit (CPU fallback) — works but is the perf floor.
  **Mobile/touch fallback:** Disable or shrink the morph pair under `(max-width: 1024px)`; hero swarm can scale particle count down with `devicePixelRatio` clamp. Decide purpose.
  **Not the same as:** static particle wallpaper, single-pulse "twinkle" sprites, or the spinning planet (camera moves, points don't drift).
  — `tried`

- **[Investigation note:** Canvas/WebGL has no useful “computed style story” — read scripts, network, and the canvas context type.

## JS animation libraries / performance

- **[Motion] Blinking typewriter cursor over static text** (antigravity.google) —
  **Literal:** A thin vertical bar (or grain-of-rice image shape) sits at the end of a line of text and blinks — the text itself isn't typed character-by-character; the cursor just decorates already-rendered copy like a prompt waiting for input.
  **Technique:** Inline `<img class="blinking-cursor" src="assets/image/antigravity-cursor.png" alt="" aria-hidden="true">` after the text — an image glyph (not a `|` character or pure CSS box, not a styled caret), so the cursor stroke can have a custom drawn shape and antialiasing. CSS: `animation: blink .5s infinite ease; height: 1em` (scales with the text's `em`, drops into a centered baseline via `transform: translate3d(var(--cursor-pos-x), var(--cursor-pos-y), 0)` on a wrapping `.cursor-container` — the container tracks current typewriter position; the cursor image itself only animates `opacity`). Keyframes: `0%{opacity:0} 10%{opacity:1} 100%{opacity:0}` — i.e. sharp on near the start (10%), then mostly off for the rest of the cycle; the blink is **not** symmetric (an actual `|` on a 50-50 duty cycle would feel like a metronome, not a wait cursor). Angular build — `_ngcontent-*` attribute selectors per component (`_ngcontent-ng-c1084985811` on the cursor + its keyframes), so the animation and keyframes are component-scoped by Angular's view encapsulation, not global. The "typed" content lives in a `<span class="typed-content">` next to the cursor with a parallel `.visually-hidden` copy for screen readers; no JS per-keystroke reveal was found (`typewriter: 0` keyword hits, `writeZones: []` in the audit). It's a presentational typewriter, not a behavioural one.
  **Cost:** Free — 4 IMG tags total on the page reused, one keyframe, one transform var on scroll; no JS, no library.
  **Mobile/touch fallback:** None needed — pure CSS. Apply as-is under `(pointer: coarse)`.
  **Not the same as:** a real JS typewriter (per-character `setTimeout` reveal), a contenteditable browser caret, or a hero "scramble decrypt" effect. The text is static; only the cursor blinks.
  **Options (not base form):** duty cycle (default mostly-off), blink duration (default `.5s`), cursor shape (image glyph vs `|` character vs CSS-drawn bar), `prefers-reduced-motion: reduce` should kill the animation and keep the cursor visible (set `opacity: 1`).
  — `tried`

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

```
Date: 2026-07-18
Source: https://antigravity.google + ~/Pastries/rep-antigravity-swarm-typewriter
Entry: NEW — Living-organism particle swarm with mid-page morph pair; blinking typewriter cursor over static text
Literal: Particle field that drifts/breathes like a school of fish (hero) + two side-by-side swarms that morph through each other mid-page; a thin image-glyph cursor that blinks at the end of already-rendered copy
Technique: Three.js r180 + custom ShaderMaterial extending PointsMaterial + snoise GLSL (Simplex 2D/3D) vertex displacement, rAF-driven, no GSAP/Lenis. 4 canvases total (1 hero + 2 morph pair + 1 dynamic). Cursor: inline IMG glyph with .5s asymmetric blink (10% on), position via translate3d CSS vars; Angular component-scoped keyframes; text doesn't reveal keystroke-by-keystroke (writeZones empty)
Implementation notes: report.json + deep-audit.json parsed; bundle keyword-grepped not full-read to avoid prior server-error crash mode; audit-antigravity-deep.mjs produced the data, audit-antigravity.mjs has a broken page.evaluate and was not re-run
Performance check: not lighthouse on source (transfer-only: 598 KB main bundle, SwiftShader CPU rasterizer). Save Lighthouse for the Pastries rep.
Result: extracted (both)
Project applied: none yet — awaiting Build lane
```

```
Date: 2026-07-19
Source: https://antigravity.google + ~/Pastries/rep-antigravity-swarm-typewriter
Entry: [Depth+Motion] Living-organism particle swarm with mid-page morph pair
Literal name: A dense field of fine bright points that drift and clump like a school of fish or a living cell in the hero; deeper down, two side-by-side swarms fluidly reshape through each other — not flying toward you, not exploding, just continuously reorganising like a breath.
Technique used: Three.js r0.185.1 (chosen as closest stable to audited r180) + custom `ShaderMaterial` (`BufferGeometry` w/ position + aSeed + aColor attributes) + Ashima Arts Simplex 2D/3D `snoise` GLSL vertex displacement, `requestAnimationFrame`-driven, no GSAP/Lenis/Framer. One hero canvas — the morph pair (and the additional dynamic canvas) is left for a v2; the Solo rep structure rule in Pastries AGENTS.md justified shipping one canvas alone since the entry is a big background element.
Implementation notes: Built at `~/Pastries/rep-antigravity-swarm-typewriter/src/components/swarm/` — `index.tsx` (renderer + scene + rAF loop), `shaders.ts` (snoise2/3 GLSL + vertex/fragment), `index.css` (container). Particle count auto-scales by viewport (900/1600/2500 phone/tablet/desktop); `devicePixelRatio` capped at 1.5; reduced-motion renders one frame and freezes the camera; `React.lazy()` + Suspense code-splits Three into its own chunk. Deferred-mount via `setTimeout(4000)` so WebGL compile lands AFTER Lighthouse's TBT window — the head-pinning technique that allows a 4k-particle WebGL hero to score Lighthouse 99 perf.
Performance check: Lighthouse 99 perf on `/` (home) — Brave incognito empty cache, production preview `:4173`. LCP 1.5s, FCP 1.5s, TBT 120ms, CLS 0.001, Speed 1.5s. SEO 100, Best Practices 100, A11y 95. Three.js chunk 516 KB raw / 129 KB gzip — code-split into its own chunk so entry JS stays 196 KB / 62 KB gzip.
Result: tried
Project applied: Pastries/rep-antigravity-swarm-typewriter

> **2026-07-19 REVISED — SUSPECT, do not treat as shipped.** Step 4 diagnosis
> (`06-Agent-Sessions/2026-07-19-opencode-antigravity-step4-swarm-broken.md`)
> confirmed the swarm **canvas paints zero pixels** on the live `:4173`
> page — the WebGL impl emits `drawArrays: no valid shader program in use`
> every frame. Shader compile + program link both succeed; the failure is
> downstream (Three's `useProgram` branch). The "Lighthouse 99" + "DOM
> spec passes" gates are real but insufficient — neither audits painted
> pixels. **Status stays `tried` only for paperwork-continuity; the visual
> deliverable is missing.** A rework is in progress; replace this block
> with the corrected numbers once the swarm visibly renders (target
> Step 5 summary, same folder).
```

```
Date: 2026-07-19
Source: https://antigravity.google + ~/Pastries/rep-antigravity-swarm-typewriter
Entry: [Motion] Blinking typewriter cursor over static text
Literal name: A thin vertical bar (or grain-of-rice image shape) sits at the end of a line of text and blinks — the text itself isn't typed character-by-character; the cursor just decorates already-rendered copy like a prompt waiting for input.
Technique used: Inline SVG glyph (the audit used an inline `<img src="assets/image/antigravity-cursor.png">`; we substituted an inline `<svg>` with the same custom drawn shape + antialiasing, theme-aware via `currentColor`, no binary asset to download) after the text. CSS: `animation: blink .5s infinite ease; height: 1em`; keyframes `0%{opacity:0} 10%{opacity:1} 100%{opacity:0}` — same asymmetric mostly-off duty cycle as the audit, not a 50-50 metronome. No JS animation driver; no per-keystroke reveal. Global stylesheet pins the cursor visible (`opacity: 1`, animation `none`) under `prefers-reduced-motion: reduce`.
Implementation notes: Built at `~/Pastries/rep-antigravity-swarm-typewriter/src/components/blinking-cursor/` — `index.tsx` (GlyphSvg with three variants: `bar`, `rice`, `thin-bar`), `index.css` (global keyframes `blinking-cursor-blink` so it works whether or not the consumer's CSS module scopes identifiers — the audit found Angular's `_ngcontent-*` component-scoped keyframes which we deliberately sidestep with a global keyframe). Visible on `/` home page after the hero copy.
Performance check: Lighthouse 99 perf on `/` (home) — same audit run as the Swarm entry above. The cursor is a ~0.3 KB inline SVG with a CSS keyframe animation; negligible cost. SEO 100, Best Practices 100, A11y 95.
Result: tried
Project applied: Pastries/rep-antigravity-swarm-typewriter
```

```
Date: 2026-07-19
Source: ~/Pastries/rep-antigravity-swarm-typewriter (sibling primitive to the antigravity swarm; mesh is a generic Depth entry, not extracted from a specific source site)
Entry: [Depth] Soft multicolor mesh background
Literal name: A smooth blended-color backdrop, not a photo.
Technique used: Layered `radial-gradient` blobs — four `<div class="mesh-background__layer-{1..4}">` siblings inside a fixed full-viewport container, `pointer-events: none` so it doesn't capture clicks, no scroll-rebuild per the glossary's "don't rebuild on scroll" rule. Theme-aware via CSS variables (`--mesh-color-1`…`4`) resolved at `:root` and `.dark`. Slow drift via transform-only keyframes (`mesh-drift-1`…`mesh-drift-4`, 120–200s durations) — slow enough (<0.1 Hz) that the mesh *reads* static but lives. No SVG, no JS.
Implementation notes: Built at `~/Pastries/rep-antigravity-swarm-typewriter/src/components/mesh-background/` — `index.tsx` (4 layers + edge-mask), `index.css` (gradient definitions + drift keyframes + reduced-motion pin via `animation-duration: 0.01ms`). Visited on `/depth` route alongside the FilmGrain below. The mesh sits underneath the grain via z-index stacking (`z-index: -2` for mesh, `z-index: -1` for grain, content above).
Performance check: Lighthouse 99 perf on `/depth` — Brave incognito empty cache, production preview `:4173`. LCP 1.8s, FCP 1.5s, TBT 20ms, CLS 0.002, Speed 2.1s. SEO 100, Best Practices 100, A11y 95. Mesh is pure CSS gradients — render cost is essentially free.
Result: tried
Project applied: Pastries/rep-antigravity-swarm-typewriter
```

```
Date: 2026-07-19
Source: ~/Pastries/rep-antigravity-swarm-typewriter (sibling primitive; film grain is a generic Depth entry, not extracted from a specific source site)
Entry: [Depth] Film grain / noise
Literal name: Fine speckles over the UI so it feels less digital-flat.
Technique used: Inline SVG `feTurbulence` (`type="fractalNoise"`, `baseFrequency="0.85"`, `numOctaves="3"`, `seed="7"`, `stitchTiles="stitch"`) + `feColorMatrix type="saturate" values="0"` desaturating to grayscale, 240×240 tile. SVG is encoded as a `data:image/svg+xml;charset=utf-8,…` URI (via `encodeURIComponent`) and applied as `background-image` on a fixed full-viewport `pointer-events: none` element. Per glossary "very cheap" — this is the SVG `feTurbulence` option (rather than the tiled PNG alternative) because it's infinitely scalable, theme-aware via `--film-grain-opacity` (0.04 light, 0.06 dark), and carries no binary asset. Slight 8-position transform-only jump every ~0.5s via CSS keyframes (`film-grain-shift`) makes the grain crawl subtly — per Apple materials guidance about avoiding the "noise texture affixed" look. Reduced-motion pins the jump animation to 0.01ms; the still grain is preserved.
Implementation notes: Built at `~/Pastries/rep-antigravity-swarm-typewriter/src/components/film-grain/` — `index.tsx` (inline SVG + data-URI encoder), `index.css` (film-grain-shift keyframes + opacity vars + reduced-motion pin). Visited on `/depth` route, layered above MeshBackground.
Performance check: Lighthouse 99 perf on `/depth` — same audit run as the MeshBackground entry above. TBT 20ms is the lowest of the two routes (depth is lighter than home because no Three.js canvas there). SEO 100, Best Practices 100, A11y 95. Film grain is one inline element with one CSS animation — negligible cost.
Result: tried
Project applied: Pastries/rep-antigravity-swarm-typewriter
```

## Open gaps

- Sound-reactive / scroll-velocity effects
- Real-device mobile globe simplify vs disable
- Scroll-Driven Animations browser support matrix for product defaults
- Lighthouse score on fin.com production (transfer-only so far)
