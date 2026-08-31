import { render, screen, fireEvent } from '@testing-library/react';
import DayCard from './DayCard';

const exercises = [
  { id: 1, name: 'Push-ups' },
  { id: 2, name: 'Squats' },
];

describe('DayCard', () => {
  test('shows a rest-day message when there are no exercises', () => {
    render(
      <DayCard day="monday" exercises={[]} onRemoveExercise={() => {}} onClearDay={() => {}} />
    );
    expect(screen.getByText(/Rest day/)).toBeInTheDocument();
  });

  test('renders one chip per exercise via map', () => {
    render(
      <DayCard
        day="monday"
        exercises={exercises}
        onRemoveExercise={() => {}}
        onClearDay={() => {}}
      />
    );
    expect(screen.getByText('Push-ups')).toBeInTheDocument();
    expect(screen.getByText('Squats')).toBeInTheDocument();
  });

  test('calls onRemoveExercise with day and index when the remove button is clicked', () => {
    const mockOnRemove = jest.fn();
    render(
      <DayCard
        day="monday"
        exercises={exercises}
        onRemoveExercise={mockOnRemove}
        onClearDay={() => {}}
      />
    );
    fireEvent.click(screen.getByLabelText('Remove Push-ups from monday'));
    expect(mockOnRemove).toHaveBeenCalledWith('monday', 0);
  });

  test('calls onClearDay when Clear is clicked', () => {
    const mockOnClear = jest.fn();
    render(
      <DayCard
        day="monday"
        exercises={exercises}
        onRemoveExercise={() => {}}
        onClearDay={mockOnClear}
      />
    );
    fireEvent.click(screen.getByText('Clear'));
    expect(mockOnClear).toHaveBeenCalledWith('monday');
  });
});
