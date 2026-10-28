import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { NewsletterSignup } from '../src/components/NewsletterSignup';

describe('NewsletterSignup', () => {
  it('submits email', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<NewsletterSignup onSubmit={onSubmit} />);
    await user.type(screen.getByLabelText(/email address/i), 'ada@example.com');
    await user.click(screen.getByRole('button', { name: /subscribe/i }));
    expect(onSubmit).toHaveBeenCalledWith('ada@example.com');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<NewsletterSignup />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
