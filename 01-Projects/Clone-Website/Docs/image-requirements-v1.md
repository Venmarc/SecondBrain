---
title: Codon Labs — Image & Motion Requirements v1
date: 2026-09-13
tags: [project, clone-website, assets, prompts, suprgrok-sprint]
---

> One-line: every visual asset the site needs, derived slot by slot from copy-v1.md, with paste-ready generation prompts, Agy review criteria, and the sprint order for the SuperGrok window.

---

## 0. Global visual rules (all assets obey these)

- **R1. No adult doubles.** D12 settled it: continuations are born babies; the oldest in-world continuation is about 18 months (first birth March 2025). Any frame with two identical grown people is a movie poster and breaks the fiction. Kill on sight.
- **R2. Related, not identical.** Donor and infant share feature families (nose shape, eye color, brow line). Never uncanny sameness. The gap IS the story.
- **R3. One light register.** Warm lab light. Amber practicals against near-black or bone-white. Cold tones only inside instruments and screens.
- **R4. The register test.** A billionaire's chief of staff sees this photo on a $2M biotech site and believes it. Anything smelling of stock, cult, or sci-fi gets killed.
- **R5. No text in generated images.** AI text artifacts are the number one tell. All typography happens in the build.
- **R6. Every asset names its copy slot.** No orphan beauty shots. If it anchors nothing, it does not get generated.
- **R7. Fictional people only.** Founder, families, staff: all invented faces. No celebrity likeness, no real person.

## 1. Palette + grade (working default, not stamped)

Base warm near-black `#141210`, bone `#F4EFE6`, amber practicals `#D9A441`, one cold accent `#4A90B8` reserved for data and UI. Grade: soft film grain, lifted blacks, no HDR crispness. These are grading defaults for prompts; brand tokens get locked at build.

## 2. Asset ledger

| ID | Asset | Copy slot | Tier | Status |
|---|---|---|---|---|
| A1 | Hero loop keyframes (3) | Hero | A | pending |
| A2 | The Hand | Process step 6, the single most important image | A | pending |
| A3 | The Sample | Process step 2 | A | pending |
| A4 | The Reprogramming | Process step 4 | A | pending |
| P1 to P6 | Family pairs (reviews 4 + look-book starters 2) | Section 4 reviews + /families | A | pending |
| A11a | Founder portrait, historical (Bea at about 50, circa 1993, archive) | Founder quote + /about | A | pending |
| A11b | Founder portrait, current (Bea at 82) | /about | A | pending |
| A11c | The founder's continuation (Schönbächler archive portrait + his 18-month-old) | /about, once, never in the look-book | A | pending |
| A12 | Lab exterior at dusk | /about | A | pending |
| A13 | Culture room interior | /program + /about | A | pending |
| P7 to P10 | Look-book depth pairs | /families | B | pending |
| B5 | Continuation scan (ultrasound register) | Section 3 | B | pending |
| B6 | Letterpress paper texture | /docs | B | pending |
| C1 | The Codon mark (SVG) | Grain intro, nav, footer | C | design task |
| C2 | Grain intro | Boot | C | code port |
| C3 | Cursor trail, image-click distortion | Motion budget | C | code port |
| C4 | OG share card | Meta | C | composite of C1 + H1 |

## 3. Tier A: the SuperGrok sprint (16 generation targets)

**A1. Hero loop keyframes.** Slot: hero, after grain intro fades into the mark. Three keyframes, motion interpolated at build:
1. Single cell, warm golden light, translucent membrane, dark field.
2. First division: two cells mid-cleave, amber rim light.
3. Blastocyst: sphere with softly glowing inner cell mass. (Keyframe 3 doubles as the Section 4 embryo image. Reuse, do not regenerate.)

Prompt (paste into image tool, run 3 times, swap the stage sentence):
> Extreme macro scientific visualization, [STAGE: a single human egg cell / a human cell in first division, mid-cleave / a human blastocyst with inner cell mass], warm golden light like sunlight through amber, translucent membranes, deep dark near-black background, serene and reverent, microscopic cinematography, soft film grain, shallow depth. No text, no watermark, no scientific diagram lines.

**A2. The Hand.** Slot: process step 6. The single most important image on the site.
> Photorealistic macro photograph, an infant's hand gripping the index finger of an adult, warm diffused window light from the left, shallow depth of field, soft natural skin tones, bone and warm near-black palette, clinical warmth, editorial biotech campaign style, 85mm lens look, subtle film grain. No text, no watermark, no jewelry, no extra fingers.

**A3. The Sample.** Slot: process step 2.
> Photorealistic macro photograph, gloved hands lifting a small cryovial from a vapor of liquid nitrogen, frost wisps catching amber rim light, dark warm laboratory background out of focus, precise unhurried mood, editorial science photography. No text, no labels on the vial, no watermark.

**A4. The Reprogramming.** Slot: process step 4. The hero loop's little sibling.
> Abstract macro visualization, a donor cell being drawn into an emptied egg cell, a faint electric shimmer at the point of fusion, warm amber and bone tones against deep dark, elegant, almost reverent, scientific cinematography feel, soft grain. No text, no diagram lines, no watermark.

**P1 to P6. Family pairs.** Slot: reviews (4) and /families look-book (2 starters). Template, run once per pair with the variables swapped:
> Editorial portrait photograph, [ADULT: a woman in her early fifties / a man in his mid forties / a woman in her late thirties / a man in his late twenties / a man in his sixties] holding [INFANT: a newborn girl / a ten-month-old boy / a newborn / a fourteen-month-old toddler], both facing the camera, the infant's features visibly echoing the adult's (same eye color, same nose family, same brow), warm neutral studio backdrop, one soft key light, bone and near-black wardrobe, luxury biotech campaign aesthetic, medium format look, calm expressions, no smiles wider than a quiet one. No text, no watermark, no uncanny identical faces, no extra fingers.

