import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';

/**
 * A flexible button component with multiple variants, sizes, and states.
 * Built on top of Radix UI Slot for composition support.
 *
 * @example
 * // Basic usage
 * <Button>Click me</Button>
 *
 * @example
 * // With variant and size
 * <Button variant="destructive" size="lg">Delete</Button>
 *
 * @example
 * // Loading state
 * <Button isLoading>Submitting...</Button>
 *
 * @example
 * // As child composition
 * <Button asChild>
 *   <Link to="/dashboard">Go to Dashboard</Link>
 * </Button>
 */

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm',
        warning: 'bg-warning text-warning-foreground hover:bg-warning/90 shadow-sm',
        success: 'bg-success text-success-foreground hover:bg-success/90 shadow-sm',
        info: 'bg-info text-info-foreground hover:bg-info/90 shadow-sm',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm',
        accent: 'bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm',
        neutral: 'bg-neutral text-neutral-foreground hover:bg-neutral/80 shadow-sm',
        outline:
          'border-2 border-primary bg-background hover:bg-primary hover:text-primary-foreground',
        'outline-destructive':
          'border-2 border-destructive bg-background hover:bg-destructive hover:text-destructive-foreground',
        'outline-secondary':
          'border-2 border-secondary bg-background hover:bg-secondary hover:text-secondary-foreground',
        'outline-accent':
          'border-2 border-accent bg-background hover:bg-accent hover:text-accent-foreground',
        'outline-neutral':
          'border-2 border-neutral bg-background hover:bg-neutral hover:text-neutral-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        'ghost-destructive': 'hover:bg-destructive/10 hover:text-destructive',
        'ghost-secondary': 'hover:bg-secondary/50 hover:text-secondary-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        'link-destructive': 'text-destructive underline-offset-4 hover:underline',
        'link-secondary': 'text-secondary-foreground underline-offset-4 hover:underline',
        soft: 'bg-primary/10 text-primary hover:bg-primary/20',
        'soft-destructive': 'bg-destructive/10 text-destructive hover:bg-destructive/20',
        'soft-secondary': 'bg-secondary/10 text-secondary-foreground hover:bg-secondary/20',
        'soft-accent': 'bg-accent/10 text-accent-foreground hover:bg-accent/20',
        'soft-neutral': 'bg-neutral/10 text-neutral-foreground hover:bg-neutral/20',
        'soft-info': 'bg-info/10 text-info-foreground hover:bg-info/20',
        'soft-success': 'bg-success/10 text-success-foreground hover:bg-success/20',
        'soft-warning': 'bg-warning/10 text-warning-foreground hover:bg-warning/20',
        dash: 'border-2 border-dashed border-primary bg-background hover:bg-primary/10',
        'dash-destructive':
          'border-2 border-dashed border-destructive bg-background hover:bg-destructive/10',
        'dash-secondary':
          'border-2 border-dashed border-secondary bg-background hover:bg-secondary/10',
        pill: 'rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm',
        'pill-destructive':
          'rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm',
        'pill-secondary':
          'rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm',
        'pill-outline':
          'rounded-full border-2 border-primary bg-background hover:bg-primary hover:text-primary-foreground',
        'pill-soft': 'rounded-full bg-primary/10 text-primary hover:bg-primary/20',
        glass: 'glass bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20',
        'glass-primary':
          'glass bg-primary/20 backdrop-blur-md hover:bg-primary/30 border border-primary/30',
        '3d': 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_4px_0_rgb(0,0,0)] hover:shadow-[0_2px_0_rgb(0,0,0)] active:shadow-none active:translate-y-1 transition-all',
        '3d-destructive':
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-[0_4px_0_rgb(0,0,0)] hover:shadow-[0_2px_0_rgb(0,0,0)] active:shadow-none active:translate-y-1 transition-all',
        '3d-secondary':
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-[0_4px_0_rgb(0,0,0)] hover:shadow-[0_2px_0_rgb(0,0,0)] active:shadow-none active:translate-y-1 transition-all',
        gradient:
          'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 shadow-sm',
        'gradient-pill':
          'rounded-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 shadow-sm',
        'gradient-outline':
          'rounded-md border-2 border-transparent bg-gradient-to-r from-primary to-primary/80 bg-origin-border text-primary-foreground hover:bg-gradient-to-br',
        'gradient-success':
          'bg-gradient-to-r from-success to-success/80 text-success-foreground hover:from-success/90 hover:to-success/70 shadow-sm',
        'gradient-destructive':
          'bg-gradient-to-r from-destructive to-destructive/80 text-destructive-foreground hover:from-destructive/90 hover:to-destructive/70 shadow-sm',
        square: 'rounded-none bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm',
        'square-outline':
          'rounded-none border-2 border-primary bg-background hover:bg-primary hover:text-primary-foreground',
        'square-soft': 'rounded-none bg-primary/10 text-primary hover:bg-primary/20',
        circle:
          'rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm aspect-square',
        'circle-outline':
          'rounded-full border-2 border-primary bg-background hover:bg-primary hover:text-primary-foreground aspect-square',
        'circle-soft': 'rounded-full bg-primary/10 text-primary hover:bg-primary/20 aspect-square',
      },
      size: {
        xs: 'h-6 px-2 text-xs',
        sm: 'h-8 px-3 text-xs',
        default: 'h-10 px-4 py-2',
        md: 'h-10 px-4 py-2',
        lg: 'h-12 px-8 text-base',
        xl: 'h-14 px-10 text-lg',
        icon: 'h-10 w-10',
        'icon-sm': 'h-8 w-8',
        'icon-lg': 'h-12 w-12',
        'icon-xl': 'h-14 w-14',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    compoundVariants: [
      {
        variant: 'default',
        size: 'icon',
        className: 'rounded-full',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

/**
 * Props for the Button component
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  /**
   * Visual style variant of the button.
   * @default 'default'
   */
  variant?:
    | 'default'
    | 'destructive'
    | 'warning'
    | 'success'
    | 'info'
    | 'secondary'
    | 'accent'
    | 'neutral'
    | 'outline'
    | 'outline-destructive'
    | 'outline-secondary'
    | 'outline-accent'
    | 'outline-neutral'
    | 'ghost'
    | 'ghost-destructive'
    | 'ghost-secondary'
    | 'link'
    | 'link-destructive'
    | 'link-secondary'
    | 'soft'
    | 'soft-destructive'
    | 'soft-secondary'
    | 'soft-accent'
    | 'soft-neutral'
    | 'soft-info'
    | 'soft-success'
    | 'soft-warning'
    | 'dash'
    | 'dash-destructive'
    | 'dash-secondary'
    | 'pill'
    | 'pill-destructive'
    | 'pill-secondary'
    | 'pill-outline'
    | 'pill-soft'
    | 'glass'
    | 'glass-primary'
    | '3d'
    | '3d-destructive'
    | '3d-secondary'
    | 'gradient'
    | 'gradient-pill'
    | 'gradient-outline'
    | 'gradient-success'
    | 'gradient-destructive'
    | 'square'
    | 'square-outline'
    | 'square-soft'
    | 'circle'
    | 'circle-outline'
    | 'circle-soft';
  /**
   * Size of the button.
   * @default 'default'
   */
  size?: 'xs' | 'sm' | 'default' | 'md' | 'lg' | 'xl' | 'icon' | 'icon-sm' | 'icon-lg' | 'icon-xl';
  /**
   * Whether the button takes full width of its container.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Whether to render as a child component using Radix Slot.
   * @default false
   */
  asChild?: boolean;
  /**
   * Shows a loading spinner and disables the button.
   * @default false
   */
  isLoading?: boolean;
  /**
   * Icon to display before the button text.
   */
  leftIcon?: React.ReactNode;
  /**
   * Icon to display after the button text.
   */
  rightIcon?: React.ReactNode;
  /**
   * Accessible label for screen readers (useful when button has only icon).
   */
  ariaLabel?: string;
  /**
   * Responsive size - can specify different sizes for different breakpoints.
   * Example: { base: 'sm', md: 'lg' }
   */
  sizeResponsive?: {
    base?:
      | 'xs'
      | 'sm'
      | 'default'
      | 'md'
      | 'lg'
      | 'xl'
      | 'icon'
      | 'icon-sm'
      | 'icon-lg'
      | 'icon-xl';
    sm?: 'xs' | 'sm' | 'default' | 'md' | 'lg' | 'xl' | 'icon' | 'icon-sm' | 'icon-lg' | 'icon-xl';
    md?: 'xs' | 'sm' | 'default' | 'md' | 'lg' | 'xl' | 'icon' | 'icon-sm' | 'icon-lg' | 'icon-xl';
    lg?: 'xs' | 'sm' | 'default' | 'md' | 'lg' | 'xl' | 'icon' | 'icon-sm' | 'icon-lg' | 'icon-xl';
    xl?: 'xs' | 'sm' | 'default' | 'md' | 'lg' | 'xl' | 'icon' | 'icon-sm' | 'icon-lg' | 'icon-xl';
  };
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      fullWidth = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ariaLabel,
      sizeResponsive,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    const responsiveClasses = React.useMemo(() => {
      if (!sizeResponsive) return '';
      const classes: string[] = [];
      const sizeMap = {
        xs: 'h-6 px-2 text-xs',
        sm: 'h-8 px-3 text-xs',
        default: 'h-10 px-4 py-2',
        md: 'h-10 px-4 py-2',
        lg: 'h-12 px-8 text-base',
        xl: 'h-14 px-10 text-lg',
        icon: 'h-10 w-10',
        'icon-sm': 'h-8 w-8',
        'icon-lg': 'h-12 w-12',
        'icon-xl': 'h-14 w-14',
      };

      if (sizeResponsive.base) classes.push(sizeMap[sizeResponsive.base]);
      if (sizeResponsive.sm) classes.push(`sm:${sizeMap[sizeResponsive.sm]}`);
      if (sizeResponsive.md) classes.push(`md:${sizeMap[sizeResponsive.md]}`);
      if (sizeResponsive.lg) classes.push(`lg:${sizeMap[sizeResponsive.lg]}`);
      if (sizeResponsive.xl) classes.push(`xl:${sizeMap[sizeResponsive.xl]}`);

      return classes.join(' ');
    }, [sizeResponsive]);

    return (
      <Comp
        type={asChild ? undefined : 'button'}
        data-slot="button"
        className={cn(buttonVariants({ variant, size, fullWidth, className }), responsiveClasses)}
        disabled={disabled || isLoading}
        ref={ref}
        aria-label={ariaLabel}
        aria-busy={isLoading}
        aria-disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {children}
          </>
        ) : (
          <>
            {leftIcon && <span className="mr-2">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="ml-2">{rightIcon}</span>}
          </>
        )}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
