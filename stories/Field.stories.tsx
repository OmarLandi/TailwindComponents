import type { Meta, StoryObj } from '@storybook/react';
import { AtSign, Mail } from 'lucide-react';

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

const meta: Meta<typeof Field> = {
  title: 'Forms/Field',
  component: Field,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Composable form field primitives that connect labels, descriptions and errors.

## Basic usage

\`\`\`tsx
<Field id="email" required>
  <FieldLabel>Email</FieldLabel>
  <FieldControl>
    <TextField placeholder="you@example.com" />
  </FieldControl>
  <FieldDescription>We will never share your email.</FieldDescription>
</Field>
\`\`\`

Use \`FieldControl\` to inject the generated \`id\`, \`aria-describedby\`, \`aria-invalid\`,
\`disabled\` and \`required\` props into a single control.
\`FieldControl\` accepts exactly one React element.`,
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Field>;

export const Playground: Story = {
  args: {
    orientation: 'vertical',
    invalid: false,
    disabled: false,
    required: false,
  },
  render: args => (
    <Field {...args} id="email" className="max-w-sm">
      <FieldLabel>Email</FieldLabel>
      <FieldControl>
        <TextField placeholder="you@example.com" leftIcon={<Mail className="h-4 w-4" />} />
      </FieldControl>
      <FieldDescription>We will never share your email.</FieldDescription>
    </Field>
  ),
};

export const WithError: Story = {
  render: () => (
    <Field id="username" invalid required className="max-w-sm">
      <FieldLabel>Username</FieldLabel>
      <FieldControl>
        <TextField placeholder="your-handle" />
      </FieldControl>
      <FieldDescription>Use letters, numbers and hyphens.</FieldDescription>
      <FieldError>This username is already taken.</FieldError>
    </Field>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <Field id="newsletter" orientation="horizontal" className="max-w-lg">
      <FieldContent>
        <FieldLabel>Newsletter</FieldLabel>
        <FieldDescription>Send me a monthly digest of product updates.</FieldDescription>
      </FieldContent>
      <FieldControl>
        <Checkbox />
      </FieldControl>
    </Field>
  ),
};

export const MultipleErrors: Story = {
  render: () => (
    <Field id="password" invalid required className="max-w-sm">
      <FieldLabel>Password</FieldLabel>
      <FieldControl>
        <TextField type="password" />
      </FieldControl>
      <FieldError
        errors={[
          'Use at least 12 characters.',
          'Include a number and a symbol.',
          'Passwords must match.',
        ]}
      />
    </Field>
  ),
};

export const Fieldset: Story = {
  render: () => (
    <FieldSet className="max-w-md">
      <FieldLegend>Profile details</FieldLegend>
      <FieldGroup>
        <Field id="first-name" required>
          <FieldLabel>First name</FieldLabel>
          <FieldControl>
            <TextField autoComplete="given-name" />
          </FieldControl>
        </Field>
        <Field id="last-name" required>
          <FieldLabel>Last name</FieldLabel>
          <FieldControl>
            <TextField autoComplete="family-name" />
          </FieldControl>
        </Field>
        <Field id="bio">
          <FieldLabel>Bio</FieldLabel>
          <FieldControl>
            <TextField placeholder="A short introduction" />
          </FieldControl>
          <FieldDescription>Optional, up to 160 characters.</FieldDescription>
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
};

export const Mobile: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <Field id="mobile-email" required>
        <FieldLabel>Email</FieldLabel>
        <FieldControl>
          <TextField
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            leftIcon={<AtSign className="h-4 w-4" />}
          />
        </FieldControl>
        <FieldDescription>We will never share your email.</FieldDescription>
      </Field>
    </div>
  ),
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
};
