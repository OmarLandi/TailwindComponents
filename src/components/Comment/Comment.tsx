import * as React from 'react';

import { cn } from '@/lib/utils';

export interface CommentProps extends Omit<React.HTMLAttributes<HTMLElement>, 'content'> {
  author: React.ReactNode;
  avatarSrc?: string;
  avatarAlt?: string;
  avatarFallback?: React.ReactNode;
  timestamp?: React.ReactNode;
  content: React.ReactNode;
  actions?: React.ReactNode;
  replies?: React.ReactNode;
  level?: number;
}

const Comment = React.forwardRef<HTMLElement, CommentProps>(
  (
    {
      className,
      author,
      avatarSrc,
      avatarAlt = '',
      avatarFallback,
      timestamp,
      content,
      actions,
      replies,
      level: _level = 0,
      ...props
    },
    ref
  ) => {
    return (
      <article ref={ref} className={cn('flex gap-3', className)} {...props}>
        <div className="shrink-0">
          {avatarSrc ? (
            <img
              src={avatarSrc}
              alt={avatarAlt || String(author)}
              className="h-9 w-9 rounded-full object-cover"
              loading="lazy"
            />
          ) : (
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground"
              aria-hidden="true"
            >
              {avatarFallback ?? String(author).charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="font-semibold">{author}</span>
            {timestamp && <time className="text-xs text-muted-foreground">{timestamp}</time>}
          </div>
          <div className="mt-1 text-sm leading-relaxed text-foreground">{content}</div>
          {actions && (
            <div className="mt-2 flex flex-wrap gap-3 text-sm text-muted-foreground">{actions}</div>
          )}
          {replies && <div className="mt-4 space-y-4 border-s-2 border-border ps-4">{replies}</div>}
        </div>
      </article>
    );
  }
);
Comment.displayName = 'Comment';

export { Comment };
