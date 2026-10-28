import type { Meta, StoryObj } from '@storybook/react-vite';
import { ShareBar } from '../src/components/ShareBar';

const meta: Meta<typeof ShareBar> = {
  title: 'Data Display/ShareBar',
  component: ShareBar,
  tags: ['autodocs'],
  args: {
    url: 'https://example.com/article',
    title: 'Designing resilient component libraries',
    orientation: 'horizontal',
  },
};

export default meta;
type Story = StoryObj<typeof ShareBar>;

export const Default: Story = {};
export const Vertical: Story = { args: { orientation: 'vertical' } };
