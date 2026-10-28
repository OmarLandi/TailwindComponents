import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Boxes,
  Code2,
  FileText,
  LifeBuoy,
  Search,
} from 'lucide-react';

import { AppShell } from '../../src/components/AppShell';
import { Badge } from '../../src/components/Badge';
import { Button } from '../../src/components/Button';
import { Container } from '../../src/components/Container';
import { Grid } from '../../src/components/Grid';
import { PageHeader } from '../../src/components/PageHeader';
import { Prose } from '../../src/components/Prose';
import {
  MobileNavButton,
  MobileNavigation,
  TemplateBrand,
  TemplateNav,
  type TemplateNavItem,
} from './shared';

const docsNav: TemplateNavItem[] = [
  { label: 'Getting started', href: '#main', icon: <BookOpen />, active: true },
  { label: 'Components', href: '#components', icon: <Boxes /> },
  { label: 'Patterns', href: '#patterns', icon: <Code2 /> },
  { label: 'API reference', href: '#api', icon: <FileText /> },
  { label: 'Support', href: '#support', icon: <LifeBuoy /> },
];

const toc = [
  { label: 'Installation', href: '#installation' },
  { label: 'Add the styles', href: '#styles' },
  { label: 'Use a component', href: '#usage' },
  { label: 'Theming', href: '#theming' },
  { label: 'Next steps', href: '#next-steps' },
];

function DocsPage() {
  const [navOpen, setNavOpen] = React.useState(false);

  return (
    <>
      <AppShell
        sidebarWidth="default"
        header={
          <header className="flex h-16 items-center gap-3 border-b border-border bg-background px-4 sm:px-6 lg:px-8">
            <MobileNavButton open={navOpen} onClick={() => setNavOpen(true)} />
            <TemplateBrand name="Northstar Docs" />
            <div className="ms-auto flex items-center gap-2">
              <Button variant="outline" size="sm" className="hidden sm:inline-flex">
                <Search className="h-4 w-4" aria-hidden="true" />
                Search docs
              </Button>
              <Badge variant="secondary">v1.0</Badge>
            </div>
          </header>
        }
        sidebar={
          <aside
            aria-label="Documentation sidebar"
            className="flex h-full flex-col gap-6 border-e border-border p-4"
          >
            <TemplateNav items={docsNav} label="Documentation" />
            <div className="mt-auto rounded-lg border border-border bg-muted/40 p-3">
              <p className="text-sm font-medium">Need a hand?</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Ask the team in the community forum.
              </p>
              <Button variant="link" size="sm" className="mt-1 px-0">
                Open forum
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Button>
            </div>
          </aside>
        }
      >
        <Container size="wide" padding="lg" className="py-6 sm:py-8">
          <PageHeader
            title="Getting started"
            description="Install the library, connect the theme tokens and render your first accessible component."
            breadcrumb={
              <span>
                Docs <span aria-hidden="true">/</span> Getting started
              </span>
            }
          />

          <Grid columns={{ base: 1, xl: 12 }} gap="2xl" className="pt-8">
            <div className="min-w-0 xl:col-span-9">
              <Prose>
                <p>
                  Northstar is a React component library built with TypeScript, Tailwind CSS and
                  accessible primitives. It ships with semantic theme tokens and works in light and
                  dark mode across every supported palette.
                </p>

                <h2 id="installation">Installation</h2>
                <p>Install the package and its peer dependencies with your package manager.</p>
                <pre
                  tabIndex={0}
                  aria-label="Installation command"
                  className="overflow-x-auto rounded-lg border border-border bg-muted p-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <code>npm install libreriacomponentes</code>
                </pre>

                <h2 id="styles">Add the styles</h2>
                <p>
                  Import the stylesheet once at your application entry point. Theme variables are
                  applied through the provider or a theme class on a wrapper element.
                </p>
                <pre
                  tabIndex={0}
                  aria-label="Stylesheet import"
                  className="overflow-x-auto rounded-lg border border-border bg-muted p-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <code>{`import 'libreriacomponentes/style.css';
import { ThemeProvider } from 'libreriacomponentes';

<ThemeProvider defaultPalette="violet">
  <App />
</ThemeProvider>`}</code>
                </pre>

                <h2 id="usage">Use a component</h2>
                <p>
                  Components accept <code>className</code>, forward refs and use CSS variables for
                  color, radius, spacing and typography.
                </p>
                <pre
                  tabIndex={0}
                  aria-label="Button usage example"
                  className="overflow-x-auto rounded-lg border border-border bg-muted p-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <code>{`import { Button } from 'libreriacomponentes';

export function SaveButton() {
  return <Button variant="default">Save changes</Button>;
}`}</code>
                </pre>

                <h2 id="theming">Theming</h2>
                <p>
                  Use semantic utilities such as <code>bg-background</code>,{' '}
                  <code>text-foreground</code> and <code>border-border</code>. Avoid literal colors
                  so components keep working when the palette or color mode changes.
                </p>
                <blockquote>
                  <p>
                    Palettes are selected through <code>ThemeProvider</code>; the toggle changes
                    light and dark mode only.
                  </p>
                </blockquote>

                <h2 id="next-steps">Next steps</h2>
                <p>
                  Browse the component catalog or compose a page with the layout primitives and
                  templates.
                </p>
              </Prose>

              <Grid columns={{ base: 1, sm: 2 }} gap="md" className="mt-10">
                <a
                  href="#previous"
                  className="group rounded-lg border border-border p-4 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                    Previous
                  </span>
                  <span className="mt-1 block font-medium">Introduction</span>
                </a>
                <a
                  href="#next"
                  className="rounded-lg border border-border p-4 text-end transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                    Next
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <span className="mt-1 block font-medium">Layout primitives</span>
                </a>
              </Grid>
            </div>

            <aside aria-label="Page outline" className="hidden xl:col-span-3 xl:block">
              <nav aria-label="On this page" className="sticky top-24">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  On this page
                </p>
                <ul className="mt-3 space-y-1 border-s border-border">
                  {toc.map((item, index) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        aria-current={index === 0 ? 'location' : undefined}
                        className="flex min-h-11 items-center border-s-2 border-transparent px-3 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 aria-[current=location]:border-primary aria-[current=location]:font-medium aria-[current=location]:text-foreground"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          </Grid>
        </Container>
      </AppShell>
      <MobileNavigation
        open={navOpen}
        onOpenChange={setNavOpen}
        items={docsNav}
        title="Documentation"
      />
    </>
  );
}

const meta: Meta<typeof DocsPage> = {
  title: 'Templates/Docs',
  component: DocsPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'responsive' },
    docs: {
      description: {
        component:
          'Documentation page with a fixed navigation sidebar from 1024 px, a modal drawer below that, a 65ch prose column and a sticky table of contents from 1280 px. Code blocks scroll horizontally inside a focusable region.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DocsPage>;

export const Default: Story = {};
