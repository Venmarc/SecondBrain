# Footer Design — Addendum: Gap-Fill + Animated Footer Library (31–40)

**Companion to:** `footer-design-research.md` and `footer-carousel-prompt.md`
**Date:** 2026-09-29

---

## 0. TL;DR

- **The footer.design gap is mostly closed.** Its category pages still come back empty, but individual `/sites/` pages load with desktop and mobile screenshots, so I analysed 12 of them.
- **Awwwards is partly closed.** Element pages still return only a title, but search results show each element's tags, which is enough to map about 30 animated footer entries by technique.
- **Muzli, Unsection, Lapa Ninja and Saaspo are still unreadable.** They're logged in Data Limitations, not filled in with guesses.
- **The main finding about animated footers:** each one is defined by its **trigger** (ambient, entry, scroll-linked, cursor proximity, click/drag, sound) as much as by how it looks. The trigger is a sixth design variable on top of the five from the first document.
- **10 new styles (31–40)** cover what you asked for: subtle motion, cursor reaction, activation when you reach the footer, animated characters, googly eyes, particles, mountains with a waterfall, ASCII rendered from images or video, plus sound, weather, growth and scroll-stretch.

---

## 1. Gap-fill results (retry log)

| Source | Last time | This time | What I did |
|---|---|---|---|
| footer.design category pages (`/styles/animated`, `/styles/illustrative`) | Nav only | **Still nav only** | Switched to individual site pages instead |
| footer.design site pages (`/sites/...`) | Not tried | **Loaded**, with a description, date added, desktop/mobile screenshots and "similar designs" | Pulled 12 screenshots and analysed each one visually (section 2) |
| footer.design `/info` | Not tried | **Loaded** | Curators: Benten Woodring, Devin Fountain, Matt Cram; logo by Fons Mans; run alongside NOOON Studio ([footer.design/info](https://www.footer.design/info)) |
| footer.design on X | Not tried | Partial | Recent posts list 39BC, Decimal, Isa de Burgh, Blake Cyze, Harvest Hall, The Design Society ([X](https://x.com/footrdesign?lang=en)) |
| Awwwards element pages | Title only | **Still title only** | Used the tags visible in search results (section 3) |
| Muzli (`/blog/100-unique...`, `/inspiration/footer-design/`) | Empty | **Still empty / failed** | Excluded |
| Unsection | Heading only | **Still heading only** | Excluded |
| Lapa Ninja footer elements | Not tried | Heading only ("4 examples") ([Lapa](https://www.lapa.ninja/elements/footer/)) | Excluded |
| Saaspo footer sections | Not tried | Page chrome only ([Saaspo](https://saaspo.com/section-type/saas-footer-section-examples)) | Excluded |
| React Bits Dot Grid | Not tried | **Crawl failed** | Used Stitch/tuanhuynh and Fancy Components for the same technique |

---

## 2. footer.design, decoded: 12 real footers

Each row breaks one footer down against the same five criteria as the first document.

| Site | Art | Type | Layout | Components | Page-fit | Motion hints |
|---|---|---|---|---|---|---|
| [Blake Cyze](https://www.footer.design/sites/blake-cyze) | Blue (#3B71FE) gradient card fading to near-black, halftone/noise overlay, **a row of SVG flowers along the card's top edge**, and a huge 400px name in #12141A (barely visible) behind everything | Inter-like, 16px links against a 400px ghost name | Meta info at the far left/right, socials centred | Socials with icons, back-to-top, a live "matchas" counter | Card floats on a dark page, flowers overlap the boundary | Counter, likely flower motion |
| [Yummygum](https://www.footer.design/sites/yummygum) | Oversized, cropped brand mark bottom-left; ISO 27001 badge | Huge sentence-case wordmark, 28px primary links, 12px uppercase heads in #A88B94 | Asymmetric 4 columns, wordmark along the bottom | Address, text-only socials, trust badge | **Dark plum (#351A24) rounded card over a hot-pink (#EC769A) page** | Wordmark cropped at the edge, often a marquee |
| [LangChain](https://www.footer.design/sites/langchain) | **Outline-only wordmark about 280px tall** behind the columns, gradient petal logo | Geist/Inter heads, mono labels | 4 columns plus a utility bar | Mono email field, Subscribe button, **"All systems operational" status dot** | Continues the dark (#020408) page | Possible parallax on the wordmark |
| [Hello World Studio](https://www.footer.design/sites/hello-world-studio) | **Two 3D mascots (a cat with headphones, a bunny in VR goggles) on either side**, ASCII-style texture, a floating grey "window" newsletter card | Mono plus a serif display | Symmetrical characters, centred top nav, floating card | Email field, gradient Subscribe button | Same cream (#F2F1E8) as the page | Likely floating characters |
| [Isa de Burgh](https://www.footer.design/sites/isa-de-burgh) | **Hand-drawn felt-tip icons** | An 80–90px **serif email address** as the hero, condensed uppercase sans labels | Sparse and left-aligned | A "COPY" pill with a hand-drawn oval, a double-arrow back-to-top circle | Seamless white | Click to copy, wobbly strokes |
| [Decimal](https://www.footer.design/sites/decimal) | **Isometric 3D "DECIMAL" wordmark** filling the bottom half, shaded in #444 and #1A1A1A | Söhne/Inter-like at 18px | Brand on the left, 3 columns grouped on the right | 3×3 dot logo | Pure black continuation | Likely parallax |
| [39BC](https://www.footer.design/sites/39bc) | A 200px serif wordmark, a small greyscale Roman coin | 200px against 10px (extreme contrast), wide-tracked uppercase heads | 4 columns, newsletter top-right | Underline-only EMAIL field, a text-only SUBSCRIBE | White | None |
| [Playfolly](https://www.footer.design/sites/playfolly) | **3D render of a wooden play tower with children** in golden-hour light and shallow depth of field | "Play beautiful" at about 18vw, white | Utilities top-left, render centred, a huge phrase along the bottom | Instagram and Email pills | Full-screen orange-to-peach gradient footer | Parallax layers |
| [Dirt](https://www.footer.design/sites/dirt) | **A roughly 800px lowercase "dirt" wordmark with a liquid-chrome, glitchy look** | Heavy geometric type | 4 columns on top, wordmark covering 75% | **Grey rounded pill links** (#F2F2F2) | Hard break to white | Likely a liquid or ripple effect on the wordmark |
| [Heron AI](https://www.footer.design/sites/heron-ai) | **Blueprint-style wordmark with crosshairs at its vertices**, grain texture, an isometric "H" | Uppercase grotesk plus mono labels | Asymmetric 5-pane grid made of 1px rules | Email field with an arrow, two-column socials, legal bar | Grid lines continue from the page | Orange accent on hover |
| [Nothin'](https://www.footer.design/sites/nothin) | A roughly 800px uppercase wordmark bleeding off the bottom | 88px headline, 24px socials | CTAs on top, wordmark covering 55% | **BOOK A CALL / DROP US AN EMAIL outlined pills**, EN switcher | Black continuation | Arrows nudge on hover, possible parallax |
| [The Design Society](https://www.footer.design/sites/the-design-society) | **Blue-screen (#2000FF) CRT scanlines** with red/cyan fringing, letters built from white bars | Pixel serif, bitmap mono | Two floating OS-style "windows" (socials, sitemap) plus a marquee | [+] window headers, bracketed [LINKS], a marquee ticker | One continuous retro-terminal look | The marquee scrolls |

**What these tell you:**
1. **Giant wordmarks are the default in 2026.** 8 of the 12 use one (Yummygum, LangChain, Decimal, 39BC, Playfolly, Dirt, Heron, Nothin'). What separates them is the **material** of the wordmark: an outline (LangChain), isometric 3D (Decimal), liquid chrome (Dirt), blueprint (Heron), a ghost colour barely off the background (Blake Cyze). The first 30 styles leaned on the wordmark's size; these show its material matters more.
2. **Pills have replaced plain links** in agency footers (Dirt, Nothin', Playfolly).
3. **Characters are appearing in footers** (Hello World Studio's mascots, Playfolly's children). That supports your animated-characters direction.
4. **Trust signals are showing up in SaaS footers:** status dots (LangChain) and ISO badges (Yummygum).

---

## 3. Awwwards animated-footer map (from element tags)

The element pages don't load, but the tags shown in search results say what each footer does. Grouped by technique:

| Technique | Awwwards entries (tags) |
|---|---|
| **Physics / gravity** | [Physics-Based Breakable Footer, studiors](https://www.awwwards.com/inspiration/physics-based-breakable-footer-studiors) (physics, matter.js, typography, gamification) · [Footer WebGL/physics, Zulik](https://www.awwwards.com/inspiration/push-us-around-zulik) (webgl, matter.js) · [Footer Animation, Jeton](https://www.awwwards.com/inspiration/footer-animation-jeton) (footer, animation, physics) |
| **Particles** | [Footer with WebGL particles, Salt and Pepper](https://www.awwwards.com/inspiration/footer-with-webgl-particles-salt-and-pepper) · [Footer Hover WebGL Particles](https://www.awwwards.com/inspiration/footer-hover-webgl-particles-pragadheeshs-showcase) (hover, webgl, glitch) · [Footer Interactive Particles, Oryzo AI](https://www.awwwards.com/inspiration/footer-interactive-particles-oryzo-ai) |
| **Fluid / shader** | [Liquid gradient footer, Amaterasu](https://www.awwwards.com/inspiration/liquid-gradient-footer-amaterasu) (liquid gradient, webgl, morphing, organic) · [WebGL Footer, ChainGPT Labs](https://www.awwwards.com/inspiration/webgl-footer-chaingpt-labs) (three.js, mouse, hover) · [Interactive WebGL Footer, Work In Progress](https://www.awwwards.com/inspiration/interactive-webgl-footer-work-in-progress) (fragment shader) |
| **Cursor / magnetic** | [Footer mouse interaction, Gamily](https://www.awwwards.com/inspiration/footer-mouse-interaction-gamily) (cursor, magnetic, CTA, typography) · [Magnetism footer detail](https://www.awwwards.com/inspiration/magnetism-micro-interactions-footer-detail) (reactive cursor) · [Mouse-impacted footer, See What Eye See](https://www.awwwards.com/inspiration/mouse-impacted-footer-seewhateyesee-visual-simulator) · [Cursor based interaction, CubeHouse](https://www.awwwards.com/inspiration/cursor-based-interaction-the-cubehouse) · [Footer Mouse Animation, Belle Oaks](https://www.awwwards.com/inspiration/footer-mouse-animation-belleoaks-marketplace) (images, hover) · [Footer, Melt Mouse](https://www.awwwards.com/inspiration/footer-melt-mouse) |
| **Sound** | [Footer – Hover the Lines Sound Interaction, TRIONN](https://www.awwwards.com/inspiration/footer-hover-the-lines-sound-interaction-trionn-1) (music, sound, mouse interaction, dark footer, wave animation) |
| **Characters / 3D** | [Interactive Footer with a 3D animated Mascot, Bike Time](https://www.awwwards.com/inspiration/3d-mascot-and-directions-in-footer-design-bike-time) (3d, mascot, directions, location, map) · [Footer 3D, Homerun](https://www.awwwards.com/inspiration/footer-3d-homerun) (spline) · [3D Footer Element, Nexio](https://www.awwwards.com/inspiration/3d-footer-element-nexio) (three js, illustration) · [Footer – 3D Arrow](https://www.awwwards.com/inspiration/footer-3d-arrow-jonas-emmertsen-portfolio) (back to top, lottie) · [Footer Interactive AI Orb](https://www.awwwards.com/inspiration/footer-interactive-ai-orb-will-convince-you-to-click-cta-button-billodesign-living-portfolio) (typing animation) · [Animated eyes follow mouse cursor, Ochi](https://www.awwwards.com/inspiration/animated-eyes-follow-mouse-cursor) (mouse interaction, follow; not footer-specific) |
| **Botanical / illustrated** | [Botanical Footer, Bitnomial](https://www.awwwards.com/inspiration/botanical-footer-submission-6a7d6ec532cb9722335908) (text reveal, microanimation) · [Animated footer, Ministry Agency](https://www.awwwards.com/inspiration/animated-footer-design-ministry-agency-1) (3d scene, flowers) · [Animated Footer, Garden Party](https://www.awwwards.com/inspiration/animated-footer-garden-party) (colorful, interaction, scrolling, retro), by Erin Hammond, Honorable Mention on Apr 16 2024 ([Awwwards](https://www.awwwards.com/sites/garden-party)) · [Footer, EternaCloud](https://www.awwwards.com/inspiration/footer-eternacloud) (neon illustration, full-screen, dark) |
| **Scroll reveal / type** | [Footer with huge logo animated on scroll, No graphism](https://www.awwwards.com/inspiration/footer-with-huge-logo-no-graphism-animated-on-scroll-no-graphism-r) · [Footer Animation, Rise at Seven](https://www.awwwards.com/inspiration/footer-animation-rise-at-seven-2) (fixed scroll, footer reveal) · [Footer reveal on-scroll, Maker](https://www.awwwards.com/inspiration/footer-reveal-on-scroll-maker) · [Fullscreen footer text animation, Noxediem](https://www.awwwards.com/inspiration/fullscreen-footer-text-animation-and-page-transition-noxediem-creative-production) (gsap) · [Footer animation, Alphamark](https://www.awwwards.com/inspiration/footer-animation-alphamarktm) (typographic) · [Footer animation, ELKRUFF](https://www.awwwards.com/inspiration/footer-animation-elkruff) (nuxt, gsap, parallax) · [Animated Footer CTA, WHP](https://www.awwwards.com/inspiration/animated-footer-cta-whp-creative) (context-menu CTA) |
| **Narrative ending** | [Footer Animation – Closing Interaction, Internalities](https://www.awwwards.com/inspiration/footer-animation-closing-interaction-internalities) (scroll end, credits, interaction) |

Other animated footers found outside Awwwards:
- **Analyst1:** a looping background video. **Ghayath:** an extra-large footer over a looping particle video. **Devensoft:** the footer is pulled out from beneath the CTA section with parallax ([Digital Silk](https://www.digitalsilk.com/digital-trends/website-footer-design-examples/)).
- **Curator lists five current footer trends:** dark mode, embedded social feeds, minimal single-row footers, animated micro-interactions (Dribbble), and sticky footers ([Curator](https://curator.io/blog/website-footer-examples)).
- **Alvaro Trigo's collection:** waves moving horizontally, a canvas wave built with Twgl, and a pure-CSS animated cityscape ([Alvaro Trigo](https://alvarotrigo.com/blog/website-footers/)).

---

## 4. Motion taxonomy: the sixth variable

| Trigger | What starts it | Typical build | Cost |
|---|---|---|---|
| **Ambient** | Nothing; it runs constantly (water, sway, drift) | CSS keyframes, SVG SMIL, shader time uniform | Pause it when off-screen |
| **Entry** | The footer scrolls into view | IntersectionObserver, GSAP ScrollTrigger, or CSS `animation-timeline: view()` ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline/view)) | Cheap |
| **Scroll-linked** | Scroll position drives it frame by frame | `view()` timelines, a `--scrollPos` custom property ([Alistair Shepherd](https://www.alistairshepherd.uk/writing/parallax-svg-landscape-1/)) | Cheap if it only changes `transform` |
| **Cursor proximity** | Distance to the pointer | A pointermove handler writing CSS variables, or canvas | Medium |
| **Click / drag** | A deliberate user action | A physics engine (Matter.js) or a hand-written state machine | Medium |
| **Sound** | Hover plus opt-in audio | Web Audio | Must be opt-in |

**The rendering ladder** (use the lowest rung that achieves the effect):
1. **CSS transforms and keyframes.**
2. **CSS scroll-driven animations.** Check support with `@supports (animation-timeline: view())` ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline/view)).
3. **SVG draw-ons, masks and filters.** Filters aren't well optimised, so keep the animated area as small as possible, use few iterations, and go easy on blurs ([Smashing](https://www.smashingmagazine.com/2021/09/deep-dive-wonderful-world-svg-displacement-filtering/)).
4. **DOM grids.** Fancy Components' Pixel Trail uses one div per pixel, and warns that large grids hurt performance, especially on first render ([Fancy Components](https://www.fancycomponents.dev/docs/components/background/pixel-trail)).
5. **Canvas 2D.**
6. **WebGL / three.js.**
7. **Rive or Lottie** for characters. Rive's rule of thumb: under 500 vertices for simple UI elements and under 5,000 for a complex character ([DEV](https://dev.to/uianimation/engineering-interactive-mascots-with-rives-state-machine-and-runtime-architecture-4e2h)).
8. **Physics engines.** Fancy Components' Gravity wraps Matter.js with `gravity`, `grabCursor`, `autoStart`, `resetOnResize` and a debug mode ([Fancy Components](https://www.fancycomponents.dev/docs/components/physics/gravity)).

---

## 5. The 10 animated styles (31–40)

Each entry has: Seen in · Art · Type · Layout · Components · Page-fit · **Motion** (trigger, behaviour, build, fallback) · Use when / skip when.

### 31 · Assembling ASCII Footer — "built from characters"

**Seen in:**
- **Codegrid's pinned ASCII-hands footer.** The hands glide in from both edges, the name rises from below, and the links appear character by character. The hands then lean toward the cursor in opposite directions, and cells light up in clusters under the pointer ([YouTube](https://www.youtube.com/watch?v=WSFVNidSJlI)).
- **A reel where Michelangelo's painting builds in from both sides, character by character,** drawn by a shader rather than shown as an image ([Instagram](https://www.instagram.com/reel/Ddv3yXJIfSP/)).

**Art:** Any image or looping video (hands, a statue, a painting, a product, waves). Draw it into a tiny offscreen canvas sized to the grid, read the pixels, and map each pixel's brightness onto a character ramp: dense characters for dark areas, sparse ones for light areas ([YouTube](https://www.youtube.com/watch?v=WSFVNidSJlI)). The original `<img>` stays invisible and is used only as the pixel source.

**Type:** Mono at 10–14px for the character cells. A huge name split across opposite edges at the bottom, with `overflow:hidden` on each heading so the letters can rise from behind a mask.

**Layout:** Full-screen. The ASCII art flanks the centre and the links sit in a middle column.

**Components:** ASCII canvases, link lines split for staggered reveal, hover clusters.

**Page-fit:** Curtain reveal. The footer is fixed to the viewport with a z-index below the sections, so the page scrolls up and over it ([YouTube](https://www.youtube.com/watch?v=WSFVNidSJlI)).

**Motion:**
- **Entry:** fires when an invisible "revealer" element reaches mid-screen, and plays in reverse when you scroll back up.
- **Cursor:** a `drift` value eases toward the pointer, and each hand's transform combines the reveal offset, the drift and a slight scale.
- **Hover:** finds the nearest cell, then walks outward to random neighbours, each fading slightly later than the one before ([YouTube](https://www.youtube.com/watch?v=WSFVNidSJlI)).

**Variant 31b, Skittish Glyph Logo:**
- **Hover:** a logo made of ASCII characters pushes away from the cursor with force `(1 − distance/range) × strength`.
- **Click cycle:** clicking moves it through logo → scatter → fall (gravity, clamped at a floor, velocity reversed times a bounce factor) → reassemble.
- **Build:** plain canvas, no libraries ([YouTube](https://www.youtube.com/watch?v=DE6chAfreFI)).

**Build notes:**
- **Aspect ratio:** monospace cells are about 0.5 wide to 1 tall, so sample fewer rows than columns or the image stretches ([GitHub](https://github.com/iart-ai/web-animation-skills/blob/main/skills/ascii-animation/SKILL.md)).
- **`<pre>` vs canvas:** a `<pre>` holds up to about 12k characters at 30fps; use canvas for more characters, per-character colour, or 60fps. Running at 12–24fps gives a retro feel ([GitHub](https://github.com/iart-ai/web-animation-skills/blob/main/skills/ascii-animation/SKILL.md)).
- **Sharpness:** scale the canvas by `devicePixelRatio` ([YouTube](https://www.youtube.com/watch?v=WSFVNidSJlI)).
- **3D scenes:** three.js has an `AsciiEffect` add-on ([three.js](https://threejs.org/docs/pages/AsciiEffect.html)).

**Fallback:** A pre-rendered ASCII PNG. Canvas gets `aria-hidden`; the name and links are real text. Commenters on an "ASCII footer" post worried about how a screen reader would handle it and about scaling it on the web ([Reddit](https://www.reddit.com/r/Design/comments/1s0rtzo/designed_this_footer_section_in_figma_using_ascii/)).

**Terminology warning:** that same Reddit footer was called out as **halftone, not ASCII** by most commenters ([Reddit](https://www.reddit.com/r/Design/comments/1s0rtzo/designed_this_footer_section_in_figma_using_ascii/)). ASCII means real characters. Don't mix the two up in briefs.

**Use when:** dev tools, creative studios, AI, culture. **Skip when:** the footer has to carry heavy conversion.

### 32 · Googly-Eye Watchers — "they're watching you scroll"

**Seen in:** Awwwards' eyes-follow-cursor element ([Awwwards](https://www.awwwards.com/inspiration/animated-eyes-follow-mouse-cursor)); Kirupa's exercise, where the eyes rotate toward the cursor and the whole body tilts ([Kirupa](https://www.kirupa.com/codingexercises/eyes_follow_mouse.htm)); Bike Time's 3D mascot footer ([Awwwards](https://www.awwwards.com/inspiration/3d-mascot-and-directions-in-footer-design-bike-time)); Hello World Studio's flanking mascots ([footer.design](https://www.footer.design/sites/hello-world-studio)).

**Art:** 5–7 flat SVG blob characters in brand colours peeking over the footer's top edge, so only the tops of their heads and their eyes show. Each eye is a white circle with a black pupil and a small highlight dot. Characters vary in height (60–140px) and eye size.

**Type:** A friendly rounded grotesk (Bricolage Grotesque or Nunito) for 16px links. A mid-size wordmark.

**Layout:** Characters along the top edge, a 4-column doormat below, legal line at the bottom.

**Components:** The characters, links, and a hidden "pet me" easter egg on one character.

**Page-fit:** The characters **straddle the boundary**. Their bodies are the footer's colour and their heads rise into the page above.

**Motion:**
- **Pupil tracking:** pupil angle = `atan2(dy, dx)`, with the offset clamped to (eye radius − pupil radius).
- **Googly wobble:** run the pupil on a spring (stiffness about 170, damping about 12) and feed it the cursor's speed, so a fast swipe makes the pupils overshoot and wobble. Spring physics gives the "fluid and organic" motion and needs JS ([Josh Comeau](https://www.joshwcomeau.com/animation/a-friendly-introduction-to-spring-physics/)).
- **Blinks:** random idle blinks every 3–7s (the eyelid scales on Y over 120ms), and a blink on click.
- **Entry:** everyone rises 40px when the footer enters view.
- **Hover a link:** the characters lean toward it (tilt of 6° or less).
- **Hover Legal:** they duck (easter egg).

**Build:** Plain SVG plus about 40 lines of JS. For richer characters, use a Rive state machine: a full-screen listener moves a hidden target, a "joystick" bone follows it within a distance constraint, and its X/Y drive a blend state for head rotation ([DEV](https://dev.to/uianimation/engineering-interactive-mascots-with-rives-state-machine-and-runtime-architecture-4e2h)).

**Fallback:**
- **Reduced motion:** eyes look at the centre and only blink.
- **Touch:** eyes follow the last tap.

**Use when:** kids' brands, consumer apps, community products, agencies with a sense of humour. **Skip when:** finance, health, or legal.

### 33 · Cascade Range — "mountains with a running waterfall"

**Seen in:** Alistair Shepherd's Firewatch-style SVG landscape: 10 layers moved by `translateY(calc(var(--scrollPos) * var(--offset)))`, with offsets from 0.96 down to 0 and a `prefers-reduced-motion` reset ([Alistair Shepherd](https://www.alistairshepherd.uk/writing/parallax-svg-landscape-1/)). A CSS waterfall made from a static photo plus a 50%-opacity looping water layer, masked and animated with `background-position` ([int3ractive](https://int3ractive.com/blog/2012/tutorial-realistic-waterfall-with-css3/)). A GPU waterfall that gets its cartoon look from blur plus threshold and reacts to the mouse ([piellardj](https://piellardj.github.io/waterfall-webgl/)).

**Art:**
- **Mountains:** 6–8 SVG silhouettes with atmospheric perspective, from pale #CBD5E1 in the distance to #1E293B up close.
- **Waterfall:** a clipped ribbon falls from a notch in the mid-ground cliff into a **pool at the bottom where the footer links live**. Build it as a repeating vertical streak gradient animating `background-position-y`, with a small `feTurbulence` shimmer on that ribbon only.
- **Mist:** about 30 blurred white circles rising and fading at the base.
- **Pool:** ripple rings on the surface.

**Type:** A serif wordmark in the sky (Fraunces or Cormorant). Links in light type on the dark pool.

**Layout:** Sky (top 40%) holds the brand and newsletter, the mountains fill the middle, and the pool band (bottom 25%) holds 4 link columns.

**Components:** Newsletter field, links, and an "altitude" or "trail status" chip for outdoor brands.

**Page-fit:** The sky is the same colour as the page, so the horizon seems to rise out of it.

**Motion:**
- **Ambient:** the water loops and the mist drifts.
- **Scroll:** layer parallax.
- **Cursor:** ±8px parallax per layer.
- **Entry:** the waterfall switches on, clipping in from the top over 1.2s via a `view()` timeline.
- **Hover the pool:** a ripple ring at the cursor. For a premium version, use Codrops' water distortion: a 64px canvas stores each ripple's direction in the red/green channels and its strength in blue, and a post-processing shader offsets the UVs ([Codrops](https://tympanus.net/codrops/2019/10/08/creating-a-water-like-distortion-effect-with-three-js/)).

**Budget:** Keep the displacement filter to the waterfall's rectangle ([Smashing](https://www.smashingmagazine.com/2021/09/deep-dive-wonderful-world-svg-displacement-filtering/)).

**Fallback:** A still frame, with parallax frozen when reduced motion is on.

**Use when:** outdoor, travel, wellness, water or energy brands, hotels. **Skip when:** dense SaaS sitemaps.

### 34 · Swarm Wordmark — "the logo is a flock"

**Seen in:** Salt and Pepper's WebGL particle footer, Pragadheesh's hover-plus-glitch particles, Oryzo AI's interactive particles (Awwwards links in section 3). Ghayath's footer uses a looping particle video ([Digital Silk](https://www.digitalsilk.com/digital-trends/website-footer-design-examples/)).

**Art:** 1,500–4,000 dots sampled from the wordmark's pixels. Each dot stores a home position, and a colour gradient runs across the X axis.

**Type:** The particles *are* the wordmark. Links are 13px mono in a top row.

**Layout:** Wordmark in the centre-bottom 60%, links above.

**Components:** A "shake" button that scatters the swarm, plus links.

**Page-fit:** Dark, continuing the page. A few stray particles drift up into the section above, using an overflow canvas with a mask fade.

**Motion:**
- **Entry:** particles start as scattered dust and converge into the letters once the footer is 40% visible, staggered by distance.
- **Cursor:** repels within 90px, and each dot springs home (`a = k·(home − pos) − damping·v`).
- **Click:** a shockwave.
- **Idle:** a slight noise wobble.

**Build:** SVG circles under about 400 dots, canvas 2D up to about 5k, WebGL points beyond that.

**Fallback:** A static SVG wordmark.

**Use when:** AI, crypto, data, events. **Skip when:** the brand is quiet or traditional.

### 35 · Magnetic Dot Field — "the grid notices you"

**Seen in:** Stitch's cursor grid. Two identical dot-pattern SVGs are stacked; the top, darker one is masked to a radial disc that follows the pointer. You move `mask-position` rather than redrawing the gradient, and it fades out when the cursor goes idle ([tuanhuynh](https://www.tuanhuynh.com/blog/copying-stitchs-cursor-grid)). Also Gamily's magnetic CTA footer, the Magnetism reactive-cursor footer, and a p5.js interactive dot grid ([Awwwards](https://www.awwwards.com/inspiration/interactive-dot-grid-no-code-community)).

**Art:** A 16px grid of #D4D4D4 dots. A 220px disc reveals #111 dots under the cursor. Optionally, accent-coloured pixel-trail squares that fade over 500ms ([Fancy Components](https://www.fancycomponents.dev/docs/components/background/pixel-trail)).

**Type:** Swiss grotesk at 14px for links. A large "Let's talk" in a 240px circle.

**Layout:** 12-column grid, with the magnetic CTA circle on the right.

**Components:** Magnetic links, magnetic CTA, email copy chip.

**Page-fit:** The same dot grid runs through the page above. The footer is simply where it starts responding.

**Motion:**
- **Cursor:** links within 80px move 0.3 of the way toward the cursor and spring back. The CTA pulls at 0.45, with its label offset for inner parallax.
- **Idle:** the disc fades out after 1.5s.

**Fallback:** Touch devices show the static grid only.

**Use when:** SaaS, dev tools, design studios. It's subtle, so it suits almost any brand. **Skip when:** rarely. It's the safest style in this set.

### 36 · Plucked Strings — "hover to play the footer"

**Seen in:** TRIONN's "Hover the Lines Sound Interaction" (tags: music, sound, mouse interaction, dark footer, wave animation) ([Awwwards](https://www.awwwards.com/inspiration/footer-hover-the-lines-sound-interaction-trionn-1)). An "Interactive Typographic Wave Footer" whose field of horizontal lines behaves like a liquid surface and ripples under the cursor ([Free Frontend](https://freefrontend.com/javascript-particles/)).

**Art:** 24 horizontal 1px lines across a dark footer, 12px apart, each a 64-point polyline. The lines break wherever they cross the wordmark's letters, so the **wordmark is carved out of the gaps**.

**Type:** The wordmark exists only as negative space. Links are 13px mono.

**Layout:** The line field fills the top 60%; links and legal sit below.

**Components:** A 🔈 sound toggle (**off by default**), links.

**Page-fit:** The first line sits exactly on the boundary, like the top line of a music staff.

**Motion:**
- **Cursor:** crossing a line displaces the nearby points along a bell curve. On release, the line rings out as a damped spring oscillation.
- **Sound (opt-in):** each line plays one note of a pentatonic scale via Web Audio at gain 0.05.

**Fallback:** Static lines, no audio.

**Use when:** music, audio, podcasts, events, creative studios. **Skip when:** any audience that won't opt into sound; the visual still works without it.

### 37 · Growing Garden — "it blooms when you arrive"

**Seen in:** Bitnomial's Botanical Footer (text reveal, micro-animation), Ministry Agency's 3D flower footer, Garden Party's animated retro footer (section 3 links). Blake Cyze's row of SVG flowers along a card edge ([footer.design](https://www.footer.design/sites/blake-cyze)).

**Art:** SVG stems drawn on with `stroke-dasharray` / `stroke-dashoffset`, then leaves and flower heads that scale in from their bases. Mixed species (tulip, daisy, fern) in 3–4 brand colours.

**Type:** A soft serif (Instrument Serif), with lines revealed in sequence.

**Layout:** A flowerbed along the top edge, links in the "soil" below.

**Components:** One flower per link group, plus a watering-can back-to-top button.

**Page-fit:** Flowers grow up over the boundary into the page above.

**Motion:**
- **Entry:** a `view()` timeline with `animation-range: entry 10% cover 40%` draws the stems and blooms the flowers in sequence, with an IntersectionObserver fallback ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline/view)).
- **Ambient:** stems sway ±2° from their base, each on its own 3–6s loop.
- **Cursor:** acts as wind, bending nearby stems away.
- **Hover a link:** its flower opens.
- **Scroll up:** the flowers close.

**Fallback:** Fully bloomed and static.

**Use when:** wellness, botanical, food, cannabis, sustainability, weddings. **Skip when:** dark tech.

### 38 · Rain-on-Glass Window — "wipe the fog"

**Seen in:** Codrops' Rain & Water Effect experiments by Lucas Bebber, where WebGL raindrops refract the image behind them ([Codrops](https://tympanus.net/codrops/2015/11/04/rain-water-effect-experiments/), [GitHub](https://github.com/codrops/RainEffect)). Analyst1's looping video footer ([Digital Silk](https://www.digitalsilk.com/digital-trends/website-footer-design-examples/)).

**Art:** A blurred night-city bokeh (or forest) photo sits behind "glass". Raindrops show a sharp, refracted copy of it. A fog layer on top is a canvas filled with translucent white.

**Type:** Handwritten text ("come in, it's warm"), as if written with a finger on the fogged glass. Links sit on a solid window sill.

**Layout:** Window mullions divide the footer into panes, one link group per pane. Legal info goes on the sill bar.

**Components:** A "clear the glass" button, links, and optionally the venue's local weather.

**Page-fit:** The page's wall colour frames the window, so the footer reads as a window set into the page.

**Motion:**
- **Ambient:** drops slide down and merge.
- **Cursor:** wipes the fog clear with a soft brush (`destination-out`), and the fog slowly re-forms.
- **Entry:** the first drops hit the glass.

**Fallback:** A static fogged photo.

**Use when:** cafés, bars, hotels, bookshops, weather apps, cosy brands. **Skip when:** bright daytime brands.

### 39 · Elastic Stretch — "pull the page like taffy"

**Seen in:**
- **The Dia browser's footer:** its gradient morphs and swells as you scroll ([60fps.design](https://60fps.design/appsites/dia-footer-gradient-on-scroll-interaction)).
- **A Framer University recreation:** a rainbow-stretching footer driven by scroll transforms ([Framer University](https://framer.university/resources/rainbow-stretching-footer-animation-in-framer)).
- **An open-source "Sassy Footers" set:** `scaleY()` scaling on scroll, gradient bars and nav moving at different scroll speeds ([GitHub](https://github.com/manish-basargekar/sassy-footers); [Reddit](https://www.reddit.com/r/webdev/comments/1ls2524/showoff_saturday_made_this_footer_animation/)).

**Art:** 7 full-width colour bands stacked and anchored to the bottom (or vertical columns for a harp look).

**Type:** A condensed wordmark (Anton) that gets taller as you scroll (`scaleY` 0.2 → 1).

**Layout:** The bands fill the footer, the wordmark sits over them, and a links row is pinned above.

**Components:** Links and a "↑ top" button.

**Page-fit:** Slides out from under the content with a sticky position, no magic numbers ([CSS-Tricks](https://css-tricks.com/the-slideout-footer/)).

**Motion:**
- **Scroll:** with progress *p* from 0 to 1, band *i* scales to `1 + p·kᵢ`, with *k* decreasing band by band, so they stretch unevenly like taffy.
- **Nav:** moves at half the scroll speed.
- **End of page:** if you use Lenis smooth scrolling, a spring bounce at the end.

**Fallback:** Bands at rest.

**Use when:** browsers, consumer apps, music, fashion drops. **Skip when:** content-heavy sites where links need to be reachable immediately.

### 40 · Closing Credits — "the site ends like a film"

**Seen in:** Internalities' "Footer Animation – Closing Interaction" (scroll end, credits, interaction). Noxediem's full-screen footer text animation with a page transition (section 3 links).

**Art:** Black, with a faint film grain and a subtle letterbox. An optional "post-credits scene" is a tiny looping illustration (a mascot waving) that appears after the roll.

**Type:** A condensed serif or classic credits typeface. Roles are 11px uppercase and letter-spaced; names are 20px. It's set as a centred two-column "ROLE ········ NAME" list.

**Layout:**
- **Centre column:** Directed by → Team; Starring → Clients; Music → Tools/stack; Filmed at → Address; Special thanks → community.
- **Then:** "THE END" and a **↺ Replay** button, which scrolls back to the top.
- **Real links:** stay in a fixed thin bar at the bottom throughout.

**Components:** The credits roll, Replay (back to top), a "Skip credits" button, and the fixed legal bar.

**Page-fit:** The page cuts to black like a film ending, via a fade transition.

**Motion:**
- **Entry:** fade to black, then the roll starts at about 40px/s.
- **Scroll:** scrolling scrubs through the roll.
- **Skip credits:** jumps to the end.
- **Idle:** the post-credits loop plays.

**Fallback:** A static credits list.

**Use when:** film, games, agencies, portfolios, launch microsites. **Skip when:** e-commerce and utility SaaS.

---

## 6. Keeping the 10 distinct

Every style differs from every other in at least two of: medium, trigger, what it's a metaphor for.

| # | Style | Medium | Main trigger | Secondary trigger | Metaphor | Weight |
|---|---|---|---|---|---|---|
| 31 | Assembling ASCII | Canvas characters | Entry | Cursor ripple | Image made of text | Medium |
| 32 | Googly-Eye Watchers | SVG / Rive | Cursor | Click blink | Audience / characters | Light |
| 33 | Cascade Range | Layered SVG + CSS loop | Ambient | Scroll / cursor parallax | Landscape | Medium |
| 34 | Swarm Wordmark | Particles (canvas / WebGL) | Entry (converge) | Cursor repel | Flock | Heavy |
| 35 | Magnetic Dot Field | CSS mask + transforms | Cursor | Idle fade | Surface | Very light |
| 36 | Plucked Strings | Polylines + Web Audio | Cursor | Opt-in sound | Instrument | Medium |
| 37 | Growing Garden | SVG draw-on | Entry | Ambient sway / wind | Growth | Light |
| 38 | Rain-on-Glass | WebGL refraction + canvas fog | Ambient | Cursor wipe | Window / weather | Heavy |
| 39 | Elastic Stretch | CSS transforms | Scroll-linked | End-of-scroll bounce | Taffy / material | Very light |
| 40 | Closing Credits | Type + timeline | Entry | Scroll scrub | Film ending | Light |

**Cut from the top 10 but worth keeping:**
- **Liquid Gradient Bloom** (Amaterasu, Dia): too close to style 13, Aurora Glass.
- **Breakable Type** (studiors): too close to style 06, Physics Pile.
- **3D Mascot with Directions** (Bike Time).
- **AI Orb** that types a sales pitch (Billodesign).
- **Lottie 3D back-to-top arrow** (Jonas Emmertsen).
- **Fireflies at night:** a canvas firefly simulation ([Gist](https://gist.github.com/AnanthaRajuC/35df564326efcb73eace)).
- **Horizontal wave footers** ([Alvaro Trigo](https://alvarotrigo.com/blog/website-footers/)).

---

## 7. Guardrails for animated footers (in addition to the first document's)

1. **`prefers-reduced-motion`:** every style needs a still or minimal state. Alistair Shepherd's parallax resets its transform in that media query ([Alistair Shepherd](https://www.alistairshepherd.uk/writing/parallax-svg-landscape-1/)).
2. **Pause when off-screen:** stop requestAnimationFrame loops and shaders via IntersectionObserver, and start them only when the footer is near.
3. **Real content stays in the DOM:** canvases get `aria-hidden`, and links, name and legal are real text.
4. **Touch has no hover:** map cursor effects to tap, drag or scroll, or turn them off. Say which, per style.
5. **Sound is opt-in only,** with a visible toggle that's off by default.
6. **Performance budgets:**
   - **Keep filter areas small.** SVG filters aren't well optimised, so limit the animated area, iterations and blurs ([Smashing](https://www.smashingmagazine.com/2021/09/deep-dive-wonderful-world-svg-displacement-filtering/)).
   - **Watch DOM-grid sizes.** One div per pixel gets slow on large grids, especially on first render ([Fancy Components](https://www.fancycomponents.dev/docs/components/background/pixel-trail)).
   - **Cap ASCII in a `<pre>`** at about 12k characters at 30fps ([GitHub](https://github.com/iart-ai/web-animation-skills/blob/main/skills/ascii-animation/SKILL.md)).
   - **Keep Rive characters under the vertex caps:** about 500 for simple elements, 5,000 for complex characters ([DEV](https://dev.to/uianimation/engineering-interactive-mascots-with-rives-state-machine-and-runtime-architecture-4e2h)).
7. **Scale canvases by `devicePixelRatio`** so they're sharp on retina screens ([YouTube](https://www.youtube.com/watch?v=WSFVNidSJlI)).
8. **Check CSS scroll-timeline support** with `@supports (animation-timeline: view())` and fall back to IntersectionObserver ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline/view)).

---

## 8. Carousel spec lines 31–40 (paste after spec 30 in `footer-carousel-prompt.md`)

**Showing motion on a still slide:** each mockup shows a **cursor glyph** (a black arrow with a white outline) at the point of interaction. Motion is drawn as **ghost trails** (2–3 fading copies at 30%/15% opacity) and **thin motion arcs** (1.5px dashed, with arrowheads). Add a small **3-frame strip** under the card (before / during / after, each about 22% of card width) and a **TRIGGER** row in the SPEC card. If your tool can export video, render a 4–6s loop per slide instead.

31 ASSEMBLING ASCII FOOTER | hook: "built from characters" | sliver: a light page section lifting up with a large shadow (curtain reveal) | ART: two ASCII-rendered hands (JetBrains Mono 10px, ramp " .:-=+*#%@", #E8E8E8 on #0A0A0A) entering from the left and right edges, with 2 small clusters of highlighted cells (inverted: white block, black character) near the cursor | TYPE: the name split into two huge words (Inter Tight 800, about 180px) at opposite bottom edges, half-risen from a mask; links 14px in a centre column, half revealed line by line | LAYOUT: full-screen, hands flanking, links centred, name at the base | COMPONENTS: live-clock chip, back-to-top | PAGE-FIT: page card slides up over a fixed black footer | MOTION/TRIGGER: entry (hands slide in, characters rise), cursor (hands lean, hover ripple); frame strip: hands off-screen → halfway in → settled with a ripple.

32 GOOGLY-EYE WATCHERS | hook: "they're watching you scroll" | sliver: cream #FFF6E9 page | ART: 6 flat SVG blob characters (#FF6B4A, #2F6BFF, #FFC83D, #16A34A, #F472B6, #111) of heights 60–140px peeking over the footer's top edge; each has 2 googly eyes (white circle, black pupil, white highlight), and all pupils point toward a cursor at the upper right; one mid-blink | TYPE: Bricolage Grotesque, links 16px, wordmark "peekaboo" 64px | LAYOUT: characters along the top edge, a 4-column doormat, legal row | COMPONENTS: tooltip on one character "pet me", newsletter pill | PAGE-FIT: characters straddle the boundary, heads over the cream page, bodies in the footer's colour #1E1B4B | MOTION/TRIGGER: cursor (eyes track, springy wobble), entry (characters rise 40px), click (blink); frame strip: hidden → peeking → all eyes on the cursor.

33 CASCADE RANGE FOOTER | hook: "mountains with a running waterfall" | sliver: pale sky #E6EEF5 page | ART: 7 layered SVG mountain silhouettes (#CBD5E1 → #1E293B); a white-and-blue streaked waterfall ribbon falling from a cliff notch into a dark teal pool (#0F3B45) at the bottom; blurred white mist circles at its base; 3 ripple rings on the pool | TYPE: Fraunces 56px wordmark "Cascade" in the sky; links 14px cream on the pool | LAYOUT: brand and newsletter in the sky (top 40%), mountains in the middle, 4 link columns on the pool (bottom 25%) | COMPONENTS: "Trail status: OPEN ●" chip, newsletter input | PAGE-FIT: the sky matches the page colour, so the horizon rises from the page | MOTION/TRIGGER: ambient (water loop, mist), scroll and cursor parallax, entry (waterfall switches on from the top), hover (pool ripple); frame strip: dry cliff → water halfway down → full falls and mist.

34 SWARM WORDMARK FOOTER | hook: "the logo is a flock" | sliver: near-black #07070A page with 10 stray dots drifting up | ART: about 2,500 small dots (1.5–2.5px) forming the wordmark "FLOCK" with an #7C3AED → #22D3EE gradient across X; a circular void around the cursor where dots are pushed out, with ghost trails of dots springing back | TYPE: the dots are the wordmark; links IBM Plex Mono 13px #9CA3AF in a top row | LAYOUT: links top, wordmark centre-bottom 60% | COMPONENTS: "shake ✦" button, status chip | PAGE-FIT: dark continuation, particles leak upward | MOTION/TRIGGER: entry (dust converges into letters), cursor (repel and spring back), click (shockwave); frame strip: scattered dust → half-formed letters → formed wordmark with a cursor void.

35 MAGNETIC DOT FIELD FOOTER | hook: "the grid notices you" | sliver: white page with the same 16px #E5E5E5 dot grid | ART: dot grid continues into the footer; a 220px soft disc of darker #111 dots around the cursor; a short trail of 4 fading accent (#FF4D00) pixel squares behind it | TYPE: Inter 14px links; "Let's talk" 40px inside a 240px black circle | LAYOUT: 12-column grid, 3 link columns on the left, magnetic CTA circle on the right, legal row | COMPONENTS: magnetic CTA, email copy chip "hello@… ⧉" | PAGE-FIT: same grid as the page; the footer is where it starts responding | MOTION/TRIGGER: cursor (spotlight, links and CTA pulled toward the pointer), idle (fade); frame strip: calm grid → spotlight on a link (link offset toward the cursor) → CTA pulled.

36 PLUCKED STRINGS FOOTER | hook: "hover to play the footer" | sliver: charcoal #111 page ending with a thin rule | ART: 24 horizontal 1px #E5E5E5 lines, 12px apart, broken wherever they cross the letters of "RESONANCE", so the word appears as negative space; 3 lines near the cursor bowed into waves, with small note glyphs ♪ rising | TYPE: word shown only by the gaps; links JetBrains Mono 13px | LAYOUT: line field top 60%, links and legal below | COMPONENTS: 🔈 sound toggle labelled "sound off" | PAGE-FIT: first line sits exactly on the boundary like a music staff | MOTION/TRIGGER: cursor (pluck, damped ripple), opt-in sound; frame strip: still lines → cursor crossing → lines ringing out.

37 GROWING GARDEN FOOTER | hook: "it blooms when you arrive" | sliver: soft sage #EEF3EA page | ART: a flowerbed of SVG stems and flowers (tulips #F472B6, daisies #FFFFFF with #FFC83D centres, ferns #16A34A) growing up over the footer's top edge; about half fully bloomed, a few half-drawn stems | TYPE: Instrument Serif 48px "Rooted", links 15px Inter | LAYOUT: flowerbed along the top, link columns in the soil-brown #3B2A20 footer, watering-can back-to-top icon | COMPONENTS: one flower per link group, watering-can button | PAGE-FIT: flowers rise over the boundary into the sage page | MOTION/TRIGGER: entry (stems draw on, flowers bloom), ambient sway, cursor as wind, hover (a flower opens); frame strip: bare soil → sprouts → full bloom.

38 RAIN-ON-GLASS WINDOW FOOTER | hook: "wipe the fog" | sliver: warm wall-coloured #E9DCCB page | ART: [GENERATED IMAGE] a night-city bokeh photo behind glass; about 40 CSS/SVG raindrops (radial-gradient highlights) with 3 trailing streaks; a translucent white fog layer with one clear swipe where the cursor wiped, and handwritten "come in, it's warm" (Caveat 40px) traced into the fog | TYPE: Caveat for the fog writing; links Inter 14px on a wooden sill bar | LAYOUT: 3 panes separated by 10px mullions (one link group per pane), sill bar at the bottom for legal and address | COMPONENTS: "clear the glass" button, "Open until 23:00" chip | PAGE-FIT: the wall colour frames the window | MOTION/TRIGGER: ambient (drops), cursor (wipes fog, fog re-forms); frame strip: fully fogged → wipe in progress → message revealed.

39 ELASTIC STRETCH FOOTER | hook: "pull the page like taffy" | sliver: white content section whose bottom edge sits over the footer (sticky slide-out) | ART: 7 full-width colour bands (#FF3B30, #FF9500, #FFCC00, #34C759, #00C7BE, #007AFF, #AF52DE) anchored to the bottom and stretched to unequal heights (top band tallest), with thin motion arcs showing upward stretch | TYPE: "STRETCH" in Anton, scaled tall about 2× on Y, white, over the bands; links 14px in a row above | LAYOUT: links row, then the wordmark over the bands | COMPONENTS: "↑ top" button | PAGE-FIT: slides out from under the content | MOTION/TRIGGER: scroll-linked stretch, bounce at the end; frame strip: flat bands → stretching → full taffy.

40 CLOSING CREDITS FOOTER | hook: "the site ends like a film" | sliver: the last page section fading to black | ART: black with faint film grain and a thin letterbox; small looping mascot illustration at the bottom-right as a "post-credits scene" | TYPE: credits in a condensed serif; roles 11px uppercase letter-spaced #9CA3AF, names 20px white, centred "ROLE ········ NAME" (Directed by → Ferro Studio; Starring → our clients; Music by → Figma, GSAP, Three.js; Filmed at → Lisbon; Special thanks → you), then "THE END" 48px | LAYOUT: centre credits column, "↺ Replay" button under THE END, fixed thin bar at the bottom with the real links and legal | COMPONENTS: Replay (back to top), "Skip credits ⏭" pill, fixed legal bar | PAGE-FIT: the page cuts to black like a film ending | MOTION/TRIGGER: entry (fade to black, credits roll upward), scroll scrubs, skip; frame strip: fade → rolling names → THE END with Replay.

---

## 9. Data limitations (updated)

| Item | Status | Fallback used |
|---|---|---|
| footer.design category and filter pages | Still render only navigation | Individual `/sites/` pages (12 analysed). The **Styles/Type tag values** on those pages were empty in the crawl, so I didn't use footer.design's own style labels |
| Awwwards element pages | Title only, no media or description | Tags from search results. Behaviour is **inferred from tags**, not observed |
| Muzli, Unsection, Lapa Ninja, Saaspo, React Bits Dot Grid | Unreadable or failed | Excluded. The dot-grid technique came from Stitch/tuanhuynh and Fancy Components |
| Matter.js footer tutorial video (4mjOyqL-XbM) | No transcript | Technique covered by Fancy Components' Gravity docs and Codegrid's glyph-physics video |
| Screenshot analyses (section 2) | AI visual analysis of static images; hex values and font names are **estimates** | Check against the live sites before copying anything exactly |
| "Motion hints" for footer.design entries | Inferred from static screenshots | Not confirmed; open the live site to check |
| Performance numbers (particle counts, spring constants, radii) in section 5 | My starting values, **not sourced benchmarks**, except where a source is cited (the `<pre>` ~12k characters at 30fps, Rive vertex caps) | Profile on your target devices |
| Source dates | Codegrid videos 2026 (glyph video on 2026-08-16); footer.design entries dated Feb–Sep 2026; Garden Party HM Apr 2024; int3ractive waterfall 2012; Codrops rain 2015; Codrops water 2019; Smashing 2021 | The older techniques still work. Treat their exact code as historical |
