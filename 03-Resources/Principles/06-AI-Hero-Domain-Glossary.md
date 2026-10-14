> **One-line Summary**: These terms define the local language for routing work with agents; this file stores vocabulary, not implementation decisions.

# AI Hero Domain Glossary

## Route

A selected path through skills, tools, context boundaries, human gates, and verification for one task.

_Avoid:_ treating a skill name as the whole route.

## Task card

The short operating contract for non-trivial work: goal, mode, scope, risk, evidence target, stop condition, and allowed external effects.

_Avoid:_ repeating a large prompt template in every request.

## Phase

A coherent part of the work with one purpose and one completion condition, such as grilling, prototyping, implementation, or review.

_Avoid:_ using “phase” for every checklist item.

## Phase boundary

The point between two phases where the agent chooses whether to continue, clear, hand off, use a bounded subagent, or compact.

_Avoid:_ clearing context in the middle of a decision.

## Design tree

The decisions and dependent decisions that define a plan. A later decision cannot be settled until the decisions above it are clear.

_Avoid:_ a flat list of questions.

## Frontier

The current set of decisions or tickets whose prerequisites are settled and whose work is unclaimed.

_Avoid:_ “next item in the list” when blockers exist.

## Fog of war

An important decision that is visible as a need but not yet precise enough to ask or resolve.

_Avoid:_ treating an unknown question as an implementation ticket.

## Decision ticket

A ticket whose purpose is to resolve one question before implementation can proceed.

_Avoid:_ a decision ticket that contains production implementation work.

## Implementation ticket

A narrow, agent-ready piece of work that produces a demoable or verifiable behavior.

_Avoid:_ a horizontal layer ticket with no user-visible or independently verifiable result.

## Tracer bullet

A small end-to-end slice through the system that proves the risky path before the rest of the feature expands.

_Avoid:_ building whole layers before the first path works.

## Seam

A public boundary where behavior can be observed and tested without reaching inside the implementation.

_Avoid:_ a private helper chosen only because it is easy to mock.

## Feedback loop

A check that returns evidence during or after a change, such as a typecheck, test, lint, screenshot, or independent review.

_Avoid:_ a final summary with no observed result.

## Context pointer

A short reference that names another document and states when the agent must read it.

_Avoid:_ a weak link that names a file without its trigger condition.

## Smart zone

The part of a context window where the agent's reasoning remains strong before accumulated context degrades attention.

_Avoid:_ using a large context window as proof of reliable reasoning.

## Human-in-the-loop

Work where Victor remains present for decisions, high-risk actions, or high-fidelity judgment.

_Avoid:_ using autonomy for a task whose acceptance criteria are still subjective.

## Away-from-keyboard

Bounded autonomous work with a fixed scope, iteration cap, progress record, feedback loops, and review gate.

_Avoid:_ open-ended cleanup or unattended work with no stop condition.

## Deterministic guardrail

A check or hook that blocks or reports a known mechanical failure without relying on model obedience.

_Avoid:_ using a global prose rule for a condition a command can test.

## Closure evidence

The direct observation that supports a completion claim.

_Avoid:_ “tests should pass” without the command and result.
