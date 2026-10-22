# Roadmap y propuestas de mejora

> Ãšltima actualizaciÃ³n: octubre 2026. Este documento prioriza mejoras de infraestructura,
> theming, layout y componentes nuevos. No es un compromiso de fechas: es una guÃ­a de decisiones.
> El detalle de hallazgos por componente estÃ¡ en [`component-audit.md`](./component-audit.md) y
> los modelos de pÃ¡gina en [`layouts.md`](./layouts.md).

## 1. CÃ³mo leer las prioridades

| Nivel | Significado                                                          |
| ----- | -------------------------------------------------------------------- |
| `P0`  | Fundacional: bug, bloqueo o riesgo de publicaciÃ³n. Se hace primero. |
| `P1`  | Alto impacto para consumidores o para la calidad del proyecto.       |
| `P2`  | Deseable: paridad con otras librerÃ­as, DX o mejoras incrementales.  |

Complejidad: **BÃ¡sico** (Ã¡tomo, 1â€“2 h), **Medio** (composiciÃ³n Radix, 1 dÃ­a),
**Complejo** (estado, virtualizaciÃ³n, datos o tercera librerÃ­a, 2â€“5 dÃ­as).

## 2. DiagnÃ³stico rÃ¡pido

**Fortalezas**

- 49 componentes con CVA, `forwardRef`, `displayName` y patrÃ³n shadcn/ui consistente.
- 402 tests con `axe-core` en todos los archivos y 33 pruebas Playwright de plantillas (375/768/1280); `tsc` y ESLint limpios.
- Theming por variables CSS, 13 paletas light/dark y Storybook con toolbar de temas.
- Storybook como documentaciÃ³n viva y build ESM + CJS con `.d.ts`.

**Riesgos actuales**

- Falta `ThemeScript` anti-FOUC y modo `system` (ver Â§5).
- 43 componentes, stories y tests estÃ¡n sin trackear en git: riesgo de pÃ©rdida.
- Dependencias Radix instaladas como `dependencies` (no peers) y `@radix-ui/react-slot` como peer: estrategia inconsistente que puede duplicar contexto en el consumidor.
- El JS publicado incluye Radix, `date-fns`, `embla-*`, `react-day-picker` y `cmdk`: ESM 707 KB (170 KB gzip; CJS 467 KB / 139 KB gzip).
- Paletas escritas a mano (~600 lÃ­neas) y `safelist` manual: no escala.
- Sin CI ni umbral de cobertura; el pre-commit corre toda la suite (commits lentos).
- Plantillas implementadas y verificadas con Playwright; las stories no-plantilla aun usan anchos fijos y no tienen test de overflow.
- Contraste AA insuficiente en `warning`/`info`/`success`/`destructive`/muted y varias paletas.
- P0 de interacciÃ³n: Combobox sin teclado/listbox, nav mÃ³vil no modal, `Button asChild`,
  `Slider` callback pisado y errores de InputOTP/Select sin asociar.

## 3. Actualizaciones recomendadas

| Ãrea         | Actual                | Objetivo                              | Por quÃ©                                                             | Prioridad |
| ------------ | --------------------- | ------------------------------------- | -------------------------------------------------------------------- | --------- |
| React        | `^18.3.0` (peer)      | `^18.3.0 \|\| ^19.0.0`                | React 19 es el default en apps nuevas; mantener compatibilidad dual. | P1        |
| Storybook    | `^8.6`                | 9.x (o Ãºltima estable)               | Addons unificados, mejor test-runner y docs; migraciÃ³n de CSF.      | P1        |
| Vite         | `^6.0`                | 7.x                                   | Mejor build y soporte de plugins; requiere probar `vite-plugin-dts`. | P1        |
| Vitest       | `^2.1`                | 3.x                                   | API de coverage y performance; revisar `jsdom`/`happy-dom`.          | P1        |
| Tailwind CSS | `^3.4`                | 4.x (evaluar)                         | Config CSS-first (`@theme`), OKLCH y menos JS. MigraciÃ³n grande.    | P2        |
| TypeScript   | `^5.7`                | 5.9+                                  | Mejoras de narrowing y `isolatedDeclarations`.                       | P1        |
| Radix UI     | 19 paquetes sueltos   | Paquete unificado `radix-ui`          | Menos dependencias y versiones alineadas.                            | P2        |
| Release      | `release-it`          | Changesets                            | Versionado por PR, changelog determinista y monorepo-friendly.       | P1        |
| Iconos       | `lucide-react ^0.469` | Ãšltima estable                       | Iconos nuevos y correcciones; mantiene tree-shaking.                 | P2        |
| Fechas       | `date-fns ^4`         | Mantener / revisar `react-day-picker` | Evitar duplicar utilidades de fecha en el bundle.                    | P2        |
| Lint         | ESLint 9 flat         | Mantener + `eslint-plugin-jsx-a11y`   | Reglas a11y estÃ¡ticas complementan a `axe-core`.                    | P1        |

