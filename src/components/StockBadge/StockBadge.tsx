import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const stockBadgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
  {
    variants: {
      status: {
        'in-stock': 'bg-success/15 text-success',
        'low-stock': 'bg-warning/15 text-warning',
        'out-of-stock': 'bg-destructive/15 text-destructive',
        backorder: 'bg-info/15 text-info',
      },
    },
    defaultVariants: {
      status: 'in-stock',
    },
  }
);

export interface StockBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof stockBadgeVariants> {
  quantity?: number;
  label?: React.ReactNode;
}

const StockBadge = React.forwardRef<HTMLSpanElement, StockBadgeProps>(
  ({ className, status = 'in-stock', quantity, label, ...props }, ref) => {
    const defaultLabel =
      status === 'in-stock'
        ? 'In stock'
        : status === 'low-stock'
          ? 'Low stock'
          : status === 'out-of-stock'
            ? 'Out of stock'
            : 'Backorder';

    return (
      <span ref={ref} className={cn(stockBadgeVariants({ status }), className)} {...props}>
        {label ?? defaultLabel}
        {typeof quantity === 'number' && status !== 'out-of-stock' && `: ${quantity}`}
      </span>
    );
  }
);
StockBadge.displayName = 'StockBadge';

export { StockBadge, stockBadgeVariants };
