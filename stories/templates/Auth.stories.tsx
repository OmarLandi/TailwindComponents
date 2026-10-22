import type { Meta, StoryObj } from '@storybook/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

import { Button } from '../../src/components/Button';
import { Card, CardContent, CardDescription, CardHeader } from '../../src/components/Card';
import { Checkbox } from '../../src/components/Checkbox';
import { SkipLink } from '../../src/components/SkipLink';
import { TextField } from '../../src/components/TextField';
import { TemplateBrand } from './shared';

interface AuthTemplateProps {
  variant?: 'centered' | 'split';
  media?: 'start' | 'end';
}

function AuthForm() {
  return (
    <div className="w-full max-w-[32rem]">
      <div className="mb-8">
        <TemplateBrand />
      </div>
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-semibold leading-none tracking-tight sm:text-3xl">
            Welcome back
          </h1>
          <CardDescription>
            Sign in to continue to your workspace. Use your work email address.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-5" onSubmit={event => event.preventDefault()}>
            <TextField
              id="auth-email"
              label="Email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              required
            />
            <TextField
              id="auth-password"
              label="Password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              helperText="At least 8 characters."
              required
            />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Checkbox id="auth-remember" label="Remember me" />
              <a
                href="#reset"
                className="inline-flex min-h-11 items-center text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Forgot password?
              </a>
            </div>
            <Button type="submit" fullWidth size="lg">
              Sign in
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            New to Northstar?{' '}
            <a
              href="#signup"
              className="font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Create an account
            </a>
          </p>
        </CardContent>
      </Card>
      <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
        By continuing you agree to our{' '}
        <a href="#terms" className="underline underline-offset-4">
          Terms
        </a>{' '}
        and{' '}
        <a href="#privacy" className="underline underline-offset-4">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}

function BrandPanel() {
  return (
    <aside
      aria-label="Product highlights"
      className="relative hidden overflow-hidden bg-primary p-10 text-primary-foreground lg:flex lg:flex-col lg:justify-between"
    >
      <div className="relative z-10 max-w-md">
        <p className="text-sm font-medium uppercase tracking-[0.2em] opacity-80">Northstar</p>
        <h2 className="mt-6 text-balance text-4xl font-semibold tracking-tight">
          Turn customer signals into confident decisions.
        </h2>
        <p className="mt-4 text-base leading-relaxed opacity-80">
          One workspace for revenue, accounts and the work that moves them forward.
        </p>
      </div>
      <div className="relative z-10 space-y-4">
        {['SOC 2 Type II controls', 'Single sign-on and SCIM', '99.99% uptime target'].map(item => (
          <p key={item} className="flex items-center gap-2 text-sm opacity-90">
            <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
            {item}
          </p>
        ))}
      </div>
      <div
        aria-hidden="true"
        className="absolute -end-24 -top-24 h-72 w-72 rounded-full border border-primary-foreground/20"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -start-20 h-80 w-80 rounded-full border border-primary-foreground/15"
      />
    </aside>
  );
}

function AuthTemplate({ variant = 'centered', media = 'end' }: AuthTemplateProps) {
  if (variant === 'split') {
    return (
      <div className="min-h-dvh bg-muted/30">
        <SkipLink />
        <div className="grid min-h-dvh lg:grid-cols-2">
          {media === 'start' && <BrandPanel />}
          <main id="main" className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
            <AuthForm />
          </main>
          {media === 'end' && <BrandPanel />}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col bg-muted/30">
      <SkipLink />
      <main id="main" className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6">
        <AuthForm />
      </main>
      <footer className="px-4 py-6 text-center text-xs text-muted-foreground">
        Need help?{' '}
        <a href="#support" className="underline underline-offset-4">
          Contact support
        </a>
      </footer>
    </div>
  );
}

const meta: Meta<typeof AuthTemplate> = {
  title: 'Templates/Auth',
  component: AuthTemplate,
  tags: ['autodocs'],
  args: {
    variant: 'centered',
    media: 'end',
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['centered', 'split'],
    },
    media: {
      control: 'inline-radio',
      options: ['start', 'end'],
    },
  },
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'responsive' },
    docs: {
      description: {
        component:
          'Authentication page with a centered form and an optional split brand panel. The layout is one column below 1024 px, keeps a 32rem form measure and uses `min-h-dvh` instead of a fixed viewport height.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AuthTemplate>;

export const Centered: Story = {
  args: { variant: 'centered' },
};

export const Split: Story = {
  args: { variant: 'split', media: 'end' },
};

export const SplitMediaStart: Story = {
  args: { variant: 'split', media: 'start' },
};
