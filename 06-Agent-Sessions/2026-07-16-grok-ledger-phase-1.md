<!--
AGENT: Fill every section below.
-->

> **One-line Summary**: Built Ledger Phase 1 core transactions end-to-end and fixed post-pause auth (missing Clerk JWT template → service-role fallback + JWT setup script).

**Date:** 2026-07-16
**Agent:** Grok
**Project:** [[01-Projects/Ledger/Ledger|Ledger]]

## Goal
Ship Phase 1 (Quick Add, list/filters, edit/delete/undo, categories, dashboard v1) in approved chunks; unblock Supabase after project resume; close with P1-I polish and docs without declaring the product gate passed.

## Standing Directives Given This Session
- Chunk-by-chunk approval for Phase 1; best frontend within constraints; use ui-ux-pro-max + impeccable.
- Dashboard v1 = PHASES.md only (no Budget Health / Goals / Insight logic yet).
- Bottom sheets via shadcn + Vaul.
- Do not declare a phase complete until Victor explicitly confirms the gate.

## User Prompts (Extracted, Not Compressed)
- **Prompt:** "We are gonna be working on my Ledger project today… split the phase 1 build into smaller chunks… best frontend work… ui-ux pro max, and ~/.agents/design-skills/impeccable… DO u need anything else?"
  **Overrode/Added:** Started Phase 1 planning; chunk map approved with chunk-by-chunk gating.
- **Prompt:** "See if u can find anything in my SecondBrain vault that can help… read logo_behavior.md"
  **Overrode/Added:** Folded vault skills + logo research into Phase 1 plan.
- **Prompt:** "It loads, no error messages. Next is p1-i. Proceed" (after resume/auth fix)
  **Overrode/Added:** Closed implementation track with P1-I polish/docs.
- **Prompt:** Supabase paused/resumed; "Could not authorize database access… Check Clerk Supabase JWT template"; asked if migrations invalid.
  **Overrode/Added:** Diagnosed JWT not migrations; implemented auth fallback + setup script.

## Reference Files / Media
- `Documents/Research_files/logo_behavior.md` — Victor’s logo glow/lift rules; wired CSS in Phase 1-A.
- Screenshots of Transactions authorize error + healthy Supabase project after resume — confirmed JWT template gap vs schema integrity.

## Root Cause Log
| Symptom | Root Cause | Fix Applied | Confidence |
|---|---|---|---|
| Transactions page: "Could not authorize database access. Check Clerk Supabase JWT template." after resume | Clerk had **zero** JWT templates; `getToken({ template: 'supabase' })` returned null. Pause did not drop schema (all tables HTTP 200; empty rows). | Service-role fallback after Clerk auth + user_id scoping; `scripts/setup-clerk-supabase-jwt.mjs` for HS256; category auto-seed; ANTI_PATTERNS + NOTES | Confirmed |
| Empty categories after resume | No successful writes under broken JWT path (tables empty for all users) | Auto-seed 13 defaults on first `listCategories` when count=0 | Confirmed |

## Research Conducted
- **Searched/Consulted:** Clerk Backend API JWT templates list/create; live Supabase REST with service role; project docs PHASES/PAGE_SPECS/TRD/AGENTS; vault skills (Smart-Form-Controls, Dialog trap, etc.).
- **Should have been consulted but wasn't:** N/A for main path.

## Subagent Snags
- ESLint `react-hooks/set-state-in-effect` on draft open / filter search sync — fixed via event-driven ensureDraft and debounced search handlers.
- Accidental Clerk JWT template created with RS256 default during diagnose — documented; HS256 script is the correct fix.

## Decisions & Pivots
- Phase 1 dashboard: PHASES-only (summary + recent 8 + month selector); Phase 2 widgets deferred.
- Auth: JWT preferred; service-role fallback allowed after Clerk auth for resilience (not a substitute for proper JWT long-term).
- Category palette as DB hex constants in `lib/category-palette.ts` (not component hardcodes).

## Steps Taken / Actions
- Planned P1-A…I chunk roadmap; implemented A–H features.
- Fixed auth after Supabase resume.
- P1-I: tsc/lint/build green; error boundary token polish; PHASES + vault hub + session log + ANTI_PATTERNS.

## Files Touched
- Phase 1 feature set under `Documents/Port Sites/Category 5/Ledger/` (actions, hooks, components/transactions, categories, dashboard, store, etc.)
- `lib/actions/auth-context.ts`, `lib/supabase/service.ts`, `scripts/setup-clerk-supabase-jwt.mjs`
- `PHASES.md`, `NOTES.md`, `AGENTS.md`
- Vault: `01-Projects/Ledger/Ledger.md`, `ANTI_PATTERNS.md`, this session log

## Vault Updates This Session
- ANTI_PATTERNS.md — Clerk row: missing JWT template `supabase`
- Ledger hub — Phase 1 status + lesson 2026-07-16
- Session log written

## Open / Next
- Victor runs Phase 1 gate checklist (10s log, 20 real txs, etc.)
- Optional: run `SUPABASE_JWT_SECRET=... node scripts/setup-clerk-supabase-jwt.mjs` for proper RLS JWT
- Phase 2 only after Victor closes Phase 1 gate
