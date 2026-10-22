import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { Textarea } from '../src/components/Textarea';

describe('Textarea', () => {
  it('renders correctly', () => {
    render(<Textarea placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Textarea label="Description" placeholder="Desc" />);
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
  });

  it('renders disabled', () => {
    render(<Textarea disabled placeholder="Disabled" />);
    expect(screen.getByPlaceholderText('Disabled')).toBeDisabled();
  });

  it('renders with helper text', () => {
    render(<Textarea label="Bio" helperText="Tell us about yourself." />);
    expect(screen.getByText('Tell us about yourself.')).toBeInTheDocument();
  });

  it('renders with error message', () => {
    render(<Textarea label="Bio" errorMessage="Required" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Required');
  });

  it('renders with loading state', () => {
    render(<Textarea label="Bio" isLoading />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('handles value change', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Textarea onChange={handleChange} placeholder="Type" />);
    await user.type(screen.getByPlaceholderText('Type'), 'hello');
    expect(handleChange).toHaveBeenCalled();
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Textarea size="sm" placeholder="Small" />);
    expect(screen.getByPlaceholderText('Small')).toHaveClass('min-h-[60px]');
    rerender(<Textarea size="lg" placeholder="Large" />);
    expect(screen.getByPlaceholderText('Large')).toHaveClass('min-h-[120px]');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Textarea label="Bio" placeholder="Write" />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
