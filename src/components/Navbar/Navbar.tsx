import * as React from 'react';
import { Menu, X } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Button } from '@/components/Button';
import { Drawer, DrawerContent, DrawerTitle } from '@/components/Drawer';

const navbarVariants = cva(
  'sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
  {
    variants: {
      variant: {
        default: '',
        floating: 'border-0 shadow-xs mt-4 mx-4 rounded-lg',
        transparent: 'bg-transparent border-transparent backdrop-blur-none',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface NavbarProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof navbarVariants> {
  variant?: 'default' | 'floating' | 'transparent';
}

const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ className, variant, children, ...props }, ref) => (
    <header ref={ref} className={cn(navbarVariants({ variant, className }))} {...props}>
      {children}
    </header>
  )
);
Navbar.displayName = 'Navbar';

export interface NavbarContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  fullWidth?: boolean;
}

const NavbarContainer = React.forwardRef<HTMLDivElement, NavbarContainerProps>(
  ({ className, fullWidth, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex h-16 items-center gap-4',
        fullWidth ? 'px-4' : 'mx-auto max-w-7xl px-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
NavbarContainer.displayName = 'NavbarContainer';

export type NavbarBrandProps = React.HTMLAttributes<HTMLDivElement>;

const NavbarBrand = React.forwardRef<HTMLDivElement, NavbarBrandProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center gap-2 font-semibold', className)} {...props}>
      {children}
    </div>
  )
);
NavbarBrand.displayName = 'NavbarBrand';

export interface NavbarNavProps extends React.HTMLAttributes<HTMLUListElement> {
  mobile?: boolean;
}

const NavbarNav = React.forwardRef<HTMLUListElement, NavbarNavProps>(
  ({ className, mobile, children, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn('flex items-center gap-1', mobile && 'flex-col items-stretch gap-2', className)}
      {...props}
    >
      {children}
    </ul>
  )
);
NavbarNav.displayName = 'NavbarNav';

export type NavbarItemProps = React.HTMLAttributes<HTMLLIElement>;

const NavbarItem = React.forwardRef<HTMLLIElement, NavbarItemProps>(
  ({ className, ...props }, ref) => <li ref={ref} className={cn('', className)} {...props} />
);
NavbarItem.displayName = 'NavbarItem';

export interface NavbarLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  isActive?: boolean;
}

const NavbarLink = React.forwardRef<HTMLAnchorElement, NavbarLinkProps>(
  ({ className, isActive, children, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground',
        className
      )}
      aria-current={isActive ? 'page' : undefined}
      {...props}
    >
      {children}
    </a>
  )
);
NavbarLink.displayName = 'NavbarLink';

export type NavbarActionsProps = React.HTMLAttributes<HTMLDivElement>;

const NavbarActions = React.forwardRef<HTMLDivElement, NavbarActionsProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('ml-auto flex items-center gap-2', className)} {...props}>
      {children}
    </div>
  )
);
NavbarActions.displayName = 'NavbarActions';

export interface NavbarToggleProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
  controls?: string;
}

const NavbarToggle = React.forwardRef<HTMLButtonElement, NavbarToggleProps>(
  ({ className, isOpen, onClick, controls }, ref) => (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      className={cn('md:hidden', className)}
      onClick={onClick}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
      aria-controls={controls}
    >
      {isOpen ? (
        <X className="h-5 w-5" aria-hidden="true" />
      ) : (
        <Menu className="h-5 w-5" aria-hidden="true" />
      )}
    </Button>
  )
);
NavbarToggle.displayName = 'NavbarToggle';

export interface NavbarMenuProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClose'> {
  isOpen: boolean;
  onClose?: () => void;
}

const NavbarMenu = React.forwardRef<HTMLDivElement, NavbarMenuProps>(
  ({ className, isOpen, onClose, children, ...props }, ref) => {
    const [open, setOpen] = React.useState(isOpen);

    React.useEffect(() => {
      setOpen(isOpen);
    }, [isOpen]);

    return (
      <Drawer
        open={open}
        onOpenChange={nextOpen => {
          setOpen(nextOpen);
          if (!nextOpen) {
            onClose?.();
          }
        }}
      >
        <DrawerContent
          ref={ref}
          direction="top"
          aria-describedby={undefined}
          className={cn('max-h-[85dvh] rounded-b-lg p-0 md:hidden', className)}
          {...props}
        >
          <DrawerTitle className="sr-only">Navigation menu</DrawerTitle>
          <nav className="border-t border-border px-4 py-4">{children}</nav>
        </DrawerContent>
      </Drawer>
    );
  }
);
NavbarMenu.displayName = 'NavbarMenu';

export {
  Navbar,
  NavbarContainer,
  NavbarBrand,
  NavbarNav,
  NavbarItem,
  NavbarLink,
  NavbarActions,
  NavbarToggle,
  NavbarMenu,
};
