> **One-line Summary**: Scaffolded the Codon Labs build on Astro at `~/Documents/Codon-Labs` with the mark isolated as a drop-in slot, so the logo no longer blocks the build; 13 routes build clean and `astro check` passes.

**Date:** 2026-09-16
**Agent:** OpenCode
**Project:** [[01-Projects/Clone-Website/Clone-Website|Clone-Website]]

## Goal
Find and execute the parts of the Codon Labs build that are crucial but do not require the logo, so the missing mark stops delaying progress.

## Standing Directives Given This Session
- **Framework is Astro, not Next.js.** Victor overrode the assumed framework after the first scaffold. Standing for this project's build.
- **The logo is Victor's to solve.** Agents must not block other work on it, and must not generate it.

## User Prompts (Extracted, Not Compressed)
- **Prompt:** "outline the next steps for me. If it's logo gen, I'll handle it. I need u to see what other parts of teh project can be done without the logo. I want u to handle those parts that are still crucial, but don't require the logo."
  **Overrode/Added:** Re-scoped the session from planning to logo-independent execution.
- **Prompt:** "I'm having a hard time piecing the logo together, but I don't want that to delay the build. I'll figure the logo out."
  **Overrode/Added:** Confirms the mark is a hard external dependency; the build must proceed without it.
- **Prompt:** "For domain, I'll use vercel first, later, i'll move to a main domain not a sub of vercel"
  **Overrode/Added:** Partially resolves hub open decision 6 (deploy target). Static Astro on Vercel needs no adapter.
- **Prompt:** "I want it built with astro instead of next js"
  **Overrode/Added:** Overrode the Vite+React scaffold already written. Rebuilt on Astro.

## Reference Files / Media
- `[[01-Projects/Clone-Website/Clone-Website|Clone-Website]]` — hub; canon and open decisions.
- `[[01-Projects/Clone-Website/Docs/copy-v1|copy-v1]]` — stamped copy; the source for `src/content/site.ts`.
- `[[01-Projects/Clone-Website/Docs/image-requirements-v1|image-requirements-v1]]` — palette default, §C1 mark spec, asset ledger.
- `[[01-Projects/Clone-Website/Docs/slotmap-motion-v1|slotmap-motion-v1]]` — slots, motion budget, mark as design blocker.
- `[[03-Resources/Design/Web-Garnish/07-Build-Runbook|Web-Garnish Build Runbook]]` — fonts, SVG idioms, engraved vignette recipe.
- `~/Pastries/rep-lamalama-logo-grain` — the effect port source.
- `06-Agent-Sessions/2026-09-16-grok-dna-c-logo-5color.md` — Victor's parallel mark work (not read in full; noted only).

## Root Cause Log
| Symptom | Root Cause | Fix Applied | Confidence |
|---|---|---|---|
| Full-page screenshot showed empty sections and gray placeholder blocks | `[data-reveal]` set `opacity: 0` unconditionally; without JS (and below the fold) content never un-hides | Gated the hidden state behind a `.js` class set by an inline head script, so content is visible without JS | Confirmed |
| Header "Join the waitlist" CTA stayed visible at 390px | `.site-nav__cta { display: none }` and `.btn { display: inline-flex }` have equal specificity; `.btn` was authored later and won | Raised specificity to `.site-nav .site-nav__cta` | Confirmed |
| `astro build` failed: "Invalid route … parameter name must match /^[a-zA-Z0-9_$]+$/" | Astro route params cannot contain hyphens | Renamed `[first-name].astro` to `[firstname].astro` | Confirmed |
| `astro build` failed: could not resolve `../layouts/Base.astro` from `src/pages/program/2028.astro` | Nested route needs one more `../` | Corrected imports to `../../` | Confirmed |
| Vision review claimed a gray/empty review cell | Not a bug: the 5th review legitimately spanned both columns; the model read a stale frame | Verified by DOM measurement (left 115, width 1050, container 1052) | Confirmed |

## Research Conducted
- **Searched/Consulted:** `rep-lamalama` source (`gl/engines.ts`, shaders, `lib/effects.js`); the compositor fragment shader to determine the trail is mark-shaped (`drawLLLogo`); Web-Garnish runbook; emil-kowalski motion standards; npm registry for current Astro/React island versions.
- **Should have been consulted but wasn't:** the two new `2026-09-16-grok-*-logo*` session logs, before assuming no mark direction existed.

## Subagent Snags
- npm install hit `ETIMEDOUT` on the first attempt; tarballs were reachable on retry. Recovered with `--fetch-timeout=180000 --fetch-retries=5`.
- The rep's Playwright expected `chromium_headless_shell-1228`; the cache holds 1243. Worked around with `executablePath` to the installed chromium.
- The vision tool failed twice (backend timeout on a 1.2 MB full-page image; HTTP 404 on a named model). Split the page into viewport-sized slices instead.

## Decisions & Pivots
- **Astro 7 static + React islands for WebGL only** (Victor's call). Zero framework JS elsewhere.
- **Did not port `SmoothRoot`.** Its momentum-scroll hijack breaks native scroll, anchors, and keyboard access. Only the trail/photo/intro engines were ported.
- **The mark is a data slot** (`src/brand/mark.ts`), not a hard dependency. Surfaces render a type wordmark until `markSvg` exists.
- **Effects are gated, not deleted** (`src/theme.ts`): `intro` and `trail` need the mark; `photo` needs the generated photography.
- **Repo location** `~/Documents/Codon-Labs` per D10; local git only, **not pushed** (hard rule).

## Steps Taken / Actions
1. Read the hub, copy deck, slot map, image requirements, runbook; checked memory (empty for this project).
2. Located `rep-lamalama` locally and read its effects engine and shaders.
3. Scaffolded Vite+React, then rebuilt on Astro after Victor's correction.
4. Wrote tokens, content layer, mark slot, ported effects (gated), five build-not-generate SVG components, 13 routes.
5. Verified: `astro build` passes, `astro check` 0 errors/0 warnings/0 hints, all 13 routes 200, browser run with zero console errors, no horizontal overflow.
6. Reviewed screenshots; fixed reveal-without-JS, mobile CTA specificity, odd review cell, display-stroke weight, vignette contrast.
7. Local git commit. Wrote repo README.

## Files Touched
- `~/Documents/Codon-Labs/` (new repo, 34 source files)
  - **Previous State:** did not exist
  - **After Change:** Astro 7 build, committed locally
  - **Related to:** hub Next actions 4–5
- `[[01-Projects/Clone-Website/Clone-Website|Clone-Website]]`
  - **Previous State:** "Code: not started."
  - **After Change:** build status line added; Next actions and Lessons updated

## Vault Updates This Session
- `[[ANTI_PATTERNS.md]]`: No changes — line count after edit: N/A. Split triggered: N/A
- Project `AGENTS.md`: No changes (no project-level AGENTS.md exists for Clone-Website)

## Open Questions & Next Steps
- Victor: pick the mark concept, or hand over the candidates for review. The build waits only on `markSvg`.
- Decide whether to create the GitHub remote and push (needs approval).
- Domain belongs to Vercel for now; revisit a real domain later.
- Wire the waitlist form once the email sender domain and service are chosen (hub open decision 6).

**Tags:** #agent-session #clone-website
