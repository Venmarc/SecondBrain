I lost an idea within a minute of thinking about it, and slapped myself because of that. Now the idea is back:

## Write out everything I want my ai not to do in design going forward.

Agents are thought the generic stuff, but can do specific things if told what to do. If u specify that u want a white-blue default theme, where the white is wayyy more than blue, but u can tell blue is there. Your agent will get it close, but not what u want. U just described it from your own pov. What u see, and imagine in your head, not why your agent sees or understands.
There’s a perspective u and your agent understand in relation to how much white and how little blue should be in the theme, and that’s numbers. If u said made the default theme a bluish-white with 90% white and 10% blue, your agent will understand what those colors mean based off what it has been trained on about colors, numbers, CSS, etc. It translates your white-90 and blue-10 into values that produce a color

## Vercel’s vgpu

I think It’ll be cool if u had a chart that displayed colors while your cursor moved around it. It could glow green when a chart web up and red when it went down.
From the x post I saw, it’s like liquid glass and then light interaction with liquid glass. Or light interaction with its surroundings, not necessarily glass.
There are many possibilities with this, so I shouldn’t limit my thinking.
	•	A dark page that is illuminated by light beams reflected by mirrors. Your view is kinda partial but the glows and subtle reflection illuminates the rest of the page as u scroll. It could be light with mirrors placed at random angles and positions around the pages, with one or two constant sources of light, and as u scroll, the light direction changes because of the mirrors. It’ll look magical, like a disco ball, but more directed and controlled. It could be prisms or glass cubes and cuboids instead of mirrors.
	•	It could be useful for indicators, following the mood of the user and page it is in, kinda like a room with mood lighting, but the light is in motion so its effects are more noticeable. I haven’t thought this part out yet.

I’m genuinely not familiar with this stuff to begin with. So I’ll have my agent do more milking onthe potential ideas we can execute with vgpu. Not related to exist projects. We could do things not related to existing projects, and I’ll see what they’ll look like.

## ASCII Rendering or Art however it’s called

Make digital art with moving pixels, like a grid of images and how do I explain this. 

![[ScreenRecording_08-29-2026 01-24-06_1.mov]]

Oh. Just learnt ASCII is just letters/characters grouped together to form an image or moving together to form a video like the one above. So I’ll like to apply that somewhere. Ofc not everything can work with ASCII, but it can work on a dark-themed portfolio.

ASCII art of my face in the hero of my portfolio

## Low quality high detail image

Landing page hero image of a Lego/minecraft style image. Could be a boy standing at the top of a mountain the boy being lesss blocky and the mountain being less block as well. But when u zoom in, begin to see that the image is made of tiny squares. This, if done right, could make an image detailed yet have low quality and load fast

## Astro Framework

My go to for content websites: marketing, portfolio, images, text made easier.

![[Pasted image 20261007034116.png]]
I can build the complex web app part with Next.js and attach it to a Vercel project. apps/app for the app.domain.com subdomain. While I do the landings page part with Astro. app/… for the domain.com domain. My explanation might be complex but the concept is understandable.

It’s easier to build a portfolio or multi page site with Astro. And build the complex part with Next.js. While Next.js can handle both, it’s far easier on Astro for the visitor facing side. This style, I will adopt going forward.

## Domain.com website

A website to copy. Domain is a website that has this gumroad style look about it. It had components with solid, heavy backdrops, not necessarily glows or shadows. And that looks awesome. It has white/cream and yellow for the body, and black theme for the footer. It’s a simple landing page but it looks awesome

## Unive Website worth looking at

In the Unive website.
	•	When u first visit it, u see the hero image, which is a boy holding a map on a trail to a huge college campus. It loads FAST and I dunno the secret behind it. I’m assuming it’s low quality, maybe less than 100-50kb but the amount of detail IN the image makes u think it has more. It has the trail, birds, college building, trees left and right, and mountains—far left and right beside the college building, on far behind (like ~2km because I want to give it a distance), and one hill/cliff close to the boy. That’s tye amount of detail in the image, yet it loads before everything.
	•	The buttons and image components in the page. The white space of the cloud above the campus served as a good place to add a hero text, and they did just that and added a CTA as well. It has a top bar without a bottom border, a hamburger menu left and get started CTA right. The hero page has the 100dvh whatever that keeps the landing page in view even if u zoom out. It goes away when u scroll—I have used it before.
	•	Scrolling up. The app screenshot/image looks like the app was made with Astro cos of how smooth the components are. But because of complexity—roles, auth, DB, security, I assume Next.js was used. But going down, the feature screenshots aren’t actually screenshots or images, they’re components that display a piece of the app. And because they’re texts and icons, u don’t have to worry about image rendering and stuff taking time. Just to confirm, I did zoom in and the text, buttons, layout looked smooth. Unless everything there is a huge svg, I think it’s just html, some borders, icons, and texts. I’m saying components like it’s Next.js—It could be, but I’ll just say it’s Astro.
	
	![[Pasted image 20261007034308.png]]
	![[Pasted image 20261007034607.png]]
	
	U can see the contents, zoomed in appear like parts of apps themselves instead of images. So they just duplicated the components, rendered them inactive, and used them as app screenshots. Genius.
	•	The image intensive parts, are the student reviews at the later parts of the page. Those ones are text and images, all 5-star btw
	•	The got an faq section, and an expanded tab/question closes when u open another, so no multiple tabs open that have to close one by one. Some websites make that mistake and make have u close them individually.
	•	The footer. No black, different color, or images (svg or similar to hero image style) like other websites. Just plain with links and footer stuff—foot stuff haha.
	•	Back to the hero page, it does have this dark shadow at the bottom-third that serves as a background for the reference websites like Forbes, Business insider, msn, that are placed on it, tho it extends to where the boy is. That shadow actually loads first before the image.
	
	![[Pasted image 20261007034738.png]]

## Image search and image editing

Connect Pixabay, Unsplash, and Pexels api keys to my agents and have them pull up images that meet a requirement list. 
Next is configuring my agents to use agy for image analysis and editing when they need something changed to meet a scenario/environment
I already did the above. What’s left is to test it out
My agent ran a test urself and it came back successfully.

## LockedIn with 4.8 stars

![[Pasted image 20261007034812.png]]
	⁃	Location activated.
	⁃	Gives a summary of what u kissed while in class.
	⁃	Might help reply ur messages.
	⁃	Make it an assistant that handles ur work honestly while it is closed?
	⁃	No. 4 could cause overheating with background activities and all that.
	⁃	Stick to 1-3 first. Or just 1-2
I still need to dive deeper on that niche and find more data to help make this actually worth 4.5 starts first

## Video Hook

While recording, I get out of my car, run into my house, enter the bathroom and start washing my hair. And while I washing, I say “I forgot to wash my hair before going out today,” and u pull out a hair product. Yeah. Turns out it was an ad for a shampoo 

## Pest Exterminator Website

U can purchase if u live in an area with constant pest visits, u can buy permanently to deploy weekly or monthly to find em and kill em.
U can hire if u just moved into a place and not sure if there are pests in ur house. U can deploy em to go search for pests and eradicate em from ur house. 

## Neo-brutalism website References

Gumroad and Buffalo Wild Wings are the two that caught my eye, though I haven't visited them all. Gumroad got thick border, and BWW got no thick borders. Both are considers neo-brutalism tho. So thick borders aren't their only definition
![[Pasted image 20261008140912.png|206]]
