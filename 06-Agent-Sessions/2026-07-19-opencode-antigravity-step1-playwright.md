---
date: 2026-07-19
agent: opencode
model: z-ai/glm-5.2
project: feel-alive UI design system — Unit 6 Build lane
step: 1 of 3 (Playwright specs)
project_path: ~/Pastries/rep-antigravity-swarm-typewriter
status: completed
tags: [session-summary, pastries, build-lane, antigravity, playwright, specs]
---

# Step 1 Session Summary — Playwright specs written + passing

> Per Victor's new rule (2026-07-19): a session summary is written to this folder
> after every completed todo step, so any agent can pick up from that step with
> minimal context. This is **not** the final session log (that lives in
> `2026-07-19-opencode-antigravity-build.md` once all 3 steps are done); this
> is a checkpoint that proves Step 1 actually shipped.

## User prompts verbatim

1. **Initial directive (this session, opening message):** "HEy. I was running a
   task with u in a previous session, but I had no idea the long `~280k` context
   is what derailed u and stopped the session from proceeding. So from now on, we
   are gonna be summarizing and handing off once a todo task is complete. The
   handoff will be detailed enough that a new agent can continue that task without
   needing much context. It's essentially a session summary that we supposed to be
   writing per task, but never did. So if something feel off, we couldn't pick it
   back up. It's alright now. I summarized the previous session, wrote the error
   diagnosis, and we can continue knowing how to avoid it. Read these two files:
   `2026-07-19_opencode_Handoff.md` and `GLM-5.2_Context-Overflow_Crash.md`."
2. **Clarification on terminology:** "I used handoff too casually. it's a session
   summary u'll be writing after each step. Written to the 06-Agent-Sessions
   folder."
3. **Preview strategy confirmation:** "Option 1. Background + log file, check
   status only. Also, this is a lesson worth remembering, and why a session
   summary is crucial as well."

## What was done in this step

### Files written

