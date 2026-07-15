**By Gemini**
# Transcript: New Recording 37.m4a

I finally gotten the full context of what I want to build. The full design specs.

Like I mentioned in my earlier voice notes, I've ran into issues where my agents just doesn't want to call skills that are necessary for a task to run with, despite its knowing that those skills are necessary and could help with the task, it just doesn't call those skills.

The fix that I found was adding a standalone classifier as the first model call of each user turn. So, the classifier analyzes my catalog of skills and it reviews my request, my prompts, and sees which skills might be applicable to that task that I want to do, and then it appends it as an ephemeral message. It adds it as context before the agent runs.

The things that are required, the files that are necessary for it to work, is a `hook.py` file—a Python script, that's like the entry points, the beginning, the bouncer. A `generate_catalog` Python script, a `catalog.json`, and a `classifier_rate_limits.json`.

So, the `hook` file, like I mentioned, is what connects these other files. The `generate_catalog` Python script scans my skill roots and builds `catalog.json`. And `catalog.json` is the list of all the skills at that moment. If I eventually add more skills in the future—if I add a new skill—I have to run `generate_catalog` script again so it will add that new skill.

The `catalog.json` contains the skill names and their one-liner descriptions or a couple liners, I don't know. While the `classifier_rate_limits.json` keeps track of my API calls and makes sure I don't surpass 20 requests in a minute.

Now all these things will begin to make sense as I go down.

First, the `generate_catalog` script. What it does is read my skills in the general skills folder and runs, it pulls out the names and the one-liner script, basically what I said initially.

The `hook.py`, it runs at the beginning of every user turn. User turn is a message that I send. If I make a prompt, that's a user turn. But there are some things to make it not start calling API requests for every user turn. There is, um, there is a barrier, let's say barrier. It listens for like conversational messages or messages that are less than three characters long, and it does not run anything if it notices those messages. Conversational messages are like "Okay", "Yes", "Proceed", "Thank you", "Why", "No", and all those short reply words.

On to the hooks. I mentioned that it listens for turns. So, at the start of a session—not really at the start of a session, at the start of an invocation, which is pre-agent run—it grabs my session ID and transcription path, which is where the transcription is stored, and it reads it backwards, not starting from the top but from the last entry. It checks for the most recent entry, which is the model that ran, that is going to process whatever it is I just said, and the time that it happened, the timestamp. And then, any other extra thing that comes in, it simply leaves it and ignores it and exits that transcription file.

It filters the messages, which is after it has finished reviewing the prompt, it filters the messages. Anything that is under three characters will not run; any message that is under three characters will not require an API call. And common conversational replies like "Okay", "Yes", "Sure", "Continue", "Proceed", "No", "Thank you"—all those things do not warrant a run by the agent that I added, the Gemini model that I added in the hook script.

I mentioned a circuit breaker. The circuit breaker, it removes timestamps that are older than 60 seconds that are stored in that `classifier_rate_limits.json`. And then, if there are more than 20 requests in a minute, it simply stops the hook from working—not the hook, the hook script—it returns a standard error and injects an empty ephemeral message.

So, the main agent doesn't stop working if the hook fails. It keeps going because, well, nothing happened on its end. The Gemini agent, what it does is just to input the correct skills that is required for a task.

And so yeah, that's just it. Errors by the hook script do not stop the agent from working, which is why I like the system as a whole. It's running solo in the background, but the things it does, they have a huge effect because they provide extra help to the agent that doesn't want to do the job of finding the skill that it needs for a task, and then it simply returns until you run another prompt. And then it comes back and does its job again.

If there's an error on its end, it simply hides and injects an empty message, ensuring that nothing is interrupted. You'll notice it when you see that your skills are no longer being recommended, that's when you have to check it. I guess that's a flaw, a flaw in the system that I have to figure out.

But, the whole thing is, I’d say, bulletproof such that an error cannot occur. I'm using Gemini 1.5, I think that's like the cheapest model available that can do this stuff.

So, yeah, that's—it's, it's a dope system that I've figured out. And try and replicate it for all my agents or make it a repo or something. 