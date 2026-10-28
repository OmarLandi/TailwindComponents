import * as React from 'react';

import { cn } from '@/lib/utils';

export interface NotificationItemProps extends Omit<
  React.HTMLAttributes<HTMLButtonElement>,
  'title'
> {
  avatarSrc?: string;
  avatarAlt?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  timestamp?: React.ReactNode;
  unread?: boolean;
  onClick?: () => void;
}

const NotificationItem = React.forwardRef<HTMLButtonElement, NotificationItemProps>(
  (
    {
      className,
      avatarSrc,
      avatarAlt = '',
      title,
      description,
      timestamp,
      unread = false,
      onClick,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        className={cn(
          'flex w-full items-start gap-3 rounded-lg p-3 text-start transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          unread && 'bg-accent/40',
          className
        )}
        {...props}
      >
        {avatarSrc ? (
          <img
            src={avatarSrc}
            alt={avatarAlt}
            className="h-9 w-9 rounded-full object-cover"
            loading="lazy"
          />
        ) : (
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground"
            aria-hidden="true"
          >
            !
          </div>
        )}
        <span className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="text-sm font-medium">{title}</span>
          {description && <span className="text-sm text-muted-foreground">{description}</span>}
          {timestamp && <time className="text-xs text-muted-foreground">{timestamp}</time>}
        </span>
        {unread && (
          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" aria-label="Unread" />
        )}
      </button>
    );
  }
);
NotificationItem.displayName = 'NotificationItem';

export { NotificationItem };
