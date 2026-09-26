# Codon Labs Review (Edited & Autocorrected Transcript)

## Recording 1: `Recording 20260923210016.m4a`

First of all, I asked for a logo mark intro. The Codon Labs logo should multiply when the site loads for the first time, particularly on the homepage. 

If you go back to lamalama.com, which was my inspiration for this, that intro covers the whole page like a blanket waiting for the rest of the page to load, because that is essentially what it is meant to do: introduce Codon Labs via its logo. The one from Lamalama was black and white, whereas Codon Labs is brown (I might change that later). 

Aside from that, whenever the logo draw-in animation loads, every image sits above it instead of the intro enveloping the whole page. Also, when it finishes loading, instead of fading away, it just dissipates. It is supposed to load before everything else as the first part of the page, covering everything until the animation finishes. That is issue number one.

Number two: On the homepage, the effect over the cell cleavage image covers it instead of exposing it. When the cursor hovers over the image, that is when the cell cleavage is exposed, which is the exact opposite of what I wanted. Plus, the cursor has a forcefield-like grain effect over the cell, which feels weird. 

Currently, when the page loads, all you see is a dark covering over the cell image unless you hover your mouse over it. What should happen instead is that the image starts completely clear, and when you click on it, a dark grain effect appears, spreads out, and contracts again. That is issue number two.

---

## Recording 2: `Recording 20260923210118.m4a`

Still on the cell cleavage topic: It is supposed to sit under the hero text "The next frontier is you". 

The effect it had two to four commits ago, back before I merged the worktree, was fine. The cell cleavage image seamlessly blended so you could not see where the image ended and where the rest of the page began. Now it is just floating over the page as a black card hovering over the hero section, which does not look good.

---

## Recording 3: `Recording 20260923210321.m4a`

Regarding whitespace and visual interest: The page has cool image effects, though I did not notice the one meant for the "$1,000,000 to $500" figures. That figure was supposed to spin up on scroll, but I did not notice it.

Otherwise, the page currently looks like a bunch of text dropped onto a brown surface. When you scroll down, you do see some effects that show thoughtful design. 

However, the image swaying effect I requested was supposed to apply to all images, but it was only applied to the hero image. I want the gentle left-and-right sway applied to all other images, especially on the process page. 

Currently, the process page only has a static grain effect without any gentle sway. Meanwhile, the hero cell cleavage image is swaying up and down gently, which I do not like. The hero image should stay stagnant with its original gradient edge effect.

---

## Recording 4: `Recording 20260923210534.m4a`

Regarding section tags (like "01 Origins", "02 The Process", "03 The Second You") with horizontal lines above them: There is a spacing/distance issue that needs refinement.

There should also be alternating background colors between page sections to create contrast—for example, one section dark (brown) and the next section light (white).

Also, the floating effect was incorrectly applied to the image of the man holding a child under "The Second You" / "14 Families". It is hovering up and down. Instead, the card and image should sway gently left to right like a hanging pendulum (top acts as a fixed axis, bottom sways ~4mm over 250ms).

---

## Recording 5: `Recording 20260923210831.m4a`

The FAQ section currently blends into the "14 Families" section and looks like a wall of text rather than a distinct FAQ component. 

For FAQ answers, they should directly answer the question first before offering extra details:
- **"Will my continuation age faster than me?"** &rarr; Start directly with *"No, it won't age faster than you"*, explain why (identical clone biology), and then optionally mention the Dolly myth. Remove the "Myth" tag from the tab.
- **"Will my continuation get memories?"** &rarr; Start directly with *"No, memories are not stored in DNA."*
- **"Will the baby come out grown?"** &rarr; Simplify the question title (remove "like in the movies"). Answer directly: *"No, the continuation is born as a baby and grows normally."* Explain that movies skip 18 years for narrative convenience.
- **"Are clones less healthy than other people?"** &rarr; Answer directly: *"No, clones live normal, healthy lives."*
- **"Who is the legal parent?"** &rarr; Answer directly: *"You are."*
- **"Can I clone someone else?"** &rarr; Answer directly: *"Yes, but only with their explicit written consent."*

