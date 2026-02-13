# Arquitectura del Proyecto

## Visión General

Esta librería de componentes sigue una arquitectura modular, escalable y mantenible, inspirada en las mejores prácticas de **shadcn/ui** y **Atomic Design**.

## Principios de Arquitectura

### 1. Single Responsibility Principle (SRP)

Cada componente tiene una única responsabilidad bien definida.

### 2. Separation of Concerns

Separación clara entre:

- **Componentes**: Lógica de presentación
- **Utilidades**: Funciones helper
- **Estilos**: Variables CSS y configuración

### 3. Composition over Inheritance

Los componentes se construyen mediante composición, no herencia.

### 4. Type Safety

TypeScript strict mode para seguridad total en tiempo de compilación.

## Estructura de Directorios

```
libreria-componentes/
├── .storybook/              # Configuración de Storybook
│   ├── main.ts             # Configuración principal
│   ├── preview.ts           # Preview global
│   └── decorators.ts       # Decoradores globales
├── docs/                    # Documentación del proyecto
├── src/
│   ├── components/          # Componentes de la librería
│   │   ├── Button/
│   │   │   ├── Button.tsx # Implementación del componente
│   │   │   └── index.ts   # Export del componente
│   │   ├── ErrorBoundary/
│   │   │   ├── ErrorBoundary.tsx
│   │   │   └── index.ts
│   │   └── index.ts       # Barrel export (re-exporta todo)
│   ├── lib/
│   │   └── utils.ts       # Utilidades (función cn para clases)
│   ├── index.ts          # Entry point (punto de entrada)
│   └── index.css         # Estilos globales (CSS variables)
├── package.json            # Dependencias y scripts
├── tsconfig.json          # Configuración TypeScript
├── vite.config.ts         # Configuración de build
└── tailwind.config.js    # Configuración Tailwind
```

## Guía de Uso

### Instalación

```bash
npm install libreria-componentes
```

### Configuración Inicial

#### 1. Importar estilos

En tu archivo principal (`App.tsx` o root):

```tsx
import 'libreria-componentes/style.css';
```

#### 2. Configurar Tailwind (opcional)

Si necesitas personalizar los colores, agrega las variables en tu CSS:

```css
/* Tu archivo CSS global */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Override de colores primarios */
    --primary: 250 84% 54%;
    --primary-foreground: 0 0% 100%;
  }
}
```

### Uso de Componentes

#### Button

```tsx
import { Button, buttonVariants } from 'libreria-componentes';

// Uso básico
<Button>Click me</Button>

// Con variante
<Button variant="destructive">Delete</Button>

// Con tamaño
<Button size="lg">Large</Button>

// Con icono
import { Plus } from 'lucide-react';
<Button leftIcon={<Plus />}>Add Item</Button>

// Estado de carga
<Button isLoading>Loading...</Button>

// Composición (asChild)
import { Link } from 'react-router-dom';
<Button asChild>
  <Link to="/dashboard">Dashboard</Link>
</Button>
```

#### ErrorBoundary

```tsx
import { ErrorBoundary } from 'libreria-componentes';

// Uso básico
<ErrorBoundary>
  <YourApp />
</ErrorBoundary>

// Con fallback personalizado
<ErrorBoundary fallback={<ErrorDisplay />}>
  <YourApp />
</ErrorBoundary>

// Con callback de error
<ErrorBoundary onError={(error, info) => console.error(error)}>
  <YourApp />
</ErrorBoundary>
```

### Modo Oscuro

La librería soporta modo oscuro automáticamente:

```tsx
// Agrega la clase 'dark' al elemento root
<html className="dark">
  <App />
</html>
```

O configura Tailwind:

```js
// tailwind.config.js
export default {
  darkMode: ['class'],
  // ...
};
```

### Personalización de Tema

#### Variables CSS

```css
:root {
  /* Colores base */
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;

  /* Radio de bordes */
  --radius: 0.5rem;

  /* Colores semánticos */
  --destructive: 0 84.2% 60.2%;
  --success: 142 76% 36%;
  --warning: 45 93% 47%;
  --info: 199 89% 48%;
}
```

#### Colores en Modo Oscuro

```css
.dark {
  --primary: 210 40% 98%;
  --primary-foreground: 222.2 47.4% 11.2%;
  /* ... */
}
```

## Patrones de Componentes

### Componente Base con Variantes

```tsx
// src/components/Button/Button.tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// 1. Definir variantes con CVA
const buttonVariants = cva('base-classes', {
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-secondary-foreground',
    },
    size: {
      sm: 'h-8 px-3',
      default: 'h-10 px-4',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

// 2. Definir props con extends
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  // Props adicionales
}

// 3. Componente con forwardRef
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
```

### Error Boundary

```tsx
// src/components/ErrorBoundary/ErrorBoundary.tsx
import { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <div>Error</div>;
    }
    return this.props.children;
  }
}
```

## Sistema de Exports

### Barrel Export

```tsx
// src/components/index.ts
export * from './Button';
export * from './ErrorBoundary';
```

### Entry Point

```tsx
// src/index.ts
export * from './components';
```

### Export de Componentes Individuales

```tsx
// src/components/Button/index.ts
export { Button, buttonVariants } from './Button';
export type { ButtonProps } from './Button';
```

## Flujo de Datos

