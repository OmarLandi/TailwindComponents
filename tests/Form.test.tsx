import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';

import { Button } from '../src/components/Button';
import { Form, FormActions, FormSection } from '../src/components/Form';

describe('Form', () => {
  it('renders a semantic form and submits', () => {
    const onSubmit = vi.fn((event: React.FormEvent<HTMLFormElement>) => event.preventDefault());

    render(
      <Form aria-label="Contact" onSubmit={onSubmit}>
        <FormSection>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" />
        </FormSection>
        <FormActions>
          <Button type="submit">Send</Button>
        </FormActions>
      </Form>
    );

    const form = screen.getByRole('form', { name: 'Contact' });
    expect(form).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send' })).toHaveAttribute('type', 'submit');

    fireEvent.submit(form);

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('applies responsive action layout classes', () => {
    render(
      <Form aria-label="Settings">
        <FormActions data-testid="actions">
          <Button>Save</Button>
        </FormActions>
      </Form>
    );

    expect(screen.getByTestId('actions')).toHaveClass(
      'flex-col-reverse',
      'sm:flex-row',
      'sm:justify-end'
    );
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <Form aria-label="Profile">
        <FormSection>
          <label htmlFor="name">Name</label>
          <input id="name" />
        </FormSection>
        <FormActions>
          <Button type="submit">Save</Button>
        </FormActions>
      </Form>
    );

    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
