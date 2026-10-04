---
title: Hermes Skill Stack
date: 2026-09-07
tags:
  - hermes
  - skills
  - agent-setup
---

> **One-line Summary**: painn_x's "19 skills I'd reinstall on a fresh Hermes" — a curated agent skill stack with install order, and the principle "install the ones that remove a pain you have this week, not the ones that sound cool."

**Source:** [painn — "Setup from scratch"](https://x.com/painn_x/status/2095060006127149480) — `~1.1k likes`.

## The principle
Skills are files. Install the ones that remove a pain this week; a small set you actually trigger beats a junk drawer. "Do not collect skills like stickers."

## The 19 skills (repo · what it fixes · when)
| # | Skill | Repo | Fixes / when |
|---|---|---|---|
| 1 | Agent-Reach | `Panniantong/Agent-Reach` | Free access to X/Reddit/YouTube/GitHub; social listening, competitor tracking. First thing to install. |
| 2 | Browser Harness | `browser-use/browser-harness` | Static browser tools break on layout changes; writes helpers on the fly. Use a separate browser profile. |
| 3 | i-have-adhd | `ayghri/i-have-adhd` | Action-first, numbered steps, no preamble/sign-off. Default response style. |
| 4 | codebase-memory-mcp | `DeusData/codebase-memory-mcp` | Index a codebase into a knowledge graph; stop rereading files. Medium-to-large repos. |
| 5 | OpenMontage | `calesthio/OpenMontage` | Agentic video production (script→edit→caption→export). Short-form content, demos. |
| 6 | Composio skills | `ComposioHQ/skills` | Safe auth/sessions/triggers into Gmail, Slack, GitHub, CRM. |
| 7 | Defuddle | `kepano/defuddle` | Strip a page to clean Markdown; research, clipping. |
| 8 | Minions | `agent37-platform/minions` | Kanban panel to track parallel Hermes sessions, approvals. |
| 9 | addyosmani/agent-skills | `addyosmani/agent-skills` | Spec/plan/build/test/review/ship discipline. Real products, not throwaways. |
| 10 | Resemble AI Detect | `resemble-ai/detect-skill` | Flag AI-generated/fake media. Signal, not proof — keep a human in the loop. |
| 11 | Loopy | `Forward-Future/loopy` | Agent loops: repeat, measure, keep only if it improved, stop on condition. Tuning/flaky tests. |
| 12 | Anthropic Cybersecurity Skills | `mukul975/Anthropic-Cybersecurity-Skills` | 818 skills / 34 security domains. Offensive content — scope matters. |
| 13 | claude-mem | `thedotmack/claude-mem` | Compress sessions to local long-term memory; `<private>` tags. |
| 14 | youtube-full | `ZeroPointRepo/youtube-skills` | Transcripts/search/channels without yt-dlp cloud-IP blocks. |
| 15 | make-interfaces-feel-better | `jakubkrehel/make-interfaces-feel-better` | UI polish pass: spacing, hover, icons, hit areas, motion. After a frontend ships. |
| 16 | SkillClaw | `AMAP-ML/SkillClaw` | Evolve/clean skills from real usage. Optimization layer, not a start. |
| 17 | Matt Pocock skills | `mattpocock/skills` | Small editable composable engineering skills. TypeScript, tickets, shipping. |
| 18 | Humanizer | `blader/humanizer` | Strip AI-sounding text; rewrite, check, rewrite. Public-facing writing. |
| 19 | oh-my-hermes (OMH) | `witt3rd/oh-my-hermes` | Multi-agent orchestration: research, requirements, planning consensus, execution checks. |

## Stacks
- **Starter** (day 1): Agent-Reach, youtube-full, Defuddle, Humanizer, Minions, i-have-adhd.
- **Serious coding**: codebase-memory-mcp, addyosmani/agent-skills or Matt Pocock, oh-my-hermes, make-interfaces-feel-better, claude-mem.
- **Content/media**: OpenMontage, youtube-full, Humanizer, Resemble Detect.
- **Power-user growth**: SkillClaw, Loopy, Browser Harness, Composio.

## Install order (one hour on a new machine)
Agent-Reach → Humanizer → youtube-full → Matt Pocock or addyosmani → codebase-memory-mcp → Minions. Then claude-mem and i-have-adhd. Ship real work for a week before the rest.

## Symptom → fix map
blind online → Agent-Reach · fake drafts → Humanizer · session chaos → Minions · repo thrash → codebase-memory-mcp · weak process → Matt/Addy · video → OpenMontage · browser chores → Browser Harness · no memory → claude-mem · AI-talk wasting time → i-have-adhd

## Security rules
Only run offensive security skills on systems you own; separate browser profiles for autonomous agents; read install scripts before piping to shell; keep secrets out of prompts/logs; prefer local-first for sensitive data.

**Tags:** #hermes #skills #agent-setup
