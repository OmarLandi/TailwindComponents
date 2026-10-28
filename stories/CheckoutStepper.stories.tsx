import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckoutStepper } from '../src/components/CheckoutStepper';

const meta: Meta<typeof CheckoutStepper> = {
  title: 'Data Display/CheckoutStepper',
  component: CheckoutStepper,
  tags: ['autodocs'],
  args: {
    steps: [
      { id: 'cart', label: 'Cart' },
      { id: 'shipping', label: 'Shipping', description: 'Delivery details' },
      { id: 'payment', label: 'Payment' },
      { id: 'review', label: 'Review' },
    ],
    currentStep: 1,
  },
};

export default meta;
type Story = StoryObj<typeof CheckoutStepper>;

export const Default: Story = {};
export const FinalStep: Story = { args: { currentStep: 3 } };
