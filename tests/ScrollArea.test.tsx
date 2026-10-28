import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';

import { ScrollArea } from '../src/components/ScrollArea';

describe('ScrollArea', () => {
  it('renders its children', () => {
    render(
      <ScrollArea className="h-20 w-40">
        <p>Scrollable content</p>
      </ScrollArea>
    );

    expect(screen.getByText('Scrollable content')).toBeInTheDocument();
  });

  it('supports both orientations', () => {
    const { container } = render(
      <ScrollArea orientation="both" className="h-20 w-40">
        <div style={{ width: 300, height: 300 }}>Wide content</div>
      </ScrollArea>
    );

    expect(container.firstChild).toHaveClass('relative');
    expect(screen.getByText('Wide content')).toBeInTheDocument();
  });

  it('merges className', () => {
    const { container } = render(
      <ScrollArea className="custom-scroll">
        <p>Content</p>
      </ScrollArea>
    );

    expect(container.firstChild).toHaveClass('custom-scroll');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <ScrollArea className="h-20 w-40">
        <p>Scrollable content</p>
      </ScrollArea>
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
