> **Vault sync:** Copied from `Documents/Port Sites/Category 5/Momentum/` on 2026-07-09. Edit the project folder first; re-sync the vault after doc changes.

# PRD.md
 
**Project:** Momentum
**Document Type:** Product Requirements Document (Living Bible)
**Last Updated:** July 6, 2026
**References:** TRD.md · UIUX_BRIEF.md · PAGE_SPECS.md · APP_FLOW.md · SCHEMA.md · INSIGHTS.md · PHASES.md · NOTES.md
 
**Tagline:** Your personal daily operating system for habits and fitness — shows where you're winning or failing, and helps you make better decisions about both.
 
**Live URL:** https://peakmomentum.vercel.app
 
---
 
## The One Goal
 
Build a beautiful, simple, and genuinely useful personal habit + fitness tracker that the developer will actually use daily to build strength, consistency, and visible progress.
 
**Set this goal. Never stray from it. Every doc echoes it. Every agent checks against it.**
 
If a feature doesn't serve daily personal use or portfolio impact → it does not exist in this project.
 
---
 
## 1. Vision & Objectives
 
**Core Purpose**
A personal daily driver for habits and fitness. One user: the developer. It must be frictionless enough to open every day, log consistently for 30+ days post-"done," and clearly show where things are going well or falling apart.
 
**Primary Personal Goals (Non-Negotiable):**
1. **Daily Driver:** Frictionless enough to log every day. <20 seconds from open to logged.
2. **Personal Results:** Measurable progress toward fitness and habit goals. Visible wins, not just raw data.
3. **Portfolio Showcase:** Clean, premium-feeling design with excellent taste, micro-delight, responsiveness, and thoughtful details that impress in under 3 minutes.
4. **Finish & Ship:** Defined endpoint. Real usage. Demo video. Updated README. Public post.
5. **Design Practice:** Showcase glassmorphism + soft UI taste while keeping implementation fast and maintainable.
**Strict Non-Goals (These Do Not Exist In This Project):**
- Production-grade SaaS features or scalability ambitions.
- Multi-user, social, or community elements.
- Complex AI or chatbot — statistical trends only, no LLM content.
- Advanced fitness equipment, 1RM calculations, or complex logging.
- Over-engineering: Goals module, Wellness deep dives, heavy settings.
- Light mode unless trivially achievable and defined from project start.
- **Theme switching:** If a second theme is ever added, it must be specified in `UIUX_BRIEF.md` before a single line is written. Retrofitting a theme onto hardcoded dark styles will break the UI. Agents cannot reliably fix it after the fact.
**Design Accents:** Dark mode baseline with Electric Cyan `#00F0FF` for highlights, active states, chart accents, and success feedback. Vibrant green `#22C55E` for completions and positive trends. See `UIUX_BRIEF.md` for the full design token system.
 
**"Getting Jacked" Tracking:** Simple weight trend in `profiles` + fitness volume over time. No complex body metrics.
 
---
 
## 2. Target Audience
 
- **Primary:** The developer. Tech-savvy, fitness-focused, building real habits.
- **Secondary:** Hiring managers reviewing the portfolio. Must feel premium, personal, and like the developer actually uses it.
Value proposition: Quick daily logging + clear progress feedback that motivates continued use + a personal story that makes it real.
 
---
 
## 3. Core Features & Modules
 
### Must-Have Modules
 
