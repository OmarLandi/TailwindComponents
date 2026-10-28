import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { CartItem } from '../src/components/CartItem';

describe('CartItem', () => {
  it('calls remove', async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    render(<CartItem title="Notebook" price={24} quantity={2} onRemove={onRemove} />);
    await user.click(screen.getByRole('button', { name: /remove/i }));
    expect(onRemove).toHaveBeenCalled();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<CartItem title="Notebook" price={24} quantity={2} />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
