# Effects Build Playbook

> **One-line Summary**: Step-by-step replication-and-build workflow that turns glossary entries into Pastries reps — companion to [[03-Resources/Tools/Effects_Playbook|Effects Playbook]] (which owns extraction).

Companion to [[03-Resources/Tools/Effects_Playbook|Effects Playbook]]. The extraction playbook is the upstream half — how you pull a technique out of a live site and write it as a glossary entry (`untested` → `extracted`). This is the downstream half — how you turn a glossary entry into a standalone Pastries rep that passes the Lighthouse 95+ gate, the feel-check, and the mobile/touch fallback gate. After that, the glossary entry is `tried`. Only a real project ship upgrades it to `adopted`.

**Read both playbooks at the start of a build session** — the extraction playbook's intake format, identification cheat sheet, and gates (procedural-vs-image, library-vs-vanilla, mobile/touch) all carry over. This playbook adds the build-specific steps.

**Agent-driven builds read this in concert with [[Effects_Glossary|Effects Glossary]] and `~/Pastries/AGENTS.md`.** The entry contract lives inside `~/Pastries/AGENTS.md` — read that first, then this.

---

## Reference files for every build

The agent loads these every build session, not just the playbook:

- `[[03-Resources/Tools/Effects_Glossary|Effects Glossary]]` — what we're building; entries have Literal / Technique / Cost / status. Target statuses we promote from: `extracted` or `tried`. Goal: status `tried` (or `adopted` if we ship it).
- `[[Effects_Build_Playbook]]` (this file) — build workflow + gates.
- `~/.agents/skills/_shared/MOTION-STANDARDS.md` — easing tokens (`--ease-out`, `--ease-in-out`, `--ease-drawer`), duration budgets, spring configs, gesture math, performance rules, Framer Motion avoid-by-default rule. **Any time a glossary entry's Technique line says "transition" or "animation", pull the canonical token from this file** — never invent a fresh cubic-bezier.
- `~/.agents/skills/feel-router/SKILL.md` — the lane dispatcher. The Build lane loads this playbook; the Adopt lane loads the Adopt phase below.
- `~/Pastries/AGENTS.md` — the Pastries-side entry contract (naming, scaffold conventions, status flow).

---

## Agent intake (build-side, same 4-line paste as the extraction playbook)

Before any scaffolding, paste:

1. **What are we building?** — which glossary entries to compose into a single rep. e.g. `[Layout] Hero viewport lock` + `[Depth] Section bottom glow` (the Venmarc pattern), or `[Motion+Depth] Spinning 3D globe` + `[Depth] Hex code rain` (one big element solo, the Antigravity-style model).
2. **Why?** — usually to prove the pipeline. If the build is for a specific project (Momentum's landing hero, Ledger's panel), say so — that informs token reuse.
3. **What's the speed budget?** — confirm the default: **prioritize speed, procedural over image, no animation library unless justified, Lighthouse 95+ on `npm run preview`**. State this explicitly even when obvious. Prevents defaulting to Framer Motion or a heavy WebGL scene.
4. **Rep structure?** — three options (see §Rep structure below):
   - **Standard:** one rep page, 2–3 extracted components present and identifiable.
   - **Solo:** one large component alone on a page (a globe, a particle swarm) — isolates behavior and performance.
   - **Escalation:** multi-page rep (the fin.com build model). For the first pass of a target, default to Standard unless you explicitly request Escalation.

---

## Investigation-free zone (build, not re-extraction)

The build path **does not re-audit the source site**. If the glossary entry's Technique line is incomplete, the answer is "go back to the Extract lane" (Extraction Playbook) — not "improvise a technique here." The Build playbook trusts `extracted` and `tried` entries as if they were a brief: copy Literal + Technique + Cost in, and build from there.

If, mid-build, you realize the Technique line is wrong or incomplete, **stop and propose an Extract reentry**, don't paper over it with a different effect that happens to work.

---

## Build workflow (codified — no Go-Grok improvisation required)

**Step 1 — Intake.** The four lines above. Confirmed before scaffolding.

**Step 2 — Token setup gate.** Before any component code, drop a `:root` block into the rep's `src/styles/tokens.css` (or equivalent in your stack):

