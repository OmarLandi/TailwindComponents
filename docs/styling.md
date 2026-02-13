# Documentación de Estilado y CSS

## Visión General

Esta librería utiliza un enfoque de **CSS utility-first** con Tailwind CSS, combinado con un sistema de variables CSS para theming flexible.

## Librerías de Estilado

### Tailwind CSS

**Propósito:** Framework CSS utility-first para estilado rápido.

**Versión:** ^3.4.17

**Configuración:** `tailwind.config.js`

```js
export default {
  darkMode: ['class'],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        // ... más colores
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
```

### tailwindcss-animate

**Propósito:** Plugin que agrega utilidades de animación a Tailwind.

**Versión:** ^1.0.7

**Características:**

- Animaciones predefinidas (`animate-spin`, `animate-pulse`, etc.)
- Clases para animaciones de accordion
- Soporte para keyframes personalizados

### tailwind-merge

**Propósito:** Merge de clases Tailwind sin conflictos.

**Versión:** ^3.4.0

**Uso:**

```tsx
import { twMerge } from 'tailwind-merge';

// Merge de clases
twMerge('px-2 py-2', 'p-4'); // → 'p-4'
```

### clsx

**Propósito:** Constructora de className condicional.

**Versión:** ^2.1.1

**Uso:**

```tsx
import { clsx } from 'clsx';

clsx('foo', true && 'bar', 'baz'); // → 'foo bar baz'
```

### cn - Utilidad Principal ( IMPORTANTE)

Esta es una de las funciones más importantes de la librería. Sirve para combinar clases de Tailwind sin conflictos.

**Problema sin cn():**

```tsx
// Esto puede causar conflictos
className={'p-4 ' + (isLarge ? 'p-8' : 'p-2')}
```

**Solución con cn():**

```tsx
// cn() resuelve conflictos automáticamente
className={cn('p-4', isLarge ? 'p-8' : 'p-2')}
// resultado: 'p-8' (se queda con el último valor)
```

```tsx
// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Uso en componentes:**

```tsx
import { cn } from '@/lib/utils';

<button
  className={cn(
    'base-classes',
    variant === 'primary' && 'bg-primary text-white',
    className // permite override
  )}
/>;
```

### class-variance-authority (CVA)

**Propósito:** Sistema de variantes para componentes.

**Versión:** ^0.7.1

**Uso:**

```tsx
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva('base-classes', {
  variants: {
    variant: {
      default: 'bg-primary text-white',
      secondary: 'bg-secondary text-secondary-foreground',
    },
    size: {
      sm: 'h-8 px-3',
      default: 'h-10 px-4',
      lg: 'h-12 px-8',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

type ButtonProps = VariantProps<typeof buttonVariants>;
```

## Sistema de Temas

### Variables CSS

El archivo `src/index.css` define variables CSS para theming:

```css
@layer base {
  :root {
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    /* ... */
  }

  .dark {
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    /* ... */
  }
}
```

### Colores Disponibles

| Variable        | Uso                            | Modo Oscuro |
| --------------- | ------------------------------ | ----------- |
| `--primary`     | Color principal de la marca    | Invertido   |
| `--secondary`   | Color secundario               | Invertido   |
| `--destructive` | Acciones destructivas (borrar) | Ajustado    |
| `--warning`     | Advertencias                   | Ajustado    |
| `--success`     | Mensajes exitosos              | Ajustado    |
| `--info`        | Información                    | Ajustado    |
| `--neutral`     | Color neutro                   | Ajustado    |
| `--accent`      | Color de acento                | Invertido   |
| `--background`  | Fondo principal                | Invertido   |
| `--foreground`  | Texto principal                | Invertido   |
| `--muted`       | Elementos silenciados          | Invertido   |
| `--border`      | Bordes                         | Ajustado    |

## Personalización de Temas

### Override de Colores

```css
/* En tu CSS */
:root {
  --primary: 250 84% 54%; /* Violeta */
  --primary-foreground: 0 0% 100%;
}
```

### Agregar Nuevos Colores

```js
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: 'hsl(var(--brand))',
          foreground: 'hsl(var(--brand-foreground))',
        },
      },
    },
  },
};
```

```css
:root {
  --brand: 250 84% 54%;
  --brand-foreground: 0 0% 100%;
}
```

## Utilidades de Estilado

### Animaciones

```tsx
// Transiciones
<button className="transition-all duration-200">...</button>

// Animaciones predefinidas
<button className="animate-spin">...</button>
<button className="animate-pulse">...</button>

// Animaciones personalizadas (agregadas via tailwindcss-animate)
<button className="animate-accordion-down">...</button>
```

### Estados

```tsx
// Hover
<button className="hover:bg-primary/90">...</button>

// Focus
<button className="focus-visible:ring-2 focus-visible:ring-ring">...</button>

// Active/Pressed
<button className="active:scale-[0.98]">...</button>

// Disabled
<button className="disabled:opacity-50 disabled:pointer-events-none">...</button>
```

## Mejores Prácticas

### 1. Usa `cn()` para merge de clases

```tsx
// ✅ Correcto
className={cn('base-classes', variantClasses, className)}

// ❌ Evitar
className={`base-classes ${variantClasses} ${className}`}
```

### 2. Define variantes con CVA

```tsx
// ✅ Correcto - usa CVA
const componentVariants = cva('base-classes', {
  variants: { variant: { ... } }
});

// ❌ Evitar - hardcoded classes
const variants = {
  default: 'bg-blue-500',
  secondary: 'bg-gray-500',
};
```

### 3. Usa variables CSS para theming

```tsx
// ✅ Correcto
className = 'bg-primary text-primary-foreground';

// ❌ Evitar - valores hardcoded
className = 'bg-blue-500 text-white';
```

### 4. Sigue la escala de spacing de Tailwind

```tsx
// ✅ Usa escalas consistentes
className = 'p-4'; // 1rem = 16px
className = 'gap-2'; // 0.5rem = 8px

// ❌ Evita valores arbitrarios
className = 'p-[13px]';
```

## Recursos

- [Documentación Tailwind CSS](https://tailwindcss.com/docs)
- [Tailwind CSS Animate](https://github.com/pmndrs/tailwindcss-animate)
- [class-variance-authority](https://github.com/joe-bell/cva)
- [shadcn/ui Theming](https://ui.shadcn.com/docs/theming)
