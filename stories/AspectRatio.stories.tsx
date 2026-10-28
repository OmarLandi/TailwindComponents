import type { Meta, StoryObj } from '@storybook/react-vite';

import { AspectRatio } from '../src/components/AspectRatio';

const meta: Meta<typeof AspectRatio> = {
  title: 'Layout/AspectRatio',
  component: AspectRatio,
  tags: ['autodocs'],
  args: {
    ratio: 16 / 9,
    children: 'Media',
  },
};

export default meta;
type Story = StoryObj<typeof AspectRatio>;

export const Playground: Story = {
  render: args => (
    <AspectRatio {...args} className="max-w-md bg-muted">
      <img
        alt="Aspect ratio demo"
        className="h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80"
      />
    </AspectRatio>
  ),
};

export const Square: Story = {
  args: { ratio: 1 },
  render: args => (
    <AspectRatio {...args} className="max-w-xs bg-muted">
      <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
        1:1
      </div>
    </AspectRatio>
  ),
};
