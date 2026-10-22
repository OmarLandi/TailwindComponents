# Librería de Componentes React

Librería de componentes de UI construida con **React 18**, **TypeScript**, **Tailwind CSS**, **Radix UI** y **Storybook**, siguiendo los patrones de **shadcn/ui**. Diseñada para **componer páginas completas**, no solo primitivas aisladas.

- 49 componentes listos para producción + capa de layout incluida
- Responsive mobile-first (320–1536 px), targets ≥44 px y soporte `dvh`/safe areas
- Accesibilidad WCAG 2.2 AA verificada con `axe-core` en todos los componentes
- Sistema de theming con variables CSS (light/dark + 13 paletas)
- Modelos de página documentados (App Shell, Auth, Settings, Marketing, Docs, E-commerce, CRUD)
- Documentación interactiva con Storybook y viewports 375/768/1280

## Instalación

```bash
npm install libreria-componentes
```

### Peer dependencies

El consumidor debe tener instaladas:

```bash
npm install react react-dom @radix-ui/react-slot
```

> Requisitos: React 18+, Node.js 18+ y Tailwind CSS 3.4+ si vas a personalizar estilos.

## Uso Rápido

```tsx
// 1. Importar los estilos de la librería (una sola vez)
import 'libreria-componentes/style.css';

// 2. Importar componentes
import { Button, TextField, SelectField, ThemeProvider } from 'libreria-componentes';

export function App() {
  return (
    <ThemeProvider defaultPalette="violet">
      <Button variant="default" size="lg">
        Click me
      </Button>

      <TextField label="Email" placeholder="Enter your email" />

      <SelectField
        label="Framework"
        placeholder="Select..."
        items={[
          { value: 'react', label: 'React' },
          { value: 'vue', label: 'Vue' },
        ]}
      />
    </ThemeProvider>
  );
}
```

Los overlays (`Dialog`, `Drawer`, `Select`, `DropdownMenu`, `Popover`) se montan en un contenedor a nivel de `body` con las clases del tema, así que conservan la paleta activa. Si necesitas tematizar portales propios o el documento completo, usa `applyToRoot` en `ThemeProvider`.

### Solo componentes (sin ThemeProvider)

El theming funciona por CSS cascade: `src/index.css` define los valores por defecto en `:root` y `.dark`. `ThemeProvider` es opcional y añade persistencia en `localStorage`, cambio de modo y paletas.

```tsx
import 'libreria-componentes/style.css';
import { Button } from 'libreria-componentes';

export function App() {
  return <Button>Click me</Button>;
}
```

## Documentación

| Documento                                          | Descripción                                                      |
| -------------------------------------------------- | ---------------------------------------------------------------- |
| [docs/architecture.md](docs/architecture.md)       | Arquitectura, estructura del proyecto y cómo agregar componentes |
| [docs/storybook.md](docs/storybook.md)             | Storybook: configuración, stories, controles y toolbar de temas  |
| [docs/styling.md](docs/styling.md)                 | Tailwind, CVA, `cn()` y sistema de variables CSS                 |
| [docs/accessibility.md](docs/accessibility.md)     | Accesibilidad, `axe-core` y patrones WCAG                        |
| [docs/layouts.md](docs/layouts.md)                 | Modelos de página, breakpoints y variantes de distribución       |
| [docs/component-audit.md](docs/component-audit.md) | Auditoría completa, hallazgos P0/P1 y plan priorizado            |
| [docs/roadmap.md](docs/roadmap.md)                 | Mejoras, actualizaciones y componentes planificados              |
| [docs/CHANGELOG.md](docs/CHANGELOG.md)             | Historial de cambios y versiones                                 |

La documentación visual e interactiva de los componentes está en Storybook:

```bash
npm run dev
```

