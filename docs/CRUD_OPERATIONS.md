# CRUD Operations Guide - MVP #3: Marketplace Local

**Version**: 2.1  
**Last Updated**: 2026-01-19

---

## 📚 Table of Contents

1. [Providers CRUD](#providers-crud)
2. [Services CRUD](#services-crud)
3. [Bookings CRUD](#bookings-crud)
4. [Reviews CRUD](#reviews-crud)
5. [Favorites CRUD](#favorites-crud)
6. [State Management](#state-management)

---

## 🏢 Providers CRUD

### Create Provider Profile

**Endpoint**: `POST /api/providers`

```typescript
// Request Body
interface CreateProviderRequest {
  name: string
  category: string
  description: string
  latitude: number
  longitude: number
  address: string
  phone: string
  email: string
  whatsapp?: string
  price_range: '$' | '$$' | '$$$' | '$$$$'
  hours: {
    [day: string]: { open: string; close: string } | null
  }
}

// SQL Implementation
const { data, error } = await supabase
  .from('providers')
  .insert({
    user_id: auth.uid(),
    ...providerData
  })
  .select()
  .single()
```

**Business Logic**:
- ✅ Validates user is authenticated
- ✅ Ensures one provider per user
- ✅ Geocodes address if lat/lng not provided
- ✅ Initializes `avg_rating` to 0

---

### Read Provider(s)

**Get Single Provider**:
```typescript
const { data } = await supabase
  .from('providers')
  .select(`
    *,
    photos:provider_photos(*),
    services:services(*)
  `)
  .eq('id', providerId)
  .single()
```

**Search Providers by Location**:
```typescript
const { data } = await supabase
  .rpc('nearby_providers', {
    user_lat: -33.4489,
    user_lng: -70.6693,
    radius_meters: 5000,
    category_filter: 'Plomería',
    min_rating: 4.0
  })
```

**RPC Function**:
```sql
CREATE OR REPLACE FUNCTION nearby_providers(
  user_lat DECIMAL,
  user_lng DECIMAL,
  radius_meters INTEGER DEFAULT 5000,
  category_filter TEXT DEFAULT NULL,
  min_rating DECIMAL DEFAULT NULL
)
RETURNS TABLE(
  id UUID,
  name TEXT,
  category TEXT,
  latitude DECIMAL,
  longitude DECIMAL,
  distance_meters NUMERIC,
  avg_rating DECIMAL,
  review_count INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.name,
    p.category,
    p.latitude,
    p.longitude,
    earth_distance(
      ll_to_earth(p.latitude, p.longitude),
      ll_to_earth(user_lat, user_lng)
    ) AS distance_meters,
    p.avg_rating,
    p.review_count
  FROM providers p
  WHERE 
    earth_box(ll_to_earth(user_lat, user_lng), radius_meters) 
      @> ll_to_earth(p.latitude, p.longitude)
    AND (category_filter IS NULL OR p.category = category_filter)
    AND (min_rating IS NULL OR p.avg_rating >= min_rating)
  ORDER BY distance_meters ASC;
END;
$$ LANGUAGE plpgsql;
```

---

### Update Provider Profile

```typescript
const { data } = await supabase
  .from('providers')
  .update({
    name,
    description,
    phone,
    hours,
    updated_at: new Date().toISOString()
  })
  .eq('id', providerId)
  .eq('user_id', auth.uid()) // RLS ensures ownership
  .select()
  .single()
```

**Allowed Updates**:
- ✅ Name, description, contact info
- ✅ Hours, price range
- ❌ Cannot change `user_id` or `id`
- ❌ Cannot directly modify `avg_rating` (computed)

---

### Delete Provider

```typescript
const { error } = await supabase
  .from('providers')
  .delete()
  .eq('id', providerId)
  .eq('user_id', auth.uid())
```

**Cascade Behavior**:
- 🗑️ Deletes all `provider_photos` (CASCADE)
- 🗑️ Deletes all `services` (CASCADE)
- 🗑️ Deletes all `bookings` (CASCADE)
- 🗑️ Deletes all `reviews` (CASCADE)
- 🗑️ Deletes all `favorites` (CASCADE)

---

## 🛍️ Services CRUD

### Create Service

```typescript
interface CreateServiceRequest {
  provider_id: string
  name: string
  description: string
  price: number
  duration: number // minutes
  is_active?: boolean
}

const { data } = await supabase
  .from('services')
  .insert({
    provider_id: userProviderId,
    ...serviceData
  })
  .select()
  .single()
```

**Validation**:
- ✅ Price must be >= 0
- ✅ Duration must be > 0
- ✅ Provider must exist
- ✅ User must own the provider

---

### Read Services

**Get Provider's Services**:
```typescript
const { data } = await supabase
  .from('services')
  .select('*')
  .eq('provider_id', providerId)
  .eq('is_active', true)
  .order('created_at', { ascending: false })
```

**Get Single Service**:
```typescript
const { data } = await supabase
  .from('services')
  .select(`
    *,
    provider:providers(name, category, avg_rating)
  `)
  .eq('id', serviceId)
  .single()
```

---

### Update Service

```typescript
const { data } = await supabase
  .from('services')
  .update({
    name,
    description,
    price,
    duration,
    is_active,
    updated_at: new Date().toISOString()
  })
  .eq('id', serviceId)
  .select()
  .single()
```

**Business Rules**:
- ✅ Can deactivate service (`is_active = false`)
- ⚠️ Cannot delete if active bookings exist
- ✅ Price changes don't affect existing bookings

---

### Soft Delete Service

```typescript
// Recommended: Soft delete
const { data } = await supabase
  .from('services')
  .update({ is_active: false })
  .eq('id', serviceId)
  .select()
  .single()

// Hard delete (only if no bookings)
const { data: bookings } = await supabase
  .from('bookings')
  .select('id')
  .eq('service_id', serviceId)
  .limit(1)

if (bookings?.length === 0) {
  await supabase
    .from('services')
    .delete()
    .eq('id', serviceId)
}
```

---

## 📅 Bookings CRUD

### Create Booking

```typescript
interface CreateBookingRequest {
  provider_id: string
  service_id: string
  date: string // YYYY-MM-DD
  time: string // HH:MM
  notes?: string
}

const service = await supabase
  .from('services')
  .select('price')
  .eq('id', serviceId)
  .single()

const { data } = await supabase
  .from('bookings')
  .insert({
    provider_id: providerId,
    user_id: auth.uid(),
    service_id: serviceId,
    date,
    time,
    status: 'pending',
    total_price: service.price,
    notes
  })
  .select()
  .single()
```

**Validation**:
- ✅ Service must exist and be active
- ✅ Date/time must be in the future
- ✅ Slot must not be double-booked
- ✅ User must be authenticated

**Unique Constraint Prevents Double-Booking**:
```sql
CREATE UNIQUE INDEX idx_bookings_slot 
  ON bookings(provider_id, date, time)
  WHERE status IN ('pending', 'confirmed');
```

---

### Read Bookings

**User's Bookings**:
```typescript
const { data } = await supabase
  .from('bookings')
  .select(`
    *,
    service:services(name, duration),
    provider:providers(name, phone, address)
  `)
  .eq('user_id', auth.uid())
  .order('date', { ascending: true })
```

**Provider's Bookings**:
```typescript
const { data } = await supabase
  .from('bookings')
  .select(`
    *,
    service:services(name),
    user:auth.users(email)
  `)
  .eq('provider_id', userProviderId)
  .eq('status', 'pending')
  .order('date', { ascending: true })
```

---

### Update Booking Status

```typescript
// Provider accepts booking
const { data } = await supabase
  .from('bookings')
  .update({ 
    status: 'confirmed',
    updated_at: new Date().toISOString()
  })
  .eq('id', bookingId)
  .eq('provider_id', userProviderId)
  .select()
  .single()

// User cancels booking
const { data } = await supabase
  .from('bookings')
  .update({ status: 'cancelled' })
  .eq('id', bookingId)
  .eq('user_id', auth.uid())
  .in('status', ['pending', 'confirmed'])
  .select()
  .single()
```

**Status Transitions**:
```
pending → confirmed (provider accepts)
pending → rejected (provider declines)
confirmed → completed (after appointment)
confirmed | pending → cancelled (user cancels)
```

---

## ⭐ Reviews CRUD

### Create Review

```typescript
interface CreateReviewRequest {
  provider_id: string
  rating: number // 1-5
  comment?: string
  photo_url?: string
}

const { data } = await supabase
  .from('reviews')
  .insert({
    provider_id,
    user_id: auth.uid(),
    user_name: currentUser.name,
    rating,
    comment,
    photo_url
  })
  .select()
  .single()

// Trigger automatically updates provider.avg_rating
```

**Validation**:
- ✅ Rating must be 1-5
- ✅ One review per user-provider pair (unique constraint)
- ✅ User must be authenticated
- ⚡ Triggers `update_provider_rating()` function

---

### Read Reviews

**Provider's Reviews**:
```typescript
const { data } = await supabase
  .from('reviews')
  .select('*')
  .eq('provider_id', providerId)
  .order('created_at', { ascending: false })
```

**Rating Distribution**:
```typescript
const { data } = await supabase
  .from('reviews')
  .select('rating')
  .eq('provider_id', providerId)

const distribution = data.reduce((acc, { rating }) => {
  acc[rating] = (acc[rating] || 0) + 1
  return acc
}, {})
```

---

### Update Review

```typescript
const { data } = await supabase
  .from('reviews')
  .update({
    rating,
    comment,
    photo_url
  })
  .eq('id', reviewId)
  .eq('user_id', auth.uid()) // RLS ensures ownership
  .select()
  .single()

// Trigger re-calculates avg_rating
```

---

### Delete Review

```typescript
const { error } = await supabase
  .from('reviews')
  .delete()
  .eq('id', reviewId)
  .eq('user_id', auth.uid())

// Trigger re-calculates provider avg_rating
```

---

## ❤️ Favorites CRUD

### Add Favorite

```typescript
const { data } = await supabase
  .from('favorites')
  .upsert({
    user_id: auth.uid(),
    provider_id
  }, {
    onConflict: 'user_id,provider_id'
  })
  .select()
  .single()
```

---

### Get User's Favorites

```typescript
const { data } = await supabase
  .from('favorites')
  .select(`
    provider:providers(*)
  `)
  .eq('user_id', auth.uid())
  .order('created_at', { ascending: false })
```

---

### Remove Favorite

```typescript
const { error } = await supabase
  .from('favorites')
  .delete()
  .eq('user_id', auth.uid())
  .eq('provider_id', providerId)
```

---

## 🔄 State Management

### Client-Side Store (React)

**Bookings Store** (Observable Pattern):
```typescript
class BookingsStore {
  private bookings: Booking[] = []
  private listeners = new Set<() => void>()

  subscribe(listener: () => void) {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  private notify() {
    this.listeners.forEach(fn => fn())
  }

  async create(booking: CreateBookingRequest) {
    const { data } = await supabase
      .from('bookings')
      .insert(booking)
      .select()
      .single()
    
    this.bookings.push(data)
    this.notify()
    return data
  }

  async updateStatus(id: string, status: BookingStatus) {
    const { data } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', id)
      .select()
      .single()

    const index = this.bookings.findIndex(b => b.id === id)
    if (index !== -1) {
      this.bookings[index] = data
    }
    this.notify()
    return data
  }
}

export const bookingsStore = new BookingsStore()
```

**React Hook Usage**:
```typescript
function useBookings(providerId: string) {
  const [bookings, setBookings] = useState<Booking[]>([])

  useEffect(() => {
    const loadBookings = async () => {
      const data = await bookingsStore.getByProviderId(providerId)
      setBookings(data)
    }

    loadBookings()
    
    const unsubscribe = bookingsStore.subscribe(loadBookings)
    return unsubscribe
  }, [providerId])

  return bookings
}
```

---

## 🎯 Best Practices

### ✅ DO

- **Use transactions** for multi-step operations
- **Validate inputs** on both client and server
- **Handle errors gracefully** with user-friendly messages
- **Log operations** for debugging and auditing
- **Use RLS policies** for security
- **Optimize queries** with proper indexes

### ❌ DON'T

- **Expose raw errors** to users
- **Skip validation** assuming client-side checks
- **Delete data permanently** (use soft deletes)
- **Bypass RLS** with service role key
- **N+1 query** nested data (use joins)
- **Store sensitive data** unencrypted

---

**Last Updated**: 2026-01-19  
**Version**: 2.1
