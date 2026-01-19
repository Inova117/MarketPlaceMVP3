'use client'

import { Star } from 'lucide-react'
import { ReviewCard } from './review-card'
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
            <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="text-center">
                        <div className="text-5xl font-bold text-slate-900">{avgRating}</div>
                        <div className="mt-1 flex items-center justify-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    className={`h-5 w-5 ${i < Math.round(avgRating)
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'text-slate-300'
                                        }`}
                                />
                            ))}
                        </div>
                        <p className="mt-1 text-sm text-slate-600">
                            {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
                        </p>
                    </div>

                    <div className="flex-1 border-l border-slate-200 pl-6">
                        <h3 className="mb-2 font-semibold text-slate-900">
                            Calificaciones
                        </h3>
                        {[5, 4, 3, 2, 1].map((rating) => {
                            const count = reviews.filter((r) => r.rating === rating).length
                            const percentage = reviewCount > 0 ? (count / reviewCount) * 100 : 0
                            return (
                                <div key={rating} className="mb-1 flex items-center gap-2">
                                    <span className="w-8 text-sm text-slate-600">{rating}★</span>
                                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
                                        <div
                                            className="h-full bg-yellow-400"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                    <span className="w-8 text-right text-sm text-slate-600">
                                        {count}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Reviews List */}
            {reviews.length === 0 ? (
                <p className="text-center text-slate-600">
                    Aún no hay reviews para este proveedor
                </p>
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
