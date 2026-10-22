import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { RadioGroup, RadioGroupItem, RadioGroupField } from '../src/components/RadioGroup';

const meta: Meta<typeof RadioGroup> = {
  title: 'Forms/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] },
  },
  parameters: {
    docs: {
      description: {
        component: `A set of radio buttons for selecting a single option from a list.

## Basic usage

\`\`\`tsx
import { RadioGroup, RadioGroupItem, RadioGroupField } from 'libreriacomponentes';

<RadioGroupField label="Favorite Color" helperText="Choose your favorite color.">
  <RadioGroup value={value} onValueChange={setValue}>
    <RadioGroupItem value="red" label="Red" />
    <RadioGroupItem value="blue" label="Blue" />
  </RadioGroup>
</RadioGroupField>
\`\`\`

## Variants

\`\`\`tsx
{/* Horizontal (default) */}
<RadioGroup orientation="horizontal">
  <RadioGroupItem value="a" label="Option A" />
  <RadioGroupItem value="b" label="Option B" />
</RadioGroup>

{/* Vertical */}
<RadioGroup orientation="vertical">
  <RadioGroupItem value="a" label="Option A" />
  <RadioGroupItem value="b" label="Option B" />
</RadioGroup>

{/* With error */}
<RadioGroupField required errorMessage="Please select an option.">
  <RadioGroup value={value} onValueChange={setValue}>
    <RadioGroupItem value="yes" label="Yes" />
  </RadioGroup>
</RadioGroupField>
\`\`\``,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Playground: Story = {
  render: function Render() {
    const [value, setValue] = useState('option1');
    return (
      <RadioGroupField label="Favorite Color" helperText="Choose your favorite color.">
        <RadioGroup value={value} onValueChange={setValue}>
          <RadioGroupItem value="red" label="Red" />
          <RadioGroupItem value="blue" label="Blue" />
          <RadioGroupItem value="green" label="Green" />
        </RadioGroup>
      </RadioGroupField>
    );
  },
};
