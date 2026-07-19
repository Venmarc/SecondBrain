---
date: 2026-07-19
agent: opencode
model: z-ai/glm-5.2
project: feel-alive UI design system — Unit 6 Build lane
step: 4 of N (swarm does not render — visual rep NOT shipped; recovery)
status: in_progress
tags: [session-summary, pastries, build-lane, antigravity, swarm, webgl, bug, recovery]
---

# Step 4 Session Summary — Swarm shader silently fails; Build lane NOT actually shipped

> Per the per-step session-summary rule (Pastries `AGENTS.md` Hard Rule 9,
> derived from the 2026-07-19 GLM-5.2 context-overflow crash). The prior
> "Step 1 / Step 2 / Step 3 (final log)" summaries were written on the
> belief that the build had shipped — **it had not, visually**. This file
> corrects that belief and is the new starting point for the next agent.

## User prompts verbatim (this Step 4 segment)

1. **Opening check:** "Wait. The antigravity build and extraction was
   successful? I didn't get to see the swarm in action. The server is live
   but I just see the blinking cursor."
   **What it changed:** The "Build lane complete / Lighthouse 99" verdict
   from the prior handoff (`2026-07-19_opencode_Handoff.md`) is **not
   accepted** by the user. The LCP/Lighthouse numbers being technically
   accurate on the served HTML doesn't mean the swarm effect itself shipped.
   Recovery from "paperwork done, build unverified" → "verify the visual
   deliverable first, then close the unit."

2. **Directive (this message):** "Summarize this session. Let a new agent
   know that the swarm is still suspicious. It might not have been built.
   While other things have been complete, there's no visual rep of the
   swarm, only the blinking cursor. Check the glossary if it has been
   documented, and maybe because of the session switches we lost track of
   it. Remember the protocols to avoid session internal server errors.
   Let's diagnose this thing and fix it, build the swarm, confirm it
   passes lighthouse audit, then confirm antigravity swarm replication is
   over."
   **What it changed:** Authorized (a) a new step-summary checkpoint,
   (b) glossary verification (verify whether the swarm entry accurately
   reflects what was built — it might be wrong too), (c) the fixed
   context-overflow-safe protocol during diagnosis (no Lighthouse-JSON-
   in-conversation), and (d) the remaining workflow: diagnose → fix →
   Lighthouse → confirm closure.

## Context-overflow protection rules in force this session

> The crash on 2026-07-19 (`GLM-5.2_Context-Overflow_Crash.md`) and the
> prior Extract-lane crash (`Opencode_Agent_crash_session.md`) both came
> from the same root cause: one Build-lane conversation carrying too much
> context. Rules now in force (also Pastries `AGENTS.md` Hard Rule 10):
>
> - **Background servers** run under `setsid nohup ... >
>   /tmp/opencode/<name>.log 2>&1 < /dev/null & disown` — status checks
>   only via `ss -tlnp | grep` or `tail`/`grep` of the log. Never let
>   server stdout flow back through the bash tool.
> - **No Lighthouse JSON in conversation.** Run audits via throwaway
>   scripts in `/tmp/opencode/` that print only the 5 numbers you need
>   (perf, LCP, FCP, TBT, CLS).
> - **No long file contents in conversation.** Source files are grepped
>   for the specific patterns needed, not `cat`-ed whole.
> - **Per-step session summary** in this folder at the end of every
>   completed todo step (this file is one).
> - **`memory_save` at every major gate** so progress survives an
>   unexpected crash mid-recovery.

## Glossary state of the swarm entry (verified this step)

Searched `~/Documents/SecondBrain/03-Resources/Tools/Effects_Glossary.md`:

- The entry **`[Depth+Motion] Living-organism particle swarm with mid-page
  morph pair`** (around line 283) was promoted to `tried` in Step 2.
- Its **Verified log** entry (lines 403–412, added 2026-07-19) claims:
  "Built in `~/Pastries/rep-antigravity-swarm-typewriter/src/components/swarm/`.
  Lighthouse 99 perf." Both statements are **technically true but
  misleading**: the swarm canvas *is* built (file exists, code mounts the
  canvas, the Playwright spec passes on a `data-engine` attribute check),
  but nothing is drawn on it.
- The **regression was introduced by Step 2 verification being
  under-strict**: the Playwright Spec 1 only asserts
  `.swarm__canvas[data-engine="three.js r180"]` is in the DOM, not that it
  renders non-empty pixels. Lighthouse audits the loading profile, not the
  painted output. The verification workflow has a hole: a "passing" build
  can ship a black canvas without either gate flagging it.

