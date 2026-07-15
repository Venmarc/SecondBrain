> **Vault sync:** Copied from `Documents/Port Sites/Category 5/Momentum/` on 2026-07-09. Edit the project folder first; re-sync the vault after doc changes.

# INSIGHTS.md
 
**Project:** Momentum
**Document Type:** Insights & Analysis Specification
**Last Updated:** July 6, 2026
**References:** PRD.md · TRD.md · SCHEMA.md · UIUX_BRIEF.md · PAGE_SPECS.md · PHASES.md · DEV_NOTES.md
 
This document defines how Momentum fulfills its core tagline: **"shows where you're winning or failing."** It turns raw data from habits, fitness, and wellness into clear, actionable understanding. Every insight in this doc is statistical — no LLM, no hallucinations, no vague "AI-powered" language.
 
---
 
## 1. Purpose & Philosophy
 
**Insights vs Progress — The Distinction That Matters**
- **Progress Page** = The "What." Visualizations: charts, heatmaps, trend lines, volume over time, adherence graphs.
- **Insights** = The "Why." Plain-English sentences that connect the dots across habits, fitness, and wellness.
Both live on `/progress`. Insights are a prominent section — not buried below charts. They are what makes the tagline real and what brings the user back tomorrow.
 
**Core Goal:** Deliver "aha!" moments that are statistically honest and personally motivating. Every insight must be:
- **True** — backed by a real calculation, not an approximation or guess.
- **Scannable** — one sentence, one metric, one action.
- **Actionable** — it suggests what to do next, not just what happened.
- **Positive-first** — frame wins before warnings, but never hide failures.
**What Insights Are Not:**
- Not AI-generated text.
- Not predictions beyond simple linear trends.
- Not generic ("good job!") — always specific to the user's actual data.
---
 
## 2. Data Sources
 
All insights are derived from existing schema tables. No external data. No estimates.
 
| Source Table | What It Provides |
|---|---|
| `habit_logs` | Completion, difficulty, notes per day per habit |
| `wellness_logs` | Mood (1–5), energy (1–5), sleep hours per day |
| `fitness_sessions` | Session date, duration, total volume |
| `exercise_logs` | Per-set reps, weight, RPE per session |
| `profiles` | Weight over time (if tracked) |
 
See `SCHEMA.md` for full column definitions and types.
 
---
 
## 3. Insight Categories & Calculations
 
All calculations run in Postgres. Results are stored in `insights_cache.data` (JSONB) on every log write. See Section 6 for the cache strategy.
 
### 3.1 Habit Performance
 
**Adherence Rate**
```sql
-- Adherence % for a given period (replace interval as needed)
select
  h.id,
  h.name,
  count(hl.id) filter (where hl.completed = true) as completed,
  count(hl.id) as expected,
  round(
    count(hl.id) filter (where hl.completed = true)::numeric
    / nullif(count(hl.id), 0) * 100,
    1
  ) as adherence_pct
from habits h
left join habit_logs hl
  on hl.habit_id = h.id
  and hl.log_date >= current_date - interval '30 days'
where h.user_id = auth.jwt() ->> 'sub'
  and h.is_active = true
group by h.id, h.name;
```
Calculate for 7d, 30d, and 90d windows. Store all three in cache.
 
**Current Streak**
```sql
-- Consecutive completed days up to today, most recent first
select
  log_date,
  completed,
  log_date - (row_number() over (
    partition by habit_id
    order by log_date
  ))::integer as grp
from habit_logs
where habit_id = $1
  and completed = true
order by log_date desc;
-- Count rows sharing the same grp value that includes today
```
 
**Most Improved / Declining Habits**
Compare `adherence_pct` for current 14-day window vs previous 14-day window. Sort descending for Most Improved, ascending for Most Declining.
 
**Consistency Score**
```sql
-- Weighted average: weight harder habits (difficulty) more
select
  round(
    avg(
      case when hl.completed then 1.0 else 0.0 end
      * (1 + (coalesce(hl.difficulty, 3) - 1) * 0.1)
    ) * 100,
    1
  ) as consistency_score
from habit_logs hl
join habits h on h.id = hl.habit_id
where h.user_id = auth.jwt() ->> 'sub'
  and hl.log_date >= current_date - interval '30 days';
```
 
---
 
### 3.2 Cross-Domain Correlations
 
