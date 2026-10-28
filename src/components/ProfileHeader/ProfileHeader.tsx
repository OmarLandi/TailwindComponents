import * as React from 'react';

import { cn } from '@/lib/utils';

export interface ProfileStat {
  label: React.ReactNode;
  value: React.ReactNode;
}

export interface ProfileHeaderProps extends React.HTMLAttributes<HTMLElement> {
  name: string;
  handle?: React.ReactNode;
  bio?: React.ReactNode;
  avatarSrc?: string;
  avatarAlt?: string;
  stats?: ProfileStat[];
  actions?: React.ReactNode;
}

const ProfileHeader = React.forwardRef<HTMLElement, ProfileHeaderProps>(
  (
    { className, name, handle, bio, avatarSrc, avatarAlt = '', stats = [], actions, ...props },
    ref
  ) => {
    return (
      <header
        ref={ref}
        className={cn(
          'flex flex-col gap-4 rounded-lg border border-border bg-card p-5 text-card-foreground sm:flex-row sm:items-start',
          className
        )}
        {...props}
      >
        {avatarSrc ? (
          <img
            src={avatarSrc}
            alt={avatarAlt || name}
            className="h-20 w-20 rounded-full object-cover"
            loading="lazy"
          />
        ) : (
          <div
            className="flex h-20 w-20 items-center justify-center rounded-full bg-muted text-2xl font-semibold text-muted-foreground"
            aria-hidden="true"
          >
            {name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div>
            <h2 className="text-xl font-semibold">{name}</h2>
            {handle && <p className="text-sm text-muted-foreground">{handle}</p>}
            {bio && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{bio}</p>}
          </div>
          {stats.length > 0 && (
            <dl className="flex flex-wrap gap-4 text-sm">
              {stats.map((stat, index) => (
                <div key={index} className="flex gap-1">
                  <dt className="font-semibold">{stat.value}</dt>
                  <dd className="text-muted-foreground">{stat.label}</dd>
                </div>
              ))}
            </dl>
          )}
          {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
        </div>
      </header>
    );
  }
);
ProfileHeader.displayName = 'ProfileHeader';

export { ProfileHeader };
