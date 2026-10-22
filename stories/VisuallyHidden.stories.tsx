import type { Meta, StoryObj } from '@storybook/react';
import { Plus, Search } from 'lucide-react';

import { Button } from '../src/components/Button';
import { VisuallyHidden } from '../src/components/VisuallyHidden';

const meta: Meta<typeof VisuallyHidden> = {
  title: 'Layout/VisuallyHidden',
  component: VisuallyHidden,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Hides content visually while keeping it available to assistive technology.

Use it to give icon-only controls an accessible name or to add context that would be
redundant on screen. Prefer \`aria-label\` for short control names when possible.`,
      },
    },
  },
  argTypes: {
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof VisuallyHidden>;

export const Playground: Story = {
  args: {
    children: 'Add item',
  },
  render: args => (
    <Button size="icon" aria-label={undefined}>
      <Plus aria-hidden="true" />
      <VisuallyHidden {...args} />
    </Button>
  ),
};

export const IconButton: Story = {
  args: {
    children: 'Search',
  },
  render: args => (
    <Button variant="outline" size="icon">
      <Search aria-hidden="true" />
      <VisuallyHidden {...args} />
    </Button>
  ),
};
