import type { Review } from '@/lib/types'

// Mock reviews for providers
export const reviews: Review[] = [
    {
        id: 'r1',
        providerId: '1',
        userId: 'u1',
        userName: 'María García',
        rating: 5,
        comment: 'Excelente café y atención. El desayuno es delicioso.',
        createdAt: '2024-03-10T11:30:00Z',
    },
    {
        id: 'r2',
        providerId: '1',
        userId: 'u2',
        userName: 'Juan Pérez',
        rating: 4,
        comment: 'Buen lugar, aunque a veces hay mucha gente.',
        createdAt: '2024-03-08T09:15:00Z',
    },
    {
        id: 'r3',
        providerId: '2',
        userId: 'u3',
        userName: 'Ana Martínez',
        rating: 5,
        comment: 'La mejor peluquería de la zona. Muy profesionales.',
        createdAt: '2024-03-12T16:45:00Z',
    },
    {
        id: 'r4',
        providerId: '3',
        userId: 'u1',
        userName: 'María García',
        rating: 4,
        comment: 'Buen servicio y precios justos.',
        createdAt: '2024-03-05T14:20:00Z',
    },
]
