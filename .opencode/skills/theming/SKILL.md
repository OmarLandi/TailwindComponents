---
name: theming
description: Use when working on colors, dark mode, CSS variables, ThemeProvider, ThemeToggle, useTheme, palettes or palette switching in this library. Trigger on "tema", "theming", "paleta", "palette", "dark mode", "modo oscuro", "variables CSS", "ThemeProvider", "color". Includes the raw-HSL rule and the known theming bugs to avoid.
---

# Theming y paletas

## Modelo mental

```
src/components/Themes/defaultTheme.ts   colores base (con hsl(...))
src/components/Themes/palettes.ts       13 paletas (light + dark, con hsl(...))
                 │
                 ▼
          ThemeProvider                 mergea base + paleta + overrides
                 │                        aplica <div class="{colorMode} theme-{palette}">
                 ▼
        variables CSS (--primary, --background, ...)
                 │
                 ▼
        tailwind.config.cjs             'hsl(var(--primary))'
                 │
                 ▼
        Componentes                      bg-primary, text-foreground, ...
```

## Regla crítica: HSL crudo en las variables

`tailwind.config.cjs` envuelve la variable en `hsl()`:

```js
primary: {
  DEFAULT: 'hsl(var(--primary))';
}
```

Por tanto la variable **debe** contener HSL crudo:

```css
--primary: 222.2 47.4% 11.2%; /* ✅ correcto */
--primary: hsl(222.2 47.4% 11.2%); /* ❌ genera hsl(hsl(...)), inválido */
```

- En `defaultTheme.ts` y `palettes.ts` los strings **sí** llevan `hsl(...)`, porque `ThemeProvider` los normaliza con `stripHsl` antes de escribir las variables.
- En `src/index.css` los valores deben ir **sin** wrapper.

## API

```tsx
<ThemeProvider
  colorMode="dark" // inicial; luego se lee de localStorage
  defaultPalette="violet" // PaletteName
  defaultTheme={{ radius: '1rem' }} // overrides parciales de Theme
  storageKey="theme-color-mode"
  disableTransitionOnChange={false}
>
  <App />
</ThemeProvider>
```

```tsx
const { theme, colorMode, setColorMode, toggleColorMode, setTheme } = useTheme();
```

- `ThemeToggle` solo cambia light/dark; **no** cambia la paleta.
- Usa `useTheme()` únicamente para leer valores en JS. En CSS usa clases Tailwind.
- `ThemeProvider` es opcional: `src/index.css` define los defaults en `:root` y `.dark`.

## Añadir una paleta (5 pasos)

1. **`src/components/Themes/palettes.ts`**: añade la entrada con `light` y `dark` completos (todos los campos de `ThemeColors`, incluidos `chart.1..5` y los `*Foreground`).
2. **`src/components/Themes/types.ts`**: añade el nombre al union `PaletteName`.
3. **`src/index.css`**: añade `.theme-<name>` y `.dark .theme-<name>` con **HSL crudo**.
4. **`tailwind.config.cjs`**: añade `'theme-<name>'` al `safelist`.
5. **`.storybook/preview.tsx`**: añade la opción al toolbar `palette`.

Test opcional en `tests/Themes.test.tsx` si cambia el comportamiento del provider.

## Invariantes (no los rompas)

1. El `<style id="theme-provider-style">` se emite como `.${colorMode}.theme-${palette} { ... }`. No vuelvas a inyectar declaraciones sueltas ni a hacer `replace(/:root/g, ...)`.
2. `defaultTheme` y `setTheme` aceptan `DeepPartial<Theme>` y se fusionan en profundidad; no vuelvas a un spread superficial.
3. Los bloques de paletas en `src/index.css` usan **HSL crudo** y selectores `.theme-<name>` / `.dark .theme-<name>`.
4. `stone` usa `.theme-stone` / `.dark .theme-stone`, nunca `[data-theme='stone']`.
5. Los portales Radix usan el contenedor de `usePortalContainer()`; no los devuelvas a `document.body` sin clases ni dupliques variables en un `div` local.

## Contraste y tokens semánticos

- Los pares `*-foreground` deben cumplir **4.5:1** en texto normal y **3:1** en texto grande/UI.
  No asumas que una paleta es válida: verifica `warning`, `info`, `success`, `destructive` y
  `muted-foreground` en light y dark.
- Estado actual conocido (auditoría 2026-10): warning ~1.98:1, info ~2.85:1, success ~3.35:1,
  destructive ~3.59:1, muted ~4.34:1; varias primarias de paleta fallan con foreground blanco.
  Corrige el token, no el componente.
- No uses `bg-blue-500` ni `style={{ color: '#...' }}`; usa `bg-primary`, `text-foreground`, etc.
- Los overlays deben usar un token (`--overlay`) cuando exista; hoy hay `bg-black/80` en
  Dialog/Drawer/Sidebar y es deuda a eliminar.

### Tokens inertes (deuda actual)

`ThemeProvider` emite `--font-*`, `--text-*`, `--shadow-*`, `--radius-*` y `--spacing-*`, pero
`tailwind.config.cjs` solo mapea colores y `--radius`. Si necesitas tipografía/sombras/spacing
del tema, primero añade el mapeo en Tailwind y una clase de utilidad; no leas valores con JS.

### Color scheme, RTL y densidad

- Añade `color-scheme: light`/`dark` al contenedor del tema para que scrollbars y controles
  nativos acompañen al modo.
- Usa utilidades lógicas (`ms-*`, `me-*`, `start-*`, `end-*`) y `dir` en el contenedor; evita
  `left/right`, `pl/pr`, `space-x` y `translate-x`.
- Densidad (`comfortable`/`compact`) se expresa con tokens/espaciado, no con clases sueltas por
  componente.
- Respeta `prefers-reduced-motion`: desactiva animaciones de Radix y transiciones de tema.

## Portales

`ThemeProvider` renderiza `PortalContainerProvider`, que crea un nodo en `<body>` con las clases `${colorMode} theme-${palette}`. Las primitivas que portalean lo consumen así:

```tsx
const container = usePortalContainer();

<Primitive.Portal container={container}>{children}</Primitive.Portal>;
```

`Dialog`, `Drawer`, `Select`, `DropdownMenu` y `Popover` ya lo hacen. `applyToRoot` (opt-in) replica clases y variables en `<html>` para portales de terceros; restaura los valores al desmontar y no debe usarse con varios `ThemeProvider`.

Al testear un portal, audita `axe.run(document.body)` o el nodo `[data-theme-portal]`, no el
contenedor de la story; y comprueba que el overlay abierto hereda light/dark y la paleta.

## Paletas disponibles

`neutral`, `stone`, `zinc`, `slate`, `violet`, `rose`, `orange`, `emerald`, `blue`, `red`, `indigo`, `amber`, `cyan`.

## No hacer

- ❌ `className="bg-blue-500"` o `style={{ color: '#fff' }}` en componentes.
- ❌ Guardar `hsl(...)` en variables de `src/index.css`.
- ❌ Usar `[data-theme='...']` para paletas.
- ❌ Añadir `<ThemeProvider>` dentro de cada story (ya es global).
- ❌ Duplicar la lógica de merge del tema fuera de `ThemeProvider`.

## Verificación

```bash
npx tsc --noEmit
npm run test:run -- tests/Themes.test.tsx
npm run lint
```

Y revisa visualmente en `npm run dev` cambiando **Color Mode** y **Palette** en la toolbar.
