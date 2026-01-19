import type { Review } from '@/lib/types'
import { reviews as initialReviews } from './reviews'

/**
 * In-memory store for reviews (simulates database)
 * This allows adding new reviews during runtime
 */
class ReviewsStore {
    private reviews: Review[]

    constructor(initialData: Review[]) {
        this.reviews = [...initialData]
    }

    /**
     * Get all reviews
     */
    getAll(): Review[] {
        return [...this.reviews]
    }

    /**
     * Get reviews for a specific provider
     */
    getByProviderId(providerId: string): Review[] {
        return this.reviews.filter((review) => review.providerId === providerId)
    }

    /**
     * Add a new review
     */
    addReview(review: Omit<Review, 'id' | 'createdAt'>): Review {
        const newReview: Review = {
            ...review,
            id: `r${this.reviews.length + 1}`,
            createdAt: new Date().toISOString(),
        }
        this.reviews.push(newReview)
        return newReview
    }

    /**
     * Calculate average rating for a provider
     */
    getAverageRating(providerId: string): number {
        const providerReviews = this.getByProviderId(providerId)
        if (providerReviews.length === 0) return 0

        const sum = providerReviews.reduce((acc, review) => acc + review.rating, 0)
        return Math.round((sum / providerReviews.length) * 10) / 10 // Round to 1 decimal
    }

    /**
     * Get review count for a provider
     */
    getReviewCount(providerId: string): number {
        return this.getByProviderId(providerId).length
    }
}

// Export singleton instance
export const reviewsStore = new ReviewsStore(initialReviews)
