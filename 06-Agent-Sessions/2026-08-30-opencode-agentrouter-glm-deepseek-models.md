# Session Log — AgentRouter: add glm-5.3 + deepseek-v4-flash to OpenCode — 2026-08-30

> **One-line Summary**: Added `glm-5.3` and `deepseek-v4-flash` under the existing `agentrouter-openai` provider in OpenCode and verified both respond — after proving the "401 unauthorized client" seen in raw curl was a client-fingerprint gate, not a key or IP problem.

**Date:** 2026-08-30
**Agent:** OpenCode
**Project:** none (system/tooling config)

## Goal

Make AgentRouter's two new pool models, `glm-5.3` and `deepseek-v4-flash`, selectable under the existing "AgentRouter (OpenAI)" provider block (no new provider blocks), and verify they respond. The GPT budget (`gpt-5.6-sol`) is exhausted; GLM/DeepSeek pools still have budget.

## Standing Directives Given This Session

- "Try the first key and see if it works. If KEY 1 fails in this turn, then u can try keys 2 and 3 for those two models." — scoped key-testing order for the task.
- "I added a key 4... If it doesn't work here then the issue isn't the key." — diagnosis rule for this session.

## User Prompts (Extracted, Not Compressed)

- **Prompt:** "I want u to add these two new models under the openai section, instead of creating 2 new provider blocks, and when I select agentRouter (openai), I'll see 3 models instead of only 1."
  **Overrode/Added:** Set the implementation shape: extend `agentrouter-openai` only; do not create `agentrouter-glm` / `agentrouter-deepseek` blocks.
- **Prompt:** "I remeoved the api keys here from my dashbaord. Here's a new one: dj_esco.env. Try the first key and see if it works."
  **Overrode/Added:** The stored OpenCode/Hermes keys were revoked; testing now uses keys from `~/Downloads/dj_esco.env`.
- **Prompt:** "I just disconnected cloudflare warp myself... I have been using agentrouter with Warp, and my pc connects to warp routinely so warp might not be the problem later on."
  **Overrode/Added:** Added WARP as a suspected factor; retested with WARP off, then on.

## Reference Files / Media

- `~/Downloads/dj_esco.env` — 4 AgentRouter keys (1–4) supplied by Victor; key 4 verified working on his other PC.
- `~/.local/share/opencode/auth.json` — provider auth store; old AgentRouter keys were revoked and replaced.
- Existing `~/.hermes/skills/agentrouter-debug/SKILL.md` and `~/agentrouter-handoff.md` — prior session's diagnosis playbook (filter-before-auth, dead-key 401 symptom, verification recipe).

## Root Cause Log

