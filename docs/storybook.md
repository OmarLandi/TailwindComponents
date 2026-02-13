# Documentación de Storybook

## Visión General

**Storybook** es una herramienta para desarrollar componentes UI de forma aislada. Esta librería utiliza Storybook para documentar, probar y visualizar todos los componentes.

## Componentes

### Button

El componente **Button** es un elemento interactivo fundamental que permite a los usuarios ejecutar acciones dentro de la aplicación. Proporciona una experiencia de usuario consistente y accesible, con múltiples variantes visuales, tamaños y estados para adaptarse a diferentes contextos de la interfaz.

**Propósito:**

- **Acciones principales**: Enviar formularios, confirmar decisiones o ejecutar operaciones
- **Navegación**: Dirigir al usuario a otras páginas o secciones (usando `asChild`)
- **Acciones destructivas**: Eliminar, cancelar o revertir operaciones
- **Estados de carga**: Indicar que una operación está en progreso

**Características:**

- Más de 40 variantes visuales (sólidas, outline, ghost, soft, 3D, gradient, glass, etc.)
- Múltiples tamaños (xs, sm, default, lg, xl, icon)
- Estados: disabled, loading, fullWidth
- Soporte para iconos a izquierda/derecha
- Composición con otros componentes (asChild)
- Accesibilidad WCAG 2.1 completa

### Uso básico

```tsx
import { Button } from 'libreria-componentes';
import 'libreria-componentes/style.css';

<Button>Click me</Button>
<Button variant="destructive">Delete</Button>
<Button size="lg">Large</Button>
<Button isLoading>Loading...</Button>
```

## Configuración

| Archivo                    | Propósito                               |
| -------------------------- | --------------------------------------- |
| `.storybook/main.ts`       | Configuración principal de Storybook    |
| `.storybook/preview.ts`    | Configuración global de stories         |
| `.storybook/decorators.ts` | Decoradores globales (providers, temas) |

### Configuración Principal (main.ts)

```ts
import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../src'),
        },
      },
    });
  },
};

export default config;
```

## Addons Instalados

### @storybook/addon-essentials

Conjunto de addons esenciales:

- **Controls**: Controles interactivos para props
- **Actions**: Logging de eventos
- **Viewport**: Pruebas responsivas
- **Backgrounds**: Cambiar fondos
- **Measure**: Medición de-spacing
- **Outline**: Mostrar outlines

### @storybook/addon-interactions

Permite interacciones grabadas en stories:

- Simular clicks, typing, etc.
- Panel de timeline de interacciones
- Debug de eventos

### @storybook/addon-a11y

Panel de verificación de accesibilidad:

- Análisis automático WCAG
- Violaciones destacadas
- Sugerencias de reparación

## Crear un Story

### Estructura Básica

```tsx
// stories/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../src/components/Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'ghost', 'link'],
      description: 'Visual style variant of the button',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'Size of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    isLoading: {
      control: 'boolean',
      description: 'Shows loading state',
    },
    children: {
      control: 'text',
      description: 'Button content',
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
    size: 'default',
  },
};

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'lg',
  },
};

export const Loading: Story = {
  args: {
    children: 'Loading...',
    isLoading: true,
  },
};
```

## Tipos de Stories

### 1. Stories de Variantes

```tsx
export const Variants: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};
```

### 2. Stories de Tamaños

```tsx
export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
};
```

### 3. Stories con Estados

```tsx
export const States: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button>Default</Button>
      <Button disabled>Disabled</Button>
      <Button isLoading>Loading</Button>
    </div>
  ),
};
```

### 4. Stories de Iconos

```tsx
import { Plus, Trash2 } from 'lucide-react';

export const WithIcons: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button leftIcon={<Plus />}>Add Item</Button>
      <Button rightIcon={<Trash2 />} variant="destructive">
        Delete
      </Button>
    </div>
  ),
};
```

## Args y ArgTypes

### control

Tipos de control disponibles:

- `'text'`: Input de texto
- `'boolean'`: Checkbox
- `'number'`: Input numérico con steppers
- `'select'`: Dropdown de opciones
- `'radio'`: Opciones radio
- `'inline-radio'`: Radio en línea
- `'check'`: Checkbox múltiples
- `'inline-check'`: Checkbox múltiples en línea
- `'object'`: Editor JSON
- `'color'`: Selector de color

### description

Descripción que aparece en el panel de docs:

```tsx
argTypes: {
  variant: {
    control: 'select',
    description: 'The visual style variant of the button',
    table: {
      type: { summary: "'default' | 'destructive' | ..." },
      defaultValue: { summary: "'default'" },
    },
  },
}
```

### mapping

Mapeo de valores para controles:

```tsx
argTypes: {
  isLoading: {
    control: 'boolean',
    mapping: {
      true: true,
      false: false,
    },
  },
}
```

## Decoradores

### Decorador de Tema

```ts
// .storybook/decorators.tsx
import type { Preview } from '@storybook/react';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' },
      ],
    },
  },
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
};

export default preview;
```

## Ejecución

### Comandos

```bash
# Iniciar Storybook en desarrollo
npm run dev

# Build de Storybook estático
npm run build-storybook

# Servir Storybook estático
npx http-server storybook-static
```

### URLs

- **Desarrollo:** http://localhost:6006
- **Docs:** http://localhost:6006/?path=/docs/\*

## Autodocs

La configuración `tags: ['autodocs']` genera automáticamente una página de documentación con:

- Tabla de props
- Controles interactivos
- Descripciones
- Valores por defecto
- Tipos de datos

## Addons Recomendados

### Para Testing

- `@storybook/addon-a11y` - Verificación de accesibilidad
- `@storybook/addon-interactions` - Grabación de interacciones

### Para Documentación

- `@storybook/addon-docs` - Documentación MDX
- `@storybook/addon-links` - Links entre stories

### Para Diseño

- `@storybook/addon-viewport` - Viewports responsivos
- `@storybook/addon-backgrounds` - Fondos
- `@storybook/addon-measure` - Medición de spacing

## Recursos

- [Documentación oficial Storybook](https://storybook.js.org/docs/react/get-started/introduction)
- [Writing Stories](https://storybook.js.org/docs/react/writing-stories/introduction)
- [Args](https://storybook.js.org/docs/react/writing-stories/args)
- [Autodocs](https://storybook.js.org/docs/react/writing-docs/autodocs)
