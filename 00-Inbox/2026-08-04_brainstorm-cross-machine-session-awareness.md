# Cross-Machine Session Awareness — Brainstorm & Design Notes

**Status:** brainstorm only, not yet actionable. Task 0 (recon) must run on PC before any of this can be designed for real.

**Goal (as stated by Victor):** Not a live sync. Not "make both machines identical." The actual want:
> Awareness that another workstation exists and may be ahead/behind — "did anything happen on the other session?" — surfaced without Victor having to remember to ask.

**The real target problem (sharper version, extracted from the conversation):**
SecondBrain vault is basically never behind — Victor pushes it every session (Obsidian button or a one-line git push). What actually goes missing is: **agent CLI sessions on PC (OpenCode / Claude Code / possibly Antigravity) that touched real project files, but never produced a corresponding vault write-up (06-Agent-Sessions entry / CHANGELOG entry).** The gap isn't "vault is stale," it's "work happened and the vault doesn't know it happened." That's a session-log-vs-vault cross-reference problem, not a git-sync problem.

---

## Direct answers to Victor's questions (for the record)

1. **Can it watch PC for changes?** Yes, two different mechanisms exist and they're not interchangeable:
   - Polling (Hermes cron) — checks state on a schedule. This is what Hermes cron actually is.
   - Live/real-time (inotify/fswatch) — reacts instantly, but requires its own persistent background process; Hermes cron does not do this natively.
   - For this use case (retrospective "did a session happen and go undocumented"), **polling is correct** — no need for instant reaction.

2. **If live, can it report back to webui?** Not to a live browser tab — no such push channel exists. Real delivery targets: Telegram (connected already) or writing to files (which the vault or a HANDOFF doc can carry forward for the next webui session to read). Design around Telegram + vault-file, not "inject into an open browser session."

3. **Can it run at startup, always, connecting here without me knowing?** Yes, via a systemd user service (or platform equivalent) on PC — but this is OS-level PC setup Hermes cannot perform remotely; must be handed to Victor as exact commands. "Without me knowing" only applies to not having to manually launch it each boot — Victor still explicitly enables it once.

4. **How will it watch files? What is it watching for?** Three tiers, increasing difficulty/cost:
   - Tier 1: git ahead/behind/dirty state — cheap, script-only, already partly built for skill-router (MACHINES.md/AGENTS.md).
   - Tier 2: raw filesystem mtimes — cheap but noisy, fires on every save not just "meaningful work."
   - Tier 3 (the actual ask): CLI session log parsing + cross-reference against vault entries — not filesystem watching at all, it's log analysis.

5. **Can it see OpenCode/Claude Code/Antigravity sessions and report file changes?** Partially, with a real unknown: Claude Code writes local session transcripts (`~/.claude/projects/<project-slug>/...`) including tool-use records, so parsing "what files got touched" is plausible there. **OpenCode and Antigravity's session storage format/location is unknown from this session** — must be surveyed on Victor's actual PC before any of this can be designed, not guessed at.

6. **Script or AI task? Token cost?** Hybrid:
   - Tier 1 detection: pure script, `no_agent=True` cron mode, zero tokens, silent unless a divergence is found.
   - Tier 3 cross-referencing (session happened vs. vault has an entry for it): needs light reasoning — this is a matching/summarization task, not a regex — so it costs tokens, but should run on a slow cadence (e.g. once daily) over only that day's sessions, keeping cost proportional to actual work done, not to polling frequency.

---

## Proposed layered architecture (design sketch — not final until Task 0 recon lands)

**Layer 1 — Git divergence watchdog (already partly exists for skill-router)**
- Cron on PC (and optionally webui host), `no_agent=True`, runs `git fetch` + ahead/behind check across a short list of known multi-machine repos.
- Silent on no divergence; Telegram ping only when something's actually out of sync.
- Cheap, deterministic, zero design risk. Could ship today if Victor wants it, independent of Layer 2/3.

**Layer 2 — Undocumented-session detector (the actual ask, needs recon first)**
- Runs on PC only (that's where the CLI session logs physically live).
- Daily cron, LLM-driven (small token cost, bounded to one day's sessions):
  1. Enumerate that day's sessions across installed agent CLIs (Claude Code confirmed possible; OpenCode/Antigravity TBD after recon).
  2. For each session with real file-touching activity (filter out trivial/read-only sessions), extract: project dir, rough summary of what changed, timestamp.
  3. Check SecondBrain's `06-Agent-Sessions/` and `CHANGELOG.md` for a matching entry (by date + project).
  4. Flag anything with real activity and no matching vault entry.
- Delivery: Telegram digest ("You had 2 undocumented sessions today: skill-router (3 files touched), Ledger (1 file)"). Optionally also appended to a vault-tracked `00-Inbox` note so it surfaces next time Victor opens the vault too.

**Layer 3 (maybe, later, not now)** — auto-drafting the missing vault entry from the session log, for Victor to review/approve rather than write from scratch. Explicitly out of scope until Layer 2 is proven useful — don't build write-automation before the detection step is even validated.

---

## Task 0 — Recon (must run ON Victor's PC, blocks everything else)

This cannot be done from webui — needs actual filesystem access on PC.

1. `hermes status` / check whether Hermes CLI + cron are functional on PC at all (Victor said PC's Hermes hasn't been opened since starting webui — confirm it still works, isn't stale/broken).
2. Locate OpenCode's session storage: check likely candidates (`~/.opencode/`, `~/.local/share/opencode/`, or wherever its docs say) — confirm format (JSON? SQLite? logs?).
3. Locate Antigravity's session storage similarly, if Antigravity is actually still in active use (confirm with Victor — skill-router's AGENTS.md already frames Antigravity as one of the two MVP adapters, so likely yes).
4. Confirm Claude Code's actual local transcript path/format on this specific PC (`~/.claude/projects/...`) and check whether tool-use records (file Read/Write/Edit) are present and parseable.
5. Confirm systemd (or PC's actual init system/OS) supports a user service for persistent background Hermes, if Victor wants "always running" rather than manually opened.

## Open decisions for Victor (once Task 0 comes back)

- Cadence for Layer 2 (daily digest vs. something else)?
- Threshold for "worth flagging" — e.g. ignore sessions that touched only 1 file or ran under N turns, to avoid noise from trivial Q&A sessions?
- Delivery: Telegram only, or also write into vault `00-Inbox`?
- Should Layer 1 (git watchdog) ship now, independently, since it needs no recon and is already half-built for skill-router? Recommend yes — no reason to block the cheap, proven part on the harder, unproven part.
