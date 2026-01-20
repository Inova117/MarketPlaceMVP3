// Core types for MVP #3: Marketplace Local

export interface Provider {
    id: string
    name: string
    category: string
    description: string
    latitude: number
    longitude: number
    address: string
    phone?: string
    email?: string
    whatsapp?: string
    priceRange: '$' | '$$' | '$$$' | '$$$$'
    hours?: {
        [key: string]: { open: string; close: string } | null
    }
    avgRating: number
    reviewCount: number
    photos: string[]
    createdAt: string
}

export interface Review {
    id: string
    providerId: string
    userId: string
    userName: string
    rating: number
    comment: string
    photoUrl?: string | undefined
    createdAt: string
}

export interface Favorite {
    id: string
    userId: string
    providerId: string
}

export interface User {
    id: string
    name: string
    email: string
    avatar?: string
}

export interface Service {
    id: string
    providerId: string
    name: string
    description: string
    price: number
    duration: number // in minutes
    isActive: boolean
    createdAt: string
}

export interface Booking {
    id: string
    providerId: string
    userId: string
    serviceId: string
    date: string // ISO date
    time: string // "14:00"
    status: 'pending' | 'confirmed' | 'rejected' | 'completed' | 'cancelled'
    totalPrice: number
    notes?: string
    createdAt: string
}