> No actualizar todo a la vez. Un PR por grupo (React, Storybook, build) con la suite en verde.

## 4. Arquitectura, build y publicaciÃ³n

| Mejora                                | Detalle                                                                                                                                                         | Prioridad |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| **CSS publicado**                     | Hecho: `src/index.css` se compila a `dist/index.css`, se exporta como `./style.css` y `sideEffects` incluye CSS. Pendiente: decidir CSS por componente/subpath. | â€”       |
| **Subpath exports**                   | AÃ±adir `"./button": { "types": ..., "import": ..., "require": ... }` para imports granulares y mejor tree-shaking.                                             | P1        |
| **Externalizar dependencias en Vite** | `rollupOptions.external` para `react`, `react-dom`, `radix-ui`, `date-fns`, `embla-*`, `react-day-picker`, `lucide-react`. Evita duplicar React/contexto.       | P0        |
| **Estrategia de peers**               | Mover Radix y librerÃ­as de runtime a `peerDependencies` (u opcionales) o documentar por quÃ© van bundled. `@radix-ui/react-slot` ya es peer: unificar.         | P1        |
| **`"use client"`**                    | AÃ±adir el banner a los entrypoints que usan hooks/eventos para RSC (Next.js App Router). Verificar que no haya APIs de servidor.                               | P1        |
| **Preservar mÃ³dulos**                | Evaluar `preserveModules` + `preserveModulesRoot` para que cada componente sea un chunk importable.                                                             | P2        |
| **API report / declarations**         | `declarationMap`, `isolatedDeclarations` y un reporte de API (API Extractor) para detectar breaking changes.                                                    | P2        |
| **Presupuesto de tamaÃ±o**            | `size-limit` o `bundlemon` por entrypoint; fallar el CI si un componente supera el presupuesto (p. ej. 15 KB gzip).                                             | P2        |
| **CI**                                | GitHub Actions: `lint`, `tsc --noEmit`, `test:run`, `build`, `build-storybook` en Node 20/22. Cache de npm.                                                     | P0        |
| **Cobertura**                         | Umbral mÃ­nimo (70â€“80 %) en Vitest y publicar el reporte como artefacto.                                                                                      | P1        |
| **`components.json`**                 | Hecho: apunta a `tailwind.config.cjs`.                                                                                                                          | â€”       |
| **Pre-commit con lint-staged**        | Usar `.lintstagedrc`: Prettier + ESLint solo en staged; tests completos en `pre-push` o CI.                                                                     | P0        |
| **PublicaciÃ³n**                      | Changesets + `npm publish --provenance` desde CI; `publishConfig.access`.                                                                                       | P1        |

## 5. Theming (prioridad mÃ¡xima)

