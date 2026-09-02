# Provider-Model-Audit

> **One-line Summary**: Historical provider audit from 2026-08-15. It measured catalog access and tiny canaries, but did **not** establish durable quality, billing, or rate-limit truth for every free-tagged model. Use [[Provider-Routing-Playbook]] for current dispatch policy.

**Audit date:** 2026-08-15 · **Tester:** Hermes agent (via real Hermes CLI lane, not raw API for Cloudflare-protected providers) · **Source log:** [[06-Agent-Sessions/2026-08-15-hermes-provider-audit]]

---

## TL;DR — historical numbers, not a dispatch policy

| Provider | Catalog models | Working | Auth | Cost tier |
|---|---|---|---|---|
| agentrouter.org | 3 | **3** | API key | Paid |
| DeepSeek (direct) | 2 | **2** | API key | Paid (cheap) |
| opencode-go | 26 | **11** verified | API key | Paid sub |
| NVIDIA NIM | 102 | **29** | API key | **Free** |
| Nous Portal | 368 | **5** free | OAuth | Free tier |
| Copilot (gh token) | 40 | **13** | gh auth token | Subscription |
| Vercel AI Gateway | 327 | **2** then observed | API key | Mixed: roughly 4–6 reported genuinely zero-cost modes; many other free-tagged/accessible modes consume the $5 monthly credit at provider rates; exact billing/rate limits unverified |
| Anthropic bridge | — | **0** | OAuth | Sub expired 08-15 |
| Gemini | — | **0** | API key | Key incoming |
| **Total** | **868** | **65** | | |

Pattern: **the free tiers are icebergs**, but this table mixed several different concepts. Catalog size, accessible IDs, zero-dollar billing, canary responsiveness, task quality, and sustainable rate limits are separate facts. NVIDIA's 29 accessible IDs are not 29 good workers; Victor reports only roughly five consistently useful ones, with MiniMax M3 and GLM 5.2 the strongest current candidates. Vercel's earlier 2-model result was incomplete and should not be treated as a full inventory or a billing classification.

---

## Why everything was failing before this audit (fixed)

Not provider failure, not the Claude bridge "infecting" other providers. A single **global `model.base_url: http://127.0.0.1:3456/anthropic`** in `~/.hermes/config.yaml` (set the day before to route the WebUI "Anthropic" lane through the local bridge) applied to the **default lane of every provider**. Every default-lane request — DeepSeek included — was sent to the bridge. Bridge up → Claude's sub-expired 500s leaked into every model; bridge stopped → `APIConnectionError` everywhere. Fix: `hermes config unset model.base_url`. Lesson: **base-URL overrides are global in Hermes config; scope them per-provider, never top-level.**

---

## Full inventory (working models in detail)

### agentrouter.org — 3/3 working (paid, API key)
Gateway to frontier models with exact, non-aliased model names.
| Model ID | Transport | Latency | Context | Notes |
|---|---|---|---|---|
| `gpt-5.6-sol` | chat completions | ~2.6s | 1.05M (per Nous catalog) | **Victor's starter pick** |
| `claude-opus-5` | anthropic messages | ~2.5s | 1M (per Nous catalog) | "intelligent but coo-coo"; expensive |
| `claude-opus-4-8` | anthropic messages | ~2.8s | 1M (per Nous catalog) | bottom of list — expensive |
All three verified end-to-end through Hermes CLI (exit 0). Agentrouter is the only lane where Anthropic models work after the bridge sub lapsed.

### DeepSeek direct — 2/2 working (paid, cheap)
| Model ID | Latency | Context | Notes |
|---|---|---|---|
| `deepseek-v4-flash` | ~0.7s | 1.05M | **Victor's starter pick** — default lane |
| `deepseek-v4-pro` | ~2.0s | 1.05M | stronger reasoning, still cheap |

The "headache-free" provider — and it still is: the pre-audit failures were the base_url redirect, not DeepSeek.

