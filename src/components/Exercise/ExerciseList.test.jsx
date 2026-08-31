import { render, screen } from '@testing-library/react';
import ExerciseList from './ExerciseList';

const exercises = [
  { id: 1, name: 'Push-ups', category: 'strength', difficulty: 'beginner', duration: 10, caloriesBurn: 50 },
  { id: 2, name: 'Squats', category: 'strength', difficulty: 'beginner', duration: 10, caloriesBurn: 60 },
];

describe('ExerciseList conditional rendering', () => {
  test('shows the loading state', () => {
    render(<ExerciseList exercises={[]} isLoading onSelectExercise={() => {}} />);
    expect(screen.getByText('Loading exercises...')).toBeInTheDocument();
  });

  test('shows the empty state when there are no exercises', () => {
    render(<ExerciseList exercises={[]} isLoading={false} onSelectExercise={() => {}} />);
    expect(screen.getByText(/No exercises match/)).toBeInTheDocument();
  });

  test('shows the error state when an error is present', () => {
    render(
      <ExerciseList
        exercises={[]}
        isLoading={false}
        error="Failed to load exercises"
        onSelectExercise={() => {}}
      />
    );
    expect(screen.getByText('Failed to load exercises')).toBeInTheDocument();
  });

  test('renders one ExerciseCard per exercise via map', () => {
    render(<ExerciseList exercises={exercises} onSelectExercise={() => {}} />);
    expect(screen.getByText('Push-ups')).toBeInTheDocument();
    expect(screen.getByText('Squats')).toBeInTheDocument();
  });
});
