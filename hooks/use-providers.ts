'use client'

import { useMemo } from 'react'
import { providers } from '@/lib/mock-data/providers'
import { filterByRadius, sortByDistance } from '@/lib/geo-utils'
import type { Provider } from '@/lib/types'

interface UseProvidersOptions {
    userLat?: number | null
    userLng?: number | null
    radius?: number // in meters
    category?: string
    ratingMin?: number | undefined
    priceRange?: string
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
        query,
    } = options

    const filteredProviders = useMemo(() => {
        let result: (Provider & { distance?: number })[] = [...providers]

        // Filter by geolocation if available
        if (userLat !== null && userLat !== undefined && userLng !== null && userLng !== undefined) {
            result = filterByRadius(result, userLat, userLng, radius)
        }

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

        // Sort by distance if location available
        if (userLat !== null && userLat !== undefined && userLng !== null && userLng !== undefined) {
            result = sortByDistance(result, userLat, userLng)
        }

        return result
    }, [userLat, userLng, radius, category, ratingMin, priceRange, query])

    return {
        providers: filteredProviders,
        count: filteredProviders.length,
    }
}
