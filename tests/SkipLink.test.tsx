import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';

import { SkipLink } from '../src/components/SkipLink';

describe('SkipLink', () => {
  it('renders a link to the main landmark', () => {
    render(<SkipLink />);
    const link = screen.getByRole('link', { name: 'Skip to content' });

    expect(link).toHaveAttribute('href', '#main');
    expect(link).toHaveClass('sr-only', 'focus:not-sr-only', 'focus:fixed');
  });

  it('supports custom text and target', () => {
    render(<SkipLink href="#content">Go to content</SkipLink>);
    const link = screen.getByRole('link', { name: 'Go to content' });

    expect(link).toHaveAttribute('href', '#content');
  });

  it('is reachable with the keyboard', async () => {
    const user = userEvent.setup();
    render(<SkipLink />);

    await user.tab();
    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveFocus();
  });

  it('renders as child using Slot', () => {
    render(
      <SkipLink asChild>
        <a data-testid="skip-target" href="#main">
          Skip
        </a>
      </SkipLink>
    );

    expect(screen.getByTestId('skip-target')).toHaveClass('sr-only');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <div>
        <SkipLink />
        <main id="main">Content</main>
      </div>
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
