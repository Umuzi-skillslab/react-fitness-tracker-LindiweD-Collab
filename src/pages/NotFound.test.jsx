import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import NotFound from './NotFound';

describe('NotFound', () => {
  test('renders the 404 message', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
  });

  test('"Go Home" navigates back to the root route', () => {
    render(
      <MemoryRouter initialEntries={['/nowhere']}>
        <Routes>
          <Route path="/" element={<div>Home page</div>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText('Go Home'));
    expect(screen.getByText('Home page')).toBeInTheDocument();
  });
});