```css
:root {
  /* Easing (canonical — match _shared/MOTION-STANDARDS.md and Effects_Glossary.md §Motion tokens) */
  --ease-smooth: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-out:    cubic-bezier(0.23, 1, 0.32, 1);
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
  --ease-spring: cubic-bezier(0.35, 1.55, 0.65, 1);

  /* Duration */
  --duration-fast: 150ms;
  --duration-normal: 200ms;
  --duration-slow: 280ms;

  /* Radius — adapt to the glossary entry's source site if known */
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 24px;
}
```

If a glossary entry specifies a fourth uncommon radius or a different curve (e.g. an Ionic drawer curve on a specific site), add only what's needed — don't fork your own motion vocabulary. The shared standards file is the source of truth.

For layered shadows, copy the X article's `--shadow-card` two-preset recipe from `UI-Polish-Ten-Rules.md` (Unit 5 — pending) — the hairline-ring replaces the border, opacities stay tiny (2%–8%).

**Step 3 — Scaffold.** Pastries default stack (matches the existing reps):

```bash
cd ~/Pastries
npm create vite@latest rep-<source>-<what-we-copied> -- --template react-ts
cd rep-<source>-<what-we-copied>
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install next-themes
# Playwright tooling reused from the shared helper
ln -sf ~/.agents/playwright-core/clean-context.mjs scripts/clean-context.mjs 2>/dev/null || true
npm i -D @playwright/test
```

Folder contract: `rep-<source>-<what-we-copied>/` — name the **effect**, not the domain. Past `venmarc-viewport-glow-rep` (good) not `venmarc-grab` (bad). See `~/Pastries/AGENTS.md` for the contract.

If the glossary entry is `[Motion+Depth] Canvas/WebGL`, install the smallest library needed (Three for the Antigravity swarm, TresJS for the fin.com Vue pattern, none for a 2D Canvas effect). **Prefer vanilla Canvas 2D where the glossary shows a 2D context.** Never reach for Three when Canvas 2D covers the effect at the glossary's cost tier.

**Step 4 — Build the primitives (one per glossary entry).** Build components in dependency order: a backdrop element before a cursor glow (because the glow depends on `overflow:hidden` from the backdrop), an IntersectionObserver hook before scroll-reveal list items that use it, and so on.

Each component follows the glossary entry's **Literal / Technique / Cost** as a spec:

- **Literal governs the visual contract** — if it doesn't look like the one-liner, the build is wrong.
- **Technique governs the implementation** — the exact CSS / library / approach the entry names.
- **Cost governs performance decisions** — if a glossary entries says "near-zero if static, expensive if animated", don't animate unless that's part of the effect.

Reusable primitives, not one-offs. The Exit/Build/Adopt lanes treat the rep's `src/components/` as a small reusable library, not script soup. Path: `src/components/<effect-name>/index.tsx` plus `index.css` if needed.

Do **not** add Framer Motion unless the glossary entry's Technique line or the Build lane justification explicitly requires a gesture-driven interruptible motion. Put any library import under a comment: `// Justification: <gesture-driven interruptible motion | multi-element orchestration | shared-element transition>.` If no justification fits, the import is a finding.

**Step 5 — Compose the rep page.** This is the "go crazy" step — the prescribed version of how the Venmarc build went.

### Rep structure (default: Standard)

The default is the **Standard** model: **one rep landing page with 2–3 extracted components present and identifiable.** Components must be visible and distinguishable on the page; no hiding one behind the other. This is what Grok did for Venmarc's hero-viewport lock + section-bottom glow.

**Solo variant (use when the glossary entry is a large background element).** When a single component is itself the canvas/WebGL stage (e.g. the Antigravity particle swarm), build it alone on its own route — no other components on the page, no chrome. This isolates behavior and performance before combining. After Solo passes Lighthouse 95+, then compose a second page using **Standard** with the swarm as a backdrop plus a typewriter scroll component up front.

**Escalation variant (optional).** If the user asks for the fin.com model, escalate to a multi-page rep where each page adds more components on top of the last — useful for "show me every extracted component together in the same site." Default to Standard unless the prompt explicitly escalates.

### Composition rules

