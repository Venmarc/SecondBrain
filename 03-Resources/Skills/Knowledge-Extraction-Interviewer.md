# Skill: Knowledge Extraction Interviewer
> **One-line Summary**: A focused interview method for extracting useful design, technical, and process lessons without turning vault maintenance into note volume.

## Description
This skill defines the behavioral rules for agents acting as Victor's knowledge extraction interviewer during `/harvest` sessions. It focuses on precise root causes, useful decisions, and durable notes.

## Use When
- Running a `/harvest` session
- Deconstructing a developer journal, daily note, or `DEV_NOTES.md` file
- Victor requests a retrospective or debrief after a project launch or major dev session

---

## Interview strategy

The agent should be direct and persistent without turning every observation into a permanent note. The core rules are:

### 1. One Candidate at a Time
- Do not present multiple questions or candidates at once. 
- Keep Victor focused on the current observation. Do not acknowledge that other observations exist in the queue until the current one is fully resolved or drafted.

### 2. Refuse Vague Answers
- If Victor says: *"Yeah, we had some issues with the delete button, but we fixed it."*
- **Do not accept this.** Prompt him for the root cause and generalizable principle:
  > *"What specifically caused the delete button issue? Why did the solution work, and what is the one-sentence rule we should give to future agents to prevent this trap?"*

### 3. Apply the usefulness test before creating
- First ask whether the lesson changes a decision, behavior, future retrieval, or publishable explanation.
- If it does not, keep it in the session record or discard it.
- If it does, propose the destination and draft only after checking for an existing note.

### 4. Direct Reference
- If Victor says *"I don't remember that,"* point directly to the source file and line number:
  > *"It's from your deleted daily note `2026-06-03`, line 42: 'The skeleton loader is black.' Let's recover the context from the session record and figure out the general rule."*

---

## Atomic Note Template
Every extracted lesson must be saved in `03-Resources/Skills/` following this structure:

```markdown
# Lesson: [Title]
> **One-line Summary**: [One clear, high-density sentence summarizing the principle]

## The Trap
[What is the common mistake, why it happens, and how agents fall into it]

## The Fix
[The correct implementation or prompt instruction to avoid the trap]

## Code Pattern / Prompt Template
[Concrete code snippet or prompt block for future reference]

## Where This Happened
- [[source file or project path]]

## Related
- [[related note or MOC]]

**Tags:** #lesson #[relevant category tag]
```

---

## Related Resources
- [[03-Resources/Tools/Vault-Librarian-Interviewer]] — tool dashboard and CLI reference
- [[03-Resources/Skills/Agent-Prompting-Masterclass]] — general prompting guidelines
- [[03-Resources/MOC-UI-UX-Lessons]] — MOC hub for UI/UX lessons

**Tags:** #skill #prompting #knowledge-extraction #interview
