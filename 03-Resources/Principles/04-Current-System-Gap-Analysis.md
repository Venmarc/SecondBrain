> **One-line Summary**: Our machine already has strong safety and skill coverage, but it lacks one local router, one task contract, and reconciled route rules.

# Current System Gap Analysis

## What already works

- A universal constitution exists for all session types.
- The vault has clear boot, ingest, query, lint, and session rules.
- Matt's key skills are installed under the shared skills directory.
- `skill-router` already targets agent-agnostic classification and pointer injection.
- Provider routing has explicit cost, latency, capability, and reliability states.
- Verification-before-completion is a named skill.
- The vault records sessions and reusable lessons.
- External effects, commits, pushes, destructive cleanup, and subagents have explicit safety boundaries.

## Gap 1: No single local front door

The installed `ask-matt` router knows Matt's skill set. It does not know our media, vault, browser, Supabase, accessibility, design, Jev, or HyperFrames routes.

Result: the user still has to name a tool or skill that the local router should have selected.

Stronger alternative: add one local router that classifies the task by situation, not keyword, and returns the next route with its human gate.

## Gap 2: Local skill copy is behind the public workflow

The public AI Hero site documents the v1.3 convention as `GLOSSARY.md` and `GLOSSARY-MAP.md`.

Our local `ask-matt` and domain-modeling guidance still uses `CONTEXT.md` in places. The local `ask-matt` also mentions a removed merge-conflict skill that is not present in the current installed list.

Result: the route can send an agent to stale names or missing skills.

Stronger alternative: reconcile local skill copies against the current first-party source before building new routing on top of them.

## Gap 3: Research and subagent rules conflict

Matt's research and implement-spec flows assume background agents or implementer subagents.

Our constitution says not to start subagents unless Victor requests or approves them. The installed research skill tells the agent to create a background agent.

Result: a skill can instruct a behavior that the machine constitution forbids.

Stronger alternative: the local route must resolve this before invocation. Use direct research by default. Use subagents only after an explicit approval or a task-specific permission.

## Gap 4: Tool selection is not encoded as a route

The machine has multiple overlapping tools for web research, live browser work, source extraction, image search, media work, and visual verification.

The current constitution says which tools exist, but it does not give one task-shaped selection ladder.

Result: Victor repeats tool requests such as “use Firecrawl,” even when another approved tool is better for the current source.

Stronger alternative: define a tool policy that selects by source shape and task risk:

1. Live interaction → browser MCP when available.
2. Clean article extraction → Defuddle.
3. Machine-readable site → sitemap, `llms.txt`, API discovery, or Markdown twins first.
4. Visual judgment → screenshot and image read.
5. Search or stock media → the dedicated media skill.
6. Script only when the approved tool cannot perform the required operation, with the reason recorded.

## Gap 5: No task contract

Most prompts contain an idea, but not always a goal, scope, risk, evidence target, stop condition, or allowed external effects.

Result: the agent must infer the operating contract and may stop at a plausible intermediate result.

Stronger alternative: use a short task card for non-trivial work. The card should be generated or filled during routing, not pasted into every prompt by Victor.

## Gap 6: Context boundary rules are not one machine-wide route

The current constitution mentions compaction and session logs. Matt's route adds a more precise choice between continue, clear, handoff, bounded subagent, and compact.

Result: agents can clear too early, keep a bad context too long, or hand off without a durable pointer.

Stronger alternative: make the phase-boundary tree part of the local router and require a handoff artifact when decisions must cross a context boundary.

## Gap 7: Completion evidence is distributed

The vault and skills contain verification rules, but a task does not always end with one compact evidence record.

Result: a final summary can list actions without proving the intended behavior.

Stronger alternative: every non-trivial task ends with goal status, changed files, checks run, observed evidence, unresolved gaps, and merge or external-effect danger.

## Gap 8: The environment has no closed retro loop

`retro` exists, but it is not yet a standard closing route for hard sessions. The current system can record what happened without always turning the cause into a pointer, check, standard, or tool improvement.

Stronger alternative: use retro selectively after difficult sessions and keep only accepted improvements.

## Immediate priority order

1. Reconcile local Matt skills with the current first-party v1.3 names and route behavior.
2. Define and approve a local task card and phase-boundary route.
3. Build a machine-wide `ask-victor` router over local skills and tools.
4. Add a source-shaped tool selection policy.
5. Add deterministic guardrails for known machine risks.
6. Run the new route on real work and use `retro` to prune it.

No machine-wide configuration has been changed by this research pass.
