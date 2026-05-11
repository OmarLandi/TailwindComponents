import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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
