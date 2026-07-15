# Effects Playbook

> **One-line Summary**: Step-by-step effect reverse-engineering workflow with mandatory performance gates — companion to [[03-Resources/Tools/Effects_Glossary|Effects Glossary]].

Companion to [[03-Resources/Tools/Effects_Glossary|Effects Glossary]]. The glossary is the dictionary — what an effect is called and how it's technically made. This is the procedure — what order you do things in, and what gates you're not allowed to skip.
 
Read this before starting a session. Point your agent at both files at the start of a session, not just this one — the glossary is what it needs to name techniques correctly; this is what it needs to know the workflow.

**Naming (from glossary — mandatory):** When discussing or implementing an effect, **Literal one-liner first**, then technical technique, then cost/options. Do not lead with jargon-only titles. Customizations (rest position, trail delay, colors) stay under **Options** on the base entry — not new glossary effects.
 
---
 
## Agent intake (run this once, at the start of a session — not per-effect)
 
Before inspecting anything, the agent should have answers to:
 
1. **What are we looking at?** — the site/screenshot/link, and which specific element(s) on it.
2. **Why?** — which project this is for (Ledger / Momentum / other), and what role the effect plays there (hero background, dashboard accent, page transition, etc.).
3. **What's the speed budget?** — default assumption is "prioritize speed, procedural over image, no animation library unless justified." State this explicitly so the agent doesn't default to the heaviest solution.
4. **What category is this likely to be?** — a guess is fine (e.g. "probably CSS glow" or "probably canvas/WebGL, it's a 3D globe") — this tells the agent where to look first (computed styles vs. script/network sources).
This isn't the agent grilling you every time — it's four lines you paste at the top of a session so you're not re-explaining context on effect #12 that you already gave on effect #1.
 
---
 
## Investigation workflow
 
**Step 1 — Identify what you're looking at.**
Screenshot or describe the visual. Name it in plain language first (you're good at this already — mental image, drawing, description).
 
**Step 2 — Classify before inspecting.**
Run it through the identification cheat sheet in the glossary:
- Sharp at any zoom → vector (CSS/SVG)
- Blurs at zoom → raster image
- Photographic/illustrated detail → likely raster
- 3D rotation, particle systems, connection-line animation → likely Canvas/WebGL, skip straight to Step 3b
**Step 3a — CSS/SVG inspection (devtools or agent).**
Pull actual computed styles (`getComputedStyle()`), gradient stops, blur radius, box-shadow, exact colors off the live element. Ground truth, not eyeballing.
 
**Step 3b — Canvas/WebGL inspection (devtools or agent via Playwright).**
Computed styles won't show you anything here — it's drawn imperatively in JS. Instead:
- Check script/network sources for rendering library names (three.js, globe.gl, d3-geo, COBE, etc.)
- Confirm the element is `<canvas>` and check its context type (`webgl` vs `2d`)
- Explicitly tell the agent to check JS/network sources, not just describe the visual — if you don't say where to look, it'll search visually and report back empty-handed.
**Step 4 — Decision gate: procedural vs. image.**
Can this be CSS/SVG instead of a raster image? Default yes unless the content is genuinely representational (a photo, detailed illustration, a rendered figure). This gate exists because the failure mode is defaulting to nano-banana/stock images out of habit, which quietly reintroduces the performance problem you already fixed once.
 
**Step 5 — Decision gate: library vs. vanilla.**
Does this need real multi-element orchestration (Framer Motion, GSAP), or does CSS + IntersectionObserver cover it? Most single-element effects don't need a library. Also — identify what library a *reference site* actually uses before crediting or blaming it for feel. Don't assume "smooth" or "slow" without checking.
 
**Step 6 — Implement.**
Build it as a standalone primitive (component with props), not hardcoded to the one place you first wanted it. This is the step most likely to get skipped because the effect already "looks done" once it works once — resist that.
 
**Step 7 — Decision gate: mobile/touch fallback.**
Hover-dependent effects (magnetic button, tilt, cursor blob) and Canvas/WebGL scenes have no natural touch equivalent. Decide per-pattern: disable on mobile, replace with a static/simplified version, or find a touch-equivalent trigger. Don't ship without deciding this on purpose.
 
**Step 8 — Performance verification (mandatory, not optional).**
Run Lighthouse or check paint timing before and after. "Looks fine" is not a measurement. This is the step that most directly enforces your original stated priority — skipping it means the priority was never real, just a stated preference.
 
**Step 9 — Log it.**
Use the log template in the glossary. Fill in every field, including performance — write "not checked" if that's honestly the case, don't leave it blank pretending you forgot.
 
**Step 10 — Abstract and update status.**
Update glossary **status gates** correctly:
- After inspect only → `extracted` (default; not `tried`)
- After a Pastries (or equivalent) **demo** → `tried`
- After ship in a real product → `adopted`

If adopted, ensure a reusable component exists (not a one-off). If a new technique has no entry yet, add one — the glossary grows from real reps.
 
---
 
## The gates, as a single checklist (paste this into a session if you don't want to reread the whole doc)
 
- [ ] Intake done (what / why / speed budget / likely category)
- [ ] Classified before inspecting (cheat sheet)
- [ ] Inspected with the right method (computed styles for CSS/SVG, script/network sources for canvas/WebGL)
- [ ] Procedural-vs-image gate checked
- [ ] Library-vs-vanilla gate checked
- [ ] Built as a reusable primitive, not a one-off
- [ ] Mobile/touch fallback decided
- [ ] Performance actually measured, not assumed
- [ ] Logged in the glossary
- [ ] Glossary status correct: `extracted` after inspect, `tried` only after demo, `adopted` only after product use
---
 
## Known failure modes (yours, observed in this conversation — watch for these specifically)
 
- **Skipping the performance check because the effect already looks right.** This is the single most likely step to get dropped. It's also the one tied directly to your actual stated priority, so dropping it means the priority wasn't real for that session.
- **Treating document-building as progress instead of running a real test.** Two documents exist now. Neither has been used yet. Building the system is not the same as the system working.
- **Defaulting to image assets out of habit** instead of running the procedural-vs-image gate consciously.
- **Blaming or crediting a library (Framer Motion or otherwise) without confirming it's actually in use** on the reference site first.
