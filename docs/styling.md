# Estilado y Theming

## Visión general

La librería combina **Tailwind CSS** (utility-first), **variables CSS** (theming en runtime) y **CVA** (variantes tipadas). Los componentes nunca usan colores hardcodeados: siempre referencian variables del tema (`bg-primary`, `text-foreground`, `border-border`, ...).

## Librerías

| Librería                   | Versión | Uso                                                         |
| -------------------------- | ------- | ----------------------------------------------------------- |
| `tailwindcss`              | ^4.3    | Utilidades y mapeo de CSS variables                         |
| `@tailwindcss/postcss`     | ^4.3    | Pipeline PostCSS (sustituye `tailwindcss` + `autoprefixer`) |
| `tw-animate-css`           | ^1.4    | Animaciones v4 (`animate-in`, `accordion-*`, ...)           |
| `tailwind-merge`           | ^3.7    | Resolución de conflictos de clases (v3 = Tailwind 4)        |
| `clsx`                     | ^2.1.1  | Composición condicional de clases                           |
| `class-variance-authority` | ^0.7.1  | Definición de variantes                                     |

> `tailwind.config.cjs` es CommonJS (`.cjs`) porque el proyecto es ESM (`"type": "module"`). Tailwind 4 lo carga desde CSS con `@config '../tailwind.config.cjs'`; `postcss.config.cjs` solo registra `@tailwindcss/postcss`.

## `cn()` — utilidad principal

```ts
// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

```tsx
// 'p-4' y 'p-8' entran en conflicto: gana el último
className={cn('p-4', isLarge && 'p-8')} // → 'p-8'

