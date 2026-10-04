<!--
AGENT: Fill every section below. Do not leave placeholders blank and do not skip a section because "nothing happened" — write "None this session."
-->

> **One-line Summary**: Replicated the lamalama.com logo-grain intro onto a custom C SVG and shipped the fix after three failed iterations; documented both the base intro and the logo-mask swap into the Effects Glossary.

**Date:** 2026-10-03
**Agent:** OpenCode
**Project:** none — Pastries build `rep-lamalama-logo`

## Goal
- Reproduce the lamalama.com loading logo intro (counter → centered blocky mark → white-to-grey fade → full-screen block field → scene reveal) and apply it to Victor's C-shaped SVG logo. Then document the result so the technique can be replicated or copied next time with a different logo.

## Standing Directives Given This Session
- "Do NOT modify the original `C-logo` folder; work only in `C-logo-lamalama`."
- "Keep findings/screenshots in `~/Pastries/rep-lamalama-logo`."
- "Playwright MCP for real visual verification; screenshots are required evidence, not code-only claims."
- "Iterate: fix → test → if wrong, retrace and repeat; after 3 failing iterations stop and ping the user."
- "Ignore a white/screencall-looking `hero.mp4` (my deliberate test change)."
- "Forget feelcheck." (Victor dropped the feel-check step for this rep; Lighthouse score accepted as sufficient.)
- Glossary status must be `tried`, never `adopted` (Pastries AGENTS.md rule 4).
- Do not write comments in code; put context in SecondBrain instead (Universal Constitution → Comments).

## User Prompts (Extracted, Not Compressed)
- **Prompt:** "Oh. I forgot the Effects_Glossary entry. See when I first did this stuff, my agent did logo multiplication, and it looked good because teh logo used was an M. Now that i've seen what the actual intro looks like and replicated it, I want to overwrite the lamalama logo intro entry in the glossary. And we also made it work with a C logo, so that needs to be entered into the vault as well. Forget feelcheck. The logo intro loads well and smoothly, and i doubt it's gonna fail a lighhthouse test. Also, the hero.mp4 is displayed upside down if u didn't notice. And when i repleced ith with the 1.3 mb one, it also displayed upside down. here's the test tho [Lighthouse screenshot] ran in an incognito window, fresh context. I also want the glossary entry to shade more light on how the C logo was turned from this [smooth blue/cyan C SVG] to this [side-by-side C-vs-LL montage]. That will really help to give agents the context of how to do it for next time, if a different logo style comes. We can decide to go smooth, not blocky, or blocky all the way like the lamalama one, or partly blocky but still recognizable like this C logo, depending on how the logo we wnat to replicate looks. This replication was a success. what's left is docuemnting it for accurate replication or copying next time."
  **Overrode/Added:** Replaced the planned feel-check + Lighthouse step with a documentation task. Required the glossary to explain the smooth→blocky logo transformation and the three smoothness options. Supplied a real Lighthouse run.
- **Prompt:** "also, add a note in the glossary that drawlllogo means draw lamalama logo, so if we are to use the component systme again, we should call it draw<project_initials>logo. Like the c logo is for Codon Labs, so it would be drawCLLogo. It is drawlllogo because that's where we copied it from. U can awrite readme, leave plywright tests. it's not necessary, is it? include my note above in the readme. it's relevant info"
  **Overrode/Added:** Pastries workflow step 9 required both a README and `tests/effects.spec.mjs`. Victor waived the tests and required the naming rule in both the glossary and the README.
- **Prompt:** "Imagine this: we replicated lamalama logo intro, it worked. We tested it out on a different logo style, the C logo. it worked, and there's proof of it, and I saw and verified it and called this rep a success. What else is a test gonna do?"
  **Overrode/Added:** Challenged the value of the Playwright suite. Answered directly: a spec only earns its keep as regression detection on future edits, and this rep has no CI to run it. Confirmed skipping it.
- **Prompt:** "'Say the word and I'll drop it in'. alright. go for it. do the regression tests. also, now that I'm enforce mcp usage instead of scripts. can the mcp do what u'll need scripts for in this scenario? if so use it. if not write teh scripts then. but for most of the operations, I think the mcp covers it. Run the test(s)"
  **Overrode/Added:** Reversed the earlier waiver. Added the MCP-over-scripts constraint. Answer: no custom automation script was needed — MCP covers ad-hoc browser work, but MCP cannot execute a `.spec.mjs`, and the spec file is the deliverable, so the Playwright CLI runs it.

