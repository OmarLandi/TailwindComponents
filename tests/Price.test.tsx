import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { Price } from '../src/components/Price';

describe('Price', () => {
  it('renders amount', () => {
    render(<Price amount={10} />);
    expect(screen.getByText(/\$10/)).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Price amount={10} originalAmount={15} />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
