# Driving Game Stage 1 — crash / scrape (2026-09-07 ~03:32 WAT)

Ticket: DG-S1 · Was deferred; Victor now wants it fixed before feel gate.

## Must fix
1. **Wall scrape while moving forward** — instead of light deflection, full rebound / movement interrupt. Kills speed and lap time. Needs scrape → glance, not stop-and-bounce.
2. **Low + high speed crashes** — reactions feel hilarious / wrong at both ends; tone down explosive responses especially at low speed.
3. **On top of barricade** — car cannot rest on non-road surface; flickers until all 4 tires on road. Allow stable contact or gentle slide-off, no flicker loop.
4. **On side** — weird shaking while tipped; stabilize or auto-rescue without seizure animation.
5. **Clean start** — Victor restarted 20+ times to get a clean run with `000` time. Ensure spawn/R/start leaves timer at 00:00.00 until first intentional move, no accidental scrape at spawn that ruins the run.

## Context
Airborne/jolt + timer hundredths pass (e6e4e7b) was in Review; this cuts in as Doing.


## Status
Done (Review). Crash/scrape glance + clean start landed; headless crash_s1_fix PASS. Kept e6e4e7b feel work.

## Status
Done (Review). Crash/scrape glance + clean start landed; headless crash_s1_fix PASS. Kept e6e4e7b feel work.
