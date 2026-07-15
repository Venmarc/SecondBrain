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

## Related

- [[02-Areas/Agent-Ops/How-Victor-Works-With-Agents|How Victor Works With Agents]]
- Prompts Verbatim (outside vault): `/home/redmane/Documents/Research_files/Prompts_Verbatim.md`

**Tags:** #agent-ops #constraints #victor #phase-0