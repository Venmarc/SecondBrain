
---

name: profile

description: Who RedMane is — solo developer, studio, and what they build

---

- Goes by RedMane

- Solo developer operating under the studio name [Venmarc Studio](https://venmarcstudio.xyz)

- Builds consumer apps and agentic tooling systems

- Does design work connected to a fashion brand called Daniel Élan

- Primary development environment is a Linux PC

- GitHub: [Venmarc](https://github.com/Venmarc)

  

---

name: career-strategy

description: Self-assessment on packaging/shipping products, audience-building, and selling mindset

---

- Habitually builds walkarounds/fixes for problems encountered personally, but doesn't package them as shippable products or publicly document the build journey

- Keeps repos public partly so agents can point to them, partly for visibility

- Believes the biggest gap is not having positioned himself mentally as someone who sells things to people

  

---

name: design

description: Design work, aesthetic sensibility, and Figma workflow notes

---

- Vibe coder with a strong eye for high-quality web design and visual aesthetics

- Does flyer and fashion design work outside of app development

- Created promotional flyers for Daniel Élan in Figma via MCP

- Learned that Figma image reuse works through imageHash extraction rather than CDN access

- Learned that Figma MCP pages load lazily and require explicit setCurrentPageAsync() before reading children

  

---

name: recent-work

description: Work activity that doesn't rise to a tracked project

---

- Worked through platform bios across X, GitHub, Instagram, and LinkedIn under VenMarc Studio; open question of whether to lead with AI tooling or consumer apps

- Sought Anthropic API access and drafted a use case description grounded in agentic workflow systems (awaiting access)

  

---

name: tools

description: Development environment, vault, and tooling setup

---

- Maintains a structured personal knowledge vault in Obsidian called [SecondBrain](https://github.com/Venmarc/SecondBrain)

- Has a pattern of building systems to formalize and externalize own workflows

- Structures knowledge by analogy to files already in the vault

- Set up an Obsidian-based SecondBrain on Linux, working around Claude Desktop unavailability on Linux using the obsidian-claude-code-mcp plugin via WebSocket

- Produced a comprehensive sidebar UX reference document for the Obsidian vault covering collapsed-to-icons default with localStorage persistence, anti-jitter rules, tooltip architecture, and moving Sign Out to an avatar dropdown

- Default tech stack for apps: Next.js, TypeScript, Tailwind, shadcn, Supabase, Clerk

- Keeps repos public partly so agents can be pointed at them directly and partly for intentional visibility

  

---

name: agent-memory-architecture

description: Two-tier agent memory + multi-agent routing and review pipeline setup

aliases: [ANTI_PATTERNS, GEMINI.md]

---

- Redesigned agent memory and documentation architecture as a two-tier system separating episodic session logs from a durable cross-project ANTI_PATTERNS.md

- ANTI_PATTERNS.md uses per-technology headers and a 200-line split threshold

- Updated GEMINI.md with four deterministic memory_save triggers

- Uses agentmemory MCP as a supplementary semantic recall layer, not a parallel memory bank

- Uses multiple AI agents: AGY/Antigravity CLI, Grok, OpenCode, Gemini

- Routes agents via a PreInvocation skill-router that injects relevant skills before the main agent runs

- Built a multi-model review pipeline with specialized subagents: consistency-auditor, detail-hawk, edge-case devil's advocate, synthesizer

  

---

name: design-extraction-system

description: System to reverse-engineer visual effects from premium sites and apply them to projects

aliases: [Pastries, EFFECTS_GLOSSARY, EFFECTS_PLAYBOOK]

---

- Building a design-extraction and replication system to reverse-engineer visual effects from premium websites and apply them to own projects

- Includes two vault documents: EFFECTS_GLOSSARY.md and EFFECTS_PLAYBOOK.md

- Completed a real extraction pass on fin.com (Nuxt + TresJS + Three.js + GSAP + Lenis stack)

- Maintains a "Pastries" sandboxed build environment where extracted effects are rebuilt and performance-audited

- Effects must hit 95+ performance audit before being considered tested

- Currently working on replicating the antigravity.google hero cursor-reactive particle swarm; prior attempts (ink swarm, vortex) used real particle-to-particle repulsion physics

  

---

name: ledger

description: Ledger personal finance tracker — stack, locked decisions, and scope

---

- [Ledger](https://ledgerix.vercel.app) is a personal finance tracker app

- Built on Next.js, TypeScript, Tailwind, shadcn/ui, and Supabase, with Clerk for auth

- Documented with a standardized 9-document spec system (PRD, TRD, PAGE_SPECS, APP_FLOW, UI/UX_BRIEF, SCHEMA, PHASES, INSIGHTS/NOTES, AGENTS/AGENT_CONTEXT)

  

Locked-in decisions:

- NGN-only currency with a lightweight reference widget via exchangerate-api.com

- exchangerate-api.com API key is server-only, routed through app/api/rates/route.ts

- All monetary values stored as numeric(15,2)

- All user/clerk IDs stored as text, not uuid

- RLS uses auth.jwt() ->> 'sub'

- Orange (#F97316) primary accent; azure (#38BDF8) for active nav

- Space Grotesk for display; Inter with tabular-nums for body/monetary

- Phase 0 Theme Toggle with localStorage persistence, defaulting to dark regardless of OS preference

  

Scope:

- August scope locked to Phases 0–3

  

---

name: momentum

description: Momentum habit and fitness tracker — stack, v1 decisions, ship target

---

- [Momentum](https://peakmomentum.vercel.app)is a habit and fitness tracker app

- Built on Next.js, TypeScript, Tailwind, shadcn/ui, and Supabase, with Clerk for auth

- Documented with a standardized 9-document spec system (PRD, TRD, PAGE_SPECS, APP_FLOW, UI/UX_BRIEF, SCHEMA, PHASES, INSIGHTS/NOTES, AGENTS/AGENT_CONTEXT)

  

v1 decisions:

- Dark mode only in v1

- Sleep input as slider plus tap-to-type

- Browser push notifications via Service Worker and VAPID keys in Phase 3

- Realistic ship target of mid-September 2026

  

---

name: readme-generator

description: Agent-agnostic readme-generator skill — scope and edge-case handling

aliases: [readme-generator]

---

- Skill lives at github.com/Venmarc/readme-generator

- Audited and rewrote the skill to be agent-agnostic, removing Antigravity/Superpowers runtime lock-in

- Handles eleven edge cases (missing manifests, monorepos, exposed secrets, etc.)

- Merged into a single self-contained SKILL.md under the recommended 400–600 line ceiling

  

---

name: daniel-elan

description: Fashion brand RedMane does design work for

aliases: [Daniel Élan]

---

- Daniel Élan is a fashion brand RedMane does design work connected to

- RedMane created promotional flyers for Daniel Élan in Figma via MCP