> **One-line Summary**: Rewrote Victor's cross-runtime agent instructions into one universal constitution + a resilient global entry point + thin per-runtime adapters, after scrapping an over-engineered hypothetical-scenario test harness that was measuring compliance theater instead of behavior.

**Date:** 2026-08-04
**Agent:** OpenCode
**Project:** none (workspace/agent-ops infrastructure)

## Goal
Replace the drifted, coding-biased, partly-stale set of agent instruction files (`~/AGENTS.md`, `~/Documents/AGENTS.md`, `~/CLAUDE.md`, `~/.gemini/GEMINI.md`, `~/.grok/AGENTS.md`, OpenCode config) with a single universal constitution governing all session types, a hardened global entry point carrying the safety floor + runtime routing, and thin runtime adapters that defer to the constitution.

## Standing Directives Given This Session
- **No manufactured hypothetical test scenarios for agent instruction files.** Victor: "AGENTS.md are supposed to be straightforward that agents don't mess them up... Agents don't do hypotheticals." Do not validate instruction files by making agents role-play invented situations against files that don't exist — that measures compliance theater, not behavior. Skip elaborate testing; review and apply directly. (Process rule — applies beyond this session.)

## User Prompts (Extracted, Not Compressed)
- **Prompt:** "Are the files something I can paste myself and give u their responses? If so, let's do that instead. I'm sure running headless has some effect that can be mitigated by me running it... Also the scenarios, are they already manufactured waiting for the agents to run them or do the agents have to make them up and solve/address them? cos what I'm seeing in those scenarios might cause confusion. Agents don't do hypotheticals, do they?"
  **Overrode/Added:** Rejected the headless test-harness approach and exposed the core methodology flaw — the 12 scenarios referenced non-existent files and forced agents to role-play fiction. Redirected away from behavioral testing entirely.
- **Prompt:** "Nah. Agent.md are supposed to be straight forword that agents don't mess them up. we started going crazy when we were testing how agents responsed to hypothetical scenarios. What we had initially was a good plan for all the involved files. I just wasn't paying attention and let u and sol invent tests for agents. That's not gonna fly. Skip elaborate testing. Review and make the changes for real."
  **Overrode/Added:** Killed the entire test-harness workstream (harness, payloads, model routing, scoring). Reverted to the original approved file plan. Direct rewrite, no testing.
- **Prompt:** "Apply the review. Claude uses claude.md just like every agent uses AGENTS.md... But the current claude.md is connected to Agents.md, so no need to write fresh stuff for claude... Although the contents of claude.md are weird rn, with the project specificity and all. Makes CLAUDE.md not helpful for other session types. It has to follow a similar laid out structure like the other files."
  **Overrode/Added:** Confirmed apply-then-review (not diff-first). Set the Claude adapter target as `~/CLAUDE.md`, and required it be restructured to match the thin-adapter pattern of the other files rather than keeping its project-specific identity/map content.
- **Prompt:** "@ imports won't work for the ~/Documents/AGENTS.md? If it would work, then there's no need for much, the agent will read it when it's reading AGENTS.md."
  **Overrode/Added:** Prompted clarification that `@` imports are Claude-Code-only; kept the per-runtime load mechanisms (Claude=`@` imports, OpenCode=`instructions` hook, Gemini/Grok=prose). Approved keeping the `@AGENTS.md` + `@Documents/AGENTS.md` imports in `~/CLAUDE.md`.

