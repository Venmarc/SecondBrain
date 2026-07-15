> **One-line Summary**: Personal daily habit + fitness OS — Phase 0 foundation after July 2026 rewrite. One goal: something Victor actually uses daily.

# Momentum

**Status:** Active — **Phase 0 (Foundation)** — *complete as of 2026-07-12* (Victor confirmed; auth page card-only cleanup deferred)  
**Codebase:** `/home/redmane/Documents/Port Sites/Category 5/Momentum`  
**Live:** https://peakmomentum.vercel.app  
**Vault sync:** Docs mirrored from Port Sites on **2026-07-09**. Edit project folder first.

## The one goal

Build a beautiful, simple, genuinely useful **personal** habit + fitness tracker Victor will actually use daily — shows where he's winning or failing, helps better decisions.  
If it doesn't serve daily personal use or portfolio impact → it does not exist.

**Not this project:** multi-user SaaS, social, heavy wellness modules, complex AI chatbot, over-engineered goals systems.

## Active phase

Read [[01-Projects/Momentum/Docs/PHASES|PHASES]] every session. Agents: state the active phase before building. Nothing outside the active phase.

## Doc set (synced)

| Doc | Link |
|-----|------|
| README | [[01-Projects/Momentum/Docs/README|README]] |
| PRD | [[01-Projects/Momentum/Docs/PRD|PRD]] |
| TRD | [[01-Projects/Momentum/Docs/TRD|TRD]] |
| PHASES | [[01-Projects/Momentum/Docs/PHASES|PHASES]] |
| PAGE_SPECS | [[01-Projects/Momentum/Docs/PAGE_SPECS|PAGE_SPECS]] |
| APP_FLOW | [[01-Projects/Momentum/Docs/APP_FLOW|APP_FLOW]] |
| UIUX_BRIEF | [[01-Projects/Momentum/Docs/UIUX_BRIEF|UIUX_BRIEF]] |
| SCHEMA | [[01-Projects/Momentum/Docs/SCHEMA|SCHEMA]] |
| INSIGHTS | [[01-Projects/Momentum/Docs/INSIGHTS|INSIGHTS]] |
| NOTES (project) | [[01-Projects/Momentum/Docs/NOTES|NOTES]] |
| Agent guide (codebase) | [[01-Projects/Momentum/Docs/AGENTS|AGENTS]] |

## Vault-only

- [[01-Projects/Momentum/Lessons-from-DEV_NOTES|Lessons from DEV_NOTES]] — extracted pre-rewrite lessons
- [[04-Archive/Momentum/DEV_NOTES|Archived DEV_NOTES]] — full historical dogfood log

## Related skills (Phase 0)

- [[03-Resources/MOC-UI-UX-Lessons|MOC: UI/UX Lessons]] — start here
- [[03-Resources/Skills/Product-Vision-Integrity|Product Vision Integrity]]
- [[03-Resources/Skills/State-Isolation-Per-Record|State isolation per record]]
- [[03-Resources/Skills/Smart-Form-Controls|Smart form controls]]
- [[03-Resources/Skills/Nested-Route-Active-State|Nested route active state]]
- [[03-Resources/Skills/Browser-Native-Dialog-Trap|Browser native dialog trap]]
- [[03-Resources/Skills/Frontend-Awesomeness|Frontend Awesomeness]]
- [[03-Resources/Skills/Clerk-Auth-Card-Contrast|Clerk auth card contrast]]
- [[03-Resources/Skills/Reverse-Engineering-UI-Components|Reverse-engineering UI components]]
- [[01-Projects/Momentum/Lessons-from-DEV_NOTES|Lessons from old build]] — avoid repeating bugs

## Lessons log (from sessions)

*Agents: append 0–3 bullets here after sessions when reusable. See [[03-Resources/Vault-Ops/Session-Lesson-Extraction-Idea|extraction rule]].*

- **2026-07-09/13 — Nav shell (harvested):** [[03-Resources/Skills/Back-Button-Hierarchy|Back hierarchy]] · [[03-Resources/Skills/Sticky-Top-Bar-Navigation|Top bar]] · [[03-Resources/Skills/Dashboard-As-Overview|Dashboard overview]] · [[03-Resources/Skills/Settings-Preview-Then-Save|Settings preview→save]]

- **2026-07-12 — Phase 0 completion:** Victor confirmed Phase 0 done. Clerk "charcoal face" fixed via `colorBackground: #111111` + transparent card elements (see [[ANTI_PATTERNS|ANTI_PATTERNS]] §Clerk). Logo glow aligned to brand green (`rgba(34,197,94,...)`); touch targets ≥48px. **Deferred:** strip auth page wrappers — render only the Clerk card on `/login` and `/register` (Clerk cards are fine standalone; custom surrounding chrome caused edge cases).

- **2026-07-09:** Landing — sticky glass nav, logo swing-in from ~45°. Clerk contrast bug root-caused and fixed 2026-07-12. Auth via dedicated `/login` + `/register` pages (not modals). `proxy.ts` protects explicit app prefixes only. Logo links to `/today` when authed, `/` when guest. Touch targets ≥48px (`h-12` buttons; `p-2 -m-2` on inline logo link).

## Journey notes (vault)

- **2026-07-09:** Vault realigned to Port Sites rewrite. Product truth = Phase 0 personal daily OS, not SaaS wellness. DEV_NOTES extracted and archived.
- **2026-06-24:** Journey notes initialized during Second Brain overhaul.

## Cross-project notes (from Ledger NOTES)

- **Hero viewport lock** — full-viewport landing hero, next section hidden until scroll (Venmarcstudio pattern). Spec when rebuilding landing → [[03-Resources/Tools/Effects_Glossary|Effects Glossary]] entry.

**Tags:** #momentum #project #active #phase-0
