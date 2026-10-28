import type { Meta, StoryObj } from '@storybook/react-vite';
import { Timeline } from '../src/components/Timeline';

const meta: Meta<typeof Timeline> = {
  title: 'Data Display/Timeline',
  component: Timeline,
  tags: ['autodocs'],
  args: {
    items: [
      { id: '1', title: 'Created', time: '10:00' },
      { id: '2', title: 'Reviewed', time: '11:00' },
      { id: '3', title: 'Published', time: '12:00' },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof Timeline>;

export const Default: Story = {};