| Mejora                                    | Detalle                                                                                                                                                                                                                                                 | Prioridad |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| **Portales tematizados**                  | Hecho: `PortalContainerProvider` crea un nodo en `<body>` con `${colorMode} theme-${palette}`; `Dialog`, `Drawer`, `Select`, `DropdownMenu` y `Popover` lo usan vÃ­a `container`. `applyToRoot` queda como opt-in para `<html>` y portales de terceros. | â€”       |
| **Anti-FOUC**                             | `<ThemeScript />` inline en `<head>` que lee `localStorage` y aplica `.dark`/`.theme-*` antes del primer paint.                                                                                                                                         | P0        |
| **Modo `system`**                         | Soportar `colorMode: 'light' \| 'dark' \| 'system'` con `matchMedia('(prefers-color-scheme: dark)')` y listener de cambios.                                                                                                                             | P1        |
| **Generar paletas desde una sola fuente** | `palettes.ts` ya define los valores; generar los bloques `.theme-*` y el `safelist` en build (script o plugin) en lugar de mantener 600+ lÃ­neas duplicadas y 13 entradas manuales.                                                                     | P1        |
| **OKLCH / contraste**                     | Migrar de HSL a OKLCH permite escalas perceptuales y `color-mix`. AÃ±adir tests de contraste WCAG AA para pares `background/foreground`, `primary/primary-foreground`, etc. en las 13 paletas Ã— 2 modos.                                               | P1        |
| **Tokens semÃ¡nticos de estado**          | AÃ±adir `--surface-1/2/3`, `--overlay`, `--state-hover`, `--state-active`, `--state-selected`, `--focus-ring`, `--disabled`. Hoy los componentes derivan estados con `hover:bg-primary/90`.                                                             | P1        |
| **Tokens de densidad y motion**           | `data-density="compact"`, `--motion-fast/base/slow`, `--ease-standard`; respetar `prefers-reduced-motion`.                                                                                                                                              | P2        |
| **Emitir todos los tokens**               | `getThemeVariables` no emite `spacing`, `lineHeights`, `letterSpacings` ni `transition`. Emitirlos si se documentan como parte del theme.                                                                                                               | P2        |
| **Tema en grÃ¡ficos**                     | Variables `--chart-1..5` ya existen; asegurar que las librerÃ­as de charts las lean y reaccionen a dark/paleta.                                                                                                                                         | P2        |
| **Constructor de paletas**                | Story/editor que permita elegir color base y previsualizar las 13 variantes con contraste calculado.                                                                                                                                                    | P2        |

### Portales (implementado)

`PortalContainerProvider` crea un nodo en `document.body` con las clases
`${colorMode} theme-${palette}` y lo expone por contexto. Las primitivas Radix
lo pasan como `container`, asÃ­ que los overlays siguen viviendo a nivel de
`body` (sin problemas de clipping ni `transform`) pero heredan la paleta y los
overrides de `defaultTheme`/`setTheme`.

`applyToRoot` es el modo global opt-in: aplica clases y variables a
`document.documentElement` y las restaura al desmontar. Ãšsalo solo con un
`ThemeProvider` a nivel de app o para portales de terceros.

## 6. Componentes faltantes

Criterio: paridad con shadcn/ui, MUI, Chakra, Mantine y Ant Design; todos deben
consumir tokens semÃ¡nticos y funcionar en las 13 paletas y en light/dark.

> **Actualizacion 2026-10-22:** `Field`, `Form`, `AlertDialog`, `Command` y `EmptyState` ya
> estan implementados (49 componentes, 402 tests). Se mantienen en las tablas como historial
> de priorizacion; las primitivas, las plantillas y la regresion visual ya estan implementadas. La siguiente brecha son los componentes de datos.

### 6.1 BÃ¡sicos (Ã¡tomos y composiciÃ³n simple)

