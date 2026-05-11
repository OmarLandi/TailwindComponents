import type { Meta, StoryObj } from '@storybook/react';
import { ErrorBoundary } from '../src/components/ErrorBoundary';

const meta: Meta<typeof ErrorBoundary> = {
  title: 'Components/ErrorBoundary',
  component: ErrorBoundary,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `A component that catches JavaScript errors anywhere in the child component tree and displays a fallback UI.

## Basic usage

\`\`\`tsx
import { ErrorBoundary } from 'libreriacomponentes';

<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
\`\`\`

## With custom fallback

\`\`\`tsx
<ErrorBoundary fallback={<div>Something went wrong</div>}>
  <YourComponent />
</ErrorBoundary>
\`\`\`

## With error details

\`\`\`tsx
<ErrorBoundary
  fallback={(error) => (
    <div className="p-4 bg-destructive/10 text-destructive">
      <p className="font-semibold">Error: {error.message}</p>
    </div>
  )}
>
  <YourComponent />
</ErrorBoundary>
\`\`\`

> **Note**: In development, React error overlay will also appear. In production, only the fallback UI is shown.`,
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

const FallbackComponent = ({ error }: { error: Error }) => (
  <div className="p-4 rounded-md bg-destructive/10 text-destructive border border-destructive/20">
    <p className="font-semibold">Custom Error Message</p>
    <p className="text-sm mt-1">{error.message}</p>
  </div>
);

export const Playground: Story = {
  render: () => (
    <ErrorBoundary fallback={<FallbackComponent error={new Error('Custom error message')} />}>
      <ErrorThrowingComponent shouldError={true} />
    </ErrorBoundary>
  ),
};
