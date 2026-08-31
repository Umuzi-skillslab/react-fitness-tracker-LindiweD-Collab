import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from './SearchBar';

describe('SearchBar user interactions', () => {
  test('calls onSearch with the typed character on change', async () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar searchTerm="" onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search exercises...');
    await userEvent.type(input, 'a');

    expect(mockOnSearch).toHaveBeenCalledWith('a');
  });

  test('shows a Clear button once there is a search term, and calls onClear', () => {
    const mockOnClear = jest.fn();
    render(<SearchBar searchTerm="push" onSearch={() => {}} onClear={mockOnClear} />);

    const clearButton = screen.getByText('Clear');
    fireEvent.click(clearButton);
    expect(mockOnClear).toHaveBeenCalledTimes(1);
  });

  test('applies focused styling on focus and removes it on blur', () => {
    render(<SearchBar searchTerm="" onSearch={() => {}} />);
    const input = screen.getByPlaceholderText('Search exercises...');

    fireEvent.focus(input);
    expect(input.parentElement.className).toMatch(/focused/);

    fireEvent.blur(input);
    expect(input.parentElement.className).not.toMatch(/focused/);
  });
});
