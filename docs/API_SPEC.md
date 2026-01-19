# API Specification - MVP #3: Marketplace Local

## Endpoints

### GET /api/providers/search
Search providers by location and filters.

**Query Params**:
- `lat`: User latitude
- `lng`: User longitude
- `radius`: Radius in meters (default: 5000)
- `category`: Filter by category
- `rating_min`: Min rating (1-5)
- `price_range`: $ or $$ or $$$ or $$$$

**Response 200**:
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Juan's Plumbing",
      "category": "Plomería",
      "latitude": -33.4489,
      "longitude": -70.6693,
      "distance_meters": 1250,
      "avg_rating": 4.7,
      "review_count": 24,
      "price_range": "$$"
    }
  ]
}
```

---

### GET /api/providers/[id]
Get provider detail.

**Response 200**:
```json
{
  "data": {
    "id": "uuid",
    "name": "Juan's Plumbing",
    "description": "...",
    "phone": "+56912345678",
    "whatsapp": "+56912345678",
    "email": "juan@example.com",
    "hours": {
      "monday": "8:00-18:00",
      "tuesday": "8:00-18:00"
    },
    "photos": [
      {"url": "https://...", "order_index": 0}
    ],
    "reviews": [
      {
        "rating": 5,
        "comment": "Excelente servicio",
        "user_name": "María L.",
        "created_at": "2024-01-15"
      }
    ]
  }
}
```

---

### POST /api/reviews
Create review.

**Request**:
```json
{
  "provider_id": "uuid",
  "rating": 5,
  "comment": "Excelente trabajo",
  "photo_url": "https://..."
}
```

**Triggers avg_rating recalculation**:
```sql
CREATE OR REPLACE FUNCTION update_provider_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE providers
  SET 
    avg_rating = (SELECT AVG(rating) FROM reviews WHERE provider_id = NEW.provider_id),
    review_count = (SELECT COUNT(*) FROM reviews WHERE provider_id = NEW.provider_id)
  WHERE id = NEW.provider_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_rating_after_review
  AFTER INSERT ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_provider_rating();
```

**Last Updated**: 2026-01-13
