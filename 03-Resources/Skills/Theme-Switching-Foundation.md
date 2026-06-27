# Skill: Theme Switching Foundation

> **One-line Summary**: Architectural guidelines for building bulletproof, design-token-driven theme-switching (light/dark mode) and role synchronization as a project foundation.

## Description
This guide outlines core constitutions for preventing layout shift, black-and-white UI glitches, hydration mismatches, and authentication race conditions when building multi-theme web applications.

## Use When
Use this skill when starting a new frontend project, configuring theme setups (Tailwind, CSS variables), designing responsive layouts, or setting up auth-based route redirection (Clerk/Supabase).

## Core Constitutions

### 1. Theme-First Development
*   **Constitutional Rule:** Never build a "dark-mode-only" application with the intent of retrofitting light mode later. Patching colors onto a finished codebase leads to unreadable, black-and-white contrast errors.
*   **Implementation:** Define CSS variables for both themes in `index.css` at the first commit. Bind all utility classes to semantic token variables (e.g., `--background`, `--foreground`, `--primary`, `--border`) instead of hardcoded hex values.

### 2. Instant Auth & Role Sync (Avoiding the Webhook Trap)
*   **The Trap:** Relying on backend API webhooks (e.g., Svix) to sync user roles (Buyer vs. Seller) upon login creates a race condition. Client-side dashboard redirects happen before database writes complete, triggering layout flashes or access denials.
*   **The Fix:** 
    1. Inject user roles directly into Clerk's Custom Session Token JWT template:
       ```json
       {
         "role": "{{user.public_metadata.role}}"
       }
       ```
    2. Read roles instantly from the claims token (`sessionClaims.role`) within middleware (`proxy.ts` or similar) for zero-flash route guards.
    3. Invoke `await user?.reload()` on the client to force immediate JWT token refresh and role propagation upon upgrade.

### 3. Layout Densities & Zoom Constraints (The Zoom Trap)
*   **The Trap:** Designing user interfaces at non-standard zooms (e.g., 80% to fit more on screen) makes elements, containers, and spacing appear bloated, oversized, or unreadable at standard 100% user zoom.
*   **The Fix:** 
    *   Test layouts exclusively at 100% zoom.
    *   Constrain layout templates to narrower containers (e.g., `max-w-5xl` or `max-w-6xl`) rather than wide wrappers like `max-w-7xl` unless specifically necessary.
    *   Use tighter padding defaults (`p-4` to `p-6`) for standard viewports.

### 4. Hydration State Guarding
*   **The Trap:** Reading persistent configurations (like user themes or cart items stored in `localStorage`) directly during initial component render causes hydration mismatches between server-rendered HTML and client-rendered HTML.
*   **The Fix:** Wrap the theme or cart component in a mounting guard:
    ```tsx
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
      setMounted(true);
    }, []);

    if (!mounted) return <SkeletonLoader />; // or null
    return <ThemeOrCartContent />;
    ```

## Related Links
*   [[03-Resources/Skills/Frontend-Awesomeness|Frontend Awesomeness]]
*   [[03-Resources/Skills/Secure-Downloads-Middleware|Secure Downloads Middleware]]
*   [[index|Master Hub Index]]

**Tags:** #skill #frontend #design #theme #clerk #hydration #tempire
