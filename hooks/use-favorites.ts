'use client'

import { useState, useEffect } from 'react'

const FAVORITES_KEY = 'marketplace-favorites'

export function useFavorites() {
    const [favorites, setFavorites] = useState<Set<string>>(new Set())
    const [isLoaded, setIsLoaded] = useState(false)

    // Load favorites from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(FAVORITES_KEY)
            if (stored) {
                const parsed = JSON.parse(stored) as string[]
                setFavorites(new Set(parsed))
            }
        } catch (error) {
            console.error('Error loading favorites:', error)
        } finally {
            setIsLoaded(true)
        }
    }, [])

    // Save favorites to localStorage whenever they change
    useEffect(() => {
        if (isLoaded) {
            try {
                localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(favorites)))
            } catch (error) {
                console.error('Error saving favorites:', error)
            }
        }
    }, [favorites, isLoaded])

    const addFavorite = (providerId: string) => {
        setFavorites((prev) => new Set([...prev, providerId]))
    }

    const removeFavorite = (providerId: string) => {
        setFavorites((prev) => {
            const next = new Set(prev)
            next.delete(providerId)
            return next
        })
    }

    const toggleFavorite = (providerId: string) => {
        if (favorites.has(providerId)) {
            removeFavorite(providerId)
        } else {
            addFavorite(providerId)
        }
    }

    const isFavorite = (providerId: string) => {
        return favorites.has(providerId)
    }

    return {
        favorites,
        isLoaded,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorite,
    }
}
