import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { NumberInput } from '../src/components/NumberInput';

describe('NumberInput', () => {
  it('renders value', () => {
    render(<NumberInput value={3} />);
    expect(screen.getByDisplayValue('3')).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<NumberInput value={3} />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
