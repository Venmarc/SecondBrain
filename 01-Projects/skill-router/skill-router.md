# skill-router

> **One-line Summary**: Top-priority project for routing each agent turn to relevant skills through a shared catalog/classifier and thin CLI adapters; architecture is proposed/decided, but implementation is unverified.

**Status:** Architecture proposed/decided for an agent-agnostic MVP; implementation unverified. The source repository at commit `cc53641` is an unfinished Gemini/Antigravity-specific snapshot.
**Priority:** Top
**Code:** `~/Documents/skill-router`
**Source of truth:** The source repository; this hub records current status, decisions, and verification gaps.

## Purpose

Install one skill-routing system per machine so supported agent CLIs can identify relevant skills without loading the entire skill catalog into every turn.

## Current Repository State

The initial snapshot contains:

- `README.md` — explicitly marks the project unfinished and the agent-agnostic rewrite pending.
- `skill-router-specification.md` — current Gemini/Antigravity-specific design.
- `hook.py` — Antigravity pre-invocation hook using the Gemini API classifier.
- `generate_catalog.py` — skill catalog generator.
- `catalog.json` — generated catalog snapshot.
- `superpowers_wrapper.py` — wrapper integration.
- `classifier_rate_limit.json` — local runtime state included in the snapshot.

The current implementation uses Gemini/Antigravity paths, transcript assumptions, and hook registration. It does not yet verify the agent-agnostic architecture described below.

## Proposed Architecture

- One shared skill catalog and classifier per machine.
- Thin harness adapters for Antigravity and Claude Code in the MVP.
- Pointer injection rather than full skill-content injection.
- Canonical-name deduplication when a harness also performs native skill matching.
- Fast per-turn routing kept separate from slower catalog/product maintenance.
- Fail-open behavior when routing or classification fails.

These are design decisions, not verified implementation claims.

## Open Verification Work

1. Reconcile the current Gemini-specific files with the shared catalog/classifier architecture.
2. Implement or adapt the Antigravity adapter against that shared core.
3. Spike Claude Code hook coexistence and verify deduplication with native skill matching.
4. Measure routing latency against the proposed maximum of 10 seconds.
5. Decide pricing only after the technical MVP is proven.

## Truth Rule

Use these evidence states in future updates:

- **Proposed:** an idea under consideration.
- **Decided:** architecture or scope Victor selected.
- **Implemented:** present in source code.
- **Verified:** tested in the intended harness with recorded evidence.

Do not collapse "decided" into "verified."

## Related

- [[03-Resources/Skills/Skill-Router-Hook|Skill Router Hook]]
- [[02-Areas/Agent-Ops/How-Victor-Works-With-Agents|How Victor Works With Agents]]

**Tags:** #project #skill-router #agent-ops #architecture