| Componente              | Complejidad | Prioridad | Notas                                                                    |
| ----------------------- | ----------- | --------- | ------------------------------------------------------------------------ |
| `Label`                 | BÃ¡sico     | P0        | `@radix-ui/react-label` ya estÃ¡ instalado y sin componente.             |
| `Separator`             | BÃ¡sico     | P0        | `@radix-ui/react-separator` ya instalado. Variantes horizontal/vertical. |
| `ScrollArea`            | BÃ¡sico     | P0        | `@radix-ui/react-scroll-area` ya instalado; scrollbar tematizada.        |
| `Spinner` / `Loader`    | BÃ¡sico     | P0        | Sustituir `Loader2` repetido en Button y overlays.                       |
| `IconButton`            | BÃ¡sico     | P0        | `Button` con `size="icon"` y `aria-label` obligatorio.                   |
| `Kbd`                   | BÃ¡sico     | P1        | Atajos de teclado en Command, menus y docs.                              |
| `VisuallyHidden`        | BÃ¡sico     | P1        | Radix `VisuallyHidden`; base para a11y de iconos.                        |
| `AspectRatio`           | BÃ¡sico     | P1        | Media, cards y avatares.                                                 |
| `EmptyState`            | BÃ¡sico     | P1        | Icono + tÃ­tulo + descripciÃ³n + acciÃ³n; muy reutilizado.               |
| `ErrorState` / `Result` | BÃ¡sico     | P1        | Estados 403/404/500 y errores de carga; usa `role="alert"`.              |
| `Stat` / `KPI`          | BÃ¡sico     | P2        | NÃºmero + delta + tendencia; usa `--success`/`--destructive`.            |
| `DescriptionList`       | BÃ¡sico     | P2        | `<dl>` semÃ¡ntico para fichas de detalle.                                |
| `Timeline`              | BÃ¡sico     | P2        | Historial de eventos; conector y dot tematizados.                        |
| `Rating`                | BÃ¡sico     | P2        | Estrellas con teclado y `aria-valuenow`.                                 |
| `Chip` / `Tag`          | BÃ¡sico     | P2        | Variantes de color semÃ¡nticas; removable.                               |
| `Code` / `CodeBlock`    | BÃ¡sico     | P2        | Copiar al portapapeles; highlighting opcional.                           |
| `Link`                  | BÃ¡sico     | P2        | `text-primary underline-offset-4`; externo con icono y `rel`.            |
| `Blockquote` / `Prose`  | BÃ¡sico     | P2        | TipografÃ­a para contenido Markdown.                                     |
| `Field` / `FormField`   | Medio       | P0        | Label + control + hint + error con `aria-describedby`/`aria-invalid`.    |
| `NumberInput`           | Medio       | P1        | Steppers accesibles, min/max/step, formato locale.                       |
| `SearchInput`           | BÃ¡sico     | P1        | Input con icono, limpiar y `type="search"`.                              |
| `PasswordInput`         | BÃ¡sico     | P1        | Toggle mostrar/ocultar con `aria-pressed`.                               |
| `Banner` / `Callout`    | BÃ¡sico     | P1        | Similar a Alert pero persistente y con acciÃ³n.                          |
| `CircularProgress`      | BÃ¡sico     | P2        | SVG con `role="progressbar"` y `aria-valuenow`.                          |
| `LoadingOverlay`        | BÃ¡sico     | P2        | Overlay con `aria-busy` y bloqueo de interacciÃ³n.                       |

### 6.2 Formularios (complejos)

| Componente                      | Complejidad | Prioridad | Notas                                                                    |
| ------------------------------- | ----------- | --------- | ------------------------------------------------------------------------ |
| `Form` (React Hook Form + Zod)  | Complejo    | P0        | `FormField`, `FormItem`, `FormMessage`; integraciÃ³n con `errorMessage`. |
| `MultiSelect` / `TagInput`      | Complejo    | P0        | SelecciÃ³n mÃºltiple con chips, bÃºsqueda y teclado.                     |
| `AlertDialog` / `ConfirmDialog` | Medio       | P0        | Confirmaciones destructivas; `role="alertdialog"`.                       |
| `DateRangePicker`               | Complejo    | P1        | Dos calendarios, presets ("Ãºltimos 7 dÃ­as") y locale.                  |
| `TimePicker`                    | Medio       | P2        | Lista o input con validaciÃ³n; complementa `DatePicker`.                 |
| `FileUpload` / `Dropzone`       | Complejo    | P1        | Drag & drop, preview, progreso, validaciÃ³n de tipo/tamaÃ±o.             |
| `AsyncSelect` / `Autocomplete`  | Complejo    | P1        | BÃºsqueda remota con debounce, loading y cancelaciÃ³n.                   |
| `Combobox` mÃºltiple            | Complejo    | P1        | Extender el actual a selecciÃ³n mÃºltiple y grupos.                      |
| `TransferList`                  | Complejo    | P2        | Dos listas con mover/buscar; accesible por teclado.                      |
| `Cascader`                      | Complejo    | P2        | Ãrbol de selecciÃ³n jerÃ¡rquica.                                         |
| `CurrencyInput` / `MaskedInput` | Medio       | P2        | Formato locale y mÃ¡scara; cuidado con `inputMode`.                      |
| `PhoneInput`                    | Medio       | P2        | Prefijo de paÃ­s y validaciÃ³n.                                          |
| `ColorPicker`                   | Complejo    | P2        | Swatches, input HEX/HSL, contraste y `aria-label`.                       |
| `SignaturePad`                  | Complejo    | P2        | Canvas + export; fallback accesible.                                     |
| `RichTextEditor`                | Complejo    | P2        | Dependencia pesada (TipTap/Lexical); evaluar como paquete aparte.        |

