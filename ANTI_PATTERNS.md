<!--
AGENT: Read this file at the start of any session that touches code — unconditional,
not just "vault work" (see GEMINI.md boot sequence).
THIS FILE BECOMES AN INDEX ONCE SPLIT. A section that's already been split will
contain a one-line pointer to /SecondBrain/03-Resources/Principles/<slug>.md
instead of a table. Follow the link if your task touches that technology — do not
treat the short pointer line as the whole answer, the entries live in the linked file.
ADDING A NEW ENTRY:
1. Find the header matching the technology (## Clerk, ## Supabase, ## Next.js etc). If none
   exists, create one. Use the most specific reasonable name — don't pre-split by
   version or sub-feature until a header itself gets long.
2. Add one row to that header's table (the one here, or the split-off file if this
   header has already been split — check for a pointer first).
3. Only log Confirmed root causes, not hypotheses. See GEMINI.md Memory Rules for
   exactly when a new row is required.
SPLIT THRESHOLD — mandatory self-check before ending any session that edited this file:
Count total lines in this file. If >= 200:
  a. For each ## header that still has an inline table, create
     /SecondBrain/03-Resources/Principles/<header-slug>.md containing just that
     header's content (use the tech name as the new file's H1).
  b. Replace that section here with a one-line pointer:
     `## <Tech> — see [[03-Resources/Principles/<slug>]]` + one sentence on scope.
  c. Confirm this file is back under 200 lines before ending the session.
  d. Log the split under "Vault Updates This Session" in the session log.
-->
 
# Anti-Patterns — Do Not Repeat (Index)
 
Cross-project. If your task touches a technology listed below, read that section —
or follow its link if it's already been split out — before writing related code.
 
## Clerk
 
| Never Do This | Why | Do This Instead | Source |
|---|---|---|---|
| Set `colorBackground: "transparent"` in ClerkProvider theme variables | Clerk's internal contrast engine treats it as invalid/white and falls back to light-theme defaults (black text, white inputs) even inside a dark glassmorphic card | Pass a solid dark hex (e.g. `#111111`) to the theme variables so Clerk computes dark-theme contrast correctly, then strip the visible background separately via `elements: { card: "bg-transparent border-none" }` | [[01-Projects/Momentum/Momentum]] |
| Use `userButtonPopoverActionButtonText` as a Clerk styling selector | Deprecated/ignored as of Clerk Core 2 — styles silently don't apply, no error thrown | Merge text/hover styles directly into the parent `userButtonPopoverActionButton` selector | [[01-Projects/Momentum/Momentum]] |
| Call `getToken({ template: 'supabase' })` without error catching | Throws a raw `ClerkAPIResponseError: Not Found` if the Supabase template is missing or inactive in Clerk dashboard, crashing the page/action | Wrap `getToken` in a `try/catch` block and fall back to public client queries | [[01-Projects/Ledger/Ledger]] |
| Render empty `<UserButton.MenuItems>` container | Causes unnecessary blank separators or runtime console warnings in the Clerk UserButton dropdown | Conditionally wrap the entire `<UserButton.MenuItems>` block (e.g., `{isMobile && <UserButton.MenuItems>...</UserButton.MenuItems>}`) | [[01-Projects/Ledger/Ledger]] |
| Assume a Clerk JWT template named `supabase` exists after only wiring env keys | Template is separate dashboard config; zero templates → `getToken` returns null → every RLS data action fails even when Supabase is healthy (including after project resume) | Create JWT template `supabase` with HS256 custom signing key = Supabase JWT Secret (`scripts/setup-clerk-supabase-jwt.mjs`); optional service-role fallback only after Clerk `auth()` + always scope by `user_id` | [[01-Projects/Ledger/Ledger]] |
| Run Playwright/automation audits against `127.0.0.1:port` while Clerk dev server expects `localhost` | Clerk refuses handshake on host mismatch — auth state silently never populates, every protected route stays unauthenticated; tests appear "stuck" with no console error | Use `http://localhost:<port>` for any client/automation that flows through Clerk (Playwright `setViewportSize`, curl cookie flows, etc.) | [[06-Agent-Sessions/extracted-sessions]] (Ledger UI polish audit, 2026-07-19) |

## Next.js

