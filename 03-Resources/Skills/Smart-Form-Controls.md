---
title: "Lesson: Smart Form Controls"
date: 2026-06-28
tags:
  - lesson
  - ux
  - forms
  - pattern
  - momentum
  - agent-trap
aliases:
  - Smart Form Controls
  - Smart Save Button
  - Icon-Only Label Trap
---

# Lesson: Smart Form Controls

> **One-line Summary**: Two small form control patterns that separate amateur from professional UX — disabling the save button when nothing has changed, and pairing icon labels with text on first encounter.

## Pattern 1: The Smart Save Button

**The Trap:** A "Save Details" button that's always clickable. User makes no changes, clicks Save anyway. Nothing happens (or a redundant API call fires). Confusing. Wasteful.

**What was observed in Momentum:** The habit log save button was always active, even with no changes. This also meant users couldn't tell whether their previous save had worked — there was no visual difference between "saved" and "unsaved" states.

**The Fix:**
```tsx
function HabitLogForm({ initialLog }: { initialLog: HabitLog }) {
  const [form, setForm] = useState(initialLog)
  
  // Deep-compare current form state vs initial (or last-saved) state
  const hasChanges = JSON.stringify(form) !== JSON.stringify(initialLog)

  return (
    <form>
      {/* form fields */}
      <Button 
        type="submit" 
        disabled={!hasChanges}
        className="disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Save Details
      </Button>
    </form>
  )
}
```

**The two states the button must communicate:**
- `disabled` (grey, cursor-not-allowed) = nothing to save
- `active` (your primary color) = unsaved changes exist, click to save

Optional enhancement: show a subtle "Unsaved changes" indicator elsewhere on the form when `hasChanges === true`.

**Prompt for your agent:**
```
The save/submit button must be disabled (disabled={!hasChanges}) whenever 
the current form state matches the last-saved state. Track initial state 
on mount and after every successful save. Use deep comparison or a dirty-flag 
pattern. The button must never be clickable when no changes have been made.
```

---

## Pattern 2: Icon-Only Label Trap

**The Trap:** Using emoji or icons alone as UI labels for concepts users haven't encountered before. The meaning is ambiguous until the user has spent time with the app.

**What was observed in Momentum:** The daily wellness emoji pickers (mood, energy levels) used emoji alone in the tab selectors. The user had to click on each one to see what it meant from the input label — this is "discovery through interaction" which works, but only after initial confusion.

> *"The daily reflection emojis make it hard to know what each emoji meant, but i guess if u use the app for long, u'll get used to it? but that's bad ux, cos the user should know what it means immediately they see it."*

**The Fix — Text + Icon, not Icon Alone:**
```tsx
// ❌ emoji only — what does 🌙 mean? Sleep? Night mode? Calm?
<TabTrigger value="sleep">🌙</TabTrigger>

// ✅ text + icon — immediately clear
<TabTrigger value="sleep">
  <span className="flex items-center gap-1.5">
    <span>🌙</span>
    <span className="text-xs">Sleep</span>
  </span>
</TabTrigger>
```

**The rule:** Any icon or emoji that represents a concept the user hasn't explicitly learned should have a visible text label. Tooltips are not enough — they require hover intent and don't work on mobile.

**Exception:** Icons that are universally understood (✕ for close, + for add, ← for back) don't need labels if their action is clear from context.

**Prompt for your agent:**
```
When using icons or emoji as UI labels for any domain-specific concept 
(mood ratings, fitness metrics, wellness categories), always pair with 
a text label. Icon-only labels are only acceptable for universally 
understood actions (close, add, back, search).
```

---

## Where These Appeared
- [[01-Projects/Momentum/Docs/DEV_NOTES]] — habit log save button always clickable (June 5), wellness emoji tabs (June 5)

## Related
- [[03-Resources/Skills/Context-Aware-Form-Fields]]
- [[03-Resources/Skills/Browser-Native-Dialog-Trap]]
- [[03-Resources/MOC-UI-UX-Lessons]]

**Tags:** #lesson #ux #forms #pattern #momentum #agent-trap
