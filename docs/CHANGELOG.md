# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!-- [START CHANGELOG] -->

## [Unreleased]

### Added

- **Layout primitives**: `AspectRatio`, `ScrollArea` and `Separator` (Radix-backed where applicable), with CVA-free accessible wrappers, themed scrollbars, semantic separator role and axe/story coverage
- **Utilities**: `src/lib/formatters` (`formatCurrency`, `formatNumber`, `formatPercent`, `formatDate`, `formatDateTime`, `formatTime`, `formatFileSize`, `formatRelativeTime`) and `src/lib/validation` with Yup integration (`commonSchemas`, `validateWithSchema`, `validateWithSchemaSync`, `toFieldErrors`, `createYupResolver`) plus `yup` dependency
- **News, e-commerce and social components**: `Article`, `BreakingNewsBanner`, `ShareBar`, `AuthorBio`, `NewsletterSignup`, `Comment`, `CommentThread`, `Price`, `StockBadge`, `Rating`, `Review`, `ProductCard`, `CartItem`, `CartSummary`, `CheckoutStepper`, `FeedPost`, `Composer`, `ReactionBar`, `StoryCarousel`, `ProfileHeader`, `SuggestionList`, `NotificationItem` and `InfiniteScroll`
- **Utility and interaction components**: `ErrorState`, `Stat`, `Collapsible`, `HoverCard`, `Timeline`, `Toolbar`, `MultiSelect`, `SearchInput`, `PasswordInput`, `NumberInput`, `FileUpload`, `DateRangePicker`, `TimePicker`, `BottomSheet`, `DirectionProvider`, `ThemeScript`, `DataTable`, `TreeView`, `Chart`, `ContextMenu`, `Menubar`, `NavigationMenu` and `Toaster`/`useToast`
- **`Field` + `Form`**: composable form primitives (`Field`, `FieldLabel`, `FieldDescription`, `FieldError`, `FieldGroup`, `FieldSet`, `FieldLegend`, `FieldContent`, `FieldControl`) with generated IDs, `aria-describedby`/`aria-invalid` wiring, required/disabled state and responsive layouts; semantic `Form`, `FormSection` and `FormActions`
- **`AlertDialog`**: accessible Radix confirmation dialog with themed portal, `AlertDialogAction` variants/sizes, `AlertDialogCancel`, and axe coverage on `document.body`
- **`Command`**: cmdk-based command menu with search, groups, separators, empty/loading states, keyboard selection, `CommandDialog` palette and themed portal tests
- **`EmptyState`**: reusable empty state with decorative icon, configurable heading level, actions, and `default`/`muted`/`outline` surfaces plus `sm`/`default`/`lg` sizes
- **Layout primitives**: `Stack`, `Grid`, `Section`, `PageHeader`, `AppShell`, `Prose`, `SkipLink` and `VisuallyHidden`, plus semantic `Container` widths (`form`, `prose`, `content`, `wide`) and axe/story coverage
- **Page templates**: Dashboard, Auth, Settings, Marketing, Docs, E-commerce, ListDetail, CRUD and States in `stories/templates/`, with a shared mobile navigation drawer and template smoke tests for one `<main>`, one `<h1>` and axe
- **Playwright template regression**: 33 Chromium cases covering every template variant at 375/768/1280, asserting no horizontal overflow and saving screenshot baselines (`npm run test:e2e`)
- **Dependencies**: `@radix-ui/react-alert-dialog`, `cmdk` and `@playwright/test` (dev)
- **Tooltip portal**: `TooltipContent` now renders through `TooltipPortal` in the themed portal container, with `TooltipArrow` and hover/focus/body-axe tests
- **Calendar variants**: single/range/multiple stories, dropdown caption, disabled dates, week numbers, two-month range and mobile viewport
- **DatePicker UX**: dropdown month/year navigation, `clearable`, `minDate`/`maxDate`, `name`/hidden ISO input, 44 px trigger and accessible popover name
- **`tests/contrast.test.ts`**: regresión de contraste WCAG AA para 13 paletas en light/dark, temas base y paridad entre `src/index.css` y `palettes.ts` (29 casos)
- **Cobertura de teclado P0**: `Combobox` (flechas, Home/End, Enter, Escape, opciones deshabilitadas y foco), `Navbar`/`Sidebar` móviles como diálogos modales y `Table` como región desplazable enfocable
- **`docs/component-audit.md`**: auditorÃ­a completa de los 49 componentes, hallazgos P0/P1/P2, componentes faltantes y plan priorizado
- **`docs/layouts.md`**: modelos de pÃ¡gina (App Shell/Dashboard, Auth, Settings, Marketing, Docs, E-commerce, CRUD, estados), breakpoints y matriz de variantes
- **Skill `crear-layout`**: flujo para componer pÃ¡ginas, plantillas y primitivas de layout con contrato responsive y a11y
- **Viewports de Storybook**: presets Mobile (375), Tablet (768) y Desktop (1280) y soporte `layout: 'fullscreen'`
- **Skills del proyecto** en `.opencode/skills/`: `crear-componente`, `crear-layout`, `theming`, `testing-a11y`, `storybook` y `revision-calidad`
- **`docs/storybook.md`**: guÃ­a de Storybook (configuraciÃ³n, stories, controls, toolbar de temas y addon a11y)
- **`docs/roadmap.md`**: listado priorizado de actualizaciones, mejoras de theming, CI y componentes bÃ¡sicos/complejos
- **`PortalContainerProvider` y `usePortalContainer`**: contenedor body-level con las clases del tema activo para portales Radix
- **`applyToRoot`** en `ThemeProvider`: modo opt-in que aplica clases y variables a `<html>` y las restaura al desmontar

