> **Vault sync:** Copied from `Documents/Port Sites/Category 5/Momentum/` on 2026-07-09. Edit the project folder first; re-sync the vault after doc changes.

# TRD.md
 
**Project:** Momentum
**Document Type:** Technical Requirements & Architecture Document
**Last Updated:** July 6, 2026
**References:** PRD.md · UIUX_BRIEF.md · SCHEMA.md · PHASES.md · DEV_NOTES.md
 
This document records all technical decisions, architecture choices, stack details, and engineering constitutions. It prevents drift, over-engineering, and past technical regrets. Every decision here serves the PRD's personal tool goals: daily usability, performance, design taste, and fast completion.
 
---
 
## 1. Technical Vision
 
Build a clean, fast, and delightful Next.js app that feels premium while remaining simple enough for one person to own and actually use daily.
 
**Core Technical Principles (The Constitution):**
- **Simplicity and Speed First.** Choose the boring, reliable solution. Only add complexity when it directly serves daily use or portfolio impact.
- **User Experience Over Features.** If a technical choice makes logging slow, confusing, or less delightful → reject it.
- **Root Cause Fixes.** Address known issues at the architecture level, not with band-aids.
- **Dogfooding Mandate.** Every major change must be tested with real personal usage data before declaring done.
- **Documentation Sync.** Any architectural change updates this file and relevant docs immediately.
- **Defined Endpoint.** When core flows work smoothly for 14+ days of personal use, the project ships. No perpetual polish.
---
 
## 2. Tech Stack
 
### Core Framework
- **Next.js 16** (App Router) — React Server Components where possible for performance.
- **TypeScript** — Strict mode. No `any`. Ever.
- **Tailwind CSS** + **shadcn/ui** — Primary styling and component primitives.
- **Supabase** — Postgres database with RLS, auth (supplemental), storage.
### Authentication
- **Clerk** — Primary auth provider with **Custom Session Tokens** (preferred for speed and control; no webhooks unless explicitly approved).
- All Clerk auth UI must be **fully custom-branded** to match the glassmorphism aesthetic. No default gray/orange Clerk components.
### Styling & Animation
- **Tailwind CSS** — Core utility-first styling. Use design tokens from `UIUX_BRIEF.md`, not hardcoded values.
- **Framer Motion** — For premium micro-interactions only. See strict constitution in Section 4.
- **Lucide React** — Icons. All icons require explicit ARIA labels.
### State & Data Management
- **React Server Components** + **Server Actions** — Primary data operations.
- **TanStack Query (React Query)** — Client-side data fetching and caching where needed.
- **Zustand** or native React state — For simple UI state. No Redux.
### Database & Schema
- **Supabase Postgres** with Row Level Security (RLS) on every table.
- See `SCHEMA.md` for full models, types, and policies.
### Other
- **Vercel** — Deployment and preview environments.
- **ESLint + TypeScript** — Strict linting. No warnings tolerated in CI.
### Explicitly Out of Scope
Heavy AI/ML libraries, complex charting beyond Recharts or Tremor, native mobile, PWA offline (post-ship consideration only).
 
---
 
## 3. Architecture Decisions
 
### Overall Architecture
- **Hybrid SSR/CSR:** Server Components for data-heavy pages (Today, Progress). Client Components only where interactivity requires it.
- **Feature-Sliced Design:** Organize by domain (`habits/`, `fitness/`, `progress/`) rather than pure technical layers.
- **Minimal Client Bundle:** Prioritize server rendering and dynamic imports for any heavy sections.
- **Data Flow:** Server Actions → Supabase → Optimistic UI updates on client.
### Routing & Protection
- **Never use `middleware.ts`.** Deprecated in Next.js 16+. Use `proxy.ts` for any network-level logic.
- Prefer Server Components + Server Actions for route protection.
- Protected routes redirect unauthenticated users to `/login`.
### Authentication Integration
- **`ensureProfile()` server action** runs in the root layout on every authenticated load. It checks if a Supabase profile row exists for the Clerk user and creates one if not. This syncs Clerk → Supabase without webhooks or ngrok tunnels during local development.
- **Clerk user IDs are strings** (`user_2w2a6PJC4T4BfXDsg72AQsLNEyU`). All `user_id` columns in Supabase are `text` type — never `uuid`. RLS policies use `auth.jwt() ->> 'sub'`.
- **Users CANNOT access other users' data.** RLS must be enforced and verified on every single table. This is non-negotiable and must be tested, not assumed.
### Theming
- **Dark mode only.** No theme switcher in v1.
- If a second theme is ever added in a future version, it must be defined in `UIUX_BRIEF.md` from the start of that version — CSS variables, token overrides, and component behavior all specified upfront. **Never retrofit a theme onto hardcoded values.** Agents attempting to add a theme toggle after the fact will break the UI in ways that are hard to diagnose.
### Performance Constitution (Critical)
- All main interactions (logging, navigation) must feel instant (<300ms perceived).
- Lighthouse Performance score target: ≥ 90 on mobile.
- Test on real devices regularly, especially mid-range Android.
- Bundle size monitoring: profile with `next build`. Keep client bundle lean.
### Local Development
- **Run with `next dev --webpack`**, not turbopack. The developer's machine builds faster with webpack locally. Turbopack is fine on Vercel for deployment.
### Responsive & Adaptive UI
- Mobile-first development. Design at 375px first, scale up.
- Every page, card, button, skeleton, and container must be fully responsive.
- Zero horizontal scrolling on core views (Today, Habits, Progress, Fitness).
- Adaptive layouts that gracefully handle all screen sizes.
### Error Handling & UX Reliability
- Custom modals and toasts for all user-facing errors and confirmations. No raw browser `alert()` or `confirm()`.
- Graceful error boundaries and fallback states on every page.
- Toast notifications: non-intrusive, auto-dismiss, no persistence bugs.
---
 
