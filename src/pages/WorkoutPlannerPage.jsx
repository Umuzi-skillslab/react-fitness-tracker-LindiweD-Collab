import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import WorkoutPlanner from '../components/WorkoutPlanner/WorkoutPlanner';
import Button from '../components/UI/Button';
import styles from './pages.module.css';

/** WorkoutPlannerPage — hosts the weekly WorkoutPlanner, driven by lifted state from App. */
const WorkoutPlannerPage = ({ workoutPlan, onRemoveExercise, onClearDay }) => (
  <div className="container">
    <div className={styles.pageHeader}>
      <h1>Workout Planner</h1>
      <Link to="/exercises">
        <Button variant="primary">Add exercises</Button>
      </Link>
    </div>
    <WorkoutPlanner
      workoutPlan={workoutPlan}
      onRemoveExercise={onRemoveExercise}
      onClearDay={onClearDay}
    />
  </div>
);

WorkoutPlannerPage.propTypes = {
  workoutPlan: PropTypes.object.isRequired,
  onRemoveExercise: PropTypes.func.isRequired,
  onClearDay: PropTypes.func.isRequired,
};

export default WorkoutPlannerPage;
