# 📋 PRODUCT SPECIFICATION - MVP #3: Marketplace Local con Geolocalización

**Responsabilidad**: Product Manager  
**Enfoque**: QUÉ construir, POR QUÉ, CUÁNDO

---

## 🎯 Business Context

### Objetivo del MVP
Crear un **marketplace local geolocalizado** que conecte usuarios con proveedores/servicios cercanos mediante búsqueda por ubicación, reviews, y perfiles verificados.

### Problema de Negocio
- **Directorios obsoletos**: 60% de listados tienen info desactualizada
- **Difícil encontrar servicios locales**: Google Maps tiene reviews pero poca info detallada
- **Falta de confianza**: Reviews anónimas, sin verificación
- **No hay filtros avanzados**: Solo distancia, faltan precio, disponibilidad, etc.

### Oportunidad
- Mercado local services: $180B LATAM
- TAM: 2M pequeños negocios locales
- Competencia: Google Maps (muy general), Yelp (poco usado en LATAM)
- Nuestro edge: Hiperlocal + Reviews verificadas + Filtros avanzados

### Success Goal
- **500 proveedores** listados en 60 días
- **5,000 usuarios** buscando servicios
- **>70% match rate** (búsqueda → contacto con proveedor)
- **Avg 4.5+ stars** en reviews

---

## 👥 Target Users

### Persona 1: María López (Usuario)
- **Rol**: Dueña de casa
- **Edad**: 35
- **Uso**: Busca plomero, electricista, jardinero cerca de su casa
- **Pain**: Directorios viejos, no sabe quién es confiable
- **Expectativa**: Ver ubicación en mapa, reviews reales, contactar fácil

### Persona 2: Juan Ramírez (Proveedor)
- **Rol**: Plomero independiente
- **Edad**: 42
- **Uso**: Quiere más clientes locales
- **Pain**: Google Ads muy caro, boca a boca lento
- **Willingness to pay**: $29/mes por listing premium

---

## 🎨 Features (MoSCoW)

### ✅ **MUST-HAVE**

#### Feature #1: Búsqueda Geolocalizada
**Value**: Core discovery  
**Effort**: 4 días

**User Story**:
Como usuario, quiero:
- Buscar "plomero" cerca de mi ubicación actual
- Ver resultados en mapa (Mapbox)
- Ver resultados en lista ordenados por distancia
- Filtrar por distancia (1km, 5km, 10km, 20km)

#### Feature #2: Perfiles de Proveedor
**Value**: Trust & info  
**Effort**: 3 días

**User Story**:
Como usuario, quiero:
- Ver perfil completo del proveedor
- Ver fotos de trabajos anteriores (galería)
- Ver descripción de servicios
- Ver horarios, precio promedio
- Ver ubicación exacta en mapa
- Botones: "Llamar", "WhatsApp", "Email"

#### Feature #3: Sistema de Reviews
**Value**: Social proof  
**Effort**: 3 días

**User Story**:
Como usuario, quiero:
- Ver avg rating (1-5 estrellas)
- Ver reviews individuales (rating + comentario + fecha)
- Escribir review después de contactar proveedor
- Ver photos en reviews

#### Feature #4: Filtros Avanzados
**Value**: Relevancia  
**Effort**: 2 días

**User Story**:
Como usuario, quiero filtrar por:
- Categoría (Plomería, Electricidad, Limpieza, etc.)
- Distancia (slider 1-20km)
- Rating mínimo (3+, 4+, 4.5+)
- Precio (bajo, medio, alto)
- Disponibilidad (abierto ahora, disponible hoy)

#### Feature #5: Favoritos
**Value**: Retention  
**Effort**: 2 días

**User Story**:
Como usuario, quiero:
- Guardar proveedores favoritos
- Ver lista de favoritos
- Recibir notificaciones de favoritos (post-MVP)

---

## ✅ Acceptance Criteria

### Feature #1: Búsqueda Geolocalizada

