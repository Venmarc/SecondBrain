<!--
AGENTS.md boot + session log template applied. This is a SESSION LOG (episodic history) under `06-Agent-Sessions/`.
-->

> **One-line Summary**: Shipped Ledger Phase 2 chunk P2-F (Dashboard v2 with BudgetHealth + GoalsPreview sections, tx→budget invalidation); started Claude-review fixes — added `--color-neutral-*` tokens to globals.css, paused mid-wiring of neutral into category-icon backgrounds across 4 files.

**Date:** 2026-07-23
**Agent:** OpenCode (GLM-5.2)
**Project:** [[01-Projects/Ledger/Ledger|Ledger]]

## Goal
- Plan and implement Phase 2 chunk P2-F (Dashboard v2 + tx→budget invalidation + goals nav on detail) for the Ledger personal-finance tracker.
- After P2-F landed: act on Claude's dashboard review doc (bugs + neutral color tokens + pattern doc updates).

## Standing Directives Given This Session
None this session. (Existing directives from `Documents/Port Sites/Category 5/Ledger/AGENTS.md` still apply — surgical changes, no phase-creep, no `git push` without approval, tokens-only for new UI.)

## User Prompts (Extracted, Not Compressed)

- **Prompt:** "U take a long time to respond almost everytime GLM. What's the cause? Is it from my side or ur side? Any fixes or I should just deal with it? I'm fine with that btw"
  **Overrode/Added:** None — diagnostic question. Answered honestly (large system prompt + skills list + backend inference + agentmemory overhead; offered `/clear`, disabling unused skills, faster model switch).

- **Prompt:** "We are gonna be working on my Ledger project. Read the project docs, starting from AGENTS.md. Read PHASE-2-OVERVIEW.md and plan chunk P2-F. Take as much time as u need. I just want everything correctly addressed and accurate"
  **Overrode/Added:** Kicked off P2-F planning. Required full doc reading (AGENTS.md, PHASES.md, PAGE_SPECS.md, TRD.md, ANTI_PATTERNS.md, plus codebase exploration) before any plan posted.

- **Prompt:** "yeah. proceed. But create the P2-F-PLAN file in /docs directory before u proceed."
  **Overrode/Added:** Required a plan file at `docs/P2-F-PLAN.md` as gate before any code edits.

- **Prompt:** "Now review the goals card in the dashboard. does it behave like a clickable card/button like the transactions listed in the dashboard? I see it has the press, but not the gray highlight when hovered. After that, review ~/claude-review.md for bugs to address in the dashboard. Claude mentioned some things to keep, somethings to remove. The doc is very details so append the section to their respective docs and add the neutral to global.css."
  **Overrode/Added:** Pivot from pure P2-F completion to Claude-review fixes. Confirmed the hover-gap bug myself by reading `TransactionRow` (which has `hover:bg-bg-elevated`). File path correction: actual file is `~/claude_review.md` (underscore), not `~/claude-review.md`.

- **Question/answer:** Three clarifying questions answered:
  1. **Category icon bg color** → "It has been mapped out in section 4 of the review, use that everywhere. Ledger review, ui color. First add it to app/global.css, then connect it to where it's supposed to display, which is the category icons' background."
  2. **Bug 1 (month-selector artifact)** → "Inspect the month selector. I think it's a stray text from a past/future month, probably june, so just shorten the width of the selector. I think that'd fix it. The text is the 'n' from Jun and 'A' from Aug. U get it now?"
  3. **Bug 2 (progress metric)** → "Option A. Relabel to plain informational text. For the 'add the neutral to global.css'. I was referring the the color values in Section 4 of the review. It contains css values for the neutral color, which we will add to app/global.css so it can be reused everywhere necessary, like the category icon backgrounds"

- **Prompt:** "STOP. Summarize whatever u are doing into ~/Documents/SecondBrain/06-Agents-Session folder. name it opencode-<slug>-<date>. First read ~/SecondBrain/Templates/Agent-Session-Summary.md. If context gets to about 150k-170k an internal server error will occur and I can't continue. So pls, just pause, even if u are in the middle of writing something. Summarize using the template guidance, and well continue in a new session."
  **Overrode/Added:** Hard stop. Write session summary now, even mid-edit. Resume in next session.

