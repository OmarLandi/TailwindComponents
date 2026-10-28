import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { TimePicker } from '../src/components/TimePicker';

describe('TimePicker', () => {
  it('renders label', () => {
    render(<TimePicker />);
    expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<TimePicker />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