### Changed

- **TypeScript 6.0**: `typescript@6.0.3` con `@types/node@26` (Node 26 en CI/local); se elimina `baseUrl` (deprecado en 6.0) porque `paths` resuelve relativo al `tsconfig.json`, y `src/vite-env.d.ts` declara el import lateral de CSS. TypeScript 7 sigue bloqueado por `typescript-eslint` (`<6.1.0`). El stub de `IntersectionObserver` en `tests/setup.ts` incorpora `scrollMargin`, nuevo en el DOM lib
- **Testing DOM**: `jsdom@30` y `@testing-library/jest-dom@7`; los 520 tests siguen verdes y `@testing-library/dom` queda deduplicado en 10.4.2
- **`release-it@21`**: requiere el archivo `.release-it.json` (el antiguo `release-it.json` se ignoraba y hacía que el CLI ejecutara pasos de npm); `@release-it/conventional-changelog@12` sigue siendo compatible. `overrides` actualizados a `undici@8.12.3` (release-it fija 7.29.1, vulnerable) y `basic-ftp@6.2.3`; `uuid` ya no está en el árbol y se retira del `overrides`
- **React 19**: runtime y tipos en `19.3`, con peers duales `react`/`react-dom` en `^18.3.0 || ^19.0.0`; `tsc`, 520 tests, build, Storybook y 33 e2e verdes sin cambios de código en componentes
- **Vite 8 + Vitest 5**: `vite@8.3` con `@vitejs/plugin-react@6.1` y `vite-plugin-dts@5.1`; `postcss` se resuelve con ruta explícita (`postcss.config.cjs`) y `vite.config.ts` usa `import.meta.dirname` en lugar de `__dirname` para evitar el aviso del config loader nativo. ESM 250 kB / 50 kB gzip, CJS 197 kB / 43 kB gzip, CSS 105 kB / 17 kB gzip
- **Tailwind CSS 4**: `tailwindcss@4.3` + `@tailwindcss/postcss` con `@import 'tailwindcss'`, `@import 'tw-animate-css'` y `@config '../tailwind.config.cjs'`; `postcss.config.cjs` deja de cargar `tailwindcss` y `autoprefixer` (eliminados) y `tailwindcss-animate` se sustituye por `tw-animate-css`, que sí soporta v4. Se conserva el aspecto de v3: capa base que restaura `border-color: hsl(var(--border))` (v4 usa `currentColor`), `shadow-sm` → `shadow-xs` y `backdrop-blur-sm` → `backdrop-blur-xs` en Card, Navbar, ProductCard, Sidebar, Themes, Calendar, Tabs y BottomSheet. `leading-*` ahora se emite después de `text-*`, así que `text-sm leading-relaxed` aplica por fin el interlineado relajado (cambio asumido; capturas e2e regeneradas y revisadas)
- **`lucide-react` 1.x**: mantiene tree-shaking y elimina los iconos de marca; `ShareBar` usa dos SVG inline (trazados de Simple Icons, CC0) para Facebook y LinkedIn. Las 33 capturas se regeneraron tras comprobar que los diffs eran solo glifos
- **Release tooling**: `@commitlint/cli`/`config-conventional@21` y `@release-it/conventional-changelog@12`, que deduplican `conventional-commits-parser` y dejan `npm ls` sin dependencias inválidas
- **ESLint 10**: `eslint@10.13` + `@eslint/js@10` con `eslint-plugin-react-hooks@7` y `eslint-plugin-react-refresh@0.5`; `eslint-plugin-react` se sustituye por `@eslint-react/eslint-plugin@5` (el anterior declara peer `eslint ^9.7` y rompe en 10 con `context.getFilename`). El flat config declara explícitamente las reglas de corrección JSX/DOM (keys, `dangerouslySetInnerHTML`, props desconocidas, `target="_blank"`, mutación de estado) y mantiene `rules-of-hooks`/`exhaustive-deps` sin activar el set del React Compiler. Corregido un `no-useless-assignment` en `tests/contrast.test.ts`
- **Dependencias al día dentro de rango**: `npm update` actualizó 146 paquetes (Radix en sus _minors_: accordion 1.3.1, select 2.4.1, tooltip 1.4.1, slot 1.5.0, primitive 2.2.0…; `date-fns` 4.4.0, `prettier` 3.9.10, `axe-core` 4.14.0, `typescript-eslint` 8.72.1, `esbuild` 0.25.12/0.28.2 cubiertos en `allowScripts`). `npm audit` sigue en 0 vulnerabilidades y las 33 capturas e2e no cambian
- **Storybook 10**: migración oficial `storybook@8.6 → 10.6.5` con `npx storybook@latest upgrade`; se consolidaron imports, se eliminaron `@storybook/addon-essentials`, `@storybook/addon-interactions`, `@storybook/blocks` y `@storybook/test`, y los addons actuales son `links`, `a11y`, `themes`, `mcp` y `docs` (autodocs por `tags: ['autodocs']`, sin `docs.autodocs`). `eslint.config.js` incorpora `eslint-plugin-storybook` (flat config) y `tsc`, `lint`, `build-storybook`, 520 tests y los 33 casos e2e siguen verdes
- **Seguridad de dependencias**: `overrides` de `undici@8.12.3` y `basic-ftp@6.2.3` + `allowScripts` de `esbuild`; `npm audit` queda en 0 vulnerabilidades y el proyecto corre en Node 26
- **Inventario**: 102 componentes (antes 95), 104 archivos de test / 520 tests; `AGENTS.md`, `docs/component-audit.md`, `docs/layouts.md`, `README.md` y `docs/roadmap.md` actualizados con los nuevos componentes y la capa de layout
- **`AGENTS.md`**: propÃ³sito de composiciÃ³n de pÃ¡ginas, contratos responsive/a11y/customizaciÃ³n/layout, categorÃ­as `Layout` y `Templates`, deuda enlazada a la auditorÃ­a y Definition of Done ampliado
- **Skills**: requisitos de teclado, portales (`axe.run(document.body)`), contraste, RTL, reduced motion, targets â‰¥44 px, viewports y plantillas; conteos actualizados a 520 tests
- **`.storybook/preview.tsx`**: decorador `fullscreen` sin padding y viewports de referencia
- **`README.md`**: propÃ³sito, layout planificado, secciÃ³n responsive/a11y y enlaces a auditorÃ­a/layouts
- **`docs/architecture.md`**: capa de layout/plantillas y flujo de alta de componentes actualizado
- **`docs/accessibility.md`**: WCAG 2.2, auditorÃ­a de portales con `axe.run(document.body)` y checklist responsive
- **`docs/storybook.md`**: viewports, plantillas `fullscreen` y convenciones responsive
- **`docs/roadmap.md`**: riesgos P0, prioridades de layout, fases y mÃ©tricas responsive
- **`README.md`**: inventario completo (71 componentes), scripts reales (Storybook en `:6006`) y ejemplos vÃ¡lidos. Eliminadas las referencias a Vue y Ladle.
- **`docs/architecture.md`**: actualizado a Storybook 8, `tailwind.config.cjs`, tests con `axe.run` y hooks reales (sin `pre-push`).
- **`docs/styling.md`**: versiones correctas (`tailwind-merge ^2.6.0`), sistema de paletas y regla de HSL crudo.
- **`docs/accessibility.md`**: patrÃ³n real `axe.run(container)` y checklist por tipo de componente.
- **`prompts/create-component.md`**: corregido texto corrupto, convenciÃ³n `'<CategorÃ­a>/<Nombre>'`, tamaÃ±os `sm/default/lg` y theming global (sin `ThemeProvider` por story).
- **`AGENTS.md`**: inventario verificado, tabla de skills del proyecto, deuda tÃ©cnica y Definition of Done.

