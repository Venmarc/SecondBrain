
> **One-line summary**: I supervise. 1-2 CLIs assist. No multi-agent orchestration engine — tried it, wasn't ready for it, dropped it.

# How I Work With Agents

**Updated:** 2026-07-09

## Model

| Role | Who |
|------|-----|
| Orchestrator / supervisor | **Me (Victor)** |
| Implementer(s) | AGY and/or Grok (or whatever CLI) when I actually need it — usually one, max two |
| Review pipeline | Round-table only when I invoke it (`cli-shared-context/` + round-table skill) |

## Why I dropped the old system

- The multi-agent "orchestra" setup looked dope on paper... in practice I wasn't ready to hand off whole projects. Turns out having the architecture doesn't mean u can actually use it yet.
- Backend could be solid while **frontend stayed mediocre** — and that's the gap that actually matters for portfolio + daily use, so what's the point.
- Rules + workstyle interviews just didn't transfer deep enough into real outputs. Reads good, doesn't ship good.
- Cost of burning a whole night tuning the system with nothing shipped was too high. Not worth it rn.

## What stays

- Session logs in `06-Agent-Sessions/`
- Workstyle interview history: `~/cli-shared-context/WORKSTYLE-INTERVIEW.md`
- Optional **round-table** review protocol (not a standing orchestrator — I call it when I want it, it doesn't call itself)
- agentmemory + vault as two memory layers when healthy

## What agents must not do

- Auto-load an orchestrator skill or invent AGY→OC→Grok pipelines on their own — nah
- Treat every task like it's multi-agent when it's not
- Skip phase gates or product one-goal checks on Momentum/Ledger

## Related

- `~/.grok/AGENTS.md` · `~/AGENTS.md`
- [[02-Areas/Agent-Ops/Victor-Standing-Directives|my standing directives]] — phase gates, auth UX, agent constraints
- [[03-Resources/Vault-Ops/Session-Lesson-Extraction-Idea|session lesson extraction (draft)]]
- [[03-Resources/Vault-Ops/Vault-Improvement-Backlog|vault improvement backlog]]

**Tags:** #agent-ops #area #workstyle