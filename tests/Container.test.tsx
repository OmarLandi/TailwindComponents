import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import { Container } from '../src/components/Container';

describe('Container', () => {
  it('renders children', () => {
    render(<Container>Content</Container>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders with default size', () => {
    render(<Container>Content</Container>);
    const el = screen.getByText('Content');
    expect(el).toHaveClass('max-w-6xl');
  });

  it('renders with custom size', () => {
    render(<Container size="sm">Content</Container>);
    expect(screen.getByText('Content')).toHaveClass('max-w-sm');
  });

  it('renders semantic layout widths', () => {
    render(<Container size="content">Content</Container>);
    expect(screen.getByText('Content')).toHaveClass('max-w-[64rem]');
  });

  it('renders with padding', () => {
    render(<Container padding="lg">Content</Container>);
    expect(screen.getByText('Content')).toHaveClass('lg:px-8');
  });

  it('renders with fluid', () => {
    render(<Container fluid>Content</Container>);
    expect(screen.getByText('Content')).toHaveClass('max-w-none');
  });

  it('renders with fullWidth', () => {
    render(<Container fullWidth>Content</Container>);
    expect(screen.getByText('Content')).toHaveClass('w-full');
  });

  it('renders as child using Slot', () => {
    render(
      <Container asChild>
        <div data-testid="slot-target">Slot Content</div>
      </Container>
    );
    expect(screen.getByTestId('slot-target')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(<Container className="custom-class">Content</Container>);
    expect(screen.getByText('Content')).toHaveClass('custom-class');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Container>Content</Container>);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
