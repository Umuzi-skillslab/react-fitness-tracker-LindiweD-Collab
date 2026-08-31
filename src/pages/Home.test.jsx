import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

describe('Home page', () => {
  test('renders the hero heading and call-to-action links', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText('Train with intention.')).toBeInTheDocument();
    expect(screen.getByText('Browse Exercises')).toBeInTheDocument();
  });

  test('renders a motivational audio track', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText('Rise & Grind')).toBeInTheDocument();
  });
});