### Fixed

- **Tooltip**: content was rendered inline and could be clipped/invisible inside `overflow-hidden` ancestors; it is now portaled, themed and animated on the correct Radix open states
- **Calendar**: react-day-picker v10 class names corrected (day cell vs. day button), 44 px day/nav targets, clearer selected/today/range styling and dropdown caption support
- **DatePicker**: label/name association, popover name, selected-month opening, clear action outside the trigger, min/max constraints and form value support
- **Contraste AA**: tokens `success`, `info`, `warning`, `destructive`, `muted-foreground`, `neutral` y primarios de paleta ajustados en `defaultTheme.ts`, `palettes.ts` e `index.css`; `slate` dark `info` corregido para mantener paridad CSS/paleta
- **Portales**: tests de `Dialog`, `Drawer`, `Select` y `Popover` auditan el contenido portalizado con `axe.run(document.body)`; `Popover` y `Combobox` reciben nombre accesible
- **`Button asChild`**: sin wrapper extra, conserva semántica del hijo, iconos/loading y evita `disabled` nativo en enlaces
- **`Slider`**: estado controlado/no controlado, `onValueChange`, label/helper en el thumb y área táctil ampliada
- **`InputOTP` y `Select`**: `aria-invalid`/`aria-describedby`, IDs de error/ayuda, `name` del input oculto y botón de limpiar fuera del trigger
- **`Navbar`/`Sidebar` móviles**: `Drawer` modal con foco atrapado, Escape, retorno de foco y sin enlaces ocultos enfocables; `Table` expone `role="region"` con `tabIndex={0}`
- **Overlays**: `max-h-[85dvh]`, scroll interno, safe areas en hojas inferiores y cierres de 44×44 px en `Dialog`/`Drawer`; menús y `Select` con items de altura mínima táctil
- **Stories**: eliminados anchos fijos de página en `Card`, `Combobox`, `DatePicker`, `Select` y `Skeleton`
- **`ThemeProvider`**: el `<style id="theme-provider-style">` ahora emite un selector vÃ¡lido (`.${colorMode}.theme-${palette}`); `defaultTheme` y `setTheme` llegan al DOM.
- **Merge del tema**: `defaultTheme` y `setTheme` aceptan `DeepPartial<Theme>` y se fusionan en profundidad, sin borrar tokens hermanos.
- **Paletas de `src/index.css`**: valores en HSL crudo (se eliminaron 675 envoltorios `hsl(...)` que generaban `hsl(hsl(...))`) y bloques `.theme-*` correctos.
- **Paleta `stone`**: usa `.theme-stone` / `.dark .theme-stone`; eliminado el bloque dark duplicado y los selectores `data-theme`/`data-mode`.
- **Tests de theming**: nuevos casos para el selector generado, las clases del wrapper, el merge profundo, `applyToRoot` y el portal tematizado de `Dialog`.
- **Portales Radix**: `Dialog`, `Drawer`, `Select`, `DropdownMenu` y `Popover` renderizan en el contenedor del tema, asÃ­ que conservan la paleta y los overrides (antes caÃ­an en `:root`/`.dark`).
- **Build y publicaciÃ³n**: `dist/index.mjs` + `dist/index.cjs` coinciden con `package.json`; `src/index.css` se compila a `dist/index.css` y se exporta como `./style.css` (antes no se generaba CSS). `sideEffects` incluye CSS y se eliminÃ³ `vite-plugin-css-injected-by-js`.
- **`components.json`**: `tailwind.config` apunta a `tailwind.config.cjs`.
- **Aviso de PostCSS**: `Accordion` usa los tokens `--animate-accordion-*` y los `@keyframes` de `tw-animate-css`; se eliminaron `keyframes`/`animation` de `tailwind.config.cjs` porque las declaraciones generadas desde el config JS no conservan archivo de origen y Vite avisaba de que PostCSS no recibió la opción `from`. `dist/index.css` mantiene `@keyframes accordion-down/up` y las utilidades `animate-accordion-*`.
- **`DEP0205` al arrancar Storybook**: `dev` y `build-storybook` ejecutan `cross-env NODE_OPTIONS=--disable-warning=DEP0205` para silenciar el `module.register()` deprecado de Storybook 10 (upstream). Retirar cuando Storybook use `module.registerHooks()`.

