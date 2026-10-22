# AuditorÃ­a de componentes â€” 2026-10-21

AuditorÃ­a completa de los 49 componentes, sus stories, tests y fundamentos de theming.
El objetivo es que la librerÃ­a permita **armar cualquier pÃ¡gina web moderna** con
componentes customizables, responsive y accesibles, incluyendo modelos de layout.

## 1. Resumen ejecutivo

**Fortalezas**

- Base sÃ³lida de primitivas Radix (foco, teclado, portales) y CVA para variantes.
- Theming por variables CSS con 13 paletas, dark mode y portales tematizados.
- 52 archivos de test / 402 tests, con `axe-core` en todos; `tsc` y ESLint limpios.
- Storybook 8 con toolbar de color/paleta, addon a11y y autodocs.
- Build ESM + CJS + CSS y exports correctos.

**Brechas críticas (foto 2026-10-21; ver actualizaciones)**

1. **La capa de layout, las plantillas y la regresion visual ya existen.** Quedan las primitivas `AspectRatio`, `ScrollArea` y `Separator`, y los componentes de datos del roadmap.
2. **La responsividad de las plantillas se verifica con Playwright.** Las historias no-plantilla siguen usando anchos fijos (`w-[300px]`, `w-[350px]`) y no tienen test de overflow.
3. **La accesibilidad de overlays no se audita.** Varios tests ejecutan `axe.run(container)`
   cuando el diÃ¡logo vive fuera de ese contenedor (portal), por lo que el test pasa sin auditar
   el contenido real.
4. **Contraste insuficiente en tokens semÃ¡nticos.** `warning`, `info`, `success` y `destructive`
   no llegan a 4.5:1 con su foreground blanco; `muted-foreground`/`muted` queda en ~4.34:1.
5. **Combobox no es operable con teclado.** Las opciones no son focusables, no hay
   `role="listbox"`/`aria-activedescendant` ni navegaciÃ³n con flechas.
6. **NavegaciÃ³n mÃ³vil no modal.** `NavbarMenu` y `Sidebar` dejan contenido invisible en el
   tab order y no tienen focus trap, Escape ni scroll lock.
7. **RTL y reduced motion no existen** en el cÃ³digo de componentes.
8. **Tokens de tipografÃ­a, sombras y spacing son inertes**: `ThemeProvider` los emite, pero
   `tailwind.config.cjs` no los consume.

**Veredicto:** base de primitivas sólida, capa de layout y plantillas completas. Quedan `AspectRatio`/`ScrollArea`/`Separator` y los componentes de datos.

> **Estado Fase 0 (2026-10-21):** completadas las correcciones P0 de contraste (13 paletas x
> light/dark), auditoria de portales con `axe.run(document.body)`, `Button asChild`, `Slider`,
> `InputOTP`, `Select`, `Combobox` (listbox/flechas/Home/End/Enter/Escape), `Navbar`/`Sidebar`
> moviles como `Drawer` modal y `Table` como region enfocable. Tambien se anadieron limites
> `85dvh`, safe areas y targets de cierre de 44 px. Verificacion: `tsc` y ESLint limpios,
> **38 archivos / 335 tests**. Pendiente: regresion visual real (Playwright) y capa de layout.

> **Actualizacion 2026-10-22:** se anadieron `Field`, `Form`, `AlertDialog`, `Command`,
> `EmptyState` y la capa de layout (`Stack`, `Grid`, `Section`, `PageHeader`, `AppShell`,
> `Prose`, `SkipLink`, `VisuallyHidden`); plantillas `Templates/*` y un smoke test axe; inventario de 49 componentes y **52 archivos /
> 402 tests**; Playwright cubre las plantillas a 375/768/1280 (33 casos).

## 2. Contrato de calidad propuesto

Toda contribuciÃ³n debe cumplir:

