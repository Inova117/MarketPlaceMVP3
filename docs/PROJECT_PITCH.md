# PROJECT PITCH - MVP #3: Marketplace Local con Geolocalización

**Timeline**: 2 semanas  
**Team**: 1 Full-stack Developer  
**Budget**: Fixed time, variable scope

---

## 🎯 Problem Statement

**Current Pain Points**:
- 60% de directorios locales tienen información desactualizada
- Usuarios no pueden encontrar servicios confiables cerca de su ubicación
- Google Maps tiene reviews pero poca información detallada de servicios
- No existen filtros avanzados (precio, disponibilidad, categorías específicas)
- Falta de verificación en reviews genera desconfianza

**Impact**: 
- Usuarios pierden tiempo contactando proveedores incorrectos
- Pequeños negocios locales pierden clientes potenciales
- Baja tasa de conversión búsqueda → contacto (< 20% en plataformas actuales)

---

## 💡 Solution

Un **marketplace local geolocalizado** que conecta usuarios con proveedores de servicios cercanos mediante:

- 🗺️ **Búsqueda geolocalizada** con visualización en mapa (Mapbox)
- 👤 **Perfiles verificados** con fotos, horarios, y contacto directo
- ⭐ **Sistema de reviews** confiable con calificaciones reales
- 🔍 **Filtros avanzados** (distancia, precio, rating, categoría)
- ❤️ **Favoritos** para guardar proveedores de confianza

**Value Proposition**: "Encuentra servicios locales confiables en 30 segundos"

---

## 🎨 Core Features (MoSCoW)

### ✅ MUST-HAVE (MVP Scope)

#### 1. Búsqueda Geolocalizada
**Effort**: 4 días | **Value**: Critical - Core discovery

- Mapa interactivo con Mapbox
- Markers de proveedores cercanos
- Vista lista ordenada por distancia
- Filtro de radio (1-20km)

#### 2. Perfiles de Proveedor
**Effort**: 3 días | **Value**: High - Trust building

- Galería de fotos de trabajos
- Información completa (horarios, precios, servicios)
- Ubicación en mapa
- Botones de contacto directo (Llamar, WhatsApp, Email)

#### 3. Sistema de Reviews
**Effort**: 3 días | **Value**: High - Social proof

- Rating promedio (1-5 estrellas)
- Reviews con comentarios y fotos
- Ordenamiento (recientes, útiles)

#### 4. Filtros Avanzados
**Effort**: 2 días | **Value**: Medium - Relevancia

- Por categoría (Plomería, Electricidad, Limpieza, etc.)
- Por distancia (slider)
- Por rating mínimo
- Por rango de precio

#### 5. Favoritos
**Effort**: 2 días | **Value**: Medium - Retention

- Guardar proveedores favoritos
- Lista de favoritos persistente

**Total Effort**: 14 días

### 🟡 SHOULD-HAVE (Post-MVP)

- Autenticación de usuarios
- Dashboard para proveedores
- Notificaciones
- Chat en tiempo real

### 🔵 COULD-HAVE (Future)

- Reservas/citas online
- Pagos integrados
- App móvil nativa

### 🔴 WON'T-HAVE (Out of scope)

- Sistema de pagos en MVP
- Verificación de identidad automática
- Analytics dashboard para proveedores

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + Design System
- **Maps**: Mapbox GL JS + react-map-gl
- **Forms**: react-hook-form + Zod validation
- **Icons**: lucide-react

