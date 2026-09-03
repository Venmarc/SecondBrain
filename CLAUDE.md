# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

This is **not a software project** — it's Victor's personal Obsidian vault ("Second Brain"), tracked
in git as a plain Markdown knowledge base (PARA method). There is no build, lint, or test step.
"Working in this repo" means reading, writing, and organizing Markdown notes, not writing code.

## Read first, every session

This vault already has a full agent-instructions system — read it instead of re-deriving conventions:

1. **`BRAIN.md`** — vault philosophy, style, current active-project focus, agent rules.
2. **`AGENTS.md`** — the authoritative, agent-agnostic instruction set: folder conventions, editing
   rules, and the full workflows (Ingest, Query, Lint, Vault Librarian Interviewer, Session
   Boot/Shutdown, Quick Commands). This is the primary reference — don't duplicate it here, read it.
3. **`index.md`** — the master hub / entry point into the vault's actual content (active projects,
   areas, resources).

For work on one of the tracked apps (Momentum, Ledger, Tempire), also read that project's hub note
at `01-Projects/<Name>/<Name>.md` and its `Docs/PHASES.md`. Note: the vault's `Docs/` are **dated
mirrors** — the real source of truth for those products is the separate Port Sites codebase, not
this repo.

## Hard rules (from AGENTS.md — the ones most likely to be violated by habit)

- **Never edit files under `Clippings/` or `raw/`** — both are immutable originals.
- **Keep `index.md` and `CHANGELOG.md` current** whenever you make a structural change (new note,
  moved file, renamed section).
- **Surgical edits only** — minimize changes to existing human-authored text; append/update specific
  sections rather than rewriting notes wholesale.
- **Use standard Markdown links (`[text](path.md)`), not `[[wikilinks]]`,** in anything meant to
  render on GitHub (README, top-level docs). Wikilinks are fine inside vault notes themselves.
- **No agent-specific hardcoding** — this vault is read by multiple AI clients (Gemini, Grok, Claude,
  Codex, OpenCode, Antigravity); don't write instructions assuming only one is running.
- **Empty directories need a `.gitkeep`** — git won't track them otherwise.
- On any file move/rename, grep `CHANGELOG.md` for the old path too — a "Moved" log entry can itself
  leave a dangling link.

## Session boot / shutdown (AGENTS.md §E — do this, don't skip it)

- **Boot:** read `BRAIN.md` → `AGENTS.md` → `index.md` before vault work; for project work, read the
  project hub + `PHASES.md`. If `agentmemory` MCP is available, check health and run
  `memory_smart_search` for the task topic — don't block the session if it's down.
- **Context management (compact vs. summarize — not the same thing):** compact (`/compact` or
  equivalent) at ~100k tokens of context used to keep the conversation working — this never touches
  the vault. Write the `06-Agent-Sessions/` session log (below) only when Victor declares the
  session complete or asks for a "session summary." See AGENTS.md §E for the full rule.
- **Shutdown:** `memory_save` (if agentmemory is healthy), write a session log to
  `06-Agent-Sessions/YYYY-MM-DD-<agent>-<slug>.md` using the `Templates/Agent-Session-Summary`
  template, update `CHANGELOG.md`/`index.md` if structure changed, and promote 0–3 reusable lessons
  to the relevant project hub's `## Lessons log` if the session produced any.
- Victor supervises; there is no multi-agent orchestration engine. Don't auto-start round-table or
  multi-CLI pipelines unless asked.

## Quick commands (map these phrases to AGENTS.md workflows)

- `/ingest [file]` → Ingest Workflow (§2.A) on a file in `00-Inbox/` or `Clippings/`.
- `/lint` or "full lint" → Lint Workflow (§2.C), writes results to `LINT-REPORT.md`.
- `/interview` → Vault Librarian Interviewer Routine (§2.D), runs `node scripts/vault-librarian.js`.
- `/harvest` → runs `node scripts/harvest.js` + Knowledge Extraction Interview.

## Layout

```
SecondBrain/
├── 00-Inbox/          # capture; process quickly
├── 01-Projects/       # active work — Momentum, Ledger, Tempire (hub note + Docs/)
├── 02-Areas/          # ongoing responsibilities (incl. Agent-Ops)
├── 03-Resources/      # skills, snippets, vault-ops, MOCs
├── 04-Archive/        # inactive / historical
├── 05-Daily/          # journal
├── 06-Agent-Sessions/ # session logs (kept — history is useful)
├── Clippings/         # immutable web clips
├── raw/               # immutable original sources
├── scripts/           # vault-librarian.js, harvest.js
└── Templates/
```

Full details on all of the above — including the 9-Doc Standard for projects, defuddle/clipping
tooling, and the lint-workflow method notes — live in `AGENTS.md`. Treat it as the source of truth;
this file is only a pointer into it.

## Agent skills

### Issue tracker

Issues and specs live as GitHub issues; use the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

The five canonical roles (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`) map 1:1 to GitHub labels. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.
