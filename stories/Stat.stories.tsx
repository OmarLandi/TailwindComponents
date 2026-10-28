import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stat } from '../src/components/Stat';

const meta: Meta<typeof Stat> = {
  title: 'Data Display/Stat',
  component: Stat,
  tags: ['autodocs'],
  args: {
    label: 'Revenue',
    value: '$12,400',
    change: '+12% this month',
    trend: 'up',
  },
};

export default meta;
type Story = StoryObj<typeof Stat>;

export const Default: Story = {};
export const Down: Story = { args: { trend: 'down', change: '-3% this month' } };
