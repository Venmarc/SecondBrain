> **One-line Summary**: When a control's states are a bounded discrete set, use a segmented control — never a slider/dimmer that has to fake discreteness via snap points.

# Discrete State Control Selection

## The Trap

Reaching for a slider / dimmer / range metaphor because it "feels slick" or "more modern", even when the underlying domain has a small fixed number of states (e.g. `All` / `Income` / `Expense`). The slider then needs snap points, drag hit-testing, snap animation, and fake discretization — adding engineering surface and motion complexity to do what a segmented control already does natively. The semantic mismatch also leaks to users: a slider visually implies a continuous range where you can land *between* values, which is misleading when there are no values between.

## The Fix

Ask first: **how many fixed states does this control have?**

- 1 → no control, just a label
- 2 → a switch (or two-button segmented)
- 3–6 fixed, named states → **segmented control** (text or icon+text)
- >6 ordered, narrowly spaced numeric values → slider *is* appropriate (continuous-feeling range, snap optional)
- Single continuous value (volume, opacity, percentage) → slider

Discrete states are not made continuous by adding snap physics. The control should reveal the domain's actual shape — if the underlying data has 3 buckets, the control should expose 3 buckets.

## Bonus — what you get for free with a segmented control

- Clear tap targets (whole segment is clickable, no sub-pixel drag hit zone)
- Screen reader announces "All / Income / Expense, 1 of 3 selected" — no custom ARIA needed
- Keyboard nav: <kbd>←/→</kbd> between segments is built into most implementations (Radix, shadcn/ui, MUI, etc.)
- No drag-phys or snap animation to maintain
- State is always exactly one of the named values — no off-by-one snap bugs

## Where This Appeared

- **Ledger** — Transaction_UI_Spec §4 sized Type as a 3-way segmented (`All` / `Income` / `Expense`) instead of a slider/dimmer when it drives the Category list below it. Same reasoning applied to Date Range (`This Month` / `Last Month` / `3 Months` / `This Year` / `Custom`). Built 2026-07-19; verified during the Ledger UI polish audit session.
- See session log: [[06-Agent-Sessions/2026-07-19-grok-ledger-ui-polish-audit-fixes]]

## Counter-example (when slider IS right)

Ledger's **month picker** on the same screen uses a SnapSlider (custom physics slider) because months are an ordered, narrowly-spaced ranged scale, not a 3-way toggle. Same screen, two controls, two correct answers. Picking the right control is the lesson — not "always segmented" or "always slider".

## Related

- [[03-Resources/MOC-UI-UX-Lessons|MOC: UI/UX Lessons]]
- [[03-Resources/Skills/UI-Polish-Ten-Rules|UI Polish Ten Rules]] — snap/physics rules, but the *control-type* decision is upstream
- [[03-Resources/Skills/Smart-Form-Controls|Smart Form Controls]] — adjacent form-control discipline
- [[03-Resources/Tools/Effects_Glossary|Effects Glossary]] — `SnapSlider` build detail if you do end up needing a slider

## Tags

#skill #ui-ux #controls #segmented-control #accessibility #ledger
