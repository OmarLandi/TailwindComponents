import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { ReactionBar } from '../src/components/ReactionBar';

describe('ReactionBar', () => {
  it('calls like handler', async () => {
    const user = userEvent.setup();
    const onLike = vi.fn();
    render(<ReactionBar likes={2} onLike={onLike} />);
    await user.click(screen.getByRole('button', { name: /like/i }));
    expect(onLike).toHaveBeenCalled();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<ReactionBar likes={2} comments={1} shares={1} />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
