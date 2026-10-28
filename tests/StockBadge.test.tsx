import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { StockBadge } from '../src/components/StockBadge';

describe('StockBadge', () => {
  it('renders status', () => {
    render(<StockBadge status="low-stock" quantity={3} />);
    expect(screen.getByText(/low stock/i)).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<StockBadge status="in-stock" />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