## Reference Files / Media
- `/tmp/opencode/ruthless-agent-constitution-handoff.md` — Summary: source design brief that defined the rewrite (scrapped-testing predecessor session's handoff).
- `~/.gemini/GEMINI.md` (pre-edit) — Summary: showed the over-applied "plan every task as an artifact" ceremony that the rewrite removed.
- `~/CLAUDE.md` (pre-edit) — Summary: showed the project-specific identity/map content Victor flagged as making the file unhelpful for non-coding session types.

## Root Cause Log
| Symptom | Root Cause | Fix Applied | Confidence |
|---|---|---|---|
| Prior session's agent-instruction tests looked like they passed but were meaningless | Test scenarios were manufactured hypotheticals referencing non-existent files; agents quoted/role-played instead of exhibiting behavior on real work (compliance theater) | Scrapped the entire test-harness workstream; applied the reviewed files directly | Confirmed |
| Headless `agy -p` print mode returned `timeout waiting for response` even on trivial prompts | Print/headless mode appears broken or misconfigured on this box (independent of model) | Abandoned headless testing route; not needed after scrapping tests | Hypothesis |
| Constitution at `~/Documents/AGENTS.md` would not auto-load in OpenCode | OpenCode only up-traverses to `~/AGENTS.md` and does NOT follow file references inside it; `~/Documents/` is never reached | Added explicit `instructions: ["/home/redmane/Documents/AGENTS.md"]` hook to `opencode.jsonc` | Confirmed |

## Research Conducted
- **Searched/Consulted:** Prior discovery (documented in the handoff) confirmed OpenCode `~/AGENTS.md` up-traversal behavior and non-parsing of file references via opencode.ai/docs/rules; Claude Code `@`-import semantics.
- **Should have been consulted but wasn't:** Whether AGY/Gemini and Grok expose an `instructions`-hook equivalent to OpenCode's. Flagged to Victor as an open item — Gemini/Grok currently rely on prose ("read and follow..."), the weakest load path.

## Subagent Snags
- No subagents dispatched this session.
- Tooling snag: my first JSONC validation script naively stripped `//` and broke on the `https://` in the `$schema` URL. Rewrote as a string-aware comment stripper; second run confirmed the config parses with all blocks intact.

## Decisions & Pivots
- **Scrap elaborate testing.** Instruction files are validated by review, not by agent role-play against fiction.
- **Per-runtime load mechanism, not one universal trick.** Claude → `@AGENTS.md` + `@Documents/AGENTS.md` auto-imports; OpenCode → `instructions` hook; Gemini/Grok → prose directive (their only option, and the acknowledged weak link).
- **Kept the `@` imports in `~/CLAUDE.md`** to make Claude's constitution-load airtight rather than downgrading it to prose.
- **Backup before apply** — copied all six live originals to `/tmp/opencode/backup-live/` (timestamp `20260804-065945`) before writing.
- **Left the vault worktree's unrelated dirty state alone** (` M AGENTS.md`, `?? docs/`) — no staging, no commits.

## Steps Taken / Actions
1. Diagnosed the test-harness methodology flaw with Victor; agreed to scrap it.
2. Read all six live targets + all candidate files in `/tmp/opencode/`.
3. Confirmed candidate `CLAUDE.md` was already a thin adapter; refined it to keep `@`-imports.
4. Backed up all six live files to `/tmp/opencode/backup-live/`.
5. Wrote the five markdown files and merged the `instructions` array into `opencode.jsonc` (preserving comments, `mcp`, `skills`, `provider`).
6. Verified: string-aware JSONC parse OK (`instructions` present; `mcp`=agentmemory+opencode-vision; `skills`; `provider`=agentrouter-claude+agentrouter-openai all intact); re-read all five markdown files.

## Files Touched
- `~/AGENTS.md`
  - **Previous State:** Workspace rules with stale `~/.agents/AGENTS.md` reference and a July-2026 project list (Ledger, Momentum).
  - **After Change:** Universal global entry point — ruthless-about-work opener, supervises/assist contract, hard safety floor, runtime routing (`agy`/Grok/`.agents`), and runtime notes (Brave/Playwright, agentmemory soft-fail, vault/project reading order).
  - **Related to:** Core rewrite goal.
- `~/Documents/AGENTS.md`
  - **Previous State:** Coding-only "Before implementing" checklist (goal/blocking-questions/assumptions/plan), 54 lines.
  - **After Change:** Full Universal Agent Constitution governing all session types — operating contract, instruction precedence, investigate-before-asking, 5-mode work classification, approval gate, surgical changes, diagnose/verify, git/deps, memory/vault/sessions, UI/design, collaboration, communication.
  - **Related to:** Core rewrite goal; canonical cross-runtime constitution.
- `~/CLAUDE.md`
  - **Previous State:** Project-specific — Victor's identity, portfolio/project map, per-project conventions; unhelpful for non-coding sessions.
  - **After Change:** Thin Claude runtime adapter with `@AGENTS.md` + `@Documents/AGENTS.md` auto-imports + Claude-specific behavior (layered CLAUDE.md, plan/permission gate, memory soft-fail, session-log path).
  - **Related to:** Victor's directive that CLAUDE.md match the other adapters' structure.
- `~/.gemini/GEMINI.md`
  - **Previous State:** 127 lines — heavy "plan every task as an artifact" ceremony, embedded memory rules, DIP design protocol.
  - **After Change:** Thin Gemini runtime adapter deferring to the constitution + Gemini-specific boot behavior (hooks/skills, approval modes, hook-failure handling, Brave, session-log path).
  - **Related to:** Removing over-applied planning ceremony.
- `~/.grok/AGENTS.md`
  - **Previous State:** Standalone Grok boot rules (role, session start/end, permissions, round-table, project isolation, workstyle).
  - **After Change:** Thin Grok runtime adapter deferring to the constitution + Grok-specific behavior (session-preference, subagent scope, safety, Grok-vs-agentmemory distinction, session-log path).
  - **Related to:** Core rewrite goal.
- `~/.config/opencode/opencode.jsonc`
  - **Previous State:** No `instructions` array; `mcp` + `skills` + `provider` blocks only.
  - **After Change:** Added `"instructions": ["/home/redmane/Documents/AGENTS.md"]` with an explanatory comment; all existing blocks preserved.
  - **Related to:** OpenCode not reaching the constitution via up-traversal.

## Vault Updates This Session
- `[[ANTI_PATTERNS.md]]`: No changes — line count after edit: N/A. Split triggered: N/A. (No third-party library/API root cause this session; the methodology lesson is a process directive, captured below.)
- Project `AGENTS.md`: No project-specific AGENTS.md changed. The standing directive ("no manufactured hypothetical tests for instruction files; validate by review") is agent-ops process, not project-scoped — recorded under Standing Directives here. If Victor wants it enforced globally it belongs in `~/Documents/AGENTS.md`; flagged as an open question below rather than silently editing the just-rewritten constitution.

## Open Questions & Next Steps
- **Gemini/Grok load path is the weak link.** They rely on prose directives to open the constitution. Check whether AGY/Gemini or Grok expose an `instructions`-hook equivalent to OpenCode's; wire it if so.
- **Should the "no manufactured hypothetical tests" directive be codified** into `~/Documents/AGENTS.md` (or an agent-ops note), or left as a one-time correction? Awaiting Victor.
- **Test artifacts remain** in `/tmp/opencode/` (harness, payloads, probes, `result-*`) — leave or delete? Victor's call.
- **agentmemory `memory_save`** of this session's durable decisions was not performed (MCP health not confirmed this session); do so when the service is verified up.

**Tags:** #agent-session
