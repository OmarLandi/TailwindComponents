import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { InputOTP } from '../src/components/InputOTP';

const meta: Meta<typeof InputOTP> = {
  title: 'Forms/InputOTP',
  component: InputOTP,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `An OTP (One-Time Password) input component with support for paste, auto-tab, and loading.

## Basic usage

\`\`\`tsx
import { InputOTP } from 'libreriacomponentes';

<InputOTP label="Verification code" length={6} />
\`\`\``,
      },
    },
  },
  argTypes: {
    length: { control: { type: 'number', min: 4, max: 8 } },
    disabled: { control: 'boolean' },
    isLoading: { control: 'boolean' },
    required: { control: 'boolean' },
    label: { control: 'text' },
    helperText: { control: 'text' },
    errorMessage: { control: 'text' },
    isInputNum: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof InputOTP>;

export const Playground: Story = {
  render: function Render(args) {
    const [value, setValue] = useState('');
    return <InputOTP {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Verification Code',
    helperText: 'Enter the 6-digit code sent to your email.',
    length: 6,
  },
};
