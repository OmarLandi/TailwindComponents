import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Moon, Sun } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useTheme } from './useTheme';

const themesVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        outline:
          'border-2 border-primary bg-background hover:bg-primary hover:text-primary-foreground',
      },
      size: {
        default: 'h-10 w-10',
        sm: 'h-8 w-8',
        lg: 'h-12 w-12',
        xs: 'h-6 w-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ThemeToggleProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'>,
    VariantProps<typeof themesVariants> {
  /**
   * Current theme value. If not provided, uses ThemeProvider context.
   */
  value?: 'light' | 'dark';
  /**
   * Callback when theme changes.
   */
  onChange?: (value: 'light' | 'dark') => void;
  /**
   * If true, uses the ThemeProvider context. If false or no provider, uses value prop.
   * @default true
   */
  useContext?: boolean;
}

const ThemeToggle = React.forwardRef<HTMLButtonElement, ThemeToggleProps>(
  ({ className, variant, size, value: valueProp, onChange, useContext = true, ...props }, ref) => {
    const themeContext = useTheme();
    const hasProvider = themeContext !== undefined;

    const isControlled = valueProp !== undefined;
    const isDark = isControlled ? valueProp === 'dark' : themeContext?.colorMode === 'dark';

    const handleClick = () => {
      const newValue = isDark ? 'light' : 'dark';
      if (hasProvider && useContext) {
        themeContext.toggleColorMode();
      }
      onChange?.(newValue);
    };

    return (
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        className={cn(themesVariants({ variant, size, className }), 'relative overflow-hidden')}
        onClick={handleClick}
        ref={ref}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        {...props}
      >
        <Sun
          className={cn(
            'absolute h-[1.2rem] w-[1.2rem] transition-all duration-200',
            isDark ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
          )}
          aria-hidden="true"
        />
        <Moon
          className={cn(
            'absolute h-[1.2rem] w-[1.2rem] transition-all duration-200',
            isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
          )}
          aria-hidden="true"
        />
      </button>
    );
  }
);
ThemeToggle.displayName = 'ThemeToggle';

export { ThemeToggle, themesVariants };
