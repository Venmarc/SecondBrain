> **Vault sync:** Copied from `Documents/Port Sites/Category 5/Momentum/` on 2026-07-09. Edit the project folder first; re-sync the vault after doc changes.

# PHASES.md
 
**Project:** Momentum
**Document Type:** Development Phases & Execution Roadmap
**Last Updated:** July 6, 2026
**References:** PRD.md · TRD.md · UIUX_BRIEF.md · PAGE_SPECS.md · APP_FLOW.md · SCHEMA.md · INSIGHTS.md · DEV_NOTES.md · AGENT_CONTEXT.md
 
This is the last doc written and the first one an agent checks every session. It controls what gets built and when. Nothing outside the active phase gets built — not because of bureaucracy, but because scope drift is what killed the last version of this project.
 
---
 
## Overarching Rules (Read Before Every Session)
 
- **Prioritize daily personal usability over polish.** A working ugly feature beats a broken beautiful one.
- **No phase is complete until you — the developer — have personally tested it with real interactions.** An agent saying it's done means nothing.
- **Every change maintains performance, responsiveness, and consistent headers/navigation.** These are not post-phase cleanup items.
- **If something feels like SaaS bloat or over-engineering → cut it.** Check PRD.md Non-Goals first.
- **Update this file whenever a phase is completed, a task is added, or a doc changes.** Stale PHASES = guaranteed drift.
- **Agents: state the active phase at the start of every response. Do not build anything outside it.**
---
 
## Honest Timeline (From July 6, 2026 — Fresh Start)
 
Working part-time (evenings + weekends). No delusions.
 
| Phase | Work Days | Calendar Time |
|---|---|---|
| Phase 0: Foundation | 2–3 days | Week 1 |
| Phase 1: Core Daily Experience | 7–10 days | Weeks 2–3 |
| Phase 2: Fitness & Progress | 8–10 days | Weeks 4–6 |
| Phase 3: Polish, Notifications & Landing | 5–7 days | Weeks 7–8 |
| Phase 4: Dogfooding & Ship | 14–21 calendar days | Weeks 9–11 |
 
**Realistic ship target: mid-September 2026.** Not August. That deadline is dead — it was already July when the fresh start happened. September is honest. Hold to it.
 
---
 
## Phase 0: Foundation & Setup
 
**Goal:** Working base. Nothing is built twice later because the foundation was wrong.
 
**Status:** 🔲 Not started
 
**Deliverables:**
 
*Documentation (complete — done July 6, 2026):*
- [x] AGENT_CONTEXT.md
- [x] PRD.md
- [x] TRD.md
- [x] UIUX_BRIEF.md
- [x] SCHEMA.md
- [x] INSIGHTS.md
- [x] APP_FLOW.md
- [x] PAGE_SPECS.md
- [x] PHASES.md
- [x] DEV_NOTES.md
*Project Setup:*
- [ ] Fresh Next.js 16 project. TypeScript strict mode. ESLint configured.
- [ ] Tailwind CSS + shadcn/ui installed and configured.
- [ ] Design tokens from `UIUX_BRIEF.md` Section 2 added to `globals.css` and `tailwind.config.ts`. Every token. No hardcoded values anywhere from day one.
- [ ] `public/logo.svg` in place. Vercel default assets removed (`vercel.svg`, default favicon replaced).
- [ ] Supabase project created. All tables from `SCHEMA.md` migrated. RLS enabled and verified on every table.
- [ ] Clerk app created. Custom Session Tokens configured. `ensureProfile()` server action implemented in root layout.
- [ ] Clerk auth UI (`<SignIn />`, `<SignUp />`) fully custom-styled to match glassmorphism aesthetic. Zero default Clerk branding visible.
- [ ] Basic layout shell: fixed sidebar (desktop, 240px) + bottom nav (mobile, 64px). Glassmorphism surface. Correct tokens.
- [ ] Consistent header component (Back button / Logo · Title · Avatar). Used on every page.
- [ ] Route stubs for all protected pages (`/today`, `/habits`, `/fitness`, `/progress`, `/settings`) — blank pages that render the layout correctly and redirect unauthenticated users to `/login`.
- [ ] Landing page stub (`/`) — minimal placeholder. Just the route and basic layout. Full build is Phase 3.
- [ ] `next dev --webpack` confirmed working locally.
- [ ] No `middleware.ts` — protection handled via server components.
**Success Criteria — Declare Phase 0 Complete Only When:**
- [ ] App runs locally with `next dev --webpack`. No errors.
- [ ] Sign up, log in, log out all work. Clerk components look identical to the app — no visual break.
- [ ] Supabase profile row is created automatically on first login. Verified in Supabase dashboard.
- [ ] RLS tested: two test users cannot read each other's data. Confirmed, not assumed.
- [ ] Design tokens are in `globals.css`. Open any page and inspect — no hardcoded hex values in component styles.
- [ ] All protected routes redirect to `/login` when unauthenticated.
- [ ] Layout renders correctly at 375px (mobile) and 1440px (desktop). No horizontal scroll.
**Declared Complete:** [ ] Date: ___________
 
