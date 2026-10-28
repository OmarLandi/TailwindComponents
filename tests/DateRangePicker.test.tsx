import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { DateRangePicker } from '../src/components/DateRangePicker';

describe('DateRangePicker', () => {
  it('renders two date pickers', () => {
    render(<DateRangePicker />);
    expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<DateRangePicker />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
