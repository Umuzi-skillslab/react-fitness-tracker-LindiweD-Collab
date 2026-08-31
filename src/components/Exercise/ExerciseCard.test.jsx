import { render, screen, fireEvent } from '@testing-library/react';
import ExerciseCard from './ExerciseCard';

const mockExercise = {
  id: 1,
  name: 'Push-ups',
  category: 'strength',
  muscleGroups: ['Chest', 'Triceps'],
  difficulty: 'beginner',
  duration: 10,
  caloriesBurn: 50,
};

describe('ExerciseCard', () => {
  test('renders the exercise name', () => {
    render(<ExerciseCard exercise={mockExercise} onSelect={() => {}} />);
    expect(screen.getByText('Push-ups')).toBeInTheDocument();
  });

  test('displays the difficulty badge', () => {
    render(<ExerciseCard exercise={mockExercise} onSelect={() => {}} />);
    expect(screen.getByText(/Beginner/)).toBeInTheDocument();
  });

  test('calls onSelect with the exercise id when clicked', () => {
    const mockOnSelect = jest.fn();
    render(<ExerciseCard exercise={mockExercise} onSelect={mockOnSelect} />);

    fireEvent.click(screen.getByText('Push-ups'));
    expect(mockOnSelect).toHaveBeenCalledWith(1);
  });

  test('shows an "In plan" indicator when isInPlan is true', () => {
    render(<ExerciseCard exercise={mockExercise} onSelect={() => {}} isInPlan />);
    expect(screen.getByText(/In plan/)).toBeInTheDocument();
  });
});
