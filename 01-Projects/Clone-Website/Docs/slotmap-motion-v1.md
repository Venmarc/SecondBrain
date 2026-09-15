---
title: Codon Labs — Imagery & Motion Requirements v1
date: 2026-09-13
tags: [project, clone-website, imagery, video, requirements]
---

> Every visual slot on the site, what fits it, what must not appear, and the motion budget. Companion to the generation ledger [[01-Projects/Clone-Website/Docs/image-requirements-v1|image-requirements-v1.md]] (sibling session, paste-ready prompts + sprint order): this doc maps WHERE assets live, that doc says HOW each gets made. Pipeline per D16: requirements → Tavily references → generate → Agy review. No image ships without passing its gate.

**Victor's intention rule (2026-09-15): images are arguments, not decoration.** No galleries, no look-book padding, no decorative photography. Every image must be doing an evidentiary job in its section. If a slot can be deleted without weakening the argument it was making, delete it.

---

## 0. The Three In-World Laws (every asset is checked against these)

1. **Present-day imagery shows donors and babies only.** First birth was March 2025 in-world. The oldest continuation alive is about 18 months old. No grown continuation appears in any present-day context. The grown-continuation fantasy lives in exactly one honest form: the age-progression pair, labeled as projection.
2. **One continuation per donor, site-wide.** No doubles, no spare, no lineup of clones. Satirical multi-clone imagery is confined to the movies-vs-us panel on /process. The /no-decoys page stays typographic.
3. **Every face is fictional.** No real people, no recognizable likenesses, no celebrity faces, no recognizable real institutions. Generated people only. Legal floor and believability floor at once.

## 1. Global visual spec

- **Register**: editorial-luxury photography, film-like, restrained. The reference is White Desert's art direction: warm neutrals, vast calm, human warmth inside clinical precision. Never stock-y, never neon sci-fi, never glowing-blue "biotech of the future" cliché.
- **Light**: warm available light, golden-hour or soft interior. One accent color max (palette lock pending, see Open Items).
- **Aspect vocabulary**: hero loop 16:9, section banners 21:9, portraits 4:5, process 4:3, wide 3:2, OG card 1200x630.
- **Face consistency pipeline** (for any donor/continuation pair): generate the base portrait once, then produce the paired variant (age, pose) via edit passes on the same base, never fresh generations. Agy gate: "could these two share a genome."
- **Baby imagery rule**: prefer hands, backs of heads, feet, silhouette-in-nursery-light over full baby faces. AI baby faces are the uncanny-valley capital of this project. Where a baby face is unavoidable (look-book pairs), it gets the strictest Agy realism pass of the whole sprint.

## 2. Slot table (stills)

| Slot | Page / Section | Requirement | Count | Aspect |
|---|---|---|---|---|
| HERO-1 | Home hero | Poster frame from the hero loop: abstract dividing cell, warm light, no faces | 1 | 16:9 |
| S1-1 | Four Billion Years strip | Primordial: warm shallow water, first cells implied, no dinosaurs, no clichés | 1 | 3:2 |
| S1-2 | Four Billion Years strip | The reading: genome sequencing machine close-up, screen glow abstract | 1 | 3:2 |
| S1-3 | Four Billion Years strip | Dolly era: 1990s lab interior, sheep-field Scotland feel, muted film look | 1 | 3:2 |
| S2-1 | Process step 1, The Conversation | Calm consultation room, two chairs, screen glow, empty of people | 1 | 4:3 |
| S2-2 | Process step 2, The Sample | Gloved hands holding a small vial, macro, shallow depth | 1 | 4:3 |
| S2-3 | Process step 3, The Reading | Sequencer detail, no readable UI text, abstract data feel | 1 | 4:3 |
| S2-4 | Process step 4, The Reprogramming | THE money macro: cell fusion / microscopic pulse, warm-toned, abstract-beautiful | 1 | 4:3 |
| S2-5 | Process step 5, The Culture | Blastocyst macro, warm palette, real microscopy as register reference | 1 | 4:3 |
| S2-6 | Process step 6, The Beginning | Newborn hand gripping an adult finger. The single most important image on the site | 1 | 4:3 |
| S2-7 | Movies panel | Retro-futurist "instant adult" pod illustration, ORIGINAL style, deliberately dated. NOT Rick and Morty art, not any animation studio's style | 1 | 4:3 |
| S3-1 | The Second You | Age-projection pair: donor at 18 (archival photo look) vs continuation projected at 18, side by side, labeled as projection | 1 pair | 4:5 x2 |
| S3-2 | The Second You | Present-day donor + baby pair, quiet domestic light | 1 pair | 4:5 x2 |
| S4-1 | Fourteen Families (home) | Four donor/continuation portrait pairs, editorial register | 4 pairs | 4:5 |
| S4-2 | /families look-book | Six more pairs, same register, varied living situations | 6 pairs | 4:5 |
| S4-3 | The grandfather family | Three-generation set: elderly donor portrait, adult grandchild, baby continuation. The D19 story | 1 set | 4:5 x3 |
| S4-4 | /families sample subpage | One family, one extra pair + context detail | 1 pair | 4:5 |
| PR-1 | The Program | Facility exterior, golden hour, restrained, no signage close-ups | 1 | 21:9 |
| PR-2 | The Program | Interior corridor, clean warm, deep perspective | 1 | 21:9 |
| PR-3 | The Program | Lab wide shot, few people in motion, documentary feel | 1 | 16:9 |
| AB-1a | /about founder, historical | Bea Vogel-Keller at about 50, circa 1993, the animal-division years, three years before Dolly. Archive treatment, one placement. Fictional person, no real likeness | 1 | 4:5 |
| AB-1b | /about founder, current | Bea Vogel-Keller at 82. Warm, credible, editorial. The founder still at work after 53 years | 1 | 4:5 |
| AB-2 | /about | Team candid at work, natural light | 1 | 3:2 |
| AB-3 | /about | The Roslin papers on the office wall, detail shot | 1 | 3:2 |
| AB-4 | /about, the founder's continuation | Markus Schönbächler's archive portrait beside his eighteen-month-old continuation. Used once, never in the look-book (D32 corrected by D35, intention rule) | 1 pair | 4:5 x2 |
| OG-1 | Everywhere (share card) | 1200x630 link-share image: mark + hero line typography | 1 | 1.91:1 |
| FT-1 | Footer (conditional) | Wide scene asset ONLY if the sibling footer session lands a scene-based footer. Otherwise footer is pure SVG and needs nothing | 0-1 | 21:9 |

