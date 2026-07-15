> **Vault sync:** Copied from `Documents/Port Sites/Category 5/Momentum/` on 2026-07-09. Edit the project folder first; re-sync the vault after doc changes.

# SCHEMA.md
 
**Project:** Momentum
**Document Type:** Database Schema & Data Model
**Last Updated:** July 6, 2026
**References:** PRD.md · TRD.md · PHASES.md · DEV_NOTES.md
 
This document defines the PostgreSQL schema used in Supabase. Every table has Row Level Security (RLS). Users **cannot** access other users' data — this is enforced at the database level, not trusted to application logic. Verify RLS on every table after any schema change.
 
---
 
## Clerk Integration
 
Clerk user IDs (e.g., `user_2w2a6PJC4T4BfXDsg72AQsLNEyU`) are **strings, not UUIDs**. All `user_id` columns are `text` type. RLS policies use `auth.jwt() ->> 'sub'` to match the current user's Clerk ID.
 
Profile rows are created automatically via the `ensureProfile()` server action, which runs in the root layout on every authenticated load. There are no webhooks and no manual setup required during local development.
 
---
 
## 1. Core Tables
 
### `profiles`
Auto-created on first login via `ensureProfile()`. Stores basic user info synced from Clerk.
 
```sql
create table public.profiles (
  id           text primary key,   -- Clerk user_id (string, not uuid)
  full_name    text,
  username     text unique,
  height       numeric,            -- cm
  weight       numeric,            -- kg, updated over time
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);
 
alter table public.profiles enable row level security;
 
create policy "Users can view and update own profile"
  on profiles for all
  using (id = auth.jwt() ->> 'sub');
```
 
---
 
### `habits`
Defines a recurring habit. One row per habit. Logs are stored in `habit_logs`.
 
```sql
create table public.habits (
  id               uuid default gen_random_uuid() primary key,
  user_id          text not null,
  name             text not null,
  description      text,
  category         text,                 -- e.g. fitness, nutrition, mindfulness
  recurrence       text not null,        -- daily | weekdays | weekly | custom
  recurrence_days  integer[],            -- for custom (e.g. [1,3,5] = Mon/Wed/Fri)
  is_active        boolean default true,
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);
 
alter table public.habits enable row level security;
 
create policy "Users can manage own habits"
  on habits for all
  using (user_id = auth.jwt() ->> 'sub');
```
 
---
 
### `habit_logs`
One row per habit per day. Tracks completion, difficulty, and optional notes.
 
```sql
create table public.habit_logs (
  id          uuid default gen_random_uuid() primary key,
  habit_id    uuid references habits(id) on delete cascade,
  user_id     text not null,
  log_date    date not null,
  completed   boolean default false,
  notes       text,
  difficulty  integer check (difficulty between 1 and 5),  -- 1=easy, 5=hard
  created_at  timestamptz default now()
);
 
alter table public.habit_logs enable row level security;
 
create policy "Users can manage own habit logs"
  on habit_logs for all
  using (user_id = auth.jwt() ->> 'sub');
 
-- One log per habit per day — enforced at DB level
create unique index habit_logs_unique on habit_logs(habit_id, log_date);
```
 
---
 
### `wellness_logs`
One row per user per day. Captures mood, energy, and sleep as a daily snapshot.
 
```sql
create table public.wellness_logs (
  id           uuid default gen_random_uuid() primary key,
  user_id      text not null,
  log_date     date not null,
  mood         integer check (mood between 1 and 5),      -- 1=bad, 5=great
  energy       integer check (energy between 1 and 5),
  sleep_hours  numeric(3,1),                               -- e.g. 7.5. UI: slider (4–10h) + tap to type
  notes        text,
  created_at   timestamptz default now()
);
 
alter table public.wellness_logs enable row level security;
 
create policy "Users can manage own wellness logs"
  on wellness_logs for all
  using (user_id = auth.jwt() ->> 'sub');
 
-- One wellness log per user per day
create unique index wellness_logs_unique on wellness_logs(user_id, log_date);
```
 
**UI note:** `sleep_hours` is `numeric(3,1)` to store values like `6.5`, `7.0`, `8.5`. The UI renders a slider (range 4.0–10.0h, steps 0.5h) with an inline tap-to-type field for exact entry. See `UIUX_BRIEF.md` Section 10.
 
---
 
### `fitness_sessions`
One row per workout session. Contains session-level metadata. Exercise details live in `exercise_logs`.
 
```sql
create table public.fitness_sessions (
  id               uuid default gen_random_uuid() primary key,
  user_id          text not null,
  session_date     date not null,
  name             text,                   -- e.g. "Push Day", "Full Body"
  duration_minutes integer,
  total_volume     numeric,                -- optional total kg lifted (calculated or manual)
  notes            text,
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);
 
alter table public.fitness_sessions enable row level security;
 
create policy "Users can manage own fitness sessions"
  on fitness_sessions for all
  using (user_id = auth.jwt() ->> 'sub');
```
 
---
 
### `exercise_logs`
Individual sets within a fitness session. Cascades on session delete.
 
