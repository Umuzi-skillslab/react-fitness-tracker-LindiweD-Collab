import PropTypes from 'prop-types';
import Card from '../UI/Card';
import { DAYS_OF_WEEK, calculateStreak, calculateTotalCalories, capitalize } from '../../utils/helpers';
import styles from './WorkoutLog.module.css';

/**
 * ProgressChart — summarizes total workouts, streak, and calories, plus a
 * simple bar chart of exercises planned per day. Pure display component
 * driven entirely by props (data transformation happens before it's called).
 */
const ProgressChart = ({ history, workoutPlan }) => {
  const totalWorkouts = history.length;
  const streak = calculateStreak(history);
  const totalPlanned = DAYS_OF_WEEK.reduce((sum, day) => sum + workoutPlan[day].length, 0);
  const estimatedCalories = calculateTotalCalories(
    history.map((h) => ({ caloriesBurn: h.sets * h.reps * 0.3 }))
  );
  const maxPerDay = Math.max(1, ...DAYS_OF_WEEK.map((day) => workoutPlan[day].length));

  return (
    <div>
      <div className={styles.statsGrid}>
        <Card className={styles.statCard}>
          <div className={styles.statValue}>{totalWorkouts}</div>
          <div className={styles.statLabel}>Workouts logged</div>
        </Card>
        <Card className={styles.statCard}>
          <div className={styles.statValue}>{totalPlanned}</div>
          <div className={styles.statLabel}>Exercises planned</div>
        </Card>
        <Card className={styles.statCard}>
          <div className={styles.statValue}>{streak}</div>
          <div className={styles.statLabel}>Day streak</div>
        </Card>
        <Card className={styles.statCard}>
          <div className={styles.statValue}>{Math.round(estimatedCalories)}</div>
          <div className={styles.statLabel}>Est. calories burned</div>
        </Card>
      </div>

      <Card>
        <h4>Weekly plan distribution</h4>
        {DAYS_OF_WEEK.map((day) => {
          const count = workoutPlan[day].length;
          const widthPct = (count / maxPerDay) * 100;
          return (
            <div className={styles.barRow} key={day}>
              <span className={styles.barLabel}>{capitalize(day)}</span>
              <div className={styles.barTrack}>
                <div className={styles.barFill} style={{ width: `${widthPct}%` }} />
              </div>
              <span>{count}</span>
            </div>
          );
        })}
      </Card>
    </div>
  );
};

ProgressChart.propTypes = {
  history: PropTypes.array.isRequired,
  workoutPlan: PropTypes.object.isRequired,
};

export default ProgressChart;
