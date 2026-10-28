import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { ErrorState } from '../src/components/ErrorState';

describe('ErrorState', () => {
  it('renders title', () => {
    render(<ErrorState title="Failed" />);
    expect(screen.getByText('Failed')).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<ErrorState title="Failed" />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
