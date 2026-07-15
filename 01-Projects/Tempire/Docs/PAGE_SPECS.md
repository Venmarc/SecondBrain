# PAGE_SPECS.md - Page Layouts & Functionality

> **One-line Summary**: Layout structures, key components, and data requirements for each individual page of the Tempire web application.

**Last Updated:** June 25, 2026

## Purpose
This document defines every major page in Tempire — including layout structure, key components, functionality, user interactions, and data requirements.

**Reference Files:**
- PRD.md (Product vision and features)
- TRD.md (Technical architecture and standards)
- SCHEMA.md (Database schema and RLS)
- APP_FLOW.md (User journeys and navigation)
- UI/UX_BRIEF.md (Design system and interactions)
- PHASES.md (Implementation roadmap)
- NOTES.md (Development log)

**Update Rule:**  
Any change to page layout, functionality, or behavior must be updated here with date and reasoning.

## Page Directory

### 1. Home / Landing Page (`app/page.tsx`)
**Layout:**
- Hero section (centered, strong headline + CTA)
- Featured products carousel / grid
- Categories showcase
- Creator spotlight / testimonials
- Footer

**Functionality:**
- Dynamic hero with search bar (redirects to browse page)
- "Browse All Products" CTA
- Trending / New arrivals sections (server-fetched)
- SEO-optimized metadata + dynamic OG image

**Target Users:** Guests, new visitors

---

### 2. Browse / Products Grid (`app/products/page.tsx`)
**Layout:**
- Top: Search bar + filters (sidebar on desktop, drawer on mobile)
- Main: Responsive product grid (responsive cards)
- Pagination / Infinite scroll
- Top bar: Results count, sort options

**Key Components:**
- Product Card (image, title, price, creator avatar, rating)
- Filter sidebar: Category, price range, tags, sort

**Functionality:**
- Server-side filtering + search
- Infinite scroll with TanStack Query
- "Add to Cart" from card
- Responsive filter behavior

---

### 3. Product Detail Page (`app/products/[id]/page.tsx`)
**Layout:**
- Two-column on desktop (Image gallery left | Info + purchase sidebar right)
- Mobile: Stacked (gallery → info → sidebar)
- Breadcrumbs
- Rich description section
- Related products

**Key Sections:**
- Image gallery with lightbox
- Product header (title, price, rating, creator link)
- Purchase sidebar (Add to Cart / Buy Now / Download if purchased)
- Description & specs
- Reviews / social proof (future)

**Functionality:**
- Dynamic metadata + OG image generation
- Server-side data fetching (product + creator profile)
- Check purchase status for current user
- State-aware buttons (Guest → login, Owner → Edit, Buyer → Download)
- Track product view

**Edge Cases:** Product not found, inactive, free product, already purchased.

---

### 4. Seller Dashboard (`app/(protected)/dashboard/seller/page.tsx`)
**Layout:**
- Sidebar navigation (Dashboard, My Products, Upload, Analytics, Settings)
- Main content area

**Main Views:**
- Overview: Sales summary, recent orders, earnings
- My Products: Grid of own products with edit/delete
- Upload Product: Multi-step form
- Analytics: Simple charts (sales over time, top products)

**Functionality:**
- Protected (seller role only)
- Product management (CRUD)
- File upload to Supabase Storage
- Basic revenue stats

---

### 5. Buyer Dashboard / Purchases (`app/(protected)/dashboard/buyer/page.tsx`)
**Layout:**
- Sidebar: Purchases, Downloads, Wishlist, Settings

**Main Views:**
- My Purchases: List of bought products with download buttons
- Download history
- Active cart summary (if any)

**Functionality:**
- List of orders with status
- Signed URL generation for downloads (server-side)
- Re-download access

---

### 6. Cart Page (`app/cart/page.tsx`)
**Layout:**
- Cart items list
- Order summary sidebar (subtotal, total, checkout button)

**Functionality:**
- Add/remove items
- Quantity adjustment (if supported)
- Persistent cart (localStorage + Supabase for logged-in users)
- "Proceed to Checkout" CTA

---

### 7. Mock Checkout (`app/checkout/page.tsx`)
**Layout:**
- Two column: Order items | Payment details (mock)
- Form for mock payment info

**Functionality:**
- Review order
- Mock payment processing (success simulation)
- Create order record in Supabase
- Grant download access
- Clear cart on success
- Redirect to success page

---

### 8. Upload Product Page (`app/(protected)/dashboard/seller/upload/page.tsx`)
**Layout:**
- Multi-step wizard or single detailed form
- Preview section

**Fields:**
- Title, description, price, category, tags
- File upload (Supabase Storage)
- Thumbnail upload
- Metadata (file format, size, etc.)

**Functionality:**
- Zod validation
- Server Action for upload + DB insert
- Progress indicators

---

### 9. Auth Pages
- Handled primarily by Clerk components (`/sign-in`, `/sign-up`, etc.)
- Custom redirects after auth based on role

### 10. Additional / Future Pages
- Profile page (`/profile/[username]`)
- Success page after checkout
- 404, Error pages
- Admin panel (future)

---

**General Requirements for All Pages**
- Server Components by default
- Proper loading states / skeletons
- Error boundaries
- Responsive design (mobile-first)
- Accessibility compliance
- SEO metadata where applicable
- Consistent navigation (top nav + mobile menu)

---
## Related
- Hub: [[01-Projects/Tempire/Tempire|Tempire]]
- Docs: [[01-Projects/Tempire/Docs/PRD|PRD]] · [[01-Projects/Tempire/Docs/TRD|TRD]] · [[01-Projects/Tempire/Docs/PHASES|PHASES]]
- Skills: [[03-Resources/MOC-UI-UX-Lessons|UI/UX MOC]] · [[03-Resources/Design/48-Laws-of-Web-Design|48 Laws]]
- Business: [[02-Areas/Business-Wealth/Revenue-Engines|Revenue Engines]]
- Projects: [[03-Resources/MOCs/MOC-Projects|MOC: Projects]]
