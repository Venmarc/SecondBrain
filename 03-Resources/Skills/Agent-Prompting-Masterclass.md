# Skill: Agent Prompting Masterclass

> **One-line Summary**: Comprehensive prompt engineering masterclass for eliciting high-quality, professional code from AI agents.

## Description
The compiled system for getting non-generic, premium output from AI agents (Antigravity, Claude, Grok). The single biggest lever on output quality is the prompt — not the tool.

## Use When
- Starting any UI/UX task with the agent
- Getting a component built (risk of generic AI slop)
- Asking for a full page design
- Any creative or design-adjacent task

## The Core Insight (from Grok, 2026-06-03)
The real secret is explicitly banning mediocrity + forcing comparison to top-tier products. Saying "no generic AI slop" and "feels like Linear/Arc/Vercel/Apple" dramatically raises output quality.

Two things that unlock better output every time:
1. Tell the agent what role to inhabit — "You are a world-class frontend engineer, ex-Principal at Vercel/Apple"
2. Name what you don't want — "Do not give me average AI output. Do not use generic Tailwind patterns."

---

## The Master Prompt (Base Layer)
Apply this as a prefix to any design/UI task:

You are a world-class frontend engineer (ex-Principal at Vercel/Apple). Never output generic AI code.

Rules:
- Use modern 2026 best practices: Tailwind + native CSS where superior, semantic HTML, zero bloat.
- Prioritize buttery interactions, micro-animations, and delightful details.
- Always make it fully responsive, accessible (ARIA), and performance-obsessed.
- Think like a designer who codes: excellent typography, whitespace, visual hierarchy.
- Challenge my request if it's mediocre. Suggest superior alternatives.
- Output clean, production-ready code with explanations only for non-obvious decisions.

---

## Prompt Templates

### Component Build
Using the master frontend engineer rules: Build a [component name] that feels premium and 2026-native.
Make it highly interactive with smart hover/focus states, loading states, and subtle spring animations.
Prioritize buttery feel over flashy effects. Dark mode ready. Mobile-first.
No generic Tailwind classes — craft intentional, purposeful design.

### Full Page
Act as a senior frontend + product designer. Create a complete [page name] for [product].
Requirements: Hero that stops scroll / Exceptional typography and spacing / Scroll-triggered micro-interactions / One "wow" element that feels hand-crafted / Perfect mobile experience.
Push back on anything boring. Make it actually impressive.

### No Slop Enforcement
Generate [UI element] but do not give me average AI output. Study the best current web experiences (Linear, Arc, Vercel, Apple) and create something at that level or better.
Deliver: 1. The code 2. One-sentence rationale for key design/UX decisions 3. What makes this not generic

### Theme Toggle (Tempire-specific)
You are a world-class frontend engineer. Build a theme toggle for Tempire (premium marketplace).
Requirements: CSS custom properties as source of truth / Smooth transition, no flash or jarring contrast / Persists via localStorage, respects system preference / Toggle feels premium — think Arc Browser / Zero layout shift on hydration (SSR-safe with next-themes).
Reference: How Linear.app handles their theme system. Match that quality. Do not give me a basic shadcn Switch.

### Hamburger Menu (Tempire-specific)
You are a world-class frontend engineer. Redesign the hamburger menu for Tempire.
Reference: awwwards.com navigation — overlay style, staggered link animations, close interaction.
Requirements: Full-screen or partial overlay (not a dropdown) / Staggered entrance animation on items / Categories show REAL count from DB / Accessible: focus trap, ESC to close, ARIA / Feels premium, matches Tempire dark aesthetic.
Show me 2 approaches, build the stronger one, explain why.

---

## Agent-Specific Notes

### Antigravity (Primary Agent)
- Has skills: ui-ux-pro-max, marketingskills, seo-skills, 48 Laws of Web Design
- Problem (2026-06-03): Skills exist but weren't activating properly. Cause: prompts not explicit enough about which skill to use.
- Fix: Start prompts with "Using your ui-ux-pro-max skill..." or "Apply the 48 Laws of Web Design to..."

### Claude (Planning / Vault)
- Best for: planning, structuring, stress-testing ideas, processing inbox
- Use the BRAIN.md processing prompt for inbox items

### Grok
- Best for: quick research, validating ideas, summarizing X threads
- Conversations worth keeping go in [[03-Resources/Saved-Threads/]]

---

## Related Skills / Notes
- [[03-Resources/Skills/Frontend-Awesomeness]]
- [[03-Resources/Design/48-Laws-of-Web-Design]]
- [[01-Projects/Tempire/Tempire#TODO (when revived)|Tempire TODO]]

**Tags:** #skill #prompting #ai-workflow #tempire
