> **One-line Summary**: Current operating model — Victor supervises; 1–2 CLIs assist; no multi-agent orchestration engine.

# How Victor Works With Agents

**Updated:** 2026-07-09

## Model

| Role | Who |
|------|-----|
| Orchestrator / supervisor | **Victor** |
| Implementer(s) | AGY and/or Grok (or other CLI) when asked — usually one, max two |
| Review pipeline | Round-table only when Victor invokes it (`cli-shared-context/` + round-table skill) |

## Why the old system was dropped

- Multi-agent "orchestra" looked solid on paper; in practice Victor was not ready to hand off whole projects.
- Backend quality could be fine while **frontend stayed mediocre** — the gap that matters for portfolio and daily use.
- Rules and workstyle interviews did not transfer deep enough into real outputs.
- Cost of a full night on the system without a shipped project was too high.

## What stays

- Session logs in `06-Agent-Sessions/`
- Workstyle interview history: `~/cli-shared-context/WORKSTYLE-INTERVIEW.md`
- Optional **round-table** review protocol (not a standing orchestrator)
- agentmemory + vault as two memory layers when healthy

## What agents must not do

- Auto-load an orchestrator skill or invent AGY→OC→Grok pipelines
- Treat every task as multi-agent
- Skip phase gates or product one-goal checks on Momentum/Ledger

## Related

- `~/.grok/AGENTS.md` · `~/AGENTS.md`
- [[02-Areas/Agent-Ops/Victor-Standing-Directives|Victor standing directives]] — phase gates, auth UX, agent constraints
- [[03-Resources/Vault-Ops/Session-Lesson-Extraction-Idea|Session lesson extraction (draft)]]
- [[03-Resources/Vault-Ops/Vault-Improvement-Backlog|Vault improvement backlog]]

**Tags:** #agent-ops #area #workstyle
