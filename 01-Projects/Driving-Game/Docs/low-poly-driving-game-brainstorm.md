# Low-Poly Driving Game Brainstorm

## Original brainstorm

The initial concept is a low-quality or low-resource PC driving game with real-feeling vehicle physics and gravity. It is inspired by the surface and driving ideas in Sneaky Sasquatch, the drift feel of Blur, and the vehicle customization of games such as NFS.

### Tires and surfaces

- Asphalt, dirt, sand, water crossings, hills, and other mixed terrain.
- Off-road tires perform better on dirt and have no major issues on normal roads, but are slower than stock tires on asphalt.
- Racing tires are faster on asphalt and weaker off-road.
- Sticky tires have the best asphalt grip but perform badly off-road.
- Tire choice should create tradeoffs, not a universally correct option.
- Engine power and upgrades should make cars more capable.

### Handling and drifting

- No canned drift triggered merely by tapping brake and turning.
- A car can drift at high speed through a long, shallow corner, but cannot take a sharp turn at extreme speed without crashing.
- The player must slow down appropriately, choose a line, manage entry and exit speed, and understand how car behavior affects the corner.
- Drifting should arise from momentum, tire grip, braking, throttle, steering, and weight transfer.
- At very low speed, drifting should not happen under normal traction conditions because there is insufficient momentum. A low-traction car or surface can still skid at lower speeds.
- Drifting is intended as a useful corner-management technique, especially in mixed-surface or rally-style driving, not an automatic fastest strategy.

### Vehicle body and visuals

- Blocky vehicle bodies, less blocky than Minecraft.
- Cars should resemble real car types with recognizable details, but without smooth, resource-heavy modeling.
- Collisions show small block-like chips or particles; no deformable vehicle bodies.
- Possible visual parts include bumper rails, spoilers, roof racks, and body kits.
- Car shape should not affect aerodynamics in the initial concept; aerodynamic properties can be represented as stats or hidden simulation values.

### Engine, transmission, and suspension

- Engine power, torque, upgrades, hills, terrain, and gears should affect performance.
- Steep uphill sections require lower gears for useful power.
- Manual and automatic transmission modes are desired.
- Automatic mode should shift gears automatically.
- Manual mode allows the player to shift, but slowing down automatically brings the gears down to match speed. This avoids an annoying gear state where the car remains in an obviously inappropriate gear.
- Braking applies to all wheels and includes ABS.
- Front-only braking and intentional front flips are excluded from the initial scope.
- Suspension should matter, especially on potholes and rough terrain.
- Possible suspension categories include street, sport, and off-road.
- Wheel size may affect clearance, grip, or getting stuck, but this may be deferred if it adds too much complexity.
- Camber, detailed suspension geometry, and advanced aerodynamic modeling are not yet committed.

### World and race environments

- Roads can be asphalt, dirt, sand, submerged or water-crossing sections, and mixed terrain.
- Potential themes include desert, beaches, temples, trees, volcanoes, and ice mountains.
- World content should come later; the handling prototype must prove itself first.

### Controls

- Tilt or tap/press input are possible considerations.
- Auto acceleration and manual acceleration are possible options.
- Brake/reverse input should slow the car and allow reversing.
- Manual or automatic transmission should be selectable.
- Manual gear timing as a specialized drag-racing mechanic is not currently a priority.

### Excluded for now

- Vehicle destruction and deformable damage.
- Canned drift activation.
- Fully detailed simulation of every real-world vehicle variable.
- Building many biomes before the core handling is validated.

## Decisions from Round 1

1. **Primary fantasy:** A combination of mastering the car and pulling off exciting runs. The player should feel that improvement comes from learning vehicle behavior, not merely finding a menu configuration.
2. **Vehicle roster:** There is no single best setup or car. Different cars and tunes should be better suited to different races and surfaces. A player with one car should be able to tune it for a race, while a specialized or naturally better-fitting car may still outperform it.
3. **Physics target:** Simcade. Physics should be believable, legible, and skill-based, without becoming a full simulator.
4. **Driving identity:** Controlled power slides plus rally-style mixed-surface driving. Grip driving, rotation, and drifting should all have situational value.
5. **Prototype scope:** Three cars with different baseline setups and three test tracks covering asphalt, dirt, and mixed surface. Both manual and automatic transmission are desired.
6. **Prototype validation:** First prove that the car feels meaningfully different across surfaces and that braking, steering, throttle, momentum, weight transfer, hills, gears, and controlled sliding produce understandable cause and effect.

## Important interpretation

The user's B and C drift choices are compatible, but they describe different layers:

- **Controlled power slides** describe the technique: using throttle, braking, steering, and weight transfer to rotate and slide the car.
- **Rally-style mixed-surface driving** describes the context and driving philosophy: using that technique across changing surfaces where grip levels and optimal lines differ.

The game should not declare drifting universally fastest. It should make sliding useful when the surface, corner shape, car drivetrain, and intended line justify it.

## Round 2 decisions

