import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/lib/utils';

export interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  showValue?: boolean;
  formatValue?: (value: number) => string;
}

const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
  (
    {
      className,
      label,
      helperText,
      showValue,
      formatValue,
      disabled,
      value,
      defaultValue,
      onValueChange,
      id,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const sliderId = id || generatedId;
    const labelId = `${sliderId}-label`;
    const helperId = `${sliderId}-helper`;
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = React.useState<number[]>(defaultValue ?? [0]);
    const currentValue = value ?? internalValue;
    const describedBy =
      [helperText ? helperId : undefined, ariaDescribedBy].filter(Boolean).join(' ') || undefined;
    const handleValueChange = (nextValue: number[]) => {
      if (!isControlled) {
        setInternalValue(nextValue);
      }
      onValueChange?.(nextValue);
    };

    return (
      <div className="flex flex-col gap-1.5">
        {(label || showValue) && (
          <div className="flex items-center justify-between">
            {label && (
              <span
                id={labelId}
                className={cn('text-sm font-medium leading-none', disabled && 'opacity-50')}
              >
                {label}
              </span>
            )}
            {showValue && (
              <span className="text-sm text-muted-foreground">
                {formatValue
                  ? currentValue.map(v => formatValue(v)).join(' - ')
                  : currentValue.join(' - ')}
              </span>
            )}
          </div>
        )}
        <SliderPrimitive.Root
          ref={ref}
          id={sliderId}
          disabled={disabled}
          aria-disabled={disabled ? true : undefined}
          value={isControlled ? value : undefined}
          defaultValue={defaultValue}
          onValueChange={handleValueChange}
          className={cn('relative flex w-full touch-none select-none items-center', className)}
          aria-labelledby={label ? labelId : undefined}
          aria-describedby={describedBy}
          {...props}
        >
          <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
            <SliderPrimitive.Range className="absolute h-full bg-primary" />
          </SliderPrimitive.Track>
          {currentValue.map((_, i) => (
            <SliderPrimitive.Thumb
              key={i}
              aria-label={
                typeof label === 'string'
                  ? currentValue.length > 1
                    ? `${label} ${i + 1}`
                    : label
                  : undefined
              }
              aria-disabled={disabled ? true : undefined}
              aria-labelledby={label && currentValue.length === 1 ? labelId : undefined}
              aria-describedby={describedBy}
              className="relative block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors before:absolute before:-inset-3 before:rounded-full before:content-[''] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            />
          ))}
        </SliderPrimitive.Root>
        {helperText && (
          <p id={helperId} className="text-sm text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
Slider.displayName = 'Slider';

export { Slider };
