# X Algorithm Ranking Signals (verified against source)

> **One-line Summary**: What the open-sourced X For You ranking code actually rewards — verified line-by-line against `home-mixer` source on 2026-08-15, with three material corrections to the Grok extraction it came from.

**Status:** Weights verified against published defaults. Treat as *directional incentives*, not a viral formula.
**Source repo:** github.com/xai-org/x-algorithm (Apache-2.0, first published ~2026-08-13, HEAD checked 2026-08-14)
**Raw source:** [[raw/2026-08-15-grok-x-algorithm-viral-tactics|Grok extraction (immutable)]]
**Tags:** #x-algorithm #content #reference #verified

---

## 0. Read this before using any number below

The repo authors wrote a comment block in `home-mixer/params/param.rs` specifically to kill the misreading that most "X algorithm hacks" threads are built on:

> Each weight multiplies the **predicted probability** of that action — not raw engagement counts. "One report cancels 468 likes" is explicitly called out as incorrect.

Two consequences that change the strategy completely:

1. **A weight is not a payout.** Score contribution is `weight × P(action)`. Copy-link share has weight 20 but a very low base probability; likes have weight 0.5 and a high one. The biggest *product* wins, not the biggest weight. Chasing the 20 blindly is a misread.
2. **Report's –234 is a rarity correction, not a doom multiplier.** The repo notes a report's baseline probability is >1000× lower than a like's, so it's weighted up just to affect ranking at all. The repo also explicitly states mass block/report brigading does **not** meaningfully suppress reach: predictions are personalized (bad actors mostly affect recommendations for users similar to them), and engagement only counts when the post was served in Home Timeline — posts reached by direct link or group-chat coordination have no ranking impact.

---

## 1. Verified default weights

All confirmed present in `home-mixer/params/param.rs` at the checked commit. These are *defaults in published code* — they are runtime-tunable params, so live production values can differ.

| Action | Weight | Note |
|---|---|---|
| Share via copy link | **20.0** | highest single weight |
| Reply | **5.0** | → 20.0 with mutual boost, see §3 |
| Bidirectional-follow reply boost | **+15.0** | additive, conditional |
| Quote | **5.0** | |
| Share via DM | **5.0** | |
| Follow author | **4.0** | |
| Generic share | **2.0** | |
| Retweet / repost | **1.0** | |
| Like / favorite | **0.5** | |
| Click | **0.4** | |
| Open link | **0.2** | |
| Photo expand | **0.05** | |
| Video open | **0.05** | |
| VQV (quality video view) | **0.05** | requires video ≥ 10s (`MinVideoDurationMs` = 10_000) |
| Post unexplored | **0.02** | in-network only by default |
| Continuous dwell time | **0.004** | |
| Binary dwell | **0.0** | **inactive by default** |
| Profile click | **0.0** | **inactive by default** |
| Bidirectional-follow dwell boost | **0.0** | **inactive by default** |
| Not dwelled | **–0.02** | |
| Block author | **–31.2** | |
| Not interested | **–43.2** | |
| Mute author | **–58.8** | |
| Report | **–234.0** | see §0 |

**Multipliers:** out-of-network `0.75`, topic out-of-network `0.5`, author-diversity decay `0.5`, author-diversity floor `0.25`.

The scoring pipeline also adds a negative-scores offset term, so the real formula is not a clean `Σ(w × P)` — the raw extraction's formula is a simplification.

---

## 2. CORRECTION — author diversity is not "your 2nd post gets halved"

The extraction claims each successive post from the same author is *halved* (0.5, then floor 0.25), and frames this as a **posting-frequency** penalty ("space your posts", "rapid-fire posting hurts").

Both halves of that are wrong.

**The actual formula** in `ranking_scorer.rs`:

```rust
fn diversity_multiplier(decay_factor: f64, floor: f64, exponent: f64) -> f64 {
    (1.0 - floor) * decay_factor.powf(exponent) + floor
}
```

With defaults (`decay 0.5`, `floor 0.25`) that gives:

