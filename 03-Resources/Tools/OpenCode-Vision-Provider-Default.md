> **One-line Summary**: Recipe to make any model already available inside OpenCode (e.g. a free OpenCode Zen model) the **default** backend of the vision-tool provider: add an OpenAI-compatible caller to `vision_proxy.py`, insert it at position 0 of the strategy list (image + video), reuse opencode's existing auth key, and keep every other provider as a fallback. Applied 2026-08-21 with MiMo-V2.5 Free.

# OpenCode Vision Provider — Set a Default Model

Reusable method for making a model that opencode already serves (typically a free OpenCode Zen model) the first choice for image/video analysis in the vision-tool provider, instead of the default Gemini backend.

## When to use

- A model you can pick in opencode's model picker is **not** the first backend the vision tool calls.
- You want a free/zero-credit model (e.g. an OpenCode Zen free model) used first, with paid/other providers only as fallback.
- You want to add or swap the primary vision backend without touching the skill's agent prompt.

## The recipe

### 1. Confirm the model exists on the target gateway

OpenCode Zen publishes its catalog at `https://opencode.ai/zen/v1/models` (no auth needed to read). Model ids there are the short form (`mimo-v2.5-free`); in an opencode config the id is `opencode/<model-id>`. Zen free models are OpenAI-compatible chat completions at `https://opencode.ai/zen/v1/chat/completions`.

### 2. Reuse opencode's key — no new API key

The vision tool reads its keys from env vars and `~/vision-for-opencode/config.json`. Instead of copying a secret, fall back to the key opencode already holds in `~/.local/share/opencode/auth.json` (check `opencode-go`, then `opencode`, then `zen`). Precedence in `load_config()`: env var → config.json → auth.json fallback. This survives key rotation and works on every machine the vault syncs to.

### 3. Add the caller functions

In `~/vision-for-opencode/vision_proxy.py` add two callers (single image + multi-frame/video), OpenAI-compatible `POST {endpoint}/chat/completions` with `messages` containing `text` + `image_url` data-URI parts. For Zen, model = `mimo-v2.5-free`, `max_tokens` generous (4096).

### 4. Wire the new provider into the plumbing

Register it in every place below (a missed one silently drops the backend from the chain):

1. `ALL_PROVIDER_KEYS` and the `keys` dict in `load_config()` (+ the auth.json fallback).
2. `_has_key()` gate — controls whether a strategy survives the "missing key" filter.
3. `_print_available_keys()` labels.
4. `_provider_label_from_strategy()` label.
5. `get_providers_for_model()` — add the `zen`/`opencode` prefix route so `--model zen/<id>` works.
6. `_filter_providers()` `PROVIDER_KEY_MAP` (`"zen": "ZEN_API_KEY"`).
7. `_insert_model_strategies()` dispatch (`"zen": (call_opencode_zen, call_opencode_zen_multi)`).
8. `_list_models()` display.

### 5. Make it the default = position 0 in `_build_strategies()`

The chain logic: the **first** strategy is tried sequentially first (12s timeout); on success it wins and the rest are cancelled. Everything after runs in parallel as fallback, first success wins. So "default model" literally means **the first tuple in both the `img` and `vid` lists** of `_build_strategies()`. Gemini and the rest stay below it, untouched.

### 6. Verify

- `python ~/vision-for-opencode/vision_proxy.py --models` → new backend shows `AVAILABLE`.
- `python ~/vision-for-opencode/vision_proxy.py /path/to/image.png "Describe this"` → stderr shows `★ <Backend>: OK` tried first, then fallbacks only if it failed.
- The MCP server (`vision_mcp_server.py`) calls the same `analyze()` path, so no MCP-side change is needed.

## Gotchas learned (2026-08-21, MiMo-V2.5 Free)

- **Cloudflare blocks urllib's default User-Agent** → `HTTP 403 error code 1010`. Always send a Chrome-like `User-Agent` header on the Zen request.
- **Reasoning models return `content: null`.** MiMo puts its answer in `message.reasoning` (and `reasoning_details`) first. Extract `content` → fall back to `reasoning`.
- **Free-tier rate limits are hard.** Zen free models return `429 FreeUsageLimitError` under real use; paid Go models need credits (`401` when balance is $0). The parallel-fallback design is what makes this tolerable.
- **24h backend cooldown.** A 429 marks the backend `limited` in `~/vision-tool/backend_memory.json` for 24h, so it is skipped entirely (fallback used). Delete that file to force an immediate retry of the new primary.
- The agent prompt/SKILL.md does **not** need to name the model; the tool chain decides. Update `SKILL.md` only to document which backend is primary.

## Files touched (this install)

- `~/vision-for-opencode/vision_proxy.py` — caller, plumbing, strategy position 0 (img + vid), `_list_models`, key fallback.
- `~/vision-for-opencode/SKILL.md` — backend-chain table + "first backend wins" note.
- `~/vision-for-opencode/config.json.example` — added `ZEN_API_KEY` row.
- Config of the MCP server: unchanged (it calls `vp.analyze`).

## Related

- [[02-Areas/Agent-Ops/Agent-Ops|Agent Ops]] — how vision-tool-style providers are used in this agent stack.
- [[03-Resources/Vault-LLM-Wiki-Patterns|Vault LLM Wiki Patterns]] — vault conventions for agent-relevant notes.

## Tags

#opencode #vision-tool #recipe #providers #zen #infrastructure #agent-ops