# Session Log — LiveTrack: landing revamp design + tasks 1–3 — 2026-08-31

> **One-line Summary**: After Victor rejected the Stage 1.5 landing output and pivoted to a page-by-page strategy, this session designed and got approval for the "Night Dispatch" landing-page rebuild (Direction A), wrote the spec and a complete 6-task implementation plan, and executed tasks 1–3 of 6 (route data, geometry math, shared RouteMap + hero) via subagent-driven development with clean task reviews.

**Date:** 2026-08-31
**Agent:** OpenCode (GLM 5.3)
**Project:** LiveTrack — /home/redmane/Documents/Port-Sites/Category-2/LiveTrack

## Goal

Rebuild the landing page as the first slice of a page-by-page revamp: a working road-following map demo as the hero, one continuous public experience shared with the tracking page (Option 3), on the existing Dispatch Ledger dark token system with green-terrain map tiles (Direction A — Night Dispatch).

## Standing Directives Given This Session

- "Option 3 confirmed. Commit. Proceed." — authorized the checkpoint commit of Stage 1.5 work and the combined landing+tracking public experience strategy.
- "every skill required for the task to be done must be used… Skills are like manuals u must read." — skill discipline is a hard requirement, max 5 in context at a time.
- "Remove this header while u are at it [DemoBanner screenshot]… I want to make sure it's no longer there." — global demo banner strip enters slice-1 scope (Task 5). Note: this model cannot view images; the banner was identified from code instead (`components/demo-banner.tsx` rendered in `app/layout.tsx:36`).
- "When u are done with this one task. Take a pause and write a session handoff." — stop after Task 3's review cycle and hand off; done (handoff at `/tmp/opencode/livetrack-landing-handoff.md`).
- Victor supplied Carto credentials (endpoint, API key JWT, MCP URL) for the tracking map. Stored in `.env` only (gitignored, verified). Reserved for slice 2; slice 1 uses OpenTopoMap/Esri and needs no key.

## Key Decisions

1. **Direction A (Night Dispatch)** over light-theme Field Office (B) and split-theme (C): keeps the committed token system, maximizes the green-terrain impact inside a dark frame, makes the demo itself the brand.
2. **Honesty amendments to the spec**: the demo status line shows distance-to-go and percent, never speed (60 s over 189.5 km ≈ 11,370 km/h — any shown speed is absurd or invented); demo chips show true server-fetched statuses (`revalidate = 30`) because 5 of 6 demo shipments are delivered.
3. **Route data is static**: OSRM geometry fetched once into `lib/route-data/london-birmingham.json` (2,320 points, 189.5 km). No runtime routing API, no new dependencies.
4. **One shared map core (`RouteMap`) with a `DemoSource`** — the seam the tracking page (slice 2) plugs a `LiveRouteSource` into.
5. **Anon-key existence check** powers the tracking form's real not-found state (RLS public read verified by REST probe).

## Work Completed

- Stage 1.5 checkpoint commit `fc86f7d` (36 files, Victor-authorized).
- Spec committed `92c8ddf` + amendments `b5d0c35`; plan with complete code for 6 tasks committed `b5d0c35`, fixed `e8353b4`.
- Task 1 `55c452f`: `scripts/fetch-route.mjs` + route JSON. Review: approved (minor: report typo, spec-inherited no-timeout/single-line-JSON).
- Task 2 `96ae102`: `lib/route-geometry.mjs` + 9/9 tests (TDD: genuine RED then GREEN). Review: approved (minor: empty-points crash is spec-inherited, import-level RED).
- Task 3 `fcc3e43`: `components/map/route-map.tsx`, `components/landing/hero.tsx`, interim `app/page.tsx`, `.lt-map-*` CSS. Reviewer verified and approved five deviations from plan-verbatim code: dynamic `ssr:false` import (Leaflet/window), lazy ref reads in the rAF loop (react-leaflet mount order), minimal TS casts, memoized initial traveled polyline (prevented reset-on-rerender), truck-specific `:has()` selector for checks. Known minors: no dynamic loading fallback, Esri fallback untested at runtime, brief prose/code footer contradiction flagged for final review.
- `.env`: added `CARTO_API_BASE_URL`, `CARTO_API_KEY`, `CARTO_MCP_URL` (never committed; values not reproduced here).

## Verification Evidence

- OSRM route fetch: code Ok, 2,320 points, 189.5 km (verified twice: probe + fetcher run).
- Tile reachability probes: OpenTopoMap 200, Esri 200, OSM 200.
- Geometry tests: 9/9 pass, pristine output.
- Task 3 browser verification: truck marker moves over 5 s, 18 tile elements load, SSR 200, tsc 0 errors, lint 0 errors (12 pre-existing warnings in untouched files), reduced-motion static path verified.
- Supabase probes: anon read of shipments by tracking_number returns data (RLS allows); demo statuses enumerated.

## Deviations / Incidents

- `detail-hawk` subagent type fails: "Model not found: opencode/deepseek-v4-flash-free" — reviewers dispatched as `general` instead.
- Transient git error "confused by unstable object source data" during one commit; `git fsck` clean, retry succeeded (dev-server watcher race).
- Task 3's plan-verbatim code did not run as written; implementer fixed four defects and the reviewer confirmed a fifth (memoized traveled polyline). Plan's Task 6 audit script corrected in `e8353b4` (`:has()` truck selector, `git add app components lib`).

## Handoff

Full handoff with exact resume protocol, environment facts, approved deviations, and hard rules: `/tmp/opencode/livetrack-landing-handoff.md`. Tasks 4–6 remain: tracking-search FSM, page assembly + DemoBanner removal, final audit + gates, then the whole-branch review.

## Next Session

Resume at Task 4 via the subagent-driven-development skill and the ledger at `.superpowers/sdd/progress.md`. Do not re-dispatch tasks 1–3; do not revert the five approved Task 3 deviations.
