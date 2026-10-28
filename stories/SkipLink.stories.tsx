import type { Meta, StoryObj } from '@storybook/react-vite';

import { SkipLink } from '../src/components/SkipLink';

const meta: Meta<typeof SkipLink> = {
  title: 'Layout/SkipLink',
  component: SkipLink,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Keyboard-only link that jumps to the main landmark.

It is visually hidden until focused. Place it as the first focusable element on the
page and point it to the id of the single \`main\` landmark (default \`#main\`).`,
      },
    },
  },
  argTypes: {
    href: { control: 'text' },
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof SkipLink>;

export const Playground: Story = {
  args: {
    href: '#main',
    children: 'Skip to content',
  },
  render: args => (
    <div className="min-h-64 space-y-4">
      <SkipLink {...args} />
      <main id="main" className="rounded-lg border border-dashed border-border p-6">
        <h1 className="text-lg font-semibold">Main content</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Press Tab to focus the skip link. It becomes visible at the top of the page.
        </p>
      </main>
    </div>
  ),
};

export const CustomLabel: Story = {
  args: {
    href: '#results',
    children: 'Skip to results',
  },
  render: args => (
    <div className="min-h-64 space-y-4">
      <SkipLink {...args} />
      <section id="results" className="rounded-lg border border-dashed border-border p-6">
        <h2 className="text-lg font-semibold">Results</h2>
      </section>
    </div>
  ),
};
