# Librería de Componentes React

Una librería de componentes React moderna y configurable construida con TypeScript, Tailwind CSS y Storybook.

## Instalación

```bash
npm install libreria-componentes
```

## Uso Rápido

```tsx
// 1. Importar estilos (importante: esto habilita los estilos de los componentes)
import 'libreria-componentes/style.css';

// 2. Importar los componentes que necesitas
import { Button, ErrorBoundary } from 'libreria-componentes';

function App() {
  return (
    // ErrorBoundary captura errores en los componentes hijos
    <ErrorBoundary>
      <Button variant="default" size="lg">
        Click me
      </Button>
    </ErrorBoundary>
  );
}
```

## Documentación

### 📚 Guías Disponibles

| Documento                                      | Descripción                                                             |
| ---------------------------------------------- | ----------------------------------------------------------------------- |
| [docs/architecture.md](docs/architecture.md)   | Arquitectura, estructura del proyecto y cómo agregar nuevos componentes |
| [docs/storybook.md](docs/storybook.md)         | Configuración de Storybook y cómo crear stories                         |
| [docs/styling.md](docs/styling.md)             | Sistema de theming, variables CSS y personalización                     |
| [docs/accessibility.md](docs/accessibility.md) | Librerías de accesibilidad y mejores prácticas WCAG                     |
| [docs/CHANGELOG.md](docs/CHANGELOG.md)         | Historial de cambios y versiones                                        |

### 🎨 Storybook

La documentación interactiva de componentes está disponible en Storybook.

```bash
npm run dev
```

Abre [http://localhost:6006](http://localhost:6006) para ver:

- Todos los componentes con ejemplos interactivos
- Controles para probar variantes y props
- Verificación automática de accesibilidad

## Scripts

```bash
npm run dev        # Iniciar Storybook
npm run build      # Build de la librería
npm run test       # Ejecutar tests
npm run lint       # Linting
npm run format     # Formatear código
npm run release    # Crear release
```

## Características

- **TypeScript** - Tipado completo (evita errores antes de ejecutar)
- **Tailwind CSS** - Estilos utilitarios (clases como `p-4`, `bg-blue-500`)
- **Accesibilidad WCAG 2.1** - Componentes accesibles por defecto
- **40+ variantes de Button** - Diferentes estilos (primary, secondary, destructive, etc.)
- **Modo oscuro** - Cambio automático de colores según el tema del sistema
- **Testing** - Vitest + React Testing Library + axe-core (pruebas de accesibilidad)
- **Conventional Commits** - Changelog automático basado en mensajes de commit

## Librerías de Referencia

Esta librería fue inspirada y diseñada tomando como referencia las siguientes librerías líderes en el ecosistema de Tailwind CSS:

| Librería                | Descripción                                                                      | Enlace                                                   |
| ----------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------- |
| **shadcn/ui**           | Componentes accesibles y personalizables construidos con Radix UI y Tailwind     | [shadcn.com](https://ui.shadcn.com)                      |
| **Tailwind UI**         | Componentes profesionales de Tailwind CSS creados por el equipo de Tailwind Labs | [tailwindui.com](https://tailwindui.com)                 |
| **daisyUI**             | Componentes Tailwind CSS más populares y ligeros                                 | [daisyui.com](https://daisyui.com)                       |
| **Flowbite**            | Componentes de código abierto construidos con Tailwind CSS                       | [flowbite.com](https://flowbite.com)                     |
| **HyperUI**             | Colección gratuita de componentes Tailwind CSS                                   | [hyperui.dev](https://hyperui.dev)                       |
| **Tailwind Components** | Repositorio comunitario de componentes Tailwind                                  | [tailwindcomponents.com](https://tailwindcomponents.com) |

## Requisitos

- React 18+
- Tailwind CSS 3.4+
- Node.js 18+

## Licencia

MIT - ver [LICENSE](LICENSE)

## Contribuir

Usa **Conventional Commits** para las contribuciones:

```bash
git commit -m "feat: add new component"     # Nueva funcionalidad
git commit -m "fix: resolve bug"           # Corregir error
git commit -m "docs: update documentation" # Actualizar docs
```

Ejecuta `npm run release` para generar el changelog automáticamente.

## Primeros Pasos para Nuevos Desarrolladores

1. **npm install** - Instala las dependencias
2. **npm run dev** - Inicia Storybook para ver los componentes
3. Explora los ejemplos en la sección de docs para entender cómo funciona cada cosa
