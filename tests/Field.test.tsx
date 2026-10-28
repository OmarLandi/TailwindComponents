import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';

import {
  Field,
  FieldContent,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '../src/components/Field';
import { Checkbox } from '../src/components/Checkbox';
import { TextField } from '../src/components/TextField';

describe('Field', () => {
  it('connects label, control and description', () => {
    render(
      <Field id="email" required>
        <FieldLabel>Email</FieldLabel>
        <FieldControl>
          <TextField />
        </FieldControl>
        <FieldDescription>We will never share your email.</FieldDescription>
      </Field>
    );

    const input = screen.getByRole('textbox');
    const label = screen.getByText(/^Email/);

    expect(label).toHaveAttribute('for', 'email');
    expect(input).toHaveAttribute('id', 'email');
    expect(input).toHaveAttribute('aria-describedby', 'email-description');
    expect(input).toBeRequired();
    expect(screen.getByText('We will never share your email.')).toHaveAttribute(
      'id',
      'email-description'
    );
  });

  it('wires invalid state and error message', () => {
    render(
      <Field id="username" invalid>
        <FieldLabel>Username</FieldLabel>
        <FieldControl>
          <TextField />
        </FieldControl>
        <FieldDescription>Use letters and numbers.</FieldDescription>
        <FieldError>This username is already taken.</FieldError>
      </Field>
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'username-description username-error');

    const error = screen.getByRole('alert');
    expect(error).toHaveTextContent('This username is already taken.');
    expect(error).toHaveAttribute('id', 'username-error');
  });

  it('renders multiple errors as a list', () => {
    render(
      <Field id="password" invalid>
        <FieldLabel>Password</FieldLabel>
        <FieldControl>
          <TextField type="password" />
        </FieldControl>
        <FieldError errors={['Too short.', 'Add a number.']} />
      </Field>
    );

    const error = screen.getByRole('alert');
    expect(error).toHaveTextContent('Too short.');
    expect(error).toHaveTextContent('Add a number.');
    expect(error.querySelectorAll('li')).toHaveLength(2);
  });

  it('does not render an empty error container', () => {
    render(
      <Field id="name">
        <FieldLabel>Name</FieldLabel>
        <FieldControl>
          <TextField />
        </FieldControl>
        <FieldError />
      </Field>
    );

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('supports horizontal layouts and checkbox controls', () => {
    const { container } = render(
      <Field id="newsletter" orientation="horizontal">
        <FieldContent>
          <FieldLabel>Newsletter</FieldLabel>
          <FieldDescription>Monthly product updates.</FieldDescription>
        </FieldContent>
        <FieldControl>
          <Checkbox />
        </FieldControl>
      </Field>
    );

    expect(container.firstChild).toHaveAttribute('data-orientation', 'horizontal');
    expect(screen.getByRole('checkbox')).toHaveAttribute('id', 'newsletter');
    expect(screen.getByText('Newsletter')).toHaveAttribute('for', 'newsletter');
  });

  it('renders a grouped fieldset with legend', () => {
    render(
      <FieldSet aria-label="Profile">
        <FieldLegend>Profile</FieldLegend>
        <FieldGroup>
          <Field id="first-name">
            <FieldLabel>First name</FieldLabel>
            <FieldControl>
              <TextField />
            </FieldControl>
          </Field>
        </FieldGroup>
      </FieldSet>
    );

    expect(screen.getByRole('group', { name: 'Profile' })).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'first-name');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <Field id="email" required>
        <FieldLabel>Email</FieldLabel>
        <FieldControl>
          <TextField type="email" />
        </FieldControl>
        <FieldDescription>We will never share your email.</FieldDescription>
      </Field>
    );

    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
