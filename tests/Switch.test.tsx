import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { Switch } from '../src/components/Switch';

describe('Switch', () => {
  it('renders correctly', () => {
    render(<Switch label="Toggle" />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Switch label="Enable notifications" />);
    expect(screen.getByLabelText('Enable notifications')).toBeInTheDocument();
  });

  it('renders disabled', () => {
    render(<Switch label="Disabled" disabled />);
    expect(screen.getByRole('switch')).toBeDisabled();
  });

  it('renders with helper text', () => {
    render(<Switch label="Toggle" helperText="Helper text" />);
    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });

  it('renders with error message', () => {
    render(<Switch label="Toggle" errorMessage="Error" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Error');
  });

  it('handles checked change', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Switch label="Toggle" onCheckedChange={handleChange} />);
    await user.click(screen.getByRole('switch'));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Switch label="Enable" />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
