# 📅 Design Proposal: Booking System Extension

Para transformar el MVP de "Directorio" a "Marketplace Transaccional".

## 1. Nuevos Modelos de Datos

### `Service`
Items específicos que un proveedor vende.
```typescript
interface Service {
  id: string
  providerId: string
  name: string        // ej: "Corte de Cabello"
  description: string // ej: "Incluye lavado y peinado"
  price: number       // ej: 25
  duration: number    // en minutos, ej: 30
}
```

### `Booking`
La transacción entre usuario y proveedor.
```typescript
interface Booking {
  id: string
  providerId: string
  userId: string
  serviceId: string
  date: string        // ISO date
  time: string        // "14:00"
  status: 'pending' | 'confirmed' | 'rejected' | 'completed'
  totalPrice: number
  createdAt: string
}
```

## 2. Nuevas Interfaces & Flujos

### A. Para el Proveedor (Dashboard)
1.  **Tab "Servicios"**:
    - CRUD de servicios (Crear, Editar, Borrar).
    - Definir precio y duración.
2.  **Tab "Reservas"**:
    - Lista de reservas entrantes (Status: Pending).
    - Acciones: ✅ Aceptar / ❌ Rechazar.
    - Historial de reservas pasadas.

### B. Para el Cliente (Perfil Público)
1.  **Lista de Servicios**:
    - Card por cada servicio con precio y duración.
    - Botón "Reservar" en cada item.
2.  **Modal de Reserva**:
    - Preview del servicio seleccionado.
    - Selector de Fecha (Datepicker simple).
    - Selector de Hora (Slots cada 1h para simplificar MVP).
    - Botón "Confirmar Reserva".
3.  **Confirmación**:
    - Mensaje de éxito.
    - "Tu solicitud ha sido enviada al proveedor".

## 3. Plan de Implementación

1.  **Data Layer**:
    - Crear `services.ts` y `bookings.ts` en `lib/mock-data`.
    - Crear Store `bookings-store.ts` para gestionar estado local.

2.  **Provider UI**:
    - Página `/dashboard/provider/services`.
    - Página `/dashboard/provider/bookings`.

3.  **Client UI**:
    - Componente `ServiceList` en perfil de proveedor.
    - Componente `BookingModal`.

4.  **Integration**:
    - Conectar modal con store de bookings.
    - Actualizar dashboard en tiempo real.

## 4. Esfuerzo Estimado
- **Backend Data/Types**: 1 hora
- **Provider Services UI**: 2 horas
- **Booking Flow UI**: 2 horas
- **Provider Bookings UI**: 1 hora
- **Total**: ~6 horas de desarrollo.
