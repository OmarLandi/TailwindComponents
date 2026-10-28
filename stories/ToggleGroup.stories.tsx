import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from '../src/components/ToggleGroup';
import { Bold, Italic, Underline } from 'lucide-react';

const meta: Meta<typeof ToggleGroup> = {
  title: 'Forms/ToggleGroup',
  component: ToggleGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `A group of toggleable buttons for single or multiple selection.

## Basic usage

\`\`\`tsx
import { ToggleGroup, ToggleGroupItem } from 'libreriacomponentes';

<ToggleGroup type="multiple" variant="default" size="default" value={value} onValueChange={setValue}>
  <ToggleGroupItem value="bold" aria-label="Toggle bold"><Bold className="h-4 w-4" /></ToggleGroupItem>
  <ToggleGroupItem value="italic" aria-label="Toggle italic"><Italic className="h-4 w-4" /></ToggleGroupItem>
</ToggleGroup>
\`\`\`

## Variants

\`\`\`tsx
{/* Single selection */}
<ToggleGroup type="single" value={value} onValueChange={setValue}>
  <ToggleGroupItem value="sm">Small</ToggleGroupItem>
  <ToggleGroupItem value="md">Medium</ToggleGroupItem>
  <ToggleGroupItem value="lg">Large</ToggleGroupItem>
</ToggleGroup>

{/* Multiple selection (default) */}
<ToggleGroup type="multiple" value={value} onValueChange={setValue}>
  <ToggleGroupItem value="bold" aria-label="Bold"><Bold className="h-4 w-4" /></ToggleGroupItem>
  <ToggleGroupItem value="italic" aria-label="Italic"><Italic className="h-4 w-4" /></ToggleGroupItem>
</ToggleGroup>

{/* Outline variant */}
<ToggleGroup type="multiple" variant="outline">
  <ToggleGroupItem value="bold" aria-label="Bold"><Bold className="h-4 w-4" /></ToggleGroupItem>
</ToggleGroup>

{/* With disabled item */}
<ToggleGroup type="single" value={value} onValueChange={setValue}>
  <ToggleGroupItem value="sm">Small</ToggleGroupItem>
  <ToggleGroupItem value="lg" disabled>Large</ToggleGroupItem>
</ToggleGroup>
\`\`\``,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

export const Playground: Story = {
  render: function Render() {
    const [value, setValue] = useState<string[]>(['bold']);
    return (
      <ToggleGroup
        type="multiple"
        variant="default"
        size="default"
        value={value}
        onValueChange={setValue}
      >
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <Underline className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    );
  },
};