7. **Car identities:** Three archetype cars with distinct handling identities. Recommended initial roster: lightweight FWD hatchback, powerful RWD coupe, and stable AWD rally car. The cars should teach different handling behaviors, not merely have different speed and grip stats.
8. **PC controls:** Controller-first analog steering, with keyboard support. No mobile version in the initial concept. A phone may be used as a temporary controller for development/testing, but mobile controls are not a target. Steering wheels are not a target.
9. **Camera:** Third-person chase camera in the prototype, with close, medium, and far distance options. The camera should have controlled lag during acceleration and sliding. First-person view can be added later.
10. **Tuning progression:** Start with fixed baseline vehicle setups or simple readable preset packages. Do not expose granular camber, tire pressure, differential, brake balance, or aerodynamic settings early. Later tuning can begin with tire type, suspension type, gear profile, and a power upgrade, then expand only if the handling justifies it.
11. **Race evaluation:** Eventually include pure time trials, clean-driving rewards, driving objectives, and multiple event types. Early evaluation should reward clean turns, clean runs, sector performance, and time without making drift distance mandatory. The game can include realistic limits on excessive drifting, such as loss of control, speed loss, or a slide ending when the car exceeds recoverable slip, rather than arbitrary canned stoppage.
12. **Assists:** Selectable assists, never invisible correction. Candidate assists include ABS, traction control, stability control, keyboard steering assist, racing line, automatic transmission, and assisted manual transmission. Onboarding can require or strongly encourage learning without assists, and the player can choose when to disable them after onboarding or before a race.

## Round 3 decisions

13. **Drivetrain direction:** The long-term design may include player-selectable drive modes, but the prototype should use distinct drivetrain archetypes with their behavior made visible and explainable. No permanent AWD as the only option. No automatic torque-split system in the prototype unless it proves simple and useful.
14. **AWD and torque split:** Torque split is relevant to AWD or other multi-axle drive systems. It does not give a non-AWD car front/rear traction. A two-wheel-drive car may later use a limited-slip differential to distribute torque between its two driven wheels. The game should explain these concepts with clickable question-mark tooltips. A future AWD car may show front/rear torque distribution on the HUD if the feature materially helps the player understand traction.
15. **Transmission modes:** The game should eventually support automatic transmission, assisted manual transmission where the player controls upshifts and the system safely downshifts, and full manual sequential transmission where the player controls both upshifts and downshifts. Full manual should not simulate a clutch unless later testing proves it adds value. Bad gear selection may cause over-revving, engine braking, instability, or loss of control, but should not freeze the camera or create an arbitrary punishment animation.
16. **Tires:** No tire durability, heat, or wear in the initial design. Tire changes select tire families rather than replacing worn tires. The prototype uses two core properties: asphalt grip and loose-surface grip. Sticky tires should regain grip quickly after a short skid and be difficult to hold in a drift. Racing tires should be fast and capable on asphalt, with more controllable slip than sticky tires. Off-road tires should favor dirt and loose terrain. Stock tires should be balanced.
17. **Drift initiation:** Use braking while turning, throttle while turning, and surface transitions. Do not add a separate drift mode. Drifting emerges from speed, lateral force, grip, weight transfer, throttle/braking, steering, and drivetrain.
18. **Clean-turn scoring:** Use visible grades plus coaching feedback. Score appropriate entry speed, stable line, low steering correction, no collision, controlled rotation, and strong exit speed. Slow and overly defensive driving should not receive a perfect grade. Skill or experience gains can appear in a top-right HUD area inspired by combo/score feedback in games such as Alto's Odyssey.
19. **Early competition:** No AI opponents in the first driving prototype. Use time trials, personal ghosts, and target or optimal-run ghosts. Opponents can be introduced in later levels after the handling and track systems are proven. Multiplayer is a later expansion, not a prototype requirement.
20. **Future-proofing:** Prototype decisions should keep room for a larger game. Systems should be architected so additional drivetrains, drive modes, torque distribution, more detailed tuning, opponent types, multiplayer, first-person camera, and more event classes can be added later without pretending they belong in the first build.

## Documentation rule: prototype versus growth path

A simplified prototype decision must not erase the intended full-game feature. From this point onward, decisions are kept in two explicit layers:

- **Prototype commitment:** What must exist to test the current game properly.
- **Growth path:** Deferred systems and content that remain part of the intended game direction, but are not allowed to bloat the first build.

## Round 4 decisions

21. **Prototype car silhouettes:** Use three fictional vehicles whose proportions and roles evoke recognizable categories without copying manufacturers, names, badges, or exact designs:
   - A Corolla-inspired compact hatch/sedan silhouette with FWD, low weight, predictable handling, and power-on understeer.
   - A Viper-inspired fast-looking long-hood coupe silhouette with RWD, high torque, strong asphalt performance, and demanding throttle control.
   - A Toyota Gazoo rally-raid-inspired off-road buggy silhouette with AWD, strong loose-surface traction, heavier or less nimble road behavior, and substantial suspension travel.
22. **AWD prototype commitment:** Begin with a fixed, understandable AWD torque distribution. Add simplified variable front/rear distribution only after the baseline handling works and only if testing shows a meaningful improvement. Do not add a technical-looking torque meter unless its information changes player decisions.
23. **Surface model:** Prototype uses asphalt, dirt/gravel, and sand. Asphalt provides precise high grip; dirt/gravel provides lower grip, longer braking, and controllable lateral movement; sand adds low grip plus rolling resistance and acceleration loss. Water and mud remain on the growth path.
24. **Prototype test environment:** Combine diagnostic layouts with recognizable real-road inspiration:
   - An asphalt route beginning and ending with long straights, with a middle mountain section inspired by Furka Pass turns. It must test acceleration, braking, long bends, hairpins, elevation, and gearing.
   - A dirt rally stage inspired by real rally roads, with modified layout and scenery. It must test loose-surface braking, rotation, recovery, elevation, and uneven terrain.
   - A mixed-surface route alternating asphalt, dirt/gravel, and sand. It must test surface transitions, tire compromises, momentum preservation, and adaptability.
   These can initially use sparse test-facility presentation before receiving finished scenery.
