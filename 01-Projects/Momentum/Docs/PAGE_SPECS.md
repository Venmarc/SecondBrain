> **Vault sync:** Copied from `Documents/Port Sites/Category 5/Momentum/` on 2026-07-09. Edit the project folder first; re-sync the vault after doc changes.

# PAGE_SPECS.md
 
**Project:** Momentum
**Document Type:** Page & Route Specifications
**Last Updated:** July 6, 2026
**References:** PRD.md · TRD.md · UIUX_BRIEF.md · APP_FLOW.md · SCHEMA.md · INSIGHTS.md · PHASES.md · DEV_NOTES.md
 
This is the largest doc in the project. It is the single source of truth for the layout, structure, function, and behavior of every route — from landing to legal. An agent must be able to build any page precisely from this document alone, cross-referencing UIUX_BRIEF.md for visual tokens and APP_FLOW.md for navigation logic.
 
**Core Rules (Apply to Every Page):**
- Mobile-first. Design at 375px. Scale up. Never the reverse.
- Glassmorphism surfaces, dark mode only. Tokens from UIUX_BRIEF.md Section 2. No hardcoded values.
- Every interactive element has an ARIA label and role.
- Every page has: a loading state (skeletons), an empty state (illustration + CTA), and an error state (toast or inline message + retry).
- No dead-end pages. Every screen makes the next step and the way back obvious.
- Consistent header structure across all pages. See UIUX_BRIEF.md Section 6.
- Touch targets ≥ 48px on all interactive elements.
---
 
## Route Map
 
| Route | Type | Priority |
|---|---|---|
| `/` | Public | High (portfolio front door) |
| `/login` | Public | High |
| `/register` | Public | High |
| `/today` | Protected | Critical (daily driver) |
| `/habits` | Protected | High |
| `/habits/[id]` | Protected | High |
| `/fitness` | Protected | High |
| `/fitness/log` | Protected | High |
| `/fitness/[id]` | Protected | Medium |
| `/progress` | Protected | High |
| `/settings` | Protected | Medium |
| `/terms` | Public | Low |
| `/privacy` | Public | Low |
| `/not-found` | Utility | Medium |
| `error.tsx` | Utility | Medium |
| `global-error.tsx` | Utility | Medium |
 
---
 
## 1. Public Pages
 
---
 
### `/` — Landing Page
 
**Purpose:** Portfolio front door and conversion page. Must impress a hiring manager in under 3 minutes and convert curious visitors into demo users or sign-ups. This is the only page a stranger sees before deciding whether to explore further.
 
**SEO:**
- `<title>` Momentum — Personal Habit & Fitness Tracker
- `<meta name="description">` The personal daily OS for habits and fitness that shows where you're winning or failing.
- Open Graph image: app screenshot featuring Today page with real data.
- Canonical URL set to the deployed domain.
**Layout (Desktop — top to bottom):**
 
**Hero Section (100vh)**
- Background: `--color-bg-primary` with a subtle radial gradient using `--color-accent-cyan` at low opacity (≈5%) in the top-right quadrant. Not a solid color, not a loud gradient.
- Logo (left-aligned or centered on mobile) using `public/logo.svg` + "Momentum" text. Logo behavior per UIUX_BRIEF.md Section 7.
- Tagline (H1): *"Your personal daily OS for habits and fitness — shows where you're winning or failing."* Font: `--font-heading`, bold, large (48px desktop / 32px mobile).
- Subheadline (body): One honest line. *"Built and dogfooded by a developer who actually uses it."* No marketing speak.
- Two CTAs side by side:
  - Primary: "Try Demo" — `--color-accent-green` fill. Triggers demo mode flow (see APP_FLOW.md Section 3).
  - Secondary: "Sign Up Free" — surface fill + `--color-border` border. Clerk registration flow.
- Both CTAs: Large (min 52px height). Press state: `scale(0.98)`. Touch-friendly.
- Scroll indicator at bottom of hero (chevron down icon, subtle bounce animation).
**Key Benefits Section**
- 3 or 4 cards in a bento-style responsive grid (2-col desktop, 1-col mobile).
- Each card: icon (Lucide) + short heading + one-sentence description.
- Content:
  1. "Log in under 20 seconds" — frictionless daily habit.
  2. "Statistical insights, no AI fluff" — correlations from real data.
  3. "Glassmorphism design with micro-delight" — premium feel.
  4. "Real progress toward getting stronger" — honest fitness tracking.