### Removed

- **Dependencias muertas**: `@axe-core/react` (los tests usan `axe-core` directamente), `eslint-config-prettier` y `eslint-plugin-prettier` (el flat config no carga plugin de Prettier), `lint-staged` y `.lintstagedrc` (el pre-commit ejecuta Prettier/ESLint/`tsc`/Vitest por sí mismo). 35 paquetes menos en `node_modules`
- **`docs/ladle.md`**: sustituido por `docs/storybook.md` (el proyecto usa Storybook).

## [1.0.1] - 2026-05-11

### Added

- **Componente Accordion**: AcordeÃ³n expandible basado en Radix UI con soporte para items, contenido y triggers personalizados
- **Componente Alert**: Alertas informativas con variantes (default, destructive, success, warning, info) y tÃ­tulo descriptivo
- **Componente Avatar**: Avatar con imagen y fallback, basado en Radix UI
- **Componente Badge**: Badge con variantes (default, secondary, destructive, outline, success, warning, info) y sizes (sm, default, lg)
- **Componente Breadcrumb**: NavegaciÃ³n de migas de pan con separadores, elipsis y pÃ¡gina actual
- **Componente Calendar**: Calendario interactivo basado en React DayPicker con selecciÃ³n de fechas
- **Componente Card**: Tarjeta con header, contenido, footer y tÃ­tulo
- **Componente Carousel**: Carrusel de imÃ¡genes basado en Embla Carousel con navegaciÃ³n anterior/siguiente
- **Componente Checkbox**: Checkbox basado en Radix UI con label, texto de ayuda y validaciÃ³n
- **Componente Combobox**: Combobox con bÃºsqueda, popover, opciones seleccionables y loading state
- **Componente DatePicker**: Selector de fecha con calendario emergente y formatos personalizados
- **Componente Dialog**: DiÃ¡logo modal basado en Radix UI con header, contenido, footer y overlay
- **Componente Drawer**: Panel deslizable desde los bordes (left, right, top, bottom) con overlay y botÃ³n de cierre
- **Componente Footer**: Pie de pÃ¡gina con columnas, enlaces, logo, copyright y redes sociales
- **Componente InputOTP**: Campo de entrada OTP con grupos de caracteres, separadores y validaciÃ³n
- **Componente Navbar**: Barra de navegaciÃ³n responsive con logo, enlaces, menÃº mÃ³vil y acciones
- **Componente Pagination**: PaginaciÃ³n con botones anterior/siguiente, elipsis y nÃºmeros de pÃ¡gina
- **Componente Popover**: Popover emergente basado en Radix UI con trigger y contenido
- **Componente Progress**: Barra de progreso con label, valor porcentual y animaciÃ³n
- **Componente RadioGroup**: Grupo de radios basado en Radix UI con label y validaciÃ³n
- **Componente Sidebar**: Sidebar colapsable con header, grupos, items, separadores y footer
- **Componente Skeleton**: Esqueleto de carga con variantes (text, circular, rectangular) y animaciÃ³n pulse
- **Componente Slider**: Slider de rango con label, valores, tooltips y formatos personalizados
- **Componente Switch**: Switch toggle con label, texto de ayuda y validaciÃ³n
- **Componente Table**: Tabla simple con header, cuerpo, footer y caption
- **Componente Tabs**: PestaÃ±as basadas en Radix UI con lista, triggers y contenido
- **Componente Textarea**: Ãrea de texto con label, helper text, contador de caracteres y validaciÃ³n
- **Componente Toast**: Notificaciones toast con tÃ­tulo, descripciÃ³n, acciÃ³n y cierre
- **Componente ToggleGroup**: Grupo de toggles basado en Radix UI con selecciÃ³n mÃºltiple o Ãºnica
- **Componente Tooltip**: Tooltip informativo basado en Radix UI que aparece al hover

