---
title: Security checklist for launching projects
source: https://claude.ai/chat/129e7131-22ae-4cdd-b3bb-a4fce4a281a9
author:
published:
created: 2026-06-27
description: |-
  Below are my prompts and Claude's responses after thinking about them. The prior thoughts are in the [[Prompts and Thoughts]] file. The web clipper couldn't extract the wrapped thoughts,along with the responses, leading to two different files, with a connecting prompt.
  The chat starts as a security checklist and diverges into a knowledge-extraction system that hasn't been fully thought of.
tags:
  - clippings
---
## You said: my vault is far better now than it was 3 weeks ago.

my vault is far better now that it was 3 weeks ago. I want to know if u can read X and Reddit articles. u know i'm a an AI-Augmented Developer, and sometimes i don't make security my priority when building projects. Here's an X article detailing a security checklist before I launch, so I don't get sued, or run out of limits, or make make some mistake that bites my behind later.
Here's the X article [Vibe Coders Are Getting Sued. Here's the EXACT 30-Minute Playbook](https://x.com/PrajwalTomar_/status/2059612250047209957?s=20). U just have to pick out the valuable points from the article (The reddit post was deleted)
My vault is connected cos it's where u are gonna store ur analysis. U can read the contents of the vault for more context on how to interact with it, starting from `AGENTS.md` Then paste ur findings or summary in `00-Inbox`.

## Claude responded: Good enough.

Synthesized security vulnerabilities and formatted vault-compliant inbox note

Synthesized security vulnerabilities and formatted vault-compliant inbox note

Good enough. I can't fetch X directly (robots.txt blocks crawlers), but I got the full picture from search results — the snippet from the Tomar article plus a deep cross-reference with the broader 2026 vibe coding security landscape. I have everything I need to write something more useful than the original article anyway. Let me read AGENTS.md once more to make sure I'm writing the note correctly, then drop it in the inbox.

Ran a command, created a file, read a file

Ran a command, created a file, read a file

Drop this file into your `00-Inbox/` folder in the vault. It follows your vault standards — one-line summary, wikilinks, tags, source attribution.

**What I couldn't get:** X robots.txt blocks direct fetching, so the exact article text is inaccessible. What I did instead was cross-reference the article's snippet (exposed Stripe key, zero RLS, no rate limits on paid endpoints, stack traces leaking) against the actual 2026 breach post-mortems — Moltbook, Lovable CVE-2025-48757, the $200 Supabase bill pattern — which are more detailed and actionable than the original X thread anyway.

**The things that should actually worry you about Tempire specifically:**

The download proxy at `/api/download?id=...` has no rate limiting mentioned anywhere in your vault. That's a real exposure — someone can hammer it, rack up Supabase signed URL generation costs, and potentially enumerate purchased products. That's the one item not in your existing `Secure-Downloads-Middleware.md` skill.

The ToS and Privacy Policy gap is the other one. It's been sitting as `#todo/research` in your Skills file since you wrote it. You have a payment flow on a live domain. That's not optional anymore.

Everything else — RLS, service role isolation, download proxying — you've already documented correctly. The risk is the gap between "documented in the vault" and "verified in the actual Supabase project." The note has a grep command and a Supabase Security Advisor step for exactly that reason.

Pre launch security audit

Document · MD 

Download





## You said: Tempire uses mock payments.

Tempire uses mock payments. No stripe or shopify. But, I'll be more careful handling money with this checklist. Now that u can see my vault, any other things u can help me with? Regarding future builds? Lessons? Making my agent be a better questioner than it is rn (this would really help)? I want to make my vault more orderly and fill it up with things that can help me in current and future projects, and making my graph look dope like those on X. Yeah I know I still got a long way to go, but I've learnt things prior to it's creation that'll help populate it rn. U get where my head is at? U can ask questions if u need clarity--that helps too

2:45 PM





## Claude responded: Good, that simplifies the Stripe concern significantly.

Diagnosed vault gaps and architected comprehensive improvement strategy

Diagnosed vault gaps and architected comprehensive improvement strategy

Good, that simplifies the Stripe concern significantly. Now let me be honest with you about what I actually see in your vault.

**The questioner problem is structural, not cosmetic.** Your `vault-librarian.js` asks about the vault — inbox items, orphans, missing docs. That's a maintenance tool, not a knowledge extraction tool. It's asking "what's broken in the filing cabinet" when it should be asking "what do you know that isn't written down yet." Those are completely different jobs and right now you only have the first one.

**Your real goldmine is sitting untouched in `DEV_NOTES.md`.** That Momentum testing session from June 5th alone — where you manually tested every feature and wrote down every UX observation — contains at least 15 lessons that should be permanent atomic skill notes. Right now they're buried in a project file nobody will read again. Examples sitting there unextracted:

- Why browser-native confirmation dialogs break premium app feel (you discovered this testing the delete button)
- The sticky nav / back button UX pattern problem (you described it precisely)
- Sidebar icon highlighting not working on sub-pages — that's a generalizable lesson about active state logic in nested routes
- Skeleton loaders with hardcoded dark colors breaking light mode — that's a systematic pattern every future project will hit
- The RPE logging problem → fitness apps need exercise-type-aware input fields, not one-size-fits-all weight fields

None of these exist as permanent notes. They're all going to get re-discovered.

**The graph looks empty because you have almost no atomic notes.** You have 39 notes total. Most of them are project documents. The vaults that look "dope" on X have hundreds of small, tightly linked concept notes — one idea per note, linked aggressively. Your vault is currently shaped like a project management system, not a knowledge graph. The skeleton is right. The flesh isn't there yet.

Here's the actual formula for the dope graph:

Project docs (what you have) + Atomic lesson notes (what you need) + MOC pages (what connects them) = dense graph

You need MOC pages. Right now `03-Resources` has skill files but no hub pages that pull them together. A `UI/UX-MOC.md` that links to every frontend lesson, prompting insight, and design principle across both projects would instantly create dozens of incoming links to notes that currently have none.

**On fixing the questioner** — here's the shape the questions need to take instead:

The current fallback questions are actually your best questions. The `vault-librarian.js` `candidates` array at score 10 has things like "What is the biggest UI/UX friction in Tempire?" — those are good. The problem is they get pushed to the bottom by mechanical checks (inbox items, missing docs) and only appear when the vault is otherwise clean. Flip the priority. The mechanical checks should run silently in the background. The knowledge extraction questions should be what surfaces to you.

Specifically, the questions that would populate your vault fastest right now are:

"Walk me through one thing you built in \[project\] that worked better than expected. What made it work?" — turns into a technique note.

"What's one pattern you keep seeing across Tempire and Momentum that you haven't written down?" — turns into a cross-project principle note.

"What's the last thing you figured out by trial and error that you wish was documented before you started?" — turns into a lesson note.

"What would you tell yourself if you were starting \[Tempire/Momentum\] from scratch tomorrow?" — turns into an ADR or project retrospective.

These don't belong in `vault-librarian.js`. They belong in a separate interview template that you or an agent runs on demand — distinct from the lint-based system. The lint system finds gaps in structure. This system extracts knowledge from your head.

Before I write you anything concrete — one question: do you want me to start by extracting the Momentum DEV\_NOTES lessons into proper atomic skill notes right now, or would you rather I redesign the questioner first? Both are high leverage but they're different kinds of work, and the DEV\_NOTES extraction is honestly the faster win.





## You said: I want a system that does that extraction of deep rooted lessons, and turns them into atomic notes.

- I want a system that does that extraction of deep rooted lessons, and turns them into atomic notes.
- Don't redesign the questioner. We can make a new one that focuses on knowledge extraction, not vault maintenance.
- I don't want only predetermined question system, but also dynamic ones that makes me feel like "Oh, u sound like u want a better vault than I do".

Rn, let's start with the atomic notes. Then we'll build a better knowledge extraction system. If it's something u can't do remotely (from the repo), u can write a prompt of checklist that i'll use to guide gemini to implement the questioning system. I use this strategy as Gemini, or LLMs in general, tend to stray away or glaze over instructions when a proper process isn't laid down or context gets bloated. So i use a chcklist and ask it to plan before implementing evry single item on the list. This is a fallback for if u can't do it from here.

Show more

3:10 PM





3 / 3

## Claude responded: Let me read through the DEV\_NOTES fully before writing anything so I don't miss a single extractable lesson.

Architected atomic notes extraction and questioner implementation strategy

Architected atomic notes extraction and questioner implementation strategy

Let me read through the DEV\_NOTES fully before writing anything so I don't miss a single extractable lesson.

Catalogued design lessons and prioritized atomic notes for extraction

Catalogued design lessons and prioritized atomic notes for extraction

Good. The vault content was shared inline in the conversation so I have everything. Let me catalog all extractable lessons systematically before writing a single note.

Organized lessons into atomic notes, prioritized by generalizability and impact

Organized lessons into atomic notes, prioritized by generalizability and impact

31 extractable lessons. 3 already documented. 28 to write. Now I'm going to group them ruthlessly — not every lesson deserves its own file. Some cluster naturally. I'll write 10 high-quality atomic notes and one MOC that pulls the whole graph together.

Created 10 files

Created 10 files





## You said: So I’ll just paste those files into my inbox, and have my agent add them to their respective resource folders.

So I’ll just paste those files into my inbox, and have my agent add them to their respective resource folders. Any other thing missing from the dev notes? If not we’ll proceed to the knowledge extraction system. What are your thoughts on how it’s supposed to function? What’s and what is involved? Triggers if any? Automatic? Time based? Session based? And many other things that can come into play. Let’s think it through and devise a plan

9:58 PM





## Claude responded: Good question to ask first.

Architected dynamic knowledge extraction system with triggers, question types, and implementation phases

Architected dynamic knowledge extraction system with triggers, question types, and implementation phases

Good question to ask first. Let me be honest about what's still queued vs what got written.

**Documented properly:** L01, L03-L06, L08-L09, L11, L14-L18 (9 notes)

**Queued in MOC but not written** — these still need notes eventually:

- Sticky nav scroll pattern (L02) — data-heavy pages, headers becoming sticky
- Settings unsaved state detection (L07) — prompt on navigation when dirty
- Back button hierarchy (L10) — sub-pages back to parent, not to Today
- Dashboard feature discoverability (L12) — body composition buried 4 nav steps deep, teaches a lesson about burying important features at the end of the information architecture
- Agent skill activation (L20) — needs its own note, not just a comment in Prompting Masterclass

**Not mentioned at all yet:**

- L22+L24 together — product journey sequencing (ship the core flow before marketing) + optimistic UI as a trust signal. Those two belong in one "Launch Readiness" note.
- L19 — the logo glow container pattern. Minor but it's a real interaction technique worth a note.

So 7 more notes exist in the vault as raw observations. I'd say pass those to Gemini as a second batch after you've placed the first ones. They're smaller scope.

---

Now the extraction system. Let me think this through properly.

---

### The Core Problem to Solve

Your existing `vault-librarian.js` answers: *"What is wrong with the vault's structure?"*

What we need answers: *"What do you know that isn't written down yet?"*

Those are completely different jobs. The first reads files. The second reads your head. That's the whole design challenge — how do you get a script to know what's in your head but not yet in the vault?

The answer is: **you don't scan the vault for what's missing. You scan the vault for evidence of undocumented knowledge.**

---

### The Evidence Model

When you write in a daily note or DEV\_NOTES, you leave linguistic fingerprints of lessons-in-progress. Things like:

- *"I noticed that..."*
- *"Turns out..."*
- *"That's bad because..."*
- *"I wish I knew this earlier..."*
- *"I realized..."*
- *"Hmmm... that's weird"* (your exact words in the heatmap observation)
- *"I dunno yet if..."*

These are lessons that exist in rough form in a daily note or dev file but haven't been distilled into a permanent atomic note. The script scans for these patterns, extracts the surrounding context, and that becomes the seed for a question.

That's what makes questions feel dynamic — they're generated from *your actual words*, not from a fixed template list.

---

### The Architecture: Three Layers

**Layer 1: The Scanner** (`vault-extractor.js`)  
Reads specific file categories looking for evidence:

- `05-Daily/` last 7 days
- `01-Projects/*/Docs/DEV_NOTES.md`
- `Clippings/` — items with no corresponding note in `03-Resources/`
- `03-Resources/MOC-UI-UX-Lessons.md` queued section

For each file, it extracts "candidate passages" — sentences or paragraphs containing lesson-language patterns. Outputs these as structured JSON with source file, surrounding context, and the raw text.

**Layer 2: The Context Builder**  
Takes those candidates and builds a rich prompt that summarises: *"Here is what Victor has written in the last X days that looks like an undocumented lesson. Generate 3-5 targeted questions to extract the knowledge."*

This gets passed to Gemini/Antigravity at session start, not run independently. The LLM does the question generation — the script just feeds it the right material.

**Layer 3: The Question Types**  
The LLM generates from a typed taxonomy, not a flat list:

- **Depth probe** — *"You wrote \[observation\] in DEV\_NOTES. What's the generalizable rule behind it? Would it have applied to Tempire too?"*
- **Queue follow-up** — *"\[Lesson X\] has been queued in your MOC since \[date\]. Walk me through it so we can write the note now."*
- **Pattern recognition** — *"Navigation link bugs appeared in Tempire, unsaved state appeared in Momentum. Is there a general agent instruction that prevents both?"*
- **Synthesis push** — *"You have three separate observations about mobile charts. Are these one note or three? What's the unifying principle?"*
- **Clipping distillation** — *"The 45 Claude Design Skills clipping is unprocessed. What's your actual takeaway — not the article's summary, yours?"*

The aggressive, "I want a better vault than you do" feeling comes specifically from the **depth probe** and **queue follow-up** types — they refuse to accept the surface observation and push for the principle underneath.

---

### Triggers

Here's where I want your input because there are real trade-offs:

**Option A — Session-start trigger (automatic)**  
Every time you open an agent session, the script runs and the agent gets the candidate context as part of its system context. No command needed.

- Pro: frictionless, always happening
- Con: might feel intrusive during a focused build session, slows down the "let's get coding" momentum

**Option B — Post-event trigger (semi-automatic)**  
Triggered by specific events: new clipping appears, daily note exceeds a certain size (like the Momentum DEV\_NOTES being massive), a project phase completes, or you run `/extract` manually.

- Pro: fires when knowledge is freshest, doesn't interrupt focus sessions
- Con: you have to remember to run it, or the script has to detect the events

**Option C — Scheduled + manual (hybrid)**

- Daily: lightweight scan, 2-3 questions max, fires at the *end* of a session (not the start)
- Weekly: deep session Sunday, 5-7 questions, replaces or runs alongside the existing librarian
- Manual: `/extract [topic]` when you want to dump knowledge on a specific thing
- Pro: structured cadence, depth where it matters
- Con: most complex to implement

**My instinct:** Option C, but with a twist. The *end-of-session* trigger is underrated. At the end of a dev session is when you've just built something, just discovered a bug, just solved a problem. That's the highest-density knowledge moment. Start-of-session triggers get stale context. End-of-session triggers get fresh context.

---

### The "Wants A Better Vault Than You Do" Mechanism

This isn't just about question phrasing. It's about follow-up behaviour. The system needs to do two things your current one doesn't:

**1\. Refuse to accept vague answers.** If you say "yeah there was an issue with the tooltip" it should respond with "What specifically caused it? What would you tell your future self?" It keeps drilling until you've said something concrete enough to become a note title.

**2\. Propose the note before you confirm it's needed.** Rather than asking "should we write a note about this?", it says: *"This sounds like `Tooltip-Edge-Overflow.md` — I'll draft it in `03-Resources/Skills/` unless you say stop."* It defaults to creating, not asking for permission to create.

---

### What I Need From You Before We Write the Implementation

Three questions:

One — the trigger model. Does end-of-session feel right, or do you prefer something you invoke manually when you're ready? Your workflow matters here — do you always formally "end" an Antigravity session or do you just close it?

Two — where does the LLM question generation happen? Option A is the script outputs candidates as a prompt that Antigravity reads and generates questions from in-chat. Option B is the script calls the Anthropic API itself and outputs questions directly. Option A is simpler and free. Option B is more autonomous but costs tokens per run.

Three — separate script or extend `vault-librarian.js`? I lean strongly toward a separate `vault-extractor.js` — the two jobs are different enough that mixing them would make both worse. But you know your workflow better than I do.





## You said: I do when I can.

- I do when I can. Back in college, before I came home, we had unstable power, and my pc isn't one to last, 4 hrs avg. So most times, when I see the low battery notifcation, I cancel any running task, and just sleep my pc, and it dies within the next 1-2 hrs if there's no power to continue. When I get back I usually continue from where I stopped. I think right before a session ends works, cos the continuation, right after power is back, is kinda like a session end. I can run the command or script or whatever, and it asks me the questions. It turns from option 1 to 3 and back to 3 and 1 and so on, because the sessions doesn't end unless I end it.
- I don't have an Anthropic API, so option A works best for me. I'd actually like B when I get an Anthropic API, but for now, it's A
- Separate works best. I like `venus-flytrap.js`, cos it catches me for questioning and doesn't let go till it's extracted all the nutrients (knowledge). I'd like a cool name, maybe `extractor.js` works. vault-extractor just seems like it's extracting out of the vault and not from me.

U might be able to come up with a better name tho, or stick with vault-extractor. Build some dope shii

Show more

10:55 PM





## Claude responded: The name is harvest.

Architected knowledge extraction system with aggressive questioning strategy

Architected knowledge extraction system with aggressive questioning strategy

The name is `harvest.js`. You grow knowledge while building — the script comes in after and takes what's ripe. Perfect metaphor for a vault.

Now let me build it. The architecture is clear from our conversation. Let me code it properly.

Reading vault-librarian.js to match code style and patterns before writing harvest.js

Reading vault-librarian.js to match code style and patterns before writing harvest.js



