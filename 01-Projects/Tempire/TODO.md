# Tempire — Current TODO

> Ordered by priority. Do not add items without removing or completing something first.

## 🔴 Critical (Broken in Production)
- [ ] Fix navigation redirects — "Back to Dashboard" / "Back to Marketplace" links going to landing page
- [ ] Category counters — replace mock numbers with real DB counts

## 🟠 High Priority (UI/UX Polish)
- [ ] Hamburger menu redesign — reference awwwards.com, current version functional but not premium
- [ ] Theme toggle — implement properly with CSS variables (previous attempts abandoned, looked high-contrast and wrong)
- [ ] General UI audit — dark mode looks okay, not proud of it. Use [[03-Resources/Skills/Agent-Prompting-Masterclass]] for the agent prompts

## 🟡 Medium Priority
- [ ] SEO push — foundation already built (sitemap, robots, JSON-LD), now needs content strategy → [[03-Resources/SEO-Marketing/]]
- [ ] Marketing context file — drafted in `product-marketing-context.md`, needs completing

## ✅ Done
- [x] Secure download proxy (human-readable filenames, ownership verification)
- [x] Supabase-backed wishlist with optimistic UI
- [x] Landing page (48 Laws of Design)
- [x] Metadata + JSON-LD schema markup
- [x] Dynamic sitemap.ts + robots.ts
- [x] Buyer flow: product grid, filters, search, infinite scroll
- [x] Product detail page with dynamic OG images
- [x] Seller flow: upload form, product management
- [x] Cart + mock checkout flow
- [x] Basic seller dashboard
- [x] Clerk auth + RBAC middleware
- [x] RLS on all Supabase tables
- [x] Emergency repo recovery (2026-05-11, power loss during commit)

**Tags:** #tempire #todo
