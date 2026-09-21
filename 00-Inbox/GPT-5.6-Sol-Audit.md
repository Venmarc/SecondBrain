---

## User

I know a smooth scroll can work. antigravity.google has it and u can use space, up, down, pageup, pagedown, home, end, find in page, and works like a normal page except it's smooth. SO we can do the same and achiev that smooth feel. I also want a custom scrollbar. not the kind where the scrollbutton expands when u zoom in or contracts when u zoom out. I cool slick one that doesn't look like native broowser scrollbars.
Audits first. I don't want to miss anything. And just to get on track, I'll fetch the logos. but ping me before u make any crucial decision. I don't want a domino effect of unfinished pieces. Around 3 am, I'll be done with the logo. We can handle image gen rn if it comes up. What are teh things we are auditing?

---

## Assistant (Build · GPT-5.6 Sol · 228.1s)

_Thinking:_

**Clarifying audit scope and categories****Identifying audit groups and stale documentation****Expanding audit groups to interaction and accessibility****Planning audit phases and deliverables****Listing critical design decisions for approval****Flagging stale documentation for audit****Confirming audit scope and approach****Documenting audit matrix and scope****Defining custom scrollbar accessibility principle**

The audit will be read-only first. I will not change code until the audit shows what needs changing.

The main goal is to compare the build against the project documents. This prevents unfinished pieces from creating more unfinished pieces.

## 1. Canon And Copy

I will compare the build against:

- `copy-v1.md`
- `world-history-v1.md`
- `slotmap-motion-v1.md`
- `image-requirements-v1.md`
- `Clone-Website.md`

I will check:

- Names, roles, dates, prices, locations, and staff numbers.
- Founder history and the 1999 continuation story.
- The consent rule.
- The fictional company's science claims.
- The 14 FAQ items.
- The founder quote.
- The rule that the site never breaks the fiction.
- Banned words and voice rules.
- Any remaining `[STAMP ME]` or open decisions.

I already found one documentation issue. The hub still lists the stack and repo location as open, even though Astro and the new path are settled.

## 2. Route And Information Architecture

I will check every required route against the two-step realism rule.

Current routes include:

- Home
- Process
- Families
- FAQ
- Program
- Program 2028
- About
- Docs
- Docs consent
- Terms
- Waitlist
- No Decoys
- One family detail page

I will check:

- Every navigation link.
- Every CTA destination.
- Breadcrumbs or return paths.
- Dead ends at the correct depth.
- Missing pages.
- Incorrect page depth.
- Mobile navigation.
- Footer navigation.
- Whether `/docs/animal-research` is required.

The copy deck describes an Animal Research document, but the current route list does not include it. The audit will confirm whether that page is required or intentionally omitted.

## 3. Page Content Coverage

I will compare each page with its expected purpose.

I will check:

- Whether each page has enough content for its role.
- Whether `program` explains the price and roadmap fully.
- Whether `program/2028` contains enough detail.
- Whether `docs/consent` feels like a real institutional document.
- Whether `no-decoys` remains intentionally typographic.
- Whether `waitlist` has the correct fiction and legal boundaries.
- Whether `/about` carries the founder and company history correctly.
- Whether pages use the right copy rather than shortened substitutes.

This will identify content that is missing, too thin, misplaced, or inconsistent.

## 4. Visual Slot Coverage

I will build a slot matrix from `slotmap-motion-v1.md`.

Each slot will receive one status:

- Built.
- Present but incomplete.
- Waiting for an asset.
- Waiting for the logo.
- Not required.
- Missing from the build.
- Needs your decision.

I will check:

- Hero image and loop.
- Three history images.
- Six process images.
- Movies panel.
- Donor and continuation pairs.
- Family portraits.
- Founder portraits.
- Facility imagery.
- The OG card.
- Footer treatment.
- The V-1 through V-5 motion slots.

This also checks whether every image has an evidentiary purpose. Decorative images violate the project rule.

## 5. Image Generation Readiness

For every generated asset, I will check:

- Correct page and copy slot.
- Correct aspect ratio.
- Correct age and relationship.
- No adult doubles.
- No real-person likeness.
- No readable fake text.
- No watermarks.
- No baby anatomy problems.
- Correct warm editorial register.
- Consistent donor and continuation features.
- Correct present-day timeline.

The audit will separate missing assets from missing generation decisions. We can handle image generation while you finish the logo.

