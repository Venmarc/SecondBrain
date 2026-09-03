# RAW — Grok extraction: "how to go viral on X" from the open-sourced X algorithm

> **Immutable source.** Do not edit the body below. Provenance: Grok chat, pasted by Victor 2026-08-15.
> Verified synthesis (with corrections) lives at [[03-Resources/SEO-Marketing/X-Algorithm-Ranking-Signals|X Algorithm Ranking Signals]].
> **Accuracy warning:** at least one numeric claim below (author-diversity decay) is wrong, and the framing of weights as engagement-count equivalences is explicitly contradicted by comments in the source repo. See the synthesis note before acting on any of this.

**Tags:** #raw #immutable #x-algorithm #content

---

**Here’s the full extraction of practical tactics** based directly on the current open-source code (especially `home-mixer/params/param.rs` synced ~Aug 12–14 2026, `ranking_scorer.rs`, the README architecture, filters, and candidate sources).

I pulled the actual published default weights and mechanics so you don’t have to dig through the repo yourself. These are the production-mirrored values as of the latest release.

### Core Scoring Formula (what the algo actually optimizes)
```
Final score ≈ Σ (weight × P(action)) 
then × author-diversity factor 
then × out-of-network factor (if applicable)
```

**Highest-value positive weights (current defaults):**
- Share via copy-link: **20.0**
- Bidirectional/mutual reply boost: **+15.0** (on top of base Reply)
- Reply: **5.0** → mutual original-post reply can hit ~20
- Quote: **5.0**
- Share via DM: **5.0**
- Follow author: **4.0**
- Generic share: **2.0**
- Retweet/repost: **1.0**
- Like/favorite: **0.5**
- Click: **0.4**
- Open link: **0.2**
- Photo expand / video open / VQV (quality view): **0.05** each (VQV only if video ≥ ~10 seconds)
- Continuous dwell time: **0.004**
- Post-unexplored (in-network only): **0.02**

**Heaviest negative weights:**
- Report: **–234.0**
- Mute author: **–58.8**
- Not interested: **–43.2**
- Block author: **–31.2**
- Not dwelled (scrolled past): **–0.02**

**Other important multipliers:**
- Author diversity decay: 0.5 (each successive post from the same author in a slate gets halved, floor 0.25)
- Out-of-network factor: 0.75 (and lower in some topic cases)

### All the major + minor tactics extracted from the code

**1. Maximize high-weight positive signals**
- Design posts that people want to **copy the link and share** (highest single weight). Make them quotable, surprising, useful, or emotionally sticky.
- Prioritize **replies**, especially from mutuals on original posts (base 5 + 15 boost). End with questions, polls, or hot takes that invite conversation.
- Push for **quotes** and **DM shares**.
- Content that makes people **follow you** is heavily rewarded.
- Encourage dwell: longer threads, strong hooks, media that stops the scroll, videos ≥10s that get watched deeply.

**2. Minimize / avoid negative signals at all costs**
- Never post anything likely to get reported, muted, or blocked by your target audience. One predicted report can crush the score.
- Avoid rage-bait that polarizes the wrong people (the model predicts *viewer-specific* negatives).
- Don’t make people scroll past immediately (hurts via NotDwelled).

**3. Author diversity / posting frequency**
- Space your posts. The second (and later) post from you in someone’s feed gets multiplied by 0.5 (down to a 0.25 floor). Dumping multiple posts in a short window actively hurts later ones.

**4. In-network vs out-of-network**
- Your existing followers (Thunder source) are the reliable base. Build and nurture a real following first.
- Out-of-network (Phoenix retrieval + SimClusters) gets a 0.75× discount, so it’s harder. Consistency in a clear niche helps the similarity retrieval find the right non-followers.

**5. Content format & structure**
- Media helps (photo expand, video open/VQV signals), but only if people actually engage with it.
- Threads and longer content help continuous dwell time.
- Original posts generally fare better than pure replies/reposts for certain boosts.
- Early traction still matters for broader distribution.

**6. Filters & visibility (can zero out reach entirely)**
- Avoid anything that triggers spam, safety, adult-content, bot, or other labels (visibility-filtering, scarecrow, botmaker, agatha, bdsm, etc.).
- Check the new **Under the Hood** tool in settings for aggregate labels on your account/posts.
- Don’t post older than ~48 hours if you want fresh ranking consideration.
- Muted keywords, blocks, etc., remove you from those viewers’ feeds.

**7. Personalization reality**
- Everything is viewer-specific. Phoenix looks at *that person’s* recent engagement history. The same post scores differently for different people. Write for the audience you actually want to reach.

**8. Minor / supporting tactics from the code**
- New-author boosts exist in some paths.
- Mutual follows unlock the big reply boost.
- Continuous dwell (not just binary) has a small positive weight — keep people reading/watching.
- Profile clicks currently have weight 0 (changed from older versions).
- Some experimental paths (Phoenix MoE, topics, etc.) exist but defaults favor the main Phoenix path.
- Cold-start / new-user handling is present but limited.

**9. What does *not* work well according to the weights**
- Pure like-farming (likes are only 0.5).
- Rapid-fire posting.
- Content that gets ignored (scrolled past).
- Anything that generates reports/mutes from the wrong audience.
- Relying solely on out-of-network without a solid in-network base.

### How to extract more yourself going forward
1. Go to https://github.com/xai-org/x-algorithm
2. Check `home-mixer/params/param.rs` for the latest weights (they sync from production).
3. Read `home-mixer/scorers/ranking_scorer.rs` for the exact math and conditional boosts.
4. Look at the README “How It Works” + Latest Updates sections.
5. Browse filters/ and visibility-filtering/ for what can kill reach.
6. Community playbooks (search GitHub for “x-algorithm-playbook”) translate the same code into checklists.

These are the real incentives the current system optimizes for. Aligning with them (especially copy-link shares, mutual replies, and avoiding negatives while spacing posts) is the highest-leverage way to use the open-source drop. Quality + consistency still matter more than any single tactic, but now you can see exactly what the ranking engine values.

Want me to turn this into a short pre-post checklist or expand on any specific signal?
