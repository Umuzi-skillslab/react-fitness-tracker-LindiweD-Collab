import PropTypes from 'prop-types';
import ProgressChart from '../components/WorkoutLog/ProgressChart';

const ProgressPage = ({ history, workoutPlan }) => (
  <div className="container">
    <h1>Your Progress</h1>
    <ProgressChart history={history} workoutPlan={workoutPlan} />
  </div>
);

ProgressPage.propTypes = {
  history: PropTypes.array.isRequired,
  workoutPlan: PropTypes.object.isRequired,
};

export default ProgressPage;
