> **One-line Summary**: Premium digital template marketplace (tempire.xyz) — **demoted to later**. Revisit after frontend skills improve. Backend/RBAC strengths stay; UI polish is the real gap.

# Tempire

**Status:** Later / paused  
**Live:** [Tempire](https://tempire.xyz/)
**Slogan:** Build your empire, one template at a time.

## What it is

Premium niche marketplace for vetted production-ready digital assets (templates, UI kits, prompts, Figma, ebooks). Lego-style bedrock (Next.js, Tailwind, Supabase, TypeScript) so buyers focus on unique logic. 20-point quality bar. Lifetime ownership. "48 Laws of Web Design" aesthetic target.

## Why demoted (2026-07-09)

Victor will revisit after leveling **frontend** craft. Agents already handle backend well; Tempire's remaining work is premium UI/UX, not more plumbing. Active focus is [[01-Projects/Momentum/Momentum|Momentum]] + [[01-Projects/Ledger/Ledger|Ledger]].

**Learning while paused (2026-07-09):** [[03-Resources/Skills/Reverse-Engineering-UI-Components|Reverse-engineer]] components from UI libraries → rebuild → tokenize → reuse (same or modified) in new designs.

## Tech stack

- Next.js App Router + TypeScript strict · Tailwind + shadcn/ui  
- Clerk (auth + buyer/seller RBAC) · Supabase (Postgres, Realtime, Storage) server-side  
- TanStack Query · Zod · @vercel/og · Vercel deploy  

## Product snapshot

- **Buyers:** browse, filter, search, wishlist, cart, library downloads  
- **Sellers:** upload/manage products, basic analytics  
- **Differentiator:** quality bar + lifetime ownership + secure human-readable download proxy  

## Architecture decisions (condensed)

| Decision | Why |
|----------|-----|
| Clerk auth | Roles (buyer/seller), UI, webhooks — less plumbing than NextAuth |
| Supabase Postgres | RLS, Storage, Realtime; free tier cold starts accepted |
| Tailwind 4 + shadcn | Owned primitives, design control |
| TanStack Query | Server-state cache + optimistic UI |
| Download proxy API | Ownership check + human-readable filenames (not raw UUID URLs) |
| Wishlist in Supabase | Cross-device; not localStorage |
| Dark-first | Ship one theme well; theme toggle was attempted and looked bad without proper tokens |

**Pending when revisited:** theme strategy (CSS variables), hamburger redesign (awwwards-level), real category counters, SEO/content push.

## TODO (when revived)

### Critical (prod)
- [ ] Fix navigation redirects — "Back to Dashboard/Marketplace" → landing incorrectly  
- [ ] Category counters — real DB counts, not mocks  

### High (UI)
- [ ] Hamburger menu redesign  
- [ ] Theme toggle done properly (tokens)  
- [ ] General UI audit — dark mode "okay, not proud"  

### Medium
- [ ] SEO content strategy  
- [ ] Finish product-marketing context file  

### Done (keep)
- [x] Secure download proxy · Supabase wishlist · Landing · Metadata/JSON-LD · sitemap/robots  
- [x] Buyer grid/filters/search · Product detail + OG · Seller upload · Cart/mock checkout  
- [x] Clerk RBAC · RLS · Emergency git recovery after power loss (2026-05-11)  

## Session log (condensed)

### 2026-06-03
Paused ~2 weeks. Mobile nav bugs, weak hamburger, mock category counts. Root cause of weak agent UI: **prompts**, not tools. Next was UI overhaul via better prompting.

### 2026-05-11
Power-loss git corruption → recovery via reflog/object cleanup. Secure downloads, wishlist migration, landing/SEO foundations restored.  
**Lesson:** reflogs save lives on unstable power. See [[03-Resources/Code-Snippets/Supabase/Git-Recovery-Power-Loss|Git Recovery Power Loss]].

## Notes (product essence)

Solves blank-page problem for creators. Vetted excellence vs random marketplace quality. Buyers get a real library; sellers get a pro dashboard. Shortcut from idea to launch.

## Formal docs (kept separate — full specs)

Do not dump entire specs into this hub. When Tempire is active again, use:

- [[01-Projects/Tempire/Docs/README|README]] · [[01-Projects/Tempire/Docs/PRD|PRD]] · [[01-Projects/Tempire/Docs/TRD|TRD]]  
- [[01-Projects/Tempire/Docs/PAGE_SPECS|PAGE_SPECS]] · [[01-Projects/Tempire/Docs/APP_FLOW|APP_FLOW]] · [[01-Projects/Tempire/Docs/UIUX_BRIEF|UIUX_BRIEF]]  
- [[01-Projects/Tempire/Docs/SCHEMA|SCHEMA]] · [[01-Projects/Tempire/Docs/PHASES|PHASES]]  

## Related skills

- [[03-Resources/Skills/Agent-Prompting-Masterclass|Agent Prompting Masterclass]]  
- [[03-Resources/Design/48-Laws-of-Web-Design|48 Laws of Web Design]]  
- [[03-Resources/Skills/Secure-Downloads-Middleware|Secure Downloads Middleware]]  
- [[03-Resources/Skills/Theme-Switching-Foundation|Theme Switching Foundation]]  

**Tags:** #tempire #project #later #paused
