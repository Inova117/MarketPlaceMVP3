# Cerca — Marketplace local con geolocalización

> Encuentra lo mejor cerca de ti. Descubre profesionales y negocios verificados,
> compara reseñas reales y reserva en segundos.

![Status](https://img.shields.io/badge/status-showcase-4f46e5) ![Next.js](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)

---

## ✨ Qué incluye

- **Búsqueda geolocalizada** — ordena resultados por cercanía usando la ubicación del navegador (fórmula de Haversine).
- **Vista de mapa interactiva** — pines posicionados por coordenadas reales, sincronizados con la lista (hover + selección), sin dependencia de un token externo.
- **Filtros avanzados** — categoría, distancia, valoración, rango de precio y "abierto ahora", con orden por relevancia / valoración / reseñas / cercanía.
- **Perfiles de proveedor** — galería con lightbox, horarios con resaltado del día actual, contacto directo (llamada / WhatsApp / email) y reservas.
- **Reseñas verificadas** — resumen con distribución de estrellas, formulario validado (Zod) y rate-limiting.
- **Reservas** — los clientes solicitan cita; los proveedores aceptan/rechazan desde su panel.
- **Panel de proveedor** — resumen, perfil, fotos, servicios y reservas con navegación lateral persistente.
- **Favoritos** — guardado local con feedback inmediato.
- **Dark mode** completo + sistema de diseño con tokens, toasts y micro-interacciones.

## 🎨 Sistema de diseño

Identidad propia construida sobre tokens semánticos (light/dark):

- **Marca**: índigo–violeta (`primary`) con acento ámbar (`accent`) sobre neutros cálidos.
- **Tipografía**: Inter (UI) + Outfit (display).
- Componentes base reutilizables: `Button`, `Card`, `Input`, `Select`, `Textarea`, `Badge`, `Avatar`, `Rating`, `Skeleton`, `Modal`, `Toast`.

## 🚀 Inicio rápido

```bash
npm install
npm run dev
```

Accesos de demostración:

| Rol       | Email              | Contraseña |
| --------- | ------------------ | ---------- |
| Cliente   | user@demo.com      | demo123    |
| Proveedor | provider@demo.com  | demo123    |

## 🛠️ Stack

- Next.js 14 (App Router) · TypeScript · Tailwind CSS
- Zod (validación) · next-themes (dark mode) · lucide-react (iconos)

## 📁 Estructura

```
app/            Rutas (home, providers/[id], favorites, dashboard/provider/*)
components/
  ui/           Primitivos de diseño
  layout/       Navbar, Footer, Logo, DashboardShell
  features/     Búsqueda, filtros, mapa, tarjetas, reseñas, reservas
lib/            Tipos, utilidades, datos mock, validaciones
```

---

**Zerion Studio** · MVP showcase
