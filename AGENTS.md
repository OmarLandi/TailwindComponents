# AGENTS.md - Development Guide for AI Agents

This file provides guidelines and commands for AI coding agents working in this repository.

---

## Purpose and Scope

This library exists to **compose any modern web page or view** â€” not just isolated
primitives. Every component must be:

- **Customizable**: semantic theme tokens, CVA variants, `className`/`ref`, `asChild`
  where composition makes sense, and no hardcoded colors or page widths.
- **Responsive**: mobile-first from 320 px to 1536 px, fluid layouts, touch targets
  â‰¥ 44 px, `dvh` and safe-area support. No horizontal page scroll.
- **Accessible**: WCAG 2.2 AA, semantic HTML, full keyboard support, visible focus,
  contrast 4.5:1 (3:1 for large text/UI), `prefers-reduced-motion`, RTL-ready.
- **Composable into layouts**: primitives (`Stack`, `Grid`, `Section`, `PageHeader`,
  `AppShell`, `Prose`, `SkipLink`) plus page templates for App Shell/Dashboard, Auth,
  Settings, Marketing, Docs, E-commerce/List-Detail, CRUD/Data and view states.

The page models, breakpoints and variant matrix live in [`docs/layouts.md`](./docs/layouts.md).
The current gaps and prioritized plan live in [`docs/component-audit.md`](./docs/component-audit.md).
Use the **`crear-layout`** skill when composing pages or layout primitives.

---

## Project Overview

- **Type**: React Component Library (UI Components) â€” 102 components + layout layer
- **Framework**: React 19 with TypeScript 6.0 (strict); peers accept React 18.3+ or 19
- **Styling**: Tailwind CSS 4 + CSS variables, shadcn/ui patterns
- **Variants**: `class-variance-authority` (CVA); primitives from Radix UI
- **Build Tool**: Vite 8 (`vite-plugin-dts`, ESM + CJS)
- **Testing**: Vitest 5 + Testing Library + `axe-core` (accessibility) on jsdom 30
- **Documentation**: Storybook 10 (CSF 3) on port `6006`
- **Package manager**: npm (lockfile: `package-lock.json`)

### Verified status (last analysis)

| Check              | Command            | Result                        |
| ------------------ | ------------------ | ----------------------------- |
| Tests              | `npm run test:run` | 104 files / 520 tests passing |
| Templates E2E      | `npm run test:e2e` | 33 Playwright cases passing   |
| Type check         | `npx tsc --noEmit` | No errors                     |
| Components on disk | —                  | 102 + `Themes`                |
| Palettes           | â€”                | 13 (light + dark)             |

> âš ï¸ 43 component folders exist on disk but are **untracked in git** (`git status` shows `??`). Do not assume `git ls-files` is the full inventory.

### Component inventory

- **Navigation (8)**: Breadcrumb, Command, Menubar, Navbar, NavigationMenu, Pagination, Sidebar, Tabs
- **Forms (22)**: Button, Checkbox, Combobox, Composer, DatePicker, DateRangePicker, Field, FileUpload, Form, InputOTP, MultiSelect, NumberInput, PasswordInput, RadioGroup, SearchInput, Select, Slider, Switch, Textarea, TextField, TimePicker, ToggleGroup
- **Data Display (62)**: Accordion, Alert, AlertDialog, Article, AuthorBio, Avatar, Badge, BottomSheet, BreakingNewsBanner, Calendar, Card, CartItem, CartSummary, Carousel, Chart, CheckoutStepper, Collapsible, Comment, CommentThread, Container, Dialog, Drawer, DropdownMenu, EmptyState, ErrorBoundary, ErrorState, FeedPost, Footer, HoverCard, NotificationItem, Popover, Price, ProductCard, ProfileHeader, Progress, Rating, ReactionBar, Review, Skeleton, Stat, StockBadge, StoryCarousel, SuggestionList, Table, Timeline, Toast, Toolbar, Tooltip, TreeView
- **Utilities (6)**: DirectionProvider, Palette, ThemeProvider, ThemeScript, ThemeToggle, Toaster
- **Layout (11)**: AppShell, AspectRatio, Grid, PageHeader, Prose, ScrollArea, Section, Separator, SkipLink, Stack, VisuallyHidden

