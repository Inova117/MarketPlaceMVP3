# Data Flow Diagrams - MVP #3: Marketplace Local

**Version**: 2.1  
**Last Updated**: 2026-01-19

---

## 🔄 Complete System Flows

### 1. Booking Creation Flow

```mermaid
sequenceDiagram
    participant C as Client
    participant UI as React UI
    participant API as Next.js API
    participant DB as PostgreSQL
    participant Store as Bookings Store

    C->>UI: Clicks "Reservar" on Service Card
    UI->>UI: Opens BookingModal
    C->>UI: Selects date, time, adds notes
    UI->>UI: Validates form inputs
    C->>UI: Clicks "Confirmar Reserva"
    
    UI->>API: POST /api/bookings
    Note over API: Check authentication
    API->>DB: BEGIN TRANSACTION
    
    API->>DB: SELECT service WHERE id = $serviceId
    DB-->>API: service.price, service.duration
    
    API->>DB: CHECK slot availability
    Note over DB: UNIQUE index prevents double-booking
    DB-->>API: Slot available ✓
    
    API->>DB: INSERT INTO bookings
    Note over DB: status = 'pending'<br/>total_price = service.price
    DB-->>API: booking created
    
    API->>DB: COMMIT TRANSACTION
    API-->>UI: { success: true, booking }
    
    UI->>Store: store.create(booking)
    Store->>Store: notify subscribers
    
    UI->>UI: Show success toast
    UI->>UI: Close modal
    
    Note over DB,Store: Provider receives notification
```

**Key Decision Points**:
1. **Slot Availability**: UNIQUE index on `(provider_id, date, time)` ensures no double-booking
2. **Price Lock**: Total price copied from service at booking time (protects from price changes)
3. **Transaction**: Ensures atomic operation (all-or-nothing)

---

### 2. Provider Accepts Booking Flow

```mermaid
sequenceDiagram
    participant P as Provider
    participant UI as Dashboard UI
    participant API as API Route
    participant DB as PostgreSQL
    participant Notify as Notification Service

    P->>UI: Views "/dashboard/provider/bookings"
    UI->>API: GET /api/bookings?provider_id=...&status=pending
    API->>DB: SELECT * FROM bookings WHERE...
    DB-->>API: pending bookings[]
    API-->>UI: bookings list
    
    UI->>UI: Displays pending requests
    P->>UI: Clicks "Aceptar" button
    
    UI->>API: PATCH /api/bookings/:id
    Note over API: Body: { status: 'confirmed' }
    
    API->>DB: UPDATE bookings SET status='confirmed'
    Note over DB: RLS ensures provider ownership
    DB-->>API: booking updated
    
    API->>Notify: Send email to customer
    Notify-->>API: email queued
    
    API-->>UI: { success: true }
    UI->>UI: Update UI optimistically
    UI->>UI: Show "Reserva confirmada" toast
    
    Note over P,Notify: Customer receives confirmation email
```

**RLS Security**:
```sql
-- Only provider can update their bookings
USING (
  provider_id IN (
    SELECT id FROM providers WHERE user_id = auth.uid()
  )
)
```

---

### 3. Review Submission + Rating Recalculation

```mermaid
sequenceDiagram
    participant U as User
    participant UI as Provider Page
    participant API as API Route
    participant DB as PostgreSQL
    participant Trigger as DB Trigger

    U->>UI: Clicks "Escribir Review"
    UI->>UI: Opens ReviewForm modal
    U->>UI: Selects rating (1-5), writes comment
    U->>UI: Optionally uploads photo
    U->>UI: Clicks "Publicar"
    
    UI->>API: POST /api/reviews
    Note over API: Body: {<br/>  provider_id,<br/>  rating,<br/>  comment,<br/>  photo_url<br/>}
    
    API->>DB: INSERT INTO reviews
    Note over DB: user_id = auth.uid()<br/>UNIQUE constraint prevents duplicates
    DB-->>API: review inserted
    
    DB->>Trigger: AFTER INSERT trigger fires
    Trigger->>DB: UPDATE providers SET avg_rating = AVG(...)
    Note over Trigger: Recalculates from all reviews
    Trigger->>DB: UPDATE providers SET review_count = COUNT(...)
    
    API-->>UI: { success: true, review }
    UI->>UI: Append review to list
    UI->>UI: Update provider.avg_rating display
    UI->>UI: Show success message
```

