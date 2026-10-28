import type { Meta, StoryObj } from '@storybook/react-vite';
import { NumberInput } from '../src/components/NumberInput';

const meta: Meta<typeof NumberInput> = {
  title: 'Forms/NumberInput',
  component: NumberInput,
  tags: ['autodocs'],
  args: {
    defaultValue: 1,
    min: 0,
    max: 10,
  },
};

export default meta;
type Story = StoryObj<typeof NumberInput>;

export const Default: Story = {};
