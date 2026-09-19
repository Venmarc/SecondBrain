---
title: Clone-Website
date: 2026-09-13
tags: [project, active, clone-website, web-design, fiction-site]
---

> **One-line Summary**: Fictional-but-believable human cloning company website, White Desert's skeleton with lab aesthetics, Lamalama motion effects, AI-generated twins imagery frontloaded before the image-gen sub expires. Brainstorm complete; planning next.

**Status (2026-09-15):** all canon stamps landed. Codon Labs · $2M · speed roadmap · H1 stamped · staff 1,650 · founders final (Bea / Schönbächler / Antoine) · jurisdiction New York State · first birth New York City · Dolly complementary · terms clause yes · copy v1, generation ledger and slot map drafted. **Image generation runs on Victor's PC (Grok) from the generation ledger. This session owns the vault docs and the build-side work.** Code: **Astro scaffold live, 2026-09-16** at `~/Documents/Codon-Labs` (local git, not pushed).
**Working agreement:** one owner (this session), one branch (`main`), the vault as the single source of truth. No feature branches, no parallel writers.
**Raw sources:** [[01-Projects/Clone-Website/Docs/brainstorm-2026-09-12-raw|brainstorm raw archive]] (6 voice transcripts + phone note + seed note). White Desert reference shots in `Docs/assets/white-desert/`. Research digest: [[01-Projects/Clone-Website/Docs/research-cloning-shabang|The Whole Cloning Shabang]] (42 sources). World canon: [[01-Projects/Clone-Website/Docs/world-history-v1|world-history-v1]]. Copy: [[01-Projects/Clone-Website/Docs/copy-v1|copy-v1]]. Imagery: [[01-Projects/Clone-Website/Docs/slotmap-motion-v1|slotmap-motion-v1]] + `image-requirements-v1.md`.

## What this is

A fake company site for cloning **human beings** (not pets — see D2), played 100% straight. No "this is a demo" anywhere in visitor-visible copy, same as White Desert sells Antarctica: luxury-biofiction, plausible-scientific, cinematic. The fiction breaks only in the waitlist signup email.

**North star:** White Desert (white-desert.com) — luxury travel to the harshest place on Earth; ours is luxury biotech at the frontier of reproduction. Awwwards-level feel.

**Core narrative (settled by research, 2026-09-13):** The honest company sells the delayed twin; the customer buys the second chance; the site holds both without lying. The science is all real except the one fictional breakthrough (epigenetic reprogramming solved). Clone output is always a baby (adult clones would be a different, darker fiction — see D8).

## Decision log