**Trigger Implementation**:
```sql
CREATE TRIGGER trigger_update_rating
  AFTER INSERT OR UPDATE OR DELETE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_provider_rating();
```

**Why Trigger?**:
- ✅ Ensures `avg_rating` always consistent
- ✅ Atomic with review creation
- ✅ No race conditions
- ✅ Works for INSERT/UPDATE/DELETE

---

### 4. Geolocation Search Flow

```mermaid
flowchart TD
    A[User Opens Homepage] --> B{Location Permission?}
    B -->|Denied| C[Show Manual Location Input]
    B -->|Granted| D[Get GPS Coordinates]
    
    D --> E[lat: -33.4489<br/>lng: -70.6693]
    C --> E
    
    E --> F[Apply Filters]
    F --> G{Category Filter?}
    G -->|Yes| H[Filter by category]
    G -->|No| I[All categories]
    
    H --> J{Rating Filter?}
    I --> J
    J -->|Yes| K[WHERE avg_rating >= min]
    J -->|No| L[All ratings]
    
    K --> M{Price Filter?}
    L --> M
    M -->|Yes| N[WHERE price_range = ...]
    M -->|No| O[All prices]
    
    N --> P{Open Now Filter?}
    O --> P
    P -->|Yes| Q[Check hours JSONB]
    P -->|No| R[All providers]
    
    Q --> S[PostGIS Radius Query]
    R --> S
    
    S --> T[earth_box + earth_distance]
    T --> U[ORDER BY distance ASC]
    U --> V[Return Results]
    
    V --> W[Display on Map + List]
    
    style S fill:#c8e6c9
    style T fill:#fff9c4
    style W fill:#bbdefb
```

**Query Optimization**:
```sql
-- Spatial index makes this O(log n)
CREATE INDEX idx_providers_location 
  ON providers USING GIST (
    ll_to_earth(latitude, longitude)
  );
```

---

### 5. Provider Onboarding Flow

```mermaid
flowchart LR
    A[User Signs Up] --> B{Role Selection}
    B -->|Client| C[Client Profile]
    B -->|Provider| D[Provider Onboarding]
    
    D --> E[Step 1: Basic Info<br/>Name, Category]
    E --> F[Step 2: Location<br/>Address, GPS]
    F --> G[Step 3: Contact<br/>Phone, Email, WhatsApp]
    G --> H[Step 4: Details<br/>Hours, Price Range]
    H --> I[Step 5: Photos<br/>Upload Portfolio]
    
    I --> J{Validation?}
    J -->|Fail| K[Show Errors]
    K --> E
    J -->|Pass| L[CREATE Provider Record]
    
    L --> M[Provider Dashboard]
    M --> N[Add Services]
    N --> O[Go Live]
    
    style D fill:#bbdefb
    style L fill:#c8e6c9
    style O fill:#fff9c4
```

**Validation Rules**:
- ✅ Name: 3-100 characters
- ✅ Category: Must be from predefined list
- ✅ Location: Valid lat/lng or geocodable address
- ✅ Phone: Valid format
- ✅ Hours: Valid time ranges (open < close)

---

### 6. Service Management (CRUD) Flow

