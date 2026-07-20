# Transactions Screen — UI Spec

Scope: filter/search behavior for the Transactions list. Target: mobile-first, must not break or scroll horizontally on iPhone 6s/SE viewport (375px).

---

## 1. Layout Overview

**Top bar** (unchanged): back button, theme toggle, avatar.

**Control row (single line, always visible):**

```
[ Search bar (flex-grow) ]  [ Filter icon button ]
```

- Search bar takes all available width minus the filter button.
- Filter icon button is fixed width (~40–44px tap target), sits right-aligned.
- If any filter is non-default, show a small badge on the filter icon (dot, or number = count of active filters).

**Active filter chips (conditional row):**

- Renders **only when** one or more filters differ from default.
- Horizontal row of removable chips below the control row, e.g. `This Month ×` `Feeding ×`
- If this row would overflow, it *can* scroll horizontally — acceptable here because it's optional/secondary, not a primary control the user must always see.
- When no filters are active, this row doesn't render. Zero height cost when idle.

**List** fills remaining space between control row and bottom nav.

**Bottom nav** (unchanged).

This kills the old scrollable filter-tab row entirely. Everything heavy moves into a sheet.

---

## 2. Filter Sheet (opens on tapping filter icon)

Bottom sheet or modal, full-height-ish, internally scrollable if needed — but content should fit without scrolling on most devices given the structure below.

Order top to bottom:

### a) Date Range
- Segmented control or chip group: `This Month` (default) · `Last Month` · `3 Months` · `This Year` · `Custom`
- Selecting `Custom` reveals a date range picker (start/end) inline, below the segment row.

### b) Type
- 3-way **segmented control**: `All` (default) · `Income` · `Expense`
- Not a slider/dimmer. Discrete states need a discrete control — see §4 for reasoning.
- This selection **drives the Category list below it** (see §3).

### c) Category
- Flat list or grid of category chips/rows, reactive to Type (§3).
- No search input inside this picker at current scale (12 categories total, max 9 in a single group). Revisit only if a single group exceeds ~20 items.
- Multi-select optional (decide based on product need — spec assumes single-select unless you want "Feeding + Transport" combined filtering).

### d) Payment Method
- Flat list/dropdown: `Cash` · `Card` · `Transfer` · `POS` · `Other`
- Single-select. 5 items, no search needed.

### e) Actions (pinned to sheet bottom)
- `Reset` (left/secondary) — clears all filters to default.
- `Apply` (right/primary) — commits filters, closes sheet, updates list + chip row.

---

## 3. Category ↔ Type Interaction

This is the core mechanism that keeps the category picker manageable without adding a nested search.

| Type selected | Category list shown |
|---|---|
| **Income** | `Salary`, `Gifts`, `Freelance` — flat list, 3 items, no grouping |
| **Expense** | `Airtime/Data`, `College/School`, `Electricity`, `Feeding`, `Groceries`, `Health`, `Household`, `Misc`, `Rent`, `Transport` — flat list, 9 items, alphabetical, no grouping |
| **All** | Both, under two sticky-header sections: **Income** (3 items) then **Expense** (9 items) |

Rules:
- Sort order within each group: **alphabetical**. Don't sort by usage frequency until real analytics justify it — reordering under the user's thumb erodes trust.
- Changing Type after a Category is already selected: if the selected category no longer belongs to the new Type group, clear the category selection (don't silently keep an invalid combo — e.g. "Expense + Salary" should never be a reachable filter state).
- This grouping mirrors the DB-level income/expense tag — don't try to flatten or hide that separation, it's doing real work here.

---

## 4. Why Type is a Segmented Control, Not a Slider

Type has exactly 3 fixed states (All / Income / Expense) — a bounded, discrete set. A slider/dimmer metaphor implies a continuous range with a position that can sit "between" values, which then requires simulating discreteness via snap points: extra drag physics, hit-testing, and animation work to fake what a segmented control already does natively — plus better accessibility (clear tap targets, screen reader support, keyboard nav) for free. Use the segmented control. No ambiguity, no extra engineering surface.

---

## 5. Search Bar Behavior

- Searches across: name, description, category, payment method, type.
- This is intentionally separate from the Category filter and should **not** be reconciled with it. They solve different problems:
  - **Search** = fuzzy, content-based — "I vaguely remember this transaction."
  - **Category filter** = exact, structured — "show me exactly this category."
- A user typing a known category name into search (e.g. "feeding") getting matching results is a *feature*, not overlap to fix — it's a shortcut path that skips the filter sheet entirely.
- No changes needed to search logic as a result of the filter sheet redesign.

---

## 6. Responsive Notes

- Control row (search + filter icon) must fit on 375px viewport without wrapping or scrolling. Budget: search bar flexes, filter icon is fixed ~40–44px + ~8–12px gap. This always fits regardless of screen size since it's only 2 elements.
- Filter sheet is where all width-hungry content lives — it has full screen height to work with, so no density constraints there beyond normal touch-target sizing (44px min tap targets per item row).
- Active filter chip row (§1) may scroll horizontally if overflowing — this is the one place horizontal scroll is acceptable, since it's supplementary state display, not a primary control.

---

## 7. Explicitly Out of Scope / Deferred

- Category search-within-picker — only add if a single Type group (Income or Expense) grows past ~20 categories.
- Multi-select category filtering — decide as a product call, not a layout constraint.
- Frequency-based category sorting — needs real usage data first.