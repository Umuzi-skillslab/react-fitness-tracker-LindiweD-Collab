
# Pulse — Fitness Tracker & Workout Planner

A responsive React application for browsing exercises, planning a weekly
workout routine, logging completed sessions, and tracking progress over
time. Built as a Phase 2 capstone demonstrating component architecture,
props, hooks, event handling, routing, conditional rendering, multimedia,
and automated testing.

## Features

- **Browse & filter exercises** by name (search), category, muscle group,
  and difficulty, with a clear-filters shortcut.
- **Exercise detail view** with step-by-step form instructions and an
  embedded demonstration video, available both as a modal and as a
  standalone route (`/exercises/:id`) with previous/next navigation.
- **Weekly workout planner** (Monday–Sunday) — add exercises to any day,
  remove individual exercises, or clear a whole day. Persisted to
  `localStorage`.
- **Workout logging** — record sets, reps, and weight for a completed
  workout; history is listed most-recent-first and persisted to
  `localStorage`.
- **Progress tracking** — total workouts logged, exercises currently
  planned, day streak, estimated calories burned, and a per-day bar chart
  of the current plan.
- **Motivational audio tracks** on the home page and exercise demo videos
  on the detail view, both using native HTML5 controls with fallback text.
- **Responsive navigation** with active-route highlighting and a mobile
  hamburger menu.
- **404 page** for any unmatched route.

## Technologies Used

- React 19 (functional components + hooks only)
- React Router DOM (routing, dynamic params, programmatic navigation)
- PropTypes (runtime prop validation)
- CSS Modules (scoped, professional styling)
- Jest + Babel (`babel-jest`) for the test runner
- React Testing Library + `@testing-library/user-event` for component and
  interaction tests
- Vite (dev server & production build)

## Installation

```bash
npm install
```

## Running the app

```bash
npm run dev        # start the Vite dev server
npm run build       # production build to dist/
npm run preview     # preview the production build locally
```

## Running the tests

```bash
npm test                  # run the full Jest suite once
npm test -- --watch       # watch mode
npm run test:coverage     # run with a coverage report
```

### Test coverage report

The full suite (**72 tests across 25 test files**, all passing) currently
reports:

| Metric      | Coverage |
|-------------|---------:|
| Statements  | 93.05%   |
| Branches    | 86.71%   |
| Functions   | 88.79%   |
| Lines       | 92.83%   |

All figures clear the 70% requirement. Run `npm run test:coverage` to
regenerate an up-to-date, file-by-file breakdown.

Test types included:
- **Component tests** — rendering, props, and interaction tests for every
  reusable UI component, exercise component, workout component, and page.
- **Integration tests** (`src/__tests__/integration/`) — a full "browse an
  exercise → add it to a day → see it in the planner" flow, a "log a
  workout → see it in history" flow, and cross-page navigation.
- **Routing tests** — active-link styling, the dynamic `/exercises/:id`
  route, programmatic navigation (back / previous / next), and the 404
  fallback route.
- **Hook tests** — `useLocalStorage`, covering initial value, persistence,
  and reading a pre-existing stored value.
- **Conditional rendering tests** — loading, empty, and error states in
  `ExerciseList`.
- **Async tests** — the simulated exercise fetch in `ExercisesPage`.
- **Mocked functions** — `jest.fn()` used throughout to assert callback
  props are invoked with the right arguments.

## Project structure

```
src/
├── components/
│   ├── Navigation/   Navbar (active routes, mobile menu)
│   ├── UI/           Button, Card, Badge, SearchBar, Loading, Modal
│   ├── Exercise/     ExerciseCard, ExerciseList, ExerciseDetail, ExerciseFilter
│   ├── WorkoutPlanner/  WorkoutPlanner, DayCard
│   ├── WorkoutLog/   WorkoutLog, LogEntry, ProgressChart
│   ├── Media/        VideoPlayer, AudioPlayer
│   └── common/       Footer, EmptyState, ErrorState
├── pages/            Home, ExercisesPage, ExerciseDetailPage,
│                     WorkoutPlannerPage, HistoryPage, ProgressPage, NotFound
├── hooks/            useLocalStorage
├── utils/            helpers.js (formatting, calculations)
├── data/             exercisesData.js (25 sample exercises)
├── styles/           tokens.css (design system: color, type, spacing)
└── App.jsx           routes + lifted state (workoutPlan, history)
```

Every `.jsx`/`.js` file has a matching `.test.jsx`/`.test.js` alongside it.

## State management

`workoutPlan` and `history` are the two pieces of state shared across
pages, so they're **lifted up to `App.jsx`** and persisted with the
`useLocalStorage` custom hook. Each page receives exactly the slice of
state and the callback handlers it needs as props — `ExercisesPage` and
`ExerciseDetailPage` both call `onAddToDay`, `WorkoutPlannerPage` calls
`onRemoveExercise`/`onClearDay`, `HistoryPage` calls `onLogWorkout`, and
`ProgressPage` reads both pieces of state to compute its summary. This is
how `ExercisesPage` and `WorkoutPlannerPage` — siblings with no direct
relationship — stay in sync: through their shared parent's state.

Everything else (search term, filter values, form fields, modal
open/closed, focus state) is local `useState` inside the component that
owns it.

## Routing

| Path                | Page               | Notes                          |
|----------------------|--------------------|---------------------------------|
| `/`                  | Home               |                                  |
| `/exercises`         | ExercisesPage      | search/filter + detail modal    |
| `/exercises/:id`     | ExerciseDetailPage | dynamic param, prev/next nav    |
| `/workout-planner`   | WorkoutPlannerPage |                                  |
| `/history`           | HistoryPage        | log form + history list         |
| `/progress`          | ProgressPage       | stats + weekly distribution     |
| `*`                  | NotFound           | 404 fallback                    |

## Future enhancements

- Swap the static `exercisesData.js` catalog for a real backend/API.
- User accounts, so plans and history sync across devices instead of
  living in `localStorage`.
- Editable log entries (currently append-only) and the ability to mark a
  planned exercise as completed directly from the planner.
- Richer progress charts (weight lifted over time, per-muscle-group
  volume) using a charting library.
- Exercise images (currently referenced by path but not bundled — see
  `public/assets/`).
=======
# React_Fitness_Tracker

A fitness center chain has commissioned a modern web application to help their members track workouts, plan exercise routines, and monitor their fitness progress. They need a responsive, well-tested React application that allows users to log exercises, create weekly workout plans, watch exercise demonstration videos, listen to motivational audio tracks, and track their fitness journey over time. You've been hired to build this application from scratch, demonstrating your proficiency in React fundamentals, component architecture, state management, testing, and modern JavaScript practices.

Your task is to build a fully functional Fitness Tracker & Workout Planner application using React and Jest/React Testing Library. You must create the entire application from the ground up, demonstrating mastery of functional components, hooks, props, event handling, routing, conditional rendering, multimedia integration, and comprehensive testing practices. The application must be well-organized, styled professionally, thoroughly tested, and provide an excellent user experience.

## Project Overview: Fitness Tracker & Workout Planner App
**Core Features Required:**
- Browse and search exercises by category, muscle group, or difficulty
- View detailed exercise information with proper form instructions
- Watch exercise demonstration videos
- Listen to workout motivation audio tracks
- Add exercises to a weekly workout planner (Monday-Sunday)
- Log completed workouts with sets, reps, and weight
- Track workout history and progress over time
- Filter and sort exercises dynamically
- Responsive navigation with multiple routes
- Interactive user interface with smooth transitions
- Comprehensive test coverage with Jest and React Testing Library
>>>>>>> origin/main
