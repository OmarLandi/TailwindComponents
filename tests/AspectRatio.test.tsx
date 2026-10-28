import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';

import { AspectRatio } from '../src/components/AspectRatio';

describe('AspectRatio', () => {
  it('renders children with a default 16/9 ratio', () => {
    const { container } = render(
      <AspectRatio>
        <img alt="Demo" src="/demo.png" />
      </AspectRatio>
    );

    const root = container.firstChild as HTMLElement;
    expect(root.getAttribute('style')).toContain('aspect-ratio');
    expect(screen.getByAltText('Demo')).toBeInTheDocument();
  });

  it('supports a numeric ratio', () => {
    const { container } = render(<AspectRatio ratio={1}>{null}</AspectRatio>);
    expect((container.firstChild as HTMLElement).getAttribute('style')).toContain('aspect-ratio');
  });

  it('supports a string ratio and merges className', () => {
    const { container } = render(<AspectRatio ratio="4/3" className="rounded-md" />);
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveStyle({ aspectRatio: '4/3' });
    expect(root).toHaveClass('rounded-md');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <AspectRatio>
        <img alt="Demo" src="/demo.png" />
      </AspectRatio>
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
