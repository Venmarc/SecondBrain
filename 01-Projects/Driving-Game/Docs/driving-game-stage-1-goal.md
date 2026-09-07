# Driving Game: Stage 1 Goal

This file is the whole job for the building agent. The two reference documents beside it are background, read on demand, never rewritten. The human, Victor, tests every finished build.

## The game in one paragraph

A bright, low-poly PC driving game about mastering three very different cars across asphalt, dirt, and sand. Real-feeling physics: grip, weight transfer, momentum, gears. A calm, clean garage life on one side; rough, dusty racing on the other. Built in Godot as a native Linux desktop application, played with keyboard or a standard controller.

## Stage 1 goal statement

One car, one asphalt route, one complete driving experience that already feels like a car and not like a camera sliding on rails. Everything else in the reference documents comes later.

## In scope

- Godot 4 project that runs on Linux from one command, version controlled from the first commit.
- Input: keyboard and standard controller both work, feeding one continuous control model. Steering works as a held request: a short tap is a small angle change, holding builds toward full lock, releasing recenters smoothly. Throttle and brake are continuous requests, never instant full power. A phone app acting as a standard controller needs no special handling.
- One vehicle: the compact. A fictional everyday car with front-wheel drive, light weight, predictable handling, and a tendency to run wide when pushed too hard.
- One route: asphalt only. Long straights to open and close, a mountain-pass-inspired middle with long shallow bends, hairpins, and elevation. Barriers readable at speed.
- Handling model: per-wheel grip, weight transfer under braking and throttle, and honest momentum. Entering a corner above the limit runs wide; braking loads the front tires and makes the front grip better; throttle loads the rear. Long shallow bends hold at high speed; hairpins demand slowing down.
- Transmission: automatic only, shifting sensibly, lower gears returning more pull uphill.
- ABS: always active, no interface for it yet.
- Camera: third-person chase with controlled lag, plus close, medium, and far distance options.
- Collisions: momentum loss, small block-chip particles, a slight camera shake. No deformation.
- Reset: manual reset to the last checkpoint with a time penalty; automatic rescue when flipped or stuck.
- HUD: speed, gear, race timer in the upper left, current surface indicator. Nothing else.

## Not in this stage

Do not build any of these, even though the reference documents mention them:

- Dirt, sand, and surface transitions
- Tire families and any setup screen
- Manual and assisted manual transmission
- Traction control and stability control toggles and their indicators
- Garage, onboarding, tutorials, tooltips
- Clean-turn grading, skill points, medals, ghosts, results screens
- Mud, dust buildup, night, weather, full sound design
- Torque split displays, drivetrain switching, the other two cars
- AI opponents, multiplayer

## Done when

Every item needs evidence: a command and its output, a screenshot, or a commit reference. Claims without evidence do not count.

1. The project runs from one command on Linux and survives a full route drive without errors.
2. Both keyboard and a standard controller can complete the route through the same control model.
3. Short taps produce small steering changes, held input builds, release recenters, observable at low and high speed.
4. One sharp corner, two outcomes: entering too fast runs wide or ends in the barrier; braking first lets the car turn through.
5. Long shallow bends hold at high speed without the car snapping or sliding on clean asphalt.
6. Uphill sections cost speed and downshifts return more pull.
7. Barrier contact scrubs speed, spawns block chips, shakes the camera slightly, and the car keeps working.
8. Reset works, adds a time penalty, and returns the car upright to the last checkpoint.
9. The HUD shows only speed, gear, timer, and surface.
10. Stop here. Victor drives the build and judges whether the car feels right. That judgment gates Stage 2 and belongs to the human, not the agent.

## Working rules

- Read this file completely before starting. Consult the reference documents only when a term needs background.
- Never edit the reference documents. They are read-only.
- All code, comments, filenames, and on-screen text use normal product language for a shipping game.
- After each work session, append a short entry to build-log.md in the project: what was built, commands run, what passed, what failed. Honest failures are welcome; silent ones are not.
- When every done item has evidence, stop and report. Do not start anything from the not-in-this-stage list.

## Reference anchors

Stable decision numbers in the archive document, valid even as that file grows:

- 79, 80: engine, controller and keyboard support
- 30, 31, 34: input behavior
- 32: weight transfer
- 21: the compact car identity
- 24: route inspiration
- 9: camera behavior
- 37, 38: collisions and reset
- 27: HUD limits
- 89: default configuration
- 48: the larger first-playable goal this stage feeds into

