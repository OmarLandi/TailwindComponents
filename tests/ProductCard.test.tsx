import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { ProductCard } from '../src/components/ProductCard';

describe('ProductCard', () => {
  it('renders title and price', () => {
    render(<ProductCard title="Notebook" price={24} />);
    expect(screen.getByText('Notebook')).toBeInTheDocument();
  });

  it('calls add to cart', async () => {
    const onAddToCart = vi.fn();
    render(<ProductCard title="Notebook" price={24} onAddToCart={onAddToCart} />);
    const { getByRole } = screen;
    await getByRole('button', { name: /add to cart/i }).click();
    expect(onAddToCart).toHaveBeenCalled();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<ProductCard title="Notebook" price={24} />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
