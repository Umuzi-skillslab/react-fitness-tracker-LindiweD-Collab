import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
  test('renders its children (composition pattern)', () => {
    render(
      <Card>
        <p>Inner content</p>
      </Card>
    );
    expect(screen.getByText('Inner content')).toBeInTheDocument();
  });

  test('applies the raised class by default', () => {
    render(
      <Card>
        <span>Text</span>
      </Card>
    );
    expect(screen.getByText('Text').parentElement.className).toMatch(/raised/);
  });
});
