import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { Collapsible } from '../src/components/Collapsible';

describe('Collapsible', () => {
  it('toggles content', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Collapsible title="Details" onOpenChange={onOpenChange}>
        Content
      </Collapsible>
    );
    await user.click(screen.getByRole('button', { name: /details/i }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Collapsible title="Details">Content</Collapsible>);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
