> **One-line Summary**: Karpathy LLM Wiki + SpikeCalls PARA workflow patterns for self-maintaining Obsidian vaults with agent ingest/lint loops.

# Vault LLM Wiki Patterns

Synthesized from [[Clippings/Vault Research|Vault Research]] (SpikeCalls X thread + Grok analysis).

## Core loop
1. Drop sources (clips, chats, articles) into inbox or Clippings.
2. Agent ingests → atomic notes with wikilinks → update index.
3. Weekly `/lint` for orphans, dead links, contradictions, gaps.

## Commands to mirror (agent-agnostic)
| Command | Vault equivalent |
|---------|------------------|
| `/ingest` | AGENTS.md Ingest Workflow |
| `/lint` | AGENTS.md Lint Workflow → `LINT-REPORT.md` |
| `/ask` | Query Workflow via `index.md` |
| Session continuity | agentmemory `memory_smart_search` + `06-Agent-Sessions/` |

## Victor-specific adaptations
- **Boss agent:** Gemini/Antigravity + Grok (not Claude Code) — rules live in `BRAIN.md` + `AGENTS.md`.
- **Immutable clippings:** Summaries in `03-Resources/`, never edit `Clippings/`.
- **Machine + human memory:** agentmemory for recall; vault for journey notes.

## Related
- [[03-Resources/Tools/Vault-Librarian-Interviewer|Vault Librarian]]
- [[03-Resources/Skills/Knowledge-Extraction-Interviewer|Knowledge Extraction]]
- [[AGENTS|AGENTS.md]]

**Tags:** #skill #vault #para