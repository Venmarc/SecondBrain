# UIUX_BRIEF.md - Design System, Style Guide & Component Behavior

> **One-line Summary**: Design system specifications, typography, color palettes, and interactive component micro-animations.

**Last Updated:** June 25, 2026

## Purpose
This document defines the complete visual identity, interaction patterns, micro-interactions, and behavioral rules for **Tempire**. It ensures consistency across every page and component.

**Reference Files:**
- PRD.md (Product vision)
- TRD.md (Technical architecture and constitution)
- PAGE_SPECS.md (Page layouts)
- APP_FLOW.md (User journeys)
- SCHEMA.md (Data layer)
- PHASES.md (Implementation roadmap)
- NOTES.md (Development log)

**Update Rule:** Any change to colors, typography, spacing, interaction patterns, or component behavior must be documented here with date and reasoning.

## Overall Look & Feel
- **Premium Dark Mode First** — Modern, sophisticated, focused on content.
- **Aesthetic**: High-density "80% Shift" with generous breathing room. Clean, professional, and trustworthy — think Linear + Framer + Arc.
- **Tone**: Confident, calm, delightful. Fast and responsive without feeling gimmicky.
- **Emotion**: "This feels like a high-end creative tool" — not another generic marketplace.

## Color System

**Base Palette (Dark Mode Default)**
- Background: `#0a0a0a` (near-black)
- Surface: `#111111` (cards, panels)
- Surface-2: `#1a1a1a` (elevated elements)
- Border: `#27272a`
- Text Primary: `#f4f4f5`
- Text Secondary: `#a1a1aa`
- Text Muted: `#71717a`

**Accent Colors**
- Primary: `#3b82f6` (Electric Blue) — Buttons, links, active states
- Primary Hover: `#60a5fa`
- Success: `#22c55e`
- Danger: `#ef4444`
- Warning: `#eab308`

**Gradients (used sparingly)**
- Hero / CTAs: `linear-gradient(135deg, #3b82f6, #8b5cf6)`

## Typography

- **Headings**: `Outfit` (Semi-Bold / Bold) — 600–700 weight
- **Body**: `Inter` (Regular / Medium) — 400–500 weight
- Scale: Use Tailwind’s default + custom scales (2xl, 3xl, etc.)
- Line heights: Tight on headings, generous on body text

## Spacing & Layout Rules
- Base unit: 4px (Tailwind default)
- Container: Max 1280px, centered, 80% width on large screens ("80% Shift")
- Card padding: 24px–32px
- Section spacing: 64px–80px vertical

## Component Behavior & Micro-interactions

**General Rules**
- All interactive elements must have hover, active, and focus states.
- Transitions: `duration-200` ease-out for most elements.
- Micro-interactions must not degrade performance (INP < 200ms).

**Specific Component Behaviors**

1. **Product Cards**
   - Hover: Subtle lift (transform: translateY(-4px)), shadow increase, image zoom (scale 1.03)
   - "Add to Cart" button appears on hover (or always visible on mobile)

2. **Buttons**
   - Primary: Solid electric blue, hover brightness +95%
   - Secondary: Outlined, hover background fill
   - Loading: Skeleton or spinner (minimal)

3. **Image Gallery (Product Detail)**
   - Thumbnail click → main image transition (fade + slide)
   - Lightbox: Dark overlay, smooth open/close, keyboard navigation (ESC, arrows)

4. **Navigation**
   - Top nav: Slightly transparent backdrop blur on scroll
   - Active link: Bottom accent bar + color change
   - Mobile menu: Slide-in from right with stagger animation

5. **Toasts (Sonner)**
   - Slide up from bottom-right
   - Auto-dismiss after 4s (success) / 6s (info)

6. **Forms & Inputs**
   - Focus ring with primary color
   - Real-time validation feedback (green/red)
   - Smooth label float or placeholder shift

7. **Loading States**
   - Prefer skeleton loaders over spinners
   - Streaming where possible (Next.js)

## Accessibility Requirements
- Minimum contrast ratio 4.5:1
- All interactive elements focusable via keyboard
- ARIA labels on icons and complex components
- Reduced motion support (`prefers-reduced-motion`)
- Screen reader tested structure

## Responsive Behavior
- Mobile-first approach
- Breakpoints: sm (640), md (768), lg (1024), xl (1280)
- Touch targets minimum 44px
- Filters become bottom sheet/drawer on mobile
- Product grid: 1 col (mobile) → 2 → 3 → 4 (desktop)

## Animation Philosophy
- Purposeful only: Nothing decorative that hurts performance
- Duration: 150–250ms for most transitions
- Easing: `ease-out` or `cubic-bezier(0.4, 0, 0.2, 1)`
- Disable heavy animations on low-end devices

---
## Related
- Hub: [[01-Projects/Tempire/Tempire|Tempire]]
- Docs: [[01-Projects/Tempire/Docs/PRD|PRD]] · [[01-Projects/Tempire/Docs/TRD|TRD]] · [[01-Projects/Tempire/Docs/PHASES|PHASES]]
- Skills: [[03-Resources/MOC-UI-UX-Lessons|UI/UX MOC]] · [[03-Resources/Design/48-Laws-of-Web-Design|48 Laws]]
- Business: [[02-Areas/Business-Wealth/Revenue-Engines|Revenue Engines]]
- Projects: [[03-Resources/MOCs/MOC-Projects|MOC: Projects]]
