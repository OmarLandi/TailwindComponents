import * as React from 'react';

import { cn } from '@/lib/utils';

export interface HoverCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  trigger: React.ReactNode;
  content: React.ReactNode;
  openDelay?: number;
  closeDelay?: number;
}

const HoverCard = React.forwardRef<HTMLDivElement, HoverCardProps>(
  ({ className, trigger, content, openDelay = 120, closeDelay = 120, ...props }, ref) => {
    const [open, setOpen] = React.useState(false);
    const timeoutRef = React.useRef<number | null>(null);

    const clearTimer = () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    const scheduleOpen = () => {
      clearTimer();
      timeoutRef.current = window.setTimeout(() => setOpen(true), openDelay);
    };

    const scheduleClose = () => {
      clearTimer();
      timeoutRef.current = window.setTimeout(() => setOpen(false), closeDelay);
    };

    React.useEffect(() => () => clearTimer(), []);

    return (
      <div
        ref={ref}
        className={cn('relative inline-block', className)}
        onMouseEnter={scheduleOpen}
        onMouseLeave={scheduleClose}
        onFocus={scheduleOpen}
        onBlur={scheduleClose}
        {...props}
      >
        <span className="inline-flex">{trigger}</span>
        {open && (
          <div
            role="dialog"
            aria-label="Hover card"
            className="absolute start-0 top-full z-50 mt-2 w-64 rounded-lg border border-border bg-popover p-4 text-sm text-popover-foreground shadow-md"
          >
            {content}
          </div>
        )}
      </div>
    );
  }
);
HoverCard.displayName = 'HoverCard';

export { HoverCard };
