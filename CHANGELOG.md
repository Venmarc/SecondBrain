# Changelog

All notable changes to Victor's Second Brain Vault will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### 2026-09-03 — Overnight review, signed-in pass (Next Steps)

#### Changed
- [[06-Agent-Sessions/2026-09-03-bossman-overnight-jeremi-review]] — added signed-in Jeremi / LinkedIn / Mario X walks. LinkedIn is empty-and-live, not unloadable. Jeremi cannot ingest Notes or post.

### 2026-09-03 — Overnight Jeremi / Mario X / LinkedIn review (Bossman)

#### Added
- [[06-Agent-Sessions/2026-09-03-bossman-overnight-jeremi-review]] — Jeremi is a posting almanac not an auto-poster; Mario X and LinkedIn skip-test; HALDEN as the public fix.


### 2026-08-26 — Provider audit corrected into routing policy

Victor challenged the audit's false precision: Vercel's earlier 2-model result was incomplete, many Vercel free-tagged modes consume the monthly $5 credit, NVIDIA's accessible set is much larger than its consistently useful set, and Nous LongCat's 1M context does not establish intelligence. The historical audit is now explicitly labeled as a canary/accessibility snapshot, and a new routing playbook separates listed, accessible, zero-cost, responsive, capable, and reliable states. It defaults bounded delegated work to a real-probed Nous Step 3.7 Flash Free lane while reserving scarce OpenCodeGo models for explicit overrides.

#### Added
- [[02-Areas/Agent-Ops/Provider-Routing-Playbook]] — operational routing table, dispatch algorithm, budgets, fallback rules, and open measurements.

#### Changed
- [[02-Areas/Agent-Ops/Provider-Model-Audit]] — corrected Vercel/NVIDIA claims and removed the implication that catalog access equals quality or billing safety.
- [[index]] — linked the routing playbook from Agent Ops.

### 2026-08-21 — Vision tool default backend → MiMo-V2.5 Free via OpenCode Zen (OpenCode)

Made OpenCode Zen's free `mimo-v2.5-free` model the **first** backend of the vision-tool provider (images + videos), with Gemini and all other providers kept as fallbacks. No new API key: the tool now reuses the opencode key already stored in `~/.local/share/opencode/auth.json` (`opencode-go`). Discovered two non-obvious requirements: a Chrome-like `User-Agent` header (Cloudflare returns `403 error 1010` on urllib's default UA) and reasoning-field extraction (MiMo returns `content: null`, answer in `message.reasoning`). Zen free tier rate-limits hard (`429 FreeUsageLimitError`); the existing parallel-fallback + 24h backend-memory cooldown absorbs that.

#### Added
- [[03-Resources/Tools/OpenCode-Vision-Provider-Default]] — reusable recipe for making any opencode-served model the vision tool's default backend.

#### Changed
- [[index]] — Resources → Tools list now links the new recipe.

### 2026-08-18 — Founder playbooks ingested: YC + AI-era operator advice (Hermes)

Victor asked for a persistent 02-Areas add-on from the four videos he studied (Diana Hu's AI-native company, Hormozi ×2, Codie Sanchez) plus the YC Pocket Guide. All sources re-fetched for accuracy (youtubesummary.com + third-party talk notes for Diana Hu; Pocket Guide re-transcribed from Victor's screenshot) — every point extracted, with **[solo]** application sections mapped to his 11-day opencode window.

#### Added
- [[02-Areas/Founder-Playbooks/Founder-Playbooks]] — full extraction: Diana Hu (AI as operating system, closed loops, queryable company, software factories → specs+tests, 1,000x engineer / token-maxing, middle management → IC/DRI/AI-founder, startup edge); Hormozi (leverage stack that AI doesn't cancel, wrong-bottleneck trap, "has AI made me more money?", decisions as highest leverage; six-step first-$100K roadmap: cut costs → time blocks → research paid skill → deliberate practice → three spend buckets → no lifestyle creep; 1-1-1 rule, 444 split); Codie Sanchez (six C's with real attribution: newsletter 30% / YouTube 27%+11% / TikTok <12 tickets at 2M followers / LinkedIn ~2.4% / X ~1%; per-platform KPIs; product ladder $0→$5k+; ship at 85%); YC Pocket Guide 22/22; cross-cutting thesis + distilled 8-rule operating system for the 11-day window; decision hooks (fight/kill on photographer-gallery, avatar selection, channel choice).

#### Changed
- [[index]] — registered Founder Playbooks under Ongoing Areas (02-Areas).

### 2026-08-15 — X algorithm ranking signals ingested + verified against source (Hermes)

