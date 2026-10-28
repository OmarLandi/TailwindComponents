import * as React from 'react';

import { cn } from '@/lib/utils';

export interface TimelineItem {
  id: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  time?: React.ReactNode;
  icon?: React.ReactNode;
}

export interface TimelineProps extends React.HTMLAttributes<HTMLOListElement> {
  items: TimelineItem[];
}

const Timeline = React.forwardRef<HTMLOListElement, TimelineProps>(
  ({ className, items, ...props }, ref) => {
    return (
      <ol ref={ref} className={cn('flex flex-col gap-4', className)} {...props}>
        {items.map((item, index) => (
          <li key={item.id} className="relative flex gap-3 ps-8">
            {index < items.length - 1 && (
              <span className="absolute start-3 top-8 h-full w-px bg-border" aria-hidden="true" />
            )}
            <span
              className="absolute start-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background text-muted-foreground"
              aria-hidden="true"
            >
              {item.icon ?? <span className="h-2 w-2 rounded-full bg-primary" />}
            </span>
            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-medium">{item.title}</span>
                {item.time && <time className="text-xs text-muted-foreground">{item.time}</time>}
              </div>
              {item.description && (
                <p className="text-sm text-muted-foreground">{item.description}</p>
              )}
            </div>
          </li>
        ))}
      </ol>
    );
  }
);
Timeline.displayName = 'Timeline';

export { Timeline };
