import type { Meta, StoryObj } from '@storybook/react-vite';

import { Stack } from '../src/components/Stack';

const meta: Meta<typeof Stack> = {
  title: 'Layout/Stack',
  component: Stack,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Flex-based distribution primitive for vertical or horizontal groups.

Use \`Stack\` for one-dimensional rhythm and \`Grid\` for two-dimensional distribution.
The base direction is a column, so layouts are mobile-first by default.`,
      },
    },
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'column', 'row-reverse', 'column-reverse'],
    },
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
    },
    wrap: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Stack>;

const Item = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-md border border-border bg-card p-4 text-sm text-card-foreground">
    {children}
  </div>
);

export const Playground: Story = {
  args: {
    direction: 'row',
    gap: 'md',
    align: 'center',
    justify: 'start',
    wrap: true,
    children: (
      <>
        <Item>First item</Item>
        <Item>Second item</Item>
        <Item>Third item</Item>
      </>
    ),
  },
};

export const Vertical: Story = {
  args: {
    direction: 'column',
    gap: 'sm',
    children: (
      <>
        <Item>Profile</Item>
        <Item>Notifications</Item>
        <Item>Security</Item>
      </>
    ),
  },
};

export const Between: Story = {
  args: {
    direction: 'row',
    align: 'center',
    justify: 'between',
    children: (
      <>
        <strong className="text-sm">Workspace members</strong>
        <span className="text-sm text-muted-foreground">12 active</span>
      </>
    ),
  },
};

export const Mobile: Story = {
  args: {
    direction: 'column',
    gap: 'md',
    align: 'stretch',
    children: (
      <>
        <Item>First item</Item>
        <Item>Second item</Item>
      </>
    ),
  },
  globals: {
    viewport: {
      value: 'mobile1',
      isRotated: false,
    },
  },
};
