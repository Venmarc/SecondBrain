---
title: UI Polish — Ten Rules (Kevin's article)
source: "[[Clippings/Rules on UI Polish|Rules on UI Polish]]"
author: "[[Kevin (@kvnkld)]]"
date: 2026-07-17
tags:
  - lesson
  - skill
  - ui-ux
  - polish
  - design
  - motion
aliases:
  - UI Polish Ten Rules
  - Kevin UI Polish
---

# UI Polish — Ten Rules

> **One-line Summary**: Distilled from [[Clippings/Rules on UI Polish|Kevin's X article]] — the taste + prompting recipes the motion skills don't carry: snap points, layered shadows, grid-rows reveal, Figma handoff, state-discovery mindset, prompting-for-polish.

The Clippings original is the immutable source of truth for the philosophy. This note exists because the article's unique value (snap-point physics, layered-shadow recipes, grid-rows reveal, FLIP, Figma handoff discipline, state-driven thinking as *discovery*, the prompting recipes that get you 90% of the way) doesn't fit cleanly into any of the existing motion skills (`~/.agents/skills/emil-design-eng`, `apple-design`, `improve-animations`, `review-animations`, `find-animation-opportunities`, `animation-vocabulary`) or the `apple-design` materials section. The `feel-router` skill routes to this note on its **Build an entrance or transition**, **Build a snap-point or magnetic interaction**, and **Build depth or material** lanes.

Three quarters of the article's rules overlap with the skills cluster (easing variables, press feedback, reduced-motion, FLIP) — for those, this note wikilinks to the shared standards file instead of restating. The unique half is recorded here verbatim-with-distillation.

---

## Hard orientation: this article vs the feel-router system

| Article rule | Where it lives |
|---|---|
| Rule 1 (banned default ease, house easing set) | [`~/.agents/skills/_shared/MOTION-STANDARDS.md`](../../../../home/redmane/.agents/skills/_shared/MOTION-STANDARDS.md) §Easing. Don't duplicate here — use the tokens (`--ease-out`, `--ease-in-out`, `--ease-drawer`). |
| Rule 2 (design system variables first) | Below — **Design tokens first**. |
| Rule 3 (real physics for draggables) | `~/.agents/skills/apple-design/SKILL.md` §3–§6 (interruptibility, springs, velocity handoff, momentum projection) + the shared standards' spring section. Don't duplicate. |
| Rule 4 (snap points, magnetic, label pulse) | Below — **Two-zone magnetic snap**. The feel-router loads this note specifically because no skill carries the pull-in/release-zone pattern. |
| Rule 5 (entrance = fade + rise + blur-that-clears) | Below — **The triple entrance recipe**. The shared standards file carries it as a one-liner under §Physicality; the full recipe lives here. |
| Rule 6 (layered light, hairline ring instead of border) | Below — **Layered shadow stack**. The apple-design materials section discusses translucency, not concrete shadow recipes. |
| Rule 7 (press should be felt) | `~/.agents/skills/emil-design-eng/SKILL.md` §"Buttons must feel responsive" + shared standards §Physicality. Note: article uses `scale(0.98)`; emil uses `scale(0.97)`. Either is fine; the shared standards file says 0.95–0.98. |
| Rule 8 (grid-rows reveal, FLIP) | Grid-rows lives in the shared standards' §Transforms & clip-path. FLIP is also documented there. Don't duplicate. |
| Rule 9 (reduced motion + GPU-friendly properties) | `~/.agents/skills/_shared/MOTION-STANDARDS.md` §Accessibility + §Performance. Not duplicated. |
| Rule 10 (state-driven design is the actual job) | Below — **State-driven design as discovery**. The skills cluster treats states more statically ("name the states"); this is about *finding* them mid-build. |

---

## Design tokens first (Rule 2 + Figma section)

Polish reads as **consistency**. Consistency comes from a shared vocabulary: design tokens for colors, corner radius, durations, motion curves, and shadow stacks. Define them before any component.

**Why this matters:** Once tokens exist, the model stops inventing one-off `13px` corner-radius values and random `0.3s` timings. The whole UI snaps into rhythm. Paste the token block first and forbid one-off values — one instruction kills 80% of the AI slop look.

**Figma mirroring:** Build Figma variables that mirror your tokens 1:1 (same names). Now design and build is a translation, not a reinvention.

**Handoff property checklist (when you hand a Figma selection off through the Figma MCP):**

Never assume the handoff tool carries it all over on its own. Point the model at the current Figma selection and list, in the prompt, **every single property** you want it to read: padding, gaps, tokens, colors, corner radius, type sizes and weights. The more explicit you are about what to read off the design, the closer the first build lands, and the less you have to claw it back by hand afterward.

---

## Two-zone magnetic snap (Rule 4)

Hardware gives you haptic clicks. On the web you fake the same satisfaction with **snap points**: as the handle nears a meaningful value (a month boundary, a preset), it gently magnetizes to it.

**The two-zone system — the part that makes it feel real:**

- **Tight pull-in zone** — small, near the snap value. When the handle is inside it, the value snaps in.
- **Larger release zone** — wider, surrounding the pull-in zone. Once snapped, you have to "mean it" to pull away — the larger release zone is what creates the resistance.
- **Label pulse** — when the snap catches, pulse the label for a micro flash of feedback. That tiny resistance and micro-pulse reads, subconsciously, as quality.

**Prompt it:** "Add magnetic snap points at [these values]. Use a smaller pull-in zone and a larger release zone so it locks and resists, and flash the label when it catches."

**Why this isn't in the skills:** The emil and apple skills cover velocity-based dismissal (drag the whole element off-screen) and rubber-band boundaries (drag past an edge) — neither covers a *value*-tier snap with a two-zone bias. The X article is the source. Capture this in the glossary as `[Motion]` when you encounter it on a site.

---

## The triple entrance recipe (Rule 5)

A plain fade is the most overused entrance and the least premium. The article's entrances almost always combine **three** things: opacity, a small upward shift, and a tiny blur that clears.

```css
.entrance {
  opacity: 0;
  transform: translateY(6px);
  filter: blur(2px);
  transition:
    opacity var(--duration-slow) var(--ease-smooth),
    transform var(--duration-slow) var(--ease-smooth),
    filter var(--duration-slow) var(--ease-smooth);
}
.entrance[data-in="true"] {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}
```

**Approximate values:**

| Property | From | To | Duration | Easing |
|---|---|---|---|---|
| `opacity` | 0 | 1 | `var(--duration-slow)` (280ms) | `var(--ease-smooth)` |
| `transform: translateY` | 6px | 0 | same | same |
| `filter: blur` | 2px | 0 | same | same |

**The blur is the secret ingredient.** It makes content feel like it *focuses into place* instead of flicking on. A fade with a rise alone looks like a transform; a fade + rise + blur-that-clears looks like the content is *arriving*.

**Don't add new easing for this.** The curve is your existing `--ease-smooth` (`cubic-bezier(0.22, 1, 0.36, 1)`) from the shared standards file. That's the point of the motion set: define the feel once, every entrance inherits it.

**Figma prep:** Design the "before" frame explicitly (offset plus your blur effect) so the motion intent is visible to anyone reading the file. A static "after" frame alone hides the recipe from reviewers.

**Antipattern:** Identical triple entrances applied ≥3 times across one view = slop. One hero entrance + one modal entrance fine; blur-everywhere entrances flagged in the [[AI-UI-Antipatterns-Watchlist]].

---

## Layered shadow stack (Rule 6)

A flat single-blur shadow is an instant tell. Physical objects cast several shadows at once: a **hairline** where they meet the surface, a **tight contact** shadow, and a **wide soft ambient**. Keep two standard presets and reuse them on everything.

**The everyday card (a panel sitting on a surface):**

```css
--shadow-card:
  0 1px 2px rgba(0, 0, 0, 0.05),       /* close drop  */
  0 2px 4px rgba(0, 0, 0, 0.02),       /* soft spread */
  0 0 0 0.5px rgba(0, 0, 0, 0.08);     /* hairline ring, not a border */
```

**The elevated version (modals, lifted cards). Same idea, more layers:**

```css
--shadow-elevated:
  0 4px 8px rgba(0, 0, 0, 0.02),    /* spread        */
  0 8px 12px rgba(0, 0, 0, 0.02),   /* wide ambient  */
  0 2px 4px rgba(0, 0, 0, 0.02),    /* mid           */
  0 1px 2px rgba(0, 0, 0, 0.04),    /* contact       */
  0 0 0 0.5px #e0e0e0;             /* hairline ring */
```

**Three things make these read as real and not "default Material elevation":**

1. **A hairline ring replaces the border.** The single biggest tell of a hand-made UI. The edge is defined by *light*, not a 1px stroke.
2. **Opacities stay tiny, roughly 2% to 8%.** Heavy shadows look cheap. Depth is the *sum of many faint layers*, not one dark one.
3. **Stack several blurs at different sizes.** A tight one for the contact edge, a wider soft one for the ambient spread. The overlap of many faint layers is what reads as real depth, never one single blur.

**Prompt it:** "Don't use a single drop shadow. Stack a hairline ring instead of a border, a tight contact shadow, and a wide soft ambient, all at very low opacity (2% to 8%). Use `0 1px 2px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.02), 0 0 0 0.5px rgba(0,0,0,0.08)` and animate the whole stack on hover."

**Antipattern flag:** Single flat `box-shadow: 0 2px 4px rgba(0,0,0,0.2)` belongs on the antipatterns watchlist. Add to [[AI-UI-Antipatterns-Watchlist]] if not already there.

---

## State-driven design as *discovery* (Rule 10)

A component is not a picture, it's **a system of states**. A button isn't "a button," it's `idle / hover / pressed / loading / disabled / success / empty / error`.

**The part nobody tells you:** You might not know all the states you need until you start building it. The Figma concept always looks complete. Then you start building, you drag the thing, and you immediately feel the holes — *"this needs a working state", "the number should roll, not swap", "this label should shimmer while busy", "the icon should cross-fade between play and pause."*

**Micro-interactions discovered through use, never specced up front:**

- Numbers that **roll** digit-by-digit instead of hard-cutting.
- A **shimmer sweep** across a label while a task is working (not a spinner).
- Play/pause icons that **cross-fade and scale** between each other rather than swapping.

**Prompt it (the shimmer example):** "While it's working, don't add a spinner. Let the label text itself glow softly, like a light slowly sweeping across the word from one side to the other and back, looping about every 2 seconds. It should feel calm and alive, not flashy."

**Figma prep:** Use component variants for the states you know. Then accept that the build will surface two or three more — that's where the polish actually lives. This is the rule that separates a mockup from a product.

**Why this isn't in the skills cluster:** emil lists states summarily in the animation-decision framework ("make sure the value lands on the right state"), apple-design treats state changes as discrete transitions. Neither frames state-finding as a *discovery* discipline of the build itself. The router's Build-deep-or-material and Build-an-entrance-or-transition lanes both lean on this.

---

## How to actually prompt for polish (the article's closing section)

When prompting an LLM (yourself, or a less-capable agent) for polished UI:

- **Give numbers, never adjectives.** "Smooth" is meaningless; `cubic-bezier(0.22, 1, 0.36, 1)` at `280ms` is buildable.
- **Lead with your design tokens.** Paste the `:root` block first and forbid one-off values.
- **Think in states, then list them.** The model builds exactly the states you name and no more.
- **Isolate when iterating.** "Now *only* tune the shadow stack." "Now *only* the entrance." One variable at a time is how you reach polish without thrashing.
- **Describe the feeling and give a reference.** "Should feel like an iOS sheet: weighty, slightly springy, settles fast." Reference-anchored requests land far better than abstract ones.
- **Handing off from Figma? Name every property to copy.** Point at the current selection and list what to read off it: padding, gaps, tokens, colors, corner radius, type sizes and weights. Don't leave it to interpretation.

**The职场 meta-rule (article's closing):** Prompts get you 90% of the way in minutes. The last 10% — the part people actually celebrate — is you. The model is the hands. The eye is still yours. That judgment is taste, and taste is earned from shipping, from staring at things that feel almost right and knowing the fix, from years of noticing why one interaction delights and another doesn't.

---

## Obsidian wikilink cheat sheet (cross-links)

For graph traversal, these are the deliberate bidirectional connections:

- **Source of truth:** [[Clippings/Rules on UI Polish]] — never edit; this note distills it.
- **Dispatcher:** `~/.agents/skills/feel-router/SKILL.md` (Build-an-entrance-or-transition, Build-a-snap-point, Build-depth-or-material lanes).
- **Standards (easing tokens spring configs):** `~/.agents/skills/_shared/MOTION-STANDARDS.md` — Motion overlap with Rules 1, 3, 7, 8, 9.
- **Skills cluster (motion):** [[../Skills/Reverse-Engineering-UI-Components|Reverse-Engineering UI Components]], `~/.agents/skills/emil-design-eng/SKILL.md`, `~/.agents/skills/apple-design/SKILL.md`.
- **Antipatterns:** [[AI-UI-Antipatterns-Watchlist]] — add the new tells (single-blur shadow, default easing, max-height hack, fade-only entrance) if not present.
- **Frontend Awesomeness (prompting philosophy):** [[Frontend-Awesomeness]] — adjacent prompting recipes.
- **Extraction system:** [[03-Resources/Tools/Effects_Glossary|Effects Glossary]] + [[03-Resources/Tools/Effects_Playbook|Effects Playbook]] + [[03-Resources/Tools/Effects_Build_Playbook|Effects Build Playbook]] — when you see one of these recipes on a real site, extract and tag it under the proper `[tag]` in the glossary.

---

**Tags:** #lesson #skill #ui-ux #polish #design #motion #article-distillation
