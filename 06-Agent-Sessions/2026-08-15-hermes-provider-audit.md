> **One-line Summary**: Full provider audit of Victor's Hermes (2026-08-15). The "everything failing" cascade was NOT bridge contamination — a global `model.base_url: http://127.0.0.1:3456/anthropic` override (set 08-14 for the WebUI Anthropic lane) was redirecting EVERY default-lane request from ANY provider to the bridge; unset and verified fixed. All providers then live-tested through the real Hermes lane: agentrouter.org (gpt-5.6-sol / claude-opus-5 / claude-opus-4-8 — all working), DeepSeek direct, opencode-go (8 OK), NVIDIA NIM (full 102-model catalog sweep), Nous Portal free tier (5 free models), Vercel AI Gateway (2 usable), Copilot (13 OK), Anthropic (dead — sub expired). Dead Gemini credential removed. Full working-model matrix below.

**Date:** 2026-08-15
**Agent:** Hermes (deepseek-v4-flash / opencode-go session)
**Project:** none (infrastructure — provider wiring in `~/.hermes/config.yaml`, `~/.hermes/auth.json`, `~/.hermes/.env`)

## Goal
1. Diagnose why every provider/model in Hermes was erroring — verify the "Claude bridge is contaminating other providers" hypothesis with evidence, don't take it on faith.
2. Live-test every connected provider; produce a definitive working-model matrix (Victor's rule: if a model works, rate limits don't matter).
3. Prune the provider list to models that actually work; re-add on future subscriptions.
4. Test the NVIDIA NIM catalog beyond the known handful (full sweep), and test Copilot (40-model catalog).
5. Verify the agentrouter.org connection (gpt-5.6-sol, claude-opus-5, claude-opus-4-8 exact names).
6. Prepare for the Gemini API key (secure input) and record a durable working-model reference.

## User Prompts (Extracted, Not Compressed)
- **Prompt (detail-hawk brief):** "Test all the providers... see which models are available or which providers work." Cost threshold: >$0.75/M input = expensive (opencode-go paid tiers). NVIDIA: test GLM 5.2, DeepSeek V4 flash, MiniMax M3, Kimi K2.6, Step 3.7 flash + other pro models; slow models expected. DeepSeek direct was the only headache-free provider but now "connection error" too. Gemini end-goal: connect via the agy (antigravity) Pro account like Claude was connected. Vercel AI Gateway: frequent rate limits, K2.6 not on free tier. Nous Portal: ~5-6 free models incl. a solar model and a Step 3.7 "manager" model (~260k vs 1M ctx unsure). "As long as a model works, i won't care about rate limits."  **Overrode/Added:** Find the real cause of the cross-provider failures; prune the list to working models only.
- **Prompt (follow-up):** agentrouter.org was configured for gpt-5.6-sol / claude-opus-5 / claude-opus-4-8 "exact model names" — was it ever connected? GPT-5.6-sol is reliable in OpenCode. Gemini API key coming — use the secure secret-input field (masked, not visible to chat). AI Gateway: keep qwen. Nous: keep all free working models incl. stepfun/step-3.7-flash:free. "U didn't test all NVIDIA models? test the rest how u tested AI Gateway and Nous Portal." Test Copilot models, keep the ones that work. Store the working-model memory; offer a model-preference multiple-choice (no wrong answers).  **Overrode/Added:** Full catalog sweeps for NVIDIA and Copilot; durable record of the matrix.

