import * as React from 'react';

import { cn } from '@/lib/utils';

export interface ReviewProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title' | 'content'> {
  author: React.ReactNode;
  rating: number;
  date?: React.ReactNode;
  title?: React.ReactNode;
  content?: React.ReactNode;
  helpfulCount?: number;
  onHelpful?: () => void;
}

const Review = React.forwardRef<HTMLElement, ReviewProps>(
  ({ className, author, rating, date, title, content, helpfulCount, onHelpful, ...props }, ref) => {
    return (
      <article
        ref={ref}
        className={cn(
          'flex flex-col gap-3 rounded-lg border border-border bg-card p-5 text-card-foreground',
          className
        )}
        {...props}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="font-semibold">{author}</p>
            {date && <time className="text-xs text-muted-foreground">{date}</time>}
          </div>
          <span className="text-sm font-medium" aria-label={`${rating} out of 5 stars`}>
            {rating.toFixed(1)} / 5
          </span>
        </div>
        {title && <h4 className="font-semibold">{title}</h4>}
        {content && <p className="text-sm leading-relaxed text-muted-foreground">{content}</p>}
        {typeof helpfulCount === 'number' && (
          <button
            type="button"
            onClick={onHelpful}
            className="self-start text-xs text-muted-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Helpful ({helpfulCount})
          </button>
        )}
      </article>
    );
  }
);
Review.displayName = 'Review';

export { Review };
