import type { Meta, StoryObj } from '@storybook/react-vite';
import { Price } from '../src/components/Price';

const meta: Meta<typeof Price> = {
  title: 'Data Display/Price',
  component: Price,
  tags: ['autodocs'],
  args: {
    amount: 49.99,
    originalAmount: 69.99,
    currency: 'USD',
  },
};

export default meta;
type Story = StoryObj<typeof Price>;

export const Default: Story = {};
export const Large: Story = { args: { size: 'lg' } };
