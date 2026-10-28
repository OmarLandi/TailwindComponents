import * as React from 'react';
import { Star } from 'lucide-react';

import { cn } from '@/lib/utils';

export interface RatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  max?: number;
  size?: 'sm' | 'default' | 'lg';
  readOnly?: boolean;
}

const sizeClasses: Record<NonNullable<RatingProps['size']>, string> = {
  sm: 'h-4 w-4',
  default: 'h-5 w-5',
  lg: 'h-6 w-6',
};

const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      className,
      value,
      defaultValue = 0,
      onChange,
      max = 5,
      size = 'default',
      readOnly = false,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const currentValue = value ?? internalValue;

    const setValue = (next: number) => {
      if (readOnly) return;
      if (value === undefined) setInternalValue(next);
      onChange?.(next);
    };

    return (
      <div
        ref={ref}
        role="radiogroup"
        aria-label="Rating"
        className={cn('inline-flex items-center gap-1', className)}
        {...props}
      >
        {Array.from({ length: max }, (_, index) => {
          const starValue = index + 1;
          const filled = starValue <= currentValue;
          return (
            <button
              key={starValue}
              type="button"
              role="radio"
              aria-checked={starValue === currentValue}
              aria-label={`${starValue} star${starValue === 1 ? '' : 's'}`}
              disabled={readOnly}
              onClick={() => setValue(starValue)}
              className={cn(
                'inline-flex items-center justify-center rounded-sm text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-default',
                filled && 'text-warning'
              )}
            >
              <Star
                className={cn(sizeClasses[size], filled && 'fill-current')}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>
    );
  }
);
Rating.displayName = 'Rating';

export { Rating };
