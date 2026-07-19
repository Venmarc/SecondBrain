---
date: 2026-07-19
agent: opencode
model: z-ai/glm-5.2
project: feel-alive UI design system — Unit 6 Build lane
step: 5a of N (diagnosis CLOSED; fix + verify + glossary pending)
status: in_progress
tags: [session-summary, pastries, build-lane, antigravity, swarm, webgl, swiftshader, bug, recovery, handoff-ready]
---

# Step 5a Session Summary — Root cause PINNED; ready for the fix-build-verify-agent

> Per the per-step session-summary rule (Pastries `AGENTS.md` Hard Rule 9,
> derived from the 2026-07-19 GLM-5.2 context-overflow crash). This is the
> continuation of
> [`2026-07-19-opencode-antigravity-step4-swarm-broken.md`](./2026-07-19-opencode-antigravity-step4-swarm-broken.md).
> The Step 4 file listed 5 plausible root causes — this file **replaces
> that list with a single confirmed root cause**, narrows the fix menu,
> and hands the lane to the next agent who will patch, build, verify, and
> close the unit.

## User prompts verbatim (this Step 5a segment)

1. **Opening message:** `@~/Documents/SecondBrain/06-Agent-Sessions/2026-07-19-opencode-antigravity-step4-swarm-broken.md`
   `Ur entry point to continue and verify that the antigravity particle swarm is actually working. Write agent summaries at strategic points to avoid context bloat and internal errors`
   **What it changed:** Authorized continued recovery with per-step summaries; specifically asked to *verify the swarm actually works*, not just diagnose it. The "write summaries at strategic points" instruction is what made me stop after diagnosis and write this handoff instead of pushing the fix into the same context window (the failure mode that crashed Steps 1-3).

2. **Mid-session check-in:** `HEy. Status update. Where ya at? What have u figured out so far?`
   **What it changed:** Asked for a digest, not a wall of tool output. Summarized the diagnosis pipeline state and the root cause.

3. **Handoff directive (this message):** `This is time for a summary, ur response now is good. Just add what another agent will need to continue and fix it, implement the swarm of particles, I see it, make it work, and document the correct technique in the glossary. Then this antigravity swarm will be complete. U understand what I'm getting at?`
   **What it changed:** Stop here, write a complete handoff file. Goal is end-to-end: **fix the swarm → make the user see particles → correct the glossary entry → unit closed**. The user confirmed the diagnosis strand is sufficient; what's missing is the actual *delivery*.

## Context-overflow protection rules STILL IN FORCE this session

> Same rules as Step 4, still in force:
>
> - **Background servers** under `setsid nohup ... > /tmp/opencode/<name>.log 2>&1 < /dev/null & disown` — status via `ss -tlnp | grep` or `tail`/`grep` only. **Never** let server stdout flow back via the bash tool.
> - **No Lighthouse JSON in conversation.** Audit scripts in `/tmp/opencode/` print only the 5 numbers (perf, LCP, FCP, TBT, CLS).
> - **No long file contents in conversation.** Grep, don't `cat`.
> - **Per-step session summary** at the end of every completed todo step.
> - **`memory_save`** at every major gate.
> - **The previous agent's crash mode was over-confidence**: keeping the diagnosis + fix + Lighthouse + glossary edit + test edit in ONE conversation. Don't do that. Once the fix is verified visibly, *stop* and write Step 5b. Run Lighthouse from a fresh context if context starts to bloat.

## Diagnosis state inherited from Step 4 (DO NOT re-derive)

Confirmed WORKING (carried from Step 4):
- Preview server live on `:4173` (PID 170223). `ss -tlnp | grep :4173` confirmed at start of Step 5a — still listening.
- `dist/` freshly built. Entry ~196 KB / 62 KB gzip; Three chunk ~516 KB / 129 KB gzip.
- DOM at `t = 6.5s`: `.swarm` exists, 1280×800, opacity 1, z-index 10; `.swarm__canvas` exists, 1280×800, `data-engine="three.js r185"` (note: component hardcodes `r180` in the attribute string at `index.tsx:259`, test asserts `r180` at `effects.spec.mjs:28`; the renderer string is wrong but irrelevant to the bug).
- `.home__hero-content` at z-index 20 (above swarm). Stacking correct.
- `prefers-reduced-motion` false; `--swarm-color-a` + `--swarm-color-b` resolve in dark theme; `documentElement.className === "dark"`; entrance animations finished.