**AC-1.1**: Map View
- [ ] Mapbox map centrado en ubicación del usuario
- [ ] Markers para cada proveedor
- [ ] Click marker → popup con nombre, rating, distancia
- [ ] Click popup → ir a perfil

**AC-1.2**: List View
- [ ] Cards ordenadas por distancia
- [ ] Card muestra: foto, nombre, categoría, rating, distancia, precio
- [ ] Toggle vista: Mapa ↔ Lista

**AC-1.3**: Search
- [ ] Input search por keyword (ej: "plomero")
- [ ] Autocomplete categorías
- [ ] Geolocation permission prompt

**Implementation**: `ENGINEERING.md` → § 6.2

---

### Feature #2: Perfiles de Proveedor

**AC-2.1**: Profile Page
- [ ] Header: nombre, categoría, rating, distancia
- [ ] Galería de fotos (carousel)
- [ ] Descripción de servicios
- [ ] Horarios (Mo-Fr 8am-6pm)
- [ ] Precio promedio range ($-$$$$)
- [ ] Map con ubicación

**AC-2.2**: Contact Actions
- [ ] Button "Llamar" → tel: link
- [ ] Button "WhatsApp" → wa.me link
- [ ] Button "Email" → mailto: link

**Implementation**: `ENGINEERING.md` → § 6.3

---

### Feature #3: Sistema de Reviews

**AC-3.1**: Display Reviews
- [ ] Avg rating (large, 4.7/5)
- [ ] Total review count (24 reviews)
- [ ] List reviews: rating stars, comment, user name, date, photo
- [ ] Sort: Más recientes, Más útiles

**AC-3.2**: Write Review
- [ ] Modal: rating (1-5 stars), comment textarea, upload photo
- [ ] Button "Submit Review"
- [ ] Verification: solo usuarios que contactaron pueden reviewar

**Implementation**: `ENGINEERING.md` → § 6.4

---

### Feature #4: Filtros Avanzados

**AC-4.1**: Filter Sidebar
- [ ] Category dropdown
- [ ] Distance slider (1-20km)
- [ ] Rating checkboxes (5★, 4★+, 3★+)
- [ ] Price range ($ $$ $$$ $$$$)
- [ ] "Open now" toggle

**AC-4.2**: Apply Filters
- [ ] Results update en tiempo real
- [ ] URL params para shareability
- [ ] Clear filters button

**Implementation**: `ENGINEERING.md` → § 6.5

---

### Feature #5: Favoritos

**AC-5.1**: Save Favorite
- [ ] Heart icon en card
- [ ] Click → save to favorites
- [ ] Saved state persists (DB)

**AC-5.2**: Favorites Page
- [ ] `/favorites` muestra lista
- [ ] Grid de cards
- [ ] Remove from favorites

**Implementation**: `ENGINEERING.md` → § 6.6

---

## 📊 Success Metrics

### North Star Metric
**Contactos realizados por día**  
Target: 2,000+/día (5,000 usuarios x 0.4 conversion)

### Primary Metrics

| Metric | Target |
|--------|--------|
| **Proveedores listados** | >500 |
| **Búsquedas/día** | >3,000 |
| **Search → Contact** | >40% |
| **Avg reviews/proveedor** | >5 |
| **Return user rate** | >60% |

---

## 📅 Timeline

### Sprint 1 (Semana 1)
- Día 1-2: Setup + Auth
- Día 3-5: Mapbox integration + Search
- Día 6-7: Provider profiles

### Sprint 2 (Semana 2)
- Día 8-10: Reviews system
- Día 11-12: Filters + Favoritos
- Día 13-14: QA + Deploy

---

## 👥 User Testing Plan

### Phase 1: Alpha (5 días)
- 20 proveedores beta (llenar perfiles)
- 50 usuarios testers (buscar servicios)
- Métrica: >30% contact rate

### Phase 2: Beta (10 días)
- 100 proveedores
- 500 usuarios
- Feedback: map UX, filter relevance

---

**Última actualización**: 2026-01-13  
**MVP**: #3 - Marketplace Local con Geolocalización