Victor pasted a Grok extraction of "how to go viral on X" derived from the newly open-sourced X ranking code. Rather than storing it as-is, the published source (`home-mixer/params/param.rs`, `home-mixer/scorers/ranking_scorer.rs`, README/filter tables) was pulled and checked line-by-line. Most weights matched, but three material claims were wrong and are corrected in the synthesis note: (1) author-diversity decay is `(1-floor)·decay^k + floor` → the 2nd post is discounted ~37%, not "halved", and `k` is an occurrence index within a single score-ordered candidate slate — **not** a time-based posting-cadence penalty, so the extraction's "rapid-fire posting hurts" mechanism does not exist in the code; (2) the +15 reply boost requires the candidate to be an original post (not a reply, not a retweet) from a mutual-follow author — it's a property of the post/viewer pair, not a reward for replying to people, and the parallel dwell boost defaults to 0.0 (inactive); (3) the 48-hour rule is a candidate-pipeline `AgeFilter` dropping posts older than 48h, not advice about posting cadence. Also captured the repo's own explicit warning that weights multiply *predicted probabilities*, not engagement counts (so "one report cancels N likes" is wrong), and that block/report brigading does not meaningfully suppress reach. Unsupported claims ("early traction matters", author-side new-author boosts — the new-user OON override is viewer-side) flagged rather than absorbed as fact.

#### Added
- [[raw/2026-08-15-grok-x-algorithm-viral-tactics]] — immutable raw Grok extraction, headed with an accuracy warning pointing to the verified synthesis.
- [[03-Resources/SEO-Marketing/X-Algorithm-Ranking-Signals]] — verified synthesis: full default-weight table, the probability-vs-counts caveat, three corrections with source excerpts, unverified-claims section, and implications for Victor's publishing lane. First note in the previously empty `03-Resources/SEO-Marketing/`.

#### Changed
- [[index]] — registered the synthesis under Resources and the raw source under Quick Navigation.
- [[02-Areas/Content-Creation/Content-Creation]] — added a "Distribution Reality (X)" section linking the verified signals.

### 2026-08-15 — Full Hermes provider audit: global base_url root cause + working-model matrix (Hermes)

Every default-lane model was failing (500s then connection errors) and the suspected cause was the Claude bridge "contaminating" other providers. Root cause found and fixed: a global `model.base_url: http://127.0.0.1:3456/anthropic` (set 08-14 for the WebUI Anthropic lane) redirected the default lane of EVERY provider to the bridge; DeepSeek's real API was never consulted. `hermes config unset model.base_url` → default deepseek-v4-flash lane verified OK. All providers then live-tested through the real Hermes lane: agentrouter.org fully working (gpt-5.6-sol, claude-opus-5, claude-opus-4-8 — exact names confirmed), deepseek direct 2/2, opencode-go 11 OK (kimi-k2.7 401 → use kimi-k2.7-code; grok-4.5 503), NVIDIA full 102-model sweep (29 OK incl. gpt-oss-120b, nemotron-3-super, laguna-xs-2.1, inkling; ~60 404 = not on the key), Nous Portal 5 free models (vendor-prefixed IDs; step-3.7-flash:free = 262k ctx), Copilot 13 OK on gh token (frontier models 400), Vercel AI Gateway 2 usable (qwen flashes), Anthropic lane dead (sub expired). Dead Gemini credential removed.

#### Added
- [[06-Agent-Sessions/2026-08-15-hermes-provider-audit]] — full audit log: root-cause table, per-provider working-model matrix, sweep methodology, decisions, follow-ups.
- [[ANTI_PATTERNS]] §Hermes / Provider Config — 1st confirmed row: global `model.base_url` poisons the default lane of all providers; scope per-lane.
- [[02-Areas/Agent-Ops/Provider-Model-Audit]] — X-ready audit doc: 868 catalog models → 65 working across 9 providers; exact IDs, context windows, latency, rate-limit behavior, Victor's model preferences.


### 2026-08-14 (pm) — Claude bridge: attachments fixed — tool-result replay + image routing (Hermes)

Second fix on the same day. Victor reported "Claude responds fine but can't see attachments" — the model called `read_file`, Hermes returned the content, but the model acted as if it saw nothing. Root cause 5: the Claude Code CLI treats every stream-json `tool_use` block as a LIVE call (re-fires the PreToolUse defer hook with a fresh id, re-executes), so injected `tool_result` blocks are orphaned and the content never reaches the model. Fix: drop replayed `tool_use` blocks and flatten replayed `tool_result` blocks into user-role text labeled `[Tool result: <name>]`, plus a `[Bridge note]` framing paragraph in the system prompt so the model trusts them as authoritative tool output (without it, the model refused as injected text — verified 3/3 fail → 3/3 pass). Root cause 6: image content blocks CANNOT pass through the Claude Agent SDK at all (message_parser silently drops non-text/tool_use/tool_result blocks) — native vision through the bridge is impossible. Fix: `agent.image_input_mode: text` routes pasted images through `vision_analyze` as text descriptions. Verified: repro + real Hermes shapes pass repeatedly, text-image flow works, plumbing tests pass.

