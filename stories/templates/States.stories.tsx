import type { Meta, StoryObj } from '@storybook/react-vite';
import { AlertCircle, CheckCircle2, Inbox, RefreshCw } from 'lucide-react';

import { Alert, AlertDescription } from '../../src/components/Alert';
import { AppShell } from '../../src/components/AppShell';
import { Badge } from '../../src/components/Badge';
import { Button } from '../../src/components/Button';
import { Card, CardContent, CardHeader } from '../../src/components/Card';
import { Container } from '../../src/components/Container';
import { EmptyState } from '../../src/components/EmptyState';
import { Grid } from '../../src/components/Grid';
import { PageHeader } from '../../src/components/PageHeader';
import { Skeleton } from '../../src/components/Skeleton';
import { VisuallyHidden } from '../../src/components/VisuallyHidden';
import { TemplateBrand } from './shared';

function ViewStatesPage() {
  return (
    <AppShell
      header={
        <header className="flex h-16 items-center gap-3 border-b border-border bg-background px-4 sm:px-6 lg:px-8">
          <TemplateBrand />
          <Badge variant="secondary" className="ms-auto">
            Preview
          </Badge>
        </header>
      }
    >
      <Container size="wide" padding="lg" className="py-6 sm:py-8">
        <PageHeader
          title="View states"
          description="Loading, empty, error, success and disabled states composed with the library primitives."
        />

        <Grid columns={{ base: 1, lg: 2 }} gap="lg" className="pt-8">
          <Card aria-busy="true" aria-labelledby="loading-heading">
            <CardHeader>
              <h2 id="loading-heading" className="text-lg font-semibold tracking-tight">
                Loading
              </h2>
              <p className="text-sm text-muted-foreground">
                Skeleton placeholders preserve the final content shape.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-2/3" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
              </div>
              <Skeleton className="h-20 w-full" />
              <div className="flex gap-2">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 flex-1" />
              </div>
            </CardContent>
            <VisuallyHidden>
              <p role="status">Loading recent orders</p>
            </VisuallyHidden>
          </Card>

          <Card className="flex items-center justify-center p-4 sm:p-6">
            <EmptyState
              variant="outline"
              icon={<Inbox />}
              title="No orders yet"
              description="When a customer completes a purchase, the order will appear here."
              action={<Button>Create order</Button>}
              secondaryAction={<Button variant="outline">Import CSV</Button>}
            />
          </Card>

          <Card className="p-4 sm:p-6">
            <h2 className="mb-4 text-lg font-semibold tracking-tight">Error</h2>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" aria-hidden="true" />
              <p className="mb-1 font-medium leading-none tracking-tight">
                We could not load orders
              </p>
              <AlertDescription>
                <p>The request timed out. Check your connection and try again.</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  <RefreshCw className="h-4 w-4" aria-hidden="true" />
                  Retry
                </Button>
              </AlertDescription>
            </Alert>
          </Card>

          <Card className="p-4 sm:p-6">
            <h2 className="mb-4 text-lg font-semibold tracking-tight">Success</h2>
            <Alert variant="success" role="status">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              <p className="mb-1 font-medium leading-none tracking-tight">Order saved</p>
              <AlertDescription>
                <p>Order #ORD-1043 is ready to fulfil. A receipt was sent to the customer.</p>
              </AlertDescription>
            </Alert>
          </Card>

          <Card className="p-4 sm:p-6 lg:col-span-2">
            <h2 className="text-lg font-semibold tracking-tight">Disabled</h2>
            <p className="mt-1 max-w-prose text-sm leading-relaxed text-muted-foreground">
              Keep the action visible and explain why it is unavailable instead of relying on
              opacity alone.
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
              <Button disabled>Export report</Button>
              <p className="text-sm text-muted-foreground">
                Exports are unavailable while the monthly report is generating.
              </p>
            </div>
          </Card>
        </Grid>
      </Container>
    </AppShell>
  );
}

const meta: Meta<typeof ViewStatesPage> = {
  title: 'Templates/States',
  component: ViewStatesPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'responsive' },
    docs: {
      description: {
        component:
          'View-state catalog showing loading skeletons with busy status, an empty state with two actions, an error alert with retry, a success status message and a disabled action with an explanation.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ViewStatesPage>;

export const Default: Story = {};
