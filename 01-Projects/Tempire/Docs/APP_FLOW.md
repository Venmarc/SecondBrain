# APP_FLOW.md - User Journeys & Navigation Paths

> **One-line Summary**: User journey mappings and protected/redirect route structure transitions for buyers and sellers.

**Last Updated:** June 25, 2026

## Purpose
This document maps every major user journey, navigation paths, and route transitions in Tempire. It serves as the complete navigation blueprint.

**Reference Files:**
- PRD.md (Product vision and features)
- TRD.md (Technical architecture)
- SCHEMA.md (Database schema)
- PAGE_SPECS.md (Page layouts and functionality)
- UI/UX_BRIEF.md (Design system)
- PHASES.md (Implementation roadmap)
- NOTES.md (Development log)

**Update Rule:**  
Any change to routes, navigation, or user flows must be updated here with date and reasoning.

## Route Structure Overview

```
/                          → Home / Landing
/products                  → Browse Products
/products/[id]             → Product Detail
/cart                      → Cart
/checkout                  → Mock Checkout
/success                   → Purchase Success

/auth/...                  → Clerk handled routes

/(protected)/dashboard/
  seller/                  → Seller Dashboard
    upload/                → Upload Product
  buyer/                   → Buyer Dashboard
```

## Complete User Journeys

### 1. Guest / New Visitor Journey
1. Land on `/` (Home)
2. Browse featured products → Click card → `/products/[id]`
3. On Product Detail:
   - Click **Add to Cart** → Adds to local cart + toast → stays on page
   - Click **Buy Now** → Redirect to `/sign-in` (with redirect URL)
4. After sign-in → redirected back to Product Detail or Cart
5. Go to `/products` (Browse) → use filters/search
6. Go to `/cart` → Proceed to Checkout

### 2. Buyer Journey (Authenticated)
1. Sign in → redirected to `/` or previous page
2. Browse → `/products` or direct to `/products/[id]`
3. Add to cart / Buy Now
4. Go to `/cart` → Review items → `/checkout`
5. Complete mock checkout → `/success` (with order ID)
6. From success → Go to Buyer Dashboard `/dashboard/buyer`
7. In Buyer Dashboard:
   - View purchases
   - Click **Download** → Server Action generates signed URL → file download

**Navigation from anywhere (Buyer):**
- Top nav → Home, Browse, Cart (with item count), Dashboard (Buyer view)

### 3. Seller / Creator Journey
1. Sign up / Sign in
2. Clerk metadata or profile update → Set `is_seller: true`
3. Access Seller Dashboard: `/dashboard/seller`
4. Main flows:
   - Overview (sales summary)
   - **My Products** → List + Edit
   - **Upload New Product** → `/dashboard/seller/upload`
5. After successful upload → Redirect to My Products or Product Detail

**Seller-only Navigation:**
- Sidebar in dashboard: Overview, My Products, Upload, Analytics, Settings

### 4. Full Purchase Flow (End-to-End)
1. `/products/[id]` → Click **Buy Now**
2. If not logged in → `/sign-in` → back to product
3. Add to cart (optional) → `/cart`
4. `/checkout` → Review order + mock payment form
5. Submit → Create order in Supabase → Grant download access
6. Redirect to `/success/[orderId]` or generic success
7. Success page → "Go to Downloads" → Buyer Dashboard

### 5. Navigation Map (From Every Page)

**From Home (`/`):**
- Browse Products → `/products`
- Featured Product Cards → `/products/[id]`
- "Become a Seller" CTA → Seller Dashboard or onboarding

**From Browse (`/products`):**
- Product Card → `/products/[id]`
- Filters / Search → same page (server-side)
- Cart icon → `/cart`

**From Product Detail (`/products/[id]`):**
- Creator name/avatar → Creator profile (future: `/profile/[username]`)
- Add to Cart → stays + toast
- Buy Now → Cart or Checkout flow
- Related products → other `/products/[id]`

**From Cart (`/cart`):**
- Continue Shopping → `/products`
- Remove item
- Proceed to Checkout → `/checkout`

**From Seller Dashboard:**
- Upload button → `/dashboard/seller/upload`
- Product row → `/products/[id]` (view as buyer) or Edit mode

**Global Navigation (All Pages)**
- Top Navbar: Logo (Home), Search, Browse, Cart (badge), Account (dropdown: Dashboard, Profile, Sign Out)
- Mobile: Hamburger menu with same links + role-based items
- Footer: Links, categories, etc.

## Protected Routes (Middleware Enforced)
- All `/dashboard/*` → Require authentication + correct role
- `/checkout` → Require authentication
- Seller-only actions (upload, edit product) → Check `is_seller` flag

## Redirect Rules
- Unauthenticated user tries protected route → `/sign-in?redirect_url=...`
- Seller accesses buyer dashboard → redirect to seller dashboard (or show message)
- Successful checkout → clear cart + redirect to success