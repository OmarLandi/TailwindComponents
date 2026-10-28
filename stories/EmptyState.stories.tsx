import type { Meta, StoryObj } from '@storybook/react-vite';
import { FolderOpen, Inbox, SearchX } from 'lucide-react';

import { Button } from '../src/components/Button';
import { EmptyState } from '../src/components/EmptyState';

const meta: Meta<typeof EmptyState> = {
  title: 'Data Display/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `A flexible empty state for lists, tables, search results and first-run experiences.

The icon is decorative; the title is the accessible name of the group. Provide an
action or secondary action when the user can recover from the empty state.`,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'muted', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
    headingLevel: {
      control: 'select',
      options: [2, 3, 4, 5, 6],
    },
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Playground: Story = {
  args: {
    title: 'No projects yet',
    description: 'Create your first project to start organizing your work.',
    icon: <FolderOpen />,
    variant: 'default',
    size: 'default',
    headingLevel: 3,
    action: <Button>New project</Button>,
    secondaryAction: <Button variant="outline">Import project</Button>,
  },
};

export const NoResults: Story = {
  args: {
    title: 'No results found',
    description: 'Try a different search term or clear your filters.',
    icon: <SearchX />,
    variant: 'muted',
    action: <Button variant="outline">Clear filters</Button>,
  },
};

export const InboxZero: Story = {
  args: {
    title: 'You are all caught up',
    description: 'New notifications will appear here.',
    icon: <Inbox />,
    size: 'lg',
    variant: 'outline',
  },
};

export const Mobile: Story = {
  args: {
    title: 'No messages',
    description: 'Start a conversation and it will appear in this list.',
    icon: <Inbox />,
    variant: 'muted',
    action: <Button fullWidth>New message</Button>,
  },
  globals: {
    viewport: {
      value: 'mobile1',
      isRotated: false,
    },
  },
};