// El className del consumidor siempre va al final para permitir override
className={cn('base-classes', variantClasses, className)}
```

## CVA

```tsx
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      },
      size: {
        sm: 'h-9 px-3 text-xs',
        default: 'h-10 px-4 py-2',
        lg: 'h-11 px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}
```

Reglas:

- Usa CVA **solo** cuando existan variantes reales. Un componente con una sola apariencia usa una constante de string.
- Nombres de variantes estándar: `default`, `secondary`, `outline`, `ghost`, `destructive`, `link`.
- Tamaños estándar: `sm`, `default`, `lg` (y `icon`/`xl` solo si aportan valor).
- No redeclares `variant`/`size` en la interfaz: `VariantProps` ya los tipa.
- Máximo ~6-8 variantes por eje; evita `soft-*`, `3d-*`, `glass-*`.

## Sistema de theming

### Flujo

```
palettes.ts / defaultTheme.ts        (colores con hsl(...))
            │
            ▼
       ThemeProvider                 (genera variables CSS y aplica clase theme-*)
            │
            ▼
      tailwind.config.cjs            (hsl(var(--background)))
            │
            ▼
      Componentes                    (bg-background, text-foreground, ...)
```

### Regla crítica: HSL crudo vs `hsl()`

- `tailwind.config.cjs` define `background: 'hsl(var(--background))'`.
- Por tanto, **la variable debe contener HSL crudo**: `--background: 0 0% 100%;`.
- Si guardas `hsl(...)` en la variable, el resultado es `hsl(hsl(...))`, que es **CSS inválido**.
- `defaultTheme.ts` y `palettes.ts` escriben los colores con `hsl(...)` porque `ThemeProvider` elimina el wrapper (`stripHsl`) antes de generar las variables.
- En `src/index.css` los valores deben ir **sin** wrapper.

### Tailwind 4: entrada CSS y escalas

`src/index.css` es el punto de entrada y empieza así:

```css
@import 'tailwindcss';
@import 'tw-animate-css';
@config '../tailwind.config.cjs';
```

- **`@config`** mantiene `tailwind.config.cjs` como fuente de tokens (`colors`, `radius`, `safelist`) mientras no se migre a `@theme`. No declares `keyframes`/`animation` en el config: Tailwind los genera sin archivo de origen y Vite avisa de que PostCSS no recibió la opción `from`. `tw-animate-css` ya aporta `--animate-accordion-down/up` y sus `@keyframes`.
- **`border-color`**: v4 usa `currentColor` por defecto. La capa base de `src/index.css` restaura `border-color: hsl(var(--border))` para que `border` sin color siga funcionando como en v3.
- **Escalas renombradas**: `shadow-sm` (v3) → `shadow-xs` (v4); `shadow` (v3) → `shadow-sm` (v4). Igual con blur: `backdrop-blur-sm` (v3) → `backdrop-blur-xs` (v4). Revisa cualquier clase nueva contra la escala de v4.
- **Animaciones**: `tw-animate-css` aporta `animate-in`/`animate-out`, `fade-*`, `slide-*`, `zoom-*` y `accordion-*`. `tailwindcss-animate` no es compatible con v4 y fue eliminado.
- **PostCSS**: solo `@tailwindcss/postcss`; v4 incluye el prefijado, así que `autoprefixer` ya no se instala.
- **Interlineado**: en v4 las utilidades `leading-*` se emiten después de `text-*`, por lo que `text-sm leading-relaxed` sí aplica el interlineado relajado (en v3 lo pisaba `text-sm`).

### `ThemeProvider`

```tsx
<ThemeProvider
  colorMode="dark" // 'light' | 'dark' (inicial; luego localStorage)
  defaultPalette="violet" // una de las 13 paletas
  defaultTheme={{ radius: '1rem' }} // overrides parciales
  storageKey="theme-color-mode"
  disableTransitionOnChange={false}
>
  <App />
</ThemeProvider>
```

El provider:

1. Envuelve los children en `<div class="{colorMode} theme-{palette}">`.
2. Genera las variables CSS del tema mergeado (base + paleta + overrides).
3. Persiste el modo en `localStorage`.
4. Expone `useTheme()`.

### `useTheme()`

```tsx
const { theme, colorMode, setColorMode, toggleColorMode, setTheme } = useTheme();
```

Úsalo **solo** cuando necesites leer valores en JS (charts, estilos dinámicos). En CSS, usa clases Tailwind.

### Paletas

`neutral`, `stone`, `zinc`, `slate`, `violet`, `rose`, `orange`, `emerald`, `blue`, `red`, `indigo`, `amber`, `cyan`.

Cada paleta define `colors.light` y `colors.dark` con **todos** los campos de `ThemeColors` (`background`, `foreground`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `warning`, `success`, `info`, `neutral`, `border`, `input`, `ring`, `chart.1..5` y sus `*Foreground`).

### Añadir una paleta

1. `src/components/Themes/palettes.ts`: añadir la entrada con `light` y `dark` completos.
2. `src/components/Themes/types.ts`: añadir el nombre al union `PaletteName`.
3. `src/index.css`: añadir `.theme-mipaleta { ... }` y `.dark .theme-mipaleta { ... }` con **HSL crudo**.
4. `tailwind.config.cjs`: añadir `'theme-mipaleta'` al `safelist`.
5. `.storybook/preview.tsx`: añadir la opción al toolbar `palette`.
6. Añadir un test en `tests/Themes.test.tsx` si cambia el comportamiento del provider.

## Variables disponibles

| Variable                                     | Utilidad Tailwind                                          |
| -------------------------------------------- | ---------------------------------------------------------- |
| `--background` / `--foreground`              | `bg-background` / `text-foreground`                        |
| `--card` / `--card-foreground`               | `bg-card` / `text-card-foreground`                         |
| `--popover` / `--popover-foreground`         | `bg-popover` / `text-popover-foreground`                   |
| `--primary` / `--primary-foreground`         | `bg-primary` / `text-primary-foreground`                   |
| `--secondary` / `--secondary-foreground`     | `bg-secondary` / `text-secondary-foreground`               |
| `--muted` / `--muted-foreground`             | `bg-muted` / `text-muted-foreground`                       |
| `--accent` / `--accent-foreground`           | `bg-accent` / `text-accent-foreground`                     |
| `--destructive` / `--destructive-foreground` | `bg-destructive` / `text-destructive-foreground`           |
| `--success` / `--success-foreground`         | `bg-success` / `text-success-foreground`                   |
| `--warning` / `--warning-foreground`         | `bg-warning` / `text-warning-foreground`                   |
| `--info` / `--info-foreground`               | `bg-info` / `text-info-foreground`                         |
| `--neutral` / `--neutral-foreground`         | `bg-neutral` / `text-neutral-foreground`                   |
| `--border`, `--input`, `--ring`              | `border-border`, `border-input`, `ring-ring`               |
| `--radius`                                   | `rounded-lg` (`var(--radius)`), `rounded-md`, `rounded-sm` |
| `--chart-1` … `--chart-5`                    | Charts (uso en JS)                                         |

## Estados estándar

```tsx
'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';
'disabled:pointer-events-none disabled:opacity-50';
'transition-colors';
```

## Mejores prácticas

- ✅ `cn()` para merge; `className` del consumidor al final.
- ✅ Variables del tema; nunca `bg-blue-500`, `#fff` o `rgb(...)`.
- ✅ Escala de spacing de Tailwind (`p-4`, `gap-2`), sin valores arbitrarios salvo casos justificados.
- ✅ `aria-hidden` en iconos decorativos.
- ❌ No usar `style={{ color: ... }}` para colores del tema.
- ❌ No duplicar clases de variantes fuera de CVA.

Ver también `AGENTS.md` → "Deuda técnica conocida" para las inconsistencias actuales del theming.

## Recursos

- [Tailwind CSS](https://tailwindcss.com/docs)
- [tw-animate-css](https://github.com/Wombosvideo/tw-animate-css)
- [class-variance-authority](https://cva.style/docs)
- [shadcn/ui theming](https://ui.shadcn.com/docs/theming)
