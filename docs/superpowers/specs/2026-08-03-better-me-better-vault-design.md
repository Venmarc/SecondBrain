# Better Me, Better Vault Design

> **One-line Summary**: A small decision-support and publishing system that makes the vault improve Victor's judgment and ship evidence of his development without replacing the engineering memory that already works.

**Date:** 2026-08-03
**Status:** Design approved in conversation; implementation pending review of this written spec

## Goal

By August 31, the vault should reliably help Victor make better decisions and publish his development rather than merely preserve agent activity. The system must preserve project and session continuity, avoid exhaustive personal migration, and make publication and decisions the outputs that count.

## Success Definition

The informal "70–80%" target is an outcome target, not a file-count target. The August trial reaches its target when the vault has supported:

- Four weekly decision reviews.
- At least one consequential decision, concrete next action, or explicit evidence-gathering condition per review.
- Rationale and evidence recorded for tracked decisions.
- At least three decisions, including one each in product/craft, learning/creation, and time/priorities.
- At least two decision reviews against what actually happened.
- At least eight published X posts and four published LinkedIn posts.
- At least four posts sourced from real vault material.
- At least two posts about personal development or systems.
- At least two posts teaching something grounded in actual experience.
- At least one post based on an unresolved question or active tension.

Likes and reach are secondary learning evidence during August. They do not determine whether Victor succeeded at shipping.

## Non-Goals

- Exhaustive migration of iPhone notes, personal notes, or voice notes.
- A new privacy taxonomy or local-only vault workflow.
- Rebuilding PARA, the graph, or the existing engineering/session-memory system.
- Turning the vault into an autonomous agent orchestration system.
- Optimizing posts indefinitely before publishing.
- Adding an artifact that cannot explain which decision, behavior, or publication it improves.

## Consent Boundary

Anything Victor deliberately pushes into the vault is available for agent-assisted reading and processing. Material he is uncomfortable sharing stays outside the vault and is not part of the intake workflow. No extra privacy lanes, redaction routine, encryption layer, or separate private area is required for this version.

## Operating Model

The system has two connected loops and one shared source pool:

```text
Relevant source -> question -> evidence -> decision -> rationale -> next action -> review
                         |
                         v
                 post angle -> platform -> one revision -> publish within 48h -> result
```

### Decision Support Loop

The agent helps Victor examine a live choice or recurring problem by asking:

- What is the actual situation?
- What options are being considered?
- What evidence supports each option?
- What constraints, fears, or tradeoffs are influencing the choice?
- What would change the decision?
- What is the next action and when will it happen?

A decision record is useful only when it contains a rationale and a next action. If a decision cannot yet be made, it must name the missing evidence and a review condition/date.

### Publishing Loop

The agent looks for publishable material in:

- Build journey: decisions, bugs, failures, pivots, and lessons.
- Personal systems: vault discoveries, workflow changes, priorities, and reflections.
- Teach what worked: practical explanations grounded in something Victor actually tried.
- Open questions: tensions and unfinished ideas stated honestly.

The weekly minimum is two X posts or threads and one LinkedIn post. X is the primary experimentation surface; LinkedIn is the more contextual development record. One underlying idea may be adapted for both platforms, but unchanged duplication does not count as two pieces.

Once an idea is selected, it must be published within 48 hours. Agents get one assisted revision pass after the initial draft. A draft that remains in the vault does not count. Victor may publish rough, revise once, or explicitly kill the idea with a reason.

## Weekly Review

Victor runs one review of approximately 30 minutes, with permission to continue when useful. The review order is:

1. Review unfinished decisions and evidence from prior actions.
2. Identify what changed, what matters, what should be cut, and what is being avoided.
3. Choose at least one decision or evidence-gathering action.
4. Select enough publishable ideas to meet the weekly posting minimum.
5. Assign each selected idea a platform and a 48-hour deadline.
6. End with explicit next actions, not more organization.

The review fails if it produces no decision, next action, or evidence-gathering condition. It also fails to meet the publishing target if ideas remain drafts past their deadline without an explicit kill decision.

## Agent Responsibilities

Agents may:

- Read vault material Victor has deliberately pushed.
- Surface contradictions, recurring patterns, forgotten commitments, and useful evidence.
- Ask direct questions when a note contains activity without judgment.
- Propose a decision record or post angle.
- Draft one revision of a selected post.
- Record the resulting decision, publication URL, or explicit kill reason.

Agents may not:

- Decide what Victor believes without asking or citing evidence.
- Treat note volume, graph health, or completed maintenance as personal progress.
- Turn every source into a permanent note.
- Keep polishing a post after the one-revision limit.
- Start orchestration pipelines or invent hierarchy among agents.

Victor remains the decision-maker and publisher. The system can fail because Victor does not capture, decide, or publish; it must not hide that failure by generating more records.

## First-Week Trial

Before expanding the system, test the flow with three real inputs:

- One relevant iPhone or personal note.
- One voice note or transcript.
- One overprocessed agent/project note.

For each input, ask whether it produces a better decision, a publishable angle, both, or neither. If neither, do not create a permanent artifact merely to prove ingestion worked.

Initial content candidate:

> The vault grew from one graph node to hundreds during July, then Victor discovered it remembered agent sessions better than it represented him or improved his decisions.

This should be shipped as an honest development post before attempting a definitive "how to build your own vault" thread. The thread can follow once the August trial provides evidence about what actually works.

## Existing Machinery

`vault-librarian.js` and `harvest.js` remain supporting tools, not the operating model. Their current prompts are biased toward inbox, lint, project gaps, lesson language, and technical extraction. They should be used during the trial only where they expose a decision or publishable insight. Any script change must demonstrate that it improves questioning or follow-through rather than producing more notes.

## Promotion, Compression, and Retirement

- Promote raw material only when it changes a decision, behavior, future retrieval, or a publishable explanation.
- Keep current truth separate from historical evidence where confusion would affect a decision.
- Compress repeated material into the smallest useful synthesis while retaining links to important source history.
- Archive historical material that still provides provenance but no active decision value.
- Delete or retire prompts, templates, or scripts that produce no useful decision, behavior change, or publication within 14 days of use.

## Open Risks

- The target depends on Victor doing the capture, decision, and publication work; the system cannot automate motivation.
- A 30-minute review may still become maintenance theatre unless the failed-review rule is enforced.
- X and LinkedIn output can become performative if posts stop being grounded in actual development.
- The skill-router project is currently represented as architecture-decided but implementation-unverified; future vault summaries must preserve that distinction.