## Reference Files / Media
- Lighthouse screenshot (Victor, Brave incognito, fresh context, production preview `:4174`) — Performance **99**, Best Practices **100**, SEO **82**, Accessibility **77**. FCP 0.4s, LCP 0.5s, TBT 40ms, CLS 0, Speed Index 1.4s.
- Screenshot: side-by-side montage, C rep vs original LL intro, three rows — the replication evidence.
- Screenshot: the original smooth blue/cyan C SVG — the "before" state for the glossary explanation.
- `~/Videos/Screencasts/Screencast From 2026-10-03 02-56-54.mp4` — reference lamalama intro (frames in `/tmp/opencode/refA/`).
- `~/Videos/Screencasts/Screencast From 2026-10-03 03-43-46.mp4` — earlier C-logo-only behavior (frames in `/tmp/opencode/refB/`).

## Root Cause Log
| Symptom | Root Cause | Fix Applied | Confidence |
|---|---|---|---|
| Three iterations produced no full-screen block field after the mark appeared; screen stayed empty outside the C | `logo_all` and `logo_full` were multiplied by the `shape` (C mask) texture. That mask is 0 everywhere outside the logo, so the only two full-viewport layers were zeroed everywhere outside the mark and could never fill the screen | Keep `shape` for the centre mark only (`logo = shape * u_show_logo`); restore `logo_all = drawLLLogo(st, tex.r, …)` and `logo_full = drawLLLogo(st, tex.g, …)` on the tiled coordinate | Confirmed (Playwright screenshot at p=0.60 shows the full field) |
| Block field rendered as faint 4px noise instead of large blocks that shrink | `LOGO_START_GRID_SIZE` was initialised to 16, which is the tween's own end value, so the 3.75s `power3.in` tween was a no-op and the tile never changed size | Set initial `LOGO_START_GRID_SIZE: 160` in `IntroCanvas.tsx` (tween target was already 16) | Confirmed (grid reads 129.21 at p=0.60, animating 160 → 16) |
| Earlier attempt showed a screen full of tiny copies of the C | Sampling the logo mask with `mod(st, 1.0)` tiles it across the viewport | Sample the mask in screen UV, snapped to a fixed fine grid derived from `u_pixel_size` (16), not the animated tile | Confirmed |
| Source and `dist` out of sync after comment removal from `Yi.glsl` | `npm run build` not rerun after the edit | Rebuilt: `index-DDVWVK9s.js`; preview on 4174 serves it | Confirmed |
| `hero.mp4` displayed upside down — for both the original 6.3 MB file and the 1.3 MB replacement, so the file was never the fault | `gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)` was never called before `texImage2D(..., video)`, and no shader flips Y. WebGL places the video's first row at texture y=0, which samples at the bottom of the screen, so the frame comes out vertically mirrored | One line in `C-logo-lamalama/src/SceneCanvas.tsx` next to the content texture setup. Context-wide flag, but `IntroCanvas` uses its own context, so the C mask upload is untouched | Confirmed (ground truth: ffmpeg frame at 6s is upright; pre-fix render was mirrored; Victor verified the post-fix render) |

## Research Conducted
- **Searched/Consulted:** Live lamalama reference shader `src/shaders/Yi.glsl`; C-rep `Ji.glsl` (progress pass) and `Yi.glsl` (display pass); `IntroCanvas.tsx` timeline and mask upload; Effects Glossary existing entry; Playwright screenshots from prior iterations.
- **Should have been consulted but wasn't:** N/A — the technique came from prior reverse-engineering in this same session.

## Subagent Snags
- Playwright MCP runs on software WebGL (`Automatic fallback to software WebGL has been deprecated`) and the machine load was ~7, so screenshot loops beyond 2–3 per call time out. Workaround: keep screenshot batches small and drive the timeline with `pause()` + `.progress(p)` instead of wall-clock sleeps.
- One `write` tool call failed with `ECONNRESET` mid-response; retried successfully.

## Decisions & Pivots
- **Decouple the mark grid from the field grid.** The C mask samples on a fixed grid derived from `u_pixel_size` (16) so the mark stays crisp, while `LOGO_START_GRID_SIZE` animates only the background tile 160 → 16. If the mask sampled on the animated grid, the mark would collapse into a shapeless blob early.
- **Pause and seek for deterministic capture.** `window.__introTimeline.pause()` then `.progress(p)` replaced wall-clock timing so screenshots are reproducible.
- **Documented in the glossary, not in code.** The shader comments added earlier were removed per the no-comments-in-code rule; the reasoning moved into the glossary entry, which the Build lane loads anyway.
- **Skipped index.md and CHANGELOG.md updates.** No structural change to the vault — one existing note was edited in place. Session logs live in `06-Agent-Sessions/` and are not indexed.