- `~/Pastries/rep-antigravity-swarm-typewriter/playwright.config.ts` — minimal
  config: chromium-only, `testDir: ./tests`, `baseURL: http://localhost:4173`,
  `webServer.command: 'npm run preview'` with `reuseExistingServer: true` when
  not CI (so we don't fight an already-running preview).
- `~/Pastries/rep-antigravity-swarm-typewriter/tests/effects.spec.mjs` — 4 specs,
  one per glossary entry. Each asserts the **technique** (DOM marker / class /
  computed style that proves the implementation is what the glossary said), not
  the look. No screenshot tests.

### Files edited

- `~/Pastries/rep-antigravity-swarm-typewriter/package.json` — added
  `"test:effects": "playwright test"` to `scripts`. (Was missing per the
  handoff's Step 1 instruction.)

### The 4 specs (one per glossary entry)

| # | Spec name | Route | Assertion |
|---|-----------|-------|-----------|
| 1 | Swarm | `/` | `.swarm__canvas[data-engine="three.js r180"]` mounts visibly within ~8s (the deferred 4s mount + chunk-load buffer). Confirms Three.js canvas technique. |
| 2 | BlinkingCursor | `/` | `.blinking-cursor__glyph` is attached AND contains exactly one inline `<svg>` AND `data-glyph` is one of `bar`/`rice`/`thin-bar`. Confirms inline-SVG-glyph technique (audit's original was a PNG; this rep uses SVG). |
| 3 | MeshBackground | `/depth` | Exactly one each of `.mesh-background__layer-{1,2,3,4}` inside a `.mesh-background` parent. Confirms layered-radial-gradient technique. |
| 4 | FilmGrain | `/depth` | `.film-grain` exists AND `getComputedStyle(...).backgroundImage` starts with `data:image/svg+xml`. Confirms the inline SVG `feTurbulence` data-URI technique (not a binary PNG tile). |

### Verification

```
Running 4 tests using 2 workers

  ✓  1 [chromium] › tests/effects.spec.mjs:23:3 › ... › Swarm: ... (5.1s)
  ✓  2 [chromium] › tests/effects.spec.mjs:35:3 › ... › BlinkingCursor: ... (5.1s)
  ✓  4 [chromium] › tests/effects.spec.mjs:48:3 › ... › MeshBackground: ... (1.1s)
  ✓  3 [chromium] › tests/effects.spec.mjs:62:3 › ... › FilmGrain: ... (1.2s)

  4 passed (12.8s)
```

Full log: `/tmp/opencode/pw-run.log` (kept on disk; not inlined here per the new
context-lean rule).

## Corrections to the handoff doc

The handoff (`2026-07-19_opencode_Handoff.md`, Step 1) said to assert
`data-engine="three.js r180"`. Verified against source
(`src/components/swarm/index.tsx:259`): the literal string is **`three.js r180`**
(not `three.js r0.180` or `r180` alone). Spec uses the correct verbatim string.

The handoff also didn't mention a `playwright.config.ts` — but Playwright needs
one (or it relies on defaults that pick `./tests` and run all browsers). Since
the audit/lighthouse flow assumes `:4173` only, and we don't want webkit/firefox
to spawn (no point in cross-browser for pure DOM-class assertions), I added a
minimal chromium-only config. This is in-scope per Pastries `AGENTS.md` §Workflow
Step 9: "README + Playwright tests" is a single step and "tests" implies a
runnable setup.

## Important context for whoever picks up Step 2

- The preview server is **already running** on `:4173` (PID 170223, leftover
  from the crashed session). Both `/` and `/depth` return 200. Do **not** start
  a new preview server — `ss -tlnp | grep :4173` first.
- The dist is freshly built (2026-07-19, post-crash) at
  `~/Pastries/rep-antigravity-swarm-typewriter/dist/`. Chunk sizes (entry
  `index-*.js` 196 KB raw / 62 KB gzip, three chunk 516 KB raw / 129 KB gzip)
  match the handoff doc exactly. No need to re-build before Step 2.
- `npx playwright install chromium` was just run; headless shell 149.0.7827.55
  is downloaded to `~/.cache/ms-playwright/chromium_headless_shell-1228/`. Subsequent
  agents don't need to re-run install.
- Step 2 target file: `~/Documents/SecondBrain/03-Resources/Tools/Effects_Glossary.md`.
  4 entries to promote (`untested`/`extracted` → `tried`), plus verified-log
  blocks with the Lighthouse numbers from the handoff.

## Failures / subagent snags

- **Initial blocking Playwright install.** `npx playwright install chromium`
  on its own exceeded the 120s bash tool timeout (download was ~114 MB on an
  unsupported-OS fallback path). **Fix:** re-ran under `setsid nohup` with
  stdout/stderr redirected to `/tmp/opencode/pw-install.log`, polled the log
  instead of letting the bash tool wait on stdout. Lesson already saved to
  agentmemory (`mem_mrr4rutu_394adabc0bdf`).
- **First test run failed with "port 4173 is already used"** because I passed
  `CI=1`, and the config sets `reuseExistingServer: !process.env.CI`. **Fix:**
  removed the `CI=1` env var; second run reused the server and all 4 specs
  passed in 12.8s.

## Lesson worth remembering (saved to agentmemory)

> Background servers must run via `setsid nohup ... > /tmp/opencode/<name>.log
> 2>&1 < /dev/null & disown` and only be checked via `ss -tlnp | grep` or
> `tail/grep` of the log — never let long-running stdout flow into the
> conversation; that inflates context and hangs the bash tool. (Memory
> `mem_mrr4rutu_394adabc0bdf`.)

## Files reference (with context)

- `~/Pastries/rep-antigravity-swarm-typewriter/playwright.config.ts` — NEW.
- `~/Pastries/rep-antigravity-swarm-typewriter/tests/effects.spec.mjs` — NEW.
- `~/Pastries/rep-antigravity-swarm-typewriter/package.json` — EDITED, added one
  script line.
- `/tmp/opencode/pw-run.log` — Playwright test output (12.8s, 4 passed).
- `/tmp/opencode/pw-install.log` — playwright chromium install log.
- `/tmp/opencode/preview-build.log` — `npm run build` log (2.62s, clean).
- `/tmp/opencode/preview.log` — second `npm run preview` attempt; failed
  because :4173 was already in use (a leftover preview server from the crashed
  session). Use that existing server for Step 2.

**Next up:** Step 2 — glossary status promotion.