| Eje              | Contrato                                                                                                                                                          |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Responsive**   | Mobile-first; soporte 320â€“1536 px; sin scroll horizontal de pÃ¡gina; targets â‰¥ 44 px; `dvh` y `env(safe-area-inset-*)`.                                       |
| **Accesible**    | WCAG 2.2 AA; HTML semÃ¡ntico; teclado completo; foco visible; nombres accesibles; contraste 4.5:1 / 3:1; `motion-reduce`.                                         |
| **Customizable** | Tokens semÃ¡nticos, CVA, `asChild` cuando aplique, `className`/`ref`, composiciÃ³n; cero anchos fijos de pÃ¡gina y cero hex/rgb.                                  |
| **Layout**       | Implementados: `AppShell`, `Grid`, `PageHeader`, `Prose`, `Section`, `SkipLink`, `Stack`, `VisuallyHidden`. Pendientes: `AspectRatio`, `ScrollArea`, `Separator`. |
| **Verificable**  | Story con viewports 375/768/1280, `axe` sobre `document.body` cuando hay portales, test de teclado, RTL y reduced motion.                                         |

## 3. Hallazgos transversales

### P0 â€” bloqueantes para el objetivo

| Hallazgo                                | Evidencia                                                                                                                                           | AcciÃ³n                                                                    |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Contraste insuficiente                  | `src/index.css:21-30`, `src/components/Themes/defaultTheme.ts:18-27`; warning 1.98:1, info 2.85:1, success 3.35:1, destructive 3.59:1, muted 4.34:1 | Ajustar foregrounds/tokens y aÃ±adir test de contraste por paleta/modo.    |
| Axe de overlays no audita el portal     | `tests/Dialog.test.tsx:101-105,120`; `tests/Drawer.test.tsx`; `tests/Popover.test.tsx`                                                              | Auditar `document.body` o el nodo `[data-theme-portal]` en estado abierto. |
| Combobox sin modelo de teclado          | `src/components/Combobox/Combobox.tsx:170-189` (options son `div` sin foco, sin listbox)                                                            | Reimplementar con listbox/activedescendant o una primitiva probada.        |
| NavegaciÃ³n mÃ³vil no modal             | `src/components/Navbar/Navbar.tsx:154-169`; `src/components/Sidebar/Sidebar.tsx:66-113`                                                             | Reutilizar `Drawer` o aÃ±adir inert/Escape/focus trap/scroll lock.         |
| Plantillas de pagina (resuelto)         | Implementadas en `stories/templates/` con smoke test axe y Playwright                                                                               | Mantener baselines y cobertura de variantes.                               |
| Responsividad de plantillas (resuelto)  | Playwright verifica 375/768/1280 y overflow horizontal                                                                                              | Extender la cobertura a stories no-plantilla.                              |
| Contenido oculto sigue siendo focusable | Navbar `max-h-0 opacity-0`; Sidebar `-translate-x-full`                                                                                             | `hidden`/`inert`/render condicional + focus trap.                          |
| Tabla con scroll no accesible           | `src/components/Table/Table.tsx:7` (div `overflow-auto` sin `tabIndex`/`role`/label)                                                                | `tabIndex={0}`, `role="region"`, `aria-label` y foco visible.              |
| DiÃ¡logo sin lÃ­mite de altura          | `src/components/Dialog/Dialog.tsx:47-50` (`w-full max-w-lg`, sin `max-h`/scroll)                                                                    | `max-h-[85dvh] overflow-y-auto` + `DrawerBody`/`DialogBody`.               |

### P1 â€” calidad y escalabilidad

- **Button `asChild` roto:** el contenido no-loading se envuelve en `<span>`, asÃ­ que `Slot`
  aplica las props al span y no al `<a>` del consumidor (`Button.tsx:67,89-94`).
- **Slider no compone `onValueChange`:** `onValueChange={setInternalValue}` se sobrescribe con
  `{...props}`; un slider no controlado con callback no actualiza (`Slider.tsx:57-61`).
- **InputOTP sin asociaciÃ³n de error:** calcula `errorId`/`helperId` pero no los aplica a los
  inputs; ademÃ¡s `{...props}` va despuÃ©s y puede pisar `type`, `maxLength` y `aria-label`
  (`InputOTP.tsx:43-44,141-169`).
- **SelectField sin validaciÃ³n programÃ¡tica:** solo `data-invalid`; error/helper sin `id` ni
  `role="alert"` (`Select.tsx:62,378-379`).