So yes — the swarm was "documented as built," but the deliverable was
never visibly checked. This Step 4 is the audit that should have been
Step 7's feel-check.

## Diagnosis so far (confirmed in this session; not re-doable work)

### What's confirmed WORKING

- Preview server live, HTTP 200 on both `/` and `/depth`. (PID 170223
  on `:4173`, leftover from the crashed session — DO NOT spawn a new
  one; `ss -tlnp | grep :4173` before doing anything.)

- `dist/` is freshly built. Entry chunk `index-*.js` ~196 KB raw / 62 KB
  gzip; Three chunk ~516 KB raw / 129 KB gzip — these match the
  handoff's unit inventory.

- DOM at `t = 6.5 s` after `networkidle`, sampled via Playwright:
  - `.swarm` element exists, bounding box 1280×800, `position:absolute`,
    `inset:0`, `z-index:10`, opacity 1, visibility visible.
  - `.swarm__canvas` exists, width/height = 1280/800, opacity 1,
    `data-engine="three.js r185"` attribute is present.
    **(Note: the handoff said r180; actual installed Three is
    `0.185.1` → string correctly reads "three.js r185". The earlier
    Step 1 summary's "verified verbatim r180" claim was wrong; the spec
    passed because `data-engine` in the spec was loosened to substring
    `three.js`.)**
  - `.home__hero-content` is at z-index 20 (above the swarm), centered,
    max-width 900px — content is correctly stacked above canvas.
  - `.home__hero` has `overflow:hidden` + `isolation:isolate` —
    z-stacking is correct.
  - `prefers-reduced-motion` is `false` (motion path should run).
  - `--swarm-color-a: #e8b888; --swarm-color-b: #4a3a20;` both resolve
    in the dark theme.
  - `documentElement.className === "dark"` — theme is dark, so the
    bright warm accent swarm should be visible against
    `bodyBg: rgb(10, 10, 12)`.
  - Headline `.home__hero-headline.is-in` is set — entrance finished,
    text is visible.

### What's confirmed BROKEN

- **The canvas paints literally nothing.** Sampled 156 pixels on a
  coarse 80px grid across the 1280×800 canvas (via `2d context.drawImage`
  + `getImageData`). All 156 samples are `{r:0, g:0, b:0, a:0}` — fully
  transparent. **brightCount = 0.**

- **Browser console emits the WebGL impl warning repeatedly:**
  ```
  WebGL: INVALID_OPERATION: drawArrays: no valid shader program in use
  ```
  Emitted ~once per frame (~60/s, rAF running) — the animation loop is
  calling `renderer.render(scene, camera)` forever but the WebGL impl
  refuses to draw.

- **Compile + link are NOT the cause.** I patched
  `WebGLRenderingContext.prototype.shaderSource` and `compileShader` (and
  `linkProgram` for the program stage) via `page.addInitScript` BEFORE
  the swarm mount, captured compile/link failures to
  `window.__swarmDebug`, then ran the page for 7 s. **Zero compile
  errors. Zero link errors.** The program reaches Three's pipeline as
  valid.

- So the chain is: shader compiles OK + program links OK + drawArrays
  called → WebGL impl rejects because **no program is currently in use
  (`gl.useProgram` was never called with the linked program, OR was
  called with `null` and Three never re-made it current).**

### Three.js internals (read this from source, don't re-derive)

- Installed Three version: `0.185.1`
  (`node_modules/three/package.json`).
- `state.useProgram(program.program)` in three.module.js line 18522 is
  the only path that calls `gl.useProgram`.
- Three's `useProgram()` wrapper (line 10208) only calls `gl.useProgram`
  if `currentProgram !== program`. If Three's internal state believes
  the program is *already* current, `gl.useProgram` is skipped.
- In SwiftShader (Playwright headless), the GL context can be lost and
  restored without Three noticing — Three's `currentProgram` stays
  "what it was" but the underlying `gl.useProgram`-state resets to
  `null`, so Three skips the `useProgram` call forever, and every
  subsequent `drawArrays` fails because GL's current program is `null`.

  **(This is one plausible mechanism — unconfirmed. Could also be a
  geometry/material issue causing Three to never enter the
  `useProgram` branch in the first place.)**

### Plausible root causes for the next agent to investigate (priority order)

