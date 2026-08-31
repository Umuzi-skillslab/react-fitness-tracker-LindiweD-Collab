import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';

beforeEach(() => {
  window.localStorage.clear();
});

describe('Workout flow (integration)', () => {
  test('user can add an exercise to a day and see it in the Workout Planner', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Go to Exercises and wait for the async load to finish.
    fireEvent.click(screen.getByRole('link', { name: 'Exercises' }));
    await waitFor(() => screen.getByText('Push-ups'));

    // Open the exercise's detail modal.
    fireEvent.click(screen.getByText('Push-ups'));
    await screen.findByText('Instructions');

    // Add it to Monday.
    fireEvent.click(screen.getByText('Mon'));

    // Navigate to the Workout Planner and confirm it landed on Monday.
    fireEvent.click(screen.getByRole('link', { name: 'Workout Planner' }));
    expect(screen.getAllByText('Push-ups')[0]).toBeInTheDocument();
  });

  test('user can log a workout and see it appear in History', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('link', { name: 'History' }));
    fireEvent.click(screen.getByText('Log Workout'));

    expect(screen.getByText(/3 sets × 10 reps/)).toBeInTheDocument();
  });
});
