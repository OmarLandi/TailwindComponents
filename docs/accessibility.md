# Accesibilidad (a11y)

## Objetivo

Todos los componentes deben ser usables con teclado y lectores de pantalla, y cumplir **WCAG 2.2 nivel AA** en lo posible. La accesibilidad se verifica automáticamente con `axe-core` en cada archivo de test y manualmente con el panel **Accessibility** de Storybook.

## Herramientas

| Herramienta                   | Uso                                           |
| ----------------------------- | --------------------------------------------- |
| `axe-core`                    | Auditoría automatizada dentro de Vitest       |
| `@storybook/addon-a11y`       | Panel de accesibilidad por story en Storybook |
| `@testing-library/react`      | Queries por rol/nombre accesible              |
| `@testing-library/user-event` | Interacciones reales (teclado, click, tab)    |

> Los tests usan `axe.run(container)` de `axe-core` directamente y comprueban `results.violations`. No uses `toHaveNoViolations` ni `@axe-core/react` (ya no está instalado).

## Patrón de test obligatorio

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { Badge } from '../src/components/Badge';

describe('Badge', () => {
  it('renders correctly', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Badge>New</Badge>);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
```

Cada componente nuevo **debe** incluir al menos un test con `axe.run(container)`. Si el
componente renderiza en un portal (Dialog, Drawer, Select, DropdownMenu, Popover, Toast),
abre el overlay y audita `axe.run(document.body)` o el nodo `[data-theme-portal]`: el
contenedor de la story no incluye el portal y el test pasaría sin auditar el contenido real.

> `axe` en `jsdom` desactiva `color-contrast`; el contraste se verifica en Storybook o con un
> test que calcule ratios a partir de los tokens.

## Setup de tests

`tests/setup.ts` prepara el entorno `jsdom` con los polyfills que necesitan Radix y Embla:

- `ResizeObserver`, `IntersectionObserver`, `matchMedia`
- `HTMLCanvasElement.prototype.getContext`
- `hasPointerCapture`, `setPointerCapture`, `releasePointerCapture`, `scrollIntoView`
- `PointerEvent` (mock si no existe)

Si un componente nuevo usa una API de navegador no cubierta, añade el polyfill en `tests/setup.ts` en lugar de mockearlo en cada test.

## Patrones por componente

### Formularios

- `<label htmlFor={id}>` asociado al control. Usa `React.useId()` cuando no se reciba `id`.
- `aria-invalid={hasError}` y `aria-describedby` apuntando al helper o al error.
- El mensaje de error debe tener `role="alert"` (o `aria-live`).
- `required` real en el input, con indicador visual `aria-hidden` para el asterisco.
- `RadioGroup`/`ToggleGroup`: agrupa con `<fieldset>` + `<legend>` cuando representen una pregunta.

```tsx
const generatedId = React.useId();
const inputId = id || generatedId;
const hasError = !!errorMessage;

<label htmlFor={inputId}>{label}</label>
<input
  id={inputId}
  aria-invalid={hasError}
  aria-describedby={hasError ? `${inputId}-error` : undefined}
/>
{hasError && (
  <p id={`${inputId}-error`} role="alert">
    {errorMessage}
  </p>
)}
```

### Botones e iconos

- Usa `<button type="button">`; no `<div onClick>`.
- Botones solo-icono necesitan `aria-label`.
- Iconos decorativos: `aria-hidden="true"` y `focusable="false"` cuando aplique.
- Estado de carga: `aria-busy` + `disabled` (el `Button` ya lo hace).

### Diálogos y overlays

Radix exige título y descripción accesibles:

- `Dialog` / `Drawer`: incluye `DialogTitle` y `DialogDescription`.
- Si no hay descripción visible, usa `aria-describedby={undefined}`.
- No elimines el `DialogClose`; mantén cierre por `Escape`.

### Navegación por teclado

Prueba explícitamente:

| Componente                     | Teclas                              |
| ------------------------------ | ----------------------------------- |
| `Tabs`                         | Flechas izquierda/derecha, Home/End |
| `Accordion`                    | Enter/Space, flechas                |
| `RadioGroup`, `ToggleGroup`    | Flechas, Space                      |
| `Select`, `Combobox`           | Flechas, Enter, Escape              |
| `Dialog`, `Drawer`, `Popover`  | Escape, Tab (focus trap)            |
| `Button`, `Checkbox`, `Switch` | Enter/Space                         |

### Elementos decorativos

- `Skeleton`, overlays y adornos: `aria-hidden="true"`.
- Imágenes decorativas: `alt=""`.

### Anuncios dinámicos

- Errores y cambios importantes: `role="alert"` o `aria-live="assertive"`.
- Contadores/estados no críticos: `aria-live="polite"`.

## Errores y estados

- `ErrorBoundary`: contenedor con `role="alert"` y `aria-live="assertive"`; reutiliza `buttonVariants`/`Button` para el botón de reset.
- Estados vacíos (`No results found`): texto visible, no solo color.
- Estados `disabled`: además de `disabled`, evita que el foco entre en elementos no interactivos.

## Checklist antes de cerrar un componente

- [ ] Rol semántico correcto (o ARIA equivalente).
- [ ] Nombre accesible (`label`, `aria-label` o contenido textual).
- [ ] Navegable con Tab y operable con teclado.
- [ ] Foco visible (`focus-visible:ring-2`).
- [ ] Estados anunciados (`aria-invalid`, `aria-busy`, `aria-live`, `role="alert"`).
- [ ] Iconos decorativos con `aria-hidden`.
- [ ] Contraste suficiente en light/dark y en todas las paletas.
- [ ] Test de `axe.run(container)` sin violaciones; portales con `axe.run(document.body)`.
- [ ] Targets ≥44×44 px y sin contenido oculto focusable.
- [ ] `prefers-reduced-motion` y RTL comprobados.
- [ ] Sin scroll horizontal de página en 375/768/1280 px.
- [ ] Revisado el panel Accessibility en Storybook.

## Recursos

- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
- [Radix Accessibility](https://www.radix-ui.com/primitives/docs/overview/accessibility)
- [Testing Library queries](https://testing-library.com/docs/queries/about/#priority)
