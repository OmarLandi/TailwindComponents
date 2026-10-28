import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/utils';

export type AspectRatioValue = number | string;

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: AspectRatioValue;
  asChild?: boolean;
}

const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ className, ratio = 16 / 9, asChild = false, style, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';

    const aspectRatio = typeof ratio === 'number' ? `${ratio}` : ratio;

    return (
      <Comp
        ref={ref}
        className={cn('relative w-full min-w-0 overflow-hidden', className)}
        style={{ aspectRatio, ...style }}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
AspectRatio.displayName = 'AspectRatio';

export { AspectRatio };
