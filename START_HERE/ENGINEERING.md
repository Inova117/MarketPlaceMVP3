# 🔧 ENGINEERING GUIDE - MVP #3: Marketplace Local

## Cross-Reference

| Feature (PRODUCT.md) | Implementation |
|---------------------|----------------|
| Feature #1: Búsqueda Geo | § 6.2 |
| Feature #2: Perfiles | § 6.3 |
| Feature #3: Reviews | § 6.4 |
| Feature #4: Filtros | § 6.5 |
| Feature #5: Favoritos | § 6.6 |

## Setup

**Dependencies**:
```bash
npm install mapbox-gl @mapbox/mapbox-gl-geocoder
npm install react-map-gl
```

**Environment Variables**:
```env
NEXT_PUBLIC_MAPBOX_TOKEN=pk.your_token_here
```

## 6.2 Geolocation Search

**`components/map-view.tsx`**:
```typescript
'use client'

import Map, { Marker, Popup } from 'react-map-gl'
import { useState } from 'react'

export function MapView({ providers, userLocation }) {
  const [selectedProvider, setSelectedProvider] = useState(null)
  
  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      initialView State={{
        longitude: userLocation.lng,
        latitude: userLocation.lat,
        zoom: 12
      }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
    >
      {providers.map(provider => (
        <Marker
          key={provider.id}
          longitude={provider.longitude}
          latitude={provider.latitude}
          onClick={() => setSelectedProvider(provider)}
        />
      ))}
      
      {selectedProvider && (
        <Popup
          longitude={selectedProvider.longitude}
          latitude={selectedProvider.latitude}
          onClose={() => setSelectedProvider(null)}
        >
          <ProviderPopup provider={selectedProvider} />
        </Popup>
      )}
    </Map>
  )
}
```

**Geolocation API**:
```typescript
async function searchProviders(lat: number, lng: number, radius: number) {
  const { data } = await supabase
    .rpc('providers_within_radius', {
      user_lat: lat,
      user_lng: lng,
      radius_meters: radius
    })
  
  return data
}
```

**Database Function**:
```sql
CREATE OR REPLACE FUNCTION providers_within_radius(
  user_lat DECIMAL,
  user_lng DECIMAL,
  radius_meters INTEGER
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  distance_meters FLOAT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.name,
    earth_distance(
      ll_to_earth(p.latitude, p.longitude),
      ll_to_earth(user_lat, user_lng)
    ) AS distance_meters
  FROM providers p
  WHERE earth_box(ll_to_earth(user_lat, user_lng), radius_meters) @> 
        ll_to_earth(p.latitude, p.longitude)
  ORDER BY distance_meters
  LIMIT 50;
END;
$$ LANGUAGE plpgsql;
```

## 6.3 Provider Profiles

Similar to booking platform profile pages.

## 6.4 Reviews System

**Trigger for avg_rating update** - see API_SPEC.md.

**Last Updated**: 2026-01-13