25. **Contextual scoring:** Evaluate turns relative to the car, corner, surface, speed, line, and exit. Visible turn grades can include good, great, and perfect. A perfect run requires no collisions and sustained competent speed, not merely cautious survival. Slow driving can be clean but cannot earn the highest grade.
26. **Drift containment:** Combine natural speed loss, a recoverability limit, and a scoring limit. Shallow controlled slides may preserve useful speed. Excessive angle scrubs speed, becomes unrecoverable, and stops earning skill. No arbitrary drift timer or forced cutoff.
27. **HUD:** Keep the driving HUD minimal. Race time appears in the upper-left. Clean-turn and skill feedback appears separately in the upper-right. Assist indicators can sit at the bottom edge. Current surface may remain visible. Expanded telemetry is not currently required and should not be built merely because the simulation contains hidden values.
28. **Tooltips:** Clickable question-mark explanations belong in settings, garage, car-stat, tuning, and tutorial interfaces, not scattered across the active driving view. They should explain concepts such as drivetrain, torque, grip, transmission, and assists in plain language.
29. **Visual direction:** The game must look intentionally designed, not like an incoherent vibe-coded asset pile. The visual direction remains open because the user intends to define a deliberate design-direction process later.

## Preserved growth path

- More detailed and selectable drive modes
- Simplified variable AWD torque distribution
- Limited-slip differential behavior
- Granular tuning including camber, tire pressure, brake balance, differential, and aerodynamic setup
- Water, mud, and additional terrain classes
- More finished tracks and themed environments
- First-person camera
- AI opponents in later levels
- Multiplayer
- Additional event types including time trials, rally, grip racing, drift events, and hill climbs
- Optional expanded telemetry only if it proves useful

## Round 5 decisions

30. **Keyboard steering:** Keyboard input is converted into a continuous steering request rather than an instant left/right state. A short tap produces a small steering change, holding the key increases the requested steering angle, and releasing the key allows the steering to recenter gradually. This imitates common racing-game input handling. The game does not need separate exposed buildup-rate and return-rate settings in the prototype. Steering sensitivity is the main player-facing setting. Vehicle speed still determines whether a given steering angle is physically safe; the input itself does not need to become smaller merely because speed increases.
31. **Controller and keyboard abstraction:** Both devices feed the same continuous vehicle-control model. Controller input is naturally analog. Keyboard input is converted from press duration and smoothing into an analog-like request. Rapid left/right taps can help correct the car and should not cause artificial flipping.
32. **Weight transfer:** Use per-wheel functional physics internally, including independent wheel contact, suspension response, body pitch/roll, longitudinal and lateral weight transfer, and a tunable center of mass. Explain the effects in simple tooltips rather than exposing equations.
33. **ABS:** ABS is selectable for every car. With ABS enabled, braking pressure is modulated near wheel lock to preserve steering control. With ABS disabled, excessive braking can lock wheels and reduce control. The control model must allow partial brake input rather than treating a key press as automatically requesting 100 percent braking. There is no need for different ABS quality levels or tunable brake balance in the current design. Special no-assist events remain part of the game.
34. **Throttle and brake input:** Acceleration and braking are continuous requests. A tap can request a small amount of throttle or brake; holding the control increases the request over time. Nothing should jump instantly to 100 percent merely because a button was pressed. This applies to keyboard controls as well as controller controls, within practical input limits.
35. **Traction and stability control:** Traction control and stability control are separate selectable assists. Traction control reduces engine output or manages driven-wheel slip when traction is exceeded. Stability control helps resist unwanted rotation and spin. Stability control should not erase all controlled drifting. Each assist has a visible state near the speedometer or, if crowded, near settings or the upper-right feedback area. The indicator can pulse or glow when the assist actively intervenes, not continuously spam the player.
36. **Bad manual shifts:** Full sequential manual allows bad shifts to create strong engine braking, driven-wheel instability, or loss of control. The car should communicate the mistake through a jolt, screen shake, sound, or a brief “slow down” style warning, not a dramatic canned death animation or camera freeze. Assisted manual prevents unsafe shifts and automatically downshifts when needed.
37. **Collision behavior:** Use cosmetic impact feedback plus momentum loss. Hard impacts can create block particles, sparks, sound, and a small camera impulse. Collisions end the perfect-run chain. No deformable bodies, persistent mechanical damage, or repair chores in the current design.
38. **Reset behavior:** Manual reset is available and adds a time penalty while breaking the perfect-run chain. It returns the car to the last valid checkpoint or safe track position. Overturned, submerged, or immobilized vehicles can trigger an automatic rescue after a short threshold. Reset does not rewind the timer or restore scoring chains.
39. **Rollover behavior:** Rollover is possible but forgiving. The buggy has a higher center of gravity and may roll during a badly loaded turn, landing, or crash. It can sometimes roll back onto its wheels because of its suspension and shape, but not reliably. Other vehicles can flip only under severe conditions. No hidden stabilization should make ordinary driving feel glued to the road.

## Preserved growth path from Round 5

