import type { Meta, StoryObj } from '@storybook/react-vite';
import { ReactionBar } from '../src/components/ReactionBar';

const meta: Meta<typeof ReactionBar> = {
  title: 'Data Display/ReactionBar',
  component: ReactionBar,
  tags: ['autodocs'],
  args: {
    likes: 12,
    comments: 3,
    shares: 1,
    liked: false,
  },
};

export default meta;
type Story = StoryObj<typeof ReactionBar>;

export const Default: Story = {};
export const Liked: Story = { args: { liked: true } };
