import type { Meta, StoryObj } from '@storybook/react-vite';
import { BottomSheet } from '../src/components/BottomSheet';

const meta: Meta<typeof BottomSheet> = {
  title: 'Data Display/BottomSheet',
  component: BottomSheet,
  tags: ['autodocs'],
  args: {
    open: true,
    title: 'Filters',
    children: 'Sheet content',
  },
};

export default meta;
type Story = StoryObj<typeof BottomSheet>;

export const Default: Story = {};
export const Closed: Story = { args: { open: false } };
