import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import { Progress } from '../src/components/Progress';

describe('Progress', () => {
  it('renders correctly', () => {
    render(<Progress value={50} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Progress value={50} label="Loading" />);
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('shows value percentage', () => {
    render(<Progress value={75} showValue />);
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(<Progress value={50} className="custom-progress" />);
    expect(screen.getByRole('progressbar')).toHaveClass('custom-progress');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Progress value={50} label="Progress" />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
