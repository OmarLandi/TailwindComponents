import * as React from 'react';

import { cn } from '@/lib/utils';

export interface NavigationMenuItem {
  label: React.ReactNode;
  href: string;
  active?: boolean;
}

export interface NavigationMenuProps extends React.HTMLAttributes<HTMLElement> {
  items: NavigationMenuItem[];
}

const NavigationMenu = React.forwardRef<HTMLElement, NavigationMenuProps>(
  ({ className, items, ...props }, ref) => {
    return (
      <nav ref={ref} aria-label="Navigation" className={cn(className)} {...props}>
        <ul className="flex flex-wrap items-center gap-2">
          {items.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                aria-current={item.active ? 'page' : undefined}
                className={cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  item.active && 'bg-accent text-accent-foreground'
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
);
NavigationMenu.displayName = 'NavigationMenu';

export { NavigationMenu };