### Backend/Data
- **Strategy**: Mock data (per DEVELOPMENT_RULES.md Rule #11)
- **Data Location**: `lib/mock-data/`
- **Types**: TypeScript interfaces in `lib/types/`

### Quality & Testing
- **Testing**: Vitest (unit) + Playwright (E2E)
- **Linting**: ESLint + Prettier
- **CI/CD**: GitHub Actions
- **Error Tracking**: Sentry

### Deployment
- **Platform**: Vercel
- **Environment**: Production + Preview

---

## 🚨 Rabbit Holes (Risks)

### 1. Mapbox Integration Complexity
**Risk**: Configuración de Mapbox puede tomar más tiempo del estimado  
**Mitigation**: Usar react-map-gl (wrapper simplificado), ejemplos de documentación

### 2. Geolocation Permissions
**Risk**: Usuarios pueden denegar permisos de ubicación  
**Mitigation**: Fallback a búsqueda por ciudad/código postal

### 3. Mock Data Scalability
**Risk**: Mock data puede no simular casos edge realistas  
**Mitigation**: Crear dataset robusto con 20+ proveedores variados

### 4. Responsive Map UX
**Risk**: Mapas en mobile pueden ser difíciles de usar  
**Mitigation**: Priorizar vista lista en mobile, mapa en desktop

---

## 🔒 Security Considerations

### OWASP Checklist

- ✅ **Input Validation**: Zod schemas para todos los formularios
- ✅ **XSS Prevention**: React escapes by default
- ✅ **No Secrets Hardcoded**: Environment variables para Mapbox token
- ✅ **HTTPS Only**: Enforced por Vercel
- ⚠️ **Rate Limiting**: Post-MVP (no crítico sin backend real)
- ⚠️ **Authentication**: Post-MVP (mock data no requiere auth)

---

## 📊 Success Metrics

### North Star Metric
**Contactos realizados por día**  
Target: 100+ en primera semana

### Primary KPIs

| Metric | Target |
|--------|--------|
| Búsquedas realizadas | > 500/semana |
| Search → Contact conversion | > 40% |
| Avg session duration | > 3 min |
| Return user rate | > 30% |

---

## 📅 Timeline (2 Semanas)

### Week 1: Foundation + Core Features
- **Día 1-2**: Fase 1 (Shaping) + Fase 2 (Arquitectura)
- **Día 3-5**: Feature #1 (Búsqueda Geo) + Feature #2 (Perfiles)
- **Día 6-7**: Feature #3 (Reviews)

### Week 2: Polish + Deploy
- **Día 8-10**: Feature #4 (Filtros) + Feature #5 (Favoritos)
- **Día 11-12**: QA + Testing
- **Día 13-14**: Documentation + Deploy

---

## 🎨 Basic Wireframes

### Home Page (Search)
```
┌─────────────────────────────────────┐
│  🔍 Buscar servicios...             │
│  📍 Usar mi ubicación               │
└─────────────────────────────────────┘

┌──────────────┬──────────────────────┐
│              │  Filters:            │
│              │  □ Categoría         │
│   MAPA       │  ─ Distancia (5km)   │
│  (Mapbox)    │  ☆ Rating (4+)       │
│              │  $ Precio            │
│              │                      │
└──────────────┴──────────────────────┘

Results (12 encontrados)
┌─────────────────────────────────────┐
│ 📷 [Foto] Café Central              │
│ ⭐⭐⭐⭐⭐ 4.5 (127 reviews)          │
│ 📍 0.8 km · $$ · Restaurante        │
│ [Ver Perfil]                        │
└─────────────────────────────────────┘
```

### Provider Profile
```
┌─────────────────────────────────────┐
│  Café Central                       │
│  ⭐ 4.5 (127 reviews) · $$ · 0.8km  │
└─────────────────────────────────────┘

[📷 Galería de fotos - carousel]

Descripción:
Café tradicional con especialidad en desayunos...

📍 Ubicación: Calle Mayor 1, Madrid
🕐 Horarios: Lun-Vie 8am-8pm
💰 Precio: $$

[📞 Llamar] [💬 WhatsApp] [✉️ Email]

Reviews (127)
┌─────────────────────────────────────┐
│ ⭐⭐⭐⭐⭐ María García              │
│ "Excelente café y atención..."      │
│ 📷 [foto]                           │
│ hace 2 días                         │
└─────────────────────────────────────┘
```

---

## ✅ Appetite (Time Budget)

- **Total Time**: 14 días (2 semanas)
- **Buffer**: 0 días (fixed deadline)
- **Scope Flexibility**: SHOULD-HAVE features pueden moverse a post-MVP

**Cool-down**: 2 días para documentación y deploy

---

**Aprobación requerida**: Product Manager + Tech Lead  
**Próximo paso**: Fase 2 - Arquitectura (DATABASE_SCHEMA.md)

**Última actualización**: 2026-01-19
