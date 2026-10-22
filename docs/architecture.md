# Arquitectura del Proyecto

## Visión general

Librería de componentes de UI para React 18 + TypeScript, construida con Tailwind CSS, Radix UI y CVA (class-variance-authority), siguiendo los patrones de **shadcn/ui**.

| Área          | Tecnología                               |
| ------------- | ---------------------------------------- |
| UI            | React 18 + TypeScript (strict)           |
| Estilos       | Tailwind CSS 3.4 + variables CSS         |
| Variantes     | `class-variance-authority` (CVA)         |
| Primitivas    | Radix UI (`@radix-ui/react-*`)           |
| Iconos        | `lucide-react`                           |
| Build         | Vite 6 + `vite-plugin-dts`               |
| Documentación | Storybook 8 (CSF 3)                      |
| Testing       | Vitest + Testing Library + `axe-core`    |
| Calidad       | ESLint 9 + Prettier + Husky + commitlint |

## Principios

1. **Single Responsibility**: cada componente resuelve un único problema de UI.
2. **Composición sobre herencia**: `asChild` con Radix `Slot` en lugar de props de anidación.
3. **Type safety**: TypeScript estricto, props exportadas y `VariantProps` para variantes.
4. **Theming por CSS variables**: nunca se hardcodean colores.
5. **Accesibilidad primero**: primitivas Radix + labels correctos + tests con `axe-core`.
6. **Responsive por defecto**: mobile-first, sin anchos fijos de página, targets ≥44 px.
7. **Páginas componibles**: primitivas de layout + plantillas documentadas en `docs/layouts.md`.

## Estructura de directorios

```
libreria-componentes/
├── .storybook/
│   ├── main.ts               # Configuración de Storybook (stories, addons, autodocs)
│   └── preview.tsx           # ThemeProvider + toolbar de tema/paleta + viewports 375/768/1280
├── docs/                     # Documentación del proyecto
├── prompts/
│   └── create-component.md   # Prompt especializado para generar componentes con IA
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx    # Implementación (CVA + forwardRef)
│   │   │   └── index.ts      # Export del componente, variantes y tipos
│   │   ├── Themes/
│   │   │   ├── ThemeProvider.tsx
│   │   │   ├── Themes.tsx    # ThemeToggle
│   │   │   ├── useTheme.ts
│   │   │   ├── defaultTheme.ts
│   │   │   ├── palettes.ts   # 13 paletas (light + dark)
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   └── index.ts          # Barrel export de los 49 componentes
│   ├── lib/
│   │   └── utils.ts          # cn() = twMerge(clsx(...))
│   ├── index.ts              # Entry point: export * from './components'
│   └── index.css             # @tailwind + variables CSS base y paletas
├── stories/                  # Storybook (un .stories.tsx por componente)
│   └── templates/            # Plantillas de página completas (Templates/*)
├── tests/                    # Vitest (un .test.tsx por componente) + setup.ts
├── tailwind.config.cjs       # Mapea CSS vars a utilidades Tailwind
├── vite.config.ts            # Build de librería + configuración de Vitest
├── tsconfig.json             # strict + path alias @/*
├── eslint.config.js          # Flat config (ESLint 9)
└── package.json
```

## Configuración y alias

- `@/*` → `./src/*` (definido en `tsconfig.json` y `vite.config.ts`).
- Entrada de la librería: `src/index.ts` → `src/components/index.ts` (barrel).
- Alias de shadcn: `components.json` (`@/components`, `@/lib/utils`, `@/hooks`).

## Patrón de componente

```tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

// 1. Variantes con CVA (colores siempre desde variables del tema)
const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
      },
      size: {
        sm: 'h-5 px-2',
        default: 'h-6 px-2.5',
        lg: 'h-7 px-3',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
);

// 2. Props: extender las HTML + VariantProps. No redeclarar variant/size.
export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

// 3. forwardRef + displayName
const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => (
    <span ref={ref} className={cn(badgeVariants({ variant, size, className }))} {...props} />
  )
);
Badge.displayName = 'Badge';

// 4. Export del componente, las variantes y los tipos
export { Badge, badgeVariants };
```

### Componentes basados en Radix

Los wrappers de Radix mantienen el patrón de shadcn:

```tsx
const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1',
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;
```

Reglas:

- `React.ElementRef<typeof Primitive>` para el tipo del ref.
- `React.ComponentPropsWithoutRef<typeof Primitive>` para las props.
- `displayName = Primitive.displayName` (excepto cuando se añade lógica propia).
- El componente compuesto (p. ej. `SelectField`, `Combobox`) sí recibe un `displayName` propio.

## Exports

```ts
// src/components/Button/index.ts
export { Button, buttonVariants } from './Button';
export type { ButtonProps } from './Button';

// src/components/index.ts
export * from './Button';

// src/index.ts
export * from './components';
```

Toda carpeta nueva debe registrarse en `src/components/index.ts`.

## Capa de layout y plantillas

La librería se organiza en tres capas:

1. **Primitivas** (`Button`, `TextField`, `Dialog`...): una responsabilidad, tema y a11y.
2. **Layout**: `Stack`, `Grid`, `Section`, `PageHeader`, `AppShell`, `Prose`,
   `SkipLink`, `VisuallyHidden`, `AspectRatio`, `ScrollArea`, `Separator`.
3. **Plantillas** (`stories/templates/`): composiciones de página completas que no se publican
   como componentes; documentan App Shell/Dashboard, Auth, Settings, Marketing, Docs,
   E-commerce/List-Detail, CRUD y estados.

Contrato: mobile-first 320–1536 px, anchos semánticos (`form`, `prose`, `content`, `wide`,
`full`), un solo scroll de página, overlays con `max-h`/`dvh`, navegación móvil modal y
targets ≥44 px. El catálogo y la matriz de variantes están en
[`docs/layouts.md`](./layouts.md).

