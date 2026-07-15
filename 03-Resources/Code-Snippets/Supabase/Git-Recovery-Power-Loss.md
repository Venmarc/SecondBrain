> **One-line Summary**: Recover corrupted git repo after power-loss mid-commit using reflog and object repair.

# Snippet: Git Recovery After Power Loss

**Problem:** Repo corrupted with "bad object HEAD" errors after power loss during commit.
**Solved:** 2026-05-11
**Project:** [[01-Projects/Tempire/Tempire]]

## What Happened
Power cut mid-commit. Git left empty/corrupted objects. `git status` and `git log` both failed.

## Fix (Step by Step)

```bash
# 1. Check the reflog — this is your lifeline
git reflog

# 2. Find the last healthy commit hash (look for last entry before the crash)
# It'll look like: abc1234 HEAD@{1}: commit: your last message

# 3. Reset to that commit
git reset --hard abc1234

# 4. Verify the repo is healthy
git status
git log --oneline -5

# 5. If there are still corrupted objects, find and remove them
git fsck --full 2>&1 | grep "empty" | awk '{print $3}' | xargs rm -f

# 6. Re-add your work and commit
git add .
git commit -m "Restore: [describe what you're restoring]"

# 7. Push
git push origin main --force-with-lease
```

## Key Lesson
Git reflogs survive almost everything. The reflog is stored separately from the object database, so even when objects corrupt, the reflog usually survives. Always check it first.

## Prevention
In power-unstable environments (Nigeria), commit and push frequently — don't batch up hours of work before pushing. Push after every meaningful change.

**Tags:** #snippet #git #recovery #supabase
