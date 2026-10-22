import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const footerVariants = cva('w-full border-t border-border bg-background', {
  variants: {
    variant: {
      default: '',
      muted: 'bg-muted',
      sticky: 'sticky bottom-0',
    },
    size: {
      sm: 'py-4',
      default: 'py-6',
      lg: 'py-10',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface FooterProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof footerVariants> {
  variant?: 'default' | 'muted' | 'sticky';
  size?: 'sm' | 'default' | 'lg';
}

const Footer = React.forwardRef<HTMLElement, FooterProps>(
  ({ className, variant, size, children, ...props }, ref) => (
    <footer ref={ref} className={cn(footerVariants({ variant, size, className }))} {...props}>
      {children}
    </footer>
  )
);
Footer.displayName = 'Footer';

export interface FooterContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  fullWidth?: boolean;
}

const FooterContainer = React.forwardRef<HTMLDivElement, FooterContainerProps>(
  ({ className, fullWidth, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(fullWidth ? 'px-4' : 'mx-auto max-w-7xl px-4', className)}
      {...props}
    >
      {children}
    </div>
  )
);
FooterContainer.displayName = 'FooterContainer';

export type FooterSectionProps = React.HTMLAttributes<HTMLDivElement>;

const FooterSection = React.forwardRef<HTMLDivElement, FooterSectionProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col gap-2', className)} {...props} />
  )
);
FooterSection.displayName = 'FooterSection';

export interface FooterRowProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4;
}

const FooterRow = React.forwardRef<HTMLDivElement, FooterRowProps>(
  ({ className, cols = 4, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'grid gap-8',
        {
          'grid-cols-1 md:grid-cols-2': cols === 2,
          'grid-cols-1 md:grid-cols-3': cols === 3,
          'grid-cols-1 sm:grid-cols-2 md:grid-cols-4': cols === 4,
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
FooterRow.displayName = 'FooterRow';

export type FooterColumnProps = React.HTMLAttributes<HTMLDivElement>;

const FooterColumn = React.forwardRef<HTMLDivElement, FooterColumnProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col gap-3', className)} {...props} />
  )
);
FooterColumn.displayName = 'FooterColumn';

export type FooterTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

const FooterTitle = React.forwardRef<HTMLHeadingElement, FooterTitleProps>(
  ({ className, ...props }, ref) => (
    <h4 ref={ref} className={cn('text-sm font-semibold text-foreground', className)} {...props} />
  )
);
FooterTitle.displayName = 'FooterTitle';

export type FooterLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

const FooterLink = React.forwardRef<HTMLAnchorElement, FooterLinkProps>(
  ({ className, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(
        'text-sm text-muted-foreground transition-colors hover:text-foreground',
        className
      )}
      {...props}
    />
  )
);
FooterLink.displayName = 'FooterLink';

export type FooterBottomProps = React.HTMLAttributes<HTMLDivElement>;

const FooterBottom = React.forwardRef<HTMLDivElement, FooterBottomProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row',
        className
      )}
      {...props}
    />
  )
);
FooterBottom.displayName = 'FooterBottom';

export {
  Footer,
  FooterContainer,
  FooterSection,
  FooterRow,
  FooterColumn,
  FooterTitle,
  FooterLink,
  FooterBottom,
};