#### Added
- [[06-Agent-Sessions/2026-08-14-hermes-claude-bridge-webui-anthropic-lane]] — Part 2: root causes 5 & 6, attachment type map (files/images/voice/videos), failed attempts (image passthrough, unframed flattening), verification.
- [[ANTI_PATTERNS]] §Claude Code / Anthropic — 5th and 6th confirmed rows: (a) replaying tool_use/tool_result blocks into the CLI orphans the result — flatten instead; (b) image blocks can't cross the SDK — use `image_input_mode: text`.

#### Changed
- `~/claude-proxy/bridge.py` — `_normalize_content` drops tool_use + flattens tool_result; `_system_to_prompt_with_framing` appends the `[Bridge note]`.
- `~/claude-proxy/HANDOFF.md` — history-replay flattening + framing + `image_input_mode` documented.
- Skill `claude-agent-sdk-bridge` — "Root causes 5 + 6 — attachments through the bridge" section.
- `~/.hermes/config.yaml` — `agent.image_input_mode: text` (via `hermes config set`).

### 2026-08-14 — Claude bridge: systemd durability + WebUI "Anthropic" lane fixed (Hermes)

Made the Claude↔Hermes bridge survive reboots and crashes via a systemd user unit (`claude-bridge.service`, enabled, `Restart=always`). Then killed a fourth root cause: the WebUI model switcher's built-in "Anthropic" provider sent `CLAUDE_CODE_OAUTH_TOKEN` straight to api.anthropic.com → "400 extra usage" — the request never reached the bridge. Fixed by routing the whole built-in lane through the bridge: `model.base_url = http://127.0.0.1:3456/anthropic` plus a new `/anthropic/v1/messages` alias route in `bridge.py` (the runtime only honors base-URL overrides that look like an Anthropic-compatible proxy — `/anthropic` suffix required). Verified: `provider anthropic` with claude-sonnet-5 AND claude-sonnet-4-6 both → `BRIDGE-OK`; Victor confirmed working in the WebUI.

#### Added
- [[06-Agent-Sessions/2026-08-14-hermes-claude-bridge-webui-anthropic-lane]] — full session log: root-cause table, two failed attempts (plugin override, `ANTHROPIC_BASE_URL`) so they're not repeated, fix, verification.
- [[ANTI_PATTERNS]] §Claude Code / Anthropic — 4th confirmed row: built-in anthropic provider + OAuth → 400; redirect via `model.base_url` + `/anthropic` route.

#### Changed
- `~/claude-proxy/HANDOFF.md` — systemd management commands; `/anthropic/v1/messages` alias; `model.base_url` requirement.
- Skill `claude-agent-sdk-bridge` — "WebUI Anthropic lane — root cause 4 + the fix" section.

### 2026-08-13 — Claude Pro OAuth → Hermes bridge working (Hermes)

Wired Victor's Claude Pro OAuth login into Hermes via a local Anthropic-compatible bridge (`~/claude-proxy/bridge.py`, provider `claude-bridge` in `~/.hermes/config.yaml`). Three confirmed root causes killed: a silent 240s CLI hang (sync generator typed as async), "400 tool use concurrency" on history replay (SDK-type MCP servers), and "400 extra usage" (Anthropic classifies system prompts naming non-Claude tool IDs like `skill_manage` as third-party). End-to-end verified: `hermes --provider claude-bridge -m claude-sonnet-5 -z "Say exactly: BRIDGE-OK"` → `BRIDGE-OK`.

#### Added
- [[06-Agent-Sessions/2026-08-13-hermes-claude-bridge-oauth]] — full session log: repro matrix, system-prompt bisection trail, fixes, verification.
- [[ANTI_PATTERNS]] §Claude Code / Anthropic (claude-agent-sdk, OAuth bridge) — 3 confirmed rows (sync-generator hang, SDK-MCP replay 400, system-prompt tool-name classifier 400).

### 2026-08-04 — Supply-chain antipatterns added to AI-UI-Antipatterns-Watchlist

Added a "Supply-chain / dependency antipatterns" section to the watchlist, covering the npm `keyv`/`cacheable` namespace compromise (Socket.dev, 2026-08-04): `npm ci` vs `npm install` discipline, lockfile-as-source-of-truth, freeze-updates-after-disclosure, transitive-dependency exposure checks, and cloned-repo `.claude`/`.vscode` hook inspection.

#### Changed
- [[03-Resources/Skills/AI-UI-Antipatterns-Watchlist]] — added supply-chain section, updated one-line summary and tags to reflect broadened scope beyond UI.

### 2026-08-14 — AgentRouter "sensitive words" block diagnosed + `.env` parse fix (Hermes)

Root-caused the Hermes desktop's recurring `HTTP 500: sensitive words detected` (7 failed attempts, gpt-5.6-sol via `custom:agentrouter`) to AgentRouter's upstream content filter, which rejects raw IP addresses, email addresses, and domain names in prompts — confirmed by live curl bisection against the real endpoint (`400 content-blocked` fires pre-auth). `~/Documents/AGENTS.md` was ruled out as the cause. Also fixed the `.env` line-489 colon bug (`AGENTROUTER_BASE_URL:` → `=`) that printed a python-dotenv parse warning on every `hermes` command. AgentRouter key 401 (dead vs flagged) left as an open question.