---
 
## Phase 1: Core Daily Experience
 
**Goal:** Make `/today` and `/habits` the daily driver. This phase is the entire product for most days of use. Get it right.
 
**Status:** 🔲 Not started
 
**Depends on:** Phase 0 complete.
 
**Deliverables:**
 
*`/today` — Daily Hub:*
- [ ] Full bento grid layout per `PAGE_SPECS.md` (exact column structure, desktop + mobile).
- [ ] Wellness snapshot: Mood tap cards (1–5), Energy tap cards (1–5), Sleep slider + tap-to-type. All save to `wellness_logs` with optimistic updates.
- [ ] Due habits section: list with tap-to-complete, optimistic update, checkmark + confetti animation. Inline note/difficulty expand.
- [ ] Date picker for past-day logging (`?date=` param, scoped data load).
- [ ] Quick Fitness card: "Start Workout" CTA (leads to `/fitness/log`). Shows today's session if exists.
- [ ] Key Metrics row: streak chips, 7-day adherence. Read from `habit_logs`.
- [ ] "This Week So Far" widget: placeholder Life Score + "Keep logging" message until Phase 2 insights are live.
- [ ] Loading skeletons for all sections. Empty states with clear CTAs. Error states with retry.
*`/habits` — Habits List:*
- [ ] Habit cards with streak, 30-day adherence bar, today's status indicator.
- [ ] Search (real-time, `?search=` URL param). Status filter (Active/Archived, `?status=`). Category filter (`?category=`).
- [ ] FAB → Create Habit modal. Full CRUD: create, edit, archive, delete (with confirmation modals).
- [ ] URL params preserved on Back navigation.
*`/habits/[id]` — Habit Detail:*
- [ ] Stats bar (best streak, current streak, 30d adherence, total completions).
- [ ] History heatmap (last 90 days, responsive, no horizontal scroll).
- [ ] Log Today section (visible only if due today and not logged).
- [ ] Past logs list (newest first, load more).
- [ ] Edit + Archive + Delete from overflow menu.
- [ ] Back button → `/habits` with preserved filters.
*Infrastructure:*
- [ ] `habit_logs` streak and adherence queries implemented (per `INSIGHTS.md` SQL patterns).
- [ ] Framer Motion entrance animations via `LazyMotion`. `useReducedMotion()` implemented. Profiled on mobile — no jank.
- [ ] ARIA labels on all interactive elements across Phase 1 pages.
- [ ] Toast notification system (glassmorphism, auto-dismiss, no persistence bugs).
- [ ] Custom confirmation modals everywhere. No `window.confirm()`.
**Success Criteria — Declare Phase 1 Complete Only When:**
- [ ] Full day of logging completed in under 20 seconds. Timed. If it takes longer, fix it.
- [ ] Habit created, logged, edited, archived, and deleted — full cycle, no bugs.
- [ ] Past-day logging works (`?date=` param) — data scoped correctly.
- [ ] Heatmap renders correctly at 375px with no horizontal scroll.
- [ ] Optimistic updates work for habit completion — UI responds instantly, reverts gracefully on failure.
- [ ] All entrance animations respect `prefers-reduced-motion`.
- [ ] App feels responsive and premium on both mobile (375px) and desktop (1440px).
- [ ] No console errors. No layout shifts. No toast persistence bugs.
**Declared Complete:** [ ] Date: ___________
 
