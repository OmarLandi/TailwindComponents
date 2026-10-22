---
name: crear-componente
description: Use when creating, adding or implementing a new React component in this component library (CVA variants, forwardRef, Radix UI, Tailwind theme variables). Trigger on "crear componente", "nuevo componente", "add component", "implementar componente", or when asked to add a UI primitive/story/test. Covers file layout, barrel export, Storybook story, Vitest + axe tests and verification.
---

# Crear un componente

Flujo end-to-end para añadir un componente a esta librería sin romper los patrones existentes.

## 1. Investigar antes de escribir

1. Lee `AGENTS.md` (sección "Component Creation" y "Definition of Done").
2. Abre 1-2 componentes similares ya existentes (p. ej. `src/components/Badge`, `src/components/Textarea` para formularios; `src/components/Tabs` para wrappers Radix).
3. Comprueba si la primitiva Radix necesaria ya está en `package.json`. Si no está, pídela antes de instalarla (no asumas que está disponible).
4. Decide la categoría: `Navigation`, `Forms`, `Data Display`, `Layout` o `Utilities`.
   Si es una página completa, usa el skill `crear-layout` y `stories/templates/`.

Reglas de diseño (aprendidas del código actual):

- **Mobile-first**: base 320 px, sin anchos fijos de página, targets ≥44 px.
- **Accesible**: teclado completo, foco visible, nombre accesible, errores con IDs/`role`.
- **Tematizable**: solo tokens (`bg-primary`, `text-foreground`), nada de hex/rgb.
- Variantes estándar: `default`, `secondary`, `outline`, `ghost`, `destructive`, `link`.
- Tamaños: `sm`, `default`, `lg` (añade `icon`/`xl` solo si aportan valor real).
- Máximo ~6-8 variantes por eje. Evita `soft-*`, `3d-*`, `glass-*`.
- Errores por prop (`error` / `errorMessage`), **no** por `variant="error"`.
- Iconos siempre con `lucide-react`, nunca SVG inline; decorativos con `aria-hidden`.
- `asChild` debe aplicar clases/props al elemento del consumidor, sin wrapper extra.
- Motion con `motion-reduce`; RTL con utilidades lógicas (`ms-*`, `me-*`, `start-*`, `end-*`).
- No dupliques props que ya existen en el elemento HTML base.

## 2. Crear los archivos

```
src/components/<Name>/<Name>.tsx
src/components/<Name>/index.ts
stories/<Name>.stories.tsx
tests/<Name>.test.tsx
```

Y añade `export * from './<Name>';` en `src/components/index.ts`.

### Componente (CVA + forwardRef)

```tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
        destructive: 'border-transparent bg-destructive text-destructive-foreground',
        outline: 'text-foreground',
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

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => (
    <span ref={ref} className={cn(badgeVariants({ variant, size, className }))} {...props} />
  )
);
Badge.displayName = 'Badge';

export { Badge, badgeVariants };
```

Checklist del componente:

- [ ] `import * as React from 'react'`.
- [ ] `cn` desde `@/lib/utils`.
- [ ] `forwardRef` con el tipo de elemento correcto.
- [ ] `Component.displayName = 'Component'`.
- [ ] CVA **solo** si hay variantes; si no, constante de string.
- [ ] Ningún color hardcodeado: solo `bg-primary`, `text-foreground`, `border-border`, etc.
- [ ] `className` del consumidor al final del `cn(...)`.
- [ ] Export de componente + variantes + tipos.

### Wrapper de Radix

```tsx
import * as TabsPrimitive from '@radix-ui/react-tabs';

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

- Usa `React.ElementRef<typeof Primitive>` y `React.ComponentPropsWithoutRef<typeof Primitive>`.
- `displayName = Primitive.displayName` salvo que añadas lógica propia (entonces usa un nombre propio).
- Si el wrapper compone varios primitives con lógica (como `SelectField`/`Combobox`), documéntalo con JSDoc.

### index.ts

```ts
export { Badge, badgeVariants } from './Badge';
export type { BadgeProps } from './Badge';
```

### Story

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../src/components/Badge';

const meta: Meta<typeof Badge> = {
  title: 'Data Display/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline'],
    },
    size: { control: 'select', options: ['sm', 'default', 'lg'] },
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Playground: Story = {
  args: { children: 'Badge', variant: 'default', size: 'default' },
};
```

- `title: '<Category>/<Name>'`.
- **No** envuelvas en `ThemeProvider`: `.storybook/preview.tsx` ya lo hace globalmente.
- Usa `args` para que el panel Controls funcione.
- Sin anchos fijos (`w-[300px]`); usa `max-w-*`/`w-full`.
- Añade `Mobile` si la estructura cambia; revisa 375/768/1280 en la toolbar.

### Test

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { Badge } from '../src/components/Badge';

describe('Badge', () => {
  it('renders correctly', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('applies variant classes', () => {
    render(<Badge variant="destructive">Error</Badge>);
    expect(screen.getByText('Error')).toHaveClass('bg-destructive');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Badge>New</Badge>);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
```

- `axe.run(container)` es **obligatorio**; no uses `toHaveNoViolations`.
- Si renderiza en portal, abre el overlay y audita `axe.run(document.body)`.
- Cubre: render, variantes/tamaños, interacción (o evento), teclado, `disabled`/`loading`/`error` y `axe`.
- Para interacciones usa `@testing-library/user-event` y `userEvent.setup()`.

## 3. Verificar

```bash
npx tsc --noEmit
npm run test:run
npm run lint
```

Los tres deben pasar. Si el componente usa APIs de navegador nuevas (p. ej. `matchMedia`), añade el polyfill en `tests/setup.ts`.

Además, revisa en Storybook a **375 / 768 / 1280 px**: sin scroll horizontal, foco visible,
targets ≥44 px, light/dark + 2–3 paletas, reduced motion y RTL si aplica.

## 4. Cerrar

- Actualiza `docs/CHANGELOG.md`.
- Actualiza el inventario/categoría en `AGENTS.md` si creaste una categoría nueva.
- Si es primitiva de layout, actualiza `docs/layouts.md`.
- Commit con Conventional Commits (`feat: add <Name> component`).

## Errores comunes

| Síntoma                                         | Causa / solución                                                                   |
| ----------------------------------------------- | ---------------------------------------------------------------------------------- |
| Radix avisa de `DialogTitle`/`Description`      | Añade `DialogTitle` y `DialogDescription` (o `aria-describedby={undefined}`).      |
| `SelectLabel` lanza error                       | Debe ir dentro de `SelectGroup`.                                                   |
| Colores no cambian con la paleta                | Estás usando colores literales o `hsl(...)` en variables (ver skill `theming`).    |
| El ref es `null` en el consumidor               | Falta `forwardRef` o se pasa el ref a un hijo incorrecto.                          |
| Test de Radix falla en jsdom                    | Falta un polyfill en `tests/setup.ts` (pointer capture, ResizeObserver...).        |
| `axe.run(container)` pasa pero el overlay falla | El contenido está en un portal; audita `document.body`.                            |
| Links ocultos reciben Tab                       | `opacity-0`/`max-h-0` no ocultan del árbol de accesibilidad; usa `hidden`/`inert`. |
| Overflow horizontal en móvil                    | Falta `min-w-0` en hijos de grid/flex o hay un ancho fijo.                         |
