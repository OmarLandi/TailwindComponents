import type { Meta, StoryObj } from '@storybook/react-vite';
import { NotificationItem } from '../src/components/NotificationItem';

const meta: Meta<typeof NotificationItem> = {
  title: 'Data Display/NotificationItem',
  component: NotificationItem,
  tags: ['autodocs'],
  args: {
    title: 'New comment on your post',
    description: 'Grace Hopper replied to your update.',
    timestamp: '5 min ago',
    unread: true,
  },
};

export default meta;
type Story = StoryObj<typeof NotificationItem>;

export const Default: Story = {};
export const Read: Story = { args: { unread: false } };
