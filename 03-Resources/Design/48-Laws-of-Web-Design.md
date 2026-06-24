# Resource: 48 Laws of Web Design

> **One-line Summary**: Aesthetic and design framework checklist for building and reviewing high-fidelity web experiences.

## Description
The aesthetic framework Tempire is built on. Referenced in agent skills (ui-ux-pro-max) but not yet documented here. Fills this in as laws are applied and understood.

## Use When
- Evaluating whether a design decision is defensible
- Prompting the agent on UI tasks — "Apply the 48 Laws to this component"
- Reviewing a page for quality

# 48 Laws of Web Design for Startups

**Source:** @clear_graphics (April 2026)  
**Purpose:** Conversion-focused guidelines for startup/SaaS landing pages and websites.  
**Note:** These are strong guidelines. Break them intentionally when data supports it (Law 48).

## The 48 Laws

1. Your headline should be under 15 words.

2. If a visitor can’t understand what you do in 3 seconds, your hero has basically failed.

3. One CTA per viewport. ALWAYS.

4. Social proof belongs above the fold.

5. White space is a design element so treat it like one (clear type shit).

6. Never use more than 2 fonts on a single page.

7. Your CTA button color should contrast everything around it.

8. You CANNOT treat mobile as secondary because 62% of traffic sees the mobile version first.

9. Page load speed can sometimes matter more than page design. A 1-second delay will drop conversion by much more than you think.

10. Screenshots or videos of your ACTUAL product build more trust than illustrations.

11. Testimonials with photos convert so much better than text-only testimonials.

12. Pricing should be visible. Hiding it just creates friction and loses trust.

13. Your logo doesn’t need to be large. 40px is usually enough.

14. Navigation should have 5-6 items maximum.

15. Every section should answer ONE question for the visitor.

16. Bullet points are a lot easier to scan than paragraphs so use them for feature lists.

17. Dark backgrounds create premium perception. Use them only if your brand supports it.

18. Sticky headers reduce scroll-to-CTA friction by keeping the button always visible.

19. The footer is for SEO and legal. Stop trying to convert people there.

20. Gradient backgrounds are back because subtle gradients feel modern without being distracting.

21. Icons should be consistent in style. Mixing outlined and filled icons looks amateur as fuck.

22. Your “how it works” section should always have exactly 3 steps.

23. Video backgrounds increase time on page WHEN used correctly.

24. Social proof numbers beat logos. “10,000+ teams” is a lot stronger than 5 company logos nobody gives af about.

25. Left-aligned text reads faster than centered text for paragraphs.

26. Center-aligned text works for headlines and short labels only.

27. Your above-fold content should work without JavaScript loading.

28. Lazy load everything below the fold.

29. Use system fonts for body text (Inter, DM Sans, etc.) because they load instantly.

30. Custom fonts for headings only because the personality is in the HEADLINES.

31. Reduce form fields to the absolute minimum. Every additional field drops completion by a small amount.

32. Autofill support on forms is mandatory in 2026.

33. Error states should be inline, not in popups. Show the error next to the field that caused it.

34. Hover effects on desktop should have corresponding tap effects on mobile.

35. Anchor links in your nav that smooth scroll to sections keep your visitors on page.

36. Announcement bars at the top of pages increase click-through by a decent amount when used sparingly.

37. **Trust badges (SSL / Security)**  
    For early-stage indie projects like Tempire: Focus only on SSL for now.  
    **Minimal steps for Vercel deployment (Next.js 16):**
    - Deploy your app to Vercel (recommended). Vercel automatically provides free, auto-renewing SSL via Let's Encrypt.
    - Once deployed with a custom domain, your site will show the green padlock (HTTPS) in the browser.
    - Add a simple visual trust indicator in the footer or near forms:
      ```tsx
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <span>🔒</span>
        <span>Secured with SSL • HTTPS Protected</span>
      </div>
      ```
    - Place this subtly in the footer (or hero if space allows) — one per viewport rule applies.
    - SOC 2 and formal GDPR badges are for later when you have a registered company and enterprise users.

38. Founder photos on early-stage startup pages increase trust measurably.

39. Case study pages should follow problem → solution → result format. Fucking always.

40. Comparison pages against competitors should use tables. The visual format makes differences obvious.

41. Your 404 page is a branding opportunity lol. Make it helpful and on-brand.

42. Loading states (skeleton screens) reduce perceived wait time.

43. Breadcrumbs help SEO on multi-page sites.

44. Accordion FAQs save vertical space and improve scannability.

45. Use og:image tags so your page looks good when shared on social media.

46. Test your page on the cheapest Android phone you can find and if it works there, it works basically everywhere.

47. The best pages look like they were designed by one person with one vision.

48. All these rules are guidelines that you sometimes have to break.

## Known Laws Applied in Tempire
- Landing page built on these principles (2026-05-11 session)
- Every component should follow visual hierarchy, whitespace, and typography rules

## Related
- [[03-Resources/Skills/Frontend-Awesomeness]]
- [[03-Resources/Skills/Agent-Prompting-Masterclass]]
- [[01-Projects/Tempire/Decisions]]

**Tags:** #resource #design #ui-ux