- **Visibility over subtlety.** The page exists to show the components. If a component isn't visibly matching its Literal line, fail the page at this step, don't ship it.
- **"Go crazy" inside the gate, not outside.** Add typography, color, hero copy, illustrative UI around the components. Do **not** add effects that aren't in the loaded glossary entries. A "go crazy" build that invents a fifth effect is a scope violation, not bonus polish.
- **State-driven thinking (X article Rule 10).** While composing, ask: what are this component's states? Idle / hover / pressed / loading / disabled / success / empty / error — what's missing? Build the obvious ones; document the discovered ones in the rep's README.

**Step 6 — Mobile/touch fallback gate.** Hover-dependent effects (magnetic button, hover-spotlight, card tilt) and Canvas/WebGL scenes have no natural touch equivalent. Decide **per component**:

- **Disable on touch:** hide the effect under `@media (hover: hover) and (pointer: fine)`. Document the disable in the glossary entry's Options line.
- **Static/simplified version:** render the canonical first frame as a flat element. A static particle swarm as an SVG, a static gradient as a hero backdrop.
- **Touch-equivalent trigger:** replace hover with a tap-and-hold, replace `mousemove` with `pointermove` (which fires on touch drag). Consider whether this replaces or duplicates the desktop effect.

Don't ship any component past Step 5 without deciding this on purpose. Skipping Step 6 silently ships a broken experience on phones — the glossary explicitly tracks "real-device mobile" as an open gap on the fin.com globe for this reason.

**Step 7 — Performance verification gate (mandatory).** The Lighthouse 95+ line. Not "looks fine," not "I ran a quick check," not "probably fine."

Preparation:

```bash
# Production preview — NOT Vite dev (which yields NO_FCP failures and invalidates audits)
npm run build && npm run preview   # ships on :4173 by default
```

Audit (Brave incognito, no extensions, empty cache):

```bash
CHROME_PATH=/opt/brave.com/brave/brave npx lighthouse http://127.0.0.1:4173 \
  --chrome-flags="--incognito --disable-extensions --headless=new"
```

Acceptance: **Performance ≥ 95.** Below 95 → don't ship, don't promote glossary status, don't log as `tried`. Return to Step 4 and isolate the offender:

- If the offending component is a heavy Canvas/WebGL effect, try a 2D Canvas fallback, or simplify the scene (fewer particles, smaller texture).
- If the offending component is a hover effect on a long list, gate it behind `@media (hover: hover) and (pointer: fine)`.
- If the offending component is a transition-heavy state, drop one property at a time — never animate `box-shadow` or `height` directly.
- If the offending component is an image, re-gate the procedural-vs-image decision from the extraction playbook; swap for CSS/SVG.

Also check **Core Web Vitals via the Performance API** in Playwright — LCP / FID / INP. The **fin.com audit notes "transfer-only" — a high Lighthouse score can hide a heavy FCP under load;** capture both numbers.

The 95+ bar is the glossary's success criterion for `tried`. A 60s audit that scores 95+ is the floor; if you have any reservation about the score's honesty (extension leakage, dev server accidentally loading), rerun manually in the Brave incognito window with empty cache and reload. You previously scored **97 on Venmarc's rep** — that's the precedent; 95 is the floor, not the goal.

**Step 8 — Feel check.** A component may pass Lighthouse mechanically and still feel wrong. The shared standards file's §Debugging governs; the build playbook insists on:

- **Slow motion (2–5× + DevTools animation inspector).** Confirm colors crossfade cleanly, easing doesn't start/stop abruptly, `transform-origin` is right, coordinated properties stay in sync.
- **Frame-by-frame (Chrome DevTools Animations panel).** Reveals timing drift between coordinated properties.
- **Real-device for gestures** (drawers, swipe). Connect a phone via USB, hit the dev server by IP, use Safari remote devtools if iOS. The Xcode Simulator is an alternative but real hardware beats sim for gesture feel.
- **Fresh eyes next day.** Imperfections invisible during development surface later. If the build feels close-but-off, sleep on it. This is genuine workflow, not a platitude — you've shipped 50+ sessions and the next-day review consistently reveals what a same-day review misses.

**Step 9 — Write the rep README + Playwright tests.**

