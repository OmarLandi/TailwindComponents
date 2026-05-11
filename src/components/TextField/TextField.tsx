import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const textFieldVariants = cva(
  'flex w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: '',
        filled: 'bg-muted border-transparent',
        ghost: 'border-transparent bg-transparent',
        underlined:
          'border-x-0 border-t-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:ring-offset-0',
      },
      size: {
        sm: 'h-8 text-xs',
        default: 'h-10',
        lg: 'h-12 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface TextFieldProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof textFieldVariants> {
  variant?: 'default' | 'filled' | 'ghost' | 'underlined';
  size?: 'sm' | 'default' | 'lg';
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  errorMessage?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      variant,
      size,
      label,
      helperText,
      errorMessage,
      leftIcon,
      rightIcon,
      disabled,
      required,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;
    const hasError = !!errorMessage;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
              disabled && 'opacity-50'
            )}
          >
            {label}
            {required && (
              <span className="text-destructive ml-1" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
              {leftIcon}
            </span>
          )}
          <input
            id={inputId}
            className={cn(
              textFieldVariants({ variant, size, className }),
              hasError && 'border-destructive focus-visible:ring-destructive',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10'
            )}
            ref={ref}
            disabled={disabled}
            required={required}
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : helperText ? helperId : undefined}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
              {rightIcon}
            </span>
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
TextField.displayName = 'TextField';

export { TextField, textFieldVariants };