## Sistema de theming

```
palettes.ts     ──► ThemeProvider ──► <div class="{colorMode} theme-{palette}">
defaultTheme.ts ──► ThemeProvider ──► <style id="theme-provider-style"> (scoped)
                                          │
                                          ├─► PortalContainerProvider ──► nodo en <body> con las mismas clases
                                          └─► applyToRoot (opt-in) ──► <html> (clases + variables)
                                          │
tailwind.config.cjs ──► hsl(var(--background)) ──► Componentes (bg-background, text-foreground)
```

- `defaultTheme.ts` define colores, tipografía, radios, sombras y spacing.
- `palettes.ts` define 13 paletas; cada una tiene `light` y `dark` con **todos** los campos de `ThemeColors`.
- `ThemeProvider` lee el modo desde `localStorage` (`theme-color-mode` por defecto), mergea en profundidad base + paleta + `defaultTheme` + overrides de `setTheme` (`DeepPartial<Theme>`), y expone `useTheme()`.
- Los colores de `defaultTheme.ts`/`palettes.ts` se escriben **con** `hsl(...)`; `ThemeProvider` elimina el wrapper al generar las variables, porque `tailwind.config.cjs` ya aplica `hsl(var(--...))`.
- `src/index.css` contiene los valores por defecto en `:root`/`.dark` (formato HSL crudo) para usar la librería sin `ThemeProvider`.
- **Portales**: `PortalContainerProvider` crea un nodo en `<body>` con las clases `${colorMode} theme-${palette}`; `Dialog`, `Drawer`, `Select`, `DropdownMenu` y `Popover` lo obtienen con `usePortalContainer()` y lo pasan al `container` de Radix. Así los overlays conservan la paleta y los overrides sin tocar `<html>`.
- `applyToRoot` (opt-in) replica clases y variables en `document.documentElement` para portales de terceros o para tematizar el documento completo; restaura los valores previos al desmontar.

## Cómo agregar un componente

1. Crear `src/components/Nombre/Nombre.tsx` (patrón CVA + `forwardRef` + `cn`), mobile-first y
   solo con tokens del tema.
2. Crear `src/components/Nombre/index.ts` exportando componente, variantes y tipos.
3. Añadir `export * from './Nombre';` en `src/components/index.ts`.
4. Crear `stories/Nombre.stories.tsx` con `title: '<Categoría>/Nombre'`, `tags: ['autodocs']`,
   `args` y story `Mobile` si cambia la estructura.
5. Crear `tests/Nombre.test.tsx` con teclado y `axe-core` (en portales, `axe.run(document.body)`).
6. Verificar a 375/768/1280 px: sin overflow, foco visible, targets ≥44 px, light/dark.
7. Verificar: `npx tsc --noEmit`, `npm run test:run`, `npm run lint`.
8. Actualizar `docs/CHANGELOG.md`; si es primitiva de layout, `docs/layouts.md`.

Para el flujo asistido por IA, usa los skills `crear-componente` (componentes) o `crear-layout`
(páginas y plantillas). El prompt `prompts/create-component.md` sigue siendo válido.

## Testing

El runner es **Vitest** con entorno `jsdom` y `tests/setup.ts` como setup global (polyfills de `ResizeObserver`, `IntersectionObserver`, `matchMedia`, `PointerEvent`, etc.).

Las plantillas de stories/templates/ se validan ademas con **Playwright** (e2e/templates.e2e.ts): 33 casos en Chromium a 375/768/1280 comprueban overflow horizontal, un unico h1 y snapshots. Ejecuta
pm run test:e2e; usa
pm run test:e2e:update solo para refrescar baselines intencionales.

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { Button } from '../src/components/Button';

describe('Button', () => {
  it('renders with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
```

Comandos:

```bash
npm run test:run                                   # toda la suite
npx vitest run tests/Button.test.tsx               # un archivo
npx vitest run -t "renders with children"          # un test por nombre
```

## Build y distribución

`vite.config.ts` genera ESM (`.mjs`) + CJS (`.cjs`), emite los tipos con `vite-plugin-dts` y compila `src/index.css` a `dist/index.css`. React y ReactDOM son externos.

```json
{
  "sideEffects": ["**/*.css"],
  "main": "./dist/index.cjs",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs"
    },
    "./style.css": "./dist/index.css",
    "./package.json": "./package.json"
  }
}
```

> El consumidor debe importar `libreria-componentes/style.css` una vez. Los estilos no se inyectan por JS, lo que evita FOUC en SSR y permite cachear el CSS por separado.

## Git y calidad

Hooks de Husky:

- `.husky/pre-commit`: `prettier --write .` → `eslint . --fix` → `tsc --noEmit` → `vitest run`.
- `.husky/commit-msg`: `commitlint --edit` (Conventional Commits).

Convención de commits: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`.

## Glosario

| Término           | Significado                                                        |
| ----------------- | ------------------------------------------------------------------ |
| **Barrel export** | `index.ts` que re-exporta los módulos de una carpeta               |
| **CVA**           | `class-variance-authority`; genera clases a partir de variantes    |
| **`cn()`**        | `twMerge(clsx(...))`; combina clases resolviendo conflictos        |
| **CSS variables** | Variables (`--primary`, etc.) que permiten el theming en runtime   |
| **`forwardRef`**  | Permite exponer el nodo DOM del componente al consumidor           |
| **Radix `Slot`**  | Compone el componente sobre el hijo (`asChild`) sin wrappers extra |
| **CSF**           | Component Story Format, el formato de stories de Storybook         |
| **`axe-core`**    | Motor de auditoría de accesibilidad usado en los tests             |
