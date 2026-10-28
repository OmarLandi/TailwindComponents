import * as React from 'react';
import { Minus, Plus } from 'lucide-react';

import { cn } from '@/lib/utils';

export interface NumberInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'onChange'
> {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ className, value, defaultValue = 0, onChange, min, max, step = 1, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const currentValue = value ?? internalValue;

    const updateValue = (next: number) => {
      const clamped = Math.min(max ?? next, Math.max(min ?? next, next));
      if (value === undefined) setInternalValue(clamped);
      onChange?.(clamped);
    };

    return (
      <div className={cn('inline-flex items-center gap-1', className)}>
        <button
          type="button"
          onClick={() => updateValue(currentValue - step)}
          disabled={typeof min === 'number' && currentValue <= min}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50"
          aria-label="Decrease value"
        >
          <Minus className="h-4 w-4" aria-hidden="true" />
        </button>
        <input
          ref={ref}
          type="number"
          value={currentValue}
          aria-label="Number"
          min={min}
          max={max}
          step={step}
          onChange={event => updateValue(Number(event.target.value))}
          className="min-h-9 w-20 rounded-md border border-input bg-background px-3 text-center text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50"
          {...props}
        />
        <button
          type="button"
          onClick={() => updateValue(currentValue + step)}
          disabled={typeof max === 'number' && currentValue >= max}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50"
          aria-label="Increase value"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    );
  }
);
NumberInput.displayName = 'NumberInput';

export { NumberInput };
