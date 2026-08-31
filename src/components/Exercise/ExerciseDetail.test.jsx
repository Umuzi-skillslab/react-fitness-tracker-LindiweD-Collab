import { render, screen, fireEvent } from '@testing-library/react';
import ExerciseDetail from './ExerciseDetail';

const mockExercise = {
  id: 1,
  name: 'Push-ups',
  category: 'strength',
  difficulty: 'beginner',
  muscleGroups: ['Chest', 'Triceps'],
  duration: 10,
  sets: 3,
  reps: 15,
  caloriesBurn: 50,
  instructions: ['Start in a plank.', 'Lower your chest.'],
  videoUrl: '/video.mp4',
};

describe('ExerciseDetail', () => {
  test('renders the exercise name, instructions, and video', () => {
    render(<ExerciseDetail exercise={mockExercise} />);
    expect(screen.getByText('Push-ups')).toBeInTheDocument();
    expect(screen.getByText('Start in a plank.')).toBeInTheDocument();
    expect(screen.getByLabelText('Push-ups — Form Demo demonstration video')).toBeInTheDocument();
  });

  test('calls onAddToDay with the day and exercise when a day button is clicked', () => {
    const mockOnAdd = jest.fn();
    render(<ExerciseDetail exercise={mockExercise} onAddToDay={mockOnAdd} />);

    fireEvent.click(screen.getByText('Mon'));
    expect(mockOnAdd).toHaveBeenCalledWith('monday', mockExercise);
  });
});
