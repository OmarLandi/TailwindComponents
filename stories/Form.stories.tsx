import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../src/components/Button';
import {
  Field,
  FieldControl,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '../src/components/Field';
import { Form, FormActions, FormSection } from '../src/components/Form';
import { Textarea } from '../src/components/Textarea';
import { TextField } from '../src/components/TextField';

const meta: Meta<typeof Form> = {
  title: 'Forms/Form',
  component: Form,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `A semantic form layout with consistent spacing and responsive actions.

Compose \`Form\` with \`FormSection\`, \`FormActions\` and the \`Field\` primitives. Validation
is handled by your form library or native browser validation.`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Form>;

export const Playground: Story = {
  render: () => (
    <Form
      className="max-w-xl"
      onSubmit={event => {
        event.preventDefault();
      }}
    >
      <FormSection>
        <FieldGroup>
          <Field id="name" required>
            <FieldLabel>Name</FieldLabel>
            <FieldControl>
              <TextField autoComplete="name" placeholder="Ada Lovelace" />
            </FieldControl>
          </Field>
          <Field id="email" required>
            <FieldLabel>Email</FieldLabel>
            <FieldControl>
              <TextField type="email" autoComplete="email" placeholder="ada@example.com" />
            </FieldControl>
            <FieldDescription>Used for account notifications only.</FieldDescription>
          </Field>
          <Field id="message">
            <FieldLabel>Message</FieldLabel>
            <FieldControl>
              <Textarea placeholder="How can we help?" />
            </FieldControl>
          </Field>
        </FieldGroup>
      </FormSection>
      <FormActions>
        <Button type="reset" variant="outline">
          Reset
        </Button>
        <Button type="submit">Send message</Button>
      </FormActions>
    </Form>
  ),
};

export const Mobile: Story = {
  render: () => (
    <Form
      className="w-full"
      onSubmit={event => {
        event.preventDefault();
      }}
    >
      <FormSection>
        <FieldGroup>
          <Field id="mobile-name" required>
            <FieldLabel>Name</FieldLabel>
            <FieldControl>
              <TextField autoComplete="name" />
            </FieldControl>
          </Field>
          <Field id="mobile-email" required>
            <FieldLabel>Email</FieldLabel>
            <FieldControl>
              <TextField type="email" autoComplete="email" />
            </FieldControl>
          </Field>
        </FieldGroup>
      </FormSection>
      <FormActions>
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit" fullWidth className="sm:w-auto">
          Continue
        </Button>
      </FormActions>
    </Form>
  ),
  globals: {
    viewport: {
      value: 'mobile1',
      isRotated: false,
    },
  },
};
