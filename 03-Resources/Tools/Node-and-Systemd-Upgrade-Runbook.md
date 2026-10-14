---
title: Node and Systemd Upgrade Runbook
date: 2026-10-14
tags:
  - tools
  - node
  - nvm
  - systemd
status: reference
---

# Node and Systemd Upgrade Runbook

> **One-line Summary**: Safe machine procedure for upgrading Node with nvm while preserving global CLIs and long-running services.

## Upgrade procedure

1. Install the target Node version.
2. Re-run global package migration without a short tool timeout.
3. Confirm the new version's `bin` directory contains the expected global CLI links.
4. Update any systemd unit that pins an old nvm version.
5. Reload the user service manager and restart the service.
6. Verify the spawned process executable points to the target Node version.
7. Run one real CLI canary from the intended project directory.

## Failure patterns

- A timed-out package migration can finish extraction but omit global CLI links.
- `node -v` can pass while `defuddle`, `gemini`, `vercel`, or other global commands are missing.
- An nvm default alias does not override a versioned `PATH` inside a systemd unit.
- Running npm commands from the wrong directory can select the wrong project or cache context.

## Canonical anti-pattern entries

The confirmed root causes remain in [[ANTI_PATTERNS|ANTI_PATTERNS.md]] under `Node.js / nvm`. This note provides the repeatable procedure; the anti-pattern table remains the failure reference.

## Source extraction

The procedure came from the 2026-09-12 Node upgrade session. The current state and deletion record live in [[06-Agent-Sessions/extracted-sessions|Extracted Sessions]].

**Tags:** #tools #node #nvm #systemd
