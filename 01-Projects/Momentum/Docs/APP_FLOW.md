> **Vault sync:** Copied from `Documents/Port Sites/Category 5/Momentum/` on 2026-07-09. Edit the project folder first; re-sync the vault after doc changes.

# APP_FLOW.md
 
**Project:** Momentum
**Document Type:** User Journeys, Navigation & Routing Flow
**Last Updated:** July 6, 2026
**References:** PRD.md · TRD.md · PAGE_SPECS.md · SCHEMA.md · PHASES.md · DEV_NOTES.md
 
This document defines every user journey through the app and the exact navigation behavior between routes. PAGE_SPECS defines what lives on each page. This document defines how users get there, what happens in between, and how they get back.
 
**Golden Rule:** No dead-end pages. No lost state. Every screen makes the next step obvious and the way back effortless.
 
---
 
## 1. Navigation Structure
 
### Desktop
- Fixed sidebar: Today · Habits · Fitness · Progress · Settings
- Top header: Logo (left) · Page title/context (center) · Avatar (right)
- Logo always links to `/today`
### Mobile
- Bottom navigation bar: Today · Habits · Fitness · Progress · Settings
- Header: Back button (subpages, left) · Page title (center) · Avatar (right)
- Logo is always solo on mobile (no text alongside it)
### Subpage Rule
Every subpage (`/habits/[id]`, `/fitness/log`, etc.) must have a prominent Back button in the header. The browser Back button must also work reliably. Tapping Back returns the user to the originating list or hub page — not to `/today`, not to the root.
 
### URL State Preservation
These params must be preserved across navigation, refresh, and browser back:
 
| Route | Preserved Params |
|---|---|
| `/habits` | `?category=`, `?status=active\|archived`, `?search=` |
| `/progress` | `?range=7d\|30d\|90d`, `?tab=overview\|habits\|fitness\|correlations\|history` |
| `/today` | `?date=YYYY-MM-DD` (for past-day logging) |
| `/fitness` | `?session=` (active session ID if mid-log) |
 
If a user refreshes `/habits?category=fitness&status=active`, they land back with those filters applied. Not the default view.
 
---
 
## 2. Authentication Flow
 
### First Visit (Unauthenticated)
```
/ (landing)
  → "Sign Up Free" CTA → /register (Clerk)
  → "Try Demo"  CTA    → see Demo Mode Flow (Section 3)
  → "Log In"    link   → /login (Clerk)
```
 
### Registration
```
/register
  → Clerk handles auth
  → On success → ensureProfile() runs (creates Supabase profile row)
  → Redirect → /today
  → Welcome state: empty habits list + "Add your first habit" CTA
```
 
`ensureProfile()` failure: Show error toast ("Something went wrong setting up your profile. Try again.") + retry button. Do not redirect. Do not show a broken `/today`.
 
### Login (Returning User)
```
/login
  → Clerk handles auth
  → On success → ensureProfile() runs (no-op if profile exists)
  → Redirect → /today (no welcome state — go straight to the daily view)
```
 
### Unauthenticated Access Attempt
Any protected route (`/today`, `/habits`, `/fitness`, `/progress`, `/settings`) redirects immediately to `/login`. After successful login, redirect back to the originally requested route — not always to `/today`.
 
### Logout
```
Avatar menu → "Log out"
  → Clerk session cleared
  → Redirect → / (landing)
  → All cached user data cleared from client state
```
 
---
 
## 3. Demo Mode Flow
 
Triggered by `?demo=true` on the landing page CTA or a direct URL.
 
```
/?demo=true (or "Try Demo" button on landing)
  → If unauthenticated → /register?demo=true → after auth → seed demo data → /today?demo=true
  → If authenticated   → seed demo data for current user → /today?demo=true
```
 
**Active Demo Mode:**
- Persistent "Demo Mode" badge visible on every page (top of sidebar on desktop, top header on mobile).
- "Reset Demo" button in Settings → clears seeded data → re-seeds fresh → /today?demo=true.
- Real data is never overwritten by demo seeding. They are isolated by `user_id`.
- Exiting demo: user navigates to Settings → "Exit Demo Mode" → clears demo data → normal /today.
---
 
## 4. Primary User Journeys
 
### 4.1 Daily Logging (Most Frequent — Optimize This Path)
```
Open app → /today
  → Quick wellness log (mood tap card → energy tap card → sleep slider/type)
  → Mark due habits complete (tap → optimistic update → animation)
  → Optional: add note or difficulty to a habit (inline expand, no navigation)
  → Quick workout log button → /fitness/log
  → Return to /today after session saved
  → Metrics row updates with new data
```
 
Target: full daily log in under 20 seconds. If any step in this flow adds friction → fix it at the root.
 
**Optimistic Updates:** Habit completion and wellness log changes update the UI immediately. If the server write fails, revert the UI and show an error toast with retry.
 
**Past-Day Logging:**
```
/today → Date picker in header → select past date → /today?date=2026-07-04
  → Same layout, same logging flow, but scoped to that date
  → "Viewing [Date]" indicator clearly visible
  → Return to today: tap "Today" in date picker or nav item
```
 
---
 
### 4.2 Habit Management
```
Sidebar/bottom nav → /habits
  → Browse habit cards (filtered by ?category, ?status)
  → Search: filter applies in real-time, URL updates with ?search=
  → Tap habit card → /habits/[id]
    → View stats, streak, history heatmap
    → Quick log for today (if not already logged)
    → Edit habit (inline or modal — not a new route)
    → Back button → /habits (filters preserved from URL)
  → FAB (Floating Action Button) → Create habit modal (overlay, no route change)
    → Save → modal closes → habit appears in list → success toast
```
 
