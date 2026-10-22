import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../src/components/Button';
import { PageHeader } from '../src/components/PageHeader';

const meta: Meta<typeof PageHeader> = {
  title: 'Layout/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Page-level header with breadcrumb, title, description, actions and tabs.

Render one \`h1\` per page (default) and use \`titleAs\` when the header is nested in
a larger section. \`sticky\` keeps the header visible without covering page scroll.`,
      },
    },
  },
  argTypes: {
    titleAs: { control: 'select', options: ['h1', 'h2', 'h3'] },
    sticky: { control: 'boolean' },
    bordered: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Playground: Story = {
  args: {
    title: 'Projects',
    description: 'Create, organize and review the work your team is shipping.',
    actions: (
      <>
        <Button variant="outline">Import</Button>
        <Button>New project</Button>
      </>
    ),
  },
};

export const WithBreadcrumbAndTabs: Story = {
  args: {
    breadcrumb: <span>Workspace / Settings</span>,
    title: 'Settings',
    description: 'Manage workspace preferences, members and billing.',
    tabs: (
      <div className="flex gap-4 border-b border-border text-sm">
        <span className="border-b-2 border-primary pb-2 font-medium text-foreground">General</span>
        <span className="pb-2 text-muted-foreground">Members</span>
        <span className="pb-2 text-muted-foreground">Billing</span>
      </div>
    ),
    actions: <Button>Save changes</Button>,
  },
};

export const Sticky: Story = {
  args: {
    title: 'Team members',
    description: 'Invite collaborators and manage access.',
    sticky: true,
    actions: <Button>Invite member</Button>,
  },
};

export const Mobile: Story = {
  args: {
    title: 'Project overview',
    description: 'A short description that wraps below the title on small screens.',
    actions: (
      <>
        <Button variant="outline" fullWidth>
          Share
        </Button>
        <Button fullWidth>Edit project</Button>
      </>
    ),
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
};