- **Touch targets pequeÃ±os:** 16 px checkbox/radio, 20 px slider, 24 px switch, 32â€“40 px
  botones/inputs, 16 px cierres de Dialog/Drawer (`Dialog.tsx:54`, `Drawer.tsx:79`).
- **RTL inexistente:** `left/right`, `pl/pr`, `space-x`, `translate-x` en Navbar, Sidebar,
  Pagination, Toast, DatePicker; no hay `DirectionProvider` ni utilidades lÃ³gicas.
- **Reduced motion inexistente:** 27 usos de `animate-*`/`transition-*` sin `motion-reduce`.
- **Focus inconsistente:** `focus:` en lugar de `focus-visible:` en cierres; falta
  `ring-offset-background` en Accordion, Navbar, Sidebar, Tabs.
- **Tokens inertes:** `ThemeProvider` emite `--font-*`, `--text-*`, `--shadow-*`, `--radius-*`,
  pero Tailwind solo mapea colores y `--radius` (`tailwind.config.cjs:36-107`).
- **Paletas duplicadas 4Ã—:** `palettes.ts`, `src/index.css`, safelist y toolbar; sin generador.
- **Overlays con color literal:** `bg-black/80`/`bg-black/50` en Dialog, Drawer, Sidebar;
  no hay token `--overlay`.
- **ThemeProvider inyecta un `<div>` de layout** sin `asChild`/`className`, rompiendo cadenas
  `h-full` y grids de app shell (`ThemeProvider.tsx:197`).
- **CSS de la librerÃ­a muta el host:** `* { border-border }` y `body { bg-background }`
  (`src/index.css:78-85`).
- **Sin `color-scheme`, safe areas ni `dvh`** en overlays y navegaciÃ³n.
- **Microcopy en inglÃ©s hardcodeado** en Navbar, Sidebar, Breadcrumb, Pagination, Dialog,
  Drawer, Toast; sin props de label/i18n.
- **`Tooltip` no usa el portal tematizado** y no tiene `max-w` ni `collisionPadding`.
- **`DataTable`** ausente; `Command`, `AlertDialog`, `EmptyState`, `Field` y `Form` ya implementados (2026-10-22) (ver Â§5).

## 4. Hallazgos por componente

### NavegaciÃ³n

| Componente     | Hallazgos clave                                                                                                                                                                                 |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Breadcrumb** | P0: `BreadcrumbEllipsis` mezcla `aria-hidden` con `sr-only`; `BreadcrumbPage` usa `role="link"` no focusable. P1: sin truncado/colapso, targets pequeÃ±os, sin `asChild` ni label configurable. |
| **Navbar**     | P0: menÃº mÃ³vil cerrado sigue en tab order; sin `aria-controls`/Escape; desktop sin landmark `<nav>`. P1: duplica Ã¡rbol de links, sin `asChild`, alturas y `max-w` fijos, sin modo tablet.    |
| **Pagination** | P0: sin wrap/scroll; First/Prev/Next/Last no expresan lÃ­mites. P1: ellipsis decorativo, sin API `page/pageCount/onPageChange`, sin `asChild`, targets pequeÃ±os.                               |
| **Sidebar**    | P0: links colapsados sin nombre accesible; off-canvas cerrado focusable; no modal. P1: sin provider/contexto, sin submenÃºs, `bg-black/50`, sin `asChild`, close solo si `collapsible`.         |
| **Tabs**       | P0: lista sin wrap/scroll en mÃ³vil. P1: sin variantes (underline/pills/segmented), sin orientaciÃ³n vertical real, targets ~34 px, sin `aria-label` documentado.                               |

### Formularios

