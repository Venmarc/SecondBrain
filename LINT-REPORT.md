# Vault Health & Lint Report

> **One-line Summary**: Full lint pass 2026-07-20 — post Phase 1–4 cleanup. Methods cross-checked: Obsidian CLI graph indexer (real `unresolved`/`orphans`/`deadends`/`backlinks` commands), independent Python wikilink scanner (file-existence verification), and manual `grep` spot-checks of every note added/moved/deleted this cleanup. Counts differ between methods because the Obsidian indexer resolves by basename while the Python scanner is strict-path — both are reported.

**Audit date:** 2026-07-20
**Prior audit:** [[LINT-REPORT|2026-07-15 pass]] (above replaced)
**Audit trigger:** Phase 5 of the two-session vault-cleanup (`~/prompt.txt` → handoff at `~/Documents/Research_files/vault-cleanup-handoff-2026-07-20.md`)
**Methods:**
1. **Obsidian CLI** (real graph indexer — `obsidian unresolved counts`, `obsidian orphans total`, `obsidian deadends total`, `obsidian backlinks path=... counts`)
2. **Python scanner** (`scripts/../tmp/vault-lint-scan.py` — independent file-existence check on every wikilink target; exits to `/tmp/opencode/`, not committed) — 146 md files, 539 wikilinks parsed
3. **Manual `grep`** spot-checks on the 4 notes added/moved this cleanup (orphan verification) + the dangling Crash-doc legacy ref (repair verification)

---

## Summary table

| Check | Obsidian CLI | Python scanner | Manual grep | Verdict |
|-------|--------------|----------------|-------------|---------|
| Unresolved links (unique targets) | 34 | 91 (118 link instances) | n/a | Two methods, two scopes — see §Cross-method rigour below |
| Orphan notes | 73 | 20 (lintable only — excludes templates / scripts / JSON / png / mp4) | n/a | Most Obsidian "orphans" are templates/scripts/media — see §Orphans below |
| Dead-end notes (no outgoing) | 34 | 46 | n/a | Mostly archived immutables + Port Sites mirror docs — see §Dead-ends below |
| Stale project phase claims | n/a | n/a | Ledger "Phase 1 (gate pending)" still accurate per [[01-Projects/Ledger/Ledger|Ledger hub]] | ✅ Current |
| Inbox backlog | n/a | n/a | 4 files in `00-Inbox/` — see §Inbox below | ✅ Manageable |
| Empty junk notes | n/a | n/a | `Assets/ASSETS.md.md` is a typo-named Obsidian-created stub — see §Style | ⚠️ Minor |

---

## Repairs this pass (2026-07-20)

| Issue | Resolution | Method that found it |
|-------|------------|---------------------|
| `index.md` "Last lint: 2026-07-15" stale | → 2026-07-20 | Manual |
| `index.md` Tools row missing new AgentMemory Tools note | Added `[[03-Resources/Tools/AgentMemory-Dual-Store-Tab-Write-Paths\|AgentMemory dual-store + tab write paths]]` | Manual |
| `CHANGELOG.md` 2026-07-19 Unit-6 entry linked old `06-Agent-Sessions/GLM-5.2_Context-Overflow_Crash` (file moved 2026-07-19, never updated) | Repointed to `[[02-Areas/Agent-Ops/GLM-5.2-Context-Overflow]]` with inline note ("historical wikilink kept as audit trail — see §Moved in the 2026-07-20 cleanup") | Python scanner (category `moved-crash-legacy-ref`) |
| Verified orphan status of the 2 new notes added this cleanup | `Discrete-State-Control-Selection` — 4 incoming backlinks (PAGE_SPECS, Ledger hub, MOC ×2). `AgentMemory-Dual-Store-Tab-Write-Paths` — 3 incoming backlinks (extracted-sessions, CHANGELOG, index). NOT orphans | Obsidian CLI `backlinks counts` |
| New `AgentMemory-Dual-Store-Tab-Write-Paths` wording intentional? | The note's "Where This Appeared" section cites the 3 deleted agentmemory session files by filename as **history**, not as wikilinks — confirmed via re-read; nothing to fix | Manual re-read |

