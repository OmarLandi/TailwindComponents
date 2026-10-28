import type { Meta, StoryObj } from '@storybook/react-vite';

import { ScrollArea } from '../src/components/ScrollArea';

const meta: Meta<typeof ScrollArea> = {
  title: 'Layout/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
  args: {
    orientation: 'vertical',
    className: 'h-48 w-64 rounded-md border border-border',
  },
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

export const Playground: Story = {
  render: args => (
    <ScrollArea {...args}>
      <div className="p-4">
        {Array.from({ length: 20 }).map((_, index) => (
          <p key={index} className="text-sm">
            Scrollable row {index + 1}
          </p>
        ))}
      </div>
    </ScrollArea>
  ),
};