| Componente      | Hallazgos clave                                                                                                                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Button**      | P1: `asChild` roto por el `<span>`; `whitespace-nowrap` impide labels largos; iconos sin `shrink-0`/`aria-hidden`; `responsiveSize` sin tipar.                                                   |
| **Checkbox**    | P1: indeterminado pinta un check; target 16 px. P2: `ml-6` fijo, sin wrapper/label className, helper y error no se describen juntos.                                                             |
| **Combobox**    | P0: sin teclado/listbox; label sin `htmlFor`, clear anidado en `<button>`, sin `name`/hidden input. P1: popover `w-full` en portal, sin `collisionPadding`, targets pequeÃ±os, axe solo cerrado. |
| **DatePicker**  | P1: sin locale/format/min/max/disabled days/name; calendario sin max-width; dÃ­as 36 px. P2: sin fallback de fecha escrita, axe solo cerrado.                                                    |
| **InputOTP**    | P1: error/helper IDs sin aplicar; sin grupo/roving focus; celdas fijas 40Ã—48 no caben a 320 px; `name` en todas las celdas; props pisan comportamiento.                                         |
| **RadioGroup**  | P1: `required` no se reenvÃ­a ni `aria-required`; `peer-disabled` no aplica. P2: horizontal sin wrap, target 16 px, sin descripciÃ³n por Ã­tem.                                                  |
| **Select**      | P1: error/helper sin IDs/alert; search input dentro del listbox; clear anidado; `onOpenChange` pisado; content puede ocupar todo el viewport.                                                    |
| **Slider**      | P1: `onValueChange` del consumidor pisa el estado interno; label sin `htmlFor`; helper sin `aria-describedby`; thumbs sin nombres distintos; target 20 px.                                       |
| **Switch**      | P1: target 24 px, sin tamaÃ±os ni `labelPosition`. P2: `required` sin semÃ¡ntica/marcador, sin wrapper className, sin tests de teclado/descr.                                                    |
| **Textarea**    | P1: `text-sm` provoca zoom en iOS; loading deshabilita en vez de `readOnly`+`aria-busy`; spinner sin `aria-hidden`. P2: sin autosize/contador, wrapper sin className.                            |
| **TextField**   | P1: variante `underlined` sin foco visible; iconos decorativos no `aria-hidden`; `pointer-events-none` impide icono interactivo; 14 px en mÃ³vil.                                                |
| **ToggleGroup** | P1: root sin wrap/scroll; `label` se filtra al DOM; `cloneElement` se rompe con wrappers/fragments; targets 36 px. P2: sin field wrapper ni `asChild`.                                           |

### Data Display

| Componente        | Hallazgos clave                                                                                                                                                                                 |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Accordion**     | P0: trigger sin `focus-visible`. P1: sin reduced motion; contenido largo sin max-height; `className` no llega al wrapper animado.                                                               |
| **Alert**         | P0: `role="alert"` siempre; warning/info con contraste insuficiente. P1: `h5` fijo, icono con `left/pl` fÃ­sicos, sin action/dismiss.                                                           |
| **Avatar**        | P1: tamaÃ±o fijo 40 px, sin `object-cover`, sin tamaÃ±os/grupo/badge. P2: fallback sin tipografÃ­a, `alt` no obligatorio.                                                                       |
| **Badge**         | P0: success/warning/info con foreground que falla AA. P1: `div` con focus ring, sin `asChild`, `sm` 10 px, sin nowrap/truncado.                                                                 |
| **Calendar**      | P0: dÃ­as 36 px y nav 28 px; contraste bajo en outside/disabled. P1: doble padding, sin `numberOfMonths` responsive, ref en wrapper y no en DayPicker.                                          |
| **Card**          | P0: footer sin wrap. P1: `p-6` fijo, `CardTitle` siempre `h3`, sin `asChild`/media/overflow, story con `w-[350px]`.                                                                             |
| **Carousel**      | P0: autoplay sin reduced motion/pausa; vertical roto (`flex` fijo); sin nombre accesible/estado de slide. P1: flechas 32 px y no orientadas; sin items-per-view; listener `reInit` sin cleanup. |
| **Container**     | P1: `fullWidth` es no-op, tamaÃ±os no coinciden con docs, `minHeight` se pisa con `style`, sin safe-area. P2: sin `as`/bleed.                                                                   |
| **Dialog**        | P0: sin max-height/scroll mÃ³vil; close 16 px. P1: overlay literal, sin reduced motion, close no configurable, header sin `pr`.                                                                 |
| **Drawer**        | P0: `DrawerBody` sin `min-h-0`; top/bottom 50vh fijo; close 16 px. P1: sin tamaÃ±os, bottom sin rounded, footer sin wrap, sin safe area.                                                        |
| **DropdownMenu**  | P1: sin max-height/scroll/collisionPadding; filas ~32 px; sub-trigger sin chevron. P2: sin arrow/mobile sheet, story sin args.                                                                  |
| **ErrorBoundary** | P0: muestra `error.message` al usuario; no mueve foco. P1: sin `fallbackRender`/`resetKeys`/className; axe solo en estado normal.                                                               |
| **Footer**        | P1: columnas sin `<nav>`/`<ul>`, tÃ­tulos `h4` fijos, links sin target/foco, sin paso tablet de 3 columnas. P2: no reutiliza Container, sticky sin z-index/backdrop.                            |
| **Popover**       | P1: `w-72` fijo, sin max-width/collisionPadding; sin `container`/`PopoverPortal`; sin tests de Escape/foco.                                                                                     |
| **Progress**      | P1: valor sin clamp, sin `aria-valuetext`, sin reduced motion, altura fija. P2: className/ref en la barra, sin indeterminado.                                                                   |
| **Skeleton**      | P1: `animate-pulse` sin reduced motion; sin variantes text/circle; sin receta `role="status"`/`aria-busy`.                                                                                      |
| **Table**         | P0: scroll wrapper no focusable. P1: sin modo cards/columnas prioritarias/sticky; `scope` no por defecto; sin empty state real; story `w-[100px]`.                                              |
| **Toast**         | P0: close invisible en touch; destructive con `red-*`; viewport `max-h-screen` sin safe area. P1: action/close pequeÃ±os, sin queue manager, docs usan className en vez de `variant`.           |
| **Tooltip**       | P1: sin max-width/collisionPadding; no usa `usePortalContainer`; sin reduced motion/arrow; sin fallback touch.                                                                                  |

