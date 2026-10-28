import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { InfiniteScroll } from '../src/components/InfiniteScroll';

describe('InfiniteScroll', () => {
  it('renders children', () => {
    render(<InfiniteScroll>Content</InfiniteScroll>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<InfiniteScroll>Content</InfiniteScroll>);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