---
 
## Phase 2: Fitness & Progress
 
**Goal:** Add fitness logging and build the "where you're winning or failing" layer. This is what makes the tagline real.
 
**Status:** 🔲 Not started
 
**Depends on:** Phase 1 complete.
 
**Deliverables:**
 
*`/fitness` — Hub + Logger:*
- [ ] `/fitness` hub: summary stats row, recent sessions list, "Start Empty Session" + "Browse Templates" buttons.
- [ ] `/fitness/log`: full active logger per `PAGE_SPECS.md` — editable name, exercise cards with inline set editing, "Add Exercise" drawer, rest timer, Finish flow with summary, discard guard.
- [ ] `/fitness/[id]`: past session detail, read-only, with edit option.
- [ ] `exercise_templates` — user's exercise library, favorites first, custom entry.
- [ ] All exercise data saves to `fitness_sessions` + `exercise_logs`. Total volume auto-calculated.
- [ ] Unsaved session guard on Back navigation.
*`/progress` — Progress & Insights (Phase 2 scope):*
- [ ] Weekly Summary Card: Life Score (formula from `INSIGHTS.md` Section 3.3) + trend arrow + one-sentence summary.
- [ ] Time range filter (7d / 30d / 90d). `?range=` URL param.
- [ ] Overview tab only (tabs 2–5 show "Coming soon" placeholder).
- [ ] Insights bento grid: 4 Phase 2 cards (adherence, best streak, sleep vs habits, workout vs energy). Per `INSIGHTS.md` Section 3.2.
- [ ] Charts: adherence trend line, volume trend bars, mood & energy lines. Recharts. Responsive. No horizontal scroll.
- [ ] Habit completion heatmap (90 days).
- [ ] `insights_cache` table populated on every write via trigger or server action post-write hook.
- [ ] "This Week So Far" widget on `/today` now live with real Life Score data.
*Infrastructure:*
- [ ] All `insights_cache` calculations implemented per `INSIGHTS.md`. Queries verified for correctness.
- [ ] `insights_cache` refreshes on `habit_logs`, `wellness_logs`, `fitness_sessions` writes.
- [ ] Progress page loads from cache first. Cache miss falls back to direct query. Renders in <800ms on mobile.
- [ ] ARIA labels on all chart elements and interactive components.
- [ ] Export functionality in `/settings` (JSON + CSV, date range).
**Success Criteria — Declare Phase 2 Complete Only When:**
- [ ] Workout logged start-to-finish without confusion. No unclear defaults. No missing feedback.
- [ ] Life Score is accurate — verify against manual calculation using the formula in `INSIGHTS.md`.
- [ ] Sleep vs habits correlation card shows a meaningful result after 7+ days of data.
- [ ] Progress page loads in <800ms on mobile (test with Chrome DevTools throttle).
- [ ] All charts render at 375px with zero horizontal scroll.
- [ ] Insights cache refreshes correctly after logging — Progress page reflects new data without manual reload.
- [ ] No Phase 1 regressions. Full daily log still completes in <20 seconds.
**Declared Complete:** [ ] Date: ___________
 
---
 
## Phase 3: Polish, Notifications & Landing
 
**Goal:** Make it delightful, add browser push notifications, and build the full landing page. Portfolio-ready.
 
