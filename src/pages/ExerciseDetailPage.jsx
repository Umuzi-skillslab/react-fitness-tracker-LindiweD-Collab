import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import ExerciseDetail from '../components/Exercise/ExerciseDetail';
import Button from '../components/UI/Button';
import EmptyState from '../components/common/EmptyState';
import { exercisesData } from '../data/exercisesData';

/**
 * ExerciseDetailPage — standalone route for a single exercise, read from
 * the dynamic :id route parameter. Demonstrates useParams and two uses of
 * programmatic navigation (back, and previous/next exercise).
 */
const ExerciseDetailPage = ({ onAddToDay = null }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const exerciseId = parseInt(id, 10);
  const exercise = exercisesData.find((ex) => ex.id === exerciseId);
  const currentIndex = exercisesData.findIndex((ex) => ex.id === exerciseId);

  // Scroll back to the top whenever the viewed exercise changes, so
  // "Previous/Next exercise" always lands the reader at the page start.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [exerciseId]);

  // Keep the browser tab title in sync with the exercise being viewed.
  useEffect(() => {
    document.title = exercise ? `${exercise.name} — Pulse` : 'Exercise not found — Pulse';
    return () => {
      document.title = 'Pulse — Fitness Tracker & Workout Planner';
    };
  }, [exercise]);

  if (!exercise) {
    return (
      <div className="container">
        <EmptyState icon="🔎" message={`No exercise found with id "${id}".`} />
        <Button onClick={() => navigate('/exercises')}>Back to Exercises</Button>
      </div>
    );
  }

  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < exercisesData.length - 1;

  return (
    <div className="container">
      <Button variant="secondary" onClick={() => navigate('/exercises')}>
        ← Back to Exercises
      </Button>

      <div style={{ marginTop: 'var(--space-5)' }}>
        <ExerciseDetail exercise={exercise} onAddToDay={onAddToDay} />
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
        {hasPrevious && (
          <Button
            variant="secondary"
            onClick={() => navigate(`/exercises/${exercisesData[currentIndex - 1].id}`)}
          >
            ← Previous exercise
          </Button>
        )}
        {hasNext && (
          <Button
            variant="secondary"
            onClick={() => navigate(`/exercises/${exercisesData[currentIndex + 1].id}`)}
          >
            Next exercise →
          </Button>
        )}
      </div>
    </div>
  );
};

ExerciseDetailPage.propTypes = {
  onAddToDay: PropTypes.func,
};

export default ExerciseDetailPage;
