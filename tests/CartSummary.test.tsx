import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { CartSummary } from '../src/components/CartSummary';

describe('CartSummary', () => {
  it('renders total', () => {
    render(<CartSummary subtotal={10} total={10} />);
    expect(screen.getByText(/order summary/i)).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<CartSummary subtotal={10} total={10} />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
