import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';

import { cn } from '@/lib/utils';

export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  errorMessage?: React.ReactNode;
}

const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitives.Root>, SwitchProps>(
  ({ className, label, helperText, errorMessage, disabled, required, id, ...props }, ref) => {
    const generatedId = React.useId();
    const switchId = id || generatedId;
    const errorId = `${switchId}-error`;
    const helperId = `${switchId}-helper`;
    const hasError = !!errorMessage;

    return (
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <SwitchPrimitives.Root
            id={switchId}
            ref={ref}
            disabled={disabled}
            required={required}
            className={cn(
              'peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
              hasError && 'border-destructive',
              className
            )}
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : helperText ? helperId : undefined}
            {...props}
          >
            <SwitchPrimitives.Thumb
              className={cn(
                'pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0'
              )}
            />
          </SwitchPrimitives.Root>
          {label && (
            <label
              htmlFor={switchId}
              className={cn(
                'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                disabled && 'opacity-50'
              )}
            >
              {label}
            </label>
          )}
        </div>
        {hasError && (
          <p id={errorId} className="text-sm text-destructive" role="alert">
            {errorMessage}
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
Switch.displayName = 'Switch';

export { Switch };