`README.md` per rep lives at `~/Pastries/<rep>/README.md`. Contents:

- **Source site** — URL.
- **Glossary entries under test** — link to each `[[Effects_Glossary|glossary entry]]` by its title.
- **Stack** — Vite + React + TS + Tailwind + next-themes (your default). Note any deviations (Three.js, GSAP, etc. — with justification).
- **How to run** — `npm install`, `npm run dev` (interactive), `npm run build && npm run preview` (production audits).
- **Audit artifacts** — link to Lighthouse JSON/PDF output.
- **What we copied, in plain words** — the Literal lines from each glossary entry.
- **Behavior on mobile/touch** — the Step 6 decision, per component.
- **Discovered states** — Step 5 state-driven thinking findings.

Playwright tests at `~/Pastries/<rep>/tests/effects.spec.mjs`. Each glossary entry gets at least one spec that confirms the technique is wired correctly (e.g. "the swarm canvas exists and its context is `webgl`", "the hero section is `min-h-[100dvh]`", "toggling dark mode swaps radial-gradient colors"). Specs are regression, not visual — they assert the technique, not the look.

Run tests:

```bash
npm run test:effects   # alias for `playwright test`
```

**Step 10 — Update glossary status + verified log.** After Steps 7 and 8 both pass:

- Flip the glossary entry's status from `extracted` (or `untested`) to **`tried`** — per the glossary's status key, this is the only valid promotion after a Pastries build passes its audit.
- Add to the glossary's **Verified log** section. Use the glossary's log-entry template:

  ```
  Date:
  Source: [site/screenshot/link]
  Entry: [existing bullet, or "NEW"]
  Literal name: [one-liner]
  Technique used:
  Implementation notes:
  Performance check: [actual Lighthouse + Web Vitals numbers]
  Result: tried
  Project applied: Pastries/rep-...
  ```

  Fill in every field. "Not checked" is acceptable for feel-check (Step 8 can defer to a next-day review); **never** write "not checked" for performance (Step 7) — if you didn't run Lighthouse, you didn't finish.

**Step 11 — Log the session.** Appendix-detailed to `Documents/SecondBrain/06-Agent-Sessions/YYYY-MM-DD-<agent>-<slug>.md` per the vault `AGENTS.md` Session Conduct §E. Required fields: user prompts verbatim, reference files/media with context, failures/subagent snags. For build sessions, also include the **Lighthouse JSON path** and the **glossary entry statuses changed**.

---

## Adopt phase (where the build playbook ends at `tried`, an Adopt lane takes over)

A glossary entry at `tried` is ready to be **adopted** — shipped in a real project. The Adopt lane is not part of this playbook's 11 steps; it's a separate workflow against a project's own conventions (Ledger's `DESIGN.md` rhythm-and-restraint, Momentum's `UIUX_BRIEF.md`, Tempire's 48-Laws). Entry from the feel-router's Adopt lane loads:

1. `Effects_Build_Playbook.md` Adopt phase (this section).
2. The destination project's hub: `01-Projects/<Name>/<Name>.md` and its active phase doc.
3. `Effects_Glossary.md` for the entry being adopted.
4. `_shared/MOTION-STANDARDS.md` for any easing/decisions to match.

The Adopt phase:

1. **Pick a real surface** in the project. Not a sandbox — a place where this component earns its place.
2. **Copy the primitive** from `~/Pastries/<rep>/src/components/`. Adapt imports and tokens to the project's stack (the project may use SCSS instead of Tailwind, Emotion instead of CSS Modules — match it).
3. **Re-tune the easing and shape.** The Pastries rep's values are a starting point; the project's existing tokens (`--ease-out`, `--radius-lg`) override. **Don't double the tokens.**
4. **Project-level Lighthouse 95+ gate on production preview.** Brand new components must pass the same performance bar the rep passed. If the project integration adds a heavy wrapper or a new image, the score will drop — fix at the project layer.
5. **State-driven thinking (X article Rule 10).** Project surfaces expose states the Pastries rep didn't — loading skeletons, auth-gated visibility, server errors, optimistic updates. Discover those states in the project, not just in the sandbox.
6. **Promote glossary status from `tried` to `adopted`**. Per the glossary's status key, only real project use upgrades to `adopted`.
7. **Update the glossary verified log** with `Result: adopted` and `Project applied: <project name>`.

