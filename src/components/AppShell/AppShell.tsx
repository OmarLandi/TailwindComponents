import * as React from 'react';

import { cn } from '@/lib/utils';
import { SkipLink } from '@/components/SkipLink';

const sidebarVisibility = {
  md: 'hidden md:block',
  lg: 'hidden lg:block',
  xl: 'hidden xl:block',
} as const;

const sidebarWidths = {
  auto: '',
  sm: 'w-56',
  default: 'w-64',
  lg: 'w-72',
  xl: 'w-80',
} as const;

export interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: 'default' | 'sidebar' | 'topnav' | 'hybrid';
  sidebarSide?: 'left' | 'right';
  sidebarWidth?: keyof typeof sidebarWidths;
  collapsed?: boolean;
  mobileBreakpoint?: keyof typeof sidebarVisibility;
  headerSticky?: boolean;
  skipLink?: boolean;
  skipLabel?: string;
  mainId?: string;
  headerClassName?: string;
  sidebarClassName?: string;
  mainClassName?: string;
  mainProps?: React.ComponentPropsWithoutRef<'main'>;
}

const AppShell = React.forwardRef<HTMLDivElement, AppShellProps>(
  (
    {
      className,
      header,
      sidebar,
      footer,
      children,
      variant = 'default',
      sidebarSide = 'left',
      sidebarWidth = 'auto',
      collapsed = false,
      mobileBreakpoint = 'lg',
      headerSticky = true,
      skipLink = true,
      skipLabel = 'Skip to content',
      mainId = 'main',
      headerClassName,
      sidebarClassName,
      mainClassName,
      mainProps,
      ...props
    },
    ref
  ) => {
    const { className: mainPropsClassName, ...restMainProps } = mainProps ?? {};
    const hasSidebar = Boolean(sidebar) && variant !== 'topnav';
    const sidebarNode = hasSidebar ? (
      <div
        className={cn(
          'shrink-0 bg-background',
          sidebarVisibility[mobileBreakpoint],
          collapsed ? 'w-16 overflow-hidden' : sidebarWidths[sidebarWidth],
          sidebarClassName
        )}
        data-collapsed={collapsed ? 'true' : undefined}
      >
        {sidebar}
      </div>
    ) : null;

    return (
      <div
        ref={ref}
        className={cn('flex min-h-dvh w-full flex-col bg-background text-foreground', className)}
        {...props}
      >
        {skipLink && <SkipLink href={`#${mainId}`}>{skipLabel}</SkipLink>}
        {header && (
          <div
            className={cn(
              'z-40 bg-background',
              headerSticky && 'sticky top-0',
              headerClassName
            )}
          >
            {header}
          </div>
        )}
        <div className="flex min-h-0 flex-1">
          {sidebarNode && sidebarSide === 'left' && sidebarNode}
          <div className="flex min-w-0 flex-1 flex-col">
            <main
              id={mainId}
              className={cn('min-w-0 flex-1', mainClassName, mainPropsClassName)}
              {...restMainProps}
            >
              {children}
            </main>
            {footer}
          </div>
          {sidebarNode && sidebarSide === 'right' && sidebarNode}
        </div>
      </div>
    );
  }
);
AppShell.displayName = 'AppShell';

export { AppShell };
