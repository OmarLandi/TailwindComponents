import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { BreakingNewsBanner } from '../src/components/BreakingNewsBanner';

describe('BreakingNewsBanner', () => {
  it('renders title', () => {
    render(<BreakingNewsBanner title="Update available" />);
    expect(screen.getByText('Update available')).toBeInTheDocument();
  });

  it('dismisses when requested', async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(<BreakingNewsBanner title="Update available" dismissible onDismiss={onDismiss} />);
    await user.click(screen.getByRole('button', { name: /dismiss/i }));
    expect(onDismiss).toHaveBeenCalled();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<BreakingNewsBanner title="Update available" />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
