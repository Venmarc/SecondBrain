---
title: "Lesson: Context-Aware Form Fields"
date: 2026-06-28
tags:
  - lesson
  - ux
  - forms
  - pattern
  - momentum
  - generalizable
aliases:
  - Context-Aware Form Fields
  - Type-Driven Field Sets
---

# Lesson: Context-Aware Form Fields

> **One-line Summary**: Forms that show the same input fields regardless of the data type being entered create confusion and bad data — the field set must adapt to the nature of what's being logged.

## The Discovery
While testing Momentum's fitness logger, the same form appeared for every exercise — weight, reps, RPE. This created immediate UX confusion:

- **Pushups**: Does "weight" mean bodyweight? How does the system know?
- **Planks**: There's no "reps" — it's duration. But no time field exists.
- **Walking Lunges**: Weight = dumbbells? Per hand or total?
- **Hanging Leg Raises**: Why is weight required?

The result: the tester (who is the developer) avoided testing preset workouts entirely because the mental load of figuring out the input logic was too high. If the developer avoids it, users will definitely avoid it.

**Root cause:** The agent built a universal form assuming all exercises share the same data structure. They don't.

## The Pattern: Type-Driven Field Sets

Every exercise (or logged entity) has a **type** that determines which fields appear:

```typescript
type ExerciseType = 'weighted' | 'bodyweight' | 'timed' | 'distance' | 'reps_only'

const fieldSetByType: Record<ExerciseType, Field[]> = {
  weighted:    ['sets', 'reps', 'weight_kg', 'rpe'],
  bodyweight:  ['sets', 'reps', 'rpe'],              // no weight
  timed:       ['sets', 'duration_seconds', 'rpe'],   // no reps or weight
  distance:    ['distance_km', 'duration_seconds'],
  reps_only:   ['sets', 'reps'],
}
```

The form renders only the fields relevant to that type. The label also changes:
- "10 reps × 3 sets @ 20kg" for weighted
- "3 sets × 12 reps" for bodyweight  
- "3 sets × 45 seconds" for timed

## Where This Generalizes

This isn't just about fitness. The same pattern applies to:

- **E-commerce products**: Digital product (no weight/shipping) vs physical product (weight, dimensions, shipping class)
- **Task trackers**: Time-based task (duration field) vs completion-based (done/not done)
- **Content types**: Article (word count, publish date) vs video (duration, thumbnail) vs podcast (episode number, audio file)
- **Financial entries**: Income vs Expense vs Transfer — different fields for each

**The general rule:** When a form handles multiple "types" of the same entity, the field set must be driven by the type, not uniform across all types.

## Implementation Approach

```tsx
interface Exercise {
  id: string
  name: string
  type: ExerciseType
}

function ExerciseSetForm({ exercise }: { exercise: Exercise }) {
  return (
    <div>
      {(exercise.type === 'weighted') && (
        <WeightInput label="Weight (kg)" />
      )}
      {(exercise.type !== 'timed') && (
        <RepsInput label="Reps" />
      )}
      {(exercise.type === 'timed') && (
        <DurationInput label="Duration" />
      )}
      {/* RPE appears for all types that involve effort */}
      {(['weighted', 'bodyweight', 'timed'].includes(exercise.type)) && (
        <RPEInput label="Effort (RPE 1-10)" />
      )}
    </div>
  )
}
```

## Prompt for Your Agent
```
When building a form that handles multiple types of the same entity, 
fields must be conditional on the entity type — not uniform across all types.

Define an ExerciseType (or equivalent) enum first. Then build a field map 
that determines which fields render for each type. The form must never show 
irrelevant fields (e.g., weight input for a plank exercise).

Before building the form UI, ask me: "What are the types of [entity] and 
what fields does each type require?"
```

## Where This Appeared
- [[01-Projects/Momentum/Docs/DEV_NOTES]] — fitness logger testing, confusion about weight fields for bodyweight exercises (June 5)

## Related
- [[03-Resources/Skills/State-Isolation-Per-Record]]
- [[03-Resources/MOC-UI-UX-Lessons]]

**Tags:** #lesson #ux #forms #pattern #momentum #generalizable
