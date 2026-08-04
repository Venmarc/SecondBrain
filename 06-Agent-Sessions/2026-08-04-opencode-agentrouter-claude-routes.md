> **One-line Summary**: Restored AgentRouter Claude routing in OpenCode by correcting the Anthropic path to `/v1/messages`, then overturned an incorrect catalog conclusion by proving the dashboard's `claude-opus-5` route works and adding it beside Opus 4.8.

**Date:** 2026-08-04  
**Agent:** OpenCode  
**Project:** none

## Goal

- Diagnose why AgentRouter's Claude route returned empty or unknown completions in OpenCode, determine which advertised models were genuinely routable, and leave the global model list with verified Claude and GPT entries.

## Standing Directives Given This Session

- None. The instruction not to read `AGENTS.md`, `CLAUDE.md`, `Documents-AGENTS.md`, `GEMINI.md`, or `GROK.md` applied to the earlier diagnostic work only and was honored during that work; it was not stated as a permanent cross-session rule.

## User Prompts (Extracted, Not Compressed)

- **Prompt:** "What did we do so far?"
  **Overrode/Added:** Requested a continuity recap. The supplied state described the investigation already completed, the explicit excluded-file constraint, the `/v1` path discovery, the configuration edit, and the need to restart existing OpenCode processes.

- **Prompt:** "Nice nice. i'll do the restart later but i gotta understand something. The only models agentrouter offers are opus 4.8 and gpt 5.6 sol only? No opus 5 even though it's listed in the user dashboard? Hmm. This is weird, and i don't wanna accept it. i'll assume u've done a lot of digging so u can tell me why they listed it, but don't offer it? u can research further to answer this"
  **Overrode/Added:** Rejected accepting the apparent two-model catalog at face value and required further research into the mismatch between the dashboard, documentation, OpenCode, and live routes.

- **Prompt:** "Alright. Add claude-opus-5. It might even be sonnet 4.6 disguised as opus 5. but i wanna test it out with real tasks here anyway. I hear opus is kinda anxious and \"kuku\" in the head. i wanna see if this is truly it. And add it to my list of use models"
  **Overrode/Added:** Converted the verified Opus 5 research result into a permanent global OpenCode configuration change while preserving uncertainty about the upstream model behind AgentRouter's alias.

- **Prompt:** "this session worth documenting in my vault. the whole journey. Read \"/home/redmane/Documents/SecondBrain/Templates/Agent-Session-Summary.md\" and write a session summary to SecondBrain/06-Agent-Sessions."
  **Overrode/Added:** Requested a complete vault record of the troubleshooting journey rather than only the final configuration state.

## Reference Files / Media

