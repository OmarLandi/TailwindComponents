import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { Checkbox } from '../src/components/Checkbox';

describe('Checkbox', () => {
  it('renders correctly', () => {
    render(<Checkbox label="Accept" />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByLabelText('Accept terms')).toBeInTheDocument();
  });

  it('renders disabled', () => {
    render(<Checkbox label="Disabled" disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('renders with helper text', () => {
    render(<Checkbox label="Terms" helperText="You must agree." />);
    expect(screen.getByText('You must agree.')).toBeInTheDocument();
  });

  it('renders with error message', () => {
    render(<Checkbox label="Terms" errorMessage="Required" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Required');
  });

  it('handles checked change', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Checkbox label="Accept" onCheckedChange={handleChange} />);
    await user.click(screen.getByRole('checkbox'));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('shows required indicator', () => {
    render(<Checkbox label="Required" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Checkbox label="Accept terms" />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