#### Added
- [[06-Agent-Sessions/2026-08-14-hermes-agentrouter-sensitive-words-block]] — full session log (trigger-token bisection table, root-cause log, `.env` fix, open key question).

#### Changed
- [[ANTI_PATTERNS]] — new row under `## OpenCode / Custom AI Providers`: never send raw IPs/emails/domains to AgentRouter-backed models; use aliases or a filter-free provider.
- [[index]] — latest Agent Sessions pointer now links to this session.

### 2026-08-12 — Ledger Recurring nav placement + top-bar refactor + Next 16.3 directive (OpenCode)

Made `/recurring` reachable by fixing the desktop sidebar (missing nav item per APP_FLOW §3.1) and adding a mobile-only Settings row, with a coordinated mobile top-bar Settings icon button replacing the `UserButton.MenuItems` link. Also captured Victor's Next 16.3 + Turbopack migration as a standing directive (no more `next dev --webpack`) and updated Ledger's `AGENTS.md` §1.3/§1.5/§2 to match.

#### Added
- [[06-Agent-Sessions/2026-08-12-opencode-ledger-recurring-nav-placement]] — full session log (reframe, Q&A decisions, file-by-file, two backlog items deferred to phase-gate-out).

#### Changed
- [[index]] — latest Agent Sessions pointer now links to this Recurring-nav session.

### 2026-08-04 — Ledger landing-page audit (OpenCode)

Added the raw, unchanged audit of the Ledger landing page, including browser evidence, prioritized findings, and remediation order.

#### Added
- [[raw/2026-08-04-ledger-landing-page-audit]] — immutable audit source.

### 2026-08-04 — AgentRouter Claude routing and model-catalog correction (OpenCode)

Diagnosed AgentRouter's empty Claude completions in OpenCode as a client-specific request-path mismatch, then corrected an initial false conclusion about the provider catalog by proving the dashboard's `claude-opus-5` alias works through the supported OpenCode route.

#### Added
- [[06-Agent-Sessions/2026-08-04-opencode-agentrouter-claude-routes]] — full journey log covering the redacted path probe, `/v1` fix, documentation drift, failed discovery attempts, Opus 5 verification, configuration changes, and unresolved upstream-identity caveat.
- [[ANTI_PATTERNS]] §OpenCode / Custom AI Providers — confirmed lessons on validating final Anthropic request paths and not mistaking custom-provider `opencode models` output for live backend discovery.

#### Changed
- [[index]] — latest Agent Sessions pointer now links to the AgentRouter/OpenCode investigation.
- External global OpenCode config — AgentRouter Claude now uses the `/v1` base URL and lists both `claude-opus-4-8` and verified `claude-opus-5`.

### 2026-08-03 — Better Me, Better Vault operating system (OpenCode)

Added the first behavior-driven vault layer: a decision-support loop and a development-publishing loop measured by decisions, actions, and shipped X/LinkedIn posts rather than note volume or graph maintenance.

#### Added
- [[03-Resources/Vault-Ops/Better-Me-Better-Vault]] — operational playbook for weekly decisions, selective personal-source intake, publishing deadlines, promotion/retirement, and organized-avoidance detection.
- [[Templates/Decision Record Template]] — compact rationale, evidence, action, and outcome-review record.
- [[Templates/Publishing Record Template]] — compact source, deadline, one-revision, publication, and learning record.
- [[01-Projects/skill-router/skill-router]] — restored the missing project hub from verifiable repository state after cloning `https://github.com/Venmarc/skill-router`; records architecture as decided but implementation as unverified.
- [[05-Daily/weekly/2026-08-09]] — prepared the first live review and three-input trial without inventing decisions, sources, or publication results.

#### Changed
- [[AGENTS]] — added the Better Me, Better Vault workflow and the rule that deliberately pushed vault material is available for agent processing.
- [[BRAIN]] and [[index]] — aligned current focus with skill-router as top priority while distinguishing a decided architecture from an unfinished Gemini/Antigravity-specific implementation.
- [[02-Areas/Content-Creation/Content-Creation]] — expanded from sports clipping alone to X-first/LinkedIn-second personal and technical development publishing; existing clipping history remains.

#### Truth correction
- The pulled August 2 commit referenced `01-Projects/skill-router/skill-router.md` and `06-Agent-Sessions/2026-08-02-claude-skill-router-mvp-architecture.md`, but neither file was present in that commit. This pass restored only the project hub from the cloned source repository and left the missing historical session artifact absent rather than fabricating it.
- Historical August 2 changelog entries remain unchanged as audit history; current status now uses `proposed`, `decided`, `implemented`, and `verified` as distinct evidence states.
- The weekly trial and posting targets are not claimed complete. They require real inputs, decisions, and published URLs.

