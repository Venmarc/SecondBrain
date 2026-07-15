> **One-line Summary**: Durable lessons extracted from pre-rewrite Momentum DEV_NOTES (before archive). Use with the July 2026 rewrite — many apply to Phase 0+ even if scope changed.

# Momentum — Lessons from DEV_NOTES

**Source:** `Docs/DEV_NOTES.md` (archived 2026-07-09).  
**Context:** Dogfooding and drift notes from the pre-realignment build. The product goal was later rewritten; keep lessons, drop SaaS/wellness bloat ambitions.

---

## Scope & focus (29/06/2026 — critical)

- Scope drift killed progress: theme toggles, a11y perfectionism, Phase-4 polish before core daily usability.
- **Rule:** Stay on the active phase. Working ugly features beat broken beautiful ones.
- Explain the whole product to mom-level clarity. If you can't, the UX is wrong.
- ARIA where required; don't turn the app into an accessibility showcase at the cost of shipping.
- Theme-switching is hard for agents if not designed from tokens/roots — treat as deliberate phase work, not a side quest.

## Product integrity

- Data collection + charts alone do **not** fulfill "shows where you're winning or failing." Need clear win/fail criteria and decision support (can be statistical, not necessarily LLM).
- Gamification ≠ motivation. Fun that becomes game-like drifts from the tagline.
- Friend test: *What do I gain tomorrow? Why come back? What reminds me?* Retention > feature count.
- Privacy policy and honest non-functional footer links matter before any AI/data-export productization.
- Export that dumps raw JSON for pasting into an LLM is incomplete value.

## Habits UX / state

- Habit log details (notes, difficulty, context tags) must be **isolated per day and per habit**. Shared draft/placeholder state across days is a P0 bug.
- Category filters / active-vs-archived switches must not wipe or bleed log state.
- "Save details" ≠ "mark complete" — good. Disable Save when nothing changed.
- Metrics chrome (adherence, progress) needs documented logic: selected day vs rolling multi-day.

## Fitness UX

- Bodyweight vs weighted exercises: don't force weight on planks/pushups; optional body-weight reference once, not every set.
- RPE is valuable — label it in UI ("how hard did this feel, 1–10"), not bare "RPE".
- Sessions need **edit after finish** (missed set, wrong RPE, volume fix). Clarify timer/volume implications.
- Empty/unnamed workouts show as "Empty Workout" — naming on finish reduces confusion.
- Preset templates need the same log-shape rules as free sessions.

## Progress / charts

- Heatmaps and trend charts must fit mobile without horizontal overflow (or intentional, contained scroll). UIUX brief forbids casual horizontal scroll.
- Tooltip/"floating" follow-cursor UI must flip inward at edges so containers don't grow scrollbars. See [[03-Resources/Skills/Tooltip-Edge-Overflow|Tooltip Edge Overflow]].
- 1RM / PR labels need plain language for personal use.

## Chrome, errors, settings

- Prefer **in-app dialogs** over browser `confirm()` / `alert()`. See [[03-Resources/Skills/Browser-Native-Dialog-Trap|Browser Native Dialog Trap]].
- Nested routes (e.g. `/fitness/...`) must keep parent nav item active. See [[03-Resources/Skills/Nested-Route-Active-State|Nested Route Active State]].
- Theme hover/focus states must not leave black highlights or dead buttons in light mode. See [[03-Resources/Skills/Theme-Aware-Component-Checklist|Theme-Aware Component Checklist]].
- Settings: don't ship non-functional controls; schema columns (`dashboard_widgets` etc.) must match UI before "Save Preferences".
- Unsaved settings: prompt on leave; reload discards unsaved — once save works.

## 404 / global error

- 404 is for recovery, not entertainment. No sidebar games. Clear path home + useful links.
- `global-error` is a separate surface from `not-found`.

## Brand / color

- Canva sRGB vs CSS hex: same `#22C55E` can look lighter in Canva than on-page emerald. Site accents often render nearer `#10b981`. Align logo assets to **on-page** accent after inspection, then update apple-touch icons.

## Auth / infra notes still useful

- Hosted Clerk pages OK early; brand auth pages later.
- Profile sync via `ensureProfile()` can avoid public webhook tunnels in local dev.
- Prefer real dogfood time over agent "done".

## Related

- [[01-Projects/Momentum/Momentum|Momentum hub]]
- [[01-Projects/Momentum/Docs/PRD|PRD]] · [[01-Projects/Momentum/Docs/PHASES|PHASES]]
- [[04-Archive/Momentum/DEV_NOTES|Archived DEV_NOTES]]

**Tags:** #momentum #lesson #extraction
