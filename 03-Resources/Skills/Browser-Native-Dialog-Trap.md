---
title: Lesson: Browser Native Dialog Trap
date: 2026-06-28
tags:
  - lesson
  - ui-ux
  - momentum
  - pattern
  - agent-trap
aliases:
  - Browser Native Dialog Trap
  - window.confirm trap
---

# Lesson: Browser Native Dialog Trap

> **One-line Summary**: Using browser-native confirmation dialogs (`window.confirm`, `window.alert`) on delete/destructive actions shatters the premium feel of any app with a custom design system.

## The Trap
You build a polished delete flow. User clicks delete. A grey OS-level popup appears — "Are you sure?" with "OK" and "Cancel" in default browser styling. It looks like a Windows 98 prompt inside your glassmorphism card.

This happened in Momentum's wellness entry delete. The browser modal overlays the entire page with system UI, completely disconnecting from the app's visual language. It signals "this was an afterthought."

**Why agents do this:** `window.confirm()` is one line. It's the path of least resistance when the agent is implementing delete functionality and you didn't specify how confirmation should work.

## The Fix
Every destructive action gets a custom dialog/modal that:
- Matches the app's design system (glassmorphism, colors, typography)
- Is rendered in the DOM, not by the OS
- Has a clearly labeled danger button (red, explicit label like "Delete Entry" not just "Confirm")
- Can be dismissed with ESC and clicking the backdrop

**The pattern to use (shadcn/ui — already in your stack):**
```tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete Entry</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Delete this entry?</AlertDialogTitle>
      <AlertDialogDescription>
        This removes your wellness log for June 5. This cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction 
        className="bg-destructive hover:bg-destructive/90"
        onClick={handleDelete}
      >
        Delete Entry
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

## Prompt to Give Your Agent
```
All destructive actions (delete, remove, clear, reset) MUST use a custom in-app 
confirmation dialog, not window.confirm() or browser native alerts. 
Use shadcn/ui AlertDialog. The confirmation button must use variant="destructive" 
(red). Never use browser-native dialogs. This is non-negotiable.
```

## Rule for Future Projects
Add to every project's `AGENTS.md` under a "UI Constitution" section:
> Never use `window.confirm()`, `window.alert()`, or `window.prompt()`. All confirmation flows use custom dialogs from the UI component library.

## Where This Appeared
- [[01-Projects/Momentum/Docs/DEV_NOTES]] — wellness entry delete button (June 5 testing)

## Related
- [[03-Resources/Skills/Frontend-Awesomeness]] — premium feel standards
- [[03-Resources/Skills/Error-Pages-and-Canva-Colors]] — other polish-level decisions
- [[03-Resources/MOC-UI-UX-Lessons]]

**Tags:** #lesson #ui-ux #momentum #pattern #agent-trap
