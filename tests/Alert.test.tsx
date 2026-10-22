import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import { Alert, AlertTitle, AlertDescription } from '../src/components/Alert';

describe('Alert', () => {
  it('renders with role alert', () => {
    render(<Alert>Content</Alert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders title', () => {
    render(
      <Alert>
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>Something happened</AlertDescription>
      </Alert>
    );
    expect(screen.getByText('Warning')).toBeInTheDocument();
    expect(screen.getByText('Something happened')).toBeInTheDocument();
  });

  it('renders with variant class', () => {
    render(<Alert variant="destructive">Destructive</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('border-destructive/50');
  });

  it('renders with custom className', () => {
    render(<Alert className="custom">Test</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('custom');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <Alert>
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>Information message</AlertDescription>
      </Alert>
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
