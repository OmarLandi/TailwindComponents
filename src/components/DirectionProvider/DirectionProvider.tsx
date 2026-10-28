import * as React from 'react';

import { cn } from '@/lib/utils';

type Direction = 'ltr' | 'rtl';

const DirectionContext = React.createContext<Direction>('ltr');

export interface DirectionProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  dir?: Direction;
  children: React.ReactNode;
}

const DirectionProvider = React.forwardRef<HTMLDivElement, DirectionProviderProps>(
  ({ className, dir = 'ltr', children, ...props }, ref) => {
    return (
      <DirectionContext.Provider value={dir}>
        <div ref={ref} dir={dir} className={cn(className)} {...props}>
          {children}
        </div>
      </DirectionContext.Provider>
    );
  }
);
DirectionProvider.displayName = 'DirectionProvider';

const useDirection = () => React.useContext(DirectionContext);

export { DirectionProvider, useDirection };