- Cards use `--shadow-card`, glassmorphism surface, entrance animation on scroll into view.
**Features Overview Section**
- Alternating layout (desktop): screenshot/GIF left + description right, then right + left.
- Mobile: image top, description below (stacked).
- Highlights: Today page bento layout, habit streak animation, Life Score on Progress, correlation insight card.
- Images: actual app screenshots or short looping GIFs. No stock imagery.
- Each feature: H3 heading + 2-3 sentence description + optional micro-stat ("14 habits logged in a single morning").
**Personal Story Section**
- Short, honest. Not a marketing block.
- One paragraph: why commercial trackers failed, why this was built, what's been achieved since.
- Optional: a single real screenshot with a caption (e.g., "Week 3 — streak alive, volume up 22%").
**Footer**
- Logo (solo, mobile behavior) + "Momentum" text.
- Links: GitHub repo · Terms · Privacy.
- Line: "Built with obsession for the craft."
- No cookie banners, no newsletter signup, no external trackers.
**Behavior:**
- Smooth scroll between sections (CSS `scroll-behavior: smooth`).
- Entrance animations on scroll into view for each section (Intersection Observer → trigger entrance variants from UIUX_BRIEF.md Section 8).
- No horizontal scroll at any viewport.
- Lighthouse Performance target: ≥ 95 (static page, no heavy data fetching).
**States:** No loading/empty states — fully static content. Error: if Clerk fails to load, CTAs show a toast ("Something went wrong. Try refreshing.").
 
---
 
### `/login` — Authentication (Login)
 
**Purpose:** Secure, branded entry point for returning users.
 
**Layout:**
- Full viewport. Background: `--color-bg-primary`.
- Centered card (max-width 420px, glassmorphism surface, `--shadow-elevated`).
- Logo + "Momentum" at top of card (linked to `/`).
- Clerk `<SignIn />` component — fully custom-styled:
  - Input fields: glassmorphism fill, `--color-accent-cyan` focus ring, `--font-body` text.
  - Buttons: match app primary button style (`--color-accent-green`).
  - Remove all Clerk default branding (logo, "Powered by Clerk", orange/gray palette).
  - Error messages: use `--color-text-secondary`, not Clerk defaults.
- "Don't have an account? Sign up" link → `/register`.
- Link to `/terms` and `/privacy` below the form (small, `--color-text-muted`).
**Behavior:**
- On success: `ensureProfile()` → redirect `/today`.
- On error: Clerk handles inline validation. No additional toast unless there's a network failure outside Clerk's control.
- No loading skeleton — Clerk handles its own loading state.
**Accessibility:** Form fields have explicit labels. Error messages linked to inputs via `aria-describedby`.
 
---
 
### `/register` — Authentication (Registration)
 
**Purpose:** First-time user entry. Creates the Clerk account and Supabase profile.
 
**Layout:** Identical structure to `/login`.
- Clerk `<SignUp />` component — same styling requirements.
- "Already have an account? Log in" link → `/login`.
**Behavior:**
- On success: `ensureProfile()` creates Supabase profile row → redirect `/today`.
- Welcome state on `/today` (first-time only): empty habits list with "Add your first habit" CTA visible immediately. No interstitial onboarding screen.
- If arriving with `?demo=true`: seed demo data after profile creation → redirect `/today?demo=true`.
---
 
### `/terms` — Terms of Service
 
**Purpose:** Legal requirement. Simple static page.
 
**Layout:**
- Standard content page. Header with logo (links to `/`) + "Terms of Service" title.
- Prose content. `--font-body`, `--color-text-primary`, generous line height.
- "Back to Home" link at top and bottom.
- Footer with links to `/privacy` and `/`.
**Behavior:** Fully static. No data fetching.
 
---
 
### `/privacy` — Privacy Policy
 
**Purpose:** Legal requirement. Simple static page.
 
**Layout:** Identical to `/terms` structure. Different content.
 
---
 
## 2. Protected App Pages
 
All protected pages share these requirements:
- Redirect unauthenticated users to `/login` (with `?redirect=` the original route).
- Desktop: Fixed sidebar (left, width 240px) + main content area.
- Mobile: Bottom navigation bar (fixed, 64px height) + scrollable main content.
- Header on every page: Back button or logo (left) · Page title (center) · Avatar (right).
- Avatar opens a dropdown: Profile · Settings · Log out.
---
 
