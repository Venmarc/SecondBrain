---
title: "Lesson: Product Vision Integrity"
date: 2026-06-28
tags:
  - lesson
  - product
  - vision
  - testing
  - momentum
  - generalizable
aliases:
  - Product Vision Integrity
  - Tagline Drift
  - Developer Blindness
---

# Lesson: Product Vision Integrity

> **One-line Summary**: Two forces erode what you set out to build — scope drift during development and developer blindness to the gap — and the fastest fix for both is reading your own tagline and showing the app to someone who has never seen it.

## Force 1: Tagline Drift

**What happened with Momentum:**

> *"I've come to realize that the site/app currently presents as a gamified wellness, habit tracker. But that's not what I set out for... For the app to actually follow the tagline 'tell you where you are winning or failing', there has to be something more than data collection and visualization."*

The tagline promised: *"Your personal operating system for habits, fitness, and wellness that actually adapts to your life and shows you why you're winning or failing."*

The built product delivered: a data logger with charts.

These are not the same product. The tagline implies analysis, causality, and feedback. The app delivers collection and display. The gap opened because:
- "Gamification" gets added to make logging feel rewarding
- Charts get built to make data feel meaningful
- The actual "why are you winning or failing" analysis never gets scheduled
- Each individual feature decision seems fine; the cumulative direction is wrong

**The fix:** Put your tagline at the top of your `PRD.md` (Momentum's already does this). At the start of every dev session, read it. Ask: does what I'm building today move the product toward that tagline, or away from it?

If you're adding features that feel good but don't deliver the core promise, you're drifting.

---

## Force 2: Developer Blindness

**What happened:**

> *"He didn't even have to visit that many pages to ask those questions. He just asked stuff that a typical wellness tracker, habit tracker, and a fitness tracker is supposed to do."*

Victor's friend asked questions in 5 minutes that Victor hadn't thought of after months of building:
- What do users gain from using this?
- What motivates them to come back tomorrow?
- What about notifications?
- Why can't you input sleep hours directly (without a slider)?

These aren't architectural questions. They're obvious product questions. They're obvious *because the friend had fresh eyes*. Victor had become blind to them through familiarity.

**The mechanism of blindness:** When you build something yourself, you know the workarounds. You know that the slider for sleep hours gets you to 7.0h — you do it automatically. You don't feel the friction of a new user who expected to type "7". You know which page has the body measurement tracker — so you don't notice it takes 4 navigation steps to reach.

**The fix:** Before any major push or sharing, find someone who has never seen the app. Give them a task — not a tour. "Log your workout from yesterday." "Record how you slept last night." Watch without helping. The first 5 minutes of watching someone use your app cold is worth 10 hours of self-review.

**Standard outsider test questions to ask (or anticipate):**
1. What do you gain from using this app that you can't get without it?
2. What would make you come back tomorrow?
3. What did you expect to be able to do that you couldn't?
4. What felt confusing or slow?
5. What's missing that any [type] tracker would have?

---

## The Diagnostic Question
Before shipping any feature, ask: *"Does this move us closer to the tagline or further from it?"*

Before shipping any version, ask: *"Could a stranger answer 'what does this app do for me?' in 10 seconds?"*

---

## Rule for Future Projects
Add to every project's `PRD.md` under a visible section:
> **Drift Check:** Read this tagline at the start of every session. If what you're building today doesn't serve it, stop.

---

## Where This Appeared
- [[01-Projects/Momentum/Lessons-from-DEV_NOTES]] — tagline drift observation and friend review (bottom section)
- [[01-Projects/Tempire/Tempire#Session log (condensed)|Tempire sessions]] — "product journey > marketing" (2026-05-11)

## Related
- [[01-Projects/Momentum/Docs/PRD]] — the tagline this note references
- [[01-Projects/Tempire/Docs/PRD]]
- [[03-Resources/MOC-UI-UX-Lessons]]

**Tags:** #lesson #product #vision #testing #momentum #generalizable
