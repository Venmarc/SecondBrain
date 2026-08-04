# Better Me, Better Vault Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the smallest usable decision-support and publishing loop to Victor's vault so it improves decisions and ships development evidence without weakening existing project and agent continuity.

**Architecture:** Add one operational playbook under `03-Resources/Vault-Ops/`, one compact weekly review note/template, and one publishing tracker under the existing Content Creation area. Personal sources are selectively pushed into the vault and processed by consent. Existing scripts remain unchanged for the first trial; their usefulness is evaluated against real inputs before any code edit.

**Tech Stack:** Obsidian-flavored Markdown, existing PARA structure, existing `vault-librarian.js` and `harvest.js` CLI scripts, filesystem wikilink scanner/lint workflow.

## Global Constraints

- The informal 70–80% target is measured by decisions and publications, never file count, backlinks, or maintenance volume.
- Four weekly reviews must produce a decision, next action, or explicit evidence-gathering condition.
- Each tracked decision needs rationale, evidence, and a next action.
- Weekly publishing minimum: at least 2 X posts or threads and 1 LinkedIn post.
- A selected post must be published within 48 hours and receives no more than one assisted revision.
- Anything Victor deliberately pushes into the vault is agent-readable by consent; uncomfortable material stays outside the vault.
- Do not rebuild PARA, migrate everything, add autonomous orchestration, or create privacy bureaucracy.
- Preserve Port Sites as product truth, project hubs as current-state entry points, and session logs as historical continuity.
- Do not modify `Clippings/` or `raw/` originals.
- Every structural change updates `index.md` and `CHANGELOG.md`.
- A new artifact must identify the decision, behavior, or publication it improves; otherwise it is rejected or retired.

---

## File Map

**Create:**

- `03-Resources/Vault-Ops/Better-Me-Better-Vault.md` — operational playbook for the two connected loops, review rules, promotion/retirement, and agent behavior.
- `Templates/Decision Record Template.md` — compact record for rationale, evidence, decision, next action, and review condition.
- `Templates/Publishing Record Template.md` — compact record for idea source, platform, deadline, revision, URL, and outcome.
- `05-Daily/weekly/2026-08-09.md` — first weekly review/trial record, populated only after Victor performs the review.

**Modify:**

- `AGENTS.md` — add the playbook to vault workflows and explicitly route agents toward decisions and publication instead of maintenance theatre.
- `index.md` — add the playbook and active publishing/weekly-review entry points without making the hub a dashboard.
- `CHANGELOG.md` — record the structural additions and the skill-router status clarification.
- `BRAIN.md` — align active focus with skill-router's top-priority but implementation-unverified state.
- `02-Areas/Content-Creation/Content-Creation.md` — broaden the area from sports clipping to Victor's development publishing lane, while preserving the existing clipping material as historical/current context.

**Create from verified source state:**

- `01-Projects/skill-router/skill-router.md` — restore the hub referenced by `index.md` and `CHANGELOG.md`, using the cloned repository as implementation truth and distinguishing decided architecture from unverified implementation.

**Evaluate, do not modify initially:**

- `scripts/vault-librarian.js` — test whether generated questions expose decisions or only structural gaps.
- `scripts/harvest.js` — test whether candidates produce personal synthesis or only technical lessons.

---

### Task 1: Add the Operating Playbook

**Files:**
- Create: `03-Resources/Vault-Ops/Better-Me-Better-Vault.md`
- Reference: `docs/superpowers/specs/2026-08-03-better-me-better-vault-design.md`

**Interfaces:**
- Consumes: relevant pushed personal sources, project/session notes, decisions, and published-post records.
- Produces: the operating rules used by Victor and all agents during capture, review, decision-making, and publishing.

- [ ] **Step 1: Create the playbook with the approved design distilled into operating rules.**

Include these exact sections:

