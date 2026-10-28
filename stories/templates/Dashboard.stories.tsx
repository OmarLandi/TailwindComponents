import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import {
  ArrowUpRight,
  BarChart3,
  CreditCard,
  Download,
  LayoutDashboard,
  LifeBuoy,
  Plus,
  Search,
  Settings,
  Users,
} from 'lucide-react';

import { AppShell } from '../../src/components/AppShell';
import { Avatar, AvatarFallback } from '../../src/components/Avatar';
import { Badge } from '../../src/components/Badge';
import { Button } from '../../src/components/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../src/components/Card';
import { Container } from '../../src/components/Container';
import { Grid } from '../../src/components/Grid';
import { PageHeader } from '../../src/components/PageHeader';
import { Progress } from '../../src/components/Progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../src/components/Table';
import {
  MobileNavButton,
  MobileNavigation,
  TemplateBrand,
  TemplateNav,
  type TemplateNavItem,
} from './shared';

const workspaceItems: TemplateNavItem[] = [
  { label: 'Dashboard', href: '#main', icon: <LayoutDashboard />, active: true },
  { label: 'Analytics', href: '#analytics', icon: <BarChart3 /> },
  { label: 'Customers', href: '#customers', icon: <Users /> },
  { label: 'Billing', href: '#billing', icon: <CreditCard /> },
];

const accountItems: TemplateNavItem[] = [
  { label: 'Settings', href: '#settings', icon: <Settings /> },
  { label: 'Support', href: '#support', icon: <LifeBuoy /> },
];

const stats = [
  { label: 'Revenue', value: '$48,290', change: '+12.4%', progress: 78 },
  { label: 'Active customers', value: '2,418', change: '+8.1%', progress: 64 },
  { label: 'Conversion', value: '4.8%', change: '+0.6 pts', progress: 48 },
  { label: 'Open tickets', value: '18', change: '-22%', progress: 32 },
];

const chart = [
  { month: 'Jan', value: 42 },
  { month: 'Feb', value: 58 },
  { month: 'Mar', value: 46 },
  { month: 'Apr', value: 72 },
  { month: 'May', value: 64 },
  { month: 'Jun', value: 88 },
];

const orders = [
  { id: '#1042', customer: 'Ana Torres', initials: 'AT', status: 'Paid', total: '$1,240' },
  { id: '#1041', customer: 'Jon Bell', initials: 'JB', status: 'Pending', total: '$860' },
  { id: '#1039', customer: 'Mina Park', initials: 'MP', status: 'Paid', total: '$2,120' },
  { id: '#1038', customer: 'Ravi Shah', initials: 'RS', status: 'Refunded', total: '$340' },
];

