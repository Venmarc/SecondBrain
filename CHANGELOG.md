# Changelog

All notable changes to Victor's Second Brain Vault will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]
### Added
- Created `scripts/verify.js` script to securely execute database verification queries.
- Added session log [[06-Agent-Sessions/2026-07-05-agy-supabase-migration-fix|2026-07-05-agy-supabase-migration-fix.md]] documenting the database migration security fixes.
- Added session log [[06-Agent-Sessions/2026-07-05-agy-task-2-reviewer-fixes|2026-07-05-agy-task-2-reviewer-fixes.md]] documenting Task 2 reviewer feedback fixes.
- Wired agentmemory MCP on Grok (`~/.grok/config.toml`), OpenCode (`opencode.jsonc`), AGY session-boot hook (`~/.gemini/config/agentmemory/hook.py`).
- Added mandatory session boot/shutdown rules to [[BRAIN|BRAIN.md]], [[AGENTS|AGENTS.md]], and [[Templates/Agent-Session-Summary|Agent-Session-Summary]] template.
- Ingested [[03-Resources/Skills/Skill-Router-Hook|Skill-Router-Hook]] from inbox; archived voice note transcripts to `04-Archive/Voice-Notes/`.
- Created [[03-Resources/Vault-LLM-Wiki-Patterns]], [[03-Resources/MOC-Design-Skills-External]], [[03-Resources/Skills/Lazy-Agent-Failure-Mode]], [[03-Resources/Clippings-Ingest-Log]].
- Linked Momentum doc set from [[01-Projects/Momentum/Docs/PRD|PRD]]; added one-line summaries across Momentum Docs.
### Changed
- Updated database migration schema in `supabase/migrations/20260705000000_init.sql` to secure RLS policies for `habit_logs` and `exercise_logs` tables and added drop policy statements for idempotency.
- Updated `scripts/migrate.js` to dynamically load environment variables and locate token from `mcp_config.json`.
- Updated `package.json` to call `scripts/verify.js` for verification queries.
- Inbox zero (2026-07-05): processed all pending inbox items.
- Clippings ingest pass: all 5 clippings mapped to summary notes (sources remain immutable).
- Updated [[index|index.md]] hub with agent-session and memory wiring entries.
- Regenerated [[LINT-REPORT|LINT-REPORT.md]] reflecting inbox zero and remaining Tempire gaps.
### Added (prior sessions)
- Created skill-router specification (now [[03-Resources/Skills/Skill-Router-Hook]]) documenting the architecture, problem context, file structures, logical flows, recent updates/fixes, and known race conditions of the Google Antigravity Skill Router hook system.
- Ingested 9 atomic UI/UX lesson notes under `03-Resources/Skills/` and 1 Map of Content (MOC) note at `03-Resources/MOC-UI-UX-Lessons.md` to map them together.
- Ingested the pre-launch security audit guide into a permanent skill note at `03-Resources/Skills/Pre-Launch-Security-Checklist.md`.
- Staged and integrated the newly created notes into the Master Hub index.md and updated cross-links to projects.
- Committed the premium digital creator marketplace README for `Tempire` under `01-Projects/Tempire/Docs/README.md`.
- Processed and moved `00-Inbox/Future Projects.md` to `05-Daily/2026-06-25.md`.
- Processed and moved `00-Inbox/Today's Notes.md` to `05-Daily/2026-06-27.md`.
- Processed and moved `00-Inbox/Vault-Population-Questions.md` to `06-Agent-Sessions/Grok-Vault-Population-Discussion.md`.
- Documented new developer guidelines and architectural lessons from Tempire (`Theme-Switching-Foundation.md` and `Secure-Downloads-Middleware.md`).
- Updated `AGENTS.md` rules on relative markdown links, immutable raw files, and quick commands.
- Performed full automated and semantic lint check of the vault.
- Updated `LINT-REPORT.md` with link integrity, orphans, project standard gaps, and semantic contradictions/duplicates.
- Registered new skill guides in the Master Hub `index.md` and updated the vault health maintenance checklist.
- Integrated `/harvest` command alias into `AGENTS.md` to trigger the knowledge extraction flow.
- Upgraded `Vault-Librarian-Interviewer.md` to document the `harvest.js` tool and CLI commands.
- Created `03-Resources/Skills/Knowledge-Extraction-Interviewer.md` detailing the "Wants a Better Vault Than You Do" interview strategy.
- Registered the new extractor skill and updated the tool references in `index.md`.

## [1.0.0] - 2026-06-24
### Added
- Initialized `CHANGELOG.md` at vault root to track structural modifications, metadata schemas, and index updates.
- Staged, committed, and pushed the pre-overhaul vault state to remote repository.
- Commenced the Vault Overhaul implementation to align the vault with the LLM-Wiki pattern.
