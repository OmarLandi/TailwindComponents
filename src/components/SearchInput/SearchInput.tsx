import * as React from 'react';
import { Search, X } from 'lucide-react';

import { cn } from '@/lib/utils';

export interface SearchInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  onClear?: () => void;
  showClear?: boolean;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, value, onClear, showClear = true, ...props }, ref) => {
    const hasValue = typeof value === 'string' ? value.length > 0 : false;

    return (
      <div className={cn('relative', className)}>
        <Search
          className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          ref={ref}
          type="search"
          value={value}
          className="min-h-10 w-full rounded-md border border-input bg-background ps-9 pe-9 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50"
          {...props}
        />
        {showClear && hasValue && (
          <button
            type="button"
            onClick={onClear}
            className="absolute end-2 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>
    );
  }
);
SearchInput.displayName = 'SearchInput';

export { SearchInput };
