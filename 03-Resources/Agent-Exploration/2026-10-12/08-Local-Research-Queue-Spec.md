---
title: Local Research Queue Spec — 2026-10-12
date: 2026-10-12
tags:
  - workflow
  - jev
  - automation
  - agent-exploration
status: proposed
---

# Local Research Queue Spec — 2026-10-12

> **One-line summary:** A small, duplicate-safe queue can turn X cards and web sources into reviewed vault notes without creating an autonomous agent fleet.

## Purpose

Process recurring research inputs with visible progress and safe stop points.

## Queue record

Each record should contain:

```yaml
id: source-hash
source_url: https://example.com/source
source_kind: x-bookmark
captured_at: 2026-10-12T17:00:00Z
title: Source title
evidence_state: card | partial | full | primary
route: ignore | store | full_read | content | prototype | money_test
confidence: 0.0
summary: One sentence after review
local_replication: One PC-feasible action
status: captured | triaged | read | synthesized | reviewed | archived | blocked
attempts: 0
last_error: null
```

## State machine

```text
captured → triaged → read → synthesized → reviewed → archived
                         ↘ blocked
```

Rules:

- A duplicate URL cannot create a second active record.
- A card-only source cannot support a full-body claim.
- A `money_test` route must include a validation plan.
- A `prototype` route must include one user problem and one proof target.
- A reviewed note must contain a source URL and capture date.
- A failed source stays visible in `blocked` with its error.

## Decision split

Use code for:

- Deduplication.
- Action limits.
- Retry counts.
- File existence checks.
- State transitions.
- Approval gates.

Use Jev for:

- Relevance.
- Route selection.
- Evidence sufficiency.
- Prototype value.
- Publish readiness.
- Model or worker selection.

Use a generative model for:

- Full-text summaries.
- Comparisons.
- Drafts.
- Code.
- Explanations.

## Initial Jev questions

The first queue version should ask independent questions over the same source state:

```json
{
  "keep": {
    "type": "noul",
    "instructions": "Is this source useful for Victor's current projects, workflow, content, or a testable money experiment?",
    "criteria": {
      "true": "It leads to a concrete local action or improves a current decision.",
      "false": "It is generic hype, duplicated material, or an unsupported claim with no useful test."
    }
  },
  "route": {
    "type": "choice",
    "instructions": "Choose the next route for this source.",
    "criteria": {
      "store": "Store a concise source note",
      "full_read": "Open and extract the complete source",
      "content": "Use as a source for a reviewed content brief",
      "prototype": "Create a local prototype brief",
      "money_test": "Create a small validation plan",
      "ignore": "Do not retain it"
    }
  },
  "evidence": {
    "type": "choice",
    "instructions": "Classify the evidence available now.",
    "criteria": {
      "full": "Complete body text is available",
      "partial": "Some source text is available, but important sections are missing",
      "card": "Only a title, preview, or social card is available"
    }
  }
}
```

## Verification loop

After every action:

1. Read the result back.
2. Confirm the file or page state changed.
3. Save the queue record.
4. Rebuild the available options.
5. Stop on uncertainty or a failed read-back.

The queue must never mark a file as saved because a tool call returned successfully.

Use confidence by risk:

- Low-risk routing can act at a lower confidence after local testing.
- Medium confidence should collect more evidence or enter review.
- Low confidence should not choose a route.
- External effects need a higher threshold and a human approval step.

Jev currently accepts text, JSON, and arrays of text. It does not directly evaluate images, audio, or video. Extract captions, OCR, or transcripts first, then send the text and source metadata to Jev.

## Safe first rollout

### Manual run

- Process 20 X cards.
- Label them by hand.
- Compare the labels with Jev.
- Record false positives and false negatives.
- Adjust criteria before scheduling.

### Scheduled run

- Run once per day.
- Set a source limit.
- Set a full-read limit.
- Set a time limit.
- Save after every source.
- Write a short run report.

### Human review boundary

The queue may create research notes and drafts. It must stop before:

- Public publishing.
- Sending messages.
- Spending money.
- Modifying production data.
- Trading assets.
- Merging or deploying code.

## Official TypeSafe references

- [System One](https://docs.typesafe.ai/concepts/system-one.md) — typed decisions, probabilities, and text-only input.
- [Noul](https://docs.typesafe.ai/primitives/noul.md) — yes/no probability and true/false criteria.
- [Choice](https://docs.typesafe.ai/primitives/choice.md) — closed-set route selection and confidence.
- [Confidence-gated routing](https://docs.typesafe.ai/patterns/confidence-routing.md) — thresholds based on action risk.
- [Simple memory system](https://docs.typesafe.ai/cookbooks/basic_memory.md) — source-backed memory gating pattern.
