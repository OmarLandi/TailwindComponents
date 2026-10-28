import type { Meta, StoryObj } from '@storybook/react-vite';

import { Separator } from '../src/components/Separator';

const meta: Meta<typeof Separator> = {
  title: 'Layout/Separator',
  component: Separator,
  tags: ['autodocs'],
  args: {
    orientation: 'horizontal',
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Playground: Story = {
  render: args => (
    <div className="w-full max-w-md space-y-2">
      <p className="text-sm">Above</p>
      <Separator {...args} />
      <p className="text-sm">Below</p>
    </div>
  ),
};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: args => (
    <div className="flex h-20 items-center gap-4">
      <span>Left</span>
      <Separator {...args} />
      <span>Right</span>
    </div>
  ),
};