---

## Recording 6: `Recording 20260923211200.m4a`

Content and copy adjustments across sections:
- **What does the $22 million include?** Covers everything from the initial consultation to the first birthday.
- **How long does it take?** Currently 14 months from sample to birth, but we are actively working to reduce growth time from 14 months to 9 months. (Pricing remains fixed/faster delivery).
- **Where does this happen?** Research in Basel (where the company began in 1933); animal research facilities in New South Wales, Australia.
- **Do you clone pets?** State clearly: *"Pets funded our early research, but our focus is human continuation."*
- **What if it doesn't take?** Re-attempts occur at no additional cost until live birth. Samples remain in culture as long as enrolled.
- **Why not just have a baby?** Clarify the distinction between a biological child and a continuation double.
- **Is it illegal?** Explain US legal framework clearly and link to the full public legal review.
- **Do I need residence?** Clients traveling to New York must fulfill US regulatory residency criteria during treatment.
- **What happens to my sample if I die?** Stored under explicit written directive instructions.
- Remove awkward prose like *"Sentence does not continue"* or overly informal phrasing.
- **"Can I meet other families?"** Rephrase to clarify that the family community is an opt-in, invite-only network without sounding restrictive.

---

## Recording 7: `Recording 20260923211551.m4a`

Review of the Program and Journey sections:
- **Program Card:** The $22M pricing card gradient (brighter top, darker bottom) and CTA look great.
- **Journey / SVG Tracing:** The horizontal line trace on the Program page should trace smoothly across stages (Skin Cell &rarr; Blastocyst &rarr; Transfer &rarr; Birth) in a clean, scroll-timed linear path.
- **Journey vs. Roadmap:** The Journey section currently mixes travel logistics with biological milestones confusingly. Separate the 9-month development process from client travel logistics, or simplify the Journey section so it focuses strictly on the client experience.

---

## Recording 8: `Recording 20260923212407.m4a`

Footer, Navigation, and Team page feedback:
- **Footer:** Remove the random SVG mountain/hill line trace in the footer. Ensure all footer links have generous click target padding (7–9mm touch targets).
- **Navigation Bar:** Expand hover/click hitboxes for top nav items. Rename "14 Families" and "The Program" for clarity. Fix the SVG intro trigger so it only fires once on initial homepage load, not on every route transition.
- **Team / About Page:** 
  - Add an image gallery for the 14 Families section.
  - Expand founder bios (Anton, Dr. B, Dr. Marcus) beyond brief 2-sentence placeholders.
  - Fix image layering where portraits overlap with background logo animations.
  - Update Dr. B's photos so she is not using the exact same pose in two separate images.
- **Animal Research:** Remove non-essential placeholder text from the Animal Research section; state clearly that animal research details or dedicated portal are coming soon.
- **Footer Links:** Standardize link label to "Docs" rather than "Documents".

---

## Recording 9: `Recording 20260923212723.m4a`

Terms, Waitlist, and Architecture summary:
- **Terms & Disclaimer:** Clearly state that Codon Labs is a speculative fiction / design exercise, no actual commercial services are offered, and joining the waitlist yields only an explanatory confirmation email.
- **Waitlist Copy:** Remove confusing meta-phrasing like *"This is the only honest email that we will ever send."* Replace with clean, professional copy: *"Application does not commit you or the company. Your program begins with a conversation."*
- **Architecture Strategy:** The core hero page should remain lean and uncluttered, serving as a hub with direct links to dedicated sub-pages (Process, Program, Team, FAQ, Terms) where detailed copy resides.
- **Footer Artwork:** Replace the abstract coordinate/flight-path SVG footer artwork with a clean, intentional design asset.
