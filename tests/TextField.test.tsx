import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { TextField } from '../src/components/TextField';

describe('TextField', () => {
  it('renders correctly', () => {
    render(<TextField placeholder="Enter text" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<TextField label="Email" placeholder="user@example.com" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('renders with default variant', () => {
    render(<TextField placeholder="Default" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border', 'border-input');
  });

  it('renders with outline variant', () => {
    render(<TextField variant="default" placeholder="Outline" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border', 'border-input');
  });

  it('renders with filled variant', () => {
    render(<TextField variant="filled" placeholder="Filled" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('bg-muted');
  });

  it('renders with ghost variant', () => {
    render(<TextField variant="ghost" placeholder="Ghost" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-transparent', 'bg-transparent');
  });

  it('renders with underlined variant', () => {
    render(<TextField variant="underlined" placeholder="Underlined" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-b', 'border-input', 'rounded-none');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<TextField size="sm" placeholder="Small" />);
    expect(screen.getByRole('textbox')).toHaveClass('h-8');

    rerender(<TextField size="default" placeholder="Medium" />);
    expect(screen.getByRole('textbox')).toHaveClass('h-10');

    rerender(<TextField size="lg" placeholder="Large" />);
    expect(screen.getByRole('textbox')).toHaveClass('h-12');
  });

  it('renders disabled', () => {
    render(<TextField disabled placeholder="Disabled" />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('renders with error state', () => {
    render(<TextField errorMessage="This field is required" placeholder="Error" />);
    expect(screen.getByRole('alert')).toHaveTextContent('This field is required');
  });

  it('renders with helper text', () => {
    render(<TextField helperText="Enter your email" placeholder="Email" />);
    expect(screen.getByText('Enter your email')).toBeInTheDocument();
  });

  it('renders with leftIcon', () => {
    render(<TextField leftIcon={<span data-testid="icon">★</span>} placeholder="With Icon" />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders with rightIcon', () => {
    render(<TextField rightIcon={<span data-testid="icon">★</span>} placeholder="With Icon" />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders with className', () => {
    render(<TextField className="w-full" placeholder="Full Width" />);
    expect(screen.getByRole('textbox')).toHaveClass('w-full');
  });

  it('renders with required attribute', () => {
    render(<TextField required label="Required" placeholder="Required field" />);
    const input = screen.getByPlaceholderText('Required field');
    expect(input).toHaveAttribute('required');
  });

  it('handles onChange event', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<TextField onChange={handleChange} placeholder="Type here" />);
    await user.type(screen.getByRole('textbox'), 'hello');
    expect(handleChange).toHaveBeenCalled();
  });

  it('handles onBlur event', async () => {
    const user = userEvent.setup();
    const handleBlur = vi.fn();
    render(<TextField onBlur={handleBlur} placeholder="Blur me" />);
    await user.click(screen.getByRole('textbox'));
    await user.tab();
    expect(handleBlur).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<TextField className="custom-class" placeholder="Custom" />);
    expect(screen.getByRole('textbox')).toHaveClass('custom-class');
  });

  it('has proper accessibility attributes when error', () => {
    render(<TextField errorMessage="Error message" placeholder="Error input" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('has proper accessibility attributes with label', () => {
    render(<TextField label="Email" placeholder="user@example.com" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<TextField label="Test" placeholder="Test" />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
