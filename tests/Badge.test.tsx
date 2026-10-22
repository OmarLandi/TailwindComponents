import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import { Badge } from '../src/components/Badge';

describe('Badge', () => {
  it('renders with text', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('renders with default variant', () => {
    render(<Badge>Default</Badge>);
    expect(screen.getByText('Default')).toHaveClass('bg-primary');
  });

  it('renders with secondary variant', () => {
    render(<Badge variant="secondary">Secondary</Badge>);
    expect(screen.getByText('Secondary')).toHaveClass('bg-secondary');
  });

  it('renders with destructive variant', () => {
    render(<Badge variant="destructive">Destructive</Badge>);
    expect(screen.getByText('Destructive')).toHaveClass('bg-destructive');
  });

  it('renders with outline variant', () => {
    render(<Badge variant="outline">Outline</Badge>);
    expect(screen.getByText('Outline')).not.toHaveClass('bg-primary');
  });

  it('renders with custom className', () => {
    render(<Badge className="custom">Custom</Badge>);
    expect(screen.getByText('Custom')).toHaveClass('custom');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Badge>Test</Badge>);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
