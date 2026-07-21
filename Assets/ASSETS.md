---
title: MOC: Assets
date: 2026-07-20
tags:
  - moc
  - assets
  - inventory
  - attachments
aliases:
  - Assets MOC
  - Asset Index
---

# MOC: Assets

> **One-line Summary**: Map of Content for every image, screenshot, screencast, and audio attachment in the vault's `Assets/` folder — the inventory + reverse-index of which note embeds each file.

---

## What This Is

This note has no content of its own. Its job is to make the `Assets/` folder graph-visible: every binary attachment in this vault lives in `Assets/`, and is wikilinked into one or more notes (`![[file]]` embeds). Without an MOC, every one of those attachments looks like an "orphan" to the lint pass because Obsidian's graph indexer counts them as nodes with no incoming markdown links (their callers resolve the file but don't count as a backlink by strict rules).

**Convention:**
- All pasted / dropped attachments → `Assets/` (configured in Obsidian under `Files & Links → Default location for new attachments → "In subfolder under current folder"` is NOT used; use the vault-wide `Assets/` setting instead).
- A file might not necessarily contain the attachments physically — it can have a link pointing to them here in `Assets/`.
- All attachments are listed in this file, but their physical form lives in the folder.
- Raw image / video binaries are gitignored (see `.gitignore` `/Assets/*.png`, `/Assets/*.mp4`) — they exist on disk only; this MOC is what lets a fresh clone of the vault know what *should* be there.

---

## Inventory (as of 2026-07-20)

### PNG screenshots — 14 files

| File | Embedded in | Context / Caption (from note) |
|------|-------------|------------------------------|
| `Pasted image 20260720020518.png` | [[00-Inbox/Antigravity Swarm]] | antigravity hero swarm clustering around the cursor |
| `Pasted image 20260720020800.png` | [[00-Inbox/Antigravity Swarm]] | my version of the antigravity swarm with brown particles |
| `Pasted image 20260720021723.png` | [[00-Inbox/Antigravity Swarm]] | *(uncaptioned — paired with adjacent images)* |
| `Pasted image 20260720021800.png` | [[00-Inbox/Antigravity Swarm]] | the swarm in the section above the footer |
| `Pasted image 20260720022702.png` | [[00-Inbox/Antigravity Swarm]] | the particles resting like they are on a field waiting for nothing |
| `Pasted image 20260720023051.png` | [[00-Inbox/Antigravity Swarm]] | particles come together to form braces that represent developers (paired with `20260720040514.png`) |
| `Pasted image 20260720023327.png` | [[00-Inbox/Antigravity Swarm]] | particles form 6 round groups of particles representing an organization |
| `Pasted image 20260720033526.png` | [[00-Inbox/Antigravity Swarm]] | *(uncaptioned — adjacent to swarm description)* |
| `Pasted image 20260720033625.png` | [[00-Inbox/Antigravity Swarm]] | 500% zoom of particles in swarm |
| `Pasted image 20260720034357.png` | [[00-Inbox/Antigravity Swarm]] | some worms going up, down, left, right or appear stagnant, because of screenshot (paired with `20260720041439.png`) |
| `Pasted image 20260720040348.png` | [[00-Inbox/Antigravity Swarm]] | my version of the antigravity swarm with brown particles (paired with `20260720020800.png`) |
| `Pasted image 20260720040514.png` | [[00-Inbox/Antigravity Swarm]] | particles come together to form braces that represent developers (paired with `20260720023051.png`) |
| `Pasted image 20260720041439.png` | [[00-Inbox/Antigravity Swarm]] | some worms going up, down, left, right or appear stagnant, because of screenshot (paired with `20260720034357.png`) |
| `Pasted image 20260720062129.png` | [[00-Inbox/Bug In Ledger]] | sidebar icon drift before fix — Bug In Ledger evidence screenshot |

### MP4 screencasts — 6 files

| File | Size | Embedded in | Context / Caption |
|------|------|-------------|-------------------|
| `Screencast From 2026-07-20 01-14-05.mp4` | 2.9 MB | [[00-Inbox/Antigravity Swarm]] | Screencast of the drone-show-worms-pixels |
| `Screencast From 2026-07-20 01-14-46.mp4` | 3.2 MB | [[00-Inbox/Antigravity Swarm]] | Screencast of bottom session swarm |
| `Screencast From 2026-07-20 01-28-55.mp4` | 7.2 MB | [[00-Inbox/Antigravity Swarm]] | Screencast of my version of antigravity swarm |
| `Screencast From 2026-07-20 01-29-43.mp4` | 5.2 MB | [[00-Inbox/Antigravity Swarm]] | Screencast of antigravity.google hero swarm |
| `Screencast From 2026-07-20 04-34-10.mp4` | 13.6 MB | [[00-Inbox/Antigravity Swarm]] | View this one last. It is 40 secs long and could take time ingesting |
| `Screencast From 2026-07-20 04-37-04.mp4` | 1.6 MB | [[00-Inbox/Antigravity Swarm]] | Closer view at the drone-show-pixel swarm |

---

## Coverage

All 20 assets in `Assets/` are currently embedded in exactly **2 vault notes**:
- [[00-Inbox/Antigravity Swarm]] — 13 png + 6 mp4 (the antigravity.google research thread — Victor's visual reference set for the erratic-swarm Extract/Build lane that closed 2026-07-20 with Lighthouse 99/99). Knowledge extracted to [[03-Resources/Tools/Effects_Glossary]] (`MeshBackground`, `FilmGrain`, `Swarm`, `BlinkingCursor` promoted to `tried`); raw research notes still in inbox pending processing.
- [[00-Inbox/Bug In Ledger]] — 1 png (sidebar icon drift bug, fixed 2026-07-19; bug note status lines confirm resolution → [[ANTI_PATTERNS]] §Clerk).

When the Antigravity Swarm inbox note is eventually processed (see [[LINT-REPORT|2026-07-20 lint Suggestions §5]]), the captions above are the canonical record of what each image shows — don't delete this MOC row when the inbox note is archived.

---

## How to Use This Note

- **When pasting a new attachment** in any vault note: after saving, add a row to the relevant section above (file, calling note, caption/why-this-exists).
- **Before deleting an attachment**: check its row above — only delete if no caller remains AND the caption confirms it's safe (or the caller note is itself archived/deleted and the image isn't needed as historical evidence).
- **Lint pass**: orphans in `Assets/` (a file with no row above) should be flagged — either add the row or delete the binary.
- **Style**: filename verbatim, then wikilink to the calling note, then short caption in the note author's own words where one exists.

---

## Related

- [[index|Vault index]] — top-level hub
- [[LINT-REPORT|Lint report]] — orphan detection covers unbilled Assets
- [[03-Resources/MOC-UI-UX-Lessons|MOC: UI/UX Lessons]] — sibling MOC pattern
- [[03-Resources/MOCs/MOC-Projects|MOC: Projects]] — sibling MOC pattern
- [[03-Resources/Vault-Ops/Vault-Improvement-Backlog|Vault improvement backlog]] — where future MOC setup tasks get queued

---

## Maintenance Log

- **2026-07-20** — MOC created by GLM-5.2 / OpenCode. Renamed from typo-named `ASSETS.md.md` (auto-created Obsidian stub) to `ASSETS.md`. Initial inventory hand-built from `rg` walk + `[[00-Inbox/Antigravity Swarm]]` + `[[00-Inbox/Bug In Ledger]]` caption scraping. All 20 known attachments covered.

**Tags:** #moc #assets #inventory #attachments
