import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { Review } from '../src/components/Review';

describe('Review', () => {
  it('renders author and rating', () => {
    render(<Review author="Ada" rating={4.5} content="Great" />);
    expect(screen.getByText('Ada')).toBeInTheDocument();
    expect(screen.getByText(/4.5 \/ 5/)).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Review author="Ada" rating={4.5} content="Great" />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
