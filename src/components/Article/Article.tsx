import * as React from 'react';

import { cn } from '@/lib/utils';

export interface ArticleProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  href?: string;
  imageSrc?: string;
  imageAlt?: string;
  category?: React.ReactNode;
  excerpt?: React.ReactNode;
  author?: React.ReactNode;
  date?: React.ReactNode;
  readingTime?: React.ReactNode;
  actions?: React.ReactNode;
  headingLevel?: 2 | 3 | 4 | 5 | 6;
}

const Article = React.forwardRef<HTMLElement, ArticleProps>(
  (
    {
      className,
      title,
      href,
      imageSrc,
      imageAlt = '',
      category,
      excerpt,
      author,
      date,
      readingTime,
      actions,
      headingLevel = 3,
      ...props
    },
    ref
  ) => {
    const Heading = `h${headingLevel}` as 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

    return (
      <article
        ref={ref}
        className={cn('flex flex-col gap-4 text-foreground', className)}
        {...props}
      >
        {imageSrc && (
          <a
            href={href}
            className="group block overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            tabIndex={href ? 0 : -1}
            aria-label={href ? title : undefined}
          >
            <img
              src={imageSrc}
              alt={imageAlt}
              loading="lazy"
              className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transform-none"
            />
          </a>
        )}
        <div className="flex flex-col gap-3">
          {category && (
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {category}
            </span>
          )}
          <Heading className="text-xl font-semibold tracking-tight">
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
          </Heading>
          {excerpt && <p className="text-sm leading-relaxed text-muted-foreground">{excerpt}</p>}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            {author && <span>{author}</span>}
            {date && <time>{date}</time>}
            {readingTime && <span>{readingTime}</span>}
          </div>
          {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
        </div>
      </article>
    );
  }
);
Article.displayName = 'Article';

export { Article };
