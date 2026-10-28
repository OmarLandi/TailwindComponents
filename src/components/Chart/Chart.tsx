import * as React from 'react';

import { cn } from '@/lib/utils';

export interface ChartData {
  label: React.ReactNode;
  value: number;
  color?: string;
}

export interface ChartProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  data: ChartData[];
  title?: React.ReactNode;
  height?: number;
}

const Chart = React.forwardRef<HTMLDivElement, ChartProps>(
  ({ className, data, title, height = 240, ...props }, ref) => {
    const maxValue = Math.max(...data.map(item => item.value), 1);

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-3 rounded-lg border border-border bg-card p-4 text-card-foreground',
          className
        )}
        {...props}
      >
        {title && <h3 className="text-sm font-semibold">{title}</h3>}
        <div
          className="flex items-end gap-3"
          style={{ height }}
          role="img"
          aria-label={typeof title === 'string' ? title : 'Chart'}
        >
          {data.map((item, index) => {
            const barHeight = `${Math.max(4, (item.value / maxValue) * 100)}%`;
            return (
              <div key={index} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex w-full flex-1 items-end">
                  <div
                    className="w-full rounded-t-md bg-primary transition-all"
                    style={{ height: barHeight, backgroundColor: item.color }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
Chart.displayName = 'Chart';

export { Chart };
