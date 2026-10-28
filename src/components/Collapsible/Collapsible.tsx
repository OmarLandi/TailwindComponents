import * as React from 'react';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';

export interface CollapsibleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(
  ({ className, title, defaultOpen = false, open, onOpenChange, children, ...props }, ref) => {
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
    const isOpen = open ?? internalOpen;

    const toggle = () => {
      const next = !isOpen;
      if (open === undefined) setInternalOpen(next);
      onOpenChange?.(next);
    };

    return (
      <div
        ref={ref}
        className={cn('rounded-lg border border-border bg-card text-card-foreground', className)}
        {...props}
      >
        <button
          type="button"
          onClick={toggle}
          aria-expanded={isOpen}
          className="flex w-full items-center justify-between gap-3 px-4 py-3 text-start font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span>{title}</span>
          <ChevronDown
            className={cn(
              'h-4 w-4 transition-transform motion-reduce:transform-none',
              isOpen && 'rotate-180'
            )}
            aria-hidden="true"
          />
        </button>
        {isOpen && <div className="border-t border-border px-4 py-3 text-sm">{children}</div>}
      </div>
    );
  }
);
Collapsible.displayName = 'Collapsible';

export { Collapsible };
