import * as React from 'react';

import { cn } from '@/lib/utils';

export interface AuthorBioProps extends React.HTMLAttributes<HTMLElement> {
  name: string;
  jobTitle?: React.ReactNode;
  bio?: React.ReactNode;
  avatarSrc?: string;
  avatarAlt?: string;
  avatarFallback?: React.ReactNode;
  links?: React.ReactNode;
}

const AuthorBio = React.forwardRef<HTMLElement, AuthorBioProps>(
  (
    { className, name, jobTitle, bio, avatarSrc, avatarAlt = '', avatarFallback, links, ...props },
    ref
  ) => {
    return (
      <section
        ref={ref}
        className={cn(
          'flex flex-col gap-4 rounded-lg border border-border bg-card p-5 text-card-foreground sm:flex-row',
          className
        )}
        {...props}
      >
        <div className="flex shrink-0 items-start">
          {avatarSrc ? (
            <img
              src={avatarSrc}
              alt={avatarAlt || name}
              className="h-16 w-16 rounded-full object-cover"
              loading="lazy"
            />
          ) : (
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full bg-muted text-lg font-semibold text-muted-foreground"
              aria-hidden="true"
            >
              {avatarFallback ?? name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="flex min-w-0 flex-col gap-2">
          <div>
            <h3 className="text-lg font-semibold">{name}</h3>
            {jobTitle && <p className="text-sm text-muted-foreground">{jobTitle}</p>}
          </div>
          {bio && <p className="text-sm leading-relaxed text-muted-foreground">{bio}</p>}
          {links && <div className="flex flex-wrap gap-3 text-sm">{links}</div>}
        </div>
      </section>
    );
  }
);
AuthorBio.displayName = 'AuthorBio';

export { AuthorBio };
