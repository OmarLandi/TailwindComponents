import * as React from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

import { cn } from '@/lib/utils';

export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  value: React.ReactNode;
  change?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
}

const Stat = React.forwardRef<HTMLDivElement, StatProps>(
  ({ className, label, value, change, trend = 'neutral', icon, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-2 rounded-lg border border-border bg-card p-4 text-card-foreground',
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm text-muted-foreground">{label}</p>
          {icon && (
            <span className="text-muted-foreground" aria-hidden="true">
              {icon}
            </span>
          )}
        </div>
        <p className="text-2xl font-semibold tracking-tight">{value}</p>
        {change && (
          <p
            className={cn(
              'flex items-center gap-1 text-xs font-medium',
              trend === 'up' && 'text-success',
              trend === 'down' && 'text-destructive',
              trend === 'neutral' && 'text-muted-foreground'
            )}
          >
            {trend === 'up' && <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />}
            {trend === 'down' && <ArrowDownRight className="h-3.5 w-3.5" aria-hidden="true" />}
            {change}
          </p>
        )}
      </div>
    );
  }
);
Stat.displayName = 'Stat';

export { Stat };
