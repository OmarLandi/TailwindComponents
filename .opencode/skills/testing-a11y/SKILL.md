---
name: testing-a11y
description: Use when writing, fixing or reviewing Vitest + Testing Library tests, axe-core accessibility tests, keyboard interaction tests or jsdom polyfills in this library. Trigger on "test", "tests", "vitest", "testing library", "axe", "a11y", "accesibilidad", "coverage", "polyfill".
---

# Testing y accesibilidad

## Stack real

- Runner: **Vitest 2** con `environment: 'jsdom'`.
- Setup global: `tests/setup.ts` (polyfills de Radix/Embla).
- LibrerÃ­as: `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`, `axe-core`.
- Los tests viven en `tests/<Name>.test.tsx` (un archivo por componente).

## Comandos

```bash
npm run test:run                                   # toda la suite (38 archivos / 335 tests)
npx vitest run tests/Button.test.tsx               # un archivo
npx vitest run -t "renders with children"          # un test por nombre
npm run test:coverage                              # cobertura
npm test                                           # watch
```

## Plantilla base

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { Button } from '../src/components/Button';

describe('Button', () => {
  it('renders with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('applies variant classes', () => {
    render(<Button variant="destructive">Delete</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-destructive');
  });

  it('handles click', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
```

## Reglas obligatorias

- **`axe.run(container)` en cada componente.** No uses `toHaveNoViolations`; `@axe-core/react` no está instalado.
- **Portales**: si el componente renderiza en un portal (Dialog, Drawer, Select, DropdownMenu,
  Popover, Toast), abre el overlay y audita `axe.run(document.body)` (o el nodo
  `[data-theme-portal]`). `axe.run(container)` pasa aunque el portal tenga violaciones.
- Importa `axe from 'axe-core'` (default), no `{ axe }`.
- Usa queries accesibles primero: `getByRole`, `getByLabelText`, `getByText`; evita `data-testid` salvo para elementos sin semÃ¡ntica.
- InteractÃºa con `userEvent`, no `fireEvent` (excepto `fireEvent.change` en inputs controlados que lo requieran; el repo mezcla ambos).
- Testea el **ida y vuelta**: abrir/cerrar, activar/desactivar, mostrar/ocultar.
- Testea estados: `disabled`, `loading`, `error`, vacÃ­o, valores lÃ­mite (0/100%).
- Testea los polyfills necesarios aÃ±adiÃ©ndolos a `tests/setup.ts`, no mockeando en cada archivo.
- `axe` en jsdom **no evalÃºa contraste** (`color-contrast` se desactiva sin canvas); el
  contraste se verifica en Storybook o con un test de cÃ¡lculo de tokens.

## QuÃ© cubrir por tipo

| Tipo                              | Tests mÃ­nimos                                                                       |
| --------------------------------- | ------------------------------------------------------------------------------------ |
| Presentacional                    | Render, variantes, tamaÃ±os, `className`, axe                                        |
| Formulario                        | Label asociado, `aria-invalid`, `aria-describedby`, error, disabled                  |
| Interactivo                       | Click, teclado (Enter/Space), axe                                                    |
| Radix (Select, Tabs)              | Abrir/cerrar, navegaciÃ³n con flechas, Escape, selecciÃ³n                            |
| Overlay (Dialog, Drawer, Popover) | Abrir, cerrar (Escape/click), focus, `axe.run(document.body)`                        |
| NavegaciÃ³n mÃ³vil                | Trigger, drawer modal, Escape, foco atrapado/retornado, sin links ocultos focusables |
| Toggle (Switch, ThemeToggle)      | Estado `aria-checked`, click, controlado/no controlado                               |
| Datos (Table, Progress, Slider)   | Render de valores, 0/100%, scroll focusable, axe                                     |
| Layout / Template                 | Landmarks, un `<main>`/`<h1>`, skip link, orden de foco, axe                         |

## Teclado por componente

| Componente                     | Teclas                 |
| ------------------------------ | ---------------------- |
| `Tabs`                         | Flechas, Home/End      |
| `Accordion`                    | Enter/Space, flechas   |
| `RadioGroup`, `ToggleGroup`    | Flechas, Space         |
| `Select`, `Combobox`           | Flechas, Enter, Escape |
| `Dialog`, `Drawer`, `Popover`  | Escape, Tab            |
| `Button`, `Checkbox`, `Switch` | Enter/Space            |

## Responsive, RTL y motion

`jsdom` no calcula layout ni aplica media queries, asÃ­ que los tests unitarios **no** pueden
probar overflow ni breakpoints. Lo que sÃ­ debes cubrir en tests:

- Que el componente renderice el contenido responsive (p. ej. no oculte links con
  `opacity-0` dejÃ¡ndolos en el DOM).
- Que la navegaciÃ³n mÃ³vil abra un diÃ¡logo modal y devuelva el foco.
- Que `Table` tenga un wrapper con `tabIndex={0}` y nombre accesible.
- Que los overlays respeten `aria-modal`/Escape y no dejen contenido de fondo focusable.

La verificación visual de las plantillas es automática: `npm run test:e2e` (Playwright) comprueba
375/768/1280 px, overflow horizontal y snapshots. Para stories no-plantilla revisa manualmente en
Storybook, light/dark, 2-3 paletas, `prefers-reduced-motion` y `dir="rtl"`; targets ≥44 px y foco visible.

`tests/setup.ts` mockea `matchMedia` con `matches: false`; si necesitas simular
`prefers-reduced-motion: reduce`, haz un mock local y restÃ¡uralo.

## Setup de jsdom

`tests/setup.ts` ya incluye:

- `ResizeObserver`, `IntersectionObserver`, `matchMedia`
- `HTMLCanvasElement.prototype.getContext`
- `hasPointerCapture`, `setPointerCapture`, `releasePointerCapture`, `scrollIntoView`
- `PointerEvent` mock

Si un componente usa otra API, aÃ±Ã¡dela allÃ­.

## Radix: warnings frecuentes

- `DialogContent requires a DialogTitle` â†’ aÃ±ade `DialogTitle` (o `VisuallyHidden`).
- `Missing Description or aria-describedby` â†’ aÃ±ade `DialogDescription` o `aria-describedby={undefined}`.
- Los warnings no fallan el test, pero deben corregirse; algunos tests actuales todavÃ­a los emiten (ver deuda tÃ©cnica en `AGENTS.md`).

## No hacer

- âŒ Snapshot tests para todo (frÃ¡giles); solo si aportan valor.
- âŒ `fireEvent` para clicks/teclado si `userEvent` sirve.
- âŒ Depender de clases exactas de Radix en vez de roles/estados.
- âŒ Dejar un componente sin test de `axe`.
- âŒ Silenciar `console.error` para tapar warnings de accesibilidad.