### `/today` — Daily Hub
 
**Purpose:** The most important page in the app. The user opens this every day. It must make logging fast, satisfying, and complete in under 20 seconds. Every element earns its place by serving the daily logging goal.
 
**Header:**
- Left: Logo + "Momentum" (desktop) / Logo solo (mobile).
- Center: Greeting + today's date ("Good morning, [name] · Tuesday, July 6").
- Right: Life Score chip (compact number + color indicator) + Avatar.
- Below header: Date picker row — "← Yesterday · Today · →" with a calendar icon for arbitrary past dates. Selecting a past date adds `?date=YYYY-MM-DD` to the URL and scopes all data to that day.
**Bento Grid Layout (Desktop — 12 columns, 16px gap):**
 
```
[ Wellness: Mood (4) ] [ Wellness: Energy (4) ] [ Wellness: Sleep (4) ]
[ Due Habits (8 cols)                          ] [ Quick Fitness (4)   ]
[ This Week So Far (6 cols)                    ] [ Key Metrics (6)     ]
```
 
**Mobile layout (375px — stacked, full width, 12px gap):**
```
Wellness Row (horizontal scroll: Mood | Energy | Sleep)
Due Habits (full width)
Quick Fitness (full width)
This Week So Far (full width)
Key Metrics (full width)
```
 
---
 
**Section: Wellness Snapshot**
 
Three cards, side by side on desktop, horizontal scroll row on mobile.
 
*Mood Card:*
- Label: "Mood" (H4, `--font-heading`).
- 5 tap buttons arranged horizontally: 1 · 2 · 3 · 4 · 5 (or emoji equivalents).
- Selected state: `--color-accent-green` background + white text + `scale(1.05)` animation.
- Unselected: surface fill, `--color-text-secondary`.
- Min button size: 44px × 44px.
- If already logged today: shows current selection, tappable to change.
- Saves to `wellness_logs.mood` on tap. Optimistic update.
*Energy Card:* Identical structure to Mood. Saves to `wellness_logs.energy`.
 
*Sleep Card:*
- Label: "Sleep" + current value in `--font-mono` (e.g., **7.5h**).
- Slider: range 4.0 → 10.0h, step 0.5h. Full card width. Glassmorphism track, `--color-accent-cyan` fill.
- Tap the displayed value label → toggles to a `<input type="number">` field (min 4, max 10, step 0.5).
- On blur or Enter: validates, clamps to [4.0, 10.0], saves to `wellness_logs.sleep_hours`.
- Both slider and text input write the same field. They stay in sync.
- If already logged: shows existing value, interactive to update.
All three cards: entrance animation on load (staggered 50ms). Loading state: skeleton (shimmer, same card dimensions).
 
---
 
**Section: Due Habits**
 
- Section heading: "Today's Habits" + count chip ("4 of 7 done" — updates optimistically).
- Scrollable list (max height on desktop to avoid pushing other bento items).
- Each habit row:
  - Left: Circular checkbox (unchecked: `--color-border`. Checked: `--color-accent-green` fill + checkmark).
  - Center: Habit name (`--font-body`, `--color-text-primary`). Category chip below (small, `--color-text-muted`).
  - Right: Streak count (🔥 N, `--font-mono`). Note icon (opens inline note/difficulty input).
- Tap the checkbox → optimistic complete → checkmark animation → confetti burst (short). If server fails → revert + toast.
- Note icon → expands inline below the row (no navigation): difficulty selector (1–5 dots) + short text input. Save on blur.
- Completed habits slide to the bottom of the list with a strikethrough style.
- "All done!" empty state with a green checkmark animation when all habits are complete.
- FAB (bottom right of this section or floating): "Log Anything" → opens a modal with options: New Habit · Log Past Day · Start Workout.
Loading state: 3–5 skeleton rows.
Empty state: "No habits due today. [+ Add a habit]" — links to `/habits`.
 
---
 
**Section: Quick Fitness**
 
