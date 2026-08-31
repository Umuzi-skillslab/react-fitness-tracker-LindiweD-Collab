import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';

describe('Modal', () => {
  test('renders title and children', () => {
    render(
      <Modal onClose={() => {}} title="Exercise Detail">
        <p>Details go here</p>
      </Modal>
    );
    expect(screen.getByText('Exercise Detail')).toBeInTheDocument();
    expect(screen.getByText('Details go here')).toBeInTheDocument();
  });

  test('calls onClose when the close button is clicked', () => {
    const mockOnClose = jest.fn();
    render(
      <Modal onClose={mockOnClose} title="Detail">
        <p>Content</p>
      </Modal>
    );
    fireEvent.click(screen.getByLabelText('Close'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when Escape is pressed', () => {
    const mockOnClose = jest.fn();
    render(
      <Modal onClose={mockOnClose} title="Detail">
        <p>Content</p>
      </Modal>
    );
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
