import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { ShareBar } from '../src/components/ShareBar';

describe('ShareBar', () => {
  it('renders share links', () => {
    render(<ShareBar url="https://example.com" />);
    expect(screen.getByRole('link', { name: /share on x/i })).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<ShareBar url="https://example.com" />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
