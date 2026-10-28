import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryCarousel } from '../src/components/StoryCarousel';

const meta: Meta<typeof StoryCarousel> = {
  title: 'Data Display/StoryCarousel',
  component: StoryCarousel,
  tags: ['autodocs'],
  args: {
    stories: [
      { id: '1', label: 'Ada', viewed: false },
      { id: '2', label: 'Grace', viewed: true },
      { id: '3', label: 'Alan', viewed: false },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof StoryCarousel>;

export const Default: Story = {};
