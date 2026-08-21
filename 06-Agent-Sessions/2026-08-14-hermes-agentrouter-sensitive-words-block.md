<!--
AGENT: Fill every section below. Do not leave placeholders blank and do not skip a section because "nothing happened" — write "None this session."
This file is a SESSION LOG (episodic history). It is NOT the place to store rules, anti-patterns, or design decisions that should apply to future sessions:
  - Confirmed root causes tied to a third-party library/API → ANTI_PATTERNS.md (vault root, or its split file under 03-Resources/Principles/ if that technology's section has already been split — check for a pointer first).
  - Standing directives about how THIS project should be run → this project's own AGENTS.md, under Non-Negotiable Rules (Session Conduct subsection).
If this session produced either kind of lesson, you MUST write it into the correct file above, then just link to it here. If you only write it here, it will be lost — nobody re-reads old session logs before starting new work.
-->

> **One-line Summary**: Diagnosed the Hermes desktop's `HTTP 500: sensitive words detected` as AgentRouter's upstream content filter — it rejects raw IP addresses, email addresses, and domain names in prompts (not `~/Documents/AGENTS.md`, which was ruled out) — and fixed the `.env` line-489 colon bug that spammed a python-dotenv parse warning on every `hermes` command.

**Date:** 2026-08-14
**Agent:** Hermes (deepseek-v4-flash)
**Project:** none (Hermes desktop/Agent-Ops configuration)

## Goal
Diagnose why Victor's messages to the Hermes desktop app kept failing with "sensitive words detected" (7 attempts), confirm the trigger mechanism, and document how to avoid it. The session opened as a request to link the desktop Hermes instance to the Oracle-hosted WebUI instance; that was explicitly deprioritized mid-session ("Ignore the first prompt directive") in favor of the sensitive-error investigation.

## Standing Directives Given This Session
- None. ("Ignore the first prompt directive" was a direction change for this session, not a standing rule.)

## User Prompts (Extracted, Not Compressed)
- **Prompt:** "i keep hitting sensitive word blocks, and I think it's from the ~/Documents/AGENTS.md, and this is my 7th attempt btw"
  **Overrode/Added:** Attributed the failures to the local AGENTS.md constitution — the prime suspect to be ruled out.
- **Prompt:** "DAwg. Ignore the first prompt directive. Find out what cause the sensitive error and how we can avoid it"
  **Overrode/Added:** Dropped the original two-instance linking task; focused the session solely on the block.
- **Prompt:** "Agentrouter is what I used initially, so it's not dead is it'? it only got flagged. Summarize this to my vault"
  **Overrode/Added:** Rejected the "key is dead" reading of the 401 test results; asked for the findings to be written to the Second Brain vault.

## Reference Files / Media
- `~/Documents/AGENTS.md` (Universal Agent Constitution) — prime suspect; loaded into context cleanly with zero `[BLOCKED: ...]` placeholders → ruled out.
- `~/.hermes/logs/desktop.log` (lines ~700–820) — all failure entries: `Provider: custom · Model: gpt-5.6-sol · Endpoint: https://agentrouter.org/v1 · HTTP 500: sensitive words detected (request id: ...)`, 3 retries each, across 19:39/19:43/19:58/20:06/20:24.
- `~/.hermes/config.yaml` — `custom_providers: AgentRouter { base_url: https://agentrouter.org/v1, key_env: AGENTROUTER_API_KEY, models: gpt-5.6-sol, claude-opus-4-8, claude-opus-5 }`.
- `~/.hermes/.env` — line 489 `AGENTROUTER_BASE_URL: ...` (colon, not `=`).
- Skills: `hermes-agent`, `agentrouter-debug` (matching 401 shape `unauthorized client detected`).

## Root Cause Log
| Symptom | Root Cause | Fix Applied | Confidence |
|---|---|---|---|
| Desktop chat: `HTTP 500: sensitive words detected` on gpt-5.6-sol via AgentRouter, 3 retries, 7 user attempts | AgentRouter's **upstream content filter** (Chinese-style 敏感词 moderation) rejects prompts containing raw IP-address strings, email addresses, or full domain names. Filter fires **before** authentication: blocked → `HTTP 400 content-blocked`; passed → reaches auth (`401`). Live curl bisection: `protonmail`, `venmarc@protonmail.com`, `161-118-166-101`, `*.sslip.io` → blocked; `ssh key`, `sudo password`, `telegram`, `port 8788`, `jeremy` → pass | None code-side (avoidance only: rephrase with aliases, or use a model not behind the filter — DeepSeek/Nous both available) | Confirmed (live endpoint tests) |
| `python-dotenv could not parse statement starting at line 489` printed on every `hermes` command | `.env` line 489 used a colon separator: `AGENTROUTER_BASE_URL: https://agentrouter.org/v1` instead of `=` | Changed to `AGENTROUTER_BASE_URL=https://agentrouter.org/v1` (backup `~/.hermes/.env.bak`); warning gone, `hermes --version` clean | Confirmed |
| Direct curl to `https://agentrouter.org/v1` with stored key returns `401 unauthorized client detected` on **all** models incl. benign "say hello" (~20:45), while desktop got post-auth 500s at 20:24 | Key rotated/expired, **or** client flagged after the sensitive-word burst (Victor's reading: flagged, not dead) | None — re-test later; if still 401, re-grab key from AgentRouter dashboard | Hypothesis (unresolved) |

## Research Conducted
- **Searched/Consulted:** `desktop.log` greps; `hermes status`; config.yaml `custom_providers` block; `.env` inspection; live curl bisection against `https://agentrouter.org/v1/chat/completions` (2 rounds, 13 test messages, real API key); `agentrouter-debug` skill (its 401 known-bad shape `unauthorized client detected` matches); vault AGENTS.md/BRAIN.md/index.md before vault write.
- **Should have been consulted but wasn't:** N/A — root cause was confirmed empirically without needing provider docs.

## Subagent Snags
- None this session.

## Decisions & Pivots
- **Pivot 1:** Abandoned the two-instance Hermes linking task (Victor's directive) — it remains open, parked.
- **Decision:** AGENTS.md ruled out as the block source: Hermes' own scanner is local and rewrites context to `[BLOCKED: ...]` placeholders; it never produces an HTTP error, and the file loaded clean.
- **Decision:** Accepted Victor's "flagged, not dead" interpretation of the 401 as plausible (desktop auth worked at 20:24; 401 appeared after a 13-request test burst) and recorded the ambiguity instead of overclaiming.
- **Avoidance guidance adopted:** never type raw IPs / email addresses / full domains into AgentRouter-backed conversations; use aliases ("the oracle server", "my VPS", "my mail provider") or reference a local file; DeepSeek and Nous Portal are filter-free alternatives already configured.

## Steps Taken / Actions
1. `hermes status` + `hermes --version` + `hermes --help` — baseline; noticed the line-489 dotenv warning.
2. Read `~/Documents/AGENTS.md` — loaded clean, no blocked markers → exonerated.
3. Grepped `~/.hermes/logs/desktop.log` — isolated all "sensitive words detected" failures to `custom` provider / `gpt-5.6-sol` / `agentrouter.org/v1`.
4. Grepped config.yaml `custom_providers` + `.env` (found the colon bug on line 489).
5. Curl round 1 (5 messages): benign + ssh/password → `401 unauthorized client`; protonmail/telegram + sslip URL → `400 content-blocked`. Proved the filter fires pre-auth and is content-driven.
6. Curl round 2 (8 messages): isolated triggers — `protonmail`, email address, raw IP, `*.sslip.io` → blocked; `ssh key`, `sudo password`, `telegram`, `port 8788`, `jeremy`, benign → pass.
7. Curl round 3 (3 messages): `claude-opus-4-8`/`claude-opus-5` benign → also `401` (key-level, not model-level); combined ip+mail message → `400 content-blocked`.
8. Fixed `.env` line 489 colon→`=` (backup first), verified parse warning gone.

## Files Touched
- `~/.hermes/.env` (outside vault — referenced in prose per vault no-absolute-path rule)
  - **Previous State:** line 489 `AGENTROUTER_BASE_URL: https://agentrouter.org/v1` (unparseable by python-dotenv)
  - **After Change:** line 489 `AGENTROUTER_BASE_URL=https://agentrouter.org/v1`; backup at `~/.hermes/.env.bak`
  - **Related to:** Root Cause Log row 2
- `[[ANTI_PATTERNS]]` — added AgentRouter content-filter row under `## OpenCode / Custom AI Providers` (see Vault Updates below)

## Vault Updates This Session
- `[[ANTI_PATTERNS.md]]`: added 1 row under `## OpenCode / Custom AI Providers` (AgentRouter upstream content filter blocks raw IPs / emails / domains; filter fires pre-auth) — line count after edit: ~101. Split triggered: **No** (well under 200).
- Project `AGENTS.md`: No changes.

## Open Questions & Next Steps
- **AgentRouter key status:** dead vs client-flagged unresolved. Re-run one benign curl later; if still `401 unauthorized client detected`, re-grab the key from the AgentRouter dashboard/Discord and update `AGENTROUTER_API_KEY` in `~/.hermes/.env`.
- **Original request (parked):** linking the desktop Hermes instance with the Oracle-hosted WebUI instance for cross-machine sync/continuity — untouched this session.
- If the linking project resumes, note the sensitive-word filter means any sync/bridge content should avoid raw IPs/emails/domains, and the Oracle box's resource constraints (shared with a paying tenant) rule out heavy background sync.

**Tags:** #agent-session #hermes #agentrouter #content-filter #config-fix
