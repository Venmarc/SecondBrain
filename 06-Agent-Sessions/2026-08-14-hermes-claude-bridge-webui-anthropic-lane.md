> **One-line Summary**: Made the Claude bridge durable (systemd user unit `claude-bridge.service`) and killed a NEW fourth root cause: the WebUI model switcher's built-in "Anthropic" provider sent `CLAUDE_CODE_OAUTH_TOKEN` straight to api.anthropic.com → "400 extra usage". Fixed by pointing `model.base_url` at the bridge's new `/anthropic/v1/messages` alias route (the runtime only honors base-URL overrides that look like an Anthropic-compatible proxy).

**Date:** 2026-08-14
**Agent:** Hermes
**Project:** none (infrastructure — bridge at `~/claude-proxy/`, provider wiring in `~/.hermes/config.yaml`)

## Goal
1. Make the working Claude↔Hermes bridge survive reboots and crashes (Victor's power grid) — systemd.
2. Fix the "400 Third-party apps now draw from your extra usage" error Victor hit in the **WebUI model switcher** when selecting any "Anthropic" model (claude-sonnet-5, claude-sonnet-4-6) — while the CLI bridge lane worked fine.

## Standing Directives Given This Session
- Make the bridge last, and make the fix unforgettable (skill + memory + vault).
- Commit vault changes only with Victor's explicit go-ahead (given twice: bridge docs commit, then this log).

## User Prompts (Extracted, Not Compressed)
- **Prompt:** "Here's your entry point /tmp/claude-bridge-handoff-2026-08-13.md. Make the Claude Hermes bridge last, and make sure that this fix that was applied for linking my Claude account to Hermes without api keys, just auth, is never forgotten"
  **Overrode/Added:** Priority: durability (systemd) + knowledge persistence (skill/memory/vault).
- **Prompt:** "I just tested Claude and it gave me the same 400 third part error blah blah blah" (+ follow-ups)
  **Overrode/Added:** Reported a 400 — but the bridge journal showed ZERO requests had reached the bridge. His analogy: "the request died at the entrance, before the gate." Correct — he used the WebUI switcher's built-in `anthropic` provider, a different lane entirely.
- **Prompt:** "Persist your fix to the vault, so that this scenario is known and can be avoided in the future. Claude is working now"
  **Overrode/Added:** Confirmed the fix works in the WebUI; write this session log + ANTI_PATTERNS row + CHANGELOG entry.

## Reference Files / Media
- `~/claude-proxy/HANDOFF.md` — operational reference (updated this session: systemd + /anthropic route + model.base_url).
- `/home/venmarc/.hermes/webui/attachments/ff960c3361a2/Screenshot_*.heic` — Victor's model-switcher screenshots (converted via pillow-heif; showed `@anthropic:claude-sonnet-4-6` selected under "Anthropic (11)").
- Hermes source: `hermes_cli/runtime_provider.py` (`_resolve_runtime_from_pool_entry` anthropic branch ~L447, `_anthropic_base_url_override_ok` ~L222, `_get_model_config` L282), `hermes_cli/auth.py` (ProviderConfig anthropic, `ANTHROPIC_BASE_URL` env var), `providers/__init__.py` (`_discover_providers`, last-writer-wins), `hermes_cli/config.py` `load_config` (mtime-keyed cache).

## Root Cause Log
| Symptom | Root Cause | Fix Applied | Confidence |
|---|---|---|---|
| Bridge died on reboot (was a manual background process) | No service manager; process tied to the spawning shell | systemd user unit `claude-bridge.service` (enabled, `Restart=always`; linger already on → starts at boot). Old manual instance killed; systemd owns port 3456 | Confirmed (healthz 200 under systemd; BRIDGE-OK through it) |
| WebUI model switcher "Anthropic" models (sonnet-5, sonnet-4-6) → `400 Third-party apps now draw from your extra usage` | The built-in `anthropic` provider (what the switcher lists as `@anthropic:<model>`) sends `CLAUDE_CODE_OAUTH_TOKEN` directly to `https://api.anthropic.com` — non-first-party OAuth API use, which Anthropic 2026 rejects. The bridge was never in this path | Route the whole built-in lane through the bridge: (1) `bridge.py` registers `POST /anthropic/v1/messages` alias; (2) `hermes config set model.base_url http://127.0.0.1:3456/anthropic`. The `/anthropic` suffix is MANDATORY — `_anthropic_base_url_override_ok()` only honors base URLs that "plausibly speak the Anthropic Messages protocol" | Confirmed (both sonnet-5 and sonnet-4-6 → BRIDGE-OK; bridge journal shows `POST /anthropic/v1/messages 200`) |

## Failed Attempts (do NOT repeat)
- **User plugin override of the `anthropic` provider profile** (`~/.hermes/plugins/model-providers/anthropic/__init__.py` with `base_url=http://127.0.0.1:3456`, `fetch_models` neutralized). Registered fine (last-writer-wins, verified `base_url` in registry) but the runtime **ignores the profile's base_url for native anthropic** — the pool-credential path (`_resolve_runtime_from_pool_entry`) never consults it. Kept the plugin anyway: it neutralizes `fetch_models` (provider page stops pinging api.anthropic.com) and pins the aux model to sonnet-5. Needs a WebUI process restart to load.
- **`ANTHROPIC_BASE_URL=http://127.0.0.1:3456` env var**. Also ignored on the pool path (the anthropic branch in `_resolve_runtime_from_pool_entry` reads only config `model.base_url` + the pool entry's URL; the env-var path in the OTHER resolver ~L1559 applies to api_key providers without a pool entry).
- A bare `http://127.0.0.1:3456` as `model.base_url` would ALSO be rejected — the guard requires an Anthropic-looking URL (`/anthropic` suffix). The bridge alias route exists specifically to satisfy it.

## Research Conducted
- Read Hermes source: provider catalog/registry, plugin discovery (bundled → user → legacy, last-writer-wins), runtime provider resolution (both pool-entry and api-key paths), `_anthropic_base_url_override_ok` guard, `load_config` mtime caching, `CLAUDE_CODE_OAUTH_TOKEN` implicit-env handling (`auth.py` `_IMPLICIT_ENV_VARS`).
- Empirical bisection via CLI: `hermes --provider anthropic -m claude-sonnet-5 -z "..."` (baseline 400) → + plugin override (still 400) → + `ANTHROPIC_BASE_URL` (still 400) → + `model.base_url` with `/anthropic` route (**BRIDGE-OK**).

## Subagent Snags
- None — direct terminal + source reading + CLI bisection; no delegation used.

## Decisions & Pivots
- **Config over plugin override**: the framework-blessed redirect for native anthropic is `model.base_url` (honored + guarded), not profile/env overrides. Follow the guard's convention (`/anthropic` suffix) instead of fighting it.
- **`hermes config set` only**: never hand-edit `~/.hermes/config.yaml` (hard invariant); the WebUI picks up the change on the next request because `load_config` caches on file mtime, not per-process.
- **Keep the plugin override as defense-in-depth**: neutralized `fetch_models` prevents direct Anthropic calls from the provider/accounts page; harmless, documented, needs webui restart.
- **Stateless per-request cost unchanged**: every Anthropic-model request (including aux/title calls) is now a CLI spawn (~$0.01–0.12/req, ~19.5k cache tokens).

## Steps Taken / Actions
1. Read the handoff; verified bridge state (healthz 200, manual process).
2. Created `~/.config/systemd/user/claude-bridge.service` (mirrors hermes-gateway unit style; `Restart=always`, enabled; linger already on). Killed the old manual instance; systemd took over port 3456. Verified `BRIDGE-OK` through the systemd-managed bridge.
3. Diagnosed Victor's 400: bridge journal showed zero requests (only my own tests) → the request never reached the bridge.
4. Read config: `model.provider: anthropic` (built-in) + `providers:` section (agentrouter-claude, agentrouter-gpt, claude-bridge). Screenshots confirmed switcher = built-in `anthropic` (11 models).
5. Tried and disproved: user plugin override, then `ANTHROPIC_BASE_URL` (both still 400, still direct to api.anthropic.com).
6. Read `runtime_provider.py` → found the guard + the config mechanism. Patched `bridge.py` with the `/anthropic/v1/messages` alias; `hermes config set model.base_url http://127.0.0.1:3456/anthropic`; restarted the bridge service.
7. Verified: `provider anthropic` + `claude-sonnet-5` → BRIDGE-OK; + `claude-sonnet-4-6` → BRIDGE-OK. Both `POST /anthropic/v1/messages 200` in the journal.
8. Persisted: skill `claude-agent-sdk-bridge` (root cause 4 + fix), memory, `HANDOFF.md`, this log, ANTI_PATTERNS row, CHANGELOG.

## Verification
- `hermes --provider anthropic -m claude-sonnet-5 -z "Say exactly: BRIDGE-OK, and nothing else."` → `BRIDGE-OK` (exit 0, ~7s)
- `hermes --provider anthropic -m claude-sonnet-4-6 -z "Say exactly: BRIDGE-OK, and nothing else."` → `BRIDGE-OK` (the exact model Victor had clicked)
- `systemctl --user is-active claude-bridge.service` → `active`; `/healthz` → 200; unit enabled for boot.
- Victor confirmed: "Claude is working now" (WebUI).

## Follow-ups
- Restart `hermes-webui.service` at leisure so the provider-plugin override loads (cosmetic; the config fix already works without it).
- Models outside the Pro plan (Opus-tier) will fail with a proper plan error from the CLI — expected, not the 400.
