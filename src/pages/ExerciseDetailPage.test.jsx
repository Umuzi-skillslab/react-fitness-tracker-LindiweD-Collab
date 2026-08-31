import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ExerciseDetailPage from './ExerciseDetailPage';

const renderAtId = (id) =>
  render(
    <MemoryRouter initialEntries={[`/exercises/${id}`]}>
      <Routes>
        <Route path="/exercises/:id" element={<ExerciseDetailPage />} />
        <Route path="/exercises" element={<div>Exercises list page</div>} />
      </Routes>
    </MemoryRouter>
  );

describe('ExerciseDetailPage', () => {
  test('reads the :id route param and renders the matching exercise', () => {
    renderAtId(1);
    expect(screen.getByText('Push-ups')).toBeInTheDocument();
  });

  test('shows an empty state for an id that does not exist', () => {
    renderAtId(9999);
    expect(screen.getByText(/No exercise found/)).toBeInTheDocument();
  });

  test('"Back to Exercises" performs programmatic navigation to /exercises', () => {
    renderAtId(1);
    fireEvent.click(screen.getByText('← Back to Exercises'));
    expect(screen.getByText('Exercises list page')).toBeInTheDocument();
  });

  test('"Next exercise" performs programmatic navigation to the next id', () => {
    renderAtId(1);
    fireEvent.click(screen.getByText('Next exercise →'));
    expect(screen.getByText('Bodyweight Squats')).toBeInTheDocument();
  });
});
