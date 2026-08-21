<!--
AGENT: Fill every section below. Do not leave placeholders blank and do not skip a section because "nothing happened" — write "None this session."
This file is a SESSION LOG (episodic history). It is NOT the place to store rules, anti-patterns, or design decisions that should apply to future sessions:
  - Confirmed root causes tied to a third-party library/API → ANTI_PATTERNS.md
  - Standing directives about how THIS project should be run → this project's own AGENTS.md
-->

> **One-line Summary**: Investigated wiring Victor's Google AI Pro account (the one linked to the Antigravity CLI / `agy`, models: gemini-3.7/3.6/3.5-flash, gemini-3.1-pro, claude-sonnet-4-6, claude-opus-4-6-thinking, gpt-oss-120b) into Hermes. Cracked the OAuth refresh (client id + secret extracted from the `agy` binary), confirmed the account is live (`agy models` works with a freshly-refreshed token), discovered the real backend (`https://daily-cloudcode-pa.googleapis.com/v1internal`, REST-transcoded gRPC) and a working project id (`practical-abbey-wkhfj`). Blocked on the exact `generateContent` request shape (returns 500; schema partially mapped via error-oracle probing). Session ended by request — full handoff below for a fresh session.

**Date:** 2026-08-14
**Agent:** Hermes (deepseek-v4-flash)
**Project:** [[02-Areas/Hermes-Config|Hermes Config]] (machine: this one, user `redmane`)

## Goal
1. Wire Victor's Google AI Pro account — currently authenticated in the Antigravity CLI (`agy`, v1.1.10 at `~/.local/bin/agy`) — into Hermes so Hermes can call the Gemini models (and Claude models Google serves: sonnet-4-6, opus-4-6-thinking) plus image/video models through the same subscription.
2. No API key exists; the account is pure OAuth ("consumer" auth method, account `vennythundex28@gmail.com`). So the task is: reuse/refresh the existing OAuth session from Hermes.
3. Victor corrected model naming mid-session: **there is no "gemini 4.7"** — real lineup is 3.7/3.6/3.5-flash + 3.1-pro. Trust the binary, not marketing names.

## Standing Directives Given This Session
- "Don't take my exact wording for it" on model names — verify from the binary/backend.
- Session ended by Victor's request for a **handoff**; continue in a new session. Point him to this file.

## User Prompts (Extracted, Not Compressed)
- **Prompt:** (opening) "I have Antigravity CLI installed here, and it has my Gemini AI Pro account linked... I want u to wire my auth session here so I can make use of my gemini account through here. It has good video and image models... It also has sonnet 4.6 and opus 4.6 models as well. Lemme know if u need anything."
- **Prompt:** (mid-session correction) "The models available in antigravity: gemini 3.7, 3.6, 3.5 and maybe 3.1 pro, and the claude models. Just dig a bit deeper into the model names/id don't take my exact wording for it. Gemini doesn't have a 4.7 model."
- **Prompt:** (closing) "Dawg, do a session handoff. We'll continue in a new session... Point me to it's location when u are done."

## Key Findings (verified this session — DO NOT re-derive)
### Auth layout
- `~/.gemini/antigravity-cli/antigravity-oauth-token` — **the live Antigravity CLI token**: `{"token": {"access_token", "token_type", "refresh_token", "expiry"}, "auth_method": "consumer"}`.
- `~/.gemini/oauth_creds.json` — belongs to the **deprecated official `gemini` CLI** (v0.45.2). That client is dead: running `gemini` now errors *"This client is no longer supported for Gemini Code Assist for individuals... migrate to the Antigravity suite"*. Ignore this file for new work (its refresh DOES work but the client is tier-ineligible).
- `~/.gemini/google_accounts.json` — active account `vennythundex28@gmail.com`.
- **OAuth refresh (PROVEN WORKING):**
  - Endpoint: `POST https://oauth2.googleapis.com/token` (`grant_type=refresh_token`)
  - Client id: `[REDACTED_GOOGLE_CLIENT_ID]`
  - Client secret: `[REDACTED_GOOGLE_CLIENT_SECRET]`
  - Both strings extracted from the `agy` binary (`strings ~/.local/bin/agy`). A second client/secret pair also in binary: `[REDACTED_GOOGLE_CLIENT_ID]` + `[REDACTED_GOOGLE_CLIENT_SECRET]` (not needed; first pair works).
  - Refreshed token scope: `cclog cloud-platform userinfo.profile userinfo.email openid` — NOT the `generative-language` scope the public Gemini API wants.
