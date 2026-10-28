import * as React from 'react';
import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';

export interface CheckoutStep {
  id: string;
  label: React.ReactNode;
  description?: React.ReactNode;
}

export interface CheckoutStepperProps extends React.HTMLAttributes<HTMLOListElement> {
  steps: CheckoutStep[];
  currentStep: number;
}

const CheckoutStepper = React.forwardRef<HTMLOListElement, CheckoutStepperProps>(
  ({ className, steps, currentStep, ...props }, ref) => {
    return (
      <ol
        ref={ref}
        className={cn('flex flex-col gap-4 md:flex-row md:gap-2', className)}
        {...props}
      >
        {steps.map((step, index) => {
          const isComplete = index < currentStep;
          const isCurrent = index === currentStep;
          return (
            <li
              key={step.id}
              className="flex flex-1 items-start gap-3"
              aria-current={isCurrent ? 'step' : undefined}
            >
              <span
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-medium',
                  isComplete && 'border-primary bg-primary text-primary-foreground',
                  isCurrent && 'border-primary text-primary',
                  !isComplete && !isCurrent && 'border-border text-muted-foreground'
                )}
              >
                {isComplete ? <Check className="h-4 w-4" aria-hidden="true" /> : index + 1}
              </span>
              <span className="flex flex-col">
                <span className={cn('font-medium', isCurrent && 'text-primary')}>{step.label}</span>
                {step.description && (
                  <span className="text-sm text-muted-foreground">{step.description}</span>
                )}
              </span>
            </li>
          );
        })}
      </ol>
    );
  }
);
CheckoutStepper.displayName = 'CheckoutStepper';

export { CheckoutStepper };
