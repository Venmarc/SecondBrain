Here's what the docs say — matters a lot for how you structure this.

How Claude Code actually loads this stuff:

- CLAUDE.md is delivered as a user message after the system prompt, not as part of the system prompt itself. Claude reads it and tries to follow it, but there's no guarantee of strict compliance, especially for vague or conflicting instructions. Your ruthless-mentor persona is going in as a suggestion, not a hard rule. That's already weaker than what you have here.
- Auto Memory is per-repository, keyed to whatever git repo you're working in. So if your "world as of today" doc lives in one project's memory, Claude Code won't automatically bring it into a session for a different repo.
- Files over 200 lines consume more context and may reduce adherence. My dump from last message is already pushing that if you cram it into one file alongside a full persona prompt.
- Splitting into @path imports helps organization but doesn't reduce context, since imported files load at launch — so breaking it into multiple files helps you stay sane, not the token budget.

What this means for your plan, bluntly: dumping the ruthless-mentor prompt and the full project-fact dump into one CLAUDE.md is a bad structure. You'll dilute the persona (long file → lower adherence) and pollute every session with project context that's irrelevant unless you're literally in that repo. Split it: global ~/.claude/CLAUDE.md = identity + tone + rules (short, tight). Project-level CLAUDE.md per repo = the project-specific facts (Ledger's schema decisions don't belong in a Momentum session).

Also — "tell it to web search for accurate info" isn't a memory fact, it's a behavioral rule. Put it in CLAUDE.md as an instruction ("always check current docs/versions before assuming"), not as a fact about you.

Now, the actual ask — questions for what you write in that new Claude Code chat, because if you just say "career reframing happened, recovered sessions exist, want agent-agnosticism" without answering these, it will guess wrong:

  

**Career reframing**

1. What was the actual before → after? "Reframing" is vague enough that Claude Code could interpret it as anything from a mindset shift to a full pivot. Spell out what specifically changed in how you'll operate.

	- Answer: Before I created my skill-router system for Antigravity, it usually went into things unplanned, I have to explicitly mention a skill or “skill” before it makes use of it. During the skill-router system usage, my agent made use of skills like it was intuitive, using skills related to the use context. 

2. Does this change priority across your existing projects (Ledger, Momentum, design-extraction, readme-generator), or is it orthogonal — a strategy-layer change that sits above all of them?

	- Answer: Kind of a priority and strategy change for Legder and Momentum. They will be medium, side projects, while turning skill-router, README-generator, and design-extraction system to real products will be my main focus. Starting with skill-router. 

3. Is this locked, or still being stress-tested? If it's not locked, tell Claude Code that explicitly, or it'll treat it as settled fact and build on it accordingly.

	- Answer: Not locked, yet to be stress-tested. I drew out a plan/roadmap for skill-router and README-gen last night, on paper. I’ll use Claude to turn it into a more realistic plan.

**Recovered "before" sessions**

4. Before what, specifically — before skill-router existed, or before some other milestone? Name the milestone.

	- Answer: Before I created skill-router, there was no milestone at the point. But the creation and successful usage of skill-router was a milestone itself

5. What's Claude Code supposed to do with them — compare current output against them as a regression check, mine them for decisions you already made, or just archive them as history it can reference if asked? These are three very different jobs.

	- Answer: I’ll screenshot/screenrecord the Antigravity CLI sessions as “before”proof of what my the agent was like before it started calling skills using skill-router. I can make posts using those “befores”, introducing my problem before skill router was created. Then post how I went about the system, then post results after skill router was created. Claude isn’t gonna do much about them rn, maybe just storage in a folder.

6. Where do they live, and in what format? If Claude Code can't find them or can't parse them, "serve as befores" is a dead instruction.

	- Answer: Currently, still in my desktop, not extracted yet. They’ll be .mp4 or .png files in the skill-router folder, maybe in a /proof directory that contains all the images/videos I’ll use in posts about skill router.

  

**Agent-agnosticism / skill-router**

7. Does Claude Code already have something close to this (path-scoped CLAUDE.md rules, subagents) that you want it to check before building a parallel system? Worth explicitly telling it to look, or it'll just build.

	- Answer: Current Claude conference has some Claude.md’s but not containing “ruthless mentor” system prompt. It also doesn’t have a memory system for itself. The closes to persistent memory it has is my obsidian vault. The projects aren’t all cloned into the machine, so that has to be done before the memory is added for those projects. SecondBrain exists, but Ledger and Momentum have to be cloned into my Projects directory or somewhere reasonable.

8. Which existing agent is the reference implementation — Antigravity's PreInvocation router, or something else? Claude Code needs a concrete spec to port, not just "make it agnostic."

	- Answer: None atm. The “make it agnostic” part involves research that I haven’t done yet. The only existing agent reference is Gemini/Antigravity, as it’s the only agent I had access to at the time of building skill-router.

9. What does "agent-agnostic starting with 2 CLIs" mean as a finish line — feature parity between the two, or just "doesn't break if I switch"? Those are wildly different scopes and you'll blow past deadline if the target's undefined.

	- Answer: Putting it simply: U can install skill router in Claude Code, for example, and also install it in Antigravity CLI, and it runs with no issues in both agent harnesses. Like I said earlier, I drew out a plan on paper yesterday.
	- Answer: A different approach: instead of having skill-router be configured to an agent separately, it’s installed in your computer, and the agents u have on your pc can use it seamlessly. This different approach is just a plan, just like I drew on paper. Nothing actualities yet. I need to fix up Claude on my Hermes webui before any building work.

  

**Persona/fact interaction**

10. Do you want the ruthless-mentor tone applied to the career reframing and agent-agnosticism plan (i.e., stress-test them), or are those inputs it should just accept and build from without re-litigating?

	- Answer: Ruthless mentor tone applied to everything from the jump, just like a system prompt, the agent reads it and acts the role for the rest of the session 

  

Answer those in the new chat as the continuation. If you leave them fuzzy, you're not getting "continue like I never left" — you're getting a Claude Code that confidently builds on top of guesses.