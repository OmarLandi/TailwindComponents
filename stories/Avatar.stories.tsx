import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarImage, AvatarFallback } from '../src/components/Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Data Display/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `An image element with a fallback for representing the user.

## Basic usage

\`\`\`tsx
import { Avatar, AvatarImage, AvatarFallback } from 'libreriacomponentes';

<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
\`\`\`

## Fallback only

\`\`\`tsx
<Avatar>
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
\`\`\`

## Sizes

\`\`\`tsx
<Avatar className="h-14 w-14">
  <AvatarFallback className="text-lg">AB</AvatarFallback>
</Avatar>
\`\`\``,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Playground: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar className="h-14 w-14">
        <AvatarFallback className="text-lg">AB</AvatarFallback>
      </Avatar>
    </div>
  ),
};
