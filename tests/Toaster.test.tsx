import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { Toaster } from '../src/components/Toaster';

describe('Toaster', () => {
  it('renders children', () => {
    render(<Toaster>Host</Toaster>);
    expect(screen.getByText('Host')).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Toaster>Host</Toaster>);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