---

## The gates, as a single checklist (paste into a session if you don't want to reread the whole doc)

- [ ] Intake done (what / why / speed budget / rep structure)
- [ ] Token setup gate: `:root` token block exists with `--ease-*`, `--duration-*`, `--radius-*` before any component code
- [ ] No re-extraction during build — if Technique looks wrong, propose returning to the Extract lane, don't paper over it
- [ ] Scaffold follows `rep-<source>-<what-we-copied>/` convention
- [ ] Library decision: Framer Motion / GSAP / Three installed only with explicit justification in a code comment
- [ ] One reusable primitive per glossary entry, built in dependency order
- [ ] Standard rep structure (2–3 components, identifiable and present) unless escalation was explicitly requested
- [ ] State-driven thinking applied: idle / hover / pressed / loading / success / error / empty documented in the rep README
- [ ] Mobile/touch fallback decided per component
- [ ] Performance: actual Lighthouse ≥ 95 on `npm run preview` (Brave incognito, empty cache) — number written, not "looks fine"
- [ ] Core Web Vitals captured alongside Lighthouse (LCP, FID/INP)
- [ ] Feel check: slow motion + frame-by-frame + real-device for gestures + fresh eyes the next day if motion-heavy
- [ ] Rep README written with all sections
- [ ] Playwright specs written and passing for each glossary entry
- [ ] Glossary entry status promoted from `extracted` to `tried` — and only `tried`; project ship is the Adopt lane's job
- [ ] Verified log updated with actual performance numbers
- [ ] Session log written to `06-Agent-Sessions/`

---

## Known failure modes (watch for these specifically)

- **Skipping the Lighthouse gate because the build looks right.** Mirrors the extraction playbook's failure mode and just as likely to get dropped; tied directly to your stated "speed alongside design, efficiency, and security" priority.
- **Defaulting to Framer Motion without justification.** The library rule says avoid by default; missing the comment justification is itself a finding.
- **Treating Solo and Standard as interchangeable.** A Solo run that passes Lighthouse 95+ does not prove the same component can sit calmly as a backdrop alongside 1–2 other components. Always run Standard after Solo.
- **Inventing a fifth effect during a `go crazy` composition.** A "go crazy" build that adds an unextracted effect is a scope violation. Effects go in via glossary entries, not by improvisation.
- **Confusing `tried` with `adopted`.** The build playbook supports `tried`. Real project ship supports `adopted`. Don't promote glossary entries past `tried` inside the Pastries-only sandbox.
- **Writing the rep README with placeholder audit numbers.** If the audit number hasn't been captured, the README section reads "TBD" until it is. Don't fabricate.
- **Skipping Step 6 (mobile/touch fallback).** A web hover effect that "works on desktop" and ships without a touch decision is broken in 60%+ of user sessions. This is silent failure; only the Step 6 decision gates it.
- **Going straight from extraction to adoption.** If a session jumps from a freshly-extracted technique directly into a project build, skip Step 7 Lighthouse and you'll regress both the source-of-truth glossary and the destination project at once.

---

## Standing handoff note

This playbook is codified from the two real sessions on 2026-07-15 (`2026-07-15-grok-vault-lint-venmarc-pastries-lighthouse.md` for the 2-component landing model; `2026-07-15-grok-fin-com-effects-audit.md` and `2026-07-15-grok-fin-com-effects-lab.md` for the 1→8-component multi-page escalation). The "go crazy" composition style, the token discipline, the Lighthouse 95+ gate, and the fresh-eyes-next-day checkpoint all come directly from how Grok operated under user supervision.

The codification means future agents can run build sessions with *less* supervision than Grok required. It does **not** eliminate supervision: a fresh agent should still surface decisions to the user at Step 5 (composition draft), Step 7 (failed audit), and Step 10 (glossary promotion). For users who want zero supervision: pass the `motion-router` `Build` lane with `--no-supervise` and the agent runs Steps 1 → 11 end-to-end, stopping only for genuinely irrecoverable blocks.