**Status:** 🔲 Not started
 
**Depends on:** Phase 2 complete.
 
**Deliverables:**
 
*Micro-interactions & Delight:*
- [ ] Confetti on streak milestones (new personal streak record) and volume PRs.
- [ ] Spring animations on habit completion (per UIUX_BRIEF.md `--ease-spring`).
- [ ] Staggered entrance animations on all list views (habits, sessions, insight cards).
- [ ] Chart hover glassmorphism tooltips.
- [ ] Smooth tab transitions on `/progress` (no flash between tabs).
- [ ] All Phase 3 animations respect `prefers-reduced-motion`.
*Browser Push Notifications:*
- [ ] Service Worker registered on auth'd load.
- [ ] VAPID keys generated and stored as environment variables.
- [ ] Opt-in flow: notification banner on `/today` for Day 2+ users (not Day 1). Per `APP_FLOW.md` Section 4.6.
- [ ] Settings toggle with browser permission prompt. Denied state handled gracefully.
- [ ] Daily reminder notification: fires at user's preferred time (from `preferences`). "Time to log your day →" deep links to `/today`.
- [ ] `preferences.notifications_enabled` and reminder time saved to Supabase.
*`/progress` — Phase 3 Tabs:*
- [ ] Habits Deep Dive tab: per-habit adherence breakdown, most improved/declining.
- [ ] Fitness Trends tab: volume by week, frequency heatmap.
- [ ] Correlations tab: all cross-domain correlation cards from `INSIGHTS.md` Section 3.2.
- [ ] History tab: log history with date range and type filter.
- [ ] Confetti on new personal records (first time on page load if PR detected in cache).
*`/` — Full Landing Page:*
- [ ] Hero section: tagline, subheadline, "Try Demo" + "Sign Up Free" CTAs, glassmorphism background with cyan accent. Per `PAGE_SPECS.md` Section 1.
- [ ] Key Benefits bento grid (4 cards).
- [ ] Features overview with real app screenshots or GIFs.
- [ ] Personal story section.
- [ ] Footer with GitHub link + Terms + Privacy.
- [ ] SEO meta tags, Open Graph image.
- [ ] Lighthouse Performance ≥ 95 on landing page.
*Demo Mode:*
- [ ] Seed script: 30 days of realistic habits, wellness logs, 8 fitness sessions, pre-computed insights.
- [ ] Demo banner + "Reset Demo" in `/settings`.
- [ ] `?demo=true` URL param activates seeding post-auth.
*Error Pages:*
- [ ] `/not-found`: illustration + "Back to Today" CTA. Per `PAGE_SPECS.md`.
- [ ] `error.tsx`: calm fallback + retry.
- [ ] `global-error.tsx`: self-contained, inline styles only, no shared layout dependency.
*Accessibility & Settings:*
- [ ] Full ARIA audit across all pages. Every interactive element verified.
- [ ] Today page widget toggles in `/settings → Preferences` fully functional.
- [ ] `/terms` and `/privacy` pages built (static content).
**Success Criteria — Declare Phase 3 Complete Only When:**
- [ ] Demo mode loaded and fully functional — a stranger can experience the app without signing up.
- [ ] Landing page Lighthouse Performance ≥ 95.
- [ ] Browser push notification received on a real mobile device.
- [ ] All confetti and spring animations fire correctly. All respect `prefers-reduced-motion`.
- [ ] `global-error.tsx` tested by throwing a deliberate root error — it renders without imports failing.
- [ ] No Phase 1 or Phase 2 regressions.
- [ ] Full app Lighthouse Performance ≥ 90 on mobile (Today, Habits, Progress).
**Declared Complete:** [ ] Date: ___________
 
---
 
## Phase 4: Dogfooding & Ship
 
**Goal:** Use the app with real data. Fix friction at the root. Ship it.
 
**Status:** 🔲 Not started
 
