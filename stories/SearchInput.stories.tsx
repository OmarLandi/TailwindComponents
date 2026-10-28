import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchInput } from '../src/components/SearchInput';

const meta: Meta<typeof SearchInput> = {
  title: 'Forms/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  args: {
    placeholder: 'Search...',
  },
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {};
