# Lesson: Navigation Design Basics

> **One-line Summary**: Navigation is a system — consistent layouts, clear labels, logical grouping — not just buttons with hrefs.

## The Trap
Treating nav as "add links." Inconsistent placement, vague labels, no grouping. Users can't form a mental model of the app tree.

## The Fix
From Victor's synthesis of navigation design research + project needs:
1. **Consistent layout** — shell chrome (top bar, sidebar) stable across pages.
2. **Clear labels** — plain language, match destinations.
3. **Logical grouping** — primary destinations vs utilities (settings, profile).
4. Pair with hierarchical Back ([[03-Resources/Skills/Back-Button-Hierarchy|Back Button Hierarchy]]).
5. Build a **reusable nav system** in the vault, then adapt per project (same basics, different roles).

Strip noise from long articles; keep only what compounds across Momentum, Ledger, later Tempire.

## Code Pattern / Prompt Template
```
Define nav system before pages:
- Primary destinations (max ~5–7)
- Shell: top bar + sidebar/bottom nav roles
- Active states for nested routes
- Labels match PRD language
- Back hierarchy documented in PAGE_SPECS / UIUX_BRIEF
```

## Where This Appeared
- Harvest Q7 + [[Clippings/Navigation Design  Patterns, tips & best practices|Navigation Design clipping]]
- Justinmind-style research (full article still in Clippings for detail)

## Related
- [[03-Resources/Skills/Back-Button-Hierarchy|Back Button Hierarchy]]
- [[03-Resources/Skills/Sticky-Top-Bar-Navigation|Sticky Top Bar Navigation]]
- [[03-Resources/Skills/Dashboard-As-Overview|Dashboard As Overview]]
- [[03-Resources/Skills/Nested-Route-Active-State|Nested Route Active State]]
- [[03-Resources/MOC-UI-UX-Lessons|MOC UI/UX]]

**Tags:** #lesson #skill #ui-ux #navigation
