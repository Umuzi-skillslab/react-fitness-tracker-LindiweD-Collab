import PropTypes from 'prop-types';
import ExerciseCard from './ExerciseCard';
import Loading from '../UI/Loading';
import EmptyState from '../common/EmptyState';
import ErrorState from '../common/ErrorState';
import styles from './Exercise.module.css';

/**
 * ExerciseList — renders an array of ExerciseCard components (map usage),
 * and conditionally renders loading / empty / error sections depending on
 * the current data-fetch state.
 */
const ExerciseList = ({ exercises, isLoading = false, error = '', onSelectExercise, planExerciseIds = [] }) => {
  if (isLoading) {
    return <Loading message="Loading exercises..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (exercises.length === 0) {
    return (
      <EmptyState icon="🏋️" message="No exercises match your filters. Try clearing them." />
    );
  }

  return (
    <div className={styles.grid}>
      {exercises.map((exercise) => (
        <ExerciseCard
          key={exercise.id}
          exercise={exercise}
          onSelect={onSelectExercise}
          isInPlan={planExerciseIds.includes(exercise.id)}
        />
      ))}
    </div>
  );
};

ExerciseList.propTypes = {
  exercises: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  onSelectExercise: PropTypes.func.isRequired,
  planExerciseIds: PropTypes.array,
};

export default ExerciseList;
