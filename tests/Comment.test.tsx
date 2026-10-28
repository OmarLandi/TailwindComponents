import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { Comment } from '../src/components/Comment';

describe('Comment', () => {
  it('renders author and content', () => {
    render(<Comment author="Ada" content="Hello" />);
    expect(screen.getByText('Ada')).toBeInTheDocument();
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Comment author="Ada" content="Hello" />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
