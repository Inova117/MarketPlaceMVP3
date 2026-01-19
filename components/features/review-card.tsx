'use client'

import { Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import type { Review } from '@/lib/types'

interface ReviewCardProps {
    review: Review
}

export function ReviewCard({ review }: ReviewCardProps) {
    const date = new Date(review.createdAt)
    const formattedDate = date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

    return (
        <Card>
            <CardContent className="p-6">
                <div className="mb-3 flex items-start justify-between">
                    <div>
                        <p className="font-semibold text-slate-900">{review.userName}</p>
                        <p className="text-sm text-slate-500">{formattedDate}</p>
                    </div>
                    <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                                key={i}
                                className={`h-4 w-4 ${i < review.rating
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-slate-300'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                <p className="text-slate-700">{review.comment}</p>

                {review.photoUrl && (
                    <div className="mt-4">
                        <img
                            src={review.photoUrl}
                            alt="Foto de la review"
                            className="h-48 w-full rounded-lg object-cover"
                        />
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