### 6.3 NavegaciÃ³n y overlays

| Componente                   | Complejidad | Prioridad | Notas                                                                 |
| ---------------------------- | ----------- | --------- | --------------------------------------------------------------------- |
| `Command` (cmdk)             | Complejo    | P0        | Paleta de comandos, bÃºsqueda difusa y atajos; gran diferenciador DX. |
| `Menubar`                    | Medio       | P1        | Radix `Menubar`; menÃºs de aplicaciÃ³n.                               |
| `NavigationMenu`             | Medio       | P1        | Mega-menÃºs accesibles con teclado.                                   |
| `ContextMenu`                | Medio       | P1        | Radix `ContextMenu`; portales tematizados.                            |
| `HoverCard`                  | BÃ¡sico     | P1        | Radix `HoverCard`; previews de usuario.                               |
| `Toolbar`                    | Medio       | P2        | Radix `Toolbar`; agrupa acciones con roving tabindex.                 |
| `Stepper` / `Wizard`         | Complejo    | P1        | Pasos con estado, validaciÃ³n y navegaciÃ³n.                          |
| `SegmentedControl`           | BÃ¡sico     | P1        | Alternativa visual a ToggleGroup; `role="radiogroup"`.                |
| `BottomSheet`                | Medio       | P2        | Variante de Drawer para mÃ³vil; gestos y snap points.                 |
| `Lightbox`                   | Medio       | P2        | GalerÃ­a con zoom, teclado y focus trap.                              |
| `Tour` / `Onboarding`        | Complejo    | P2        | Spotlight, pasos y persistencia.                                      |
| `TableOfContents` / `Anchor` | BÃ¡sico     | P2        | Scroll spy y navegaciÃ³n por headings.                                |

### 6.4 Datos y visualizaciÃ³n

| Componente                           | Complejidad | Prioridad | Notas                                                                  |
| ------------------------------------ | ----------- | --------- | ---------------------------------------------------------------------- |
| `DataTable` (TanStack Table)         | Complejo    | P0        | Sorting, filtros, paginaciÃ³n, selecciÃ³n, columnas y estados vacÃ­os. |
| `Chart` (Recharts)                   | Complejo    | P1        | Line/bar/area/pie con `--chart-*`, tooltip y leyenda tematizados.      |
| `Sparkline`                          | BÃ¡sico     | P2        | Mini grÃ¡fico para KPIs.                                               |
| `TreeView`                           | Complejo    | P1        | ExpansiÃ³n, selecciÃ³n mÃºltiple y teclado (ARIA tree).                |
| `VirtualizedList` (TanStack Virtual) | Complejo    | P1        | Listas grandes; altura dinÃ¡mica.                                      |
| `Descriptions`                       | BÃ¡sico     | P2        | Fichas clave/valor responsivas.                                        |
| `Diff`                               | Medio       | P2        | ComparaciÃ³n de texto con colores semÃ¡nticos.                         |
| `QRCode` / `Barcode`                 | BÃ¡sico     | P2        | GeneraciÃ³n SVG; contraste garantizado.                                |
| `Heatmap`                            | Medio       | P2        | Calendario de actividad; escala desde `--primary`.                     |

### 6.5 Layout y utilidades

| Componente                   | Complejidad | Prioridad | Notas                                                                   |
| ---------------------------- | ----------- | --------- | ----------------------------------------------------------------------- |
| `Stack` / `Flex` / `Grid`    | BÃ¡sico     | P0        | Primitivas de layout con `gap`/`align` tipados; reducen clases sueltas. |
| `Section` / `PageHeader`     | BÃ¡sico     | P0        | Ritmo vertical, superficies, tÃ­tulo, breadcrumb y acciones.            |
| `AppShell`                   | Medio       | P0        | Sidebar + header + contenido; composiciÃ³n de los existentes.           |
| `Prose` / `SkipLink`         | BÃ¡sico     | P0        | Texto largo y salto al contenido; base de docs y marketing.             |
| `Templates/*`                | Medio       | P0        | Plantillas App Shell, Auth, Settings, Marketing, Docs, CRUD y estados.  |
| `SplitPane` / `Resizable`    | Complejo    | P2        | Paneles redimensionables con teclado y persistencia.                    |
| `Portal` / `PortalContainer` | BÃ¡sico     | â€”       | Hecho: `PortalContainerProvider` + `usePortalContainer` (Â§5).          |
| `ThemeScript`                | BÃ¡sico     | P0        | Anti-FOUC (Â§5).                                                        |
| `DirectionProvider` (RTL)    | BÃ¡sico     | P1        | `dir="rtl"` + lÃ³gico `ms-*`/`me-*`; probar componentes clave.          |
| `Presence` / `FocusScope`    | BÃ¡sico     | P2        | Utilidades de animaciÃ³n y foco (Radix).                                |