Stills total: **about 30 finals** (including pairs and the conditional).

## 3. Motion / video slots

| Slot | Location | Requirement | Format |
|---|---|---|---|
| V-1 | Hero loop | Abstract cell-division loop, warm, slow, seamless, no faces. 8 to 12 seconds. Muted tones matching palette. Built by interpolating the A1 keyframes from the generation ledger (image-requirements-v1.md) | video, loop |
| V-2 | Preloader | 2-3 seconds: grain resolves into the mark (build from code once the mark exists; only generated footage if code fails) | code first |
| V-3 | Culture strip (process step 5) | Abstract time-lapse of cell division, 6-10 seconds, the hero loop's little sibling. Can reuse A1 keyframe 3 lineage | video, loop |
| V-4 | Sample-to-birth journey | THE White Desert flight-map mirror, two legs. Leg one: the line from Basel to the Program in New York (coordinates, distance, flight time, the CPT-WFR stat register). Leg two: skin cell → egg → blastocyst → transfer → birth across a wide band. Built, not generated (SVG line animation) | build |
| V-5 | Cursor trail, click distortion, grain | Ported from rep-lamalama, no new assets | port |

## 4. Build-not-generate assets (code/SVG, no AI spend)

1. The Codon Labs mark (logo). BLOCKS: grain intro, preloader, favicon, OG card. Needs design first.
2. Genome-cost microchart (Section 1: $1B / 13 years → $500 / 1 day).
3. Roadmap timeline (2023 solved → 2024 first birth → 2026 present → 2028 nine months).
4. Sample-to-birth line animation (V-4).
5. Consent-flow diagram (/docs).
6. Genome-match verification graphic (/no-decoys: one genome, one match, fingerprint-style).

## 5. Generation budget and sequencing

- Final stills: ~30. With base-plus-variants and face-consistency edit passes: **~50-60 generation calls** inside the SuperGrok window.
- **Sequencing rule**: do NOT burn the window on finals while copy is unstamped. Two-step:
  1. **Register test batch, immediately**: 3 generations (S2-4 money macro, one portrait pair, S2-6 baby hand) to lock the visual register before anything else. If the register is wrong, every later asset inherits the wrong.
  2. **Full sprint, after your red-ink stamps land**: everything else, Agy gate per asset.
- The mark (build asset) gates the preloader, OG card and favicon. Design it during the window in parallel.

## 6. Agy review gate (per asset checklist)

- [ ] Subject matches the slot requirement exactly
- [ ] In-World Laws 1-3 pass (no grown continuation, no doubles, no real faces)
- [ ] Register: editorial-luxury, not stock, not neon sci-fi
- [ ] Pair consistency: "could share a genome" (for pairs)
- [ ] Baby realism: strictest pass (for baby shots)
- [ ] Palette within the locked palette (once locked)
- [ ] Technical: correct aspect, no artifacts, no extra fingers, no watermark traces, no readable fake UI text

## 7. Open items

1. Palette lock (pending Web-Garnish runbook choice + the sibling footer session's result)
2. The mark (design blocker for 3 other assets)
3. Geography: if a jurisdiction gets stamped, facility architecture should match its region
4. Look-book city labels (fictional-adjacent real cities, per copy deck flag 8)
5. Tavily reference deepening: one more pull per register (twin portrait genre holds: Zlewski, Brunelle, Collette; embryo microscopy banked; lab interiors banked)