### Utilities

| Componente          | Hallazgos clave                                                                                                  |
| ------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **ThemeProvider**   | P1: sin `system`/anti-FOUC; tokens no-colors inertes; `<div>` de layout; sin `color-scheme`; paleta no persiste. |
| **ThemeToggle**     | Correcto en lo bÃ¡sico; depende de `ThemeProvider` para persistencia.                                            |
| **PortalContainer** | Correcto; el contenedor inicial es `null` hasta el efecto (los portales caen un instante en `body`).             |
| **Paletas**         | 13 completas, pero duplicadas en 4 archivos y sin metadata de contraste.                                         |

## 5. Componentes y patrones faltantes

| Ãrea            | Faltantes prioritarios                                                                                                                                            |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Formularios** | `Label`, `MultiSelect`/`TagInput`, `SearchInput`, `PasswordInput`, `NumberInput`, `FileUpload`, `DateRangePicker`/`TimePicker`.                                   |
| **Overlays**    | `ContextMenu`, `Menubar`, `NavigationMenu`, `HoverCard`, `Sheet`/`BottomSheet`.                                                                                   |
| **Datos**       | `DataTable` (sort/filter/selection/column visibility), `ErrorState`/`Result`, `Chart`, `TreeView`, `Timeline`, `Stat`/KPI.                                        |
| **Layout**      | Implementados: `AppShell`, `Grid`, `PageHeader`, `Prose`, `Section`, `SkipLink`, `Stack`, `VisuallyHidden`. Pendientes: `AspectRatio`, `ScrollArea`, `Separator`. |
| **Utilidades**  | `useMediaQuery`/`useBreakpoint`, `DirectionProvider` (RTL), `ThemeScript` (anti-FOUC), `Toast` queue manager, `useToast`.                                         |

