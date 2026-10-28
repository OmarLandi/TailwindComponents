import type { Meta, StoryObj } from '@storybook/react-vite';
import { Comment } from '../src/components/Comment';

const meta: Meta<typeof Comment> = {
  title: 'Data Display/Comment',
  component: Comment,
  tags: ['autodocs'],
  args: {
    author: 'Ada Lovelace',
    timestamp: '2 hours ago',
    content: 'This component library is excellent.',
  },
};

export default meta;
type Story = StoryObj<typeof Comment>;

export const Default: Story = {};
export const WithReplies: Story = {
  args: {
    replies: <Comment author="Grace Hopper" timestamp="1 hour ago" content="Agreed." />,
  },
};