**Depends on:** Phase 3 complete.
 
**The Dogfooding Contract:**
Log real habits, workouts, and wellness every day. No demo data. No faking it. The app either earns daily use or it doesn't, and that answer is the final QA pass.
 
**Deliverables:**
 
*Dogfooding:*
- [ ] Log real personal data for a minimum of **14 days within a 21-day window**.
  - Interruptions (illness, travel, life) are allowed — document them in `DEV_NOTES.md`.
  - No single interruption kills the project. Pause, resume, continue counting.
  - Screenshot or screen record the log each day before marking it counted.
- [ ] Every friction point discovered during dogfooding → root cause fix (not a workaround) → documented in `DEV_NOTES.md`.
- [ ] Progress/Insights must generate real, personal "aha!" moments. If they don't → fix the insight engine before declaring done.
*Shipping:*
- [ ] `README.md` updated: project story, tech stack, architecture decisions, screenshots, demo link.
- [ ] All environment variables documented in README (not values — variable names and where to get them).
- [ ] Final Vercel deployment. Custom domain configured (if applicable).
- [ ] SEO metadata confirmed live on deployed URL.
- [ ] Demo video recorded: real data + seeded demo, covers Today logging, Habits, Progress insights. Under 3 minutes.
- [ ] X / LinkedIn post written and scheduled (or posted). Includes demo link, tech used, personal story.
- [ ] All docs updated to reflect what was actually built. No doc should describe a feature that doesn't exist or omit one that does.
**Success Criteria — Project Is Shipped Only When:**
- [ ] 14 days of real personal data logged and screenshot-evidenced.
- [ ] Progress page shows real wins and failures from those 14 days. Not placeholder data.
- [ ] A hiring manager can open the app and understand what it does within 60 seconds without explanation.
- [ ] Demo video exists, is watchable, and shows the product honestly.
- [ ] README is complete, accurate, and includes a working demo link.
- [ ] Public post is live.
- [ ] All docs reflect the final state of the product.
**Declared Complete:** [ ] Date: ___________
 
---
 
## Anti-Drift Safeguards
 
**Before every build session:**
1. Read this file. Confirm the active phase.
2. Read `PRD.md` Non-Goals. If what you're about to build is in that list → stop.
3. If the task isn't in the active phase → stop and document why it belongs here first before doing it.
**Performance Gate (mandatory before declaring any phase complete):**
- Run Lighthouse on mobile (Chrome DevTools, mid-range throttle).
- Phase 1–3: ≥ 90 on Today, Habits, Progress.
- Phase 3 landing page: ≥ 95.
- No jank in main flows (Today logging, habit list, Progress charts) with Framer Motion enabled.
- Profile any heavy animated components. Address before moving on.
**Signs you're drifting:**
- You're building a feature not in the current phase.
- You're adding a settings option for something that has one right answer.
- You're refactoring code that works fine.
- You're polishing a page that isn't in the active phase.
- The agent is building something you didn't explicitly ask for.
If any of the above happen → stop → re-read PRD.md + this file → get back on track.
 
---
 
## Doc Change Log
 
This section tracks the last time each doc was meaningfully updated. Agents must update this table when they modify any doc.
 
| Document | Last Updated | Changed By |
|---|---|---|
| AGENT_CONTEXT.md | July 6, 2026 | Documentation session |
| PRD.md | July 6, 2026 | Documentation session |
| TRD.md | July 6, 2026 | Documentation session |
| UIUX_BRIEF.md | July 6, 2026 | Documentation session |
| SCHEMA.md | July 6, 2026 | Documentation session |
| INSIGHTS.md | July 6, 2026 | Documentation session |
| APP_FLOW.md | July 6, 2026 | Documentation session |
| PAGE_SPECS.md | July 6, 2026 | Documentation session |
| PHASES.md | July 6, 2026 | Documentation session |
| NOTES.md | July 6, 2026 | Developer |