```sql
create table public.exercise_logs (
  id             uuid default gen_random_uuid() primary key,
  session_id     uuid references fitness_sessions(id) on delete cascade,
  user_id        text not null,
  exercise_name  text not null,
  set_number     integer not null,
  reps           integer,
  weight_kg      numeric,
  rpe            numeric,                  -- optional, 1–10 Rate of Perceived Exertion
  notes          text
);
 
alter table public.exercise_logs enable row level security;
 
create policy "Users can manage own exercise logs"
  on exercise_logs for all
  using (user_id = auth.jwt() ->> 'sub');
```
 
---
 
### `exercise_templates`
Reusable exercise definitions for faster logging. User-specific library.
 
```sql
create table public.exercise_templates (
  id                uuid default gen_random_uuid() primary key,
  user_id           text not null,
  name              text not null,           -- e.g. "Bench Press", "Pull-ups"
  category          text,
  default_reps      integer,
  default_weight_kg numeric,
  is_favorite       boolean default false
);
 
alter table public.exercise_templates enable row level security;
 
create policy "Users can manage own exercise templates"
  on exercise_templates for all
  using (user_id = auth.jwt() ->> 'sub');
```
 
---
 
### `preferences`
One row per user. Stores widget layout choices and app preferences.
 
```sql
create table public.preferences (
  user_id         text primary key,
  week_start_day  text default 'monday',    -- monday | sunday
  today_widgets   jsonb default '["habits", "wellness", "fitness", "metrics"]'::jsonb,
  notifications_enabled boolean default false,   -- browser push opt-in (Phase 3)
  updated_at      timestamptz default now()
);
 
alter table public.preferences enable row level security;
 
create policy "Users can update own preferences"
  on preferences for all
  using (user_id = auth.jwt() ->> 'sub');
```
 
---
 
### `insights_cache`
Stores pre-computed insight data for fast rendering on `/progress` and the Today widget. Avoids recalculating on every page load.
 
```sql
create table public.insights_cache (
  user_id          text primary key,
  data             jsonb not null,           -- Life Score, correlations, summaries, adherence
  last_calculated  timestamptz default now(),
  updated_at       timestamptz default now()
);
 
alter table public.insights_cache enable row level security;
 
create policy "Users can view and update own insights cache"
  on insights_cache for all
  using (user_id = auth.jwt() ->> 'sub');
```
 
Cache is invalidated and refreshed when a habit log, wellness log, or fitness session is created or updated. No cron job in v1 — trigger on write. See `INSIGHTS.md` for the full refresh strategy.
 
---
 
## 2. Indexes
 
Indexes for the queries that run on every page load and every insights calculation.
 
```sql
-- Habit logs: date-range queries for adherence and streaks
create index idx_habit_logs_user_date   on habit_logs(user_id, log_date);
create index idx_habit_logs_date        on habit_logs(log_date);
 
-- Wellness logs: date-range queries for mood/energy/sleep correlations
create index idx_wellness_logs_user_date on wellness_logs(user_id, log_date);
create index idx_wellness_logs_date      on wellness_logs(log_date);
 
-- Fitness sessions: date-range queries for volume trends
create index idx_fitness_sessions_user_date on fitness_sessions(user_id, session_date);
create index idx_fitness_sessions_date      on fitness_sessions(session_date);
 
-- Insights cache: direct user lookup
create index idx_insights_cache_user on insights_cache(user_id);
```
 
---
 
## 3. Demo / Seeded Data Mode
 
For portfolio showcase without real user data.
 
- **Trigger:** `?demo=true` URL param or toggle in Settings.
- **Seed script:** 30 days of realistic habits, wellness logs, 8 fitness sessions, and pre-computed insights.
- **UI indicator:** Persistent "Demo Mode" badge + "Reset Data" button (clears back to seeded state, non-destructive to real data).
- **Implementation:** Supabase seed function + a client-side reset server action.
- **Scoped:** Demo data is tied to the authenticated user's `user_id`. No shared demo account. No cross-user data exposure.
---
 
## 4. Views & Functions (for Insights)
 
Simple Postgres views or functions for common insight calculations. No complex ML. No LLM.
 
- Habit adherence % over 7d / 30d / 90d windows.
- Streak calculation using window functions (group by `date - row_number()` pattern).
- Weekly summary aggregates (total completions, avg mood, total volume).
- Basic correlations: avg habit completion on days with ≥7h sleep vs under.
Full implementation details in `INSIGHTS.md`.
 
---
 
## 5. Maintenance Rules
 
- Any new table, column, or index must be documented here immediately — before writing application code that depends on it.
- All new tables require RLS enabled and a tested policy.
- All `user_id` columns are `text` — never `uuid`. No exceptions.
- Schema changes that affect UX (new fields, renamed columns) must update `PAGE_SPECS.md` and `UIUX_BRIEF.md` as relevant.
- Run migrations with explicit RLS and index creation. Never rely on Supabase defaults for security.
**Update this file whenever the database changes. It is not optional.**