function DashboardPage() {
  const [navOpen, setNavOpen] = React.useState(false);
  const allItems = [...workspaceItems, ...accountItems];

  return (
    <>
      <AppShell
        sidebarWidth="default"
        header={
          <header className="flex h-16 items-center gap-3 border-b border-border bg-background px-4 sm:px-6 lg:px-8">
            <MobileNavButton open={navOpen} onClick={() => setNavOpen(true)} />
            <TemplateBrand />
            <div className="ms-auto flex items-center gap-1">
              <Button variant="ghost" size="icon" aria-label="Search">
                <Search className="h-5 w-5" aria-hidden="true" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Download report">
                <Download className="h-5 w-5" aria-hidden="true" />
              </Button>
              <Avatar className="ms-1 h-9 w-9">
                <AvatarFallback>AT</AvatarFallback>
              </Avatar>
            </div>
          </header>
        }
        sidebar={
          <aside className="flex h-full flex-col gap-6 border-e border-border p-4">
            <div className="space-y-6">
              <TemplateNav items={workspaceItems} label="Workspace" />
              <TemplateNav items={accountItems} label="Account" />
            </div>
            <div className="mt-auto rounded-lg border border-border bg-muted/40 p-3">
              <p className="text-sm font-medium">Pro plan</p>
              <p className="mt-1 text-xs text-muted-foreground">18 of 25 seats used</p>
              <Progress className="mt-3 h-2" value={72} aria-label="Seats used" />
            </div>
          </aside>
        }
      >
        <Container size="wide" padding="lg" className="py-6 sm:py-8">
          <PageHeader
            title="Dashboard"
            description="Monitor revenue, customer activity and open work across your workspace."
            actions={
              <>
                <Button variant="outline">Export</Button>
                <Button>
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  New order
                </Button>
              </>
            }
          />

          <div className="space-y-8 pt-8">
            <section aria-labelledby="overview-heading" className="space-y-4">
              <h2 id="overview-heading" className="text-lg font-semibold tracking-tight">
                Overview
              </h2>
              <Grid columns={{ base: 1, sm: 2, xl: 4 }} gap="md">
                {stats.map(stat => (
                  <Card key={stat.label}>
                    <CardHeader className="pb-2">
                      <CardDescription>{stat.label}</CardDescription>
                      <CardTitle className="text-3xl">{stat.value}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="flex items-center gap-1 text-xs font-medium text-success">
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        {stat.change}
                        <span className="font-normal text-muted-foreground">vs last month</span>
                      </p>
                      <Progress
                        className="h-2"
                        value={stat.progress}
                        aria-label={`${stat.label} goal progress`}
                      />
                    </CardContent>
                  </Card>
                ))}
              </Grid>
            </section>

            <Grid columns={{ base: 1, xl: 12 }} gap="lg">
              <Card className="xl:col-span-8">
                <CardHeader>
                  <CardTitle className="text-lg">Revenue trend</CardTitle>
                  <CardDescription>Monthly recurring revenue, last six months.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    role="img"
                    aria-label="Revenue increased from 42 in January to 88 in June."
                    className="flex h-48 items-end gap-3 sm:gap-5"
                  >
                    {chart.map(month => (
                      <div
                        key={month.month}
                        className="flex min-w-0 flex-1 flex-col items-center gap-2"
                      >
                        <div className="flex h-36 w-full items-end rounded-sm bg-muted">
                          <div
                            className="w-full rounded-sm bg-primary transition-[height] motion-reduce:transition-none"
                            style={{ height: `${month.value}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">{month.month}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="xl:col-span-4">
                <CardHeader>
                  <CardTitle className="text-lg">Recent activity</CardTitle>
                  <CardDescription>Latest events from your team.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-4">
                    {[
                      'Ana approved invoice #1042',
                      'Jon invited 3 teammates',
                      'Mina upgraded to Pro',
                      'Ravi requested a refund',
                    ].map((activity, index) => (
                      <li key={activity} className="flex gap-3">
                        <span
                          className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary"
                          aria-hidden="true"
                        />
                        <div className="min-w-0">
                          <p className="text-sm leading-snug">{activity}</p>
                          <p className="text-xs text-muted-foreground">{index + 1}h ago</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </Grid>

            <section aria-labelledby="orders-heading" className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 id="orders-heading" className="text-lg font-semibold tracking-tight">
                  Recent orders
                </h2>
                <Button variant="link">View all</Button>
              </div>
              <Card>
                <CardContent className="p-0">
                  <Table containerLabel="Recent orders table">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-end">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map(order => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>{order.initials}</AvatarFallback>
                              </Avatar>
                              <span className="whitespace-nowrap">{order.customer}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                order.status === 'Paid'
                                  ? 'success'
                                  : order.status === 'Pending'
                                    ? 'warning'
                                    : 'secondary'
                              }
                            >
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-end font-medium">{order.total}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </section>
          </div>
        </Container>
      </AppShell>
      <MobileNavigation
        open={navOpen}
        onOpenChange={setNavOpen}
        items={allItems}
        title="Workspace navigation"
      />
    </>
  );
}

const meta: Meta<typeof DashboardPage> = {
  title: 'Templates/Dashboard',
  component: DashboardPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'responsive' },
    docs: {
      description: {
        component:
          'Operational dashboard with a fixed app sidebar, mobile drawer navigation, KPI grid, revenue trend, activity feed and a focusable recent-orders table. Below 1024 px the sidebar becomes a modal drawer and the content stacks.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DashboardPage>;

export const Default: Story = {};
