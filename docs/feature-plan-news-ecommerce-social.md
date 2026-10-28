# Plan de ampliación: noticias, e-commerce y redes sociales

Fecha: 2026-10-28

## 1. Investigación realizada

Se revisaron patrones comunes de:

- **Sitios de noticias**: feed de historias, article hero, related stories, newsletter signup, author bio, comentarios, share bar, breaking news banner, masthead, column layout.
- **E-commerce**: product grid, filtros, cart, checkout, pricing, reviews, wishlist, stock badge, gallery zoom, variant selectors, order tracking.
- **Redes sociales (Facebook/Instagram)**: feed post, composer, comments, reactions, story carousel, profile header, sidebar suggestions, notifications, infinite scroll.
- **Formularios modernos**: Yup + React Hook Form, validación cliente/servidor, formateo de montos/fechas/números.
- **Optimización de bundles**: tree-shaking, dependencias externas, CSS único, barrel exports.

## 2. Reutilización actual

La librería ya cubre la base necesaria:

- Layout: `AppShell`, `Stack`, `Grid`, `Section`, `PageHeader`, `Prose`, `Container`, `SkipLink`, `VisuallyHidden`, `AspectRatio`, `ScrollArea`, `Separator`.
- Navegación: `Navbar`, `Sidebar`, `Tabs`, `Breadcrumb`, `Pagination`, `Command`.
- Formularios: `Button`, `TextField`, `Textarea`, `Select`, `Checkbox`, `RadioGroup`, `Switch`, `Slider`, `Combobox`, `DatePicker`, `InputOTP`, `Field`, `Form`, `ToggleGroup`.
- Data display: `Card`, `Badge`, `Avatar`, `Table`, `Carousel`, `Dialog`, `Drawer`, `Popover`, `Tooltip`, `Alert`, `EmptyState`, `Skeleton`, `Progress`, `Toast`.
- Utilidades: `ThemeProvider`, `ThemeToggle`, `useTheme`, paletas, `formatCurrency`, `formatDate`, etc., validación Yup.

## 3. Componentes/layouts faltantes priorizados

### P1 (alto impacto)

- `Article` / `NewsCard`: tarjeta de noticia con imagen, categoría, fecha, autor, extracto.
- `BreakingNewsBanner`: banner de última hora, dismissible, `role="alert"`.
- `ShareBar`: compartir en redes, orientación horizontal/vertical.
- `AuthorBio`: bio de autor con avatar, nombre, bio, redes.
- `Comment` / `CommentThread`: comentarios anidados con avatar, timestamp, acciones.
- `NewsletterSignup`: formulario compacto de suscripción.
- `ProductCard`: producto con imagen, precio, rating, stock, wishlist, add-to-cart.
- `ProductGallery`: galería con thumbnails y zoom.
- `Price`: formateo de precio, comparación original/oferta.
- `StockBadge`: estado de inventario.
- `Review` / `Rating`: reseñas y calificación por estrellas.
- `CartSummary` / `CartItem`: resumen de carrito.
- `CheckoutStepper`: pasos de checkout.
- `FeedPost`: post de red social con autor, contenido, media, acciones.
- `Composer`: editor de publicación con textarea, adjuntos y acciones.
- `ReactionBar`: likes/reactions con contadores.
- `StoryCarousel`: historias tipo Instagram.
- `ProfileHeader`: cabecera de perfil con avatar, stats, acciones.
- `SuggestionList`: sugerencias de seguimiento.
- `NotificationItem`: item de notificación.
- `InfiniteScroll`: helper basado en IntersectionObserver con loading.

### P2 (mejora y paridad)

- `MultiSelect`, `SearchInput`, `PasswordInput`, `NumberInput`, `FileUpload`, `DateRangePicker`, `TimePicker`.
- `DataTable`, `ErrorState`, `Stat`/KPI, `Timeline`, `TreeView`, `Chart`.
- `ContextMenu`, `Menubar`, `NavigationMenu`, `HoverCard`, `Collapsible`, `Toolbar`, `BottomSheet`.
- `DirectionProvider` (RTL), `useMediaQuery`, `ThemeScript`, `Toast` queue manager, `useToast`.

### Primitivas pendientes

- Todas las primitivas de layout prioritarias ya implementadas (`AspectRatio`, `ScrollArea`, `Separator`).
- Pendientes opcionales: `Collapsible`, `Toolbar`, `HoverCard`.

## 4. Dependencias y performance

- Externalizar en Vite: `react`, `react-dom`, `yup` (hecho), y en el futuro `@radix-ui/*`, `date-fns`, `embla-*`, `react-day-picker`, `cmdk`, `lucide-react` para reducir bundle (~700 KB ESM).
- Evitar barrel imports pesados en dev; preferir imports directos cuando sea posible.
- Mantener `sideEffects: ["**/*.css"]` y CSS único.
- Añadir `exports` para subpaths (`./formatters`, `./validation`) si se decide exponer utilidades por separado.
- Actualizaciones seguras: patch/minor de Radix/Storybook dentro de la misma major; no actualizar React 19 ni Tailwind 4 sin migración planificada.

## 5. Utilidades implementadas

- `formatCurrency`, `formatNumber`, `formatPercent`, `formatDate`, `formatDateTime`, `formatTime`, `formatFileSize`, `formatRelativeTime`.
- Validación Yup: `commonSchemas`, `validateWithSchema`, `validateWithSchemaSync`, `toFieldErrors`, `createYupResolver`.

## 6. Siguientes pasos recomendados

1. Implementar `ProductCard`, `Price`, `StockBadge` y `Rating` con tests axe.
2. Implementar `FeedPost`, `ReactionBar` y `Composer`.
3. Implementar `Article`/`NewsCard` y `BreakingNewsBanner`.
4. Añadir ejemplos de formularios con Yup + `Field`/`Form`.
5. Externalizar dependencias pesadas y medir bundle.
6. Añadir tests Playwright para nuevas plantillas si se crean.
