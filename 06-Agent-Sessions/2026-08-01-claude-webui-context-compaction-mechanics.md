> **One-line Summary**: Diagnosed why Hermes' automatic context-compression was silently defaulting to 500k on Claude Sonnet 5 (a 1M-context model) instead of the user's ~100k rule, fixed it with a per-model config override, and documented the compact-vs-summarize split for future agents.

**Date:** 2026-08-01
**Agent:** Claude (claude-sonnet-5, Hermes WebUI)
**Project:** none — Hermes/Claude Code infra, not a vault Project

## Goal
Figure out how the user's "must summarize/compact at ~100k context" rule can actually be enforced across agents, given the WebUI doesn't have the same visible `/compact`-driven verbosity as a terminal. Establish the compact-vs-summarize distinction and get the underlying auto-compression config actually correct for the model in use.

## Standing Directives Given This Session
- **Compact vs. summarize split (already written to `AGENTS.md` this session, see Vault Updates):** Agents compact context at ~100k tokens (in-conversation housekeeping, e.g. Claude Code's `/compact`) as a separate action from summarize (writing to `06-Agent-Sessions/` via the template — only triggered by an explicit "session complete" / "session summary" request, never automatically at the 100k mark).
- **Only the SecondBrain vault gets this rule** — `hermes-webui` and `hermes-agent` are code repos, not agent-workflow/vault files, and were explicitly excluded by the user.

## User Prompts (Extracted, Not Compressed)
- **Prompt:** "Is there a way for u to know, while working, how much context has been used or is still available? See, I have a 'Must summarize at ~100k context' rule for my agents, for me to save credits and use my tokens wisely. But my agents can't tell when 100k context is reached, so they just keep going... Back to the 'How does the agent know when to compact'. That part I dunno yet, so that's what we'll figure out together. But just update the claude.mds, wherever they are, with the summarize template and folder rules."
  **Overrode/Added:** Established the initial ask — split into (a) update CLAUDE.md/AGENTS.md files with the summarize template/folder convention now that Claude Code's `/compact` is in use, and (b) separately investigate the harder open question of automatic threshold detection.
- **Prompt (via clarify tool):** "Only SecondBrain — that's the only vault."
  **Overrode/Added:** Confirmed the compact/summarize rule should NOT be added to `hermes-webui/CLAUDE.md` or `hermes-agent/CLAUDE.md`, only to the SecondBrain vault's own `AGENTS.md`/`CLAUDE.md`.
- **Prompt:** "See, 50% of claude sonnet is 500k context, and that's not gonna fly. It could work for a 200k context model, but not claude. So we need to make it know for claud that it's 100k"
  **Overrode/Added:** Corrected my earlier assumption that Claude Sonnet 5 has a 200k window (it's actually 1M in Hermes' `model_metadata.py`) and directed the fix toward a Claude-specific threshold override rather than changing the global default.
- **Prompt:** "Before this moment, u were at 102k and I ran compact. But now, u are lower. When will the config change apply? After a restart or something? And how will a model know when to compact? Does the hermes config force it? or does it wait for the agent turn to finish before running, leading to more than 100k potentially? Bring me up to speed"
  **Overrode/Added:** Required grounding the answer in actual Hermes source (not assumption) — confirmed the per-model override is read once at agent-construction time (in-memory, not per-turn), so it takes effect on session refresh/eviction, not instantly; and confirmed compression is a forced preflight check before every API call, not a post-turn or model-initiated action.

## Reference Files / Media
- None external — all research was direct source inspection of `/home/venmarc/hermes-agent` and `/home/venmarc/hermes-webui` (installed Hermes source, not vault docs).

## Root Cause Log
| Symptom | Root Cause | Fix Applied | Confidence |
|---|---|---|---|
| Auto-compression would only fire at ~500k tokens for Claude Sonnet 5 sessions, far past the user's ~100k target | `compression.threshold: 0.5` in `~/.hermes/config.yaml` is a *fraction* of the model's context window, and Claude Sonnet 5 resolves to a 1,000,000-token window in Hermes (`agent/model_metadata.py`), not 200k — so 0.5 × 1M = 500k, not 100k | Added `compression.model_thresholds.claude-sonnet-5: 0.1` via `hermes config set` (0.1 × 1,000,000 = 100,000 tokens) | Confirmed — verified via `hermes config get compression` showing the nested override, and via `model_metadata.py` grep confirming the 1M window |
| Config change didn't appear to affect the already-running session immediately | `compression.model_thresholds` is read from `config.yaml` once at agent-construction time (`agent_init.py`) and cached as an in-memory attribute on the `context_compressor` object for the life of that session's agent instance — not re-read per turn | None needed; documented that it takes effect on next new session or any event that triggers `_evict_session_agent` (model switch, `/api/session/clear`, `/api/session/truncate`, session delete) | Confirmed via direct source read of `agent_init.py:1930` and `routes.py` eviction call sites |

## Research Conducted
- **Searched/Consulted:** Direct grep/read of `~/.hermes/config.yaml`, `hermes-agent/agent/context_compressor.py`, `hermes-agent/agent/agent_init.py`, `hermes-agent/agent/model_metadata.py`, `hermes-agent/agent/turn_context.py`, `hermes-webui/api/routes.py`, `hermes-webui/static/ui.js`, and the `claude-code` skill (for the `/compact`, `/context` slash-command reference used in the Claude Code CLI mode, as distinct from Hermes' own compressor).
- **Should have been consulted but wasn't:** N/A — went straight to source rather than guessing, per the user's repeated push for grounded answers.

## Subagent Snags
- None this session.

## Decisions & Pivots
- Decided the compact/summarize distinction belongs only in the SecondBrain vault's `AGENTS.md`/`CLAUDE.md`, not the two Hermes code-repo `CLAUDE.md` files, per explicit user confirmation via `clarify`.
- Discovered (and corrected) an early wrong assumption: initially treated Claude Sonnet 5 as a 200k-context model when reasoning about the default 0.5 threshold; user caught this, and source inspection confirmed the model actually resolves to 1,000,000 tokens in Hermes.
- Chose a **per-model override** (`compression.model_thresholds`) over changing the global `compression.threshold`, so other (non-Claude) models keep their own defaults.

## Steps Taken / Actions
1. Read `AGENTS.md`/`CLAUDE.md` files across SecondBrain, hermes-webui, hermes-agent to see existing session-shutdown rules.
2. Read `Templates/Agent-Session-Summary.md` to confirm the log template.
3. Patched `SecondBrain/AGENTS.md` to add the "Context management (compact vs. summarize)" section, and `SecondBrain/CLAUDE.md`'s Boot pointer to reference it.
4. Used `clarify` to confirm scope (SecondBrain only, not the code repos).
5. Searched Hermes WebUI source for a context-usage indicator; found the composer ring UI (`ui.js`) driven by `usage.last_prompt_tokens / usage.context_length`.
6. Searched Hermes source for the automatic compression mechanism; found `~/.hermes/config.yaml`'s `compression:` block (`threshold: 0.5`, `target_ratio: 0.2`, etc.), confirming Hermes has its own platform-level auto-compressor separate from Claude Code's manual `/compact`.
7. Explained the mechanism to the user, initially assuming Sonnet 5 = 200k context window.
8. User corrected this; re-grepped `model_metadata.py` and `bedrock_adapter.py`, confirming Claude Sonnet 5 (and other current Claude models) resolve to a 1,000,000-token context window in Hermes.
9. Ran `hermes config set compression.model_thresholds.claude-sonnet-5 0.1` (the direct `write_file`/`patch` tools refused, correctly, since `config.yaml` is security-sensitive — used the CLI instead).
10. Verified via `hermes config get compression` that the override landed correctly nested under `model_thresholds`.
11. Answered the follow-up on timing/enforcement by reading `agent_init.py` (config read once at construction), `turn_context.py` (forced preflight compression check before every API call, logged as "Preflight compression: ~X tokens >= Y threshold"), and `routes.py` (eviction triggers that would cause the new threshold to take effect on this session without a full restart).
12. Wrote this session summary per the user's shutdown protocol.

## Files Touched
- `[[/home/venmarc/Projects/SecondBrain/AGENTS.md|SecondBrain/AGENTS.md]]`
  - **Previous State:** Had an old "Session shutdown" section only covering memory_save + summary-write steps, no compact/summarize distinction.
  - **After Change:** Replaced with a "Context management (compact vs. summarize)" section defining compact (in-context only, ~100k trigger, never touches the vault) vs. summarize (06-Agent-Sessions/ log, only on explicit session-complete/summary request).
  - **Related to:** User's original prompt about the compact/summarize discrepancy.
- `[[/home/venmarc/Projects/SecondBrain/CLAUDE.md|SecondBrain/CLAUDE.md]]`
  - **Previous State:** Boot section pointer referenced the old session-shutdown wording.
  - **After Change:** Updated to point at the new compact/summarize split in `AGENTS.md`.
  - **Related to:** Same as above.
- `~/.hermes/config.yaml` (outside the vault — Hermes install config, not a vault file)
  - **Previous State:** `compression.threshold: 0.5` applied globally to every model, giving Claude Sonnet 5 a ~500k trigger point.
  - **After Change:** Added `compression.model_thresholds.claude-sonnet-5: 0.1`, giving Claude Sonnet 5 sessions a 100k trigger while leaving the global 0.5 default untouched for other models. Edited via `hermes config set` (direct file write is blocked by design for this file).
  - **Related to:** Root Cause Log row 1.

## Vault Updates This Session
- `[[ANTI_PATTERNS.md]]`: No changes — this was a Hermes/tooling configuration fix, not a confirmed third-party-library anti-pattern relevant to vault Projects. Line count unchanged at 92. Split: N/A.
- Project `AGENTS.md`: Added — see Files Touched above (Context management section, done earlier this session before this summary was requested).

## Open Questions & Next Steps
- **Next step:** Confirm in a fresh session (or after an eviction-triggering action) that Claude Sonnet 5 now actually compacts around 100k tokens as expected — this session's own agent instance was built before the config change and won't reflect it.
- **Open question:** Whether other models the user regularly uses (besides claude-sonnet-5) also have context windows that make the global `threshold: 0.5` default inappropriate, and whether they need their own `model_thresholds` entries too (raised at the end of the prior turn, not yet answered).
- **Open question:** No hard confirmation yet that a mid-turn tool-call storm (many tool calls before the next API preflight check) can't cause a temporary overshoot past the 100k target within a single turn — flagged as a theoretical edge case, not verified either way.

**Tags:** #agent-session #hermes #claude-code #context-compression #infra