> **Actualizacion 2026-10-22:** los puntos 1-2 (capa de layout), 4 (`Field`/`Form`), 6 (`AlertDialog`), 7
> (`Command`) y 10 (`EmptyState`) ya estan implementados; quedan como historial. El orden
> vigente empieza por `DataTable`/`ErrorState`, `MultiSelect` y los componentes de datos.

### 6.6 Top 12 recomendado (orden de implementaciÃ³n)

1. **`Stack`/`Grid`/`Section`/`PageHeader`** â€” base de toda pÃ¡gina; sin esto no hay layouts.
2. **`AppShell` + `Prose` + `SkipLink`** â€” composiciÃ³n de pÃ¡ginas completas y docs.
3. **Plantillas `Templates/*`** â€” App Shell/Dashboard, Auth, Settings y Marketing.
4. **`Field`/`FormField` + `Form`** â€” el hueco mÃ¡s grande frente a otras librerÃ­as.
5. **`Label`, `Separator`, `ScrollArea`, `Spinner`, `IconButton`** â€” uso diario.
6. **`AlertDialog`/`ConfirmDialog`** â€” seguridad en acciones destructivas.
7. **`Command`** â€” paleta de comandos y atajos; alto valor percibido.
8. **`MultiSelect`/`TagInput`** â€” formularios reales.
9. **`DataTable`** â€” casos enterprise y dashboards.
10. **`EmptyState` / `ErrorState` / `Result`** â€” pulido de estados.
11. **`DateRangePicker`** â€” analÃ­tica y filtros.
12. **`Chart` tematizado** â€” dashboards con `--chart-*`.
13. **`ThemeScript`** â€” anti-FOUC; los portales ya estÃ¡n tematizados.

## 7. Contrato â€œtheme-readyâ€ para cada componente nuevo

- [ ] Solo tokens semÃ¡nticos (`bg-background`, `text-foreground`, `border-border`, `bg-primary`, `ring-ring`, `bg-success`, ...). Cero hex/rgb/`bg-blue-500`.
- [ ] Funciona en light y dark, y con las 13 paletas (probar al menos `neutral`, `violet` y `emerald`).
- [ ] Focus visible: `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background`.
- [ ] Estados `hover`, `active`, `disabled:opacity-50 disabled:pointer-events-none` y `aria-disabled` cuando aplique.
- [ ] Overlays dentro del sistema de portales tematizado; nunca colores propios.
- [ ] Contraste AA verificado para texto y controles (4.5:1 / 3:1).
- [ ] `prefers-reduced-motion` respetado en animaciones no esenciales.
- [ ] Mobile-first (320 px), sin anchos fijos de pÃ¡gina y targets â‰¥44 px.
- [ ] Sin scroll horizontal de pÃ¡gina; tablas/cÃ³digo con scroll focusable.
- [ ] RTL con utilidades lÃ³gicas; overlays con `max-h`/`dvh` y safe areas.
- [ ] Test de `axe.run` + test de variantes + test de interacciÃ³n de teclado.
- [ ] Story con `args`, `tags: ['autodocs']` y una historia `Dark`/`Palette` solo si aporta (el decorador global ya cambia el tema).
- [ ] Sin `ThemeProvider` local en la story.

## 8. Testing, CI y release

