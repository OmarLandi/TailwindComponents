import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';

import { VisuallyHidden } from '../src/components/VisuallyHidden';

describe('VisuallyHidden', () => {
  it('renders text for assistive technology only', () => {
    render(<VisuallyHidden>Hidden label</VisuallyHidden>);

    expect(screen.getByText('Hidden label')).toHaveClass('sr-only');
  });

  it('renders as child using Slot', () => {
    render(
      <VisuallyHidden asChild>
        <span data-testid="hidden-target">Hidden</span>
      </VisuallyHidden>
    );

    expect(screen.getByTestId('hidden-target')).toHaveClass('sr-only');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <button type="button">
        <span aria-hidden="true">+</span>
        <VisuallyHidden>Add item</VisuallyHidden>
      </button>
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
    expect(screen.getByRole('button', { name: 'Add item' })).toBeInTheDocument();
  });
});