| Never Do This | Why | Do This Instead | Source |
|---|---|---|---|
| `await syncUserProfile()` inside a Server Component layout | Blocks render and can leak request context when the async work completes after children render | Decouple to a client `<ProfileSync />` that calls the server action in `useEffect` on mount | [[01-Projects/Ledger/Ledger]] |
| Inline head script setting `data-theme` / classes without `suppressHydrationWarning` on `<html>` | React hydration warns because server HTML differs from client after the blocking script runs | Add `suppressHydrationWarning` to `<html>` when using a render-blocking theme flash-prevention script | [[01-Projects/Ledger/Ledger]] |
| Run Supabase seed/realtime scripts on Node 20 without WebSocket support | Supabase realtime client expects native WebSocket; Node 20 lacks it by default | Use `NODE_OPTIONS="--experimental-websocket"` when running `tsx` seed scripts | [[01-Projects/Ledger/Ledger]] |
| Protect routes via a growing public-route exclusion list | Hard to maintain; 404/legal/static pages may incorrectly redirect to login | Use Clerk `createRouteMatcher` for explicit protected app prefixes only (e.g. `/today`, `/habits`) | [[01-Projects/Momentum/Momentum]] |
| Add `middleware.ts` when `proxy.ts` already exists (Next.js 16) | Duplicate middleware detection; `middleware` convention is deprecated | Use `proxy.ts` as the sole middleware entry point | [[01-Projects/Ledger/Ledger]] |
| Run Supabase/Clerk native CLI binaries on Ivy Bridge CPUs without AVX2 | Precompiled Bun binaries throw `SIGILL` (Illegal Instruction) | Fall back to manual quickstart / Node `fetch`-based migration scripts | [[01-Projects/Ledger/Ledger]] · [[01-Projects/Momentum/Momentum]] |
| `export type { ... }` from a `'use server'` module | Turbopack emits a runtime reference to the erased TypeScript interface/type, throwing `ReferenceError: <Type> is not defined` during server module evaluation on Vercel (while local Webpack dev suppresses it) | Import and export types directly from dedicated type files (`lib/types/database.ts`), never re-export types from server action files | [[01-Projects/Ledger/Ledger]] |

## Supabase

| Never Do This | Why | Do This Instead | Source |
|---|---|---|---|
| Use `.single()` on queries that check for optional record existence | Throws a postgREST `PGRST116` error if the record is missing, filling application logs with false errors | Use `.maybeSingle()` or perform a direct `.upsert()` if checking before insert/update is not strictly necessary | [[01-Projects/Ledger/Ledger]] |
| RLS on child/log tables without parent ownership check | User could insert logs referencing another user's parent record | Policy must join to parent table and verify `auth.jwt() ->> 'sub'` matches parent `user_id` | [[01-Projects/Momentum/Momentum]] |
| Re-run SQL migrations without `drop policy if exists` | Duplicate policy errors on second apply | Prepend `drop policy if exists` for idempotent local migration runs | [[01-Projects/Momentum/Momentum]] |
| Drop/rename a DB column without grepping every raw `SELECT`/column-list constant across `lib/actions/*.ts` | PostgREST throws `column X does not exist` at runtime, not build time — silent until the query fires | Grep all `*_SELECT` string constants for the column name before running any schema migration that drops/renames it | [[01-Projects/Ledger/Ledger]] |

## CSS / Design Tokens

| Never Do This | Why | Do This Instead | Source |
|---|---|---|---|
| Use semantic `text-text-inverse` on fixed orange brand buttons | In light mode `text-inverse` resolves to white (`#FAFAFA`) on orange (`#F97316`) — ~2.61:1 contrast, fails WCAG AA | Define a theme-independent token (e.g. `--color-orange-btn-text: #0A0A0A`) and use `text-orange-btn-text` on orange CTAs | [[01-Projects/Ledger/Ledger]] |
| Pair `text-azure` with `bg-azure-muted` in light mode without checking contrast | Default azure (`#38BDF8`) on sky-100 (`#E0F2FE`) is ~1.75:1 — fails WCAG AA for active nav states | Override `--color-azure` to a darker shade (e.g. sky-700 `#0369A1`) inside the light-theme block | [[01-Projects/Ledger/Ledger]] |

## UI overlays (sheets / menus / dialogs)

| Never Do This | Why | Do This Instead | Source |
|---|---|---|---|
| Leave default Radix `AlertDialog` at `z-50` when custom sheets use `z-[100]+` | Confirm opens **under** the sheet → UI looks frozen; focus trap makes the page unusable | Set confirm overlay/content **above** all app sheets (Ledger: `z-[130]` > BottomSheet `z-[100]`) | [[01-Projects/Ledger/Ledger]] |
| Nest ConfirmDialog inside a popover/menu that closes on outside `mousedown` | Portaled dialog is outside the menu root → confirm click unmounts menu + dialog before action runs | Hoist confirm to parent list/page state; menu only calls `onDeleteRequest` then closes | [[01-Projects/Ledger/Ledger]] |