```markdown
# Better Me, Better Vault
> **One-line Summary**: Decision-support and development-publishing loop for making the vault improve Victor's judgment and ship evidence of growth.

## Purpose
## August Success Test
## Consent Boundary
## The Two Loops
## Weekly Review: 30 Minutes
## Publishing Rule: 48 Hours, One Revision
## Agent Questions
## What Gets Promoted
## What Gets Archived or Retired
## Organized Avoidance Test
## First-Week Trial
## Related
**Tags:** #vault-ops #decision #publishing #personal-growth
```

Use the approved spec as source material, but write this note as a usable operating manual rather than a design document. Link the decision and publishing templates, Content Creation area, and the first weekly review location when it exists.

- [ ] **Step 2: Verify the playbook contains no new privacy lanes, exhaustive migration plan, or autonomous-agent workflow.**

Run: `rg -n "privacy lane|redact|encrypted|private vault|orchestrat|migrate everything|file count" 03-Resources/Vault-Ops/Better-Me-Better-Vault.md`

Expected: only explicit non-goal or consent-boundary language; no operational privacy bureaucracy or orchestration instructions.

- [ ] **Step 3: Run whitespace validation.**

Run: `git diff --check`

Expected: no output.

---

### Task 2: Add Decision and Publishing Capture Templates

**Files:**
- Create: `Templates/Decision Record Template.md`
- Create: `Templates/Publishing Record Template.md`

**Interfaces:**
- Consumes: answers from Victor and evidence surfaced by agents.
- Produces: records that are short enough to complete during the weekly review and rich enough to support later judgment.

- [ ] **Step 1: Create the decision template.**

Use this exact minimum shape:

```markdown
# Decision: <short title>
> **One-line Summary**: <the choice and why it matters>

**Date:** YYYY-MM-DD
**Domain:** product/craft | learning/creation | time/priorities
**Status:** active | reviewed | superseded | deferred
**Review date/condition:** <date or evidence that will trigger review>

## Situation
## Options Considered
## Evidence
-
## Decision
## Rationale
## Next Action
- **Owner:** Victor
- **Due:** YYYY-MM-DD
- **Action:**
## What Would Change My Mind
## Outcome Review
- **What happened:**
- **What I learned:**

**Tags:** #decision
```

- [ ] **Step 2: Create the publishing template.**

Use this exact minimum shape:

```markdown
# Post: <short title>
> **One-line Summary**: <the development evidence or question this post ships>

**Selected:** YYYY-MM-DD
**Platform:** X | LinkedIn
**Source:** [[source note]]
**Deadline:** YYYY-MM-DD HH:MM
**Status:** idea | drafted | revised | published | killed

## Angle
## Draft
## One Revision
## Publication
- **URL:**
- **Published:**
## Evidence After Publishing
- **Useful reply/conversation:**
- **What I learned:**

**Tags:** #publishing #x #linkedin
```

- [ ] **Step 3: Check that both templates require action/output fields, not just metadata.**

Run: `rg -n "Rationale|Next Action|Draft|Deadline|URL|What I learned" "Templates/Decision Record Template.md" "Templates/Publishing Record Template.md"`

Expected: every named field appears at least once.

---

### Task 3: Integrate the Loops Into Vault Navigation and Agent Rules

**Files:**
- Modify: `AGENTS.md`
- Modify: `index.md`
- Modify: `02-Areas/Content-Creation/Content-Creation.md`
- Modify: `CHANGELOG.md`

**Interfaces:**
- Consumes: playbook and templates from Tasks 1–2.
- Produces: discoverable entry points and agent behavior that points to decisions and publishing.

- [ ] **Step 1: Add a `Better Me, Better Vault` subsection to `AGENTS.md`.**

Add it after the existing Query Workflow and before Lint Workflow. State:

- Personal material is selectively ingested when Victor pushes it.
- Agents must ask whether a source improves a decision, behavior, or publishable explanation.
- The weekly review is approximately 30 minutes.
- A review must end in a decision, next action, or evidence condition.
- Selected posts must ship within 48 hours with one assisted revision.
- Agents must not convert the workflow into more folders, backlinks, or autonomous orchestration.

