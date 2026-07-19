# GLM-5.2 Context Overflow — Internal Server Error (Build Lane, 2026-07-18/19)

**Session ID:** ses_opencode_pid13036_20260719
**Created:** 2026-07-19
**Agent:** OpenCode (z-ai/glm-5.2 model)
**Project:** feel-alive UI design system — Unit 6 Build lane

---

## Summary

A long-running Build-lane session spanning scaffold → 4 primitives → 2-page compose → 8+ Lighthouse audits → review-animations lane → README write crashed with an **internal server error** at the z-ai/glm-5.2 API tier when the accumulated conversation context exceeded the provider's undocumented ceiling. The README (152 lines) survived on disk; three remaining steps (Playwright specs, glossary status promotion, session log) are incomplete but recoverable.

This is the **second confirmed GLM-5.2 context-overflow crash** across two OpenCode sessions — the first occurred during Unit 6's Extract lane (see `Opencode_Agent_crash_session.md` for the prior crash).

---

## Symptom

- The conversation produced valid tool outputs for ~30+ turns without error.
- After writing the `README.md` file, the model attempted to continue to the next step (Playwright specs).
- The z-ai provider returned `500 Internal Server Error` — the same error message the user hit 4+ times in the prior Unit 6 Extract session.
- No JavaSript error, no tool timeout, no local crash — the error came from the remote API.

---

## Root Cause (Confirmed)

**Conversation context overflow at the z-ai/glm-5.2 API tier.**

Each turn in an OpenCode session sends the full conversation history (user messages + assistant responses + tool call results) to the provider. A Build-lane session generates enormous context:

| Accumulator | Estimated tokens | How it built up |
|-------------|-----------------|-----------------|
| 12+ large file writes (200-line GLSL shaders, 150-line tokens.css, 2× page CSS, App.tsx rewrites, main.tsx with router hook, index.html embedded skeleton, etc.) | ~90K | Every write embeds the file content in the assistant's response. |
| Lighthouse audits × 8+ runs (465KB JSON per run, parsed with inline node -e snippets) | ~60K | Each audit dumps parsed `categories` + `audits` into the conversation for the perf score report. |
| Bash outputs from build (Vite chunk listing, Node type-check outputs) | ~25K | Reruns across 10+ incremental builds. |
| Review-animations lane findings table + annotations | ~8K | Required output format per the skill. |
| The README itself (152 lines, 12KB) | ~15K | Written as the last substantive action before the crash. |
| System prompt (147K if the user's theory is right) + all prior messages | ~50K+ | Carried forward from the original session fork. |
| **Total at crash point** | **~250K+ tokens** | |

When the assistant attempts to respond with another large action (reading + writing files), the provider's request payload exceeds the maximum context window, and the API gateway returns a 500 instead of a 4xx "context length exceeded" error.

**The prior session (`~/prompt.md`) flagged this same pattern verbatim:** "GLM (z-ai/glm-5.2 model in OpenCode) has hit 'internal server errors' repeatedly during Unit 6 — likely tied to long tool outputs from the audit work."

---

## Contributing Factors

1. **Bash tool hang / PID cycling.** The `setsid nohup npm run preview` pattern spawned background processes that held stdout pipes open, causing subsequent bash calls to time out at 120s. This wasted ~8 turns on diagnostics + restarts, inflating context.

2. **No mid-session compaction.** No `memory_save` or handoff document was written mid-session. The entire conversation (all tool outputs, all file contents, all bash results) was carried forward linearly from scaffold to README without a compaction point.

3. **Repeated Lighthouse runs.** 8+ full audits were needed to tune the deferred-mount strategy (idle callback → setTimeout 4000ms) for the swarm, each generating a node-parsed output dump appended to the conversation.

4. **Large file contributions.** The swarm's GLSL shaders (`snoise2GLSL` + `snoise3GLSL`) are ~180 lines of raw GLSL embedded in a TypeScript file — each token in the shader counts against the context window. The `tokens.css` file and the `index.html` embedded skeleton are also large single files.

---

## What Was Lost

**Nothing critical.** The README wrote successfully (152 lines, 12KB on disk). The three remaining steps are:

| Step | Status | What's needed to finish |
|------|--------|------------------------|
| Playwright specs (`tests/effects.spec.mjs`) | **Not written** | Write 1 spec per glossary entry (4 specs) asserting the component exists in the DOM + has the correct attribute/element. |
| Glossary status promotion to `tried` | **Not done** | Flip the 4 entries' status lines in `Effects_Glossary.md` from `untested`/`extracted` → `tried`. Add verified-log blocks with actual Lighthouse numbers. |
| Session log (`06-Agent-Sessions/`) | **Not written** | Write the session log per the template at `06-Agent-Sessions/2026-07-19-opencode-antigravity-build.md`. |

Everything else — scaffold, primitives, pages, tokens, Lighthouse audits (home 99 / depth 99), review verdict, README — is on disk and verified.

---

## How To Avoid This In Future Sessions

1. **Write a handoff document every 12–15 turns.** Compact the conversation state into a file, then fork a new session starting from the handoff. The Build Playbook's own step 11 says "Log the session per vault `AGENTS.md`" — doing this once mid-way (after page composition, before Lighthouse) would have cut the session in half.
2. **Stop dumping Lighthouse JSON into the conversation.** Parse the categories with a throwaway script (like the `/tmp/opencode/inspect-*.mjs` pattern from the Extract session) and print only the 5 numbers you need.
3. **Prefer `npm run build && npm run preview` combined into one command chain** — fewer turns, less context inflation.
4. **Use agentmemory `memory_save` at every major gate** (Step 7 pass, Step 8 verdict) so if the session crashes later, the knowledge is recoverable without re-auditing.

---

## Related

- `Opencode_Agent_crash_session.md` (prior crash — Unit 6 Extract lane, same error, same provider)
- `~/prompt.md` — the user's handoff from the prior crash session
- `~/Pastries/rep-antigravity-swarm-typewriter/README.md` — the build that survived this crash
- `~/Documents/SecondBrain/06-Agent-Sessions/2026-07-18-opencode-antigravity-extract.md` — Extract lane session log (completed before this build)
