import type { Meta, StoryObj } from '@storybook/react-vite';
import { PasswordInput } from '../src/components/PasswordInput';

const meta: Meta<typeof PasswordInput> = {
  title: 'Forms/PasswordInput',
  component: PasswordInput,
  tags: ['autodocs'],
  args: {
    placeholder: 'Password',
  },
};

export default meta;
type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = {};
