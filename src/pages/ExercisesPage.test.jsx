import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ExercisesPage from './ExercisesPage';
import { emptyWorkoutPlan } from '../utils/helpers';

const renderPage = () =>
  render(
    <MemoryRouter>
      <ExercisesPage workoutPlan={emptyWorkoutPlan()} onAddToDay={() => {}} />
    </MemoryRouter>
  );

describe('ExercisesPage async loading', () => {
  test('shows a loading state, then displays exercises once loaded', async () => {
    renderPage();
    expect(screen.getByText('Loading exercises...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Push-ups')).toBeInTheDocument();
    });
  });

  test('filters exercises by search term after loading', async () => {
    renderPage();
    await waitFor(() => screen.getByText('Push-ups'));

    const input = screen.getByPlaceholderText('Search exercises...');
    fireEvent.change(input, { target: { value: 'Push' } });

    expect(screen.getByText('Push-ups')).toBeInTheDocument();
    expect(screen.queryByText('Bodyweight Squats')).not.toBeInTheDocument();
  });

  test('opens a detail modal when an exercise card is clicked', async () => {
    renderPage();
    await waitFor(() => screen.getByText('Push-ups'));

    fireEvent.click(screen.getByText('Push-ups'));
    expect(screen.getByText('Instructions')).toBeInTheDocument();
  });
});
