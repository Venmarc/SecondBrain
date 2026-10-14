> **One-line Summary**: AI Hero v1.3 adds a complete closeout loop, renames the domain glossary, and makes the local router's next work clear.

# AI Hero v1.3: Next Lessons

**Date:** 2026-10-13

**Status:** Research complete; implementation candidates await approval.

## Sources

- [AI Hero skills catalogue](https://www.aihero.dev/skills) — current catalogue and v1.3 changelog.
- [v1.3 changelog](https://www.aihero.dev/skills/skills-changelog-v13-implement-spec-pr-retro-and-glossary-md) — release changes and migration rules.
- [`implement-spec`](https://www.aihero.dev/skills-implement-spec) — task-graph execution on one integration branch.
- [`pr`](https://www.aihero.dev/skills-pr) — Summary, Evidence, and Merge Danger format.
- [`retro`](https://www.aihero.dev/skills-retro) — environment improvement after difficult sessions.
- [Plan mode introduction](https://www.aihero.dev/plan-mode-introduction) — current note that grilling replaced plan mode for Matt's work.
- [AI Hero sitemap](https://www.aihero.dev/sitemap.xml) — current public route inventory.

## Live findings

### 1. The v1.3 closeout loop is the next router gap

The v1.3 main flow is:

```text
grill-with-docs → to-spec → to-tickets → implement-spec → code-review → pr → retro
```

The local machine already has `implement-spec`, `code-review`, `pr`, and `retro` skills.

The new router currently points to implementation and testing, but it does not make the closeout path explicit.

### 2. `pr` is a review format, not a publishing action

The `pr` skill defines three sections:

- **Summary** — the smallest visual that explains the change.
- **Evidence** — a before and after result.
- **Merge Danger** — one-way or two-way door plus blast radius.

It does not open, send, or publish a pull request by itself.

This fits the local human-gate policy.

### 3. `retro` changes the environment, not the code

The `retro` skill reads a real session and proposes improvements in seven areas:

- Navigation.
- Automated checks.
- Coding standards.
- Global steering files.
- Tool economy.
- No-ops.
- Information access.

Mechanical mistakes should become checks.

Judgment calls should become reviewer standards.

Useful navigation should become a pointer.

The skill waits for human selection before changing anything.

### 4. `implement-spec` is an explicit high-autonomy flow

The skill reads a spec and ticket graph, creates an integration branch, runs implementers in worktrees, merges frontier tickets, reviews the full branch, and stops on the branch unless a PR is required.

It needs:

- A configured issue tracker.
- Tickets with blocking edges.
- A harness that supports background subagents and worktrees.

The local policy requires approval before delegation.

Therefore, the router should expose `implement-spec` as an explicit user-selected route.

It should not invoke it automatically.

### 5. `CONTEXT.md` is now `GLOSSARY.md`

AI Hero v1.3 renames:

```text
CONTEXT.md      → GLOSSARY.md
CONTEXT-MAP.md  → GLOSSARY-MAP.md
```

The site says the rename has no behavior change, but local files must move together.

The local skill directory still contains many `CONTEXT.md` references.

The machine also has three existing project files named `CONTEXT.md` and no matching `GLOSSARY.md` files.

This is a real migration, not a text-only cleanup.

### 6. Matt's current view favors grilling over plan mode

The plan-mode article now states that Matt no longer uses plan mode as his default.

His stated reason is that plan mode can ask too few questions, jump to conclusions, and create plans that are too large.

He now prefers a conversation with the agent through `grill-with-docs`.

The local design already uses a design and approval gate before implementation.

No immediate route change is required.

## Recommended implementation order

### Next: classify project work before wiring the closeout loop

The closeout loop belongs to project and repository work.

It does not apply to every task an agent performs.

The work router should first classify the work as:

```text
project or repository work
non-project work
```

Only the first class enters the project closeout loop.

Non-project work closes with its own evidence:

| Work type | Closeout evidence |
| --- | --- |
| Research | Sources, claims, limits, and saved findings |
| Design | Reviewed artifact, rationale, and relevant checks |
| Publishing | Draft, sources, assets, and approval gate |
| Memory | Written path or confirmed service result |
| Media | Output file, duration, and render check |
| Live interaction | Observation, screenshot, or recorded result |

### Project closeout loop

Update the router so engineering work follows this path after implementation:

```text
implement → code-review → pr when a PR body is needed → retro when the session exposed a repeatable problem
```

Update the shared route card with:

- Review status.
- Evidence before and after.
- Door type.
- Blast radius.
- Retro candidate.

Add a `Work class` field to the route card.

This is the smallest useful change.

It uses skills that already exist.

It does not add subagent orchestration.

The router must not add `code-review` or `pr` to non-project work.

`retro` remains available as a separate user-invoked skill, but the router only suggests it as part of this project closeout path.

### Then: make skill handoffs harness-neutral

Replace route instructions that use slash commands with explicit Skill-tool names where a skill calls another skill.

Use the installed name `test-driven-development` instead of the shorthand `tdd` unless a local alias exists.

This matters for Claude, Codex, Gemini, OpenCode, Hermes, Grok, and omnirush support.

### Later: migrate domain files to `GLOSSARY.md`

Use a staged migration:

1. Update skill references and templates to the new names.
2. Move each existing project glossary with its links in one change.
3. Verify every pointer and project instruction.
4. Remove legacy-name references from the shared skills.

Do not rename the three existing project files until the migration plan is approved.

### Defer: automatic `implement-spec`

Keep it user-invoked until the machine has:

- A configured tracker.
- A tested worktree path.
- An approved delegation policy.
- A real multi-ticket pilot.

## Verdict

The first implementation should wire `code-review`, `pr`, and `retro` into the router closeout path.

The second implementation should make skill handoffs harness-neutral.

The glossary rename needs a separate migration decision.

`implement-spec` should remain opt-in.
