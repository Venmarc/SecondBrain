# Error Page Best Practices & Canva Color Conversions (Skill Reference)

> **One-line Summary**: Technical guidelines for designing Next.js 404/global-error pages and troubleshooting sRGB color mismatches in Canva.

---

## 1. 404 (Not Found) Page Best Practices

### A. Core Purpose
A 404 page informs the user that a requested path does not exist. Its goal is to minimize friction, prevent bounce, and re-orient the user into a productive flow as quickly as possible.

### B. Best Practices (The Dos)
- **Clear, Direct Copy**: Display a bold "404 — Page Not Found" with a short, friendly explanation.
- **Primary CTA**: Include a prominent recovery button pointing to the homepage or main dashboard (e.g., "Go to Dashboard").
- **Secondary Help**: 
  - Provide a search bar (if the application has search functionality).
  - List 3–5 high-value quick links (Dashboard, Docs, Support).
  - Include a "Report broken link" option for developer tools.
- **Performance**: Keep the page lightweight and fast. Minimize JavaScript execution and avoid heavy visual assets (images/animations).
- **SEO Safety**: Include `<meta name="robots" content="noindex" />` to prevent search engines from indexing error paths.

### C. Sidebar Navigation Rules
* **Exclusion Recommended**: Do **not** render the full sidebar navigation on a 404 page. When lost, a full navigation array causes visual noise and confusion. Use a stripped-down top navigation (Logo + Home) or a simple centered layout.
* **Next.js Implementation**: Create `app/not-found.tsx` to automatically bypass default root layouts.

### D. Worst Practices (The Don'ts)
* Relying on generic, unstyled browser 404 errors.
* Baby-talk errors ("Oopsie, something went wrong!") unless it matches a playful brand identity.
* Trap loops with no exit links, forcing the user to rely on the browser's back button.
* Auto-redirecting users without notice.

---

## 2. Global Error Page (`global-error.tsx`) Conventions

### A. Core Purpose
`global-error.tsx` is the application's final boundary. It catches catastrophic, uncaught runtime errors that bubble up to the root (e.g., failures inside root layout or template files).

### B. Implementation Rules
* **Root Replacement**: Triggering a global error completely replaces the root layout (including `<html>` and `<body>` tags).
* **Client Boundary**: It must be defined as a Client Component using `'use client'`.
* **State Recovery**: It receives `{ error: Error; unstable_retry: () => void; }` to let users try reloading the segment.
* **Simplistic Styling**: Keep layout and design minimal to avoid throwing secondary runtime errors inside the error handler itself.

### C. Template (`app/global-error.tsx`)
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
    <html lang="en">
      <body className="bg-zinc-950 text-white flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md px-6">
          <h1 className="text-8xl mb-4">💥</h1>
          <h2 className="text-4xl font-bold mb-6">Something broke</h2>
          <p className="mb-8 text-zinc-400">
            Our systems encountered a catastrophic exception.
          </p>
          
          <div className="flex gap-4 justify-center">
            <button 
              onClick={unstable_retry}
              className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium transition-colors"
            >
              Try Again
            </button>
            <a 
              href="/" 
              className="px-8 py-3 border border-white/20 hover:bg-white/5 rounded-xl transition-colors"
            >
              Back to Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
```

---

## 3. Canva vs. Browser Color Rendering Mismatch
**Using #22C55E for instance**

### A. The Core Rendering Discrepancy
The exact same hex color code (e.g., `#22C55E`) displays differently inside Canva compared to a web browser's native HTML/CSS renderer:
* **Canva's Canvas Rendering:** Canva uses canvas-based rendering and specific sRGB export mappings that render colors lighter, brighter, and more washed out. When Canva processes a hex code, the output image file is shifted toward a brighter, less-saturated green.
* **Browser CSS Rendering:** Standard browsers render CSS/Tailwind hex values natively with higher color fidelity, displaying `#22C55E` as a rich, deeply saturated green.
* **The Result:** A logo exported from Canva using the exact same hex code as browser accents will look noticeably lighter and mismatched when placed on the web page.

### B. The `#10B981` Bridge Solution
To resolve this mismatch and achieve color consistency, the deeper hex **`#10B981`** (emerald-500 equivalent) works perfectly for both environments:
1. **Compensating for Canva's Skew:** Because `#10B981` is inherently darker and richer, when Canva's rendering engine shifts it lighter during export, it lands precisely in the deeper green range that matches the website's theme.
2. **Direct Browser Accuracy:** When `#10B981` is used natively in browser Tailwind/CSS configurations, it renders as a premium, high-contrast, deep emerald accent.
3. **Synthesis:** By inputting `#10B981` in both Canva (to adjust for the lighter export shift) and the website's CSS, you achieve visual parity between the image logo and the browser-rendered buttons/accents.

### C. Actionable Fixes
* **Manual Replacement:** Change the fill/background hex code of the logo in Canva directly to `#10B981` before exporting.
* **Export Rules:** Export only as high-quality **PNG** to preserve color profile metadata (never use JPG, which applies destructive compression that further shifts colors).
* **Figma/Vector Fallback:** For absolute color parity, migrate the logo design to Figma or Inkscape. Vector SVGs render directly in the browser using CSS fill properties, bypassing sRGB image conversion skews entirely.

---

**Tags**: #skill #nextjs #design #color #canva #error-handling

