import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { RadioGroup, RadioGroupItem, RadioGroupField } from '../src/components/RadioGroup';

describe('RadioGroup', () => {
  it('renders radio items', () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="a" label="Option A" />
        <RadioGroupItem value="b" label="Option B" />
      </RadioGroup>
    );
    expect(screen.getByLabelText('Option A')).toBeInTheDocument();
    expect(screen.getByLabelText('Option B')).toBeInTheDocument();
  });

  it('handles value change', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <RadioGroup onValueChange={handleChange}>
        <RadioGroupItem value="a" label="Option A" />
        <RadioGroupItem value="b" label="Option B" />
      </RadioGroup>
    );
    await user.click(screen.getByLabelText('Option B'));
    expect(handleChange).toHaveBeenCalledWith('b');
  });

  it('renders field with label', () => {
    render(
      <RadioGroupField label="Choose">
        <RadioGroup>
          <RadioGroupItem value="a" label="A" />
        </RadioGroup>
      </RadioGroupField>
    );
    expect(screen.getByText('Choose')).toBeInTheDocument();
  });

  it('renders field with helper text', () => {
    render(
      <RadioGroupField label="Choose" helperText="Pick one.">
        <RadioGroup>
          <RadioGroupItem value="a" label="A" />
        </RadioGroup>
      </RadioGroupField>
    );
    expect(screen.getByText('Pick one.')).toBeInTheDocument();
  });

  it('renders field with error message', () => {
    render(
      <RadioGroupField label="Choose" errorMessage="Required">
        <RadioGroup>
          <RadioGroupItem value="a" label="A" />
        </RadioGroup>
      </RadioGroupField>
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Required');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <RadioGroupField label="Options">
        <RadioGroup>
          <RadioGroupItem value="a" label="Option A" />
          <RadioGroupItem value="b" label="Option B" />
        </RadioGroup>
      </RadioGroupField>
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
