import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { Toolbar } from '../src/components/Toolbar';

describe('Toolbar', () => {
  it('renders children', () => {
    render(
      <Toolbar>
        <button type="button">Action</button>
      </Toolbar>
    );
    expect(screen.getByRole('button', { name: /action/i })).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <Toolbar>
        <button type="button">Action</button>
      </Toolbar>
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
