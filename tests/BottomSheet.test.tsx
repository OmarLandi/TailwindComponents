import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { BottomSheet } from '../src/components/BottomSheet';

describe('BottomSheet', () => {
  it('renders when open', () => {
    render(
      <BottomSheet open title="Filters">
        Content
      </BottomSheet>
    );
    expect(screen.getByText('Filters')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <BottomSheet open title="Filters">
        Content
      </BottomSheet>
    );
    const results = await axe.run(container);
    console.log(
      JSON.stringify(
        results.violations.map(v => ({ id: v.id, html: v.nodes.map(n => n.html) })),
        null,
        2
      )
    );
    expect(results.violations).toHaveLength(0);
  });
});
