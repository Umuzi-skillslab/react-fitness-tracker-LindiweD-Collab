import PropTypes from 'prop-types';
import DayCard from './DayCard';
import { DAYS_OF_WEEK, capitalize } from '../../utils/helpers';
import styles from './WorkoutPlanner.module.css';

const TODAY_KEY = DAYS_OF_WEEK[(new Date().getDay() + 6) % 7];

const WorkoutPlanner = ({ workoutPlan, onRemoveExercise, onClearDay }) => {
  const totalPlanned = DAYS_OF_WEEK.reduce((sum, day) => sum + workoutPlan[day].length, 0);

  return (
    <div>
      <p>
        {totalPlanned > 0
          ? `${totalPlanned} exercise${totalPlanned === 1 ? '' : 's'} planned this week.`
          : 'Your week is empty — add exercises from the Exercises page.'}
      </p>
      <div className={styles.plannerGrid}>
        {DAYS_OF_WEEK.map((day) => (
          <DayCard
            key={day}
            day={day}
            exercises={workoutPlan[day]}
            onRemoveExercise={onRemoveExercise}
            onClearDay={onClearDay}
            isToday={day === TODAY_KEY}
          />
        ))}
      </div>
      {TODAY_KEY && (
        <p style={{ marginTop: 'var(--space-4)', fontSize: '0.85rem' }}>
          Today is highlighted: <strong>{capitalize(TODAY_KEY)}</strong>.
        </p>
      )}
    </div>
  );
};

WorkoutPlanner.propTypes = {
  workoutPlan: PropTypes.object.isRequired,
  onRemoveExercise: PropTypes.func.isRequired,
  onClearDay: PropTypes.func.isRequired,
};

export default WorkoutPlanner;
