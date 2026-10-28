import type { Meta, StoryObj } from '@storybook/react-vite';
import { Review } from '../src/components/Review';

const meta: Meta<typeof Review> = {
  title: 'Data Display/Review',
  component: Review,
  tags: ['autodocs'],
  args: {
    author: 'Ada Lovelace',
    rating: 4.5,
    date: 'Oct 28, 2026',
    title: 'Excellent component library',
    content: 'Well documented and accessible.',
    helpfulCount: 12,
  },
};

export default meta;
type Story = StoryObj<typeof Review>;

export const Default: Story = {};
