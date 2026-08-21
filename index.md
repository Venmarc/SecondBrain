# Victor's Second Brain (Master Hub)

> **One-line Summary**: Central index of Victor's knowledge OS — **skill-router is TOP priority** with agent-agnostic architecture proposed/decided but implementation unverified; Ledger/Momentum are medium-priority, Tempire is later, and August adds decision support plus development publishing.

---

## 🧭 Quick Navigation
- 🧠 **[[BRAIN|BRAIN.md]]** — Vault philosophy and style
- ⚙️ **[[AGENTS|AGENTS.md]]** — Agent workflows (ingest, lint, interview, sessions)
- 📝 **[[CHANGELOG|CHANGELOG.md]]** — Structural changes
- 🧾 **[[raw/2026-08-04-ledger-landing-page-audit]]** — Raw Ledger landing-page audit
- 🧾 **[[raw/2026-08-15-grok-x-algorithm-viral-tactics]]** — Raw Grok X-algorithm extraction (see verified synthesis before use)
- 🧰 **[[02-Areas/Agent-Ops/How-Victor-Works-With-Agents|How Victor works with agents]]** — Supervisor model
- 📋 **[[03-Resources/Vault-Ops/Vault-Improvement-Backlog|Vault improvement backlog]]** — Deferred expansion work
- 🩺 **[[LINT-REPORT|LINT-REPORT.md]]** — Latest vault lint (2026-07-31)

---

## ⚡ Active Projects (01-Projects)

### 🚀 [[01-Projects/skill-router/skill-router|skill-router]] — TOP priority; architecture decided, implementation unverified
Agent-agnostic skill-routing system intended to install once per machine. The proposed MVP uses a shared catalog/classifier behind thin Antigravity and Claude Code adapters, but the current source snapshot remains Gemini/Antigravity-specific and unfinished.
**Code:** two clones, same project — see `MACHINES.md` in the skill-router repo (github.com/Venmarc/skill-router) for current machine → path mapping. Do not hardcode a single path here. · **Open verification:** shared-core rewrite, Claude Code coexistence, latency

### 🌱 [[01-Projects/Momentum/Momentum|Momentum]] — Phase 0 ✓ + sidebar/auth refinement done (medium priority)
Personal daily habit + fitness OS. One goal: use it daily; show wins/fails.  
**Code:** `Documents/Port Sites/Category 5/Momentum` · **Live:** https://peakmomentum.vercel.app  
**Docs (synced 2026-07-09):** [[01-Projects/Momentum/Docs/PRD|PRD]] · [[01-Projects/Momentum/Docs/PHASES|PHASES]] · [[01-Projects/Momentum/Docs/TRD|TRD]] · [[01-Projects/Momentum/Docs/PAGE_SPECS|PAGE_SPECS]] · [[01-Projects/Momentum/Docs/APP_FLOW|APP_FLOW]] · [[01-Projects/Momentum/Docs/UIUX_BRIEF|UIUX_BRIEF]] · [[01-Projects/Momentum/Docs/SCHEMA|SCHEMA]] · [[01-Projects/Momentum/Docs/INSIGHTS|INSIGHTS]] · [[01-Projects/Momentum/Docs/NOTES|NOTES]]  
**Lessons:** [[01-Projects/Momentum/Lessons-from-DEV_NOTES|from DEV_NOTES]] · hub [[01-Projects/Momentum/Momentum|Momentum.md]]

### 📒 [[01-Projects/Ledger/Ledger|Ledger]] — Phase 3 in progress (P3-A done) (medium priority)
Personal expense / budget tracker (NG realities). Precision + speed; serious UI.  
**Code:** `Documents/Port Sites/Category 5/Ledger` · **Live:** https://ledgerix.vercel.app  
Phase 1 gate passed 07-21; Phase 2 gate passed 07-28; Phase 3 P3-A (analytics foundations) complete 07-30; P3-B plan paused mid-review on Victor's "STOP".  
**Docs (synced 2026-07-16):** [[01-Projects/Ledger/Docs/PRODUCT|PRODUCT]] · [[01-Projects/Ledger/Docs/PRD|PRD]] · [[01-Projects/Ledger/Docs/PHASES|PHASES]] · [[01-Projects/Ledger/Docs/TRD|TRD]] · [[01-Projects/Ledger/Docs/PAGE_SPECS|PAGE_SPECS]] · [[01-Projects/Ledger/Docs/APP_FLOW|APP_FLOW]] · [[01-Projects/Ledger/Docs/UIUX_BRIEF|UIUX_BRIEF]] · [[01-Projects/Ledger/Docs/DESIGN|DESIGN]] · [[01-Projects/Ledger/Docs/SCHEMA|SCHEMA]] · [[01-Projects/Ledger/Docs/NOTES|NOTES]]