All folders live in `src/components/<Name>/` and are re-exported from `src/components/index.ts`.
Page templates live in `stories/templates/` and are documented, not shipped as components.

---

## Commands

### Development

```bash
npm run dev             # Start Storybook on port 6006
npm run build           # Build library (tsc + vite)
npm run build-storybook # Static Storybook build
npm run preview         # Preview built library
```

### Testing

```bash
npm test              # Run tests in watch mode
npm run test:run      # Run tests once
npm run test:coverage # Run tests with coverage report
npm run test:e2e      # Run Playwright template tests
npm run test:e2e:update # Refresh Playwright screenshot baselines
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

- Use semantic HTML first; add ARIA only when the semantics are insufficient.
- Every interactive element must be keyboard-operable and have an accessible name.
- Every new component needs at least one `axe.run(container)` test (see Testing).
- Include visible focus states (`focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`).
- Radix `Dialog`/`Drawer` require `DialogTitle` and either `DialogDescription` or `aria-describedby={undefined}`.
- See `docs/accessibility.md` for the full checklist.

### Component Categories

When creating a new component, assign it to one of the following Storybook categories:

| Category           | Description                              | Existing Components                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------ | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Navigation (8)** | Navigation and user movement             | `Breadcrumb`, `Command`, `Menubar`, `Navbar`, `NavigationMenu`, `Pagination`, `Sidebar`, `Tabs`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **Forms**          | Data input and selection                 | `Button`, `Checkbox`, `Combobox`, `Composer`, `DatePicker`, `DateRangePicker`, `Field`, `FileUpload`, `Form`, `InputOTP`, `MultiSelect`, `NumberInput`, `PasswordInput`, `RadioGroup`, `SearchInput`, `Select`, `Slider`, `Switch`, `Textarea`, `TextField`, `TimePicker`, `ToggleGroup`                                                                                                                                                                                                                                                                                                                                                           |
| **Data Display**   | Content visualization and presentation   | `Accordion`, `Alert`, `AlertDialog`, `Article`, `AuthorBio`, `Avatar`, `Badge`, `BottomSheet`, `BreakingNewsBanner`, `Calendar`, `Card`, `CartItem`, `CartSummary`, `Carousel`, `Chart`, `CheckoutStepper`, `Collapsible`, `Comment`, `CommentThread`, `Container`, `Dialog`, `Drawer`, `DropdownMenu`, `EmptyState`, `ErrorBoundary`, `ErrorState`, `FeedPost`, `Footer`, `HoverCard`, `NotificationItem`, `Popover`, `Price`, `ProductCard`, `ProfileHeader`, `Progress`, `Rating`, `ReactionBar`, `Review`, `Skeleton`, `Stat`, `StockBadge`, `StoryCarousel`, `SuggestionList`, `Table`, `Timeline`, `Toast`, `Toolbar`, `Tooltip`, `TreeView` |
| **Layout**         | Distribution, spacing and page structure | `AppShell`, `AspectRatio`, `Grid`, `PageHeader`, `Prose`, `ScrollArea`, `Section`, `Separator`, `SkipLink`, `Stack`, `VisuallyHidden`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **Utilities**      | Infrastructure and system utilities      | `DirectionProvider`, `Palette`, `ThemeProvider`, `ThemeScript`, `ThemeToggle`, `Toaster`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **Templates**      | Full-page compositions (stories only)    | `Dashboard`, `Auth`, `Settings`, `Marketing`, `Docs`, `Ecommerce`, `ListDetail`, `CRUD`, `States`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

**Rules:**

- If a component does not fit into any existing category, create a new descriptive category.
- Update this table when a new category is added.
- The `title` in the `.stories.tsx` file must follow the format: `'Category/ComponentName'`.
  Templates use `'Templates/<Name>'` and `parameters.layout: 'fullscreen'`.
- Do not count planned primitives in the verified inventory until they exist on disk.

### Responsive and Layout Contract

- **Mobile-first**: base styles target 320 px; add columns/regions at `sm`, `md`, `lg`, `xl`.
  Never start from a desktop layout and hide it on mobile.
- **Widths are semantic**: use `form` (28â€“32rem), `prose` (65ch), `content` (64rem),
  `wide` (80rem) or `full`; no `w-[1200px]` or fixed page widths.
- **One page scroll**: page scrolls vertically; only tables/code scroll horizontally inside a
  focusable region. No horizontal page scroll.
- **Viewport units**: use `min-h-dvh` (not `h-screen`) and `env(safe-area-inset-*)` in fixed
  bars/overlays.
- **Overlays**: `max-h-[85dvh]` + internal scroll; long selectors may become bottom sheets.
- **Hidden content is not focusable**: render conditionally or use `hidden`/`inert`; never
  `opacity-0`/`max-h-0` with links still tabbable.
- **Touch targets** â‰¥ 44Ã—44 px (visual size may be smaller only with padding/hit area).
- **Page models**: follow [`docs/layouts.md`](./docs/layouts.md) (App Shell, Auth, Settings,
  Marketing, Docs, E-commerce/List-Detail, CRUD, States). Use the `crear-layout` skill.

### Accessibility Contract

- WCAG 2.2 AA: semantic HTML first, ARIA only when needed, one `<main>` and one `<h1>` per page.
- Keyboard: every interaction reachable and operable; Escape closes overlays; focus returns to
  the trigger; modals trap focus and lock scroll.
- Visible focus on every interactive element: `focus-visible:ring-2 focus-visible:ring-ring
focus-visible:ring-offset-2 focus-visible:ring-offset-background`.
- Accessible names for all controls; icons decorative use `aria-hidden="true"`; icon-only
  buttons require `aria-label`.
- Errors: `aria-invalid`, `aria-describedby` connecting helper/error IDs, `role="alert"` for
  dynamic errors. Labels always use `htmlFor` + `id`.
- Contrast: 4.5:1 normal text, 3:1 large text/UI. Do not assume a palette is valid; test it.
- Motion: honor `prefers-reduced-motion` (`motion-reduce:animate-none`,
  `motion-reduce:transition-none`).
- RTL: use logical properties/utilities (`ms-*`, `me-*`, `start-*`, `end-*`, `text-start`);
  avoid `left/right`, `pl/pr`, `space-x`, `translate-x`.
- Portals: audit the rendered overlay with `axe.run(document.body)` (or the portal container),
  not only the story container.

### Customization Contract

- Colors, radii, shadows and typography come from theme variables; no literal hex/rgb or
  palette-specific Tailwind colors (`bg-blue-500`).
- `className` is merged last via `cn()`; `ref` is forwarded; `asChild` must apply classes/props
  to the consumer element (no extra wrapper).
- Variants are typed with CVA; do not add a variant that only changes a color literal.
- Every component works in light/dark and with at least 3 palettes.

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

1. Create the folder `src/components/ComponentName/`.
2. Create `ComponentName.tsx` with CVA variants + `forwardRef` + `displayName`; make it
   mobile-first, keyboard-operable and theme-token-only.
3. Create `ComponentName/index.ts` exporting the component, variants and prop types.
4. Add `export * from './ComponentName';` to `src/components/index.ts` (the barrel; `src/index.ts` only re-exports `./components`).
5. Add tests in `tests/ComponentName.test.tsx` (including `axe.run` and keyboard coverage).
6. Add a story in `stories/ComponentName.stories.tsx` with `title: '<Category>/ComponentName'`,
   `args`, viewport coverage and a `Mobile` story when layout changes.
7. Verify at 375/768/1280 px: no horizontal page scroll, visible focus, targets â‰¥44 px,
   reduced motion and RTL if applicable.
8. Verify: `npx tsc --noEmit`, `npm run test:run`, `npm run lint`.
9. Update `docs/CHANGELOG.md`; add `docs/layouts.md` updates if you add a layout primitive.

> Use the project skill **`crear-componente`** (`.opencode/skills/crear-componente/SKILL.md`) for the full workflow, templates and checklist. For pages and distribution use **`crear-layout`**. The legacy prompt `prompts/create-component.md` is still valid for conversational use.

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

- react (^18.3.0 || ^19.0.0)
- react-dom (^18.3.0 || ^19.0.0)
- @radix-ui/react-slot (^1.1.0)

### Key Dependencies

- tailwindcss 4 + @tailwindcss/postcss, tailwind-merge 3, clsx (styling)
- class-variance-authority (variants)
- lucide-react 1.x (icons; brand glyphs are inlined because 1.x removed them)
- @radix-ui/\* (headless components, including `react-alert-dialog`)
- cmdk (accessible command menu/search)
- tw-animate-css (replaces `tailwindcss-animate`, which is Tailwind 3 only)

---

## Theming Architecture

This library uses a **CSS-variables-first theming system** inspired by shadcn/ui. The ThemeProvider is optional â€” themes work via pure CSS cascade. ThemeProvider adds convenience (dark/light toggle, palette switching, localStorage persistence, `useTheme` hook).

### Architecture Overview

```
defaultTheme.ts â”€â”€â–º ThemeProvider â”€â”€â–º injects CSS vars into <style id="theme-provider-style">
palettes.ts    â”€â”€â–º ThemeProvider â”€â”€â–º adds class "theme-{palette}" to wrapper <div>
                                                    â”‚
                          tailwind.config.cjs â”€â”€â–º hsl(var(--background))
                                                         â”‚
                                                    Component uses: bg-background, text-foreground, etc.