*No session today:*
- Card with "Start Workout" button (primary, `--color-accent-green`). Full card width.
- Below: "Browse Templates" text link → opens template picker modal.
*Session exists today:*
- Session name (H3) + duration elapsed or final duration.
- Volume chip: "X kg total".
- "View Session" button → `/fitness/[id]`.
- "Continue" button (if session was not explicitly finished) → `/fitness/log?session=[id]`.
Loading state: skeleton card.
 
---
 
**Section: This Week So Far**
 
- Life Score: large number (`--font-mono`, 48px) + trend arrow (↑ green / ↓ red / → neutral).
- One-sentence summary (auto-generated from `insights_cache.data.weekly_summary`).
- Two insight chips below: e.g., "Habits: 82% ↑" + "Volume: +18%". Tappable → `/progress`.
- "View full breakdown →" link → `/progress?tab=overview`.
Loading: skeleton (number placeholder + two line placeholders).
Empty (insufficient data): "Keep logging — your first insights appear after a few days."
 
---
 
**Section: Key Metrics**
 
Compact row of metric chips (horizontal scroll on mobile):
- Current longest habit streak: "🔥 12 days"
- 7-day adherence: "87%"
- Workouts this week: "3 sessions"
- Weight trend (if tracked in profiles): "+0.5kg this month"
Each chip: `--font-mono` value + small label below. Tappable → relevant section of `/progress`.
 
Loading: skeleton chips.
 
---
 
**Data Sources:** `wellness_logs`, `habit_logs`, `habits`, `fitness_sessions`, `insights_cache`. All scoped to `?date` param (defaults to today).
 
**Performance:** Today page must feel instant. Use RSC for initial data load. Optimistic updates for all writes. No full page refresh on any interaction.
 
---
 
### `/habits` — Habits List
 
**Purpose:** Browse, manage, and create all habits.
 
**Header:** Logo + "Habits" title + Avatar.
 
**Layout (top to bottom):**
 
*Search & Filter Bar:*
- Search input (full width on mobile, 280px on desktop). Placeholder: "Search habits…". Real-time filter — updates list as user types. URL updates with `?search=`.
- Status tabs: "Active" | "Archived" (default: Active). Switching adds `?status=` to URL.
- Category dropdown: All · Fitness · Nutrition · Mindfulness · [custom]. Adds `?category=` to URL.
*Habit Grid/List:*
- Toggle between grid (2-col) and list (1-col) on desktop. Mobile: always list.
- Each habit card:
  - Habit name (H3, `--font-heading`).
  - Category chip (small, colored per category).
  - Streak indicator: 🔥 N days.
  - 30-day adherence: colored percentage bar (green if ≥ 70%, amber if 40–69%, red if <40%).
  - Today's status: green dot (completed) / amber dot (due, not done) / gray dot (not scheduled today).
  - Tap card → `/habits/[id]`.
- Card: glassmorphism surface, `--shadow-card`. Press state: `scale(0.98)`.
- Entrance animation: staggered 50ms per card.
*FAB (Floating Action Button):*
- Bottom right, always visible (above bottom nav on mobile).
- Icon: `+` (Lucide `Plus`). Background: `--color-accent-green`. Size: 56px.
- Tap → "Create Habit" modal (no route change).
- ARIA: `aria-label="Create new habit"`.
**Create Habit Modal:**
- Habit name input (required).
- Category select.
- Recurrence: Daily | Weekdays | Custom (day picker). Default: Daily.
- Description (optional, textarea).
- "Save" → creates row in `habits` table → modal closes → new card enters list (top) with entrance animation → success toast.
- "Cancel" / `Esc` → modal closes, no changes.
**States:**
- Loading: 4–6 skeleton cards.
- Empty (active): "No active habits. Create your first one." + FAB highlight.
- Empty (archived): "No archived habits."
- Search no results: "No habits matching '[term]'." + "Clear search" link.
- Error: "Couldn't load habits." + Retry button.
**Data Sources:** `habits`, `habit_logs` (for streak and adherence).
 
---
 
### `/habits/[id]` — Habit Detail
 
**Purpose:** Deep dive into a single habit's history and performance.
 
**Header:** Back button (→ `/habits`, preserving URL params) · Habit name · Avatar + overflow menu (Edit · Archive · Delete).
 
**Layout (top to bottom):**
 