These are the insights that justify the tagline. Simple, honest percentage comparisons using SQL. No `corr()` in v1 — percentage lift is more readable.
 
**1. Sleep vs Habit Completion**
```sql
select
  case when wl.sleep_hours >= 7 then 'good_sleep' else 'poor_sleep' end as sleep_group,
  round(avg(case when hl.completed then 1.0 else 0.0 end) * 100, 1) as avg_completion_pct
from wellness_logs wl
join habit_logs hl on hl.log_date = wl.log_date
  and hl.user_id = wl.user_id
where wl.user_id = auth.jwt() ->> 'sub'
  and wl.log_date >= current_date - interval '30 days'
group by sleep_group;
-- Output: "On days with ≥7h sleep, you complete X% of habits vs Y% otherwise."
```
 
**2. Workout Days vs Energy/Mood**
```sql
select
  case when fs.id is not null then 'workout_day' else 'rest_day' end as day_type,
  round(avg(wl.energy), 2) as avg_energy,
  round(avg(wl.mood), 2) as avg_mood
from wellness_logs wl
left join fitness_sessions fs
  on fs.session_date = wl.log_date
  and fs.user_id = wl.user_id
where wl.user_id = auth.jwt() ->> 'sub'
  and wl.log_date >= current_date - interval '30 days'
group by day_type;
-- Output: "Your energy score is X on workout days vs Y on rest days."
```
 
**3. Volume Trend (Strength Progress)**
```sql
select
  date_trunc('week', session_date) as week,
  sum(total_volume) as weekly_volume
from fitness_sessions
where user_id = auth.jwt() ->> 'sub'
  and session_date >= current_date - interval '8 weeks'
group by week
order by week;
-- Compare last week vs 4-week average for trend direction and %
```
 
---
 
### 3.3 Life Score
 
A single composite number (0–100) representing the user's overall wellness and consistency this week. Shown prominently on Today and at the top of Progress.
 
**Formula (locked):**
```sql
-- All inputs normalized to 0–100 scale before weighting
-- habit_adherence_7d:   0–100  (% of habits completed this week)
-- avg_energy_7d:        0–100  (avg energy 1–5, scaled: value * 20)
-- avg_mood_7d:          0–100  (avg mood 1–5, scaled: value * 20)
-- fitness_sessions_7d:  0–100  (sessions this week * 25, capped at 100)
 
life_score =
  (habit_adherence_7d   * 0.40) +
  (avg_energy_7d        * 0.25) +
  (avg_mood_7d          * 0.20) +
  (fitness_sessions_7d  * 0.15)
```
 
**Display:**
- Big number in `--font-mono`, 48px, `--color-text-primary`.
- Trend arrow: green up if this week > last week, red down if lower, neutral dash if within ±2 points.
- Shown on: Today page (weekly summary widget) + Progress page top card.
**Edge cases:**
- Missing data for a category → that category contributes 0 to the score. Never `NULL`, never error.
- New user with <3 days of data → show score but display a "Building your baseline..." note below.
---
 
### 3.4 Weekly & Monthly Summaries
 
**Weekly Summary (plain English, auto-generated from data):**
Constructed by comparing current week vs previous week across the three domains.
 
Template: *"This week you [won/maintained/struggled] at [best metric] but [lost ground on/need to watch] [worst metric]."*
 
Examples the system must be able to generate:
- "This week you crushed consistency (+12% adherence) but strength volume dropped 18%."
- "Strong week — habits and energy both up. Keep the momentum."
- "3-day streak at risk on [Habit Name]. One log tomorrow locks it."
- "Volume dropped 22% this month. Last 4 weeks of sessions logged."
**Risk Flags (surface these visually):**
- Streak at risk: habit has been completed for N consecutive days and today is not yet logged (N ≥ 3).
- Volume drop: current 2-week volume < 80% of previous 2-week volume.
- Missed wellness log: no entry for today by 8pm (useful for notification trigger in Phase 3).
---
 
## 4. UI/UX Layout on `/progress`
 
All visual details — glassmorphism cards, bento grid, typography tokens — are in `UIUX_BRIEF.md`. This section defines the structure and content only.
 
