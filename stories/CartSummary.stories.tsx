import type { Meta, StoryObj } from '@storybook/react-vite';
import { CartSummary } from '../src/components/CartSummary';

const meta: Meta<typeof CartSummary> = {
  title: 'Data Display/CartSummary',
  component: CartSummary,
  tags: ['autodocs'],
  args: {
    subtotal: 48,
    shipping: 5,
    tax: 4.24,
    total: 57.24,
  },
};

export default meta;
type Story = StoryObj<typeof CartSummary>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
