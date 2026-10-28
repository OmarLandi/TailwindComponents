import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { Stat } from '../src/components/Stat';

describe('Stat', () => {
  it('renders value', () => {
    render(<Stat label="Revenue" value="$10" />);
    expect(screen.getByText('$10')).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Stat label="Revenue" value="$10" />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
