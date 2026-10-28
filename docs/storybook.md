# Documentación de Storybook

## Visión general

El proyecto usa **Storybook 10** (`@storybook/react-vite`) para documentar, probar y visualizar los componentes. Las stories se escriben en **Component Story Format 3 (CSF 3)** con TypeScript.

> Storybook 10 es **solo ESM**. El proyecto ya usa `"type": "module"`, así que no hay pasos extra; los addons nuevos (`@storybook/addon-docs`) se importan desde `@storybook/addon-docs/blocks`.

## Comandos

```bash
npm run dev             # Storybook en http://localhost:6006
npm run build-storybook # Build estático en ./storybook-static
```

## Configuración

### `.storybook/main.ts`

- Stories: `../stories/**/*.stories.tsx` y `../stories/docs/*.mdx`.
- Addons: `links`, `a11y`, `themes`, `mcp` y `docs` (en Storybook 9+ `essentials` y `interactions` se consolidaron y desaparecieron).
- Autodocs activado por tag en cada meta (`tags: ['autodocs']`); `docs.autodocs` ya no existe en la configuración.
- PostCSS: `./postcss.config.cjs`.

### `.storybook/preview.tsx`

Define un decorador global que envuelve cada story en `ThemeProvider`:

```tsx
decorators: [
  (Story, context) => {
    const colorMode = (context.globals.colorMode || 'light') as ColorMode;
    const palette = (context.globals.palette || 'neutral') as PaletteName;
    const isFullscreen = context.parameters.layout === 'fullscreen';

    return (
      <ThemeProvider colorMode={colorMode} defaultPalette={palette}>
        <div
          className={
            isFullscreen
              ? 'min-h-dvh bg-background text-foreground'
              : `${colorMode} min-h-screen bg-background p-4 text-foreground`
          }
        >
          <Story />
        </div>
      </ThemeProvider>
    );
  },
],
```

También expone controles globales en la toolbar:

- **Color Mode**: `light` / `dark`.
- **Palette**: las 13 paletas (`neutral`, `stone`, `zinc`, ...).
- **Viewport**: Mobile 375, Tablet 768 y Desktop 1280 (`responsive` por defecto).

> Como el decorador global ya envuelve todo, **no** añadas `<ThemeProvider>` dentro de cada story.
> Las plantillas usan `parameters.layout: 'fullscreen'` y el decorador omite el padding.

## Crear una story

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../src/components/Badge';

const meta: Meta<typeof Badge> = {
  title: 'Data Display/Badge', // '<Categoría>/<Componente>'
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Etiqueta compacta para estados y categorías.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline', 'success', 'warning', 'info'],
    },
    size: { control: 'select', options: ['sm', 'default', 'lg'] },
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Playground: Story = {
  args: {
    children: 'Badge',
    variant: 'default',
    size: 'default',
  },
};

export const Variants: Story = {
  args: { children: 'Badge' },
  render: args => (
    <div className="flex flex-wrap gap-2">
      <Badge {...args} variant="default" />
      <Badge {...args} variant="secondary" />
      <Badge {...args} variant="destructive" />
      <Badge {...args} variant="outline" />
    </div>
  ),
};
```

### Convenciones

| Regla             | Detalle                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------- |
| **Título**        | `'<Categoría>/<Componente>'` (`Forms`, `Navigation`, `Data Display`, `Layout`, `Utilities`) |
| **Plantillas**    | `'Templates/<Nombre>'` + `parameters.layout: 'fullscreen'`                                  |
| **Meta**          | `Meta<typeof Component>` (nunca `Meta` sin genérico)                                        |
| **Story**         | `StoryObj<typeof Component>` (nunca `typeof meta.component`)                                |
| **Tags**          | `tags: ['autodocs']`                                                                        |
| **Args**          | Usa `args` para que el panel Controls funcione                                              |
| **Estados**       | Añade stories para `disabled`, `loading`, `error`, tamaños y variantes                      |
| **Responsive**    | Sin anchos fijos; story `Mobile` si cambia la estructura                                    |
| **Temas**         | Usa clases del tema (`bg-background`, `text-foreground`), sin colores hardcodeados          |
| **ThemeProvider** | No lo envuelvas por story; ya existe el decorador global                                    |
| **JSDoc**         | Documenta props complejas en `argTypes[prop].description`                                   |

### Componentes con Radix

- **Select**: los `SelectLabel` deben ir dentro de un `SelectGroup`.
- **Dialog / Drawer**: incluye `DialogTitle` y `DialogDescription` (o `aria-describedby={undefined}` si no aplica) para evitar warnings de accesibilidad.
- **Tooltip**: envuelve el `TooltipProvider` cuando sea necesario fuera del componente.

## Panel de accesibilidad

El addon `@storybook/addon-a11y` ejecuta `axe-core` sobre cada story y muestra las violaciones en la pestaña **Accessibility**. Revisa ese panel al añadir o modificar un componente.

## Viewports y plantillas

La toolbar incluye **Mobile (375)**, **Tablet (768)** y **Desktop (1280)**. Antes de cerrar una
story, comprueba en los tres:

- [ ] Sin scroll horizontal de página.
- [ ] Targets ≥44 px y foco visible.
- [ ] La navegación móvil es modal y no deja links ocultos focusables.
- [ ] El contenido no se corta con barras fijas (`dvh`, safe areas).

Para plantillas de página usa `title: 'Templates/<Nombre>'` y `parameters.layout: 'fullscreen'`;
sigue la matriz de [`layouts.md`](./layouts.md) y documenta el comportamiento responsive en
`parameters.docs.description.component`.

## Documentación en MDX

Las páginas de documentación (por ejemplo `stories/docs/Introduction.mdx`) se cargan mediante el patrón `../stories/docs/*.mdx`. Úsalas para guías generales, no para documentar componentes concretos.

## Recursos

- [Storybook docs](https://storybook.js.org/docs)
- [CSF 3](https://storybook.js.org/docs/api/csf)
- [addon-a11y](https://storybook.js.org/addons/@storybook/addon-a11y)