---

## Unresolved links — categorized

### Acceptable / intentional (do NOT fix)
*Confirmed by all three methods where applicable.*

| Target | Why unresolved | Caller count (scanner) | Method |
|--------|----------------|------------------------|--------|
| `06-Agent-Sessions/2026-07-*` (18 historical session refs) | Historical refs in CHANGELOG to **deleted** session logs after extraction. CHANGELOG is an audit trail — links document what happened, not where files live now. Index replacement: [[06-Agent-Sessions/extracted-sessions\|extracted-sessions]] | 18 | Obsidian CLI + Python scanner (`historical-session-ref`) |
| `Documents/Research_files/*` and `~/...` paths (port-sites, `~/.agents`, `~/.agentmemory`, `~/Pastries/...`) | Outside vault root — Obsidian cannot resolve. Files exist on disk — verified via prior session. | 18 | Obsidian CLI + Python scanner (`outside-vault`) |
| `Templates/*` placeholder wikilinks (`Note 1`, `path/to/reference`, `01-Projects/New_Project/New_Project`, `source file or project path`, `related note or MOC`, empty `TARGET:`) | Template examples — not real targets. | 6 | Python scanner (`template-placeholder`) |
| `Clippings/*` author wikilinks (`Jennifer Pelegrin`, `Sarah Shaar`, `Kevin (@kvnkld)`, `Research With LLMs`, `Prompts and Thoughts`) | Clip metadata extracted from author bylines — not vault notes. | 5 | Python scanner (`clipping-author`) |
| `04-Archive/`, `04-Archive/Clippings` | Section stubs — clipping subfolder not promoted to a hub note; archive is a leaf store. | 2 | Python scanner (`archive-path-stub`) |
| `02-Areas/Business-Wealth/Revenue-Engines`, `02-Areas/Health-Fitness/Personal-Health-OS`, `02-Areas/Vision/North-Star` | **Planned area notes** referenced by Tempire/Momentum archived DEV_NOTES — low priority while Tempire demoted. Same as 2026-07-15 pass; unchanged. | 3 | Python scanner (`planned-area-note`) |
| `.superpowers/sdd/task-1-report` | Port Sites path in CHANGELOG — outside vault. | 1 | Obsidian CLI + Python scanner (`port-sites-external`) |
| `01-Projects/Momentum/Notes` | Still referenced only from [[04-Archive/Momentum/DEV_NOTES\|archived DEV_NOTES]] — fix when touching archive. | 1 | Both |
| `06-Agent-Sessions/2026-07-15-agy-phase-0-layout-revisions` internal code wikilinks (`app/(auth)/layout.tsx`, `components/LayoutShell.tsx`, `lib/actions/profile.ts`, etc.) | Session log uses `[[path/to/file.ts]]` style for **code paths** — not vault notes; OK for session logs | ~17 | Python scanner |
| `01-Projects/Tempire/Tempire#Architecture decisions (condensed)`, `#Session log (condensed)`, `#TODO (when revived)` | Heading-anchor wikilinks — Obsidian super-resolves to file but counts as unresolved in the strict scanner because the heading anchor isn't separable from the path | 3 | Python scanner |
| `Pasted image 2026-07-20 *.png`, `Screencast From 2026-07-20 *.mp4` | In-vault assets in `Assets/` — Obsidian graph indexer treats all files as nodes; strict scanner only counts `.md`; both methods agree the files exist, just don't both count them as wikilinks | n/a | Both — false positive in Python scanner because they're real file refs but not `.md` |
| `2026-07-20-grok-antigravity-step5c-perf-gate` | Wikilink from `00-Inbox/Antigravity Swarm.md` to a session log **deleted in Phase 2** — file gone, ref is in an active inbox note. **Flag for Action §1 below.** | 1 | Python scanner (`actionable?`) |

