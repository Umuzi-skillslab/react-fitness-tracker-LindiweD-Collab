import PropTypes from 'prop-types';
import Badge from '../UI/Badge';
import Button from '../UI/Button';
import VideoPlayer from '../Media/VideoPlayer';
import { formatDuration, DAYS_OF_WEEK, capitalize } from '../../utils/helpers';
import styles from './Exercise.module.css';

/**
 * ExerciseDetail — full exercise view: instructions, demo video, and a day
 * picker to add the exercise into the weekly workout plan. Used both as a
 * modal body (ExercisesPage) and as a standalone route (/exercises/:id).
 */
const ExerciseDetail = ({ exercise, onAddToDay = null }) => {
  const { name, category, difficulty, muscleGroups, duration, sets, reps, caloriesBurn, instructions, videoUrl } =
    exercise;

  return (
    <div>
      <div className={styles.detailHeader}>
        <div>
          <h2>{name}</h2>
          <div className={styles.badgeRow}>
            <Badge value={category} />
            <Badge value={difficulty} showIcon />
            {muscleGroups.map((muscle) => (
              <span key={muscle} className={styles.meta}>
                {muscle}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className={styles.meta}>
        ⏱ {formatDuration(duration)} &nbsp;·&nbsp; {sets} sets × {reps} reps &nbsp;·&nbsp; 🔥{' '}
        {caloriesBurn} cal
      </p>

      <h4>Instructions</h4>
      <ol className={styles.instructionsList}>
        {instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>

      <VideoPlayer videoUrl={videoUrl} title={`${name} — Form Demo`} />

      {onAddToDay && (
        <div style={{ marginTop: 'var(--space-5)' }}>
          <h4>Add to a workout day</h4>
          <div className={styles.filterBar}>
            {DAYS_OF_WEEK.map((day) => (
              <Button key={day} variant="secondary" onClick={() => onAddToDay(day, exercise)}>
                {capitalize(day.slice(0, 3))}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

ExerciseDetail.propTypes = {
  exercise: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    difficulty: PropTypes.string,
    muscleGroups: PropTypes.arrayOf(PropTypes.string),
    duration: PropTypes.number,
    sets: PropTypes.number,
    reps: PropTypes.number,
    caloriesBurn: PropTypes.number,
    instructions: PropTypes.arrayOf(PropTypes.string),
    videoUrl: PropTypes.string,
  }).isRequired,
  onAddToDay: PropTypes.func,
};

export default ExerciseDetail;