### Changed

- **package.json**: Actualizado de v1.0.0 a v1.0.1

### Fixed

- **Polyfills en tests**: Agregados `ResizeObserver`, `IntersectionObserver` y `matchMedia` para entorno jsdom
- **Accesibilidad**: AÃ±adidos `aria-label` a Progress, Combobox y Slider; aÃ±adido texto sr-only a ToastClose
- **Tests**: Corregidas queries en Breadcrumb, Sidebar, Drawer, Tooltip, Avatar y Carousel

## [1.2.0] - 2026-02-13

### Added

- **Prompt para creaciÃ³n de componentes con IA** (`prompts/create-component.md`): Nuevo sistema de prompts para generar componentes automÃ¡ticamente siguiendo los patrones de la librerÃ­a
- **DocumentaciÃ³n de IA en arquitectura** (`docs/architecture.md`): Nueva secciÃ³n "OpciÃ³n 2: Con IA (Recomendado)" con guÃ­a paso a paso para usar el prompt
- **Referencia en README.md**: Nueva secciÃ³n sobre cÃ³mo usar el prompt con IA

<!-- [END CHANGELOG] -->

## [1.1.0] - 2026-02-13

### Added

- **Componente ErrorBoundary**: Nuevo componente para manejo de errores en la aplicaciÃ³n
- **DocumentaciÃ³n de accesibilidad** (`docs/accessibility.md`): GuÃ­a completa sobre librerÃ­as y prÃ¡cticas de accesibilidad
- **DocumentaciÃ³n de estilado** (`docs/styling.md`): GuÃ­a sobre sistema de theming y CSS
- **DocumentaciÃ³n de Storybook** (`docs/storybook.md`): CÃ³mo crear stories y usar addons
- **DocumentaciÃ³n de arquitectura** (`docs/architecture.md`): Estructura del proyecto y patrones
- **Addon de accesibilidad en Storybook**: `@storybook/addon-a11y` para verificar WCAG
- **Testing de accesibilidad**: `@axe-core/react` para tests automatizados
- **SimulaciÃ³n de eventos de usuario**: `@testing-library/user-event` para tests mÃ¡s realistas

