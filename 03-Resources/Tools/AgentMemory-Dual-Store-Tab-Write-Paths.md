> **One-line Summary**: agentmemory has two on-disk stores — explicit `memory_save` used to write only `~/.agentmemory/standalone.json` while the MCP tools and viewer read the live `state_store.db`. If `memory_smart_search` keeps returning empty, check for an orphan dump and import it; also, each viewer tab binds to a specific write path (sessions need `session/start`+`observe`, not `memory_save`).

# AgentMemory Dual-Store & Tab Write Paths

## The Trap

Two related failure modes that look like "agentmemory is broken":

1. **Dual store.** On a default install, MCP `memory_save` calls can end up writing into `~/.agentmemory/standalone.json` (a flat orphan dump) while the MCP tools (`memory_smart_search`, `memory_recall`, `memory_sessions`) and the viewer on `:3113` read the live KV store under the installed package's `dist/data/state_store.db`. Symptom: weeks of `memory_save` calls appear to do nothing — `memory_smart_search` returns empty even though saves "succeeded."
2. **Tab population.** Even after the dual-store is fixed, most viewer tabs (SESSIONS, LESSONS, ACTIONS, CRYSTALS, GRAPH, TIMELINE, RELATIONS, FRONTIER, REPLAY) stay empty because `memory_save` only fills the Memories tab. Sessions require `session/start` + `observe` writes; graph needs full-shape observations (`title`, `narrative`, `concepts`) or extract returns 0 nodes; lessons/crystals have their own writers; semantic/procedural consolidate needs ≥5 summaries / ≥2 multi-session pattern memories and then **Gemini free-tier daily quota** (`gemini-3-flash` 20 generate_content/day). `agentmemory demo` posts **without** Authorization and fails when a secret is set, so prefer authenticated REST/MCP.

## The Fix

- **Dual store recovery:** Compare `standalone.json` key count vs `state_store.db` counts (use `memory_diagnose` + `curl -H "$AUTH" $BASE/memories | head` against `http://127.0.0.1:3111/agentmemory`). If standalone has dozens and the live store has <10, run the package's import path (see `~/.agentmemory/patches/README.md` for the exact `curl /import` invocation) — this merges orphan keys into the live store. Backups land under `~/.agentmemory/backups/`. Do **not** re-import unless counts regress; do not delete `standalone.json` until you've confirmed the backup.
- **Tab write-path map:** see `~/.agentmemory/patches/README.md` for the per-tab writer (`session/start`+`observe`, `lessons`, `actions`, `crystals`, `graph/extract` with full obs payload, `relations`, `memory_consolidate --tier all --force` for semantic/procedural once Gemini quota is available).
- **Don't hand-edit `state_store.db`** — it's a binary JSON+trailer KV format. Use REST `/import` or MCP only.

## Where This Appeared

- **2026-07-19** — three consecutive Grok sessions on agentmemory infra:
  1. `search-import-ui-handoff` — diagnosed dual store, verified post-import `memory_smart_search` recovers weeks-old Ledger/sidebar memories (55 → ~61 in live store, 0 sessions).
  2. `viewer-nav-chrome-fix` — separate UI fix (viewer tabs crushed at 100% zoom → `flex: 0 0 auto` + `min-height: 48px` on `.tab-bar`; durable reapply under `~/.agentmemory/patches/`).
  3. `turn-rest-on` — populated the rest of the tabs (sessions 5, lessons 5, crystals 1, actions 4, graph 7 nodes / 6 edges, relations 1, insights 3) and got blocked only when Gemini free-tier 429'd the semantic/procedural consolidate-pipeline.
- Tab census + the consolidate-pipeline retry command live in the third session's "After Gemini quota resets" block.

## Related

- The former GLM context-overflow note was removed during the Agent-Ops cleanup.
- `~/.agentmemory/patches/README.md` — durable UI-patch reapply + per-tab write-path map (outside vault, linked here)
- [[ANTI_PATTERNS]] — NOT promoted there; this is install-local infra, not a cross-project code anti-pattern

## Tags

#agentmemory #infrastructure #agent-ops #recovery #viewer
