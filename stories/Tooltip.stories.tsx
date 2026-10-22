import type { Meta, StoryObj } from '@storybook/react';
import { Info } from 'lucide-react';

import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../src/components/Tooltip';
import { Button } from '../src/components/Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Data Display/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <TooltipProvider delayDuration={150} skipDelayDuration={300}>
        <Story />
      </TooltipProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `A popup that displays information related to an element when hovering or focusing it.

The content is rendered in the themed portal container, so it is not clipped by
\`overflow-hidden\` ancestors and keeps the active palette and color mode.

## Basic usage

\`\`\`tsx
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from 'libreriacomponentes';

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>This is a tooltip</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
\`\`\`

The provider is required. Use it once at the application root (or around the
tooltips) to share open/close delays between triggers.`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Playground: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover or focus me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This is a tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const Sides: Story = {
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-3 p-12">
      {(['top', 'right', 'bottom', 'left'] as const).map(side => (
        <Tooltip key={side}>
          <TooltipTrigger asChild>
            <Button variant="outline" className="capitalize">
              {side}
            </Button>
          </TooltipTrigger>
          <TooltipContent side={side}>
            <p>Tooltip on {side}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
};

export const WithArrow: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">With arrow</Button>
      </TooltipTrigger>
      <TooltipContent>
        <TooltipArrow />
        <p>Tooltip with a directional arrow</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const IconTrigger: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="More information">
          <Info aria-hidden="true" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Icon-only buttons need an accessible name.</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Long content</Button>
      </TooltipTrigger>
      <TooltipContent className="max-w-64">
        <p>
          Tooltips should stay short. If you need more than a sentence or two, use a popover or a
          dialog so the content can be read and interacted with.
        </p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const KeyboardFocus: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Tab to me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Visible on keyboard focus as well as hover</p>
      </TooltipContent>
    </Tooltip>
  ),
};
