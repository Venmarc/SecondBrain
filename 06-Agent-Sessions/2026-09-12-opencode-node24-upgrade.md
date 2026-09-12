> **One-line Summary**: Upgraded Node v20.20.2 → v24.21.0 (LTS Krypton) via nvm with all global CLIs carried over; fixed two traps found on the way — a timeout-killed npm reinstall that silently dropped bin links, and the hermes-gateway systemd unit pinning the old node version.

**Date:** 2026-09-12
**Agent:** OpenCode
**Project:** none (machine maintenance)

## Goal
- Update the machine's Node.js to the latest stable version and make every future launch (dev servers, gateway services, global CLIs) use it.

## Standing Directives Given This Session
- "Don't worry about the npm run dev servers." — Do not chase/restart Victor's own dev servers; they get the new version when he restarts them.
- "Forget the memory server. u can use secondbrain to store this session instead." — agentmemory is out of scope this session; session continuity lives in this vault log.

## User Prompts (Extracted, Not Compressed)
- **Prompt:** "find and update node.js to the latest stable version. lemme kno what u need."
  **Overrode/Added:** Initial task. Led to discovery that node is nvm-managed on v20.20.2, latest LTS is v24.21.0.
- **Prompt:** "I give u the go-ahead to kill all processes or pause them temporarily for the install, then continue when the latest version is available. Or just keep track of what needs the latest version"
  **Overrode/Added:** Authorized process kills for the upgrade; also allowed the lighter path of tracking what needs restart. In practice the install was already done, so only stale processes were addressed.
- **Prompt:** "Don't worry about the npm run dev servers. For the hermes-agent one. I think it's just a command 'hermes gateway' or 'hermes gateway start' cos it's already connected. Opencode. Forget the memory server. u can use secondbrain to store this session instead."
  **Overrode/Added:** Stopped dev-server restart work; redirected session storage from agentmemory to SecondBrain. (Gateway was already restarted via systemd by then.)
- **Prompt:** "If I encounter any error when I try to restart I'll come here to fix it, or do it in a new session"
  **Overrode/Added:** No proactive follow-up needed; Victor owns restart verification.
- **Prompt:** "I just want to know that node is in the 24 version. And when I run those server, they'll use the latest instead of the old. If that's the case, everything is good. if not. make it that way"
  **Overrode/Added:** Final acceptance criterion: default = v24, all new launches resolve v24.

## Reference Files / Media
- `~/.config/systemd/user/hermes-gateway.service` — systemd unit for the Hermes gateway; had the old node version hardcoded in its PATH environment.

## Root Cause Log
| Symptom | Root Cause | Fix Applied | Confidence |
|---|---|---|---|
| After node v24 install, `~/.nvm/versions/node/v24.21.0/bin/` contained only node/npm/npx; global CLIs (vercel, gemini, defuddle, agentmemory…) missing | Tool timeout killed `nvm install --reinstall-packages-from=20` during npm's link phase — packages were extracted but bin symlinks never created | Re-ran `nvm reinstall-packages 20` detached (nohup + setsid, log to /tmp); verified 18 bin links landed | Confirmed |
| Hermes gateway restart would still spawn node v20 | Unit's `Environment="PATH=..."` hardcoded `~/.nvm/versions/node/v20.20.2/bin`; nvm default alias has no effect on systemd units | Edited unit PATH to v24.21.0, `daemon-reload`, restart; bridge now runs v24 (verified via `readlink /proc/<pid>/exe`) | Confirmed |
| First attempt to restart lamalama dev server failed ("npm error" / astro preview exited) | Launched `npm run dev` without a workdir — npm ran from `~`, no scripts found; `npm exec astro` pulled astro@7 into a cache dir instead of the project | Re-ran with correct project workdir; vite came up on v24 | Confirmed |

## Research Conducted
- **Searched/Consulted:** `nvm ls-remote --lts` (latest LTS = v24.21.0 Krypton); local `nvm ls`, `npm ls -g`, `systemctl --user cat`, process table. No external docs needed.
- **Should have been consulted but wasn't:** N/A

## Subagent Snags
- Shell tool timeout (300s) killed the first global-package reinstall mid-link; recovered by re-running detached.
- A later combined kill+relaunch command hit the 120s shell timeout after backgrounding; the background process itself was unaffected.

## Decisions & Pivots
- Install v24.21.0 (LTS Krypton) rather than a Current-line release — matches "latest stable".
- Keep v20.20.2 installed for rollback (`nvm use 20`); no uninstall performed.
- Reinstall globals into v24 rather than re-resolving by hand; npm peer-dep warnings for @agentmemory/agentmemory's claude-agent-sdk were accepted (warnings, not failures).
- Fix the systemd unit PATH instead of switching the gateway to a wrapper that sources nvm — smallest surgical change.

## Steps Taken / Actions
- Installed node v24.21.0 via nvm; set `nvm alias default` to it (verified: fresh login shells resolve v24).
- Reinstalled all global packages from v20 (agentmemory, caveman, copilot, gemini-cli, autoprompt-skill, clerk, defuddle, uipro-cli, vercel) and verified their bin links + `--version` outputs.
- Updated `hermes-gateway.service` PATH pin v20.20.2 → v24.21.0; daemon-reload + restart; confirmed bridge.js and its HTTP listener (port 3000) run on v24.
- Killed two stale dev servers that predated the upgrade (lamalama vite, sloth astro preview) and relaunched lamalama on v24 per Victor's earlier go-ahead; sloth left for Victor per his "don't worry about the dev servers" (relaunch attempt had misfired on workdir; not retried after his message).
- Verified final state: nvm default = v24.21.0; `.bashrc` sources nvm → every new terminal and every server Victor starts resolves v24.

## Files Touched
- `~/.config/systemd/user/hermes-gateway.service`
  - **Previous State:** PATH pinned to `~/.nvm/versions/node/v20.20.2/bin`
  - **After Change:** PATH pinned to `~/.nvm/versions/node/v24.21.0/bin`; gateway restarted on the new path
  - **Related to:** Root Cause Log row 2
- `[[ANTI_PATTERNS]]`
  - **Previous State:** No Node.js/nvm section
  - **After Change:** New section with the two confirmed traps (timeout-killed reinstall, systemd PATH pin)
  - **Related to:** Root Cause Log rows 1–2

## Vault Updates This Session
- `[[ANTI_PATTERNS.md]]`: Added `## Node.js / nvm` section (2 rows). Line count after edit: 124. Split triggered: No (< 200)
- Project `AGENTS.md`: No changes (no project session)
- This log + `[[CHANGELOG]]` entry + `[[index]]` Agent-Sessions "Latest" pointer updated.

## Open Questions & Next Steps
- Processes still running on v20 until their next restart (expected, harmless): halden astro dev server, two agentmemory MCP servers, `iii`. They resolve v24 the next time Victor starts them in a fresh terminal.
- agentmemory MCP servers run from a v20-noded install; when agentmemory is back in scope, confirm its global install works under v24 (CLI `--version` verified; long-running MCP not retested).
- Victor will handle any restart errors himself, here or in a new session.

**Tags:** #agent-session #node #nvm #systemd #upgrade
