import * as React from 'react';
import { Menu, Sparkles } from 'lucide-react';

import { Button } from '../../src/components/Button';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '../../src/components/Drawer';
import { cn } from '../../src/lib/utils';

export interface TemplateNavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  active?: boolean;
}

export interface TemplateNavProps extends React.HTMLAttributes<HTMLElement> {
  items: TemplateNavItem[];
  label: string;
  onNavigate?: () => void;
}

export function TemplateBrand({
  name = 'Northstar',
  href = '#main',
}: {
  name?: string;
  href?: string;
}) {
  return (
    <a
      href={href}
      className="inline-flex min-h-11 items-center gap-2 rounded-md font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Sparkles className="h-4 w-4" aria-hidden="true" />
      </span>
      <span>{name}</span>
    </a>
  );
}

export function TemplateNav({ items, label, onNavigate, className, ...props }: TemplateNavProps) {
  return (
    <nav aria-label={label} className={cn('min-w-0', className)} {...props}>
      <ul className="flex flex-col gap-1">
        {items.map(item => (
          <li key={item.label}>
            <a
              href={item.href}
              aria-current={item.active ? 'page' : undefined}
              onClick={onNavigate}
              className={cn(
                'flex min-h-11 items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                item.active
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              {item.icon && (
                <span className="shrink-0 [&_svg]:h-4 [&_svg]:w-4" aria-hidden="true">
                  {item.icon}
                </span>
              )}
              <span className="truncate">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function MobileNavigation({
  open,
  onOpenChange,
  items,
  title = 'Navigation',
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: TemplateNavItem[];
  title?: string;
}) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent
        direction="left"
        aria-describedby={undefined}
        className="max-w-[85vw] p-0 lg:hidden"
      >
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <TemplateNav items={items} label={title} onNavigate={() => onOpenChange(false)} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export function MobileNavButton({
  open,
  onClick,
  label = 'Open navigation',
}: {
  open: boolean;
  onClick: () => void;
  label?: string;
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="lg:hidden"
      aria-label={label}
      aria-expanded={open}
      aria-haspopup="dialog"
      onClick={onClick}
    >
      <Menu className="h-5 w-5" aria-hidden="true" />
    </Button>
  );
}

export function TemplateFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex w-full max-w-[80rem] flex-col gap-3 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>© 2026 Northstar. All rights reserved.</p>
        <div className="flex flex-wrap gap-4">
          <a href="#" className="min-h-11 underline-offset-4 hover:underline">
            Privacy
          </a>
          <a href="#" className="min-h-11 underline-offset-4 hover:underline">
            Terms
          </a>
          <a href="#" className="min-h-11 underline-offset-4 hover:underline">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
