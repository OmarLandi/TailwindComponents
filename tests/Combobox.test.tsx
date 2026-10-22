import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { Combobox } from '../src/components/Combobox';

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
];

describe('Combobox', () => {
  it('renders trigger button', () => {
    render(<Combobox options={options} placeholder="Select..." />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Combobox label="Fruit" options={options} />);
    expect(screen.getByText('Fruit')).toBeInTheDocument();
  });

  it('renders with helper text', () => {
    render(<Combobox label="Fruit" helperText="Pick one" options={options} />);
    expect(screen.getByText('Pick one')).toBeInTheDocument();
  });

  it('renders with error message', () => {
    render(<Combobox label="Fruit" error="Required" options={options} />);
    expect(screen.getByRole('alert')).toHaveTextContent('Required');
  });

  it('renders disabled', () => {
    render(<Combobox label="Fruit" disabled options={options} />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('renders with loading state', () => {
    render(<Combobox label="Fruit" isLoading options={options} />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('opens popover on click', async () => {
    const user = userEvent.setup();
    render(<Combobox options={options} />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByText('Apple')).toBeInTheDocument();
  });

  it('selects an option', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Combobox options={options} onValueChange={handleChange} />);
    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByText('Banana'));
    expect(handleChange).toHaveBeenCalledWith('banana');
  });

  it('associates the label and exposes the listbox contract', async () => {
    const user = userEvent.setup();
    render(<Combobox label="Fruit" options={options} />);

    const combobox = screen.getByRole('combobox', { name: 'Fruit' });
    expect(combobox).toHaveAttribute('aria-haspopup', 'listbox');

    await user.click(combobox);

    const listbox = screen.getByRole('listbox', { name: 'Fruit' });
    expect(combobox).toHaveAttribute('aria-controls', listbox.id);
    expect(screen.getAllByRole('option')).toHaveLength(options.length);
  });

  it('opens with ArrowDown and supports arrow/Enter selection', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Combobox label="Fruit" options={options} onValueChange={handleChange} />);

    await user.tab();
    expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveFocus();
    await user.keyboard('{ArrowDown}');

    expect(screen.getByRole('listbox', { name: 'Fruit' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Search options' })).toHaveFocus();

    await user.keyboard('{ArrowDown}{Enter}');

    expect(handleChange).toHaveBeenCalledWith('banana');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('closes with Escape and returns focus to the trigger', async () => {
    const user = userEvent.setup();
    render(<Combobox label="Fruit" options={options} />);

    const combobox = screen.getByRole('combobox', { name: 'Fruit' });
    await user.click(combobox);
    await user.keyboard('{Escape}');

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(combobox).toHaveFocus();
  });

  it('skips disabled options with the keyboard', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <Combobox
        label="Fruit"
        options={[
          { value: 'apple', label: 'Apple' },
          { value: 'banana', label: 'Banana', disabled: true },
          { value: 'orange', label: 'Orange' },
        ]}
        onValueChange={handleChange}
      />
    );

    await user.click(screen.getByRole('combobox', { name: 'Fruit' }));
    await user.keyboard('{ArrowDown}{Enter}');

    expect(handleChange).toHaveBeenCalledWith('orange');
  });

  it('renders the clear action outside the trigger button', () => {
    render(<Combobox label="Fruit" options={options} value="apple" />);

    const combobox = screen.getByRole('combobox', { name: 'Fruit' });
    const clear = screen.getByRole('button', { name: 'Clear selection' });

    expect(combobox).not.toContainElement(clear);
  });

  it('should have no accessibility violations', async () => {
    const user = userEvent.setup();
    const { container } = render(<Combobox label="Fruit" options={options} />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);

    await user.click(screen.getByRole('combobox', { name: 'Fruit' }));
    const openResults = await axe.run(document.body, {
      rules: { region: { enabled: false } },
    });
    expect(openResults.violations).toHaveLength(0);
  });
});