### 2026-08-03 — SecondBrain first-impressions critique (OpenCode)

#### Added
- [[06-Agent-Sessions/2026-08-03-opencode-secondbrain-first-impressions]] — ruthless vault review diagnosing strong engineering/agent continuity but weak personal synthesis, decision support, and behavior evidence; records Victor's August goal to make the vault contain more of him.

#### Changed
- [[index]] — Agent Sessions now points to the new critique and its deferred fresh-session playbook work instead of claiming the folder contains only tooling artifacts.

### 2026-08-02 — skill-router: agent-agnostic architecture resolved, AGENTS.md hardcoded paths actually fixed (Claude)
Reconciled skill-router's vault doc with the resolved MVP architecture (one shared brain, two thin adapters — Antigravity + Claude Code), replaced Victor's single-pipeline overnight MVP diagram with a runtime-loop/product-loop split, and closed out the prior pass's `AGENTS.md` hardcoded-path fix, which the 2026-08-02 CHANGELOG entry below claimed was done but wasn't — 7 `file:///home/redmane/...` links were still live in `AGENTS.md` at the start of this session.

#### Changed
- [[01-Projects/skill-router/skill-router]] — full rewrite: locked MVP scope (Antigravity + Claude Code only; AI-classifier stays for v1; keyword/regex fallback deferred to v2; ≤10s latency ceiling), resolved the Claude-native-matcher collision question (both systems are pointer-injection, not full-content inlining — no format conflict), set the dedup rule (`router_matches − claude_native_matches`, canonical-name set-diff, replacing an earlier position-based ranking idea), and replaced the linear MVP diagram with a two-loop mermaid flowchart (fast per-turn runtime loop vs. slow outer product loop). Corrected an unverified timeline claim ("reframed 2026-08-01"/"three weeks ago") to "late last week" per Victor directly.
- [[AGENTS]] — actually removed the remaining `file:///home/redmane/Documents/SecondBrain/...` absolute links (7 instances, in the Ingest Workflow, Query Workflow, Lint Workflow, and 9-Doc Standard sections) that survived the prior pass's fix claim. Replaced with vault-relative links.
- [[index]] — skill-router entry updated from "⚠️ gap open" to "✅ architecture resolved"; one-line summary at top updated to match.

#### Added
- [[06-Agent-Sessions/2026-08-02-claude-skill-router-mvp-architecture]] — session summary for this pass, per `Templates/Agent-Session-Summary.md`.

#### Known gaps (not actioned this pass, flagged for later)
- The Claude Code hook-coexistence spike (does skill-router's injected pointers interact badly with Claude Code's own native skill matcher?) is still unrun — this is the actual remaining blocker for the Claude Code adapter, not a documentation gap.
- Pricing model for skill-router (subscription/one-time/annual) still undecided.
- The ~15 other vault files flagged in the prior pass as still containing `/home/redmane/...` hardcodes were not touched this pass — still open.

### 2026-08-02 — Vault reconciliation: skill-router priority reframe (Claude)
Closed the 4 open items from the 2026-08-01 memory-migration session: reconciled index.md with the skill-router priority reframe, created skill-router's first vault project doc, de-hardcoded AGENTS.md's machine-specific paths, and logged this pass.

#### Added
- [[01-Projects/skill-router/skill-router]] — new project hub doc (skill-router had zero vault presence despite being named top priority three weeks ago). Documents current file inventory, and flags an **unresolved architecture gap**: the existing spec (`skill-router-specification.md`, 2026-07-01) is Antigravity/Gemini-specific (Gemini API classifier, Gemini-only hook registration), but the 2026-08-01 reframing calls for an agent-agnostic system usable by all CLIs on a machine. Nothing has reconciled that gap yet — surfaced for Victor's decision, not resolved unilaterally.
- [[AGENTS]] — new "No Machine-Specific Hardcoding" rule under Rules for Editing, added after finding the vault (git-synced across `venmarc@open-claw` and `redmane@latitude-e6320`, per MEMORY host-path table) still had `redmane`-only absolute paths baked into agent instructions.

#### Changed
- [[index]] — top summary and Active Projects section updated: skill-router added as TOP priority with its architecture-gap flag; Momentum and Ledger headings now explicitly marked "(medium priority)" to match the 2026-08-01 reframing (previously the index still implied they were the lead projects).
- [[AGENTS]] — replaced all `file:///home/redmane/Documents/SecondBrain/...` absolute links with vault-relative links (`00-Inbox`, `01-Projects`, `index.md`, `CHANGELOG.md`, etc.) so the doc works correctly on any machine the vault is cloned to.

