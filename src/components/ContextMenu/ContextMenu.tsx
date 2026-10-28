import * as React from 'react';

import { cn } from '@/lib/utils';

export interface ContextMenuItem {
  label: React.ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
}

export interface ContextMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  trigger: React.ReactNode;
  items: ContextMenuItem[];
}

const ContextMenu = React.forwardRef<HTMLDivElement, ContextMenuProps>(
  ({ className, trigger, items, ...props }, ref) => {
    const [open, setOpen] = React.useState(false);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });

    const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      setPosition({ x: event.clientX, y: event.clientY });
      setOpen(true);
    };

    React.useEffect(() => {
      if (!open) return;
      const close = () => setOpen(false);
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') close();
      };
      window.addEventListener('click', close);
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('click', close);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, [open]);

    return (
      <div
        ref={ref}
        className={cn('relative inline-block', className)}
        onContextMenu={handleContextMenu}
        {...props}
      >
        {trigger}
        {open && (
          <div
            role="menu"
            className="fixed z-50 min-w-40 rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md"
            style={{ left: position.x, top: position.y }}
          >
            {items.map((item, index) => (
              <button
                key={index}
                type="button"
                role="menuitem"
                disabled={item.disabled}
                onClick={() => {
                  item.onSelect?.();
                  setOpen(false);
                }}
                className="flex w-full items-center rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);
ContextMenu.displayName = 'ContextMenu';

export { ContextMenu };
