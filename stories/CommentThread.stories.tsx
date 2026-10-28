import type { Meta, StoryObj } from '@storybook/react-vite';
import { CommentThread } from '../src/components/CommentThread';

const meta: Meta<typeof CommentThread> = {
  title: 'Data Display/CommentThread',
  component: CommentThread,
  tags: ['autodocs'],
  args: {
    count: 2,
    children: (
      <>
        <div>First comment</div>
        <div>Second comment</div>
      </>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof CommentThread>;

export const Default: Story = {};
