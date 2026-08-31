import { render, screen } from '@testing-library/react';
import WorkoutPlanner from './WorkoutPlanner';
import { emptyWorkoutPlan } from '../../utils/helpers';

describe('WorkoutPlanner', () => {
  test('renders all seven days of the week', () => {
    render(
      <WorkoutPlanner
        workoutPlan={emptyWorkoutPlan()}
        onRemoveExercise={() => {}}
        onClearDay={() => {}}
      />
    );
    ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].forEach(
      (day) => {
        expect(screen.getByText(day, { selector: 'h4' })).toBeInTheDocument();
      }
    );
  });

  test('shows an empty-week message when nothing is planned', () => {
    render(
      <WorkoutPlanner
        workoutPlan={emptyWorkoutPlan()}
        onRemoveExercise={() => {}}
        onClearDay={() => {}}
      />
    );
    expect(screen.getByText(/Your week is empty/)).toBeInTheDocument();
  });

  test('sums and displays the total number of planned exercises', () => {
    const plan = { ...emptyWorkoutPlan(), monday: [{ id: 1, name: 'Push-ups' }] };
    render(<WorkoutPlanner workoutPlan={plan} onRemoveExercise={() => {}} onClearDay={() => {}} />);
    expect(screen.getByText(/1 exercise planned this week/)).toBeInTheDocument();
  });
});
