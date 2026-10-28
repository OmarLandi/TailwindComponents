import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { Rating } from '../src/components/Rating';

describe('Rating', () => {
  it('calls onChange', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Rating onChange={onChange} />);
    await user.click(screen.getByRole('radio', { name: /3 stars/i }));
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Rating value={4} readOnly />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
