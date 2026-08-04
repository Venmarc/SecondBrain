> **One-line Summary**: Claude Code hook events with observed/documented trust-channel behavior — why `UserPromptSubmit` gets hedged and `PreToolUse` gets flagged as injection, sourced from live spikes + Anthropic's own guardrails docs.

---
title: Claude Code Hooks — Trust Channel Reference
tags:
  - documentation
  - architecture
  - skill-router
  - claude-code
aliases:
  - Claude Hooks Trust Reference
date: 2026-08-02
---

# Claude Code Hooks — Trust Channel Reference

**Context:** [[01-Projects/skill-router/skill-router|skill-router]] Adapter B research. Built after two live spikes ([[01-Projects/skill-router/skill-router#Spiked (2026-08-02): UserPromptSubmit hook does NOT work for Claude Code|UserPromptSubmit spike]] and [[01-Projects/skill-router/skill-router#Spiked (2026-08-02): PreToolUse is worse, not better|PreToolUse spike]]) showed hook-injected content gets progressively less trust depending on which event delivers it — this is not a bug, it's deliberate model training.

## The core mechanism (why this happens)

Claude is explicitly trained to apply different trust levels to content depending on *which channel* delivered it, not just what it says. Per Anthropic's own guardrails documentation (platform.claude.com/docs — mitigate-jailbreaks):

> "Put untrusted content only in tool results... Claude is trained to treat instructions that appear inside tool results with appropriate skepticism."
> "State the policy in your system prompt. Tell Claude explicitly that content returned from tools, documents, or searches is untrusted data and must never override the system prompt or the user's original request."

This is publicly documented, intentional anti-prompt-injection training — not something skill-router (or anyone) can prompt-engineer around from outside. **A hook that injects a directive into a tool-result-shaped channel is, structurally, indistinguishable from what Claude is specifically trained to distrust.** This is the actual root cause behind both spike results, not a phrasing/wording problem with the injected text.

**Important caveat on scope:** both spikes were run via `claude -p ... --dangerously-skip-permissions` (headless/non-interactive mode), not an interactive terminal session. The official docs call out real interactive-vs-headless differences for some hook types (e.g. `PermissionRequest` doesn't fire the same way in `-p` mode). Whether trust-channel behavior differs in an interactive session is an open, untested variable — not yet closed.

## Hook events reference (code.claude.com/docs/en/hooks, current as of spike date)

| Event | Fires when | Can block? | Trust channel / observed behavior |
|---|---|---|---|
| `SessionStart` | Session begins/resumes | No | `additionalContext` delivered before first prompt — system-adjacent, not spiked yet but structurally closer to trusted than mid-session hooks |
| `UserPromptSubmit` | User submits a prompt, before Claude processes it | Yes (`decision: "block"`) | `additionalContext` delivered *alongside* the prompt, not merged into it — **spiked: advisory, gets hedge-and-confirm treatment, not compliance** |
| `PreToolUse` | Before a tool call executes | Yes (`permissionDecision: "deny"`) | Deny reason delivered tool-result-shaped — **spiked: adversarial, explicitly flagged as prompt injection attempt and refused outright** |
| `PermissionRequest` | Tool call needs a permission decision | Yes | Not spiked. Doesn't fire the same way in headless `-p` mode without an Agent SDK `canUseTool` callback |
| `PostToolUse` / `PostToolUseFailure` | After a tool call succeeds/fails | No (PostToolUse), reports only | Tool-result channel — likely same distrust tier as `PreToolUse`, not spiked |
| `Stop` / `SubagentStop` | Claude finishes responding | Can force continuation via `decision: block` + `reason` fed back to Claude | Not spiked for skill-router purposes — used for forced verification (e.g. re-run tests before allowing stop), not routing |
| `PreCompact` / `PostCompact` | Around context compaction | No | Not relevant to routing |
| `SessionEnd`, `ConfigChange`, `InstructionsLoaded`, `Notification`, `MessageDisplay`, `SubagentStart` | Various lifecycle events | Mostly no | Not relevant to routing |

## Implication for skill-router (the actual takeaway)

Force-invocation via any hook event is fighting a deliberately-trained defense, not a gap. This reframes the whole Adapter B question:

- **This is not a "which hook event works" search problem** — the next hook down the list won't magically be exempt from this training if it's still tool-result-shaped or advisory-shaped.
- **`SessionStart`, delivered before the first user prompt, is the one channel structurally different enough to be worth testing** — it's not shaped like a tool result, and it arrives before any user text exists to compare it against. Untested whether Claude extends any elevated trust to it, or whether trust is evaluated per-message regardless of session history. **Do not assume this works — spike it, same rigor as the other two.**
- **Model-switching caveat:** even if a `SessionStart`-established context gets some elevated trust within a session, that's very unlikely to be a durable, transferable "pass" — trust is almost certainly evaluated per-channel at time of receipt, not as accumulated session-level credibility. This is a hypothesis to falsify, not lean on.

## Open spike queue (not yet run)

1. `SessionStart` `additionalContext` — does routing info delivered before the first prompt get treated with more trust than mid-session injection?
2. Interactive session (not headless `-p`) — does the hedge/injection-flagging behavior hold outside `--dangerously-skip-permissions` headless mode?
3. Multi-skill coexistence — when native matching + router both surface pointers in the same context, does Claude combine/invoke multiple skills in one turn, or still pick one? (Directly relevant to the "combine skills" value proposition, separate from the force-invocation question.)

**Tags:** #claude-code #skill-router #prompt-injection #hooks
