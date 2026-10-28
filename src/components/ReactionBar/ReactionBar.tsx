import * as React from 'react';
import { Heart, MessageCircle, Repeat2, Send } from 'lucide-react';

import { cn } from '@/lib/utils';

export interface ReactionBarProps extends React.HTMLAttributes<HTMLDivElement> {
  likes?: number;
  comments?: number;
  shares?: number;
  liked?: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onSave?: () => void;
}

const ReactionBar = React.forwardRef<HTMLDivElement, ReactionBarProps>(
  (
    {
      className,
      likes = 0,
      comments = 0,
      shares = 0,
      liked = false,
      onLike,
      onComment,
      onShare,
      onSave,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-wrap items-center gap-2 text-sm text-muted-foreground', className)}
        {...props}
      >
        <button
          type="button"
          onClick={onLike}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-md px-2 py-1 transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            liked && 'text-destructive'
          )}
          aria-pressed={liked}
          aria-label="Like"
        >
          <Heart className={cn('h-4 w-4', liked && 'fill-current')} aria-hidden="true" />
          {likes}
        </button>
        <button
          type="button"
          onClick={onComment}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Comment"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          {comments}
        </button>
        <button
          type="button"
          onClick={onShare}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Share"
        >
          <Repeat2 className="h-4 w-4" aria-hidden="true" />
          {shares}
        </button>
        {onSave && (
          <button
            type="button"
            onClick={onSave}
            className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Save"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>
    );
  }
);
ReactionBar.displayName = 'ReactionBar';

export { ReactionBar };
