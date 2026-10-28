import type { Meta, StoryObj } from '@storybook/react-vite';

import { Grid } from '../src/components/Grid';

const meta: Meta<typeof Grid> = {
  title: 'Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Responsive CSS grid with typed columns at each breakpoint.

Columns start at one on mobile and add breakpoints (\`sm\`, \`md\`, \`lg\`, \`xl\`).
Use \`minItemWidth\` for intrinsically responsive card grids; it overrides \`columns\`.`,
      },
    },
  },
  argTypes: {
    columns: { control: 'object' },
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    minItemWidth: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Grid>;

const Card = ({ title, body }: { title: string; body: string }) => (
  <div className="rounded-lg border border-border bg-card p-4 text-card-foreground">
    <h3 className="text-sm font-semibold">{title}</h3>
    <p className="mt-1 text-sm text-muted-foreground">{body}</p>
  </div>
);

export const Playground: Story = {
  args: {
    columns: { base: 1, sm: 2, lg: 3, xl: 4 },
    gap: 'md',
    children: (
      <>
        <Card title="Revenue" body="Monthly recurring revenue" />
        <Card title="Customers" body="Active accounts" />
        <Card title="Churn" body="Cancellations this month" />
        <Card title="NPS" body="Customer satisfaction" />
      </>
    ),
  },
};

export const TwoColumns: Story = {
  args: {
    columns: { base: 1, md: 2 },
    gap: 'lg',
    children: (
      <>
        <Card title="Profile" body="Personal information" />
        <Card title="Billing" body="Payment method and invoices" />
      </>
    ),
  },
};

export const Intrinsic: Story = {
  args: {
    minItemWidth: '16rem',
    gap: 'md',
    children: (
      <>
        <Card title="Design" body="Tokens and components" />
        <Card title="Engineering" body="Implementation details" />
        <Card title="Operations" body="Processes and support" />
      </>
    ),
  },
};

export const Mobile: Story = {
  args: {
    columns: { base: 1 },
    gap: 'sm',
    children: (
      <>
        <Card title="First card" body="Stacks on mobile" />
        <Card title="Second card" body="One column below sm" />
      </>
    ),
  },
  globals: {
    viewport: {
      value: 'mobile1',
      isRotated: false,
    },
  },
};
