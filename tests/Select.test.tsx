import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectField,
} from '../src/components/Select';

describe('Select', () => {
  it('renders correctly', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>
    );

    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders with placeholder', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Choose..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
        </SelectContent>
      </Select>
    );

    expect(screen.getByText('Choose...')).toBeInTheDocument();
  });

  it('displays selected value', () => {
    render(
      <Select defaultValue="option1">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>
    );

    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('renders disabled select', () => {
    render(
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
        </SelectContent>
      </Select>
    );

    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('supports controlled value', () => {
    render(
      <Select value="option1">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>
    );

    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('should have no accessibility violations on select', async () => {
    const { container } = render(
      <Select defaultValue="option1">
        <SelectTrigger aria-label="Select an option">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('should have no accessibility violations with the portal open', async () => {
    render(
      <main>
        <Select defaultOpen defaultValue="option1">
          <SelectTrigger aria-label="Select an option">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </SelectContent>
        </Select>
      </main>
    );

    expect(await screen.findByRole('listbox')).toBeInTheDocument();

    const results = await axe.run(document.body, {
      rules: { region: { enabled: false } },
    });
    expect(results.violations).toHaveLength(0);
  });

  it('renders with different sizes', () => {
    const { rerender } = render(
      <Select>
        <SelectTrigger size="sm">
          <SelectValue placeholder="Small" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
        </SelectContent>
      </Select>
    );
    expect(screen.getByRole('combobox')).toHaveClass('h-8');

    rerender(
      <Select>
        <SelectTrigger size="lg">
          <SelectValue placeholder="Large" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
        </SelectContent>
      </Select>
    );
    expect(screen.getByRole('combobox')).toHaveClass('h-12');
  });
});

describe('SelectField', () => {
  const items = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
  ];

  it('should have no accessibility violations on selectfield', async () => {
    const { container } = render(<SelectField label="Fruit" items={items} />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('renders with label', () => {
    render(<SelectField label="Fruit" items={items} />);
    expect(screen.getByText('Fruit')).toBeInTheDocument();
  });

  it('renders with helper text', () => {
    render(<SelectField helperText="Choose wisely" items={items} />);
    expect(screen.getByText('Choose wisely')).toBeInTheDocument();
  });

  it('renders with error message', () => {
    render(<SelectField error="This field is required" items={items} />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('shows loading indicator when isLoading is true', () => {
    render(<SelectField items={[]} isLoading placeholder="Loading..." />);
    expect(screen.getByRole('combobox').querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('wires the error message to the trigger', () => {
    render(<SelectField label="Fruit" items={items} error="This field is required" />);

    const trigger = screen.getByRole('combobox');
    const alert = screen.getByRole('alert');

    expect(trigger).toHaveAttribute('aria-invalid', 'true');
    expect(trigger).toHaveAttribute('aria-describedby', alert.id);
  });

  it('wires helper text to the trigger', () => {
    render(<SelectField label="Fruit" items={items} helperText="Choose wisely" />);

    const trigger = screen.getByRole('combobox');
    const helper = screen.getByText('Choose wisely');

    expect(trigger).toHaveAttribute('aria-describedby', helper.id);
  });

  it('renders the clear action outside the trigger', () => {
    render(<SelectField label="Fruit" items={items} value="apple" />);

    const trigger = screen.getByRole('combobox');
    const clear = screen.getByRole('button', { name: 'Clear selection' });

    expect(trigger).not.toContainElement(clear);
  });

  it('shows search input when showSearch is true', () => {
    render(<SelectField items={[{ value: 'a', label: 'A' }]} showSearch defaultOpen />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('filters items based on search input', () => {
    const items = [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
    ];
    render(<SelectField items={items} showSearch defaultOpen />);

    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'apple' } });

    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.queryByText('Banana')).not.toBeInTheDocument();
  });

  it('shows no results message when search yields no matches', () => {
    const items = [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
    ];
    render(<SelectField items={items} showSearch defaultOpen />);

    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'xyz' } });

    expect(screen.getByText('No results found')).toBeInTheDocument();
    expect(screen.queryByText('Apple')).not.toBeInTheDocument();
    expect(screen.queryByText('Banana')).not.toBeInTheDocument();
  });

  it('calls onSearchChange when typing', () => {
    const onSearchChange = vi.fn();
    render(
      <SelectField
        items={[{ value: 'a', label: 'A' }]}
        showSearch
        defaultOpen
        onSearchChange={onSearchChange}
      />
    );

    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'a' } });

    expect(onSearchChange).toHaveBeenCalledWith('a');
  });
});