### Actionable (suggest a fix)
*5 targets total — small backlog, no urgency.*

| Target | Why unresolved | Suggested fix |
|--------|----------------|---------------|
| `2026-07-20-grok-antigravity-step5c-perf-gate` | Wikilink in `00-Inbox/Antigravity Swarm.md` → session log deleted Phase 2. Victor's inbox note still references the now-extracted work. | Repoint to `[[06-Agent-Sessions/extracted-sessions]]` or strip if content is in the thread-table. |
| `lib/actions/profile.ts` wikilink in [[LINT-REPORT]] (this file) | Was in the 2026-07-15 §Actionable table — that row pledged "session log uses `[[lib/actions/profile.ts]]` style — not vault notes; OK for session logs". This lint report had the very same dangling ref. | Replace this file's `[[lib/actions/profile.ts]]` with a code-fenced `\`lib/actions/profile.ts\`` (inline code) — already done in the prior 2026-07-15 entry. |
| `03-Resources/Saved-Threads/` | [[03-Resources/Skills/Agent-Prompting-Masterclass]] references a folder that doesn't exist. | Create folder or strip link when touching that skill. |
| `03-Resources/Principles/<slug>` | [[ANTI_PATTERNS]] split placeholder. | Correct when ANTI_PATTERNS.md hits 200 lines (currently 76 — not triggered). |
| Stale `[[06-Agent-Sessions/2026-07-09-grok-vault-realignment]]` in [[LINT-REPORT]] 2026-07-15 repairs table | Self-reference in this file's prior pass — historical audit trail; not a living wikilink. | Optional: replace with prose "realignment session (extracted)". |

---

## Orphans — triage

### Real orphans (lintable, non-template, non-script, non-media) — **20**

| Note | Obsidian CLI says | Verdict |
|------|-------------------|---------|
| `00-Inbox/Sites To Extract.md` | ✓ orphan | Inbox item — process when next emptying inbox |
| `03-Resources/Skills/Defuddle-Clipping.md` | ✓ orphan | Valid skill note — add to MOC-UI-UX-Lessons or create `MOC-Tooling` |
| `03-Resources/Skills/Pre-Launch-Security-Checklist.md` | ✓ orphan | Same as above |
| `04-Archive/Voice-Notes/Voice Notes 37 Transcript.md` | ✓ orphan | Historical raw transcript — archive is OK as orphan |
| `05-Daily/2026-05-11.md`, `2026-06-25.md`, `2026-07-20.md` | ✓ | Historical/periodic dailies — OK orphans by convention |
| `06-Agent-Sessions/2026-07-15-agy-collapsible-sidebar-integration.md` | ✓ | **Active handoff** (Phase 3 of the antigravity Build lane was deferred → Phase 2 of crypto project) — **NOT deleted** because work continues. Process or delete when thread closes. |
| `06-Agent-Sessions/2026-07-15-agy-momentum-auth-pages-cleanup.md`, `2026-07-15-agy-momentum-task-1-review.md`, `2026-07-15-agy-task-1-logo-colors.md`, `2026-07-16-agy-collapsible-sidebar.md`, `2026-07-16-agy-momentum-review.md`, `2026-07-17-agy-momentum-refinement.md` | ✓ | Momentum Phase 0 sessions — knowledge already in [[01-Projects/Momentum/Momentum]] hub + [[03-Resources/Skills/Collapsible-Desktop-Sidebar]] skill + [[ANTI_PATTERNS]] rows. **Candidates for extraction** but low priority: hubs already updated. |
| `06-Agent-Sessions/2026-07-16-grok-ledger-phase-1-full.md`, `2026-07-16-grok-ledger-phase-1.md` | ✓ | Ledger Phase 1 sessions — knowledge already in [[01-Projects/Ledger/Ledger]] `## Lessons log`. **Candidates for extraction** (would bring orphans-to-orphans down by 2). |
| `06-Agent-Sessions/2026-07-19-grok-portfolio-phase-1-identity.md` | ✓ | Portfolio Phase 1 active handoff — Phase 2/3 still open. **NOT touched by 2026-07-20 cleanup** — see prompt rule in `~/prompt.txt` constraint. |
| `06-Agent-Sessions/2026-07-20-grok-antigravity-reactive-build-checkpoint-0-3.md`, `2026-07-20-grok-antigravity-reactive-build.md`, `2026-07-20-grok-antigravity-reactive-extract.md` | ✓ | **Antigravity reactive thread** — 3 raw logs from the FINAL reactive-antigravity session (2026-07-20) that the prior handoff explicitly left alone ("NOT in scope (different thread)"). The thread is now CLOSED (extracted-sessions row 2026-07-18 → 2026-07-20). **Candidates for extraction** — same lane as the 10 antigravity raw files deleted Phase 2. |
| `Assets/ASSETS.md.md` | ✓ | Typo-named Obsidian-created file (`ASSETS.md.md` instead of `ASSETS.md`) — empty stub. **Delete or rename.** |

