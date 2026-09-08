# Footer deep-dives — INDEX

Research pack for **Victor** (create→post / design craft): non-boring website footers that stay distinctive, text-safe, and old-laptop friendly.

## Documents

| # | File | Hook |
|---|------|------|
| **1** | [01-cursor-follow-mascot.md](./01-cursor-follow-mascot.md) | Blue fluffy bored-cute mascot; eyes follow cursor (Rive `lookX`/`lookY` vs CSS/JS MVP; skip Lottie; Spline/3D caveats) |
| **2** | [03-pen-line-architecture-strip.md](./03-pen-line-architecture-strip.md) | Pen/ink architectural elevation as wide SVG footer band; window rhythm; text-safe zone; SVGO |
| **3** | [02-oil-prompt-pipeline.md](./02-oil-prompt-pipeline.md) | Victor’s oil path: real photo/painting → conditioned oil stylization → 4:1–5:1 crop under links |

Filenames keep the original numbering (`01`, `03`, `02`); **execution order is not filename order.**

## Pick order (do this sequence)

### 1 → Cursor-follow mascot first

**Why first:** Fastest path to a **post-worthy interactive GIF**, lowest dependency on gen-GPU taste debates, clearest craft story (“it looks back”). CSS/JS MVP can ship in a day; Rive upgrades the ceiling without forcing 3D.

### 2 → Pen-line architecture strip second

**Why second:** Builds the **bespoke illustration** muscle (Attestor/Wellington lineage) as SVG — reusable, sharp, on-brand for architecture/city footers. Strong carousel (hand → vector → safe zone). Still lighter than oil iteration loops.

### 3 → Oil prompt pipeline third

**Why third:** Highest **iteration / QA** cost (structure must survive stylization; API Depth/Canny deprecation awareness; raster weight). Best once the posting cadence exists and you have a real facade reference ready. Complements — does not replace — the SVG line strip.

## Constraints reminder (all three)

- Distinctive, not AI-slop  
- SVG when the medium wants line; **raster for oil**  
- Protect text readability (safe zone)  
- Create→post demos first, not a live site ship  
- Avoid heavy 3D on old laptops (Bike Time = moodboard only)

## Shared reference shelf

- [Valley Adventures × Rive (Codrops)](https://tympanus.net/codrops/2025/05/12/integrating-rive-into-a-react-project-behind-the-scenes-of-valley-adventures/)  
- [DICH Fashion (Codrops)](https://tympanus.net/codrops/2025/06/02/dich-fashion-a-new-era-of-futuristic-fashion/)  
- [Bike Time 3D footer mascot (Awwwards)](https://www.awwwards.com/inspiration/3d-mascot-and-directions-in-footer-design-bike-time)  
- [Our West is Whiskey illustration footer](https://www.awwwards.com/inspiration/footer-with-parallax-and-illustration-our-west-is-whiskey)  
- [Sandy Shore underground footer](https://www.awwwards.com/inspiration/underground-footer-sandy-shore)  
- [Jitesh Patel — Attestor](https://jiteshpatel.co.uk/portfolio/attestor-capitol-website/) · [Wellington Pub](https://jiteshpatel.co.uk/portfolio/the-wellington-pub-illustration/)  
- [BFL FLUX.1 Tools](https://bfl.ai/blog/24-11-21-tools)

---

*Generated for craft research — expand beyond the technique map; each deep-dive has Goal, How it works, Pipeline, Prompts, Sources, Post angle, Effort/pitfalls, Next steps.*
