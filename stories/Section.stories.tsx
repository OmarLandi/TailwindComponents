import type { Meta, StoryObj } from '@storybook/react-vite';

import { Section } from '../src/components/Section';

const meta: Meta<typeof Section> = {
  title: 'Layout/Section',
  component: Section,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Page section with vertical rhythm, semantic surface and an optional inner Container.

Use \`bleed\` when the content must reach the section edges (hero, media, maps).
Otherwise the content is centered at the semantic \`width\` token.`,
      },
    },
  },
  argTypes: {
    spacing: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
    },
    surface: {
      control: 'select',
      options: ['base', 'muted', 'card', 'accent', 'inverse'],
    },
    width: {
      control: 'select',
      options: ['prose', 'form', 'content', 'wide', 'full'],
    },
    container: { control: 'boolean' },
    bleed: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Section>;

export const Playground: Story = {
  args: {
    spacing: 'md',
    surface: 'base',
    width: 'content',
    children: (
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Section title</h2>
        <p className="max-w-prose text-muted-foreground">
          Sections separate page regions and keep vertical rhythm consistent across templates.
        </p>
      </div>
    ),
  },
};

export const Muted: Story = {
  args: {
    spacing: 'lg',
    surface: 'muted',
    width: 'content',
    children: (
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-4">First block</div>
        <div className="rounded-lg border border-border bg-card p-4">Second block</div>
      </div>
    ),
  },
};

export const FormWidth: Story = {
  args: {
    spacing: 'md',
    width: 'form',
    children: (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Account settings</h2>
        <p className="text-sm text-muted-foreground">Forms stay within a readable measure.</p>
      </div>
    ),
  },
};

export const Bleed: Story = {
  args: {
    spacing: 'xl',
    surface: 'inverse',
    bleed: true,
    children: (
      <div className="px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold">Full-width hero</h2>
        <p className="mx-auto mt-2 max-w-prose opacity-80">
          Background and content can span the whole section.
        </p>
      </div>
    ),
  },
};
