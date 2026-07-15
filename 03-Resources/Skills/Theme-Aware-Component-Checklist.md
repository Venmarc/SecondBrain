---
title: "Lesson: Theme-Aware Component Checklist"
date: 2026-06-28
tags:
  - lesson
  - ui-ux
  - momentum
  - theme
  - agent-trap
  - pattern
aliases:
  - Theme-Aware Component Checklist
  - Light mode breaking components
---

# Lesson: Theme-Aware Component Checklist

> **One-line Summary**: After implementing a theme toggle, three component categories silently break in light mode — skeleton loaders, interactive hover states, and logo/text visibility — and agents never catch them unprompted.

## The Problem
You implement a theme toggle. Dark mode looks perfect. You switch to light mode and discover:

1. **Skeleton loaders** have hardcoded dark backgrounds (`bg-zinc-800`, `bg-gray-700`) that render as dark rectangles on a white page — visible only in the correct theme.
2. **Hover/active states** on buttons, sidebar links, and icon buttons disappear entirely or flash black — because they were hardcoded in dark-only color values.
3. **Logo and text** that use `text-white` or off-white values become invisible against the light background.

This is distinct from the [[03-Resources/Skills/Theme-Switching-Foundation|Theme-Switching Foundation]] rule (build both themes from the start). This checklist applies even when you've done that — it's about components that agents introduce that bypass your token system.

**Why agents do this:** Agents write skeleton components using concrete Tailwind color classes because that's the most common pattern in their training data. They don't think "is this semantic or hardcoded?"

## The Three Failure Categories

### 1. Skeleton Loaders
**Trap:** `className="bg-zinc-800 animate-pulse rounded"` — hardcoded dark color  
**Fix:** `className="bg-muted animate-pulse rounded"` — uses your CSS variable

Every skeleton must use semantic token classes, never concrete color values:
```tsx
// ❌ breaks in light mode
<div className="bg-zinc-800 animate-pulse h-4 rounded w-3/4" />

// ✅ adapts to theme
<div className="bg-muted animate-pulse h-4 rounded w-3/4" />
```

### 2. Interactive Hover States
**Trap:** Agent writes sidebar links with `hover:bg-zinc-800` — hardcoded dark hover color  
**Fix:** `hover:bg-accent` or `hover:bg-muted` — semantic token

Every interactive element needs a light-mode-visible hover state. After any major component build, manually switch to light mode and hover every button, link, and icon. If the hover is invisible or black, it's broken.

```tsx
// ❌ black flash in light mode
<button className="hover:bg-gray-800">Settings</button>

// ✅ adapts correctly  
<button className="hover:bg-accent hover:text-accent-foreground">Settings</button>
```

### 3. Logo and Text Visibility
**Trap:** Logo text or icon uses `text-white` or `fill-white` — invisible on white background  
**Fix:** Use `text-foreground` or conditionally compute based on theme

```tsx
// ❌ invisible in light mode
<span className="text-white font-bold">Momentum</span>

// ✅ adapts
<span className="text-foreground font-bold">Momentum</span>
```

## Post-Theme-Toggle Audit Checklist
Run this every time a theme toggle is added or modified:

- [ ] Switch to light mode. Click every button on every page. Any black flashes or invisible hover states?
- [ ] Check every skeleton loader in the app. Are any using hardcoded dark colors?
- [ ] Check logo and brand text in light mode. Is any text invisible?
- [ ] Check sidebar links hover/active states in light mode
- [ ] Check icon buttons (settings icon, pin icon, etc.) — hover backgrounds
- [ ] Check modal overlays and dialog backgrounds
- [ ] Check active route indicators in sidebar

## Prompt for Your Agent
```
After implementing any component that includes:
- Skeleton loaders
- Hover/active/focus states
- Text or icon colors

You MUST use only semantic CSS token classes (bg-muted, bg-accent, text-foreground, 
text-muted-foreground, border-border) — never hardcoded Tailwind color classes 
like bg-zinc-800, text-white, or hover:bg-gray-700.

After completing any feature, I will test in light mode. If anything is invisible 
or broken, it is a defect, not a cosmetic issue.
```

## Where This Appeared
- [[01-Projects/Momentum/Lessons-from-DEV_NOTES]] — skeleton loaders (black in light mode), hover states gone, logo text invisible after June 19 theme toggle implementation

## Related
- [[03-Resources/Skills/Theme-Switching-Foundation]] — foundational architecture for themes
- [[03-Resources/MOC-UI-UX-Lessons]]

**Tags:** #lesson #ui-ux #momentum #theme #agent-trap #pattern
