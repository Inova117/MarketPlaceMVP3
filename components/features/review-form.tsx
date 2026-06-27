'use client'

import { useState } from 'react'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { StarInput } from '@/components/ui/rating'
import { Modal, ModalHeader } from '@/components/ui/modal'
import { createReviewSchema } from '@/lib/validations'
import { reviewRateLimiter } from '@/lib/rate-limiter'

interface ReviewFormProps {
    providerId: string
    providerName: string
    onSubmit: (data: ReviewFormData) => void
    onCancel: () => void
}

export interface ReviewFormData {
    providerId: string
    rating: number
    comment: string
    photoUrl?: string | undefined
}

const RATING_LABELS = ['', 'Muy malo', 'Malo', 'Regular', 'Bueno', 'Excelente']

export function ReviewForm({
    providerId,
    providerName,
    onSubmit,
    onCancel,
}: ReviewFormProps) {
    const [rating, setRating] = useState(0)
    const [hoveredRating, setHoveredRating] = useState(0)
    const [comment, setComment] = useState('')
    const [photoUrl, setPhotoUrl] = useState('')
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setErrors({})

        const rateLimit = reviewRateLimiter.check()
        if (!rateLimit.allowed) {
            const minutes = Math.ceil(rateLimit.resetIn / 60000)
            setErrors({
                form: `Has enviado demasiadas reseñas. Espera ${minutes} minuto${minutes > 1 ? 's' : ''}.`,
            })
            return
        }

        const result = createReviewSchema.safeParse({
            providerId,
            rating,
            comment,
            photoUrl: photoUrl || undefined,
        })

        if (!result.success) {
            const fieldErrors: Record<string, string> = {}
            result.error.issues.forEach((err) => {
                if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message
            })
            setErrors(fieldErrors)
            return
        }

        setIsSubmitting(true)
        reviewRateLimiter.increment()
        onSubmit(result.data)
    }

    const displayRating = hoveredRating || rating

    return (
        <Modal isOpen onClose={onCancel} size="max-w-xl">
            <ModalHeader
                title="Escribir una reseña"
                description={`Comparte tu experiencia con ${providerName}`}
                onClose={onCancel}
            />

            <form onSubmit={handleSubmit} className="space-y-6 p-5 sm:p-6">
                {errors.form && (
                    <div className="flex items-start gap-2.5 rounded-xl border border-danger/30 bg-danger-subtle p-3.5 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                        {errors.form}
                    </div>
                )}

                {/* Rating */}
                <div>
                    <label className="mb-2.5 block text-sm font-semibold text-foreground">
                        Tu calificación
                    </label>
                    <div className="flex items-center gap-3">
                        <StarInput
                            value={rating}
                            hovered={hoveredRating}
                            onChange={setRating}
                            onHover={setHoveredRating}
                        />
                        {displayRating > 0 && (
                            <span className="text-sm font-medium text-muted-foreground">
                                {RATING_LABELS[displayRating]}
                            </span>
                        )}
                    </div>
                    {errors.rating && (
                        <p className="mt-1.5 text-sm text-danger">{errors.rating}</p>
                    )}
                </div>

                {/* Comment */}
                <div>
                    <label
                        htmlFor="comment"
                        className="mb-2 block text-sm font-semibold text-foreground"
                    >
                        Tu comentario
                    </label>
                    <Textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={5}
                        maxLength={500}
                        placeholder="Cuéntanos sobre tu experiencia: calidad, trato, puntualidad…"
                    />
                    <div className="mt-1.5 flex items-center justify-between">
                        <p className="text-sm text-danger">{errors.comment}</p>
                        <p className="text-xs text-muted-foreground">{comment.length}/500</p>
                    </div>
                </div>

                {/* Photo */}
                <div>
                    <label
                        htmlFor="photoUrl"
                        className="mb-2 block text-sm font-semibold text-foreground"
                    >
                        Foto <span className="font-normal text-muted-foreground">(opcional)</span>
                    </label>
                    <Input
                        id="photoUrl"
                        type="url"
                        value={photoUrl}
                        onChange={(e) => setPhotoUrl(e.target.value)}
                        placeholder="https://ejemplo.com/foto.jpg"
                    />
                    {errors.photoUrl && (
                        <p className="mt-1.5 text-sm text-danger">{errors.photoUrl}</p>
                    )}
                </div>

                <div className="flex justify-end gap-3 border-t border-border pt-5">
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Cancelar
                    </Button>
                    <Button type="submit" loading={isSubmitting}>
                        Publicar reseña
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