## Root Cause Log
| Symptom | Root Cause | Fix Applied | Confidence |
|---|---|---|---|
| Every default-lane model → 500 "Claude Code returned an error result" (bridge up, 06:51/07:29) then "APIConnectionError: Connection error." (bridge stopped 07:37, 09:38/10:26) — including DeepSeek, the previously reliable one | Global `model.base_url: http://127.0.0.1:3456/anthropic` (set 2026-08-14 for the WebUI "Anthropic" lane) applies to the DEFAULT lane for ANY provider. Request dumps prove deepseek-v4-flash and z-ai/glm-5.2 requests were sent to the bridge; each provider's own base_url was never consulted. Not "contamination" — a config override. | `hermes config unset model.base_url` | Confirmed — `hermes chat -q` on the default deepseek-v4-flash lane returned OK in ~5s; exit 0. Explicit provider picks (this session on opencode-go) bypass the override, which is why the WebUI session still worked |
| Gemini credential "couldn't be removed" / made-up key accepted | `hermes auth remove` requires a provider-target argument; bare `hermes auth remove gemini` fails silently-ish. The pool entry was a dead fingerprint (request_count 0, no env key ever present) — the made-up key never became a credential | `hermes auth remove gemini GOOGLE_API_KEY` — removed + env re-seed suppressed | Confirmed — `hermes auth list`: gemini GONE |
| opencode-go `kimi-k2.7` → HTTP 401 "Model kimi-k2.7 is not supported" | Wrong model ID — catalog has `kimi-k2.7-code` (and `kimi-k3`). Victor's doubt about K2.7's availability was well-founded | Use `kimi-k2.7-code` / `kimi-k3` | Confirmed via live catalog + CLI test |
| opencode-go `grok-4.5` → HTTP 503 "Endpoint is unavailable" | Listed in catalog but the endpoint is down/unavailable for his tier right now | Blocked — do not include | Confirmed (CLI, exact error text) |
| Nous Portal models 404 "not found in OpenRouter catalog" / earlier "Nous not wired" | Model IDs on Nous require the vendor prefix (`stepfun/step-3.7-flash:free`, `upstage/solar-pro4:free`); bare `step-3.7-flash` 404s. OAuth was healthy all along | Use prefixed IDs | Confirmed — all 5 free models return OK via CLI |
| urllib probes vs opencode-go / nous → HTTP 403 Cloudflare error 1010 | Python client is Cloudflare-banned; Hermes' own client passes | Test through `hermes chat` CLI, or curl with browser UA for catalogs | Confirmed — catalogs fetched via curl+UA; CLI tests green |
| NVIDIA `moonshotai/kimi-k2.6` → 404 "Not found for account" | NVIDIA key has no access to that function | Blocked | Confirmed |
| agentrouter "never connected" / earlier 503 | The config providers existed since 08-04 (`agentrouter-claude`, `agentrouter-gpt` with `key_env: AGENTROUTER_API_KEY`); earlier probe likely hit a transient/wrong path | No change needed — verified live: gpt-5.6-sol (chat), claude-opus-5 + claude-opus-4-8 (anthropic messages) all 200 | Confirmed — direct API + through Hermes CLI (exit 0) |
| Copilot frontier models (claude-*, gemini-*, gpt-5*, kimi-k3) → HTTP 400 "model not supported" | gh-auth token grants only legacy/standard copilot chat models, not the premium frontier set | Keep the 13 working models | Confirmed — 40-model catalog tested |

## Working Model Matrix (live-tested 2026-08-15)

### agentrouter.org — ALL 3 WORKING (verified through Hermes CLI)
| Model | Transport | Result |
|---|---|---|
| `gpt-5.6-sol` | chat completions (`agentrouter-gpt`) | OK ~2.6s |
| `claude-opus-5` | anthropic messages (`agentrouter-claude`) | OK ~2.5s |
| `claude-opus-4-8` | anthropic messages | OK ~2.8s |

### DeepSeek direct — 2/2
`deepseek-v4-flash` (0.7s), `deepseek-v4-pro` (2.0s)

### opencode-go — 11 OK / 2 broken
OK: `deepseek-v4-flash`, `deepseek-v4-pro`, `glm-5.2`, `glm-5.3`, `kimi-k3`, `kimi-k2.7-code`, `kimi-k2.6`, `kimi-k2.5`, `minimax-m3`, `minimax-m2.7`, `mimo-v2.5-pro` · Broken: `kimi-k2.7` (401 — wrong ID), `grok-4.5` (503). Catalog: 26 models (incl. `gpt-5.6-luna`, qwen3.7/3.8-max, hy3 — premium/untested).

### NVIDIA NIM — full 102-model sweep (2026-08-15, via key + `/chat/completions`, 4 workers)
**29 OK / 60 404 (not on account) / 8 timeout (100s) / 2×400 non-text / 2×500 / 1×503**

General-purpose chat models (OK):
`minimaxai/minimax-m3` (0.3s) · `stepfun-ai/step-3.7-flash` (1.9s) · `z-ai/glm-5.2` (1.4s) · `deepseek-ai/deepseek-v4-flash-0731` (68s — slow, free-tier contention) · `openai/gpt-oss-120b` (33s) · `openai/gpt-oss-20b` (0.2s) · `meta/llama-3.1-8b-instruct` (0.2s) · `meta/llama-3.1-70b-instruct` (52s) · `meta/llama-3.2-11b-vision-instruct` (0.3s) · `meta/muse-glimmer-30b` (0.3s) · `nvidia/llama-3.3-nemotron-super-49b-v1` / `-v1.5` · `nvidia/nemotron-3-nano-30b-a3b` · `nvidia/nemotron-3-nano-omni-30b-a3b-reasoning` · `nvidia/nemotron-3-super-120b-a12b` · `nvidia/nemotron-3.5-lightning-30b-a3b` · `nvidia/nemotron-mini-4b-instruct` · `nvidia/nvidia-nemotron-nano-9b-v2` · `nvidia/llama-3.1-nemotron-nano-vl-8b-v1` (vision) · `poolside/laguna-xs-2.1` (8.6s) · `thinkingmachines/inkling` (1.4s)

Special-purpose OK (respond, not general chat): `nvidia/riva-translate-4b-instruct-v1.1/-v2` (translation) · `nvidia/llama-3.1-nemoguard-8b-content-safety` / `-topic-control` / `nvidia/llama-3.1-nemotron-safety-guard-8b-v3` / `nvidia/nemotron-3.5-content-safety` (guardrails) · `nvidia/ising-calibration-1.5-31b` · `google/diffusiongemma-26b-a4b-it` (image model, empty text)

