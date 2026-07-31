# Vault Health & Lint Report

> **One-line Summary**: Full lint pass 2026-07-31 — post 26-file + 5-file orphan extraction, post Ledger Phase 1/2/P3-A and Momentum sidebar/auth closure. Obsidian CLI was unavailable this session (`Command line interface is not enabled` for `unresolved`/`orphans`/`deadends`); fell back to the documented Python wikilink scanner (file-existence verification) + manual `grep` spot-checks, per [[AGENTS]] §C item 9.

**Audit date:** 2026-07-31
**Prior audit:** [[LINT-REPORT|2026-07-20 pass]] (above replaced)
**Audit trigger:** Routine vault maintenance ("cleanup hasn't been done in weeks") — full lint + inbox/session backlog sweep
**Methods:**
1. **Obsidian CLI** — attempted, unavailable this session (desktop setting not enabled). Not used.
2. **Python scanner** (`/tmp/.../scratchpad/vault-lint-scan.py` — not committed) — 133 md files, resolves by `(path, path+.md, unique-basename)`, marks multi-basename matches `AMBIGUOUS:` rather than guessing. A basename-ambiguity bug in incoming-link attribution was found and fixed this session (see §Method provenance).
3. **Manual `grep`** spot-checks on every note added/moved/deleted this session (orphan verification, `Saved-Threads/` folder-exists check, `ASSETS.md` rename confirmation).

---

## Summary table

| Check | Python scanner (2026-07-31) | Prior pass (2026-07-20) | Verdict |
|-------|------------------------------|---------------------------|---------|
| Unresolved links (unique targets) | 54 (70 instances) | 91 (118 instances) | Down — largely historical-ref cleanup + 5-file deletion removing their outgoing links |
| Orphan notes | 11 | 20 | Down — 5 files deleted this session, 4 more already resolved pre-compaction |
| Dead-end notes (no outgoing) | 30 | 46 | Down — mirror docs + archive still dominate, all acceptable-by-design |
| Actionable (real, fixable problems) | **0** | 5 | All 5 prior actionable items resolved or confirmed non-issues this session — see §Unresolved below |
| Stale project phase claims | 0 | 1 (BRAIN.md date) | Fixed — [[BRAIN]] refreshed to 2026-07-31 this session |
| Inbox backlog | 3 items, 0 dangling links | 4 items, 1 dangling link | [[00-Inbox/Antigravity Swarm]] dangling ref fixed this session |
| Empty/typo junk notes | 0 | 1 (`ASSETS.md.md`) | Confirmed already renamed to `ASSETS.md` (fixed pre-compaction, verified this session) |

---

## Repairs this pass (2026-07-31)

| Issue | Resolution | Method that found it |
|-------|------------|---------------------|
| [[BRAIN]] `## Active focus` stale at 2026-07-15 | Refreshed to 2026-07-31 (Ledger Phase 1/2 gates passed + P3-A done, Momentum sidebar/auth done) | Manual |
| [[index]] project headings, lint pointer, "pending processing" line all stale | All refreshed to current phase/date state | Manual |
| `00-Inbox/Antigravity Swarm.md` dangling wikilink to deleted `2026-07-20-grok-antigravity-step5c-perf-gate` | Repointed to [[06-Agent-Sessions/extracted-sessions]] | Python scanner (carried over from 2026-07-20 report, unfixed until now) |
| Second orphan pocket of 5 leftover session logs (07-14/07-15, not part of the original 26-file extraction batch) | Triaged via background agent — all confirmed redundant with content already in [[01-Projects/Ledger/Ledger]], [[ANTI_PATTERNS]], [[03-Resources/Skills/Collapsible-Desktop-Sidebar]], [[03-Resources/Tools/Effects_Glossary]]/[[03-Resources/Tools/Effects_Playbook]] — deleted, row added to [[06-Agent-Sessions/extracted-sessions]] | Manual `ls` sweep of `06-Agent-Sessions/` against `extracted-sessions.md` |
| `03-Resources/Skills/Defuddle-Clipping.md` — long-orphaned skill note | Wired inbound link from [[AGENTS]] §3 defuddle bullet | Python scanner (carried over from 2026-07-20 report) |
| `03-Resources/Skills/Pre-Launch-Security-Checklist.md` — long-orphaned skill note | Wired inbound link from [[03-Resources/MOC-UI-UX-Lessons]] §Product Thinking | Python scanner (carried over from 2026-07-20 report) |
| Theme-toggle icon spec/code discrepancy (session on 2026-07-15 reversed the toggle ternary; [[01-Projects/Ledger/Docs/UIUX_BRIEF]] §6.10 / [[01-Projects/Ledger/Docs/APP_FLOW]] §3.2 still document the opposite) | **Not resolved** — flagged as an explicit "unresolved, needs Victor" bullet in [[01-Projects/Ledger/Ledger]] `## Lessons log` rather than picking a side | Background triage agent (second-pocket review) |
| `03-Resources/Saved-Threads/` — flagged 2026-07-20 as a link to a nonexistent folder | Re-checked: folder exists on disk with `.gitkeep` (created 2026-07-08) — **already resolved**, just not yet populated with saved threads. No action needed. | Manual `ls` |
| Python scanner basename-ambiguity bug (multiple files sharing a basename, e.g. `AGENTS.md`/`PRD.md` across project `Docs/` folders, were attributed to whichever file an unordered `set` iteration hit first) | Fixed: exact-path match now preferred before basename fallback; multi-match cases marked `AMBIGUOUS:` instead of guessed | Self-caught while auditing an implausible orphan list (34 orphans pre-fix on a smaller/older scan, later corrected) |