### Changed

- **ReorganizaciÃ³n de estructura**: Componentes ahora en carpetas individuales (`src/components/Button/`, `src/components/ErrorBoundary/`)
- **@radix-ui/react-slot**: Movido de `dependencies` a `peerDependencies` para evitar conflictos de versiÃ³n
- **README.md**: Actualizado con informaciÃ³n de librerÃ­as de accesibilidad y estructura de directorios
- **JSDoc comments**: Agregados al componente Button para mejor documentaciÃ³n de props

### Dependencies

- `@storybook/addon-a11y@^8.6.15` (new)
- `@axe-core/react@^4.11.1` (new)
- `@testing-library/user-event@^14.6.1` (new)
- `@radix-ui/react-slot@^1.2.0` (moved to peerDependencies)

<!-- [END CHANGELOG] -->

## [1.0.0] - 2026-02-12

### Added

- **Componente Button**: BotÃ³n versÃ¡til con mÃºltiples variantes y tamaÃ±os
- **Sistema de variantes**: default, destructive, warning, success, info, secondary, accent, neutral, outline, ghost, link, soft, dash, pill, glass, 3d, gradient, square, circle
- **Sistema de tamaÃ±os**: xs, sm, default, md, lg, xl, icon, icon-sm, icon-lg, icon-xl
- **Props avanzadas**: asChild (composiciÃ³n), isLoading, leftIcon, rightIcon, fullWidth
- **ConfiguraciÃ³n de Tailwind**: Variables CSS para theming, soporte para modo oscuro
- **Storybook**: DocumentaciÃ³n interactiva de componentes
- **Testing**: Vitest + React Testing Library + jest-dom
- **Linting**: ESLint + Prettier + Husky + lint-staged
- **Build**: Vite + vite-plugin-dts para generaciÃ³n de tipos

### Dependencies

- `@radix-ui/react-slot@^1.2.4`
- `class-variance-authority@^0.7.1`
- `clsx@^2.1.1`
- `lucide-react@^0.564.0`
- `tailwind-merge@^3.4.0`
- `tailwindcss-animate@^1.0.7`
