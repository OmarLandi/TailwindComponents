import * as React from 'react';
import { formatCurrency } from '@/lib/formatters';

import { cn } from '@/lib/utils';

export interface PriceProps extends React.HTMLAttributes<HTMLSpanElement> {
  amount: number;
  currency?: string;
  originalAmount?: number;
  size?: 'sm' | 'default' | 'lg';
  showCurrencyCode?: boolean;
}

const sizeClasses: Record<NonNullable<PriceProps['size']>, string> = {
  sm: 'text-sm',
  default: 'text-base',
  lg: 'text-2xl',
};

const Price = React.forwardRef<HTMLSpanElement, PriceProps>(
  (
    {
      className,
      amount,
      currency = 'USD',
      originalAmount,
      size = 'default',
      showCurrencyCode = false,
      ...props
    },
    ref
  ) => {
    return (
      <span ref={ref} className={cn('inline-flex items-baseline gap-2', className)} {...props}>
        <span className={cn('font-semibold', sizeClasses[size])}>
          {formatCurrency(amount, {
            currency,
            currencyDisplay: showCurrencyCode ? 'code' : 'symbol',
          })}
        </span>
        {typeof originalAmount === 'number' && originalAmount > amount && (
          <span className="text-sm text-muted-foreground line-through">
            {formatCurrency(originalAmount, {
              currency,
              currencyDisplay: showCurrencyCode ? 'code' : 'symbol',
            })}
          </span>
        )}
      </span>
    );
  }
);
Price.displayName = 'Price';

export { Price };
