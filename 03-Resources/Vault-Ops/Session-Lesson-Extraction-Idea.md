> **One-line Summary**: Active rule — after project sessions, promote 0–3 reusable lessons to project hub or existing skills; grep before creating new notes.

# Session Lesson Extraction

**Status:** Active (minimal rule — Phase B, 2026-07-09)

## When

End of any session that touched **Momentum**, **Ledger**, **Tempire**, or vault structure.

## What to extract

- Reusable fixes, UX traps, stack decisions, phase discipline  
- **Not:** play-by-play, one-off debugging noise, duplicate of an existing skill

## How (agent checklist)

1. Write session log (`06-Agent-Sessions/`).
2. List **0–3** extractions in `## Extractions` in the session log.
3. `grep` vault for existing skill/hub coverage — **link, don't duplicate**.
4. Apply:
   - **Project-specific** → `## Lessons log` on `01-Projects/<Name>/<Name>.md` (bullet + date)
   - **Cross-project** → extend existing `03-Resources/Skills/*` or MOC link only
   - **New atomic skill** → only if Victor asks or gap is repeated 2+ times
5. If agentmemory healthy: `memory_save` the same insight (`concepts` + `files`).

## Victor override

- Say **"extract"** to force a pass on a past session log.
- Say **"skip extraction"** for trivial sessions.

## Open (optional later)

- Auto-promote every session vs on-request only — currently **every meaningful project session, max 3 bullets**.

## Related

- [[AGENTS|AGENTS.md]] §E  
- [[Templates/Agent-Session-Summary|Agent-Session-Summary]]  
- [[02-Areas/Agent-Ops/How-Victor-Works-With-Agents]]

**Tags:** #vault-ops #agent-session #rule