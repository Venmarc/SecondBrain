> **One-line Summary**: Use one shared work router, six domain routers, and shared tool references so each agent can select a complete route from the same source.

# Shared Router Architecture Draft

**Status:** Design discussion. Runtime files and tools have not been installed or changed.

## Direction supplied by Victor

- Keep `feel-router` under design.
- Name the information route `search-router`; put research and find inside it.
- Cover local files, the web, social sources, article reading, claim verification, and external resources.
- Include testing, mobile and desktop checks, video work, and website interaction.
- Use Jev for decisions and classification, separately from browser session selection.
- Support all agents, including OpenCode, Hermes, Grok, and omnirush.
- Consider the existing shared `.agents` directory as the runtime home.
- Consider Agent-Reach as a social-source integration. It is not installed according to Victor.

## Proposed hierarchy

`work-router` owns the task from its goal to its completion evidence. It selects one lead route and the supporting routes needed.

```text
work-router
├── engineering-router
│   └── planning, implementation, debugging, code review, maintenance
├── design-router
│   └── foundations, forms, navigation, accessibility, feel-router
├── search-router
│   └── find, research, read, verify claims, resources, monitoring
├── test-router
│   └── test selection, TDD, test audit, browser checks, completion evidence
├── media-router
│   └── existing HyperFrames entry point and its workflows
└── interaction-router
    └── live websites, authenticated sessions, browser controls, native apps
```

These are routes through documents and tools. They do not require separate agents or a multi-agent orchestrator.

Create a router only when it adds a real decision. If an existing skill already owns the route, point to it instead. For example, HyperFrames already routes video work. A new media wrapper must add value beyond repeating it.

## Responsibilities and overlaps

| Route | Owns | Uses from elsewhere |
|---|---|---|
| Work | Goal, task scope, phase, current authorization, final evidence | All domain routes |
| Engineering | Code changes and their implementation sequence | Design for UI choices; search for facts; test for proof |
| Design | User experience and visual direction | Search for references; interaction for inspection; test for verification |
| Search | Finding information, reading sources, checking claims, resource provenance | Interaction when information needs a live session |
| Test | Whether the requested result actually works | Interaction for browser/device operations; engineering for repairs |
| Media | Video, audio, captions, composition, rendering | Search for assets; interaction for capture; test for output checks |
| Interaction | How to operate a website or application | Shared browser profiles and native-app controls |

Claim verification belongs to search. Behavior verification belongs to test. A passing classifier result is neither proof that a source is true nor proof that a feature works.

TDD runs during implementation. The test route is not only an end-of-task step.

An approved implementation can continue through its planned checks without asking for approval at every router hop. A new scope, reserved action, or unresolved human decision still needs Victor.

## Search lanes

| Lane | Task | Candidate tools |
|---|---|---|
| Find locally | Locate files, code, notes, prior work | Native Glob/Grep/Read equivalents, repository tools, vault index, healthy memory service |
| Discover on the web | Find URLs and sources | Native search when exposed; Tavily or Firecrawl search when configured |
| Read a known source | Retrieve an article or documentation | First-party Markdown/API, WebFetch, Defuddle, or Firecrawl extraction |
| Research | Answer a question from several sources | Discovery and reading tools; primary-source comparison and a cited synthesis |
| Read social sources | X, Reddit, Instagram, YouTube | Working platform integration or dedicated logged-in browser; Agent-Reach is a candidate |
| Find resources | Images, media, code libraries, reference assets | Image-search skill, official repositories, platform tools |
| Monitor | Track mentions or page changes over time | Firehose; bound duration and scope explicitly |
| Verify claims | Check a factual assertion | Read the source that owns the claim; compare date, scope, and independent evidence |

Choose a tool by capability, access, content completeness, cost, and current health. A search snippet is a discovery lead, not evidence that the article was read.

An explicit request for a tool remains a task requirement. If it is unavailable or cannot meet the goal, report the limitation and the proposed fallback.

Parallel search means independent queries can run together. It does not require subagents. Bound the query set and stop when the evidence target is met.

For resource acquisition, retain the source URL, author or provider, retrieval date, local path, and usage terms when relevant.

## Browser selection has separate dimensions

| Dimension | Choices | Decides |
|---|---|---|
| Session | Fresh isolated context; dedicated persistent logged-in profile | Whether existing account state is needed |
| Visibility | Headed; headless | Whether a window exists |
| Browser | Brave; Playwright Chromium; a project-required engine | Which browser behavior is being exercised |
| Controller | Browser MCP; existing Playwright integration; approved script; CUA | How the agent observes and acts |
| Viewport | Mobile; desktop; other project targets | Which layout and input conditions are checked |

Headed does not mean foreground. A browser can keep its window open while Playwright controls page content in the background. Native dialogs or OS input can require different handling.

Headless browsers can capture screenshots and expose page structure. A headed window is not required merely so an agent can inspect a page visually.

### Proposed profiles

| Profile | Use | Main constraint |
|---|---|---|
| Authenticated research | Existing account feeds, bookmarks, gated content, requested Jev browser work | Reuse the dedicated session and preserve its login state |
| Clean QA | Repeatable public or local website checks | Fresh context, extensions disabled, controlled cache, mobile first |
| Observed interaction | Victor wants to watch, or the task needs a visible browser | Use a visible window with controlled actions |
| Compatibility check | A project needs a specific browser | Select that browser explicitly and record it |

The current machine's default clean-browser policy is Brave. Playwright Chromium can be a deliberate compatibility choice rather than a second unexamined default.

