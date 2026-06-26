# PRD.md - Tempire

> **One-line Summary**: Product Requirements Document outlining vision, goals, features, and success criteria for the Tempire marketplace.

## Product Vision
Tempire is a premium niche marketplace where creators sell high-quality digital products (AI prompts, Notion templates, Figma UI kits, ebooks, presets, etc.). It delivers a fast, polished, secure, and delightful experience for both buyers and sellers.

This is a **portfolio-grade production demo**. Every detail must feel like a real SaaS product ready for users. Target: 95+ Lighthouse scores, buttery smooth UX, strong security, and excellent code quality.

## Project Goals
- Showcase senior-level full-stack skills (architecture, auth, payments flow, realtime, performance, SEO).
- Live on Vercel with clean URL.
- Easy to extend (real Stripe later, more features, etc.).
- Serve as a strong case study for interviews / clients.

## User Roles
1. **Buyer** — Browse, search, filter, purchase, download products.
2. **Seller/Creator** — Upload/manage products, view sales/analytics.
3. **Guest** — Browse and add to cart (limited).

## Core Value Propositions
- High-quality curated digital products with excellent previews.
- Secure downloads (Supabase private storage + signed URLs).
- Smooth purchase experience (mock checkout that feels real).
- Creator-friendly dashboard.
- Fast and beautiful UI.

## Key Features (MVP)

**Buyer Side**
- Product discovery (grid, filters, search, infinite scroll, categories)
- Rich product detail page (gallery, description, social proof, purchase options)
- Cart + mock checkout flow
- Purchase history & downloads

**Seller Side**
- Product upload (with file to Supabase Storage)
- My products management
- Basic sales analytics

**Shared**
- Clerk authentication + role management
- Responsive + accessible design
- Real-time updates (price/stock/live activity where relevant)
- SEO optimized pages + dynamic OG images

## Success Metrics
- Lighthouse: 95+ across Performance, Accessibility, Best Practices, SEO
- INP < 200ms, FCP < 1.2s
- Fully responsive (mobile-first)
- All critical paths manually tested
- Clean, maintainable, well-typed codebase

## Documentation System (Reference These Files)
- **TRD.md** → Tech stack, architecture decisions, constitution, coding standards
- **SCHEMA.md** → Database schema, RLS policies, data models
- **PAGE_SPECS.md** → Detailed page-by-page layouts and functionality
- **APP_FLOW.md** → Complete user journeys and navigation
- **UI/UX_BRIEF.md** → Design system, colors, typography, micro-interactions
- **PHASES.md** → Implementation roadmap with verification steps
- **NOTES.md** → Development log, decisions, open issues

**Primary Rule**: Always reference PRD.md + relevant supporting docs in every chat. Do not deviate from the defined stack or architecture without explicit approval.

This PRD.md is the single source of truth for "what" we are building. Technical "how" lives in TRD.md and other files.