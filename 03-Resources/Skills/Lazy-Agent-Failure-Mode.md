> **One-line Summary**: Agents skip relevant skills despite knowing they apply — fixed by PreInvocation skill-router hook, not stronger prompts alone.

# Lazy Agent Failure Mode

**Sources:** [[04-Archive/Voice-Notes/Voice Note 36 Transcript|Voice Note 36]] · [[Clippings/Agent Skill Problem|Agent Skill Problem clipping]]

## Problem
Agents recognize a skill applies ("this needs UI/UX Pro Max") but proceed without loading `SKILL.md` unless the user names it explicitly.

## Root causes
1. **Bootstrap chicken-and-egg** — execution mode bypasses skill evaluation.
2. **Fast-path bias** — model prefers immediate action over loading instructions.
3. **Context dilution** — skill list at top loses attention as conversation grows.
4. **Literal description matching** — user wording doesn't match skill trigger phrases.

## Fix (implemented)
[[03-Resources/Skills/Skill-Router-Hook|Skill Router Hook]] — separate classifier on `PreInvocation` injects matching skill links before the main agent runs.

## Do not rely on
- Stronger system prompts alone (Victor tested — insufficient).
- Inlining all skills in every session (context bloat).

**Tags:** #skill #antigravity #decision