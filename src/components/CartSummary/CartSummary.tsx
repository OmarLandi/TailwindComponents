import * as React from 'react';

import { cn } from '@/lib/utils';
import { Price } from '@/components/Price';

export interface CartSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  subtotal: number;
  shipping?: number;
  tax?: number;
  total: number;
  currency?: string;
  checkoutLabel?: string;
  onCheckout?: () => void;
  disabled?: boolean;
}

const CartSummary = React.forwardRef<HTMLDivElement, CartSummaryProps>(
  (
    {
      className,
      subtotal,
      shipping = 0,
      tax = 0,
      total,
      currency = 'USD',
      checkoutLabel = 'Checkout',
      onCheckout,
      disabled = false,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-4 rounded-lg border border-border bg-card p-5 text-card-foreground',
          className
        )}
        {...props}
      >
        <h3 className="text-lg font-semibold">Order summary</h3>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Subtotal</dt>
            <dd>
              <Price amount={subtotal} currency={currency} size="sm" />
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Shipping</dt>
            <dd>
              <Price amount={shipping} currency={currency} size="sm" />
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Tax</dt>
            <dd>
              <Price amount={tax} currency={currency} size="sm" />
            </dd>
          </div>
          <div className="flex justify-between gap-4 border-t border-border pt-2 font-semibold">
            <dt>Total</dt>
            <dd>
              <Price amount={total} currency={currency} />
            </dd>
          </div>
        </dl>
        <button
          type="button"
          onClick={onCheckout}
          disabled={disabled}
          className="inline-flex min-h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50"
        >
          {checkoutLabel}
        </button>
      </div>
    );
  }
);
CartSummary.displayName = 'CartSummary';

export { CartSummary };
