import type { Provider } from '@/lib/types'

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param lat1 Latitude of first point
 * @param lon1 Longitude of first point
 * @param lat2 Latitude of second point
 * @param lon2 Longitude of second point
 * @returns Distance in meters
 */
export function calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): number {
    const R = 6371e3 // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180
    const φ2 = (lat2 * Math.PI) / 180
    const Δφ = ((lat2 - lat1) * Math.PI) / 180
    const Δλ = ((lon2 - lon1) * Math.PI) / 180

    const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return R * c // Distance in meters
}

/**
 * Filter providers within a given radius
 * @param providers Array of providers
 * @param userLat User's latitude
 * @param userLng User's longitude
 * @param radiusMeters Radius in meters
 * @returns Filtered providers with distance property
 */
export function filterByRadius(
    providers: Provider[],
    userLat: number,
    userLng: number,
    radiusMeters: number
): (Provider & { distance: number })[] {
    return providers
        .map((provider) => ({
            ...provider,
            distance: calculateDistance(
                userLat,
                userLng,
                provider.latitude,
                provider.longitude
            ),
        }))
        .filter((provider) => provider.distance <= radiusMeters)
}

/**
 * Sort providers by distance from user location
 * @param providers Array of providers
 * @param userLat User's latitude
 * @param userLng User's longitude
 * @returns Sorted providers with distance property
 */
export function sortByDistance(
    providers: Provider[],
    userLat: number,
    userLng: number
): (Provider & { distance: number })[] {
    return providers
        .map((provider) => ({
            ...provider,
            distance: calculateDistance(
                userLat,
                userLng,
                provider.latitude,
                provider.longitude
            ),
        }))
        .sort((a, b) => a.distance - b.distance)
}

/**
 * Format distance for display
 * @param meters Distance in meters
 * @returns Formatted string (e.g., "1.2 km" or "850 m")
 */
export function formatDistance(meters: number): string {
    if (meters < 1000) {
        return `${Math.round(meters)} m`
    }
    return `${(meters / 1000).toFixed(1)} km`
}
