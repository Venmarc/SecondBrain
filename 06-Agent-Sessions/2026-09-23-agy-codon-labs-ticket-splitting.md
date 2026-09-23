> **One-line Summary**: Configured GitHub issue tracker and triage documentation for Codon-Labs via `setup-matt-pocock-skills`, then broke the visual polish implementation plan into 5 tracer-bullet tickets with dependency edges.

**Date:** 2026-09-23  
**Agent:** AGY  
**Project:** [[01-Projects/Clone-Website/Clone-Website|Clone-Website]]  

## Goal
Configure Matt Pocock-style issue tracking and triage conventions for Codon-Labs, then break down the approved visual polish and layout architecture plan into discrete tracer-bullet vertical slice tickets with blocking dependency edges.

## Standing Directives Given This Session
None.

## User Prompts (Extracted, Not Compressed)
- **Prompt:** "run /setup-matt-pocock-skills on the /home/redmane/Documents/Codon-Labs dir. Lemme know what u need"  
  **Overrode/Added:** Prompted configuration questions for issue tracker (selected GitHub Issues), instruction file (`AGENTS.md`), and canonical triage labels. Configured `docs/agents/` and root `AGENTS.md`.
- **Prompt:** "pull up the wayfinder skill, let's spilt Codon-labs' next steps into tickets and issues and howvere it's done. Just pul the required skill if it isn't waytfinder"  
  **Overrode/Added:** Evaluated `wayfinder` vs `to-tickets`; selected `to-tickets` because a completed implementation plan was already established. Drafted 5 tracer-bullet tickets.

## Reference Files / Media
- `[[docs/superpowers/plans/2026-09-21-visual-polish-and-layout-architecture.md]]` — Summary: 5-task visual polish plan providing the scope for ticket decomposition.

## Root Cause Log
| Symptom | Root Cause | Fix Applied | Confidence |
|---|---|---|---|
| `gh repo view` reported `no git remotes found` | Codon-Labs repository does not yet have a configured remote origin | Defaulted to local ticket markdown publication under `.scratch/visual-polish/issues/` | Confirmed |

## Research Conducted
- **Searched/Consulted:** Evaluated `setup-matt-pocock-skills`, `wayfinder`, `to-tickets`, and `domain-modeling`.
- **Should have been consulted but wasn't:** N/A.

## Subagent Snags
- None.

## Decisions & Pivots
- **Tracker Target**: Selected GitHub Issues as the documented tracker convention, but published tickets locally to `.scratch/visual-polish/issues/` while no Git remote is configured.
- **Skill Route**: Routed from `wayfinder` to `to-tickets` because the implementation plan was already fully drafted.

## Steps Taken / Actions
1. Initialized `AGENTS.md`, `docs/agents/issue-tracker.md`, `docs/agents/triage-labels.md`, and `docs/agents/domain.md` in Codon-Labs.
2. Verified `gh repo view` status.
3. Formulated 5 vertical tracer-bullet tickets:
   - `01-global-framing-and-layout-tokens.md`
   - `02-hero-section-constraining-and-feathering.md`
   - `03-origins-section-rebalancing.md`
   - `04-alternating-process-timeline.md`
   - `05-end-to-end-responsive-verification.md`
4. Published the 5 tickets to `.scratch/visual-polish/issues/`.

## Files Touched
- `[[AGENTS.md]]`
  - **Previous State:** Did not exist in Codon-Labs root.
  - **After Change:** Created agent instructions referencing issue tracker, triage labels, and domain docs.
- `[[docs/agents/issue-tracker.md]]`
  - **Previous State:** Did not exist.
  - **After Change:** Documented GitHub Issues conventions and wayfinder operations.
- `[[docs/agents/triage-labels.md]]`
  - **Previous State:** Did not exist.
  - **After Change:** Documented canonical 5 triage roles.
- `[[docs/agents/domain.md]]`
  - **Previous State:** Did not exist.
  - **After Change:** Documented single-context layout conventions.
- `[[.scratch/visual-polish/issues/]]`
  - **Previous State:** Directory did not exist.
  - **After Change:** Created 5 ticket files in dependency order.

## Vault Updates This Session
- `[[ANTI_PATTERNS.md]]`: No changes — line count: 180. Split triggered: No.
- Project `AGENTS.md`: No changes.
- `[[CHANGELOG.md]]`: Added 2026-09-23 entry for Codon-Labs ticket decomposition and tracker setup.

## Open Questions & Next Steps
- Add GitHub remote origin when repository is ready to publish to GitHub Issues.
- Execute frontier ticket `01: Global Framing & Layout Tokens`.

**Tags:** #agent-session #codon-labs #tickets #setup-matt-pocock-skills
