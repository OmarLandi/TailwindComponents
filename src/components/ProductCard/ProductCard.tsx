import * as React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Price } from '@/components/Price';
import { Rating } from '@/components/Rating';
import { StockBadge } from '@/components/StockBadge';

export interface ProductCardProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  href?: string;
  imageSrc?: string;
  imageAlt?: string;
  description?: React.ReactNode;
  price: number;
  originalPrice?: number;
  currency?: string;
  rating?: number;
  reviewCount?: number;
  stockStatus?: 'in-stock' | 'low-stock' | 'out-of-stock' | 'backorder';
  stockQuantity?: number;
  wishlist?: boolean;
  onAddToCart?: () => void;
  onToggleWishlist?: () => void;
}

const ProductCard = React.forwardRef<HTMLElement, ProductCardProps>(
  (
    {
      className,
      title,
      href,
      imageSrc,
      imageAlt = '',
      description,
      price,
      originalPrice,
      currency = 'USD',
      rating,
      reviewCount,
      stockStatus = 'in-stock',
      stockQuantity,
      wishlist = false,
      onAddToCart,
      onToggleWishlist,
      ...props
    },
    ref
  ) => {
    return (
      <article
        ref={ref}
        className={cn(
          'flex flex-col overflow-hidden rounded-lg border border-border bg-card text-card-foreground',
          className
        )}
        {...props}
      >
        <div className="relative">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={imageAlt || title}
              loading="lazy"
              className="aspect-square w-full object-cover"
            />
          ) : (
            <div
              className="flex aspect-square w-full items-center justify-center bg-muted text-muted-foreground"
              aria-hidden="true"
            >
              No image
            </div>
          )}
          {onToggleWishlist && (
            <button
              type="button"
              onClick={onToggleWishlist}
              className="absolute end-2 top-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-foreground shadow-xs transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label={wishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              aria-pressed={wishlist}
            >
              <Heart
                className={cn('h-4 w-4', wishlist && 'fill-current text-destructive')}
                aria-hidden="true"
              />
            </button>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-3 p-4">
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold leading-tight">
              {href ? (
                <a
                  href={href}
                  className="hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {title}
                </a>
              ) : (
                title
              )}
            </h3>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
          {(rating !== undefined || reviewCount !== undefined) && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {rating !== undefined && <Rating value={rating} readOnly size="sm" />}
              {reviewCount !== undefined && <span>({reviewCount})</span>}
            </div>
          )}
          <div className="mt-auto flex items-center justify-between gap-3">
            <Price amount={price} originalAmount={originalPrice} currency={currency} />
            <StockBadge status={stockStatus} quantity={stockQuantity} />
          </div>
          {onAddToCart && (
            <button
              type="button"
              onClick={onAddToCart}
              disabled={stockStatus === 'out-of-stock'}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50"
            >
              <ShoppingCart className="h-4 w-4" aria-hidden="true" />
              Add to cart
            </button>
          )}
        </div>
      </article>
    );
  }
);
ProductCard.displayName = 'ProductCard';

export { ProductCard };