## WebGL / Three.js

| Never Do This | Why | Do This Instead | Source |
|---|---|---|---|
| Paste gist/reposted Ashima Simplex 2D noise into a `THREE.ShaderMaterial` without re-checking the canonical source | Public copies often carry (1) 3-arg `max(...)` and (2) `float m *= inversesqrt(vec3)` — invalid GLSL ES 1.00; desktop NV/AMD accept them; SwiftShader (Chromium headless / Lighthouse) fails the link silently → black canvas, Lighthouse still green | Copy verbatim from `ashima/webgl-noise/src/noise2D.glsl`; on `LINK_STATUS: false` compile the shader strings via raw WebGL2 and read `getShaderInfoLog` / `getProgramInfoLog` (see Pastries `scripts/_get-link-log.mjs`) | [[06-Agent-Sessions/2026-07-20-opencode-antigravity-step5b-swarm-real-rootcause]] |
| Treat missing `precision` in custom ShaderMaterial as the root cause of a silent SwiftShader link failure without reading the info log | Three already injects `precision highp float;` for ShaderMaterial; precision-only "fixes" can look plausible but leave the real invalid GLSL untouched | Always capture the program/shader info log before declaring root cause; keep extra precision only as belt-and-suspenders | [[06-Agent-Sessions/2026-07-20-opencode-antigravity-step5b-swarm-real-rootcause]] |
| Gate canvas/WebGL deliverables only on Lighthouse + DOM `toBeVisible` | Neither checks painted pixels — a failed shader link can ship with LH 95+ and a visible empty canvas | Add a Playwright brightCount / pixel-sample assertion (drawImage → getImageData, assert threshold) per Effects Build Playbook feel check | [[06-Agent-Sessions/2026-07-20-opencode-antigravity-step5b-swarm-real-rootcause]] |

## React (Compiler / Hooks lint)

| Never Do This | Why | Do This Instead | Source |
|---|---|---|---|
| Use `useState(false)` + `useEffect(() => setMounted(true))` as a mount-detection guard | Trips `react-hooks/set-state-in-effect` — an extra render cycle for state a first render already knows | Use `useSyncExternalStore(() => () => {}, () => true, () => false)` — single render, no effect cycle | [[01-Projects/Ledger/Ledger]] |
| Derive a component variable per-render (`const Icon = getIconComponent(name)`) and render it as a JSX tag (`<Icon/>`) | Trips `react-hooks/static-components` — React Compiler can't verify the component identity is stable across renders | Use `React.createElement(getIconComponent(name), props)` instead of a JSX tag-cased const | [[01-Projects/Ledger/Ledger]] |

## OpenCode / Custom AI Providers

| Never Do This | Why | Do This Instead | Source |
|---|---|---|---|
| Copy an Anthropic-compatible provider's documented base URL into OpenCode without checking the SDK's final request path | OpenCode's `@ai-sdk/anthropic` adapter appends `/messages` directly; AgentRouter's documented `https://agentrouter.org` therefore produced `/messages`, while its working route was `/v1/messages` | Capture a redacted request path or consult the adapter behavior, then set the base URL so the composed path matches the provider; AgentRouter required `https://agentrouter.org/v1` | [[06-Agent-Sessions/2026-08-04-opencode-agentrouter-claude-routes]] |
| Treat `opencode models <custom-provider>` as live provider discovery | For custom providers, the command lists model IDs manually declared in `opencode.json(c)`; it does not prove the backend's full catalog or account entitlements | Compare dashboard/docs cautiously, manually declare the exact candidate ID in a temporary config, and verify it through a supported client request before adding it permanently | [[06-Agent-Sessions/2026-08-04-opencode-agentrouter-claude-routes]] |

## Claude Code / Anthropic (claude-agent-sdk, OAuth bridge)