## Reference Files / Media
- `[[Documents/Port Sites/Category 5/Ledger/AGENTS.md]]` — project non-negotiables (theme, mobile-first, NGN-only, surgical scope).
- `[[Documents/Port Sites/Category 5/Ledger/docs/PHASE-2-OVERVIEW.md]]` — chunk table P2-A→P2-G, UI polish floor, motion tokens, non-neg short list.
- `[[Documents/Port Sites/Category 5/Ledger/PHASES.md]]` — Phase 2 deliverables + gate checklist + P2-A→P2-E completion log timestamps.
- `[[Documents/Port Sites/Category 5/Ledger/PAGE_SPECS.md]]` PAGE 4 (Dashboard) — layout/section spec for Budget Health + Goals Preview + Key Insight (excluded from Phase 2 scope per overview).
- `[[Documents/Port Sites/Category 5/Ledger/TRD.md]]` — §6.2 Colour semantics, §6.3 mobile-first constitution.
- `[[Documents/SecondBrain/ANTI_PATTERNS.md]]` — Clerk / Supabase / Next.js / CSS-token / overlay anti-patterns (read for context, not edited this session).
- `[[claude_review.md]]` (~/home/redmane, NOT in vault) — Claude's dashboard review: 2 confirmed bugs, category icon system mapping (13 Lucide icons), reusable patterns to standardise, neutral color token section (§4) with `--color-neutral`, `--color-neutral-hover`, `--color-neutral-muted`, `--color-neutral-border` values (#57534E etc. — warm stone-600 family).
- `[[Documents/Port Sites/Category 5/Ledger/app/globals.css]]` — token definitions, motion utilities, UI polish floor.