## Steps Taken / Actions
- Verified every timeline number against `IntroCanvas.tsx` before writing (seven tweens, total 4.25s).
- Removed the three code comments I had added to `Yi.glsl`.
- Overwrote the `Logo-cell grain intro` glossary entry with the accurate two-pass architecture, the three-layer stack, the `drawLLLogo` tiling mechanism, the naming trap, the timeline table, and the start-grid gotcha.
- Added a new glossary entry: `Drop-in custom logo for the grain intro (mask swap)` — the SVG → canvas → texture pipeline, the floor-to-cell-centre pixelation step, the one rule separating mask from field, the three-row smoothness table, and three traps.
- Added a Verified log block with Victor's real Lighthouse numbers.
- Rebuilt the rep and confirmed the preview serves the new bundle.
- Took a Playwright screenshot at p=0.60 to prove the rebuild did not break rendering.
- Added the `drawLLLogo` naming note to both glossary entries.
- Wrote `rep-lamalama-logo/README.md` including the naming rule.
- Reversed the test waiver: installed `@playwright/test`, wrote `playwright.config.ts` and `tests/effects.spec.mjs`, added the `test:effects` script.
- **Mutation-verified the suite.** Set `LOGO_START_GRID_SIZE` 160 → 16, rebuilt (`index-BGjCE-4B.js`), ran `-g grid` → 2 failed / 1 passed. Restored the source (`diff -q` clean), rebuilt back to `index-DDVWVK9s.js`, ran the full suite → 7 passed.
- Fixed a parse error during authoring: a regex literal with an escaped trailing slash was written unterminated at line 115; replaced both regex assertions with `toContain` / `not.toContain` after confirming the exact built strings with `grep`.
- Updated the README, which by then contained a false "No Playwright spec suite" claim.
- **Fixed the upside-down `hero.mp4`.** Established root cause before patching: `UNPACK_FLIP_Y_WEBGL` set nowhere in any of the three projects, and no Y flip anywhere in the shader. Proved the file itself was upright by extracting frames with ffmpeg. Added the one-line `pixelStorei` fix, rebuilt to `index-RtR2JsJT.js`, and Victor verified the post-fix render as correct.
- **Verified the intro on a mobile device context.** Ran an iPhone 13 emulation (390×844, DPR 3, `hasTouch`, mobile UA) through MCP before the Playwright MCP server went away. Device signals were genuinely set (`maxTouchPoints` 1, `pointer: coarse` and `hover: none` both match), and the intro built and ran under them: WebGL2 up, canvas 390×844, `__cMaskReady` true, grid tweened to 16, no overflow at 390×844. Pixel-checked both frames — at p=0.60 the tiled block lattice fills the frame with the mark at centre, at p=1 the scene renders. Grepped `src/` first: no `IS_WEBGL`, no `hasTouch`, no `@media` anywhere, so there was no device gate that could fail. Limits recorded in the README rather than glossed: SwiftShader means real GPU frame rate is untested, and Chromium means iOS Safari is untested. Victor's original objection stands — his phone test of lamalama.com confirmed the page loads, not that the WebGL intro plays on touch.
- **Moved the test server off port 4180.** Victor's Codon Labs dev server took 4180 while the config still had `reuseExistingServer: true`, so a run would have silently tested his site instead of the rep. Moved to 4192 with `reuseExistingServer: false`, which makes Playwright refuse any server it did not start; the title assertion remains as a second line of defence. Re-ran the suite on the new port: **7 passed (2.6m)**, bundle still `index-RtR2JsJT.js` with one `UNPACK_FLIP_Y_WEBGL` occurrence.

## Files Touched
- `~/Documents/SecondBrain/03-Resources/Tools/Effects_Glossary.md`
  - **Previous State:** `Logo-cell grain intro` entry described the effect from extraction only; no custom-logo entry existed.
  - **After Change:** Entry rewritten (lines 303–334) with the verified technique; new entry at 336–358; Verified log block appended before `## Open gaps`. Both entries `tried`. Naming note added at line 315 and a short reminder at line 347: `drawLLLogo` = *draw Lamalama logo*, rename to `draw<PROJECT_INITIALS>Logo` on reuse (Codon Labs → `drawCLLogo`).
  - **Related to:** the documentation prompt above and the naming prompt below.
- `~/Pastries/rep-lamalama-logo/C-logo-lamalama/src/shaders/Yi.glsl`
  - **Previous State:** contained three explanatory comments next to the mask/field code.
  - **After Change:** comments removed; code unchanged.
  - **Related to:** the no-comments-in-code rule.
- `~/Pastries/rep-lamalama-logo/C-logo-lamalama/dist/assets/index-DDVWVK9s.js`
  - **Previous State:** `index-DMhySdUP.js` built from the commented source.
  - **After Change:** clean `tsc && vite build`; preview on 4174 serves the new bundle.
