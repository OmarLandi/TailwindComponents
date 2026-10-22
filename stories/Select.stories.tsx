import type { Meta, StoryObj } from '@storybook/react';
import { useState, type FC } from 'react';
import { SelectField, type SelectFieldProps } from '../src/components/Select';

const fruits = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'mango', label: 'Mango' },
  { value: 'grape', label: 'Grape' },
  { value: 'strawberry', label: 'Strawberry', disabled: true },
];

const meta: Meta<typeof SelectField> = {
  title: 'Forms/Select',
  component: SelectField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `A select component with support for search, validation, loading states, and clear functionality.

## Basic usage

\`\`\`tsx
import { useState } from 'react';
import { SelectField } from 'libreriacomponentes';

const [value, setValue] = useState('');

<SelectField
  placeholder="Select an option"
  items={[
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
  ]}
  value={value}
  onValueChange={setValue}
/>
\`\`\`

## With label

\`\`\`tsx
<SelectField
  label="Favorite Fruit"
  placeholder="Select..."
  items={fruits}
  value={value}
  onValueChange={setValue}
/>
\`\`\`

## With search

\`\`\`tsx
<SelectField
  label="Country"
  placeholder="Select a country"
  showSearch
  items={countries}
  value={value}
  onValueChange={setValue}
/>
\`\`\`

## With error

\`\`\`tsx
<SelectField
  label="Country"
  placeholder="Select a country"
  error="Please select a valid country"
  items={countries}
  value={value}
  onValueChange={setValue}
/>
\`\`\`

## Loading state

\`\`\`tsx
<SelectField
  label="Country"
  placeholder="Loading..."
  isLoading
  items={[]}
/>
\`\`\``,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
    showSearch: {
      control: 'boolean',
    },
    isLoading: {
      control: 'boolean',
    },
    value: {
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof SelectField>;

const SelectWrapper: FC<SelectFieldProps> = args => {
  const [value, setValue] = useState('');

  return (
    <div className="w-full max-w-sm">
      <SelectField {...args} value={value} onValueChange={setValue} />
    </div>
  );
};

export const Playground: Story = {
  args: {
    label: 'Select Option',
    placeholder: 'Select an option',
    helperText: 'Helper text goes here',
    size: 'default',
    disabled: false,
    showSearch: false,
    isLoading: false,
    items: fruits,
  },
  render: (args: SelectFieldProps) => <SelectWrapper {...args} />,
};
