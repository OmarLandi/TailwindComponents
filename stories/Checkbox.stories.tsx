import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Checkbox } from '../src/components/Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `A checkbox input component with label, helper text, and error support.

## Basic usage

\`\`\`tsx
import { Checkbox } from 'libreriacomponentes';

<Checkbox label="Accept terms" />
\`\`\``,
      },
    },
  },
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    label: { control: 'text' },
    helperText: { control: 'text' },
    errorMessage: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Playground: Story = {
  render: function Render(args) {
    const [checked, setChecked] = useState(false);
    return <Checkbox {...args} checked={checked} onCheckedChange={c => setChecked(c === true)} />;
  },
  args: {
    label: 'Accept terms and conditions',
    helperText: 'You must agree to proceed.',
  },
};