### ⏸️ [[01-Projects/Tempire/Tempire|Tempire]] — Later
Marketplace at https://tempire.xyz/ — demoted until frontend skills improve. Formal specs remain under `Docs/`.

---

## 🗂️ Ongoing Areas (02-Areas)
- 👤 **[[02-Areas/Personal-Growth/RedMane|RedMane (Victor)]]** — Profile and working style
- 🤖 **[[02-Areas/Agent-Ops/How-Victor-Works-With-Agents|Agent Ops]]** — How agents are used now · **[[02-Areas/Agent-Ops/Provider-Model-Audit|Provider-Model-Audit]]** — historical canary audit · **[[02-Areas/Agent-Ops/Provider-Routing-Playbook|Provider Routing Playbook]]** — current cost/latency/quality dispatch policy
- 📣 **[[02-Areas/Content-Creation/Content-Creation|Content Creation]]** — X/LinkedIn development publishing; sports clipping retained as an earlier lane
- 🧠 **[[02-Areas/Founder-Playbooks/Founder-Playbooks|Founder Playbooks]]** — Diana Hu AI-native + Hormozi leverage/first-$100K + Codie content business + YC Pocket Guide (extracted 2026-08-18)

---

## 📚 Resources (03-Resources)
- 🗺️ **[[03-Resources/MOC-UI-UX-Lessons|MOC: UI/UX Lessons]]** · [[03-Resources/MOCs/MOC-Projects|MOC: Projects]]
- ⚙️ Skills under `03-Resources/Skills/` (nav shell, dashboard, anti-slop watchlist, Frontend Awesomeness, …)
- 🧰 **[[03-Resources/Vault-Ops/Session-Lesson-Extraction-Idea|Session lesson extraction (draft)]]**
- 🧰 **[[03-Resources/Vault-Ops/Vault-Improvement-Backlog|Vault improvement backlog]]**
- 🧭 **[[03-Resources/Vault-Ops/Better-Me-Better-Vault|Better Me, Better Vault]]** — Decision support + development publishing
- 📝 **[[Templates/Decision Record Template|Decision record]]** · **[[Templates/Publishing Record Template|Publishing record]]**
- 🗺️ **[[03-Resources/Vault-LLM-Wiki-Patterns|Vault LLM Wiki Patterns]]**
- 📣 **[[03-Resources/SEO-Marketing/X-Algorithm-Ranking-Signals|X Algorithm Ranking Signals]]** — what the open-sourced X For You ranking actually rewards; weights verified against source, 3 corrections to the original extraction
- 🛠️ **[[03-Resources/Tools/Vault-Librarian-Interviewer|Vault Librarian]]** · [[03-Resources/Tools/Effects_Glossary|Effects Glossary]] · [[03-Resources/Tools/Effects_Playbook|Effects Playbook]] · [[03-Resources/Tools/Effects_Build_Playbook|Effects Build Playbook]] · [[03-Resources/Tools/AgentMemory-Dual-Store-Tab-Write-Paths|AgentMemory dual-store + tab write paths]] · [[03-Resources/Tools/OpenCode-Vision-Provider-Default|OpenCode vision provider default]] — make any opencode-served model the vision tool's primary backend

---

## 🤖 Agent Sessions (06-Agent-Sessions)
New sessions: `YYYY-MM-DD-<agent>-<slug>.md` via [[Templates/Agent-Session-Summary|template]]. Processed logs index: [[06-Agent-Sessions/extracted-sessions|extracted-sessions]].  
Latest: [[06-Agent-Sessions/2026-08-15-hermes-provider-audit|Provider audit]] — full Hermes provider audit: the "everything failing" cascade traced to a global `model.base_url` override (not bridge contamination), unset and verified; every provider live-tested and the working-model matrix recorded (agentrouter OK, NVIDIA 29/102, Copilot 13, Nous 5 free, Vercel 2, Gemini removed). Prior: [[06-Agent-Sessions/2026-08-14-hermes-agentrouter-sensitive-words-block|AgentRouter sensitive-words block]]. Historical processed logs: [[06-Agent-Sessions/extracted-sessions|extracted-sessions]].

---

## 🩺 Vault Health
- **Weekly review:** [[05-Daily/weekly/2026-08-09|2026-08-09 first live trial]] — prepared, not yet run
- **Last lint:** 2026-07-31 — [[LINT-REPORT|LINT-REPORT.md]]  (post 26-file orphan extraction, post Ledger P1-P3A/Momentum closure)
- **Prior pass:** [[03-Resources/Vault-Ops/Vault-Health-2026-07-09|Vault health 2026-07-09]] (Phase B)
- **Backlog:** [[03-Resources/Vault-Ops/Vault-Improvement-Backlog|full skills expansion deferred]]  
- **Projects MOC:** [[03-Resources/MOCs/MOC-Projects|MOC: Projects]]

**Tags:** #index #hub #navigation