## 4. Framer Motion Constitution (Performance-First, Polish-Second)
 
Framer Motion is allowed **only if** all of the following rules are followed. If they cannot be maintained at any point, default to CSS transitions and Tailwind animation utilities.
 
### Performance Rules (Prevent Slowdown)
1. **`LazyMotion` always.** Load only the features required (`m`, `AnimatePresence`). Never import the full Framer bundle.
2. **Wrap only the element that animates.** Never wrap entire pages, layouts, or large sections.
3. **Animate `transform` and `opacity` only.** Never animate `width`, `height`, `margin`, `padding`, or any layout property directly. Use the `layout` prop only when absolutely necessary and profiled.
4. **Dynamic imports for animated components.** Use `dynamic(() => import(...))` for any component that is primarily animated.
5. **Profile after every addition.** Use Chrome DevTools Performance tab + Lighthouse after adding any animated component. Address long tasks immediately.
6. **`will-change` sparingly.** Rely on Framer's built-in GPU optimizations. Don't add `will-change` unless profiling proves it helps.
7. **SSR compatibility.** Proper `"use client"` boundaries and `AnimatePresence` handling in Next.js App Router.
### Polish Rules (Make It Feel Built, Not Generated)
These rules come directly from tested UI engineering practice. They are what separates "AI slop" from a product that impresses.
 
8. **Define easing curves and design tokens before writing a single animation.** Use the locked values from `UIUX_BRIEF.md`. Never use default Framer easing or hardcoded timing values.
```css
   --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
   --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
   --ease-out:    cubic-bezier(0.0, 0, 0.2, 1);
```
 
9. **Layered shadows, never a single drop shadow.** A single `box-shadow` looks flat. Use the token system from `UIUX_BRIEF.md`. Every card surface uses `--shadow-card`. Every elevated element uses `--shadow-elevated`.
10. **Entrance animations: fade + rise + blur clear.**
    Every list item, card, and page section on mount:
    - `opacity: 0 → 1`
    - `translateY: 8px → 0`
    - `filter: blur(4px) → blur(0)`
    - Duration: 300ms · Easing: `--ease-smooth`
    - Stagger siblings at 50ms intervals.
11. **Tactile press states on every interactive element.**
    Every button, card, and tappable surface:
    - `transform: scale(0.98)` on `:active`
    - `transition: transform 100ms var(--ease-smooth)`
    - This applies whether the element is a Framer `motion` component or a plain HTML element with CSS.
12. **`prefers-reduced-motion` is non-negotiable.**
```tsx
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
```
    When reduced motion is enabled: skip all animations, snap to final state immediately. Implement via Framer's `useReducedMotion()` hook or a CSS `@media (prefers-reduced-motion: reduce)` override. This must be tested, not assumed.
 
---
 
## 5. Code & Engineering Constitutions
 
- **Simplicity First.** Prefer boring, maintainable solutions. No premature optimization. No unnecessary abstraction.
- **Type Safety.** Strict TypeScript throughout. No `any`. No `@ts-ignore` without a documented reason.
- **Accessibility.**
  - All interactive elements (buttons, icons, links, charts, form fields) must have explicit ARIA labels and roles.
  - Use `eslint-plugin-jsx-a11y` + manual checklist per phase.
  - Target WCAG AA minimum.
- **Testing.** Heavy manual dogfooding. Automated tests optional for v1 but encouraged for critical flows (habit logging, RLS enforcement).
- **Documentation Sync.** Any technical change affecting UX or architecture updates this TRD, `SCHEMA.md`, `UIUX_BRIEF.md`, or `PAGE_SPECS.md` as relevant — immediately, not later.
- **Git Workflow.** Small, focused commits. Clear commit messages even for solo work.
### Past Problems — Addressed At Architecture Level
- Fitness logging complexity → Simplified data models and UI in `SCHEMA.md` + `PAGE_SPECS.md`.
- UI inconsistencies → Design token system enforced in `UIUX_BRIEF.md` + this constitution.
- Auth visual breaks → Mandatory Clerk styling requirement.
- Theme switching chaos → Theme must be defined at project start or not added at all.
- SaaS drift → Non-Goals enforced in `PRD.md` and `AGENT_CONTEXT.md`.
- Over-polish without usage → All polish must serve daily personal usage. Dogfooding gates every phase.
---
 
## 6. Non-Functional Technical Requirements
 
- **Fast loading and interactions,** especially on mobile. <300ms perceived latency on all logging and navigation actions.
- **Clean, readable, well-commented code.** Portfolio quality. Someone reading this for the first time should understand the intent of every function.
- **Secure defaults.** RLS on every table. Input validation on all server actions. Auth enforced before any data operation.
- **Easy local development.** `next dev --webpack`. No complex setup. Env vars documented in README.
