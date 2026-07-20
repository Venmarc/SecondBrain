**Tried to delete a transaction but the screen froze, just stuck there**
I opened a transaction entry that my agent made during an audit, and tried to delete it, but the screen froze after licking the button. I'm guessing a modal is supposed to show up, maybe it showed up behind the edit card and got stuck. The delete modal is supposed to overlay on the screen where it was called.
Also, I tried to delete the transaction from the transaction page, using the 3 dots' delete button. The modal came out, i clicked it, but nothing happened. is this a latter feature that's not completed?

> **Status (2026-07-20):** OPEN — still reproducible. Build agent task. Not vault housekeeping.

**Another thing. Misalignment with of icons on the sidebar.**
The agent implemented a feature correction I asked it to fix where the sidebar first pulls in the icons before collapsing, making the collapse not look smooth. It fixed it by shifting the icons to the left edge (touching the wall), with no padding. ![[Pasted image 20260720062129.png]]
But the sidebar expands smoothly just as I wanted, but it doesn't not look good. 
- The sidebar icons are supposed to be canter aligned--not achieved.
- The highlight around the icons are supposed to be centered--not achieved
- There should be a left padding in the sidebar, or something similar, like `pl-2`--not present
The presence of the padding on the left will solve the misalignment issue. It already has a `pr-2`

> **Status (2026-07-20):** RESOLVED — Victor manually added `pl-2` to the sidebar; icon/hover misalignment fixed.
