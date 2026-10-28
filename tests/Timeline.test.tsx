import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { Timeline } from '../src/components/Timeline';

describe('Timeline', () => {
  it('renders items', () => {
    render(<Timeline items={[{ id: '1', title: 'Created' }]} />);
    expect(screen.getByText('Created')).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Timeline items={[{ id: '1', title: 'Created' }]} />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