1. **Three's `WebGLRenderer` is being created and the rAF loop is
   running, but `gl.useProgram` is never called.** Either Three's
   `state.useProgram(program)` returns early every frame (because
   `currentProgram` was somehow initialized to the swarm's program), or
   `getProgram` is returning a cached `program` whose
   `program.program` (the GL handle) is `null`. Need to log
   `state.programs` + the actual `gl.getParameter(gl.CURRENT_PROGRAM)`
   after the first `renderer.render()` call.

2. **The `alpha: true` renderer + transparent particles + `transparent:true`
   + `THREE.AdditiveBlending` + dark background may be failing the
   depth/blend setup**, so Three's render pipeline bails before
   `drawArrays`. But this normally produces black pixels, not
   transparent pixels — the all-zero alpha is unusual.

3. **An exception thrown in the rAF loop after the first render attempt.
   Check `page.on('pageerror')` and `window.onerror` output.** I did
   not see one in this session's captures, but the swarm could be
   throwing and silently swallowed.

4. **`renderer.setPixelRatio` + `renderer.setSize` interaction.**
   `setSize(w, h, false)` updates the drawing buffer to CSS pixels, but
   `setPixelRatio` then expects `setSize` to have been called in CSS
   px. If `setSize` is called with container sizes that are 0 or NaN
   because the deferred-mount timing raced, the canvas could be
   0×0 internally even though the DOM element is 1280×800. To check:
   `gl.getParameter(gl.MAX_VIEWPORT_DIMS)` and
   `canvas.width` vs `canvas.style.width` after mount.

5. **Most likely (Victor-facing summary):** The build was shipped and
   "verified" by gates that don't check visual output (Playwright spec
   asserts DOM only; Lighthouse audits loading; review-animations
   audited the *code* via the skill but never saw the live canvas).
   The actual rendering was never eyeballed, and a quiet Three.js +
   headless-WebGL interop bug slipped past every gate.

## Files reference (this Step 4 segment, with context)

- `~/Pastries/rep-antigravity-swarm-typewriter/src/components/swarm/index.tsx`
  — The Swarm component (262 lines, read in this session). Deferred
  mount via `setTimeout(4000)` (line 88). ShaderMaterial with 7
  uniforms + 3 attributes: `position`, `aSeed`, `aColor`. Renders
  `THREE.Points` in a single rAF loop. Cleanup is careful. Looks
  structurally correct.

- `~/Pastries/rep-antigravity-swarm-typewriter/src/components/swarm/shaders.ts`
  — GLSL strings (223 lines, read in this session). snoise 2D + 3D
  verbatim from Ashima Arts. Vertex shader displaces `position` via
  snoise + multiplies `gl_PointSize` by `vAlive` (size-attenuation).
  Fragment shader uses `gl_PointCoord` for round sprite + `discard`
  outside radius 0.5. **The shaders compile clean in SwiftShader** —
  confirmed via `getShaderParameter` capture.

- `~/Pastries/rep-antigravity-swarm-typewriter/src/components/swarm/index.css`
  — 40 lines. `.swarm { position:absolute; inset:0; }`, hero variant
  same. Correctly layered below content (z-index 10 < 20).

- `~/Pastries/rep-antigravity-swarm-typewriter/src/pages/Home.tsx`
  — 135 lines. `Swarm` lazy-imported, wrapped in `<Suspense
  fallback={null}>` (line 46). Composed inside `.home__hero`. No
  route-dependent conditionals.

- `~/Pastries/rep-antigravity-swarm-typewriter/src/pages/Home.css`
  — 324 lines. No rule that hides the canvas. Hero content layered
  correctly. Reduced-motion and coarse-pointer gates kill the hero-
  hint animation only — they don't kill the swarm.

- `/tmp/opencode/home-probe.png` — Playwright screenshot from the
  diagnosed session (62 KB). Confirms the visual: blank dark page,
  hero headline visible, swarm area empty.
  (Note: this model can't view images; relay as evidence to a
  vision-equipped agent if visual confirmation is needed.)

- `/tmp/opencode/diagnostic.js` — not yet written. The next agent
  should write a small Playwright probe that:
    1. Mounts an **internal** diagnostic hook BEFORE Three loads
       (instrument `WebGLRenderingContext.prototype.useProgram` to
       log when it's called and with what; log
       `gl.getParameter(gl.CURRENT_PROGRAM)` once per rAF tick for the
       first 5 frames of the swarm).
    2. Logs the **first** `useProgram(null)` call vs the first
       `useProgram(<non-null>)` call. If `useProgram` is never called
       with a valid program at all, that's the smoking gun.
    3. Captures `page.on('pageerror')` outputs around the 4-s deferred
       mount boundary.

## What the next agent should do

(Priority order — stop at any step where the bug is fixed and visible;

the remaining steps can move back to medium.)

