> **Vault sync:** Copied from `Documents/Port Sites/Category 5/Momentum/` on 2026-07-09. Edit the project folder first; re-sync the vault after doc changes.

# UIUX_BRIEF.md
 
**Project:** Momentum
**Document Type:** UI/UX Design Brief & Visual Language Specification
**Last Updated:** July 6, 2026
**References:** PRD.md · TRD.md · SCHEMA.md · PHASES.md · DEV_NOTES.md
 
This is the single source of truth for all visual and interaction decisions. An agent reading this document should be able to build the entire visual system — tokens, layout, motion, components — without inventing a single value.
 
**Rule:** Never hardcode a color, font, shadow, easing, or timing value in a component. Every value lives here first. If a value isn't in this doc, it doesn't belong in the codebase yet.
 
---
 
## 1. Design Philosophy
 
**Core Feeling:** Calm, premium, intelligent, and motivating. A blend of Apple Health's data clarity and satisfying tactile feedback — executed with deliberate personal design taste.
 
**Key Principles:**
- Clarity and scannability above all else.
- Frictionless daily use, especially logging.
- Purposeful delight through micro-interactions — not decoration.
- Dark mode only. Energy-efficient and premium.
- Performance-first: no heavy effects that hurt mobile scrolling or load times.
- Glassmorphism that feels modern but stays lightweight.
- Every pixel is intentional. If it doesn't serve the user, remove it.
**Inspiration:** Apple Health (clean data presentation), Leap Fitness (satisfying button feel and progress feedback), modern glassmorphism with subtle depth.
 
**Assets:** Use `public/logo.svg` as the primary logo everywhere — header, landing page, favicon. No Vercel default assets in the final product.
 
---
 
## 2. Design Token System
 
Tokens are defined once here and referenced everywhere. They live in `globals.css` and are extended into Tailwind via `tailwind.config.ts`. Agents must use the token names, never the raw values.
 
### 2.1 Color Tokens
 
**`globals.css` (under `:root`):**
```css
:root {
  /* Backgrounds */
  --color-bg-primary:     #0A0A0A;
  --color-bg-secondary:   #111111;
 
  /* Surfaces (cards, modals, inputs) */
  --color-surface:        rgba(255, 255, 255, 0.06);
  --color-surface-hover:  rgba(255, 255, 255, 0.09);
 
  /* Borders */
  --color-border:         rgba(255, 255, 255, 0.08);
  --color-border-strong:  rgba(255, 255, 255, 0.14);
 
  /* Accent — use sparingly and intentionally */
  --color-accent-green:   #22C55E;  /* Completions, positive trends, success */
  --color-accent-cyan:    #00F0FF;  /* Active states, highlights, chart accents */
 
  /* Text */
  --color-text-primary:   #F1F1F1;
  --color-text-secondary: #A3A3A3;
  --color-text-muted:     #6B7280;
}
```
 
**`tailwind.config.ts` extension:**
```ts
colors: {
  'bg-primary':      'var(--color-bg-primary)',
  'bg-secondary':    'var(--color-bg-secondary)',
  'surface':         'var(--color-surface)',
  'surface-hover':   'var(--color-surface-hover)',
  'border-subtle':   'var(--color-border)',
  'border-strong':   'var(--color-border-strong)',
  'accent-green':    'var(--color-accent-green)',
  'accent-cyan':     'var(--color-accent-cyan)',
  'text-primary':    'var(--color-text-primary)',
  'text-secondary':  'var(--color-text-secondary)',
  'text-muted':      'var(--color-text-muted)',
},
```
 
**Semantic Usage Rules:**
- **Green:** Habit completion, positive trends, success toasts, streak indicators.
- **Cyan:** Active nav items, focused inputs, progress highlights, chart accents, selected states, hover glows.
- Green and cyan are accents — never backgrounds, never dominant. If either color covers more than 20% of a component, something is wrong.
### 2.2 Typography Tokens
 
**`globals.css`:**
```css
:root {
  --font-heading: 'Space Grotesk', 'Outfit', sans-serif;
  --font-body:    'Geist Sans', sans-serif;
  --font-mono:    'Geist Mono', monospace;
}
```
 
