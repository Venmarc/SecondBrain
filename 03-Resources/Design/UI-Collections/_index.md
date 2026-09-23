---
title: UI Collections — Four libraries, four jobs
date: 2026-09-21
tags:
  - design
  - inspiration
  - components
  - motion
  - ui-ux
aliases:
  - UI Collections
  - Rare UI
  - Obsidian UI
  - Transitions.dev
  - Design Spells
---

> **One-line Summary**: Labels, jobs, and component lists for [Rare UI](https://www.rareui.com/), [Obsidian UI](https://www.obsidianui.dev/), [Transitions.dev](https://transitions.dev/), and [Design Spells](https://www.designspells.com/) — pick the right site by what you need, then extract or rebuild. Locator page: [demos/ui-collection/index.html](demos/ui-collection/index.html).

Four sites keep showing up in the same posts. They are not the same kit. Use this note to pick one by job, then look at the list below to see if the piece already exists there.

Standing taste for any rebuild: lots of whitespace. One object on the stage. Short copy. A keep is done when the rebuild matches what you saw, or is better. Workflow: [[03-Resources/Skills/Reverse-Engineering-UI-Components|Reverse-Engineering UI Components]] → [[03-Resources/Tools/Effects_Playbook|Effects Playbook]] → [[03-Resources/Tools/Effects_Glossary|Effects Glossary]] → [[03-Resources/Tools/Effects_Build_Playbook|Effects Build Playbook]] → Pastries `~/Pastries/rep-ui-collection/`.

Locator page (first pass, not a clone of the four libraries): [demos/ui-collection/index.html](demos/ui-collection/index.html). Same file lives in `~/Pastries/rep-ui-collection/`.

---

## Labels (say these when you want a site)

**[Rare UI](https://www.rareui.com/)** — this is a site for folders, orbs, gooey sidebars, OTP fields, counters, duration pickers, and basically every unusual widget you drop into a product or a portfolio. It focuses on the object itself (the one thing on the screen), not the whole page. Install with `npx shadcn@latest add swamimalode07/rare-ui/<name>`. One file per component. Motion library is Motion. ~20 unique pieces.

**[Obsidian UI](https://www.obsidianui.dev/)** — this is a site for scroll effects, cursor trails, text reveals, galleries, WebGL backgrounds, and basically every motion piece that covers a full page. It focuses on scroll, cursor, and text parts of a site. 40 published show pieces plus a shadcn-style registry of primitives. Install with `npx shadcn@latest add "https://www.obsidianui.dev/r/<name>.json"`. You own the source after it lands.

**[Transitions.dev](https://transitions.dev/)** — this is a site for accordion open/close, modals, toasts, tab pills, dropdown morphs, and basically every named move between two states. It focuses on how a control opens, closes, and swaps, not on new widgets. CSS and React snippets. Closest match for a FAQ accordion: **Accordion — grid-rows height with chevron morph**. No Framer Motion required for that one.

**[Design Spells](https://www.designspells.com/)** — this is a site for real-app micro-details (Arc, Slack, Airbnb, Figma, WhatsApp), easter eggs, and basically every tiny moment that feels expensive. It focuses on inspiration from live products. Filter by tag (interaction, easter egg, button, skeuomorphic) or by app.

---

## How they differ

| Need | Go here |
|---|---|
| A single unusual widget to drop in | [Rare UI](https://www.rareui.com/) |
| Page-level motion, cursor, scroll, text, WebGL | [Obsidian UI](https://www.obsidianui.dev/) |
| How an existing control opens, closes, or swaps | [Transitions.dev](https://transitions.dev/) |
| A tiny moment from a real app, not a kit | [Design Spells](https://www.designspells.com/) |

Rare UI and Obsidian UI both ship React you can add. Rare UI is a short list of hero objects. Obsidian UI is a large catalogue plus primitives.

Transitions.dev does not replace those two. It names the motion between states (accordion height, modal scale, tab pill). You already have the control. You want the move.

Design Spells is a different object. Each spell is a clip of a moment inside a shipping product. The site stores the video or GIF and the attribution. The interaction itself still lives in Arc, Slack, WhatsApp, and the rest. There is no registry JSON, no `shadcn add`, and no source file on the site.

**Workaround for Design Spells:** treat the clip as an extract source. Write Literal / Technique / Cost in the [[03-Resources/Tools/Effects_Glossary|Effects Glossary]]. If the product is a public web app, inspect it. If it is a native app, rebuild from the clip. Build the piece in Pastries with the [[03-Resources/Tools/Effects_Build_Playbook|Effects Build Playbook]]. The clip is the brief. The rebuild is the asset.

---

## [Rare UI](https://www.rareui.com/) — components seen

Source: [rareui.com/components](https://www.rareui.com/components). Some names sit in two groups.

**Display**
- Folder component
- Code Block
- Gravity Letters
- GitHub activity
- Step player
- Animated counter

**AI kit**
- Fluid Orb
- Grid Reveal
- Matrix orb

**Navigation**
- Bounce sidebar
- Hook Sidebar
- Proximity Sidebar
- Scroll Progress
- Gooey nav

**Inputs**
- Duration Picker
- OTP Input
- Delete button
- Task list

**Feedback**
- Emoji reaction
- Notification bell

**New releases (also listed above)**
- Task list
- Matrix orb
- Animated counter

---

## [Obsidian UI](https://www.obsidianui.dev/) — components seen

Source: [obsidianui.dev/llms.txt](https://www.obsidianui.dev/llms.txt). 40 published show pieces. The registry also has supporting primitives.

**Published show pieces**
- Arrow Fill Button
- Folder Preview
- Hover Image
- Masonry Grid
- Pixelated Carousel
- Apple Spotlight
- Circle Menu
- Magnet Tabs
- Split Showcase
- Trading Card
- Jelly Loader
- OTP Input
- Flip Text
- Rectangular Text Reveal
- Text Fill Animation
- Text Stream
- Draggable Marquee
- Flip Scroll
- Flow Scroll
- Glowing Scroll Indicator
- Horizontal Scroll
- Marquee on SVG Path
- Parallax Gallery
- Scroll Effect
- Scroll Stack
- SVG Pixel Reveal
- Butterfly Trail Cursor
- Colorful Cursor Aura
- Interactive Arrows
- Magnetic Image Trail
- Mask Cursor Effect
- Rope Cursor
- Dither Canvas
- Dotted Grid
- Book Flip
- Curved Plane
- Fractal Glass
- Grid Lift
- Hover Slider
- Interactive Blur Reveal
- Art Gallery

**Supporting registry (primitives and blocks)**
alert, avatar, badge, breadcrumb, button, button-group, calendar, card, carousel, chart, checkbox, click-spark, collapsible, command, context-menu, dialog, drawer, dropdown-menu, empty, field, file-input, footer, form, hover-card, input, input-group, input-otp, interactive-hover-button, item, kbd, label, liquid-metal, menubar, navigation-menu, pagination, playground-button, playground-navbar, popover, progress, radio-group, raised-button, resizable, ripple-pulse-loader, scroll-area, select, separator, sheet, sidebar, sidebar-stackbits, skeleton, skeumorphic-music-card, slider, smooth-scroll, sonner, spinner, switch, table, tabs, textarea, toggle, toggle-group, tooltip, visitor-count

Magnet Tabs is a sliding pill on a tab bar. Collapsible is the primitive for expand/collapse. Neither is a FAQ accordion with height animation. For that, use Transitions.dev Accordion.

---

## [Transitions.dev](https://transitions.dev/) — components seen

Source: [transitions.dev](https://transitions.dev/). Named transitions, not a widget kit.

- Accordion — grid-rows height with chevron morph
- Card resize
- Number pop-in — digit flip with blur and stagger
- Notification badge — diagonal slide with spring pop-in
- Text states swap — text swap with blur
- Menu dropdown — origin-aware open / close
- Confetti burst
- Modal open/close — scale
- Panel reveal — panel open / close
- Gooey plus menu — liquid split into a fan of actions
- Page side-by-side — forward / back page transition
- Icon swap — scale and blur
- Success check — blur and rotate
- Avatar group hover — distance-falloff lift
- Card stack hover — stack fans out
- Error state shake
- Input clear with dissolve
- Skeleton loader and reveal
- Texts reveal — two lines rise with offset stagger
- Tabs sliding — pill indicator follows the active tab
- Drag & drop with physics
- Shimmer text
- Organic shimmer
- Tooltip open/close
- 3D tilt — pointer tilt with cursor glare
- Dropdown menu morph — button morphs into a menu surface
- Toast open/close
- Like button — heart fills and bursts particles
- Image open tilt
- Learn more hover — chevron shifts and opens
- Checkbox check — stroke path
- Spinner to check morph
- Spinning counter
- Toggle — thumb slides with a double bounce
- Pro gradient text
- Delete with smoky dissolve
- Thinking states
- Reasoning stream
- Streaming text
- Matrix dot loader
- Banner stacking
- Image generation placeholder
- Get Pro button

FAQ ask: “FAQ accordion, CSS grid-rows, chevron, no Framer, lots of whitespace.” That is the Accordion item.

---

## [Design Spells](https://www.designspells.com/) — spells seen

The gallery is larger than this list. These are the spells in view during the 2026-09-21 pass. Each line is app + moment, not a file you add.

- 001 Arc — icon animation
- 004 Read.cv — particle effects when following someone
- 008 Slack — friendly indicator when over-scrolling a channel
- 009 Figma — FigJam music player as an interactive turntable
- 010 Airbnb — animated isometric illustrations in filters
- 016 iOS — airplane flies away when turning off Airplane Mode
- 017 WhatsApp — mic gets tossed in the bin when cancelling a voice recording
- 043 Google — hidden pinball game in the Google app
- 052 Vercel — mini animation that nudges a favorite on a project
- 080 Airbnb — length of stay duration slider
- 081 Amie — animation when changing the app icon
- 082 Chrome — tab counter turns into a smiley after 99 tabs
- 086 Instagram — tapping an emoji in chat toggles Pong against the Dynamic Island
- 103 Arc — file gets tossed into the Library on download
- 108 Slack — random messages pop out of the Dynamic Island on pull-down
- 125 Figma — toolbar animation when toggling design and dev mode
- 129 Opal — tap to crack open unlocked gems
- 139 Airbnb — animation when toggling travelling and hosting
- 156 Google — chess-themed confetti on a World Chess Championship search
- 204 GitHub — tapping the version number three times starts a Flappy Bird minigame
- 303 Discord — Godzilla appears if you tap Home enough times
- 308 Threads — animation when revealing spoiler content
- 311 Perplexity — keyboard shortcut tutorial in onboarding

Browse live with tags on [designspells.com](https://www.designspells.com/). Newsletter archive: [designspells.com/newsletter](https://www.designspells.com/newsletter).

---

## Locator page

The HTML snapshot is [demos/ui-collection/index.html](demos/ui-collection/index.html). Open it in a browser. It is a quiet page with four stages (folder, orb, spell card, motion bars) and a lot of empty space. It is a map, not a clone.

Live copy: `~/Pastries/rep-ui-collection/`. Glossary status for those objects stays short of `tried` until a Lighthouse 95+ pass and a feel check.

Related collections: [[03-Resources/Design/Web-Garnish/_index|Web design garnish]] · [[03-Resources/Design/Backdrop-Supply/_index|Backdrop Supply]] · [[03-Resources/MOC-UI-UX-Lessons|MOC: UI/UX Lessons]] · [[03-Resources/Design/Unique Direction|Unique Direction]] · [[03-Resources/Skills/Frontend-Awesomeness|Frontend Awesomeness]]

**Tags:** #design #inspiration #components #motion #ui-ux
