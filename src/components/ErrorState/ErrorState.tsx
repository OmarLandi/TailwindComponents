import * as React from 'react';
import { AlertCircle } from 'lucide-react';

import { cn } from '@/lib/utils';

export interface ErrorStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  icon?: React.ReactNode;
}

const ErrorState = React.forwardRef<HTMLDivElement, ErrorStateProps>(
  (
    {
      className,
      title = 'Something went wrong',
      description,
      action,
      secondaryAction,
      icon,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          'flex w-full flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-destructive/40 bg-destructive/5 px-6 py-12 text-center',
          className
        )}
        {...props}
      >
        <div
          className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive"
          aria-hidden="true"
        >
          {icon ?? <AlertCircle className="h-6 w-6" aria-hidden="true" />}
        </div>
        <div className="flex max-w-md flex-col gap-1.5">
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && (
            <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
          )}
        </div>
        {(action || secondaryAction) && (
          <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-center">
            {action}
            {secondaryAction}
          </div>
        )}
      </div>
    );
  }
);
ErrorState.displayName = 'ErrorState';

export { ErrorState };