```

1. **Source of truth**: `defaultTheme.ts` and `palettes.ts` define colors (as `hsl(...)` values), typography, radii, shadows, spacing
2. **ThemeProvider** generates CSS variables and appends a `<style id="theme-provider-style">` element to `<head>`. The `applyThemeToRoot` function converts each theme property to a CSS variable, **stripping the `hsl()` wrapper** so variables store raw HSL values (e.g., `--background: 0 0% 100%`)
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

> â„¹ï¸ **Palette switching**: `ThemeProvider` emits `.${colorMode}.theme-${palette} { ... }` with raw HSL, and the `.theme-*` blocks in `src/index.css` follow the same rule. Portals are themed through `PortalContainerProvider` (a body-level node carrying the mode/palette classes) and `usePortalContainer`. `applyToRoot` is the opt-in for applying the theme to `<html>` (third-party portals).

### ThemeProvider Props

```typescript
interface ThemeProviderProps {
  colorMode?: 'light' | 'dark'; // Default: 'light'
  defaultPalette?: PaletteName; // Default: 'neutral'
  defaultTheme?: DeepPartial<Theme>; // Deep-merged overrides
  storageKey?: string; // localStorage key (default: 'theme-color-mode')
  disableTransitionOnChange?: boolean; // Disable CSS transitions on theme switch
  applyToRoot?: boolean; // Apply classes + vars to <html> (global, opt-in)
  children: React.ReactNode;
}
```

#### How it works

1. Wraps children in `<div class="{colorMode} theme-{defaultPalette}">` â€” this enables both dark/light mode and palette CSS class overrides
2. Generates CSS variables from the merged theme (base + palette + custom override) and injects them into `<head>` as a `<style>` element scoped to `.${colorMode}.theme-${palette}`
3. Creates a body-level portal container with the same classes and exposes it via `PortalContainerProvider`/`usePortalContainer`, so Radix overlays inherit the active theme
4. With `applyToRoot`, also applies the classes and variables to `document.documentElement` (restores the previous values on unmount)
5. Reads initial color mode from localStorage (key: `storageKey`), falls back to `colorMode` prop
6. Exposes `useTheme()` hook with `theme`, `colorMode`, `setColorMode`, `toggleColorMode`, `setTheme`

```tsx
// Minimal usage â€” just enables dark mode + default palette
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
- `value`: `'light'` | `'dark'` â€” controlled mode (overrides context)
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