**Usage:**
- `--font-heading` → All H1–H4, page titles, section headers, big stat labels.
- `--font-body` → All body copy, UI labels, form text, descriptions.
- `--font-mono` → Numbers in context (Life Score, streak counts, weight/reps, timers, sleep hours). Gives a precise, technical readout feel.
**Type Scale:**
| Level | Size | Weight | Font | Usage |
|---|---|---|---|---|
| H1 | 32px | 700 | Heading | Page titles |
| H2 | 24px | 600 | Heading | Section headers |
| H3 | 20px | 600 | Heading | Card titles |
| H4 | 17px | 500 | Heading | Subsection labels |
| Body | 16px | 400 | Body | Default text |
| Small | 14px | 400 | Body | Secondary labels |
| Stat | 28–48px | 700 | Mono | Life Score, big metrics |
| Caption | 12px | 400 | Body | Timestamps, footnotes |
 
Line height: 1.4–1.6 across all levels. Generous whitespace around text blocks.
 
### 2.3 Easing & Motion Tokens
 
**`globals.css`:**
```css
:root {
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);      /* Standard transitions, most elements */
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* Completion animations, bouncy feedback */
  --ease-out:    cubic-bezier(0.0, 0, 0.2, 1);       /* Exits, dismissals, slide-outs */
}
```
 
**In Framer Motion:**
```ts
const ease = {
  smooth: [0.4, 0, 0.2, 1],
  spring: [0.34, 1.56, 0.64, 1],
  out:    [0.0, 0, 0.2, 1],
};
```
 
Never use Framer's default `"easeInOut"` or `"spring"` shorthand. Always use these exact values.
 
---
 
## 3. Shadow System
 
Single drop shadows look flat and cheap. All surfaces use layered shadows from this system only.
 
**`globals.css`:**
```css
:root {
  /* Default card surface */
  --shadow-card:
    0 1px 2px  rgba(0, 0, 0, 0.40),
    0 4px 12px rgba(0, 0, 0, 0.25),
    inset 0 0 0 1px rgba(255, 255, 255, 0.08);
 
  /* Elevated elements — modals, dropdowns, active cards */
  --shadow-elevated:
    0 2px 4px  rgba(0, 0, 0, 0.50),
    0 8px 24px rgba(0, 0, 0, 0.35),
    inset 0 0 0 1px rgba(255, 255, 255, 0.10);
 
  /* Hover state — cards that lift on desktop */
  --shadow-hover:
    0 4px 8px  rgba(0, 0, 0, 0.55),
    0 12px 32px rgba(0, 0, 0, 0.40),
    inset 0 0 0 1px rgba(255, 255, 255, 0.12);
}
```
 
**Usage rules:**
- Every card surface: `--shadow-card`.
- Modals, active dropdowns, floating elements: `--shadow-elevated`.
- Desktop hover state on interactive cards: transition to `--shadow-hover`.
- Never use a single-layer `box-shadow`. Never use `drop-shadow()` filter on cards.
---
 
## 4. Press States
 
Every interactive element — buttons, cards, habit rows, nav items — must feel tactile.
 
**`globals.css`:**
```css
:root {
  --scale-press:    0.98;
  --duration-press: 100ms;
}
```
 
**Implementation (apply to all interactive elements):**
```css
.interactive {
  transition: transform var(--duration-press) var(--ease-smooth),
              box-shadow var(--duration-press) var(--ease-smooth);
}
.interactive:active {
  transform: scale(var(--scale-press));
}
```
 
In Tailwind: `active:scale-[0.98] transition-transform duration-100`.
 
In Framer Motion:
```tsx
whileTap={{ scale: 0.98 }}
transition={{ duration: 0.1, ease: [0.4, 0, 0.2, 1] }}
```
 
This applies regardless of whether the element is a `motion` component or plain HTML + CSS. No interactive element is exempt.
 
---
 
## 5. Glassmorphism & Layout Rules
 
**Cards/Surfaces:**
```css
background: var(--color-surface);
backdrop-filter: blur(12px);
-webkit-backdrop-filter: blur(12px);
border: 1px solid var(--color-border);
box-shadow: var(--shadow-card);
border-radius: 16px;
```
 
Do not use heavy blur values (>16px) — they cause jank on mid-range mobile. Profile if blur is used in a list or repeated card.
 
**Layout:**
- Generous whitespace. Never dense or cluttered.
- Bento-style grid on Today page — purposeful sizing that mixes big summary cards with compact rows for scannability.
- Mobile: Bottom navigation bar. Desktop: Fixed sidebar.
**Depth:**
- Achieve depth via layered shadows and hairline borders — not aggressive hover lifts.
- Cards do not pop aggressively on hover. They lift subtly (`--shadow-hover`) on desktop only.
**Performance Rule:**
All visual effects must use GPU-friendly properties (`transform`, `opacity`, `backdrop-filter`). No animating `background`, `border-radius`, or `box-shadow` directly — transition them only on hover, not on scroll.
 
---
 
## 6. Header Consistency (Cross-Page Rule)
 