*Stats Bar (4 chips, horizontal scroll on mobile):*
- Best Streak: "N days"
- Current Streak: "N days" (🔥 if ≥ 3)
- 30-Day Adherence: "X%"
- Total Completions: "N"
All values in `--font-mono`.
*History Heatmap:*
- Calendar-style grid: last 90 days (3 months, 7 columns).
- Each cell: completion status. Green = completed. Surface = not completed. Gray = not scheduled.
- Hover (desktop): tooltip with date + completion status + difficulty rating.
- Mobile: tap to see tooltip (dismisses on tap elsewhere).
- Responsive: scales down gracefully, no horizontal scroll.
*Log Today Section (if not yet logged today):*
- Visible only if the habit is due today and not yet logged.
- Compact inline form: "Mark complete" button + optional note input + difficulty selector (1–5 dots).
- Submit → optimistic update → updates stats bar immediately.
*Past Logs List:*
- Chronological (newest first). Shows last 30 entries by default. "Load more" to fetch older.
- Each row: date (short format) + completion status icon + difficulty dots (if logged) + note excerpt (if any, expandable).
- Empty: "No logs yet for this habit."
*Edit Habit:* Opens the same modal as habit creation, pre-filled. Accessible from overflow menu.
 
*Archive:* Confirmation modal ("Archive this habit? It'll be hidden from your active list but you'll keep all your logs.") → archive → redirect `/habits`.
 
*Delete:* Separate confirmation modal with stronger warning ("Permanently delete this habit and all N logs? This cannot be undone.") → delete → redirect `/habits`.
 
**States:**
- Loading: skeleton stats bar + skeleton heatmap.
- Error: "Couldn't load habit details." + Retry + Back button.
**Data Sources:** `habits`, `habit_logs`.
 
---
 
### `/fitness` — Fitness Hub
 
**Purpose:** Overview of recent workout sessions and entry point to start or log a new session.
 
**Header:** Logo + "Fitness" + Avatar.
 
**Layout (top to bottom):**
 
