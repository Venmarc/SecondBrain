---
title: "Skill scanning and context management optimization"
source: "https://claude.ai/chat/d8ee5b9e-a021-4048-b457-38bdda5bb257"
author:
published:
created: 2026-06-30
description: "Claude conversation with 2 messages"
tags:
  - "clippings"
---
**You**


<prompt>
`https://github.com/obra/superpowers` using-superpowers is the first skill that is read at the start of a section. I will need u to do more research, not on the repo, but on the web in general. Cos i'm sure i'm not the only one facing this sort of problem
 
"""
"I have one more problem that isn't persistent, but makes thinsg harder because it doesn't happen. U, the agent, fail to recommend or utilise skills when a task calls for it without my explicit mention. I'm pretty sure `using-superpowers` has a line that says u must use a skill even if it's a 1% chance that it could be used. The factvthat the task requires something the skill could provide an insight on requires the use of that skill. but u don't do that. It's not new. It's been going on since I started using antigravity IDE and CLI, so I dunno where the problem is from. Is it bloated context? Is it uncertainty? What could it be? Do u understand my problem here? If do u want to ask questions for clarity?"

<response>
"This is a very common and frustrating behavior in agentic architectures. You are absolutely right: `using-superpowers`  has a "1% rule" (the strict instruction to use a skill if there is even a 1% chance it applies), yet agents frequently bypass them.

Here is why this happens, why it is a persistent challenge, and how we can fix it.
──────
### Why is this happening? (The Root Causes)
1. The Bootstrap/Chicken-and-Egg Problem:
To follow the rules in  using-superpowers.md  (which tell the agent to run skills), the agent has to already be thinking about the  using-superpowers  skill. If the user prompt is direct (e.g., "Fix this error"), the agent immediately shifts into "execution mode" and bypasses the skill evaluation layer entirely.
2. "Fast-Path" Bias (Model Overconfidence):
Large Language Models are biased toward direct action (reading files, writing code). Bypassing a skill and starting the work immediately feels like "progress." The model internally rationalizes: "I already know how to write tests/debug this, I don't need to spend a turn loading a skill file."
3. Context Attention Dilution (Needle in a Haystack):
The list of  <skills>  is injected at the top of the context window. As the conversation grows and files/code get loaded into the context, the model's "attention weight" shifts heavily toward the bottom of the prompt (the active codebase and the user's latest query), causing it to lose focus on the skills listed at the top.
4. Strict Description Matching:
If a task is "add a verification step to the signup," but the skill is called  tdd  with the description "Test-driven development. Use when the user mentions 'red-green-refactor'...", the agent will literally match the words and think: "The user didn't say 'red-green-refactor', so TDD doesn't apply." This leads to false negatives.
──────
### How do we fix it?
Since we just incorporated  /home/redmane/.gemini/GEMINI.md  into the launch sequence (meaning the agent is guaranteed to read it at start), we can leverage this to enforce a strict Skill Gate protocol.
We can add a rule to  /home/redmane/.gemini/GEMINI.md  that forces the agent to explicitly perform a Skill Scan in its thinking process on every prompt.

#### Proposed Addition to GEMINI.md
We can add a new section to GEMINI.md :                                                                                                                            
## 6. Proactive Skill Gates (Superpowers)

**Before answering any prompt or executing any tool call, you MUST perform a "Skill Scan" in your thoughts:**                                                     
1. List the available skills from the `<skills>` block.                                                                                                           
2. Evaluate if any skill has even a 1% applicability to the current task (e.g., `systematic-debugging` for bugs, `tdd`/`test-driven-development` for new features, `ui-ux-pro-max` for design/UI, etc.).                                                                                                                               
3. If applicable, you MUST invoke/read the skill file before taking any implementation action. No exceptions.                                                     

By forcing the model to write down a "Skill Scan" check in its internal thinking process on every user prompt, we interrupt the "fast-path" execution bias and force the model to explicitly choose whether to load a skill."

The agent reads the one liners or frontmatter on the skills to know if it can be used
What are ur thoughts on this fix? Pros and cons? Any other ways to fix this problem aside doing the skill scan? Will it backfire in the long run?
"""
<user_prompt>
I need ur help with a fix or a prompt to fix it. the skill is universal, read by evry agent on my pc. Is the skill scan good? I usually keep chats under 150k-200k context (150k most times), even tho my window is 1M, I usually call skills with natural language ("use ui-ux-pro-max to do this") or a "/ui-ux-pro-max do this like this", or I ask it to check which skills can help with the current task(s). Let's plan a good long-term fix.

---

**Claude**

**Why "add a Skill Scan paragraph to GEMINI.md" doesn't actually fix your problem**

