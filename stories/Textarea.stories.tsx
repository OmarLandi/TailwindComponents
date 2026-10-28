import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from '../src/components/Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Forms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `A textarea component with label, helper text, error, and loading state.

## Basic usage

\`\`\`tsx
import { Textarea } from 'libreriacomponentes';

<Textarea label="Description" placeholder="Enter description..." />
\`\`\``,
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['default', 'filled', 'ghost'] },
    size: { control: 'select', options: ['sm', 'default', 'lg'] },
    disabled: { control: 'boolean' },
    isLoading: { control: 'boolean' },
    required: { control: 'boolean' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    errorMessage: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Playground: Story = {
  args: {
    placeholder: 'Write your message here...',
    label: 'Message',
    helperText: 'Maximum 500 characters.',
  },
};
