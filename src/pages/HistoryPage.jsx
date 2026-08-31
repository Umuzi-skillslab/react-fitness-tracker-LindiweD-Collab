import PropTypes from 'prop-types';
import WorkoutLog from '../components/WorkoutLog/WorkoutLog';

/** HistoryPage — hosts the WorkoutLog form and history list. */
const HistoryPage = ({ history, onLogWorkout }) => (
  <div className="container">
    <h1>Workout History</h1>
    <WorkoutLog history={history} onLogWorkout={onLogWorkout} />
  </div>
);

HistoryPage.propTypes = {
  history: PropTypes.array.isRequired,
  onLogWorkout: PropTypes.func.isRequired,
};

export default HistoryPage;