1. **Diagnose** the "no valid shader program in use" root cause.
   Primary mechanism candidates are listed above. The simplest
   instrumentation is to patch
   `WebGLRenderingContext.prototype.useProgram` BEFORE Three loads (via
   Playwright `addInitScript`) and log every call + the
   `gl.getParameter(gl.CURRENT_PROGRAM)` value before and after. Do
   this in a single bash call (~3k of output budget). DO NOT dump
   pages of GL state — be selective.

2. **Fix the swarm** so it visibly paints the dense particle field on
   the live `:4173` page. The fix might be:
   - Swapping `THREE.AdditiveBlending` → `THREE.NormalBlending` to
     isolate whether blend state is the culprit.
   - Forcing `renderer.setRenderTarget(null)` and `renderer.clear()`
     once before the first frame.
   - Setting
     `gl.debug true { required }` — no.
   - Or, if root cause suggests the build isn't recoverable in its
     current form, swap the ShaderMaterial for a `PointsMaterial` +
     per-vertex colors with no displacement — even a basic
     non-noise-driven swarm visibly rendering is strictly better
     than the current black canvas. The glossary entry will need an
     updated verified-log if the technique changes materially.

3. **Verify visually** — same diagnostic loop, but `brightCount`
   should be > 0. Capture 1 screenshot. Print the count.

4. **Re-run Lighthouse** via a throwaway script in
   `/tmp/opencode/relh.mjs` that prints only the 5 numbers per route.
   Both routes must stay ≥ 95 perf. Goal: still 99/99.

5. **Update the glossary verified-log entry** for the swarm (lines
   403–412 in `Effects_Glossary.md`) to reflect the reworked
   technique + new Lighthouse numbers + the date stamp 2026-07-19
   (Revised). Read the 7-field template format carefully before editing
   — the Step 2 summary documents the template.

6. **Update `tests/effects.spec.mjs` Spec 1** to assert visible
   rendering, not just DOM presence. A minimal check: after 7 s,
   draw the canvas to a 2D context, sample a coarse grid, assert
   `brightCount > 5`. (The current spec is too weak — it's why the
   regression escaped.) Same idea for Spec 3 (mesh) and Spec 4 (film
   grain) ideally, but only Spec 1 is required for this recovery.

7. **Write Step 5 summary** in this folder when the swarm visibly
   renders + Lighthouse ≥ 95 holds. Then the unit is actually closed.

8. **Final `memory_save`** at the end with the new understanding of
   what shipped + what changed. Update `mem_mrrj1d6g_139dac58faee`
   by saving a new memory that supersedes it (also note its own ID
   in the new memory's body for traceability).

## Failures / subagent snags this step

- The single most important "failure" is the fact that the prior
  recovery (Steps 1–3) closed the unit on the basis of Lighthouse + a
  DOM-only Playwright spec without ever eyeballing the canvas. The
  glossary's Build-Playbook Step 8 (Feel check) was effectively skipped
  or the audit skills ran against source rather than the live page.

- No subagents dispatched this step. Single-agent session.

## Lessons worth remembering (save to agentmemory at end of this recovery)

1. **A WebGL build is not "shipped" until you've sampled non-zero
   pixel output from the live canvas.** Lighthouse audits the loading
   profile; DOM-assertion Playwright specs check the structure. Both
   can pass on a black canvas. The feel-check step (Build-Playbook
   §Step 8) must include a `getImageData` brightCount assertion on
   any canvas-based component, OR a human-eyeball check.

2. **`WebGLRenderingContext.prototype.shaderSource` patch via
   Playwright `addInitScript` is the gold-standard way to catch
   silent shader failures** in SwiftShader/headless-GPU contexts.
   Compile errors don't echo to console if Three swallows them — the
   patch gets the log out before Three can.

3. **Per-step session summaries are evidence, not claims.** The prior
   Step 2 summary verified `Result: tried` count went from 2 → 6, file
   line count went 406 → 454. Those are true but their *meaning* ("the
   swarm is shipped") was false. The summaries verified *paperwork
   consistency*, not the underlying product. Future summaries should
   include the *direct* verification of the deliverable — not just
   "Lighthouse ran" but "Lighthouse ran AND I saw the swarm."

## Files reference (this segment)

- `~/Documents/SecondBrain/06-Agent-Sessions/2026-07-19-opencode-antigravity-step4-swarm-broken.md`
  — NEW (this file).
- (No source files edited this step. Diagnosis only.)

## Status

Step 4: in_progress (diagnosis complete; fix + verify pending).

**Next up:** the next agent reads this file, runs the
`useProgram`-instrumented Playwright probe, isolates the root cause,
fixes the swarm, and re-runs Lighthouse + visual verification.

**Tags:** #session-summary #build-lane #pastries #antigravity #swarm #webgl #swiftshader #silent-failure #recovery #context-overflow-protected
