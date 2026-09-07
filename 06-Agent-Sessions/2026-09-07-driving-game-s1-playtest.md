# Driving Game Stage 1 — Victor playtest (2026-09-07 ~01:40 WAT)

Ticket: DG-S1 · Owner: Schipper · Status after intake: Doing (fixes)

## What worked
- Initial facing toward the track (before R)
- Camera follow feel
- Suspension read
- Grass/chip particles on crash
- Overall handling "seems good" (body motion separate)

## Must-fix (this pass)
1. **Race timer** — currently tracks whole session (~26 min while game open), not a race/lap. Top-left white; easy to miss, but main bug is session vs race.
2. **Spawn / curb height** — asphalt entrance is a square step above the green base. Start has front wheels on asphalt, rear on green; throttle bumps over the brick then smooth.
3. **R reset facing** — turns car opposite way in; front tires on green, rear on asphalt. No reverse → smash or long way around to get back on track.
4. **No reverse + idle creep** — can slow but not reverse; at rest car drifts back ~1 km/h on its own.
5. **Rejoin track after lap** — asphalt higher than green; have to crash/climb to get back on.
6. **Off-world fall** — leave the green base → free-fall under gravity, speed climbed to ~240 before respawn onto green. Needs sensible catch/respawn (and not runaway speed).

## Defer (Victor OK to leave)
- Crash reaction weirdness (e.g. ~14 km/h barrier hits feel explosive). Complex; slide until necessary.
- Body "springing forward" motion feel — note for later unless quick win with spawn work.

## Notes
- Green base driveable; top speed on green felt very low (~5) before flying off edge in his words.
- Feel gate for Stage 2 still Victor's after this fix pass.
