import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { Composer } from '../src/components/Composer';

describe('Composer', () => {
  it('calls onSubmit', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<Composer onSubmit={onSubmit} />);
    await user.type(screen.getByRole('textbox'), 'Hello world');
    await user.click(screen.getByRole('button', { name: /post/i }));
    expect(onSubmit).toHaveBeenCalledWith('Hello world');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Composer />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