3. Add the palette class in `src/index.css` following the pattern (**raw HSL, no `hsl()` wrapper**):

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

5. Add the option to the `palette` toolbar in `.storybook/preview.tsx`.

> Do not use `[data-theme='...']` selectors: `ThemeProvider` applies `.theme-{palette}` classes.

### How Components Should Consume the Theme

Components MUST use **Tailwind utility classes** that reference the theme CSS variables:

```tsx
// âœ… CORRECT: Uses CSS variables via Tailwind
<div className="bg-background text-foreground border-border">
  <button className="bg-primary text-primary-foreground hover:bg-primary/80">
    Click me
  </button>
</div>

// âŒ WRONG: Hardcoding colors breaks theming
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

Project skills live in `.opencode/skills/<name>/SKILL.md` and are auto-discovered by opencode. Load them with the `skill` tool when the task matches.

| Skill              | Use when                                                                 |
| ------------------ | ------------------------------------------------------------------------ |
| `crear-componente` | Creating a new component end-to-end (code, export, story, tests).        |
| `crear-layout`     | Composing pages/templates, responsive distribution or layout primitives. |
| `theming`          | Touching colors, CSS variables, palettes, `ThemeProvider` or dark mode.  |
| `testing-a11y`     | Writing or fixing Vitest / Testing Library / `axe-core` tests.           |
| `storybook`        | Creating or fixing stories, viewports, controls, docs or theme toolbar.  |
| `revision-calidad` | Reviewing a component/PR or running the quality gate before commit.      |

> Skills are loaded when opencode starts. After creating or editing a `SKILL.md`, restart opencode for the changes to take effect. Global skills (if installed) live in `~/.config/opencode/skills/`; do not document here skills that are not actually installed.

---

## Lessons Learned & Best Practices

These guidelines were distilled from a comprehensive codebase analysis and should be followed for future components:

### Accessibility Checklist for All Components

- **Labels must have `htmlFor`**: Every `<label>` element must use `htmlFor` pointing to the associated input's `id` (e.g., `DatePicker`, `SelectField`)
- **RadioGroups**: Use `<fieldset>` with `<legend>` (never `<p>` outside) for semantic grouping
- **Sidebar groups**: Use semantic headings (`<h2>`/`<h3>`) for navigation group labels, not `<p>`
- **Decorative elements**: Add `aria-hidden="true"` to skeleton loaders, overlays, and purely decorative elements
- **Error boundaries**: Use `aria-live="assertive"` on the error container, and reuse `buttonVariants` (or the `Button` component) instead of duplicating button classes
- **Error state announcement**: Always use `role="alert"` on dynamic error messages
- **Hidden content**: Never leave `opacity-0`/`max-h-0`/off-canvas links focusable; use `hidden`, `inert` or conditional rendering
- **Modals**: Focus trap, Escape, scroll lock and focus return; mobile nav must be modal, not a CSS-only collapse
- **Touch**: Interactive targets â‰¥ 44Ã—44 px, including icon buttons and overlay close buttons
- **Motion**: Add `motion-reduce:animate-none`/`motion-reduce:transition-none` to every animation
- **RTL**: Use logical utilities (`ms-*`, `me-*`, `start-*`, `end-*`); avoid `left/right`, `pl/pr`, `space-x`, `translate-x`

### Storybook Best Practices

- **Always use args**: Every story should use `args` for props so the Controls panel works. Avoid raw `render()` functions that hardcode content.
- **Meta type**: Always use `Meta<typeof ComponentName>` (never bare `Meta`)
- **Story type**: Use `StoryObj<typeof ComponentName>` (never `StoryObj<typeof meta.component>`)
- **Import types correctly**: Import `PaletteName` from `palettes.ts`, not `ThemePaletteName` re-exports
- **Theme in stories**: Prefer Tailwind classes (`bg-background text-foreground`) over hardcoded colors/styles. Remove unnecessary `<ThemeProvider>` wrappers from individual stories (preview.tsx handles it globally)
- **Variant stories**: Start with a `Playground` story driven by `args`; add named stories for meaningful states (e.g., `Disabled`, `Loading`, `WithIcons`). Variants/sizes should remain `select` controls in `argTypes`.
- **Viewports**: Use the viewport toolbar/stories to verify 375, 768 and 1280 px. Add a `Mobile` story when layout changes.
- **Templates**: Use `title: 'Templates/<Name>'` and `parameters.layout: 'fullscreen'`; do not wrap them in the padded decorator.
- **No fixed widths**: Replace `w-[300px]`/`w-[350px]` in stories with `max-w-*` or a container.

### Component Code Quality

- **displayName**: Always set `Component.displayName` after every `React.forwardRef` call
- **CVA**: Only use `cva()` when you have actual variants â€” if there's only one variant, use a plain string constant
- **Avoid redundant defaults**: If a prop has a default value (e.g., `value = 0`), don't add `|| 0` later in the code
- **Ref forwarding**: For complex ref patterns (like OTP inputs with multiple internal refs), extract the ref callback with `React.useCallback` to avoid unnecessary re-renders and fragile type casting

### Tailwind 4 gotchas

- **Config is loaded through CSS**: `src/index.css` starts with `@import 'tailwindcss'`, `@import 'tw-animate-css'` and `@config '../tailwind.config.cjs'`. Keep the legacy JS config as the single source of theme tokens until a full `@theme` migration.
- **Border color defaults to `currentColor`** in v4. `src/index.css` restores the v3 behaviour with a `@layer base` rule mapping `border-color` to `hsl(var(--border))`. Do not delete it.
- **Renamed scales**: v3 `shadow-sm` is v4 `shadow-xs` (v4 `shadow-sm` is the old `shadow`); v3 `backdrop-blur-sm` is v4 `backdrop-blur-xs`. Check every new `shadow-*`/`backdrop-blur-*` against the v4 scale.
- **`leading-*` now wins over `text-*`**: utilities render in a different order than v3, so `text-sm leading-relaxed` really uses the relaxed line-height. That is the intended typography; templates' snapshots encode it.
- **Keep `keyframes`/`animation` out of `tailwind.config.cjs`**: declarations generated from the JS config have no source file, so Vite warns that PostCSS was called without the `from` option. `tw-animate-css` already ships `--animate-accordion-down/up` and their keyframes.
- **`tailwindcss-animate` is v3 only**: use `tw-animate-css` (already imported in `src/index.css`).
- **`dev` and `build-storybook` silence `DEP0205`**: Storybook 10 still calls `module.register()`. The scripts wrap `NODE_OPTIONS=--disable-warning=DEP0205` with `cross-env`; remove it once Storybook migrates to `module.registerHooks()`.
- **No `autoprefixer`**: Tailwind 4 handles vendor prefixes; `postcss.config.cjs` only loads `@tailwindcss/postcss`.

### Testing Best Practices

- **Axe tests are mandatory**: EVERY component must have at least one axe-core accessibility test. All component test files currently include one; do not merge a component without it.
- **Keyboard navigation**: Test arrow keys (Tabs, RadioGroup, Accordion), Escape (Dialog, Drawer, Popover, Combobox), Enter/Space (Button, Checkbox, Switch, ThemeToggle)
- **Variants**: Test ALL CVA variants (not just 1-2). Use `toHaveClass` to verify the correct classes are applied.
- **Edge cases**: Always test empty state, 0/100% values, disabled state, loading state, error state
- **Interactions**: Test click/change interactions AND the reverse (close dialog, collapse accordion, hide tooltip)

---

## Known Technical Debt (verified by static analysis)

### Resolved (keep these invariants)

- **`ThemeProvider` emits valid scoped CSS**: the `<style id="theme-provider-style">` now contains `.${colorMode}.theme-${palette} { ... }`. `defaultTheme` and `setTheme` are deep-merged (via `DeepPartial<Theme>`) so partial nested overrides no longer wipe sibling tokens.
- **Palette blocks in `src/index.css` use raw HSL** (no `hsl()` wrapper) and target `.theme-*` classes; the duplicate `stone` dark block was removed.
- **`stone`** uses `.theme-stone` / `.dark .theme-stone` (no `data-theme`).
- **Build and package exports match**: `dist/index.mjs`, `dist/index.cjs` and `dist/index.css`; `package.json` exports `./style.css`, `sideEffects` includes CSS, and `src/index.ts` imports the stylesheet (no JS injection).
- **`components.json`** points to the real `tailwind.config.cjs`.
- **Portals are themed**: `ThemeProvider` renders `PortalContainerProvider`, which appends a body-level node with `${colorMode} theme-${palette}`. `Dialog`, `Drawer`, `Select`, `DropdownMenu` and `Popover` pass it to Radix via `usePortalContainer`. `applyToRoot` is the opt-in global mode for `<html>` and third-party portals.
- **No dead dev dependencies**: `@axe-core/react`, `eslint-config-prettier`, `eslint-plugin-prettier` and `lint-staged` (plus `.lintstagedrc`) were removed. Tests use `axe-core` directly, the flat ESLint config loads no Prettier plugin, and `.husky/pre-commit` runs Prettier + ESLint + `tsc` + the full test suite itself.

### Remaining

1. **43 component folders, their stories and tests are untracked in git.** Run `git status` before assuming the repo has 6 components.
2. **Radix portal tests must keep `DialogTitle`** and either `DialogDescription` or `aria-describedby={undefined}`; the P0 suite is warning-free, preserve that as new stories/tests are added.
3. **Runtime dependencies are now externalized**: the ESM build is ~250 KB / 50 KB gzip (CJS ~197 KB / 43 KB gzip, CSS ~105 KB / 17 KB gzip); Radix, `date-fns`, Embla, `react-day-picker`, `cmdk`, `lucide-react`, `clsx`, `tailwind-merge` and CVA are external. Keep the external list in sync with `package.json` dependencies.
4. **README/`docs/` were stale** (Ladle, Vue, wrong file names). They were rewritten; keep them in sync when adding components.
5. **Templates are stories only.** The nine page models live in `stories/templates/` and are
   covered by Vitest/axe plus Playwright at 375/768/1280; keep the screenshot baselines current.
6. **Contrast regressions**: `tests/contrast.test.ts` now enforces AA across 13 palettes x light/dark
   plus CSS/palette parity. Keep it green whenever tokens or palettes change.
7. **Templates are responsive-tested; other stories are not.** Playwright checks every template at
   375/768/1280 for horizontal overflow and screenshots; non-template stories still rely on the
   Storybook viewport toolbar.
8. **P0 regression tests**: Combobox keyboard/listbox, mobile Navbar/Sidebar modals, `Button asChild`,
   `Slider onValueChange`, InputOTP/Select error wiring and Table scroll focus are now covered.
   Keep those tests green; full priorities live in `docs/component-audit.md`.
9. **ESLint 10 replaced `eslint-plugin-react`**: that plugin caps at ESLint 9.7 and crashes in 10
   (`context.getFilename` was removed). The config uses `@eslint-react/eslint-plugin` with an explicit
   rule list (keys, DOM props, mutation, `dangerouslySetInnerHTML`, target blank), no React Compiler
   rules. Do not re-add `eslint-plugin-react` until it supports ESLint 10.
10. **TypeScript is pinned to 6.0.x**: `typescript-eslint` declares `typescript >=4.8.4 <6.1.0`, so TypeScript 7
    is not installable yet. TS 6 deprecated `baseUrl`, which was removed from `tsconfig.json` (`paths`
    resolves relative to the config file) and `src/vite-env.d.ts` declares the CSS side-effect import.
11. **`release-it` 21 reads `.release-it.json`** (dot file); the old `release-it.json` is ignored and made
    the CLI run npm steps. `overrides` keep `undici` on 8.x (release-it pins a vulnerable 7.29.1) and
    `basic-ftp` on 6.2.3.

## Definition of Done (new component)

- [ ] `src/components/<Name>/<Name>.tsx` with CVA (only if variants exist), `forwardRef` and `displayName`.
- [ ] `src/components/<Name>/index.ts` exports component, variants and types.
- [ ] `export * from './<Name>';` added to `src/components/index.ts`.
- [ ] Story with `title: '<Category>/<Name>'`, `tags: ['autodocs']` and `args`.
- [ ] Tests: render, variants/sizes, interactions, keyboard, disabled/loading/error, plus `axe.run`.
- [ ] No hardcoded colors; only theme utilities; `className` merged last; `ref` forwarded.
- [ ] Mobile-first at 375/768/1280 px; no horizontal page scroll; targets â‰¥44 px.
- [ ] Keyboard complete, visible focus, accessible name and error wiring (`aria-*` + IDs).
- [ ] `prefers-reduced-motion` and RTL logical utilities where motion/direction applies.
- [ ] Overlays use the themed portal container and are audited with `axe.run(document.body)`.
- [ ] `npx tsc --noEmit` clean.
- [ ] `npm run test:run` green.
- [ ] `npm run lint` clean.
- [ ] `docs/CHANGELOG.md` updated; `docs/layouts.md` updated for layout primitives.
- [ ] Conventional Commit message.