Do not clear the logged-in research profile to satisfy a clean-QA rule. Those are separate sessions. Concurrent work should use owned tabs or isolated contexts instead of navigating the same page.

### Jev browser finding

The inspected `jev-browser.py` launcher starts Chromium with a persistent profile and a local debugging endpoint. It has no headless flag and makes no Jev call.

Therefore, selecting that launcher does not itself select a classifier. Other browser integrations may call Jev, but this launcher does not establish that behavior.

Keep the existing name as a user-facing alias. Resolve the actual need: logged-in session, visible browser, browser control, or typed judgment.

### Jev's separate role

Jev can classify, rank, score, or answer a narrow yes/no question using structured input. Any route may use that capability when it helps.

Do not make a paid or remote classification request for an already clear route. A classification cannot grant permission for an action or replace completion evidence.

## Testing policy

- Use the existing project checks before inventing new scripts.
- Use TDD for meaningful behavior with an independent expected result.
- Use test-audit when authoring or changing tests.
- Use temporary experiments under the approved temporary directory when no permanent test is needed.
- Use browser MCP for live site interaction when available. Explain a script fallback when the task needs one.
- Check mobile first for responsive web work, then desktop. Project usage can add targets or change priorities.
- Treat a mobile viewport as emulation, not a real-device test. It does not prove mobile Safari, virtual keyboard, or device performance behavior.
- Use CUA for native application controls and browser surfaces the page tools cannot operate.
- Verify the relevant outcome before claiming completion; report skipped or unavailable checks.

Victor's mobile-first preference is sufficient to set the default. A global traffic percentage is not required and should not be treated as project analytics.

## Shared runtime home

Proposed layout, reusing existing directories:

```text
~/.agents/
├── skills/
│   ├── work-router/SKILL.md
│   ├── design-router/SKILL.md
│   ├── search-router/SKILL.md
│   ├── test-router/SKILL.md
│   └── other existing or approved routers
├── reference-docs/
│   └── routing/
│       ├── browser-profiles.md
│       ├── tool-capabilities.md
│       └── runtime-adapters.md
├── catalog.json
└── .secrets/
```

Keep `.agents` as a shared tools and skills home. The existing global instructions explicitly prohibit creating an `AGENTS.md` in that directory.

Use one canonical copy of each router. Each agent client needs a small adapter that makes it discoverable through that client's supported configuration, skill path, or symlink.

The inspected `sync-skills.py` targets Claude, Cursor, Codex, and Gemini paths. That target list alone does not prove OpenCode, Hermes, Grok, or omnirush discovery. Inspect their own loading paths before wiring them.

Shared instructions do not create tools. Each client must know which native tools, MCP servers, and CLI commands are actually exposed in that session.

Likewise, nested routers do not automatically remove the full skill catalog from an agent's initial context. Catalog visibility depends on the client. Keep the router useful even when the client exposes all descriptions.

## Catalog and capability information

Separate three facts:

1. **Installed:** a skill or command exists.
2. **Configured:** credentials or a browser connection are present.
3. **Working:** a relevant operation succeeded, with a recorded date and scope.

Skill frontmatter can supply names, descriptions, paths, and invocation flags. It cannot reliably generate every workflow dependency or fallback rule. Keep curated routing knowledge separate from generated inventory.

The shared capability reference records credential variable names and secret-file locations, never values. A tool process receives only the credentials it needs. Do not load the whole secrets file into the agent conversation.

Victor reports Firecrawl, Firehose, Tavily, and image-provider keys. This design pass does not claim those services passed live health checks.

## Agent-Reach assessment

[Agent-Reach](https://github.com/Panniantong/Agent-Reach) describes itself as a capability layer for choosing, installing, checking, and routing platform tools. Agents call its underlying tools for actual reads.

Its current documentation describes:

- YouTube subtitles/search through `yt-dlp`.
- X access through platform tools, with credentials for some operations.
- Reddit and Instagram paths that depend on configured login/browser access.
- Per-platform primary and fallback paths.
- A `doctor` command, whose checks are not equally deep for every channel; its X notes distinguish credential presence from a successful read.

It fits under the social-source lane of `search-router`. It does not replace the local search router, existing paid providers, or the browser-session policy.

Read the current install behavior, select only the needed channels, and verify a real read before labeling a channel working. Installation and account integration remain a separate implementation step.

## Completeness without excessive skill loading

For a new frontend build, the design router considers every relevant concern in Victor's design inventory. It records whether the concern needs new work, is already covered by the project, or does not apply.

Load the specialist at the step where that concern needs work. A capability cannot disappear merely because the opening prompt omitted its keyword. Existing product behavior can trigger a route too.

Keep one lead route. Supporting routes return their result to it. Do not route upward again or form cycles. Shared references avoid repeated browser or credential policies.

## Additional work types

Keep vault capture, handoff, and session closure as work-router lanes using the existing vault skills. Search owns retrieval; vault maintenance owns changes to the knowledge store.

Writing and publishing can start as named work lanes. Promote them to a separate content router only when their own recurring decisions justify it.

Environment repair and tool setup fit engineering/maintenance. They do not run merely because a normal task finds an unavailable tool.

## Next design question

Choose one initial client and one real task for the first complete route. Keep the shared files client-neutral, then connect the remaining clients through their actual loading mechanisms.

This pilot should verify discovery, correct tools, task completion evidence, and a successful resume. It should use real work rather than invented instruction-compliance scenarios.