```mermaid
stateDiagram-v2
    [*] --> Draft: Provider creates service
    Draft --> Active: Provider activates
    Active --> Draft: Provider deactivates
    Active --> Editing: Provider edits
    Editing --> Active: Save changes
    
    Active --> CheckBookings: Provider tries to delete
    CheckBookings --> Error: Has active bookings
    CheckBookings --> Deleted: No bookings
    Error --> Active: Cancel deletion
    
    Deleted --> [*]
    
    note right of Active
        Visible to clients
        Can be booked
    end note
    
    note right of Draft
        Not visible to clients
        Cannot be booked
    end note
```

**State Transitions**:
```typescript
// Soft delete if no active bookings
const canDelete = async (serviceId: string) => {
  const { count } = await supabase
    .from('bookings')
    .select('id', { count: 'exact', head: true })
    .eq('service_id', serviceId)
    .in('status', ['pending', 'confirmed'])
  
  return count === 0
}
```

---

### 7. Favorites Sync Flow

```mermaid
flowchart TD
    A[User Clicks Heart Icon] --> B{Already Favorited?}
    B -->|Yes| C[Remove from Favorites]
    B -->|No| D[Add to Favorites]
    
    C --> E[Update localStorage]
    D --> E
    
    E --> F[Update UI Optimistically]
    F --> G[Sync to Database]
    
    G --> H{API Success?}
    H -->|Yes| I[Keep UI Updated]
    H -->|No| J[Rollback UI]
    
    J --> K[Show Error Toast]
    K --> B
    
    I --> L[Update Heart Color]
    
    style E fill:#fff9c4
    style G fill:#c8e6c9
    style J fill:#ffcdd2
```

**Optimistic Update Pattern**:
```typescript
const toggleFavorite = async (providerId: string) => {
  // 1. Update UI immediately
  setIsFavorite(!isFavorite)
  
  try {
    // 2. Sync to backend
    if (isFavorite) {
      await supabase.from('favorites').delete(...)
    } else {
      await supabase.from('favorites').insert(...)
    }
  } catch (error) {
    // 3. Rollback on error
    setIsFavorite(isFavorite)
    toast.error('Failed to update favorite')
  }
}
```

---

## 🎯 System Architecture Patterns

### Observable Store Pattern

```typescript
class Observable<T> {
  private listeners = new Set<(data: T) => void>()
  
  subscribe(listener: (data: T) => void) {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }
  
  protected notify(data: T) {
    this.listeners.forEach(fn => fn(data))
  }
}

class BookingsStore extends Observable<Booking[]> {
  private bookings: Booking[] = []
  
  async load() {
    const data = await fetchBookings()
    this.bookings = data
    this.notify(data)
  }
  
  async create(booking: CreateBookingRequest) {
    const newBooking = await createBooking(booking)
    this.bookings.push(newBooking)
    this.notify(this.bookings)
  }
}
```

**Benefits**:
- ✅ Single source of truth
- ✅ Automatic UI updates
- ✅ Easy to test
- ✅ Decoupled from UI framework

---

## 📊 Performance Considerations

### Database Query Optimization

```sql
-- Bad: N+1 queries
SELECT * FROM bookings; -- 100 results
-- Then for each booking:
SELECT * FROM services WHERE id = booking.service_id; -- 100 queries

-- Good: Single JOIN query
SELECT 
  b.*,
  s.name as service_name,
  s.duration as service_duration
FROM bookings b
JOIN services s ON b.service_id = s.id
WHERE b.provider_id = $1;
```

### Caching Strategy

```typescript
// Cache provider profiles (1 hour TTL)
const getProvider = async (id: string) => {
  const cached = cache.get(`provider:${id}`)
  if (cached) return cached
  
  const fresh = await db.providers.findById(id)
  cache.set(`provider:${id}`, fresh, 3600)
  return fresh
}

// Invalidate on update
const updateProvider = async (id: string, data: any) => {
  await db.providers.update(id, data)
  cache.delete(`provider:${id}`)
}
```

---

**Last Updated**: 2026-01-19  
**Version**: 2.1
