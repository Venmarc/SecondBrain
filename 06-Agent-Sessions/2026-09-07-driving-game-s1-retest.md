# Driving Game Stage 1 — Victor retest (2026-09-07 ~03:13 WAT)

Ticket: DG-S1 · After fix pass 0742df7

## Passed
- Easier to get onto the track (apron/rejoin)
- Car behaves like FWD
- Reverse is hard to control (desired)
- Lap ~43s (feels ~37s possible without fly/glide issues)

## New fixes
1. **Timer display** — show hundredths (e.g. 43.18), not whole seconds only.
2. **Airborne on early hills / turns** — first hilly ascent first turn: enter too fast → wheels leave asphalt briefly, can’t turn in quickly. See screenshot 1 (crest into left bend with orange barriers).
3. **Fly/glide then jolt** — beginning section: enter fast → glide; when grip returns while correcting off the wall → jolt. See screenshot 2 (early uphill with segment seams).

Milliseconds of airtime matter because they cost the corner.

## Still deferred
- Low-speed crash reaction weirdness

## Feel note
Victor controlled both well; wants grip consistency at speed over crests so Stage 1 feel gate can clear.
