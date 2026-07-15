---
title: "Lesson: Responsive Data Visualization"
date: 2026-06-28
tags:
  - lesson
  - ui-ux
  - mobile
  - charts
  - pattern
  - momentum
  - generalizable
aliases:
  - Responsive Data Visualization
  - Mobile chart strategy
---

# Lesson: Responsive Data Visualization

> **One-line Summary**: Charts, heatmaps, and data grids need a responsive strategy before they're built — not after — because "scale everything down" produces illegible charts and "allow horizontal scroll" violates most mobile UX briefs.

## The Problem
Momentum's habit heatmap and adherence trend chart required horizontal scrolling on mobile. This conflicted directly with the `UIUX_BRIEF.md` rule: *"no horizontal scrolling on mobile"*.

The agent built the charts for desktop and never tested on a narrow viewport. On mobile, the data simply overflowed — the chart extended outside the container, or was squished into illegibility.

**The trap:** Charts are often the last thing tested responsively because they "work" in the desktop preview. By the time you test on mobile, the data model and chart structure are fixed — retrofitting responsive behavior is much harder than designing for it upfront.

## The Two Strategies (Choose Before Building)

### Strategy A: Data Reduction (Preferred for most cases)
Reduce the amount of data shown on smaller screens, keeping the chart the same physical size.

- Desktop heatmap: 30-day view
- Mobile heatmap: 14-day view (fits without scrolling)

- Desktop adherence trend: 12 weeks
- Mobile adherence trend: 6 weeks

```tsx
function HabitHeatmap({ logs }: { logs: HabitLog[] }) {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const daysToShow = isMobile ? 14 : 30
  
  const visibleLogs = logs.slice(-daysToShow)
  
  return <Heatmap data={visibleLogs} />
}
```

**Pro:** Chart remains fully readable. Data range communicates well at any size.
**Con:** Mobile users see less historical data (often acceptable — they're on the go).

### Strategy B: Controlled Horizontal Scroll (When all data must be visible)
Make the container explicitly and intentionally scrollable, with a scroll indicator.

```tsx
<div className="relative">
  {/* Fade indicator showing more content to the right */}
  <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
  
  <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-muted">
    <div className="min-w-[600px]"> {/* Set minimum width explicitly */}
      <Heatmap data={logs} />
    </div>
  </div>
</div>
```

**Pro:** All data visible. Scroll behavior is intentional, not accidental overflow.
**Con:** Horizontal scroll still has usability costs on touch devices.

### Strategy C: Alternative Visualization on Mobile
Show a different (simpler) chart type on mobile that conveys the same information.

- Desktop: Full heatmap grid
- Mobile: Simple streak counter + last 7-day row

This is the highest effort but often the best UX.

## The Rule
**Decide the mobile strategy before writing chart code.** Add it to `PAGE_SPECS.md` for each chart-heavy page:

```
## Progress Page — Habit Heatmap
- Desktop: 30-day grid heatmap
- Mobile: 14-day grid heatmap (data reduction strategy)
- Constraint: no horizontal overflow at any viewport
```

**Prompt for your agent:**
```
Before building any chart, heatmap, or data table, I need a mobile strategy.
Options: (A) data reduction — show fewer data points on mobile, 
(B) intentional scroll container with scroll indicator, 
(C) alternative mobile visualization.

State which strategy you'll use and implement it alongside the desktop version.
Never let chart data overflow its container at any viewport width.
```

## The Test
After building any chart: test at 390px width (iPhone SE). The chart must either:
- Fit within the viewport without overflow, OR
- Be inside an explicitly scrollable container with a visible scroll indicator

No silent overflow. No layout-breaking horizontal scrollbar on the page.

## Where This Appeared
- [[01-Projects/Momentum/Lessons-from-DEV_NOTES]] — habit heatmap and adherence trend horizontal scroll issue on mobile (June 5 testing, Progress page)

## Related
- [[03-Resources/Skills/Tooltip-Edge-Overflow]]
- [[03-Resources/MOC-UI-UX-Lessons]]
- [[01-Projects/Momentum/Docs/UIUX_BRIEF]] — mobile-first rule

**Tags:** #lesson #ui-ux #mobile #charts #pattern #momentum #generalizable