| Occurrence (k) | Multiplier |
|---|---|
| 1st | 1.000 |
| 2nd | **0.625** |
| 3rd | 0.4375 |
| 4th | 0.344 |
| 5th | 0.297 |
| → | asymptote 0.25 |

So the second post is discounted **~37%, not 50%**. The floor is approached asymptotically, never hit.

**The bigger error is conceptual.** `k` is the author's occurrence index within a single **score-ordered candidate slate** — `apply_author_diversity` sorts by pre-diversity score and decays repeats inside that one ranking pass. It is a *per-request slate diversity* rule, not a time-based posting-cadence penalty. There is no "rapid-fire posting" penalty in this code. Spacing posts may reduce how often several of your posts compete in the same slate, but the extraction's stated mechanism is not what the parameter does.

---

## 3. CORRECTION — what actually unlocks the +15 reply boost

`bidirectional_boost_eligible` requires **all three**:

```rust
candidate.in_reply_to_tweet_id.is_none()      // must be an ORIGINAL post
    && candidate.retweeted_tweet_id.is_none() // not a retweet
    && candidate.is_mutual_follow_author == Some(true) // viewer ↔ author mutual follow
```

Correct reading: when **your original post** is shown to someone who **mutually follows you**, the predicted-reply weight becomes `5 + 15 = 20`. The boost is a property of the post/viewer pair, not something earned by replying to people. Replies and retweets you post are structurally excluded. The parallel dwell boost defaults to `0.0`, so it currently does nothing.

---

## 4. CORRECTION — the 48-hour rule

The extraction says "don't post older than ~48 hours," which is garbled. The real mechanic is an `AgeFilter` in the candidate pipeline that removes **posts older than 48 hours** from consideration, alongside filters for cross-source duplicates and the viewer's own posts.

Practical meaning: a post's For You retrieval window is roughly 48 hours from publication. Nothing you do makes an old post re-enter the feed.

---

## 5. Unverified / unsupported claims

Flagged so they don't harden into fact:

- **"Early traction still matters for broader distribution"** — no support found in the files checked. Plausible via engagement-history features, but not verified.
- **"New-author boosts exist in some paths"** — partially supported: `scorers/author_cold_start.rs` exists, and an out-of-network factor override for new users exists. But the new-user override is **viewer-side**, not author-side. Do not conflate them.
- **"Under the Hood tool in settings"** — an `under-the-hood/` directory exists in the repo; the user-facing surface wasn't confirmed.
- Community "x-algorithm-playbook" repos — unvetted third parties. Prefer the source.

---

## 6. What this actually implies for Victor

Filtered through §0, most of the "tactics" collapse into a short list:

1. **Optimize for saveable/sendable, not likeable.** Copy-link share (20), DM share (5) and quote (5) dominate the weight table, and they're the actions a genuinely useful build-log or explainer earns. This aligns with [[02-Areas/Content-Creation/Content-Creation|development publishing]] rather than working against it.
2. **Mutuals are structural leverage.** The single largest conditional boost only exists for original posts shown to mutual follows. A small real network beats a large one-way follower count.
3. **Out-of-network costs 25% by default.** In-network reach is the reliable base; niche consistency is what makes similarity retrieval work at all.
4. **Don't chase the –234.** Avoid content your target audience would report or mute — but the brigading fear and the "one report kills you" framing are both explicitly wrong per the repo.
5. **48-hour window.** Post, then let it go.
6. **The whole thing is viewer-specific.** The same post genuinely scores differently per reader, so "write for the audience you want" is the only universally valid instruction here.

**Honest limit:** these are published *defaults*, tunable at runtime, from a snapshot days old. They tell you the shape of the incentives, not a reproducible growth procedure. Nothing here substitutes for having something worth sharing.

---

## Related

- [[raw/2026-08-15-grok-x-algorithm-viral-tactics|Raw Grok extraction (immutable source)]]
- [[02-Areas/Content-Creation/Content-Creation|Content Creation]] — publishing cadence and weekly minimum
- [[03-Resources/Vault-Ops/Better-Me-Better-Vault|Better Me, Better Vault]] — publishing loop