Every page and subpage uses this exact header structure:
 
| Position | Content |
|---|---|
| Left | Back button (subpages) or Logo + App name (top-level pages) |
| Center | Page title or dynamic context (e.g., selected date, habit name) |
| Right | Profile avatar + quick actions |
 
On mobile: header text condenses on scroll, giving content more real estate. Bottom nav remains fixed.
 
Back buttons must be prominent, not subtle. Users should never have to think about how to go back.
 
---
 
## 7. Logo Behavior
 
### Structure
- All logos are SVGs. No background fill. No outline or border on the container.
- Container color must match the surface it sits on. In Momentum (dark-only): `#111111` or `#000000`.
- Glow uses `filter: drop-shadow()`, not `box-shadow`. Drop-shadow follows the SVG path shape — a box-shadow creates a rectangle glow around the container, which looks wrong on a transparent SVG.
### Solo Logo — Resting
Subtle, soft glow using the project's accent color. Visible but not demanding attention:
```css
filter: drop-shadow(0 0 6px rgba(0, 240, 255, 0.20));
```
 
### Solo Logo — Hover
Lifts slightly. Glow becomes more noticeable — same color, more presence, not necessarily brighter:
```css
transform: translateY(-2px);
filter: drop-shadow(0 0 14px rgba(0, 240, 255, 0.45));
transition: transform 200ms var(--ease-smooth), filter 200ms var(--ease-smooth);
```
 
### Logo + Text — Desktop Only
- Both elements sit inside a single invisible container (`display: flex`, `align-items: center`, `cursor: pointer`, no background, no border).
- **Resting:** Logo has its subtle glow. Text has no glow — it keeps its normal color and sits still.
- **Hover (anywhere in the container):** Both lift simultaneously with `translateY(-2px)`. Logo gets the noticeable glow. Text only lifts — no glow, no color change on text.
- **Interaction area:** The full bounding box from the left edge of the logo to the last letter of the text, including the full container height above and below the text. Hovering anywhere in this zone triggers the combined state.
```tsx
// Framer Motion implementation
<motion.div
  className="flex items-center gap-2 cursor-pointer"
  whileHover="hovered"
  initial="resting"
>
  <motion.img
    src="/logo.svg"
    variants={{
      resting: { y: 0, filter: 'drop-shadow(0 0 6px rgba(0, 240, 255, 0.20))' },
      hovered: { y: -2, filter: 'drop-shadow(0 0 14px rgba(0, 240, 255, 0.45))' },
    }}
    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
  />
  <motion.span
    variants={{
      resting: { y: 0 },
      hovered: { y: -2 },
    }}
    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
  >
    Momentum
  </motion.span>
</motion.div>
```
 
### Mobile
Logo is always solo on mobile — never logo + text (saves space). Solo behavior applies.
 
### Why the Glow Matters
A transparent SVG on a dark background with no border or fill will look flat — it blends into the surface. The resting glow creates perceived depth without a background. This is what makes the logo feel like it's hovering above the page rather than painted onto it. The glow also works as the logo's "outline substitute" — ensuring it reads clearly against any background.
 
