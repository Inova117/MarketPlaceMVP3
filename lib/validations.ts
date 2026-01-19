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
    providerId: z.string().uuid(),
    rating: z.number().min(1).max(5),
    comment: z.string().min(10).max(500),
    photoUrl: z.string().url().optional(),
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