- `~/.config/opencode/opencode.jsonc` — Global OpenCode provider configuration; initially declared AgentRouter Claude with the root domain and later held the corrected `/v1` base URL plus verified model IDs.
- `~/.local/share/opencode/auth.json` — Credential store used to confirm both custom AgentRouter providers had credentials present; secret values were not printed or recorded.
- `~/.local/share/opencode/log/opencode.log` — Runtime/provider diagnostics consulted during the original empty-completion investigation.
- `/tmp/opencode/header-probe.jsonl` — Redacted forwarding-probe evidence comparing request paths; showed Claude Code using `/v1/messages?beta=true` while OpenCode with the root base URL composed `/messages`.
- [AgentRouter OpenCode guide](https://docs.agentrouter.org/opencode.html) — Documented an Anthropic base URL without `/v1`, an example using Opus 4.6, and older OpenAI-compatible model names.
- [AgentRouter Claude Code guide](https://docs.agentrouter.org/claude-code.html) — Listed Opus 4.6, 4.7, and 4.8 and explained the Claude Code base URL convention.
- [AgentRouter Kilo Code guide](https://docs.agentrouter.org/kilocode.html) — Contradicted the generic Anthropic guidance by requiring `/v1` for Kilo Code and naming Opus 4.6, 4.7, and 4.8.
- [AgentRouter status endpoint](https://agentrouter.org/api/status) — Reported upstream disruption and large-scale Claude route disablement, supporting the distinction between a listed model and a currently healthy route.
- `[[Templates/Agent-Session-Summary|Agent Session Summary template]]` — Required structure for this record, including verbatim prompts, root causes, references, failures, and durable lesson extraction.

## Root Cause Log

| Symptom | Root Cause | Fix Applied | Confidence |
|---|---|---|---|
| AgentRouter Claude returned empty output or `reason: "unknown"` in OpenCode while the same credential worked through Claude Code | OpenCode's `@ai-sdk/anthropic` adapter appended `/messages` directly to `https://agentrouter.org`, producing the wrong route; AgentRouter's working Anthropic endpoint was `/v1/messages` | Changed the custom provider base URL to `https://agentrouter.org/v1`; fresh OpenCode requests returned text, `reason: "stop"`, and normal token accounting | Confirmed |
| `opencode models agentrouter-*` appeared to prove AgentRouter offered only Opus 4.8 and GPT 5.6 Sol | Custom-provider model output came from the manually declared `models` objects in the local OpenCode config, not AgentRouter server discovery | Reframed the command as a local catalog check, used temporary declarations to test candidate IDs, and tested the exact dashboard ID through OpenCode | Confirmed |
| Dashboard listed Opus 5 while public setup guides omitted it, leading to an initial conclusion that it was advertised but unavailable | AgentRouter's dashboard/backend catalog and per-client public documentation had drifted; the route ID `claude-opus-5` was newer than the documented examples | Tested `claude-opus-5` twice through the supported OpenCode path, then added it permanently after both calls succeeded | Confirmed |
| The true upstream identity behind `claude-opus-5` remains uncertain | AgentRouter controls alias-to-upstream routing, and a successful completion proves route acceptance but not the exact upstream model | Kept the exact provider alias and avoided claiming independent verification of the upstream model identity | Hypothesis |

## Research Conducted

- **Searched/Consulted:** AgentRouter's OpenCode, Claude Code, Codex, Cline, Roo Code, Kilo Code, OpenClaw, Hermes, Pi, contact, status, and dashboard application surfaces; OpenCode's resolved config and custom-provider model output; authenticated and unauthenticated model endpoints; redacted request-path probing; fresh inference tests through OpenCode; agentmemory records from the investigation.
- **Should have been consulted but wasn't:** AgentRouter operator confirmation or upstream channel metadata. Public endpoints and successful inference establish routability, but only AgentRouter can attest which upstream model serves the alias.

## Subagent Snags

- None. No subagents were used.
- Initial direct authenticated `curl` attempts failed because a malformed `jq` field expression yielded an empty token; corrected syntax was used later without exposing the credential.
- Even with a valid credential and a Claude-like user agent, direct `/v1/models` requests returned `unauthorized client detected`; AgentRouter restricts ordinary direct-client traffic, so supported-client inference became the authoritative test.
- Candidate tests for Opus 4.6, Opus 4.7, and the guessed `claude-opus-5-0` identifier timed out during a parallel probe. The exact `claude-opus-5` candidate returned normally and was retested independently.
- One plain post-fix run earlier in the journey returned an empty result, while subsequent isolated and regular-config tests succeeded; this was treated as possible route fluctuation rather than evidence against the confirmed path fix.

## Decisions & Pivots

- Used a local redacted forwarding probe instead of printing credentials or guessing from high-level errors.
- Treated request-path composition as client-specific: Claude Code can use the root domain because it appends `/v1/messages`, while OpenCode's Anthropic adapter required a base URL ending in `/v1`.
- Initially removed `claude-opus-5` after treating docs/local model output as authoritative; reversed that conclusion when the user challenged it and direct supported-client inference proved the exact dashboard ID worked.
- Distinguished route identity from upstream identity: `claude-opus-5` is verified as a working AgentRouter alias, but the session does not claim it is independently proven to be Anthropic Opus 5.
- Kept Opus 4.8 available beside Opus 5 rather than replacing it, enabling real-task comparison.

## Steps Taken / Actions

- Confirmed `agentrouter-openai/gpt-5.6-sol` worked through OpenCode.
- Confirmed the shared AgentRouter credential worked through the documented Claude Code client.
- Built a temporary forwarding probe that recorded redacted request paths and non-secret headers.
- Compared Claude Code's `/v1/messages?beta=true` request with OpenCode's incorrect `/messages` request.
- Tested OpenCode with an Anthropic base URL ending in `/v1`; received valid `OK` output with `reason: "stop"` and token usage.
- Updated the global OpenCode config to use `https://agentrouter.org/v1`, removed the then-unverified Opus 5 entry, and retained Opus 4.8.
- Researched AgentRouter's public docs, dashboard application, model endpoints, status announcement, and per-client configuration discrepancies.
- Corrected the interpretation of `opencode models`: it reports custom models declared locally.
- Added candidate IDs in a temporary config and proved `claude-opus-5` with two successful prompts: `OK` and `OPUS5_ROUTE_OK`.
- Added `claude-opus-5` permanently beside `claude-opus-4-8` and verified the permanent config returned `OPUS5_CONFIG_OK`.
- Saved the base-URL fix and model-catalog correction to agentmemory.

## Files Touched

- `~/.config/opencode/opencode.jsonc`
  - **Previous State:** AgentRouter Claude originally used `https://agentrouter.org`; after the first fix it declared only `claude-opus-4-8`.
  - **After Change:** Uses `https://agentrouter.org/v1` and declares both `claude-opus-4-8` and `claude-opus-5`; commented default examples include both Claude routes and GPT 5.6 Sol.
  - **Related to:** Root Cause Log rows 1–3 and the prompt to add Opus 5.
- `[[ANTI_PATTERNS]]`
  - **Previous State:** No OpenCode/custom-provider section captured request-path composition or local-catalog discovery traps.
  - **After Change:** Contains two confirmed cross-project entries covering Anthropic base URL composition and `opencode models` behavior for custom providers.
  - **Related to:** Root Cause Log rows 1–2.
- `[[06-Agent-Sessions/2026-08-04-opencode-agentrouter-claude-routes]]`
  - **Previous State:** No vault record preserved the complete AgentRouter investigation.
  - **After Change:** Records the symptoms, evidence, incorrect conclusion, correction, config changes, live tests, and unresolved upstream-identity caveat.
  - **Related to:** The session-summary prompt.
- `[[index]]`
  - **Previous State:** Agent Sessions pointed to the August 3 SecondBrain critique as the latest session.
  - **After Change:** Latest-session pointer names this AgentRouter/OpenCode route investigation.
  - **Related to:** New session-note discoverability.
- `[[CHANGELOG]]`
  - **Previous State:** No August 4 entry for the provider fix, durable lessons, or session note.
  - **After Change:** Records the new session and anti-pattern entries.
  - **Related to:** Vault structural bookkeeping.

## Vault Updates This Session

- `[[ANTI_PATTERNS]]`: Added `OpenCode / Custom AI Providers` with confirmed entries for base-URL path composition and local custom-provider model catalogs — line count after edit: 98. Split triggered: No.
- Project `AGENTS.md`: No changes; this was global tool configuration and research, not a project session, and no standing project directive was given.

## Open Questions & Next Steps

- Restart existing OpenCode TUI processes so they load the changed global configuration; config is loaded at startup rather than hot-reloaded.
- Compare Opus 5 and Opus 4.8 on real, multi-step tasks, especially planning style, tool discipline, correctness, and behavioral differences.
- Do not infer upstream identity from tone or personality alone. A rigorous identity check would require provider attestation or metadata unavailable through the restricted model endpoint.
- If Claude routes become intermittent, check AgentRouter's current status/community announcements before changing the known-good `/v1` configuration.

**Tags:** #agent-session #agent-ops #opencode #agentrouter #claude #debugging
