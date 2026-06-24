# Agent Guide: Momentum

## Commands

| Command | What it does | Notes |
|---------|-------------|-------|
| `npm run dev` | `next dev --webpack` | **Must include `--webpack`** — turbopack not used |
| `npm run build` | `next build` | |
| `npm run lint` | `eslint` | No typecheck, no tests, no prettier |

No test framework installed. TRD mentions Vitest but no deps in `package.json`.

## Architecture

- **Framework:** Next.js 16 App Router, React 19, TypeScript strict
- **Auth:** Clerk + Custom Session Tokens (JWT templates). `clerk_id` is the user identifier stored in every DB table (not UUID).
- **DB:** Supabase PostgreSQL. Server Actions use `createSupabaseServiceClient()` (service role, **bypasses RLS**). No custom API layer.
- **Rate limiting:** Upstash Redis, falls back to in-memory sliding window. Bypassed when `NODE_ENV=development` or `DISABLE_RATE_LIMIT=true`.
- **State:** TanStack Query (server data) + Zustand with `persist` middleware (client/UI state). QueryClient config: `staleTime: 60s, refetchOnWindowFocus: false`.
- **CSS:** Tailwind v4 via `@tailwindcss/postcss`. Path alias `@/*` → root.
- **Middleware** lives in `/proxy.ts` (not `middleware.ts`).

## Key Directories

| Path | Purpose |
|------|---------|
| `app/actions/` | Server Actions (all return `{success, data}` or `{error}`) |
| `app/lib/` | Shared utilities (Supabase clients, validation, rate-limit) |
| `app/hooks/` | Zustand stores + hooks (workout store, sidebar store, toast) |
| `app/components/` | UI components organized by domain |
| `supabase/migrations/` | SQL migrations |
| `scripts/` | Seed data, dev utilities |

## Routes

- **Public:** `/` (landing), `/api/webhooks/clerk`
- **Protected (needs auth):** everything else
- `/dashboard` just `redirect('/today')`
- **Not yet built** (per APP_FLOW.md): `/insights`, `/data`, `/profile`, `/reset-password`
- `proxy.ts` protects all non-public routes and rate-limits API + Server Actions

## Important Patterns

- Every Server Action: `auth()` → `checkRateLimit()` → parse input → call Supabase → `revalidatePath()` → return result
- `ensureProfile()` called from root layout — guarantees Clerk user has a Supabase profile row (catch for missing webhook)
- Events like `createHabit`, `logHabit`, `saveWorkout` path patterns match rate limit key: `action:{module}:{userId}`
- Rate limiter is called with `checkRateLimit(key, 60, 60)` — 60 req/min per user

## Known Issues (from NOTES.md — June 18+)

- Settings preferences save broken (`PGRST204` on `dashboard_widgets` column)
- Theme toggle non-functional; light mode has no hover states on buttons/links, black highlights on sidebar hover, invisible logo text
- Skeleton loaders have black containers in light mode
- Fitness sidebar icon not highlighted on sub-pages (`/fitness/exercises`, etc.)
- Sticky nav / back button UX missing on sub-pages
- Settings page: unsaved changes not tracked on navigation; "Save Preferences" still errors

## Doc Files (keep in sync)

`PRD.md` `TRD.md` `APP_FLOW.md` `UIUX_BRIEF.md` `SCHEMA.md` `PHASES.md` `PAGE_SPECS.md` `NOTES.md`

`.agent/SESSION_PROTOCOL.md` prescribes a pre-flight reading sequence — check it before major work.

## Style

- Dark-first, `#10b981` accent. Glassmorphism cards: `rgba(255,255,255,0.06)` + `backdrop-blur(24px)` + `1px border rgba(255,255,255,0.1)`.
- Lucide icons, Geist font, Inter fallback. `#030303` background, `#f4f4f5` text.

---

## Round Table Review System

### Purpose
Prevent implementation drift when working with AGY CLI (Gemini). Two failure modes:
1. **Consolidation gap** — clarifications pile up, Gemini skips updating plan, details drop
2. **Implementation drift** — long context, Gemini pattern-matches instead of referencing plan

### The Three Reviewers
| Agent | File | Model | Role |
|-------|------|-------|------|
| `@detail-hawk` | `.opencode/agents/detail-hawk.md` | `opencode/deepseek-v4-flash-free` | Line-by-line requirement fidelity |
| `@consistency-auditor` | `.opencode/agents/consistency-auditor.md` | `deepseek/deepseek-v4-flash` | Codebase conventions & future conflicts |
| `@devil-advocate` | `.opencode/agents/devil-advocate.md` | `opencode/mimo-v2.5-free` | Edge cases, regressions, assumed scenarios |

### Commands
- **`/consolidate`** — Before coding. Feeds all 3 agents the original prompt + clarifications + plan. Output: consolidated implementation brief → `audits/` + `cli-shared-context/requests/consolidate.md`
- **`/plan-review`** — After AGY writes its plan. Feeds all 3 agents the plan. Output: APPROVED/CHANGES_REQUESTED → `audits/` + `cli-shared-context/requests/plan-review.md`
- **`/audit`** — After each chunk. Feeds all 3 agents the chunk output + brief + project files. Output: structured audit → `audits/` + `cli-shared-context/requests/audit-result.md`

### Audit Output Format
```
✅ Implemented correctly
❌ Missing / skipped
⚠️ Edge cases not handled
🔄 Consistency issues
```

### Workflow
```
Prompt → AGY CLI plans → /consolidate → Gemini chunks → /audit per chunk → repeat
```
