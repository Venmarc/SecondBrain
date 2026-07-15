# Lesson: Sticky Top Bar Navigation

> **One-line Summary**: A consistent top bar anchors Back, title, and in-page tabs — center-only layouts leave no home for navigation chrome.

## The Trap
Full center-aligned content with no header/top bar. Nowhere natural for Back; adding a floating Back breaks alignment. Data-heavy pages lose context when headers scroll away.

## The Fix
1. **Always have a top bar** (role can vary by project: nav, title, quick actions, or mixed).
2. Place **Back** on or just under the top bar.
3. Page **tabs** sit on or under the same bar for consistency.
4. Optional polish: page title scrolls into the top bar as content scrolls under it (article/header collapse pattern Victor liked on X).
5. Refine implementation in the vault first, then copy into project docs — **not** a global Antigravity rule (Victor uses AGY beyond projects).

## Code Pattern / Prompt Template
```
Layout shell:
- Persistent top bar (height fixed; safe-area aware on mobile)
- Left: Back when not at root; else logo/home
- Center/left: page title (can sticky-morph from in-page H1)
- Optional right: actions
- Optional second row: section tabs
Do not center-align the entire viewport with no header chrome.
```

## Where This Appeared
- Harvest Q2 (2026-07-13)
- Momentum v1: no place for Back; sticky-title idea from X article
- Dashboard clipping examples often pair top bar + sidebar

## Related
- [[03-Resources/Skills/Back-Button-Hierarchy|Back Button Hierarchy]]
- [[03-Resources/Skills/Dashboard-As-Overview|Dashboard As Overview]]
- [[03-Resources/Skills/Nested-Route-Active-State|Nested Route Active State]]
- [[01-Projects/Momentum/Momentum|Momentum]] · [[01-Projects/Ledger/Ledger|Ledger]]

**Tags:** #lesson #skill #ui-ux #navigation #layout
