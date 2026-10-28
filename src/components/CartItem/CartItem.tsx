import * as React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Price } from '@/components/Price';

export interface CartItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  imageSrc?: string;
  imageAlt?: string;
  price: number;
  currency?: string;
  quantity: number;
  onQuantityChange?: (quantity: number) => void;
  onRemove?: () => void;
  maxQuantity?: number;
}

const CartItem = React.forwardRef<HTMLDivElement, CartItemProps>(
  (
    {
      className,
      title,
      imageSrc,
      imageAlt = '',
      price,
      currency = 'USD',
      quantity,
      onQuantityChange,
      onRemove,
      maxQuantity,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex gap-4 rounded-lg border border-border bg-card p-4 text-card-foreground',
          className
        )}
        {...props}
      >
        {imageSrc && (
          <img
            src={imageSrc}
            alt={imageAlt || title}
            className="h-20 w-20 rounded-md object-cover"
            loading="lazy"
          />
        )}
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-semibold leading-tight">{title}</h3>
            {onRemove && (
              <button
                type="button"
                onClick={onRemove}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label={`Remove ${title}`}
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>
          <Price amount={price} currency={currency} />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onQuantityChange?.(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" aria-hidden="true" />
            </button>
            <span
              className="min-w-8 text-center text-sm font-medium"
              aria-label={`Quantity ${quantity}`}
            >
              {quantity}
            </span>
            <button
              type="button"
              onClick={() =>
                onQuantityChange?.(Math.min(maxQuantity ?? quantity + 1, quantity + 1))
              }
              disabled={typeof maxQuantity === 'number' && quantity >= maxQuantity}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    );
  }
);
CartItem.displayName = 'CartItem';

export { CartItem };
