# Overnight review: Jeremi, Mario X, LinkedIn

> One-line: Jeremi is a private posting almanac, not an auto-poster. It can hold the 31 Aug plan as a ledger. It cannot (by spec) pull Apple Notes or publish to X or LinkedIn.

Date: 2026-09-03 overnight WAT
Authors: Bossman with Next Steps. Sources named below.

## 1. Jeremi

Live: https://jeremi-cm.vercel.app
Repo: private Venmarc/jeremi, Next.js TypeScript. Created 2026-08-31. Last push 2026-09-02. Not cloned this pass.

Visitor sees: Clerk sign-in (Google or email), Sign up, Development mode. Login wall. No public feed.

README: content-calendar PWA (heatmap, kanban, calendar, composer, projects, PWA).
SPEC.md v1 Almanac is the rebuild source of truth. Day is the atom. Ideas plus posted entries. Green-dot heatmap.
SPEC is NOT an AI copywriter (Hermes drafts in chat). NOT a social API scheduler (Victor posts manually; Jeremi tracks).

Auth routes in repo: dashboard, board, calendar, journal, activity, settings.
package.json: Next 16, Clerk, Supabase, Serwist, TanStack Query, Zustand. No X, LinkedIn, or Apple Notes packages.

Hermes in SPEC: server service-role writes, Activity feed, Telegram/chat, not in-app chat. WebMCP is not in SPEC.md.

## 2. Could Jeremi serve the 31 Aug-1 Sep content system?

Plan (Clarity ramble): curate notes from last week and this week into X and maybe LinkedIn; wire Hermes, maybe WebMCP.

Verdict: **No as the full pipeline. Yes as the ledger after a human or Hermes-in-chat already drafted and posted.**

Would have to be true for a yes:
1. Almanac is usable in production, not Clerk Development mode as a daily habit.
2. Capture is faster than Apple Notes. SPEC is in-app Quick Capture, not Notes ingest. Notes would be paste, share-sheet, or Hermes typing them in.
3. Hermes as specified (service-role plus Activity), or a later WebMCP bridge. WebMCP is ramble, not spec.
4. X/LinkedIn stay manual (or Hermes posts outside the app). Jeremi logs URL/platform after. That can still serve Content-Creation weekly minimum (2 X + 1 LinkedIn, ship in 48h) if he opens the almanac.
5. Weekly review from Better-Me-Better-Vault still happens. Jeremi does not pick or kill ideas.

## 3. Mario X

Handle from his portfolio and GitHub twitter_username: https://x.com/mario_d3v (@mario_d3v).
X API from both connected Grok X accounts (default and mario-main) is Pay-per-use blocked. Counts below are from Next Steps live page check, not the API.

Victor Mario. Joined Dec 2023. 97 posts, 46 following, 7 followers, not verified, no bio link.
Bio: AI-driven developer.
Pinned: Jul 16 joke about GTA VI and Kimi K3 tokens.
Recent Aug 2026 posts: AI-tool promo, Grok launch, round-table agents, agent-memory vault. Views about 3 to 26. No HALDEN or fashion posts.

## 4. Linux account

Original ramble listed Jeremi, X, and linux account as three things, and LinkedIn as a posting destination. Do not infer from that wording alone.
Next Steps recorded 2026-09-03: Emmanuel confirmed linux account = LinkedIn.
Published URL in his own portfolio Contact.tsx and GitHub README: https://www.linkedin.com/in/venmarc/
Signed-in Chrome walk of https://www.linkedin.com/in/venmarc/ (Next Steps, 2026-09-03 ~02:50 WAT): profile is live. Lookalikes emma-en and victor-mario-220a9171 are not his published URL. Not used.

## 5. Recruiter or client skip-test (public only)

If hiring or buying from the public surface, skip triggers:
- GitHub Venmarc: 1 follower, ~34 public repos mixing games (Number-G-G) with product repos. HALDEN and Jeremi are not the first impression.
- Mario X: 7 followers, joke pin, AI-tool posts, near-zero engagement. Looks like a student feed, not a ship log.
- LinkedIn /in/venmarc: live. No About, no Featured, no GitHub/HALDEN/LiveTrack. One post (~5 months old) burying https://venmarc.vercel.app. #OPENTOWORK on an otherwise empty profile. Skills have no React/TS/Node. Recruiter search for “full stack” will miss him.
- jeremi-cm.vercel.app: Clerk Development mode login wall. Looks unfinished.
- Portfolio (venmarcstudio.xyz / mario-dev-portfolio): AI-augmented generic framing. HALDEN live URL not listed there as of this review.
- Several listed products still say in development (Momentum, Ledger).

