> **One-line Summary**: Matt Pocock's AI Hero workflow gives us a simple idea-to-ship spine, with explicit branches for research, prototypes, large efforts, implementation, review, and retrospectives.

# AI Hero Workflow Index

**Status:** Research complete; local operating model is a draft and is not implemented.

**Research date:** 2026-10-12

## Verdict

The strongest lesson is not a new agent framework. It is a small set of enforced phase boundaries.

1. Align on the goal before building.
2. Use the project's own language.
3. Preserve decisions before clearing context.
4. Build a small end-to-end slice.
5. Use deterministic feedback.
6. Review the result against both standards and the goal.
7. Improve the environment after each hard session.

Matt's public workflow is a route map, not a single mandatory script. The correct route depends on scope, uncertainty, fidelity, and whether the work came from us or from outside.

## Main idea-to-ship spine

```text
ask-matt
  → grill-with-docs
  → prototype when talking cannot settle a question
  → to-spec when the build spans sessions
  → to-tickets for tracer-bullet slices and blocking edges
  → implement or implement-spec
  → code-review
  → pr when a pull request is needed
  → retro
```

## Route branches

| Situation | Route | Output |
|---|---|---|
| The idea is vague | `grill-with-docs` | Shared understanding, glossary terms, and selected ADRs |
| No working directory exists | `grill-me` | Shared understanding without files |
| A question needs something visible or runnable | `handoff` → `prototype` → `handoff` back | A concrete answer that feeds the original discussion |
| The effort is too large for one session and the route is unclear | `wayfinder` | A decision map with a destination, fog, and frontier |
| A fact outside the working directory blocks a decision | `research` | A cited source note |
| The decisions are settled and the build is small | `implement` | Tested code and a commit |
| The decisions are settled and the build spans sessions | `to-spec` → `to-tickets` | A durable spec and dependency-aware tickets |
| Several tickets can safely run in parallel | `implement-spec` | One integration branch, with review at the end |
| A bug or request arrived from another person | `triage` | A verified, agent-ready brief or a recorded rejection |
| A bug is real but its cause is unclear | `diagnosing-bugs` | A reproduced failure, root cause, fix, and regression check |
| A branch has changed | `code-review` | Separate Standards and Spec findings |
| A pull request needs a reviewable body | `pr` | Summary, Evidence, and Merge Danger |
| A session exposed process failures | `retro` | Proposed navigation pointers, checks, standards, or pruning |

## Human gates

The agent can gather facts and execute approved work. Victor keeps ownership of decisions that shape the result.

- Confirm the shared understanding after grilling.
- Approve the route when the task crosses a phase boundary.
- Approve prototypes and high-fidelity choices.
- Approve ticket granularity and blocking edges.
- Review one-way doors and large blast radii.
- Approve any environment change proposed by `retro`.

## Context policy

At a phase boundary, choose in this order:

1. Continue if the next phase needs the current conversation.
2. Clear if everything behind the boundary is disposable.
3. Handoff if a new harness, directory, person, or side task needs portable context.
4. Use a bounded subagent only for a tightly scoped independent task.
5. Compact when the other choices do not fit.

Do not clear a grilling conversation before its decisions become code or a durable handoff artifact.

## Local adaptation needed

Matt's flow assumes repo-local engineering work, issue trackers, and optional subagents. Our machine also handles vault research, browser work, media work, and non-code tasks. We therefore need one local front door that routes by task shape, not only by skill name.

See:

- [Main flow and routes](01-AI-Hero-Main-Flow.md)
- [Agent document principles](02-Agent-Document-Principles.md)
- [Execution and autonomy](03-Execution-Quality-and-Autonomy.md)
- [Current system gap analysis](04-Current-System-Gap-Analysis.md)
- [Draft local operating model](05-Local-AI-Hero-Operating-Model-Draft.md)
- [Domain glossary](06-AI-Hero-Domain-Glossary.md)
- [Source map](07-AI-Hero-Source-Map.md)
- [Shared router architecture draft](08-Shared-Router-Architecture-Draft.md) — cross-agent routes, browser profiles, search tools, and Agent-Reach assessment