- [ ] **Step 2: Add three concise links to `index.md`.**

Add the playbook and both templates under the existing Resources/Tools navigation. Add a `Weekly Review` line under Agent Sessions or Vault Health pointing to `05-Daily/weekly/` once that directory exists.

- [ ] **Step 3: Update `Content-Creation.md` without deleting clipping history.**

Change the one-line summary and status to explain that this area now covers development publishing on X and LinkedIn, with sports clipping retained as existing historical/context material. Add the weekly target and link to the publishing template/playbook.

- [ ] **Step 4: Append one changelog entry.**

Record the new playbook/templates, navigation/workflow integration, the consent rule, and the skill-router wording correction. Do not claim that the weekly system has succeeded before the trial runs.

- [ ] **Step 5: Run link and whitespace checks.**

Run: `git diff --check`

Run the repository's documented filesystem wikilink scanner if available; otherwise use the existing lint procedure and manually verify every newly added wikilink resolves.

Expected: no new actionable broken links or whitespace errors.

---

### Task 4: Correct Skill-Router Truthfulness

**Files:**
- Create: `01-Projects/skill-router/skill-router.md`
- Modify: `BRAIN.md`
- Modify: `index.md`
- Modify: `CHANGELOG.md`

**Interfaces:**
- Consumes: `/home/redmane/Documents/skill-router/README.md` and the cloned repository at commit `cc53641`.
- Produces: vault status that distinguishes decided architecture from unverified implementation.

- [ ] **Step 1: Confirm the referenced project hub is absent and read the cloned README before creating it.**

Confirm `01-Projects/skill-router/skill-router.md` is absent even though `index.md` and `CHANGELOG.md` reference it. Confirm the repository says the current implementation is unfinished and Gemini/Antigravity-specific.

- [ ] **Step 2: Create the missing hub from verified repository truth.**

Include purpose, repository location in portable form (`~/Documents/skill-router` as the per-machine convention rather than a hardcoded username), current tracked files, proposed architecture, open verification work, and this exact status distinction:

```markdown
**Status:** Architecture proposed/decided for an agent-agnostic MVP; implementation unverified. The cloned repository at commit `cc53641` is an unfinished Gemini/Antigravity-specific snapshot. Open verification work: implement/adapt the shared catalog/classifier and test the Claude Code adapter/hook coexistence.
```

Do not reconstruct or claim the contents of the missing August 2 hub beyond what is supported by `index.md`, `CHANGELOG.md`, and the cloned source repository.

- [ ] **Step 3: Update `BRAIN.md` and the index heading/summary.**

Make skill-router the top active focus in `BRAIN.md`. Replace `architecture resolved` in `index.md` with `architecture proposed/decided; implementation unverified` and retain the top-priority designation.

- [ ] **Step 4: Append the truthfulness correction to the changelog without rewriting history.**

State that the source repository was cloned and the current vault wording was corrected based on the repository's README. Also state that the pulled August 2 commit referenced a project hub and session log that were absent from that commit; restore only the project hub from verifiable source state and leave the missing historical session artifact documented as absent rather than fabricating it. Do not alter the original historical entries or claim implementation progress.

- [ ] **Step 5: Verify no live top-level status says the implementation is resolved.**

Run: `rg -n "skill-router.*(resolved|complete|finished)|architecture resolved" BRAIN.md index.md "01-Projects/skill-router/skill-router.md" CHANGELOG.md`

Expected: historical changelog entries may still mention prior wording, but current `index.md` and project hub must not overstate implementation status.

---

### Task 5: Run the First-Week Trial Without Script Changes

**Files:**
- Create: `05-Daily/weekly/2026-08-09.md`
- Create: post/decision notes only when Victor supplies the real inputs and answers the questions.
- Evaluate: `scripts/vault-librarian.js`, `scripts/harvest.js`

