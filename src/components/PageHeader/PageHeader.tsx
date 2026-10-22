import * as React from 'react';

import { cn } from '@/lib/utils';

export interface PageHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  title: React.ReactNode;
  description?: React.ReactNode;
  breadcrumb?: React.ReactNode;
  actions?: React.ReactNode;
  tabs?: React.ReactNode;
  titleAs?: 'h1' | 'h2' | 'h3';
  sticky?: boolean;
  bordered?: boolean;
}

const PageHeader = React.forwardRef<HTMLElement, PageHeaderProps>(
  (
    {
      className,
      title,
      description,
      breadcrumb,
      actions,
      tabs,
      titleAs = 'h1',
      sticky = false,
      bordered = true,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const titleId = `${id ?? generatedId}-title`;
    const descriptionId = `${id ?? generatedId}-description`;
    const Heading = titleAs;

    return (
      <header
        ref={ref}
        id={id}
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        className={cn(
          'w-full bg-background text-foreground',
          bordered && 'border-b border-border',
          sticky &&
            'sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80',
          className
        )}
        {...props}
      >
        <div className="flex flex-col gap-4 py-6 sm:py-8">
          {breadcrumb && <div className="text-sm text-muted-foreground">{breadcrumb}</div>}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 space-y-1.5">
              <Heading
                id={titleId}
                className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl"
              >
                {title}
              </Heading>
              {description && (
                <p
                  id={descriptionId}
                  className="max-w-prose text-sm leading-relaxed text-muted-foreground sm:text-base"
                >
                  {description}
                </p>
              )}
            </div>
            {actions && (
              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:justify-end">
                {actions}
              </div>
            )}
          </div>
          {tabs && <div className="min-w-0">{tabs}</div>}
        </div>
      </header>
    );
  }
);
PageHeader.displayName = 'PageHeader';

export { PageHeader };
