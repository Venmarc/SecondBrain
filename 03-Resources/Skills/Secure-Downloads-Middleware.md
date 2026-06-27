# Skill: Secure Downloads & Compliance

> **One-line Summary**: Security best practices for serving digital products via proxy route handlers and enforcing mandatory legal templates and RLS audits.

## Description
This guide outlines architectures for securing downloadable assets via backend proxies and establishes project compliance checklists to defend digital creator platforms.

## Use When
Use this skill when designing digital product download flows, setting up Supabase RLS policies, writing security audits, or drafting project launch checklists.

## Core Security & Defensibility Practices

### 1. Download Proxying (Secure Asset Serving)
*   **The Trap:** Exposing raw, public storage URLs of digital files allows unauthenticated users to download products for free once they obtain the link.
*   **The Fix:** 
    1. Place downloadable assets in a **private** Supabase Storage bucket (`product-files`).
    2. Serve download requests through a Next.js server-side Route Handler (e.g., `/api/download?id=...`) rather than direct links.
    3. Within the handler, verify that the active user has paid for the product (by checking the `orders` or `purchases` table in Supabase).
    4. Upon successful validation, use the Supabase Admin API on the server to generate a short-lived Signed URL (e.g., valid for 60 seconds) and redirect the user's browser to it.

### 2. Legal Compliance & RLS Audits
*   **Constitutional Rule:** All MVP and SaaS projects must undergo a basic security and compliance check before a public showcase deployment.
*   **Standard Deliverables:**
    *   **Terms of Service (ToS) & Privacy Policy:** Provide clear terms for refund policies, digital copyright, and user data usage.
    *   **Supabase RLS Audit:** Mandate that all database tables have Row Level Security enabled. Verify that default policies block all anonymous writes and selectively permit authenticated operations.
*   **Future Action Policy:** 
    *   **Victor** will conduct further research and document RLS security audit checklists and templates.
    *   **Status Tag:** `#todo/research` (Victor will provide more info on standard compliant templates and audit scripts later).

## Related Links
*   [[03-Resources/Skills/Theme-Switching-Foundation|Theme Switching Foundation]]
*   [[01-Projects/Tempire/Docs/SCHEMA|Tempire Schema]]
*   [[index|Master Hub Index]]

**Tags:** #skill #security #supabase #rls #compliance #todo/research #tempire
