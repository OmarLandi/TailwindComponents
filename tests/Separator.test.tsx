import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';

import { Separator } from '../src/components/Separator';

describe('Separator', () => {
  it('renders a horizontal separator by default', () => {
    render(<Separator />);
    const separator = screen.getByRole('separator');
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveAttribute('data-orientation', 'horizontal');
  });

  it('supports vertical orientation', () => {
    render(<Separator orientation="vertical" />);
    const separator = screen.getByRole('separator');
    expect(separator).toHaveAttribute('data-orientation', 'vertical');
    expect(separator).toHaveClass('w-px');
  });

  it('merges className', () => {
    render(<Separator className="my-4" />);
    expect(screen.getByRole('separator')).toHaveClass('my-4');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <div>
        <p>Above</p>
        <Separator />
        <p>Below</p>
      </div>
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
