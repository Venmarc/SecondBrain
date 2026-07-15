# Lesson: AI UI Antipatterns Watchlist

> **One-line Summary**: High-value anti-slop tells to avoid — motion spam + visual clichés from impeccable/design-skills; design skills already live in `~/.agents/design-skills`.

## Status
- **Motion / taste / frontend design skills:** already researched and installed under `~/.agents/design-skills/` — used on Momentum + Ledger. No re-extraction of the full 45 catalog.
- **This note:** short watchlist of anti-patterns worth remembering when reviewing agent UI.

## Motion anti-slop (flag when overused)
Source: `design-motion-principles/references/anti-checklist.md`

| Pattern | Rule of thumb |
|---------|----------------|
| Pulsing indicators | Almost always slop; one brand element max with rationale |
| Blur-everywhere entrances | OK once (hero/modal); flag ≥3 identical blur enters in one view |
| Hover-scale-on-everything | Flag identical `hover:scale-105` on whole grids |
| Stagger-spam on every list | One deliberate moment OK; ≥2 staggered lists in one view = spam |
| Bouncy springs on utility UI | No spring-bounce on toggles/menus/settings |

## Visual AI tells (flag when defaulted)
Source: impeccable `antipatterns.mjs` registry

| Pattern | Avoid |
|---------|--------|
| Side-tab / thick accent border on cards | Classic AI card tell |
| Overused fonts (Inter, Geist, Plus Jakarta, Space Grotesk, …) | Pick intentional type |
| Single font for everything | Pair display + body |
| Flat type hierarchy | ≥1.25 step contrast |
| Gradient text / purple-cyan AI palette / cream-beige default | Intentional brand colors |
| Nested cards | Flatten with space/type, not card-in-card |

## The Fix
- Prefer local design-skills + vault UI lessons over reinventing.
- On UI review: scan for **frequency/uniformity** of the same motion or chrome pattern.
- Ledger anti-references already ban SaaS cream / rainbow grids — keep aligned.

## Where This Appeared
- Harvest Q5 (2026-07-13)
- [[Clippings/45 Claude Design Skills That Kill AI Slop]]
- `~/.agents/design-skills/`

## Related
- [[03-Resources/MOC-Design-Skills-External|MOC External Design Skills]]
- [[03-Resources/Skills/Frontend-Awesomeness|Frontend Awesomeness]]
- [[03-Resources/MOC-UI-UX-Lessons|MOC UI/UX]]

**Tags:** #lesson #skill #ui-ux #anti-slop #design