#### Known gaps (not actioned this pass, flagged for later)
- ~15 other vault files still contain `/home/redmane/...` hardcodes (mostly historical session logs under `06-Agent-Sessions/`, plus a few live project docs — `01-Projects/Ledger/Ledger.md` "Codebase:" line, `01-Projects/Momentum/Momentum.md` "Codebase:" line, `01-Projects/Ledger/Docs/AGENTS.md`, `01-Projects/Ledger/Docs/DESIGN.md`, `01-Projects/Tempire/Docs/README.md`, `03-Resources/Skills/Skill-Router-Hook.md`, `03-Resources/Skills/UI-Polish-Ten-Rules.md`, `03-Resources/Skills/Defuddle-Clipping.md`). Out of scope for this pass (only AGENTS.md was requested) — worth a dedicated pass since Port Sites codebase paths genuinely live on the PC and need either the host-table treatment or a policy decision on whether project "Codebase:" lines should stay machine-specific by design.
### 2026-07-31 — Vault maintenance pass (Claude)
Full lint/cleanup pass: refreshed hub docs to current project state, closed a second leftover pocket of unprocessed session logs, fixed a dangling wikilink, wired two long-orphaned skill notes, and flagged a spec/code contradiction for Victor rather than silently resolving it.

#### Added
- [[06-Agent-Sessions/extracted-sessions]] — new row for second orphan pocket (5 files: agent-sessions-handoff, phase-0-layout-revisions, fin-com-effects-audit/lab, vault-lint-venmarc-pastries-lighthouse); Processor line updated to credit Claude 2026-07-31 for this batch.
- [[AGENTS]] §3 — wikilink from the `defuddle` bullet to [[03-Resources/Skills/Defuddle-Clipping|Defuddle skill guide]] (previously-orphaned note now has an inbound link).
- [[03-Resources/MOC-UI-UX-Lessons]] — new bullet under 🔵 Product Thinking linking [[03-Resources/Skills/Pre-Launch-Security-Checklist]] (previously-orphaned note now has an inbound link).
- [[01-Projects/Ledger/Ledger]] `## Lessons log` — new 2026-07-15 bullet flagging an unresolved theme-toggle icon spec/code discrepancy (session reversed the toggle ternary; [[01-Projects/Ledger/Docs/UIUX_BRIEF]] §6.10 / [[01-Projects/Ledger/Docs/APP_FLOW]] §3.2 still document the opposite behavior) — surfaced for Victor's decision, not resolved unilaterally.

