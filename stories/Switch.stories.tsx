import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Switch } from '../src/components/Switch';

const meta: Meta<typeof Switch> = {
  title: 'Forms/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `A switch/toggle component with label, helper text, and error support.

## Basic usage

\`\`\`tsx
import { Switch } from 'libreriacomponentes';

<Switch label="Enable notifications" />
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
type Story = StoryObj<typeof Switch>;

export const Playground: Story = {
  render: function Render(args) {
    const [checked, setChecked] = useState(false);
    return <Switch {...args} checked={checked} onCheckedChange={setChecked} />;
  },
  args: {
    label: 'Airplane Mode',
    helperText: 'This will disable all wireless connections.',
  },
};
