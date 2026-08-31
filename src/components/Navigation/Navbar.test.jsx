import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

const renderNavbar = (initialPath = '/') =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Navbar />
    </MemoryRouter>
  );

describe('Navbar', () => {
  test('renders a link to every main route', () => {
    renderNavbar();
    ['Home', 'Exercises', 'Workout Planner', 'History', 'Progress'].forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  test('marks the Exercises link active when on /exercises', () => {
    renderNavbar('/exercises');
    expect(screen.getByText('Exercises').className).toMatch(/active/);
    expect(screen.getByText('Home').className).not.toMatch(/active/);
  });

  test('toggles the mobile menu open state when hamburger is clicked', () => {
    renderNavbar();
    const toggle = screen.getByLabelText('Toggle navigation menu');
    fireEvent.click(toggle);
    expect(screen.getByLabelText('Toggle navigation menu')).toHaveTextContent('✕');
  });
});