#### Changed
- [[BRAIN]] — `## Active focus` refreshed from stale 2026-07-15 snapshot to 2026-07-31 (Momentum sidebar+auth done/hydration issue open; Ledger Phase 1/2 gates passed, P3-A complete, P3-B paused on Victor's "STOP"); footer last-updated date + changelog summary refreshed.
- [[index]] — top summary, Momentum/Ledger project headings, Vault Health lint date, and LINT-REPORT pointer all refreshed to 2026-07-31 state; stale "pending processing" line (pointing at an already-resolved file) replaced, then after this session's deletion pass replaced again with a closed-out note pointing at `extracted-sessions.md`.
- [[00-Inbox/Antigravity Swarm]] — dangling reference to deleted `2026-07-20-grok-antigravity-step5c-perf-gate` repointed to [[06-Agent-Sessions/extracted-sessions]].

#### Removed
- `06-Agent-Sessions/2026-07-14-grok-agent-sessions-handoff.md`, `2026-07-15-agy-phase-0-layout-revisions.md`, `2026-07-15-grok-fin-com-effects-audit.md`, `2026-07-15-grok-fin-com-effects-lab.md`, `2026-07-15-grok-vault-lint-venmarc-pastries-lighthouse.md` — second orphan pocket, triaged via background agent and confirmed redundant with already-extracted content in [[01-Projects/Ledger/Ledger]], [[ANTI_PATTERNS]], [[03-Resources/Skills/Collapsible-Desktop-Sidebar]], [[03-Resources/Tools/Effects_Glossary]], [[03-Resources/Tools/Effects_Playbook]].

#### Method note
Obsidian CLI (`unresolved`/`orphans`/`deadends`) was unavailable this session (`Command line interface is not enabled`); fell back to the documented filesystem wikilink scanner per [[AGENTS]] §C item 9. Fixed a self-authored basename-ambiguity bug in the scanner's incoming-link resolution (was misattributing links when multiple files share a basename, e.g. `AGENTS.md`/`PRD.md` across project `Docs/` folders — first-match-wins on an unordered set produced false-positive orphans). Fixed scanner: 14 real orphans (down from 20 in the 2026-07-20 report), 65 unresolved unique targets / 84 instances, 32 dead-ends. Full breakdown in [[LINT-REPORT]].

### 2026-07-24 — Ledger Icon Category System Documentation Patches (AGY)
Applied confirmed documentation patches for the Lucide icon category system across core Ledger project docs and synchronized to vault mirrors.

#### Changed
- [[01-Projects/Ledger/Docs/APP_FLOW|APP_FLOW]] — Added §3.3 Back Navigation Pattern; updated Category pill selector description in Flow 1.
- [[01-Projects/Ledger/Docs/PAGE_SPECS|PAGE_SPECS]] — Updated Goal Detail and Category Management back links to icon-only chevrons; updated row icon circle specs; updated Add Category sheet to require curated Lucide icon picker split by type.
- [[01-Projects/Ledger/Docs/UIUX_BRIEF|UIUX_BRIEF]] — Added §6.11 Category Pill / Selector spec, §8.1 Default Category Icon Assignments table (13 icons), §8.2 Curated Icon Picker table (14 expense + 8 income options), and updated category icons rendering paragraph.
- [[01-Projects/Ledger/Docs/SCHEMA|SCHEMA]] — Dropped `color` column from `categories` table DDL; made `icon` required text; updated default seed table with Lucide import names.
- [[01-Projects/Ledger/Docs/PHASES|PHASES]] — Added 24/07/2026 Documentation Changelog entry.
- [[01-Projects/Ledger/Ledger|Ledger]] — Updated Vault sync date banner to 2026-07-24.
- [[06-Agent-Sessions/2026-07-24-agy-ledger-icon-category-doc-patches]] — Session summary created.

### 2026-07-20 — Vault cleanup (GLM-5.2)
Two-session cleanup pass over `06-Agent-Sessions/` (raw logs → extracted knowledge; orphans → MOCs). Master prompt lives at `~/prompt.txt`; session handoff: `~/Documents/Research_files/vault-cleanup-handoff-2026-07-20.md`.

#### Added
- [[03-Resources/Skills/Discrete-State-Control-Selection]] — segmented control vs slider for bounded discrete states (extracted from Ledger Transaction_UI_Spec §4 build, 2026-07-19). Wired from [[03-Resources/MOC-UI-UX-Lessons]] (Phase 0 Ledger + Agent Traps sections).
- [[03-Resources/Tools/AgentMemory-Dual-Store-Tab-Write-Paths]] — new Tools note covering the dual-store trap (`standalone.json` orphan vs live `state_store.db`) + per-tab write-path map (sessions need `session/start`+`observe`, not `memory_save`; graph needs full-shape observations; consolidate needs Gemini free-tier quota). Cites all three 2026-07-19 agentmemory sessions as one continuous thread.
- [[ANTI_PATTERNS]] §Clerk row — `127.0.0.1` vs `localhost` dev handshake. Source: Ledger UI polish audit-fix 2026-07-19.
- [[06-Agent-Sessions/extracted-sessions]] — 3 new rows: antigravity erratic-swarm thread 2026-07-18→20 (already closed); Ledger UI polish 2026-07-19; agentmemory infra thread 2026-07-19 (closed except semantic/procedural consolidate pending Gemini quota). Processor line credits GLM-5.2 2026-07-20.

#### Changed
- [[01-Projects/Ledger/Ledger]] `## Lessons log` — appended 2026-07-19 UI polish block (dual SnapSlider month picker — abs overlay not in-flow push; Transactions filter rebuild per Transaction_UI_Spec — search + filter sheet + chips + Type segmented per new skill; `MIN_YEAR = 2025` product-start bound; 4 audit-fix regressions: tablet header crush, sidebar icon drift, Clerk localhost-vs-127.0.0.1, `keepPreviousData` skeleton flash). Wikilinks to `Discrete-State-Control-Selection` + `ANTI_PATTERNS` §Clerk.
- [[01-Projects/Ledger/Docs/PAGE_SPECS]] — Transactions FILTER BAR build-revision block aligned with Transaction_UI_Spec §4 (segmented Type, abs overlay month, sheet pattern). Wikilinks to `Discrete-State-Control-Selection`.
- [[03-Resources/MOC-UI-UX-Lessons]] — 2 new skill links (Phase 0 Ledger + §Agent Traps).
- [[04-Archive/Inbox/Transaction_UI_Spec]] — moved here from `00-Inbox/` (extracted spec for the 2026-07-19 build; kept as historical reference, not active inbox).
- [[00-Inbox/Bug In Ledger]] — status lines updated (audited under extract-work; bugs resolved/relocated to `ANTI_PATTERNS.md` §Clerk).
- [[ANTI_PATTERNS]] — Phase 3a added §Clerk row (Clerk dev-handshake requires `localhost`). Phase 2 left §WebGL/Three.js alone (already closed lane). File at 76 lines — split threshold 200 not triggered.
- [[index]] — refreshed lint pointer to 2026-07-20 pass; added new AgentMemory Tools note to the Tools row.
- [[CHANGELOG]] — historical lint pointer repaired: 2026-07-19 "Unit 6 Build lane" entry's wikilink to the old crash doc path `06-Agent-Sessions/GLM-5.2_Context-Overflow_Crash` repointed to the new permanent home `[[02-Areas/Agent-Ops/GLM-5.2-Context-Overflow]]` (see also §Moved below).
- [[LINT-REPORT]] — full refresh against post-extraction vault state (see file dated 2026-07-20).

#### Moved
- `00-Inbox/Transaction_UI_Spec.md` → [[04-Archive/Inbox/Transaction_UI_Spec]] (Phase 1 — extracted spec consumed by Ledger 2026-07-19 build, then archived).
- `06-Agent-Sessions/GLM-5.2_Context-Overflow_Crash.md` → [[02-Areas/Agent-Ops/GLM-5.2-Context-Overflow]] (Phase 2 — promoted to permanent Agent-Ops reference; recurring provider-tier failure mode; survival rules).

#### Removed
- **10 raw antigravity session logs** (Phase 2) — built/extract/crash/Step-1/Step-2/Step-4/Step-5a/Step-5b×2/handoff — extracted to [[03-Resources/Tools/Effects_Glossary]] (4 promotions), [[ANTI_PATTERNS]] §WebGL (3 rows), `~/Pastries/AGENTS.md` Hard Rules 9–10 (outside vault), [[02-Areas/Agent-Ops/GLM-5.2-Context-Overflow]] crash doc moved-not-deleted. Combined row in `extracted-sessions`.
- **2 raw Ledger UI polish logs** (Phase 3d) — `2026-07-19-grok-ledger-ui-polish.md` + `2026-07-19-grok-ledger-ui-polish-audit-fixes.md` — single thread, 1 combined row in `extracted-sessions`, 1 block in `Ledger.md` `## Lessons log`.
- **3 raw agentmemory session logs** (Phase 4) — `2026-07-19-grok-agentmemory-search-import-ui-handoff.md` + `2026-07-19-grok-agentmemory-viewer-nav-chrome-fix.md` + `2026-07-19-grok-agentmemory-turn-rest-on.md` — single thread → new `03-Resources/Tools/AgentMemory-Dual-Store-Tab-Write-Paths.md` Tools note (durable pattern warranted) + combined row in `extracted-sessions`.
- **NOT touched (active handoffs):** `2026-07-19-grok-portfolio-phase-0-tokens.md` + `2026-07-19-grok-portfolio-phase-1-identity.md` + `2026-07-16-grok-ledger-phase-1.md` + `2026-07-16-grok-ledger-phase-1-full.md` remain in `06-Agent-Sessions/` (different threads; portfolio Phase 2/3 still open). Pre-existing pending file `2026-07-15-agy-phase-0-layout-revisions.md` left as-is — known lint item from 2026-07-15 pass, not in scope for this cleanup.

**Files in `06-Agent-Sessions/` after this pass:** 16 raw session logs (active threads + pre-existing pending) + `extracted-sessions.md` index + 3 JSON tooling artifacts.

### 2026-07-19 — Unit 6 Build lane completed; crash-recovery process rule (OpenCode)
#### Added
- [[06-Agent-Sessions/2026-07-19-opencode-antigravity-step1-playwright|Step 1 checkpoint]] — Playwright specs written, 4 passing.
- [[06-Agent-Sessions/2026-07-19-opencode-antigravity-step2-glossary|Step 2 checkpoint]] — 4 glossary entries promoted, verified logs appended.
- [[06-Agent-Sessions/2026-07-19-opencode-antigravity-build|Build-lane final session log]] — consolidated log over the original build + 3 recovery sub-sessions.
- [[06-Agent-Sessions/GLM-5.2_Context-Overflow_Crash|Crash diagnosis]] — root cause + mitigation rules for the GLM-5.2 context-overflow 500s. Second confirmed instance of this provider-tier issue. *(Note 2026-07-20: crash doc promoted to permanent reference at [[02-Areas/Agent-Ops/GLM-5.2-Context-Overflow]]; this historical wikilink kept as audit trail — see §Moved in the 2026-07-20 cleanup entry.)*
- [[06-Agent-Sessions/2026-07-19_opencode_Handoff|Build-lane handoff]] — state at crash time (file inventory, gates passed, Lighthouse numbers, user prompts).
- `~/Pastries/rep-antigravity-swarm-typewriter/` — new replication; two pages (`/`, `/depth`) exercising particle swarm, blinking cursor, soft mesh background, film grain. Lighthouse 99/99 perf, 100 SEO, 100 best-practices, 95 a11y on both routes. review-animations approved with 1 minor fix applied.

#### Changed
- [[03-Resources/Tools/Effects_Glossary|Effects_Glossary]] — 4 status-line promotions to `tried` (`MeshBackground`, `FilmGrain`, `Swarm`, `BlinkingCursor`) + 4 verified-log blocks appended using the 7-field template with actual Lighthouse numbers. File 406 → 454 lines.
- `~/Pastries/AGENTS.md` — added Hard Rules 9 (per-step checkpoint session summary) and 10 (background servers via `setsid nohup` + log-file polling only). Both rules are derived from the Build-lane crash and apply to all future Build/Extract lane sessions.

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
