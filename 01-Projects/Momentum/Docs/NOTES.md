> **Vault sync:** Copied from `Documents/Port Sites/Category 5/Momentum/` on 2026-07-09. Edit the project folder first; re-sync the vault after doc changes.

# DEV_NOTES

## 02/07/2026
- **Profile Synchronization**: Running standard fallback server actions (`ensureProfile()`) in the root layout to sync Clerk profiles directly into Supabase during local development, circumventing the need for public ngrok webhook tunnels, or clerk webhooks.

## 03/07/2026

### Clerk Auth Customization (Medium prority)
- The auth page shouldn't feel different from the UI, as users are likely to interact with it often, especially new ones.
- Clerk allows for customizations and **PAGE_SPECS.md** outlines a build style

## X Post On Interactivity
- I found a X post on 10 rules to truly ship polished UI using Claude (I use both, but Gemini for coding) `https://x.com/kvnkld/status/2066863634949779464?s=46`. Here's a summary:
        - I define easing curves, design tokens, and variables first to eliminate generic defaults and AI slop.  
        - I use real physics for drags with momentum, friction, soft boundaries, and magnetic snap points for satisfying feedback.  
        - Entrances combine fade, small rise, and blur clear on my smooth cubic-bezier curve.  
        - I layer multiple faint shadows with hairline rings instead of single drops or borders for real depth.  
        - Every interactive element gets tactile press states at 98% scale, while I build state-driven systems discovered through live use.
        The main article has more context.
- The writer mentioned in the article that he respects performance and accessibility settings (like reduced motion).

## Global-error Page
- I saw a Next.js tooltip from that little toast in dev servers, that mentioned the addition of a fallback `global-error.js` page.
- I created a doc for error pages just for it, in `/home/redmane/Documents/Research_files/global-error-404-practices.md`.
- The agent will reference it when building any error page (`not-found.tsx`, `error.tsx`, and `global-error.tsx`, and any other error page that exists in this world 😂).

## Friend Questions
- A friend asked me a couple questions about my idea (without reviewing the app):
        Not verbatim
        - What will users gain from using the app?
        - What motivates u to comeback tomorrow, and the next, and the next week, and so on?
        - What about notifications and stuff to remind u to use the app?
        - Can u input details, like sleep hours, directly by clicking the input field?
- He then went on to teach me a lil bit about testnets and mainnets in crypto (I dunno if u can see some sort of correlation, but he explained it with rewards). He didn't even have to visit that many pages to ask those questions. He just asked stuff that a typical habit tracker, and a fitness tracker is supposed do.
- This proves what a user would actually want--something that'll help them solve a problem, not only show the problem, implant the idea to come back into their heads, ease of access, interactivity...that's what Momentum should be for me.
- Make it understandable, useable, responsive, and straight-forward. Understandable such that i can explain the whole enchilada to my mom (This is my goal for all projects).

## Accessibility effort
- Add ARIA labels where they are supposed to be and how.