### Apparent orphans from Obsidian CLI (73) vs scanner (20)

The Obsidian CLI counts **73 orphans** because it includes **all** files: scripts (`scripts/harvest.js`, `vault-librarian.js`), JSON (`harvest-history.json`, etc.), images (`Assets/Pasted image *.png`), screencasts (`*.mp4`), and Templates. The Python scanner filters these out by extension and path-prefix → **20 real orphans**. Both methods are correct within their scope.

---

## Dead-ends — 46 lintable

| Note | Verdict |
|------|---------|
| All `01-Projects/Ledger/Docs/*.md` (12 files) + `01-Projects/Momentum/Docs/*.md` (10 files) | **Mirror docs** from Port Sites — they don't need outgoing wikilinks because they're immutable copies; outgoing link responsibility belongs to the **hub** [[01-Projects/Ledger/Ledger]] / [[01-Projects/Momentum/Momentum]] which both link to them. ✅ Acceptable. |
| `02-Areas/Agent-Ops/GLM-5.2-Context-Overflow.md` | **Permanent reference** — added this session as a destination-not-source note. Has outbound links to `Opencode_Agent_crash_session.md`, `~/prompt.md`, `~/Pastries/rep.../README.md`, `2026-07-18-opencode-antigravity-extract.md` — but those are plain paths/file refs not `[[wikilinks]]`, so the strict scanner counts them as edges to non-vault. Obsidian CLI agrees. **Acceptable** — agent-ops docs cross-reference by path, not wikilink. |
| All `04-Archive/*` notes (8 files) + `04-Archive/Inbox/Transaction_UI_Spec.md` | Historical / immutable archived originals — they intentionally have no outgoing wikilinks (preserve provenance). ✅ |
| `00-Inbox/Antigravity Swarm.md`, `00-Inbox/Bug In Ledger.md` | **Inbox items** — they have inline wikilinks to deleted session files (flagged in §Actionable above). Process or fix when emptying inbox. |
| `06-Agent-Sessions/2026-07-14-grok-agent-sessions-handoff.md`, `2026-07-15-*-cleanup/session-integration/etc.` | Session logs from extracted threads — they have outgoing wikilinks **only to deleted session files in the same thread** (which the obsidian scanner still tracks). ✅ Acceptable, but their outgoing links themselves appear as unresolved to the strict scanner. |
| `Clippings/*` raw immutable clips | Raw immutable browser clips — no outgoing wikilinks by design (summary lives in destination notes). ✅ |
| `README.md` | Vault root README — no outbound wikilinks by design, contains standard markdown paths. ✅ |
| `Assets/ASSETS.md.md` | Empty stub — delete. |

