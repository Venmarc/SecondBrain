---
title: Error-Page Best Practices
source: https://x.com/i/grok?conversation=2067367863565041848
author:
published:
created: 2026-06-24
description: A convo with grok on error page best practices, and Canva color conversions
tags:
  - clippings
---
(user)
How is a 404 not-found page supposed to behave? What's it supposed to do? Any extra functions or should it just be simple? Should it have any buttons? Any other thing I should know? Best practices? Even worst practices? What to avoid? If an app uses sidebar navigation, should the page have the sidebar, or just have an array of links describing where to go?

(grok)
Oracle Cloud: Solid choice. Get the VM up, install your stack (Next.js is ARM-friendly), set up code-server or Tailscale for iPhone access, and test your Antigravity CLI early. Hit me with any specific deployment pain later — I'll rip it apart.

404 Page: Core Purpose

A 404 tells the user: "The thing you wanted doesn't exist here anymore (or never did)." That's it. Its job is to reduce frustration, prevent bounce, and get the user back into a useful flow as fast as possible. It is not a place to show off your design skills or meme dump unless it serves the primary goal.

Best Practices (What It Should Do)

- Clear, blunt messaging: Big "404 — Page Not Found". Short explanation: "Sorry, we couldn't find that page" or "The link you followed might be broken."
- Primary CTA: Prominent button/link to homepage. One strong "Go Home" or "Back to Dashboard" is usually enough.
	[justinmind.com](https://www.justinmind.com/web-design/best-404-pages)
- Secondary help:
	- Search bar (best if your app has good search).
		- 3-5 useful links (popular pages, recent projects, docs, etc.).
		- "Report broken link" option (smart for dev tools/apps).
- Brand-consistent but lightweight: Match your Next.js app's vibe and colors. Funny illustration or subtle humor is fine if it fits your "fancy vibe coder" style — but don't make it load heavy assets or animations that annoy mobile users.
	[uxpin.com](https://www.uxpin.com/studio/blog/404-page-best-practices/)
- Fast & responsive: This page must load instantly. No heavy JS if possible.
- SEO: Add \<meta name="robots" content="noindex" /> so Google doesn't index it.
	[dhiwise.com](https://www.dhiwise.com/post/how-to-create-an-engaging-next-js-404-page-for-your-web-app)

Sidebar Navigation on 404?

No. Strip the full sidebar. Your normal layout has sidebar nav because the user is oriented inside the app. On 404 they're lost — forcing the full sidebar adds noise and wasted space. Many pros deliberately exclude nav/footer on error pages.

[github.com](https://github.com/vercel/next.js/discussions/37311)

Better options:
- Minimal top nav with logo + Home link.
- Or a simple vertical/horizontal list of key links ("Dashboard", "Projects", "Docs", "Support").
- Full clean page with big centered content + buttons below.
In Next.js App Router: Create app/not-found.tsx. It bypasses normal layout in many cases, or you can explicitly control it.

Extra Functions?

- Nice-to-have: Suggest similar pages or recent items if you can detect context.
- Log the 404 (with the requested path) server-side for fixing bad links.
- Avoid: Auto-redirects (confusing), forms that don't work, or "clever" stuff that delays the user.

Worst Practices (Avoid This Trash)

- Blank or generic browser 404.
- "Oopsie whoopsie" baby talk (unless your brand is deliberately childish).
- No way forward — user has to hit browser back button.
- Heavy video/gif that tanks performance on mobile/iPhone.
- Fake navigation that looks like the real app but doesn't work.
- Burying the Home button.
- Long paragraphs explaining excuses.
Simple & bulletproof version for your app:
- Big 404 number + illustration (optional, keep light).  
- Clear message.  
- Big "Return to Home" button.  
- Search bar.  
- Quick links grid: Dashboard | My Projects | Docs | Support.  
- Footer with report link.
This keeps bounce low and feels professional for a developer tool/app.Your move: Sketch it or describe your current idea/vibe (humorous? minimal? dark mode fancy?), and I'll stress-test it hard. What's the overall tone of your app?

(user)
How about a global-error page or js script? What is it's function and best practices and all the stuff from the last prompt?

(grok)
Global error handling (global-error.tsx) is your last line of defense, not your main one. It's for catastrophic, uncaught runtime errors — especially those that would take down the root layout or the entire app.

Core Function

- Catches errors that bubble up to the root (errors in layout.tsx, template.tsx, or anything not caught by nested error.tsx boundaries).
- When triggered, it completely replaces the root layout. The page shows only what you put in global-error.tsx.
- It must be a Client Component ('use client').
- It receives { error, unstable\_retry? } (or reset in older versions).
- Goal: Prevent a total white screen of death. Give the user a way to recover and get back to safety.
	[nextjs.org](https://nextjs.org/docs/app/getting-started/error-handling)
It is rarely triggered if you have good nested error.tsx files. But you must have it for production safety.

Best Practices

- Keep it extremely simple and robust. Use minimal HTML/CSS. No complex components, heavy dependencies, or anything that could itself throw an error. Many recommend plain HTML + Tailwind if that's your stack.
	[youtube.com](https://www.youtube.com/watch?v=ywUDMEVR3Mg)
- Must include full \<html> and \<body> tags (with lang, etc.) because it replaces the root layout.
- Clear messaging: "Something went seriously wrong" + short apology/explanation.
- Strong recovery options:
	- Big "Try Again" / Retry button (calls reset() or unstable\_retry to re-render).
		- "Go to Home" button.
		- Optional: "Contact Support" or "Report Issue" (with error digest if safe).
- Styling: Match your brand/vibe but keep it lightweight. Fancy vibe coder? Subtle glitch animation or dark mode elegance is fine — but test it doesn't break.
- Logging: In production, log error.digest or send to Sentry / your monitoring tool (do this server-side where possible).
- Reset functionality: Always give users a way to recover without full page refresh.

Sidebar / Layout on Global Error?

No. The whole point is that normal layouts are gone. Don't try to force your sidebar in here — it defeats the purpose and risks more errors. Keep it minimal: centered content, buttons, maybe top logo + Home link.

Worst Practices (Trash to Avoid)

- Making it complex or dependent on broken parts of your app.
- No recovery button → user is stuck.
- Leaking real error messages/stack traces to users in production (Next.js scrubs them anyway, but don't bypass it).
- Forgetting \<html>\<body> → blank white page.
- Relying only on global-error and skipping nested error.tsx files.
- Heavy images, scripts, or third-party stuff that can fail.

Comparison to 404 and Regular error.tsx

- 404 (not-found.tsx): Expected "page missing" — graceful, informative, search + links.
- error.tsx (nested): For route-specific errors. Stays inside your normal layout (sidebar can remain). More common.
- global-error.tsx: Nuclear option. Full replacement. Use both error.tsx (root level) + global-error.tsx.
Recommended Minimal Structure for your fancy vibe app:

```tsx
'use client';

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html>
      <body className="bg-zinc-950 text-white flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md">
          <h1 className="text-8xl font-bold mb-4">💥</h1>
          <h2 className="text-4xl mb-6">Something broke</h2>
          <p className="mb-8 text-zinc-400">
            Our AI-augmented systems had a meltdown. This is embarrassing.
          </p>
          
          <div className="flex gap-4 justify-center">
            <button 
              onClick={unstable_retry}
              className="px-8 py-3 bg-white text-black rounded-xl font-medium"
            >
              Try Again
            </button>
            <a href="/" className="px-8 py-3 border border-white/30 rounded-xl">
              Back to Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
```

This is solid for your style.Your move: Do you want me to tear apart a specific design/implementation you have in mind? Or compare it to a regular error.tsx setup? Throw it at me. Also, confirm you're on App Router — I assume yes with Next.js modern stack.

  
(user)
[image]
- The current logo I made with Canva is slightly lighter than the color of the accents used in the landing page and around the app. It looks off and doesn't fit in with the site's accents that i like.
- Although I used the same #22C55E color code advised by the Design Brief, the logo is brighter than the one of the page (and this /home/redmane/Pictures/Screenshots/404.png screenshot of a 404 text). the 404 image looks deeper than the logo. I like the deeper variation used by the site
- This variation is as a result of Canva's saturation, sRGB colors, and some other things my reasons-search found.
- I'll like to know the exact color for the logo /home/redmane/Downloads/Momentum-logo (1).png. If, for the same #22C55E color code, Canva uses a lighter color where the site uses a deeper color, what will the deeper version of the logo then be? Btw, the site is [Momentum](https://peakmomentum.vercel.app).

(grok)
**Ruthless feedback: Your logo is off because Canva is lying to you with color management.**
#22C55E is a bright, saturated lime-green. Canva's export (especially with sRGB + its default settings) often renders it lighter and more washed-out compared to how Tailwind/CSS renders the exact same hex in the browser. That's why it clashes with your 404 text and accents on the live site.

Exact deeper color you want

Your site is using a richer, deeper version of that green. The closest matching deeper hexes are:
- #10b981 — strong match for the deeper feel (recommended starting point)
- #22C55E with 20-30% black added (darkened)
The 404 text you showed is basically pure #22C55E (or very close), while your logo export came out brighter.

Fix it properly (do this now)

1. Re-export the logo from Canva with these settings:
	- Color profile: sRGB
		- Export as PNG (not JPG)
		- Highest quality
2. Best long-term fix: Recreate or edit the logo in a proper tool — Figma, Inkscape (free), or Affinity Designer. Use the exact hex your site uses.
3. If you want to keep Canva, manually darken it:
	- Take the current logo
		- Apply a color overlay or adjustment layer set to Multiply with a dark green like #10b981 at 30-50% opacity, or just replace the green fill.

For your 404 page specifically

- Use the same green as your site's accents everywhere (text, buttons, etc.).
- Make the big "404" in your deeper green ( #10b981 or whatever your Tailwind emerald-500 / primary actually resolves to).
- Put the fixed logo at the top.
- Keep the overall dark theme consistency.
Quick test for you: On the live site [Momentum](https://peakmomentum.vercel.app), right-click → Inspect an accent element (button, highlight, etc.) and copy the exact computed color or background-color value. Use that exact hex for the logo.

Verdict on current logo

It's trash for production right now. The mismatch is noticeable and kills polish. Fix the color consistency before you ship anything else.Action items:
- Tell me the exact hex Tailwind is outputting for your accents on the live site.
- Or drop the updated logo here after you darken it.
Do it right or it will look amateur no matter how fancy your "AI-Augmented" vibe is. What's next?
