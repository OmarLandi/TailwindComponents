# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!-- [START CHANGELOG] -->

## [1.1.0] - 2026-02-13

### Added

- **Componente ErrorBoundary**: Nuevo componente para manejo de errores en la aplicación
- **Documentación de accesibilidad** (`docs/accessibility.md`): Guía completa sobre librerías y prácticas de accesibilidad
- **Documentación de estilado** (`docs/styling.md`): Guía sobre sistema de theming y CSS
- **Documentación de Storybook** (`docs/storybook.md`): Cómo crear stories y usar addons
- **Documentación de arquitectura** (`docs/architecture.md`): Estructura del proyecto y patrones
- **Addon de accesibilidad en Storybook**: `@storybook/addon-a11y` para verificar WCAG
- **Testing de accesibilidad**: `@axe-core/react` para tests automatizados
- **Simulación de eventos de usuario**: `@testing-library/user-event` para tests más realistas

### Changed

- **Reorganización de estructura**: Componentes ahora en carpetas individuales (`src/components/Button/`, `src/components/ErrorBoundary/`)
- **@radix-ui/react-slot**: Movido de `dependencies` a `peerDependencies` para evitar conflictos de versión
- **README.md**: Actualizado con información de librerías de accesibilidad y estructura de directorios
- **JSDoc comments**: Agregados al componente Button para mejor documentación de props

### Dependencies

- `@storybook/addon-a11y@^8.6.15` (new)
- `@axe-core/react@^4.11.1` (new)
- `@testing-library/user-event@^14.6.1` (new)
- `@radix-ui/react-slot@^1.2.0` (moved to peerDependencies)

<!-- [END CHANGELOG] -->

## [1.0.0] - 2026-02-12

### Added

- **Componente Button**: Botón versátil con múltiples variantes y tamaños
- **Sistema de variantes**: default, destructive, warning, success, info, secondary, accent, neutral, outline, ghost, link, soft, dash, pill, glass, 3d, gradient, square, circle
- **Sistema de tamaños**: xs, sm, default, md, lg, xl, icon, icon-sm, icon-lg, icon-xl
- **Props avanzadas**: asChild (composición), isLoading, leftIcon, rightIcon, fullWidth
- **Configuración de Tailwind**: Variables CSS para theming, soporte para modo oscuro
- **Storybook**: Documentación interactiva de componentes
- **Testing**: Vitest + React Testing Library + jest-dom
- **Linting**: ESLint + Prettier + Husky + lint-staged
- **Build**: Vite + vite-plugin-dts para generación de tipos

### Dependencies

- `@radix-ui/react-slot@^1.2.4`
- `class-variance-authority@^0.7.1`
- `clsx@^2.1.1`
- `lucide-react@^0.564.0`
- `tailwind-merge@^3.4.0`
- `tailwindcss-animate@^1.0.7`
