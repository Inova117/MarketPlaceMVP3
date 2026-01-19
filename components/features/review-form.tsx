'use client'

import { useState } from 'react'
import { Star, X, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
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

        // Check rate limit
        const rateLimit = reviewRateLimiter.check()
        if (!rateLimit.allowed) {
            const minutes = Math.ceil(rateLimit.resetIn / 60000)
            setErrors({
                form: `Has enviado demasiadas reviews. Por favor espera ${minutes} minuto${minutes > 1 ? 's' : ''}.`,
            })
            return
        }

        // Validate with Zod
        const result = createReviewSchema.safeParse({
            providerId,
            rating,
            comment,
            photoUrl: photoUrl || undefined,
        })

        if (!result.success) {
            const fieldErrors: Record<string, string> = {}
            result.error.issues.forEach((err) => {
                if (err.path[0]) {
                    fieldErrors[err.path[0].toString()] = err.message
                }
            })
            setErrors(fieldErrors)
            return
        }

        setIsSubmitting(true)

        // Increment rate limit counter
        reviewRateLimiter.increment()

        onSubmit(result.data)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="font-display text-2xl font-bold text-slate-900">
                        Escribir Review
                    </h2>
                    <button
                        onClick={onCancel}
                        className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <p className="mb-6 text-slate-600">
                    Comparte tu experiencia con <strong>{providerName}</strong>
                </p>

                {errors.form && (
                    <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4">
                        <p className="text-sm text-red-800">{errors.form}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Star Rating */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Calificación *
                        </label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoveredRating(star)}
                                    onMouseLeave={() => setHoveredRating(0)}
                                    className="transition-transform hover:scale-110"
                                >
                                    <Star
                                        className={`h-10 w-10 ${star <= (hoveredRating || rating)
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'text-slate-300'
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                        {errors.rating && (
                            <p className="mt-1 text-sm text-red-600">{errors.rating}</p>
                        )}
                    </div>

                    {/* Comment */}
                    <div>
                        <label
                            htmlFor="comment"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Comentario *
                        </label>
                        <textarea
                            id="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={5}
                            maxLength={500}
                            placeholder="Cuéntanos sobre tu experiencia..."
                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
                        />
                        <div className="mt-1 flex items-center justify-between">
                            <div>
                                {errors.comment && (
                                    <p className="text-sm text-red-600">{errors.comment}</p>
                                )}
                            </div>
                            <p className="text-sm text-slate-500">
                                {comment.length}/500 caracteres
                            </p>
                        </div>
                    </div>

                    {/* Photo URL (optional) */}
                    <div>
                        <label
                            htmlFor="photoUrl"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            URL de foto (opcional)
                        </label>
                        <div className="flex gap-2">
                            <input
                                id="photoUrl"
                                type="url"
                                value={photoUrl}
                                onChange={(e) => setPhotoUrl(e.target.value)}
                                placeholder="https://ejemplo.com/foto.jpg"
                                className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
                            />
                            <Button type="button" variant="outline" size="icon">
                                <Upload className="h-5 w-5" />
                            </Button>
                        </div>
                        {errors.photoUrl && (
                            <p className="mt-1 text-sm text-red-600">{errors.photoUrl}</p>
                        )}
                        <p className="mt-1 text-xs text-slate-500">
                            Pega la URL de una imagen de tu experiencia
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={onCancel}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Enviando...' : 'Publicar Review'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
