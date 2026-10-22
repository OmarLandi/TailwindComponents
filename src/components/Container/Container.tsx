import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const containerVariants = cva('', {
  variants: {
    size: {
      xs: 'max-w-xs',
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-4xl',
      xl: 'max-w-6xl',
      '2xl': 'max-w-7xl',
      form: 'max-w-[32rem]',
      prose: 'max-w-[65ch]',
      content: 'max-w-[64rem]',
      wide: 'max-w-[80rem]',
      full: 'max-w-full',
    },
    padding: {
      none: '',
      sm: 'px-2',
      default: 'px-4',
      md: 'px-4 sm:px-6',
      lg: 'px-4 sm:px-6 lg:px-8',
    },
    fluid: {
      true: 'max-w-none',
      false: '',
    },
    fullWidth: {
      true: 'w-full',
      false: '',
    },
  },
  defaultVariants: {
    size: 'xl',
    padding: 'md',
    fluid: false,
    fullWidth: false,
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof containerVariants> {
  asChild?: boolean;
  minHeight?: string;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, asChild = false, size, padding, fluid, fullWidth, minHeight, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';

    return (
      <Comp
        ref={ref}
        style={{ minHeight }}
        className={cn(
          'mx-auto w-full',
          containerVariants({ size, padding, fluid, fullWidth, className })
        )}
        {...props}
      />
    );
  }
);
Container.displayName = 'Container';

export { Container, containerVariants };
