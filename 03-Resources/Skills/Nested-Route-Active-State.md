---
title: "Lesson: Nested Route Active State in Sidebar"
date: 2026-06-28
tags:
  - lesson
  - ui-ux
  - navigation
  - pattern
  - agent-trap
  - nextjs
aliases:
  - Nested Route Active State in Sidebar
  - Sidebar sub-route highlight bug
---

# Lesson: Nested Route Active State in Sidebar

> **One-line Summary**: Sidebar navigation icons stop highlighting when the user navigates to sub-routes — agents use exact path matching instead of prefix matching, and never notice because they only test the top-level route.

## The Trap
You have a `/fitness` route with a Fitness icon in the sidebar. It highlights correctly when you're on `/fitness`. You then navigate to `/fitness/exercises` or `/fitness/log`. The Fitness icon goes dark — the sidebar now shows no active route at all.

The agent implemented active state with exact path matching:
```tsx
// ❌ exact match — breaks on sub-routes
const isActive = pathname === '/fitness'
```

**Why agents do this:** Exact equality is the simplest check. Agents rarely simulate navigation to sub-routes when building the sidebar. They verify the happy path (`/fitness` → highlighted) and move on.

## The Fix
Use prefix matching for all parent routes:
```tsx
// ✅ prefix match — stays highlighted across sub-routes
const isActive = pathname === '/fitness' || pathname.startsWith('/fitness/')

// Or cleaner with a helper:
const isActive = (basePath: string) => 
  pathname === basePath || pathname.startsWith(basePath + '/')

// In the sidebar:
<SidebarItem
  href="/fitness"
  icon={<Dumbbell />}
  label="Fitness"
  active={isActive('/fitness')}
/>
```

## The General Rule
Every sidebar nav item that has child routes must use prefix matching, not exact matching.

A parent is "active" if:
- `pathname === parentPath` (you're on the parent), OR
- `pathname.startsWith(parentPath + '/')` (you're in any child)

The `/` at the end of the prefix is important — without it, `/fitness-goals` would incorrectly activate the `/fitness` item.

## Prompt for Your Agent
```
When implementing sidebar navigation active states:
- Use pathname.startsWith(route + '/') || pathname === route for ALL nav items
- Never use exact equality (pathname === route) alone if the route has sub-pages
- Test active states by navigating to every sub-route, not just the parent route
```

## The Test
After building any sidebar, manually navigate to every sub-page in the app. The correct parent icon must remain highlighted on all of them.

## Where This Appeared
- [[01-Projects/Momentum/Docs/DEV_NOTES]] — `/fitness/exercises` sub-page, fitness sidebar icon not highlighted (June 19 section)

## Applies To
Any app with sidebar navigation and nested routes. This is not Momentum-specific — it will appear in Tempire, future projects, anything with a dashboard layout.

## Related
- [[03-Resources/Skills/Theme-Aware-Component-Checklist]]
- [[03-Resources/MOC-UI-UX-Lessons]]

**Tags:** #lesson #ui-ux #navigation #pattern #agent-trap #nextjs
