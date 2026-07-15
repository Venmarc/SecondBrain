# TRD.md - Technical Requirements & Architecture Decisions

> **One-line Summary**: Technical Requirements Document defining tech stack, folder structure, performance standards, and design constitution for Tempire.

**Last Updated:** June 25, 2026

## Purpose
This document defines the complete technical foundation, architecture, coding standards, and constitution for **Tempire**. It is the single source of truth for all "how" decisions.

**Reference Files:**
- PRD.md (Product vision, features, success metrics)
- SCHEMA.md (Database schema, RLS policies, data models)
- PAGE_SPECS.md (Detailed page layouts and functionality)
- APP_FLOW.md (User journeys and navigation)
- UI/UX_BRIEF.md (Design system, colors, typography, micro-interactions)
- PHASES.md (Implementation roadmap with verification steps)
- NOTES.md (Development log, decisions, open issues)

**Update Rule:**  
Whenever a significant technical decision is made (new library, architecture change, performance rule, security decision, etc.), update this file with:
- Date
- Decision
- Reasoning  
Keep this document accurate and up-to-date at all times.

## Tech Stack (Non-Negotiable)

**Framework & Language**
- Next.js 16+ App Router (Server Components by default)
- TypeScript (strict mode, no `any`)
- React 19

**Styling & UI**
- Tailwind CSS 4
- shadcn/ui components
- Mobile-first, fully responsive

**Authentication**
- Clerk (primary auth + user management)
- Middleware protection for all protected routes

**Database & Backend**
- Supabase (Postgres + Realtime + Storage)
- All database operations **server-side only** (Server Components, Server Actions, Route Handlers)
- No Supabase client keys exposed on frontend

**State & Data Fetching**
- TanStack Query (for client-side caching, optimistic updates, invalidation)
- Server Actions for mutations
- Zod for all form and input validation

**Other Tools**
- @vercel/og — Dynamic Open Graph images
- Sonner or react-hot-toast — Notifications
- Next.js Image component + built-in optimization

## Architecture Decisions

**Core Principles**
- Server Components first, Client Components only when interactivity is required (`"use client"`)
- Clear separation of concerns: UI components vs Services vs Actions
- All sensitive operations (DB, auth checks, file uploads) happen on the server
- Middleware runs auth + RBAC checks before any protected page renders

**Folder Structure**
```
app/                          # Next.js App Router
  (auth)/
  (protected)/                # Route group for dashboards
    dashboard/
      seller/
      buyer/
  products/
    [id]/
components/
  ui/                         # shadcn/ui
  marketplace/
  forms/
lib/
  supabase/                   # server.ts + client.ts
  utils.ts
  queries.ts
server/
  actions/
  services/                   # ProductService, OrderService, etc.
types/
hooks/
middleware.ts
```

**Real-time Strategy**
- Primary: Supabase Realtime (`postgres_changes` + private channels with RLS)
- Fallback: Server-Sent Events (SSE) when needed

**Performance Targets**
- Lighthouse: 95+ across all categories
- FCP < 1.2s
- INP < 200ms
- LCP < 2s
- Minimal client-side JavaScript

## Coding Standards & Constitution

**Design Constitution**
- Aesthetic: Premium "80% Shift" centered layout
- Typography: Inter (body), Outfit (headings)
- Default: Dark mode with deep grays (#0a0a0a) + vibrant accents
- UI Style: shadcn/ui patterns, rounded-2xl, subtle depth, buttery micro-interactions only where performance allows

**Development Rules**
- Plan first → List files, edge cases, data flow → Get approval
- Implement happy path + basic error handling first
- Manual testing required before any refactoring or polish
- New chat per major feature/phase
- Always reference PRD.md + TRD.md + relevant docs

**Forbidden Practices**
- Client-side Supabase queries
- Inline styles or arbitrary Tailwind values (use consistent design tokens)
- Outdated Next.js patterns
- Large uncontrolled changes in one go
- Refactoring before functionality works

**Error Handling**
- User-friendly messages via toasts
- Proper error boundaries
- Server-side logging for critical errors

**SEO & Accessibility**
- Dynamic metadata + OG images on all product pages
- Semantic HTML, ARIA labels, keyboard navigation
- Screen-reader friendly

---
## Related
- Hub: [[01-Projects/Tempire/Tempire|Tempire]]
- Docs: [[01-Projects/Tempire/Docs/PRD|PRD]] · [[01-Projects/Tempire/Docs/TRD|TRD]] · [[01-Projects/Tempire/Docs/PHASES|PHASES]]
- Skills: [[03-Resources/MOC-UI-UX-Lessons|UI/UX MOC]] · [[03-Resources/Design/48-Laws-of-Web-Design|48 Laws]]
- Business: [[02-Areas/Business-Wealth/Revenue-Engines|Revenue Engines]]
- Projects: [[03-Resources/MOCs/MOC-Projects|MOC: Projects]]
