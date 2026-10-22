import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { ToggleGroup, ToggleGroupItem } from '../src/components/ToggleGroup';

describe('ToggleGroup', () => {
  it('renders toggle items', () => {
    render(
      <ToggleGroup type="multiple">
        <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
        <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
      </ToggleGroup>
    );
    expect(screen.getByText('Bold')).toBeInTheDocument();
    expect(screen.getByText('Italic')).toBeInTheDocument();
  });

  it('handles value change', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <ToggleGroup type="single" onValueChange={handleChange}>
        <ToggleGroupItem value="sm">Small</ToggleGroupItem>
        <ToggleGroupItem value="lg">Large</ToggleGroupItem>
      </ToggleGroup>
    );
    await user.click(screen.getByText('Large'));
    expect(handleChange).toHaveBeenCalled();
  });

  it('renders with default value', () => {
    render(
      <ToggleGroup type="single" value="sm">
        <ToggleGroupItem value="sm">Small</ToggleGroupItem>
        <ToggleGroupItem value="lg">Large</ToggleGroupItem>
      </ToggleGroup>
    );
    const small = screen.getByText('Small');
    expect(small).toHaveAttribute('data-state', 'on');
  });

  it('renders with outline variant', () => {
    render(
      <ToggleGroup type="single" variant="outline">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>
    );
    expect(screen.getByText('A')).toHaveClass('border-input');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <ToggleGroup type="multiple">
        <ToggleGroupItem value="bold" aria-label="Bold">
          B
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic">
          I
        </ToggleGroupItem>
      </ToggleGroup>
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
