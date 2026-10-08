---
title: X Voice Reference
date: 2026-10-07
tags:
  - content-creation
  - x-growth
  - writing-voice
  - development-publishing
status: working-reference
aliases:
  - Victor X Voice
---

# X Voice Reference

> **One-line summary:** Draft Victor's X posts from his direct observations, informal shorthand, concrete mechanisms, and quick movement from reaction to useful detail.

## Source set

Use these sources for different tasks:

- [[raw/X-Reply-Tab-Voice-Corpus-2026-10-07]] — 149 authored X cards, about 2,541 words.
- [[00-Inbox/Idiom Idea]] — a longer idea note, about 1,552 words.
- [[00-Inbox/Reference Prompt]] — the earlier Codon Labs concept prompt, about 534 words.

The combined count is about 4,627 words before overlap and task differences. This is enough to create a useful working reference. It is not a permanent model training event.

## Voice match

The sources match in their way of thinking more than in surface grammar.

They share these habits:

- Start from a concrete thing that caught your attention.
- Follow the observation with a mechanism or reason.
- Test the idea against a real use case.
- Let the idea expand into several possibilities.
- Notice both the impressive part and the part that could fail.
- Use plain language before technical language.
- Keep the thought moving instead of polishing every sentence.

The X replies compress this process into one or two lines. The idea notes let it run for several paragraphs.

## Surface patterns

Use these patterns when they fit the source material:

- `u`, `ur`, `tho`, `rn`, `wanna`, and `gonna` appear in the authored X corpus.
- Contractions appear often.
- Sentence openings include “Wait a minute,” “Oh wow,” “I agree with this,” “It literally does what u asked it to do,” and “I haven’t really thought this down.”
- Questions test the idea: “At what point would they stop tho?”
- Enthusiasm can be blunt: “This is humongous,” “Goddamn,” or “too dumb.”
- A correction often follows the excitement: “Most of it is still in ur hands.”
- Paragraph breaks appear when the thought changes direction.
- Short posts often end with a next action, a comparison, or an open question.

Do not insert shorthand into every post. It must follow the context.

## Thinking patterns

### Reaction, then mechanism

> `Claude has been good and efficient so far...`
>
> `I like the level headed character it displayed.`

The first sentence reacts. The second names the reason.

### Observation, then build implication

> `U can see the moment the bus-parking started.`
>
> `This is peak sports data viz.`
>
> `I'm inspired to build something crazy with three.js`

A visual detail becomes a possible build.

### Claim, then limitation

> `Skills don’t automatically make ur design look better.`
>
> `Most of it is still in ur hands.`

The voice avoids giving the tool all the credit.

### System, then components

> `Built a system for extracting raw components from any website`
>
> `Playwright, an agent, a playbook and a file for defining and storing the components`

The explanation names the outcome, then the parts.

### Possibility, then concern

The idea note does this often. It proposes a visual or product direction, then asks what could make it useful, expensive, generic, unsafe, or out of scope.

## Drafting rules

1. Start with the real object, post, screen, or decision.
2. Write the first reaction in plain language.
3. Add the reason or mechanism.
4. Add the limitation when it matters.
5. Use one concrete example.
6. Keep the post shorter than the thought behind it.
7. Keep the roughness that signals authorship.
8. Fix confusing errors, but do not erase the informal voice.
9. Never add slang only because the corpus contains it.
10. Never turn a reply into a polished marketing paragraph without Victor's approval.

## Codon Labs application

A Codon Labs post should usually contain:

- One visible detail.
- One design or product decision.
- One reason the decision matters.
- One sentence that shows the next thought.

Example shape:

> I thought the Codon Labs footer was just the last section of the page.
>
> It turned out to be the index for the whole site. What it links to says as much about the company as the hero does.
>
> Now I’m testing whether the footer can feel like an ending without becoming decoration.

This is a structural example. Use real facts from the current build before publishing.

## Prompt for a drafting agent

```text
Draft from Victor's working voice.

Use the supplied authored examples as style evidence, not as facts to copy.
Start with the concrete thing that caught his attention.
Move from reaction to mechanism, example, or consequence.
Keep informal shorthand only when it fits the situation.
Prefer direct sentences and concrete nouns.
Do not use generic creator language, hype, or polished marketing filler.
Do not invent personal experience.
Keep useful uncertainty when the idea is still forming.
If a sentence sounds like a brand strategist wrote it, rewrite it in plainer language.
Return one draft and a short note listing any facts that need confirmation.
```

## Limits

The corpus has about 4,627 words across three tasks. It is a strong working sample, not a guarantee.

The corpus also contains different modes:

- Replies are conversational.
- The idea note is exploratory.
- The Codon Labs prompt is a structured creative brief.

Do not blend all three modes into every post.

Use a held-out set later. Keep some authored examples away from the drafting prompt, then compare the draft against them. Stop collecting when added samples stop improving the match.

See [[03-Resources/Content-Creation/X-Voice-Sample-Size-Research]] for the research basis.
