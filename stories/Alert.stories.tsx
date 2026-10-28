import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert, AlertTitle, AlertDescription } from '../src/components/Alert';
import { Info } from 'lucide-react';

const meta: Meta<typeof Alert> = {
  title: 'Data Display/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `An alert component with multiple variants for displaying messages.

## Basic usage

\`\`\`tsx
import { Alert, AlertTitle, AlertDescription } from 'libreriacomponentes';

<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>This is an alert message.</AlertDescription>
</Alert>
\`\`\``,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'info', 'success', 'warning', 'destructive'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Playground: Story = {
  args: {
    variant: 'default',
    children: (
      <>
        <Info className="h-4 w-4" />
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>This is a default alert with information for the user.</AlertDescription>
      </>
    ),
  },
};
