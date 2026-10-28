import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { Chart } from '../src/components/Chart';

describe('Chart', () => {
  it('renders labels', () => {
    render(<Chart data={[{ label: 'Jan', value: 10 }]} />);
    expect(screen.getByText('Jan')).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Chart data={[{ label: 'Jan', value: 10 }]} />);
    const results = await axe.run(container);
    console.log(
      JSON.stringify(
        results.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.html) })),
        null,
        2
      )
    );
    expect(results.violations).toHaveLength(0);
  });
});
