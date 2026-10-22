import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';

import { Grid } from '../src/components/Grid';

describe('Grid', () => {
  it('renders one column by default', () => {
    const { container } = render(<Grid>Content</Grid>);
    expect(container.firstChild).toHaveClass('grid', 'grid-cols-1', 'gap-4');
  });

  it('supports responsive column objects', () => {
    const { container } = render(
      <Grid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap="lg">
        Content
      </Grid>
    );
    const root = container.firstChild;

    expect(root).toHaveClass(
      'grid-cols-1',
      'sm:grid-cols-2',
      'md:grid-cols-3',
      'lg:grid-cols-4',
      'gap-6'
    );
  });

  it('supports minItemWidth with an auto-fit style', () => {
    const { container } = render(<Grid minItemWidth="18rem">Content</Grid>);
    const root = container.firstChild as HTMLElement;

    expect(root.style.gridTemplateColumns).toContain('auto-fit');
    expect(root.style.gridTemplateColumns).toContain('18rem');
  });

  it('renders as child using Slot', () => {
    render(
      <Grid asChild columns={2}>
        <ul data-testid="grid-target">
          <li>One</li>
          <li>Two</li>
        </ul>
      </Grid>
    );

    expect(screen.getByTestId('grid-target')).toHaveClass('grid', 'grid-cols-2');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <Grid columns={{ base: 1, sm: 2 }}>
        <div>One</div>
        <div>Two</div>
      </Grid>
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
