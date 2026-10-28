import * as React from 'react';

import { cn } from '@/lib/utils';

export interface CommentThreadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  count?: number;
  children?: React.ReactNode;
}

const CommentThread = React.forwardRef<HTMLDivElement, CommentThreadProps>(
  ({ className, title = 'Comments', count, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn('flex flex-col gap-4', className)}
        aria-label={typeof title === 'string' ? title : undefined}
        {...props}
      >
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          {typeof count === 'number' && (
            <span className="text-sm text-muted-foreground">{count}</span>
          )}
        </div>
        <div className="space-y-4">{children}</div>
      </section>
    );
  }
);
CommentThread.displayName = 'CommentThread';

export { CommentThread };
