---
title: "Lesson: Tooltip and Popover Edge Overflow"
date: 2026-06-28
tags:
  - lesson
  - ui-ux
  - pattern
  - momentum
  - recharts
  - tooltip
  - generalizable
aliases:
  - Tooltip and Popover Edge Overflow
  - Tooltip edge collision detection
---

# Lesson: Tooltip and Popover Edge Overflow

> **One-line Summary**: Tooltips and floating elements that always render to the right (or in a fixed direction) cause horizontal scrollbars when triggered near the right edge of their container — they must auto-flip direction based on available space.

## The Bug
In Momentum's habit heatmap, hovering over cells in the last 2-3 columns caused the tooltip to extend beyond the container's right edge. This triggered an unexpected horizontal scrollbar on a page with no intentional horizontal scroll — and pushed the entire layout sideways.

The tooltip was rendering with a fixed offset (always to the right of the cursor), with no logic to detect when it was near the container edge.

**The compound problem:** The other chart tooltips in the same page (line charts, bar charts) were adaptive — they flipped to the left when near the right edge. The heatmap tooltip wasn't. This inconsistency made the heatmap feel broken compared to everything around it.

## The Fix

**Principle:** Floating elements must detect available space and flip direction accordingly. This is called "smart positioning" or "collision detection."

**If using a component library (Radix UI / shadcn — already in your stack):**

Radix `Tooltip`, `Popover`, and `DropdownMenu` handle collision detection automatically via the `side` and `avoidCollisions` props:

```tsx
<TooltipContent
  side="right"           // preferred side
  avoidCollisions={true} // auto-flips when space is insufficient
  collisionPadding={8}   // minimum space from container edge before flipping
>
  {tooltipContent}
</TooltipContent>
```

**If using a custom tooltip (positioned manually):**

```tsx
function SmartTooltip({ x, y, containerWidth, content }) {
  const TOOLTIP_WIDTH = 160
  const PADDING = 12
  
  // Detect if tooltip would overflow right edge
  const wouldOverflowRight = x + TOOLTIP_WIDTH + PADDING > containerWidth
  
  return (
    <div
      style={{
        position: 'absolute',
        top: y,
        // Flip to left if right would overflow
        ...(wouldOverflowRight 
          ? { right: containerWidth - x + PADDING }
          : { left: x + PADDING }
        ),
      }}
    >
      {content}
    </div>
  )
}
```

**For Recharts custom tooltips** (used in Momentum):
```tsx
// Recharts provides the cursor position in the tooltip props
// Use these to calculate overflow:
const CustomTooltip = ({ active, payload, coordinate, viewBox }) => {
  if (!active || !payload?.length) return null
  
  const isNearRightEdge = coordinate.x > (viewBox.width * 0.75)
  
  return (
    <div className={cn(
      "glass-card p-3 text-sm",
      isNearRightEdge ? "-translate-x-full" : "translate-x-4"
    )}>
      {/* content */}
      {payload[0].value}
    </div>
  )
}
```

## The Test
For any chart or heatmap with a custom tooltip:
1. Hover cells/data points at the far LEFT edge — tooltip should appear to the right
2. Hover cells/data points at the far RIGHT edge — tooltip should flip to the left
3. Resize the container — tooltip should still flip correctly at the new edge
4. No horizontal scrollbar should appear at any point

## The Rule
Every floating element (tooltip, popover, dropdown, context menu) must have collision detection. "It works in the center of the container" is not enough.

**Prompt for your agent:**
```
All tooltips and popovers must use collision detection / smart positioning.
When using Radix UI primitives, always set avoidCollisions={true}.
For custom-positioned floating elements, calculate available space before 
rendering and flip direction when the element would extend beyond the 
container boundary. Test by hovering near all four edges.
```

## Where This Appeared
- [[01-Projects/Momentum/Lessons-from-DEV_NOTES]] — heatmap tooltip causing horizontal scrollbar on right-edge cells (June 5 testing, Progress page)

## Related
- [[03-Resources/Skills/Responsive-Data-Viz]]
- [[03-Resources/MOC-UI-UX-Lessons]]

**Tags:** #lesson #ui-ux #pattern #momentum #recharts #tooltip #generalizable
