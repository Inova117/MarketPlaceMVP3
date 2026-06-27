import { z } from 'zod'

// Search filters validation
export const searchFiltersSchema = z.object({
    query: z.string().optional(),
    category: z.string().optional(),
    radius: z.number().min(1000).max(20000).default(5000),
    ratingMin: z.number().min(1).max(5).optional(),
    priceRange: z.enum(['$', '$$', '$$$', '$$$$']).optional(),
})

export type SearchFilters = z.infer<typeof searchFiltersSchema>

// Review submission validation
export const createReviewSchema = z.object({
    providerId: z.string().min(1),
    rating: z.number().min(1, 'Selecciona una calificación').max(5),
    comment: z
        .string()
        .min(10, 'El comentario debe tener al menos 10 caracteres')
        .max(500, 'Máximo 500 caracteres'),
    photoUrl: z
        .string()
        .url('Introduce una URL de imagen válida')
        .optional()
        .or(z.literal('')),
})

export type CreateReviewInput = z.infer<typeof createReviewSchema>

// Contact form validation (if needed later)
export const contactFormSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/),
    message: z.string().min(10).max(1000),
})

export type ContactFormInput = z.infer<typeof contactFormSchema>
