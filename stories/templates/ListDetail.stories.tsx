import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { ArrowLeft, Paperclip, Search, Send } from 'lucide-react';

import { AppShell } from '../../src/components/AppShell';
import { Avatar, AvatarFallback } from '../../src/components/Avatar';
import { Badge } from '../../src/components/Badge';
import { Button } from '../../src/components/Button';
import { Card, CardContent, CardHeader } from '../../src/components/Card';
import { Container } from '../../src/components/Container';
import { Grid } from '../../src/components/Grid';
import { PageHeader } from '../../src/components/PageHeader';
import { TextField } from '../../src/components/TextField';
import { Textarea } from '../../src/components/Textarea';
import { cn } from '../../src/lib/utils';
import { TemplateBrand } from './shared';

const conversations = [
  {
    id: 'ana',
    name: 'Ana Torres',
    initials: 'AT',
    subject: 'Renewal timeline for the Pro plan',
    preview: 'Could we move the renewal to November?',
    time: '9:42',
    unread: true,
    email: 'ana@lumen.example',
    body: [
      'Hi team, we are reviewing our tools for next quarter and would like to move the renewal to November so it lines up with our planning cycle.',
      'Is that possible on the current plan, or would we need to sign a new term? Happy to jump on a call if that is easier.',
    ],
  },
  {
    id: 'jon',
    name: 'Jon Bell',
    initials: 'JB',
    subject: 'Inviting the finance team',
    preview: 'We need three more seats before Friday.',
    time: '8:15',
    unread: true,
    email: 'jon@vertex.example',
    body: [
      'We are onboarding the finance team this week and need three more seats before Friday.',
      'Can you confirm whether the seats are prorated for the remainder of the month?',
    ],
  },
  {
    id: 'mina',
    name: 'Mina Park',
    initials: 'MP',
    subject: 'Dashboard access for our analyst',
    preview: 'Please add Ravi with view-only access.',
    time: 'Yesterday',
    unread: false,
    email: 'mina@orbit.example',
    body: [
      'Please add Ravi to the workspace with view-only access. He should be able to see the revenue dashboards but not export customer data.',
    ],
  },
  {
    id: 'ravi',
    name: 'Ravi Shah',
    initials: 'RS',
    subject: 'Export failed twice',
    preview: 'The monthly CSV export keeps timing out.',
    time: 'Mon',
    unread: false,
    email: 'ravi@pioneer.example',
    body: [
      'The monthly CSV export keeps timing out for our workspace. I tried twice this morning and both attempts failed after about a minute.',
      'Is there a smaller date range we should use while this is investigated?',
    ],
  },
];

function ListDetailPage() {
  const [selectedId, setSelectedId] = React.useState(conversations[0].id);
  const selected = conversations.find(item => item.id === selectedId) ?? conversations[0];

  return (
    <AppShell
      header={
        <header className="flex h-16 items-center gap-3 border-b border-border bg-background px-4 sm:px-6 lg:px-8">
          <TemplateBrand />
          <div className="ms-auto flex items-center gap-2">
            <Button variant="outline" size="sm">
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
          title="Inbox"
          description="Customer conversations that need a response from the success team."
          actions={<Button>Compose</Button>}
        />

        <Grid columns={{ base: 1, lg: 12 }} gap="lg" className="pt-8">
          <aside aria-labelledby="conversations-heading" className="min-w-0 lg:col-span-4">
            <Card>
              <CardHeader className="gap-3 border-b border-border">
                <div className="flex items-center justify-between gap-2">
                  <h2 id="conversations-heading" className="text-base font-semibold">
                    Conversations
                  </h2>
                  <Badge variant="secondary">{conversations.length}</Badge>
                </div>
                <TextField
                  id="inbox-search"
                  aria-label="Search conversations"
                  placeholder="Search conversations"
                  leftIcon={<Search className="h-4 w-4" aria-hidden="true" />}
                />
              </CardHeader>
              <CardContent className="p-0">
                <ul className="divide-y divide-border">
                  {conversations.map(conversation => (
                    <li key={conversation.id}>
                      <button
                        type="button"
                        aria-pressed={conversation.id === selectedId}
                        onClick={() => setSelectedId(conversation.id)}
                        className={cn(
                          'flex w-full min-h-11 items-start gap-3 px-4 py-3 text-start transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset',
                          conversation.id === selectedId
                            ? 'bg-accent text-accent-foreground'
                            : 'hover:bg-muted/60'
                        )}
                      >
                        <Avatar className="mt-0.5 h-9 w-9 shrink-0">
                          <AvatarFallback>{conversation.initials}</AvatarFallback>
                        </Avatar>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center justify-between gap-2">
                            <span className="truncate text-sm font-medium">
                              {conversation.name}
                            </span>
                            <span className="shrink-0 text-xs text-muted-foreground">
                              {conversation.time}
                            </span>
                          </span>
                          <span className="mt-0.5 block truncate text-sm">
                            {conversation.subject}
                          </span>
                          <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                            {conversation.preview}
                          </span>
                        </span>
                        {conversation.unread && (
                          <>
                            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                            <span className="sr-only">Unread</span>
                          </>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </aside>

          <section aria-labelledby="conversation-heading" className="min-w-0 lg:col-span-8">
            <Card>
              <CardHeader className="gap-4 border-b border-border">
                <Button asChild variant="ghost" size="sm" className="-ms-2 w-fit lg:hidden">
                  <a href="#conversations-heading">
                    <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
                    All conversations
                  </a>
                </Button>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <Avatar className="h-11 w-11">
                      <AvatarFallback>{selected.initials}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <h2 id="conversation-heading" className="truncate text-lg font-semibold">
                        {selected.subject}
                      </h2>
                      <p className="truncate text-sm text-muted-foreground">
                        {selected.name} · {selected.email}
                      </p>
                    </div>
                  </div>
                  <Badge variant="success">Open</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 p-4 sm:p-6">
                <div className="space-y-4">
                  {selected.body.map((paragraph, index) => (
                    <p key={index} className="max-w-prose text-sm leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <form
                  className="space-y-3 border-t border-border pt-6"
                  onSubmit={event => event.preventDefault()}
                >
                  <Textarea
                    id="reply-message"
                    label="Reply"
                    placeholder="Write a reply…"
                    defaultValue=""
                  />
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <Button type="button" variant="ghost" size="sm" className="-ms-2 w-fit">
                      <Paperclip className="h-4 w-4" aria-hidden="true" />
                      Attach file
                    </Button>
                    <Button type="submit">
                      <Send className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
                      Send reply
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </section>
        </Grid>
      </Container>
    </AppShell>
  );
}

const meta: Meta<typeof ListDetailPage> = {
  title: 'Templates/ListDetail',
  component: ListDetailPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'responsive' },
    docs: {
      description: {
        component:
          'Master-detail inbox with a selectable conversation list and a reply panel. The two panes stack below 1024 px, keep a single h1, expose selection with aria-pressed and use logical icons for RTL.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ListDetailPage>;

export const Default: Story = {};