```
┌─────────────────────────────────────────────────────────────┐
│                         Consumers                            │
│  (Apps que instalan la librería)                           │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      Entry Point                            │
│  src/index.ts → Re-exports de components/                  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Components Layer                         │
│  Button/          ErrorBoundary/           ...             │
│  ├── Button.tsx   ├── ErrorBoundary.tsx                    │
│  └── index.ts     └── index.ts                             │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Utilities Layer                           │
│  lib/utils.ts → cn(), class merging                        │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Styling Layer                             │
│  tailwind.config.js + index.css (CSS variables)            │
└─────────────────────────────────────────────────────────────┘
```

## Build y Distribución

### Configuración de Vite

```ts
// vite.config.ts
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'LibreriaComponentes',
      fileName: format => `index.${format}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
```

### Exports en package.json

```json
{
  "name": "libreria-componentes",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    },
    "./style.css": "./dist/index.css"
  }
}
```

## Testing

### Estructura de Tests

```tsx
// tests/Button.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from '@axe-core/react';
import { Button } from '../src/components/Button';

expect.extend(toHaveNoViolations);

describe('Button', () => {
  // Tests de renderizado
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  // Tests de props
  it('applies variant correctly', () => {
    render(<Button variant="destructive">Delete</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-destructive');
  });

  // Tests de interacción
  it('handles click events', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Tests de accesibilidad
  it('should have no accessibility violations', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

## Git Workflow

### Conventional Commits

```
feat: add new Button variant
fix: resolve Button loading state
docs: update changelog
refactor: improve ErrorBoundary
test: add tests for new component
chore: update dependencies
```

### Husky + lint-staged

- **pre-commit**: Ejecuta lint-staged (lint + test)
- **pre-push**: Ejecuta tests completos

## Agregar Nuevo Componente

1. **Crear carpeta:**

   ```bash
   mkdir src/components/NuevoComponente
   ```

2. **Implementar componente:**

   ```tsx
   // src/components/NuevoComponente/NuevoComponente.tsx
   import { cva, type VariantProps } from 'class-variance-authority';
   import { cn } from '@/lib/utils';

   const nuevoVariants = cva('base-classes', { ... });

   export interface NuevoComponenteProps extends VariantProps<typeof nuevoVariants> {}

   export function NuevoComponente({ ... }) { ... }
   ```

3. **Crear index.ts:**

   ```tsx
   // src/components/NuevoComponente/index.ts
   export { NuevoComponente, nuevoVariants } from './NuevoComponente';
   export type { NuevoComponenteProps } from './NuevoComponente';
   ```

4. **Actualizar exports:**

   ```tsx
   // src/components/index.ts
   export * from './NuevoComponente';
   ```

5. **Crear story:**

   ```tsx
   // stories/NuevoComponente.stories.tsx
   // (seguir patrón de Button.stories.tsx)
   ```

6. **Crear tests:**

   ```tsx
   // tests/NuevoComponente.test.tsx
   ```

7. **Actualizar CHANGELOG:**

   ```md
   ## [1.1.0] - 2026-02-13

   ### Added

   - New `NuevoComponente` component
   ```

## Mejores Prácticas

### DO ✅

- Usar TypeScript strict
- Crear barrel exports
- Agregar JSDoc comments
- Tests de accesibilidad
- Props con defaults seguros
- Usar CVA para variantes

### DON'T ❌

- No hardcodear colores (usar CSS variables)
- No usar `any` type
- No crear componentes monolíticos
- No duplicar código entre componentes
- No olvidar exports de tipos

## Recursos

- [shadcn/ui](https://ui.shadcn.com/)
- [Atomic Design](https://atomicdesign.bradfrost.com/)
- [CVA Documentation](https://github.com/joe-bell/cva)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/)

## Glosario para Principiantes

| Término                                   | Significado                                           |
| ----------------------------------------- | ----------------------------------------------------- |
| **SRP (Single Responsibility Principle)** | Cada componente hace una sola cosa bien               |
| **Separation of Concerns**                | Separar lógica, vista y estilos                       |
| **Composition**                           | Construir componentes pequeños y combinarlos          |
| **Type Safety**                           | TypeScript te ayuda a evitar errores                  |
| **Barrel Export**                         | Archivo que re-exporta muchos módulos (index.ts)      |
| **Entry Point**                           | El archivo principal que se importa primero           |
| **CVA**                                   | Library para hacer variantes de componentes           |
| **forwardRef**                            | Permite que un componente exponga un elemento del DOM |
| **Husky**                                 | Herramienta que ejecuta scripts antes de commit/push  |
| **lint-staged**                           | Ejecuta linter solo en archivos modificados           |
| **Conventional Commits**                  | Formato de mensajes de commit: tipo: descripción      |

## Conceptos Clave Explicados

### ¿Qué es un Barrel Export?

Es un archivo `index.ts` que exporta todo lo de una carpeta. Así puedes importar desde un solo lugar:

```tsx
// En lugar de esto:
import { Button } from './components/Button/Button';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';

// Puedes hacer esto:
import { Button, ErrorBoundary } from 'libreria-componentes';
```

### ¿Por qué usar CVA?

CVA (class-variance-authority) ayuda a manejar las variantes de un componente de forma organizada:

```tsx
// En lugar de muchos if/else:
const variant = variant === 'primary' ? 'bg-blue-500' : 'bg-gray-500';

// CVA lo hace más limpio:
const buttonVariants = cva('base', {
  variants: {
    variant: {
      primary: 'bg-blue-500',
      secondary: 'bg-gray-500',
    },
  },
});
```

### ¿Qué es forwardRef?

Sirve para que puedas usar el componente y acceder al elemento HTML que renderiza:

```tsx
const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return <button ref={ref} {...props} />;
});

// Ahora puedes usar ref:
<Button ref={myButtonRef} />;
```
