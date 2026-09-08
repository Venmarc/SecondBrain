# 01 — Cursor-follow mascot (blue fluffy, bored-cute)

> Craft post first. Footer-scale character (120–200px). Eyes track pointer. Distinctive, not AI-slop. Old-laptop friendly: prefer 2D (Rive or CSS/JS), skip heavy 3D.

## Goal

Ship a **post-worthy demo** of a blue, fluffy, nonchalant mascot whose eyes follow the cursor in a footer-like strip — readable link row above, character parked bottom-right (or bottom-center) without fighting type. Prove personality + craft, not ship a production site.

Aligns with Victor’s Footer_Design_Style rules: art simple enough not to fight text; text-safe zone; SVG/sharp low-weight preferred; site-related OR abstract OK.

---

## How it works (concrete technique)

### Option A — Rive state machine (`lookX` / `lookY`) — craft ceiling

**Best for:** the X post that looks “agency,” reusable `.riv` asset, blink + idle + gaze in one file.

**Mechanism (two common patterns):**

1. **Numeric inputs + blend states (Valley Adventures pattern)**  
   Codrops documents Valley Adventures using a State Machine with numeric inputs (`Axis_X` / `Axis_Y`, same idea as `lookX` / `lookY`). JS normalizes pointer position and writes into those inputs; Rive blends look-left / look-right / look-up / look-down timelines.  
   Source: [Integrating Rive into a React Project: Behind the Scenes of Valley Adventures](https://tympanus.net/codrops/2025/05/12/integrating-rive-into-a-react-project-behind-the-scenes-of-valley-adventures/)

   Typical normalize (0–100 range, matching many Rive setups):

   ```js
   // Viewport-relative (Valley-style)
   numX.value = (e.clientX / window.innerWidth) * 100;
   numY.value = 100 - (e.clientY / window.innerHeight) * 100;
   ```

2. **ViewModel data binding (`lookX` / `lookY` as −1…1)**  
   Newer Rive React hooks bind `lookX` / `lookY` via `useViewModelInstanceNumber`. Pointer coords are normalized relative to a container, clamped to `[-1, 1]`, then pushed into the ViewModel.  
   Source: [How to Integrate an Interactive Rive Mascot into a React or Next.js Web App](https://dev.to/mascotengine/how-to-integrate-an-interactive-rive-mascot-into-a-react-or-nextjs-web-app-412j)

   ```js
   const relativeX = (event.clientX - bounds.left) / bounds.width;
   const relativeY = (event.clientY - bounds.top) / bounds.height;
   const clampedX = Math.max(-1, Math.min(1, relativeX * 2 - 1));
   const clampedY = Math.max(-1, Math.min(1, relativeY * 2 - 1));
   setLookX?.(clampedX);
   setLookY?.(clampedY);
   ```

3. **Editor-side “joystick” / distance constraint**  
   Inside Rive: listener Align Target → joystick bone with Distance Constraint so pupils never leave the sclera; X/Y of joystick drive the blend. Documented in community deep-dives such as [Engineering Interactive Mascots with Rive's State Machine](https://dev.to/uianimation/engineering-interactive-mascots-with-rives-state-machine-and-runtime-architecture-4e2h). Marketplace starter: [Interactive Eyes Follow Mouse](https://rive.app/marketplace/25312-47233-interactive-eyes-follow-mouse/).

**Runtime pick for old laptops:** start with `@rive-app/canvas` (smaller); escalate to `@rive-app/webgl2` only if vector feathering / quality needs it. Rive docs compare canvas vs WebGL2: [Canvas vs WebGL](https://rive.mintlify.dev/docs/runtimes/web/canvas-vs-webgl) (also mirrored under rive.app docs).

### Option B — CSS/JS dual-eye MVP — fastest craft post

**Best for:** same-day GIF. Two eye whites + two pupils; `pointermove` → `atan2` / relative offset → `transform: translate(...)` on pupils (compositor-friendly).

Classic pattern (relative to each eye’s `getBoundingClientRect`, clamp pupil travel to ~3–6px for a 40px eye):

```js
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduce) return; // static stare

window.addEventListener('pointermove', (e) => {
  pupils.forEach((pupil) => {
    const rect = pupil.parentElement.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const max = 5; // px — footer-scale eyes
    const dist = Math.min(Math.hypot(dx, dy), max);
    const angle = Math.atan2(dy, dx);
    const x = Math.cos(angle) * dist;
    const y = Math.sin(angle) * dist;
    pupil.style.transform = `translate(${x}px, ${y}px)`;
  });
}, { passive: true });
```

Tutorial pattern reference: [Creating a Mouse Tracking Eye Effect With JavaScript](https://dev.to/salehmubashar/creating-a-mouse-tracking-eye-effect-with-javascript-31i9).

### Option C — Lottie — **skip for this hook**

Lottie is excellent for **playback** (loops, onboarding clips). It is weak for continuous, stateful cursor binding: no first-class state machine / number inputs like Rive; you’d re-implement gaze in JS against a static JSON timeline. Rule of thumb from 2026 comparisons: *Lottie for motion that plays; Rive for motion that responds* — see [Rive vs Lottie (2026)](https://www.shaheermalik.com/compare/rive-vs-lottie).

### Option D — Spline / 3D — **caveats for Victor’s old laptop**

Bike Time’s Awwwards element is literally “[Interactive Footer with a 3D animated Mascot](https://www.awwwards.com/inspiration/3d-mascot-and-directions-in-footer-design-bike-time)” on [Bike Time](https://www.awwwards.com/sites/bike-time) (Face44). Beautiful reference — **wrong weight class** for a craft post on older hardware. Spline/WebGL 3D is heavier than 2D Rive; comparisons note 3D can lag on older devices ([Rive vs Spline](https://www.shaheermalik.com/compare/rive-vs-spline), [Figma vs Spline vs Rive](https://www.illustration.app/blog/figma-vs-spline-vs-rive-for-micro-interaction-design-in-2026)). **Use Bike Time as moodboard only; implement 2D.**

### Accessibility — `prefers-reduced-motion`

Cursor-driven motion is exactly the class of animation that must gate on reduced motion (vestibular risk). Josh Comeau’s guide remains the practical reference: [Accessible Animations with prefers-reduced-motion](https://www.joshwcomeau.com/react/prefers-reduced-motion/).

**Footer demo requirements:**

- CSS: idle blink / bob only inside `@media (prefers-reduced-motion: no-preference)`.
- JS: if `(prefers-reduced-motion: reduce)`, **do not** attach `pointermove`; leave eyes centered (or a fixed bored glance).
- Prefer `pointer` events over mouse-only so pen/trackpad behave; on coarse pointers, optional: disable gaze or look at focused link instead.

---

## Build / art pipeline (step-by-step)

### Character brief (give to illustrator / self)

| Spec | Value |
|------|--------|
| Color | Blue fluff — one hero blue + 1–2 shade/tint; avoid rainbow fur |
| Personality | Nonchalant, bored-cute; half-lidded eyes; slight frown or flat mouth |
| Scale | Footer display 120–200px tall |
| Silhouette | Soft blob / creature; readable at 120px |
| Anti-slop | Hand-drawn or vector construction; no plastic “AI mascot” sheen, no six-finger hands, no generic stock “cute animal” |

### Layer requirements (Illustrator / Figma → Rive or SVG)

Export as **separate named layers**, not a flattened PNG:

1. `body` — fluff silhouette (static or subtle breath)
2. `face_base` — muzzle / face plate
3. `eyeL_white`, `eyeR_white` — sclera (fixed)
4. `pupilL`, `pupilR` — **must be independent** for dual-eye MVP; for Rive, parent under eye sockets
5. `lidL`, `lidR` (optional) — blink
6. `browL`, `browR` (optional) — boredom micro-expression
7. `highlight` (optional) — tiny catchlights parented to pupils

**Do not** merge pupils into eye whites. Rive needs pupils (or a look-target bone) as transformable nodes.

### Path pick

| Path | When | Effort |
|------|------|--------|
| **CSS/JS MVP** | Need GIF tomorrow | 0.5–1 day |
| **Rive** | Want craft ceiling + reuse | 2–4 days (draw + rig + embed) |
| **Spline** | Avoid for this constraint set | — |

### Tiny demo plan (craft post)

1. Single HTML file or Vite vanilla: footer bar with 4 fake links + copyright.
2. Mascot absolute bottom-right, `pointer-events: none` on canvas/SVG so links stay clickable.
3. Text-safe zone: solid or soft gradient band behind link row (`min-height` ~56–72px, contrast AA).
4. Record 6–10s screen capture: cursor sweeps L→R→up→down; mascot eyes track; one blink; end on bored stare.
5. Export GIF/MP4 for X; caption = craft, not “new site launch.”

---

## Prompt recipes or asset brief (exact copy-pasteable)

### Illustrator / Figma art brief

```
Character: blue fluffy mascot, footer scale 120–200px, bored-cute / nonchalant.
Eyes: large half-lidded; separate white + pupil layers for L and R.
Style: soft vector or inked fluff clumps; limited palette (1 blue + 2 values + cream belly optional).
Pose: sitting / loafing, facing 3/4 or front; calm, not waving.
Deliverables: layered SVG (or PSD/AI with named layers) + flat PNG preview.
NO: glossy 3D render, hyper-detail fur, busy props, text inside character.
```

### Optional Midjourney / Flux *concept* sketch only (then redraw by hand)

```
Positive:
single blue fluffy creature mascot, soft rounded silhouette, half-lidded bored eyes,
cute but nonchalant, simple vector-friendly shapes, cream belly, sitting loaf pose,
plain pastel background, character design sheet, limited color palette --stylize low

Negative:
3d render, unreal engine, photoreal fur, busy background, text, watermark,
extra limbs, deformed face, shiny plastic, anime sparkle overload
```

**Rule:** treat gen output as thumbnail reference only; final footer asset is hand-layered SVG/Rive so it stays distinctive.

### Rive input contract (hand to yourself / animator)

```
State Machine: "MascotSM"
Number inputs: lookX (−1…1 or 0…100 — pick one and document), lookY (same)
Optional: blink (trigger), isBored (boolean)
Export: mascot-footer.riv ≤ ~150KB if possible
```

---

## Named public references (with URLs)

| Ref | Why it matters | URL |
|-----|----------------|-----|
| Valley Adventures × Rive (Codrops) | Production mouse-axis → State Machine pattern | https://tympanus.net/codrops/2025/05/12/integrating-rive-into-a-react-project-behind-the-scenes-of-valley-adventures/ |
| Bike Time footer mascot (Awwwards) | Interactive footer mascot mood (3D — reference only) | https://www.awwwards.com/inspiration/3d-mascot-and-directions-in-footer-design-bike-time |
| Bike Time site page | Full site context | https://www.awwwards.com/sites/bike-time |
| Rive marketplace eyes demo | Minimal look-follow file to reverse-engineer | https://rive.app/marketplace/25312-47233-interactive-eyes-follow-mouse/ |
| RiveFlow pointer tracking notes | Up/Down/Left/Right blend + JS `xAxis`/`yAxis` | https://riveflow.webflow.io/examples-2/pointer-tracking |
| prefers-reduced-motion (Comeau) | A11y implementation pattern | https://www.joshwcomeau.com/react/prefers-reduced-motion/ |
| DICH Fashion (Codrops) | Non-boring footer craft energy (type/lines, not mascot) | https://tympanus.net/codrops/2025/06/02/dich-fashion-a-new-era-of-futuristic-fashion/ |
| Sandy Shore underground footer | Illustrative footer as brand moment | https://www.awwwards.com/inspiration/underground-footer-sandy-shore · live pattern: https://sandyshore.ca |

---

## Post angle (what to show on X without shipping full site)

**Format:** 1 short screen recording (or GIF) + 2 stills (layer board + footer mock).

**Hook line options:**

- “Footer mascot that clocks you. 2D, not a 40MB WebGL toy.”
- “Bored blue fluff. Eyes on the cursor. Links still readable.”

**Show:**

1. Eyes tracking across a fake nav row.
2. Reduced-motion: same frame frozen / no track (credibility beat).
3. Optional: one “before” flat PNG vs “after” live track.

**Do not** claim a live client URL. Label as craft study / create→post.

---

## Effort estimate + pitfalls / anti-slop

| Path | Estimate |
|------|----------|
| CSS/JS dual-eye + SVG body | **3–8 hours** |
| Hand character + Rive rig + embed | **2–4 days** |

**Pitfalls**

- Pupils fused into eye artwork → can’t track.
- Tracking on `body` with no clamp → pupils escape sclera (uncanny).
- Canvas stealing clicks → wrap mascot `pointer-events: none`.
- Spline “because Bike Time” → tanks old laptop; post dies in recording.
- Over-animated bob + track + particles → fights footer text; keep motion in the face only.
- AI-gen final asset → generic “blue animal”; redraw silhouette by hand.

**Anti-slop checklist**

- [ ] Limited palette  
- [ ] Half-lids / bored mouth (personality > cute)  
- [ ] Visible craft: construction or Rive inputs on a second slide  
- [ ] Text contrast verified on the link row  

---

## Next executable steps (Schipper can run)

1. **Sketch 3 thumbnails** of the blue loaf (front / 3⁄4 / side) at 200px; pick the most readable silhouette.
2. **Build the CSS/JS dual-eye MVP** in a single `index.html` with a footer strip and four placeholder links; gate on `prefers-reduced-motion`.
3. **Record a 8s GIF** (cursor sweep + blink) and draft the X caption; post as craft study.
4. **If engagement warrants:** redraw into layered SVG → import to Rive → add `lookX`/`lookY` blend + blink trigger; swap MVP canvas for `.riv`.
5. **Optional study hour:** open Valley Adventures Codrops article + Rive marketplace eyes file; mirror their input naming in your file for less JS friction.

## Built (2026-09-08) — CSS dual-eye MVP

**Runnable demo:** [[demo/mascot-css-mvp/index.html|demo/mascot-css-mvp/index.html]] (single file, no build).

**Open on PC:**
```bash
xdg-open ~/Documents/SecondBrain/03-Resources/Design/Footer-Non-Boring/demo/mascot-css-mvp/index.html
```

**What it does:** inline SVG blue fluffy bored-cute mascot (~168px); pupils track `pointermove` with clamp; idle breathe + blink only under `prefers-reduced-motion: no-preference`; mascot `pointer-events: none` so footer links stay clickable.

**Not yet:** Rive `.riv` upgrade (optional next). No external post.

**How-to / notes:** [[demo/mascot-css-mvp/README|README]]

**Screenshot:** [[demo/mascot-css-mvp/shot-footer-eyes.webp|shot-footer-eyes.webp]]
