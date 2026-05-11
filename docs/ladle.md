# Documentación de Ladle

## Visión General

**Ladle** es una alternativa moderna y rápida a Storybook, construida sobre Vite. Esta librería utiliza Ladle para documentar, probar y visualizar los componentes de React.

## Características Principales

- ⚡ **Velocidad lightning** - Gracias a Vite y esbuild, el inicio del servidor y el HMR son instantánea
- 🎨 **Interfaz moderna** - Diseño limpio y personalizable
- 📚 **Compatible con Storybook** - Usa el mismo formato de stories (CSF)
- 🔧 **Cero configuración** - Funciona sin configuración, pero es personalizable
- ♿ **Accesibilidad integrada** - Soporte para axe-core

## Componentes Disponibles

### Button

El componente **Button** es un elemento interactivo fundamental.

**Variantes:**

- `default` - Botón primario
- `destructive` - Para acciones destructivas
- `secondary` - Alternativo secundario
- `accent` - Color de acento
- `outline` - Borde visible
- `ghost` - Fondo transparente
- `link` - Estilo de enlace

**Tamaños:**

- `sm` - Pequeño
- `default` - Normal
- `lg` - Grande
- `icon` - Solo icono

**Uso básico:**

```tsx
import { Button } from 'libreria-componentes';

<Button>Click me</Button>
<Button variant="destructive">Delete</Button>
<Button size="lg">Large</Button>
<Button isLoading>Loading...</Button>
```

### TextField

Componente de entrada de texto con variantes y validación.

**Variantes:**

- `default` - Borde estándar
- `filled` - Fondo de color
- `ghost` - Sin borde
- `underlined` - Solo línea inferior

**Tamaños:**

- `sm`, `default`, `lg`

**Props:**

- `label` - Etiqueta del campo
- `helperText` - Texto de ayuda
- `errorMessage` - Mensaje de error
- `required` - Campo obligatorio
- `disabled` - Deshabilitado

### Select

Componente de selección desplegable.

**Props:**

- `options` - Array de opciones
- `value` - Valor seleccionado
- `placeholder` - Texto placeholder
- `error` - Estado de error
- `disabled` - Deshabilitado
- `onChange` - Callback de cambio

### DropdownMenu

Menú desplegable con items.

**Componentes:**

- `DropdownMenu` - Contenedor principal
- `DropdownMenuItem` - Item del menú
- `DropdownMenuSeparator` - Separador
- `DropdownMenuLabel` - Etiqueta de sección

### Container

Contenedor con ancho máximo y padding.

**Tamaños:** `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `full`
**Padding:** `none`, `sm`, `default`, `md`, `lg`

## Configuración

### Estructura de Stories

Ladle es compatible con el formato de stories de Storybook (Component Story Format):

```tsx
// stories/Button.stories.tsx
import type { Story } from '@ladle/react';
import { Button } from '../src/components/Button/Button';

export default {
  title: 'Components/Button',
  component: Button,
};

export const Default: Story = () => <Button>Click me</Button>;

export const Variants: Story = () => (
  <div style={{ display: 'flex', gap: '8px' }}>
    <Button variant="default">Default</Button>
    <Button variant="destructive">Destructive</Button>
    <Button variant="outline">Outline</Button>
  </div>
);

export const Sizes: Story = () => (
  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
    <Button size="sm">Small</Button>
    <Button size="default">Default</Button>
    <Button size="lg">Large</Button>
  </div>
);
```

## Ejecución

### Comandos

```bash
# Iniciar servidor de desarrollo
npm run dev

# Build estático
npm run build:ladle
```

### URLs

- **Desarrollo:** http://localhost:61000

## Recursos

- [Documentación oficial Ladle](https://ladle.dev)
- [Guía de React](https://react.dev)
