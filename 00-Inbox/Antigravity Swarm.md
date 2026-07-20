**WARNING:**
- I WANT THE AGENT ANALYZING THIS FILE TO ANALYZE BIT BY BIT, AND NOT GO INTO VIEWING ALL THE SCREENSHOTS AND SCREENCAST AT ONCE.
- GOING INTO ALL OF THEM WILL LEAD TO THE AGENT THINKING THEY KNOW HOW IT THIS THING WORKS, BUT I DON'T THINK THEY WOULD GET IT ALL AT ONCE.
- IT COULD LEAD TO RATE LIMITS OR CONTEXT BLOAT OR RAM ISSUES OF SOMETHING. 
- SIMPLY PICK A A SEGMENT U WANT TO ANALYZE, SEARCH THE HEADER FOR IT, AND VIEW THE IMAGE OR SCREENCAST FOR IT. IT'S BETTER THIS WAY.
- THE FILE IS AVAILABLE, SO U CAN REVISIT IT ANYTIME U WANT.
**REFERENCE FILES:**
- [[2026-07-20-grok-antigravity-step5c-perf-gate]]
## Brief Intro
Today, I saw my version of the [Antigravity](https://antigravity.google) swarm, and it looked better than I expected. The swarm is working now, I haven't noticed a pattern in the particle movement. they seem to have a mind of their own. But, they are not yet moving around together, like an actual swarm. A description of the swarm rn will be Brownian Motion, cos the particles ARE brown, and move erratically.
- ![[Pasted image 20260720020800.png]] ![[Pasted image 20260720040348.png]]*my version of the antigravity swarm with brown partcles*

- ![[Pasted image 20260720020518.png]]*antigravity hero swarm clustering around the cursor*

## Discoveries
I found out that the swarm in antigravity is used in three places, the hero, in the middle, and the section above the footer.
- The section above the footer is on a dark container, still following the cursor but not out of the container. Similar to the hero swarm. ![[Pasted image 20260720021800.png]]*the swarm in the section above the footer*

- The swarm around the middle, blew my mind. It behaved like what I would describe as a drone show. There were two swarms of particles beside each other (if u zoom in, they display above each other), and they took a particular shape when hovered. They do not follow the cursor, they respond to its presence by taking a shape:
	- At first glance, without the cursor, they look like a mesh of sleeping particles. Yes sleeping, cos they were still moving, turning left/right individually while maintaining equal gaps from each other. ![[Pasted image 20260720022702.png]]*the particles resting like they are on a field waiting for nothing*
	- Then u move ur cursor to either CTA, and the particles take come together in a shape representing that CTA:
		 - For the developer download CTA, this is what they look like. ![[Pasted image 20260720023051.png]]![[Pasted image 20260720040514.png]]*particles come together to form braces that represent developers*
		
		- And in the organization part, the particle come together to form a group of particles. Yeah, crazy. Look at it. ![[Pasted image 20260720023327.png]]*particles form 6 round groups of particles representing an organization*
		
	- ### Worm Movement (No Cursor):
		-  What's crazy about the particles in the mid-section is that they are not like the swarm. they have pre-programmed movement patterns, that only need the cursor to activate.
		- They are like tetris worms that spend their life as 1by1 blocks, but they move by stretching and puling themselves very quickly (this leads to the being 1by 2 blocks). They stretch up/down/left/right in unison, but it may not look like that up close. If u zoom in too close, u thing they have separate ,minds, but they are still part of a swarm. ![[Pasted image 20260720033625.png]]*500% zoom of particles in swarm*
			
		- Take one worm class for instance. The worms in this class are programmed to behave, to behave a certain way, and move that way within a particular Area 1. Then there's worm class 5 in a different Area 107, that was programmed to move in a smaller area than class 1 worms. ![[Pasted image 20260720034357.png]]![[Pasted image 20260720041439.png]]*some worms going up, down, left, right or appear stagnant, because of screenshot*
		- Then u assign an invisible teleporter that switches class 1 worms in any area with class 5 worms in another area. Then the behavior of the new worms differ from the worms around them. One worm might come 1-2 mm too close to another worm because it wasn't designed to be there. But they don't cross paths or fight each other. They move around like they were programmed to with no obstruction.
		- Imagine there are thousands of areas filled with worms from class 1-5 moving in unison evenly. Then u introduce the teleporter that switches the places of multiple worms from different classes at the same time. Its randomness leads to the worms not having any chance to be placed next to another worm of the same class. As a result, two worms next to each other never look like they behave the same way, cos they are of different classes. Sometimes the worms are teleported multiple times before they begin to move about. They only get ~500ms of movement time before they're switched out again. So for a split second, one area might be empty. But this whole randomness doesn't cause confusion amongst the worms. They still know to go up or left and not look at the next worm, because the next worm is doing the same thing, regardless of how long or short their stay in in an area.
		- Some worms move by stretching, like "worms", others zap/blink all the way, like the teleporter is picking and replacing them immediately.
		
	### The Shape-Taking
	- This is the part where all particles start moving like pixels in their slowest form. Like u take a .png image and shred it, then piece it together to make the outline of any shape given to the. In this case, braces and circles. That's what the grouped particles look like.
	
I'll need a vision-capable agent, like Grok, and a couple screencasts of my version, antigravity version and the new swarm screenshots to proceed.

## Next Up
My next order of business is conclude the "erratic" swarm, I think that's what I'll call it, from antigravity. Then I'll move to replicating the actual "follows cursor and behaves like an organism" feel, and the "drone show/worms". And store them as a different component. The cursor-responsive swarm on its own. And drone-show moving-worms-pixel swarm as its own component.
- Screencast of the drone-show-worms-pixels ![[Screencast From 2026-07-20 01-14-05.mp4]]
- Screencast of bottom session swarm ![[Screencast From 2026-07-20 01-14-46.mp4]]
- Screencast of my version of antigravity swarm ![[Screencast From 2026-07-20 01-28-55.mp4]]
- Screenshot of antigravity.google hero swarm ![[Screencast From 2026-07-20 01-29-43.mp4]]
- Closer view at the drone-show-pixel swarm ![[Screencast From 2026-07-20 04-37-04.mp4]]
- View this one last. It is 40 secs long and could take time ingesting ![[Screencast From 2026-07-20 04-34-10.mp4]]