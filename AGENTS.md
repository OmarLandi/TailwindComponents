# AGENTS.md - Development Guide for AI Agents

This file provides guidelines and commands for AI coding agents working in this repository.

---

## Project Overview

- **Type**: React Component Library (UI Components)
- **Framework**: React 18+ with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui patterns
- **Build Tool**: Vite
- **Testing**: Vitest + Testing Library + axe-core (accessibility)
- **Storybook**: For component documentation and testing

---

## Commands

### Development

```bash
npm run dev           # Start Storybook on port 6006
npm run build         # Build library (TypeScript + Vite)
npm run preview       # Preview built library
```

### Testing

```bash
npm test              # Run tests in watch mode
npm run test:run      # Run tests once
npm run test:coverage # Run tests with coverage report
```

**Run a single test file:**

```bash
npx vitest run tests/Button.test.tsx
# or
npm test -- tests/Button.test.tsx
```

**Run a single test:**

```bash
npx vitest run -t "renders button with children"
```

### Linting & Formatting

```bash
npm run lint          # Run ESLint
npm run lint:fix      # Fix ESLint issues automatically
npm run format        # Format code with Prettier
```

### Release

```bash
npm run release       # Create release (requires GitHub token)
npm run release:dry   # Dry run for release
```

---

## Code Style Guidelines

### Formatting (Prettier)

- **Semi**: true
- **Single Quote**: true
- **Tab Width**: 2
- **Trailing Comma**: es5
- **Print Width**: 100
- **Arrow Parens**: avoid

### ESLint Rules

- React hooks rules enforced (rules-of-hooks: error, exhaustive-deps: warn)
- No prop-types needed (disabled)
- Unused vars trigger warnings (except vars starting with `_`)
- No React import required (JSX runtime is automatic)

### TypeScript

- Use `type` for primitives, unions, and type aliases
- Use `interface` for object shapes and component props
- Always define return types for complex functions
- Use `React.forwardRef` with generic type for refs

### Imports

```typescript
// Order (use ESLint auto-fix):
// 1. React imports
// 2. External libraries
// 3. Internal components/utils (use @/ alias)
// 4. Relative imports

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/Button';
```

### Naming Conventions

- **Components**: PascalCase (e.g., `Button`, `TextField`)
- **Files**: PascalCase for components (e.g., `Button.tsx`), camelCase for utils
- **Props interfaces**: ComponentNameProps (e.g., `ButtonProps`)
- **Variants**: Use CVA (class-variance-authority) with camelCase variant names
- **CSS Classes**: Tailwind utility classes, kebab-case when custom

### Component Structure

```typescript
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// 1. Define variants with CVA
const buttonVariants = cva('base classes', {
  variants: {
    variant: { default: '...', outline: '...' },
    size: { sm: '...', default: '...', lg: '...' },
  },
  defaultVariants: { variant: 'default', size: 'default' },
});

// 2. Define props interface
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  // Additional props
}

// 3. Create component with forwardRef
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

// 4. Export
export { Button, buttonVariants };
```

### Error Handling

- Use try/catch for async operations
- Provide user-friendly error messages
- Log errors appropriately for debugging

### Accessibility (a11y)

- Always include proper ARIA attributes
  HTML elements
  -- Use semantic Test with axe-core (included in tests)
- Support keyboard navigation
- Include focus states (handled by Tailwind defaults)

---

## Testing Guidelines

### Test File Structure

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { Button } from '../src/components/Button';

