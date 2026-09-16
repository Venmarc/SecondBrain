---
title: Active Particle Environments
date: 2026-09-13
tags:
  - inbox
  - design
  - particles
  - footer
  - motion
---

# Active Particle Environments

> Quick capture of Victor's bigger-picture idea, expanded a lil. Process later.

## The idea (raw)

The ACQUIRE handshake footer is step one. If a particle system can hold a structure while wind blows through it (dudes shaking hands, particles flowing across the screen but keeping their general structure — just like a windy desert), then the same engine can make **whole environments alive**:

- **Trees sway** — branch-level skeletons bending under a wind field
- **People work** — looping work cycles (hammering, typing, carrying) as sampled animation frames
- **Birds fly** — small flocks crossing the scene on flight-path bands
- **Billboard pictures move** — animated masks on a wall in the scene
- So many possibilities

## Why this works (the unifying mechanic)

Every scene in this family decomposes into three layers. Same engine, different inputs:

1. **Structure mask** — *what you see*. A silhouette, glyph, or animation frame sampled into particle home-points (the handshake pair did this; a tree, a worker mid-swing, a bird does it identically).
2. **Force field** — *how it moves*. Wind profiles, gravity, cursor-as-gust, scroll parallax, audio-reactive turbulence. The force perturbs particles but never breaks the mask: `spring-to-home + force offset`, so structure always relaxes back (antigravity.google's "homes + relaxation, not attraction" rule).
3. **Churn** — *the medium replaces itself*. Per-particle life cycle: spawn, drift, die, respawn. The picture becomes a standing wave, like a dune: sand moves, dune holds shape.

Add wind to the handshake and you have proof the concept survives its first force. Add a second force (cursor) and a second mask (tree) and it's an environment.

## Scene menu (candidates for first prototypes)

| Scene | Mask source | Force profile | Difficulty |
|---|---|---|---|
| Windy handshake (current) | generated silhouette pair | lateral wind + gusts | done / tuning |
| Swaying tree | generated tree silhouette, branch segmentation | height-weighted wind (canopy > trunk) | medium |
| Working figure loop | sampled frames of a work cycle | gravity + tool-impact pulses | medium-high (needs frame sync) |
| Bird flock band | tiny bird glyph, per-bird phase offset | flight path + flock cohesion (boids-lite) | low-medium |
| Animated billboard | text/logo frames on a wall region | frame-swap on hover or timer | low |

## Force vocabulary to steal from

- **Gust envelope**: slow `sin²` surges + fast flutter layered = believable wind without noise
- **Saltation**: grains stream in a band just above the crest/surface line (real desert physics, reads instantly as "windy")
- **Cursor-as-wind**: pointer velocity becomes a local gust source (matches the footer hover philosophy; see Effects_Glossary antigravity entries)
- **Directional lean with variance**: per-particle fixed lean magnitude = structure streams downwind without dissolving
- **Scanty skiff layer**: sparse fast streaks OVER a stable picture — wind you can see without losing the subject

## Where it connects in the vault

- [[03-Resources/Tools/Effects_Glossary|Effects_Glossary]] — antigravity GPGPU swarm + morph-field entries (the mechanics reference)
- [[03-Resources/Design/Web-Garnish/09-Particle-Footer|09-Particle-Footer]] — the working handshake build (wind layer being added now)
- [[03-Resources/Design/Web-Garnish/07-Build-Runbook|07-Build-Runbook]] — motion-layer rule (off-viewport pause, reduced-motion death, screenshot test)
- FOOTER-1 mascot track (06-Agent-Sessions) — the cursor-reactive philosophy, different family

## Open decisions (later, not now)

1. First environment prototype after the footer: tree sway vs bird flock (bird is cheaper, tree is more impressive).
2. Does the cursor stay a "reveal/morph" trigger, or become a wind source too? (Could be both: hover reveals, movement blows.)
3. Canvas 2D ceiling: fine to ~5k particles per scene layer; past that, graduate to the GPGPU engine.
4. Where this lands: Web-Garnish collection extension, or its own "Living Scenes" project?

**Tags:** #inbox #design #particles #footer #motion
