'use client'

import { useMemo } from 'react'
import { providers as mockProviders } from '@/lib/mock-data/providers'
import { calculateDistance, isOpenNow } from '@/lib/geo-utils'
import type { Provider } from '@/lib/types'

interface UseProvidersOptions {
    userLat?: number | null
    userLng?: number | null
    radius?: number
    category?: string
    ratingMin?: number | undefined
    priceRange?: string
    openNow?: boolean
    query?: string
}

export function useProviders(options: UseProvidersOptions = {}) {
    const {
        userLat,
        userLng,
        radius = 5000,
        category,
        ratingMin,
        priceRange,
        openNow,
        query,
    } = options

    const filteredProviders = useMemo(() => {
        let result: (Provider & { distance?: number })[] = [...mockProviders]

        // Filter by category
        if (category) {
            result = result.filter((p) => p.category === category)
        }

        // Filter by minimum rating
        if (ratingMin) {
            result = result.filter((p) => p.avgRating >= ratingMin)
        }

        // Filter by price range
        if (priceRange) {
            result = result.filter((p) => p.priceRange === priceRange)
        }

        // Filter by open now
        if (openNow) {
            result = result.filter((p) => isOpenNow(p.hours))
        }

        // Filter by search query
        if (query) {
            const lowerQuery = query.toLowerCase()
            result = result.filter(
                (p) =>
                    p.name.toLowerCase().includes(lowerQuery) ||
                    p.category.toLowerCase().includes(lowerQuery) ||
                    p.description.toLowerCase().includes(lowerQuery)
            )
        }

        // Filter and sort by distance if location is available
        if (userLat !== null && userLat !== undefined && userLng !== null && userLng !== undefined) {
            // Calculate distance for each provider
            result = result.map((p) => ({
                ...p,
                distance: calculateDistance(userLat, userLng, p.latitude, p.longitude),
            }))

            // Filter by radius
            result = result.filter((p) => p.distance! <= radius)

            // Sort by distance
            result.sort((a, b) => (a.distance || 0) - (b.distance || 0))
        }

        return result
    }, [userLat, userLng, radius, category, ratingMin, priceRange, openNow, query])

    return {
        providers: filteredProviders,
        count: filteredProviders.length,
    }
}
