> **One-line Summary**: The proposed local AI Hero OS uses a task card, one route decision, progressive disclosure, bounded execution, and evidence-based closure.

# Local AI Hero Operating Model Draft

**Status:** Proposal for Victor's review. This file does not authorize implementation.

**Architecture update:** [Shared router architecture](08-Shared-Router-Architecture-Draft.md) records Victor's direction for nested routes, a search router, shared browser profiles, and support across agent clients. Its more specific routing proposal supersedes the initial flat table below.

## Goal

Victor should be able to state a goal once. The machine should choose the correct process, tool, skill, context boundary, and verification route without repeated safety or tool reminders.

The machine should reduce rework without taking product judgment away from Victor.

## The task card

Every non-trivial task gets these fields at the route boundary:

| Field | Meaning |
|---|---|
| Goal | The observable result Victor wants |
| Mode | Research, decision, prototype, implementation, debugging, review, publishing, or maintenance |
| Scope | The smallest useful boundary |
| Risk | Reversible, external-effect, destructive, money, auth, data, or public output |
| Route | The selected flow and required skills |
| Source of truth | Code, vault, external docs, tracker, or user judgment |
| Evidence target | What will prove the goal is met |
| Stop condition | What ends the work |
| External effects | What the agent may and may not do |
| Handoff | The file or tracker item that carries context across boundaries |

The agent should infer safe defaults and ask only questions that can change the route or acceptance result.

## Local route table

```text
unclear idea
  → grill-with-docs + domain-modeling

external fact blocks a decision
  → source-shaped research pass

visual or behavioral uncertainty
  → prototype

large effort with unclear route
  → wayfinder

small settled work
  → implement

settled work across sessions
  → to-spec → to-tickets → implement

inbound issue
  → triage

broken behavior with unclear cause
  → systematic-debugging

completed branch
  → code-review → pr when needed → retro when useful
```

## Tool route

The router should select tools from the source shape and the required action.

| Need | Preferred path | Fallback |
|---|---|---|
| Navigate a live website | Browser MCP accessibility tree | Read-only web retrieval with a stated limitation |
| Read an article | Defuddle Markdown extraction | Webfetch Markdown |
| Map a documentation site | `llms.txt`, sitemap, Markdown sitemap, API discovery | Search and linked page reads |
| Verify a visual state | Fresh screenshot, then image read | Accessibility tree and DOM inspection |
| Search stock media | Image-search skill | Approved provider API |
| Work with video or audio | HyperFrames and media skills | Local CLI after route selection |
| Need a typed judgment | Jev skill | Human decision |
| Need external source evidence | Cited research note | Direct source reads in current session |

An explicit request for a tool is a task requirement. If it is unavailable or unsuitable, explain the limitation and proposed fallback. When no tool is specified, select from the task's needs and the client's actual capabilities.

## Human decision rules

The agent may choose execution details. Victor chooses:

- Product direction.
- Visual taste.
- Scope changes.
- Acceptance of high-fidelity prototypes.
- One-way doors.
- Public, financial, destructive, or credentialed effects.
- Whether to delegate to subagents when the global policy requires approval.

## Closure record

Every non-trivial task ends with:

1. Goal status: complete, partial, blocked, or rejected.
2. Route used.
3. Files or external surfaces changed.
4. Checks run and observed results.
5. Evidence that the intended behavior works.
6. Known limits and unresolved decisions.
7. External-effect and rollback notes.
8. A retro candidate only when the session exposed a repeatable process failure.

## Proposed implementation order

This order is a future build plan, not an approval to edit:

1. Reconcile local Matt skill copies and names.
2. Define the task card and closure record.
3. Build the local route table for existing skills.
4. Add source-shaped tool selection.
5. Add hooks for deterministic machine and Git guardrails.
6. Add project-level setup pointers and tracker configuration.
7. Pilot on three real tasks: research, a small code change, and a larger multi-session change.
8. Run retro on the pilot sessions and remove no-ops.

## Success criteria

- Victor can give a goal without repeating the global safety policy.
- The route is selected from task shape, not from a guessed keyword.
- The agent asks only load-bearing questions.
- The agent uses the correct skill and tool without a repeated reminder.
- The agent stops at a clear phase boundary instead of drifting.
- Every completion claim has direct evidence.
- The global instructions get shorter as deterministic checks and pointers improve.
