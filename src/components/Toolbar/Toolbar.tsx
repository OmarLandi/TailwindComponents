import * as React from 'react';

import { cn } from '@/lib/utils';

export interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
}

const Toolbar = React.forwardRef<HTMLDivElement, ToolbarProps>(
  ({ className, label = 'Toolbar', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="toolbar"
        aria-label={label}
        className={cn(
          'flex flex-wrap items-center gap-2 rounded-lg border border-border bg-card p-2 text-card-foreground',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Toolbar.displayName = 'Toolbar';

export { Toolbar };