First, the premise. You're assuming this is an _awareness_ problem — the agent doesn't realize a skill could apply, so making it explicitly reason about it will fix it. There's recent interpretability work that contradicts that assumption directly: researchers probing mid-layer activations found models can predict with near-perfect accuracy whether a tool should be used, while the actual output fails to trigger that tool more than 80% of the time. They call it the "Lazy Agent" failure mode — the model already knows, internally, that the skill applies. It just doesn't cross the threshold into acting on it. That kills your fix's core theory of change. You can't fix a "knows but doesn't act" problem by adding more "think about whether you know" instructions — the knowing was never the bottleneck.

Second, mechanism. Someone actually ran the eval you're proposing — not theorized about it, ran it in sandboxes with real Claude Code sessions. Two findings should worry you specifically:

One, a "prompt"-type hook injected on every turn — which is functionally what your GEMINI.md paragraph is, minus even the per-turn freshness — performed identically to no hook at all, 55% versus 55%, because that style of injected instruction gets deprioritized as background noise inside the system-reminder. Saying the words isn't enough. Where and how you say them changes the outcome completely.

Two, your fix lives in a file read once at session start. Everything you already diagnosed about attention dilution — recency bias, lost-in-the-middle, the skill list losing salience as the codebase floods the context — applies just as hard to your new paragraph as it does to the original skill list. You're not escaping the disease, you're adding a second patient. Independent research on this confirms system prompt influence degrades as context length grows, and at 50K+ tokens earlier instructions can be effectively forgotten. You run 150k routinely. Your fix is dead on arrival past the first third of most of your sessions.

**What actually moved the needle in that eval**

Two configs beat baseline meaningfully, and they share one property: the decision isn't made by the same context-polluted agent that's about to do the work.

"Forced-eval" — explicit YES/NO commitment per skill, written into the response text before acting — worked, but cost time: 10.7 seconds versus 6.4 for the alternative.

"LLM-eval" beat it on speed and arguably matched it on reliability, by routing the decision to a _separate, cheap model call_ — it tells Claude exactly which skills to activate with no evaluation step in the main response, because a small model already did the matching before Claude even started, despite that extra call. That's the architecture, and it lines up with what skill-routing researchers are converging on more generally: presenting the full skill catalog to the agent doing the work is infeasible at scale, so real systems need a separate routing component that retrieves the right skill from the pool rather than relying on the consuming agent's own judgment. Same logic shows up in instruction/tool retrieval work — narrowing what's exposed per-step rather than trusting an agent buried in its own context to self-police improved correct tool routing by 32% relative versus a monolithic baseline.

The pattern across all of this: stop asking the tired agent to grade its own homework. Build a gatekeeper that isn't tired.

**The actual long-term fix**

A `UserPromptSubmit` _command_ hook (not a prompt-type hook, not a static doc edit) that fires fresh on every message, before your main agent sees it, and does one of two things:

A cheap pre-classifier call (Haiku-tier model, skill list + your raw prompt only, nothing else from the conversation) that returns "activate X, Y" or "none," which then gets injected as context the main agent reads as a near-certain instruction rather than a suggestion to weigh.

Or, if you want zero extra API cost, a keyword/regex rules file matched against the prompt text — cruder, will miss paraphrased requests, but free and instant.

This solves your actual constraints: it's immune to your 150k context bloat because it's injected fresh near the bottom of context every single turn, not sitting at position zero decaying; Claude can't forget because it never has to remember — the hook appends the recommendation before Claude sees the message.

Three things you still need to handle, and they're real gaps, not nitpicks:

Your skills need broader trigger language regardless of mechanism. Part of your false-negative problem is the agent preloading only the YAML frontmatter/description to decide relevance — if that description is narrow and keyword-literal, no enforcement layer saves you. Rewrite descriptions to "stop and consult this whenever X, even if not explicitly mentioned" framing rather than "use when user says Y."

"Universal, read by every agent" is the part of your plan that's currently fiction. Claude Code's hook system is documented and real. I don't know — and you shouldn't assume — that Antigravity or Gemini CLI expose an equivalent `UserPromptSubmit`-style interception point. If they don't, your "universal fix" degrades back to a static instruction for those tools, with all the decay problems intact. Check this before you build anything, per-tool, instead of designing one fix and hoping it ports.

Cost. A hook firing on every prompt, even trivial ones, adds latency and (for the LLM-eval variant) a small recurring spend. Given you're trying to keep context lean, don't make the hook itself bloat the conversation — keep its injected output to a line or two, and consider gating it so it only runs the full classifier when a cheap keyword pre-filter flags ambiguity, rather than on literally every "ok thanks."

Don't ship this on faith either. Build the 15-prompt eval Spence built — a short list of prompts that should trigger a skill implicitly, run it against vanilla vs. your hook, and check the actual `Skill()` call rate. You're the one who told me not to sugarcoat; that cuts both ways — verify your own fix works before you declare victory on it.