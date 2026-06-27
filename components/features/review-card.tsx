'use client'

import { Rating } from '@/components/ui/rating'
import { Avatar } from '@/components/ui/avatar'
import { timeAgo } from '@/lib/utils'
import type { Review } from '@/lib/types'

interface ReviewCardProps {
    review: Review
}

export function ReviewCard({ review }: ReviewCardProps) {
    return (
        <article className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-start gap-3">
                <Avatar name={review.userName} size="md" />
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                        <p className="font-semibold text-foreground">{review.userName}</p>
                        <time className="text-xs text-muted-foreground">
                            {timeAgo(review.createdAt)}
                        </time>
                    </div>
                    <Rating value={review.rating} size="sm" className="mt-1" />
                    <p className="mt-2.5 leading-relaxed text-muted-foreground">
                        {review.comment}
                    </p>
                    {review.photoUrl && (
                        <div className="mt-3 overflow-hidden rounded-xl">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={review.photoUrl}
                                alt="Foto de la reseña"
                                className="h-48 w-full object-cover"
                            />
                        </div>
                    )}
                </div>
            </div>
        </article>
    )
}
