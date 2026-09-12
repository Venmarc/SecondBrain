> **One-line Summary**: Researched why Derek’s look-follow snaps, decompiled the Adi/Oobi polar+spring engine, listed edge cases, drew oracle take 4 for a 4th page, and wrote a no-baseline build plan.

**Date:** 2026-09-11
**Agent:** Grok
**Project:** none (Pastries `rep-sloth-footer`)

## Goal
Research the Adi thread and Victor’s gravity/head/eye model. Do not build on the live pastry. Plan an isolated 4th page.

## Standing Directives Given This Session
- Unique Direction + oracle for empty slots.
- Do not touch the current baseline. Tests go in a worktree/copy.
- Lower Lighthouse is allowed if the sloth is better. Extra page must not load its atlas onto `/`, `/still`, `/compound`.
- Head + face + eyes. Eyes faster. Head slower. No over-shoulder yaw.

## User Prompts (Extracted, Not Compressed)
- **Prompt:** Keep going until RAW is addressed (prior nap). Then: the slow part is wrong; snappy; looks only after cursor stops; only up/left; position is between bottom-center and bottom-right; research Adi thread; 4th page OK if isolated; don’t copy eyes-only; research then plan; worktree for tests.
  **Overrode/Added:** Scratched the old “corner so he won’t look left” note. Permitted a performance drop. Locked two-rate gaze.

## What Happened
Fetched the 3-post Adi thread and the live Oobi bundle. Root cause is 4-way `pickLook` + deadzone + cartesian lerp. Oracle take 4 drawn (chalkboard / scrolly / rehearsal / verb nav / Nephelium juglandifolium). Notes in `Pastries/rep-sloth-footer/research/`. Baseline JS/CSS/pages not edited.

## Open
Victor feel-check of the plan. Isolated copy not created yet. Video gen still likely blocked.
