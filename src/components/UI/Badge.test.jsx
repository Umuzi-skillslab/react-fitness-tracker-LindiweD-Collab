import { render, screen } from '@testing-library/react';
import Badge from './Badge';

describe('Badge', () => {
  test('renders a capitalized difficulty value', () => {
    render(<Badge value="beginner" />);
    expect(screen.getByText('Beginner')).toBeInTheDocument();
  });

  test('shows a difficulty icon when showIcon is true', () => {
    render(<Badge value="advanced" showIcon />);
    expect(screen.getByText(/🔴 Advanced/)).toBeInTheDocument();
  });
});
