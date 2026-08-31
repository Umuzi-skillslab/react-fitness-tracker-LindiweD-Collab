import PropTypes from 'prop-types';
import Card from '../UI/Card';
import { capitalize } from '../../utils/helpers';
import styles from './WorkoutPlanner.module.css';

const DayCard = ({ day, exercises, onRemoveExercise, onClearDay, isToday = false }) => (
  <Card className={`${styles.dayCard} ${isToday ? styles.today : ''}`}>
    <div className={styles.dayHeader}>
      <h4 className={styles.dayName}>{capitalize(day)}</h4>
      {exercises.length > 0 && (
        <button type="button" className={styles.removeBtn} onClick={() => onClearDay(day)}>
          Clear
        </button>
      )}
    </div>

    {exercises.length === 0 ? (
      <p className={styles.dayEmpty}>Rest day — nothing planned.</p>
    ) : (
      exercises.map((exercise, index) => (
        <div key={`${exercise.id}-${index}`} className={styles.exerciseChip}>
          <span>{exercise.name}</span>
          <button
            type="button"
            className={styles.removeBtn}
            onClick={() => onRemoveExercise(day, index)}
            aria-label={`Remove ${exercise.name} from ${day}`}
          >
            ✕
          </button>
        </div>
      ))
    )}
  </Card>
);

DayCard.propTypes = {
  day: PropTypes.string.isRequired,
  exercises: PropTypes.array.isRequired,
  onRemoveExercise: PropTypes.func.isRequired,
  onClearDay: PropTypes.func.isRequired,
  isToday: PropTypes.bool,
};

export default DayCard;
