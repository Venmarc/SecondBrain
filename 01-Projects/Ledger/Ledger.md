> **One-line Summary**: Personal expense / budget tracker for Nigerian realities — Phase 1 gate passed 2026-07-21; **Phase 2 gate passed** (Victor, 2026-07-28); Phase 3 in progress — **P3-A done** 2026-07-30, P3-B onward pending.

# Ledger

**Status:** Active — **Phase 3 in progress** — Phase 1 **gate passed** (Victor, 2026-07-21). Phase 2 **gate passed** (Victor, 2026-07-28). Phase 3 P3-A (Analytics foundations) **complete** 2026-07-30; awaiting Victor sign-off on P3-A then P3-B (Analytics UI). Multi-select transaction filters remain a backlog design note in NOTES.md (not blocking).  
**Codebase:** `/home/redmane/Documents/Port Sites/Category 5/Ledger`  
**Live:** [Ledger](https://ledgerix.vercel.app)
**Repo URL:** [Ledger](https://github.com/Venmarc/Ledger)
**Vault sync:** Port Sites docs are origin. Hub updated **2026-07-30** (P3-A foundations shipped + lint baseline cleared).

## Purpose

Lightweight, fast expense logging, category budgets, and clear money-leak visibility. Built for mobile-first routines under inflation pressure. Fintech-grade precision feel without SaaS cream fluff.

## Brand (short)

- Serious, precise, professional (dark charcoal, targeted highlights)
- **Anti:** beige SaaS templates, rainbow grids, over-rounded cards, meaningless sparkles
- Numbers: tabular figures; red only for exceeded budgets

## Active phase

Read [[01-Projects/Ledger/Docs/PHASES|PHASES]] every session.

**Phase 1:** Complete (gate passed 2026-07-21).  
**Phase 2:** Complete (gate passed 2026-07-28).  
**Phase 3 (current):** Analytics, Recurring & Completion. P3-A (foundations) **complete** 2026-07-30; P3-B (Analytics UI) next. Full chunk map in `docs/PHASE-3-OVERVIEW.md` (Port Sites) and the Phase 3 implementation log in [[01-Projects/Ledger/Docs/PHASES|PHASES]].

### Phase 1 gate — closed

Victor sign-off 2026-07-21 after delete-confirm fix + polish; no open Phase 1 bugs.

### Phase 2 gate — closed

Victor sign-off 2026-07-28 ("I declare phase 2 complete for now"). 8 chunks (P2-A through P2-H) landed; see [[01-Projects/Ledger/Docs/PHASES|PHASES]] Phase 2 implementation log.

## Doc set (synced)

| Doc | Link |
|-----|------|
| README | [[01-Projects/Ledger/Docs/README|README]] (vault mirror) |
| PRODUCT | [[01-Projects/Ledger/Docs/PRODUCT|PRODUCT]] |
| PRD | [[01-Projects/Ledger/Docs/PRD|PRD]] |
| TRD | [[01-Projects/Ledger/Docs/TRD|TRD]] |
| PHASES | [[01-Projects/Ledger/Docs/PHASES|PHASES]] |
| PAGE_SPECS | [[01-Projects/Ledger/Docs/PAGE_SPECS|PAGE_SPECS]] |
| APP_FLOW | [[01-Projects/Ledger/Docs/APP_FLOW|APP_FLOW]] |
| UIUX_BRIEF | [[01-Projects/Ledger/Docs/UIUX_BRIEF|UIUX_BRIEF]] |
| DESIGN | [[01-Projects/Ledger/Docs/DESIGN|DESIGN]] |
| SCHEMA | [[01-Projects/Ledger/Docs/SCHEMA|SCHEMA]] |
| NOTES | [[01-Projects/Ledger/Docs/NOTES|NOTES]] |
| AGENTS | [[01-Projects/Ledger/Docs/AGENTS|AGENTS]] |

## Related skills

- [[03-Resources/MOC-UI-UX-Lessons|MOC: UI/UX Lessons]]
- [[03-Resources/Skills/Smart-Form-Controls|Smart form controls]]
- [[03-Resources/Skills/Dashboard-As-Overview|Dashboard as overview]]
- [[03-Resources/Skills/Browser-Native-Dialog-Trap|Browser native dialog trap]]
- [[03-Resources/Skills/State-Isolation-Per-Record|State isolation per record]]
- [[03-Resources/Skills/Theme-Aware-Component-Checklist|Theme-aware components]]
- [[01-Projects/Ledger/Docs/DESIGN|DESIGN]] · [[01-Projects/Ledger/Docs/UIUX_BRIEF|UIUX_BRIEF]]

## Lessons log (from sessions)

*Agents: append 0–3 bullets here after sessions when reusable.*

- **2026-07-13 — Foundation:** Persistent theme provider (`ledger-theme` key) + blocking head script + `suppressHydrationWarning`. Profile sync decoupled to client `<ProfileSync />`. Dynamic top bar with back chevrons. `formatNGN` accepts `number | string`. `.superpowers/` in `.gitignore`.

- **2026-07-14 — Layout revisions:** Collapsible sidebar via `--sidebar-width` + `LayoutShell` + portal tooltips. Mobile-only Settings link in Clerk `UserButton.MenuItems`. Auth layout stripped. WCAG: orange button text token, light-mode azure override.

- **2026-07-15 — Theme toggle icon (resolved 2026-07-31):** A 2026-07-15 session had reversed the toggle ternary to show the target mode, contradicting [[01-Projects/Ledger/Docs/UIUX_BRIEF|UIUX_BRIEF]] §6.10 and [[01-Projects/Ledger/Docs/APP_FLOW|APP_FLOW]] §3.2 ("icon shows current active mode"). Victor fixed the toggle back to spec — icon shows current state, not target. Docs were correct as written; no doc changes needed.

- **2026-07-16 — Phase 1 build + auth bridge:** Chunked P1-A→H (Quick Add, list, edit/delete/undo, categories, dashboard v1). Supabase pause does not wipe migrations; post-resume “authorize” error was **zero Clerk JWT templates** named `supabase`. Fix: service-role fallback after Clerk auth + `scripts/setup-clerk-supabase-jwt.mjs` for HS256 JWT secret. Auto-seed 13 categories when user has none. See [[ANTI_PATTERNS|ANTI_PATTERNS]] Clerk row.

- **Open:** Prefer finishing proper JWT template (HS256) over long-term service-role fallback; Tooltip Escape dismissal; minor sidebar hydration if expanded.

- **2026-07-17 — Month control (spec):** Target UX locked (no full modal; year + month sliders). Implemented 07-19 — see below.

- **2026-07-19 — UI polish pass:** Replaced calendar Dialog month picker with dual SnapSlider (month primary at pill width; year eases in on tap; month drops as **absolute overlay** under pill — `top-full` z-30, never in-flow push). Transactions filter rebuilt per Transaction_UI_Spec (search + filter icon → bottom sheet; chips only when active; Type stays segmented control, not slider — see [[03-Resources/Skills/Discrete-State-Control-Selection|Discrete-State-Control-Selection]]). `MIN_YEAR = 2025` as product-start bound, not max. Audit-fix regressions: tablet header crush (`sm:flex-row` → stack until `lg`); sidebar icon drift on collapse (`justify-center` → fixed left rail `pl-3.5` + label `max-w` clip); Clerk dev-handshake requires `localhost`, not `127.0.0.1` (see [[ANTI_PATTERNS|ANTI_PATTERNS]] §Clerk); list skeleton flash on search/month change → `keepPreviousData` on infinite + recent + month summary queries. Victor later added nav `pl-2` for icon optical center.

- **2026-07-21 — Delete confirm fix:** Edit freeze = AlertDialog `z-50` under BottomSheet `z-[100]` → `z-[130]`. ⋮ Delete no-op = menu outside-click unmounted portaled confirm → hoist delete confirm to list parent (`onDeleteRequest`). Sheet Escape defers while alert overlay open. See Port Sites NOTES 21/07.

- **2026-07-21 — Phase 1 gate passed** (Victor). Multi-select filters (OR within categories/payments) design note in Port Sites NOTES — backlog, not Phase 2 scope.

- **2026-07-21 — UI polish floor + category picker parked (Phase 2 kickoff):** All new Phase-2 UI must use house motion tokens (`--duration-slow`, `--ease-smooth`) from `globals.css`, never invented magic numbers; cards use `.pressable` (`scale(0.98)`) only, hover-lift banned. Category picker iterated native-select → pills → nested scrollable modal → **reverted to pills**; Victor parked a custom scrollable text-only list modal as backlog polish (not done).

- **2026-07-23 — Budget query invalidation chokepoint:** FAB-driven transaction mutations must invalidate `queryKeys.budgets.all()` inside `invalidateTransactionReads` (`lib/hooks/use-transactions.ts`), not just `transactions`/`summary` — budget cards are query-time sums and go stale silently otherwise.

- **2026-07-24/25 — Category icon system migration:** Dropped `categories.color` column, `icon` now `text not null` (`scripts/migrations/20260724_category_icons.sql`); every raw `CATEGORY_SELECT` string in `lib/actions/{budgets,transactions}.ts` must be updated in lockstep with schema migrations — missed column caused prod `column categories_1.color does not exist`. Neutral icon-circle bg via `--color-neutral*` tokens; dark-mode contrast fix `#57534E`→`#A8A29E` (Stone-400, ~4.6:1) after icons were unreadable in dark theme. See [[ANTI_PATTERNS|ANTI_PATTERNS]] §Supabase.

- **2026-07-28 — Phase 2 gate passed** (Victor: "I declare phase 2 complete for now"). Budget mini-card + transaction-row date fix landed; 8 chunks P2-A→H complete.

- **2026-07-29/30 — Plan-review-before-implement workflow:** Every Phase 3 chunk gets its own `docs/P#-#.md` (never inline in a session). Before saving: run an "implementer-hat" self-review prompt ("list every assumption/ambiguity/edge case you'd guess at with zero context — don't fix, just list") and close every hole with an explicit `closes X` reference; only then does a separate agent implement. Recharts chart colors must be **resolved hex literals**, not `var(--...)` — Recharts SVG `fill` doesn't reliably resolve CSS custom properties cross-browser. See [[02-Areas/Agent-Ops/Victor-Standing-Directives|Victor Standing Directives]].

- **2026-07-30 — Lint fix:** `react-hooks/set-state-in-effect`, `react-hooks/static-components` — see [[ANTI_PATTERNS|ANTI_PATTERNS]] §React.

- **2026-07-31 — README + LICENSE:** Regenerated `README.md` from Next.js boilerplate (features, screenshots, tech stack, quick start); added MIT `LICENSE`.

## Parallel build note

Built **alongside Momentum**. Victor supervises; agents execute under phase gates.

**Tags:** #ledger #project #active #phase-2-next
