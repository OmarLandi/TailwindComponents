import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const emptyStateVariants = cva(
  'flex w-full flex-col items-center justify-center text-center text-foreground',
  {
    variants: {
      variant: {
        default: '',
        muted: 'rounded-lg border border-dashed border-border bg-muted/30',
        outline: 'rounded-lg border border-dashed border-border bg-background',
      },
      size: {
        sm: 'gap-3 px-4 py-8',
        default: 'gap-4 px-6 py-12',
        lg: 'gap-5 px-6 py-16 sm:py-20',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface EmptyStateProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof emptyStateVariants> {
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  headingLevel?: 2 | 3 | 4 | 5 | 6;
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      className,
      title,
      description,
      icon,
      action,
      secondaryAction,
      headingLevel = 3,
      variant,
      size,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const titleId = `${id ?? generatedId}-title`;
    const Heading = `h${headingLevel}` as 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    const hasActions = Boolean(action || secondaryAction);

    return (
      <div
        ref={ref}
        id={id}
        role="group"
        aria-labelledby={titleId}
        className={cn(emptyStateVariants({ variant, size }), className)}
        {...props}
      >
        {icon && (
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground [&_svg]:h-6 [&_svg]:w-6"
            aria-hidden="true"
          >
            {icon}
          </div>
        )}
        <div className="flex max-w-md flex-col gap-1.5">
          <Heading id={titleId} className="text-lg font-semibold tracking-tight">
            {title}
          </Heading>
          {description && (
            <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
          )}
        </div>
        {hasActions && (
          <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-center">
            {action}
            {secondaryAction}
          </div>
        )}
      </div>
    );
  }
);
EmptyState.displayName = 'EmptyState';

export { EmptyState, emptyStateVariants };
