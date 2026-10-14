> **One-line Summary**: The AI Hero main flow routes work by uncertainty and scope, then turns settled decisions into small, testable, reviewable changes.

# AI Hero Main Flow and Routes

## The route map

### 1. Choose the situation

Start with a router when the next action is unclear. The router should name the next skill or sequence and stop. It should not silently invoke the route it recommends.

This prevents keyword matching from sending a vague idea directly to implementation.

### 2. Align before building

Use `grill-with-docs` in a working directory. It runs the grilling interview and domain-modeling discipline together.

The interview walks the design tree. It asks the current frontier of independent questions, gives a recommended answer for each question, and waits for Victor's decisions.

Facts that the codebase can answer should be read from the codebase. Decisions that only Victor can make remain with Victor.

The session ends at shared understanding. It does not end by quietly starting implementation.

### 3. Detour when talking cannot settle the question

Some questions are low fidelity. Conversation can settle them.

Some questions are high fidelity. The answer needs a runnable artifact, a visual comparison, or real tool behavior.

Use this route for high-fidelity questions:

```text
grill → handoff → prototype → handoff back → grill
```

Do not spend a long conversation guessing about a UI, state model, or external integration that a small prototype can answer.

### 4. Map large, unclear efforts

Use `wayfinder` only when the effort exceeds one session and the route to the destination remains unclear.

The map is an index of decision tickets. It contains:

- Destination: the agreed end state.
- Decisions so far: links to resolved decisions.
- Not yet specified: the fog of war.
- Out of scope: work beyond the destination.
- Frontier: open, unblocked, unclaimed decisions.

Wayfinder plans. It does not build. A cleared map returns to `to-spec`.

### 5. Research outside facts

Use a cited research note when an external fact blocks a decision. Research should answer a narrow question from primary sources.

The result is evidence for the next grilling or specification step. It does not make the product decision by itself.

For local work, use a direct research pass when the runtime forbids autonomous subagents. Do not force the background-agent pattern into a machine policy that requires human approval for delegation.

### 6. Preserve the decisions

If the work fits the current context, implement directly.

If the work spans sessions, run `to-spec` before clearing. The spec records decisions already made. It does not reopen the interview.

`to-spec` should confirm the smallest useful test seams before writing the spec. The spec should include real out-of-scope decisions, not generic project-management filler.

### 7. Slice the destination

Use `to-tickets` when a settled build spans sessions.

Each ticket is a tracer bullet:

- It cuts through the full path of the change.
- It is independently demoable or verifiable.
- It fits one fresh context window.
- It declares genuine blockers.

Do not split a feature into database, API, and UI layers unless the work is a wide mechanical refactor. For wide refactors, use expand, migrate, and contract stages.

### 8. Implement at agreed seams

Use `implement` for one ticket or a small settled build.

The intended run is:

1. Read the ticket or spec.
2. Confirm the agreed seams.
3. Run a red test at one seam.
4. Write the smallest code that turns it green.
5. Repeat for the next behavior.
6. Typecheck and run focused tests while working.
7. Run the full suite at the end.
8. Review the result before committing.

Use `implement-spec` only when Victor explicitly approves parallel implementation and the runtime supports safe worktree isolation.

### 9. Review the result

Run `code-review` against a fixed point after the code is committed or otherwise visible in the diff.

Keep two review axes separate:

- Standards: Is the change built according to the project's rules?
- Spec: Does the change satisfy the agreed goal?

Do not merge the axes into one overall score. A change can be built correctly and still solve the wrong problem.

### 10. Explain the change

When a pull request is needed, use this body shape:

- Summary: the smallest visual that shows the change.
- Evidence: a before and after, not a claim that tests passed.
- Merge Danger: one-way or two-way door, plus blast radius.

### 11. Improve the environment

Run `retro` after a session that was harder than it should have been.

Classify each finding before changing anything:

- Navigation gap → add a pointer.
- Mechanical failure → add or connect a deterministic check.
- Reviewer judgment gap → add a rule to reviewer standards.
- Global steering bloat → move or delete it.
- Tool waste → streamline the tool path.
- Missing access → provide the smallest useful read-only access.

`retro` proposes. It does not change the environment without approval.

## On-ramps

| Incoming situation | On-ramp | Exit |
|---|---|---|
| External bug or feature request | `triage` | Agent-ready brief, a question, or a recorded rejection |
| Broken behavior with unknown cause | `diagnosing-bugs` | Reproduced failure and regression-safe fix |
| Large effort with unclear route | `wayfinder` | Decision map, then `to-spec` |
| External fact blocking a decision | `research` | Cited evidence, then the main flow |

## What this flow does not do

- It does not let an agent invent a product decision because the prompt was vague.
- It does not let a plan replace a prototype when the question is visual or behavioral.
- It does not let a task graph hide missing blockers.
- It does not treat passing tests as proof that the intended product behavior exists.
- It does not run autonomous loops on risky work without a bounded scope and a review gate.