### Theme Shadow Reference
For dark theme (Momentum's default): light/colored glow on dark background.
If a second theme is ever added (per the rule in `PRD.md` — define it first, never retrofit):
- Light theme → dark shadow
- Deep color theme → light shadow
- Light color theme → dark shadow
The rule: the more luminance in the background, the darker the shadow needs to be to create contrast.
---
 
## 8. Entrance Animations
 
All cards, list items, and page sections animate in on mount. No element appears by snapping into place.
 
**Spec (use these values exactly):**
```ts
const entranceVariants = {
  hidden: { opacity: 0, y: 8, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};
 
const entranceTransition = {
  duration: 0.3,
  ease: [0.4, 0, 0.2, 1], // --ease-smooth
};
 
// Stagger siblings
const containerVariants = {
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};
```
 
**`prefers-reduced-motion` override (mandatory):**
```tsx
import { useReducedMotion } from 'framer-motion';
 
const prefersReduced = useReducedMotion();
 
const transition = prefersReduced
  ? { duration: 0 }
  : entranceTransition;
```
 
When reduced motion is active, elements appear instantly at their final state. The animation is skipped entirely — not slowed down.
 
---
 
## 9. Micro-Interactions & Motion
 
**Approved Interactions:**
- **Button press:** `scale(0.98)` + color shift. See Section 4.
- **Habit completion:** Checkmark animation → short confetti burst (green/cyan particles, 800ms, auto-dismiss) → streak counter increments with spring easing.
- **List items on mount:** Entrance animation from Section 7. Staggered.
- **Chart hover:** Glassmorphism tooltip with smooth 150ms appearance.
- **Loading → Success → Empty states:** Smooth opacity transitions, no layout jumps.
- **Today page bento elements:** Staggered entrance on initial load.
- **Wellness tap cards (mood/energy):** Immediate visual feedback + subtle scale on selection.
- **Toast notifications:** Slide in from bottom-right (desktop) or top-center (mobile), auto-dismiss at 3s, manual close available.
**Motion Constitution (from TRD):**
- LazyMotion + `m` components only.
- Animate `transform` and `opacity` only.
- Dynamic imports for heavy animated components.
- Profile on real device after every animated component.
- `prefers-reduced-motion` always respected.
---
 
## 10. Component & Interaction Guidelines
 
### Wellness Logging (Today Page)
- **Mood:** Row of 5 tap cards (emoji or number, 1–5). Selected state: `accent-green` border + subtle background shift. Large touch target (min 56px height).
- **Energy:** Same pattern as mood. Separate row.
- **Sleep Hours:** Slider + inline type input.
  - Slider range: 4.0h to 10.0h in 0.5h steps.
  - Display: Shows current value as clickable label (e.g., **7.5h** in `--font-mono`).
  - Tap the label → toggles to a number input field. User types exact value (e.g., `6.5`).
  - On blur or Enter: validates range, saves. Invalid values snap to nearest valid (4.0 or 10.0).
  - Both slider and type input write to `wellness_logs.sleep_hours` (`numeric(3,1)`). See `SCHEMA.md`.
### Buttons & CTAs
- Large touch targets. Min 48px height on mobile.
- Clear press feedback (Section 4).
- Primary: `accent-green` fill. Secondary: `surface` fill + `border-subtle`. Destructive: desaturated red.
### Cards
- Clickable areas well-defined — entire card is tappable on mobile.
- Subtle lift on hover (desktop only, `--shadow-hover`).
- Press state on tap (mobile, `scale(0.98)`).
### Forms & Inputs
- Focus state: `accent-cyan` ring (`box-shadow: 0 0 0 2px var(--color-accent-cyan)`).
- No harsh focus outlines. Use the ring only.
- Placeholder text: `--color-text-muted`.
### Data Visualizations
- Clean lines, `accent-green` and `accent-cyan` as primary chart colors.
- Responsive — no forced horizontal scroll on any viewport.
- Glassmorphism tooltips with smooth entrance.
### Empty States
- Never a blank screen. Every empty state has an encouraging short message + one primary CTA.
- Illustration optional but preferred (consistent style, minimal line art).
### Toasts
- Glassmorphism style matching card surface.
- Non-intrusive. Auto-dismiss at 3 seconds.
- Success: `accent-green` left border. Error: red left border. Info: `accent-cyan` left border.
- No stacking — new toast replaces current if triggered before dismiss.
### Modals
- Glassmorphism card, centered, with `backdrop-filter: blur(8px)` on the overlay.
- `Esc` key always closes.
- Entrance: fade + scale(0.96 → 1) with `--ease-spring`.
- No raw browser `alert()` or `confirm()` anywhere.
---
 
## 11. Accessibility
 
- ARIA labels and roles on every interactive element: buttons, icons, links, charts, sliders, form fields. No exceptions.
- Minimum touch target: 48px × 48px.
- Keyboard navigation support: Tab order logical, `Esc` closes modals, arrow keys where appropriate.
- Color contrast: All text meets WCAG AA minimum against its background.
- `prefers-reduced-motion`: All animations respect this setting. See Section 7.
- Lucide icons used in interactive contexts must have `aria-label` or a visually-hidden sibling label.
---
 
## 12. Do's and Don'ts
 
**Do:**
- Define tokens in `globals.css` before writing a single component.
- Use `--font-mono` for all numeric values that need to feel precise.
- Use layered shadows. Never a single `box-shadow`.
- Make logging feel addictive and fast. If it takes more than 20 seconds, the UX has failed.
- Test on a real mobile device before marking anything done.
- Respect `prefers-reduced-motion` in every animated component.
**Don't:**
- Hardcode `#22C55E`, `#00F0FF`, or any other value directly in a component.
- Use Framer's default easing strings (`"easeInOut"`, `"spring"`). Use the exact cubic-bezier values.
- Animate layout properties (`width`, `height`, `margin`, `padding`).
- Create dense or cluttered screens. Whitespace is a feature.
- Use inconsistent headers or nav patterns across pages.
- Over-animate. Every animation must earn its place by making the user feel something.