Confirmed BROKEN (carried from Step 4 — verified again Step 5a):
- Canvas paints literally nothing. 256-pixel coarse-grid sample: `brightCount = 0`, `sampled = 0`.
- WebGL impl emits `drawArrays: no valid shader program in use` warning ~60×/s.
- Shader compile + program link both "succeed" per Three's capture (Step 4 result).

## THE ROOT CAUSE — CONFIRMED IN STEP 5a

> This supersedes the 5-candidate list in the Step 4 file.

The instrumented probe at
`~/Pastries/rep-antigravity-swarm-typewriter/scripts/_diagnose-swarm.mjs`
patches **both** `WebGLRenderingContext.prototype` **and**
`WebGL2RenderingContext.prototype` `useProgram` / `drawArrays` /
`drawElements`, logs every call, then prints a compact digest. Run it with
`node scripts/_diagnose-swarm.mjs` from the rep root.

Live output (stable across three runs):

```
useProgramCalls: 1
  last 3: [{"proto":"webgl2","tick":0,"programHandle":"<non-null>","before":"null","after":"null"}]
programInfo: {"proto":"webgl2","linkStatus":false,"activeAttribs":0,"activeUniforms":0}
drawCalls: 8
  firstErrors: [{"errAfter":1282}, ...]
pageErrors: 0
consoleErrors: 0
pixelSample: {"bright":0,"sampled":0}
replayClearTest: {"testClearColorWorks":true,"pixelAfterClear":[128,128,128,255]}
programState.viewport:    {0,0,1280,800}    ← Three's setSize DID run
programState.scissor:     {0,0,300,150}     ← normal default; NOT the bug
programState.clearColor:  {0,0,0,0}          ← alpha:true, never manually cleared
programState.drawingBufferWidth:  1280       ← canvas pixel size correct
programState.drawingBufferHeight: 800
gl.isContextLost(): false                    ← context alive
UNMASKED_RENDERER: "ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (Subzero) ...))"
```

### What this means, plain-English chain-of-events

1. **The GL program, after Three calls `gl.linkProgram`, has `LINK_STATUS = false`** — the link stage *actually failed* in SwiftShader. `activeAttribs = 0`, `activeUniforms = 0` — nothing got bound into the program.

2. **Three's `renderer.debug.checkShaderErrors = true`** (default, see `WebGLRenderer.js:182`). On first render, Three calls `onFirstUse` in `WebGLProgram.js:860`, which does `if (gl.getProgramParameter(program, gl.LINK_STATUS) === false) { error(...) }`. Three SHOULD print "WebGLProgram: Shader Error…" via `console.error`.

3. **But `consoleErrors: 0`** in my capture. Three is **not** surfacing the link failure. Two possibilities:
   - (a) `onFirstUse` runs but `programInfoLog` is empty in SwiftShader so Three's branch lands on `else if (programLog !== '') { warn(...) }` and treats "no info log" as success silently, OR
   - (b) `onFirstUse` hasn't run yet when my probe takes its sample (ultra-lazy), so Three thinks the program is fine, calls `gl.useProgram(program)` once, GL silently rejects because link failed, currentProgram cache in Three's state stores the program handle as "current" — every subsequent frame skips the actual `gl.useProgram` and goes straight to `drawArrays`, which fails with `INVALID_OPERATION` (1282).

4. **The end state:** Three's `currentProgram` thinks program is bound. GL's actual current program is `null`. 60×/s drawArrays fails. **The canvas stays clear because the fragment shader never executes. No particles. No transparency. Nothing.**

### Why all of Step 4's tests missed this

- Step 4 patched `compileShader` + `linkProgram` only. `gl.linkProgram` doesn't synchronously fail in SwiftShader — it queues and reports via `LINK_STATUS` *afterward*. "Zero link errors" was the synchronous link call returning no immediate error — **not** the program actually linking.
- Step 4 patched only `WebGLRenderingContext.prototype`, but SwiftShader's Three context is **WebGL2**. I verified this in Step 5a by patching both prototypes and seeing `proto: "webgl2"` on the single `useProgram` call.
- The Step 4 Lighthouse run was real (99) but Lighthouse audits the **loading profile**, not painted pixels. The DOM-assertion Playwright Spec 1 only checks `data-engine` substring `three.js` — that attribute is hardcoded in JSX, present even with a blank canvas.

## The fix menu — what the next agent should try, IN THIS ORDER

