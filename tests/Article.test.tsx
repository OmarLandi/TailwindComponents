import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { Article } from '../src/components/Article';

describe('Article', () => {
  it('renders title and excerpt', () => {
    render(<Article title="Hello world" excerpt="Excerpt text" />);
    expect(screen.getByRole('heading', { name: 'Hello world' })).toBeInTheDocument();
    expect(screen.getByText('Excerpt text')).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Article title="Hello world" excerpt="Excerpt text" />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
