import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { SearchInput } from '../src/components/SearchInput';

describe('SearchInput', () => {
  it('renders input', () => {
    render(<SearchInput placeholder="Search" />);
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<SearchInput placeholder="Search" />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