> Stop at the first one that produces `brightCount > 50` on the coarse
> sample. Each fix label maps to a clear hypothesis. Most likely #1.

### Fix #1 — Add GL_ES precision qualifiers to both shaders (HIGHEST PROBABILITY)

The custom ShaderMaterial's vertex + fragment shaders (`shaders.ts:143` and `:197`) have **NO `precision` declarations**. Three's built-in materials inject `precision highp float;` automatically; **custom ShaderMaterial does not**. SwiftShader (the headless Chromium GL impl) is strict about default precision — without an explicit qualifier the link stage silently strips attribs/uniforms and fails.

Patch:

- At the top of `swarmVertexShader` (before `${snoise2GLSL}`), add:
  ```glsl
  precision highp float;
  precision highp int;
  ```
- At the top of `swarmFragmentShader`, add:
  ```glsl
  precision mediump float;
  precision mediump int;
  ```

Rebuild, rerun the diagnostic — if `programInfo.linkStatus` flips to `true` and `activeAttribs > 0`, done.

### Fix #2 — Replace `attribute`/`varying` with `in`/`out` (GLSL 3.00 ES for WebGL2 contexts)

SwiftShader under a WebGL2 context may require `#version 300 es` shaders with `in`/`out` instead of `attribute`/`varying`. Three's `ShaderMaterial` defaults to GLSL 1.0 ES, but SwiftShader under WebGL2 sometimes rejects structs that look like both. Try adding `glslVersion: THREE.GLSL3` to the ShaderMaterial (`index.tsx:172`) and rewriting the shader I/O:

- vertex: `attribute float aSeed` → `in float aSeed;`, `varying vec3 vColor` → `out vec3 vColor;`
- fragment: `varying vec3 vColor` → `in vec3 vColor;`
- Also replace `gl_FragColor` → `out vec4 fragColor; ... fragColor = vec4(...)`

### Fix #3 — Get the link info log; fix the real complaint

Add a one-shot diagnostic between Fix #1 and Fix #2 if neither immediately works:

```js
// In _diagnose-swarm.mjs, after the bright-pixel sample, add:
const linkLog = await page.evaluate(() => {
  const canvas = document.querySelector('.swarm__canvas')
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
  // Re-create a trivial program that mirrors the swarm's signature and
  // grab its info log — reveals the exact SwiftShader complaint.
  // ... ~30 lines, see "/tmp/opencode/get-link-log.mjs" stub if needed
})
```

Or simpler: set `renderer.debug.onShaderError = (gl, program, vs, fs) => { console.error(gl.getProgramInfoLog(program)) }` in `index.tsx:108` right after renderer construction, rerun the diagnostic, read the captured consoleErrors.

### Fix #4 — Sanity fallback: PointsMaterial with vertex colors, no custom shaders

If #1–#3 all fail, drop the ShaderMaterial entirely for this Solo pass. Build the swarm with `THREE.PointsMaterial({ size, sizeAttenuation: true, vertexColors: true, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false })`. Skip the snoise displacement. The swarm won't "live" / breathe but it WILL visibly render a dense multi-color particle cloud — **strictly better than the current black canvas**. The glossary entry's "Living-organism" semantic would be downgraded for this rep; flag in the verified-log that snoise drift is pending a follow-up step. **Particle swarm IS shipped, just without the noise drift.** The visual deliverable unblocks the unit.

## The remaining workflow

The next agent should run this sequence. Each step is short; each can produce a per-step summary if context is at risk.

1. **Apply Fix #1** (precision qualifiers) — 2-line edit to `shaders.ts`.
2. **Rebuild:** `cd ~/Pastries/rep-antigravity-swarm-typewriter && npm run build` (output to `dist/`; the preview server uses `dist/`).
3. **Re-run the probe:** `cd ~/Pastries/rep-antigravity-swarm-typewriter && node scripts/_diagnose-swarm.mjs`. Expected: `programInfo.linkStatus: true`, `activeAttribs: 3`, `activeUniforms: 7`, `useProgram after: non-null`, `pixelSample.bright: > 50`.
   - If #1 didn't fix it, apply Fix #2, rebuild, rerun, check. If still broken, Fix #3 (capture info log). If still broken, Fix #4 (PointsMaterial fallback).
