import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { HoverCard } from '../src/components/HoverCard';

describe('HoverCard', () => {
  it('renders trigger', () => {
    render(<HoverCard trigger={<button type="button">Hover</button>} content="Details" />);
    expect(screen.getByRole('button', { name: /hover/i })).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <HoverCard trigger={<button type="button">Hover</button>} content="Details" />
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
