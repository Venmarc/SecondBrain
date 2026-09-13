---
title: Clone-Website
date: 2026-09-13
tags: [project, active, clone-website, web-design, fiction-site]
---

> **One-line Summary**: Fictional-but-believable human cloning company website, White Desert's skeleton with lab aesthetics, Lamalama motion effects, AI-generated twins imagery frontloaded before the SuperGrok sub expires. Brainstorm complete; planning next.

**Status:** Brainstorm complete (2026-09-13) → planning. Code: not started.
**Raw sources:** [[01-Projects/Clone-Website/Docs/brainstorm-2026-09-12-raw|brainstorm raw archive]] (6 voice transcripts + phone note + seed note). White Desert reference shots in `Docs/assets/white-desert/`.

## What this is

A fake company site for cloning **human beings** (not pets — see D2), played 100% straight. No "this is a demo" anywhere in visitor-visible copy, same as White Desert sells Antarctica: luxury-biofiction, plausible-scientific, cinematic. The fiction breaks only in the waitlist signup email.

**North star:** White Desert (white-desert.com) — luxury travel to the harshest place on Earth; ours is luxury biotech at the frontier of reproduction. Awwwards-level feel.

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

## Open decisions (for Victor)

1. **Company name + brand voice** — nothing decided anywhere. Needed before hero copy and logo-grain intro (the intro literally renders the mark).
2. **Footer style pick** — engraved vignette is my recommendation (bio-luxury fit, zero-image LCP-safe); sticker/stamp/watercolor sit less well on a $500k biotech fiction. Victor's call.
3. **Pricing fiction** — real anchors exist; exact package prices TBD.
4. **Waitlist email reveal copy** — the one place the mask comes off; needs careful tone (conversational, no-blame).
5. **Where the code lives** — suggest `Documents/Port Sites/Category 5/<name>` per vault convention, or standalone repo if it's a portfolio fiction piece.

## Next actions

1. Victor: pick company name (blocks hero copy, logo, email sender name).
2. Asset generation sprint in the SuperGrok window (D5) — prompts drafted from White Desert's imagery register.
3. Clone rep-lamalama to this machine; port the four effects behind small wrappers.
4. Scaffold site (Next.js per White Desert's stack, or Astro per Pastries habit) once assets exist.
5. Waitlist: form + transactional email (Resend/SES) with the reveal copy; NO mailing-list subscription without explicit opt-in.

## Related

- [[03-Resources/Design/Web-Garnish/_index|Web-Garnish]] + [[03-Resources/Design/Web-Garnish/07-Build-Runbook|Build Runbook]] — footer kit, fonts, palettes, SVG/CSS idioms
- [[03-Resources/Tools/Effects_Glossary|Effects Glossary]] — decoded Lamalama/Antigravity/Fin effects with technique notes
- [[00-Inbox/Sites To Extract|Sites To Extract]] — the extraction backlog this project draws from
- White Desert (live reference): https://white-desert.com — extracted skeleton in the raw archive's provenance section
