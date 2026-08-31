import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../UI/Button';
import Card from '../UI/Card';
import LogEntry from './LogEntry';
import EmptyState from '../common/EmptyState';
import { exercisesData } from '../../data/exercisesData';
import styles from './WorkoutLog.module.css';

const WorkoutLog = ({ history, onLogWorkout }) => {
  const [currentLog, setCurrentLog] = useState({
    exerciseId: exercisesData[0].id,
    sets: 3,
    reps: 10,
    weight: 0,
  });

  const handleFieldChange = (field) => (e) => {
    const raw = e.target.value;
    const isNumberField = field !== 'exerciseId';
    setCurrentLog({ ...currentLog, [field]: isNumberField ? Number(raw) : raw });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const exercise = exercisesData.find((ex) => ex.id === Number(currentLog.exerciseId));
    onLogWorkout({
      id: Date.now(),
      exerciseName: exercise ? exercise.name : 'Custom exercise',
      sets: currentLog.sets,
      reps: currentLog.reps,
      weight: currentLog.weight,
      date: new Date().toISOString().slice(0, 10),
      completed: true,
    });
    setCurrentLog({ exerciseId: exercisesData[0].id, sets: 3, reps: 10, weight: 0 });
  };

  return (
    <div>
      <Card>
        <h3>Log a workout</h3>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            Exercise
            <select value={currentLog.exerciseId} onChange={handleFieldChange('exerciseId')}>
              {exercisesData.map((ex) => (
                <option key={ex.id} value={ex.id}>
                  {ex.name}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.field}>
            Sets
            <input
              type="number"
              min="1"
              value={currentLog.sets}
              onChange={handleFieldChange('sets')}
            />
          </label>
          <label className={styles.field}>
            Reps
            <input
              type="number"
              min="1"
              value={currentLog.reps}
              onChange={handleFieldChange('reps')}
            />
          </label>
          <label className={styles.field}>
            Weight (kg)
            <input
              type="number"
              min="0"
              value={currentLog.weight}
              onChange={handleFieldChange('weight')}
            />
          </label>
          <div className={styles.formActions}>
            <Button type="submit">Log Workout</Button>
          </div>
        </form>
      </Card>

      <h3 style={{ marginTop: 'var(--space-6)' }}>Recent workouts</h3>
      {history.length > 0 ? (
        <Card>
          {history
            .slice()
            .reverse()
            .map((entry) => (
              <LogEntry key={entry.id} entry={entry} />
            ))}
        </Card>
      ) : (
        <EmptyState icon="📝" message="No workouts logged yet. Start tracking your progress!" />
      )}
    </div>
  );
};

WorkoutLog.propTypes = {
  history: PropTypes.array.isRequired,
  onLogWorkout: PropTypes.func.isRequired,
};

export default WorkoutLog;