> **Comparativa de catalogo (2026-10-21):** revisados Material UI v9, shadcn/ui y Radix
> Primitives. Ya estan cubiertos los patrones base (accordion, alert, avatar, badge,
> breadcrumb, button, calendar, card, carousel, checkbox, combobox, date picker, dialog,
> drawer, dropdown, pagination, popover, progress, radio, select, skeleton, slider, switch,
> table, tabs, textarea, toast, toggle group, tooltip).
>
> Faltantes de mayor impacto, en orden:
>
> 1. **P1 formularios/estados:** `MultiSelect`, `SearchInput`/`Autocomplete`, `FileUpload`,
>    `NumberInput`, `PasswordInput`, `DataTable`, `ErrorState`.
>    Ya implementados: `Field`/`Form`, `AlertDialog`, `Command` y `EmptyState`.
> 2. **P1 navegacion/overlays:** `ContextMenu`, `Menubar`, `NavigationMenu`, `HoverCard`,
>    `Collapsible`, `Toolbar`, `Sheet`/`BottomSheet` (o reutilizar `Drawer`).
> 3. **P2 datos/contenido:** `Chart`, `TreeView`, `Timeline`, `Stat`/KPI, `Rating`, `Stepper`,
>    `TransferList`, `ImageList`/`Masonry`, `Resizable`, `Spinner`, `Link`, `List`.
> 4. **P2 layout/utilidades:** `AspectRatio`, `ScrollArea`, `Separator`,
>    `DirectionProvider`, `useMediaQuery`, `ThemeScript`, `DateRangePicker`/`TimePicker`.

## 6. Modelos de layout

Los modelos de pÃ¡gina, variantes de distribuciÃ³n y reglas responsive estÃ¡n en
[`docs/layouts.md`](./layouts.md). Resumen del catÃ¡logo:

1. **App Shell / Dashboard** â€” header + sidebar + main; variantes topnav/sidebar/hybrid.
2. **Auth** â€” centrado en mÃ³vil, split 50/50 en desktop.
3. **Settings** â€” nav lateral/vertical + formulario con barra de guardado.
4. **Marketing** â€” hero, features, pricing, testimonios, FAQ, footer.
5. **Docs** â€” sidebar + contenido + TOC; TOC oculto en mÃ³vil.
6. **E-commerce / List-Detail** â€” lista + detalle; stack con â€œvolverâ€ en mÃ³vil.
7. **CRUD / Data** â€” PageHeader + toolbar + tabla/cards + paginaciÃ³n.
8. **Estados** â€” loading (Skeleton), empty (EmptyState), error (ErrorState/ErrorBoundary).

## 7. Plan priorizado

### Fase 0 â€” higiene y confianza (1â€“2 semanas)

1. Corregir contraste de tokens y aÃ±adir test de contraste por paleta/modo.
2. Auditar portales con `axe.run(document.body)` y aÃ±adir tests de estado abierto.
3. Eliminar anchos fijos de stories y aÃ±adir verificaciÃ³n visual en 375/768/1280.
4. Corregir Combobox, `Button asChild`, `Slider onValueChange`, `InputOTP`/`Select` errores.
5. Hacer modales la navegaciÃ³n mÃ³vil (Navbar/Sidebar) y focusable la tabla.
6. AÃ±adir `max-h`/`dvh` a Dialog/Drawer y targets â‰¥44 px.

### Fase 1 â€” capa de layout (2â€“3 semanas)

1. Hecho: `Stack`/`Grid` con props responsive tipadas.
2. Hecho: `Section`, `PageHeader`, `AppShell`, `Prose`, `SkipLink`, `VisuallyHidden`.
3. Plantillas AppShell/Dashboard, Auth y Settings como stories `Templates/*`.
4. Viewport matrix en CI/Storybook y documentaciÃ³n de variantes.

### Fase 2 â€” paridad funcional (3â€“5 semanas)

1. `MultiSelect`/`SearchInput`/`FileUpload` (con `Field`/`Form` ya disponibles).
2. `DataTable` y `ErrorState` (con `AlertDialog`, `Command` y `EmptyState` ya disponibles).
3. RTL, reduced motion, safe areas y `color-scheme` en toda la librerÃ­a.
4. Generador de paletas + preset exportable de Tailwind.

## 8. Limitaciones del anÃ¡lisis

- `jsdom` no aplica CSS: Playwright cubre overflow y regresión visual de las plantillas;
  las stories no-plantilla siguen dependiendo del viewport de Storybook.

- `axe` en jsdom desactiva `color-contrast`; `tests/contrast.test.ts` cubre AA en 13 paletas x light/dark.
- El contraste se calcula desde los valores HSL de `src/index.css` y `defaultTheme.ts`,
  con paridad CSS/paleta verificada por `tests/contrast.test.ts`.
