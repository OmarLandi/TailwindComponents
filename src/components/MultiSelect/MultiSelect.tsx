import * as React from 'react';
import { Check, ChevronDown, X } from 'lucide-react';

import { cn } from '@/lib/utils';

export interface MultiSelectOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface MultiSelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: MultiSelectOption[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
}

const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(
  (
    {
      className,
      options,
      value,
      defaultValue = [],
      onChange,
      placeholder = 'Select options',
      disabled = false,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const [open, setOpen] = React.useState(false);
    const selected = value ?? internalValue;

    const toggleValue = (optionValue: string) => {
      const next = selected.includes(optionValue)
        ? selected.filter(item => item !== optionValue)
        : [...selected, optionValue];
      if (value === undefined) setInternalValue(next);
      onChange?.(next);
    };

    const selectedLabels = options
      .filter(option => selected.includes(option.value))
      .map(option => option.label);

    return (
      <div ref={ref} className={cn('relative w-full', className)} {...props}>
        <button
          type="button"
          disabled={disabled}
          onClick={() => setOpen(current => !current)}
          className="flex min-h-10 w-full items-center justify-between gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <span className="truncate">
            {selectedLabels.length > 0 ? selectedLabels.join(', ') : placeholder}
          </span>
          <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        </button>
        {selected.length > 0 && (
          <button
            type="button"
            onClick={() => {
              if (value === undefined) setInternalValue([]);
              onChange?.([]);
            }}
            className="absolute end-9 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Clear selection"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
        {open && (
          <div
            role="listbox"
            aria-multiselectable="true"
            className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md"
          >
            {options.map(option => {
              const isSelected = selected.includes(option.value);
              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  disabled={option.disabled}
                  onClick={() => toggleValue(option.value)}
                  className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span
                    className={cn(
                      'flex h-4 w-4 items-center justify-center rounded-sm border border-input',
                      isSelected && 'border-primary bg-primary text-primary-foreground'
                    )}
                  >
                    {isSelected && <Check className="h-3 w-3" aria-hidden="true" />}
                  </span>
                  {option.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);
MultiSelect.displayName = 'MultiSelect';

export { MultiSelect };