describe('Button', () => {
  // Unit tests
  it('renders button with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  // Accessibility tests
  it('should have no accessibility violations', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
```

### Test Conventions

- One `describe` block per component
- Use descriptive test names
- Test variants, sizes, states (loading, disabled)
- Test accessibility attributes
- Always run axe-core accessibility tests

---

## Git Conventions

### Commit Messages (commitlint)

Follow Conventional Commits:

```
feat: add new Button component
fix: resolve TextField focus issue
docs: update README
refactor: simplify Select logic
test: add tests for DropdownMenu
chore: update dependencies
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`

---

## Creating New Components

1. Create component folder in `src/components/ComponentName/`
2. Create `ComponentName.tsx` with CVA variants and forwardRef
3. Export component and variants
4. Add tests in `tests/ComponentName.test.tsx`
5. Add Storybook story in `stories/ComponentName.stories.tsx`
6. Export from `src/index.ts`

### Theming for New Components

When creating a new component, follow these theming rules:

- **Use Tailwind CSS variable utilities**: `bg-background`, `text-foreground`, `border-border`, `bg-primary`, etc. NEVER hardcode colors.
- **Define CVA variants with theme variables**: All variant classes must reference CSS variables (e.g., `bg-primary text-primary-foreground` for default variant).
- **Background/surface variants**: Use `bg-card`, `bg-muted`, `bg-accent` for different surface levels.
- **Text variants**: Use `text-foreground`, `text-muted-foreground`, `text-primary`, `text-destructive`.
- **Border**: Use `border-border` or `border-input` for borders, never hardcoded colors.
- **Focus ring**: Always include `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`.
- **Disabled state**: Add `disabled:opacity-50 disabled:pointer-events-none`.
- **Transitions**: Use `transition-colors` for color changes.
- **Do NOT hardcode**: Never use literal hex/rgb values that would break when the palette or color mode changes.

---

## Dependencies

### Peer Dependencies (must be installed by consumer)

- react (^18.3.0)
- react-dom (^18.3.0)
- @radix-ui/react-slot (^1.1.0)

### Key Dependencies

- tailwindcss, tailwind-merge, clsx (styling)
- class-variance-authority (variants)
- lucide-react (icons)
- @radix-ui/\* (headless components)

---

## Theming Architecture

This library uses a **CSS-variables-first theming system** inspired by shadcn/ui. The ThemeProvider is optional — themes work via pure CSS cascade. ThemeProvider adds convenience (dark/light toggle, palette switching, localStorage persistence, `useTheme` hook).

### Architecture Overview

```
defaultTheme.ts ──► ThemeProvider ──► injects CSS vars into <style id="theme-provider-style">
palettes.ts    ──► ThemeProvider ──► adds class "theme-{palette}" to wrapper <div>
                                                    │
                          tailwind.config.cjs ──► hsl(var(--background))
                                                         │
                                                    Component uses: bg-background, text-foreground, etc.
```

1. **Source of truth**: `defaultTheme.ts` and `palettes.ts` define colors (as `hsl(...)` values), typography, radii, shadows, spacing
2. **ThemeProvider** generates CSS variables and appends a `<style>` element to `<head>`. The `applyThemeToRoot` function converts each theme property to a CSS variable, **stripping the `hsl()` wrapper** so variables store raw HSL values (e.g., `--background: 0 0% 100%`)
3. **Tailwind config** maps CSS variables to utility classes via `hsl(var(--background))`
4. **Components** use Tailwind utility classes like `bg-background`, `text-foreground`, `border-border`

### CSS Variable Naming Convention

| Theme key                  | CSS variable           | Example value                 |
| -------------------------- | ---------------------- | ----------------------------- |
| `colors.background`        | `--background`         | `0 0% 100%` (raw HSL)         |
| `colors.primary`           | `--primary`            | `222.2 47.4% 11.2%` (raw HSL) |
| `colors.primaryForeground` | `--primary-foreground` | `210 40% 98%` (raw HSL)       |
| `colors.chart.1`           | `--chart-1`            | `12 76% 61%` (raw HSL)        |
| `typography.fonts.body`    | `--font-body`          | `system-ui, ...`              |
| `typography.fontSizes.sm`  | `--text-sm`            | `0.875rem`                    |
| `radii.md`                 | `--radius-md`          | `0.5rem`                      |
| `shadows.md`               | `--shadow-md`          | `0 4px 6px -1 rgb(...)`       |
| `radius`                   | `--radius`             | `0.5rem`                      |

> **IMPORTANT**: CSS variables store **raw HSL values** (without the `hsl()` wrapper). The wrapper is applied by Tailwind's config (`'hsl(var(--background))'`). If you store `hsl(...)` in the variable, it becomes `hsl(hsl(...))` which is invalid.

### ThemeProvider Props

```typescript
interface ThemeProviderProps {
  colorMode?: 'light' | 'dark'; // Default: 'light'
  defaultPalette?: PaletteName; // Default: 'neutral'
  defaultTheme?: Partial<Theme>; // Override individual theme values
  storageKey?: string; // localStorage key (default: 'theme-color-mode')
  disableTransitionOnChange?: boolean; // Disable CSS transitions on theme switch
  children: React.ReactNode;
}
```

#### How it works

1. Wraps children in `<div class="{colorMode} theme-{defaultPalette}">` — this enables both dark/light mode and palette CSS class overrides
2. Generates CSS variables from the merged theme (base + palette + custom override) and injects them into `<head>` as a `<style>` element scoped to `.${colorMode}`
3. Reads initial color mode from localStorage (key: `storageKey`), falls back to `colorMode` prop
4. Exposes `useTheme()` hook with `theme`, `colorMode`, `setColorMode`, `toggleColorMode`, `setTheme`

```tsx
// Minimal usage — just enables dark mode + default palette
<ThemeProvider>
  <App />
</ThemeProvider>

// With custom palette and color mode
<ThemeProvider defaultPalette="violet" colorMode="dark">
  <App />
</ThemeProvider>

// Override specific theme values
<ThemeProvider defaultTheme={{ radius: '1rem', shadows: { md: '0 0 10px rgba(0,0,0,0.1)' } }}>
  <App />
</ThemeProvider>
```

### ThemeToggle

`ThemeToggle` is a button that toggles between **light** and **dark** color mode only. It does NOT change the palette. The palette is selected via `ThemeProvider.defaultPalette`.

```tsx
<ThemeProvider defaultPalette="violet">
  <ThemeToggle /> {/* Toggles light/dark mode */}
</ThemeProvider>
```

Props:

- `variant`: `'default'` | `'ghost'` | `'outline'`
- `size`: `'xs'` | `'sm'` | `'default'` | `'lg'`
- `value`: `'light'` | `'dark'` — controlled mode (overrides context)
- `onChange`: callback when toggled
- `useContext`: if `false`, ignores ThemeProvider context (uses `value` prop directly)

### useTheme Hook

```typescript
const { theme, colorMode, setColorMode, toggleColorMode, setTheme } = useTheme();
```

- `theme`: Full `Theme` object (colors, typography, spacing, radii, shadows, transition)
- `colorMode`: Current `'light'` or `'dark'`
- `setColorMode(mode)`: Switch mode and persist to localStorage
- `toggleColorMode()`: Toggle light/dark
- `setTheme(partialTheme)`: Merge partial theme overrides at runtime

```tsx
function MyComponent() {
  const { theme, colorMode, setColorMode } = useTheme();
  return (
    <div>
      <p>Current mode: {colorMode}</p>
      <p>Primary color (hsl): {theme.colors.primary}</p>
      <button onClick={() => setColorMode('dark')}>Dark mode</button>
    </div>
  );
}
```

> **Note**: For most components, you should NOT need `useTheme`. Simply use Tailwind utility classes (`bg-background`, `text-foreground`). Only use `useTheme` when you need to read theme values in JS (e.g., charts, dynamic styles).

### Available Palettes

| Palette   | Description          |
| --------- | -------------------- |
| `neutral` | Classic neutral gray |
| `stone`   | Warm earthy tones    |
| `zinc`    | Modern blue-gray     |
| `slate`   | Cool blue-gray       |
| `violet`  | Vibrant purple       |
| `rose`    | Elegant pink         |
| `orange`  | Energetic orange     |
| `emerald` | Fresh green          |
| `blue`    | Professional blue    |
| `red`     | Intense red          |
| `indigo`  | Deep indigo          |
| `amber`   | Warm amber           |
| `cyan`    | Fresh cyan           |

Each palette has both `light` and `dark` color schemes.

### Adding a New Palette

1. Add the palette to `src/components/Themes/palettes.ts`:

```typescript
export const palettes: Record<string, ColorPalette> = {
  // ... existing palettes
  mypalette: {
    name: 'mypalette',
    description: 'My custom palette',
    colors: {
      light: {
        background: 'hsl(0 0% 100%)',
        foreground: 'hsl(0 0% 10%)',
        primary: 'hsl(200 80% 45%)',
        // ... all ThemeColors fields
      },
      dark: {
        background: 'hsl(200 30% 8%)',
        // ... all ThemeColors fields
      },
    },
  },
};
```

2. Add the `PaletteName` type in `src/components/Themes/types.ts` if it's not automatically inferred.

3. Add the palette class in `src/index.css` following the pattern:

```css
.theme-mypalette {
  --background: 0 0% 100%;
  --foreground: 0 0% 10%;
  --primary: 200 80% 45%;
  ...
}
.dark .theme-mypalette {
  --background: 200 30% 8%;
  ...
}
```

4. Add to the `safelist` in `tailwind.config.cjs`:

```js
safelist: ['theme-mypalette', ...]
```

### How Components Should Consume the Theme

Components MUST use **Tailwind utility classes** that reference the theme CSS variables:

```tsx
// ✅ CORRECT: Uses CSS variables via Tailwind
<div className="bg-background text-foreground border-border">
  <button className="bg-primary text-primary-foreground hover:bg-primary/80">
    Click me
  </button>
</div>

// ❌ WRONG: Hardcoding colors breaks theming
<div style={{ backgroundColor: '#fff', color: '#000' }}>
  ...
</div>
```

#### CVA Variant Pattern (shadcn/ui)

All component variants should use Tailwind classes referencing theme variables:

```typescript
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
    },
  }
);
```

Key CSS variable utility classes for components:

| Purpose             | Tailwind Class                       | CSS Variable           |
| ------------------- | ------------------------------------ | ---------------------- |
| Page background     | `bg-background`                      | `--background`         |
| Page text           | `text-foreground`                    | `--foreground`         |
| Primary button bg   | `bg-primary`                         | `--primary`            |
| Primary button text | `text-primary-foreground`            | `--primary-foreground` |
| Card/surface bg     | `bg-card`                            | `--card`               |
| Card text           | `text-card-foreground`               | `--card-foreground`    |
| Muted text          | `text-muted-foreground`              | `--muted-foreground`   |
| Border              | `border-border`, `border-input`      | `--border`, `--input`  |
| Focus ring          | `ring-ring`                          | `--ring`               |
| Destructive         | `bg-destructive`                     | `--destructive`        |
| Success             | `bg-success text-success-foreground` | `--success`            |
| Warning             | `bg-warning text-warning-foreground` | `--warning`            |
| Info                | `bg-info text-info-foreground`       | `--info`               |
| Neutral             | `bg-neutral text-neutral-foreground` | `--neutral`            |
| Border radius       | `rounded-sm/md/lg`                   | `--radius` calc        |
| Muted background    | `bg-muted`                           | `--muted`              |

### Replacing `@/lib/utils` Usage

The `@/lib/utils` is aliased to `src/lib/utils.ts` via Vite/TypeScript path aliases. All components import `cn` from `@/lib/utils` for merging Tailwind classes.

If you need to access `useTheme` from a non-component directory, import from the relative path or from `@/components/Themes/useTheme`.

---

## Available Skills

Global OpenCode skills are available in `~/.config/opencode/skills/`:

- javascript-senior
- react-senior
- typescript-senior
- nextjs-senior
- vuejs-senior
- nestjs-senior
- express-senior
- mongodb-senior
- css-senior
- ui-designer
- web-security
- ai-engineering