**Interfaces:**
- Consumes: one relevant personal/iPhone note, one voice note/transcript, one overprocessed agent/project note, and the initial July vault-post idea.
- Produces: at least one decision or evidence condition, at least one shipped post, and evidence about whether the scripts help.

- [ ] **Step 1: Create the weekly review note from the existing daily-note style.**

Use a one-line summary, date, decision review, publishing commitments, actions, results, and failure reason if the review produces no decision or publication.

- [ ] **Step 2: Process one real personal note.**

Ask what current decision, recurring pattern, or publishable explanation it improves. If none, leave it as source material and do not promote it.

- [ ] **Step 3: Process one voice note/transcript.**

Use the same test. Capture uncertainty and contradictions rather than polishing the transcript into a generic summary.

- [ ] **Step 4: Process one overprocessed agent/project note.**

Ask whether it contains Victor's judgment, a decision rationale, a behavior change, or a publishable lesson. If it contains only activity, do not create another permanent lesson note.

- [ ] **Step 5: Draft and publish the July vault post.**

Use the graph-growth timelapse and the honest angle: the vault grew from one node to hundreds, but Victor discovered it remembered agents better than it represented him or improved decisions. Select X first; adapt for LinkedIn only if the adaptation adds context. Apply at most one assisted revision and publish within 48 hours.

- [ ] **Step 6: Run the existing scripts as observation tools.**

Run:

```bash
node scripts/vault-librarian.js --json
node scripts/harvest.js --dry-run --json
```

Record whether each question/candidate led to a decision, next action, evidence condition, or post. Do not record questions merely to clear script history.

- [ ] **Step 7: Complete the review with evidence.**

Record the decision, rationale, next action, post URL, publication date, and what was learned. If the target was missed, record the actual failure and do not reclassify maintenance as success.

---

### Task 6: Decide What Survives the Trial

**Files:**
- Modify: `03-Resources/Vault-Ops/Better-Me-Better-Vault.md`
- Modify: `AGENTS.md` only if a durable workflow rule changed.
- Modify: `scripts/vault-librarian.js` or `scripts/harvest.js` only if trial evidence identifies a specific useful change.
- Modify: `CHANGELOG.md` if structure or scripts change.

**Interfaces:**
- Consumes: first-week review evidence and publication/decision records.
- Produces: a smaller or more effective second version of the loop.

- [ ] **Step 1: Classify every new artifact as keep, revise, archive, or retire.**

Keep only artifacts that produced a decision, behavior change, useful retrieval, or publication. Retire any artifact that created maintenance without one of those outcomes.

- [ ] **Step 2: If a script change is justified, write the smallest behavior-specific test first.**

The test must assert the new questioning/candidate behavior and must not merely assert that more questions or notes are generated.

- [ ] **Step 3: Run the script checks and vault lint after any change.**

Run the focused Node command, `git diff --check`, and the documented wikilink scanner. Expected: focused behavior passes and no new actionable structural problems appear.

- [ ] **Step 4: Update the playbook with only trial-proven changes.**

Do not expand the taxonomy or add cadence machinery based on speculation.

---

## Verification Checklist

- [ ] Current skill-router status distinguishes architecture decision from implementation verification.
- [ ] Playbook, decision template, and publishing template are linked from the vault hub or an existing linked area.
- [ ] Consent is described as vault placement/push consent; no privacy bureaucracy was added.
- [ ] Weekly review requires a decision, next action, or evidence condition.
- [ ] Publishing requires 2+ X and 1 LinkedIn weekly, a 48-hour deadline, and one revision maximum.
- [ ] First trial uses one personal note, one voice note/transcript, one overprocessed agent note, and the July vault story.
- [ ] Script changes are deferred until trial evidence supports them.
- [ ] `git diff --check` passes.
- [ ] Wikilink scan/lint finds no new actionable problems.
- [ ] No claim of August success is made before the evidence exists.

## Execution Handoff

Implement task-by-task with `subagent-driven-development` or `executing-plans`. Do not create the first weekly review as a fake completed review; create it as a live record when Victor performs it.
