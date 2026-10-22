import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Filter, Plus, Search, Trash2 } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../src/components/AlertDialog';
import { AppShell } from '../../src/components/AppShell';
import { Avatar, AvatarFallback } from '../../src/components/Avatar';
import { Badge } from '../../src/components/Badge';
import { Button } from '../../src/components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../src/components/Card';
import { Checkbox } from '../../src/components/Checkbox';
import { Container } from '../../src/components/Container';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '../../src/components/Drawer';
import { PageHeader } from '../../src/components/PageHeader';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../src/components/Pagination';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../src/components/Table';
import { TextField } from '../../src/components/TextField';
import { TemplateBrand } from './shared';

const orders = [
  {
    id: '#ORD-1042',
    customer: 'Ana Torres',
    initials: 'AT',
    email: 'ana@lumen.example',
    status: 'Paid',
    total: '$1,240.00',
    date: 'Oct 18, 2026',
  },
  {
    id: '#ORD-1041',
    customer: 'Jon Bell',
    initials: 'JB',
    email: 'jon@vertex.example',
    status: 'Pending',
    total: '$860.00',
    date: 'Oct 18, 2026',
  },
  {
    id: '#ORD-1039',
    customer: 'Mina Park',
    initials: 'MP',
    email: 'mina@orbit.example',
    status: 'Paid',
    total: '$2,120.00',
    date: 'Oct 17, 2026',
  },
  {
    id: '#ORD-1038',
    customer: 'Ravi Shah',
    initials: 'RS',
    email: 'ravi@pioneer.example',
    status: 'Refunded',
    total: '$340.00',
    date: 'Oct 16, 2026',
  },
  {
    id: '#ORD-1036',
    customer: 'Lea Costa',
    initials: 'LC',
    email: 'lea@acme.example',
    status: 'Paid',
    total: '$780.00',
    date: 'Oct 15, 2026',
  },
];

type Order = (typeof orders)[number];

function statusVariant(status: Order['status']) {
  if (status === 'Paid') return 'success' as const;
  if (status === 'Pending') return 'warning' as const;
  return 'secondary' as const;
}

function DeleteOrderButton({ order }: { order: Order }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={`Delete order ${order.id}`}>
          <Trash2 className="h-4 w-4" aria-hidden="true" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete order {order.id}?</AlertDialogTitle>
          <AlertDialogDescription>
            This removes the order for {order.customer} from this view. This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Delete order</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function OrdersToolbar({ onOpenFilters }: { onOpenFilters: () => void }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <TextField
        id="orders-search"
        aria-label="Search orders"
        placeholder="Search by order or customer"
        leftIcon={<Search className="h-4 w-4" aria-hidden="true" />}
        className="sm:max-w-xs"
      />
      <Button variant="outline" onClick={onOpenFilters} className="sm:hidden">
        <Filter className="h-4 w-4" aria-hidden="true" />
        Filters
      </Button>
      <Button variant="outline" className="hidden sm:inline-flex">
        <Filter className="h-4 w-4" aria-hidden="true" />
        Status
      </Button>
    </div>
  );
}

function OrdersPage() {
  const [filtersOpen, setFiltersOpen] = React.useState(false);

  return (
    <AppShell
      header={
        <header className="flex h-16 items-center gap-3 border-b border-border bg-background px-4 sm:px-6 lg:px-8">
          <TemplateBrand name="Northstar Admin" />
          <div className="ms-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              Help
            </Button>
            <Avatar className="h-9 w-9">
              <AvatarFallback>AT</AvatarFallback>
            </Avatar>
          </div>
        </header>
      }
    >
      <Container size="wide" padding="lg" className="py-6 sm:py-8">
        <PageHeader
          title="Orders"
          description="Review, filter and manage orders across every channel."
          actions={
            <Button>
              <Plus className="h-4 w-4" aria-hidden="true" />
              New order
            </Button>
          }
        />

        <section aria-labelledby="orders-heading" className="mt-8 space-y-4">
          <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4 text-card-foreground sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 id="orders-heading" className="text-base font-semibold">
                All orders
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">128 orders this month</p>
            </div>
            <OrdersToolbar onOpenFilters={() => setFiltersOpen(true)} />
          </div>

          <Card className="hidden md:block">
            <CardContent className="p-0">
              <Table containerLabel="Orders">
                <TableCaption className="sr-only">
                  Orders with customer, status and total
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-end">Total</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map(order => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div className="flex min-w-40 items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{order.initials}</AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="truncate font-medium">{order.customer}</p>
                            <p className="truncate text-xs text-muted-foreground">{order.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusVariant(order.status)}>{order.status}</Badge>
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-muted-foreground">
                        {order.date}
                      </TableCell>
                      <TableCell className="text-end font-medium">{order.total}</TableCell>
                      <TableCell>
                        <DeleteOrderButton order={order} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="space-y-3 md:hidden">
            {orders.map(order => (
              <Card key={order.id}>
                <CardHeader className="flex-row items-start justify-between gap-3 p-4">
                  <div className="min-w-0">
                    <CardTitle className="text-base">{order.id}</CardTitle>
                    <p className="mt-1 truncate text-sm text-muted-foreground">{order.customer}</p>
                  </div>
                  <Badge variant={statusVariant(order.status)}>{order.status}</Badge>
                </CardHeader>
                <CardContent className="space-y-2 p-4 pt-0 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-muted-foreground">Date</span>
                    <span>{order.date}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-muted-foreground">Total</span>
                    <span className="font-medium">{order.total}</span>
                  </div>
                  <div className="flex justify-end pt-1">
                    <DeleteOrderButton order={order} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Pagination>
            <PaginationContent className="flex-wrap">
              <PaginationItem>
                <PaginationPrevious href="#previous" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#page-1" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#page-2">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#page-3">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#next" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </section>
      </Container>

      <Drawer open={filtersOpen} onOpenChange={setFiltersOpen}>
        <DrawerContent
          direction="bottom"
          aria-describedby={undefined}
          className="max-h-[85dvh] p-0 sm:hidden"
        >
          <DrawerHeader>
            <DrawerTitle>Filter orders</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <fieldset>
              <legend className="text-sm font-semibold">Status</legend>
              <div className="mt-3 space-y-3">
                <Checkbox id="filter-paid" label="Paid" defaultChecked />
                <Checkbox id="filter-pending" label="Pending" />
                <Checkbox id="filter-refunded" label="Refunded" />
              </div>
            </fieldset>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" onClick={() => setFiltersOpen(false)}>
              Clear
            </Button>
            <Button onClick={() => setFiltersOpen(false)}>Apply filters</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </AppShell>
  );
}

const meta: Meta<typeof OrdersPage> = {
  title: 'Templates/CRUD',
  component: OrdersPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'responsive' },
    docs: {
      description: {
        component:
          'CRUD list page with a toolbar, responsive orders table, stacked cards below 768 px, mobile filter drawer, pagination and destructive actions confirmed through an alert dialog instead of window.confirm.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof OrdersPage>;

export const Default: Story = {};
