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

## Next.js

| Never Do This | Why | Do This Instead | Source |
|---|---|---|---|
| `await syncUserProfile()` inside a Server Component layout | Blocks render and can leak request context when the async work completes after children render | Decouple to a client `<ProfileSync />` that calls the server action in `useEffect` on mount | [[01-Projects/Ledger/Ledger]] |
| Inline head script setting `data-theme` / classes without `suppressHydrationWarning` on `<html>` | React hydration warns because server HTML differs from client after the blocking script runs | Add `suppressHydrationWarning` to `<html>` when using a render-blocking theme flash-prevention script | [[01-Projects/Ledger/Ledger]] |
| Run Supabase seed/realtime scripts on Node 20 without WebSocket support | Supabase realtime client expects native WebSocket; Node 20 lacks it by default | Use `NODE_OPTIONS="--experimental-websocket"` when running `tsx` seed scripts | [[01-Projects/Ledger/Ledger]] |
| Protect routes via a growing public-route exclusion list | Hard to maintain; 404/legal/static pages may incorrectly redirect to login | Use Clerk `createRouteMatcher` for explicit protected app prefixes only (e.g. `/today`, `/habits`) | [[01-Projects/Momentum/Momentum]] |
| Add `middleware.ts` when `proxy.ts` already exists (Next.js 16) | Duplicate middleware detection; `middleware` convention is deprecated | Use `proxy.ts` as the sole middleware entry point | [[01-Projects/Ledger/Ledger]] |
| Run Supabase/Clerk native CLI binaries on Ivy Bridge CPUs without AVX2 | Precompiled Bun binaries throw `SIGILL` (Illegal Instruction) | Fall back to manual quickstart / Node `fetch`-based migration scripts | [[01-Projects/Ledger/Ledger]] · [[01-Projects/Momentum/Momentum]] |

## Supabase

| Never Do This | Why | Do This Instead | Source |
|---|---|---|---|
| Use `.single()` on queries that check for optional record existence | Throws a postgREST `PGRST116` error if the record is missing, filling application logs with false errors | Use `.maybeSingle()` or perform a direct `.upsert()` if checking before insert/update is not strictly necessary | [[01-Projects/Ledger/Ledger]] |
| RLS on child/log tables without parent ownership check | User could insert logs referencing another user's parent record | Policy must join to parent table and verify `auth.jwt() ->> 'sub'` matches parent `user_id` | [[01-Projects/Momentum/Momentum]] |
| Re-run SQL migrations without `drop policy if exists` | Duplicate policy errors on second apply | Prepend `drop policy if exists` for idempotent local migration runs | [[01-Projects/Momentum/Momentum]] |

## CSS / Design Tokens

| Never Do This | Why | Do This Instead | Source |
|---|---|---|---|
| Use semantic `text-text-inverse` on fixed orange brand buttons | In light mode `text-inverse` resolves to white (`#FAFAFA`) on orange (`#F97316`) — ~2.61:1 contrast, fails WCAG AA | Define a theme-independent token (e.g. `--color-orange-btn-text: #0A0A0A`) and use `text-orange-btn-text` on orange CTAs | [[01-Projects/Ledger/Ledger]] |
| Pair `text-azure` with `bg-azure-muted` in light mode without checking contrast | Default azure (`#38BDF8`) on sky-100 (`#E0F2FE`) is ~1.75:1 — fails WCAG AA for active nav states | Override `--color-azure` to a darker shade (e.g. sky-700 `#0369A1`) inside the light-theme block | [[01-Projects/Ledger/Ledger]] |
 
