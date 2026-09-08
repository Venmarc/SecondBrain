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
- Raw image / video binaries are **tracked in git** (the earlier "gitignored" claim was stale — no `.gitignore` exists in the repo and `git ls-files Assets/` lists the binaries). This MOC remains the human-readable inventory and reverse-index of what lives in the folder.

---

## Inventory (as of 2026-09-08)

### PNG screenshots — Antigravity Swarm set (14 files)

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
| `Pasted image 20260720062129.png` | [[04-Archive/Inbox/Bug In Ledger]] | sidebar icon drift before fix — Bug In Ledger evidence screenshot |

### PNG screenshots — lamalama.com research set (18 files)

Captured 2026-09-06/07, pasted at vault root (default paste location was misconfigured at the time); moved into `Assets/` and links rewritten to `![[Assets/...]]` on 2026-09-08.

| File | Embedded in | Context / Caption (from note) |
|------|-------------|------------------------------|
| `Pasted image 20260906234343.png` | [[00-Inbox/Update_Update]] | section where tracing the cursor distorts the images under it |
| `Pasted image 20260906234554.png` | [[00-Inbox/Update_Update]] | bigger picture of the grainy distortion |
| `Pasted image 20260906235022.png` | [[00-Inbox/Update_Update]] | click-spread distortion — noise area spreads with click pressure/duration |
| `Pasted image 20260906235649.png` | [[00-Inbox/Update_Update]] | the grainy spread over the image |
| `Pasted image 20260906235756.png` | [[00-Inbox/Update_Update]] | how far the spread goes |
| `Pasted image 20260906235442.png` | [[00-Inbox/Update_Update]] | second distortion type — jelly/molten bending of image parts |
| `Pasted image 20260906235817.png` | [[00-Inbox/Update_Update]] | the original (undistorted) image for comparison |
| `Pasted image 20260907000603.png` | [[00-Inbox/Update_Update]] | button hover — scrambled/cipher text state |
| `Pasted image 20260907000639.png` | [[00-Inbox/Update_Update]] | button hover — normal text state |
| `Pasted image 20260907000739.png` | [[00-Inbox/Update_Update]] | transparent buttons (fill = background) |
| `Pasted image 20260907000843.png` | [[00-Inbox/Update_Update]] | colored buttons |
| `Pasted image 20260907031741.png` | [[00-Inbox/Update_Update]] | possible ASCII/letter-shrunk particle pattern; background person is a ~3s looping video |
| `Pasted image 20260907032054.png` | [[00-Inbox/Update_Update]] | top bar text variations |
| `Pasted image 20260907032201.png` | [[00-Inbox/Update_Update]] | hero text scramble on revisit, returns with a different sentence |
| `Pasted image 20260907032302.png` | [[00-Inbox/Update_Update]] | expanded neat menu (embedded at width 339) |
| `Pasted image 20260907032410.png` | [[00-Inbox/Update_Update]] | the footer — simple but still awesome |
| `Pasted image 20260907032511.png` | [[00-Inbox/Update_Update]] | top-right buttons, always present |
| `Pasted image 20260907032528.png` | [[00-Inbox/Update_Update]] | top-right buttons, paired with the row above (embedded at width 130) |

### MP4 screencasts — 6 files

| File | Size | Embedded in | Context / Caption |
|------|------|-------------|-------------------|
| `Screencast From 2026-07-20 01-14-05.mp4` | 2.9 MB | [[00-Inbox/Antigravity Swarm]] | Screencast of the drone-show-worms-pixels |
| `Screencast From 2026-07-20 01-14-46.mp4` | 3.2 MB | [[00-Inbox/Antigravity Swarm]] | Screencast of bottom session swarm |
| `Screencast From 2026-07-20 01-28-55.mp4` | 7.2 MB | [[00-Inbox/Antigravity Swarm]] | Screencast of my version of antigravity swarm |
| `Screencast From 2026-07-20 01-29-43.mp4` | 5.2 MB | [[00-Inbox/Antigravity Swarm]] | Screencast of antigravity.google hero swarm |
| `Screencast From 2026-07-20 04-34-10.mp4` | 13.6 MB | [[00-Inbox/Antigravity Swarm]] | View this one last. It is 40 secs long and could take time ingesting |
| `Screencast From 2026-07-20 04-37-04.mp4` | 1.6 MB | [[00-Inbox/Antigravity Swarm]] | Closer view at the drone-show-pixel swarm |

### Demo artifact images — Footer-Non-Boring mascot MVP (4 files)

Moved flat into `Assets/` on 2026-09-08 from `03-Resources/Design/Footer-Non-Boring/demo/mascot-css-mvp/` (and its `shots/` subfolder, since removed). The runnable demo itself (`index.html`, `README.md`) still lives in the demo folder — it is code, not an attachment.

| File | Embedded in | Context / Caption |
|------|-------------|-------------------|
| `shot-footer-eyes.webp` | [[03-Resources/Design/Footer-Non-Boring/01-cursor-follow-mascot]] | mascot demo screenshot — footer with eye-tracking mascot |
| `01-full.png` | [[03-Resources/Design/Footer-Non-Boring/01-cursor-follow-mascot]] | full footer view |
| `02-eyes-top-left.png` | [[03-Resources/Design/Footer-Non-Boring/01-cursor-follow-mascot]] | pupils tracking top-left |
| `03-eyes-near-mascot.png` | [[03-Resources/Design/Footer-Non-Boring/01-cursor-follow-mascot]] | cursor near the mascot |

---

## Coverage

All 42 assets in `Assets/` are currently embedded in exactly **4 vault notes**:
- [[00-Inbox/Antigravity Swarm]] — 13 png + 6 mp4 (the antigravity.google research thread — Victor's visual reference set for the erratic-swarm Extract/Build lane that closed 2026-07-20 with Lighthouse 99/99). Knowledge extracted to [[03-Resources/Tools/Effects_Glossary]] (`MeshBackground`, `FilmGrain`, `Swarm`, `BlinkingCursor` promoted to `tried`); raw research notes still in inbox pending processing.
- [[04-Archive/Inbox/Bug In Ledger]] — 1 png (sidebar icon drift bug, fixed 2026-07-19; both bugs resolved and verified, archived 2026-07-31).
- [[00-Inbox/Update_Update]] — 18 png (lamalama.com raw research capture, 2026-09-06/07; embeds are path-qualified `![[Assets/...]]` since the 2026-09-08 consolidation).
- [[03-Resources/Design/Footer-Non-Boring/01-cursor-follow-mascot]] — 3 png + 1 webp (CSS dual-eye mascot MVP screenshots, consolidated from the demo folder 2026-09-08).

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
- **2026-09-08** — Consolidation pass by GLM-5.3 / OpenCode. Moved 22 stray attachments into `Assets/`: 18 root-level `Pasted image 2026-09-06/07` pngs (embedded by [[00-Inbox/Update_Update]], lamalama.com research — pasted to vault root because the default paste location was misconfigured) and 4 mascot-demo images from `03-Resources/Design/Footer-Non-Boring/demo/mascot-css-mvp/` + its `shots/` subfolder. All caller links rewritten to path-qualified `![[Assets/<file>]]` / `[[Assets/<file>]]` form. Corrected the stale "binaries are gitignored" convention claim (binaries are git-tracked; no `.gitignore` exists). Inventory total: 20 → 42. The `raw/` PDF was left in place (raw sources are immutable).

**Tags:** #moc #assets #inventory #attachments
