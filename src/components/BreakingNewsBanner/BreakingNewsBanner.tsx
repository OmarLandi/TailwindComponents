import * as React from 'react';
import { X } from 'lucide-react';

import { cn } from '@/lib/utils';

export interface BreakingNewsBannerProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'title'
> {
  label?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  action?: React.ReactNode;
}

const BreakingNewsBanner = React.forwardRef<HTMLDivElement, BreakingNewsBannerProps>(
  (
    {
      className,
      label = 'Breaking news',
      title,
      description,
      dismissible = false,
      onDismiss,
      action,
      ...props
    },
    ref
  ) => {
    const [dismissed, setDismissed] = React.useState(false);

    if (dismissed) return null;

    return (
      <div
        ref={ref}
        role="alert"
        aria-live="assertive"
        className={cn(
          'flex flex-col gap-3 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-foreground sm:flex-row sm:items-center sm:justify-between',
          className
        )}
        {...props}
      >
        <div className="flex min-w-0 flex-col gap-1">
          <span className="text-xs font-bold uppercase tracking-wide text-destructive">
            {label}
          </span>
          <p className="font-semibold leading-tight">{title}</p>
          {description && (
            <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {action}
          {dismissible && (
            <button
              type="button"
              onClick={() => {
                setDismissed(true);
                onDismiss?.();
              }}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label="Dismiss breaking news"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    );
  }
);
BreakingNewsBanner.displayName = 'BreakingNewsBanner';

export { BreakingNewsBanner };