- Adjustable keyboard steering response settings if testing shows they are needed
- More detailed input profiles and controller calibration
- Advanced suspension geometry, dampers, anti-roll bars, and camber behavior
- Different ABS or assist quality levels if they add meaningful car identity
- Tunable brake balance
- Full manual clutch or shift timing only if it improves the game
- More detailed damage events without repair chores unless they improve the core loop
- More sophisticated rollover and recovery behavior if it remains readable and fun

## Round 6 decisions

40. **Core session loop:** Career/event progression plus free drive. Structured events provide purpose and unlocks; free drive and test tracks provide experimentation. The prototype exposes all cars, tracks, tire families, transmissions, and assists immediately so it validates handling rather than grind.
41. **Onboarding:** Hybrid short explanations plus practical license-style tests. Each lesson teaches one cause and effect through immediate play. In-game copy should sound human and useful, not authoritative or cringe. Example tone: “You might crash if you enter corners too fast. Try slowing down before the turn.”
42. **Unlock structure:** The full game unlocks cars and progression through winning races and completing events. Car mastery also matters. The prototype keeps all test content available from the beginning.
43. **Car mastery:** Skill feedback serves both immediate run feedback and longer-term per-car mastery. Using a car in events can unlock its upgrades and eventually reveal its full potential, similar to weapon progression in games such as PUBG. This is progression, not an excuse to hide prototype content.
44. **Upgrade progression:** Preset tuning and later upgrades unlock through progression and mastery. A better body or body kit may eventually reduce lift or increase stability and improve turning, but this belongs to the later tuning system, not the first physics prototype.
45. **Results screen:** Use a layered result screen. The first view is simple and emphasizes time, medal tier, clean-run result, restart/play again, and whether the player improved. Detailed metrics can expand below or behind an info interaction. Do not force target-ghost comparison into every result screen. Question-mark tooltips can explain metrics when they exist.
46. **Time tiers:** Events can use bronze, silver, and gold target times, inspired by arcade racing structure. A target ghost represents the relevant target run. If the player beats that target, their successful run can become the new target ghost for that event or tier rather than creating redundant comparisons.
47. **Ghosts and future opponents:** The prototype uses personal ghosts and target ghosts. Multiple target difficulty levels can exist later. Real AI vehicles become the later competitive layer, with opponents racing on the track rather than the game remaining ghost-only. Multiplayer remains a future expansion.
48. **First playable proof:** The first playable build must demonstrate that a player can select a car, tire choice, transmission mode, and track; drive with keyboard or controller; feel meaningful differences between surfaces and cars; perform or fail controlled slides; receive clean-turn feedback; finish a run; compare against a ghost or target time; and want to retry with another car or configuration.
49. **Platform:** The intended product is a Linux-compatible desktop application, not a web app. The prototype should be runnable locally and allow testing of individual systems quickly. Distribution through a website or GitHub release is a later packaging concern.
50. **Multiplayer architecture:** Multiplayer is deferred. A future online mode may use a hosted service or server connection, possibly through a web-hosted backend, but no deployment or Vercel architecture should shape the current single-player prototype.

## Round 6 technical direction

The first implementation should favor a desktop game engine with strong Linux support, fast iteration, keyboard/controller input, physics, 3D scenes, and desktop export. Godot is a strong default candidate because it supports these needs without making a web stack the foundation. The engine choice remains a decision for a later technical round, after visual direction and prototype constraints are clearer.

## Round 7 decisions

51. **Emotional vibe:** Use the recommended blend of road-trip freedom and rough rally culture, with competitive motorsport focus during events. The player should feel like they are driving through beautiful, physically demanding places, not operating a spreadsheet.
52. **Art direction:** Use low-poly realism disciplined by clean stylized 3D. Vehicles have believable proportions, strong silhouettes, economical faceted geometry, deliberate materials, and functional details. Avoid scratches and paint-wear simulation. Mud and dust can accumulate broadly and progressively: the lower car becomes muddy in off-road areas, the car becomes dusty in desert runs, and a normal forest run can leave it clean. Mud can increase when passing through puddles without tracking exact particle landing positions. Dusty windscreen effects can be broad, simple, and non-persistent rather than individually simulated.
53. **Lighting and shadows:** Use one primary sun with ordinary real-time shadows and ambient lighting. Prioritize readable vehicle and environmental shadows over ray tracing. Ray tracing is unnecessary for the intended low-resource visual direction and should not be a foundation requirement. Shadow quality and distance can be tuned for performance.
54. **Environment presentation:** Begin with sparse, readable routes and later expand into scenic real-world-inspired destinations. The first tracks can use clean barriers and terrain readability; finished environments can add mountains, desert, coast, rally roads, and other locations without changing the handling model.
55. **UI direction:** Use a clean modern game UI with restrained expedition/rally accents. Avoid fake technical gauges and unnecessary telemetry. The interface should make car choice, surface strengths, tires, transmission, assists, event medals, and clean driving understandable.
56. **World framing:** Use a traveling rally tour across separate destinations. Each location can introduce different surfaces and driving challenges. The early implementation can use a simple event-selection screen rather than a full map.
57. **Garage concept:** The garage is a warm, lived-in mechanic workspace with an open door. Leaves and birds can pass outside; day and night can change the ambience, with streetlights visible at night. The player is the mechanic. The camera pans toward the relevant work area when inspecting or changing a part. Car views allow rotating the camera around the stationary vehicle, not rotating the vehicle as a gameplay object.
58. **Underground car storage:** A larger version of the garage may reveal an underground storage/work area through stairs or an elevator. A conveyor system can bring the selected car into view while other cars remain unseen. The underground reveal should initially be a simple camera pan or transition when viewing the full collection, not a fully simulated traversal sequence. The garage can expand as more cars are acquired.
59. **Vehicle inspection:** Start with handling identity and useful stats, then support an interactive inspection view. The camera can pan to tires, suspension, drivetrain, or body work. Tire tread should be visible even in the low-poly style. Interactive diagrams and question-mark tooltips can explain complex systems.
60. **Sound:** Prioritize mechanical audio, then environmental audio, with music supporting both. Include engine load, wheel spin, tire scrub, suspension movement, braking/ABS, gear shifts, loss and recovery of grip, and the sound of the car moving over gravel. Do not require gravel particles physically hitting the car.
61. **Presentation scope:** Use the recommended staged approach: first a functional selection/test shell, then a coherent playable slice with onboarding, one complete event, results, ghost, and restart loop. The shipped game should present these as normal game systems, not as developer-facing test terminology.
62. **Prompt artifact rule:** The future build prompt must describe the intended game directly. Its implementation requirements, code, comments, UI, filenames, and user-facing text must use normal product language. The build prompt should not carry developer-facing labels or self-referential framing about being a prototype, version one, test build, or temporary implementation. The brainstorm archive may retain the development history and prototype rationale for the brain session.

