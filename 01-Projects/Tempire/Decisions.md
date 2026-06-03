# Tempire — Architecture Decisions

> Every "why" behind every "what." Read this before asking the agent to change anything.

## Stack Decisions

### Auth: Clerk (not NextAuth, not Supabase Auth)
**Why:** Clerk gives us role management (buyer/seller) out of the box, pre-built UI components, and webhook support without extra config. NextAuth requires more manual plumbing for roles. Supabase Auth lacks the polish for a premium marketplace feel.
**Trade-off:** Vendor lock-in. Acceptable — Clerk's DX is worth it at this stage.

### Database: Supabase Postgres (not PlanetScale, not Neon)
**Why:** Realtime subscriptions via `postgres_changes`, built-in Storage for file uploads, RLS for security, and a generous free tier. PlanetScale had no RLS equivalent. Neon lacks Storage.
**Trade-off:** Supabase cold starts on free tier. Mitigated by keeping DB operations server-side only.

### Styling: Tailwind CSS 4 + shadcn/ui (not plain CSS, not MUI)
**Why:** shadcn gives us accessible, unstyled primitives we own — not a dependency. Tailwind 4 is faster and cleaner. MUI looks corporate and fights customization.
**Trade-off:** More upfront setup than MUI. Worth it for the design control.

### Client State: TanStack Query (not Zustand, not Redux)
**Why:** We need server state sync (product lists, cart, wishlist) with caching and optimistic updates. TanStack Query is purpose-built for this. Zustand is for UI state, not server state.
**Trade-off:** Slightly more boilerplate than SWR. Worth it for the cache invalidation control.

### File Downloads: Proxy API Route (not raw Supabase URLs)
**Why:** Raw Supabase URLs expose UUIDs as filenames. Our proxy verifies ownership, forces download, and serves human-readable filenames (e.g. `My_Product_Title.zip`). This is a brand decision as much as a technical one.
**Decided:** 2026-05-11

### Wishlist: Supabase-backed (not localStorage)
**Why:** localStorage breaks across devices and doesn't survive clearing. Supabase wishlist syncs everywhere and signals Tempire is a real product, not a toy.
**Decided:** 2026-05-11

---

## UI/UX Decisions

### Dark Mode Only (Initial Launch)
**Why:** Faster to ship one theme well than two themes poorly.
**Status:** ⚠️ Reconsidering — theme toggle planned but previous attempts looked bad. Need proper CSS variable system before implementing.

### Design Reference: "48 Laws of Web Design"
**Why:** Ensures every component decision has an aesthetic principle behind it, not just vibes.
**Status:** Documented in agent skills, not yet in vault. → [[03-Resources/Design/48-Laws-of-Web-Design]]

---

## Decisions Pending
- [ ] Theme toggle implementation strategy (CSS variables vs. next-themes)
- [ ] Hamburger menu redesign (reference: awwwards.com style)
- [ ] Category counter — real data query vs. cached count
- [ ] Marketing: when to start SEO push

**Tags:** #tempire #decision #architecture
