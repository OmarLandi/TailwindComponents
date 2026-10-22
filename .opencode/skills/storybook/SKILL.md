---
name: storybook
description: Use when creating or fixing Storybook stories, CSF 3 metadata, controls/args, autodocs, the theme toolbar (Color Mode / Palette) or the a11y panel in this library. Trigger on "story", "stories", "storybook", "CSF", "autodocs", "controls", "argTypes", "toolbar", "documentar componente".
---

# Storybook

## Configuración real

- Storybook 8 con `@storybook/react-vite`.
- `.storybook/main.ts`: stories en `../stories/**/*.stories.tsx` y `../stories/docs/*.mdx`; autodocs por tag; addons `essentials`, `interactions`, `links`, `a11y`, `themes`.
- `.storybook/preview.tsx`: decorador global con `ThemeProvider`, toolbar **Color Mode**
  (light/dark) + **Palette** (13 paletas) y viewports **Mobile 375 / Tablet 768 / Desktop 1280**.
  El decorador respeta `parameters.layout: 'fullscreen'` (sin padding ni `min-h-screen`).
- Puerto: `6006`.

```bash
npm run dev             # http://localhost:6006
npm run build-storybook # ./storybook-static
```

## Convenciones

| Regla         | Detalle                                                                                |
| ------------- | -------------------------------------------------------------------------------------- |
| Título        | `'<Category>/<Name>'` con `Navigation`, `Forms`, `Data Display`, `Layout`, `Utilities` |
| Plantillas    | `'Templates/<Name>'` + `parameters.layout: 'fullscreen'`                               |
| Meta          | `Meta<typeof Component>` (nunca `Meta` sin genérico)                                   |
| Story         | `StoryObj<typeof Component>` (nunca `typeof meta.component`)                           |
| Tags          | `tags: ['autodocs']`                                                                   |
| Args          | Usa `args` para que Controls funcione                                                  |
| Tema          | Clases del tema (`bg-background`, `text-foreground`); sin colores hardcodeados         |
| ThemeProvider | **No** lo añadas por story: el decorador global ya lo aplica                           |
| Docs          | `parameters.docs.description.component` para autodocs                                  |

## Plantilla

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from '../src/components/TextField';

const meta: Meta<typeof TextField> = {
  title: 'Forms/TextField',
  component: TextField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Campo de texto con label, iconos, helper text y estado de error. Usa las variables del tema.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'filled', 'ghost', 'underlined'],
      description: 'Estilo visual del input',
    },
    size: { control: 'select', options: ['sm', 'default', 'lg'] },
    label: { control: 'text' },
    helperText: { control: 'text' },
    errorMessage: { control: 'text' },
    disabled: { control: 'boolean' },
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Playground: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    variant: 'default',
    size: 'default',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    errorMessage: 'This field is required',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    disabled: true,
  },
};
```

## Reglas de composición

- Story principal `Playground` con `args`; añade stories nombradas para estados (`Disabled`, `Loading`, `WithError`, `WithIcons`) y variantes visuales.
- Las variantes y tamaños deben seguir siendo controles `select` en `argTypes`; no crees una story por cada combinación.
- Para listas de variantes, usa `render` recibiendo `args` y pasa `{...args}` a cada instancia.
- Los componentes del tema deben verse bien en light/dark y en cualquier paleta: compruébalo con la toolbar.
- Sin anchos fijos de página: usa `max-w-*`, `w-full` y contenedores; nunca `w-[300px]`.
- Añade una story `Mobile` cuando la estructura cambie entre breakpoints (no solo el tamaño).

## Viewports y plantillas

La toolbar de viewport incluye `Mobile (375)`, `Tablet (768)` y `Desktop (1280)`. Antes de
cerrar una story:

- [ ] Sin scroll horizontal de página en 375, 768 y 1280.
- [ ] Targets ≥44 px y foco visible en móvil.
- [ ] La navegación móvil es modal y no deja links ocultos focusables.
- [ ] El contenido no se corta ni se solapa con barras fijas (`dvh`, safe areas).

Para plantillas de página usa `Templates/<Name>` y `layout: 'fullscreen'`; documenta la matriz
responsive en `parameters.docs.description.component` y sigue `docs/layouts.md`. No las
envuelvas en un contenedor con padding: el decorador ya lo omite en fullscreen.

## Radix en Storybook

- `SelectLabel` debe ir dentro de `SelectGroup`.
- `Dialog` y `Drawer` necesitan `DialogTitle` y `DialogDescription` (o `aria-describedby={undefined}`).
- `Tooltip` puede necesitar `TooltipProvider` en stories que lo usen aislado.
- `Dialog`/`Drawer` en stories deben poder abrirse: usa un trigger real, no `open` fijo, salvo que quieras documentar el estado abierto.

## Panel de accesibilidad

El addon `@storybook/addon-a11y` ejecuta `axe-core` por story. Antes de cerrar una story:

- [ ] Sin violaciones en la pestaña **Accessibility**.
- [ ] Navegable con teclado (Tab, Enter/Space, Escape donde aplique).
- [ ] Contraste correcto en light y dark.
- [ ] Controles (`Controls`) reflejan el estado real.

## Documentación MDX

Las páginas generales van en `stories/docs/*.mdx` (p. ej. `Introduction.mdx`, `Changelog.mdx`). No documentes componentes individuales en MDX: usa autodocs.

## No hacer

- ❌ Envolver cada story en `ThemeProvider` (duplica el decorador global).
- ❌ Hardcodear `backgroundColor: '#fff'` o colores Tailwind literales.
- ❌ Usar `render` con contenido fijo que ignore `args` (rompe Controls).
- ❌ Títulos como `'Components/Button'`: la categoría debe ser la real.
