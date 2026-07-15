# PHASES.md - Implementation Roadmap & Orchestrator

> **One-line Summary**: Sequential implementation phases, verification steps, and build roadmap for Tempire development.

**Last Updated:** June 25, 2026

## Purpose
This document serves as the master orchestrator for building **Tempire**. It breaks the entire project into clear, sequential phases with verification steps, dependencies, and success criteria.

**Reference Files:**
- PRD.md (Product vision and features)
- TRD.md (Technical architecture and standards)
- SCHEMA.md (Database schema and RLS)
- PAGE_SPECS.md (Page layouts and functionality)
- APP_FLOW.md (User journeys and navigation)
- UI/UX_BRIEF.md (Design system and component behavior)
- NOTES.md (Development log and open issues)

**Update Rule:**  
Update this file whenever a phase is completed, modified, or reprioritized. Include completion date and notes.

## Development Rules (Strict)
- One phase at a time.
- Plan → Approve plan → Implement happy path + basic errors → Manual testing → Review → Polish (only if tests pass).
- New chat per major feature or phase.
- Always reference relevant docs in every agent prompt.
- Manual testing + Lighthouse check required before moving to next phase.

## Phase 1: Foundation & Setup (Must be completed first)

**Goals:** Working auth, database connection, basic layout, and protected routes.

**Tasks:**
- Initialize Next.js 15 + TypeScript + Tailwind + shadcn/ui
- Set up Clerk authentication + middleware
- Set up Supabase (client/server utils, env variables)
- Implement basic layout, navbar, footer, dark mode
- Create protected route group + role checking
- Basic error boundaries and loading states

**Verification:**
- Can sign up / sign in with Clerk
- Protected dashboard routes redirect unauthenticated users
- Supabase connection works (test query in server component)
- Lighthouse score > 90 on home page

---

## Phase 2: Database & Core Services

**Goals:** Solid data layer.

**Tasks:**
- Implement SCHEMA.md in Supabase (tables, RLS policies, Storage bucket)
- Create core services (`server/services/`)
  - AuthService, DatabaseService, ProductService, UserService
- Zod schemas for all major entities
- Basic seeding script for test products

**Verification:**
- Can create/read products via server actions
- RLS works correctly (users can’t see others’ data)
- Seller flag works for role-based access

---

## Phase 3: Buyer Discovery (Browse + Product Detail)

**Goals:** Core browsing experience.

**Tasks:**
- `/products` page with filters, search, infinite scroll
- Product Card component (following UI/UX_BRIEF)
- Full Product Detail page (`/products/[id]`)
  - Gallery, purchase sidebar, dynamic OG images
  - Purchase status checking
- Related products section

**Verification:**
- Filtering and search work server-side
- Dynamic OG images generate correctly
- All edge cases handled (not found, already purchased, free product)

---

## Phase 4: Cart & Mock Checkout Flow

**Tasks:**
- Cart page + persistent cart logic
- Checkout page with mock payment
- Order creation in Supabase
- Success page
- Download access (signed URLs)

**Verification:**
- Full end-to-end purchase flow works
- Download links only accessible to buyers
- Cart persists across login

---

## Phase 5: Seller Dashboard

**Tasks:**
- Seller Dashboard layout + navigation
- Upload Product flow (multi-step form + file upload)
- My Products management (list, edit, delete)
- Basic analytics overview

**Verification:**
- Only sellers can access seller dashboard
- Product upload works end-to-end (DB + Storage)
- Creator sees their own products only

---

## Phase 6: Polish, Realtime & Performance

**Tasks:**
- Supabase Realtime (live updates where valuable)
- Full responsive + micro-interactions (per UI/UX_BRIEF)
- SEO optimization across all pages
- Accessibility audit
- Performance optimization to hit 95+ Lighthouse
- Error handling and loading states everywhere

**Verification:**
- 95+ Lighthouse on major pages
- All micro-interactions feel premium but performant
- Real-time updates work (e.g., new products, sales count)

---

## Phase 7: Final Touches & Deployment

**Tasks:**
- README.md with setup instructions
- .env.example
- Deployment to Vercel
- Final testing + bug fixes
- Portfolio case study write-up (challenges, decisions, tech used)

**Verification:**
- Live site is fast, beautiful, and fully functional
- Code is clean and maintainable

---

## Build Order Recommendation
Follow the phases strictly in order. Do not jump ahead (e.g., do not build Seller Dashboard before Buyer flows are solid).

**Current Status:** [Update this as you progress]

---

This `PHASES.md` ties all other documents together and prevents scope creep or random feature building.

---
## Related
- Hub: [[01-Projects/Tempire/Tempire|Tempire]]
- Docs: [[01-Projects/Tempire/Docs/PRD|PRD]] · [[01-Projects/Tempire/Docs/TRD|TRD]] · [[01-Projects/Tempire/Docs/PHASES|PHASES]]
- Skills: [[03-Resources/MOC-UI-UX-Lessons|UI/UX MOC]] · [[03-Resources/Design/48-Laws-of-Web-Design|48 Laws]]
- Business: [[02-Areas/Business-Wealth/Revenue-Engines|Revenue Engines]]
- Projects: [[03-Resources/MOCs/MOC-Projects|MOC: Projects]]
