---
title: MOC: UI/UX Lessons
date: 2026-06-28
tags:
  - moc
  - ui-ux
  - hub
  - lessons
  - navigation
aliases:
  - UI/UX Lessons
  - UI/UX Lessons MOC
---

# MOC: UI/UX Lessons

> **One-line Summary**: Map of Content linking every documented UI/UX lesson, pattern, and trap across all projects — the graph hub for frontend knowledge in this vault.

---

## What This Is
This note has no content of its own. Its job is to link everything together so the graph looks the way it should. Every UI/UX lesson discovered in any project should link back here, and this note links back to them.

When you're starting a new project, read this page. When you discover a new lesson, add it here.

---

## ⚡ Phase 0 focus (Momentum + Ledger, 2026-07)

Prioritize these during foundation — not theme showcases or feature sprawl:

**Momentum**
- [[03-Resources/Skills/Back-Button-Hierarchy]] · [[03-Resources/Skills/Sticky-Top-Bar-Navigation]]
- [[03-Resources/Skills/Dashboard-As-Overview]] · [[03-Resources/Skills/Navigation-Design-Basics]]
- [[03-Resources/Skills/State-Isolation-Per-Record]] — habit log per-day state
- [[03-Resources/Skills/Smart-Form-Controls]] — save disabled when unchanged
- [[03-Resources/Skills/Nested-Route-Active-State]] — parent nav on sub-routes
- [[03-Resources/Skills/Product-Vision-Integrity]] — one-goal PRD check
- [[03-Resources/Skills/Frontend-Awesomeness]] — premium feel without game UI
- [[03-Resources/Skills/AI-UI-Antipatterns-Watchlist]] — anti-slop review

**Ledger**
- [[01-Projects/Ledger/Docs/DESIGN]] — restraint, tabular nums, budget threshold colors
- [[03-Resources/Skills/Sticky-Top-Bar-Navigation]] · [[03-Resources/Skills/Dashboard-As-Overview]]
- [[03-Resources/Skills/Collapsible-Desktop-Sidebar]] — edge-to-edge shell, portal tooltips
- [[03-Resources/Skills/Theme-Switching-Foundation]] — flash prevention, hydration guards
- [[03-Resources/Skills/Responsive-Data-Viz]] — mobile-first charts later (Phase 2+)
- [[03-Resources/Skills/Smart-Form-Controls]] — instant expense logging UX
- [[03-Resources/Skills/Discrete-State-Control-Selection]] — Transaction_UI_Spec §4; Type/Date Range as segmented, month picker as slider (same screen, two correct answers)

---

## 🔴 Agent Traps (Things Agents Consistently Get Wrong)

These are patterns where Antigravity, Gemini, or any agent will produce the wrong output unless you explicitly specify otherwise in the prompt.

- [[03-Resources/Skills/Browser-Native-Dialog-Trap]] — `window.confirm()` instead of custom dialogs
- [[03-Resources/Skills/Theme-Aware-Component-Checklist]] — hardcoded dark colors in skeleton loaders, hover states, logo text
- [[03-Resources/Skills/Nested-Route-Active-State]] — exact path match breaks sidebar on sub-routes
- [[03-Resources/Skills/Tooltip-Edge-Overflow]] — fixed-direction tooltips cause horizontal scroll at edges
- [[03-Resources/Skills/Smart-Form-Controls]] — always-enabled save button, icon-only labels
- [[03-Resources/Skills/Context-Aware-Form-Fields]] — same input fields for all entity types regardless of their nature
- [[03-Resources/Skills/Discrete-State-Control-Selection]] — slider for bounded discrete states (3 fixed options) — fake discretization via snap points costs motion surface + a11y for nothing

---

## 🟠 State & Data Patterns

These are architectural traps that produce subtle bugs that are hard to reproduce.

- [[03-Resources/Skills/State-Isolation-Per-Record]] — form state bleeding across date-switched or record-switched views
- [[03-Resources/Skills/Context-Aware-Form-Fields]] — type-driven field sets for multi-type entities

---

## 🟡 Mobile & Responsive Patterns

- [[03-Resources/Skills/Responsive-Data-Viz]] — mobile strategy for charts, heatmaps, data grids (decide before building)
- [[03-Resources/Skills/Tooltip-Edge-Overflow]] — floating element collision detection

---

## 🟢 Theme & Visual System

- [[03-Resources/Skills/Theme-Switching-Foundation]] — architectural foundation (build both themes from commit 1)
- [[03-Resources/Skills/Theme-Aware-Component-Checklist]] — component-level audit after implementing toggle
- [[03-Resources/Skills/Error-Pages-and-Canva-Colors]] — sRGB color mismatch between Canva and browser

---

## 🔵 Product Thinking

- [[03-Resources/Skills/Product-Vision-Integrity]] — tagline drift and developer blindness
- [[03-Resources/Skills/Frontend-Awesomeness]] — prompting for premium output
- [[03-Resources/Skills/Reverse-Engineering-UI-Components]] — library → own component system
- [[03-Resources/Skills/Clerk-Auth-Card-Contrast]] — auth UI readability
- [[03-Resources/Skills/Agent-Prompting-Masterclass]] — full prompting system

---

## 📐 Design Reference

- [[03-Resources/Design/48-Laws-of-Web-Design]] — aesthetic framework Tempire is built on
- [[03-Resources/Skills/UI-Polish-Ten-Rules]] — distilled from Kevin's X article; snap points, layered shadows, triple entrance, state-discovery, prompting recipes. The motion-skills half lives in `~/.agents/skills/feel-router`; the philosophy half lives here.

---

## 🔗 Project Cross-References

**Lessons discovered in Momentum:**
- L01-L18 → [[01-Projects/Momentum/Lessons-from-DEV_NOTES]]
- Most lessons above sourced here

**Lessons discovered in Tempire:**
- Navigation link redirect bugs → [[01-Projects/Tempire/Tempire#TODO (when revived)|Tempire TODO]]
- Product journey > marketing → [[01-Projects/Tempire/Tempire#Session log (condensed)|Tempire sessions]]
- Human-readable download filenames → [[03-Resources/Skills/Secure-Downloads-Middleware]]

---

## Lessons Queued for Documentation

These lessons exist in the vault but haven't been written as atomic notes yet. Process when time allows:

- [ ] **Back button hierarchy** (L10): Victor defined 2026-07-09 — `/today` is tree root; top-level pages back → Today; nested pages back → parent (not browser history). Mobile needs in-app Back. Raw notes: `Documents/Research_files/Back_button_hierarchy.md` + Justinmind nav/dashboard articles (ingest after knowledge-extractor; do not distill yet).
- [ ] **Sticky nav scroll pattern** (L02): data-heavy pages (Progress, Analytics) benefit from headers that become sticky nav on scroll
- [ ] **Settings unsaved state detection** (L07): prompt on navigation when unsaved changes exist
- [ ] **Agent skill activation** (L20): must explicitly name skill in prompt prefix (`Using your ui-ux-pro-max skill...`)
- [ ] **45 Claude Design Skills distillation** (L28-L31): motion rules, taste dials, anti-pattern rules — distill from clipping

---

## How to Use This Note
- Paste this URL into any new project's `AGENTS.md` quickstart so the agent reads it on session start
- Before any UI build task, check if a relevant lesson exists here
- After any major testing session, add new lessons to this page and create their atomic note

**Tags:** #moc #ui-ux #hub #lessons #navigation
