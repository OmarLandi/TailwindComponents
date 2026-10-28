import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bell, LayoutDashboard, Settings, Users } from 'lucide-react';

import { AppShell } from '../src/components/AppShell';
import { Button } from '../src/components/Button';

const meta: Meta<typeof AppShell> = {
  title: 'Layout/AppShell',
  component: AppShell,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Application frame with header, optional sidebar, main landmark and footer.

The sidebar is hidden below \`mobileBreakpoint\` (default \`lg\`); provide the mobile
navigation trigger in the header or a modal drawer. Use \`topnav\` for apps without a
persistent sidebar. The shell renders one \`main\` and a skip link by default.`,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'sidebar', 'topnav', 'hybrid'],
    },
    sidebarSide: { control: 'select', options: ['left', 'right'] },
    sidebarWidth: {
      control: 'select',
      options: ['auto', 'sm', 'default', 'lg', 'xl'],
    },
    mobileBreakpoint: { control: 'select', options: ['md', 'lg', 'xl'] },
    collapsed: { control: 'boolean' },
    headerSticky: { control: 'boolean' },
    skipLink: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof AppShell>;

const navItems = [
  { label: 'Overview', icon: LayoutDashboard, active: true },
  { label: 'Members', icon: Users, active: false },
  { label: 'Settings', icon: Settings, active: false },
];

const shellArgs = {
  header: (
    <header className="flex h-16 items-center justify-between border-b border-border px-4 sm:px-6">
      <span className="text-sm font-semibold">Acme workspace</span>
      <Button variant="ghost" size="icon" aria-label="Notifications">
        <Bell aria-hidden="true" />
      </Button>
    </header>
  ),
  sidebar: (
    <aside aria-label="Sidebar" className="flex h-full flex-col gap-1 p-3">
      {navItems.map(item => (
        <a
          key={item.label}
          href={`#${item.label.toLowerCase()}`}
          aria-current={item.active ? 'page' : undefined}
          className={`flex min-h-11 items-center gap-2 rounded-md px-3 text-sm ${
            item.active
              ? 'bg-accent text-accent-foreground'
              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          }`}
        >
          <item.icon className="h-4 w-4" aria-hidden="true" />
          {item.label}
        </a>
      ))}
    </aside>
  ),
  footer: (
    <footer className="border-t border-border px-4 py-4 text-sm text-muted-foreground sm:px-6">
      Acme workspace · All systems operational
    </footer>
  ),
  children: (
    <div className="space-y-4 p-4 sm:p-6">
      <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
      <p className="max-w-prose text-sm text-muted-foreground">
        The app shell owns the landmarks and the sidebar layout. Page content only needs its own
        header and sections.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-4">Active members: 24</div>
        <div className="rounded-lg border border-border bg-card p-4">Open projects: 8</div>
        <div className="rounded-lg border border-border bg-card p-4">Pending invites: 3</div>
      </div>
    </div>
  ),
};

export const Playground: Story = {
  args: shellArgs,
};

export const TopNavigation: Story = {
  args: {
    ...shellArgs,
    variant: 'topnav',
  },
};

export const RightSidebar: Story = {
  args: {
    ...shellArgs,
    sidebarSide: 'right',
  },
};

export const CollapsedSidebar: Story = {
  args: {
    ...shellArgs,
    collapsed: true,
  },
};

export const Mobile: Story = {
  args: shellArgs,
  globals: {
    viewport: {
      value: 'mobile1',
      isRotated: false,
    },
  },
};
