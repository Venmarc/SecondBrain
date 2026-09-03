# Lesson: AI UI Antipatterns Watchlist

> **One-line Summary**: High-value antipattern watchlist — UI anti-slop tells (motion spam, visual clichés) from impeccable/design-skills, plus a supply-chain/dependency antipatterns section (npm lockfile discipline, transitive-dependency exposure checks).

## Status
- **Motion / taste / frontend design skills:** already researched and installed under `~/.agents/design-skills/` — used on Momentum + Ledger. No re-extraction of the full 45 catalog.
- **This note:** short watchlist of anti-patterns worth remembering when reviewing agent UI.

## Motion anti-slop (flag when overused)
Source: `design-motion-principles/references/anti-checklist.md`

| Pattern | Rule of thumb |
|---------|----------------|
| Pulsing indicators | Almost always slop; one brand element max with rationale |
| Blur-everywhere entrances | OK once (hero/modal); flag ≥3 identical blur enters in one view |
| Hover-scale-on-everything | Flag identical `hover:scale-105` on whole grids |
| Stagger-spam on every list | One deliberate moment OK; ≥2 staggered lists in one view = spam |
| Bouncy springs on utility UI | No spring-bounce on toggles/menus/settings |

## Visual AI tells (flag when defaulted)
Source: impeccable `antipatterns.mjs` registry

| Pattern | Avoid |
|---------|--------|
| Side-tab / thick accent border on cards | Classic AI card tell |
| Overused fonts (Inter, Geist, Plus Jakarta, Space Grotesk, …) | Pick intentional type |
| Single font for everything | Pair display + body |
| Flat type hierarchy | ≥1.25 step contrast |
| Gradient text / purple-cyan AI palette / cream-beige default | Intentional brand colors |
| Nested cards | Flatten with space/type, not card-in-card |

## Polish tells (flag when defaulted)
Source: [[Clippings/Rules on UI Polish]] via distilled lesson [[03-Resources/Skills/UI-Polish-Ten-Rules|UI-Polish-Ten-Rules]]

| Pattern | Avoid |
|---------|--------|
| Single flat `box-shadow` (no layered light) | Use hairline ring + contact + ambient stack, opacities 2–8% |
| `1px` border instead of hairline ring | Use `0 0 0 0.5px rgba(0,0,0,0.08)` — edge defined by light, not stroke |
| Default `ease` / `ease-in-out` built-in | Use shared tokens `--ease-out` / `--ease-in-out` (strong custom curves) |
| `max-height: 9999px` for expand/collapse | Static, jitters, times wrong — use `grid-template-rows: 0fr ↔ 1fr` |
| Entrance with opacity-only fade | Add 6px rise + 2px blur-that-clears; fade alone is the least premium |
| No `:active` scale on pressable elements | `transform: scale(0.97)` — feels heard, not ignored |
| State list ends at hover/active; missing working/loading/discovered states | Build surfaces unknown states through use — see Rule 10 |

## The Fix
- Prefer local design-skills + vault UI lessons over reinventing.
- On UI review: scan for **frequency/uniformity** of the same motion or chrome pattern.
- Ledger anti-references already ban SaaS cream / rainbow grids — keep aligned.

## Supply-chain / dependency antipatterns (flag when present)
Source: Socket.dev incident report, npm `keyv`/`cacheable` namespace compromise (2026-08-04) — maintainer account (Jaredwray) compromised, malicious `preinstall` hook (`setup.mjs`) added to `keyv@6.0.0`, the `@cacheable/*` family, `flat-cache`, `file-entry-cache`, `cacheable-request`, `cache-manager`. Hook harvests cloud/CI/npm credentials and self-propagates by republishing other packages the stolen tokens can reach; also plants autostart hooks in `.claude`/`.vscode` for anyone cloning the source repo. These packages sit deep in common dependency trees (e.g. `eslint → file-entry-cache → flat-cache → keyv`), so most affected projects never install them directly.

| Pattern | Rule of thumb |
|---------|----------------|
| Running `npm install` / `npm update` in deploy or CI instead of `npm ci` | Always use `npm ci` in CI/deploy — it installs exactly what the lockfile pins, ignoring any newer (possibly compromised) versions on the registry |
| Loose caret/tilde ranges (`^x.y.z`) on transitive-heavy packages without a committed lockfile | Commit `package-lock.json`/`pnpm-lock.yaml`/`yarn.lock` for every repo and treat it as the source of truth, not the range in `package.json` |
| Blindly running `npm audit fix --force` or `npm update` right after a disclosed npm supply-chain incident | Freeze updates on affected namespaces until the registry has pulled the malicious versions and an advisory confirms clean state |
| Assuming "I don't use package X" means you're safe | Check resolved versions in the lockfile (`packages`/`dependencies` tree), not just direct `package.json` entries — X is often 2-3 hops deep via a devDependency like eslint |
| Cloning third-party repos without checking for injected `.claude`/`.vscode` autostart hooks | Inspect `.claude/`, `.vscode/settings.json`, and any repo-root `setup.mjs`/postinstall scripts before opening a freshly cloned unfamiliar repo in an agent-enabled editor |
| No routine check of pinned versions against active supply-chain advisories | Periodically diff lockfile-resolved versions of security-sensitive/deep-tree packages (npm CLI tooling, caching libs, CI-adjacent tools) against current advisories, not just at initial install time |

### The Fix (supply-chain)
- `npm ci`, not `npm install`, everywhere deploy/CI touches a lockfile.
- Never `npm update`/`audit fix --force` in the days right after a disclosed compromise — that's exactly how a safe pin floats into a poisoned range.
- Verify exposure by grepping **resolved** lockfile versions (`packages` section), not just top-level `package.json` ranges — most exposure is transitive.
- Rotate npm/cloud/CI tokens after any incident where those exact credential types were the stated theft target, even if your versions were confirmed clean.

## Where This Appeared
- Harvest Q5 (2026-07-13)
- [[Clippings/45 Claude Design Skills That Kill AI Slop]]
- `~/.agents/design-skills/`
- npm `keyv`/`cacheable` supply-chain compromise, Socket.dev incident report (2026-08-04)

## Related
- [[03-Resources/Skills/UI-Polish-Ten-Rules]] — distilled from [[Clippings/Rules on UI Polish|Kevin's X article]]; the "Polish tells" section above sources from this note.
- [[03-Resources/MOC-Design-Skills-External|MOC External Design Skills]]
- [[03-Resources/Skills/Frontend-Awesomeness|Frontend Awesomeness]]
- [[03-Resources/MOC-UI-UX-Lessons|MOC UI/UX]]

**Tags:** #lesson #skill #ui-ux #anti-slop #design #supply-chain #security
