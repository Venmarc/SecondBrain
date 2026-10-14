---
title: Hermes Provider Bridge Runbook
date: 2026-10-14
tags:
  - tools
  - hermes
  - providers
  - agent-ops
status: reference
---

# Hermes Provider Bridge Runbook

> **One-line Summary**: Verified bridge rules for Claude and Antigravity lanes, including request paths, replay framing, image limits, safety controls, and scope boundaries.

## Use this note when

- Adding or repairing a Hermes provider bridge.
- Routing a provider through a local compatibility service.
- Replaying tool history through a Claude-compatible lane.
- Changing the provider model or base URL.

## Verified bridge rules

### Keep provider scope narrow

- Never set a bridge URL at the top-level default model configuration.
- A top-level `model.base_url` can redirect every provider's default lane.
- Scope the override to the intended provider or lane.
- After any change, run a real client canary against the default lane and the bridged lane.

### Match the client's final request path

- A provider's documented base URL may not be the path the SDK sends.
- Inspect the composed request path before changing credentials.
- Some custom providers need both `/v1/chat/completions` and `/chat/completions` aliases.
- Model-specific flags must match the target model family. Do not pass Gemini-only flags to other models.

### Treat replay as text, not as live tool execution

- Drop replayed `tool_use` blocks before sending history to Claude Code.
- Flatten replayed results into user-role text with a clear tool-result label.
- Add a bridge note that identifies the text as trusted host output.
- Do not expect foreign tool IDs to survive the Claude CLI's live-tool path.

### Route images through descriptions when required

- The Claude Agent SDK path used by the bridge drops unsupported image blocks.
- Use the configured vision-description path when the bridge needs image input.
- Record that this is text-mediated vision, not native image-block passthrough.

### Test the bridge as an agentic system

Verify all of these before enabling a lane:

- Text completion.
- Streaming output.
- Tool execution and replay behavior.
- Image description behavior, when applicable.
- Systemd restart behavior, when applicable.
- Sandbox boundaries.
- A kill switch that stops the bridge and prevents further work.

## State boundary

This runbook records verified bridge mechanics. Current provider availability, subscription status, model quality, and automatic routing are not maintained in the vault.

## Source extraction

The mechanics came from the 2026-08-13 through 2026-08-16 Hermes bridge sessions. Their current state, open questions, and deletion record live in [[06-Agent-Sessions/extracted-sessions|Extracted Sessions]].

**Tags:** #tools #hermes #providers #agent-ops