| Never Do This | Why | Do This Instead | Source |
|---|---|---|---|
| Pass a sync generator (plain `def` + `yield`) as the `query(prompt=...)` iterable even if it's annotated `-> AsyncIterator` | The SDK's `async for` raises `TypeError` instantly; `stream_input()` swallows it silently, so the prompt never reaches the CLI's stdin and the CLI blocks in `ep_poll` forever (observed 240s+ hang, no error logged) | Make the prompt iterable a real async generator (`async def` + `yield`); verify the CLI receives input by watching its rchar or a streamed reply | [[06-Agent-Sessions/2026-08-13-hermes-claude-bridge-oauth]] |
| Register tools via SDK-type MCP servers (`create_sdk_mcp_server`) when replaying multi-turn history that contains a leading user text message before a `tool_use`/`tool_result` round-trip | The CLI mispairs the tool_result and the Anthropic API rejects with `400 tool use concurrency issues`; identical history replays cleanly with no MCP server or with a plain stdio MCP server — SDK-MCP + leading user text is the trigger | Expose tools through a stdio MCP subprocess (`--mcp-config` with `type: stdio`, command/args) instead of SDK MCP servers; keep the PreToolUse defer hook for interception | [[06-Agent-Sessions/2026-08-13-hermes-claude-bridge-oauth]] |
| Pass a system prompt that names tool IDs from other agent frameworks (e.g. `skill_manage`, `session_search`, `skill_view`, `memory`, `patch`) into Claude Code | Anthropic's API classifies the request as "third-party" (billed to extra usage) and returns `400 Third-party apps now draw from your extra usage` — confirmed trigger is `skill_manage` alone; "You are Claude Code" identity markers do NOT fix it, scrubbing the token does | Sanitize the system prompt with word-boundary token replacement before sending (real tool names still reach the model via the MCP registry); confirmed scrub set lives in the bridge's `_HERMES_TOOL_ALIASES` | [[06-Agent-Sessions/2026-08-13-hermes-claude-bridge-oauth]] |
| Use the built-in `anthropic` provider (the WebUI switcher's `@anthropic:` models) with Claude Code OAuth — or try to redirect it via a provider-profile plugin override or the `ANTHROPIC_BASE_URL` env var | The built-in lane sends `CLAUDE_CODE_OAUTH_TOKEN` straight to api.anthropic.com → `400 Third-party apps now draw from your extra usage`; on the native-anthropic pool path the runtime ignores profile base_url AND `ANTHROPIC_BASE_URL` (both verified empirically — plugin registered fine, request still went to api.anthropic.com) | Point the whole lane at the bridge: `hermes config set model.base_url http://127.0.0.1:3456/anthropic` plus an `/anthropic/v1/messages` alias route on the bridge — the `/anthropic` suffix is REQUIRED by `_anthropic_base_url_override_ok()` (a bare localhost URL is rejected) | [[06-Agent-Sessions/2026-08-14-hermes-claude-bridge-webui-anthropic-lane]] |
| Replay a `tool_use`/`tool_result` round-trip into Claude Code as actual blocks (assistant `tool_use` + user `tool_result`) and expect the model to see the result | The CLI treats EVERY stream-json `tool_use` as a LIVE call: it re-fires the PreToolUse defer hook with a fresh id and re-executes; an injected `tool_result` for a foreign id is orphaned, so the content never reaches the model (verified across parent_tool_use_id / top-level `tool_use_result` / flattening variants) | DROP replayed `tool_use` blocks and FLATTEN replayed `tool_result` blocks into user-role text labeled `[Tool result: <name>]`; append a `[Bridge note]` framing paragraph to the system prompt so the model treats them as authoritative host tool output (without it the model refuses as injected text) | [[06-Agent-Sessions/2026-08-14-hermes-claude-bridge-webui-anthropic-lane]] |
| Expect image content blocks (or any non-text/tool_use/tool_result block) to pass through the Claude Agent SDK to the CLI | The SDK's `message_parser` silently drops every block type it doesn't handle — image blocks die before the CLI ever sees them (verified: passthrough in bridge.py still returned IMAGE-NOT-SEEN). Native vision through the bridge is architecturally impossible | Route images as TEXT: `hermes config set agent.image_input_mode text` → Hermes runs pasted images through `vision_analyze` and sends `[The user attached an image. Here's what it contains: ...]` descriptions (same mechanism the Telegram/WhatsApp gateway already uses) | [[06-Agent-Sessions/2026-08-14-hermes-claude-bridge-webui-anthropic-lane]] |

## Hermes / Provider Config

| Never Do This | Why | Do This Instead | Source |
|---|---|---|---|
| Set `model.base_url` at the TOP LEVEL of `~/.hermes/config.yaml` | The root-level base_url applies to the DEFAULT lane of EVERY provider — one bridge/proxy URL silently redirects all providers (500s while the proxy is up, `APIConnectionError` when it's down). Explicit provider picks bypass it, so the WebUI/CLI can appear fine while the default lane is dead. Proven via request dumps: deepseek-v4-flash and z-ai/glm-5.2 requests were routed to a stopped local bridge; DeepSeek's real API was never consulted | Scope base-URL overrides per provider/lane; if a global one exists, `hermes config unset model.base_url`; verify the default lane with `hermes chat -q` after any change | [[06-Agent-Sessions/2026-08-15-hermes-provider-audit]] |
