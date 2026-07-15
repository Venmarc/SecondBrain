> **One-line Summary**: Architecture for stable collapsible desktop sidebars — single width owner, CSS variable lockstep, portal tooltips, no hover-expand.

# Collapsible Desktop Sidebar

Companion to mobile tab bars. Desktop shell pattern extracted from Ledger Phase 0 and [[Documents/Research_files/Collapsible_Sidebar_Implementation|Collapsible Sidebar Implementation]].

## Use When

- Building app shells with persistent side navigation (Ledger, Momentum dashboard, any SaaS admin)
- Collapsed rail + expanded panel states
- Avoiding layout jitter during width transitions

## Core Architecture

### Single width owner (non-negotiable)

- Sidebar runs **full height, edge-to-edge**. Top bar spans **only the content area** starting where the sidebar ends.
- Two siblings both owning width (sidebar + top bar) causes race conditions and jitter.
- One container (`LayoutShell`) sets `--sidebar-width`; sidebar and content `padding-left` both read it.

### Two states only

| State | Width | Contents |
|---|---|---|
| Collapsed (rail) | ~64–72px | Icons only, centered |
| Expanded | ~240–280px | Icons + labels |

- Default on load: **collapsed**.
- Persist last choice in `localStorage` (Zustand or equivalent).
- **No hover-expand.** No separate "pin" button — persistence replaces pin.

### Hit targets

- **Nav icon clicks → navigate.**
- **Toggle button clicks → expand/collapse.**
- Never conflate — users clicking "Dashboard" while collapsed must navigate, not just expand.

## Anti-Jitter Checklist

1. Transition `--sidebar-width` CSS variable so sidebar and content animate in lockstep.
2. `will-change: width` on sidebar container.
3. Do **not** read `offsetWidth` / `getBoundingClientRect` on every `mousemove` during transition.
4. Hover states: only use non-layout properties (`background-color`, `color`, `opacity`, `transform`). Reserve border space with `border: 2px solid transparent` at rest.
5. Hydration: render consistent default (`collapsed = true`) on server; sync from `localStorage` after mount.

## Tooltips (collapsed rail)

- Render in a **portal** attached to `document.body` with `position: fixed`.
- Position from `getBoundingClientRect()` **once on `mouseenter`**, not on every mousemove.
- Debounce dismissal ~75ms on `mouseleave`.
- Never nest inside `overflow: hidden` sidebar scroll wrapper.
- Add `aria-label` on icon-only links for screen readers.
- Support keyboard via `onFocusCapture` / `onBlurCapture`.
- Open item: Escape key dismissal (WCAG SC 1.4.13) — not yet implemented in Ledger.

## Related

- [[03-Resources/Skills/Sticky-Top-Bar-Navigation|Sticky Top Bar Navigation]]
- [[03-Resources/Skills/Navigation-Design-Basics|Navigation Design Basics]]
- [[03-Resources/Skills/Tooltip-Edge-Overflow|Tooltip Edge Overflow]]
- [[03-Resources/MOC-UI-UX-Lessons|MOC: UI/UX Lessons]]

**Tags:** #skill #navigation #sidebar #layout #accessibility #ledger