import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  test('renders its children text', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  test('calls onClick handler when clicked (mock function)', () => {
    const mockOnClick = jest.fn();
    render(<Button onClick={mockOnClick}>Click Me</Button>);

    fireEvent.click(screen.getByText('Click Me'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('defaults to the primary variant when none is given', () => {
    render(<Button>Default</Button>);
    expect(screen.getByText('Default').className).toMatch(/primary/);
  });

  test('fires a mocked onSubmit when used as a submit button in a form', () => {
    const mockOnSubmit = jest.fn((e) => e.preventDefault());
    render(
      <form onSubmit={mockOnSubmit}>
        <Button type="submit">Submit</Button>
      </form>
    );

    fireEvent.click(screen.getByText('Submit'));
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });
});
