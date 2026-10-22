import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { InputOTP } from '../src/components/InputOTP';

describe('InputOTP', () => {
  it('renders correct number of input boxes', () => {
    render(<InputOTP length={6} />);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(6);
  });

  it('renders with label', () => {
    render(<InputOTP label="Code" length={4} />);
    expect(screen.getByText('Code')).toBeInTheDocument();
  });

  it('renders with helper text', () => {
    render(<InputOTP label="Code" helperText="Check your email." length={4} />);
    expect(screen.getByText('Check your email.')).toBeInTheDocument();
  });

  it('renders with error message', () => {
    render(<InputOTP label="Code" errorMessage="Invalid code" length={4} />);
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid code');
  });

  it('renders disabled', () => {
    render(<InputOTP label="Code" disabled length={4} />);
    const inputs = screen.getAllByRole('textbox');
    inputs.forEach(input => expect(input).toBeDisabled());
  });

  it('renders with loading state', () => {
    render(<InputOTP label="Code" isLoading length={4} />);
    const inputs = screen.getAllByRole('textbox');
    inputs.forEach(input => expect(input).toBeDisabled());
  });

  it('handles value change', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<InputOTP length={4} onChange={handleChange} />);
    const inputs = screen.getAllByRole('textbox');
    await user.type(inputs[0], '1');
    expect(handleChange).toHaveBeenCalled();
  });

  it('auto-advances to next input', async () => {
    const user = userEvent.setup();
    render(<InputOTP length={4} />);
    const inputs = screen.getAllByRole('textbox');
    await user.type(inputs[0], '1');
    expect(document.activeElement).toBe(inputs[1]);
  });

  it('wires error messages to every input', () => {
    render(<InputOTP label="Code" errorMessage="Invalid code" length={4} />);

    const alert = screen.getByRole('alert');
    screen.getAllByRole('textbox').forEach(input => {
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(input).toHaveAttribute('aria-describedby', alert.id);
    });
  });

  it('wires helper text to every input', () => {
    render(<InputOTP label="Code" helperText="Check your email" length={4} />);

    const helper = screen.getByText('Check your email');
    screen.getAllByRole('textbox').forEach(input => {
      expect(input).toHaveAttribute('aria-describedby', helper.id);
    });
  });

  it('applies the field name only to the hidden input', () => {
    const { container } = render(<InputOTP name="verification-code" length={4} value="1234" />);

    const hiddenInput = container.querySelector('input[type="hidden"]');
    expect(hiddenInput).toHaveAttribute('name', 'verification-code');
    expect(hiddenInput).toHaveValue('1234');
    screen.getAllByRole('textbox').forEach(input => expect(input).not.toHaveAttribute('name'));
  });

  it('does not allow props to override core input behavior', () => {
    render(<InputOTP length={1} type="text" maxLength={5} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'tel');
    expect(input).toHaveAttribute('maxlength', '1');
  });

  it('calls onComplete once every digit is filled', async () => {
    const user = userEvent.setup();
    const onComplete = vi.fn();
    render(<InputOTP length={2} onComplete={onComplete} />);

    const inputs = screen.getAllByRole('textbox');
    await user.type(inputs[0], '12');

    expect(onComplete).toHaveBeenCalledWith('12');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<InputOTP label="Code" length={4} />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
