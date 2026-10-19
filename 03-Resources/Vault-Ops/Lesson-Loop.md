> **One-line Summary**: The lesson loop turns verified agent corrections into direct facts or rules in the narrowest durable destination, while unresolved routing decisions wait in Inbox.

# Lesson Loop

**Status:** Implemented locally — direct extraction, Clef routing, Inbox decisions, replay protection, and daily processing.

## Operating rule

Do not create a retrospective report for each run.

Process a correction into a durable fact or rule as soon as the evidence supports it. Store the reason and evidence with that fact or rule. Keep only operational run metadata in the lesson-loop ledger.

## Flow

```text
session observations
  → correction correlation
  → candidate queue
  → Clef classification
  → direct durable extraction
  → agentmemory lesson

unclear destination or weak evidence
  → 00-Inbox decision item
```

The loop processes no more than three durable lessons per run. It merges repeated candidates by normalized content and adds new evidence instead of creating duplicate queue items.

## Durable destinations

Clef can route an extraction to the narrowest valid destination:

- **Project hub** — project-specific behavior under `## Lessons log`.
- **03-Resources** — reusable principles, tools, references, skills, or other existing resource notes.
- **03-Resources/Skills** — cross-project agent behavior that belongs in an existing skill.
- **02-Areas** — durable operating guidance that belongs to an area.
- **Engineering guardrail** — a check or test that should prevent a mechanical repeat failure. This route goes to Inbox until Victor selects the implementation target.
- **00-Inbox** — unclear scope, conflicting evidence, or a destination that needs Victor's choice.

Resources are a normal extraction destination. Agent-Ops is not the default destination for every cross-project lesson.

The loop updates existing Markdown files. It does not create a retro archive. It does not write to `raw/` or `Clippings/`.

## Evidence shape

Each durable extraction contains:

- A direct **Fact** or **Rule** statement.
- A short **Why** statement.
- Source session or observation IDs.
- A stable extraction ID for idempotent writes.

Example:

```text
Rule: Build and verify operational adapters, not only route documentation.
Why: A route table can appear complete while its adapter cannot perform the work.
Evidence: the source session and the preceding tool observations.
```

## Inbox decisions

Inbox contains only unfinished human decisions. A decision item must state:

1. The proposed fact or rule.
2. The reason the loop stopped.
3. The evidence IDs.
4. The valid destination options.
5. The command that resolves the item.

After Victor chooses, `lesson-loop resolve` writes the extraction and removes the loop-created decision item.

## Clef boundary

Clef classifies:

- Fact or rule.
- Durable destination.
- Evidence confidence.

Clef does not invent a destination path, rewrite the user's correction, approve an external action, or replace a deterministic check. If Clef is unavailable, the loop uses a safe fallback and sends ambiguous candidates to Inbox.

## Run ledger

The runtime ledger records only:

- Run time and command.
- Sessions reviewed.
- Candidates created.
- Destination files changed.
- Inbox items created.
- Agentmemory save status.
- Clef fallback or error status.

The ledger is operational metadata. It is not the durable lesson store and does not belong in the vault.

## Commands

```bash
lesson-loop record --session-id SESSION --content "..."
lesson-loop record --session-id SESSION --content "..." --triage --only-correction
lesson-loop correlate
lesson-loop candidates --status pending
lesson-loop validate
lesson-loop resolve LESSON_ID --destination 03-Resources/Principles/FILE.md
lesson-loop resolve LESSON_ID --discard
lesson-loop export
lesson-loop run
```

The daily timer runs `lesson-loop run` at 09:00 local time. It uses a lock, persistent scheduling, and bounded execution.

## Safety rules

- Never store secrets or raw private payloads in a candidate, lesson, Inbox item, or ledger entry.
- Never replay an agentmemory save for the same extraction after it succeeds.
- Search agentmemory before saving a lesson so a retry can acknowledge an existing save without strengthening it.
- Require correlated evidence before unattended durable writes. A human-resolved Inbox item records the decision separately.
- Never treat a Clef result as completion evidence.
- Never write a lesson only because a user sounded frustrated.
- Never delete source session history during extraction.

**Tags:** #vault-ops #lesson-loop #agent-memory #durable-rules