| Pair | Adult | Infant | Review anchor |
|---|---|---|---|
| P1 | woman, early 50s | newborn girl | R.O., 51, twin sister donor |
| P2 | man, mid 40s | 10-month boy | M.V., 44, self donor |
| P3 | woman, late 30s | newborn | T.K., 38, with her wife, donor |
| P4 | man, late 20s | 14-month toddler | J.D., 29, self donor |
| P5 | man, 60s | newborn | look-book, legacy register |
| P6 | woman, mid 30s | 6-month girl | look-book, second-generation tease |

**A11a. Founder portrait, historical (stamped: Bea).** Slot: founder quote + /about. Archive photograph, circa 1993, the animal-division years, three years before Dolly.
> Editorial portrait photograph, a scientist in her early fifties, late 1993, dark knit sweater, plain pulled-back hair, steady warm expression, standing in a softly blurred laboratory with warm practical lights, medium format look with visible film grain and slightly faded archive colour, shallow depth of field, magazine profile aesthetic. No text, no logos, no lab coat, no watermark.

**A11b. Founder portrait, current (stamped: Bea at 82).** Slot: /about. Same woman, today. The founder still at work after 53 years.
> Editorial portrait photograph, a woman in her early eighties, silver hair pulled back plainly, dark knit sweater, steady warm expression with deep laugh lines, standing in a softly blurred laboratory with warm practical lights, medium format look, shallow depth of field, magazine profile aesthetic. No text, no logos, no lab coat, no watermark.

**A11c. The founder's continuation (stamped: Schönbächler).** Slot: /about, used once, never in the look-book. A 1990s archive portrait of the professor beside his eighteen-month-old continuation. Same feature family, never uncanny sameness (R2).
> Two photographs presented as a pair: first an archival portrait of a distinguished man in his sixties, early 1990s, warm faded colour, slight grain; second an honest photograph of a healthy eighteen-month-old child, warm lab-adjacent light, plain clothing, no props. The child's eye shape and brow line echo the man's. Neither image staged. No text, no logos, no watermark.

**A12. Lab exterior at dusk.** Slot: /about (the Basel campus; the Program's New York site is described, not shown, keeping to one exterior asset per the intention rule).
> Architectural photograph at blue hour, a low modern research building with floor-to-ceiling glass glowing warm from inside, wetland landscaping reflecting the light, minimalist architecture, quiet and expensive, editorial architecture magazine style. No text, no signage, no logos, no watermark.

**A13. Culture room interior.** Slot: /program + /about.
> Cinematic interior photograph, a quiet laboratory culture room, a row of illuminated incubator modules with warm amber status lights, one scientist silhouette in soft focus in the background checking a monitor, near-black shadows, bone surfaces, calm precise mood. No text, no visible branding, no watermark.

## 4. Tier B: polish, can follow after the window

- **P7 to P10.** Remaining look-book pairs, same template. Diversity of ages and relations per the look-book table.
- **B5. Continuation scan.** Ultrasound-register image for section 3. Warm, not clinical-cold.
- **B6. Letterpress paper texture.** For /docs. Subtle, scanned feel.

## 5. Tier C: design and code tasks, no generation

- **C1. The Codon mark.** Hand-SVG per the runbook rule (crisp marks are hand-drawn, never generated). Three concepts: (1) triplet: three unequal ticks orbiting a C, one per base of a codon; (2) a C built from three rungs like a ladder slice; (3) wordmark CODON where the second O is a cell with a nucleus offset. Victor picks the concept, I draw it in session.
- **C2. Grain intro.** Port from rep-lamalama; it renders the mark, so it needs C1 first.
- **C3. Cursor trail + image-click distortion.** Ports; assign to sections at build against the motion budget.
- **C4. OG share card.** Composite: mark + H1 on the palette. Build-time export.

## 6. Agy review loop (per D16)

Every generated asset passes this gate before it enters the build:

1. **Anatomy:** hand and finger counts, face coherence, eye alignment. Kill: any malformation.
2. **R1 check:** no adult doubles anywhere in frame.
3. **R2 check:** pairs read as family, never as uncanny copies.
4. **Register test (R4):** would the chief of staff believe it. Kill: stock cheese, sci-fi glow, cult warmth.
5. **Text sweep:** zero letters, zero watermarks, zero label artifacts.
6. **Slot fit:** does it sit in its copy slot without cropping the subject.

Failures get one Agy edit pass against the same criteria, then regenerate rather than over-edit.

## 7. Sprint order (the clock: sub dies ~09-15/16)

1. A2 The Hand (the site's most important single image)
2. A1 keyframes (the hero is the first thing anyone sees)
3. P1 and P2 (reviews anchor the emotional core)
4. A11a-c founder assets, A13 culture room (trust surfaces)
5. A3, A4 (process texture)
6. P3 to P6, A12 (depth)
7. Tier B only if the window still lives

Tavily reference searches run per asset at generation time (D16 pipeline: requirements, references, generate, Agy review). Reference genres already banked: Zlewski twin portraits, Brunelle lookalikes, Collette genetic splices, embryo microscopy, clean lab interiors.

---

*End of requirements v1. Founder assets split into A11a-c (Bea circa 1993, Bea at 82, and the Schönbächler continuation pair). No blocking defaults remain.*