Abre [http://localhost:6006](http://localhost:6006).

## Scripts

```bash
npm run dev             # Storybook en http://localhost:6006
npm run build           # Build de la librería (tsc + vite)
npm run build-storybook # Build estático de Storybook
npm run preview         # Preview del build de la librería
npm test                # Tests en modo watch
npm run test:run        # Tests una sola vez
npm run test:coverage   # Tests con cobertura
npm run test:e2e        # Playwright: plantillas a 375/768/1280
npm run test:e2e:update # Regenera los snapshots de Playwright
npm run lint            # ESLint
npm run lint:fix        # ESLint con autofix
npm run format          # Prettier
npm run release         # Release con release-it (requiere token de GitHub)
npm run release:dry     # Dry run del release
```

## Componentes

### Navigation

| Componente   | Descripción                                                    |
| ------------ | -------------------------------------------------------------- |
| `Breadcrumb` | Migas de pan con separadores, elipsis y página actual          |
| `Navbar`     | Barra de navegación responsive con logo, enlaces y menú móvil  |
| `Pagination` | Paginación con anterior/siguiente, elipsis y números de página |
| `Sidebar`    | Sidebar colapsable con header, grupos, items y footer          |
| `Tabs`       | Pestañas accesibles basadas en Radix UI                        |
| `Command`    | Paleta de comandos con búsqueda, teclado y `CommandDialog`     |

### Forms

| Componente    | Descripción                                                        |
| ------------- | ------------------------------------------------------------------ |
| `Button`      | Botón con 7 variantes, 5 tamaños, iconos, loading y `asChild`      |
| `Checkbox`    | Checkbox con label, helper text y validación                       |
| `Combobox`    | Selector con búsqueda, popover, loading y estado de error          |
| `DatePicker`  | Selector de fecha con calendario emergente (`react-day-picker`)    |
| `InputOTP`    | Campo OTP con grupos, separadores y validación                     |
| `RadioGroup`  | Grupo de radios accesible basado en Radix UI                       |
| `Select`      | Primitivas de Select + `SelectField` con búsqueda y limpieza       |
| `Slider`      | Slider de rango con label, tooltips y formato de valores           |
| `Switch`      | Toggle con label, helper text y validación                         |
| `Textarea`    | Área de texto con contador de caracteres y validación              |
| `TextField`   | Input con 4 variantes, label, iconos, helper y error               |
| `ToggleGroup` | Grupo de toggles con selección única o múltiple                    |
| `Field`       | Primitivas de campo con label, descripción, error y `FieldControl` |
| `Form`        | Formulario semántico con secciones y acciones responsive           |

### Data Display

| Componente      | Descripción                                                          |
| --------------- | -------------------------------------------------------------------- |
| `Accordion`     | Acordeón expandible basado en Radix UI                               |
| `Alert`         | Alertas con variantes (default, destructive, success, warning, info) |
| `Avatar`        | Avatar con imagen y fallback                                         |
| `Badge`         | Etiquetas con variantes y tamaños                                    |
| `Calendar`      | Calendario interactivo basado en `react-day-picker`                  |
| `Card`          | Tarjeta con header, título, contenido y footer                       |
| `Carousel`      | Carrusel basado en Embla con navegación anterior/siguiente           |
| `Container`     | Contenedor responsive con tamaños y padding                          |
| `Dialog`        | Diálogo modal accesible con overlay, header y footer                 |
| `Drawer`        | Panel deslizable desde cualquier borde                               |
| `DropdownMenu`  | Menú de acciones con checkbox/radio items y submenús                 |
| `ErrorBoundary` | Captura errores de componentes hijos con fallback y reset            |
| `Footer`        | Pie de página con columnas, enlaces y redes sociales                 |
| `Popover`       | Popover emergente basado en Radix UI                                 |
| `Progress`      | Barra de progreso con label y valor porcentual                       |
| `Skeleton`      | Placeholder de carga con variantes y animación pulse                 |
| `Table`         | Tabla con header, body, footer y caption                             |
| `Toast`         | Notificaciones con título, descripción, acción y cierre              |
| `Tooltip`       | Tooltip informativo al hover/focus                                   |
| `AlertDialog`   | Confirmación modal accesible para acciones destructivas              |
| `EmptyState`    | Estado vacío con icono, título, descripción y acciones               |

### Layout

| Componente       | Descripción                                                       |
| ---------------- | ----------------------------------------------------------------- |
| `AppShell`       | Marco de aplicación con header, sidebar, main, footer y skip link |
| `Grid`           | Grid responsive con columnas tipadas por breakpoint               |
| `PageHeader`     | Cabecera con breadcrumb, título, descripción, acciones y tabs     |
| `Prose`          | Contenido largo a 65ch con tipografía y medios responsive         |
| `Section`        | Sección con ritmo vertical, superficie y contenedor semántico     |
| `SkipLink`       | Enlace de salto a `#main` visible al foco                         |
| `Stack`          | Distribución flex con dirección, gap, alineación y wrap           |
| `VisuallyHidden` | Texto solo para lectores de pantalla                              |

Planificadas: `AspectRatio`, `ScrollArea`, `Separator`. Las plantillas de pǭgina estǭn
implementadas como stories `Templates/*` (App Shell/Dashboard, Auth, Settings, Marketing,
Docs, E-commerce/List-Detail, CRUD y estados). Ver [docs/layouts.md](docs/layouts.md).

### Utilities

| Export                   | Descripción                                               |
| ------------------------ | --------------------------------------------------------- |
| `ThemeProvider`          | Provee modo claro/oscuro, paletas y persistencia          |
| `ThemeToggle`            | Botón para alternar entre light y dark                    |
| `useTheme`               | Hook con `theme`, `colorMode`, `setColorMode`, `setTheme` |
| `palettes`, `getPalette` | 13 paletas de color predefinidas                          |

## Responsive y accesibilidad

- Mobile-first desde 320 px; sin scroll horizontal de página.
- Viewports de referencia: 375, 768 y 1280 px.
- Targets táctiles ≥44×44 px y foco visible en todos los controles.
- Teclado completo, `aria-*` correctos y errores anunciados con `role="alert"`.
- `prefers-reduced-motion` y utilidades lógicas para RTL.
- Overlays con altura máxima, scroll interno y contenedor tematizado.

Consulta [docs/layouts.md](docs/layouts.md) para la matriz responsive y
[docs/accessibility.md](docs/accessibility.md) para el checklist WCAG.

## Temas y paletas

```tsx
import { ThemeProvider, ThemeToggle } from 'libreria-componentes';

<ThemeProvider defaultPalette="emerald" colorMode="dark">
  <ThemeToggle />
  <App />
</ThemeProvider>;
```

Paletas disponibles: `neutral`, `stone`, `zinc`, `slate`, `violet`, `rose`, `orange`, `emerald`, `blue`, `red`, `indigo`, `amber`, `cyan`.

Cada paleta incluye versión light y dark. Ver [docs/styling.md](docs/styling.md) para personalizar o añadir paletas.

## Cómo funciona

```
src/components/<Nombre>/<Nombre>.tsx   # Componente (CVA + forwardRef)
src/components/<Nombre>/index.ts       # Export del componente y tipos
src/components/index.ts                # Barrel export
src/lib/utils.ts                       # cn() (clsx + tailwind-merge)
src/components/Themes/                 # ThemeProvider, paletas y tipos
tailwind.config.cjs                    # Mapea CSS vars a utilidades
src/index.css                          # Variables CSS base y paletas
stories/                               # Documentación (Storybook CSF)
tests/                                 # Vitest + Testing Library + axe-core
e2e/                                   # Playwright: overflow + screenshots de plantillas
```

## Librerías de referencia

| Librería      | Descripción                                                      | Enlace                                       |
| ------------- | ---------------------------------------------------------------- | -------------------------------------------- |
| **shadcn/ui** | Componentes accesibles y personalizables con Radix UI y Tailwind | [ui.shadcn.com](https://ui.shadcn.com)       |
| **Radix UI**  | Primitivas accesibles y sin estilos                              | [radix-ui.com](https://www.radix-ui.com)     |
| **Storybook** | Documentación y pruebas visuales de componentes                  | [storybook.js.org](https://storybook.js.org) |

## Contribuir

El proyecto usa **Conventional Commits** (validado por `commitlint`):

```bash
git commit -m "feat: add Card component"
git commit -m "fix: resolve TextField focus issue"
git commit -m "docs: update theming guide"
```

Antes de hacer commit se ejecutan automáticamente Prettier, ESLint, `tsc --noEmit` y los tests (hook `pre-commit` de Husky).

## Licencia

MIT
