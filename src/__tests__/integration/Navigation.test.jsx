import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';

describe('Navigation (integration)', () => {
  test('clicking a nav link navigates to the Exercises page', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('link', { name: 'Exercises' }));
    expect(await screen.findByText('Browse Exercises')).toBeInTheDocument();
  });

  test('clicking Workout Planner navigates and shows all seven days', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('link', { name: 'Workout Planner' }));
    expect(screen.getByRole('heading', { name: 'Workout Planner' })).toBeInTheDocument();
    expect(screen.getByText('Sunday', { selector: 'h4' })).toBeInTheDocument();
  });

  test('shows the 404 page for an unmatched route', () => {
    render(
      <MemoryRouter initialEntries={['/this-route-does-not-exist']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
  });
});
