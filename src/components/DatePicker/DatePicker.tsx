import * as React from 'react';
import { endOfDay, format as formatDate, startOfDay } from 'date-fns';
import { CalendarDays, Loader2, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/Button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/Popover';
import { Calendar, type CalendarProps } from '@/components/Calendar';

export interface DatePickerProps {
  id?: string;
  name?: string;
  value?: Date;
  onValueChange?: (date: Date | undefined) => void;
  placeholder?: string;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  error?: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  required?: boolean;
  clearable?: boolean;
  clearLabel?: string;
  dateFormat?: string;
  fromYear?: number;
  toYear?: number;
  minDate?: Date;
  maxDate?: Date;
  captionLayout?: CalendarProps['captionLayout'];
  className?: string;
  contentClassName?: string;
}

const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      id,
      name,
      value,
      onValueChange,
      placeholder = 'Pick a date',
      label,
      helperText,
      error,
      isLoading,
      disabled,
      required,
      clearable = false,
      clearLabel = 'Clear date',
      dateFormat = 'PPP',
      fromYear,
      toYear,
      minDate,
      maxDate,
      captionLayout = 'label',
      className,
      contentClassName,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;
    const hasError = !!error;
    const isDisabled = disabled || isLoading;

    const startMonth = fromYear ? new Date(fromYear, 0, 1) : undefined;
    const endMonth = toYear ? new Date(toYear, 11, 31) : undefined;
    const disabledDays = [
      ...(minDate ? [{ before: startOfDay(minDate) }] : []),
      ...(maxDate ? [{ after: endOfDay(maxDate) }] : []),
    ];

    const clearDate = () => {
      onValueChange?.(undefined);
      setOpen(false);
    };

    return (
      <div className={cn('flex flex-col gap-1.5', className)}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn('text-sm font-medium leading-none', disabled && 'opacity-50')}
          >
            {label}
            {required && (
              <span className="ms-1 text-destructive" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        <Popover open={open} onOpenChange={setOpen}>
          <div className="relative">
            <PopoverTrigger asChild>
              <Button
                ref={ref}
                id={inputId}
                type="button"
                variant="outline"
                disabled={isDisabled}
                className={cn(
                  'h-11 w-full justify-start text-start font-normal',
                  !value && 'text-muted-foreground',
                  clearable && value && 'pe-12',
                  hasError && 'border-destructive'
                )}
                aria-invalid={hasError || undefined}
                aria-required={required || undefined}
                aria-describedby={hasError ? errorId : helperText ? helperId : undefined}
              >
                {isLoading ? (
                  <Loader2 className="me-2 h-4 w-4 animate-spin" aria-hidden="true" />
                ) : (
                  <CalendarDays className="me-2 h-4 w-4" aria-hidden="true" />
                )}
                {value ? formatDate(value, dateFormat) : placeholder}
              </Button>
            </PopoverTrigger>
            {clearable && value && !isDisabled && (
              <button
                type="button"
                onClick={clearDate}
                aria-label={clearLabel}
                className="absolute end-0 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>
          <PopoverContent
            className={cn('w-auto max-w-[calc(100vw-2rem)] p-0', contentClassName)}
            align="start"
            sideOffset={6}
            aria-label="Choose date"
          >
            <Calendar
              mode="single"
              selected={value}
              defaultMonth={value}
              onSelect={date => {
                onValueChange?.(date);
                setOpen(false);
              }}
              startMonth={startMonth}
              endMonth={endMonth}
              disabled={disabledDays.length > 0 ? disabledDays : undefined}
              captionLayout={captionLayout}
              autoFocus
            />
          </PopoverContent>
        </Popover>
        {name && (
          <input type="hidden" name={name} value={value ? formatDate(value, 'yyyy-MM-dd') : ''} />
        )}
        {hasError && (
          <p id={errorId} className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
        {!hasError && helperText && (
          <p id={helperId} className="text-sm text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
DatePicker.displayName = 'DatePicker';

export { DatePicker };
