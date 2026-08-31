# Planning Document — Pulse Fitness Tracker

## Component hierarchy

```
App (routes + lifted state: workoutPlan, history)
├── Navbar
├── Routes
│   ├── Home
│   │   ├── Card (x3, features)
│   │   └── AudioPlayer (x3, motivation tracks)
│   ├── ExercisesPage
│   │   ├── ExerciseFilter → SearchBar, Button
│   │   ├── ExerciseList → ExerciseCard (xN) → Card, Badge
│   │   └── Modal → ExerciseDetail → Badge, VideoPlayer, Button
│   ├── ExerciseDetailPage (route param :id)
│   │   └── ExerciseDetail → Badge, VideoPlayer, Button
│   ├── WorkoutPlannerPage
│   │   └── WorkoutPlanner → DayCard (x7) → Card
│   ├── HistoryPage
│   │   └── WorkoutLog → Card, Button, LogEntry (xN), EmptyState
│   ├── ProgressPage
│   │   └── ProgressChart → Card
│   └── NotFound → Button
└── Footer
```

`ExercisesPage > ExerciseList > ExerciseCard` and
`WorkoutPlannerPage > WorkoutPlanner > DayCard` are both three levels of
parent/child/grandchild nesting.

## Data flow diagram

```
                     ┌────────────── App.jsx ──────────────┐
                     │  workoutPlan (object)   history[]    │
                     │  useLocalStorage-backed              │
                     └──┬───────────┬───────────┬───────────┘
        props down      │           │           │        props down
   ┌────────────────────┘           │           └────────────────────┐
   ▼                                ▼                                ▼
ExercisesPage /              WorkoutPlannerPage                 HistoryPage /
ExerciseDetailPage           (reads workoutPlan,                ProgressPage
(reads workoutPlan,           calls onRemoveExercise,           (reads/writes
 calls onAddToDay) ───────►   onClearDay)                        history)
        ▲ callback up               ▲ callback up                     ▲ callback up
        │                           │                                 │
   ExerciseDetail "Add to day"  DayCard "Remove"/"Clear"        WorkoutLog "Log Workout"
```

`ExercisesPage` and `WorkoutPlannerPage` are siblings that never talk to
each other directly — they communicate only by both reading/writing the
same `workoutPlan` state that lives in `App`. Same for `HistoryPage` and
`ProgressPage` via `history`.

## Components and their purpose

- **Navigation**: `Navbar` — active-route links, mobile hamburger.
- **UI (reusable, 6)**: `Button`, `Card`, `Badge`, `SearchBar`, `Loading`,
  `Modal` — used across every feature area.
- **Exercise**: `ExerciseCard` (summary), `ExerciseList` (map + loading/
  empty/error states), `ExerciseDetail` (full view + video), `ExerciseFilter`
  (search + 3 dropdowns).
- **WorkoutPlanner**: `WorkoutPlanner` (container, 7-day grid), `DayCard`
  (one day, reused 7x).
- **WorkoutLog**: `WorkoutLog` (log form + history), `LogEntry` (one row),
  `ProgressChart` (stats + bar chart).
- **Media**: `VideoPlayer`, `AudioPlayer` — native HTML5 controls.
- **common**: `Footer`, `EmptyState`, `ErrorState`.
- **Pages**: `Home`, `ExercisesPage`, `ExerciseDetailPage`,
  `WorkoutPlannerPage`, `HistoryPage`, `ProgressPage`, `NotFound`.

## Props flow (representative)

- `ExercisesPage` → `ExerciseList`: `exercises`, `isLoading`, `error`,
  `onSelectExercise`, `planExerciseIds` (5 props, includes a callback and a
  derived/transformed array).
- `ExerciseList` → `ExerciseCard`: `exercise`, `onSelect`, `isInPlan`.
- `WorkoutPlanner` → `DayCard`: `day`, `exercises`, `onRemoveExercise`,
  `onClearDay`, `isToday`.

## State management strategy

Local `useState` for anything owned by a single component (search/filter
values, form fields, focus/modal-open flags). Shared state
(`workoutPlan`, `history`) is lifted to `App` and persisted via the
`useLocalStorage` custom hook, so it survives a refresh and stays in sync
across pages.

## Testing strategy

- **Unit/component tests** sit next to each component (`Component.test.jsx`)
  and cover rendering, props, PropTypes-shaped data, and click/change
  interactions with `jest.fn()` mocks.
- **Hook tests** (`useLocalStorage.test.js`) use `renderHook`/`act`.
- **Async tests** cover `ExercisesPage`'s simulated fetch with `waitFor`.
- **Integration tests** (`src/__tests__/integration/`) render the full
  `App` inside a `MemoryRouter` and drive multi-step flows: adding an
  exercise to a day and verifying it in the planner, logging a workout and
  verifying it in history, and navigating between routes including the
  404 fallback.
