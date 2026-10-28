import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { NotificationItem } from '../src/components/NotificationItem';

describe('NotificationItem', () => {
  it('calls onClick', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<NotificationItem title="New message" onClick={onClick} />);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<NotificationItem title="New message" />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