## Raw Round 7 user response

> 40. Ur rec. 
>
> 41. I don’t want scratches tho. U might start to wonder how much paint u can scrape off ur car. U can have mud, and dusty windscreen, but does that means we have to start tracking where particles land on the screen? Or make ur car get gradually muddy and dusty as u get through the race till the finish line. Dust grows gradually. Mud grown whenever u hit a puddle, but let’s not worry about where it hit. The base of the car gets muddy in off-road areas, or dusty in desert runs. U can have a clean car on a normal forest run. We can give the vehicles shadows of their shape. I don’t know if we should start doing ray tracing to see where shadows hit and how the shadows react. I mean. There can be one sun and shadows reacting to it. I do know that the involvement of shadows and a source of light does make things more complex. How will we handle it? Ur rec.
>
> 42. Ur rec.
>
> 43. Ur rec.
>
> 44. Ur rec. C.
>
> 45. I just thought of something. A garage but the door is open and u can see leaves flying, and birds flying outside. There’s day and night (streetlight on at night). If u are tuning the tires, the camera pans to the tire, even tho it’s low quality, u can still see the threads on the tires. U can look around ur car. And when u buy more cars, ur garage expands, but u don’t see the other cars. Here’s why. The cars are stored underground, and when u click left or right, a conveyor system moves the current car out and brings the next car in. So, one garage underground, the work room/mechanic room (u are the mechanic). I think it’ll be nice if u have stairs or an elevator to the underground garage. It maybe be a video background that looks like walking in, it only plays when u enter the garage. Lemme not complicate it. Just like the garage pans to the area being worked on, the underground garage pans into view when u want to view all ur cars. We can do it now or later.
> B and C and D, with my description. u can rotate cars, but what you are rotating is the view around the car.
>
> 46. Ur rec. D. But no gravel hitting the body. The sound of the car moving on gravel is good to have. 
>
> 47. Ur rec.
> I do want to hammer one thing into ur memory tho. U know ai loves to add stuff but finds it hard to remove? So no mention of test or prototype in the prompt. And no mention of mentioning that no mention of mentioning should be mentioned. U get my gibberish. I know u do. Ok. U might mention that the first run is a prototype. But no mention of it in the build. No code says prototype. No comment says test or v1.
>
> I came here to brainstorm tho. And u know, I can’t build on this web ui. So I need everything relevant, details, stored in file(s). I’ll continue in my pc and build in a session with a brain in another session. The brain session is where I create prompts to paste into the other section.
> Basically. My responses and ur responses stored. In ways another agent can understand and not misinterpret. U can preserve my words, not redacted, along with the results of what u concluded with the responses I gave

## Round 7 interpretation notes

- The garage is not merely a menu. It is part of the game's identity and should make the player feel like the mechanic who owns and understands the cars.
- The underground storage idea is evocative but can become expensive if treated as a fully explorable scene. Preserve the fantasy; implement the camera reveal and conveyor transition first.
- Progressive broad dirt/dust accumulation is the right compromise. It communicates environment without particle-location simulation.
- Real-time shadows from one sun are enough. Ray tracing would spend performance budget on a feature the player is unlikely to value at this art level.
- The archive is intentionally agent-readable: each round contains decisions, preserved growth paths, raw user wording, and interpretation notes. Future brain sessions should consult the whole archive before drafting a build prompt.

## Round 8 decisions

