import type { Meta, StoryObj } from '@storybook/react-vite';
import { FeedPost } from '../src/components/FeedPost';

const meta: Meta<typeof FeedPost> = {
  title: 'Data Display/FeedPost',
  component: FeedPost,
  tags: ['autodocs'],
  args: {
    author: 'Ada Lovelace',
    timestamp: '2 hours ago',
    content: 'Building accessible component libraries is a team sport.',
  },
};

export default meta;
type Story = StoryObj<typeof FeedPost>;

export const Default: Story = {};
