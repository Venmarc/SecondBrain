> **One-line Summary**: Learn premium UI by reverse-engineering components you like from UI libraries, rebuilding them, tokenizing them, then reusing in new designs.

# Reverse-Engineering UI Components

**Source:** Victor, vault interview 2026-07-09 (while Tempire is paused).

## Workflow

1. **Pick a reference** — a component or pattern from a UI library/site you respect (shadcn, Linear, Vercel, etc.).
2. **Deconstruct** — layout, spacing, motion, states (hover, focus, disabled), tokens (radius, blur, border).
3. **Rebuild** — implement in your stack (Next.js + Tailwind + shadcn) without cargo-culting class strings; name variables.
4. **Define** — document props, variants, and when to use it (mini spec in project `DESIGN.md` or a local component README).
5. **Reuse** — same form or **modified** form in new screens (Momentum landing nav, Ledger panels, future Tempire).

## Why (for Victor)

- Faster path to **premium feel** than waiting for agents to invent UI from scratch.
- Builds a **personal component vocabulary** that compounds across Momentum, Ledger, and later Tempire.
- Pairs with [[03-Resources/Skills/Frontend-Awesomeness|Frontend Awesomeness]] and [[03-Resources/MOC-UI-UX-Lessons|MOC UI/UX]].

## Use when

- Starting a new page shell (navbar, card, data panel).
- "This doesn't feel premium yet" but you can point at a reference you like.

## Related

- [[01-Projects/Tempire/Tempire|Tempire]] (later)
- [[01-Projects/Momentum/Momentum|Momentum]]
- [[01-Projects/Ledger/Ledger|Ledger]]

**Tags:** #skill #ui-ux #frontend #tempire #momentum #ledger