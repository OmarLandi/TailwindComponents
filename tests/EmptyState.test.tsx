import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { Inbox } from 'lucide-react';

import { Button } from '../src/components/Button';
import { EmptyState } from '../src/components/EmptyState';

describe('EmptyState', () => {
  it('renders an accessible named group with title and description', () => {
    render(
      <EmptyState
        title="No messages"
        description="New messages will appear here."
        icon={<Inbox />}
      />
    );

    expect(screen.getByRole('group', { name: 'No messages' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'No messages' })).toBeInTheDocument();
    expect(screen.getByText('New messages will appear here.')).toBeInTheDocument();
  });

  it('supports heading levels and action slots', async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();

    render(
      <EmptyState
        title="No projects"
        headingLevel={2}
        action={<Button onClick={onAction}>New project</Button>}
        secondaryAction={<Button variant="outline">Import</Button>}
      />
    );

    expect(screen.getByRole('heading', { level: 2, name: 'No projects' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'New project' }));
    expect(onAction).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: 'Import' })).toBeInTheDocument();
  });

  it('applies surface and size variants', () => {
    const { container } = render(
      <EmptyState title="Nothing here" variant="muted" size="lg" />
    );

    const root = container.firstChild;
    expect(root).toHaveClass('bg-muted/30', 'border-dashed', 'py-16');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <EmptyState
        title="No results found"
        description="Try a different search term."
        icon={<Inbox />}
        variant="outline"
        action={<Button>Clear filters</Button>}
      />
    );

    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
