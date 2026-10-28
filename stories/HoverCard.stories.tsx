import type { Meta, StoryObj } from '@storybook/react-vite';
import { HoverCard } from '../src/components/HoverCard';

const meta: Meta<typeof HoverCard> = {
  title: 'Data Display/HoverCard',
  component: HoverCard,
  tags: ['autodocs'],
  args: {
    trigger: <button type="button">Hover me</button>,
    content: 'Additional details',
  },
};

export default meta;
type Story = StoryObj<typeof HoverCard>;

export const Default: Story = {};
