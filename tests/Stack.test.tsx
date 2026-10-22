import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';

import { Stack } from '../src/components/Stack';

describe('Stack', () => {
  it('renders a column stack with default spacing', () => {
    const { container } = render(<Stack>Content</Stack>);
    const root = container.firstChild;

    expect(root).toHaveClass('flex', 'flex-col', 'gap-4', 'items-stretch', 'justify-start');
  });

  it('supports direction, gap, align, justify and wrap', () => {
    const { container } = render(
      <Stack direction="row" gap="lg" align="center" justify="between" wrap>
        Content
      </Stack>
    );
    const root = container.firstChild;

    expect(root).toHaveClass(
      'flex-row',
      'gap-6',
      'items-center',
      'justify-between',
      'flex-wrap'
    );
  });

  it('renders as child using Slot', () => {
    render(
      <Stack asChild gap="sm">
        <section data-testid="stack-target">Content</section>
      </Stack>
    );

    expect(screen.getByTestId('stack-target')).toHaveClass('flex', 'flex-col', 'gap-2');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <Stack>
        <h2>Title</h2>
        <p>Content</p>
      </Stack>
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
