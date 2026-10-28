import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { AuthorBio } from '../src/components/AuthorBio';

describe('AuthorBio', () => {
  it('renders name and bio', () => {
    render(<AuthorBio name="Ada Lovelace" bio="Engineer" />);
    expect(screen.getByRole('heading', { name: 'Ada Lovelace' })).toBeInTheDocument();
    expect(screen.getByText('Engineer')).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<AuthorBio name="Ada Lovelace" bio="Engineer" />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
