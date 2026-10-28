import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Combobox } from '../src/components/Combobox';

const fruits = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'mango', label: 'Mango' },
  { value: 'grape', label: 'Grape' },
  { value: 'strawberry', label: 'Strawberry', disabled: true },
];

const meta: Meta<typeof Combobox> = {
  title: 'Forms/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `A combobox/autocomplete component with search functionality.

## Basic usage

\`\`\`tsx
import { Combobox } from 'libreriacomponentes';

<Combobox
  label="Choose fruit"
  options={[
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
  ]}
/>
\`\`\``,
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'default', 'lg'] },
    disabled: { control: 'boolean' },
    isLoading: { control: 'boolean' },
    searchable: { control: 'boolean' },
    clearable: { control: 'boolean' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    error: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Combobox>;

export const Playground: Story = {
  render: function Render(args) {
    const [value, setValue] = useState('');
    return (
      <div className="w-full max-w-sm">
        <Combobox {...args} value={value} onValueChange={setValue} />
      </div>
    );
  },
  args: {
    label: 'Fruit',
    placeholder: 'Select a fruit...',
    helperText: 'Choose your favorite fruit.',
    options: fruits,
  },
};
