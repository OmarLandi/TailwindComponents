import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { Slider } from '../src/components/Slider';

describe('Slider', () => {
  it('renders correctly', () => {
    render(<Slider />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Slider label="Volume" />);
    expect(screen.getByText('Volume')).toBeInTheDocument();
  });

  it('renders with helper text', () => {
    render(<Slider label="Volume" helperText="Adjust volume" />);
    expect(screen.getByText('Adjust volume')).toBeInTheDocument();
  });

  it('renders disabled', () => {
    render(<Slider label="Volume" disabled />);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-disabled', 'true');
  });

  it('shows value when showValue is true', () => {
    render(<Slider label="Volume" showValue value={[50]} />);
    expect(screen.getByText('50')).toBeInTheDocument();
  });

  it('formats value with formatValue function', () => {
    render(<Slider label="Price" showValue value={[100]} formatValue={v => `$${v}`} />);
    expect(screen.getByText('$100')).toBeInTheDocument();
  });

  it('keeps uncontrolled state in sync and forwards onValueChange', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <Slider
        label="Volume"
        defaultValue={[20]}
        showValue
        helperText="Adjust volume"
        onValueChange={onValueChange}
      />
    );

    const slider = screen.getByRole('slider');
    slider.focus();
    await user.keyboard('{ArrowRight}');

    expect(onValueChange).toHaveBeenCalledWith([21]);
    expect(screen.getByText('21')).toBeInTheDocument();
    expect(slider).toHaveAttribute('aria-describedby', screen.getByText('Adjust volume').id);
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Slider label="Volume" />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
