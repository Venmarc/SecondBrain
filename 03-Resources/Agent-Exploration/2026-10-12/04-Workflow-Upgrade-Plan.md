---
title: Workflow Upgrade Plan from Agent Exploration — 2026-10-12
date: 2026-10-12
tags:
  - workflow
  - agent-ops
  - content-creation
  - jev
status: proposed
---

# Workflow Upgrade Plan from Agent Exploration — 2026-10-12

> **One-line summary:** Build one decision-first research and publishing loop before adding more agent infrastructure.

## Recommended architecture

```text
source
  → capture
  → deduplicate
  → Jev route
  → full read when needed
  → evidence note
  → local replication
  → prototype, content brief, or archive
  → human review
  → result log
```

## Phase 1 — Make the loop useful

### Inputs

- X bookmarks.
- X authored posts.
- Project files.
- Voice notes.
- Agentusecases.ai and other research sources.

### Routing questions

- Is this relevant to current work?
- Is the source complete enough for a claim?
- Does it suggest a PC-feasible action?
- Is the action a workflow, prototype, content idea, or money experiment?
- Does it require approval before an external effect?

### Stored output

Every retained item should contain:

- Source URL.
- Capture date.
- Evidence state.
- One-line claim.
- Why it matters here.
- Local replication.
- Smallest next proof.

## Phase 2 — Connect content to real work

Use the existing X resources and project evidence. Do not create content from browsing alone.

### Weekly cycle

1. Choose one shipped result, mistake, or decision.
2. Create three briefs:
   - One useful build.
   - One mistake explained.
   - One decision made easier.
3. Review the briefs for evidence and voice.
4. Draft selected pieces.
5. Publish after Victor's review.
6. Record audience response, effort, and useful replies.
7. Choose one next test.

## Phase 3 — Add design quality gates

Before a UI implementation:

1. Define the product concept.
2. Create three directions.
3. Choose one direction and state why.
4. Write the avoid list.
5. Render at the real target size.
6. Review hierarchy, repetition, spacing, motion, and generic patterns.
7. Refine only the failures found.

This supports the existing taste note and reduces generic AI output.

## Phase 4 — Add the money test

Do not build a large service or product first. Test one paid result.

### Candidate result

**AI-native website or workflow proof sprint**

Deliver one of these in seven days:

- A distinctive landing page direction with a working prototype.
- A content research and drafting loop for one founder.
- A small automation that turns an existing input into a useful report.

### Acceptance criteria

- One named buyer type.
- One repeated problem.
- One measurable output.
- One sample.
- One short delivery window.
- One price test.
- Five conversations or review requests.

### Kill conditions

- Nobody can name the problem without prompting.
- The result needs a large custom system before it has value.
- The buyer cannot judge the result quickly.
- The work creates no reusable proof.

## Phase 5 — Add scheduled work

After the manual loop works:

- Run a daily or weekly source scan.
- Save progress after each source.
- Avoid duplicates by URL and content hash.
- Keep a retry queue for failed extraction.
- Stop on action, spending, or approval limits.
- Verify that each file exists before marking the item complete.

## What not to build first

- A general autonomous agent fleet.
- A mass scraper.
- An autonomous trading system.
- A content publisher without review.
- A multi-agent orchestration layer that has no repeated task.
