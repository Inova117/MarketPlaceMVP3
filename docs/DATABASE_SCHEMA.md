# Database Schema - MVP #3: Marketplace Local

## Tables

### 1. `providers`
- `id`: UUID PRIMARY KEY
- `user_id`: UUID REFERENCES auth.users
- `name`: TEXT NOT NULL
- `category`: TEXT NOT NULL
- `description`: TEXT
- `latitude`: DECIMAL(10, 8) NOT NULL
- `longitude`: DECIMAL(11, 8) NOT NULL
- `address`: TEXT
- `phone`: TEXT
- `email`: TEXT
- `whatsapp`: TEXT
- `price_range`: TEXT CHECK (IN '$', '$$', '$$$', '$$$$')
- `hours`: JSONB
- `avg_rating`: DECIMAL(3,2) DEFAULT 0
- `review_count`: INTEGER DEFAULT 0
- `created_at`: TIMESTAMP

**Indexes**:
- `idx_providers_location` on (latitude, longitude) USING GIST
- `idx_providers_category` on category

### 2. `provider_photos`
- `id`: UUID PRIMARY KEY
- `provider_id`: UUID REFERENCES providers(id) ON DELETE CASCADE
- `url`: TEXT NOT NULL
- `order_index`: INTEGER
- `created_at`: TIMESTAMP

### 3. `reviews`
- `id`: UUID PRIMARY KEY
- `provider_id`: UUID REFERENCES providers(id) ON DELETE CASCADE
- `user_id`: UUID REFERENCES profiles(id)
- `rating`: INTEGER CHECK (rating BETWEEN 1 AND 5)
- `comment`: TEXT
- `photo_url`: TEXT
- `created_at`: TIMESTAMP
- Unique (provider_id, user_id) -- one review per user

### 4. `favorites`
- `id`: UUID PRIMARY KEY
- `user_id`: UUID REFERENCES profiles(id)
- `provider_id`: UUID REFERENCES providers(id) ON DELETE CASCADE
- Unique (user_id, provider_id)

## Geospatial Queries

**Find providers within radius**:
```sql
SELECT *,
  earth_distance(
    ll_to_earth(latitude, longitude),
    ll_to_earth(user_lat, user_lng)
  ) AS distance_meters
FROM providers
WHERE earth_box(ll_to_earth(user_lat, user_lng), radius_meters) @> ll_to_earth(latitude, longitude)
ORDER BY distance_meters
LIMIT 50;
```

**Enable PostGIS**:
```sql
CREATE EXTENSION IF NOT EXISTS earthdistance CASCADE;
```

## RLS Policies

```sql
-- Public read
CREATE POLICY "Anyone can view providers"
  ON providers FOR SELECT
  USING (true);

-- Provider manages own
CREATE POLICY "Providers can manage own profile"
  ON providers FOR ALL
  USING (user_id = auth.uid());

-- Users can add reviews
CREATE POLICY "Users can add reviews"
  ON reviews FOR INSERT
  WITH CHECK (user_id = auth.uid());
```

**Last Updated**: 2026-01-13
