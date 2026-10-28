import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { ThemeScript } from '../src/components/ThemeScript';

describe('ThemeScript', () => {
  it('renders a script', () => {
    const { container } = render(<ThemeScript />);
    expect(container.querySelector('script')).not.toBeNull();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<ThemeScript />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
