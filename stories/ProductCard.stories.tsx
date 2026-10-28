import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProductCard } from '../src/components/ProductCard';

const meta: Meta<typeof ProductCard> = {
  title: 'Data Display/ProductCard',
  component: ProductCard,
  tags: ['autodocs'],
  args: {
    title: 'Field notebook',
    imageSrc:
      'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Notebook on a table',
    description: 'A durable notebook for daily planning.',
    price: 24,
    originalPrice: 32,
    rating: 4.5,
    reviewCount: 128,
    stockStatus: 'in-stock',
    stockQuantity: 8,
  },
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {};
export const OutOfStock: Story = { args: { stockStatus: 'out-of-stock', stockQuantity: 0 } };
