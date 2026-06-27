---
title: "Lesson: State Isolation Per Record"
date: 2026-06-28
tags:
  - lesson
  - state
  - pattern
  - bug
  - momentum
  - generalizable
  - react
aliases:
  - State Isolation Per Record
  - React form state leakage
---

# Lesson: State Isolation Per Record

> **One-line Summary**: When a UI lets users view and edit records across multiple dates or IDs, form state must be scoped to the selected record — shared state causes data from one record to bleed into all others.

## The Bug
In Momentum's habit logger, you can switch between days to log a habit. After logging notes + difficulty + context tags for Thursday, switching to Wednesday showed Thursday's data pre-filled. Editing Wednesday and saving overwrote Thursday's data too.

The result:
- Thursday: 1 star, "morning" + "home" tags, unique note → should be Thursday-only
- After editing Wednesday: both days showed Wednesday's data
- Switching categories cleared all log details from the UI (state lost entirely)
- The data wasn't isolated — one day's state polluted all other days

**Root cause:** The agent used a single shared React state object for the log form, not keyed to the selected date. When the selected date changed, the same state was displayed — and when saved, overwrote the wrong record.

## The Fix: Key Your State to the Record Identifier

The selected record (date, ID, etc.) must be the key that drives the form state. Two patterns:

**Pattern 1 — Re-initialize on selection change:**
```tsx
const [selectedDate, setSelectedDate] = useState(today)
const [logForm, setLogForm] = useState<HabitLog | null>(null)

// Re-fetch and re-initialize form whenever date changes
useEffect(() => {
  const existingLog = getLogForDate(habitId, selectedDate)
  setLogForm(existingLog ?? defaultEmptyLog)
}, [selectedDate, habitId])
```

**Pattern 2 — Derive form state from a keyed map (cleaner for complex UIs):**
```tsx
// Store logs keyed by date
const [logs, setLogs] = useState<Record<string, HabitLog>>({})

// Form always reads from the currently selected date's entry
const currentLog = logs[selectedDate] ?? defaultEmptyLog

function updateCurrentLog(updates: Partial<HabitLog>) {
  setLogs(prev => ({
    ...prev,
    [selectedDate]: { ...currentLog, ...updates }
  }))
}
```

## The General Rule

Any time you have a "view/edit" pattern where the user selects from a list and edits the selected item, the form state must be:

1. **Initialized from** the selected record when selection changes
2. **Saved to** only the selected record, never to a shared object
3. **Cleared or reset** when selection changes, not persisted from the previous selection

If your form has a `useEffect` that runs on selection change but doesn't reset the form state — that's the bug.

## Where This Generalizes

- Any date-switching UI (habit logs, wellness entries, workout history)
- Any list-detail pattern (select a product → edit its fields)
- Any tab-switching form (Tab A and Tab B share the same form state → Tab B gets Tab A's data)
- Edit modals that are reused across multiple items in a list

## The Test
1. Create record A with unique data
2. Switch to record B (different date or ID)
3. Verify form is empty / shows B's data, not A's
4. Edit B, save
5. Switch back to A — verify A's data is unchanged
6. Switch categories or views — verify data persists (doesn't get wiped by view change)

## Where This Appeared
- [[01-Projects/Momentum/Docs/DEV_NOTES]] — habit log form, data bleeding across days, data clearing on category switch (June 5 testing)

## Related
- [[03-Resources/Skills/Context-Aware-Form-Fields]]
- [[03-Resources/MOC-UI-UX-Lessons]]

**Tags:** #lesson #state #pattern #bug #momentum #generalizable #react
