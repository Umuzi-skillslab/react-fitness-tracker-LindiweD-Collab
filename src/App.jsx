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

function App() {
  const [workoutPlan, setWorkoutPlan] = useLocalStorage('pulse-workout-plan', emptyWorkoutPlan());
  const [history, setHistory] = useLocalStorage('pulse-workout-history', []);

  const handleAddToDay = (day, exercise) => {
    setWorkoutPlan({ ...workoutPlan, [day]: [...workoutPlan[day], exercise] });
  };

  
  const handleRemoveExercise = (day, index) => {
    setWorkoutPlan({
      ...workoutPlan,
      [day]: workoutPlan[day].filter((_, i) => i !== index),
    });
  };

  const handleClearDay = (day) => {
    setWorkoutPlan({ ...workoutPlan, [day]: [] });
  };

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