---

## Unresolved links — categorized

### Acceptable / intentional (do NOT fix) — 54 unique targets / 70 instances, all categorized

| Category | Examples | Count (approx.) | Why unresolved |
|----------|----------|------------------|-----------------|
| Historical `CHANGELOG.md` refs to deleted session logs | `06-Agent-Sessions/2026-07-05-agy-supabase-migration-fix`, `...-06-agy-clerk-auth`, `...-09-agy-*` (×7), `...-19-opencode-*` (×3), `...-24-agy-ledger-icon-category-doc-patches`, `GLM-5.2_Context-Overflow_Crash`, `2026-07-14-grok-agent-sessions-handoff` | ~17 | CHANGELOG is an audit trail — links document what happened at the time, not where files live now. Index replacement for all: [[06-Agent-Sessions/extracted-sessions]] |
| Outside-vault paths | `Documents/mario-dev-portfolio/src/...` (×4), `Documents/Research_files/Collapsible_Sidebar_Implementation`, `~/.grok/sessions/...` | ~6 | Files exist on disk outside vault root — Obsidian/scanner cannot resolve by design |
| Template placeholders | `Note 1`/`Note 2` (×2 each), `path/to/file`, `path/to/reference`, `01-Projects/New_Project/New_Project`, `related note or MOC`, `source file or project path` | ~8 | Example text in `Templates/*.md` — not real targets |
| Clipping author bylines | `Jennifer Pelegrin`, `Sarah Shaar`, `Kevin (@kvnkld)`, `Research With LLMs` (×2), `Prompts and Thoughts` | ~6 | Clip metadata from author bylines — not vault notes |
| Planned area notes (Tempire/Momentum forward-refs) | `02-Areas/Business-Wealth/Revenue-Engines` (×8 — every Tempire doc), `02-Areas/Health-Fitness/Personal-Health-OS`, `02-Areas/Vision/North-Star`, `01-Projects/Momentum/Notes` | ~11 | Same as prior passes — low priority while Tempire is demoted |
| Outside-vault Port Sites path | `.superpowers/sdd/task-1-report` (CHANGELOG) | 1 | Port Sites path, outside vault |
| ANTI_PATTERNS split placeholder | `03-Resources/Principles/<slug>` | 1 | Correct when `ANTI_PATTERNS.md` hits 200-line split threshold (currently well under) |
| Session-log code-path wikilinks | `lib/actions/profile.ts`, `app/(auth)/layout.tsx`-style refs inside `2026-07-19-grok-ledger-ui-polish-audit-fixes.md`, `2026-07-20-opencode-antigravity-step5b-swarm-real-rootcause.md` | ~4 | Session logs use `[[path/to/file.ts]]` style for **code paths**, not vault notes — acceptable in session-log context |
| Self-referential report examples | `path/to/file.ts`, `target`, `wikilinks`, `lib/actions/profile.ts` — all `<- ['LINT-REPORT.md']` | 4 | This report uses literal wikilink syntax as documentation examples inside table cells — inherent scanner noise, not a real vault problem |
| Escaped-pipe table-cell artifact | `03-Resources/Tools/AgentMemory-Dual-Store-Tab-Write-Paths\`, `04-Archive/Momentum/DEV_NOTES\`, `06-Agent-Sessions/extracted-sessions\` (trailing backslash) | 3 | The prior LINT-REPORT.md used `\|` to escape a literal pipe inside a markdown table cell (e.g. `[[Path\|alias]]`); the scanner's regex captures the backslash as part of the target. Cosmetic scanner limitation, not a broken link — confirmed via manual read of source. |
| Future-projects/misc single refs | `Future Projects`, `Documents/Research_files/Vault Research` cross-refs | ~2 | Freeform daily-note / clipping cross-references, not intended as resolvable wikilinks |

**Actionable this pass: 0.** All 5 items flagged actionable in the 2026-07-20 report are now resolved or confirmed non-issues (see §Repairs above): the `step5c-perf-gate` dangling ref is fixed, the `lib/actions/profile.ts` self-reference is accepted as report-example noise (same call made 2026-07-15/07-20), `Saved-Threads/` already exists on disk, `Principles/<slug>` still correctly deferred to the 200-line trigger, and the old report's own self-reference row is gone with this rewrite.

---

## Orphans — triage (11 lintable)

| Note | Verdict |
|------|---------|
| `00-Inbox/Sites To Extract.md` | Inbox planning backlog — leave, process when next emptying inbox |
| `04-Archive/Voice-Notes/Voice Notes 37 Transcript.md` | Historical raw transcript — archive orphan is acceptable |
| `05-Daily/2026-05-11.md`, `2026-06-25.md`, `2026-07-20.md` | Periodic dailies — orphans by convention, unchanged |
| `06-Agent-Sessions/2026-07-19-grok-portfolio-phase-1-identity.md` | **Deferred (decided 2026-07-31, Victor)** — content closed, no project hub. `mario-dev-portfolio` isn't wired into the vault project structure like Momentum/Ledger yet (just loose `venmarcstudio.xyz` mentions) — deliberately not creating `01-Projects/Portfolio/Portfolio.md` now; link it in later. See [[06-Agent-Sessions/extracted-sessions]] "Held open" note. |
| `06-Agent-Sessions/2026-07-20-grok-antigravity-reactive-build-checkpoint-0-3.md`, `2026-07-20-grok-antigravity-reactive-build.md`, `2026-07-21-grok-antigravity-jellyfish-organism.md` | **Held open** — jellyfish-ring rewrite awaiting Victor's review/sign-off before glossary promotion. Do not extract. |
| `06-Agent-Sessions/2026-07-30-opencode-ledger-p3-b-plan.md` | **Held open** — paused mid implementer-review pass on Victor's explicit "STOP"; awaiting `docs/P3-B-HOLES.md` + his approval. Do not extract. |
| `Assets/ASSETS.md` | Assets folder documentation note — not meant to be part of the note graph (indexes binary assets, not linked from hub notes). Low-priority, acceptable as-is. |

**All 11 current orphans are either acceptable-by-design (dailies, inbox backlog, archive, assets doc) or explicitly held open pending Victor** — none are stale/forgotten candidates for extraction this pass. This is a meaningfully cleaner state than the 2026-07-20 report's 20 orphans, 11 of which were then-extractable session logs (now processed).

---

## Dead-ends — 30 lintable

| Note | Verdict |
|------|---------|
| All `01-Projects/Ledger/Docs/*.md` (12 files) + `01-Projects/Momentum/Docs/*.md` (10 files) | Mirror docs from Port Sites — outgoing-link responsibility belongs to the hub ([[01-Projects/Ledger/Ledger]] / [[01-Projects/Momentum/Momentum]]), which link to them. Acceptable. |
| `02-Areas/Agent-Ops/GLM-5.2-Context-Overflow.md` | Permanent reference note — outbound refs are plain paths, not wikilinks, by design. Acceptable. |
| `04-Archive/Clippings/Agent Skill Problem.md`, `04-Archive/Inbox/Transaction_UI_Spec.md`, `04-Archive/Voice-Notes/Voice Note 36 Transcript.md`, `Voice Notes 37 Transcript.md` | Historical/immutable archived originals — no outgoing wikilinks by design, preserves provenance. Acceptable. |
| `06-Agent-Sessions/2026-07-20-grok-antigravity-reactive-build.md`, `2026-07-21-grok-antigravity-jellyfish-organism.md` | Held-open session logs (see §Orphans) — will gain/lose outgoing links once Victor's review resolves the thread. Not touched. |
| `README.md` | Vault root README — standard markdown paths, no wikilinks by design. Acceptable. |

No actionable dead-ends this pass.

---

## Inbox (00-Inbox) — 3 items

| File | Status |
|------|--------|
| `.gitkeep` | Standard |
| `Antigravity Swarm.md` | Dangling ref fixed this session (repointed to `extracted-sessions`) — otherwise current |
| `Sites To Extract.md` | Planning backlog — leave |

`Bug In Ledger.md` (present in the 2026-07-20 report) has been archived — confirmed no longer in `00-Inbox/` this pass.

---

## Contradictions & stale claims

| Note | Status |
|------|--------|
| [[01-Projects/Ledger/Ledger]] phase status | Fixed this session — now correctly shows Phase 1/2 gates passed, P3-A complete, P3-B paused |
| [[BRAIN]] "Active focus: 2026-07-15" | Fixed this session — refreshed to 2026-07-31 |
| [[index]] project headings + lint pointer | Fixed this session — refreshed to 2026-07-31 |
| Theme-toggle icon behavior — [[01-Projects/Ledger/Docs/UIUX_BRIEF]] §6.10 / [[01-Projects/Ledger/Docs/APP_FLOW]] §3.2 vs. a 2026-07-15 session that reversed the toggle ternary | **Resolved 2026-07-31.** Victor fixed the toggle back to spec (icon shows current state, not target) — docs were correct as written, no doc changes needed. |

---

## Knowledge gaps

Unchanged from prior passes (cleanup work doesn't create or close project gaps):

- `02-Areas/Business-Wealth/Revenue-Engines.md` — planned area note missing (Tempire refs)
- `02-Areas/Health-Fitness/Personal-Health-OS` + `02-Areas/Vision/North-Star` — Momentum archived refs only, still unwritten
- Weekly synthesis cadence (`05-Daily/weekly/`) — still deferred
- Whether `01-Projects/Portfolio/Portfolio.md` should exist — 3 portfolio session logs now closed with no hub destination; held pending Victor (see §Orphans)

---

## Graph health

| Metric | This pass (2026-07-31) | Prior pass (2026-07-20) | Signal |
|--------|--------------------------|----------------------------|--------|
| Total md files scanned | 133 | 146 | Down — net effect of 26 + 5 extracted-session deletions outpacing new notes added |
| Unresolved (unique / instances) | 54 / 70 | 91 / 118 | Down — historical-ref cleanup + fewer raw session logs generating code-path noise |
| Orphans (lintable) | 11 | 20 | Down — session-log extraction + 2 skill notes wired this session |
| Dead-ends (lintable) | 30 | 46 | Down — same driver, mirror docs + archive still dominate the remainder |
| Actionable backlog | 0 | 5 | Fully cleared this pass |
| Session folder | 15 files (13 raw logs currently held-open/tooling + `extracted-sessions.md` + 2 JSON artifacts) | 16 raw + index | Improving — down from 70+ raw logs at the 2026-07-14 baseline |

---

## Suggestions (priority order)

1. ~~Portfolio hub decision~~ — **Decided 2026-07-31 (Victor): defer.** `mario-dev-portfolio` stays unlinked from the vault project structure for now; wire it in later.
2. ~~Theme-toggle icon discrepancy~~ — **Resolved 2026-07-31 (Victor).** Toggle fixed back to spec; no doc changes needed.
3. **Do not touch** the 5 held-open session logs (P3-B plan, antigravity reactive ×3, portfolio phase-1) until Victor acts — they are correctly orphaned/dead-ended by design, not a lint gap.
4. **`Assets/ASSETS.md`** — cosmetic-only; wire an inbound link from `index.md` if Victor wants it in the graph, otherwise leave (assets docs aren't core PARA content).
5. Continue the ~3-month cadence of a fresh Python-scanner pass even when Obsidian's CLI setting is off — this pass shows the fallback method alone is sufficient to catch real regressions (dangling ref, stale dates) when cross-checked with manual `grep`.

---

## Method provenance (for the next agent who runs a lint pass)

This 2026-07-31 pass used **two** methods (Obsidian CLI was unavailable — desktop setting not enabled, and enabling it was judged a non-trivial interruption not worth surfacing mid-task per [[AGENTS]] §C item 9's discrepancy-by-design convention):

1. **Python scanner** — walks the vault, parses `[[target|alias]]` wikilinks via regex, resolves by exact path → `path.md` → unique basename, and marks ambiguous multi-basename matches explicitly rather than guessing (a bug in this exact area was caught and fixed this session — see §Repairs). Filters templates/scripts/JSON/media from orphan and dead-end sets.
2. **Manual grep** — spot-checks on every note touched this session (dangling-link repair, `Saved-Threads/` folder-exists check, `ASSETS.md` rename confirmation, second orphan-pocket file list vs. `extracted-sessions.md`).

**Cross-method note for next time:** if Obsidian's CLI is enabled again, expect its raw orphan/unresolved counts to run higher than the scanner's — it counts *all* files (templates, scripts, JSON, images) as graph nodes, while the scanner filters to real `.md` notes only. Both are correct within their stated scope; document both rather than reconciling to one number.

---

**Tags:** #lint #vault-health #2026-07-31