## Root Cause Log
| Symptom | Root Cause | Fix Applied | Confidence |
|---|---|---|---|
| Dashboard goals preview card missing grey hover highlight (transactions have it, new goal mini-card does not) | `MiniGoalCard` had `pressable` (active scale) but no `hover:bg-bg-elevated` — the active-state press works without the hover state | Added `hover:bg-bg-elevated` + `transition-[background-color,transform] duration-[var(--duration-fast)] [transition-timing-function:var(--ease-smooth)]` to `MiniGoalCard` className | Confirmed (code-level — visual confirm pending) |
| FAB-driven transaction creation does not refresh dashboard / `/budgets` budget cards | `invalidateTransactionReads` in `lib/hooks/use-transactions.ts` only invalidated `transactions` + `summary` query keys, not `budgets` (actuals are query-time sums of expense transactions, so budget cards go stale when txs mutate) | Added one line: `void queryClient.invalidateQueries({ queryKey: queryKeys.budgets.all() })` inside `invalidateTransactionReads` — covers create/update/delete/restore via single chokepoint | Confirmed (tsc passes; manual gate-check pending Victor) |
| Month-selector pill shows faint "n" (Jun) and "A" (Aug) glyphs bleeding outside the track (Claude review Bug 1, confirmed by Victor) | SnapSlider applies `.snap-slider-mask` (transparent 0% → #000 12% → #000 88% → transparent 100%), but at track width 7.5rem=120px with cell itemWidth=72px, only ~14px of mask fade leaves ~17px of neighbour glyph visible on each side | **NOT YET FIXED.** Plan: tighten the mask fade band locally on the month-selector track (more aggressive in/out fade) OR shorten track width. Victor prefers width shortening. Next session. | Confirmed (root cause) / Hypothesis (fix approach) |
| Month-summary sub-bar text "7% of income spent" reads like an implicit budget-progress bar while the Budget Health section shows "No budgets set" → two competing signals (Claude review Bug 2) | The progress bar + percentage-of-income text implies budget-progress semantics that don't exist when Budgets is empty | **NOT YET FIXED.** Approved fix = Option A: relabel to plain expense-to-income ratio text, e.g. "₦1,000 of ₦13,500 income spent this month" (drop percentage framing). File: `components/dashboard/month-summary-card.tsx` lines 85–92. Next session. | Confirmed (root cause) |

## Research Conducted
- **Searched/Consulted:** Read 15+ project files (AGENTS, PHASES, PAGE_SPECS, TRD, NOTES, anti-patterns, dashboard/budgets/goals/transactions components + actions + hooks, globals.css, query-keys, types, progress helpers) before posting the P2-F plan. Read Claude review doc end-to-end twice.
- **Should have been consulted but wasn't:** N/A — all relevant docs checked. Did NOT consult `lib/motion.ts` source (just used its exported `prefersReducedMotion`) — fine for this scope.

## Subagent Snags
- None this session. No subagents dispatched; no tool failures beyond a single bash output showing "no output" (which was the `tsc --noEmit` pass success, not an error).

## Decisions & Pivots

- **P2-F reuse over rebuild:** Reused `BudgetCard interactive={false}` for dashboard mini-cards (no separate `BudgetMiniCard` component — `BudgetCard` already has icon circle, name, limit label, progress bar, spent/limit/remaining text). Reused `ProgressRing size={48}` for goal mini-cards. Reused existing `BudgetCardSkeleton` + `GoalCardSkeleton` for loading states. No new primitives — every UI piece is an existing styled component.
- **Dashboard `monthKey` binding:** `BudgetHealth` bound to `monthKey` (month picker drives it; past months = read-only because BudgetCard always non-interactive on dashboard). `GoalsPreview` ignores month (goals have no month dimension). `RecentTransactions` always latest (matches PAGE 4 existing behaviour).
- **Goals nav on detail — already satisfied:** Both `components/sidebar.tsx:89` and `components/bottom-nav.tsx:17` use `pathname.startsWith(\`${item.href}/\`)`, so `/goals/[id]` already keeps the Goals nav item highlighted in desktop + mobile nav. **No code change required** — verified by reading. Documented in the plan file.
- **NOT réalisée dans P2-F:** Key Insight (PHASE-2-OVERVIEW says skip unless Victor adds it); recurring due banner (Phase 3); dashboard expense ratio bar from scratch (Phase 1 already shipped the visual element in `MonthSummaryCard`). Any "DashboardCard" shared shell refactor — flagged by Claude review §3 as a future cleanup, **not** part of P2-F scope or this review-fix scope.
- **Plan file before code:** Per Victor's directive, wrote `docs/P2-F-PLAN.md` with scope/files/tokens/mobile+desktop layout/data binding/verification before editing any code.
- **Category icon neutral bg scope:** Claude §2 wants ALL category icons on neutral background with shape (Lucide icon) as the identifier. Lucide icon mapping (13 icons table in §2) is a separate chunk ("the icon system to implement" Claude flagged). For this session, user explicitly said "background only" — so the in-progress scope was: swap the circle background `color-mix(in srgb, ${color} 28%, transparent)` to `var(--color-neutral-muted)` at 4 sites, keep the inner coloured dot (preserves colour signal until the icon system ships). **Paused before this swap was applied.**
- **Bug 1 fix approach:** Victor said "shorten the width of the selector" — investigate either narrowing the track width or tightening the mask fade band locally on `month-selector.tsx` (without touching the shared `.snap-slider-mask` utility). Did NOT patch yet.
- **Bug 2 fix approach:** Option A (plain expense-to-income text, drop percentage-as-budget framing). Approved by Victor.

## Steps Taken / Actions

1. **Boot:** read `Documents/Port Sites/Category 5/Ledger/AGENTS.md` + `docs/PHASE-2-OVERVIEW.md` + `PHASES.md`. `agentmemory_memory_recall` for "Ledger Phase 2 dashboard budgets goals P2-F" returned zero results.
2. **Read all relevant docs + code:** `TRD.md`, `ANTI_PATTERNS.md`, `PAGE_SPECS.md` (PAGE 4 + 7 + 8 + 9), existing dashboard components (header, month-summary-card, recent-transactions), budgets components (card, summary-bar, skeletons, form-sheet, view), goals components (card, view, detail-view, form-sheet, contribute-sheet, skeletons), shared (progress-bar, progress-ring, confirm-dialog), budgets/goals actions + hooks, query-keys, types, progress helpers, transactions hooks (for the invalidate chokepoint), sidebar + bottom-nav (to verify nested-route active state), dashboard page, NOTES.md.
3. **Wrote `docs/P2-F-PLAN.md`** with full scope, files-to-touch, design tokens, mobile/desktop layout, accessibility, verification, chunk log entry template.
4. **Implemented P2-F:**
   - Added one line to `lib/hooks/use-transactions.ts` (`invalidateTransactionReads` now also invalidates `queryKeys.budgets.all()`).
   - Created `components/dashboard/budget-health.tsx` (BudgetHealth section with loading/empty/error states, 4 budget cards max, reuses BudgetCard interactive={false}).
   - Created `components/dashboard/goals-preview.tsx` (GoalsPreview section with MiniGoalCard horizontal-scroll on mobile / vertical on desktop, ProgressRing size={48}).
   - Replaced placeholder `<aside>` in `app/(app)/dashboard/page.tsx` with `<BudgetHealth monthKey={monthKey} />` + `<GoalsPreview />` per PAGE 4 layout.
   - Ran `npx tsc --noEmit` → zero errors.
5. **Pivot to Claude review fixes:**
   - Read `TransactionRow` to confirm hover gap root cause.
   - Searched home folder, found `~/claude_review.md` (underscore, not hyphen).
   - Read entire review doc (99 lines).
   - Asked 3 clarifying questions (icon bg, Bug 1 approach, Bug 2 approach) — all answered.
6. **Started fix sequence (in-progress when paused):**
   - **DONE:** Added `hover:bg-bg-elevated` to `MiniGoalCard` (fixes the hover bug Victor flagged).
   - **DONE:** Added `--color-neutral`, `--color-neutral-hover`, `--color-neutral-muted`, `--color-neutral-border` to `:root` (dark) and `[data-theme="light"]` blocks in `globals.css`. Dark values straight from Claude's review §4 (#57534E etc., warm stone-600); light values picked for AA contrast (dark stone-600 main + `#F1EFEC` muted bg + `#D6D3D1` border).
   - **DONE:** Added `--color-neutral*` mappings to `@theme inline` in `globals.css` so `bg-neutral`, `text-neutral`, `border-neutral`, etc. work as Tailwind classes.
   - **PAUSED:** About to swap the 4 sites of `color-mix(in srgb, ${color} 28%, transparent)` → `var(--color-neutral-muted)` for category icon backgrounds. Grepped and found 4 sites: `components/budgets/budget-card.tsx:29`, `components/budgets/budget-form-sheet.tsx:174`, `components/transactions/transaction-row.tsx:69`, `components/categories/categories-manager.tsx:47`. Have NOT edited any of these 4 yet.
   - **NOT STARTED:** Bug 1 fix in `components/dashboard/month-selector.tsx` (narrow track / tighten mask).
   - **NOT STARTED:** Bug 2 relabel in `components/dashboard/month-summary-card.tsx` (lines 85–92 sub-bar text).
   - **NOT STARTED:** Doc updates: append neutral section to `UIUX_BRIEF.md` §2 (new subsection §2.8) + §8 iconography note; append patterns section to `UIUX_BRIEF.md`; append review + change log to `NOTES.md`.

## Files Touched

- `[[Documents/Port Sites/Category 5/Ledger/docs/P2-F-PLAN.md]]`
  - **Previous State:** Did not exist.
  - **After Change:** Full chunk plan file: scope, files-to-touch, tokens, mobile/desktop layout, data binding, a11y, verification, chunk log entry template.
  - **Related to:** User prompt "create the P2-F-PLAN file in /docs directory before u proceed."

- `[[Documents/Port Sites/Category 5/Ledger/lib/hooks/use-transactions.ts]]`
  - **Previous State:** `invalidateTransactionReads` invalidated only `transactions` + `summary` query keys.
  - **After Change:** Added `void queryClient.invalidateQueries({ queryKey: queryKeys.budgets.all() })` — FAB-driven transaction mutations now refresh budget cards.
  - **Related to:** PHASE-2-OVERVIEW non-neg #6 ("FAB transaction mutations invalidate budget queries").

- `[[Documents/Port Sites/Category 5/Ledger/components/dashboard/budget-health.tsx]]`
  - **Previous State:** Did not exist.
  - **After Change:** New BudgetHealth section component — heading + "View all →" link + loading (4×BudgetCardSkeleton)/empty ("Add a budget →")/error (+Retry)/list states. Reuses `BudgetCard interactive={false}`, slices `.slice(0, 4)`. Bound to `monthKey`.
  - **Related to:** PAGE 4 §BUDGET HEALTH spec.

- `[[Documents/Port Sites/Category 5/Ledger/components/dashboard/goals-preview.tsx]]`
  - **Previous State:** Did not exist.
  - **After Change:** New GoalsPreview section component — heading + "View all →" link + loading (3×GoalCardSkeleton)/empty ("Create one →")/error (+Retry)/list states. Includes inner `MiniGoalCard` Link with `ProgressRing size={48}`, title, amount, days-remaining tone via `formatGoalTargetLabel`. Pauses-then-launches horizontal scroll on mobile, vertical stack on desktop aside. **Has `hover:bg-bg-elevated` (added in step 6 after Victor flagged hover gap).**
  - **Related to:** PAGE 4 §GOALS PREVIEW spec; Root Cause Log row 1 (hover).

- `[[Documents/Port Sites/Category 5/Ledger/app/(app)/dashboard/page.tsx]]`
  - **Previous State:** Page held `monthKey` state + `DashboardHeader`, a `lg:grid-cols-5` layout with `MonthSummaryCard` + `RecentTransactions` in col-span-3, and a dashed placeholder `<aside class="hidden lg:col-span-2 lg:block">` saying "Budgets & goals / Coming in Phase 2 — keep logging transactions."
  - **After Change:** Aside now renders `<BudgetHealth monthKey={monthKey} />` + `<GoalsPreview />` (real data). The `hidden` class is gone — sections now show on mobile as part of the PAGE 4 mobile single-column flow. Updated component doc-comment to reflect Phase 2 vs the old "v1 only / deferred" note.
  - **Related to:** PHASE-2-OVERVIEW chunk P2-F deliverable #1.

- `[[Documents/Port Sites/Category 5/Ledger/app/globals.css]]`
  - **Previous State:** `--color-neutral*` tokens did not exist anywhere. Theme had orange/azure/green/amber/red families with `--color-*-muted` and `--color-*-hover` variants.
  - **After Change:**
    - `:root` (dark): added `--color-neutral: #57534E; --color-neutral-hover: #6B6560; --color-neutral-muted: #292524; --color-neutral-border: #44403C;` with a comment citing UIUX_BRIEF §2.8 (about-to-be-added) and explaining warm-stone choice.
    - `[data-theme="light"]`: added `--color-neutral: #57534E; --color-neutral-hover: #6B6560; --color-neutral-muted: #F1EFEC; --color-neutral-border: #D6D3D1;` (light-mode `--color-neutral-muted` is a pale warm tone, not dark — picked for AA contrast on white surface).
    - `@theme inline`: added `--color-neutral`, `--color-neutral-hover`, `--color-neutral-muted`, `--color-neutral-border` mapped to the CSS vars so Tailwind utilities work.
  - **Related to:** Claude review §4 + user prompt "add the neutral to global.css."

## Vault Updates This Session
- `[[ANTI_PATTERNS.md]]`: No changes — line count after edit: unchanged. Split triggered: N/A.
- Project `AGENTS.md` (`Documents/Port Sites/Category 5/Ledger/AGENTS.md`): No changes — no new Session Conduct rule.

## Open Questions & Next Steps

Resume in next session. Pick up the in-flight todos in roughly this order:

1. **Wire `--color-neutral-muted` into the 4 category-icon circle backgrounds** (the in-flight step that was paused):
   - `components/transactions/transaction-row.tsx:69` — `style={{ backgroundColor: \`color-mix(in srgb, ${categoryColor} 28%, transparent)\` }}` → `style={{ backgroundColor: 'var(--color-neutral-muted)' }}`.
   - `components/budgets/budget-card.tsx:29` — same swap.
   - `components/budgets/budget-form-sheet.tsx:174` — same swap.
   - `components/categories/categories-manager.tsx:47` — same swap.
   - **Keep the inner coloured dot** (preserves the colour signal until the Lucide icon mapping chunk ships — that's the "icon system to implement" Claude flagged, NOT this session's scope).
   - After wiring 4 sites: visual QA the icon circles in both themes + at 375px + verify colour contrast (dark `#292524` on surface `#141414` should pass; light `#F1EFEC` on white surface should pass).

2. **Bug 1 — month-selector glyph bleed.** File: `components/dashboard/month-selector.tsx`. Root cause confirmed: SnapSlider's `.snap-slider-mask` gradient isn't aggressive enough at a 120px track with 72px cells, leaving ~17px of neighbour glyph visible ("n" from Jun, "A" from Aug). Victor's preferred fix: shorten the width. Try narrowing `TRACK_W` from `w-[7.5rem] sm:w-[8.5rem]` to e.g. `w-20 sm:w-24` and adjust `PILL_W` math accordingly; or apply a tighter local mask fade band (e.g. `transparent 0% → #000 22% → #000 78% → transparent 100%`) on the track div only. Verify visually both months at year boundaries.

3. **Bug 2 — month-summary relabel (Option A).** File: `components/dashboard/month-summary-card.tsx` lines 85–92. Replace budget-implying text `"${barPct}% of income spent"` with plain informational ratio text per Claude's Option A recommendation, e.g.:
   ```
   income > 0
     ? overspent
       ? `Spending over income by ${formatNGN(Math.abs(balance))}`
       : `${formatNGN(expense)} of ${formatNGN(income)} income spent this month`
     : expense > 0
       ? 'No income logged this month'
       : 'No activity this month'
   ```
   Drop the percentage-after-`income > 0`-prefix line. Drop the `barPct` variable only if no longer used elsewhere. (The `role="meter"` bar itself stays — it's a visual aid, not the ambiguous framing Claude flagged; the text was the ambiguity carrier.)

4. **Doc updates:**
   - `UIUX_BRIEF.md` — new `§2.8 Neutral / System Accent` subsection (paste the 4-token values, mention warm-stone vs cool-slate reasoning), placed right after `§2.5 Semantic Colors` before Focus Ring. Per Claude review §4.
   - `UIUX_BRIEF.md` §8 Iconography — add one line: "default/uncoloured categories use `--color-neutral-muted` background + `--color-neutral` icon, same 20%-opacity treatment as coloured categories" (though we changed the bg for ALL categories this session — update wording to match: ALL category icon backgrounds are now `--color-neutral-muted`, colour encoded only via the inner dot until icon system ships).
   - `UIUX_BRIEF.md` — new section (probably §11 or append to §6 Patterns): document the 4 reusable patterns Claude flagged — `<DashboardCard title="" href="">` shell (title + View all → top-right, consistent padding/radius), Empty-state-with-CTA pattern (currently used identically by RecentTransactions + BudgetHealth + GoalsPreview), ProgressRing standardisation (azure fill, single source for any target/progress), Flow-line + icon + neutral-amount-color system on transaction-rows (settled pattern, document so it doesn't get reinvented on Transactions or category-filtered views).
   - `NOTES.md` — new entry: "## 2026-07-23 — Claude dashboard review + Phase 2 P2-F" - state the 2 bugs (1 fixed in-flight, 1 to fix), category-icon system mapping (Claude's table, deferred to its own chunk), the 4 reusable patterns logged, neutral color tokens added to globals, what was wired where, and what's outstanding.

5. **Verification (after everything lands):**
   - `npx tsc --noEmit` — must still pass (last ran green after P2-F core).
   - Visual QA: dashboard at 375px (single column: header → month summary → recent → budget health → goals preview), 768px / sm-2col budget grid, ≥1024px (5-col split). Both themes. Confirm neutral icon-circle backgrounds look intentional in light mode especially (light `--color-neutral-muted: #F1EFEC` is a guess based on palette family — confirm visually and tighten if needed).
   - Mental FAB → budget refresh check: create tx while on `/dashboard` → `BudgetHealth` cards update (TanStack invalidation path set in step 4).
   - Do NOT run `npm run lint` / `npm run build` in this session if context is at risk — those are P2-G's gate per overview. But run `tsc` cheap gate after each major file edit.

6. **Do NOT do in next session unless explicitly approved:**
   - Implement the 13-icon Lucide mapping (Claude review §2 table) — that's its own chunk per Claude's "open decision needs your call" framing on the icon **accent colour** specifically. The four neutral tokens land regardless; their wiring to category icon backgrounds is what this in-flight session started and will finish next session.
   - Refactor `RecentTransactions`, `BudgetHealth`, `GoalsPreview` into the shared `<DashboardCard>` shell — Claude flagged this as "do before more pages copy-paste" but it's a separate cleanup, not part of P2-F or this review-fix.
   - Write a `PHASES.md` P2-F chunk-log row or run the full Phase 2 gate — that's P2-G, which closes when Victor confirms.

**Tags:** #agent-session #ledger #phase-2 #p2-f #dashboard #claude-review #neutral-tokens #ui-polish
