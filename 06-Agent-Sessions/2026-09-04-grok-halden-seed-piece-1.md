---
title: HALDEN seed piece 1 hero and process
date: 2026-09-04
tags:
  - agent-session
---

> **One-line Summary**: Piece 1 of the HALDEN seed rebuild is on `http://127.0.0.1:4322/` — coat poster with overlapping cuff/collar prints, then CUT / CANVAS / PRESS.

**Date:** 2026-09-04
**Agent:** Grok
**Project:** HALDEN seed (`/home/redmane/Documents/Sites/halden-seed`)

## Goal
Ship only hero and process. Stop. Do not add a result section.

## Standing Directives Given This Session
- Do not start another dev server. Do not use port 4321.
- Locked visual system. Do not improve toward luxury editorial.
- No JavaScript, Framer Motion, video, generated images, or new npm packages.
- No menu, CTA, buttons, reviews, FAQ, footer art, rail.
- Stop when hero + three process steps are on screen.

## User Prompts (Extracted, Not Compressed)
- **Prompt:** "This is piece 1 of a longer rebuild. Ship only two sections, then STOP. 1) Hero 2) Process" plus the locked system, copy for CUT / CANVAS / PRESS, and hard nos.
  **Overrode/Added:** Kills the matter table, SKU grid, stacked full-bleed look photos, footer, and mail bar from the previous seed page.

## Reference Files / Media
- `/home/redmane/Documents/Sites/halden-seed/public/hero-coat.png`, `hero-cuff.png`, `hero-collar.png`, `look-navy.png`, `look-camel.png`, `look-ivory.png`

## Root Cause Log
| Symptom | Root Cause | Fix Applied | Confidence |
|---|---|---|---|
| Hero cuff and collar sat apart | Prints were placed on opposite corners | Overlap collar onto cuff, desktop and mobile | Confirmed |

## Research Conducted
- **Searched/Consulted:** Current `index.astro` and live 4322 server.
- **Should have been consulted but wasn't:** N/A

## Subagent Snags
- None. Reused the existing 4322 process (pid 646696).

## Decisions & Pivots
1. Kill matter table and later photographs. Piece 1 is hero + three steps only.
2. No mailto in this piece. No street line.
3. Static rotate on prints. No animation.

## Steps Taken / Actions
1. Replaced `src/pages/index.astro`.
2. Verified in Brave at 1440×900 and 390×844 against the existing 4322 server.

## Files Touched
- `/home/redmane/Documents/Sites/halden-seed/src/pages/index.astro`
  - **Previous State:** Poster + spec sheet + six stacked photos + mail footer.
  - **After Change:** Hero + CUT / CANVAS / PRESS only.
  - **Related to:** User prompt.

## Vault Updates This Session
- `[[ANTI_PATTERNS.md]]`: No changes — N/A
- Project `AGENTS.md`: No changes

## Open Questions & Next Steps
- Wait for Victor. Do not add a result section.

**Tags:** #agent-session
