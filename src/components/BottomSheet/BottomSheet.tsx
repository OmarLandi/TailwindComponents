import * as React from 'react';
import { X } from 'lucide-react';

import { cn } from '@/lib/utils';

export interface BottomSheetProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
}

const BottomSheet = React.forwardRef<HTMLDivElement, BottomSheetProps>(
  ({ className, open = false, onOpenChange, title, description, children, ...props }, ref) => {
    if (!open) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-end justify-center bg-background/80 backdrop-blur-xs">
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-label={typeof title === 'string' ? title : 'Bottom sheet'}
          className={cn(
            'w-full max-w-lg rounded-t-2xl border border-border bg-card p-5 text-card-foreground shadow-lg',
            className
          )}
          {...props}
        >
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              {title && <h3 className="text-lg font-semibold">{title}</h3>}
              {description && <p className="text-sm text-muted-foreground">{description}</p>}
            </div>
            <button
              type="button"
              onClick={() => onOpenChange?.(false)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label="Close bottom sheet"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  }
);
BottomSheet.displayName = 'BottomSheet';

export { BottomSheet };
