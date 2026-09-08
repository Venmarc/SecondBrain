# Deep-dive 1 — Cursor-follow mascot footer

**Goal:** A blue, fluffy, nonchalant creature in/near the footer whose eyes track the pointer. Craft-demo first (GIF/video for X), not a full site ship.

## How it works

Three real patterns:

| Approach | Fit | Notes |
|----------|-----|--------|
| **Rive state machine** | Best “alive” feel | Numeric inputs drive gaze. Codrops *Valley Adventures* uses `Axis_X` / `Axis_Y` (0–100) via `useStateMachineInput`. Newer mascot guides use ViewModel `lookX` / `lookY` (−1…1) with `useViewModelInstanceNumber` + `autoBind`. |
| **CSS/JS dual-eye MVP** | Fastest post | Two pupil elements; `pointermove` maps viewport → clamped pupil offset; `prefers-reduced-motion: reduce` parks eyes center. |
| **Lottie** | Skip for live track | Great loops; live cursor follow is awkward. |
| **Spline / 3D** | High wow, heavy | Awwwards *Bike Time* style. Avoid as default on Latitude E6320. |

### Rive (preferred final)

1. Artboard with separate layers: body, head, L/R eye whites, L/R pupils (± brows).
2. Either:
   - **Constraints / mouse-tracking group** in Rive editor + State Machine inputs (`Axis_X`, `Axis_Y`), or
   - **ViewModel** numbers `lookX`, `lookY` bound to pupil positions.
3. In React/Next: `@rive-app/react-canvas`, listen to pointer, normalize, `setValue` / set `.value` on inputs.
4. Idle: breathe + blink on a looping state; gaze overlays without killing idle.

**Normalize (ViewModel style):**
```text
relativeX = (clientX - left) / width
lookX = clamp(relativeX * 2 - 1, -1, 1)   // same for Y
```

**Normalize (Valley Adventures style):**
```text
Axis_X = (clientX / innerWidth) * 100
Axis_Y = 100 - (clientY / innerHeight) * 100
```

Sources:
- https://tympanus.net/codrops/2025/05/12/integrating-rive-into-a-react-project-behind-the-scenes-of-valley-adventures/
- https://dev.to/mascotengine/how-to-integrate-an-interactive-rive-mascot-into-a-react-or-nextjs-web-app-412j
- https://rive.app/docs/runtimes/react/data-binding

### CSS/JS MVP (ship a post this week)

- Footer row: links left, mascot right (~160px).
- Eyes = white circles; pupils = darker circles with `transform: translate(...)`.
- Track document or footer `pointermove`; clamp so pupils stay inside whites.
- `pointer-events: none` on mascot graphic so links stay clickable; or sit mascot beside columns.

## Art / character brief

**Character:** soft blue fluffy round body, small bored eyes, slight smirk, sitting. Nonchalant — “unimpressed studio pet,” not hustle-bro.

**Must separate for Rive:** head, body, L eye white, R eye white, L pupil, R pupil, optional brows. Pupils free to move inside whites. Readable at 120–200px tall.

**Image-model prompt:**
```text
Cute fluffy round mascot, soft blue fur, small bored eyes, slight smirk, sitting,
simple shapes, mascot character sheet, front 3/4 view, plain background, no text,
flat soft cel shading, layers ready for animation, nonchalant expression
```

Negatives: `busy background, hyper-detail fur noise, multiple characters, text, logo, scary, chibi overload`

## Layout (footer)

- Sparse link columns + mascot in a clear corner.
- Protect contrast: solid or soft band behind type (Victor’s Footer_Design_Style rule).
- Mobile: mascot shrinks or sits above legal line; disable heavy tracking if needed.

## Post angle (create→post)

1. 6–10s screen recording / GIF: cursor moves, eyes follow, one blink.
2. Caption craft: “footer doesn’t have to be a spreadsheet” + one sentence on Rive vs CSS eyes.
3. Optional thread: character sheet → layered file → live track.

## Effort + pitfalls

- **Effort:** CSS MVP = half day. Rive character + bind = 1–3 days depending on art.
- **Pitfalls:** pupils leave eye whites; mascot blocks links; no reduced-motion; AI mascot looks generic blue blob — fix with unique silhouette via random alphanumeric design-language seed.
- **Anti-slop:** one emotion (bored), limited palette, no sparkles/stock “AI mascot” pose.

## Next executable steps

1. Generate 4–6 character sheets from the prompt; Victor picks silhouette.
2. Build CSS dual-eye footer stub (static HTML) for GIF proof.
3. If keeping: move art into Rive with lookX/lookY or Axis_X/Y.
4. Add `prefers-reduced-motion` off-ramp.
5. Draft X post (no publish until Victor’s yes).
