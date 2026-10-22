import * as React from 'react';
import { Check, ChevronsUpDown, Loader2, Search, X } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/Popover';

const comboboxTriggerVariants = cva(
  'flex w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-8 text-xs',
        default: 'h-10',
        lg: 'h-12 text-base',
      },
      state: {
        default: '',
        error: 'border-destructive focus:ring-destructive',
      },
    },
    defaultVariants: {
      size: 'default',
      state: 'default',
    },
  }
);

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps extends VariantProps<typeof comboboxTriggerVariants> {
  options: ComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  error?: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  required?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  className?: string;
}

const Combobox = React.forwardRef<HTMLButtonElement, ComboboxProps>(
  (
    {
      options,
      value,
      onValueChange,
      placeholder = 'Select an option...',
      searchPlaceholder = 'Search...',
      emptyText = 'No results found.',
      label,
      helperText,
      error,
      isLoading,
      disabled,
      required,
      searchable = true,
      clearable = true,
      size,
      className,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const [activeIndex, setActiveIndex] = React.useState(-1);
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const listboxRef = React.useRef<HTMLDivElement>(null);
    const generatedId = React.useId();
    const inputId = generatedId;
    const labelId = `${inputId}-label`;
    const listboxId = `${inputId}-listbox`;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;
    const hasError = !!error;

    React.useImperativeHandle(ref, () => triggerRef.current as HTMLButtonElement);

    const selectedLabel = options.find(o => o.value === value)?.label;

    const filteredOptions = React.useMemo(() => {
      if (!search.trim()) return options;
      const lower = search.toLowerCase();
      return options.filter(o => o.label.toLowerCase().includes(lower));
    }, [options, search]);

    const activeOptionId =
      open && activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined;

    React.useEffect(() => {
      if (!open) return;

      const selectedIndex = filteredOptions.findIndex(
        option => option.value === value && !option.disabled
      );
      const firstEnabled = filteredOptions.findIndex(option => !option.disabled);
      setActiveIndex(selectedIndex >= 0 ? selectedIndex : firstEnabled);
    }, [open, filteredOptions, value]);

    React.useEffect(() => {
      if (open && !searchable) {
        listboxRef.current?.focus();
      }
    }, [open, searchable]);

    const close = () => {
      setOpen(false);
      setSearch('');
      setActiveIndex(-1);
      triggerRef.current?.focus();
    };

    const handleOpenChange = (nextOpen: boolean) => {
      setOpen(nextOpen);
      if (!nextOpen) {
        setSearch('');
        setActiveIndex(-1);
      }
    };

    const handleSelect = (optionValue: string) => {
      const newValue = optionValue === value ? '' : optionValue;
      onValueChange?.(newValue);
      close();
    };

    const moveActive = (direction: 1 | -1) => {
      const enabledIndices = filteredOptions
        .map((option, index) => (option.disabled ? -1 : index))
        .filter(index => index >= 0);

      if (enabledIndices.length === 0) {
        setActiveIndex(-1);
        return;
      }

      const currentPosition = enabledIndices.indexOf(activeIndex);
      const nextPosition =
        currentPosition === -1
          ? direction === 1
            ? 0
            : enabledIndices.length - 1
          : (currentPosition + direction + enabledIndices.length) % enabledIndices.length;

      setActiveIndex(enabledIndices[nextPosition]);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }

      if (event.key === 'Tab') {
        setOpen(false);
        setSearch('');
        setActiveIndex(-1);
        return;
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (!open) {
          setOpen(true);
        } else {
          moveActive(1);
        }
        return;
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (!open) {
          setOpen(true);
        } else {
          moveActive(-1);
        }
        return;
      }

      if (open && event.currentTarget === listboxRef.current) {
        if (event.key === 'Home') {
          event.preventDefault();
          setActiveIndex(filteredOptions.findIndex(option => !option.disabled));
          return;
        }
        if (event.key === 'End') {
          event.preventDefault();
          const lastEnabled = filteredOptions
            .map((option, index) => (option.disabled ? -1 : index))
            .filter(index => index >= 0)
            .pop();
          setActiveIndex(lastEnabled ?? -1);
          return;
        }
      }

      if (event.key === 'Enter' && open && activeIndex >= 0) {
        event.preventDefault();
        const option = filteredOptions[activeIndex];
        if (option && !option.disabled) {
          handleSelect(option.value);
        }
      }
    };

    return (
      <div className={cn('flex flex-col gap-1.5', className)}>
        {label && (
          <label
            id={labelId}
            htmlFor={inputId}
            className={cn('text-sm font-medium leading-none', disabled && 'opacity-50')}
          >
            {label}
            {required && (
              <span className="ms-1 text-destructive" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        <Popover open={open} onOpenChange={handleOpenChange}>
          <div className="relative w-full">
            <PopoverTrigger asChild>
              <button
                ref={triggerRef}
                id={inputId}
                type="button"
                role="combobox"
                aria-expanded={open}
                aria-controls={listboxId}
                aria-haspopup="listbox"
                aria-labelledby={label ? labelId : undefined}
                aria-activedescendant={activeOptionId}
                aria-required={required || undefined}
                disabled={disabled || isLoading}
                className={cn(
                  comboboxTriggerVariants({ size, state: error ? 'error' : 'default' }),
                  !value && 'text-muted-foreground'
                )}
                aria-invalid={hasError || undefined}
                aria-describedby={hasError ? errorId : helperText ? helperId : undefined}
                onKeyDown={handleKeyDown}
              >
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  {isLoading && (
                    <Loader2
                      className="h-4 w-4 shrink-0 animate-spin text-muted-foreground"
                      aria-hidden="true"
                    />
                  )}
                  <span className="truncate">{value ? selectedLabel : placeholder}</span>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <ChevronsUpDown className="h-4 w-4 opacity-50" aria-hidden="true" />
                </div>
              </button>
            </PopoverTrigger>
            {clearable && value && !disabled && !isLoading && (
              <button
                type="button"
                onClick={() => onValueChange?.('')}
                className="absolute end-8 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label="Clear selection"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>
          <PopoverContent
            className="w-[var(--radix-popover-trigger-width)] max-w-[calc(100vw-2rem)] p-0"
            align="start"
            aria-label={typeof label === 'string' ? `${label} options` : 'Options'}
          >
            {searchable && (
              <div className="flex items-center border-b px-3">
                <Search className="me-2 h-4 w-4 shrink-0 opacity-50" aria-hidden="true" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder={searchPlaceholder}
                  aria-label="Search options"
                  aria-controls={listboxId}
                  aria-activedescendant={activeOptionId}
                  aria-autocomplete="list"
                  autoFocus
                  className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                  onKeyDown={handleKeyDown}
                />
              </div>
            )}
            <div
              ref={listboxRef}
              id={listboxId}
              role="listbox"
              aria-labelledby={label ? labelId : undefined}
              aria-label={label ? undefined : 'Options'}
              aria-activedescendant={activeOptionId}
              tabIndex={searchable ? -1 : 0}
              className="max-h-60 overflow-auto p-1 outline-none"
              onKeyDown={handleKeyDown}
            >
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => (
                  <div
                    key={option.value}
                    id={`${listboxId}-option-${index}`}
                    role="option"
                    aria-selected={option.value === value}
                    aria-disabled={option.disabled || undefined}
                    onMouseDown={event => event.preventDefault()}
                    onMouseEnter={() => !option.disabled && setActiveIndex(index)}
                    onClick={() => !option.disabled && handleSelect(option.value)}
                    className={cn(
                      'relative flex min-h-11 w-full cursor-default select-none items-center rounded-sm py-1.5 ps-8 pe-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground',
                      option.disabled && 'pointer-events-none opacity-50',
                      option.value === value && 'bg-accent text-accent-foreground',
                      index === activeIndex && 'bg-accent text-accent-foreground'
                    )}
                  >
                    <span className="absolute start-2 flex h-3.5 w-3.5 items-center justify-center">
                      {option.value === value && <Check className="h-4 w-4" aria-hidden="true" />}
                    </span>
                    {option.label}
                  </div>
                ))
              ) : (
                <p className="py-6 text-center text-sm text-muted-foreground">{emptyText}</p>
              )}
            </div>
          </PopoverContent>
        </Popover>
        {hasError && (
          <p id={errorId} className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
        {!hasError && helperText && (
          <p id={helperId} className="text-sm text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Combobox.displayName = 'Combobox';

export { Combobox };
