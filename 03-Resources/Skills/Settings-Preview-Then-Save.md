# Lesson: Settings Preview Then Save

> **One-line Summary**: Setting changes apply immediately in the UI as preview; they only persist on Save — Save stays disabled until something changes.

## The Trap
- Settings with no clear save model (everything auto-persists or nothing feedback).
- Active Save when nothing changed.
- Assuming browser Back will run the same unsaved prompt as in-app Back.

## The Fix
1. **Preview on change** — toggle/option looks applied immediately.
2. **Persist only on Save** — close tab / crash / browser Back without Save → last saved state remains.
3. **Save button states:**
   - Unchanged: inactive (flat/dark, no affordance to click).
   - Dirty: active with depth (e.g. curved underline / elevated look).
4. **In-app Back / navigate away when dirty:** modal — Save or Discard.
5. **Browser Back when dirty:** may skip the modal (history). Acceptable if product docs say so, but know users can lose preview state — document it. Prefer in-app paths for settings.
6. Refine this note before first real settings page ships (none require it yet as of harvest).

## Code Pattern / Prompt Template
```
Settings page pattern:
- local draft state mirrors controls (preview)
- isDirty = draft !== saved
- Save disabled when !isDirty
- on in-app leave if isDirty → confirm Save | Discard | Cancel
- on Save → write server/storage, clear dirty
Do not auto-persist every toggle without an explicit Save when product wants review-before-commit.
```

## Where This Appeared
- Harvest Q3 (2026-07-13)
- Momentum DEV_NOTES era settings/preferences pain
- MOC L07 queue

## Related
- [[03-Resources/Skills/Smart-Form-Controls|Smart Form Controls]]
- [[03-Resources/Skills/Back-Button-Hierarchy|Back Button Hierarchy]]
- [[01-Projects/Momentum/Momentum|Momentum]]

**Tags:** #lesson #skill #ui-ux #settings #forms
