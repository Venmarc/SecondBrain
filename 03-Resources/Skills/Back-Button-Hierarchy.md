# Lesson: Back Button Hierarchy

> **One-line Summary**: In-app Back follows the app tree (`/today` root → section → nested), not browser history alone — mobile users need a page Back.

## The Trap
Relying on the browser Back button (or no Back at all). Mobile users ask "where's the back button?" Marketplace mental model: product page must return to list without fighting chrome.

## The Fix
Treat navigation as a **tree** with a defined root:
1. **Root** (after sign-in): `/today` (or project home). No back needed.
2. **Top-level app page** (sidebar/nav: habits, fitness, settings): Back → **root** (`/today`).
3. **Nested page** under a section: Back → **parent section**, not root.
4. **Deeper**: always immediate parent until root.

In-app Back = hierarchical **Up**. Browser Back = temporal escape hatch — don't break it, but don't make it the only path.

### Agent rule (one sentence)
**In-app Back goes to the parent in the route tree (`/today` for top-level sections; parent section for nested routes); never omit it on mobile; use browser history only as a secondary escape hatch, not as the primary UX.**

## Code Pattern / Prompt Template
```
Implement hierarchical Back:
- Root: /today
- /habits, /fitness, /settings → Back to /today
- /fitness/* → Back to /fitness
- Modals/drawers: close control, not route Back
Do not rely on window.history.back() as the only affordance.
```

## Where This Appeared
- Victor definition 2026-07-09 (harvest)
- `Documents/Research_files/Back_button_hierarchy.md`
- MOC L10 queue
- Momentum pre-rewrite dogfood (no clear Back placement)

## Related
- [[03-Resources/Skills/Sticky-Top-Bar-Navigation|Sticky Top Bar Navigation]]
- [[03-Resources/Skills/Navigation-Design-Basics|Navigation Design Basics]]
- [[01-Projects/Momentum/Momentum|Momentum]]
- [[03-Resources/MOC-UI-UX-Lessons|MOC UI/UX]]

**Tags:** #lesson #skill #ui-ux #navigation #momentum
