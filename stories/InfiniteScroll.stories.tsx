import type { Meta, StoryObj } from '@storybook/react-vite';
import { InfiniteScroll } from '../src/components/InfiniteScroll';

const meta: Meta<typeof InfiniteScroll> = {
  title: 'Utilities/InfiniteScroll',
  component: InfiniteScroll,
  tags: ['autodocs'],
  args: {
    hasMore: true,
    isLoading: false,
    children: <div>Loaded content</div>,
    endMessage: 'No more results',
  },
};

export default meta;
type Story = StoryObj<typeof InfiniteScroll>;

export const Default: Story = {};
export const Loading: Story = { args: { isLoading: true } };