### opencode-go — 11 working of 26 (paid sub; higher models cost more)
Working:
`deepseek-v4-flash` · `deepseek-v4-pro` · `glm-5.2` (long-reasoning pick) · `glm-5.3` · `kimi-k3` · `kimi-k2.7-code` · `kimi-k2.6` · `kimi-k2.5` · `minimax-m3` (starter pick) · `minimax-m2.7` · `mimo-v2.5-pro` (execution pick — implements hole-free plans, doesn't plan them)

Broken / absent:
- `kimi-k2.7` → HTTP 401 "not supported" — the ID does not exist; the real model is **`kimi-k2.7-code`** (or `kimi-k3`)
- `grok-4.5` → HTTP 503 "Endpoint is unavailable" — listed in catalog but dead for this tier

Untested premium catalog: `gpt-5.6-luna`, `qwen3.7-max`, `qwen3.8-max`, `qwen3.7-plus`, `qwen3.6-plus`, `qwen3.5-plus`, `hy3`, `hy3-preview` (+ `mimo-v2-pro`, `mimo-v2-omni`, `mimo-v2.5`, `glm-5.1`, `glm-5`, `gpt-5.6-luna`).

### NVIDIA NIM — 29 accessible of 102 in the historical sweep (FREE tier, API key)
Most of the catalog 404s instantly on a free key ("not found for account") — 60 of 102. **Accessible does not mean good:** the free tier is contention-heavy, and Victor reports only roughly five models as consistently useful. Current preferred candidates are MiniMax M3 and GLM 5.2; Step 3.7 Flash is a candidate, not an automatic default. The accessible set included:
| Model ID | Latency | Notes |
|---|---|---|
| `minimaxai/minimax-m3` | 0.3s | **Victor's starter pick** |
| `stepfun-ai/step-3.7-flash` | 1.9s | |
| `z-ai/glm-5.2` | 1.4s | long-reasoning pick, free here |
| `deepseek-ai/deepseek-v4-flash-0731` | **68s** | works but very slow (free-tier contention) |
| `openai/gpt-oss-120b` | 33s | |
| `openai/gpt-oss-20b` | 0.2s | |
| `meta/llama-3.1-8b-instruct` | 0.2s | |
| `meta/llama-3.1-70b-instruct` | 52s | slow |
| `meta/llama-3.2-11b-vision-instruct` | 0.3s | vision |
| `meta/muse-glimmer-30b` | 0.3s | creative |
| `nvidia/llama-3.3-nemotron-super-49b-v1` / `-v1.5` | 0.4–0.5s | |
| `nvidia/nemotron-3-nano-30b-a3b` | 0.2s | |
| `nvidia/nemotron-3-nano-omni-30b-a3b-reasoning` | 0.4s | |
| `nvidia/nemotron-3-super-120b-a12b` | 0.3s | 1M ctx (per Nous catalog) |
| `nvidia/nemotron-3.5-lightning-30b-a3b` | 0.2s | |
| `nvidia/nemotron-mini-4b-instruct` | 0.2s | |
| `nvidia/nvidia-nemotron-nano-9b-v2` | 0.4s | |
| `nvidia/llama-3.1-nemotron-nano-vl-8b-v1` | 0.2s | vision |
| `poolside/laguna-xs-2.1` | 8.6s | |
| `thinkingmachines/inkling` | 1.4s | |

Special-purpose (respond, not general chat): `nvidia/riva-translate-4b-instruct-v1.1/-v2` (translation) · `nvidia/llama-3.1-nemoguard-8b-content-safety` / `-topic-control` · `nvidia/llama-3.1-nemotron-safety-guard-8b-v3` · `nvidia/nemotron-3.5-content-safety` (guardrails) · `nvidia/ising-calibration-1.5-31b` · `google/diffusiongemma-26b-a4b-it` (image model)

Slow-but-likely-works (timed out at 100s once): `google/gemma-4-31b-it`, `meta/llama-3.2-1b/-3b/-90b-vision`, `meta/llama-3.3-70b-instruct`, `meta/llama-guard-4-12b`, `mistralai/mistral-nemotron`, `nvidia/llama-3.1-nemotron-nano-8b-v1`
Server errors: `nvidia/nemotron-3-ultra-550b-a55b` (503), `nvidia/nemotron-nano-12b-v2-vl` (500), `nvidia/ai-synthetic-video-detector` (500) · 400 non-text: `nvidia/nemoretriever-parse`, `nvidia/nemotron-parse`

### Nous Portal — 5 free models working of 368 (OAuth, free tier)
Model IDs require the **vendor prefix** (`stepfun/...`, `upstage/...`) — bare names 404 ("not found in our configuration or OpenRouter catalog").
| Model ID | Context | Price | Notes |
|---|---|---|---|
| `stepfun/step-3.7-flash:free` | **262,144** | $0 | the "manager/assistant" model — 262k, not 1M |
| `upstage/solar-pro4:free` | **524,288** | $0 | the "solar" model |
| `meituan/longcat-2.0:free` | **1,048,576** | $0 | sleeper: 1M context for free |
| `tencent/hy3:free` | 262,144 | $0 | |
| `poolside/laguna-s-2.1:free` | 262,144 | $0 | |
`x-ai/grok-4.5` (500k ctx) exists but 404s "requires available credits" — free tier can't run it.

### Copilot — 13 working of 40 (gh auth token)
Working: `gpt-4o` · `gpt-4o-2024-05-13` · `gpt-4o-2024-08-06` · `gpt-4o-2024-11-20` · `gpt-4o-mini` · `gpt-4o-mini-2024-07-18` · `gpt-4.1` · `gpt-4.1-2025-04-14` · `gpt-4-o-preview` · `gpt-3.5-turbo-0613` · `exec-agent-a` · `exec-agent-b` · `exec-agent-c`

Locked (HTTP 400 "model not supported"): all `claude-*` (incl. claude-opus-5, claude-sonnet-5), all `gemini-*`, all `gpt-5*` (5-mini, 5.3-codex, 5.4, 5.4-mini, 5.5, 5.6-luna/sol/terra), `kimi-k3`, `mai-code-1.1-flash`, `gpt-4`, `gpt-3.5-turbo`. The gh token unlocks only the legacy/standard set — a proper Copilot device-flow token (`COPILOT_GITHUB_TOKEN`) may unlock more (untested).

### Vercel AI Gateway — earlier probe incomplete (mixed free/credit tier)
The 2026-08-15 probe confirmed `alibaba/qwen3.5-flash` and `alibaba/qwen3.7-flash` returning 200, but that is **not** a complete inventory. Victor reports roughly 20-something free-tagged modes, with about 4–6 genuinely zero-cost and the rest consuming the monthly $5 credit at provider rates. Exact IDs, billing class, request/token limits, and reset behavior remain unverified. Do not route automatically until model-by-model probing records both outcome and credit class.

### Anthropic bridge — 0 (dead until renewal)
Sub expired 2026-08-15; bridge stopped. Renew at claude.ai → restart `claude-bridge.service` → re-scope base_url to the Anthropic lane only. Lapse signature: `500 "error result: success"` (403 `oauth_org_not_allowed`).

### Gemini — credential removed; key incoming
The old pool entry was a dead fingerprint (never a real key). New key arrives via `hermes auth add gemini` (masked prompt). End goal: agy (antigravity) Pro OAuth lane for Gemini 3.7/3.6/3.5/3.1 — not yet built.

---

## Speed & rate-limit behavior (measured)

- **NVIDIA free tier**: popular models suffer (52–100s under contention: ds-v4-flash-0731, llama-3.1-70b, gpt-oss-120b); niche models are instant (0.2–0.5s). Parallel bursts get throttled server-side — sequential is more reliable.
- **Vercel AI Gateway**: frequent 429s and a "no providers available" 403 state — the pool self-exhausts.
- **opencode-go / agentrouter / DeepSeek / Nous / Copilot**: no rate-limit issues observed; 0.2–3s typical, kimi/grok-tier slower.

Victor's rule: **rate limits don't matter for inclusion — if a model works, it stays.**

---

## Victor's model preferences (opinions — removable before posting)

- **Starters**: DeepSeek V4 Flash · MiniMax M3 · GPT 5.6 Sol
- **Long reasoning**: GLM 5.2
- **Execution**: mimo-v2.5-pro — "implements a plan that has no holes, but not *a* plan"
- **Long context**: solar-pro4:free (524k) / longcat-2.0:free (1M)
- **Bottom of list**: claude-opus-5 & claude-opus-4-8 — expensive (>$0.75/M input rule), and "Opus 5 is coo-coo in the head even though it's intelligent"
- **Never burn premium quota** (Opus, GPT-5.6-sol tier, K2.7, V4-Pro) when a cheaper model delivers the same work.

---

## Method

- Every model tested with the same tiny completion ("Reply with exactly: OK", max_tokens 8) through the **real Hermes client** (`hermes chat -q ... -m <model> --provider <prov>`), not raw HTTP, for Cloudflare-protected providers (opencode-go, nous — raw urllib gets error 1010; curl with a browser UA works for catalogs).
- Full-catalog sweeps: NVIDIA (all 102), Copilot (all 40). Concurrency 4/3, per-request timeout 100s, results classified OK / 404 / 401 / 429 / 400 / 5xx / timeout.
- Context windows & pricing taken from the live Nous catalog (368 models, fetched 2026-08-15); other providers' ctx marked "per Nous catalog" where the same model is listed there, otherwise unknown.
- Raw results: `/tmp/nvidia_sweep.json`, `/tmp/copilot_sweep.json`, `/tmp/nous_models.json`, `/tmp/og_models.json` (session artifacts, may be cleaned).

---
**Tags:** #audit #infrastructure #hermes #providers #models
