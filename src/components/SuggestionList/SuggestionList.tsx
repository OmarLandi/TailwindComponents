import * as React from 'react';

import { cn } from '@/lib/utils';

export interface SuggestionItem {
  id: string;
  name: React.ReactNode;
  handle?: React.ReactNode;
  avatarSrc?: string;
}

export interface SuggestionListProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  suggestions: SuggestionItem[];
  onFollow?: (id: string) => void;
  followedIds?: string[];
}

const SuggestionList = React.forwardRef<HTMLDivElement, SuggestionListProps>(
  (
    { className, title = 'Suggested for you', suggestions, onFollow, followedIds = [], ...props },
    ref
  ) => {
    return (
      <section
        ref={ref}
        className={cn(
          'flex flex-col gap-3 rounded-lg border border-border bg-card p-4 text-card-foreground',
          className
        )}
        {...props}
      >
        <h3 className="font-semibold">{title}</h3>
        <ul className="flex flex-col gap-3">
          {suggestions.map(suggestion => {
            const followed = followedIds.includes(suggestion.id);
            return (
              <li key={suggestion.id} className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  {suggestion.avatarSrc ? (
                    <img
                      src={suggestion.avatarSrc}
                      alt={String(suggestion.name)}
                      className="h-9 w-9 rounded-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground"
                      aria-hidden="true"
                    >
                      {String(suggestion.name).charAt(0)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="truncate font-medium">{suggestion.name}</p>
                    {suggestion.handle && (
                      <p className="truncate text-xs text-muted-foreground">{suggestion.handle}</p>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onFollow?.(suggestion.id)}
                  className="inline-flex min-h-8 items-center justify-center rounded-md border border-input bg-background px-3 text-xs font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  aria-pressed={followed}
                >
                  {followed ? 'Following' : 'Follow'}
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
);
SuggestionList.displayName = 'SuggestionList';

export { SuggestionList };
