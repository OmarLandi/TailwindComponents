import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { StoryCarousel } from '../src/components/StoryCarousel';

describe('StoryCarousel', () => {
  it('renders stories', () => {
    render(<StoryCarousel stories={[{ id: '1', label: 'Ada' }]} />);
    expect(screen.getByText('Ada')).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<StoryCarousel stories={[{ id: '1', label: 'Ada' }]} />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
