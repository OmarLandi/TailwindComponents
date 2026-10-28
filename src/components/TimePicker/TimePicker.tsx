import * as React from 'react';

import { cn } from '@/lib/utils';

export interface TimePickerProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'value' | 'onChange'
> {
  value?: string;
  onChange?: (value: string) => void;
  label?: React.ReactNode;
}

const TimePicker = React.forwardRef<HTMLInputElement, TimePickerProps>(
  ({ className, value, onChange, label = 'Time', id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    return (
      <div className={cn('flex flex-col gap-1.5', className)}>
        <label className="text-sm font-medium text-foreground" htmlFor={inputId}>
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          type="time"
          value={value}
          onChange={event => onChange?.(event.target.value)}
          className="min-h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50"
          {...props}
        />
      </div>
    );
  }
);
TimePicker.displayName = 'TimePicker';

export { TimePicker };
