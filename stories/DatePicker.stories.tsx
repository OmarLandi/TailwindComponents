import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { DatePicker } from '../src/components/DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Forms/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Date picker composed with \`Popover\` and \`Calendar\` (react-day-picker).

## Basic usage

\`\`\`tsx
import { DatePicker } from 'libreriacomponentes';
import { useState } from 'react';

function App() {
  const [date, setDate] = useState<Date>();
  return <DatePicker label="Date" value={date} onValueChange={setDate} />;
}
\`\`\`

## Common variants

- Use \`captionLayout="dropdown"\` with \`fromYear\`/\`toYear\` for birth dates.
- Use \`clearable\` when the field is optional.
- Use \`minDate\`/\`maxDate\` for booking windows and deadlines.
- Pass \`name\` to submit an ISO \`yyyy-MM-dd\` value with a native form.`,
      },
    },
  },
  argTypes: {
    disabled: { control: 'boolean' },
    isLoading: { control: 'boolean' },
    required: { control: 'boolean' },
    clearable: { control: 'boolean' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    error: { control: 'text' },
    dateFormat: { control: 'text' },
    captionLayout: {
      control: 'radio',
      options: ['label', 'dropdown', 'dropdown-months', 'dropdown-years'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Playground: Story = {
  render: function Render(args) {
    const [date, setDate] = useState<Date>();
    return (
      <div className="w-full max-w-sm">
        <DatePicker {...args} value={date} onValueChange={setDate} />
      </div>
    );
  },
  args: {
    label: 'Date',
    helperText: 'Select a date from the calendar.',
  },
};

export const DateOfBirth: Story = {
  render: function Render(args) {
    const [date, setDate] = useState<Date>();
    return (
      <div className="w-full max-w-sm">
        <DatePicker {...args} value={date} onValueChange={setDate} />
      </div>
    );
  },
  args: {
    label: 'Date of birth',
    helperText: 'Use the month and year dropdowns to navigate quickly.',
    captionLayout: 'dropdown',
    fromYear: 1920,
    toYear: 2026,
  },
};

export const Clearable: Story = {
  render: function Render(args) {
    const [date, setDate] = useState<Date | undefined>(new Date(2026, 9, 21));
    return (
      <div className="w-full max-w-sm">
        <DatePicker {...args} value={date} onValueChange={setDate} />
      </div>
    );
  },
  args: {
    label: 'Reporting date',
    clearable: true,
    helperText: 'Clear the value without opening the calendar.',
  },
};

export const MinAndMax: Story = {
  render: function Render(args) {
    const [date, setDate] = useState<Date>();
    return (
      <div className="w-full max-w-sm">
        <DatePicker {...args} value={date} onValueChange={setDate} />
      </div>
    );
  },
  args: {
    label: 'Booking window',
    helperText: 'Available from October 10 to October 31, 2026.',
    minDate: new Date(2026, 9, 10),
    maxDate: new Date(2026, 9, 31),
    captionLayout: 'dropdown-months',
    fromYear: 2026,
    toYear: 2026,
  },
};

export const WithError: Story = {
  args: {
    label: 'Start date',
    error: 'Select a start date.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Start date',
    value: new Date(2026, 9, 21),
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    label: 'Start date',
    isLoading: true,
  },
};

export const Mobile: Story = {
  render: function Render(args) {
    const [date, setDate] = useState<Date>();
    return (
      <div className="w-full max-w-sm">
        <DatePicker {...args} value={date} onValueChange={setDate} />
      </div>
    );
  },
  args: {
    label: 'Date of birth',
    captionLayout: 'dropdown',
    fromYear: 1920,
    toYear: 2026,
  },
  globals: {
    viewport: {
      value: 'mobile',
      isRotated: false
    }
  },
};
