# Vault Librarian Interviewer & Knowledge Extractor
> **One-line Summary**: Central dashboard and documentation for the interactive vault maintenance (librarian) and knowledge extraction (harvest) systems.

## 🧭 Overview
Victor's Second Brain uses two distinct automation tools to support personal knowledge management:
1. **Librarian (`vault-librarian.js`)**: Focuses on vault maintenance, structural auditing (broken links, orphans, missing docs), and static lint questions.
2. **Knowledge Extractor (`harvest.js`)**: Focuses on mind elicitation, scanning daily notes and dev logs for lesson fingerprints, and generating dynamic prompts for aggressive interview sessions.

---

## ⚙️ Trigger Workflows
- **To run a maintenance audit & interview**: Prompt the agent with `/interview` or `"Start interview session"`.
- **To run a knowledge extraction & harvest**: Prompt the agent with `/harvest` or `"Run harvest script"`.

---

## 🌾 harvest.js CLI Reference
Run the script from the vault root:
```bash
node scripts/harvest.js                    # Generate full extraction prompt (default)
node scripts/harvest.js --dry-run          # List candidates found without generating the prompt
node scripts/harvest.js --quick            # Max 3 candidates (faster sessions)
node scripts/harvest.js --days=7           # Scan last 7 days of daily notes (default is 14)
node scripts/harvest.js --focus=Momentum   # Only scan Momentum project's DEV_NOTES.md
node scripts/harvest.js --json             # Output candidates in structured JSON format
node scripts/harvest.js --record "1,2,3"   # Mark candidates 1, 2, and 3 as harvested (adds to history)
```

---

## 📑 Completed Session Logs
| Date | Type | Questions Answered / Candidates Processed | Notes Created/Updated |
| :--- | :--- | :--- | :--- |
| 2026-06-25 | Librarian | 0 | None (Initialized) |
| 2026-06-28 | Extractor | 10 | Created 10 UI/UX atomic notes and 1 MOC |
| 2026-07-09 | Librarian | 7 | Daily note, 3 skills, clippings archive, Momentum hub |


## Related
- [[02-Areas/Agent-Ops/How-Victor-Works-With-Agents|How Victor Works With Agents]]
- [[AGENTS|AGENTS.md]]
- [[03-Resources/Skills/Knowledge-Extraction-Interviewer|Knowledge Extraction]]