---

## Inbox (00-Inbox) — 4 items

| File | Status |
|------|--------|
| `.gitkeep` | ✅ Standard |
| `Antigravity Swarm.md` | Active — references step5c-perf-gate session (extracted Phase 2) → fix ref or extract into thread-table |
| `Bug In Ledger.md` | Status lines updated 2026-07-19 (bugs resolved → [[ANTI_PATTERNS]] §Clerk). Now resolved. **Suggest** Victor archive. |
| `Sites To Extract.md` | Planning backlog — leave |

---

## Cross-method rigour (what the three numbers actually mean)

| Method | Unresolved count | Why it differs |
|--------|------------------|----------------|
| Obsidian CLI (`orphans total`) | 73 | Counts all files including templates, scripts, JSON, png, mp4 as nodes |
| Python scanner (filtered) | 20 / 46 / 91 / 118 | Excludes non-`.md` and known-acceptable categories; reports both unique targets (91) and total link instances (118) |
| Manual grep spot-checks | n/a | Confirmed individual cases (the 4 new notes' backlinks, the Crash-doc legacy ref) |

**Authoritative count for "real wikilink-target problems":** **5 actionable unresolved targets** (see §Unresolved links §Actionable). The other ~86 are acceptable-by-design (historical refs to deleted session logs, port-sites external paths, clipping author metadata, template placeholders, planned area notes, code-path wikilinks in session logs).

**Authoritative count for "real orphans":** **20**. None are critical; the highest-value fix is processing the 6 Momentum Phase 0 sessions + 3 antigravity-reactive sessions + 2 Ledger Phase 1 sessions → 11 orphan session logs would reduce to ~9 orphans (those files would be deleted and their combined row appended to extracted-sessions.md as a closed thread).

---

## Contradictions & stale claims

| Note | Status |
|------|--------|
| Ledger hub "Phase 1 (gate pending)" | ✅ Accurate — implementation complete 2026-07-16 but Victor hasn't signed the gate |
| BRAIN.md "Active focus: 2026-07-15" | ⚠️ Slightly stale — Momentum + Ledger Phase 0 complete, Ledger Phase 1 pending gate, portfolio Phase 0/1 in flight. Could refresh to "Active focus (2026-07-20)". |
| index.md Ledger sync date `2026-07-16` | ✅ Accurate per [[01-Projects/Ledger/Ledger]] `Vault sync` line |
| [[01-Projects/Tempire/Tempire]] tagline + heading-anchor wikilinks | Heading-anchor unresolved is a Obsidian strictness artifact — file exists with headings; acceptable |

---

## Knowledge gaps

Same as 2026-07-15 pass (unchanged this session — cleanup work doesn't create project gaps):

- `02-Areas/Business-Wealth/Revenue-Engines.md` — planned area note missing (Tempire refs)
- `02-Areas/Health-Fitness/Personal-Health-OS` + `02-Areas/Vision/North-Star` — Momentum archived refs only
- Weekly synthesis cadence (`05-Daily/weekly/`) — deferred
- First Effects rep at glossary `untested` — no `MeshBackground`/`FilmGrain`/`Swarm`/`BlinkingCursor` had a verified-log block until 2026-07-19 Build-lane closed the antigravity thread — now resolved. Other glossary entries still `untested`.

---

## Graph health (article rule 8)

| Metric | Obsidian CLI | Python scanner | Signal |
|--------|--------------|-----------------|--------|
| Unresolved (living notes, post-fix) | ~34 raw, ~5 actionable | 91 raw, 5 actionable | Healthy — historical refs dominate (OK) |
| Orphans | 73 raw, 20 lintable | 20 lintable | Normal — archive + active session logs dominate |
| Dead-ends | 34 raw, 46 lintable | 46 lintable | Normal — mirror docs + archive don't need outgoing |
| MOC hub linkage | Strong (MOC-UI-UX, MOC-Projects, project hubs) | n/a | ✅ |
| Session folder | 16 raw session logs (down from ~26 pre-cleanup; was 70+ in 2026-07-14) | ✓ | ✅ Improving |
| Edges (wikilink instances) | n/a | 539 | Reasonable density for a 146-note vault (avg ~4 links/note) |

---

## Suggestions (priority order)

1. **Process the 3 `2026-07-20-grok-antigravity-reactive-*` session logs** — thread closed (Lighthouse 99/99 passed, Ashima GLSL root cause confirmed, Effects_Glossary entries `tried`). Extract → 1 combined row in `extracted-sessions.md` → delete the 3 raw files. (Would take ~20 min in next session.)
2. **Process the 6 Momentum Phase 0 session logs** (`2026-07-15-agy-collapsible-sidebar-integration.md` + 5 more) — knowledge already in `Momentum.md` hub + `Collapsible-Desktop-Sidebar` skill + `ANTI_PATTERNS` rows. Combined row in `extracted-sessions.md` → 6 raw deletions. (Would take ~30 min.)
3. **Process the 2 `2026-07-16-grok-ledger-phase-1*.md` files** — knowledge already in `Ledger.md` `## Lessons log` (2026-07-16 block). Combined row in `extracted-sessions.md` → 2 raw deletions.
4. **Archive `00-Inbox/Bug In Ledger.md`** — status lines confirm bugs resolved; suggest Victor review and archive to `04-Archive/Inbox/`.
5. **Process `00-Inbox/Antigravity Swarm.md`** — has 6 dangling wikilinks to deleted antigravity sessions and 12 image/screencast refs. Either promote its content into a MOC entry or extract its session into `extracted-sessions.md` and archive.
6. **Delete or rename `Assets/ASSETS.md.md`** — typo-named empty stub.
7. **Refresh BRAIN.md `## Active focus`** date to 2026-07-20 — minor staleness.

---

## Method provenance (for the next agent who runs a lint pass)

This 2026-07-20 pass used three independent methods because Victor asked for a comprehensive audit:

1. **Obsidian CLI** — `obsidian unresolved counts`, `obsidian orphans total`, `obsidian deadends total`, `obsidian orphans|deadends|unresolved` (full lists), `obsidian backlinks path=... counts`. Requires the Obsidian desktop app running with the SecondBrain vault open (provided this session). This is the **graph indexer** — it knows about aliases, basename resolution, and the live graph state. Its counts are **total** (templates, scripts, media included).
2. **Python scanner** — `/tmp/opencode/vault-lint-scan.py` (not committed — copy source from this LINT-REPORT's first revision if needed). Walks the vault, parses `[[target|alias]]` wikilinks, resolves by `(path, path+.md, basename, basename-no-ext)`. Reports file-existence verified counts. Filters out templates, scripts, JSON, png, mp4 from orphan/dead-end sets.
3. **Manual grep** — spot-checks on critical paths (the 4 new notes' incoming refs, the Crash-doc dangling ref). Lower coverage, higher precision.

**Suggested future lint passes:** always do (1) Obsidian CLI for graph state + (3) manual grep for surgical checks. Add (2) scanner every ~3 months for the **cross-method rigour** (catches staleness the graph indexer hides). When only (2) is available (no Obsidian open), the counts are still trustworthy — just filter templates/scripts/media explicitly in the scanner.

**Cross-method insight this pass:** Obsidian CLI's `orphans total` of 73 sounded alarming but contained 53 non-note files (templates/scripts/JSON/images). The Python scanner filtered to 20 real orphans, only 11 of which are extractable (the 11 orphan session logs from Momentum Phase 0 + Ledger Phase 1 + antigravity-reactive-final-3). The other 9 are dailies / inbox / archive / typo-stub — all *acceptable-by-design*.

---

**Tags:** #lint #vault-health #2026-07-20
