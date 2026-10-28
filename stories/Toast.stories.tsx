import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
} from '../src/components/Toast';
import { Button } from '../src/components/Button';
import { useState } from 'react';

const meta: Meta<typeof Toast> = {
  title: 'Data Display/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `A notification toast component for displaying temporary messages with various severity levels.

## Basic usage

\`\`\`tsx
import { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose, ToastAction } from 'libreriacomponentes';

<ToastProvider>
  <Toast open={open} onOpenChange={setOpen}>
    <div className="grid gap-1">
      <ToastTitle>Scheduled: Catch up</ToastTitle>
      <ToastDescription>Your meeting is scheduled for tomorrow.</ToastDescription>
    </div>
    <ToastAction altText="Undo">Undo</ToastAction>
    <ToastClose />
  </Toast>
  <ToastViewport />
</ToastProvider>
\`\`\`

## Variants

\`\`\`tsx
{/* Destructive / Error */}
<Toast className="border-destructive">
  <ToastTitle>Error</ToastTitle>
  <ToastDescription>Something went wrong.</ToastDescription>
</Toast>

{/* Success */}
<Toast className="border-success">
  <ToastTitle>Success</ToastTitle>
  <ToastDescription>Your changes have been saved.</ToastDescription>
</Toast>

{/* Warning */}
<Toast className="border-warning">
  <ToastTitle>Warning</ToastTitle>
  <ToastDescription>Your session will expire soon.</ToastDescription>
</Toast>

{/* Info */}
<Toast className="border-info">
  <ToastTitle>Information</ToastTitle>
  <ToastDescription>New updates are available.</ToastDescription>
</Toast>
\`\`\``,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Playground: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <ToastProvider>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Show Toast
        </Button>
        <Toast open={open} onOpenChange={setOpen}>
          <div className="grid gap-1">
            <ToastTitle>Scheduled: Catch up</ToastTitle>
            <ToastDescription>Your meeting is scheduled for tomorrow at 10:00 AM.</ToastDescription>
          </div>
          <ToastAction altText="Undo">Undo</ToastAction>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );
  },
};
