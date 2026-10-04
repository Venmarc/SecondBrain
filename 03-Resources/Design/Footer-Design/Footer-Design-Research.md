# Footer Design: Research, Style Library & Scenario Playbook

**Author:** research compiled for Victor
**Date:** 2026-09-28
**Companion file:** `footer-carousel-prompt.md` (the 30-slide build prompt)

---

## 0. TL;DR

- Most footer articles say the same things. A footer holds navigation, contact details, legal links, social links, a newsletter signup and a call to action. Very few sources treat the footer as a visual design problem.
- The most creative sources ([Qode Interactive](https://qodeinteractive.com/magazine/examples-of-innovative-footer-design/), [Webflow](https://webflow.com/blog/website-footer-design-examples), [Really Good Designs](https://reallygooddesigns.com/website-footer-examples/)) push footers in three directions. The footer gets bigger (full-screen, oversized type), it reveals itself (the page lifts off, a double footer), or it plays (mini-games, animated lettering, custom cursors).
- The UX sources ([NN/g](https://www.nngroup.com/articles/footers/), [Eleken](https://www.eleken.co/blog-posts/footer-ux), [UX Knowledge Base](https://uxknowledgebase.com/footer-design-best-practices-inspiration-f81cc5431388)) decide what goes in the footer. The inspiration sources decide how it looks.
- Your reference set adds something none of the articles name: **the edge where the footer meets the page**. Treelines, grass horizons, knocked-out letters and images that fade into the background are not documented as a category anywhere I found. I call this **Page-fit**.
- My conclusion: a footer is defined by 5 independent variables (Art, Type, Layout, Components, Page-fit). Almost every "boring" footer changes only the type and layout and leaves the other three at their defaults. Changing Art or Page-fit is what makes a footer look different, not just recoloured.

---

## 1. Scope & method

**Question:** What makes one footer look and feel different from another? Which distinct styles exist, and when is each one the right call?

**Criteria used to break down every example** (your list, used as the lens throughout):

| # | Criterion | What it covers |
|---|---|---|
| A | **Art** | The kind of imagery (photo, illustration, SVG, texture, none), how to recreate it, and where it sits |
| B | **Type** | Font choice, scale contrast, weight, case, typography used as imagery |
| C | **Layout** | Grid, spacing, column logic, how the content is positioned |
| D | **Components** | What's inside (links, inputs, badges, clocks, maps, games) and what each is built from |
| E | **Page-fit** | How the footer joins the section above it: hard cut, fade, overlap, silhouette, reveal, inset, and so on |

**Process:**
1. I broke down your 9 reference footers against A–E.
2. I read the galleries, listicles and UX pattern articles listed in section 2.
3. For every direction I found, I pulled out A–E, then recombined values across examples to produce 30 distinct styles.
4. Distinctness rule: two styles are only "different" if they differ in at least two of Art, Layout and Page-fit. Changing colour, text or size alone doesn't count.

---

## 2. Sources and what each contributed

| Source | Type | What it's good for | What it lacks |
|---|---|---|---|
| [footer.design](https://www.footer.design/) | Curated gallery | A taxonomy by type and style, with categories such as Bento Box, Illustrative, Grid, Flat, Animated, Cards, Gradient, Typographic and Small Type ([bento](https://www.footer.design/styles/bento-box), [animated](https://www.footer.design/styles/animated), [gradient](https://www.footer.design/styles/gradient)) | The page content wouldn't load in my crawler. I only got the category names, not the individual entries |
| [Qode Interactive — 15 innovative footers](https://qodeinteractive.com/magazine/examples-of-innovative-footer-design/) | Editorial listicle | The best source for **page-fit and scale** ideas: reveals, double footers, full-screen footers | Little on the reasoning behind components |
| [Webflow — 20 footer examples](https://webflow.com/blog/website-footer-design-examples) | Editorial listicle | **Shape and play:** curved layouts, wavy splits, micro-games, "ground floor" line drawings | Shallow on how each is built |
| [Colorlib — 24 footer examples](https://colorlib.com/wp/website-footer-examples/) | Editorial listicle | **Functional components** by industry: hours, maps, coupons, currency switchers, app badges | Visually conservative |
| [Really Good Designs — 30 footers](https://reallygooddesigns.com/website-footer-examples/) | Editorial listicle | **Typography and motion:** animated lettering, tiny text against huge text, graphic carousels | Descriptions are mostly adjectives |
| [NN/g — Footers 101](https://www.nngroup.com/articles/footers/) | UX research | **Content patterns** and when to use each one | No visual guidance |
| [Eleken — 10 footer UX patterns](https://www.eleken.co/blog-posts/footer-ux) | UX article (2026) | **Modern behaviour patterns:** consent-aware, region-aware, sticky mini-footer, infinite-scroll companion | Few visual examples |
| [UX Knowledge Base](https://uxknowledgebase.com/footer-design-best-practices-inspiration-f81cc5431388) | UX essay | **Footer roles** (branding, trust, navigation, CTA, help, emotional design) and a component checklist | Summarises other sources |
| [Awwwards — Footer collection](https://www.awwwards.com/websites/footer-design/) and [creative footers](https://www.awwwards.com/15-excellent-creative-website-footers.html) | Award gallery | The list of expected elements (sitemap, contact, social, privacy, terms) and a pointer to interactive footer entries ([interactive typographic footer](https://www.awwwards.com/inspiration/interactive-typographic-footer-offform), [mini-game footer](https://www.awwwards.com/inspiration/interactive-footer-0110-studio-portfolio-web)) | Gallery entries loaded with little description |
| [Olivier Larose — Sticky footer tutorial](https://blog.olivierlarose.com/tutorials/sticky-footer) | Technical tutorial | The exact CSS for the curtain-reveal footer | Covers one technique only |
| Physics and mask techniques ([Matter.js footer video](https://www.youtube.com/watch?v=4mjOyqL-XbM), [Fancy Components Gravity](https://www.fancycomponents.dev/docs/components/physics/gravity), [O'Reilly SVG video mask](https://oreillymedia.github.io/Using_SVG/extras/ch15-video-mask.html)) | Technical | How to build physics piles and text-masked video | Not footer-specific |
| **Your 9 references** | Instagram carousel (@zachex) plus 4 illustrated footers | The strongest source for **art placement and page-fit** | The contents repeat (same links and contact block) |

---

## 3. Your reference set, decoded

These 9 were the starting point. The table breaks each one down so you can see what it actually changes.

| Ref | Art (and how to recreate it) | Type | Layout | Components | Page-fit |
|---|---|---|---|---|---|
| **Hero (Vyre)** | None. A flat navy block (#1F2D4D-ish) | Centred bold sans headline plus a small subline | Centred brand stack (logo, headline, newsletter pair), then 4 columns | Two newsletter inputs, social icon squares | A rounded-top block rising from a light page. The footer is a raised slab |
| **Silhouette (Cycleon)** | SVG treeline path in the same green as the footer, sitting on the footer's top edge against cream | Wordmark and logo left, small sans columns | Logo left, 3 columns right, centred legal line | Social squares, handle | **The top edge is the art.** The silhouette turns a straight cut into a landscape horizon |
| **Large-type (Astralis)** | Giant logo mark (pegasus) plus a wordmark spanning the full width at the bottom | Wordmark about 20% of the footer's height, everything else about 11px | 4 columns on top, wordmark band below, centred legal line | Email input, brand statement | The white footer card sits over a blue block; the type fills the empty space |
| **Negative (brün)** | None. The **letters are cut out of the background colour**: white letters crossing a dark-green to white boundary | Giant geometric lowercase wordmark bleeding off the top edge | Wordmark band on top, 4 columns plus a badge below | Journal input, circular brand badge | The letters **belong to both** the green section and the white footer, fusing the two |
| **Grounded (Altennis)** | Photo of a meadow with runners. The sky fades to the page background colour | Medium bold tagline, small columns | Content in the top half (in the sky), photo ground in the bottom half | Newsletter input, social | **Open space above.** The photo's sky becomes the page, and the ground is the true bottom |
| **Meridian: harbour** | Sepia engraving/etching of a harbour, full width in the bottom 60%, with a paper texture. Recreate with an AI image: "19th-century copperplate engraving, sepia ink, fine cross-hatching, on cream paper" | Serif wordmark, serif column heads, sans links | Brand and tagline left, 3 columns right, all above the image | Minimal: links and copyright | The image's sky is the paper colour, so there's no boundary at all |
| **Meridian: viaduct** | The same engraving style, but the subject is a steam train on a viaduct with the smoke drifting left. Negative space is deliberate | Same as the harbour | Same as the harbour | Same as the harbour | Same system with different art. **This shows art can be swapped per page or campaign** |
| **Zuno** | Risograph-style **halftone** landscape (dot grain, warm muted palette) in the bottom 45%, with a halftone texture across the whole footer | Clean sans; orange square bullets on the column heads | 4-zone top row (brand, 3 columns, newsletter), divider, legal row | Social icon squares, email with an orange arrow button | A warm paper colour carries over from the page, and the art grounds it |
| **answerr** | Blue **toile/engraving** of a domed civic building, centred and anchored at the bottom, rising **between** the link groups. Vertical pin-stripes above it | Serif display CTA ("See your AIQ"), small uppercase sans heads | CTA block on top, brand left, columns right, **the building fills the centre gap** | Two CTA buttons, a status line ("All systems operational") | The CTA and footer share one white field; the building fills the space between columns |

**What your references show that the articles don't:**
1. **Art placement is a layout decision.** In the answerr footer the building sits exactly in the gap between the brand and the columns. In the Meridian footers the image sits below everything, and in the Grounded footer the text sits in the sky.
2. **Page-fit is its own design variable.** The silhouette edge, the knocked-out letters, the fade to paper and the raised slab are four different ways to solve the same boundary.
3. **Art can be swapped while the system stays fixed.** The two Meridian footers are one layout with two illustrations, which works for seasonal or per-page footers.

---

## 4. Findings by criterion

### A. Art: seven families

| Art family | Examples seen | How to recreate it | Typical position |
|---|---|---|---|
| **None / pure colour** | VSCO's stark black and white, [Anti](https://qodeinteractive.com/magazine/examples-of-innovative-footer-design/)'s four columns ([Webflow](https://webflow.com/blog/website-footer-design-examples)) | Solid fill, one accent | n/a |
| **Silhouette / edge art** | Cycleon treeline, Clade's wavy split ([Webflow](https://webflow.com/blog/website-footer-design-examples)) | A single SVG `<path>` in the footer's colour, placed on the top edge | Top edge |
| **Engraving / line art** | Meridian, answerr, Debtfindr's decorative line drawing that creates a "ground floor" ([Webflow](https://webflow.com/blog/website-footer-design-examples)) | AI image prompt: "copperplate engraving, cross-hatching, single ink colour, white background". Or trace to SVG | Bottom, full width, or centred behind the links |
| **Halftone / riso / dither** | Zuno | Generated image plus a CSS dot overlay (`radial-gradient` pattern) or a dither pass | Bottom 40–50% |
| **Photography** | Altennis meadow; Aroz Jewelry's full-width image ([Qode](https://qodeinteractive.com/magazine/examples-of-innovative-footer-design/)); Union Construction's footer that's only a branded-towel photo ([Qode](https://qodeinteractive.com/magazine/examples-of-innovative-footer-design/)) | A photo whose top colour matches the page | Full-bleed, text in the negative space |
| **Illustration / scene** | Lunchbox's centred illustration in a full-screen footer; Cubitts' illustration ([Qode](https://qodeinteractive.com/magazine/examples-of-innovative-footer-design/)) | SVG or generated image in the site's illustration style | Centre, with links around it |
| **Motion / generative** | Kota's immersive animation on dark ([Really Good Designs](https://reallygooddesigns.com/website-footer-examples/)), gradient footers ([footer.design](https://www.footer.design/styles/gradient)) | Canvas/WebGL, CSS keyframes, blurred gradient blobs | Background layer |

**Similar:** in almost every art-led footer, the art sits at the **bottom** and the text sits **above** it. It works like a horizon: the site "lands".
**Distinct:** answerr (art between the columns) and Negative (the type is the art) break that rule, and they stand out more because of it.

### B. Type: four modes

1. **Utility type:** everything 12–15px, organised by columns. Stripe manages 50+ links this way ([Colorlib](https://colorlib.com/wp/website-footer-examples/)).
2. **Scale contrast:** tiny links against huge lettering. M&C Saatchi Abel ([Really Good Designs](https://reallygooddesigns.com/website-footer-examples/)), Sol'ace's huge Basic Commercial letters with fine grid lines ([Qode](https://qodeinteractive.com/magazine/examples-of-innovative-footer-design/)), Diana's Seafood's oversized type ([Webflow](https://webflow.com/blog/website-footer-design-examples)), and your Astralis reference.
3. **One-word footer:** Antinomy uses only "Mail" in large Helvetica Now on black ([Qode](https://qodeinteractive.com/magazine/examples-of-innovative-footer-design/)); Spline uses only a huge-lettering CTA ([Really Good Designs](https://reallygooddesigns.com/website-footer-examples/)).
4. **Kinetic type:** animated lettering (Will Ventures, Ltude) ([Really Good Designs](https://reallygooddesigns.com/website-footer-examples/)); marquees (Vide Infra) ([Qode](https://qodeinteractive.com/magazine/examples-of-innovative-footer-design/)); Awwwards' interactive typographic footers ([Awwwards](https://www.awwwards.com/inspiration/interactive-typographic-footer-offform)).

**Similar:** nearly all creative footers use a heavy sans (Helvetica/Inter-like) for the giant word.
**Distinct:** serif-led footers (Meridian, answerr, Red Company's black Freight on white ([Qode](https://qodeinteractive.com/magazine/examples-of-innovative-footer-design/))) come across as editorial and trustworthy rather than loud. They're underused, which makes them a way to stand out.

### C. Layout: six skeletons

| Skeleton | Description | Seen in |
|---|---|---|
| **Doormat columns** | Brand on the left, N link columns on the right, legal bar below | Fiddler's "predictable" footer ([Webflow](https://webflow.com/blog/website-footer-design-examples)); most of your references |
| **Centred stack** | Logo, headline, input, links, all centred | Hero/Vyre |
| **Edges-only** | Content pushed to the corners, empty centre | Seed ([Qode](https://qodeinteractive.com/magazine/examples-of-innovative-footer-design/)) |
| **Split** | Two distinct halves | RocketAir ([Really Good Designs](https://reallygooddesigns.com/website-footer-examples/)) |
| **Grid / bento** | Tiles of different sizes | The Resonance's dark grid ([Webflow](https://webflow.com/blog/website-footer-design-examples)), footer.design's [bento category](https://www.footer.design/styles/bento-box) |
| **Full-screen "page"** | The footer behaves like a page, sometimes with its own header | Lunchbox, Antinomy, The Scott ([Qode](https://qodeinteractive.com/magazine/examples-of-innovative-footer-design/)); Mammoth Murals is too big for a desktop screen ([Webflow](https://webflow.com/blog/website-footer-design-examples)) |
| **Thin slice** | A single horizontal line | Junction ([Webflow](https://webflow.com/blog/website-footer-design-examples)), Oatly ([Colorlib](https://colorlib.com/wp/website-footer-examples/)) |

(That's actually seven, with the thin slice as the opposite extreme of the full-screen footer.)

### D. Components: the full inventory

Put together from [NN/g](https://www.nngroup.com/articles/footers/), [Eleken](https://www.eleken.co/blog-posts/footer-ux), [UX Knowledge Base](https://uxknowledgebase.com/footer-design-best-practices-inspiration-f81cc5431388) and [Colorlib](https://colorlib.com/wp/website-footer-examples/):

- **Navigation:** utility links, doormat nav, sitemap or sitemap-lite, breadcrumbs
- **Secondary tasks:** careers, press, investors, media kit
- **Conversion:** newsletter, CTA ("Ready When You Are", from Bevel via [Webflow](https://webflow.com/blog/website-footer-design-examples)), app-store badges, coupons (Tattly)
- **Trust:** review badges (Astra Security), awards, testimonials, "last updated", system status
- **Local and physical:** hours (ISA), maps and directions (The Refuge Spa), clickable phone numbers (Feastables)
- **Global settings:** language and currency (Gymshark), region switcher, consent and cookie controls, dark-mode toggle
- **Engagement:** social links, embedded social feed, live chat (Cubitts), search (Shanley Cox)
- **Play:** micro-games (Nikolai Bain), custom cursors (Discovered Foods), easter eggs

**Key idea: what a component is made of changes how the footer looks.** A newsletter can be a standard input, a terminal prompt, a chat bubble, a masking-tape label or a classified ad. The job stays the same and the appearance changes completely. This is the main tool used in the 30-style library.

### E. Page-fit: nine ways the footer meets the page

| Page-fit mode | What it is | Seen in |
|---|---|---|
| **Hard cut** | A straight edge with a colour change | Yoga Journal's contrasting background ([Colorlib](https://colorlib.com/wp/website-footer-examples/)) |
| **Seamless continuation** | Same background as the page | Kylie Cosmetics ([Colorlib](https://colorlib.com/wp/website-footer-examples/)), Meridian |
| **Gradient merge** | Colour blends from the section above | Miti Navi, light pink to dark blue ([Qode](https://qodeinteractive.com/magazine/examples-of-innovative-footer-design/)) |
| **Shaped edge** | A curve, wave or silhouette along the top | GenRevv curve, Clade wave ([Webflow](https://webflow.com/blog/website-footer-design-examples)); Cycleon |
| **Raised slab / card** | A rounded block rising from or floating on the page | Vyre, Cecilia's rounded soft grey ([Webflow](https://webflow.com/blog/website-footer-design-examples)) |
| **Reveal (curtain)** | The page lifts to show a fixed footer underneath | Aquerone ([Qode](https://qodeinteractive.com/magazine/examples-of-innovative-footer-design/)); the technique is in [Olivier Larose's tutorial](https://blog.olivierlarose.com/tutorials/sticky-footer) |
| **Double footer** | One footer slides away to reveal another | The Scott ([Qode](https://qodeinteractive.com/magazine/examples-of-innovative-footer-design/)) |
| **Fused (type across the boundary)** | Letters span both the page and the footer | brün Negative |
| **Horizon / grounded** | Art supplies a ground line and the page becomes the sky | Altennis, Debtfindr's "ground floor" ([Webflow](https://webflow.com/blog/website-footer-design-examples)) |

Plus the contextual variants: the **sticky mini-footer** and the **footer reveal pattern** for infinite scroll, which uses a fixed element in the bottom corner ([UX Knowledge Base](https://uxknowledgebase.com/footer-design-best-practices-inspiration-f81cc5431388); [NN/g](https://www.nngroup.com/articles/footers/)).

---

## 5. Cross-source comparison: what's similar, what's distinct

**Where every source agrees:**
- The footer is a navigation safety net. People look for it by habit and expect standard things there. UX Knowledge Base cites Jakob's Law, and NN/g calls utility links a "use for all sites" component ([UX Knowledge Base](https://uxknowledgebase.com/footer-design-best-practices-inspiration-f81cc5431388), [NN/g](https://www.nngroup.com/articles/footers/)).
- Required baseline: sitemap or key links, contact, social, privacy and terms ([Awwwards](https://www.awwwards.com/15-excellent-creative-website-footers.html)).
- The footer should match the rest of the site's look.

**Where they differ:**

| Tension | Side A | Side B |
|---|---|---|
| **Size** | Compact footers work well (Oatly, [Colorlib](https://colorlib.com/wp/website-footer-examples/)); thin slices (Junction) | Full-screen footers that act as pages (Lunchbox, Antinomy, [Qode](https://qodeinteractive.com/magazine/examples-of-innovative-footer-design/)); footers bigger than the screen (Mammoth Murals, [Webflow](https://webflow.com/blog/website-footer-design-examples)) |
| **Density** | Minimalism (Coddi, Altrock) | 50+ links (Stripe, HubSpot) |
| **Purpose** | The footer is where the site ends | The footer is where you jump off to the next page. Zoox's footer pushes you onward to other pages ([Qode](https://qodeinteractive.com/magazine/examples-of-innovative-footer-design/)) |
| **Tone** | Predictable (Fiddler: "exactly where visitors expect it") | Surprising (Osmo's "unpredictable" designs; micro-games) ([Webflow](https://webflow.com/blog/website-footer-design-examples)) |
| **Consistency** | Same footer on every page | Contextual, role-aware footers ([NN/g](https://www.nngroup.com/articles/footers/), [Eleken](https://www.eleken.co/blog-posts/footer-ux)) |

**How to resolve them:** keep the **content** predictable (the standard links, where people expect them) and make the **art and page-fit** surprising. Every good creative example I found keeps the links boring and puts the personality in the visuals and the edge.

**What's distinct to each source type:**
- **Galleries** (footer.design, Awwwards) organise by **visual style**.
- **Listicles** (Webflow, Qode, Colorlib, RGD) organise by **example brand** and mix visual and functional notes.
- **UX articles** (NN/g, Eleken, UXKB) organise by **job to be done** and ignore visuals.
- **Your references** organise by **art placement and page-fit**, which none of the others cover properly.

---

## 6. The 30-style library: families, recipes, when to use

Each style is labelled with its family and its main variable (the criterion that makes it different). Full build specs are in `footer-carousel-prompt.md`.

**Families:** STRUCT = structural/UI · TYPO = typographic · ILLUS = illustrated/SVG · PHOTO = photographic · OBJ = physical-object metaphor · INTER = interactive

| # | Style | Family | Main variable | Best for | Avoid when |
|---|---|---|---|---|---|
| 01 | Constellation | ILLUS | Art replaces the layout | Dark-mode apps, astronomy, night-life, "dreamy" brands | You need to scan 30+ links |
| 02 | Curtain Reveal | STRUCT | Page-fit | Agencies and studios; the email is the CTA | Pages with a very short scroll |
| 03 | Marquee Ticker | TYPO | Motion | Creative agencies, events, launches | Accessibility-heavy sites (add pause controls) |
| 04 | Bento Grid | STRUCT | Layout | SaaS, dev tools, products with status/uptime | Heritage or luxury brands |
| 05 | Terminal / CLI | OBJ | Component materials | Dev tools, docs, APIs, OSS | Non-technical audiences |
| 06 | Physics Pile | INTER | Interaction | Playful startups, portfolios | Low-end mobile devices (performance) |
| 07 | Receipt | OBJ | Object metaphor | Restaurants, cafés, retail, e-commerce confirmations | Corporate B2B |
| 08 | Dithered Brutalist | TYPO + ILLUS | Art treatment | Fashion, culture magazines, galleries, music | Friendly consumer apps |
| 09 | Paint-Drip / Goo | ILLUS | Page-fit (organic edge) | Food, drinks, kids' brands, ice cream, candy | Finance, legal |
| 10 | Postcard | OBJ | Object metaphor | Travel, hospitality, local shops | Dense sitemaps |
| 11 | Map | PHOTO/ILLUS | Components (location) | Physical venues, clinics, restaurants, co-working | Online-only products |
| 12 | Retro OS Desktop | OBJ | Nostalgia | Indie games, portfolios, retro brands | Serious enterprise |
| 13 | Aurora Glass | ILLUS | Material (glass and light) | AI products, fintech launches, Web3 | Print-first brands |
| 14 | Newspaper | TYPO | Editorial grid | Publications, blogs, newsletters, law or heritage brands | Minimal product sites |
| 15 | Folder Tabs | OBJ | Page-fit (stepped edge) | Agencies, archives, research, docs portals | Mobile-first sites (tabs need width) |
| 16 | Video-in-Type | TYPO + PHOTO | Art masked by type | Surf, outdoor and lifestyle brands, film | Bandwidth-sensitive sites (use a poster frame) |
| 17 | Isometric Town | ILLUS | Art as navigation | SaaS with many products, marketplaces, education | Brands that don't use illustration |
| 18 | Retro Sunset CTA | ILLUS + TYPO | Conversion focus | Service businesses, consultancies, launch pages | Info-heavy sites |
| 19 | Sticker-Bomb | OBJ | Collage | Streetwear, coffee, DTC, merch, communities | Premium or luxury |
| 20 | Blueprint | ILLUS | Self-annotating art | Architecture, engineering, hardware, design systems | Soft or emotional brands |
| 21 | Underground | ILLUS | Page-fit (the site is "above ground") | Agritech, climate, gardening, mining, sustainability | Flat corporate sites |
| 22 | 8-bit Game | INTER | Gamified navigation | Gaming, kids' products, playful portfolios | Serious B2B |
| 23 | Neon Sign | PHOTO + TYPO | Light as art | Bars, nightlife, music venues, late-night food | Daytime or wellness brands |
| 24 | Swiss Mega-Sitemap | STRUCT + TYPO | Density done well | Enterprise, e-commerce, government, universities | Small sites with 6 links |
| 25 | Spotlight Reveal | INTER | Discovery / easter egg | Portfolios, mystery launches, promo codes | Touch-only audiences (needs a tap fallback) |
| 26 | Papercraft Layers | ILLUS | Depth | Kids, education, eco, ocean and travel | Dark tech brands |
| 27 | Chat Thread | STRUCT (UI) | Components as dialogue | AI assistants, support-led SaaS, messaging apps | Legal links needing prominence |
| 28 | Split-Flap Board | OBJ | Data-table metaphor | Travel, logistics, transit, events with schedules | Brands needing a soft tone |
| 29 | Elevator Panel | OBJ | Floors as the site map | Real estate, hotels, architecture, "levels" products | Sites with more than 8 top-level sections |
| 30 | Behind-the-Subject Type | PHOTO + TYPO | Depth layering | Outdoor, adventure, fashion campaigns, travel | Brands without strong photography |

**How the 30 map back to your references and the sources:**
- Silhouette → 09 (goo edge), 21 (grass horizon), 26 (paper waves): the same page-fit idea with different materials.
- Large-type / Negative → 16 (masked type), 24 (giant index number), 25 (hidden type), 30 (subject over type).
- Grounded / Meridian / Zuno / answerr → 11, 17, 21, 30: art as a horizon or ground.
- Qode's reveal and double footer → 02.
- Webflow's micro-game → 06, 22, 25.
- Colorlib's hours, maps and coupons → 07, 11, 19, 23.
- Eleken and NN/g status and region patterns → 04, 24, 27.

---

## 7. Scenario playbook

**Pick by what the business needs the footer to do:**

| Goal | Top picks | Why |
|---|---|---|
| **Convert** (sign-ups, bookings, demos) | 18 Sunset CTA, 02 Curtain Reveal, 27 Chat Thread | One dominant action. Mirrors Bevel's "Ready When You Are" ([Webflow](https://webflow.com/blog/website-footer-design-examples)) |
| **Navigate a huge site** | 24 Swiss Mega-Sitemap, 04 Bento, 14 Newspaper | Density with a clear hierarchy, as Stripe does with 50+ links ([Colorlib](https://colorlib.com/wp/website-footer-examples/)) |
| **Build brand memory** | 30, 16, 08, 03, plus your Negative and Large-type | The wordmark is the art |
| **Drive foot traffic** | 11 Map, 23 Neon, 07 Receipt, 10 Postcard | Hours, address and directions come first ([Colorlib](https://colorlib.com/wp/website-footer-examples/)) |
| **Build trust** | 04 Bento (status tile), 20 Blueprint, 14 Newspaper | Status, credentials and serious type. NN/g recommends testimonials and awards for lesser-known brands ([NN/g](https://www.nngroup.com/articles/footers/)) |
| **Delight and surprise** | 06, 22, 25, 12, 19 | Emotional design and easter eggs ([UX Knowledge Base](https://uxknowledgebase.com/footer-design-best-practices-inspiration-f81cc5431388)) |
| **Global commerce** | 24 plus region and currency selectors | Gymshark pattern ([Colorlib](https://colorlib.com/wp/website-footer-examples/)); region-aware footers ([Eleken](https://www.eleken.co/blog-posts/footer-ux)) |
| **Infinite-scroll feeds** | Sticky mini-footer or a corner reveal, not any of the 30 | Users can't reach a normal footer on an endless feed ([NN/g](https://www.nngroup.com/articles/footers/), [UX Knowledge Base](https://uxknowledgebase.com/footer-design-best-practices-inspiration-f81cc5431388)) |

**Pick by site type:**

| Site type | Primary | Alternate | Why |
|---|---|---|---|
| Dev tool / API | 05 Terminal | 04 Bento | Speaks the audience's native interface |
| B2B SaaS | 04 Bento | 27 Chat, 17 Isometric | Status, product breadth, support |
| AI product | 13 Aurora Glass | 27 Chat | Conveys a futuristic feel plus a conversational interface |
| Agency / studio | 02 Curtain Reveal | 03 Marquee, 25 Spotlight | Big email, big personality |
| Portfolio | 06 Physics | 12 Retro OS, 22 8-bit | Memorable, shows off craft |
| Fashion / culture | 08 Dithered | 30 Behind-subject, Negative | Editorial edge |
| Outdoor / sport | 30 Behind-subject | Grounded, 16 Video-in-type | Landscape does the talking |
| Restaurant / café | 07 Receipt | 11 Map, 09 Goo | Hours, location, appetite |
| Bar / nightlife | 23 Neon | 25 Spotlight | Mood |
| Travel / hospitality | 10 Postcard | 28 Split-Flap, 29 Elevator | Travel metaphors |
| Architecture / real estate | 20 Blueprint | 29 Elevator, answerr-style engraving | Built-environment language |
| Climate / agri | 21 Underground | 26 Papercraft, Silhouette | Nature as structure |
| Publication / blog | 14 Newspaper | Meridian engraving | Editorial trust |
| Kids / education | 26 Papercraft | 17 Isometric, 22 8-bit | Friendly depth and play |
| Enterprise / government / university | 24 Swiss | Doormat classic | Findability over flair |
| DTC / streetwear | 19 Sticker-Bomb | 03 Marquee | Energy, merch culture |
| Heritage / luxury | Meridian / answerr engraving | 14 Newspaper | Craft and restraint |

**Pick by constraint:**
- **No illustrator or photos:** 02, 03, 04, 05, 14, 24, 27, 28 (all CSS or type).
- **Strong photography:** 30, 16, grounded, 23.
- **Need seasonal or campaign swaps:** the Meridian-style fixed layout with swappable art. Change the art, keep the grid.
- **Performance budget is tight:** avoid 06 (physics), 13 (backdrop blur over animated blobs) and 16 (video). Use static fallbacks.
- **Accessibility-first:** avoid 25 and 01 as the only navigation, and always include a plain link list.

---

## 8. Implementation recipes

**Curtain reveal (02).** A wrapper with `position:relative; height:H; clip-path: polygon(0 0,100% 0,100% 100%,0 100%)`, and inside it `position:fixed; bottom:0; height:H`. The sticky variant is a `calc(100vh + H)` container offset `-100vh` with a `sticky top: calc(100vh - H)` child. The trade-off is that you need a fixed footer height ([Olivier Larose](https://blog.olivierlarose.com/tutorials/sticky-footer)).

**Silhouette / shaped edge (Cycleon, 09, 21, 26).** Put an SVG `<path>` at the footer's top with `fill` = the footer colour and `margin-bottom:-1px` to kill the hairline seam. For waves, stack several paths with `drop-shadow` on each for the papercraft depth.

**Negative / knocked-out type (brün).** Two options:
(a) Set the letters in the footer's own background colour and position them across the boundary, so they cover the dark block above.
(b) An SVG `<mask>` with the text, over a two-colour background.
Add `aria-hidden` to the decorative wordmark and keep the real brand name in the text.

**Type as a window (16).** Use `background: url(...) center/cover; -webkit-background-clip:text; color:transparent`. For video, use an SVG mask over a `<video>` element ([O'Reilly](https://oreillymedia.github.io/Using_SVG/extras/ch15-video-mask.html)).

**Subject over type (30).** Three layers: background photo, then the text, then a cut-out PNG of the subject with a transparent background. Line all three up at the same scale.

**Physics pile (06).** Matter.js bodies synced to DOM elements on each animation frame, with a mouse constraint for dragging ([YouTube tutorial](https://www.youtube.com/watch?v=4mjOyqL-XbM), [Fancy Components](https://www.fancycomponents.dev/docs/components/physics/gravity)). Start the drop when the footer scrolls into view (IntersectionObserver). If the user has reduced motion enabled, show a static pile instead.

**Art-as-horizon (Meridian, Zuno, answerr, Grounded).** The image is `position:absolute; bottom:0; width:100%`. Match the page background to the image's top colour exactly, or fade it with `mask-image: linear-gradient(to bottom, transparent, #000 30%)`. Keep all text in the image's negative space. answerr's trick is to centre the subject in the gap between the brand and the columns.

**Halftone / dither (Zuno, 08).** Generate or process the image offline (ordered dithering or Floyd–Steinberg), or fake a halftone with a `radial-gradient` dot overlay and `mix-blend-mode: multiply`.

**Gooey edge (09).** An SVG filter: `feGaussianBlur stdDeviation=10` → `feColorMatrix` alpha `0 0 0 20 -8` applied to a group of circles plus a rect.

**Spotlight (25).** `mask-image: radial-gradient(circle 180px at var(--x) var(--y), #000 0 60%, transparent 100%)`, with `--x`/`--y` updated on pointermove. On touch devices, have a tap place the spotlight.

**Rotating badge (03).** Text on an SVG `<textPath>` around a circle, with `animation: spin 12s linear infinite`.

**Glass (13).** `backdrop-filter: blur(24px); background: rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.15)`. Check the performance on mobile.

---

## 9. Guardrails (apply to every style)

- **Keep a real list of links.** Every metaphor (stars, buildings, floors, "?" blocks) must use actual `<a>` elements in a `<nav aria-label="Footer">`, reachable by keyboard in a logical order.
- **Decorative art gets `aria-hidden="true"` or empty alt text.** Meaningful art gets real alt text.
- **Motion** (marquees, physics, flicker, twinkle) must respect `prefers-reduced-motion`, and a marquee needs a pause control.
- **Contrast.** Text over photos or illustration needs a scrim (see 30) or has to sit in a flat negative-space area.
- **Mobile.** Wide metaphors (the 28 board, 15 tabs, 17 island) need a stacked fallback. Keep the art and collapse the columns into an accordion.
- **Performance.** Lazy-load footer media; the footer is always below the fold. Use a poster image for video.
- **Legal and consent.** Privacy, terms and cookie preferences stay visible and plain-text in every style ([Eleken](https://www.eleken.co/blog-posts/footer-ux)).
- **Don't create a false bottom.** If the section above looks like an ending, users may stop before reaching the footer ([UX Knowledge Base](https://uxknowledgebase.com/footer-design-best-practices-inspiration-f81cc5431388)).

---

## 10. Data limitations

| Item | Issue | Fallback |
|---|---|---|
| footer.design individual entries | The pages rendered only the navigation and category names in my crawler | Used the category names only; example analysis came from the other sources |
| Awwwards gallery entries | The collection pages returned intro text, not per-site breakdowns | Used the entry titles found in search (interactive typographic, mini-game, Halston) |
| Muzli "100 unique footers" and Unsection | Pages returned no usable content | Excluded |
| Dribbble and Pinterest | Not crawled (image-heavy, login walls) | Not used |
| Source dates | Awwwards creative footers: Aug 2021. UX Knowledge Base: Feb 2025. Eleken: 2026. Colorlib: "2026" edition. Others undated | Treat older example sites as possibly redesigned since |
| Your references | Instagram carousel by @zachex plus 4 unattributed illustrated footers | Analysed visually; sources not verified |
| Scenario mappings (section 7) and the "best for / avoid when" columns | My design judgement, not research findings | Validate with your own audience or a scroll heatmap, as [UX Knowledge Base](https://uxknowledgebase.com/footer-design-best-practices-inspiration-f81cc5431388) suggests |

---

## 11. Source index

- footer.design: https://www.footer.design/ · https://www.footer.design/styles/bento-box · https://www.footer.design/styles/animated · https://www.footer.design/styles/gradient
- Awwwards: https://www.awwwards.com/websites/footer-design/ · https://www.awwwards.com/15-excellent-creative-website-footers.html · https://www.awwwards.com/inspiration/interactive-typographic-footer-offform · https://www.awwwards.com/inspiration/interactive-footer-0110-studio-portfolio-web
- Qode Interactive: https://qodeinteractive.com/magazine/examples-of-innovative-footer-design/
- Webflow: https://webflow.com/blog/website-footer-design-examples
- Colorlib: https://colorlib.com/wp/website-footer-examples/
- Really Good Designs: https://reallygooddesigns.com/website-footer-examples/
- Nielsen Norman Group: https://www.nngroup.com/articles/footers/
- Eleken: https://www.eleken.co/blog-posts/footer-ux
- UX Knowledge Base: https://uxknowledgebase.com/footer-design-best-practices-inspiration-f81cc5431388
- Olivier Larose (sticky footer): https://blog.olivierlarose.com/tutorials/sticky-footer
- Matter.js footer tutorial: https://www.youtube.com/watch?v=4mjOyqL-XbM
- Fancy Components Gravity: https://www.fancycomponents.dev/docs/components/physics/gravity
- O'Reilly SVG video mask: https://oreillymedia.github.io/Using_SVG/extras/ch15-video-mask.html