| Mejora                                                | Prioridad |
| ----------------------------------------------------- | --------- |
| CI con lint + `tsc` + tests + build + build-storybook | P0        |
| Umbral de cobertura y reporte como artefacto          | P1        |
| `eslint-plugin-jsx-a11y` (reglas estÃ¡ticas)          | P1        |
| Storybook test-runner (interacciones + a11y en CI)    | P1        |
| Regresión visual (Playwright screenshots en `e2e/`)   | Hecho     |
| Tests de contraste de tokens por paleta y modo        | P1        |
| `vitest --typecheck` para tests de tipos de props     | P2        |
| Matriz Node 20/22 y cache de npm                      | P1        |
| Changesets + `npm publish --provenance`               | P1        |
| Presupuesto de bundle por entrypoint                  | P2        |

## 9. DocumentaciÃ³n y DX

- **GuÃ­a de contribuciÃ³n** (`CONTRIBUTING.md`), plantillas de issue/PR y `CODE_OF_CONDUCT.md`.
- **Scaffolding**: `npm run gen:component <Name> --category Forms` que genere componente, barrel, story y test (hoy lo cubre la skill `crear-componente`, pero un script evita errores).
- **Docs por componente**: mantener autodocs, pero aÃ±adir secciones de uso, accesibilidad y â€œno hacerâ€ en la story.
- **GuÃ­a de migraciÃ³n** para breaking changes (especialmente React 19, Tailwind 4 y tokens).
- **Versionado visible**: enlazar `docs/CHANGELOG.md` desde el README y la docs de Storybook.
- **`opencode.json`**: declarar instrucciones y skills del proyecto para que cualquier agente cargue el contexto correcto.
- **PolÃ­tica de deprecaciÃ³n**: un minor con warning, un major para eliminar.

## 10. Fases sugeridas

| Fase       | DuraciÃ³n estimada | Entregables                                                                                                                                        |
| ---------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Fase 0** | 2â€“3 dÃ­as        | Contraste AA, viewports, P0 de a11y/interacciÃ³n, `ThemeScript`, externalizar deps, CI y lint-staged.                                              |
| **Fase 1** | Hecho              | Primitivas de layout y plantillas implementadas: App Shell/Dashboard, Auth, Settings, Marketing, Docs, E-commerce/List-Detail, CRUD y estados.     |
| **Fase 2** | 3â€“4 semanas      | `MultiSelect`, `ErrorState`, `DataTable`, `DateRangePicker`, `Chart` (con `Field`/`Form`, `AlertDialog`, `Command` y `EmptyState` ya disponibles). |
| **Fase 3** | Continuo           | MigraciÃ³n React 19 / Storybook 9 / Tailwind 4, paletas OKLCH generadas, regresiÃ³n visual y sitio de docs.                                        |

## 11. MÃ©tricas de Ã©xito

- 100 % de componentes con al menos un test `axe.run` y uno de teclado.
- 0 colores hardcodeados en `src/components` (verificable con un lint custom o grep en CI).
- 13 paletas Ã— 2 modos pasan contraste AA en los pares principales.
- 0 pÃ¡ginas/plantillas con scroll horizontal en 375/768/1280 px.
- 100 % de plantillas con skip link, un `<main>`/`<h1>` y nav mÃ³vil modal.
- Cobertura â‰¥ 80 % en lÃ­neas y ramas de componentes.
- Build de un componente individual < 15 KB gzip (sin peers).
- CI < 10 minutos y publicaciÃ³n reproducible vÃ­a Changesets.
- 0 componentes/stories/tests sin trackear en git.

## 12. Riesgos y mitigaciones

| Riesgo                                                 | MitigaciÃ³n                                                                                |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| MigraciÃ³n a Tailwind 4 rompe utilidades y config      | Rama dedicada, codemod oficial y Storybook como red de seguridad.                          |
| React 19 cambia tipos y `ref`                          | Peer dual y CI con ambas versiones.                                                        |
| `applyToRoot` pisa el tema del host                    | Es opt-in, restaura clases/estilos al desmontar y se desaconseja con mÃºltiples providers. |
| AÃ±adir dependencias pesadas (RHF, TanStack, Recharts) | Peer opcionales o paquetes separados; medir bundle antes/despuÃ©s.                         |
| Componentes sin trackear se pierden                    | Commit inicial de todo el inventario antes de seguir.                                      |
| Deuda de tests al crecer el nÃºmero de componentes     | Plantilla de test + skill + CI obligatorio.                                                |