| # | Decision | Rationale |
|---|---|---|
| D1 | Clone **humans**, sci-fi-plausible register | Voice note 1: chose "the more complex science fiction one" over the already-done pet route. Pets possible later as a second division. |
| D2 | File name "Pet Clone Website.md" is residue; project = human clone company | Voice note 1 started human → drifted pet → settled human. |
| D3 | **Zero fiction-breaking on the site.** Disclosure lives ONLY in the waitlist confirmation email | Voice note 2 verbatim: "Back to the Future didn't stop… They just made you believe." Emails because anyone who signed up deserves the reveal; no mailing-list add without explicit consent (legal + deliverability). |
| D4 | White Desert skeleton, lab imagery instead of Antarctica | Voice note 3: "copying the white deserts one but replacing it with a laboratory view or some kind of human evolution jump… from procreation to replication." |
| D5 | ALL imagery/video AI-generated (Grok + Gemini), frontloaded before SuperGrok expires (3-4 day window from 2026-09-12) | Voice note 4: "assets, images and videos will be AI generated… GROC and Gemini seem to be close to making real looking images and videos." Asset generation is the deadline-bearing work; site build is not. |
| D6 | Effects ported from `rep-lamalama` (github.com/Venmarc/rep-lamalama, public) + Web-Garnish footer kit + Effects_Glossary — not rebuilt from scratch | Cursor trail, image-click-distortion, logo-grain loading already reverse-engineered with working GLSL (`tried` status in glossary). Original ~/Pastries copy died with the PC; GitHub is the source of truth. |
| D7 | Two-step realism: linked pages exist but nothing deeper (link → real page → maybe one more real page → dead end) | Phone note: "a two-step realism feel… and nothing else after that." |
| D8 | **Pricing fork resolved by research: $5M = child donor / $10M = adult donor pricing (donor-age reading), clone output is always a baby.** Fallback ladder $1M/$5M if $5/10 reads too steep. | Real anchors: dog clone $50k, horse $85k, elite surrogacy $250k–$300k, genome sequencing $500. $5M is ~20x the top real-world reproduction price = believable first-of-its-kind premium. Output-adult clones (The Prestige/Moon) rejected as a different fiction. Victor's call whether to accept donor-age reading. |
| D9 | Footer = **engraved vignette** (Web-Garnish style 01) | Victor approved 2026-09-13. Bio-luxury fit, LCP-safe, pure SVG + hatch pattern per runbook. |
| D10 | Code lives in a **GitHub repo** named **Codon Labs**, built on Victor's PC at `~/Documents/Codon-Labs`. The earlier `~/Projects` location belonged to the brainstorm machine and is retired (folder deleted 2026-09-16). | Victor 2026-09-13: "Code lives in GitHub. Here it lives in ~/Projects. When working on my PC, it'll be stored in the Documents folder." → **Resolved 2026-09-16:** this machine *is* the PC, so the build lives at `~/Documents/Codon-Labs`. |
| D11 | Name: **Codon Labs** (Victor locked 2026-09-13) | "Codon inc / probably codon labs." Domain: codonlabs.com taken (Sav.com squatter, parked, registered 2024-10-18); codonlabs.io, codonlabs.ai, codon-labs.com OPEN. Formal trademark check still pending (defunct Codon Devices existed 2000s). |
| D12 | Clone output is ALWAYS a baby; one product, one price. Adult-output clones (movies' version) explicitly rejected | Victor 2026-09-13: "they always start out as babies, not full-grown people. Movies make it seem like they start out as whatever result you want." |
| D13 | Price: **$2,000,000 stamped**. Roadmap: **speed** (14 months today → 9 by 2028). Price-cut roadmap rejected (wasteful register). | Victor stamped 2026-09-13: "Roadmap: speed. 2M price." Copy drafted in copy-v1.md. |
| D14 | FAQ carries BOTH registers: myth-debunking (gold) + plausible-questions (good) | Victor 2026-09-13. Myth material ready in research digest (aging myth, "same dog" myth, etc). |
| D15 | Hero metaphor: frontier/space register, NOT continent talk. "The next frontier" direction; Apollo-line inversion candidate ("one giant leap… for him") | Victor 2026-09-13 rejected continent phrasing, kept the move. |
| D16 | Image pipeline: requirements list → Tavily reference search → generate (Grok/Gemini) → Agy review/edit against requirements | Victor 2026-09-13. First reference haul done (twin portraits genre: Zlewski, Brunelle, Collette; embryo microscopy; lab interiors). |
| D17 | Footer: engraved vignette stays baseline; Victor cracking a NEW footer style in a separate session, may supersede | Victor 2026-09-13. |
| D18 | Hero H1: **"The next frontier is you."** stamped. Sub + CTAs locked. | Victor stamped 2026-09-13. |
| D19 | **Consent rule: a continuation requires the donor's own written yes, given while living. Death does not withdraw a yes. Silence does.** No continuation of the unwilling, unaware, or never-asked. Grandfather scenario (banked cells + signed consent while alive) is valid in-world. | Victor 2026-09-13: "your grandpa died, and you cloned him as a kid and watched him grow as a new person" — validated via the consent-while-living frame rather than cloning-the-unconsenting. Grief-mill register (cloning the never-asked deceased) explicitly rejected. |
| D20 | **In-world imagery law: no grown continuation appears in any present-day context** (first birth March 2025 in-world; oldest continuation ~18 months). Grown-continuation fantasy lives only as clearly-labeled age-progression projection. Multi-clone lineup imagery banned outside the movies-satire panel. | Copy-v1 world facts + imagery-v1 Three Laws, Victor informed. |
| D21 | **Company history anchored: founded 1973 in Basel**, lab adjacent to the Biozentrum (Petersplatz). Animal Research Division + Preclinical Vivarium established 1980s–90s in **Allschwil (BL) or Saint-Louis (Alsace)**, 15-min commute to HQ. | Victor's Gemini/Google Earth research 2026-09-13 (Gemini deliberately told only "genetics and cell research company that later had an animal division"). Translated to clone canon in [[01-Projects/Clone-Website/Docs/world-history-v1|world-history-v1]]. Site pick (Allschwil vs Saint-Louis) pending. |
| D22 | Founder roster: **Bea Vogel-Keller** (founder, CEO, early 80s) + two co-founders: one alive early 90s, one professor/coach who died in the 2000s. Recommended: Bea has no doctorate (two doctors plus one operator-friend reads better than three doctors). | Victor 2026-09-13. Name-to-role assignment pending: recommended Schönbächler = the deceased professor, de Montmollin = alive emeritus. |
| D23 | Founder portraits: the **early-50s woman is the HISTORICAL portrait** (circa 1993, animal-division years, three years before Dolly); a current portrait of Bea at 82 is needed for /about. | Age math from D21 + D22 (founded 1973, Bea early 80s today). Pending Victor confirm. |
| D24 | **Terms disclosure clause**: the fictional-company line buried at /terms clause 14 of 14. Recommended: include. | Pending Victor's yes (explained 2026-09-13). |
| D25 | FAQ ships **16** (the 14 written + 2 Register-B extras: sample-after-death, meeting other families). | Decided 2026-09-13, low-stakes. |
| D26 | Section 1 real-quote candidates (numbered in the research digest's source list): (1) Wilmut regret quote [38, NYT obituary], (2) Sinclair/Nottingham 13-sheep finding [11][12], (3) "delayed identical twin" phrasing [2, Psychology Today 1997]. | **Stamped 2026-09-15 (D33): quote 1 in Section 1; quote 2 reserved for a later page.** |
| D27 | Founder roster final: **Dr. Beatrix "Bea" Vogel-Keller** (founder, CEO, early 80s, doctorate) · **Prof. Dr. Markus Schönbächler** (the middle name, the oldest, the mentor professor, **died in the 2000s**) · **Antoine de Montmollin** (**alive, early 90s, no doctorate** — the outlier friend, the engineer). | Corrected 2026-09-15 by D35. Victor: doctors keep their titles; the last name (Antoine) carries no doctorate; the mentor is Schönbächler and he is dead. |
| D28 | Founder portraits: **both**, used with intention. Early-50s Bea = historical (circa 1993, archive treatment). Bea today = 82, /about. **No lookbook** (Victor's rule: images are arguments, not decoration). | Victor 2026-09-15. |
| D29 | **Clinical program jurisdiction: New York State, United States.** No fictional law, no licence. Evidence: no US federal prohibition; New York does not directly prohibit reproductive cloning; parentage via the real 2021 Child-Parent Security Act (pre-birth parentage orders, licensed surrogacy organizations, escrow). Research stays Basel; animal division Allschwil (1988) + **Saint-Louis (2004)**. | Victor 2026-09-15: "We lean toward the second. Let's not make up a real-world law. No fiction license." + "Saint-Louis." |
| D30 | Terms disclosure clause: **yes**, at /terms clause 14 of 14, plain language, draft written into the copy deck. | Victor 2026-09-15. |
| D31 | Staff canon: group-wide **1,650** (Human Genetics 710, Animal Research 350, Bio-Data and AI 270, Corporate 320), the Program about 90; founding 1973 with 12 people; Allschwil 1988; Saint-Louis 2004. Funding story: contract research funds the Program; the Program is priced at the cost of one continuation, not market. | **Stamped 1,650 by Victor, 2026-09-15.** The figure passed through 1,850 then 1,600 during the day's reconciliations, which is why the canon now lives in one table. |
| D36 | *(orphaned citation)* Referenced in the copy deck for the founder roster. No row was ever written. Superseded by D27 as corrected by D35. | Flagged 2026-09-15. |
| D37 | Staff figure, closed: **1,650** group-wide (710/350/270/320) plus about 90 in the Program. The row was cited in the copy deck before it existed; it exists now. | Stamped by Victor 2026-09-15. |
| D32 | **The founder's continuation**: **Markus Schönbächler** banked and consented (1999, the first person under the D19 rule), died in the 2000s, and his continuation is 18 months old, one of the 14. Appears on /about once, with intention. Not in the families look-book. | Victor 2026-09-15: "Add that founder-is-a-toddler story as well." Reattributed from Antoine to Schönbächler by D35. |
| D35 | **Roster correction sweep.** "Swap." was misread as swapping the mentor role; it meant the doctorate. Canon: Bea doctor; Antoine alive, no doctorate; Schönbächler the mentor, dead, keeper of the 1999 line and of the continuation. Corrected in world canon, copy deck, slot map, D27, D32. | Victor 2026-09-15: "Antoine alive. Antoine no doctorate, bea doctorate, bea founder, middle doctor is the older dude, the mentor professor and he's passed away." The wrong version had already reached five documents, one via a parallel edit to the copy deck. |
| D34 | Dolly: **complementary, not beaten.** Roslin showed an egg can host an adult nucleus; Codon Labs had spent twenty years on the other half of the question, how a nucleus is made to forget. Roslin helped them, indirectly. | **Stamped by Victor 2026-09-15**: "Complementary. Dolly. not beat. They didn't beat us; they just helped us further, indirectly." |

## Page structure (White Desert skeleton, remapped)

| # | White Desert section | Clone-Website equivalent | Notes |
|---|---|---|---|
| 0 | Hero: full-bleed video, "Luxury and adventure in the most remote place on Earth", mist fade-in | Hero: AI-generated lab/embryo imagery, "The most intimate journey on Earth"-register line, snow-fade → lab-fade | White Desert uses cloud-gradient overlay; ours mirrors with a soft lab-haze fade |
| 1 | "The Last Continent" editorial intro | **Intro: cloning + human evolution** — procreation → replication, Dolly 1996 → macaques 2018 → (fictional) first human | Phone note section 1 |
| 2 | "Our Season" stats (12 guests, 100 staff, Nov–Feb) | **The Process** — DNA sampling → cell line → SCNT → gestation → delivery, with scientist/philosopher quote | Rick & Morty "rest and relax" homage video optional; quote: real-world options include Dolly's Ian Wilmut, or a philosopher on identity |
| 3 | "Our Trips" — 5 priced itineraries ($16.5k–$115.5k) | **Packages** — e.g. Genetic Preservation, Single Clone, Lineage (multi-generation), each priced | Mirrors White Desert's price-shown-loudly confidence |
| 4 | "Our Camps" — 3 camps with coordinates | **The Facilities** — labs with coordinates, e.g. "Whichaway Lab" equivalents | Coordinates are a great White Desert realism device |
| 5 | CPT→WFR flight section (05:30 hrs, 4,220 km, -5°C) | **The Journey** — consultation → sampling → growth → birth timeline in the same stat style | "How it works" 6-step modal → our 5–6 step intake process |
| 6 | Founder quote (Patrick Woodhead) + press quote (Stanley Stewart) | Founder quote (fictional CSO) + a plausible ethics-board quote | Same editorial device |
| 7 | Reviews/testimonials | **Reviews + FAQ** next to pics of clones doing normal things (tall person / shorter clone / taller clone trio) | Phone note section 4; /reviews "View More" expansion page with look-book of pairs |
| 8 | Footer | **Footer = the design playground** | Web-Garnish kit: engraved vignette (best LCP-safe fit for a bio-luxury brand), sticker, stamp, watercolor options; Lamalama cursor trail site-wide |

Extra pages: waitlist (functional form → confirmation email with the reveal), docs, Ts & Cs — the "two-step realism" set (D7). Nothing deeper.

## Science grounding (for plausible copy)

- SCNT (somatic cell nuclear transfer) is the real process: nucleus of a body cell into an enucleated egg → embryo. Dolly the sheep, 1996.
- Epigenetic reprogramming is the real wall — why "most researchers believe it will not be possible to use current technique to produce a human clone that develops to term" (Wikipedia/SCNT). Our fiction's pitch: we solved reprogramming.
- Real anchors: 2018 cloned crab-eating macaques (Zhong Zhong & Hua Hua, first primates); Tachibana 2013 (human SCNT embryos for stem cells — legal, published, no reproductive intent).
- Real market numbers for plausibility: ViaGen charges $50k dog / $85k horse / ~$25k cat; GP (genetic preservation) with feedback <4 weeks; gestation 60–65 days + 56 days nursing. Human-fiction pricing should sit believably above these (low hundreds of thousands).
- Open research item (Victor flagged): what people *expect* clones would do vs what clones realistically could — a clone is a time-delayed identical twin with its own experiences, NOT a copy of memories, NOT an AI you give instructions to (phone note section 3 explicitly rejects the AI-servant framing). Reviews/FAQ copy should play with that gap honestly-fictionally.

## Assets to generate (before SuperGrok dies)

Priority order — the site is unbuildable without 1–4:
1. Hero loop: cinematic lab / cell-division / embryo macro (8–12s loopable, White Desert video register)
2. Process stills: 4–6 lab sequence images (sampling, culture, transfer, gestation, birth)
3. Twins pairs: 6–10 portrait shots of person-next-to-identical-person, mixed ages/settings; including the tall/short/tall trio
4. Facility shots: 2–3 lab exteriors/interiors for the Camps section
5. Reviews look-book: 4–6 candid "clone doing normal things" shots
6. Optional: founder portrait, ethics-board headshots, map/route graphic equivalents

Store prompts + outputs in `Docs/assets/generated/` (to be created); keep prompt provenance (which model, which prompt, date) in a manifest.

## Effects port list (from glossary + rep-lamalama)

- Cursor velocity-field trail (grain reveal, ~1s decay) — site-wide, desktop only
- Image-click-distortion (grain disc spread on press, 3.75s power4.out) — on photos
- Logo-cell grain intro (blocky grains multiply into fine grid → reveal) — loading sequence, replace L-mark with our logo
- Dusty/gel image warp on hover — candidate for package cards
- Footer art direction: engraved vignette (primary candidate — matches bio-luxury, LCP-safe, pure SVG+pattern per runbook)

All documented `tried` in [[03-Resources/Tools/Effects_Glossary]] with GLSL technique notes; clone repo: `git clone https://github.com/Venmarc/rep-lamalama`.

## Build (2026-09-16)

Repo folder `Codon-Labs` at `~/Documents/Codon-Labs` (Victor's PC; D10 resolved). Local git, no remote yet. Stack: **Astro 7 static + React 19 islands for the WebGL only + Tailwind v4**. Deploys to Vercel with no adapter. The rep's scroll-hijacking `SmoothRoot` was deliberately not ported.

**The mark is a slot, not a blocker.** `src/brand/mark.ts` exports `markSvg: string | null`; paste the finished SVG and nav, footer, preloader, favicon source and OG composite all inherit it. Until then a type wordmark renders. Nothing else in the build depends on the logo.

**Effects are ported but gated** (`src/theme.ts`): `intro` and `trail` draw the mark shape (`drawLLLogo` in the compositor shader) so they need `markSvg`; `photo` needs the generated imagery. The port lives in `src/gl/` + `src/lib/` + `src/components/effects/`.

**Build-not-generate assets shipped** (no AI spend, no logo dependency): flight line V-4, genome-cost chart, roadmap timeline, consent flow, genome-match graphic, engraved footer vignette (D9 baseline).

**Verified:** 13 routes, `astro build` passes, `astro check` 0 errors / 0 warnings / 0 hints (34 files), browser run with zero console errors and no horizontal overflow.

## Open decisions

**Stamped 2026-09-15:** staff **1,650** · Dolly **complementary** · first birth **New York City** · Antoine **the engineer** · disciplines **Bea: reproductive biology and embryology; Schönbächler: cytogenetics and chromatin biology** · terms clause **yes** · jurisdiction **New York State**.

Still open:

1. **Founder quote**: B drafted as stamped (the 1999 line, Schönbächler). Confirm or flip to A.
2. **The mark**: does not exist. Blocks the grain intro, preloader, favicon, OG card. Three concepts drafted in the generation ledger; SVG drafting happens in this session.
3. **Footer style**: engraved vignette baseline; newer footer styles may supersede.
4. **Stack and repo location**, then scaffold.
5. Workforce detail: founding headcount, Program team size, Schönbächler's death year.
6. **Waitlist email mechanics**: sender domain and service (needs a domain decision).

## Next actions

1. Asset sprint in the SuperGrok window (closing now): the generation ledger's A-tier order, starting with the register test batch (the money macro, one portrait pair, the hand).
2. **Design the mark.** Does not block the build: it is a drop-in slot at `src/brand/mark.ts`. Victor has candidates in flight (see the 2026-09-16 logo session logs).
3. Red-ink the copy deck (the stamps above). One open stamp: founder quote A or B.
4. ~~Clone rep-lamalama to this machine; port the four effects.~~ **Done, gated** (see Build). Flip `effects.*` in `src/theme.ts` when the mark and imagery land.
5. ~~Scaffold the site once assets exist.~~ **Done, 2026-09-16** on Astro. Remaining routes and polish are open.
6. Waitlist form plus transactional email with the reveal copy. No mailing-list subscription. Blocked on the sender domain and service (open decision 6).

## Lessons log

- AI research supplied without the project frame arrives coherent but wrongly anchored (Gemini placed the founding at 1975; canon is 1973, and it assumed a pure research enterprise). Re-anchor every number to the world facts table on entry.
- Two agent sessions drafted imagery docs under near-identical names. Name docs by function and cross-link them (slot map vs generation ledger).
- **One ambiguous stamp, five documents wrong.** "Swap." meant the doctorate, not the mentor role. When a stamp is a single word, restate the interpretation in one line and get a yes before cascading it into canon.
- **A missing logo is a design dependency, not a build dependency.** Isolate the mark behind one data slot (`markSvg`) and a type fallback, and nav/footer/preloader/favicon/OG stop waiting on it. Same for the ported effects: gate them behind flags instead of blocking the scaffold.
- **Do not port a scroll-hijacking smoother into a real site.** The rep's `SmoothRoot` breaks native scroll, anchors, and keyboard access. Reuse the effect engines, drop the scroll hijack.
- **A soft violation on a gating threshold flickers.** `breaks_constraint` reads near `review_threshold`, so the same good draft routed `accept` and `ask_human` on different runs. Hard violations gate; soft ones report as banners and let the composite decide.

## Related

- [[01-Projects/Clone-Website/Docs/jev/2026-09-17-quality-battery-v1|Quality battery v1]] — the Jev judge: copy and image batteries, `judge.py`, `vision.py`. Sibling to the after-judge spec.
- [[01-Projects/Clone-Website/Docs/2026-09-17-jev-after-judge-design|Jev after-judge design]] — the Phase 1 hazard judge spec.
- [[03-Resources/Design/Web-Garnish/_index|Web-Garnish]] + [[03-Resources/Design/Web-Garnish/07-Build-Runbook|Build Runbook]] — footer kit, fonts, palettes, SVG/CSS idioms
- [[03-Resources/Tools/Effects_Glossary|Effects Glossary]] — decoded Lamalama/Antigravity/Fin effects with technique notes
- [[00-Inbox/Sites To Extract|Sites To Extract]] — the extraction backlog this project draws from
- White Desert (live reference): https://white-desert.com — extracted skeleton in the raw archive's provenance section
