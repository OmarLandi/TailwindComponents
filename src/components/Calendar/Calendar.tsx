import * as React from 'react';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/Button';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  ({ className, classNames, showOutsideDays = true, ...props }, ref) => (
    <div ref={ref} className="inline-block w-fit max-w-full overflow-x-auto">
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={cn('p-3', className)}
        classNames={{
          root: 'relative p-3',
          months: 'relative flex flex-col gap-4 sm:flex-row',
          month: 'w-full space-y-4',
          month_caption: 'flex h-11 items-center justify-center px-12',
          caption_label: 'text-sm font-medium',
          dropdowns: 'flex items-center gap-1',
          dropdown_root:
            'relative inline-flex items-center rounded-md has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-background',
          dropdown:
            'h-11 rounded-md border border-input bg-background px-2 text-sm font-medium text-foreground shadow-xs focus-visible:outline-none disabled:opacity-50',
          months_dropdown: 'ps-2 pe-6',
          years_dropdown: 'ps-2 pe-6',
          nav: 'absolute inset-x-0 top-0 flex items-center justify-between px-1',
          button_previous: cn(
            buttonVariants({ variant: 'ghost', size: 'icon' }),
            'h-11 w-11 p-0 opacity-60 hover:opacity-100'
          ),
          button_next: cn(
            buttonVariants({ variant: 'ghost', size: 'icon' }),
            'h-11 w-11 p-0 opacity-60 hover:opacity-100'
          ),
          month_grid: 'w-full border-collapse',
          weekdays: 'flex',
          weekday: 'w-11 rounded-md text-[0.8rem] font-normal text-muted-foreground',
          weeks: 'mt-1 flex w-full flex-col',
          week: 'mt-0 flex w-full',
          day: 'relative h-11 w-11 p-0 text-center text-sm',
          day_button: cn(
            buttonVariants({ variant: 'ghost', size: 'icon' }),
            'h-11 w-11 rounded-md p-0 font-normal aria-selected:opacity-100'
          ),
          range_start: 'rounded-e-none',
          range_end: 'rounded-s-none',
          selected:
            'rounded-md bg-primary text-primary-foreground [&>button:focus-visible]:bg-primary [&>button:focus-visible]:text-primary-foreground [&>button:hover]:bg-primary [&>button:hover]:text-primary-foreground',
          today:
            '[&:not([aria-selected=true])>button]:bg-accent [&:not([aria-selected=true])>button]:font-semibold [&:not([aria-selected=true])>button]:text-accent-foreground',
          outside: 'text-muted-foreground opacity-50',
          disabled: 'text-muted-foreground opacity-50',
          range_middle:
            'bg-accent text-accent-foreground [&>button:hover]:bg-accent [&>button:hover]:text-accent-foreground',
          hidden: 'invisible',
          footer: 'border-t pt-3',
          week_number: 'w-11 text-xs text-muted-foreground',
          week_number_header: 'w-11',
          ...classNames,
        }}
        {...props}
      />
    </div>
  )
);
Calendar.displayName = 'Calendar';

export { Calendar };
