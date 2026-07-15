> **One-line Summary**: Personal expense / budget tracker for Nigerian realities — Phase 0 foundation. Precision, speed, visual restraint.

# Ledger

**Status:** Active — **Phase 0 (Foundation)** — *complete as of 2026-07-14* (layout revisions merged; Phase 1 next)  
**Codebase:** `/home/redmane/Documents/Port Sites/Category 5/Ledger`  
**Live:** [Ledger](https://ledgerix.vercel.app)
**Vault sync:** Docs mirrored from Port Sites on **2026-07-15** (APP_FLOW, PAGE_SPECS, PHASES, UIUX_BRIEF, NOTES). Edit project folder first.

## Purpose

Lightweight, fast expense logging, category budgets, and clear money-leak visibility. Built for mobile-first routines under inflation pressure. Fintech-grade precision feel without SaaS cream fluff.

## Brand (short)

- Serious, precise, professional (dark charcoal, targeted highlights)
- **Anti:** beige SaaS templates, rainbow grids, over-rounded cards, meaningless sparkles
- Numbers: tabular figures; red only for exceeded budgets

## Active phase

Read [[01-Projects/Ledger/Docs/PHASES|PHASES]] every session. Phase 0 = skeleton only (auth, DB/RLS, nav, theme) — **no feature scope creep**.

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

## Related skills (Phase 0)

- [[03-Resources/MOC-UI-UX-Lessons|MOC: UI/UX Lessons]]
- [[01-Projects/Ledger/Docs/DESIGN|DESIGN]] · [[01-Projects/Ledger/Docs/UIUX_BRIEF|UIUX_BRIEF]]
- [[03-Resources/Skills/Smart-Form-Controls|Smart form controls]] — fast logging
- [[03-Resources/Skills/Frontend-Awesomeness|Frontend Awesomeness]] — density without clutter
- [[03-Resources/Skills/Collapsible-Desktop-Sidebar|Collapsible desktop sidebar]] — shell architecture
- [[03-Resources/Skills/Theme-Switching-Foundation|Theme switching foundation]] — flash prevention + hydration
- [[03-Resources/Design/48-Laws-of-Web-Design|48 Laws]] — when polish phase starts
- [[03-Resources/Tools/Effects_Glossary|Effects Glossary]] · [[03-Resources/Tools/Effects_Playbook|Effects Playbook]] — landing/hero effect work

## Lessons log (from sessions)

*Agents: append 0–3 bullets here after sessions when reusable.*

- **2026-07-13 — Foundation:** Persistent theme provider (`ledger-theme` key) + blocking head script + `suppressHydrationWarning`. Profile sync decoupled to client `<ProfileSync />`. Dynamic top bar with back chevrons per [[03-Resources/Skills/Sticky-Top-Bar-Navigation|Sticky Top Bar]]. `formatNGN` accepts `number | string` (Postgres `numeric` returns strings). `.superpowers/` in `.gitignore`.

- **2026-07-14 — Layout revisions:** Collapsible sidebar via `--sidebar-width` + `LayoutShell` + portal tooltips. Mobile-only Settings link in Clerk `UserButton.MenuItems`. Auth layout stripped to Clerk card + deferred "Back to home" footer. WCAG fixes: orange button text token, light-mode azure override. See [[ANTI_PATTERNS|ANTI_PATTERNS]] for Clerk/Supabase/Next.js entries.

- **Open (Phase 1+):** Tooltip Escape dismissal; minor hydration shift if sidebar persisted as expanded.

## Parallel build note

Built **alongside Momentum**. Both prioritize real frontend quality (not backend-only). Victor supervises; agents execute under phase gates.

**Tags:** #ledger #project #active #phase-0