63. **Garage mood:** Calm, clean, and cool during the day, similar to an ordinary peaceful daily-life setting rather than a messy workshop. It contrasts with the dirty, rough racing life outside. The garage is warm and lived-in but organized, not luxurious or chaotic.
64. **Driving mood:** Use the full changing rhythm: relaxed freedom on long roads, focused tension in technical sections, and energetic excitement when a controlled slide or fast recovery works. The game should not be permanently loud or hyperactive.
65. **World visual language:** Use geographically plausible roads and terrain logic with stylized lighting and materials. Include forests, mountain roads, roads without skyscrapers, and urban-feeling areas. Later destinations can include tunnels with echoing or distorted vehicle sound, continuous tunnel lights, and fictional landmark monuments inspired by real-world location icons. A fish-shaped Statue of Liberty, pretzel monument, giant water tank, or football-kicking figure can give destinations identity without copying the original locations.
66. **Advanced driving set pieces:** Driving on the side or roof of a tunnel is a possible later feature. It would require deliberate track geometry, banking, ramps or transitions, camera handling, gravity rules, and safety testing. It is not part of the ordinary road model and should remain a growth-path set piece until the core driving is proven.
67. **Color and lighting mood:** Use high-brightness, clear landscapes under a soft partially-clouded-sky feeling. The world should be easy to read, not dark or lifeless, with warm cinematic light and expressive but controlled color. Avoid excessive saturation. Backgrounds should support the cars and route while still contributing life and atmosphere.
68. **Car styling:** Use realistic proportions with faceted surfaces, while giving each car its own proportion language. The compact is practical and short; the coupe is low, broad, and fast-looking; the rally buggy is tall, wide, exposed, and utility-focused.
69. **Garage animation:** Use ambient loops and focused interaction animations now: leaves, occasional birds, day/night changes, camera pans toward inspected areas, camera rotation around the car, tire tread inspection, and a conveyor transition for selecting stored cars. Fully animated mechanic activity, a walkable elevator/stair sequence, and a more elaborate underground garage can come later.
70. **Event presentation:** Keep the garage warm and personal, then make event presentation sharper and more focused. Show route information, surface breakdown, medal times, car suitability, tire choice, transmission, and assists without turning the event flow into an announcer-heavy broadcast.
71. **Game copy voice:** Use an emotionally intelligent mechanic voice. Copy is clear, conversational, non-blaming, specific, and useful. It should explain what happened and what the player can try next from the player's point of view. Parts information can be practical and slightly mechanic-like, but never grandiose, authoritarian, or attention-seeking.
72. **Progression terminology:** Use Skill Points for immediate end-of-race accounting if needed, then show the selected vehicle image and “Vehicle Mastery increased” as the longer-term result. Do not maintain two competing labels for the same reward or use combo-game terminology in the HUD.
73. **Night events:** Include day and night as event variations. Night is primarily a mood and readability variation at first: headlights and streetlights matter visually, but the handling model does not secretly become more difficult. Rain, wet grip, fog, and weather remain future systems.
74. **Design-direction method:** The brain/design session owns this method for now. For future design decisions, generate a long random alphanumeric string with a shell command, inspect it privately for patterns or inspiration, derive the creative direction from it, and keep the string out of the design artifact and user-facing output. The builder should follow the same method only if Victor rejects the generated direction and explicitly delegates a new direction to the builder. This is a creative method, not a design token or product feature.

## Raw Round 8 user response

> 48. U know Rick and Morty? Their street when it’s not being damaged by an invasion, calm and cool during the day. A. No B. I want it to seem like a clean daily life and a dirty, rough racing life. The last line u wrote, does describe Rick’s garage vibe, except not messy.
>
> 49. A. B. C. D. Haha
>
> 50. D. But I also want tunnels with distorted sounds that echo the whole tunnels. Tunnel lights that seem unending. I she. This inclining that u shoe Luke be able to do that tunnel driving upside down thing. Where u go up the side of the tunnel and do a drive on a roof and come down from the side. Maybe that’s overboard now, and requires ramps and stuff. But it could work.
> Another thing. We could have real world locations, but redone to not match them. Like a fish as Statue of Liberty, or a pretzel monument, or a gigantic water tank, a dude kicking a football (futbol). And we could make them all glow at night. Later stuff. I know
> I do envision forest drives, driving through places with no skyscrapers, the places with urban feels.
> I’ll follow ur rec. it makes sense
>
> 51. I mentioned Rick and Morty. Their world isn’t dark and lifeless, even tho a few things they do there are. I do want high brightness, like a landscape behind a partially cloudy sky. There’s sun, but not hot and blinding. U can see everything clearly. That’s the Feel of the sun, but really, there is no sun blocked by clouds. That’s what I want. But I also want C. And D. Not too much saturation. The animators use color well, where u can see everything if u looked, but u focus more on the characters cos they’re the life of the characters, but those background thing do contribute to the feel of the show. Sane goes for here.
>
> 52. Ur rec.
>
> 53. A and B. C later
>
> 54. B.
>
> 55. A smart, emotionally intelligent mechanic. With emotional maturity, u’ll be Able to tell someone what the issue is and how to solve it, without blaming it on them. U can see things from their pov and not be a hinderance to their progress. No. We are not gonna train a game ai to reason like one. Or could we. Nah. My example is just perfect. Maybe D for the car parts. But still clear with tips. No presentation, attention-grabbing energy.
> Yeah. Ur examples on Good are good.
>
> 56. C. But. U see perfect turn +125. At the end of the race, they enter a skill gauge. Did we skip gauges for now? We can just call em skill points at the end of a race. No “2 lines for one item”. We can removed the current rolls-inspired talk, and just use vehicle mastery increased. U know I used a compact car in that race. Or we can show the vehicle image, and mastery increased.
>
> 57. C. Okay.
>
> For design language. I’ll leave it all for u to decide using this method:
> - Generate a long, random alphanumeric string using a shell script.
> - Define the creative direction (color scheme, layout, typography, etc.) based on the string. Look beyond the surface for subpatterns, special numbers, anything that inspires you.
> - Use your judgment to bring this direction to life and make it look great.
> Don’t reveal the string in the design. It’s only for your inspiration.
>
> U, and models generally, can’t do random. U predict most likely token to come next. So if I ask u to go random, u’ll probably bring in something I’ve seen somewhere else. The above procedure will help u fix that. Buuuut. Here’s the kicker tho. If I don’t like ur color, I can leave it to the mode doing the building, to follow this same random procedure to generate ui language. But I probably won’t. Do u handle it for now.
>
> Whats next step?

