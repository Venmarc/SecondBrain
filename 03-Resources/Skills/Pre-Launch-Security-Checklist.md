---
title: Pre-Launch Security Checklist
date: 2026-06-28
tags:
  - security
  - tempire
  - momentum
  - todo
  - skill
  - compliance
  - supabase
  - rls
aliases:
  - Pre-Launch Security Checklist
  - Pre-Launch Security Audit
  - Vibe Coder Security Checklist
---

# Pre-Launch Security Checklist

> **One-line Summary**: Distilled security checklist for AI-augmented developers before shipping any public project, cross-referenced against Tempire and Momentum's known gaps.

**Source:** [@PrajwalTomar_ on X](https://x.com/PrajwalTomar_/status/2059612250047209957) + cross-referenced with 2026 vibe coding breach post-mortems (Moltbook, Lovable CVE-2025-48757)

---

## Why This Exists

The original article's premise: *"Vibe coders are not just getting sued. They're getting drained. $200 Supabase bills overnight. Cease and desist letters in week 2. Spam floods on day one."*

Real consequences documented in 2026:
- Moltbook (fully AI-built) → DB misconfigured, 1.5M API tokens + 35K emails exposed within 3 days of launch
- Lovable apps → 170 of 1,645 scanned had zero RLS, any user could read all rows
- $200+ Supabase bills overnight from no rate limits on public endpoints
- Class-action lawsuits filed against vibe-coded apps for data exposure

This is your 30-minute pre-launch pass. Run it before you push any project to production.

---

## 🔴 CRITICAL — Fix Before Any Public Launch

### 1. Secret Scanning — Secrets Exposed in Frontend = Instant Breach

**The trap:** AI tools hardcode API keys in source files. If it goes to a public repo or ships in a JS bundle, it's public.

**What to check right now:**
```bash
# Run this in your Tempire and Momentum repos
grep -r "sk-" . --include="*.ts" --include="*.tsx" --include="*.js" --include="*.env*"
grep -r "STRIPE_SECRET" . --include="*.ts" --include="*.tsx"
grep -r "SUPABASE_SERVICE_ROLE" . --include="*.ts" --include="*.tsx"
grep -r "OPENAI_API_KEY" . --include="*.ts" --include="*.tsx"
# Or use the tool:
# npx gitleaks detect --source .
```

**Hard rules:**
- `NEXT_PUBLIC_` prefix = exposed to browser bundle = DO NOT use for secrets
- `SUPABASE_SERVICE_ROLE_KEY` must NEVER appear in client components or any file imported by them
- Stripe secret key server-side only, always
- `.env.local` must be in `.gitignore` and verified to never have been committed
- Run `git log --all -- .env` to check history

---

### 2. Supabase RLS — Most Common Critical Vulnerability

**The trap:** RLS is off by default. AI generates the schema. AI does NOT reliably add policies. Turning RLS on without policies still blocks everything, but having a permissive policy (`USING (true)`) is worse than useless.

**The real check (not just "is RLS on"):**
1. Go to Supabase Dashboard → Table Editor → for each table, verify RLS is ON
2. Go to Authentication → Policies → verify each table has policies, not just RLS enabled
3. The test that actually matters: impersonate User B, try to read User A's rows

**Test prompt for Antigravity:**
```
Act as a malicious authenticated user (User B) with a valid session and the public anon key.
My app uses Supabase. Try to read rows belonging to User A from every table.
List every query, header, and parameter you'd use.
Then audit the RLS policies and fix any that return User A's data to User B.
Re-test after fixing.
```

**Supabase's built-in tool:** Dashboard → Database → Security Advisor. Run it. Fix everything flagged.

---

### 3. Rate Limiting — The $200 Bill Vector

**The trap:** AI generates zero rate limiting. Any public endpoint without rate limits can be hammered by a bot in minutes. On Supabase free tier (~20 connections), this tanks the whole app. On paid OpenAI endpoints, this creates runaway bills.

**Minimum viable rate limiting:**
- Auth endpoints: 5 requests/minute per IP
- General API: 100 requests/minute per user
- File uploads/downloads: 10 requests/minute per user

**Stack to use (already in Tempire's context):**
```typescript
// Upstash Redis + @upstash/ratelimit
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, '60 s'),
});
```

**DO NOT rate limit on the frontend** — it's security theater. Anyone can bypass it by hitting the API directly.

---

### 4. Stack Traces Leaking in Production

**The trap:** In dev mode, Next.js surfaces full error details. When you push to production without configuring proper error handling, stack traces leak to users, exposing your internal file paths, table names, and logic.

**Fix:**
- `global-error.tsx` must exist
- All Server Actions must return generic user-facing errors, not raw database errors
- Never `console.error(error)` on the client in production
- Ensure `NODE_ENV=production`

---

## 🟠 HIGH PRIORITY — Fix Before Meaningful Traffic

### 5. Legal Compliance — ToS and Privacy Policy

**The trap:** You're collecting user data. Without a Privacy Policy and Terms of Service, you are in violation of GDPR and other regulations, and potentially liable.

**Minimum for Apps:**
- Privacy Policy: what data you collect, how it's stored, how users can delete it
- Terms of Service: refund policy, permitted use, IP ownership
- Cookie Policy: if you use analytics

**Free generators:**
- [Termly](https://termly.io) — free tier
- [iubenda](https://iubenda.com) — free tier
- Do NOT leave placeholders in production

---

### 6. CORS — AI Defaults to Wildcard

**The trap:** When AI hits a CORS error during development, it "fixes" it by setting `Access-Control-Allow-Origin: *`. This allows any website to make authenticated requests to your API on behalf of a logged-in user.

**Fix:**
```typescript
// Never in production:
// 'Access-Control-Allow-Origin': '*'

// Always in production:
const allowedOrigins = ['https://tempire.xyz', 'https://www.tempire.xyz'];
```

**Check:** Search your codebase for `Allow-Origin: *` or `origin: '*'` or `cors({ origin: true })`.

---

### 7. Input Validation — XSS and Injection

**The trap:** AI generates functional forms. It does NOT reliably add server-side sanitization. User-submitted content rendered without escaping = XSS. Database queries built from user input without parameterization = SQL injection.

**What to add:**
- Any content rendered as HTML must be sanitized with DOMPurify or similar
- React auto-escapes JSX by default — but `dangerouslySetInnerHTML` bypasses this (grep for it)
- All Supabase queries go through the client SDK, which uses parameterized queries (already handled)

---

### 8. Auth vs. Authorization Gap

**The trap:** "User is logged in" ≠ "User can access this resource". AI generates auth that checks *authentication* but often forgets *authorization*.

**Test:** Log in as a low-privilege user. Try to manually navigate to an admin or seller route. What happens?

---

## 🟡 MEDIUM — Do Before You Promote

### 9. Supabase Storage Buckets — Public vs Private

**Check:** Any bucket storing purchased/private files must be private. Only public assets (thumbnails, avatars) should be public.

In Supabase Dashboard → Storage → Buckets → verify bucket visibility settings.

---

### 10. Dependency Audit — AI Picks Outdated Packages

**The trap:** AI training data has a cutoff. It often suggests package versions from 1-2 years ago with documented CVEs.

```bash
npm audit
# Or for a deeper scan:
# npx snyk test
```

---

### 11. Security Headers

**The trap:** Vercel doesn't add security headers automatically.

Add to `next.config.ts` / `next.config.js`:
```typescript
headers: async () => [{
  source: '/(.*)',
  headers: [
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  ],
}]
```

---

## Tempire-Specific Action List

| Issue | Tempire Status | Action |
|-------|--------------|--------|
| RLS on all tables | ✅ Documented | ✅ Verify policies aren't `USING (true)` |
| Service role key server-only | ✅ TRD rule | ✅ Grep to verify |
| Download proxy rate limiting | ❌ Not mentioned | 🔴 Add Upstash rate limiting to `/api/download` |
| ToS + Privacy Policy | ❌ `#todo/research` | 🔴 Generate and deploy |
| CORS config | ❓ Unknown | 🟠 Audit `proxy.ts` and any API routes |
| Stack trace leak | ✅ global-error.tsx documented | ✅ Verify in production |
| Input sanitization | ✅ Zod on forms | 🟠 Grep for `dangerouslySetInnerHTML` |
| Auth vs. Authorization | ✅ Role-based Clerk | ✅ Manual test: buyer → seller route |
| Storage bucket visibility | ✅ Documented | ✅ Verify in actual Supabase project |
| Dependency audit | ❌ Not mentioned | 🟡 Run `npm audit` |

---

## The 30-Minute Execution Order

1. `npx gitleaks detect --source .` in both repos (5 min)
2. Supabase Dashboard → Security Advisor → fix all flagged items (10 min)
3. Grep for `NEXT_PUBLIC_SUPABASE_SERVICE_ROLE` and `dangerouslySetInnerHTML` (3 min)
4. Add rate limiting to download proxy and auth endpoints (5 min)
5. Generate Privacy Policy + ToS on Termly, deploy to `/privacy` and `/terms` (5 min)
6. Run `npm audit` — fix any critical or high CVEs (2 min)

---

## Related Resources in Vault
- [[03-Resources/Skills/Secure-Downloads-Middleware]] — download proxy and RLS audit guide
- [[03-Resources/Skills/Theme-Switching-Foundation]] — auth race condition patterns
- [[01-Projects/Tempire/TODO]] — add rate limiting and ToS to 🔴 Critical
- [[01-Projects/Tempire/Decisions]] — document CORS and rate limit decisions when implemented
- [[01-Projects/Momentum/Docs/DEV_NOTES]] — mentions ToS gap and privacy policy concern

**Tags:** #security #tempire #momentum #todo #skill #compliance #supabase #rls
