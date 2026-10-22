import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';

import { Button } from '../src/components/Button';
import { PageHeader } from '../src/components/PageHeader';

describe('PageHeader', () => {
  it('renders a named page header with title, description and actions', () => {
    render(
      <PageHeader
        title="Settings"
        description="Manage your workspace preferences."
        actions={<Button>Save</Button>}
      />
    );

    const header = screen.getByRole('banner', { name: 'Settings' });
    expect(header).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: 'Settings' })).toBeInTheDocument();
    expect(screen.getByText('Manage your workspace preferences.')).toBeInTheDocument();
    expect(header).toHaveAttribute('aria-describedby');
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('supports breadcrumb, tabs, heading level and sticky mode', () => {
    const { container } = render(
      <PageHeader
        title="Projects"
        titleAs="h2"
        breadcrumb={<span>Workspace / Projects</span>}
        tabs={<span>All projects</span>}
        sticky
      />
    );
    const header = container.firstChild;

    expect(screen.getByRole('heading', { level: 2, name: 'Projects' })).toBeInTheDocument();
    expect(screen.getByText('Workspace / Projects')).toBeInTheDocument();
    expect(screen.getByText('All projects')).toBeInTheDocument();
    expect(header).toHaveClass('sticky', 'top-0');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <PageHeader
        title="Dashboard"
        description="Overview of your workspace."
        actions={<Button>Create</Button>}
      />
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
