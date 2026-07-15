**By Gemini**
# Voice Note Transcription: Solving Agent Skill Selection Issues

I've constantly ran into a problem where an agent fails to recognize and load relevant skills when a task requires one. Unless the skill is named by the user before—like in the prompt—the agent usually doesn't reference them while it is doing the task that you gave it.

They know the skill is required, like with high confidence: _"This will require UI/UX Pro Max"_ or _"This will require systematic debugging"_, but they don't actually do it. Either because they are focused on something else, or... oh yeah, probably that. They are in the zone and don't want to stop work until they are done, which is understandable, I think.

So, the fix is not really like trying to force it to remember, because it will just forget or ignore as it enters into that task you gave it.

I researched this today with Grok and Claude and found out that the issue is common. I think it's called the **"lazy agent" failure mode**. The agent knows what to do, but doesn't actually do it.

The fix is to leave the skill assignment to a separate agent/model that is not that agent doing the task. So, the script will be called by a hook—like a `BeforeUserPrompt` hook in Claude and `PreInvocation` hook in Antigravity. You send your prompt, the main agent doesn't receive it immediately, instead, the PreInvocation hook runs. The hook runs a script that reads your prompts, reviews your skills, or a catalogue of your skills, calls out whichever one is relevant for that task, and returns it to your main agent as context.

And then your main agent knows, _"Okay, this skill will be required. This skill will be required for this, and this, and this,"_ and it then invokes those skills when doing the task that you gave it.

So, I'm yet to implement my fix. I've been researching it out since yesterday. I've been building up on it since yesterday with Claude, but I finally decided to use a prompt and reference files. Doing it directly from Claude won't work, because Claude will tell me _"create this file like this, like this,"_ but it doesn't know exactly how Antigravity functions because it is not Google Antigravity.

So, I asked it to create a prompt with the problem, the goal, the components, the layouts, the unknowns to verify, and stuff. And then, add the files that it created as reference files so that the agent will know, _"This is what it's supposed to look like, but you have to build it in your own way."_

I'm yet to do it, but I'll go ahead and implement it now