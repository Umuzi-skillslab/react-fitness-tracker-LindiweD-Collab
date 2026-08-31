import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import ExercisesPage from './pages/ExercisesPage';
import ExerciseDetailPage from './pages/ExerciseDetailPage';
import WorkoutPlannerPage from './pages/WorkoutPlannerPage';
import HistoryPage from './pages/HistoryPage';
import ProgressPage from './pages/ProgressPage';
import NotFound from './pages/NotFound';
import useLocalStorage from './hooks/useLocalStorage';
import { emptyWorkoutPlan } from './utils/helpers';

/**
 * App - top-level component. Owns the two pieces of state that are shared
 * across pages (the weekly workout plan and the workout history), lifting
 * them up here so ExercisesPage, WorkoutPlannerPage, HistoryPage and
 * ProgressPage can all read and update the same data (sibling
 * communication through a shared parent). Both are persisted with
 * useLocalStorage.
 */
function App() {
  const [workoutPlan, setWorkoutPlan] = useLocalStorage('pulse-workout-plan', emptyWorkoutPlan());
  const [history, setHistory] = useLocalStorage('pulse-workout-history', []);

  // Child-to-parent: ExercisesPage/ExerciseDetailPage call this to add an
  // exercise into a given day of the plan.
  const handleAddToDay = (day, exercise) => {
    setWorkoutPlan({ ...workoutPlan, [day]: [...workoutPlan[day], exercise] });
  };

  // Child-to-parent: DayCard (via WorkoutPlanner) calls this to remove a
  // single exercise from a day by its index in that day's array.
  const handleRemoveExercise = (day, index) => {
    setWorkoutPlan({
      ...workoutPlan,
      [day]: workoutPlan[day].filter((_, i) => i !== index),
    });
  };

  // Child-to-parent: DayCard calls this to clear every exercise from a day.
  const handleClearDay = (day) => {
    setWorkoutPlan({ ...workoutPlan, [day]: [] });
  };

  // Child-to-parent: WorkoutLog calls this with a completed log entry.
  const handleLogWorkout = (entry) => {
    setHistory([...history, entry]);
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/exercises"
          element={<ExercisesPage workoutPlan={workoutPlan} onAddToDay={handleAddToDay} />}
        />
        <Route
          path="/exercises/:id"
          element={<ExerciseDetailPage onAddToDay={handleAddToDay} />}
        />
        <Route
          path="/workout-planner"
          element={
            <WorkoutPlannerPage
              workoutPlan={workoutPlan}
              onRemoveExercise={handleRemoveExercise}
              onClearDay={handleClearDay}
            />
          }
        />
        <Route
          path="/history"
          element={<HistoryPage history={history} onLogWorkout={handleLogWorkout} />}
        />
        <Route
          path="/progress"
          element={<ProgressPage history={history} workoutPlan={workoutPlan} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
