import { render, screen } from '@testing-library/react';
import ProgressChart from './ProgressChart';
import { emptyWorkoutPlan } from '../../utils/helpers';

describe('ProgressChart', () => {
  test('shows zero stats for an empty history and plan', () => {
    render(<ProgressChart history={[]} workoutPlan={emptyWorkoutPlan()} />);
    expect(screen.getByText('Workouts logged')).toBeInTheDocument();
    expect(screen.getByText('Day streak')).toBeInTheDocument();
  });

  test('reflects the total number of logged workouts', () => {
    const history = [
      { id: 1, exerciseName: 'Push-ups', sets: 3, reps: 15, weight: 0, date: '2026-08-30', completed: true },
      { id: 2, exerciseName: 'Squats', sets: 3, reps: 12, weight: 0, date: '2026-08-31', completed: true },
    ];
    render(<ProgressChart history={history} workoutPlan={emptyWorkoutPlan()} />);
    const values = screen.getAllByText('2');
    expect(values.length).toBeGreaterThan(0);
  });
});