- `~/Pastries/rep-lamalama-logo/C-logo-lamalama/tests/effects.spec.mjs`
  - **Previous State:** did not exist.
  - **After Change:** 7 specs — timeline duration, grid start value, grid animation, monotonic theme fade, centred mask ink, field not mask-gated, fixed mark grid. Two specs assert built shader source, since the three-iteration bug lives in the shader.
  - **Related to:** the regression-test prompt above.
- `~/Pastries/rep-lamalama-logo/C-logo-lamalama/playwright.config.ts`
  - **Previous State:** did not exist.
  - **After Change:** Brave incognito headless, `baseURL` pinned to `127.0.0.1:4192`, `webServer` runs `npm run preview -- --port 4192 --strictPort`. Originally 4180 (4173 is the untouched original `C-logo`, 4174 a live preview), but 4180 was later taken by Victor's Codon Labs dev server while `reuseExistingServer: true` was still set — a run would have silently tested his site instead of the rep. Moved to 4192 and flipped `reuseExistingServer` to `false`, so Playwright now refuses to attach to any server it did not start itself. The title assertion stays as a second line of defence.
- `~/Pastries/rep-lamalama-logo/package.json`
  - **Previous State:** no `@playwright/test`.
  - **After Change:** `@playwright/test` 1.63.0 added as devDependency (node_modules is shared with `C-logo-lamalama` by symlink).
- `~/Pastries/rep-lamalama-logo/C-logo-lamalama/package.json`
  - **Previous State:** three scripts, no test entry.
  - **After Change:** added `"test:effects": "playwright test"`, matching the `rep-lamalama-logo-grain` convention.
- `~/Pastries/rep-lamalama-logo/C-logo-lamalama/src/SceneCanvas.tsx`
  - **Previous State:** content texture created with no pixel-store flip, so video uploaded top-row-first into a bottom-origin texture.
  - **After Change:** added `gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);` next to the content texture parameters. Bundle rebuilt to `index-RtR2JsJT.js`.
  - **Related to:** the upside-down `hero.mp4` row in the Root Cause Log.
- `~/Pastries/rep-lamalama-logo/README.md`
  - **Previous State:** did not exist anywhere in the rep.
  - **After Change:** New — structure map, run commands and port behaviour, timeline table, the two iteration-killing bugs, the mask-swap steps with the three smoothness settings, Victor's `drawLLLogo` naming rule, verification evidence, known issues.
  - **Related to:** "U can awrite readme" and "include my note above in the readme".
- `~/Documents/SecondBrain/06-Agent-Sessions/2026-10-03_opencode_lamalama-logo-intro-c-swap.md` — this log.

## Vault Updates This Session
- `[[03-Resources/Tools/Effects_Glossary.md]]`: overwritten `Logo-cell grain intro`; added `Drop-in custom logo for the grain intro (mask swap)`; appended one Verified log block; added the `drawLLLogo` naming rule in two places — line count after edit: 653. Split triggered: N/A.
- `[[ANTI_PATTERNS.md]]`: added the missing-`UNPACK_FLIP_Y_WEBGL` row to the `## WebGL / Three.js` table — line count after edit: 129. Split triggered: No (under the 200-line threshold).
- Project `AGENTS.md`: No changes.
- The reusable root cause (mask must never gate the full-viewport layers) lives in the glossary entry, which the Build lane loads on every rep. Not duplicated in ANTI_PATTERNS.md — it is not a third-party issue. The video-flip cause *is* third-party (WebGL API), so it went to ANTI_PATTERNS.md and is mirrored in agentmemory.

## Open Questions & Next Steps
- **`hero.mp4` upside down: resolved** — fixed and verified (see Root Cause Log). No action left.
- **Lighthouse a11y 77 and SEO 82** sit under the Pastries 95 floor. Performance 99 and Best Practices 100 clear it. If the 95 rule is read across all categories, this rep does not pass it yet. Most likely causes: a full-screen canvas with no text alternative and no skip control.
- **Playwright tests: written, run, and mutation-verified.** Victor first waived them ("it's not necessary, is it?"), then reversed after my three-line offer ("alright. go for it. do the regression tests"). `tests/effects.spec.mjs` now holds 7 specs covering both glossary entries, run via `npm run test:effects` on pinned port 4192. Proven non-vacuous: setting `LOGO_START_GRID_SIZE` back to 16 made both grid specs fail; reverting restored green. The original concern stands as context — a spec only pays off on future edits, and Pastries still has no CI to run it automatically.
- Stale preview servers still listening: `4175` and `4176` return empty; `4177` is a duplicate of the active `4174`.

**Tags:** #agent-session