| Symptom | Root Cause | Fix Applied | Confidence |
|---|---|---|---|
| Every raw `curl`/Python-urllib request to `agentrouter.org/v1` returned HTTP 401 `unauthorized client detected`, even with no key and even for the working model `gpt-5.6-sol` | AgentRouter's gateway (Aliyun WAF in front of a one-api backend; `acw_tc` cookie, `X-Oneapi-Request-Id` header) rejects raw clients by client-fingerprint before auth. opencode's Node fetch client passes from the same machine/IP | Stop using raw curl/Python to validate AgentRouter; test through `opencode run -m agentrouter-openai/<model>` | Confirmed (opencode succeeded from identical machine/IP/network) |
| All keys from `dj_esco.env` (1–4) failed the raw-curl test | False positive from the client-fingerprint gate — key 4 works on Victor's other PC via Hermes | Verified via opencode client instead | Confirmed |
| Cloudflare WARP suspected as blocker | WARP was not the blocker; opencode requests pass with WARP on (egress `104.28.220.42`) and off (real IP `102.90.100.213`) | Left WARP connected (Victor's normal state) | Confirmed |
| Keys 2 and 4 looked like different origins | They are the same key: identical suffix `V7wA`, identical subscription/usage values | None needed — treat them as one credential | Confirmed |
| Could not read quota/credits per key | The billing endpoints ARE reachable via Node fetch (same TLS stack that passes the gate): `/v1/dashboard/billing/subscription` + `/v1/dashboard/billing/usage` | Use Node fetch for AgentRouter quota checks; per-model pools are not exposed | Confirmed |

## Research Conducted

- **Searched/Consulted:** `~/.hermes/.env` (base URL, key presence), `~/.hermes/config.yaml` (custom_providers shape), Hermes agent logs (model resolution history), response headers (WAF fingerprint), `agentrouter.org` DNS (Aliyun ALB in ap-southeast-1).
- **Should have been consulted but wasn't:** N/A — the endpoint was probed live instead.

## Subagent Snags

- None.

## Decisions & Pivots

- Replaced the revoked AgentRouter keys in `~/.local/share/opencode/auth.json`, backing up the file first. Final state after Victor's key test order (3 → 1 → 2, all passed): **key 1 is the default** for all three AgentRouter provider IDs (`agentrouter`, `agentrouter-openai`, `agentrouter-claude`). Keys 2–4 left untouched in the env file (Victor marks them himself).
- Left WARP connected at session end (matches Victor's routine; proven non-blocking).

## Steps Taken / Actions

1. Located config: `~/.config/opencode/opencode.jsonc` holds the `agentrouter-claude` / `agentrouter-openai` provider blocks; `~/.config/opencode/opencode.json` holds stale `openai`/`anthropic` → `127.0.0.1:8787` overrides (proxy not running; left untouched).
2. Added `glm-5.3` (GLM 5.3) and `deepseek-v4-flash` (DeepSeek V4 Flash) to `agentrouter-openai.models`; validated JSONC parses with 3 models.
3. Probed live API with raw curl/Python across keys 1–4, all header/UA variants, WARP on and off, IPv4/IPv6, no-key baseline → consistent pre-auth 401.
4. Discovered the working method: **opencode's own client (Node TLS/fetch stack) passes the gate**; raw curl/Python (OpenSSL) are rejected. Key 4 verified → `pong`.
5. Registered keys in `~/.local/share/opencode/auth.json` (backup `.bak-20260830-205853`).
6. Verified via opencode client: `opencode run -m agentrouter-openai/glm-5.3 "Reply with exactly: pong"` → `pong`; same for `deepseek-v4-flash` → `pong`. Re-verified `glm-5.3` with WARP reconnected → `pong`.
7. Re-tested keys in Victor's order **3 → 1 → 2**, each against glm-5.3 and deepseek-v4-flash, via `opencode run`. All six checks passed. Set key 1 as the default in auth.json.
8. Quota check via **Node fetch** (same TLS stack as opencode, so it passes the gate): `/v1/dashboard/billing/subscription` and `/v1/dashboard/billing/usage` work per key. Per-model pools (e.g. GPT budget) are NOT exposed by these endpoints.
9. Updated memory and `ANTI_PATTERNS.md`.

## Quota check results (2026-08-30)

| Key | Limit (soft/hard) | Total usage | Notes |
|---|---|---|---|
| 1 | 100M / 100M | 37.34 | expires 2028-12-30 — **default key** |
| 2 | 26 / 26 | 1495.23 | **duplicate of key 4** (same suffix `V7wA`, same account) |
| 3 | 100M / 100M | 10.36 | high-limit account |
| 4 | 26 / 26 | 1495.23 | same key as key 2 |

Endpoint note: `/api/user/self` needs a session token (not an API key); `/v1/models` stays behind the client gate; `/api/status` is public.

## Files Touched

- `~/.config/opencode/opencode.jsonc`
  - **Previous State:** `agentrouter-openai.models` = `{ gpt-5.6-sol }` only.
  - **After Change:** `{ gpt-5.6-sol, glm-5.3, deepseek-v4-flash }`.
  - **Related to:** goal prompt (3 models under one block).
- `~/.local/share/opencode/auth.json`
  - **Previous State:** revoked AgentRouter keys.
  - **After Change:** key 1 set as default for `agentrouter`, `agentrouter-openai`, `agentrouter-claude` (backup file created).
  - **Related to:** key-4 verification, then key-1 default decision.
- `ANTI_PATTERNS.md` (OpenCode / Custom AI Providers section)
  - **Previous State:** 3 AgentRouter rows.
  - **After Change:** 4 rows — added the "401 ≠ dead key" client-fingerprint row. Line count after edit: 100. Split triggered: No.

## Vault Updates This Session

- `[[ANTI_PATTERNS.md]]`: added one row under "OpenCode / Custom AI Providers" — raw-curl 401 is a client-fingerprint gate, not a key-validity signal. Line count after edit: 100. Split triggered: No.
- Project `AGENTS.md`: No changes (no project).

## Open Questions & Next Steps

- Restart OpenCode so the model picker shows the 3 models under AgentRouter (OpenAI).
- If raw-curl validation is ever needed again, confirm whether a supported client (opencode/hermes) still passes first; do not treat the 401 as authoritative.
- Victor to mark keys 2/3/4 in `~/Downloads/dj_esco.env` (they were left untouched).

**Tags:** #agent-session
