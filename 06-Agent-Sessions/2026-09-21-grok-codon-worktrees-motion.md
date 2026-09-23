> **One-line Summary**: Five Codon Labs worktrees for smooth-scroll, nav autohide, hero pin-fade, process puck Y-lock, and FAQ motion polish. Servers on 4322–4326.

**Date:** 2026-09-21
**Agent:** Grok
**Project:** [[01-Projects/Clone-Website/Clone-Website|Clone-Website]] / `~/Documents/Codon-Labs`

## Goal
Implement audit motion/depth in isolated worktrees. First: momentum smooth-scroll that keeps keyboard and find. Then nav hide, hero pin, process puck, FAQ polish.

## Decisions
- Native `window` scroll is the source. No `wheel` `preventDefault`. Same split as glossary antigravity (fixed wrapper, transformed content, body height = content).
- GSAP ScrollSmoother is paid. Vanilla JS in `src/lib/smooth-scroll.js`.
- `.astro` is not symlinked. Shared `.astro/dev.json` would kill the main `:4321` server.
- `node_modules` is symlinked as requested.

## Worktrees
| Path | Branch | Port | Contains |
|---|---|---|---|
| `.worktrees/smooth-scroll` | `feat/smooth-scroll` | 4322 | Smoother only |
| `.worktrees/nav-autohide` | `feat/nav-autohide` | 4323 | Smoother + nav hide/show |
| `.worktrees/hero-pin-fade` | `feat/hero-pin-fade` | 4324 | Smoother + nav + hero cell pin/fade |
| `.worktrees/process-puck` | `feat/process-puck` | 4325 | Smoother + puck Y-lock |
| `.worktrees/motion-polish` | `feat/motion-polish` | 4326 | Smoother + FAQ grid rows + fewer reveals |

## Not in a worktree yet
Process depth sandwich (sticky scene + wash). Next branch when Victor wants it.