**Habits Module** *(Primary daily tool)*
- Flexible recurrence: daily, weekdays, custom days.
- Quick logging with optional notes and difficulty (1–5).
- Streaks, adherence, history.
**Today Dashboard** *(Heart of daily use)*
- Unified view: due habits, quick wellness snapshot (mood/energy/sleep), workout quick-log, Life Score + summary.
- Logging must feel under 20 seconds and rewarding. Optimistic updates + micro-interactions mandatory.
**Fitness Logging** *(Simplified)*
- Quick session logging with templates.
- Sets/reps/weight with bodyweight-friendly defaults.
- Recent sessions, summary volume and duration.
- No complex equipment logic.
**Progress & Insights** *(The "why" layer — critical for retention)*
- Visualizations: heatmaps, adherence trends, strength/volume progress.
- Plain-English analysis: "winning/failing" signals, %, streaks, correlations.
- Fulfills the tagline. Must be present and useful from MVP.
- See `INSIGHTS.md` for full specification.
### Supporting Features
- High-converting Landing page for portfolio visitors and demo sign-ups.
- Authentication via Clerk, fully custom-branded to match glassmorphism aesthetic.
- Auto-created profile on first login (`ensureProfile()` server action).
- Responsive design + mobile-first everywhere.
- Demo/seeded data mode for portfolio showcase.
- **Data Export:** JSON + CSV from Settings. All logs, habits, insights snapshot. Date range filter.
- **Browser Push Notifications** *(Phase 3):* Daily reminder via Service Worker + VAPID keys. Free, no third-party billing. Opt-in from Settings.
### Out of Scope for v1
Dedicated Goals page, full Wellness page, advanced settings, PWA offline mode, complex exercise library, LLM coaching, social features.
 
---
 
## 4. User Flows & Experience Principles
 
**Critical Daily Journey:**
1. Open app → land on `/today`.
2. Log habits, wellness, and workout quickly.
3. See immediate feedback and progress.
4. Weekly check-in on Progress page for motivation.
**Experience Mandates:**
- **Micro-interactions & Delight:** Confetti on streak milestones, spring animations on habit complete, toasts, success states. Per `UIUX_BRIEF.md`.
- **Responsiveness:** Every card, button, skeleton, and container works at 375px. Zero horizontal scroll on core views.
- **Error Handling:** Custom modals and toasts everywhere. No raw browser alerts. Graceful empty states and loading skeletons.
- **Clerk Auth:** Fully styled. No visual disconnect with the rest of the app.
- **Accessibility:** WCAG AA minimum. ARIA on every interactive element.
- **Understandability:** Every feature should be explainable to someone with no tech background. If it needs a tutorial, simplify it.
See `APP_FLOW.md` and `PAGE_SPECS.md` for detailed routing and per-page behavior.
 
---
 
## 5. Non-Functional Requirements
 
- **Performance:** <300ms perceived latency on all interactions. Lighthouse ≥ 90 on mobile.
- **Design:** Premium glassmorphism + soft UI. Dark mode default. Vibrant green + cyan accents. Follow `UIUX_BRIEF.md` strictly. Use design tokens — never hardcode color, spacing, or typography values.
- **Maintainability:** Clean, readable code. No over-engineering.
- **Testing:** Heavy personal dogfooding + manual flows before marking any phase done.
- **Assets:** All logo and branding must use `public/logo.svg`. No Vercel default assets.
**Definition of Done (Non-Negotiable):**
A task is done when the developer can take a screenshot or video of it functioning and not need to change anything. No "it mostly works." No half-measures.
 
The project is done when:
- 14+ days of real personal usage logged within a 21-day window.
- Progress and Insights clearly communicate wins and failures.
- A hiring manager can look at it and say "this person knows what they're doing" — unprompted.
- Demo video recorded. README updated. Public post written.
- All docs are current and reflect what was actually built.
---
 
## 6. Development Phases & Timeline
 
See `PHASES.md` for the full roadmap. High-level target: core + real usage in 5–7 weeks part-time.
 
**Anti-Drift Rule:** Before any new feature or major change, re-read this PRD — specifically the Non-Goals list. If the thing you're about to build isn't here → stop and document why it belongs here first. Stale docs = guaranteed scope drift.
 
---
 
## 7. Documentation Structure
 
This PRD is the single source of truth for product decisions. All other docs stay aligned with this vision.
 
- `TRD.md` — Technical decisions and architecture.
- `UIUX_BRIEF.md` — Visual system and interaction patterns.
- `PAGE_SPECS.md` — Per-page layout and behavior. The largest doc — defines every page from landing to legal.
- `APP_FLOW.md` — User journeys and navigation. Defined before `PAGE_SPECS.md`.
- `SCHEMA.md` — Database schema and RLS.
- `INSIGHTS.md` — Insight engine specification.
- `PHASES.md` — What gets built and when.
- `DEV_NOTES.md` — Live developer log and decisions made during the build.
- `AGENT_CONTEXT.md` — Non-negotiables and orientation for AI coding agents.
