<!--
SESSION LOG — agentmemory viewer nav chrome fix + durable local patches; handoff for "Turn the rest on".
-->

> **One-line Summary**: Fixed agentmemory viewer tabs crushed at 100% zoom (flex-shrink on `.tab-bar`) and dead footer band; durable reapply lives in `~/.agentmemory/patches/` — next session: turn on empty tabs / full product surface.

**Date:** 2026-07-19  
**Agent:** Grok  
**Project:** none (infra / agentmemory tooling)

## Goal

Get up to speed from the search/import handoff, plan and implement the viewer UI chrome fix so all top tabs are usable at 100% zoom, preserve the fix across upgrades, and leave a clear next-session agenda for empty tabs / full agentmemory features.

## Standing Directives Given This Session

- None new as permanent project rules.
- Operational (this workstream): **no Playwright audit** for the chrome fix (user chose leave-it).
- Vault vs patches for “how to re-find after pull”: **decide at session-summary time** — this log + `~/.agentmemory/patches/README.md` are the pointers; optional vault resource later.

## User Prompts (Extracted, Not Compressed)

- **Prompt:** "@Documents/SecondBrain/06-Agent-Sessions/2026-07-19-grok-agentmemory-search-import-ui-handoff.md This has all; u need to get up to speed about agentmemory, the momory fix, the ui problem and where we might fix it from. Question: If we fiddle with the ui, and agentmemory viewer is live, like it is rn, can I see the changes in realtime?"
  **Overrode/Added:** Boot from handoff; answer live-reload first before deep UI work.

- **Prompt:** "Alright. Let's proceed with fixing it. Do u need a playwright audit… we need to plan… If I do a git pull… will git pull replace… Plan the ui, then we implement"
  **Overrode/Added:** Plan-first; durable storage strategy required; git-pull education.

- **Prompt (plan review):** "We leave it. no playwright audit" / store template in vault or refer to session (decide after complete) / footer dead padding with screenshot / "I'd like to know how we'll populate those tabs… gemini… graph, timeline, crystals…" / "If I run a git pull now… will it change any of the changes we made to the memory… Can u do that here? I'll run git pull now"
  **Overrode/Added:** No Playwright; watch for pull; memory safety first; empty-tab population deferred to next session; include footer gap in CSS fix.

- **Prompt:** "Done git pull"
  **Overrode/Added:** Proceed with UI implementation after pull check.

- **Prompt:** "Summarize. Next session is gonna be \"Turn the rest onnnn!!!\""
  **Overrode/Added:** Write session summary; next-session title locked to full agentmemory surface activation.

## Reference Files / Media

- `[[06-Agent-Sessions/2026-07-19-grok-agentmemory-search-import-ui-handoff.md]]` — prior session: import verified, empty tabs + nav UI open.
- Screenshots earlier handoff: tabs only visible when zoomed out; hover hit-test in gap.
- Session image footer band: large empty space above footer (~footer height); REFRESH button sits in content area above dead padding.
- Live serve: `http://127.0.0.1:3113` → package `dist/viewer/index.html` (re-read every request, `Cache-Control: no-cache`).
- Git clone: `~/.agents/repos/agentmemory` (upstream `rohitg00/agentmemory`, not Victor’s; no push).
- Patches dir: `~/.agentmemory/patches/` (stock, fixed, patch, apply script, README).

## Root Cause Log

| Symptom | Root Cause | Fix Applied | Confidence |
|---|---|---|---|
| Top tabs invisible at 100% zoom; need ~25–33% zoom; hover still works in thin gap | Body flex column + `100vh` + overflow hidden; active `.view` grows; stock `.tab-bar` had default `flex-shrink: 1` and no min-height → strip crushed | Surgical CSS on installed viewer: header/tab `flex: 0 0 auto`, tab `min-height: 48px`, denser padding + media query | **Confirmed** (CSS mechanism + live HTML served new rules) |
| Large empty band above footer; content “slides under” | `.viewer-footer { margin-top: 48px }` plus padding competed with flex height | Footer `margin-top: 0`, smaller padding, `flex: 0 0 auto`; slightly reduced `.view` bottom padding | Confirmed mechanism; user visual verify at 100% zoom |
| `memory_smart_search` empty for weeks (prior) | Dual store: `standalone.json` vs live `state_store.db` | Prior session import; this session did not re-import | Confirmed (prior) |
| GRAPH / SESSIONS / LESSONS / CRYSTALS / … empty | Mostly no data of those types written (not chrome); MCP `memory_save` ≠ full session graph | **Not fixed — next session “Turn the rest on”** | Hypothesis (strong) |
| Will git pull wipe memory? | Memory lives under `~/.agentmemory` + package data, not in clone | Documented; pull observed clone still dirty/behind; memories unchanged | Confirmed |
| Live UI vs repo source diverge | Installed 0.9.16 HTML ~183KB (May 16); clone `src/viewer` ~200KB newer with partial flex fixes never deployed to global package | Patch **installed** package path, not rely on clone alone | Confirmed |

## Research Conducted

