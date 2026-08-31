import { render, screen, fireEvent } from '@testing-library/react';
import ExerciseFilter from './ExerciseFilter';

const baseProps = {
  searchTerm: '',
  onSearchChange: jest.fn(),
  category: 'all',
  onCategoryChange: jest.fn(),
  muscleGroup: 'all',
  onMuscleGroupChange: jest.fn(),
  difficulty: 'all',
  onDifficultyChange: jest.fn(),
  onClearFilters: jest.fn(),
};

describe('ExerciseFilter', () => {
  test('calls onCategoryChange when a category is selected', () => {
    const onCategoryChange = jest.fn();
    render(<ExerciseFilter {...baseProps} onCategoryChange={onCategoryChange} />);

    fireEvent.change(screen.getByDisplayValue('All Categories'), {
      target: { value: 'cardio' },
    });
    expect(onCategoryChange).toHaveBeenCalledWith('cardio');
  });

  test('only shows the Clear filters button when a filter is active', () => {
    const { rerender } = render(<ExerciseFilter {...baseProps} />);
    expect(screen.queryByText('Clear filters')).not.toBeInTheDocument();

    rerender(<ExerciseFilter {...baseProps} category="strength" />);
    expect(screen.getByText('Clear filters')).toBeInTheDocument();
  });
});
