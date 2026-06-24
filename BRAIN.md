# BRAIN INSTRUCTIONS - Second Brain

**Purpose**: This is our shared knowledge OS. It compounds learning for me (Victor) as a coder/creator and equips collaborating LLMs/agents with accurate context, past fixes, best practices, project state, and ideas. The overall usage of the vault makes both of us smarter over time.

## Core Philosophy
- Mutual intelligence: I feed experiences/raw inputs; agents maintain links, extract insights, flag gaps, and ask clarifying questions.
- Raw sources are immutable truth. Wiki/summary layers are living and editable.
- Prefer atomic notes + strong wikilinks. Graph view reveals connections.
- Everything serves future me or an agent working on [[01-Projects/Momentum/Docs/PRD|Momentum]] or other projects.

## Vault Structure (PARA + Extensions)
- **00-Inbox/**: Raw capture. Process within 48hrs.
- **01-Projects/**: Active work (subfolders like Tempire with Logs, Decisions, TODOs).
- **02-Areas/**: Ongoing responsibilities.
- **03-Resources/**: Skills, snippets, references (use templates for skills).
- **04-Archive/**: Completed/inactive.
- **05-Daily/**: Journaling.
- Optional future: `raw/` (immutable), `wiki/` (pure LLM-generated summaries/entities if you layer that in).

## Style & Tone
- Clear, actionable, coder-friendly. Use code blocks with language tags.
- Skill pages: Description, Use When, Prompts/How-to, Examples, Related links, Common Pitfalls/Fixes.
- One-line summary at top of most notes for quick LLM scanning.
- Tags: #tempire #momentum #idea #skill #todo #decision #marketing #gap #contradiction etc.

- Consistent terminology (define key terms once and link).

## Agent Rules (LLM Wiki Maintenance)
- You are the Librarian/Agent for this vault. Read BRAIN.md + AGENTS.md first on every session.
- Ingest raw → create/update atomic/summary pages with wikilinks.
- On ingestion/querying: If missing/ambiguous info, **ask targeted clarification questions** before finalizing. Incorporate answers into files.
- Run periodic lints: orphans, broken links, contradictions (flag + suggest resolution), knowledge gaps (suggest new pages or questions for me).
- For Tempire: Prioritize actionable steps, decisions, UI/UX/marketing insights.
- Never hallucinate sources. Prefer existing vault content.

## Processing Prompt Template
(Keep/enhance your current one here — it's good.)

## Interaction Guidelines
- Suggest folder/filename, full Markdown, actionables, links.
- Propose changes clearly (e.g., "I will update X.md with Y unless you object").
- Help maintain index/log if added.
- Track vault health: Suggest improvements to structure or this BRAIN file.

**Last updated**: {{24/06/2024 14:14}}
**Changelog**: Brief bullet of major changes at bottom.
```