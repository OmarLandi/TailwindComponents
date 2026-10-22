import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import type { DateRange } from 'react-day-picker';

import { Calendar, type CalendarProps } from '../src/components/Calendar';

type SingleArgs = Extract<CalendarProps, { mode?: 'single' }>;
type RangeArgs = Extract<CalendarProps, { mode?: 'range' }>;
type MultipleArgs = Extract<CalendarProps, { mode?: 'multiple' }>;

const meta: Meta<typeof Calendar> = {
  title: 'Data Display/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  argTypes: {
    mode: { control: 'radio', options: ['single', 'range', 'multiple'] },
    captionLayout: {
      control: 'radio',
      options: ['label', 'dropdown', 'dropdown-months', 'dropdown-years'],
    },
    showOutsideDays: { control: 'boolean' },
    showWeekNumber: { control: 'boolean' },
    numberOfMonths: { control: { type: 'number', min: 1, max: 3 } },
  },
  parameters: {
    docs: {
      description: {
        component: `Accessible calendar built on [react-day-picker](https://daypicker.dev/), the same library used by shadcn/ui.

## Basic usage

\`\`\`tsx
import { Calendar } from 'libreriacomponentes';

<Calendar mode="single" className="rounded-md border" />
\`\`\`

## Common variants

- \`mode="single"\` for one date.
- \`mode="range"\` for check-in/check-out or report periods.
- \`mode="multiple"\` for schedules and availability.
- \`captionLayout="dropdown"\` for month/year navigation (recommended for birth dates).
- \`numberOfMonths={2}\` for desktop range selection.
- \`showWeekNumber\` for planning views.`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Playground: Story = {
  args: {
    mode: 'single',
    captionLayout: 'label',
    showOutsideDays: true,
  },
  render: args => <Calendar {...(args as SingleArgs)} className="rounded-md border bg-card" />,
};

export const Single: Story = {
  render: function Render(args) {
    const [date, setDate] = useState<Date | undefined>(new Date(2026, 9, 21));
    return (
      <Calendar
        {...(args as SingleArgs)}
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border bg-card"
      />
    );
  },
  args: { captionLayout: 'label' },
};

export const Range: Story = {
  render: function Render(args) {
    const [range, setRange] = useState<DateRange | undefined>({
      from: new Date(2026, 9, 12),
      to: new Date(2026, 9, 18),
    });
    return (
      <Calendar
        {...(args as RangeArgs)}
        mode="range"
        selected={range}
        onSelect={setRange}
        numberOfMonths={2}
        className="rounded-md border bg-card"
      />
    );
  },
};

export const Multiple: Story = {
  render: function Render(args) {
    const [dates, setDates] = useState<Date[] | undefined>([
      new Date(2026, 9, 8),
      new Date(2026, 9, 15),
      new Date(2026, 9, 22),
    ]);
    return (
      <Calendar
        {...(args as MultipleArgs)}
        mode="multiple"
        selected={dates}
        onSelect={setDates}
        className="rounded-md border bg-card"
      />
    );
  },
};

export const DropdownCaption: Story = {
  render: args => (
    <Calendar
      {...(args as SingleArgs)}
      mode="single"
      captionLayout="dropdown"
      startMonth={new Date(1940, 0)}
      endMonth={new Date(2035, 11)}
      className="rounded-md border bg-card"
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Month and year dropdowns are the usual choice for dates of birth or dates far from today.',
      },
    },
  },
};

export const DisabledDates: Story = {
  render: args => (
    <Calendar
      {...(args as SingleArgs)}
      mode="single"
      disabled={[{ dayOfWeek: [0, 6] }, { before: new Date(2026, 9, 1) }]}
      className="rounded-md border bg-card"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Weekends and dates before October 1, 2026 are disabled.',
      },
    },
  },
};

export const WithWeekNumbers: Story = {
  render: args => (
    <Calendar
      {...(args as SingleArgs)}
      mode="single"
      showWeekNumber
      className="rounded-md border bg-card"
    />
  ),
};

export const Mobile: Story = {
  render: args => (
    <Calendar {...(args as SingleArgs)} mode="single" className="rounded-md border bg-card" />
  ),
  parameters: {
    viewport: { defaultViewport: 'mobile' },
  },
};
