> **One-line Summary**: Recurring constraints and preferences extracted from session logs — "Victor in the vault."

# Victor Standing Directives

Captured from verbatim prompts in agent sessions. Update when Victor states a new standing rule.

## Phase gates

- **Do not declare Phase 0 complete until Victor says so** — even when all tasks pass verification.
- **Do not stray past the active phase** after closure — stop work when the phase gate is met.
- **Project docs listed in AGENTS.md are origin** — extra docs made during build are secondary.
- **Docs stay living** — when code or UX changes, update the relevant project doc and log the change in PHASES.md changelog with date.
- **Doc hierarchy:** APP_FLOW (journey) → PAGE_SPECS (every page layout/behavior — largest spec) → PHASES (when to build, written last). PRD/TRD/NOTES anchor all.

## Portfolio UX (cross-project)

- **Hero viewport lock** — landing hero fills viewport; section below not visible until scroll; content cluster stays centered at zoom-out (Venmarcstudio pattern). Apply to Momentum, Ledger, future landings when agents can spec it in code. See [[01-Projects/Ledger/Docs/NOTES|Ledger NOTES]] 2026-07-15.
- **Speed, beauty, efficiency** — cut anything that slows, uglifies, or breaks function before it ships.

## Auth & Clerk

- Keep dedicated auth **pages**, not Clerk modals, for sign-in/sign-up.
- On auth pages: keep the **"Back to home" footer** under the Clerk card; defer its render until the card hydrates so it does not sit awkwardly alone.
- Clerk auth cards are acceptable standalone — strip custom surrounding chrome rather than fighting Clerk's contrast engine.

## Agent collaboration

- Victor **supervises**; agents execute. No auto-orchestration pipelines.
- `.superpowers/` agent workspace dirs are **not useful for app functioning** — keep in `.gitignore`.
- Prioritize **frontend awesomeness, speed, and security** on Phase 0 foundation work.
- Use vault skills (ui-ux, sticky top bar, etc.) when implementing frontend foundation.
- **Port Sites `AGENTS.md` is canonical** for project standing rules (Ledger root; Momentum `.agents/AGENTS.md`). Vault copies mirror with sync date.
- **Plan-review-before-implement:** for any non-trivial chunk of work, draft the plan to its own doc, then run a separate "implementer-hat" self-review pass ("list every assumption/ambiguity/edge case you'd guess at with zero context — don't fix, just list") and close every hole before a (possibly different) agent implements. Used across Ledger P3-A (×2) and P3-B — removes the gaps a weak model would otherwise fill with its own taste. See [[01-Projects/Ledger/Ledger]] 2026-07-29/30.
- **Don't run the `readme-generator` skill on portfolio/personal sites** — it's tuned for products/codebases (install/clone/architecture) and produces the wrong voice for a personal site. Write from the site's own copy instead (projects+images, approach, skills, contact). Rejected once on `mario-dev-portfolio`, 2026-07-31.

## Related

- [[02-Areas/Agent-Ops/How-Victor-Works-With-Agents|How Victor Works With Agents]]
- Prompts Verbatim (outside vault): `/home/redmane/Documents/Research_files/Prompts_Verbatim.md`

**Tags:** #agent-ops #constraints #victor #phase-0