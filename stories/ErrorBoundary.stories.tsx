import type { Meta, StoryObj } from '@storybook/react';
import { ErrorBoundary } from '../src/components/ErrorBoundary';

const meta: Meta<typeof ErrorBoundary> = {
  title: 'Data Display/ErrorBoundary',
  component: ErrorBoundary,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `## Basic usage

\`\`\`tsx
import { ErrorBoundary } from 'libreriacomponentes';

<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
\`\`\`

## Variants

\`\`\`tsx
// With custom fallback UI
<ErrorBoundary
  fallback={
    <div className="p-6 rounded-lg bg-warning/10 text-warning border border-warning/20">
      <p className="font-semibold">Custom Error UI</p>
      <p className="text-sm mt-1">A custom fallback when things go wrong.</p>
    </div>
  }
>
  <YourComponent />
</ErrorBoundary>

// With reset handler
<ErrorBoundary onReset={() => console.log('Error was reset')}>
  <YourComponent />
</ErrorBoundary>
\`\`\`
`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ErrorBoundary>;

const ErrorThrowingComponent = ({ shouldError }: { shouldError: boolean }) => {
  if (shouldError) {
    throw new Error('This is a test error!');
  }
  return <div className="p-4 bg-muted rounded-md">No error - component is working</div>;
};

export const Playground: Story = {
  render: () => (
    <ErrorBoundary>
      <ErrorThrowingComponent shouldError={true} />
    </ErrorBoundary>
  ),
};
