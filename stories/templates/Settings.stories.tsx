import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { ArrowLeft } from 'lucide-react';

import { AppShell } from '../../src/components/AppShell';
import { Avatar, AvatarFallback } from '../../src/components/Avatar';
import { Button } from '../../src/components/Button';
import { Checkbox } from '../../src/components/Checkbox';
import { Container } from '../../src/components/Container';
import { PageHeader } from '../../src/components/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../src/components/Tabs';
import { TextField } from '../../src/components/TextField';
import { TemplateBrand } from './shared';

const tabTriggerClass =
  'min-h-11 justify-start rounded-md px-3 text-start data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-none';

function SettingsPage() {
  const [saved, setSaved] = React.useState(false);

  return (
    <AppShell
      header={
        <header className="flex h-16 items-center gap-3 border-b border-border bg-background px-4 sm:px-6 lg:px-8">
          <TemplateBrand />
          <div className="ms-auto flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <a href="#main">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to app
              </a>
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
          title="Settings"
          description="Manage your profile, notifications and billing preferences."
        />

        <Tabs defaultValue="profile" className="mt-8">
          <div className="grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)]">
            <aside aria-label="Settings sections">
              <TabsList className="h-auto w-full flex-wrap justify-start gap-1 overflow-visible rounded-lg bg-muted p-1 lg:flex-col lg:flex-nowrap">
                <TabsTrigger value="profile" className={tabTriggerClass}>
                  Profile
                </TabsTrigger>
                <TabsTrigger value="notifications" className={tabTriggerClass}>
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="billing" className={tabTriggerClass}>
                  Billing
                </TabsTrigger>
              </TabsList>
            </aside>

            <div className="min-w-0">
              <TabsContent value="profile" className="mt-0">
                <section aria-labelledby="profile-heading" className="space-y-6">
                  <div>
                    <h2 id="profile-heading" className="text-lg font-semibold tracking-tight">
                      Profile
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      This information appears on your public account.
                    </p>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <TextField
                      id="settings-first-name"
                      label="First name"
                      defaultValue="Ana"
                      autoComplete="given-name"
                    />
                    <TextField
                      id="settings-last-name"
                      label="Last name"
                      defaultValue="Torres"
                      autoComplete="family-name"
                    />
                    <TextField
                      id="settings-email"
                      label="Email"
                      type="email"
                      defaultValue="ana@northstar.example"
                      autoComplete="email"
                      className="sm:col-span-2"
                      helperText="Used for sign-in and account notifications."
                    />
                    <TextField
                      id="settings-role"
                      label="Role"
                      defaultValue="Product designer"
                      className="sm:col-span-2"
                    />
                  </div>
                </section>
              </TabsContent>

              <TabsContent value="notifications" className="mt-0">
                <section aria-labelledby="notifications-heading" className="space-y-6">
                  <div>
                    <h2 id="notifications-heading" className="text-lg font-semibold tracking-tight">
                      Notifications
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Choose which updates you want to receive by email.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <Checkbox
                      id="settings-product-updates"
                      label="Product updates"
                      helperText="New features, improvements and maintenance notices."
                      defaultChecked
                    />
                    <Checkbox
                      id="settings-weekly-digest"
                      label="Weekly digest"
                      helperText="A Monday summary of account activity."
                      defaultChecked
                    />
                    <Checkbox
                      id="settings-security-alerts"
                      label="Security alerts"
                      helperText="Sign-ins from new devices and suspicious activity."
                      defaultChecked
                      disabled
                    />
                  </div>
                </section>
              </TabsContent>

              <TabsContent value="billing" className="mt-0">
                <section aria-labelledby="billing-heading" className="space-y-6">
                  <div>
                    <h2 id="billing-heading" className="text-lg font-semibold tracking-tight">
                      Billing
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Your plan renews on 1 November 2026.
                    </p>
                  </div>
                  <div className="rounded-lg border border-border bg-card p-4 text-card-foreground sm:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Current plan</p>
                        <p className="text-xl font-semibold">Pro · 25 seats</p>
                      </div>
                      <Button variant="outline">Manage plan</Button>
                    </div>
                    <dl className="mt-6 grid gap-4 border-t border-border pt-4 sm:grid-cols-2">
                      <div>
                        <dt className="text-xs text-muted-foreground">Payment method</dt>
                        <dd className="mt-1 text-sm font-medium">Visa ending in 4242</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-muted-foreground">Next invoice</dt>
                        <dd className="mt-1 text-sm font-medium">$1,240.00</dd>
                      </div>
                    </dl>
                  </div>
                </section>
              </TabsContent>
            </div>
          </div>

          <div className="sticky bottom-0 z-20 -mx-4 mt-8 border-t border-border bg-background/95 px-4 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))] backdrop-blur sm:-mx-6 sm:px-6 lg:static lg:mx-0 lg:mt-6 lg:rounded-lg lg:border lg:px-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground" role="status" aria-live="polite">
                {saved ? 'Your settings were saved.' : 'Changes are saved to this demo only.'}
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button variant="outline" onClick={() => setSaved(false)}>
                  Discard
                </Button>
                <Button onClick={() => setSaved(true)}>Save changes</Button>
              </div>
            </div>
          </div>
        </Tabs>
      </Container>
    </AppShell>
  );
}

const meta: Meta<typeof SettingsPage> = {
  title: 'Templates/Settings',
  component: SettingsPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'responsive' },
    docs: {
      description: {
        component:
          'Settings page with a responsive section switcher, profile/notifications/billing forms and a save bar that is sticky on mobile and inline on desktop. The tab list becomes a vertical sidebar at 1024 px without duplicating focusable links.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SettingsPage>;

export const Default: Story = {};