**Top Section: Weekly Summary Card**
- Life Score (big number + trend arrow).
- One auto-generated sentence summary.
- Link: "View full breakdown →"
**Insights Grid (Bento-style)**
- 3–4 cards per row on desktop, single column on mobile.
- Each card contains: icon + title, main metric (e.g., "+23%"), one-sentence explanation, optional sparkline.
- No card should require more than 5 seconds to understand.
**Section Tabs:**
1. Overview *(default)*
2. Habits Deep Dive
3. Fitness Trends
4. Correlations
5. History
*(Tabs 2–5 are Phase 3. Phase 2 builds Overview only.)*
 
**Today Page Integration:**
- Small "This Week So Far" widget: Life Score + 1–2 key insights + link to full Progress page.
- This widget is a `today_widgets` option in `preferences` — user can toggle it off.
**Micro-interactions:**
- Hover tooltips on all metrics (glassmorphism style, per `UIUX_BRIEF.md`).
- Smooth transitions between time range filters.
- Confetti on new personal records (new streak high, new volume high).
---
 
## 5. Example Outputs (What the User Should Actually See)
 
The system must be capable of generating these — not as hardcoded strings, but derived from real calculations:
 
1. *"You completed 89% of habits this month — your best yet."*
2. *"Morning habits are your strength (+31% vs evenings). Consider shifting more tasks to mornings."*
3. *"Strength volume is up 18% from last month. You're getting jacked."*
4. *"Energy scores drop on days after missed workouts. Consistency is protecting your energy."*
5. *"Top habit driving your week: [Name] — 100% completion."*
6. *"3-day streak at risk on [Name]. Log it today."*
These are the standard against which the insights engine is evaluated during dogfooding.
 
---
 
## 6. Cache Strategy
 
**Table:** `insights_cache` (see `SCHEMA.md`).
 
**When to refresh:**
- On every `insert` or `update` to `habit_logs`, `wellness_logs`, or `fitness_sessions`.
- Implemented as a Postgres trigger or a server action post-write hook.
- No cron job in v1. Trigger on write is sufficient for personal-scale usage.
**What's stored in `data` (JSONB):**
```json
{
  "life_score": 74,
  "life_score_trend": "+5",
  "adherence_7d": 82.5,
  "adherence_30d": 78.0,
  "current_streaks": { "habit_uuid": 12 },
  "longest_streaks": { "habit_uuid": 21 },
  "weekly_summary": "Strong week — habits and energy both up.",
  "correlations": {
    "sleep_vs_habits": { "good_sleep_pct": 91, "poor_sleep_pct": 64 },
    "workout_vs_energy": { "workout_day_avg": 4.1, "rest_day_avg": 3.2 }
  },
  "volume_trend_pct": 18.2,
  "risk_flags": ["streak_at_risk:habit_uuid"],
  "last_calculated": "2026-07-06T14:32:00Z"
}
```
 
**Performance target:** All insights must load from cache in `<800ms` on mobile. Never calculate on the fly for the Progress page render.
 
---
 
## 7. Phase Scope
 
### Phase 2 — Build These
- Life Score + trend arrow.
- Adherence % (7d + 30d).
- Current streak per habit.
- 2 correlations: sleep vs habits, workout days vs energy.
- Weekly summary sentence on Today widget + Overview tab on Progress.
- `insights_cache` table with write trigger.
### Phase 3 — Extend These
- All 5 tabs on Progress (Habits Deep Dive, Fitness Trends, Correlations, History).
- Consistency Score.
- Most improved / most declining habits.
- Volume trend % with weekly breakdown.
- Risk flags surfaced as visual warnings.
- Confetti on personal records.
- Exportable insight report.
### Out of Scope (v1 and beyond unless explicitly added to docs)
- Full AI/coaching chatbot.
- Predictive modeling beyond simple week-over-week % comparisons.
- Social comparison.
- `corr()` Pearson correlation (percentage lift is clearer for personal use).
---
 
## 8. Maintenance Rules
 
- Any new insight type must be documented here before it is built.
- Monitor which insights drive real usage behavior during 14-day dogfooding.
- If an insight is never glanced at during dogfooding, remove it.
- Any change to the `insights_cache` JSONB structure requires updating Section 6 of this doc immediately.
**Success Criteria:**
During the 14-day dogfooding window, the user should regularly think "oh, that makes sense" or "I should do more of that" after opening the Progress page. If that doesn't happen, the insights aren't working — fix the content before fixing the presentation.
