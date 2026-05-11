import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from '../src/components/TextField';

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `A text input component with label, helper text, error handling, icons, and multiple variant support.

## Basic usage

\`\`\`tsx
import { TextField } from 'libreriacomponentes';

<TextField placeholder="Enter text..." label="Name" />
\`\`\`

## Variants

\`\`\`tsx
<TextField variant="default" placeholder="Default" />
<TextField variant="filled" placeholder="Filled" />
<TextField variant="ghost" placeholder="Ghost" />
<TextField variant="underlined" placeholder="Underlined" />
\`\`\`

## With label and helper text

\`\`\`tsx
<TextField
  label="Email"
  placeholder="user@example.com"
  helperText="We'll never share your email"
/>
\`\`\`

## With error

\`\`\`tsx
<TextField
  label="Password"
  placeholder="Enter password"
  errorMessage="Password must be at least 8 characters"
/>
\`\`\`

## With icons

\`\`\`tsx
<TextField
  label="Search"
  placeholder="Search..."
  leftIcon={<SearchIcon />}
/>
\`\`\``,
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['default', 'filled', 'ghost', 'underlined'] },
    size: { control: 'select', options: ['sm', 'default', 'lg'] },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    errorMessage: { control: 'text' },
    leftIcon: { control: 'object' },
    rightIcon: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Playground: Story = {
  args: {
    placeholder: 'Enter text...',
    label: 'Label',
  },
};