**Archive vs Delete:**
- Archive: habit disappears from active list, accessible via `?status=archived`.
- Delete: confirmation modal → hard delete → cascade removes all `habit_logs`.
- Agents: use archive by default. Only delete if the user explicitly confirms permanent removal.
---
 
### 4.3 Fitness Tracking
```
Sidebar/bottom nav → /fitness
  → View recent sessions (cards: date, name, volume, duration)
  → "Start Empty Session" → /fitness/log (new session)
  → "Browse Templates" → template picker modal → select → /fitness/log (pre-filled)
```
 
**During a Session (`/fitness/log`):**
```
  → Add exercises (searchable library or custom name)
  → Per exercise: sets × reps × weight
  → Rest timer (optional, runs in-page — no navigation)
  → "Finish Session" → confirmation modal → save → success state → /fitness
```
 
Navigating away mid-session: gentle confirmation modal ("You have an unsaved session. Discard or save?"). Never silently lose data.
 
**Viewing Past Session:**
```
/fitness → tap session card → /fitness/[id]
  → Read-only view of all sets, volume, duration
  → Back button → /fitness
```
 
---
 
### 4.4 Progress & Insights Review
```
Sidebar/bottom nav → /progress
  → Default: Overview tab, 30d range
  → Life Score card + weekly summary (top)
  → Insights bento grid
  → Tab switching: URL updates with ?tab= (no full page reload)
  → Time range filter: URL updates with ?range= (data refetches)
  → Hover chart → glassmorphism tooltip
  → Drill-down (Phase 3): tap insight card → expanded view
  → Back from drill-down → /progress (tab and range preserved)
```
 
**Today Page Integration:**
```
/today → "This Week So Far" widget → "View full breakdown →" → /progress?tab=overview
```
 
---
 
### 4.5 Settings & Account
```
Avatar (header) or bottom nav → /settings
  → Tabbed interface (Account · Preferences · Data · About)
  → Changes save instantly (no "Save" button) with subtle success feedback
  → Back → previous page (not always /today)
```
 
**Data Export:**
```
/settings → Data tab → "Export Data" → date range picker → "Download JSON" or "Download CSV"
  → Triggers download immediately, no navigation change
```
 
**Notification Opt-in (Phase 3):**
```
/settings → Preferences tab → Notifications toggle (off by default)
  → Toggle on → browser permission prompt (native)
    → Granted → preferences.notifications_enabled = true → success toast
    → Denied  → revert toggle → info toast ("Enable in browser settings to use notifications")
```
 
---
 
### 4.6 Notification Permission Prompt — Phase 3 (In-App)
Triggered on Day 2+ of usage (not Day 1 — let the user experience the app first).
 
```
/today (on load, Day 2+ only, notifications_enabled = false)
  → Non-intrusive banner at top of page: "Want daily reminders? [Enable] [Not now]"
  → "Enable" → browser permission prompt
    → Granted → preferences.notifications_enabled = true → banner dismissed
    → Denied  → banner dismissed, never shown again (store dismissal in preferences)
  → "Not now" → banner dismissed for 7 days, then shown once more
```
 
This banner must not interrupt the logging flow. It appears above content, not as a modal.
 
---
 
## 5. Navigation & Return Patterns
 
### Back Button Behavior
| From | Back goes to |
|---|---|
| `/habits/[id]` | `/habits` (with filters from URL preserved) |
| `/fitness/log` | `/fitness` (with unsaved-changes guard) |
| `/fitness/[id]` | `/fitness` |
| `/progress` drill-down | `/progress` (tab + range preserved) |
| `/settings` | The page the user came from |
 
Never route Back to `/today` unless the user literally came from `/today`.
 
### Keyboard Shortcuts
- `Esc` → closes any open modal, drawer, or overlay. Does not navigate away.
- Browser Back → same behavior as the in-app Back button.
- Arrow keys → where appropriate in date pickers and sliders.
### Modal vs Navigation
Actions that do **not** need a new route (handle as overlay/modal):
- Create habit
- Edit habit
- View habit log detail for a single day
- Rest timer during fitness log
- Confirmation dialogs (delete, discard)
- Export date range picker
Actions that **do** need a new route:
- Habit detail + history (`/habits/[id]`)
- Fitness log (`/fitness/log`)
- Past session detail (`/fitness/[id]`)
---
 
## 6. Error & Edge Case Flows
 
### Network Error
```
Any write action fails → revert optimistic UI → toast: "Couldn't save. Check your connection." + Retry button
  → Retry succeeds → normal success state
  → Retry fails again → toast: "Still failing. Your data is safe — try again later."
```
 
### 404
```
Any unknown route → /not-found
  → Friendly message + "Back to Today" CTA
  → No dead end
```
 
### global-error (Unhandled Runtime Error)
```
Unhandled React error → global-error.tsx
  → Calm fallback UI: "Something went wrong." + "Try reloading" button
  → No stack trace visible to user
  → Error logged (console or future error service)
```
 
### Unsaved Changes
Any page with a form or active session: navigating away triggers a confirmation modal.
- "Discard changes" → navigate away.
- "Stay" → modal closes, user stays on page.
Never silently lose data.
### Session Expired / Auth Error
```
Any protected page → Clerk session invalid → clear local state → redirect /login
  → After login → redirect to last attempted route
```
 
---
 
## 7. Deep Linking & Performance
 
- All routes must be directly linkable and shareable (for portfolio/demo use).
- `/habits/[id]` → loads that specific habit with full history.
- `/progress?tab=correlations&range=30d` → loads directly in that state.
- All flows must remain fast with 365+ days of logged data (indexed queries, cache-first on Progress).
- No route should require more than one network round trip to render its primary content.
