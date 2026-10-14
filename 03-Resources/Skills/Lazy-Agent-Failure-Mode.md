> **One-line Summary**: Agents skip relevant skills despite knowing they apply; Antigravity's PreInvocation route helps, while Claude Code needs a separate trust-aware approach.

# Lazy Agent Failure Mode

**Sources:** [[04-Archive/Voice-Notes/Voice Note 36 Transcript|Voice Note 36]] · [[04-Archive/Clippings/Agent Skill Problem|Agent Skill Problem clipping]]

## Problem
Agents recognize a skill applies ("this needs UI/UX Pro Max") but proceed without loading `SKILL.md` unless the user names it explicitly.

## Root causes
1. **Bootstrap chicken-and-egg** — execution mode bypasses skill evaluation.
2. **Fast-path bias** — model prefers immediate action over loading instructions.
3. **Context dilution** — skill list at top loses attention as conversation grows.
4. **Literal description matching** — user wording doesn't match skill trigger phrases.

## Current fix and limit
[[03-Resources/Skills/Skill-Router-Hook|Skill Router Hook]] — a separate classifier can inject matching skill pointers before the main agent runs in the Antigravity route.

Claude Code native matching can find genuine matches, but live tests showed that `UserPromptSubmit` is advisory and `PreToolUse` is treated as an injection signal. Do not claim that a generic hook forces Claude Code to invoke a skill.

## Do not rely on
- Stronger system prompts alone (Victor tested — insufficient).
- Inlining all skills in every session (context bloat).

**Tags:** #skill #routing #agent-agnostic #decision