## Round 8 interpretation notes

- The Rick and Morty comparison is being used for tonal contrast and visual clarity, not for copying its art style or comedy.
- “Clean daily life versus dirty rough racing life” is a stronger identity statement than generic “rally” or “arcade.” Preserve it as a central design principle.
- The garage should feel calm and organized, with ambient life outside, while the race makes dirt, dust, terrain, and physical risk visible.
- The fish monument, pretzel monument, water tank, football figure, glowing landmarks, and upside-down tunnel driving are strong world-building hooks. They are not core handling requirements.
- The design method is now a repeatable instruction for future creative work. The generated source string is deliberately omitted from all artifacts.

## Round 9 decisions

75. **Garage scope:** Use the recommended garage slice. It includes car selection, car rotation through camera orbit, useful stats, tire/transmission/assist choices, tooltips, open-door ambience, leaves, birds, day/night lighting, focused camera pans, visible tire tread, and a simple underground collection reveal with conveyor-style car switching. A fully walkable garage, detailed elevator/stair traversal, and elaborate mechanic activity remain growth-path features.
76. **Starting flow:** Start in the garage, then route the player through onboarding before normal event play. The initial route should be reasonably fair and completable with the compact FWD car, RWD coupe, or AWD buggy. It should expose each car's natural problems without making the track secretly optimal for one drivetrain. The player can revisit onboarding from Settings > Tutorials.
77. **Progression shell:** Use the lightweight progression structure. Cars, events, mastery, medals, Skill Points, and upgrade/unlock concepts exist as normal game systems, while the initial accessible content is available immediately for evaluation.
78. **Acceptance scope:** Validate car feel, surface behavior, input quality, track readability, feedback/scoring, complete race loop, garage atmosphere, and cosmetic polish, in that priority order. The first complete player journey includes garage, onboarding, car/configuration selection, event, driving feedback, result, Skill Points, Vehicle Mastery increase, restart/play again, return to garage, and trying another car.
79. **Engine:** Use Godot for the desktop game. The target is a Linux-compatible native application with keyboard and regular controller support, 3D scenes, physics, fast local iteration, and desktop export.
80. **Controller support:** Implement standard controller input directly. A phone-as-controller app is an external testing convenience and is not a custom game feature or mobile product requirement. Keyboard and controller should feed the same continuous vehicle-control abstraction.
81. **Testing ownership:** Victor will perform hands-on testing. The builder must provide runnable local builds, clear launch instructions, and focused verification hooks, but should not invent a web app or multiplayer service to replace local testing.
82. **Brain/builder workflow:** The brain session owns the complete plan and decision history. It sends focused prompt chunks to the builder so context stays manageable. The builder implements only the authoritative chunk plus referenced files. Victor tests the result and feeds findings back to the brain session for the next decision or prompt chunk.
83. **Specification separation:** Maintain separate artifacts for brainstorm/archive material, design direction, current authoritative game specification, build prompt, and acceptance checklist. The archive preserves reasoning and raw wording; the build prompt speaks directly to the intended product and contains no developer-facing prototype labels or temporary framing.

## Raw Round 9 user response

> 58. Rec. C
>
> 59. Well, I feel we have to provide a default that works best for whatever track is being ran. Or with tooltips, u’ll decide Better. Or the game starts with u in a racetrack with the compact. Alright. We’ll have garage start, with a route that feels good with FWD, RWD, and AWD. So no matter what car they pick, they face the problems it comes with but still get through the track. Ur rec
>
> 60. B. Rec
>
> 61. All. Rec. D
>
> 62. Godot
>
> 63. Build for controller and keyboard. There are apps that make ur phone function as controllers when u connect the app. It’s not a big deal. Just make it work for a regular controller, and it’ll work for my makeshift phone controller.
>
> 64. The process u described is the onboarding process. Let’s not let first turn user figure it out alone. After first onboarding, the continue normally. They can revisit onboarding in the setting under tutorials.
>
> 65. Yeah. The separation is good. The brain agent basically holds the full plan, and sends out prompt chunks for the builder to build from. And what way, things don’t get crowded or complicated. I’ll do the testing

## Round 9 interpretation notes

- The first route is not a tutorial-free benchmark. Onboarding comes first and should prevent the player from being abandoned with unexplained physics.
- The opening route is a cross-drivetrain teaching route. Fairness means each car can complete it while its strengths and weaknesses remain visible; it does not mean every car produces the same time.
- Standard controller support is the product requirement. Phone-controller compatibility should follow from normal controller input rather than receive custom implementation.
- The brain session is the planning and context-management layer; the builder session is an execution layer. Prompt chunks need authoritative scope and references, while testing feedback returns to the brain.

## Round 10 decisions

