import PropTypes from 'prop-types';
import styles from './WorkoutLog.module.css';

/**
 * LogEntry — one row of workout history. Uses a ternary to indicate
 * completed vs. pending status.
 */
const LogEntry = ({ entry }) => (
  <div className={styles.entry}>
    <div>
      <strong>{entry.exerciseName}</strong>
      <div className={styles.entryMeta}>
        {entry.sets} sets × {entry.reps} reps
        {entry.weight > 0 ? ` @ ${entry.weight}kg` : ''} · {entry.date}
      </div>
    </div>
    <span className={entry.completed ? styles.completed : styles.pending}>
      {entry.completed ? 'Completed ✓' : 'Pending'}
    </span>
  </div>
);

LogEntry.propTypes = {
  entry: PropTypes.shape({
    id: PropTypes.number,
    exerciseName: PropTypes.string.isRequired,
    sets: PropTypes.number.isRequired,
    reps: PropTypes.number.isRequired,
    weight: PropTypes.number,
    date: PropTypes.string.isRequired,
    completed: PropTypes.bool,
  }).isRequired,
};

export default LogEntry;