- **Public Gemini API (`generativelanguage.googleapis.com/v1beta/openai/...`) rejects these tokens** — 401/403 `ACCESS_TOKEN_SCOPE_INSUFFICIENT`. Dead end unless a token with `generative-language` scope can be minted (needs a fresh OAuth consent; Antigravity's client may not be allowed that scope). Do not waste time here.
- `hermes proxy` only supports `nous` and `xai` upstreams — no google/gemini upstream. Check again in the new session in case it gained one, but assume no.

### Backend (where the actual models live)
- Base: `https://daily-cloudcode-pa.googleapis.com/v1internal` (also `cloudcode-pa.googleapis.com` in logs; `BAICODE_ENDPOINT_URL` / `CLOUD_CODE_URL` env overrides exist in the binary).
- REST-transcoded gRPC: `POST /v1internal:<method>` with `Authorization: Bearer <access_token>` + JSON body. User-Agent agy sends: `antigravity/cli/1.1.13 (aidev_client; os_type=linux; arch=amd64; cl=964361259; auth_method=consumer)`.
- Observed working methods: `loadCodeAssist` (body `{"metadata":{"ideType":"ANTIGRAVITY"}}` → returns tiers incl. `standard-tier` "Gemini Code Assist"), `fetchAdminControls`, `fetchUserInfo`, `retrieveUserQuotaSummary`, `fetchAvailableModels`, `listExperiments`, `setUserSettings` — **all with body `{"project":"practical-abbey-wkhfj"}`** ← the consumer project id, required on most calls.
- `POST /v1internal:generateContent` EXISTS and parses JSON but **returns 500** with every payload tried so far. Schema partially mapped via error-oracle probing (send a field; "Unknown name" = doesn't exist):
  - Top level: `model` (recognized), `request` (nested message), `request_id` (recognized).
  - Inside `request`: `contents` (recognized, type mismatch when given list — wants a message type), `model`, `generation_config`, `tools`, `system_instruction`, `session_id` (all recognized; 500 when used).
  - 500 persists across: contents as `[{role, parts:[{text}]}]` (Gemini shape), `model` top-level vs inside `request`, with/without `session_id`, with/without `request_id`. Likely missing: `project` field, or `contents` needs a different shape (maybe OpenAI-ish `[{role, content}]`), or a required field like `conversation_id`/`input` that wasn't probed. **Next session: probe `project` at top level, try `contents` as OpenAI message shape, and capture a real request via the MITM proxy (below) with a working `agy --print` run.**
- **`agy --print --model X "prompt"` works** in principle (needs a real TTY-adjacent run; note the CLI spawns a sidecar language server that can hold the pipe open — see Subagent Snags). The earlier hang was the expired token; after injecting a fresh token, `agy models` lists: `gemini-3.7-flash-{high,medium,low}`, `gemini-3.6-flash-{high,medium,low}`, `gemini-3.5-flash-{high,medium,low}`, `gemini-3.1-pro-{high,low}`, `claude-sonnet-4-6`, `claude-opus-4-6-thinking`, `gpt-oss-120b-medium`.

### Tools/artifacts left behind (all in /tmp, machine-local)
- `/tmp/agy_token.json` — freshly refreshed access token + client id/secret + refresh token (valid ~1h from write; refresh with the pair above).
- `/tmp/good_token.json` — refreshed gemini-CLI token (client `681255809395-...`, secret `[REDACTED_GOOGLE_CLIENT_SECRET]`; deprecated client, low value).
- `/tmp/antigravity-oauth-token.bak` — **backup of the original (expired) token file** before I injected a fresh access token into `~/.gemini/antigravity-cli/antigravity-oauth-token`. The live file now holds a fresh token (restore from backup if ever needed; the refresh token inside is the durable part).
- `/tmp/mitm/` — working HTTPS MITM proxy (`proxy2.py`, listener 127.0.0.1:8899, CA `ca.pem`), traffic log `/tmp/mitm/traffic2.log`. **This is the highest-value tool for the next session**: run it, then `SSL_CERT_FILE=/tmp/mitm/ca.pem HTTPS_PROXY=http://127.0.0.1:8899 agy --print --model gemini-3.6-flash-medium "hi"` and grep the log for the exact `generateContent` request body agy sends. Fix the proxy's `ssl` cert list to include any host it rejects (it currently covers *.googleapis.com / *.googleusercontent.com). NOTE: proxy rewrites nothing — it terminates TLS and forwards; agy must trust `ca.pem`.
- `/tmp/probe_fields.py`, `/tmp/probe_request.py`, `/tmp/test_generate*.py`, `/tmp/extract_protos.py` — schema-probing scripts.
- `/tmp/grpcurl` — downloaded; backend has **no reflection API** (confirmed), so grpcurl is a dead end.
- `~/Documents/SecondBrain/06-Agent-Sessions/2026-08-14-hermes-antigravity-gemini-oauth-wiring.md` — this file.

## Root Cause Log
| Symptom | Root Cause | Fix Applied | Confidence |
|---|---|---|---|
| `agy models` hung at start of session | Token in `antigravity-oauth-token` was expired (expiry 2026-07-22); CLI tried to re-auth (device flow) and stalled | Injected freshly-refreshed token into the file (backup kept) | High — `agy models` then listed models instantly |
| Public Gemini API rejects the token (401/403 scope error) | Token scope is `cloud-platform`+`cclog`, public API wants `generative-language` | None — documented as dead end | High |
| `v1internal:generateContent` → 500 | Exact request shape not yet matched (schema partially mapped) | None — see Key Findings for next-session probes | Medium |
| Official `gemini` CLI errors out | Google killed Gemini Code Assist for individuals; client tier-ineligible, told to migrate to Antigravity | None — deprecated path, ignore | High — verified by running it |

## Research Conducted
- Located auth: user pointed to `~/.gemini`; found CLI token, oauth_creds, account file.
- Extracted OAuth client ids/secrets from `agy` binary via `strings`; brute-forced the 2×2 client/secret combos against `oauth2.googleapis.com/token` until refresh succeeded.
- Tested public Gemini API native + OpenAI-compat endpoints with both tokens → scope errors.
- Probed `aicode.googleapis.com` REST paths (404s) → discovered real host `daily-cloudcode-pa.googleapis.com` from CLI log; confirmed `v1internal` REST-transcoded gRPC style.
- Built + ran HTTPS MITM proxy to capture agy's real traffic (worked; captured loadCodeAssist/fetch*/userinfo flows, project id `practical-abbey-wkhfj`). Generation call never captured — `--model` flag didn't register in the run (log showed `model=""`), so no generateContent request was ever sent.
- `grpcurl` reflection probe → not supported.
- Web: Gemini API OpenAI-compat docs (key-based, not OAuth-compatible for this scope); OAuth quickstart (needs own GCP project + consent screen — not applicable to a pure consumer subscription).

## Subagent Snags
- None dispatched.
- **`agy --print` sidecar quirk:** agy spawns a language-server sidecar that can hold stdout open; a foreground `timeout 90 agy --print ...` got killed by Hermes's 180s tool timeout instead of returning. Use `timeout` smaller than the tool timeout and/or background it, or capture via MITM proxy in a background process.
- **`--model` flag didn't take** in the one print run (`Print mode: starting (... model="")` in cli log) — verify correct flag syntax (`--model gemini-3.6-flash-medium` vs label "Gemini 3.6 Flash (Medium)") in the next session; settings.json uses the human label.
- **tcpdump needs sudo** (approved once this session; may need approval again). Reverse-DNS for Google IPs is useless — use MITM proxy instead.
- **`strings`-based binary archaeology** is the reliable extraction method; gzip-scanning the binary for embedded protos found nothing (0 blobs) — descriptors are embedded another way; don't retry the gzip scan.

## Decisions & Pivots
- **Pivot 1:** Public Gemini API → dropped (scope mismatch; not fixable without new OAuth consent that Antigravity's client likely can't grant). Target is the `daily-cloudcode-pa.googleapis.com/v1internal` backend directly.
- **Pivot 2:** gRPC reverse-engineering → dropped (no reflection, no embedded proto blobs). REST-transcoded JSON surface + error-oracle probing + MITM capture is the working approach.
- **Pivot 3 (next session):** Once `generateContent` request shape is confirmed, expose it to Hermes as a `custom_providers` entry in `~/.hermes/config.yaml` (OpenAI-compatible base_url pointing at a small local shim that does token-refresh + request translation), OR extend `hermes proxy` if a google upstream exists by then. Model names to register: the exact ids from `agy models` above.

## Next Steps (for the fresh session)
1. Restore/refresh token: read `/tmp/agy_token.json` or refresh again with the client/secret pair above; verify with `agy models` (fast, non-interactive).
2. **Capture the real `generateContent` request**: run MITM proxy in background, `SSL_CERT_FILE=/tmp/mitm/ca.pem HTTPS_PROXY=http://127.0.0.1:8899` + `agy --print` (fix the `--model` flag first; try `--model "gemini-3.6-flash-medium"` and the label form), grep `traffic2.log` for `generateContent` / `streamGenerateContent` request body.
3. Match that body exactly; confirm a 200 with model output via direct curl/python.
4. Then wire into Hermes: small local OpenAI-compatible shim (refresh token → translate → call `v1internal:generateContent`) registered as a custom provider in `~/.hermes/config.yaml`; register the model ids from `agy models`. Verify with a `hermes chat -q` call on each of: gemini-3.6-flash-medium, claude-sonnet-4-6, claude-opus-4-6-thinking.
5. Update this handoff with the final working schema + config so the wiring is reproducible.

## Reference Files / Media
- `~/.gemini/antigravity-cli/antigravity-oauth-token` (live, injected fresh token; backup `/tmp/antigravity-oauth-token.bak`)
- `~/.gemini/google_accounts.json`, `~/.gemini/oauth_creds.json` (deprecated gemini CLI)
- `~/.gemini/antigravity-cli/log/cli-*.log` — CLI logs (endpoint URLs, model labels)
- `/tmp/mitm/traffic2.log` — captured agy↔Google traffic
- `~/.hermes/config.yaml` — target config for the final wiring