## 6. Visual Design And Layout

I will check the actual page against the intended design direction.

This includes:

- White Desert's editorial structure.
- Page pacing.
- Section order.
- Typography hierarchy.
- Grid alignment.
- Spacing rhythm.
- Dark surface levels.
- Amber and blue accent use.
- Editorial restraint.
- Button hierarchy.
- Quote treatment.
- Data presentation.
- Footer composition.
- Mobile layout.
- Tablet layout.
- Wide desktop layout.

I will also check whether any section looks like a generic template instead of a deliberate Codon Labs surface.

## 7. Smooth Scroll

The target is clear:

- The page keeps normal browser scroll behavior.
- Wheel and touch movement feel smooth.
- Space works.
- Arrow keys work.
- PageUp and PageDown work.
- Home and End work.
- Find in page works.
- Anchor links work.
- Browser back and forward restore position.
- Focus moves into view.
- Nested scroll areas still work.
- Mobile address-bar changes do not break the page.
- Reduced-motion users receive a direct native experience.

The audit will test these behaviors before selecting an implementation.

The smooth-scroll system must smooth the native scroll position. It must not depend on a transformed page wrapper that hides the real document position.

## 8. Custom Scrollbar

I will audit the scrollbar as a separate interface component.

I will check:

- It does not look like the browser default.
- It does not change design because of browser zoom.
- Its thumb maps correctly to the full document.
- The thumb stays visible enough to understand.
- It supports dragging.
- Track clicks behave predictably.
- It works on long and short pages.
- It does not cover content.
- It does not block native scrolling.
- It does not break keyboard navigation.
- It respects forced-colors settings.
- It hides or simplifies on touch devices when needed.
- It supports reduced motion.

The scrollbar should provide a custom visual layer. It should not replace the browser's document semantics.

I will not choose the final visual style without checking it against the site design first.

## 9. Accessibility

I will check:

- Page landmarks.
- Heading order.
- Image alternative text.
- Link names.
- Button names.
- Keyboard navigation.
- Focus visibility.
- Skip link behavior.
- Mobile menu access.
- Form labels.
- Form errors.
- Native disclosure behavior.
- Color contrast.
- Reduced motion.
- Screen reader announcements.
- Zoom to 200% and 400%.
- Text wrapping.
- Touch target size.

The custom scrollbar and smooth scroll must pass this section. They cannot become visual features that remove normal access.

## 10. Browser And Responsive Testing

I will test:

- Chromium desktop.
- Chromium mobile viewport.
- Firefox if available.
- Safari-specific risks through standards review.
- 375px width.
- 390px width.
- 768px width.
- 1024px width.
- 1440px width.
- Wide screens.

I will check:

- Horizontal overflow.
- Sticky navigation.
- Fixed effect layers.
- Text cropping.
- Image cropping.
- Form usability.
- Long FAQ behavior.
- Anchor positioning below the sticky header.

## 11. Performance And Code Health

I will check:

- First contentful paint.
- Largest contentful paint risks.
- Font loading.
- Image loading.
- Video loading.
- WebGL initialization.
- Effects on low-power devices.
- Layout shift.
- JavaScript amount.
- Build warnings.
- Type checking.
- Duplicate components.
- Hardcoded content.
- Unused assets.
- Error handling.

The effects will remain disabled until their required assets pass review.

## 12. SEO, Sharing, And Deployment

I will check:

- Page titles.
- Descriptions.
- Canonical URLs.
- Open Graph data.
- Twitter card data.
- Favicon states.
- Sitemap.
- `robots.txt`.
- 404 page.
- Structured data.
- Vercel static deployment.
- Repository naming.
- Production build output.

The OG card remains dependent on the final logo.

## Audit Output

I will produce one report with:

- A route-by-route checklist.
- A copy and canon discrepancy list.
- A visual slot matrix.
- An interaction and smooth-scroll test matrix.
- An accessibility issue list.
- A responsive test list.
- A deployment readiness list.
- A short list of decisions that require your approval.

Each issue will use one of these states:

- **Pass**
- **Missing**
- **Incomplete**
- **Conflict**
- **Blocked**
- **Needs Victor's decision**

I will ping you before decisions that can create dependent work. This includes smooth-scroll architecture, scrollbar behavior, unresolved copy stamps, page additions, asset scope changes, and logo integration.

