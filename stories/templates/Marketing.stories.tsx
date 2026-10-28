import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import {
  ArrowRight,
  BarChart3,
  Check,
  CircleDollarSign,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../src/components/Accordion';
import { Badge } from '../../src/components/Badge';
import { Button } from '../../src/components/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../src/components/Card';
import {
  Footer,
  FooterBottom,
  FooterColumn,
  FooterContainer,
  FooterLink,
  FooterRow,
  FooterSection,
  FooterTitle,
} from '../../src/components/Footer';
import { Grid } from '../../src/components/Grid';
import {
  Navbar,
  NavbarActions,
  NavbarBrand,
  NavbarContainer,
  NavbarItem,
  NavbarLink,
  NavbarMenu,
  NavbarNav,
  NavbarToggle,
} from '../../src/components/Navbar';
import { Section } from '../../src/components/Section';

const navItems = [
  { label: 'Product', href: '#product' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Customers', href: '#customers' },
];

const features = [
  {
    title: 'Revenue intelligence',
    description: 'See expansion, churn risk and pipeline health in one place.',
    icon: <BarChart3 />,
  },
  {
    title: 'Account workspace',
    description: 'Give every team the same context, notes and next action.',
    icon: <Users />,
  },
  {
    title: 'Enterprise controls',
    description: 'SSO, audit logs and granular permissions from day one.',
    icon: <ShieldCheck />,
  },
];

const plans = [
  {
    name: 'Starter',
    price: '$0',
    description: 'For small teams finding their rhythm.',
    features: ['Up to 3 seats', 'Core dashboards', 'Community support'],
    cta: 'Start free',
    featured: false,
  },
  {
    name: 'Pro',
    price: '$49',
    description: 'For growing teams that need deeper insight.',
    features: ['Up to 25 seats', 'Custom reports', 'Priority support', 'SSO'],
    cta: 'Start 14-day trial',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For companies with complex security needs.',
    features: ['Unlimited seats', 'SCIM provisioning', 'Dedicated success', 'Audit logs'],
    cta: 'Talk to sales',
    featured: false,
  },
];

const faqs = [
  {
    question: 'Can I change plans later?',
    answer: 'Yes. Upgrades take effect immediately and downgrades at the next billing period.',
  },
  {
    question: 'Do you offer annual billing?',
    answer: 'Annual billing is available on Pro and Enterprise with two months free.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Northstar uses encryption in transit and at rest, role-based access and audited infrastructure.',
  },
];

function ProductPreview() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto w-full max-w-xl rounded-xl border border-border bg-card p-3 text-card-foreground shadow-lg"
    >
      <div className="rounded-lg border border-border bg-background">
        <div className="flex items-center gap-1.5 border-b border-border px-3 py-2.5">
          <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
          <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
          <span className="h-2 w-2 rounded-full bg-muted-foreground/20" />
          <span className="ms-2 h-4 w-32 rounded-sm bg-muted" />
        </div>
        <div className="grid gap-3 p-3 sm:grid-cols-3">
          {[68, 82, 54].map((value, index) => (
            <div key={value} className="rounded-md border border-border bg-card p-3">
              <span className="block h-2 w-12 rounded-sm bg-muted" />
              <span className="mt-2 block h-4 w-16 rounded-sm bg-foreground/20" />
              <span className="mt-3 block h-1.5 w-full rounded-full bg-muted">
                <span
                  className="block h-full rounded-full bg-primary"
                  style={{ width: `${value}%` }}
                />
              </span>
              <span className="sr-only">Metric {index + 1}</span>
            </div>
          ))}
        </div>
        <div className="grid gap-3 p-3 pt-0 sm:grid-cols-[1.4fr_1fr]">
          <div className="flex h-32 items-end gap-2 rounded-md border border-border bg-card p-3">
            {[42, 58, 48, 74, 66, 90].map((value, index) => (
              <span
                key={index}
                className="flex-1 rounded-sm bg-primary/80"
                style={{ height: `${value}%` }}
              />
            ))}
          </div>
          <div className="space-y-2 rounded-md border border-border bg-card p-3">
            {[72, 54, 86, 40].map(value => (
              <div key={value} className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-muted" />
                <span className="h-2 flex-1 rounded-sm bg-muted">
                  <span
                    className="block h-full rounded-sm bg-foreground/20"
                    style={{ width: `${value}%` }}
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MarketingPage() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <Navbar>
        <NavbarContainer>
          <NavbarBrand>
            <a href="#main" className="inline-flex min-h-11 items-center gap-2 rounded-md">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
              </span>
              Northstar
            </a>
          </NavbarBrand>
          <NavbarNav className="hidden md:flex">
            {navItems.map(item => (
              <NavbarItem key={item.label}>
                <NavbarLink href={item.href}>{item.label}</NavbarLink>
              </NavbarItem>
            ))}
          </NavbarNav>
          <NavbarActions>
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
              <a href="#signin">Sign in</a>
            </Button>
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <a href="#trial">Start free</a>
            </Button>
            <NavbarToggle
              isOpen={mobileOpen}
              onClick={() => setMobileOpen(value => !value)}
              controls="marketing-mobile-nav"
            />
          </NavbarActions>
        </NavbarContainer>
      </Navbar>
      <NavbarMenu
        id="marketing-mobile-nav"
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >
        <NavbarNav mobile>
          {navItems.map(item => (
            <NavbarItem key={item.label}>
              <NavbarLink
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="min-h-11 w-full"
              >
                {item.label}
              </NavbarLink>
            </NavbarItem>
          ))}
          <NavbarItem>
            <Button asChild fullWidth className="mt-2">
              <a href="#trial" onClick={() => setMobileOpen(false)}>
                Start free
              </a>
            </Button>
          </NavbarItem>
        </NavbarNav>
      </NavbarMenu>

      <main id="main">
        <Section spacing="xl" surface="muted" className="border-b border-border">
          <Grid columns={{ base: 1, lg: 2 }} gap="2xl" align="center">
            <div className="max-w-2xl">
              <Badge variant="secondary" className="mb-4">
                New: revenue signals
              </Badge>
              <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Know which accounts need you next.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Northstar brings revenue, account context and team activity together so every
                conversation starts with the full picture.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <a href="#trial">
                    Start free
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="#demo">Book a demo</a>
                </Button>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                No credit card required · 14-day Pro trial
              </p>
            </div>
            <ProductPreview />
          </Grid>
        </Section>

        <Section spacing="md" surface="base">
          <p className="text-center text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Trusted by teams at
          </p>
          <div className="mt-6 grid grid-cols-2 items-center gap-6 text-center text-lg font-semibold tracking-tight text-muted-foreground sm:grid-cols-3 lg:grid-cols-5">
            {['Acme', 'Lumen', 'Vertex', 'Orbit', 'Pioneer'].map(name => (
              <span key={name}>{name}</span>
            ))}
          </div>
        </Section>

        <Section id="features" spacing="xl" surface="muted">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Everything your revenue team needs
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Replace scattered notes and static reports with a shared operating picture.
            </p>
          </div>
          <Grid columns={{ base: 1, sm: 2, lg: 3 }} gap="lg" className="mt-10">
            {features.map(feature => (
              <Card key={feature.title}>
                <CardHeader>
                  <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    <span className="[&_svg]:h-5 [&_svg]:w-5" aria-hidden="true">
                      {feature.icon}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </Grid>
        </Section>

        <Section spacing="xl" surface="base">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Simple pricing that grows with you
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Start free, then choose a plan when your team is ready.
            </p>
          </div>
          <Grid columns={{ base: 1, md: 2, lg: 3 }} gap="lg" className="mt-10">
            {plans.map(plan => (
              <Card
                key={plan.name}
                className={
                  plan.featured
                    ? 'border-primary shadow-md ring-2 ring-primary ring-offset-2 ring-offset-background'
                    : ''
                }
              >
                <CardHeader>
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    {plan.featured && <Badge>Most popular</Badge>}
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                  <p className="pt-2">
                    <span className="text-4xl font-semibold tracking-tight">{plan.price}</span>
                    {plan.price !== 'Custom' && (
                      <span className="text-sm text-muted-foreground"> / month</span>
                    )}
                  </p>
                </CardHeader>
                <CardContent className="space-y-5">
                  <ul className="space-y-3">
                    {plan.features.map(feature => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-success"
                          aria-hidden="true"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button fullWidth variant={plan.featured ? 'default' : 'outline'}>
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Section>

        <Section spacing="lg" surface="muted">
          <Grid columns={{ base: 1, lg: 12 }} gap="lg" align="center">
            <div className="lg:col-span-4">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Customer story
              </p>
              <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight">
                “We finally see the whole account before the call.”
              </h2>
              <p className="mt-4 text-sm text-muted-foreground">Mina Park, VP Revenue at Lumen</p>
              <Button variant="link" className="mt-2 px-0">
                Read the story
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 lg:col-span-8">
              {[
                { value: '32%', label: 'faster handoffs' },
                { value: '18%', label: 'more expansion' },
                { value: '4.8/5', label: 'team satisfaction' },
              ].map(metric => (
                <div key={metric.label} className="rounded-lg border border-border bg-card p-5">
                  <p className="text-3xl font-semibold tracking-tight">{metric.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{metric.label}</p>
                </div>
              ))}
            </div>
          </Grid>
        </Section>

        <Section spacing="xl" surface="base">
          <div className="mx-auto max-w-[65ch]">
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Frequently asked questions
            </h2>
            <Accordion type="single" collapsible className="mt-6">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`faq-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Section>

        <Section spacing="lg" surface="inverse">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Give your team the full picture.
              </h2>
              <p className="mt-2 text-base opacity-80">Start free or talk to us about a rollout.</p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button variant="secondary" size="lg">
                Start free
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-background bg-transparent text-background hover:bg-background hover:text-foreground"
              >
                Talk to sales
              </Button>
            </div>
          </div>
        </Section>
      </main>

      <Footer>
        <FooterContainer>
          <h3 className="sr-only">Site footer</h3>
          <FooterRow cols={4}>
            <FooterSection>
              <FooterTitle>Northstar</FooterTitle>
              <p className="text-sm text-muted-foreground">
                Revenue context for teams that care about the whole account.
              </p>
            </FooterSection>
            <FooterColumn>
              <FooterTitle>Product</FooterTitle>
              <FooterLink className="inline-flex min-h-11 items-center" href="#features">
                Features
              </FooterLink>
              <FooterLink className="inline-flex min-h-11 items-center" href="#pricing">
                Pricing
              </FooterLink>
              <FooterLink className="inline-flex min-h-11 items-center" href="#changelog">
                Changelog
              </FooterLink>
            </FooterColumn>
            <FooterColumn>
              <FooterTitle>Company</FooterTitle>
              <FooterLink className="inline-flex min-h-11 items-center" href="#about">
                About
              </FooterLink>
              <FooterLink className="inline-flex min-h-11 items-center" href="#careers">
                Careers
              </FooterLink>
              <FooterLink className="inline-flex min-h-11 items-center" href="#contact">
                Contact
              </FooterLink>
            </FooterColumn>
            <FooterColumn>
              <FooterTitle>Resources</FooterTitle>
              <FooterLink className="inline-flex min-h-11 items-center" href="#docs">
                Documentation
              </FooterLink>
              <FooterLink className="inline-flex min-h-11 items-center" href="#security">
                Security
              </FooterLink>
              <FooterLink className="inline-flex min-h-11 items-center" href="#status">
                Status
              </FooterLink>
            </FooterColumn>
          </FooterRow>
          <FooterBottom>
            <p>© 2026 Northstar. All rights reserved.</p>
            <p className="flex items-center gap-2">
              <CircleDollarSign className="h-4 w-4" aria-hidden="true" />
              Built for modern revenue teams
            </p>
          </FooterBottom>
        </FooterContainer>
      </Footer>
    </div>
  );
}

const meta: Meta<typeof MarketingPage> = {
  title: 'Templates/Marketing',
  component: MarketingPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'responsive' },
    docs: {
      description: {
        component:
          'Marketing landing page with top navigation, mobile menu drawer, full-bleed hero, feature and pricing grids, testimonial metrics, FAQ accordion, CTA and footer. Cards progress from one to three columns without horizontal page scroll.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MarketingPage>;

export const Default: Story = {};
