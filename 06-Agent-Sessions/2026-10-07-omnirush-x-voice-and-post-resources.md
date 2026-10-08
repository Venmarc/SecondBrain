---
title: X voice corpus and post resources
 date: 2026-10-07
tags:
  - agent-session
  - content-creation
  - x-growth
  - codon-labs
status: complete
---

> **One-line Summary:** Captured 149 authored X cards, built a working voice reference, and converted nine complete bookmark reads into source-backed post resources without editing Codon Labs or the portfolio.

**Date:** 2026-10-07
**Agent:** Omnirush
**Project:** none

## Goal

Collect Victor's authored X material, compare it with his Codon Labs and idea writing, and make the X playbook easier to use.

Read the relevant bookmarked content sources through the authenticated browser and separate full evidence from Xtracticle shell text.

## Standing Directives Given This Session

- Do not edit Codon Labs code.
- Do not edit the portfolio.
- Defer HyperFrames video creation for now.
- Use the authenticated `jev-browser` Chromium on CDP port `9242`.
- Keep X activity read-only.

## User Prompts (Extracted, Not Compressed)

- **Prompt:** "Next step for u is finah teh partial reads and make the full reads. Get all the posts referring to content creation on x, and extract from them and see how they can be used to make better posts. use it to solidify ur post resources so that the warning will be gone."
  **Overrode/Added:** Added a source-quality pass to the existing X playbook.
- **Prompt:** "Go to my X profile, click on th replies tab next to posts and just start extracting my voice and patterns."
  **Overrode/Added:** Added an authenticated Replies-tab corpus and voice analysis.
- **Prompt:** "I don't want u to need my help for this."
  **Overrode/Added:** Required autonomous capture and analysis without asking Victor to select examples.
- **Prompt:** "I have a text i wrote of ideas about 2-3 weeks ago... 00-Inbox/Idiom Idea.md here it is"
  **Overrode/Added:** Added the authored idea note to the voice comparison and post-resource inventory.

## Reference Files / Media

- [[00-Inbox/Reference Prompt]] — Victor's original Codon Labs concept prompt.
- [[00-Inbox/Idiom Idea]] — authored design, product, framework, video, and idea-capture notes.
- [[raw/X-Reply-Tab-Voice-Corpus-2026-10-07]] — exact authored X text captured from the authenticated profile.
- [[02-Areas/Content-Creation/X-Account-Growth-Playbook]] — existing strategy updated with the voice bank and evidence state.
- [[03-Resources/Content-Creation/X-Post-Resources]] — complete-read lessons and post prompts.
- [[02-Areas/Content-Creation/X-Voice-Reference]] — voice observations and drafting instructions.
- `jev-browser/data/reports/747188dbf7a1d048b7e1-full.md` — clean report with nine complete sources and no partial sources included.
- `ScreenRecording_08-29-2026 01-24-06_1.mov` and pasted images referenced by `Idiom Idea.md` — preserved as existing vault media; not edited.

## Root Cause Log

| Symptom | Root Cause | Fix Applied | Confidence |
|---|---|---|---|
| The X strategy carried a warning because many bookmarked articles looked complete in metadata but contained only Xtracticle page chrome. | Existing database rows preserved shell-only text and false-complete states from earlier reads. | Inspected stored Markdown artifacts, corrected shell-only rows to `partial`, and rebuilt a report using only complete sources. | Confirmed |
| A first attempt treated all authored cards from the Replies tab as replies. | X's Replies-tab DOM exposed authored cards but did not expose parent context consistently in the tab capture. | Stored the corpus as a Replies-tab authored corpus, not as a claim that every card is a reply. | Confirmed |
| The idea of a universal 2,000-word voice threshold lacked direct support. | Prompting, fine-tuning, and authorship-attribution studies measure different tasks. | Added a research note that recommends varied task-matched examples and held-out checks instead of a fixed threshold. | Confirmed |

## Research Conducted

- **Searched/Consulted:** Anthropic prompting guidance; OpenAI model optimization, supervised fine-tuning, and eval guidance; Eder authorship-attribution research; Stamatatos authorship research; Shrestha short-text authorship research; stored Bookmark Intelligence sources; X authenticated profile and Replies tab.
- **Should have been consulted but wasn't:** Obsidian reading view. The Obsidian CLI remained disabled even though the application was running.

