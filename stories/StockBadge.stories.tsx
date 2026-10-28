import type { Meta, StoryObj } from '@storybook/react-vite';
import { StockBadge } from '../src/components/StockBadge';

const meta: Meta<typeof StockBadge> = {
  title: 'Data Display/StockBadge',
  component: StockBadge,
  tags: ['autodocs'],
  args: {
    status: 'in-stock',
    quantity: 12,
  },
};

export default meta;
type Story = StoryObj<typeof StockBadge>;

export const Default: Story = {};
export const LowStock: Story = { args: { status: 'low-stock', quantity: 3 } };
export const OutOfStock: Story = { args: { status: 'out-of-stock' } };
