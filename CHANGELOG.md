# Changelog

All notable changes to Victor's Second Brain Vault will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### 2026-07-17 — Feel router system (OpenCode)
#### Added
- `~/.agents/skills/_shared/MOTION-STANDARDS.md` — merged from `improve-animations/AUDIT.md` + `review-animations/STANDARDS.md`; single canonical motion reference. Adds Framer Motion avoid-by-default rule + Apple damping/response table + emil's full-transform-string caveat.
- `~/.agents/skills/feel-router/SKILL.md` — dispatcher for any UI feel work (motion, depth, materials, layout, gesture, performance-as-polish, taste). 13 routing lanes into the 6 motion skills + the glossary/playbook system + the X article lesson.
- [[03-Resources/Tools/Effects_Build_Playbook|Effects Build Playbook]] — sibling to [[03-Resources/Tools/Effects_Playbook|Effects Playbook]]. Codifies the replication workflow (extraction's build half): intake → token setup → scaffold → primitives → compose → mobile/touch gate → Lighthouse 95+ → feel check → rep README/tests → glossary `tried`. Plus the Adopt phase (`tried` → project `adopted`).
- [[03-Resources/Tools/Effects_Glossary|Effects_Glossary]] — new "Motion tokens" section: extracted techniques now tag the easing/duration by token name (`--ease-out`, `--ease-in-out`, `--ease-drawer`) instead of ad-hoc cubic-beziers. Cross-references `_shared/MOTION-STANDARDS.md`.
- `~/.agents/playwright-core/AGENTS.md` — audit-half entry contract for agent-driven extraction sessions. ASCII diagram of the system network, load manifest, hard rules.
- `~/Pastries/AGENTS.md` — build-half entry contract for agent-driven replication sessions. Same diagram viewed from the build side, naming convention, default stack recipe, hard rules.
- [[03-Resources/Skills/UI-Polish-Ten-Rules]] — distilled from the [[Clippings/Rules on UI Polish|Kevin X article]], one vault lesson note carrying the parts the motion skills don't cover: two-zone magnetic snap, triple-entrance recipe, layered shadow stack, state-driven design as discovery, prompting recipes, Figma handoff discipline.

#### Changed
- `~/.agents/skills/improve-animations/SKILL.md` — AUDIT.md references → `../_shared/MOTION-STANDARDS.md` (4 link edits)
- `~/.agents/skills/improve-animations/PLAN-TEMPLATE.md` — AUDIT.md reference → shared file
- `~/.agents/skills/review-animations/SKILL.md` — STANDARDS.md references → shared file (3 link edits)
- [[03-Resources/Tools/Effects_Playbook|Effects_Playbook]] — gained a top-of-file backref to the new Build Playbook and the two external AGENTS.md files.
- [[index|index.md]] — added Effects Build Playbook next to the existing Effects tools.
- [[03-Resources/Skills/AI-UI-Antipatterns-Watchlist]] — new "Polish tells" section (single-blur shadow, 1px border, default easing, max-height hack, fade-only entrance, no press state, missing discovered states); added Related link to UI-Polish-Ten-Rules.
- [[03-Resources/MOC-UI-UX-Lessons]] — added UI-Polish-Ten-Rules to the 📐 Design Reference section.
- `~/.agents/playwright-core/BROWSER.md` — top-of-file backref to AGENTS.md.
- `~/Pastries/README.md` — top-of-file backref to AGENTS.md.

#### Removed
- `~/.agents/skills/improve-animations/AUDIT.md` (was 116 lines — now in shared file)
- `~/.agents/skills/review-animations/STANDARDS.md` (was 188 lines — now in shared file)

### 2026-07-15 — Vault lint pass (Grok)
#### Changed
- [[LINT-REPORT|LINT-REPORT.md]] — full refresh via Obsidian CLI + wikilink scan
- [[index|index.md]], [[BRAIN|BRAIN.md]], [[README|README.md]] — phase status, lint pointer, Effects tools
- [[01-Projects/Momentum/Docs/AGENTS|Momentum AGENTS mirror]] — fixed dead Related links
- [[03-Resources/Tools/Vault-Librarian-Interviewer|Vault Librarian]] — fixed MOC link
- [[03-Resources/Tools/Effects_Glossary|Effects Glossary]] · [[03-Resources/Tools/Effects_Playbook|Effects Playbook]] — cross-linked
#### Removed
- Empty orphan `Untitled.md`

### 2026-07-15 — Ledger doc sync + NOTES lessons (Grok)
#### Changed
- Vault mirror: [[01-Projects/Ledger/Docs/APP_FLOW|APP_FLOW]], [[01-Projects/Ledger/Docs/PAGE_SPECS|PAGE_SPECS]], [[01-Projects/Ledger/Docs/PHASES|PHASES]], [[01-Projects/Ledger/Docs/UIUX_BRIEF|UIUX_BRIEF]], [[01-Projects/Ledger/Docs/NOTES|NOTES]] from Port Sites
- [[01-Projects/Ledger/Ledger|Ledger hub]] — theme-toggle doc alignment + cross-project NOTES lessons
- [[03-Resources/Skills/Theme-Switching-Foundation|Theme Switching Foundation]] — toggle placement + Phase 0/4 split
- [[02-Areas/Agent-Ops/Victor-Standing-Directives|Victor standing directives]] — doc hierarchy, living docs, hero viewport pattern
- [[03-Resources/Tools/Effects_Glossary|Effects Glossary]] — hero viewport lock entry (untested)
- [[index|index.md]] — Ledger sync date; removed dead Momentum/Notes link

### 2026-07-14 — Handoff planning for 06-Agent-Sessions task (Grok)
#### Added
- Full session summary: [[06-Agent-Sessions/2026-07-14-grok-agent-sessions-handoff|2026-07-14-grok-agent-sessions-handoff.md]] (using new detailed template).
- Comprehensive handoff prompt prepared for Composer 2.5 covering all extraction rules, order, destinations, and current vault state.

### 2026-07-14 — Session log extraction + Port Sites AGENTS (Grok)
#### Added
- [[03-Resources/Skills/Collapsible-Desktop-Sidebar|Collapsible Desktop Sidebar]] skill
- [[02-Areas/Agent-Ops/Victor-Standing-Directives|Victor standing directives]]
- [[06-Agent-Sessions/extracted-sessions|Extracted sessions index]] (replaces 60+ raw session logs)
#### Changed
- [[ANTI_PATTERNS|ANTI_PATTERNS.md]] — Clerk, Next.js, Supabase, CSS token entries; sources point to project hubs
- [[01-Projects/Momentum/Momentum|Momentum hub]] — Phase 0 complete; journey notes consolidated; `Notes.md` removed
- [[01-Projects/Ledger/Ledger|Ledger hub]] — Phase 0 complete; layout/theme lessons
- [[03-Resources/Skills/Theme-Switching-Foundation|Theme Switching Foundation]] — flash prevention, hydration guards
- Port Sites: `Ledger/AGENTS.md` (full agent context); `Momentum/.agents/AGENTS.md` (auth + session conduct updates)
- Vault mirror: [[01-Projects/Ledger/Docs/AGENTS|Ledger AGENTS]] synced 2026-07-14
#### Removed
- 63 files from `06-Agent-Sessions/` after knowledge extraction (see extracted-sessions index)

### 2026-07-10 — Task 10 Brand Logo Green Color Alignment (Antigravity)
#### Added
- Session log: [[06-Agent-Sessions/2026-07-10-agy-logo-green-alignment|2026-07-10-agy-logo-green-alignment]].
#### Changed
- [[01-Projects/Momentum/Momentum|Momentum]]: Fixed reviewer findings for Brand Logo Green Color Alignment in `components/Logo.tsx`, including:
  - Updated drop shadow glow colors from cyan to brand green in `logoVariants`.
  - Enlarged touch target to >=48px by adding `p-2 -m-2 inline-flex items-center rounded-lg` and custom focus ring on parent `<Link>`.
  - Moved `aria-label` from child component to parent `<Link>`.
  - Updated outdated inline comment to green accent.
- Project task report `.superpowers/sdd/task-10-report.md`: Appended findings, fixes, verification details, and git commit reference.

### 2026-07-09 — Librarian interview (Grok)
#### Added
- [[05-Daily/2026-07-09]], skills: [[03-Resources/Skills/Clerk-Auth-Card-Contrast]], [[03-Resources/Skills/Reverse-Engineering-UI-Components]], [[03-Resources/Tools/External-Design-Skills]]
- Session: [[06-Agent-Sessions/2026-07-09-grok-vault-interview]]
#### Changed
- Clippings processed → [[04-Archive/Clippings]]; deleted Prompts and Thoughts
- [[01-Projects/Momentum/Momentum]] Phase 0 status + lessons; [[03-Resources/Clippings-Ingest-Log]]

### 2026-07-09 — Phase B light (Grok)
#### Added
- [[03-Resources/MOCs/MOC-Projects|MOC-Projects.md]]
- [[03-Resources/Vault-Ops/Vault-Health-2026-07-09|Vault health summary]]
- Session log [[06-Agent-Sessions/2026-07-09-grok-phase-b|2026-07-09-grok-phase-b]]
#### Changed
- Refreshed [[LINT-REPORT|LINT-REPORT.md]]; repaired wikilinks after Tempire merge + DEV_NOTES archive
- [[03-Resources/MOC-UI-UX-Lessons|MOC UI/UX]] Phase 0 section; project hub skill wiring
- [[03-Resources/Vault-Ops/Session-Lesson-Extraction-Idea|Session extraction]] draft → active minimal rule
- [[index|index.md]] health + MOC links

### 2026-07-09 — Reality reset (Grok) & Task 1 (Antigravity)
#### Added
- Session log [[06-Agent-Sessions/2026-07-09-agy-momentum-auth-route-protection|2026-07-09-agy-momentum-auth-route-protection]].
- Session log [[06-Agent-Sessions/2026-07-09-agy-task-6-empty-state|2026-07-09-agy-task-6-empty-state]].
- Session log [[06-Agent-Sessions/2026-07-09-agy-task-9-layout-optimization|2026-07-09-agy-task-9-layout-optimization]].
- Project task report [[.superpowers/sdd/task-1-report|task-1-report.md]].
- [[01-Projects/Momentum/Momentum|Momentum hub]] + full doc sync from Port Sites (banner dated 2026-07-09), including INSIGHTS/NOTES.
- [[01-Projects/Ledger/Ledger|Ledger]] project onboarded with Docs mirror from Port Sites.
- [[01-Projects/Momentum/Lessons-from-DEV_NOTES|Lessons-from-DEV_NOTES]] extracted before archive.
- [[02-Areas/Agent-Ops/How-Victor-Works-With-Agents|How Victor Works With Agents]].
- [[03-Resources/Vault-Ops/Session-Lesson-Extraction-Idea|Session lesson extraction (draft)]].
- [[03-Resources/Vault-Ops/Vault-Improvement-Backlog|Vault improvement backlog]] (full skills expansion deferred).
- Session log [[06-Agent-Sessions/2026-07-09-grok-vault-realignment|2026-07-09-grok-vault-realignment]].
#### Changed
- Rewrote [[index|index.md]], [[BRAIN|BRAIN.md]], [[AGENTS|AGENTS.md]] §E, [[README|README.md]], [[02-Areas/Personal-Growth/RedMane|RedMane]] for supervisor model + Phase 0 focus.
- Consolidated Tempire Notes/Decisions/Logs/TODO into [[01-Projects/Tempire/Tempire|Tempire.md]]; demoted Tempire to later.
- `~/.grok/AGENTS.md` and `~/AGENTS.md` rewritten (no orchestration engine boot).
- Removed `~/.grok/skills/orchestrate` skill.
#### Archived / removed
- Archived [[04-Archive/Momentum/DEV_NOTES|Momentum DEV_NOTES]].
- Deleted `01-Projects/Momentum/Momentum-original.md`.
- Deleted Tempire satellite notes (Notes, Decisions, Logs, TODO) after merge into hub.
- Session logs retained as history.

### Prior
### Added
- Added session log [[06-Agent-Sessions/2026-07-06-agy-unify-mcp-config|2026-07-06-agy-unify-mcp-config.md]] documenting the unification of the Antigravity CLI and IDE MCP configurations under the `.gemini` folder and legacy cleanup.
- Added session log [[06-Agent-Sessions/2026-07-06-agy-clerk-auth|2026-07-06-agy-clerk-auth.md]] documenting the Clerk Authentication Setup, Next.js manual scaffolding, project naming corrections, and dev dev server configurations.
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
