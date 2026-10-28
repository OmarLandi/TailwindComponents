import * as React from 'react';

import { cn } from '@/lib/utils';

export interface FeedPostProps extends Omit<React.HTMLAttributes<HTMLElement>, 'content'> {
  author: React.ReactNode;
  avatarSrc?: string;
  avatarAlt?: string;
  timestamp?: React.ReactNode;
  content?: React.ReactNode;
  media?: React.ReactNode;
  actions?: React.ReactNode;
  meta?: React.ReactNode;
}

const FeedPost = React.forwardRef<HTMLElement, FeedPostProps>(
  (
    {
      className,
      author,
      avatarSrc,
      avatarAlt = '',
      timestamp,
      content,
      media,
      actions,
      meta,
      ...props
    },
    ref
  ) => {
    return (
      <article
        ref={ref}
        className={cn(
          'flex flex-col gap-4 rounded-lg border border-border bg-card p-4 text-card-foreground',
          className
        )}
        {...props}
      >
        <div className="flex items-start gap-3">
          {avatarSrc ? (
            <img
              src={avatarSrc}
              alt={avatarAlt || String(author)}
              className="h-10 w-10 rounded-full object-cover"
              loading="lazy"
            />
          ) : (
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground"
              aria-hidden="true"
            >
              {String(author).charAt(0).toUpperCase()}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="font-semibold">{author}</p>
            {timestamp && <time className="text-xs text-muted-foreground">{timestamp}</time>}
          </div>
          {meta}
        </div>
        {content && <div className="text-sm leading-relaxed">{content}</div>}
        {media && <div className="overflow-hidden rounded-lg">{media}</div>}
        {actions && (
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">{actions}</div>
        )}
      </article>
    );
  }
);
FeedPost.displayName = 'FeedPost';

export { FeedPost };
