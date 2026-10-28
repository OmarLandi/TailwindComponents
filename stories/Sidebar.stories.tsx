import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarItem,
  SidebarSeparator,
} from '../src/components/Sidebar';
import { Home, Settings, User, Mail, Bell, Calendar } from 'lucide-react';
import { Button } from '../src/components/Button';

const meta: Meta<typeof Sidebar> = {
  title: 'Navigation/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `A collapsible sidebar navigation component with header, content groups, and footer.

## Basic usage

\`\`\`tsx
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarItem, SidebarSeparator } from 'libreriacomponentes';

<Sidebar collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
  <SidebarHeader>MyApp</SidebarHeader>
  <SidebarContent>
    <SidebarGroup label="Main">
      <SidebarItem href="#" icon={<Home />} isActive>Home</SidebarItem>
      <SidebarItem href="#" icon={<User />}>Profile</SidebarItem>
    </SidebarGroup>
    <SidebarSeparator />
  </SidebarContent>
  <SidebarFooter>
    <SidebarItem href="#" icon={<Settings />}>Settings</SidebarItem>
  </SidebarFooter>
</Sidebar>
\`\`\`

## Variants

\`\`\`tsx
{/* Collapsed - icons only */}
<Sidebar collapsible collapsed={true}>
  <SidebarItem href="#" icon={<Home />} />
  <SidebarItem href="#" icon={<Settings />} />
</Sidebar>

{/* Multiple groups */}
<Sidebar collapsible>
  <SidebarGroup label="Overview">
    <SidebarItem href="#" icon={<Home />} isActive>Dashboard</SidebarItem>
  </SidebarGroup>
  <SidebarSeparator />
  <SidebarGroup label="Management">
    <SidebarItem href="#" icon={<User />}>Users</SidebarItem>
  </SidebarGroup>
</Sidebar>
\`\`\``,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Playground: Story = {
  render: function Render() {
    const [collapsed, setCollapsed] = useState(false);
    return (
      <div className="flex min-h-[400px] rounded-md border border-border overflow-hidden">
        <Sidebar collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
          <SidebarHeader>MyApp</SidebarHeader>
          <SidebarContent>
            <SidebarGroup label="Main">
              <SidebarItem href="#" icon={<Home />} isActive>
                Home
              </SidebarItem>
              <SidebarItem href="#" icon={<User />}>
                Profile
              </SidebarItem>
              <SidebarItem href="#" icon={<Mail />}>
                Messages
              </SidebarItem>
            </SidebarGroup>
            <SidebarSeparator />
            <SidebarGroup label="Workspace">
              <SidebarItem href="#" icon={<Calendar />}>
                Calendar
              </SidebarItem>
              <SidebarItem href="#" icon={<Bell />}>
                Notifications
              </SidebarItem>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarItem href="#" icon={<Settings />}>
              Settings
            </SidebarItem>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1 p-6 bg-muted/20">Main content area</main>
      </div>
    );
  },
};

export const Mobile: Story = {
  render: function Render() {
    const [open, setOpen] = useState(true);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open navigation</Button>
        <Sidebar mobile mobileOpen={open} onMobileClose={() => setOpen(false)}>
          <SidebarHeader>MyApp</SidebarHeader>
          <SidebarContent>
            <SidebarGroup label="Main">
              <SidebarItem href="#" icon={<Home />} isActive>
                Home
              </SidebarItem>
              <SidebarItem href="#" icon={<User />}>
                Profile
              </SidebarItem>
              <SidebarItem href="#" icon={<Mail />}>
                Messages
              </SidebarItem>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarItem href="#" icon={<Settings />}>
              Settings
            </SidebarItem>
          </SidebarFooter>
        </Sidebar>
      </>
    );
  },
  globals: {
    viewport: {
      value: 'mobile',
      isRotated: false,
    },
  },
};