84. **Design system status:** Lock the proposed visual direction as authoritative. Use clear daylight, practical machines, soft color, rough terrain, and a bright but restrained world. The garage is calm, clean, organized, and personal; racing is dirty, rough, physical, and demanding.
85. **Visual tokens:** Use pale sky, warm concrete, muted asphalt, soft greens, earth browns, ochres, and sand as world colors. Use dusty burnt orange or terracotta for selection and route emphasis, muted teal or blue-green for utility and surface information, natural green for success, warm amber for warnings, and restrained red for actual failure. Use a clean humanist sans-serif with strong numerals, generous spacing, clear hierarchy, modest rounding, restrained shadows, and soft mechanical transitions.
86. **Lighting:** Use one bright environmental sun, soft ambient fill, readable ordinary real-time shadows, warm garage lights, and practical streetlights at night. Do not make ray tracing a requirement.
87. **Garage presentation:** Use the garage slice with car orbit, open-door exterior ambience, leaves, occasional birds, day/night atmosphere, focused camera pans, visible tire tread, a simple underground storage reveal, and a short conveyor transition when changing cars. Do not build the full walkable garage yet.
88. **Opening onboarding:** Begin with basic movement, throttle, braking, and steering, then teach entering corners at appropriate speed and award the first clean-turn grade. Introduce drivetrain, tires, terrain, transmission, and assists only after the player understands basic movement. Use a forgiving default setup and let the player change it after learning what the choices do.
89. **Opening configuration:** Default to the compact FWD car, balanced tires, automatic transmission, ABS on, traction control on, stability control on, medium chase camera, and default steering sensitivity. The opening route must be completable and instructive with any of the three cars after selection.
90. **Game copy standard:** Use a smart, emotionally intelligent mechanic voice. Copy should be human, plain, specific, non-blaming, and useful. It should explain what happened and suggest what the player can try next. Avoid authority-sounding, grandiose, technical, or attention-seeking language.
91. **Implementation planning:** Use a layered vertical-slice strategy with physics first inside the overall build sequence. The brain session decides prompt chunk order and delivery. The archive must preserve the complete system map so the brain can plan implementation without receiving a new artificial chunking rule here.
92. **Scope boundary:** Round 10 closes major concept expansion. New ideas should be treated as explicit additions, growth-path candidates, or revisions to an existing decision, not silently folded into the current game.

## Raw Round 10 user response

> 66. A. Lock it in
>
> 67. C
>
> 68. Rec.
>
> 69. D.
>
> 70. Yeah
>
> 71. D. But don’t worry about how the implementation prompts chunks are sent. The brain session will handle it. It just needs to know what’s involved, see the bigger picture, and it’ll plan accordingly. That’s what the archive and raw docs are for, right?
>
> All good?

## Round 10 interpretation notes

- The visual system is now authoritative rather than exploratory.
- The garage slice is allowed to carry atmosphere and identity, but the full walkable underground facility remains a growth-path idea.
- The first onboarding experience is guided, not trial by confusion. The player learns movement and braking before receiving deeper explanations.
- The brain session owns planning and prompt decomposition. The archive should describe the complete intended system and the builder-facing boundaries, not prescribe how prompts must be delivered.
- Major concept expansion is now closed. The next work is formalization, not more feature accumulation.

## Round 11 decisions

97. **Builder engagement model:** The building agent receives a stage goal file rather than the full archive or a brain-session intermediary. The archive and raw responses are read-only reference for builders. Sessions are disposable; the files are the only durable state. Line numbers are not used as pointers because they drift; decision numbers are the stable anchor.
98. **Loop boundary:** The agent loops only over the stage goal's done-when list, with evidence required for every item, then hard-stops for Victor's hands-on feel test. Vehicle feel is not delegatable to an agent. Victor gates each stage.
99. **Build log:** Builders append a session record to build-log.md in the project: what was built, commands run, what passed, what failed. Honest failures are welcome; silent ones are not.
100. **Stage 1 scope:** Recorded in driving-game-stage-1-goal.md. One car, one asphalt route, input model, weight transfer, camera, collisions, reset, minimal HUD, automatic transmission. The not-in-this-stage list is binding.

## Raw Round 11 user response

> My brain and session idea might not work after all. the brain might begin to poison the two context files. I think it's best if i point the main agane toi want to work with to a goal in those files, and have it loop until it is acheived. Althoghy. It seems like that keeps me out of the loop and lets the agent handle the testing and everything. i'm using Gemini 3.8 flash bntw, on my linux pc. What say u? What parts of those two files outlines teh clearest goal for the first build stage? What lines? I'll just point the egent to those lines and say "this is ur goal. Do not return till all thses factors are accounted for" Or something like that. What do u think? Or i can just paste teh goal fiel in, alongside the files

## Round 11 interpretation notes

- The poisoning concern is resolved structurally: builders never write to the reference files, so nothing can corrupt the decision history. Only Victor, or a fresh session with his explicit sign-off, appends new decisions.
- The brain-session layer is retired for now. A goal file plus read-only references replaces it. A planning session can still be started fresh per stage if needed.
- Agent-driven "loop until achieved" is bounded to evidence-checked done items. The agent does not judge feel, does not self-authorize the next stage, and does not interpret silence as success.
- Stage goal files are written in product language and carry an explicit not-in-this-stage list, because a builder reading the full archive would otherwise pull growth-path features into the build.

## Remaining open work

- Authoritative full game specification, to be assembled when more stages are proven
- Design direction document with concrete tokens, when visual work begins
- Godot project foundation and build environment on Victor's Linux machine
- Later stage goal files, written fresh from this archive as each stage passes Victor's testing