- **Searched/Consulted:** Handoff log; live vs source `index.html` CSS; `document.ts` / `server.ts` (disk re-read per request); process ports 3111/3113; package path under nvm global node_modules; git status after user pull.
- **Should have been consulted but wasn't:** Full agentmemory docs for crystals/lessons/consolidate/Gemini wiring (deferred to “Turn the rest on”). N/A for chrome-only pass.

## Subagent Snags

- None for implementation. Background shell/find tasks from earlier boot hung and were killed. Git-pull monitor: user pull did not advance clone HEAD (still `behind 3`, dirty plugin scripts) — reported honestly; memory still safe.

## Decisions & Pivots

- Surgical CSS on **live installed** HTML over wholesale swap to newer clone viewer (avoid JS/API skew).
- Durable store under `~/.agentmemory/patches/` + apply script; vault session log is the agent-facing pointer (resource note optional later).
- No Playwright acceptance suite this pass (user).
- Empty-tab product activation explicitly **next session**, not mixed into chrome fix.
- Footer dead band included in same CSS pass after user screenshot.

## Steps Taken / Actions

1. Bootstrapped from handoff; answered live-edit: refresh-based (no HMR), edit must hit installed path.
2. Planned UI + git-pull durability; user approved with constraints.
3. Confirmed memory paths outside clone; watched for pull; after “Done git pull” re-checked — clone not cleanly updated, memories intact, live viewer mtime pre-patch unchanged by pull.
4. Backed up stock → `viewer-index.stock-0.9.16.html`.
5. Patched live CSS (header/tab lock, density, view padding, footer gap).
6. Wrote `viewer-index.fixed.html`, `viewer-nav-chrome.patch`, `apply-viewer-ui-fix.sh`, `README.md`; verified apply script idempotent and re-apply from stock.
7. Confirmed HTTP body on :3113 contains new CSS markers; hard refresh is enough.
8. Wrote this session summary; next agenda titled for user: **Turn the rest on**.

## Files Touched

- `~/.nvm/.../node_modules/@agentmemory/agentmemory/dist/viewer/index.html`
  - **Previous State:** stock 0.9.16 chrome (collapsing tabs, footer margin-top 48px)
  - **After Change:** chrome flex-locked; footer gap reduced
  - **Related to:** Root Cause Log rows on tabs + footer
- `~/.agentmemory/patches/*` (new durable set)
- `[[06-Agent-Sessions/2026-07-19-grok-agentmemory-viewer-nav-chrome-fix.md]]` (this file)

No product app (Ledger/Momentum) code edited.

## Vault Updates This Session

- `[[ANTI_PATTERNS.md]]`: No changes — agentmemory dual-store + flex chrome are install-local; documented in patches README + this log rather than vault-wide anti-pattern (can promote later if Victor wants).
- Project `AGENTS.md`: No changes.
- Durable reapply path: `~/.agentmemory/patches/README.md` (outside vault but linked from this session).

## Open Questions & Next Steps

### Done this session

- [x] Answer live UI edit visibility (refresh, correct file)
- [x] Plan + implement nav chrome fix at 100% zoom
- [x] Footer dead-band reduction
- [x] Durable reapply (`~/.agentmemory/patches/`)
- [x] Confirm git pull does not wipe memory
- [x] Session summary / handoff

### Next session: **“Turn the rest onnnn!!!”**

Goal: use agentmemory beyond Memories + Dashboard — populate / exercise the rest of the product surface.

1. **Per-tab data audit** (GRAPH, TIMELINE, SESSIONS, LESSONS, ACTIONS, CRYSTALS, AUDIT, ACTIVITY, PROFILE, REPLAY, SEMANTIC/PROCEDURAL panels): bound API + empty-vs-bug.
2. **Sessions path:** what hooks write sessions? Why `memory_sessions` = [] / viewer SESSIONS = 0 when only MCP `memory_save` was used?
3. **Lessons / crystals / consolidate / reflect:** run pipeline; confirm Gemini (or other LLM) config for reflect/synthesize.
4. **Graph + timeline:** need observations/edges — can seed via real agent hooks or document minimum write path.
5. **Hardening:** future `memory_save` must not re-orphan to `standalone.json` only.
6. **Optional:** visual confirm chrome fix still good after any package change; re-run `apply-viewer-ui-fix.sh` if upgraded.

### Code / data entry points

```
~/.agentmemory/patches/                    # UI reapply (done)
~/.agentmemory/standalone.json             # orphan dump (55) — do not re-import unless counts regress
~/.agentmemory/backups/                    # import-time backups
package @agentmemory/agentmemory@0.9.16
viewer: 127.0.0.1:3113  |  API: 3111
clone (optional): ~/.agents/repos/agentmemory
```

### Handoff one-liner

> Viewer chrome fixed + reapplicable under `~/.agentmemory/patches/`. Search works post-import. **Next: turn on empty tabs** (sessions, lessons, graph, crystals, consolidate/reflect, Gemini) so agentmemory is used at full potential.

**Tags:** #agent-session #agentmemory #handoff #ui #viewer
