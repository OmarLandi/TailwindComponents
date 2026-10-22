import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '../src/components/Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Data Display/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `A loading placeholder component used to indicate content is being loaded.

## Basic usage

\`\`\`tsx
import { Skeleton } from 'libreriacomponentes';

<Skeleton className="h-4 w-[250px]" />
\`\`\`

## Variants

\`\`\`tsx
{/* Avatar skeleton */}
<div className="flex items-center gap-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[60%]" />
    <Skeleton className="h-4 w-[40%]" />
  </div>
</div>

{/* Text skeleton */}
<div className="space-y-3">
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-[90%]" />
  <Skeleton className="h-4 w-[80%]" />
</div>

{/* Card skeleton */}
<div className="rounded-lg border border-border p-4">
  <Skeleton className="h-48 w-full rounded-md" />
  <div className="space-y-2 mt-4">
    <Skeleton className="h-4 w-[80%]" />
    <Skeleton className="h-4 w-[60%]" />
  </div>
</div>
\`\`\``,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Playground: Story = {
  render: () => (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ),
};
