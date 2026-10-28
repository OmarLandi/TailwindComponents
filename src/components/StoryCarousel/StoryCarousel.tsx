import * as React from 'react';

import { cn } from '@/lib/utils';

export interface StoryItem {
  id: string;
  label: React.ReactNode;
  imageSrc?: string;
  viewed?: boolean;
}

export interface StoryCarouselProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  stories: StoryItem[];
  onSelect?: (id: string) => void;
}

const StoryCarousel = React.forwardRef<HTMLDivElement, StoryCarouselProps>(
  ({ className, stories, onSelect, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('flex gap-3 overflow-x-auto pb-2', className)} {...props}>
        {stories.map(story => (
          <button
            key={story.id}
            type="button"
            onClick={() => onSelect?.(story.id)}
            className="flex shrink-0 flex-col items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <span
              className={cn(
                'flex h-16 w-16 items-center justify-center rounded-full border-2 p-0.5',
                story.viewed ? 'border-muted' : 'border-primary'
              )}
            >
              {story.imageSrc ? (
                <img
                  src={story.imageSrc}
                  alt={String(story.label)}
                  className="h-full w-full rounded-full object-cover"
                  loading="lazy"
                />
              ) : (
                <span className="text-xs font-semibold text-muted-foreground">
                  {String(story.label).charAt(0)}
                </span>
              )}
            </span>
            <span className="max-w-16 truncate text-xs text-muted-foreground">{story.label}</span>
          </button>
        ))}
      </div>
    );
  }
);
StoryCarousel.displayName = 'StoryCarousel';

export { StoryCarousel };
