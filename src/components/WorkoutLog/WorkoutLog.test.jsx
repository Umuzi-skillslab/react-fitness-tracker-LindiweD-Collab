import { render, screen, fireEvent } from '@testing-library/react';
import WorkoutLog from './WorkoutLog';

describe('WorkoutLog', () => {
  test('shows an empty state when there is no history', () => {
    render(<WorkoutLog history={[]} onLogWorkout={() => {}} />);
    expect(screen.getByText(/No workouts logged yet/)).toBeInTheDocument();
  });

  test('renders history entries when present', () => {
    render(
      <WorkoutLog
        history={[
          { id: 1, exerciseName: 'Push-ups', sets: 3, reps: 15, weight: 0, date: '2026-08-01', completed: true },
        ]}
        onLogWorkout={() => {}}
      />
    );
    // "Push-ups" appears both as a <select> option and as the logged entry
    // name, so assert on the strong-tagged history entry specifically.
    expect(screen.getByText('Push-ups', { selector: 'strong' })).toBeInTheDocument();
  });

  test('calls onLogWorkout with form data on submit (mock function)', () => {
    const mockOnLog = jest.fn();
    render(<WorkoutLog history={[]} onLogWorkout={mockOnLog} />);

    fireEvent.change(screen.getByLabelText(/Sets/), { target: { value: '5' } });
    fireEvent.click(screen.getByText('Log Workout'));

    expect(mockOnLog).toHaveBeenCalledTimes(1);
    expect(mockOnLog.mock.calls[0][0]).toMatchObject({ sets: 5, completed: true });
  });
});
