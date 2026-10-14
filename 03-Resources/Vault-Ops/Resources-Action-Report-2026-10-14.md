---
title: Resources Action Report 2026-10-14
date: 2026-10-14
tags:
  - vault-ops
  - resources
  - audit
  - decision
---

# Resources Action Report

> **One-line Summary**: Non-destructive review of `03-Resources/`; keep the current knowledge, then review overlapping clusters before any deletion or merge.

## Scope

This report reviews `03-Resources/` after the project, Area, raw-source, Daily, and asset cleanup. It does not delete or merge Resource notes.

## Current inventory

Before this report was added, the folder contained 111 files, including 101 Markdown files and 56 subdirectories or nested directories. The current folder contains 112 files, including 102 Markdown files and 56 directories. The earlier inventory reported 179 files, 102 Markdown files, and 57 directories before media moved into the vault-level `Assets/` tree.

The largest current groups are:

| Group | Files | Current assessment |
|---|---:|---|
| `Design/` | 37 | Keep. These notes include collected references, code recipes, demos, and visual judgment. Review clusters later. |
| `Skills/` | 31 | Keep. This is the largest overlap risk, not a deletion candidate. |
| `Principles/` | 11 | Keep. The AI Hero material is a current draft system and needs human decisions, not pruning by count. |
| `Agent-Exploration/` | 9 | Keep. This is recent, source-backed exploration with explicit limits. |
| `Tools/` | 10 | Keep. These are runbooks and durable technical references. |
| `Vault-Ops/` | 5 after this report | Keep. These notes define maintenance and decision workflows. |
| `Content-Creation/` | 2 | Keep. These are source-backed publishing references. |

## Action decisions

### 1. Keep now

- Keep all current Resource notes.
- Keep the Backdrop Supply and Footer Design collections. Their images moved to `Assets/`, but their research and build recipes remain useful.
- Keep the AI Hero and shared-router notes. They contain open design decisions and should not be treated as finished policy.
- Keep the recent Agent Exploration notes. They record evidence limits and rejected income claims.
- Keep the Skills notes until each overlap cluster has a canonical destination.
- Keep `Saved-Threads/.gitkeep`. It preserves the optional capture location without inventing content.

### 2. Review later: Skills overlap

The 31-note Skills group contains several related clusters:

- Navigation: `Back-Button-Hierarchy`, `Sticky-Top-Bar-Navigation`, `Navigation-Design-Basics`, `Nested-Route-Active-State`, and `Dashboard-As-Overview`.
- Forms and state: `Context-Aware-Form-Fields`, `Smart-Form-Controls`, `State-Isolation-Per-Record`, and `Settings-Preview-Then-Save`.
- Visual quality: `AI-UI-Antipatterns-Watchlist`, `Frontend-Awesomeness`, `UI-Polish-Ten-Rules`, `Responsive-Data-Viz`, and `Theme-Aware-Component-Checklist`.
- Agent operations: `Agent-Prompting-Masterclass`, `Claude-Code-Hooks-Trust-Reference`, `Defuddle-Clipping`, `Knowledge-Extraction-Interviewer`, `Lazy-Agent-Failure-Mode`, and `Skill-Router-Hook`.

Recommended action: compare one cluster at a time. Choose one canonical note only when the notes duplicate the same decision. Keep distinct recipes as separate notes and add links from the cluster MOC.

### 3. Review later: Design collection boundaries

`Design/Footer-Design/` now contains source interpretation, style notes, build runbooks, addenda, and demos. It is coherent enough to keep. A later review can separate:

- source collection notes,
- reusable build rules,
- individual replication recipes,
- demo code and previews.

Do not merge these categories by filename alone. The notes answer different retrieval questions.

`Design/Backdrop-Supply/` follows the same pattern. The JSON metadata remains beside the research notes, while binary previews live under `Assets/Backdrop-Supply/`.

### 4. Review later: Principles and policy status

`Principles/` contains the AI Hero workflow, domain glossary, source map, gap analysis, shared-router draft, and v1.3 lessons. The folder mixes proposed policy with extracted source material.

Recommended action: mark each note as one of `source`, `draft`, `decision`, or `operating rule` during the next human review. Do not delete the draft material before Victor accepts or rejects the operating model.

### 5. Review later: Tools and provider boundaries

The former Agent-Ops notes were removed. Provider bridges, Node upgrades, Effects, AgentMemory, and vault tooling now live under `Tools/`.

Recommended action: review each runbook for current ownership, verification date, and machine-specific claims. Keep reusable mechanics. Move stale provider-specific observations to historical session evidence instead of preserving them as active policy.

### 6. Review later: Project-specific Resource notes

Some Skills and Tools notes came from Momentum, Ledger, or previous frontend work. They remain useful when they state a reusable rule, such as state isolation, overlay stacking, auth contrast, or secure downloads.

Recommended action: keep a note in Resources when it applies to more than one project or prevents a repeated class of failure. Put one-project status and lessons in that project hub.

## Deletion assessment

No safe deletion was identified in this pass.

The strongest deletion signals are duplication and stale policy. Both require content comparison and a human decision. File age, orphan status, or directory size is not enough evidence for deletion.

## Recommended order

1. Review the Skills clusters and identify duplicate meanings.
2. Review Principles and label source, draft, decision, and operating-rule status.
3. Review Tools for current verification dates and machine-specific paths.
4. Review Design collections only after their asset paths remain stable.
5. Delete or merge only after Victor approves the exact file list.

## Evidence and limits

- Inventory counts came from a fresh filesystem scan on 2026-10-14.
- A prior Clef review recommended keeping Resources and reviewing, rather than deleting, the Skills and operations/provider clusters.
- Obsidian CLI was unavailable in this environment, so no CLI result is claimed.
- The local Markdown scanner still reports intentional historical, template, byline, and outside-vault references. It must not be treated as a clean-link claim until those categories are separated.