## Subagent Snags

- Agentmemory was unavailable at `localhost:3111`. No memory save was claimed.
- The first long Replies-tab classification pass hit a browser-harness timeout. The exact authored corpus capture completed before that pass.
- Several Xtracticle reads still returned shells or navigation failures. Those records remain partial or failed.

## Decisions & Pivots

- Use 149 authored X cards as the main short-form voice source.
- Use `Idiom Idea.md` and `Reference Prompt.md` as longer-form idea and creative-brief sources.
- Keep the three source modes separate during drafting.
- Treat about 4,627 combined words as a useful working bank, not as proof of model training.
- Build post resources only from six complete reads and clearly label partial signals.
- Defer HyperFrames production until the content system has a real screenshot or interaction to show.

## Steps Taken / Actions

1. Read the vault instructions, index, Codon context, and the two authored notes.
2. Captured the authenticated X Replies tab using only CDP port `9242`.
3. Scrolled through 290 X cards and identified 149 authored cards.
4. Counted about 2,541 words of exact authored X text.
5. Compared the X corpus with `Idiom Idea.md` and `Reference Prompt.md`.
6. Identified shared thinking patterns: concrete observation, plain reaction, mechanism, possibility, and limitation.
7. Read relevant bookmarks in bounded batches.
8. Verified nine complete source artifacts.
9. Corrected 23 shell-only records to `partial` and preserved one navigation failure as `failed`.
10. Built report `747188dbf7a1d048b7e1` with nine complete sources.
11. Wrote the voice reference and post resource bank.
12. Updated the X playbook, vault index, and changelog.

## Files Touched

- `raw/X-Reply-Tab-Voice-Corpus-2026-10-07.md`
  - **Previous State:** Did not exist.
  - **After Change:** Contains 149 authored X cards with provenance URLs and capture notes.
  - **Related to:** Voice corpus capture.
- `03-Resources/Content-Creation/X-Voice-Sample-Size-Research.md`
  - **Previous State:** Did not exist.
  - **After Change:** Records the evidence against a universal 2,000-word minimum.
  - **Related to:** Voice sample-size decision.
- `02-Areas/Content-Creation/X-Voice-Reference.md`
  - **Previous State:** Did not exist.
  - **After Change:** Contains observed voice patterns, task separation, and a drafting prompt.
  - **Related to:** Voice corpus analysis.
- `03-Resources/Content-Creation/X-Post-Resources.md`
  - **Previous State:** Did not exist.
  - **After Change:** Contains six complete-read lessons and Codon Labs post angles.
  - **Related to:** Source-backed post system.
- `02-Areas/Content-Creation/X-Account-Growth-Playbook.md`
  - **Previous State:** Existing playbook without the voice corpus.
  - **After Change:** Includes the voice reference, full-read patterns, and quality-gated evidence.
  - **Related to:** X publishing strategy.
- `index.md`
  - **Previous State:** Listed the playbook but not the new voice resources.
  - **After Change:** Links the new voice and post-resource notes.
  - **Related to:** Vault navigation.
- `CHANGELOG.md`
  - **Previous State:** Recorded the earlier playbook only.
  - **After Change:** Records the voice corpus, resources, and source-state correction.
  - **Related to:** Vault bookkeeping.

## Vault Updates This Session

- `[[ANTI_PATTERNS.md]]`: No changes — line count after edit: N/A. Split triggered: N/A
- Project `AGENTS.md`: No changes

## Open Questions & Next Steps

- Use the voice reference to draft one footer follow-up from the real screenshot and tradeoff.
- Keep the six complete bookmark sources as the current evidence base.
- Retry partial Xtracticle sources only with new live IDs or after a confirmed reader fix.
- Enable the Obsidian CLI if reading-view verification is required.
- Decide later whether a focused HyperFrames clip would prove one Codon Labs interaction.

**Tags:** #agent-session #content-creation #x-growth #codon-labs #voice-reference