*Summary Stats Row (horizontal scroll on mobile):*
- Sessions this week: N
- Total volume this week: N kg
- Avg session duration: N min
All in `--font-mono`. Pulls from `fitness_sessions` (current week).
*Primary Action Buttons (side by side, full width on mobile):*
- "Start Empty Session" → `/fitness/log` (new blank session).
- "Browse Templates" → template picker modal.
*Template Picker Modal:*
- List of `exercise_templates` (user's saved templates) + a few suggested defaults.
- Search bar.
- Tap template → `/fitness/log?template=[id]` (pre-fills exercises).
- "Start blank" link → `/fitness/log`.
*Recent Sessions List:*
- Heading: "Recent Sessions".
- Cards (newest first, show last 10, "Load more" for older):
  - Session name (H3) + date (right-aligned).
  - Volume chip + Duration chip + Exercise count chip.
  - Tap → `/fitness/[id]`.
- Card: glassmorphism, `--shadow-card`, press state.
**States:**
- Loading: skeleton stats + 3 skeleton session cards.
- Empty (no sessions): "No sessions yet. Start your first workout." + "Start Empty Session" button.
- Error: "Couldn't load sessions." + Retry.
**Data Sources:** `fitness_sessions`, `exercise_templates`.
 
---
 
### `/fitness/log` — Active Workout Logger
 
**Purpose:** Log a workout in real time. Must be fast and intuitive. Previous versions of this were confusing — follow this spec precisely.
 
**Header:** Back button (with unsaved-changes guard) · Editable session name (tap to rename, default: "Workout – [Date]") · "Finish" button (top right, `--color-accent-green`).
 
**Sub-header (sticky below main header):**
- Duration timer: `HH:MM:SS`, `--font-mono`, auto-counting from session start.
- Total volume: updates live as sets are logged. `--font-mono`.
**Layout (main content area, scrollable):**
 
*Exercise Cards (one per exercise, stacked):*
Each exercise card contains:
- Exercise name (H3) + category chip. Tap name → rename (inline input).
- Sets table: columns = Set # | Reps | Weight (kg) | RPE (optional) | Delete.
  - Each set row is editable inline. Tap any value → number input opens.
  - Default values: last logged values for this exercise (from `exercise_logs`). Or template defaults. Or blank.
  - Bodyweight exercises: weight field shows "BW" placeholder, accepts "0" or bodyweight kg.
  - "Add Set" button at the bottom of each card. Adds a new row copying the values from the previous set.
  - Delete set: swipe left on mobile (reveals red delete) / small delete icon on desktop.
- "Remove Exercise" link (bottom of card, small, `--color-text-muted`). Confirmation: inline "Are you sure? Remove" — no modal needed.
*"Add Exercise" Button (sticky at bottom of content area, above keyboard on mobile):*
- Opens a drawer (slides up on mobile, modal on desktop):
  - Search bar (real-time filter).
  - List: user's `exercise_templates` (favorites first) + option to add custom by typing a name.
  - Tap exercise → closes drawer → new exercise card appears at bottom of list.
- "Add custom exercise" option: type name + optional category → adds to session + optionally saves to `exercise_templates`.
*Rest Timer (optional, in-page):*
- Accessible from a "Rest Timer" button in the sub-header.
- Expands a compact timer below the sub-header: countdown from configurable duration (60s, 90s, 2m, 3m — tap to select).
- Does not navigate away. Audio ping when done (if browser allows).
- Dismiss: "X" button on the timer bar.
**Finish Flow:**
- Tap "Finish" → bottom sheet slides up (mobile) / modal (desktop):
  - Summary: session name · duration · total volume · N exercises · N sets.
  - Optional notes textarea.
  - "Save Session" button (primary) → saves `fitness_sessions` + all `exercise_logs` → redirect `/fitness` → success toast.
  - "Keep editing" → closes sheet/modal, returns to logger.
**Discard Flow:**
- Tap Back → confirmation modal: "You have an unsaved session. [Discard] [Keep editing]".
- Discard → no data saved → navigate to `/fitness`.
**States:**
- Empty (no exercises added yet): "Add your first exercise to get started." + "Add Exercise" button centered.
- Loading (template load): skeleton exercise cards.
- Error on save: "Couldn't save session." + Retry. Do not navigate away on failure.
**Data Sources (writes):** `fitness_sessions`, `exercise_logs`. Reads: `exercise_templates`.
 
---
 
### `/fitness/[id]` — Past Session Detail
 
**Purpose:** Read-only view of a completed workout.
 
**Header:** Back button (→ `/fitness`) · Session name · Avatar.
 
**Layout (top to bottom):**
 
*Session Metadata Row:*
- Date · Duration · Total Volume · Exercise count. Chips in `--font-mono`.
*Exercise List (read-only):*
- One section per exercise.
- Each set: Set # · Reps · Weight · RPE (if logged). Styled as a compact table.
*Notes:* Displayed if notes were logged. Read-only.
 
*Edit option:* "Edit Session" button at bottom — opens a simplified edit mode (same layout, but inputs become editable). Save → update `fitness_sessions` + `exercise_logs` → success toast → return to read-only view.
 
**States:**
- Loading: skeleton rows.
- Error: "Couldn't load session." + Retry + Back.
**Data Sources:** `fitness_sessions`, `exercise_logs`.
 
---
 
### `/progress` — Progress & Insights
 
**Purpose:** Show the user exactly where they are winning and failing. This page must earn the tagline.
 
**Header:** Logo + "Progress" + Avatar.
 
**Top Section: Weekly Summary Card (full width, prominent)**
- Life Score: `--font-mono`, 64px, `--color-text-primary`. Trend arrow beside it.
- One-sentence summary (from `insights_cache.data.weekly_summary`).
- Sub-row: Habits adherence chip + Volume trend chip + Mood avg chip.
- "View detailed breakdown →" scrolls down to Insights grid.
- Card: glassmorphism, `--shadow-elevated`. Glassmorphism tooltip on Life Score: "Your composite score for habits, fitness, and wellness this week."
**Time Range Filter:**
- Pill tabs: 7d · 30d · 90d. Sticky below the summary card.
- Switching range → updates all charts and insights below. URL updates with `?range=`.
- Selected: `--color-accent-cyan` background.
**Tab Navigation:**
- Overview · Habits Deep Dive · Fitness Trends · Correlations · History.
- Tab switching: URL updates with `?tab=`. No full page reload.
- Phase 2: Overview tab only. Tabs 2–5 display "Coming soon" placeholder.
- Phase 3: All tabs active.
**Overview Tab (Phase 2):**
 
*Insights Bento Grid:*
- 4 cards wide on desktop (12-col: 3 cols each). 2-col tablet. 1-col mobile.
- Each insight card:
  - Icon (Lucide, 20px, `--color-accent-cyan`).
  - Title (H4, `--font-heading`).
  - Main metric: large number or % (48px, `--font-mono`, green or red based on direction).
  - One-sentence explanation (`--font-body`, `--color-text-secondary`).
  - Optional: small sparkline chart (Recharts, 60px tall, no axes).
- Card: glassmorphism, `--shadow-card`. Hover: tooltip with additional detail.
*Phase 2 insight cards (mandatory):*
1. Habit Adherence (30d) — "X% of habits completed"
2. Current Best Streak — "N days — [Habit Name]"
3. Sleep vs Habits correlation — "On good sleep nights, you complete X% more habits"
4. Workout days vs Energy — "Your energy is X on workout days vs Y on rest days"
*Charts Section (below bento grid):*
- Adherence trend line chart (30d): x = date, y = daily completion %. Recharts. Responsive. `--color-accent-green` line.
- Volume trend bar chart: weekly volume over last 8 weeks. `--color-accent-cyan` bars.
- Mood & Energy trend: two lines on one chart. `--color-accent-green` for mood, `--color-accent-cyan` for energy.
- All charts: glassmorphism tooltip on hover. No horizontal scroll. Responsive at all widths.
*Heatmap:*
- Habit completion heatmap: last 90 days, 7 columns (days of week), rows = weeks.
- Color scale: `--color-surface` (0%) → `--color-accent-green` (100%).
- Hover: tooltip with date + completion count.
**Habits Deep Dive Tab (Phase 3):**
- Per-habit adherence breakdown table.
- Most improved / most declining cards.
- Consistency score per habit.
**Fitness Trends Tab (Phase 3):**
- Volume per muscle group (if categorized).
- Frequency heatmap.
- PR tracking (implied by max weight logged per exercise).
**Correlations Tab (Phase 3):**
- All cross-domain correlations from INSIGHTS.md Section 3.2.
- Expandable cards with more detail on methodology.
**History Tab (Phase 3):**
- Log history with date range filter.
- Filterable by type (habits, wellness, fitness).
**States:**
- Loading: skeleton summary card + skeleton bento grid + skeleton charts.
- Insufficient data (< 3 days of logs): "Keep logging — insights appear after a few days of data." Life Score shows 0 with a "Building your baseline..." note.
- Error: "Couldn't load progress data." + Retry.
**Data Sources:** `insights_cache` (primary, for speed). Falls back to direct query if cache is stale. `habit_logs`, `wellness_logs`, `fitness_sessions`, `exercise_logs`.
 
---
 
### `/settings` — Preferences & Account
 
**Purpose:** User preferences and data management. Not complex. Not a SaaS settings page.
 
**Header:** Back button (→ previous page) · "Settings" · Avatar.
 
**Layout:** Tab navigation (horizontal pills, not sidebar). Tabs: Account · Preferences · Data · About.
 
---
 
**Account Tab:**
- Avatar: displays Clerk profile picture. Read-only (managed via Clerk account).
- Full name: editable inline text input. Saves on blur. Syncs to `profiles.full_name`.
- Username: editable. Validates uniqueness. Syncs to `profiles.username`.
- Height (cm): optional. Number input. Saves to `profiles.height`.
- Weight (kg): optional. Number input. Saves to `profiles.weight`. Noted as "used for volume tracking context."
- "Manage account" external link → Clerk account portal (opens new tab).
---
 
**Preferences Tab:**
 
*Week Start Day:*
- Toggle: Monday | Sunday. Default: Monday. Saves to `preferences.week_start_day`.
- Affects heatmap column order and weekly summary windows.
*Today Page Widgets:*
- Toggle list: Wellness Snapshot · Due Habits · Quick Fitness · This Week So Far · Key Metrics.
- Each toggle adds/removes the widget from `/today`. Saves to `preferences.today_widgets` (JSONB array).
- Habits and Wellness cannot be toggled off (always visible — they're the core daily log).
*Notifications (Phase 3):*
- Toggle: "Daily reminder" (off by default).
- When toggled on: triggers browser permission prompt.
  - Granted → `preferences.notifications_enabled = true` → success toast.
  - Denied → revert toggle → info toast: "Enable notifications in your browser settings to use this feature."
- Time selector appears when notifications are on: "Remind me at [time picker]". Default: 8:00 PM.
---
 
**Data Tab:**
 
*Export Data:*
- "Export as JSON" button + "Export as CSV" button.
- Date range picker: "From [date] to [date]". Default: all time.
- What's included: all `habit_logs`, `wellness_logs`, `fitness_sessions`, `exercise_logs`, and a snapshot of `insights_cache.data`.
- On click: triggers a server action → streams the file → browser download dialog. No navigation.
- Success: "Your data is downloading." toast. No modal.
*Demo Mode:*
- If in demo mode: "Reset Demo Data" button → confirms → re-seeds → success toast.
- "Exit Demo Mode" button → clears demo data → redirects `/today`.
- If not in demo mode: "Try Demo Mode" link → loads demo (see APP_FLOW.md Section 3).
---
 
**About Tab:**
- App version (from `package.json`).
- "View on GitHub" link (external, new tab).
- Tech stack credits (brief: Next.js · Supabase · Clerk · Tailwind).
- Links: Terms · Privacy.
- "Made with obsession for the craft."
**Behavior:**
- All preference changes save instantly (no "Save" button). Subtle success indicator (checkmark that fades out) beside the changed field.
- No page navigation required for any setting change.
**States:**
- Loading: skeleton form fields.
- Save error: inline error message beside the failed field + retry.
**Data Sources:** `profiles`, `preferences`. Auth managed by Clerk.
 
---
 
## 3. Error & Utility Pages
 
---
 
### `/not-found` — 404
 
**Layout:**
- Centered content, vertically and horizontally.
- Illustration: minimal line-art (custom or Lucide-based). Not a stock image.
- H2: "This page doesn't exist."
- Body: "You might have followed a broken link, or the page was moved."
- Primary CTA: "Back to Today" → `/today` (or `/` if unauthenticated).
- Secondary link: "Go to Home" → `/`.
**No sidebar. No bottom nav.** Just the message and the way out.
 
---
 
### `error.tsx` — Route-Level Error Boundary
 
**Layout:**
- Same as 404, different message.
- H2: "Something went wrong on this page."
- Body: "An unexpected error occurred. Your data is safe."
- Primary CTA: "Try reloading" (calls `reset()` from Next.js error boundary props).
- Secondary: "Back to Today" → `/today`.
- No stack trace visible to user.
**Trigger:** Any unhandled error within a specific route segment.
 
---
 
### `global-error.tsx` — App-Level Error Boundary
 
**Purpose:** Last-resort fallback when the root layout itself fails. Must be completely self-contained — it cannot rely on any shared layout, context, or component that might also be broken.
 
**Layout:**
- Standalone HTML. No shared layout.
- Must include its own `<html>` and `<body>` tags with inline dark background (`#0A0A0A`).
- Centered: Momentum wordmark (text-only — no SVG import that might fail) + H2: "Something went wrong." + "Reload" button (calls `reset()`).
- Minimal CSS — inline styles only. No Tailwind, no CSS modules, no external stylesheets.
- No navigation links (no guarantee routes are working).
**Important:** Reference the developer's research at `/home/redmane/Documents/Research_files/global-error-404-practices.md` before implementing this component. It contains specific Next.js App Router behavior notes.
 
---
 
## 4. Navigation & Routing Rules (Summary)
 
- Desktop: fixed sidebar (240px) + main content area.
- Mobile: fixed bottom nav (64px) + scrollable main content.
- Protected routes: redirect to `/login?redirect=[original_route]` if unauthenticated.
- After login: redirect to `?redirect` value, or `/today` as default.
- All subpages have a prominent Back button in the header.
- URL params are the source of truth for filters, dates, tabs, and ranges — not component state alone.
- Keyboard: `Esc` closes modals. `Tab` navigates interactive elements in logical order. Arrow keys in date pickers and sliders.
**Cross-Cutting Requirements:**
- Every page has loading skeletons (shimmer effect, same dimensions as content).
- Every page has an empty state with a clear CTA (never a blank screen).
- Every page has an error state with a retry mechanism.
- Optimistic updates on all write operations. Revert on server failure.
- Back buttons on all subpages. Browser back must work reliably.
**Maintenance Rule:**
When any route is added, changed, or removed — update this document immediately. Before adding a new page, check PHASES.md to confirm it's in scope for the current phase.
