import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import ExerciseFilter from '../components/Exercise/ExerciseFilter';
import ExerciseList from '../components/Exercise/ExerciseList';
import ExerciseDetail from '../components/Exercise/ExerciseDetail';
import Modal from '../components/UI/Modal';
import { exercisesData } from '../data/exercisesData';
import styles from './pages.module.css';

/**
 * ExercisesPage — owns exercise browsing state: search/filter values, the
 * simulated async load, and which exercise is selected for the detail
 * modal. Passes handlers down to ExerciseFilter and ExerciseList (parent to
 * child), and receives selection back up via onSelectExercise (child to
 * parent).
 */
const ExercisesPage = ({ workoutPlan, onAddToDay }) => {
  const navigate = useNavigate();

  // Loaded exercises + loading/error flags — simulates fetching from a
  // server so the loading state is genuinely demonstrated.
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [muscleGroup, setMuscleGroup] = useState('all');
  const [difficulty, setDifficulty] = useState('all');
  const [selectedId, setSelectedId] = useState(null);

  // Simulate an async data load on mount (isLoading already starts true).
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setExercises(exercisesData);
        setIsLoading(false);
      } catch {
        setError('Failed to load exercises.');
        setIsLoading(false);
      }
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  // Data transformation before passing to child: filter the raw list down
  // to what should actually be rendered.
  const filteredExercises = useMemo(() => {
    return exercises.filter((ex) => {
      const matchesSearch = ex.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = category === 'all' || ex.category === category;
      const matchesMuscle = muscleGroup === 'all' || ex.muscleGroups.includes(muscleGroup);
      const matchesDifficulty = difficulty === 'all' || ex.difficulty === difficulty;
      return matchesSearch && matchesCategory && matchesMuscle && matchesDifficulty;
    });
  }, [exercises, searchTerm, category, muscleGroup, difficulty]);

  const planExerciseIds = useMemo(
    () => Object.values(workoutPlan).flat().map((ex) => ex.id),
    [workoutPlan]
  );

  const selectedExercise = exercises.find((ex) => ex.id === selectedId);

  const handleClearFilters = () => {
    setSearchTerm('');
    setCategory('all');
    setMuscleGroup('all');
    setDifficulty('all');
  };

  return (
    <div className="container">
      <div className={styles.pageHeader}>
        <h1>Browse Exercises</h1>
        <p>{filteredExercises.length} of {exercises.length} exercises</p>
      </div>

      <ExerciseFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        category={category}
        onCategoryChange={setCategory}
        muscleGroup={muscleGroup}
        onMuscleGroupChange={setMuscleGroup}
        difficulty={difficulty}
        onDifficultyChange={setDifficulty}
        onClearFilters={handleClearFilters}
      />

      <ExerciseList
        exercises={filteredExercises}
        isLoading={isLoading}
        error={error}
        onSelectExercise={setSelectedId}
        planExerciseIds={planExerciseIds}
      />

      {/* Conditionally render the whole detail section when something is selected */}
      {selectedExercise && (
        <Modal onClose={() => setSelectedId(null)} title="">
          <ExerciseDetail exercise={selectedExercise} onAddToDay={onAddToDay} />
          <p style={{ marginTop: 'var(--space-4)' }}>
            <button
              type="button"
              onClick={() => navigate(`/exercises/${selectedExercise.id}`)}
              style={{ background: 'none', border: 'none', color: 'var(--color-teal)', cursor: 'pointer' }}
            >
              Open full page →
            </button>
          </p>
        </Modal>
      )}
    </div>
  );
};

ExercisesPage.propTypes = {
  workoutPlan: PropTypes.object.isRequired,
  onAddToDay: PropTypes.func.isRequired,
};

export default ExercisesPage;
