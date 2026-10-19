> **One-line Summary**: Superseded process note — the lesson loop now promotes 0–3 supported facts or rules directly into the correct existing destination.

# Session Lesson Extraction

**Status:** Superseded by [[Lesson-Loop|Lesson Loop]] (2026-10-14)

## When

End of any session that touched **Momentum**, **Ledger**, **Tempire**, or vault structure.

## What to extract

- Reusable fixes, UX traps, stack decisions, phase discipline  
- **Not:** play-by-play, one-off debugging noise, duplicate of an existing skill

## Previous manual process

1. Write the session log only at session shutdown.
2. List **0–3** extraction pointers in that log.
3. `grep` vault for existing coverage — **link, don't duplicate**.
4. Apply directly:
   - **Project-specific** → `## Lessons log` on `01-Projects/<Name>/<Name>.md` (bullet + date)
   - **Cross-project** → extend existing `03-Resources/Skills/*` or MOC link only
   - **New atomic skill** → only if Victor asks or gap is repeated 2+ times
5. If agentmemory is healthy, save the confirmed durable lesson once.

The implemented lesson loop performs this work through a candidate queue, Clef classification, direct writes, and Inbox decisions. It keeps a small runtime ledger instead of a retro report folder.

## Victor override

- Say **"extract"** to force a pass on a past session log.
- Say **"skip extraction"** for trivial sessions.

## Open (optional later)

- Auto-promote every session vs on-request only — currently **every meaningful project session, max 3 bullets**.

## Related

- [[AGENTS|AGENTS.md]] §E  
- [[Templates/Agent-Session-Summary|Agent-Session-Summary]]  
- [[AGENTS|Vault agent rules]]

**Tags:** #vault-ops #agent-session #rule
