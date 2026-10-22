import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import axe from 'axe-core';
import { Skeleton } from '../src/components/Skeleton';

describe('Skeleton', () => {
  it('renders with className', () => {
    const { container } = render(<Skeleton className="h-4 w-full" />);
    const div = container.firstChild as HTMLElement;
    expect(div).toHaveClass('h-4', 'w-full');
  });

  it('renders with animate-pulse class', () => {
    const { container } = render(<Skeleton />);
    const div = container.firstChild as HTMLElement;
    expect(div).toHaveClass('animate-pulse');
  });

  it('renders with bg-muted', () => {
    const { container } = render(<Skeleton />);
    const div = container.firstChild as HTMLElement;
    expect(div).toHaveClass('bg-muted');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Skeleton className="h-4 w-4" />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
