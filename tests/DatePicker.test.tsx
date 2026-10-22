import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { DatePicker } from '../src/components/DatePicker';

describe('DatePicker', () => {
  it('renders trigger button', () => {
    render(<DatePicker />);
    expect(screen.getByText('Pick a date')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<DatePicker label="Date" />);
    expect(screen.getByText('Date')).toBeInTheDocument();
  });

  it('renders with helper text', () => {
    render(<DatePicker label="Date" helperText="Select a date" />);
    expect(screen.getByText('Select a date')).toBeInTheDocument();
  });

  it('renders with error message and wires aria attributes', () => {
    render(<DatePicker label="Date" error="Required" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Required');
    expect(screen.getByRole('button')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-describedby',
      expect.stringContaining('-error')
    );
  });

  it('opens the calendar and selects a date', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<DatePicker label="Date" value={new Date(2026, 9, 21)} onValueChange={onValueChange} />);

    await user.click(screen.getByRole('button', { name: /^date$/i }));

    const dialog = await screen.findByRole('dialog');
    await user.click(within(dialog).getByRole('button', { name: /october 15/i }));

    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange.mock.calls[0][0]).toBeInstanceOf(Date);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders disabled', () => {
    render(<DatePicker label="Date" disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('renders with loading state', () => {
    render(<DatePicker label="Date" isLoading />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('renders with custom placeholder', () => {
    render(<DatePicker placeholder="Choose date" />);
    expect(screen.getByText('Choose date')).toBeInTheDocument();
  });

  it('clears the selected date when clearable', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <DatePicker
        label="Date"
        value={new Date(2026, 9, 21)}
        onValueChange={onValueChange}
        clearable
      />
    );

    await user.click(screen.getByRole('button', { name: 'Clear date' }));

    expect(onValueChange).toHaveBeenCalledWith(undefined);
  });

  it('disables dates outside minDate and maxDate', async () => {
    const user = userEvent.setup();
    render(
      <DatePicker
        label="Booking"
        value={new Date(2026, 9, 21)}
        minDate={new Date(2026, 9, 10)}
        maxDate={new Date(2026, 9, 31)}
      />
    );

    await user.click(screen.getByRole('button', { name: /^booking$/i }));
    const dialog = await screen.findByRole('dialog');

    expect(within(dialog).getByRole('button', { name: /october 5/i })).toBeDisabled();
    expect(within(dialog).getByRole('button', { name: /october 15/i })).toBeEnabled();
    expect(within(dialog).getByRole('button', { name: /october 31/i })).toBeEnabled();
  });

  it('submits an ISO value through a hidden input', () => {
    const { container } = render(
      <DatePicker label="Date" name="startDate" value={new Date(2026, 9, 21)} />
    );

    expect(container.querySelector('input[name="startDate"]')).toHaveValue('2026-10-21');
  });

  it('should have no accessibility violations while open', async () => {
    const user = userEvent.setup();
    render(
      <DatePicker
        label="Date of Birth"
        helperText="Select your date of birth."
        value={new Date(2026, 9, 21)}
        captionLayout="dropdown"
        fromYear={1920}
        toYear={2026}
      />
    );

    await user.click(screen.getByRole('button', { name: /date of birth/i }));
    await screen.findByRole('dialog');

    const results = await axe.run(document.body, {
      rules: { region: { enabled: false } },
    });
    expect(results.violations).toHaveLength(0);
  });
});
