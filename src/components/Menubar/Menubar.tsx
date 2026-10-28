import * as React from 'react';

import { cn } from '@/lib/utils';

export interface MenubarItem {
  label: React.ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
}

export interface MenubarProps extends React.HTMLAttributes<HTMLDivElement> {
  items: MenubarItem[];
}

const Menubar = React.forwardRef<HTMLDivElement, MenubarProps>(
  ({ className, items, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="menubar"
        className={cn(
          'flex items-center gap-1 rounded-lg border border-border bg-card p-1 text-card-foreground',
          className
        )}
        {...props}
      >
        {items.map((item, index) => (
          <button
            key={index}
            type="button"
            role="menuitem"
            disabled={item.disabled}
            onClick={item.onSelect}
            className="rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          >
            {item.label}
          </button>
        ))}
      </div>
    );
  }
);
Menubar.displayName = 'Menubar';

export { Menubar };
