import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

type GridColumnCount = 1 | 2 | 3 | 4 | 6 | 12;

export type GridColumns =
  | GridColumnCount
  | {
      base?: GridColumnCount;
      sm?: GridColumnCount;
      md?: GridColumnCount;
      lg?: GridColumnCount;
      xl?: GridColumnCount;
    };

const gridVariants = cva('grid min-w-0', {
  variants: {
    columns: {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      6: 'grid-cols-6',
      12: 'grid-cols-12',
    },
    sm: {
      1: 'sm:grid-cols-1',
      2: 'sm:grid-cols-2',
      3: 'sm:grid-cols-3',
      4: 'sm:grid-cols-4',
      6: 'sm:grid-cols-6',
      12: 'sm:grid-cols-12',
    },
    md: {
      1: 'md:grid-cols-1',
      2: 'md:grid-cols-2',
      3: 'md:grid-cols-3',
      4: 'md:grid-cols-4',
      6: 'md:grid-cols-6',
      12: 'md:grid-cols-12',
    },
    lg: {
      1: 'lg:grid-cols-1',
      2: 'lg:grid-cols-2',
      3: 'lg:grid-cols-3',
      4: 'lg:grid-cols-4',
      6: 'lg:grid-cols-6',
      12: 'lg:grid-cols-12',
    },
    xl: {
      1: 'xl:grid-cols-1',
      2: 'xl:grid-cols-2',
      3: 'xl:grid-cols-3',
      4: 'xl:grid-cols-4',
      6: 'xl:grid-cols-6',
      12: 'xl:grid-cols-12',
    },
    gap: {
      none: 'gap-0',
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
      '2xl': 'gap-12',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    },
  },
  defaultVariants: {
    columns: 1,
    gap: 'md',
    align: 'stretch',
  },
});

type GridVariantProps = VariantProps<typeof gridVariants>;

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>, Omit<GridVariantProps, 'columns'> {
  columns?: GridColumns;
  minItemWidth?: string;
  asChild?: boolean;
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      className,
      columns,
      gap,
      align,
      minItemWidth,
      asChild = false,
      style,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'div';
    const columnProps =
      typeof columns === 'object'
        ? {
            columns: columns.base,
            sm: columns.sm,
            md: columns.md,
            lg: columns.lg,
            xl: columns.xl,
          }
        : { columns };
    const gridStyle = minItemWidth
      ? {
          gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${minItemWidth}), 1fr))`,
          ...style,
        }
      : style;

    return (
      <Comp
        ref={ref}
        style={gridStyle}
        className={cn(gridVariants({ ...columnProps, gap, align }), className)}
        {...props}
      />
    );
  }
);
Grid.displayName = 'Grid';

export { Grid, gridVariants };
