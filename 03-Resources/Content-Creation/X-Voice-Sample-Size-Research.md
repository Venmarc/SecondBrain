---
title: X Voice Sample Size Research
date: 2026-10-07
tags:
  - content-creation
  - x-growth
  - writing-voice
  - research
status: reference
---

# X Voice Sample Size Research

> **One-line summary:** No source supports 2,000 words as a universal minimum for prompt-based writing-voice assistance.

## Finding

A fixed word count is the wrong test.

Prompting guidance supports a few relevant and varied examples. Anthropic recommends three to five examples for current Claude models. OpenAI recommends trying few-shot examples before fine-tuning.

Fine-tuning guidance counts demonstrations, not words. OpenAI recommends starting with about 50 realistic demonstrations and keeping representative holdout data.

Authorship research reports stable attribution around 2,500 words for one Latin prose corpus and about 5,000 words for many tested novel corpora. That research identifies authors. It does not show how many words an LLM needs to draft in a person's voice.

## Practical rule for Victor's X drafting

The current corpus is already useful:

- 149 authored items captured from the authenticated X Replies tab.
- About 2,541 words of exact authored X text.
- 1,552 words in [[00-Inbox/Idiom Idea]].
- 534 words in [[00-Inbox/Reference Prompt]].
- About 4,627 words across the three sources before overlap and task differences.

Use this as a style bank, not as a claim that the model has learned a permanent voice.

For each draft, retrieve three to five examples that match the task:

- Use short replies for reply drafting.
- Use build updates for build-post drafting.
- Use longer idea notes for concept development.
- Keep prompts and instructions separate from authored prose.

Reserve some samples for review. Compare drafts against those samples without showing them to the drafting model. Stop adding examples when new samples no longer improve the result across different post types.

## What the evidence does not support

- 2,000 words is necessary.
- 2,000 words is sufficient.
- One long prompt teaches voice as well as varied authored examples.
- More words always improve the match.
- Authorship-attribution sample lengths transfer directly to LLM generation.

## Sources

- Anthropic, [Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)
- OpenAI, [Model optimization](https://developers.openai.com/api/docs/guides/model-optimization)
- OpenAI, [Supervised fine-tuning](https://developers.openai.com/api/docs/guides/supervised-fine-tuning)
- OpenAI, [Working with evals](https://developers.openai.com/api/docs/guides/evals)
- Maciej Eder, [Does size matter? Authorship attribution, small samples, big problem](https://doi.org/10.1093/llc/fqt066)
- Efstathios Stamatatos, [Authorship Attribution Using Text Distortion](https://aclanthology.org/E17-1107/)
- Prasha Shrestha et al., [Convolutional Neural Networks for Authorship Attribution of Short Texts](https://aclanthology.org/E17-2106/)