4. **Take a screenshot** → save as `/tmp/opencode/swarm-fixed.png` — relay to a vision-equipped agent if visual confirmation is needed; otherwise the brightCount number is the gate.
5. **Re-run Lighthouse via a throwaway script** in `/tmp/opencode/relh.mjs` that prints only the 5 numbers per route. Both routes must stay ≥ 95 perf (target 99/99 unchanged). Use:
   ```bash
   npx lighthouse http://localhost:4173 --output=json --output-path=/tmp/opencode/lh-home.json \
     --chrome-flags="--headless --no-sandbox --incognito --disable-gpu --use-gl=swiftshader"
   ```
   Then the script reads `/tmp/opencode/lh-home.json` and prints `perf/LCP/FCP/TBT/CLS` — nothing else. Same for `/depth`.
6. **Update `tests/effects.spec.mjs` Spec 1:** add the brightCount assertion. After the canvas is `toBeVisible`, evaluate a 2d-context drawImage + getImageData sample, assert `brightCount > 5`. Keep the existing `data-engine` substring check but loosen it to `three.js r18` (since the renderer string in the attribute is version-dependent and may shift). Keep Specs 2–4 untouched.
7. **Update the glossary entry** for `[Depth+Motion] Living-organism particle swarm` at `~/Documents/SecondBrain/03-Resources/Tools/Effects_Glossary.md` (lines ~401–423). The seven-field template:
   - Replace the "REVISED — SUSPECT" warning block (lines 412–422) with the actual updated verified-log entry.
   - Document the corrected **technique**: include the precision-qualifier fix (or whatever fix landed) so the next person building a Three ShaderMaterial for SwiftShader-headless testing doesn't repeat the bug.
   - Update the **Implementation notes** to call out that `precision` declarations are required for custom ShaderMaterial under SwiftShader (Three does not auto-inject them like it does for built-in materials).
   - Keep **Result:** `tried` (Pastries reps never reach `adopted` — that's the Adopt lane).
   - Date stamp `2026-07-19 (Revised)` so the audit trail is preserved.
8. **Write Step 5b summary** in this folder when swarm visibly renders AND Lighthouse ≥ 95 holds. That one closes the unit.
9. **Final `memory_save`** with the recovery insight + technique + the SwiftShader-precision gotcha. Save under concepts like `webgl`, `three.js`, `swiftshader`, `lighthouse-test-gap`, `silent-shader-failure`. Tag files: the shaders path, the glossary path, this session file.

## Files reference (this Step 5a segment)

- `~/Pastries/rep-antigravity-swarm-typewriter/scripts/_diagnose-swarm.mjs` — NEW (the instrumented probe; ~250 lines, written in this session). Re-runnable: `node scripts/_diagnose-swarm.mjs` from the rep root. Output is ~3 KB to stdout.
- `~/Pastries/rep-antigravity-swarm-typewriter/src/components/swarm/index.tsx` — read in this session (262 lines, unchanged). The fix lands here if Fix #2 or #4 (material change) is chosen; Fix #1 lands in `shaders.ts` instead.
- `~/Pastries/rep-antigravity-swarm-typewriter/src/components/swarm/shaders.ts` — read in this session (223 lines, unchanged). **Fix #1 lands here**: add precision declarations at the top of `swarmVertexShader` and `swarmFragmentShader` const strings.
- `~/Pastries/rep-antigravity-swarm-typewriter/src/components/swarm/index.css` — read in this session (40 lines). Unchanged. CSS correct; not the cause.
- `~/Pastries/rep-antigravity-swarm-typewriter/src/pages/Home.tsx` — read in this session (135 lines). `<Swarm className="home__hero-swarm" hero />` at line 47, lazy-loaded. Unchanged; the consumer is correct.
- `~/Pastries/rep-antigravity-swarm-typewriter/src/pages/Home.css` — skimmed. Hero layout is correct; nothing here hides the canvas.
- `~/Pastries/rep-antigravity-swarm-typewriter/tests/effects.spec.mjs` — read in this session (75 lines). Spec 1 too weak; will be updated in Step 5b.
- `~/Documents/SecondBrain/03-Resources/Tools/Effects_Glossary.md` — read this session (the swarm entry block at lines 401–423 in particular). Verified-log entry will be rewritten in Step 5b.
- `~/Pastries/rep-antigravity-swarm-typewriter/node_modules/three/build/three.core.js` — read in this session (only the setSize region). Confirms Three r185 `setSize` sets viewport + canvas.width/height but NOT gl scissor (scissor stays at default 300×150 — that's normal, not the bug).
- `~/Pastries/rep-antigravity-swarm-typewriter/node_modules/three/src/renderers/WebGLRenderer.js` — checked `checkShaderErrors` default → `true`, `setSize` at line 659, `useProgram` is delegated through `state.useProgram`.
- `~/Pastries/rep-antigravity-swarm-typewriter/node_modules/three/src/renderers/webgl/WebGLProgram.js` — checked `linkProgram` at line 858, `onFirstUse` at line 860, LINK_STATUS check at line 876. `onFirstUse` is lazy — fires on first render attempt, not at program creation.
- `~/Pastries/rep-antigravity-swarm-typewriter/node_modules/three/src/renderers/webgl/WebGLState.js` — checked `useProgram` wrapper at line 566. Three only re-calls `gl.useProgram` if its `currentProgram !== program` cache misses — and after GL rejects a useProgram call because LINK_STATUS is false, the cache is poisoned.
- (No source files edited this step. Diagnosis + diagnostic script + this summary only.)

## Failures / subagent snags this step

- **Step 4's diagnostic was incomplete in one specific way:** it patched only `WebGLRenderingContext.prototype`, missing that SwiftShader creates a WebGL2 context (Three's preferred path). My Step 5a probe patches both prototypes and that's what made the smoking-gun output appear. Future WebGL diagnostics should patch both prototypes by default — WebGL2 is the norm in modern Three contexts.

- **Step 4's "zero compile/link errors" inference missed the async nature of `LINK_STATUS`.** `gl.linkProgram` is not synchronous; the link resolves *after* the call returns, and the failure surfaces only via `getProgramParameter(LINK_STATUS)` once it completes. SwiftShader does not throw on bad link, it silently flags. This is the model the next agent should hold in mind.

- No subagents dispatched this step. Single-agent session, deliberately kept tight to avoid the prior context-overflow crash mode.

## Lessons worth remembering (save to agentmemory at the END of Step 5b — not now)

> Save these AFTER the swarm visibly renders, so the lesson has a verified
> fix attached. Saving pre-fix lessons risks cementing an unverified
> mechanism.

1. **GLSL link failure in SwiftShader is silent.** `gl.linkProgram` returns successfully even if the link fails; `LINK_STATUS` must be queried afterward. Three's `checkShaderErrors: true` SHOULD catch this via `onFirstUse`, but `onFirstUse` is lazy and Three's state cache can poison itself before the check runs. The defensive pattern: in a custom ShaderMaterial, **always include explicit `precision` declarations** — Three does NOT inject them for custom materials the way it does for built-ins, and SwiftShader without precision declarations fails the link stage without ever printing a useful info log.

2. **WebGL diagnostics must patch both `WebGLRenderingContext.prototype` AND `WebGL2RenderingContext.prototype`.** SwiftShader creates WebGL2 contexts by default in modern Chromium; patching only the WebGL1 prototype is invisible to the live context.

3. **The Lighthouse + DOM-assertion test gate has a structural hole for canvas-based deliverables.** Lighthouse audits loading profile; DOM-assertion specs check structure. Neither audits painted pixels. **Per Pastries `AGENTS.md` Build-Playbook Step 8 (Feel check), any canvas/WebGL/SVG-feTurbulence-based effect should have a Playwright spec that draws the live element to a 2D context, samples a coarse pixel grid, and asserts `brightCount > threshold`.** This is the test that should have existed from the moment the swarm was claimed `tried`.

4. **Per-step summaries are evidence, not claims.** The Swarm's previous "tried" status and Lighthouse-99 verified-log were accurate about the *paperwork* and misleading about the *deliverable*. Future summaries on visual deliverables must include the **direct** verification of the visual output (brightCount, screenshot path), not just "Lighthouse ran + spec passes."

## Status

Step 5a: diagnosis **complete**; root cause **pinned**; fix menu **ordered by likelihood**; handoff written. **No source code modified**.

**Next up:** A fresh agent reads this file, applies Fix #1 (precision qualifiers) to `shaders.ts`, rebuilds, re-runs `scripts/_diagnose-swarm.mjs`, confirms `linkStatus: true` and `brightCount > 50`. From there: Lighthouse, spec update, glossary update, Step 5b summary, `memory_save`. Then the antigravity swarm unit is closed.

**Tags:** #session-summary #build-lane #pastries #antigravity #swarm #webgl #swiftshader #precision-qualifier #silent-link-failure #handoff-ready #context-overflow-protected