Timeout at 100s (likely work, too slow): `google/gemma-4-31b-it`, `meta/llama-3.2-1b/-3b/-90b-vision`, `meta/llama-3.3-70b-instruct`, `meta/llama-guard-4-12b`, `mistralai/mistral-nemotron`, `nvidia/llama-3.1-nemotron-nano-8b-v1`

Server errors: `nvidia/nemotron-3-ultra-550b-a55b` (503), `nvidia/nemotron-nano-12b-v2-vl` (500), `nvidia/ai-synthetic-video-detector` (500) · 400 non-text: `nvidia/nemoretriever-parse`, `nvidia/nemotron-parse` · 404 (not on this key): everything else, incl. `moonshotai/kimi-k2.6`

### Nous Portal (OAuth) — 5 free models working
`stepfun/step-3.7-flash:free` (262,144 ctx), `upstage/solar-pro4:free` (524,288 ctx), `tencent/hy3:free`, `meituan/longcat-2.0:free`, `poolside/laguna-s-2.1:free` · `x-ai/grok-4.5` 404 (needs credits). Catalog 368 models.

### Copilot (gh auth token) — 13 OK
`gpt-4o`, `gpt-4o-2024-05-13/-08-06/-11-20`, `gpt-4o-mini`, `gpt-4o-mini-2024-07-18`, `gpt-4.1`, `gpt-4.1-2025-04-14`, `gpt-4-o-preview`, `gpt-3.5-turbo-0613`, `exec-agent-a/b/c` · 400 (not supported on this token): all claude-*, gemini-*, gpt-5*, gpt-5.3/5.4/5.5/5.6-*, gpt-5-mini, kimi-k3, mai-code-1.1-flash, gpt-3.5-turbo, gpt-4.

### Vercel AI Gateway — 2 usable
`alibaba/qwen3.5-flash`, `alibaba/qwen3.7-flash` · everything else 403 (free-tier locked) / 429. Pool status: exhausted.

### Anthropic / bridge — DEAD (until renewal)
Sub expired 2026-08-15 07:37 (bridge stopped). Renew at claude.ai → restart `claude-bridge.service` → re-set `model.base_url` scoped to the Anthropic lane only.

### Gemini — credential removed; key incoming
No env key ever existed (dead fingerprint). New key arrives via `hermes auth add gemini` (masked prompt). Goal after: agy (antigravity) Pro OAuth lane for Gemini 3.7/3.6/3.5/3.1 — not yet built.

## Key Decisions
- **Root cause = global `model.base_url`, not bridge magic** — brief's contamination hypothesis confirmed in mechanism, refuted in detail. The dump files (`~/.hermes/sessions/request_dump_*.json`) were the evidence.
- **`hermes config unset` only** — never hand-edit config.yaml (hard invariant).
- **Probe via the real Hermes CLI** for Cloudflare-protected providers (opencode-go, nous); urllib is error-1010 banned.
- **Fetch live catalogs with curl + browser UA** to get exact model IDs.
- **Gemini: removal, not salvage** — request_count 0, no env key; the "couldn't remove" was a missing CLI arg.
- **Full sweep methodology**: tiny completion ("Reply with exactly: OK", max_tokens 8) against every catalog model; classify OK/404/401/429/5xx/timeout; concurrency 4 (NVIDIA) / 3 (Copilot).
- **Secret input field is CLI/desktop/TUI-only** — the WebUI gateway does not register the secret-capture callback (`tools/skills_tool.py` → `_secret_capture_callback`; registered only in `cli.py`). Masked prompt = `hermes auth add <provider>` ("API key value (otherwise prompted securely)").

## Verification
- `hermes chat -q "Reply with exactly: OK"` (default deepseek-v4-flash/deepseek) → `OK`, exit 0, ~5s — the exact lane that was throwing "Connection error." 3 hours earlier.
- agentrouter: direct API 200 for all 3 models + `hermes chat -q ... -m gpt-5.6-sol --provider agentrouter-gpt` → OK, exit 0; `-m claude-opus-5 --provider agentrouter-claude` → OK, exit 0.
- NVIDIA sweep: 29 OK / 60 404 / 8 timeout / 2×400 / 2×500 / 1×503 of 102 (JSON at /tmp/nvidia_sweep.json); Copilot sweep: 13/34 chat candidates OK (JSON at /tmp/copilot_sweep.json).

## Follow-ups
- Victor runs `hermes auth add gemini` in a terminal (masked) → then verify a Gemini model through Hermes.
- WebUI default provider is still `anthropic` (dead lane) — switch to `deepseek` or leave for the renewal.
- Copilot device-flow token (`COPILOT_GITHUB_TOKEN`) may unlock more models than the gh token — optional exploration.
- Claude renewal ~monthly 15th: renew → restart bridge → re-scope base_url properly (per-lane, not global).
- Re-verify opencode-go premium tier (gpt-5.6-luna etc.) if/when Victor subscribes.

---
