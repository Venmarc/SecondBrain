> **One-line Summary**: Agents become reliable when each step has a tight feedback loop, a small scope, and a clear human gate.

# Execution Quality and Autonomy

## Feedback is the speed limit

The agent should receive fast evidence after every meaningful change.

Useful loops include:

- Typechecking.
- Focused tests.
- Full tests at the end.
- Linting.
- Browser or visual checks for interface work.
- Pre-commit checks.
- Independent review against the goal and standards.

The agent's summary is a claim. The command output, screenshot, test result, or diff is evidence.

## TDD at a seam

TDD starts by agreeing where behavior will be observed.

Use one public seam at a time. Write one failing test. Make only enough code pass. Repeat.

Avoid:

- Tests coupled to internal functions.
- Tests that compute the expected result with the same logic as the implementation.
- A batch of tests written before any behavior works.
- Mocks around the project's own modules.

Mocks belong at external boundaries such as payment APIs, time, randomness, and sometimes the filesystem or database.

## Deep modules and grey boxes

The agent navigates a codebase better when a large behavior sits behind a small, explicit interface.

That boundary is the seam. Tests lock the behavior at the boundary. The implementation inside can change without forcing the agent to understand every internal file.

This is a grey-box model:

- Victor owns the interface and behavior.
- The agent owns the implementation under the interface.
- Tests and type checks keep the implementation honest.

## Tracer bullets

Build one thin path through the whole system before expanding the feature.

The first slice should prove the risky integration point. It should not build an entire backend layer, then an entire API layer, then an entire UI layer before anything runs.

## Risk order

Use human-in-the-loop work for:

1. Architecture and core abstractions.
2. Integration points.
3. Unknown unknowns.
4. External effects.
5. Product taste and high-fidelity behavior.

Use bounded autonomy for routine implementation after the foundation is proven.

## HITL before AFK

Autonomous loops should follow this progression:

1. Run one iteration while watching.
2. Refine the scope, prompt, and feedback loops.
3. Cap the number of iterations.
4. Keep one logical change per iteration or commit.
5. Track progress in a short-lived progress file.
6. Run all required checks before each commit.
7. Review every commit or the final branch before integration.

Do not use AFK execution for open-ended cleanup. Give the loop a precise end state, explicit exclusions, and a stop condition.

## Context hygiene

Fresh context is a quality tool. A new iteration should read the durable task scope, progress, current files, and Git history instead of carrying the whole prior transcript.

Do not clear a design session before its decisions have become code or a handoff artifact.

Use compact only when continue, clear, handoff, and a bounded independent task do not fit the phase boundary.

## Sandbox and guardrails

AFK work should run in a sandbox when possible. The sandbox limits where the agent can act, but it does not replace command-level Git guardrails.

Hard-block dangerous commands such as force push, hard reset, destructive clean, and branch deletion unless Victor explicitly enables them for the current task.

Use a positive message that tells the agent which safe command or route to use instead.

## Session-derived confirmations

- A configuration change is not verified until a new runtime instance loads it.
- Context compaction and session summarization are different operations. Compacting preserves the current turn; summarization records the completed session.
- Do not use invented scenarios or nonexistent files to test instruction compliance. Validate the real environment and real work.
- Keep high-fidelity taste checks, architecture choices, and destructive actions human-gated even when automated checks pass.
- Do not declare an open-ended cleanup complete without a fixed scope, an exclusion list, and a stop condition.

These confirmations came from the full 2026-08 through 2026-10 session extraction pass. Current operating policy remains in the constitution and Agent Ops notes.
