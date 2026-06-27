# Victor's Second Brain (Personal Knowledge OS)

> **One-line Summary**: Central dashboard and automated knowledge operating system managing active projects, learning synthesis, and interactive agent-librarian session history.

---

## ⚡ Active Projects Dashboard
- 🔥 **[Tempire](https://tempire.xyz/)** — Premium digital asset marketplace for vetted, production-ready templates.
  - *Status*: UI/UX Polish Phase (~89% complete)
  - *Docs*: [PRD](01-Projects/Tempire/Docs/PRD) | [TRD](01-Projects/Tempire/Docs/TRD) | [PAGE_SPECS](01-Projects/Tempire/Docs/PAGE_SPECS) | [APP_FLOW](01-Projects/Tempire/Docs/APP_FLOW) | [UIUX_BRIEF](01-Projects/Tempire/Docs/UIUX_BRIEF) | [SCHEMA](01-Projects/Tempire/Docs/SCHEMA) | [PHASES](01-Projects/Tempire/Docs/PHASES) | [NOTES](01-Projects/Tempire/Notes)
- 🌱 **[Momentum](https://peakmomentum.vercel.app)** — Adaptive habits, fitness, and wellness logging operating system.
  - *Status*: Active Development Phase
  - *Docs*: [PRD](01-Projects/Momentum/Docs/PRD) | [TRD](01-Projects/Momentum/Docs/TRD) | [PAGE_SPECS](01-Projects/Momentum/Docs/PAGE_SPECS) | [APP_FLOW](01-Projects/Momentum/Docs/APP_FLOW) | [UIUX_BRIEF](01-Projects/Momentum/Docs/UIUX_BRIEF) | [SCHEMA](01-Projects/Momentum/Docs/SCHEMA) | [PHASES](01-Projects/Momentum/Docs/PHASES) | [DEV_NOTES](01-Projects/Momentum/Docs/DEV_NOTES)

---

## 🧭 Directory Layout (PARA + Extensions)

```
SecondBrain/
├── 00-Inbox/             # Raw captures, quick thoughts, web clippings (process within 48h)
├── 01-Projects/          # Active projects with standardized documentation (9-Doc Standard)
│   ├── Momentum/
│   └── Tempire/
├── 02-Areas/             # Long-term responsibilities (Personal Growth, Content Creation)
├── 03-Resources/         # Reusable skills, technical guides, saved threads, and tools
├── 04-Archive/           # Completed projects, archived exams, and retired clippings
├── 05-Daily/             # Chronological logs and journal reflections
├── 06-Agent-Sessions/    # Completed agent librarian session logs and Q&A history
├── Clippings/            # Raw, immutable web clips from browser clipper
├── scripts/              # Local automation scripts (e.g. vault-librarian.js)
└── Templates/            # Reusable markdown templates (Daily, Session Logs, Skills)
```

---

## 🛠️ Automation & Tooling Stack
The vault uses local script utilities and Obsidian command-line integration to maintain consistency:
- **Node.js**: Runs the `vault-librarian.js` scanner script to audit state and handle Q&A tracking.
- **[Obsidian CLI](https://help.obsidian.md/cli)**: Interacts with the running Obsidian app leaf for commands, page creation, and queries.
- **[Defuddle CLI](https://github.com/kepano/defuddle)**: Strips HTML noise and formats external clippings into clean Markdown.
- **Git**: Automatically tracks backups, index syncs, and the append-only `CHANGELOG.md`.

---

## ⚙️ Standard Workflows
1. **Ingest Workflow**: Triggered on new inbox/clipper items. DISTILL raw contents ➔ CREATE atomic resources/skills ➔ CROSS-LINK in the graph.
2. **Lint Workflow**: Triggered on command. Audit broken links, orphans, missing 9-doc files, and missing summaries ➔ UPDATE [[LINT-REPORT|LINT-REPORT.md]].
3. **Librarian Interviewer Routine**: Triggered on demand via *"Run an interview session"*. Runs `vault-librarian.js` ➔ ASKS 3–7 state-aware questions ➔ DISTILLS Victor's responses ➔ CREATES new notes ➔ LOGS in `06-Agent-Sessions/` and history JSON.

---

## 🤖 AI Agent Session Quickstart
If you are an AI agent collaborating in this vault, you **MUST** follow this routine on start:
1. **Load Context**: Read [[BRAIN|BRAIN.md]], [[AGENTS|AGENTS.md]], [[index|index.md]], and [[LINT-REPORT|LINT-REPORT.md]] to align on project states and styling rules.
2. **Run Librarian Scanner**:
   Execute the librarian script to see the current state-based priority gaps and questions:
   ```bash
   node scripts/vault-librarian.js
   ```
3. **Trigger Interview**: If requested, present the questions to Victor and record his answers using:
   ```bash
   node scripts/vault-librarian.js --record "question-id1,question-id2,..."
   ```
4. **Follow Vault Standards**: Always include `> **One-line Summary**` at the top of new notes, save files to correct PARA folders (not Inbox), and add bidirectional wikilinks (`[[NoteName]]`) to preserve graph density.
