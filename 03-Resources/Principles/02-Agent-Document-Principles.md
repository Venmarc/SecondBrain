> **One-line Summary**: Good agent documents spend permanent context on undiscoverable rules and use pointers for branch-specific knowledge.

# Agent Document Principles

## 1. Keep always-loaded instructions small

`AGENTS.md` and `CLAUDE.md` load before the task. Every line spends context and instruction budget on every request.

Keep only material that is both:

- Relevant to every task at that scope.
- Not discoverable from the environment.

Move branch-specific rules into pointed documents or skills.

Do not generate a large instruction file from an initialization command. Generated summaries duplicate source files, become stale, and can mislead the agent.

## 2. Use progressive disclosure

An agent document has three useful levels:

1. An in-file step for actions every branch needs.
2. An in-file reference for a flat set of rules the current branch needs.
3. A context pointer to a document that only one branch needs.

A pointer must say what the target contains and when to read it. A weak pointer creates a routing failure.

## 3. Write steps with completion criteria

Every step needs a visible done condition.

The condition must be clear enough to prevent premature completion and demanding enough to require the needed legwork.

Examples:

- “Check the fixed point resolves and the diff is non-empty.”
- “Run the focused test and record the failing observation before editing.”
- “Verify every changed behavior against the spec, then report evidence.”

“Make sure it works” is not a completion criterion.

## 4. Prefer leading words

One established term can replace a repeated explanation:

- `tracer bullet` means a small end-to-end slice.
- `seam` means a public boundary where behavior can be observed.
- `frontier` means work that is unblocked and ready.
- `fog of war` means decisions that are visible but not yet precise.
- `smart zone` means the part of the context window where reasoning remains strong.

Use the same terms in prompts, skills, tickets, and reports.

## 5. Prune no-ops

Delete any sentence that does not change the agent's behavior.

Do not duplicate commands already visible in `package.json`, `--help`, or a standard directory layout. Preserve only the convention, reason, or failure mode that the environment cannot reveal.

## 6. Use deterministic guardrails for deterministic rules

If a rule can be checked mechanically, write a check or hook. Do not spend global instruction budget on a sentence that can still be ignored.

Use prose for judgment calls that require human or reviewer assessment.

Examples:

- Wrong package manager → pre-tool hook.
- Dangerous Git command → pre-tool hook.
- Required typecheck → automated check.
- “Matches the product's visual language” → reviewer standard.

Pair a hard guardrail with the positive allowed action so the agent knows how to continue.

## 7. Make vocabulary stateful, but keep it pure

A project glossary stores the project's terms and their meanings. It does not store the full spec, a task list, or a session diary.

Write a term when it becomes canonical. Keep rejected synonyms under an `_Avoid_` label. Offer an ADR only when the decision is hard to reverse, surprising without context, and the result of a real trade-off.

The current AI Hero site calls this file `GLOSSARY.md`. Our installed local router still names `CONTEXT.md` in places. Reconcile this before relying on domain-modeling across new repos.

## 8. Give the reviewer room

The implementation agent carries exploration, code, and debugging context. The reviewer has less context pressure and can apply standards more reliably.

Put judgment-call standards where the reviewer reads them. Put mechanical rules in checks. Keep `AGENTS.md` as a navigation layer, not a standards dump.

## 9. Treat the environment as the source of truth

Code, config, scripts, package manifests, and command output reveal facts. A document should cache facts only when finding them is expensive or the reason is not visible in the files.

Stale path maps are dangerous. Describe capabilities and navigation hints instead of fixed implementation paths when the paths change often.
