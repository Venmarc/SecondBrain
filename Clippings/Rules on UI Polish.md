---
title: The 10 rules to ship truly polished UI with Claude
source: https://x.com/kvnkld/article/2066863634949779464
author:
  - "[[Kevin (@kvnkld)]]"
published: 2026-06-16
created: 2026-07-17
description: I added a short summary of this article to my vault about 3 weeks ago, but that wasn't nearly enough. Here's the full copy. I don't have Claude in my pc, but I have other capable agents that can help me out in this aspect.
tags:
  - clippings
---
![Image](https://pbs.twimg.com/media/HK62Unba8AA2VeS?format=jpg&name=large)
- - -
People keep asking how the UI components I post end up looking so polished, or what prompts I use. So here’s a breakdown of the most important things:

Polish is not a feature you prompt for. You can't type "make it premium and smooth" and get there. The model is a phenomenal pair of hands, but the taste, the rules, and the hundred tiny decisions are still yours. Everything below is the system I use, the same principles baked into the components I've been sharing. Steal all of it.

I'll give you each rule three ways: the rule, how to prompt it, and how to prep it in Figma where it matters.
- - -
## Rule 1: Easing is everything. The default ease is banned.

The single biggest difference between "an LLM built this" and "a human with taste built this" is the easing curve, how movement starts, speeds up, and settles. The browser's built-in defaults (ease, ease-in-out) scream generic. I never use them.

I keep one house easing set as design variables and reuse it across every project:

```css
:root {
  --ease-smooth: cubic-bezier(0.22, 1, 0.36, 1);  /* default for almost everything */
  --ease-out:    cubic-bezier(0.17, 1, 0.32, 1);   /* decorative entrances */
  --ease-spring: cubic-bezier(0.35, 1.55, 0.65, 1); /* badges, pops, overshoot */
  --ease-in-out: cubic-bezier(0.66, 0, 0.34, 1);   /* symmetric moves */
}
```

These aren't sacred numbers. They're tuned by feel. I nudged every one of them until presses, reveals, and entrances felt right to me. That tuning is the work. A curve that's 0.02 off feels subtly wrong even if you can't name why.

> **Prompt it:** Never say "smooth." Give the exact curve: "Use cubic-bezier(0.22, 1, 0.36, 1) for all transitions, and a slight overshoot curve cubic-bezier(0.35, 1.55, 0.65, 1) for anything that pops in, like a badge appearing with a tiny bounce." Specificity is the whole game.
- - -
## Rule 2: Define your design system variables before you build a single component.

Polish reads as **consistency**. Consistency comes from a shared vocabulary: your design tokens. Before any component, I define variables for colors, corner radius, durations, motion curves, and shadow stacks. Every state, hover, and dark-mode variant then pulls from the same set.

```css
:root {
  /* Corner radius */
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 24px;

  /* Duration */
  --duration-fast: 150ms;
  --duration-normal: 200ms;
  --duration-slow: 280ms;
}
```

Once these exist, the model stops inventing one-off 13px corner radius values and random 0.3s timings. Your whole UI snaps into rhythm.

> **Prompt it:** Hand the model your variable block first and say "use only these tokens, no one-off values." This one instruction kills 80% of the "AI slop" look.

**Figma prep:** Build Figma variables that mirror your design tokens 1:1 (same names). Now design and build is a translation, not a reinvention.
- - -
## Rule 3: For anything draggable, use real physics, not simple fades and slides.

A basic timed animation on a drag handle feels dead. Real interfaces have **momentum, friction, and resistance**. Three things make a drag feel alive:

1. **Tracking how fast the user is moving**, smoothed over time, so a flick has weight.
2. **Momentum on release.** Keep moving and slow down gradually until it rests, like something sliding across a table.
3. **Soft boundaries.** When you hit the edge, don't stop hard. Let it stretch a little and spring back. That single touch is the difference between "web slider" and "iOS."

For values that can't be animated with a simple duration (counters, live numbers), I use a spring animation, tuned for how stiff, bouncy, and heavy the movement should feel, instead of a fixed time.

> **Prompt it:** Forget the jargon. Just describe how it should feel: "Make the slider feel like a real physical object, not a web input. When I flick it, it should keep gliding and slowly coast to a stop on its own, like sliding something across a table. And when it hits the edge, it shouldn't stop dead, it should stretch a little and spring back." The model already knows the physics. It just needs to know what you want it to feel like.
- - -
## Rule 4: Add snap points. Magnetic snapping is free haptics.

Hardware gives you haptic clicks. On the web you fake the same satisfaction with **snap points**: as the handle nears a meaningful value (a month boundary, a preset), it gently magnetizes to it.

The trick that makes it feel real is a two-zone system: a **tight pull-in zone** to snap in, and a larger **release zone** to break free. Once snapped, you have to mean it to pull away. When it catches, I pulse the label for a micro flash of feedback. That tiny resistance reads, subconsciously, as quality.

> **Prompt it:** "Add magnetic snap points at \[these values\]. Use a smaller pull-in zone and a larger release zone so it locks and resists, and flash the label when it catches."
- - -
## Rule 5: Entrances blur in. They never just fade.

A plain fade is the most overused entrance and the least premium. Mine almost always combine **three** things: opacity, a small upward shift, and a tiny blur that clears.

opacity: 0 to 1 translateY: 6px to 0 filter: blur(2px) to blur(0) duration: ~280ms with --ease-smooth

Notice there's no new easing here: the curve is just your smooth preset from Rule 1. That's the point of the motion set: you define the feel once and every entrance, hover, and reveal inherits it. The blur is the secret ingredient. It makes content feel like it focuses into place instead of flicking on.

> **Prompt it:** "Entrance = fade + 6px rise + a 2px blur that clears, ~320ms on the smooth curve."

**Figma prep:** Design the "before" frame explicitly (offset plus your blur effect) so the motion intent is visible to anyone reading the file.
- - -
## Rule 6: One shadow is a sticker. Real depth is layered light.

A flat single-blur shadow is an instant tell. Physical objects cast several shadows at once: a hairline where they meet the surface, a tight contact shadow, and a wide soft ambient. I keep two standard presets and reuse them on everything.

The everyday card (a panel sitting on a surface):

```css
--shadow-card:
  0 1px 2px rgba(0, 0, 0, 0.05),       /* close drop  */
  0 2px 4px rgba(0, 0, 0, 0.02),       /* soft spread */
  0 0 0 0.5px rgba(0, 0, 0, 0.08);     /* hairline ring, not a border */
```

The elevated version (modals, lifted cards). Same idea, more layers:

```css
--shadow-elevated:
  0 4px 8px rgba(0, 0, 0, 0.02),    /* spread        */
  0 8px 12px rgba(0, 0, 0, 0.02),   /* wide ambient  */
  0 2px 4px rgba(0, 0, 0, 0.02),    /* mid           */
  0 1px 2px rgba(0, 0, 0, 0.04),    /* contact       */
  0 0 0 0.5px #e0e0e0;              /* hairline ring */
```

Three things make these read as real and not "default Material elevation":

- **A hairline ring replaces the border.** This is the single biggest tell of a hand-made UI. The edge is defined by light, not a 1px stroke.
- **Opacities stay tiny, roughly 2% to 8%.** Heavy shadows look cheap. Depth is the sum of many faint layers, not one dark one.
- **Stack several blurs at different sizes.** A tight one for the contact edge, a wider soft one for the ambient spread. The overlap of many faint layers is what reads as real depth, never one single blur.

> **Prompt it:** "Don't use a single drop shadow. Stack a hairline ring instead of a border, a tight contact shadow, and a wide soft ambient, all at very low opacity (2% to 8%). Use 0 1px 2px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.02), 0 0 0 0.5px rgba(0,0,0,0.08) and animate the whole stack on hover."
- - -
## Rule 7: Make everything tactile. Press should be felt.

Every interactive element gets a press response. My default is a subtle scale-down when pressed:

```css
.button:active { transform: scale(0.98); }
```

0.98, not 0.9, so it registers as a firm press, not a collapse. Buttons, swatches, tabs, footer rows: all of them. Combine with hover state shifts and tooltips that **blur + lift in** (not instant pop-in) and the whole surface starts to feel responsive to touch.

> **Prompt it:** "Every clickable element scales down slightly (to 98%) when pressed, using the fast duration. Tooltips fade + lift 4px + clear a 2px blur, never appear instantly."
- - -
## Rule 8: Reveal height the right way. No fake expand tricks.

Animating expand/collapse with max-height: 9999px is jittery and times wrong. The clean modern technique is animating CSS grid rows:

```css
.reveal { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .22s var(--ease-smooth); }
.reveal[data-open="true"] { grid-template-rows: 1fr; }
.reveal > * { overflow: hidden; }
```

It animates to the content's **real** height, perfectly smooth, no guesswork. For elements that move across the layout (a card flying into a different container), use the **First → Last → Invert → Play** technique (FLIP): measure where it starts, measure where it ends, jump it back to the start visually, then animate to the end. It looks impossibly smooth and it's just two position measurements.

> **Prompt it:** "Use the grid-template-rows: 0fr to 1fr technique for expand/collapse, not a max-height hack. For the card moving between containers, use a FLIP (First-Last-Invert-Play) animation."
- - -
## Rule 9: Respect performance and accessibility, or it's not polished.

Polish includes the people who prefer less motion. Every animation system I ship honors the **reduced motion** accessibility setting. Animations collapse to instant, decorative loops stop entirely.

And for smooth 60fps playback, favor the lightweight properties, **movement and opacity**, over heavy ones like shadow stacks and height reveals. Those heavier effects are worth it in small, deliberate moments; just don't animate them across long lists or large surfaces.

> **Prompt it:** "Honor reduced motion preferences everywhere. Favor movement and fade for anything on long lists or large surfaces."
- - -
## Rule 10: State-driven design is the actual job.

This is the one nobody tells you, and it's the most important. **A component is not a picture. It's a system of states.** A button isn't "a button," it's idle / hover / pressed / loading / disabled / success.

And here's the real insight: **You might not know all the states you need until you start building it.** The Figma concept always looks complete. Then you start building, you drag the thing, and you immediately feel the holes: "this needs a working state," "the number should roll, not swap," "this label should shimmer while busy," "the icon should cross-fade between play and pause." Those micro-interactions are **discovered through use**, never specced up front.

Examples that came straight out of building, not designing:

- Numbers that **roll** digit-by-digit instead of hard-cutting.
- A **shimmer sweep** across a label while a task is working.
- Play/pause icons that **cross-fade and scale** between each other rather than swapping.

> **Prompt it:** "While it's working, don't add a spinner. Let the label text itself glow softly, like a light slowly sweeping across the word from one side to the other and back, looping about every 2 seconds. It should feel calm and alive, not flashy."

**Figma prep:** Use component variants for the states you know. Then accept that the build will surface two or three more, and that's where the polish actually lives. This is the rule that separates a mockup from a product, so treat it as the mindset you carry into all nine above.
- - -
## How to actually prompt for this

- **Give numbers, never adjectives.** "Smooth" is meaningless; a specific curve at 280ms is buildable.
- **Lead with your design tokens.** Paste the variable block first and forbid one-off values.
- **Think in states, then list them.** The model builds exactly the states you name and no more.
- **Isolate when iterating.** "Now **only** tune the shadow stack." "Now **only** the entrance." One variable at a time is how you reach polish without thrashing.
- **Describe the feeling and a reference.** "Should feel like an iOS sheet: weighty, slightly springy, settles fast." Reference-anchored requests land far better than abstract ones.
- **Handing off from Figma? Name every property to copy.** Point it at the current selection and list what to read off it: padding, gaps, tokens, colors, corner radius, type sizes and weights. Never assume the handoff tool carries it all over on its own perfectly.

## On Figma

Figma is where the concept lives, and it's worth prepping: variables mirroring your tokens, auto-layout, variants for known states. But be honest about its limit: **a Figma file is a hypothesis.** The real states, the micro-interactions, the moments that need a roll or a shimmer or a snap point only reveal themselves once you're holding the live thing and dragging it around. The design tells you where to start. The build tells you what it actually needs.

And if you hand a design off through the Figma MCP, never assume it lands pixel-perfect on its own. It won't. What I always do is point it at the current Figma selection and then spell out, in the prompt, every single property I want it to carry over: the exact padding, the gaps, the tokens, the colors, the corner radius, the type sizes and weights. Don't leave it to interpretation. List every visual property a component can be styled with and tell the model to match each one against the selection. The more explicit you are about what to read off the design, the closer the first build lands, and the less you have to claw it back by hand afterward.

## The part that doesn't come out of the model

Here's the truth under all of this. Claude, Codex, Cursor, all of these models are extraordinary. They'll build a flawless spring animation or a card-flight transition faster than anyone ever could by hand. But not one of them decided that the press should be 98% and not 95%. None of them knew the entrance needed a 2px blur, or that the slider wanted a release zone bigger than its pull-in zone, or that this specific component was missing a working state until you felt the gap.

That judgment is taste, and taste is earned: from shipping, from staring at things that feel almost right and knowing the fix, from years of noticing why one interaction delights and another doesn't. The model is the hands. The eye is still yours. That's the whole skill, and it's why two people with the same tool ship wildly different work.

**Prompts get you 90% of the way in minutes. The last 10%, the part people actually celebrate, is you.**
- - -
If any of this helped you, a like, repost, or follow would mean a lot. I’ll be sharing more breakdowns and articles like this in the future.