import type { Meta, StoryObj } from '@storybook/react-vite';
import { CartItem } from '../src/components/CartItem';

const meta: Meta<typeof CartItem> = {
  title: 'Data Display/CartItem',
  component: CartItem,
  tags: ['autodocs'],
  args: {
    title: 'Field notebook',
    imageSrc:
      'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=200&q=80',
    imageAlt: 'Notebook',
    price: 24,
    quantity: 2,
  },
};

export default meta;
type Story = StoryObj<typeof CartItem>;

export const Default: Story = {};
