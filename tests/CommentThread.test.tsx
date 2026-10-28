import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { CommentThread } from '../src/components/CommentThread';

describe('CommentThread', () => {
  it('renders title and children', () => {
    render(
      <CommentThread count={2}>
        <span>Comment</span>
      </CommentThread>
    );
    expect(screen.getByText('Comments')).toBeInTheDocument();
    expect(screen.getByText('Comment')).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <CommentThread>
        <span>Comment</span>
      </CommentThread>
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
