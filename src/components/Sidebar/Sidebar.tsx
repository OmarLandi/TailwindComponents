import * as React from 'react';
import { PanelLeft, X } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Button } from '@/components/Button';
import { Drawer, DrawerContent, DrawerTitle } from '@/components/Drawer';

const sidebarVariants = cva(
  'flex flex-col border-r border-border bg-background transition-all duration-300',
  {
    variants: {
      variant: {
        default: '',
        floating: 'm-2 rounded-lg border shadow-sm',
        inset: 'min-h-screen',
      },
      side: {
        left: '',
        right: 'border-l border-r-0',
      },
      size: {
        sm: 'w-56',
        default: 'w-64',
        lg: 'w-72',
        xl: 'w-80',
      },
    },
    defaultVariants: {
      variant: 'default',
      side: 'left',
      size: 'default',
    },
  }
);

export interface SidebarProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof sidebarVariants> {
  collapsible?: boolean;
  collapsed?: boolean;
  onCollapse?: () => void;
  mobile?: boolean;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      className,
      variant,
      side,
      size,
      collapsible,
      collapsed,
      onCollapse,
      mobile,
      mobileOpen,
      onMobileClose,
      children,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(Boolean(mobileOpen));

    React.useEffect(() => {
      setIsOpen(Boolean(mobileOpen));
    }, [mobileOpen]);

    const closeMobile = () => {
      setIsOpen(false);
      onMobileClose?.();
    };

    const aside = (
      <aside
        ref={ref}
        className={cn(
          sidebarVariants({ variant, side, size, className }),
          collapsible && 'transition-all',
          collapsed && 'w-16',
          mobile && 'h-full w-full border-0',
          collapsible && 'group/sidebar'
        )}
        data-collapsed={collapsed}
        {...props}
      >
        {collapsible && (
          <div className="flex h-14 items-center justify-end px-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onCollapse}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              className="hidden md:inline-flex"
            >
              <PanelLeft className="h-4 w-4" aria-hidden="true" />
            </Button>
            {mobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={closeMobile}
                aria-label="Close sidebar"
                className="md:hidden"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </Button>
            )}
          </div>
        )}
        {children}
      </aside>
    );

    if (mobile) {
      return (
        <Drawer
          open={isOpen}
          onOpenChange={open => {
            setIsOpen(open);
            if (!open) {
              onMobileClose?.();
            }
          }}
        >
          <DrawerContent
            direction={side === 'right' ? 'right' : 'left'}
            showClose={!collapsible}
            aria-describedby={undefined}
            className="max-w-[85vw] p-0 md:hidden"
          >
            <DrawerTitle className="sr-only">Navigation</DrawerTitle>
            {aside}
          </DrawerContent>
        </Drawer>
      );
    }

    return aside;
  }
);
Sidebar.displayName = 'Sidebar';

export type SidebarHeaderProps = React.HTMLAttributes<HTMLDivElement>;

const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex h-14 items-center border-b border-border px-4', className)}
      {...props}
    />
  )
);
SidebarHeader.displayName = 'SidebarHeader';

export type SidebarContentProps = React.HTMLAttributes<HTMLDivElement>;

const SidebarContent = React.forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex-1 overflow-auto py-2', className)} {...props} />
  )
);
SidebarContent.displayName = 'SidebarContent';

export type SidebarFooterProps = React.HTMLAttributes<HTMLDivElement>;

const SidebarFooter = React.forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'border-t border-border p-4',
        'group-data-[collapsed=true]/sidebar:p-2',
        className
      )}
      {...props}
    />
  )
);
SidebarFooter.displayName = 'SidebarFooter';

export interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
}

const SidebarGroup = React.forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ className, label, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('px-3 py-2 group-data-[collapsed=true]/sidebar:px-2', className)}
      {...props}
    >
      {label && (
        <h3 className="mb-1 px-2 text-xs font-medium text-muted-foreground truncate">{label}</h3>
      )}
      <div className="flex flex-col gap-0.5">{children}</div>
    </div>
  )
);
SidebarGroup.displayName = 'SidebarGroup';

export interface SidebarItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  isActive?: boolean;
  icon?: React.ReactNode;
}

const SidebarItem = React.forwardRef<HTMLAnchorElement, SidebarItemProps>(
  ({ className, isActive, icon, children, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(
        'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground',
        'group-data-[collapsed=true]/sidebar:justify-center group-data-[collapsed=true]/sidebar:px-2',
        className
      )}
      aria-current={isActive ? 'page' : undefined}
      {...props}
    >
      {icon && <span className="flex h-4 w-4 shrink-0 items-center justify-center">{icon}</span>}
      <span className="group-data-[collapsed=true]/sidebar:hidden">{children}</span>
    </a>
  )
);
SidebarItem.displayName = 'SidebarItem';

const SidebarSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('mx-3 my-2 h-px bg-border', className)} {...props} />
  )
);
SidebarSeparator.displayName = 'SidebarSeparator';

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarItem,
  SidebarSeparator,
};
