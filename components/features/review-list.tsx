'use client'

import { MessageSquareText } from 'lucide-react'
import { ReviewCard } from './review-card'
import { Rating } from '@/components/ui/rating'
import type { Review } from '@/lib/types'

interface ReviewListProps {
    reviews: Review[]
    avgRating: number
    reviewCount: number
}

export function ReviewList({ reviews, avgRating, reviewCount }: ReviewListProps) {
    return (
        <div>
            {/* Summary */}
            <div className="mb-6 rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                    <div className="flex flex-col items-center justify-center rounded-2xl bg-brand-gradient-soft px-6 py-4 text-center dark:bg-primary-950/30">
                        <div className="font-display text-5xl font-extrabold text-foreground">
                            {avgRating.toFixed(1)}
                        </div>
                        <Rating value={avgRating} size="md" className="mt-1.5" />
                        <p className="mt-1.5 text-xs text-muted-foreground">
                            {reviewCount} {reviewCount === 1 ? 'reseña' : 'reseñas'}
                        </p>
                    </div>

                    <div className="flex-1 space-y-1.5">
                        {[5, 4, 3, 2, 1].map((rating) => {
                            const count = reviews.filter((r) => r.rating === rating).length
                            const percentage = reviewCount > 0 ? (count / reviewCount) * 100 : 0
                            return (
                                <div key={rating} className="flex items-center gap-3">
                                    <span className="w-10 shrink-0 text-sm font-medium text-muted-foreground">
                                        {rating} ★
                                    </span>
                                    <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
                                        <div
                                            className="h-full rounded-full bg-accent-400 transition-all"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                    <span className="w-8 shrink-0 text-right text-sm text-muted-foreground">
                                        {count}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* List */}
            {reviews.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface py-14 text-center">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-muted">
                        <MessageSquareText className="h-7 w-7 text-muted-foreground" />
                    </div>
                    <p className="mt-4 font-semibold text-foreground">
                        Aún no hay reseñas
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Sé el primero en compartir tu experiencia.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {reviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                    ))}
                </div>
            )}
        </div>
    )
}
