import type { Meta, StoryObj } from '@storybook/react-vite';
import { Popover, PopoverTrigger, PopoverContent } from '../src/components/Popover';
import { Button } from '../src/components/Button';

const meta: Meta<typeof Popover> = {
  title: 'Data Display/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `## Basic usage

\`\`\`tsx
import { Popover, PopoverTrigger, PopoverContent } from 'libreriacomponentes';
import { Button } from 'libreriacomponentes';

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open Popover</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="font-medium leading-none">Dimensions</h4>
        <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
      </div>
    </div>
  </PopoverContent>
</Popover>
\`\`\`

## Variants

\`\`\`tsx
// With form fields
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Edit Profile</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="font-medium leading-none">Name</h4>
        <input placeholder="Your name" />
      </div>
      <div className="space-y-2">
        <h4 className="font-medium leading-none">Email</h4>
        <input placeholder="your@email.com" />
      </div>
    </div>
  </PopoverContent>
</Popover>

// Custom alignment
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Aligned Popover</Button>
  </PopoverTrigger>
  <PopoverContent className="w-64" align="start">
    <p>This popover is aligned to the start edge.</p>
  </PopoverContent>
</Popover>
\`\`\`
`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Playground: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
