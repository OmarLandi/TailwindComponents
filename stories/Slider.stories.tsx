import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Slider } from '../src/components/Slider';

const meta: Meta<typeof Slider> = {
  title: 'Forms/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `A range slider component with label and value display.

## Basic usage

\`\`\`tsx
import { Slider } from 'libreriacomponentes';

<Slider label="Volume" showValue />
\`\`\`

## Range slider (two thumbs)

\`\`\`tsx
<Slider
  label="Price Range"
  showValue
  formatValue={v => \`$\${v}\`}
  min={0}
  max={200}
  step={5}
  defaultValue={[25, 75]}
/>
\`\`\`

## Without label

\`\`\`tsx
<Slider defaultValue={[50]} />
\`\`\``,
      },
    },
  },
  argTypes: {
    disabled: { control: 'boolean' },
    showValue: { control: 'boolean' },
    label: { control: 'text' },
    helperText: { control: 'text' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Playground: Story = {
  render: function Render(args) {
    const [value, setValue] = useState([50]);
    return <Slider {...args} value={value} onValueChange={setValue} />;
  },
  args: {
    label: 'Volume',
    showValue: true,
    min: 0,
    max: 100,
    step: 1,
  },
};
