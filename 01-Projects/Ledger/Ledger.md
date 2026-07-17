> **One-line Summary**: Personal expense / budget tracker for Nigerian realities — Phase 1 core transactions implemented; gate pending Victor.

# Ledger

**Status:** Active — **Phase 1 (Core Transactions)** — *implementation complete 2026-07-16*; **gate not closed until Victor verifies**  
**Codebase:** `/home/redmane/Documents/Port Sites/Category 5/Ledger`  
**Live:** [Ledger](https://ledgerix.vercel.app)  
**Vault sync:** Port Sites docs are origin. Hub updated **2026-07-16**.

## Purpose

Lightweight, fast expense logging, category budgets, and clear money-leak visibility. Built for mobile-first routines under inflation pressure. Fintech-grade precision feel without SaaS cream fluff.

## Brand (short)

- Serious, precise, professional (dark charcoal, targeted highlights)
- **Anti:** beige SaaS templates, rainbow grids, over-rounded cards, meaningless sparkles
- Numbers: tabular figures; red only for exceeded budgets

## Active phase

Read [[01-Projects/Ledger/Docs/PHASES|PHASES]] every session.

**Phase 1 (current):** Quick Add, transaction list/filters, edit/delete/undo, categories, dashboard v1.  
**Do not start Phase 2** until Phase 1 gate is explicitly passed by Victor.

### Phase 1 gate (Victor checklist)

- Phone: log transport expense under 10s  
- Income green; dashboard updates  
- Edit / delete + 5s undo  
- Draft restore  
- 20 real transactions; filter + month math checks  
- `tsc` clean; zero console errors  

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

- **2026-07-16 — Phase 1 build + auth bridge:** Chunked P1-A→H (Quick Add, list, edit/delete/undo, categories, dashboard v1). Supabase pause does not wipe migrations; post-resume “authorize” error was **zero Clerk JWT templates** named `supabase`. Fix: service-role fallback after Clerk auth + `scripts/setup-clerk-supabase-jwt.mjs` for HS256 JWT secret. Auto-seed 13 categories when user has none. See [[ANTI_PATTERNS|ANTI_PATTERNS]] Clerk row.

- **Open:** Prefer finishing proper JWT template (HS256) over long-term service-role fallback; Tooltip Escape dismissal; minor sidebar hydration if expanded.

- **2026-07-17 — Deferred month control:** Dashboard month control redesign blocked until UI polish rules extracted from Victor’s X-article summary. Target UX: no modal — expandable dropdown; year + month **sliders** (mobile: sliders only; desktop: sliders + edge buttons). Phase 1 gate still open.

## Parallel build note

Built **alongside Momentum**. Victor supervises; agents execute under phase gates.

**Tags:** #ledger #project #active #phase-1
