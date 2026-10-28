import * as React from 'react';

import { cn } from '@/lib/utils';
import { DatePicker } from '@/components/DatePicker';

export interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  startDate?: Date;
  endDate?: Date;
  onStartDateChange?: (date: Date | undefined) => void;
  onEndDateChange?: (date: Date | undefined) => void;
  startPlaceholder?: string;
  endPlaceholder?: string;
  disabled?: boolean;
}

const DateRangePicker = React.forwardRef<HTMLDivElement, DateRangePickerProps>(
  (
    {
      className,
      startDate,
      endDate,
      onStartDateChange,
      onEndDateChange,
      startPlaceholder = 'Start date',
      endPlaceholder = 'End date',
      disabled = false,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col gap-2 sm:flex-row sm:items-center', className)}
        {...props}
      >
        <DatePicker
          value={startDate}
          onValueChange={onStartDateChange}
          placeholder={startPlaceholder}
          disabled={disabled}
          className="w-full sm:w-auto"
        />
        <span className="hidden text-muted-foreground sm:inline">to</span>
        <DatePicker
          value={endDate}
          onValueChange={onEndDateChange}
          placeholder={endPlaceholder}
          disabled={disabled}
          minDate={startDate}
          className="w-full sm:w-auto"
        />
      </div>
    );
  }
);
DateRangePicker.displayName = 'DateRangePicker';

export { DateRangePicker };
