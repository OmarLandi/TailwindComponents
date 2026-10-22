import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { Calendar } from '../src/components/Calendar';

describe('Calendar', () => {
  it('renders the calendar component', () => {
    const { container } = render(<Calendar mode="single" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders month and year caption', () => {
    render(<Calendar mode="single" />);
    expect(screen.getByText(/2026/)).toBeInTheDocument();
  });

  it('applies custom className to wrapper', () => {
    const { container } = render(<Calendar mode="single" className="custom-class" />);
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('shows a selected date as selected', () => {
    render(<Calendar mode="single" selected={new Date(2026, 9, 21)} />);
    const selected = document.querySelector('[aria-selected="true"]');
    expect(selected).toBeInTheDocument();
    expect(selected).toHaveAttribute('data-day', '2026-10-21');
  });

  it('selects a day in single mode', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<Calendar mode="single" onSelect={onSelect} />);

    await user.click(screen.getByRole('button', { name: /October 15/i }));

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect.mock.calls[0][0]).toBeInstanceOf(Date);
  });

  it('supports the dropdown caption layout', () => {
    const { container } = render(
      <Calendar
        mode="single"
        captionLayout="dropdown"
        startMonth={new Date(2020, 0)}
        endMonth={new Date(2030, 11)}
      />
    );

    expect(container.querySelectorAll('select')).toHaveLength(2);
    expect(screen.getByRole('combobox', { name: /month/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /year/i })).toBeInTheDocument();
  });

  it('supports range mode and two months', () => {
    const { container } = render(<Calendar mode="range" numberOfMonths={2} />);
    expect(container.querySelectorAll('[role="grid"]')).toHaveLength(2);
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Calendar mode="single" />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