What vault and projects could fix that, without inventing a new persona:
- HALDEN live https://halden-513.pages.dev — strongest unique shipped craft. Put it on GitHub profile, X, LinkedIn, portfolio before more AI posts.
- Live products he already lists: Tempire tempire.xyz, Momentum peakmomentum.vercel.app, Ledger ledgerix.vercel.app, GridCast gridcastlive.vercel.app.
- Jeremi Almanac spec: product taste (what it is NOT) is rare. Keep private; talk about the discipline (heatmap of posted days) in public, not the login wall.
- SecondBrain Content-Creation and Better-Me-Better-Vault: weekly 2 X + 1 LinkedIn, ship in 48h. The system already exists on paper.
- Honest working style from the vault: supervisor plus one worker, not a swarm. Recruiter-safe if he shows shipped URLs instead of agent diagrams.
- GitHub Venmarc/halden commit fe070c7 on main. One pinned repo that is a lookbook beats 34 unpinned toys.

## Sources

- Live: jeremi-cm.vercel.app, halden-513.pages.dev
- GitHub API via laptop gh: Venmarc/jeremi (private, no clone), Venmarc public profile, Venmarc/halden
- Clarity ramble 2026-09-03; Next Steps memory log 2026-09-03 (linux=LinkedIn confirmation; Mario X counts)
- His portfolio Contact.tsx / README for published URLs
- SPEC.md and package.json from jeremi via gh api (no clone)
- X API: both connected accounts forbidden without Pay-per-use (not used as a source of counts)

Parked: HALDEN footer desktop polish until morning. Not started this pass.

## 6. Signed-in Jeremi walk (Next Steps)

Walked https://jeremi-cm.vercel.app as Victor Mario (Clerk session already live). Account is empty: 0 entries, 0 ideas, 0 posted, 0 Hermes entries.

Screens that exist and work as empty shells: /dashboard, /board, /calendar (Sept 2026, backdating allowed), /journal, /activity, /settings, plus ⌘K Quick capture.

Composer is only Quick capture: text, KIND Idea/Posted, day stepper, optional topic, Save. No platform picker, scheduling, or AI draft.

404: /notes, /inbox, /compose, /composer, /connections, /integrations, /hermes, /mcp, /webmcp, /api/mcp, /apple-notes, /x, /linkedin.

Settings, verbatim: "No social networks are connected. Jeremi tracks what you post manually; direct platform integrations are future work."
Activity empty state: "Hermes hasn't touched anything yet." No Hermes connect UI. Themes and delete-everything are stubbed.

Verdict holds: cannot curate Apple Notes into posts. Manual Idea → Posted ledger only.

## 7. Signed-in LinkedIn walk (Next Steps)

https://www.linkedin.com/in/venmarc — Victor Mario, Umuahia, Abia State. Headline: Full Stack Developer @ Pixel Creative Agency | Web Development, Web Design, and Graphic Design. 192 connections, 213 followers. Open to work (Nigeria, on-site/hybrid/remote, visible to everyone). Unverified.

No About. No Featured. No projects/media.
Experience: Full Stack Developer, Pixel Creative Firm (Freelance, Feb 2022–present) and Fashion Design Apprentice, Danny Stitches (Aug 2023–Aug 2024). Both have skill tags only, no bullets.
Skills: Web Development, Web Design, Logo Design, Graphic Design, Teamwork, Rapid Learning, Problem Solving, Account Management, Research Skills, English. No frameworks.
Activity: one post, ~5 months old, 4 reactions / 2 comments / 101 impressions, links venmarc.vercel.app. Headline says Agency; company entry says Firm.

## 8. Signed-in Mario X walk (Next Steps)

https://x.com/mario_d3v — session is this account. 97 posts, 46 following, 7 followers. No website field.
Pinned Jul 16: GTA VI + Kimi K3 tokens joke (~1K views).
Originals are thin (~11). Substance: Aug 11 four-part round-table thread (promised open-source repo never appeared on the timeline); Aug 4 vault/graph reflection; Jul 16 Vercel subdomain TIL; Mar 8 intro with venmarc.vercel.app; Aug 20 Google student-AI promo. Engagement on originals typically 3–40 views, 0 likes. Higher views (hundreds–1.3K) are replies under bigger accounts. No HALDEN posts.

## 9. What would make a client/recruiter skip (combined)

Skip:
- LinkedIn empty (no About, no proof, no tech keywords, dead activity) while Open to Work is on.
- X: 7 followers, joke pin, no link in bio, HALDEN not posted, round-table repo promised and not shipped on the timeline.
- Jeremi live URL is a Clerk login wall.
- GitHub mix of toys and products; HALDEN not pinned; portfolio (venmarcstudio.xyz / venmarc.vercel.app) does not yet lead with HALDEN.

Fix from work that already exists:
- Put https://halden-513.pages.dev on LinkedIn Featured, X bio, GitHub pin, and the studio site.
- Pin GitHub Venmarc/halden.
- Replace the X pin with the round-table thread or HALDEN, and drop the student-promo posts from the first screen.
- One LinkedIn About of shipped URLs (HALDEN, LiveTrack, Ledger, Momentum, Tempire) plus actual stack.
- Use Jeremi only as the private heatmap after posting, not as the public content system. Weekly 2 X + 1 LinkedIn already written in [[02-Areas/Content-Creation/Content-Creation]].
