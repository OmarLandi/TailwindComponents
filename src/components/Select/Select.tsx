import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp, Loader2, Search, X } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const selectTriggerVariants = cva(
  'flex w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
  {
    variants: {
      size: {
        sm: 'h-8 px-2 text-xs',
        default: 'h-10 px-3 text-sm',
        lg: 'h-12 px-4 text-base',
      },
      state: {
        default: '',
        error: 'border-destructive focus:ring-destructive text-destructive',
      },
    },
    defaultVariants: {
      size: 'default',
      state: 'default',
    },
  }
);

export interface SelectTriggerProps
  extends
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof selectTriggerVariants> {
  state?: 'default' | 'error';
  showClear?: boolean;
  isLoading?: boolean;
  onClear?: (event: React.MouseEvent) => void;
}

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(
  (
    { className, children, size, state, showClear, isLoading, disabled, onClear, ...props },
    ref
  ) => {
    const handleClearClick = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onClear?.(e);
    };

    return (
      <SelectPrimitive.Trigger
        ref={ref}
        className={cn(selectTriggerVariants({ size, state, className }))}
        data-invalid={state === 'error' ? 'true' : undefined}
        disabled={disabled || isLoading}
        {...props}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {isLoading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground shrink-0" />}
          <span className="truncate flex-1">{children}</span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {showClear && !disabled && !isLoading && (
            <span
              role="button"
              onClick={handleClearClick}
              className="rounded-full p-0.5 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
              tabIndex={0}
              aria-label="Clear selection"
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClear?.(e as unknown as React.MouseEvent);
                }
              }}
            >
              <X className="h-3.5 w-3.5 text-muted-foreground" />
            </span>
          )}
          <SelectPrimitive.Icon asChild>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </SelectPrimitive.Icon>
        </div>
      </SelectPrimitive.Trigger>
    );
  }
);
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

export interface SelectContentProps extends React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Content
> {
  position?: 'popper' | 'item-aligned';
  showSearch?: boolean;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
}

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  SelectContentProps
>(
  (
    {
      className,
      children,
      position = 'popper',
      showSearch,
      searchPlaceholder = 'Search...',
      onSearchChange,
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
      if (showSearch && inputRef.current) {
        inputRef.current.focus();
      }
    }, [showSearch]);

    return (
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          ref={ref}
          className={cn(
            'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-0 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            position === 'popper' && 'w-full min-w-[var(--radix-select-trigger-width)]',
            className
          )}
          position={position}
          {...props}
        >
          {showSearch && (
            <div className="flex items-center border-b px-3 py-2">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <input
                ref={inputRef}
                type="text"
                onChange={e => onSearchChange?.(e.target.value)}
                placeholder={searchPlaceholder}
                className="flex h-8 w-full rounded-md bg-transparent py-1 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                  }
                }}
              />
            </div>
          )}
          <SelectScrollUpButton />
          <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
          <SelectScrollDownButton />
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    );
  }
);
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & {
    icon?: React.ReactNode;
  }
>(({ className, children, icon, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    {icon && (
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">{icon}</span>
    )}
    {!icon && (
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
    )}
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    {icon && (
      <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
    )}
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export interface SelectFieldProps extends Omit<
  React.ComponentPropsWithoutRef<typeof Select>,
  'onValueChange'
> {
  label?: React.ReactNode;
  placeholder?: string;
  helperText?: React.ReactNode;
  error?: React.ReactNode;
  showSearch?: boolean;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  onValueChange?: (value: string) => void;
  items: Array<{ value: string; label: string; disabled?: boolean }>;
  value?: string;
  defaultValue?: string;
  size?: 'sm' | 'default' | 'lg';
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
}

const SelectField = React.forwardRef<HTMLButtonElement, SelectFieldProps>(
  (
    {
      label,
      placeholder = 'Select an option',
      helperText,
      error,
      showSearch,
      searchPlaceholder = 'Search...',
      onSearchChange,
      onValueChange,
      items,
      value,
      defaultValue,
      size = 'default',
      disabled,
      isLoading,
      className,
      ...props
    },
    ref
  ) => {
    const [searchValue, setSearchValue] = React.useState('');
    const state = error ? 'error' : 'default';

    const filteredItems = React.useMemo(() => {
      if (!searchValue.trim()) return items;
      const search = searchValue.toLowerCase();
      return items.filter(item => item.label.toLowerCase().includes(search));
    }, [items, searchValue]);

    const handleSearchChange = (newSearch: string) => {
      setSearchValue(newSearch);
      onSearchChange?.(newSearch);
    };

    const handleClear = () => {
      setSearchValue('');
      onValueChange?.('');
    };

    const handleOpenChange = (open: boolean) => {
      if (!open) {
        setSearchValue('');
      }
    };

    return (
      <div className={cn('flex flex-col gap-1.5', className)}>
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
        )}
        <Select
          value={value}
          defaultValue={defaultValue}
          onValueChange={onValueChange}
          disabled={disabled}
          onOpenChange={handleOpenChange}
          {...props}
        >
          <SelectTrigger
            ref={ref}
            size={size}
            state={state}
            disabled={disabled}
            isLoading={isLoading}
            showClear={!!value && !disabled}
            onClear={handleClear}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent
            showSearch={showSearch}
            searchPlaceholder={searchPlaceholder}
            onSearchChange={handleSearchChange}
          >
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <SelectItem key={item.value} value={item.value} disabled={item.disabled}>
                  {item.label}
                </SelectItem>
              ))
            ) : (
              <div className="py-6 text-center text-sm text-muted-foreground">No results found</div>
            )}
          </SelectContent>
        </Select>
        {error && <p className="text-sm text-destructive">{error}</p>}
        {helperText && !error && <p className="text-sm text-muted-foreground">{helperText}</p>}
      </div>
    );
  }
);
SelectField.displayName = 'SelectField';

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
  SelectField,
};
