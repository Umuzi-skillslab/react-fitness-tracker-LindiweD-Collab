import { render, screen } from '@testing-library/react';
import LogEntry from './LogEntry';

describe('LogEntry', () => {
  test('shows "Completed" when the entry is completed', () => {
    render(
      <LogEntry
        entry={{ exerciseName: 'Push-ups', sets: 3, reps: 15, weight: 0, date: '2026-08-01', completed: true }}
      />
    );
    expect(screen.getByText('Completed ✓')).toBeInTheDocument();
  });

  test('shows "Pending" when the entry is not completed', () => {
    render(
      <LogEntry
        entry={{ exerciseName: 'Squats', sets: 3, reps: 12, weight: 20, date: '2026-08-01', completed: false }}
      />
    );
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByText(/20kg/)).toBeInTheDocument();
  });
});
