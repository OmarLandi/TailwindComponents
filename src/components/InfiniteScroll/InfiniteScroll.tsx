import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InfiniteScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  hasMore?: boolean;
  isLoading?: boolean;
  onLoadMore?: () => void;
  threshold?: number;
  rootMargin?: string;
  loader?: React.ReactNode;
  endMessage?: React.ReactNode;
}

const InfiniteScroll = React.forwardRef<HTMLDivElement, InfiniteScrollProps>(
  (
    {
      className,
      children,
      hasMore = false,
      isLoading = false,
      onLoadMore,
      threshold = 0,
      rootMargin = '200px',
      loader,
      endMessage,
      ...props
    },
    ref
  ) => {
    const sentinelRef = React.useRef<HTMLDivElement | null>(null);
    const callbackRef = React.useRef(onLoadMore);
    callbackRef.current = onLoadMore;

    React.useEffect(() => {
      const sentinel = sentinelRef.current;
      if (!sentinel || !hasMore || isLoading || !onLoadMore) return;
      if (typeof IntersectionObserver === 'undefined') return;

      const observer = new IntersectionObserver(
        entries => {
          if (entries[0]?.isIntersecting) callbackRef.current?.();
        },
        { threshold, rootMargin }
      );
      observer.observe(sentinel);
      return () => observer.disconnect();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasMore, isLoading, threshold, rootMargin]);

    return (
      <div ref={ref} className={cn('flex flex-col gap-4', className)} {...props}>
        {children}
        <div ref={sentinelRef} aria-hidden="true" />
        {isLoading &&
          (loader ?? (
            <div className="py-4 text-center text-sm text-muted-foreground">Loading…</div>
          ))}
        {!hasMore && !isLoading && endMessage && (
          <div className="py-4 text-center text-sm text-muted-foreground">{endMessage}</div>
        )}
      </div>
    );
  }
);
InfiniteScroll.displayName = 'InfiniteScroll';

export { InfiniteScroll };
