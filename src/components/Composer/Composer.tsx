import * as React from 'react';
import { Image as ImageIcon, Send } from 'lucide-react';

import { cn } from '@/lib/utils';

export interface ComposerProps extends Omit<
  React.FormHTMLAttributes<HTMLFormElement>,
  'onSubmit' | 'onChange'
> {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void | Promise<void>;
  placeholder?: string;
  submitLabel?: string;
  loading?: boolean;
  actions?: React.ReactNode;
}

const Composer = React.forwardRef<HTMLFormElement, ComposerProps>(
  (
    {
      className,
      value,
      defaultValue = '',
      onChange,
      onSubmit,
      placeholder = "What's on your mind?",
      submitLabel = 'Post',
      loading = false,
      actions,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const currentValue = value ?? internalValue;

    const setValue = (next: string) => {
      if (value === undefined) setInternalValue(next);
      onChange?.(next);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!currentValue.trim()) return;
      await onSubmit?.(currentValue);
      if (value === undefined) setInternalValue('');
    };

    return (
      <form
        ref={ref}
        className={cn(
          'flex flex-col gap-3 rounded-lg border border-border bg-card p-4 text-card-foreground',
          className
        )}
        onSubmit={handleSubmit}
        {...props}
      >
        <textarea
          value={currentValue}
          onChange={event => setValue(event.target.value)}
          placeholder={placeholder}
          rows={3}
          className="min-h-[96px] w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        />
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            {actions ?? (
              <button
                type="button"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Add media"
              >
                <ImageIcon className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>
          <button
            type="submit"
            disabled={loading || !currentValue.trim()}
            onClick={event => {
              event.preventDefault();
              void handleSubmit(event as unknown as React.FormEvent<HTMLFormElement>);
            }}
            className="inline-flex min-h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            {loading ? 'Posting…' : submitLabel}
          </button>
        </div>
      </form>
    );
  }
);
Composer.displayName = 'Composer';

export { Composer };
