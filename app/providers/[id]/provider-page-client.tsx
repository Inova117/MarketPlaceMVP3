'use client'

import { useState } from 'react'
import { Heart, Share2, MapPin, BadgeCheck, PenLine, Star } from 'lucide-react'
import { reviewsStore } from '@/lib/mock-data/reviews-store'
import { services as mockServices } from '@/lib/mock-data/services'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Rating } from '@/components/ui/rating'
import { useToast } from '@/components/ui/toast'
import { useFavorites } from '@/hooks/use-favorites'
import { ProviderGallery } from '@/components/features/provider-gallery'
import {
    AboutSection,
    OpeningHours,
    LocationCard,
} from '@/components/features/provider-info'
import { ContactButtons } from '@/components/features/contact-buttons'
import { ReviewList } from '@/components/features/review-list'
import { ReviewForm, type ReviewFormData } from '@/components/features/review-form'
import { ServiceList } from '@/components/features/service-list'
import { cn, priceRangeLabel } from '@/lib/utils'
import type { Provider, Review } from '@/lib/types'

interface ProviderPageClientProps {
    provider: Provider
    initialReviews: Review[]
}

export function ProviderPageClient({
    provider,
    initialReviews,
}: ProviderPageClientProps) {
    const { toast } = useToast()
    const { favorites, toggleFavorite } = useFavorites()
    const [showReviewForm, setShowReviewForm] = useState(false)
    const [reviews, setReviews] = useState(initialReviews)

    const isFavorite = favorites.has(provider.id)
    const providerServices = mockServices.filter(
        (s) => s.providerId === provider.id && s.isActive
    )

    const avgRating =
        reviews.length > 0
            ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
            : provider.avgRating

    const handleSubmitReview = (data: ReviewFormData) => {
        reviewsStore.addReview({
            providerId: data.providerId,
            userId: 'current-user',
            userName: 'Usuario Actual',
            rating: data.rating,
            comment: data.comment,
            photoUrl: data.photoUrl || undefined,
        })
        setReviews(reviewsStore.getByProviderId(provider.id))
        setShowReviewForm(false)
        toast({
            variant: 'success',
            title: '¡Reseña publicada!',
            description: 'Gracias por compartir tu experiencia.',
        })
    }

    const handleShare = async () => {
        const url = typeof window !== 'undefined' ? window.location.href : ''
        try {
            if (navigator.share) {
                await navigator.share({ title: provider.name, url })
            } else {
                await navigator.clipboard.writeText(url)
                toast({ variant: 'success', title: 'Enlace copiado al portapapeles' })
            }
        } catch {
            /* user cancelled share */
        }
    }

    return (
        <main className="container py-8">
            {/* Gallery */}
            <ProviderGallery photos={provider.photos} providerName={provider.name} />

            {/* Header */}
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="primary">{provider.category}</Badge>
                        <Badge variant="success">
                            <BadgeCheck className="h-3.5 w-3.5" />
                            Verificado
                        </Badge>
                    </div>
                    <h1 className="mt-2.5 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                        {provider.name}
                    </h1>
                    <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm">
                        <span className="flex items-center gap-1.5">
                            <Rating value={avgRating} size="sm" />
                            <span className="font-bold text-foreground">
                                {avgRating.toFixed(1)}
                            </span>
                            <span className="text-muted-foreground">
                                ({reviews.length} reseñas)
                            </span>
                        </span>
                        <span className="flex items-center gap-1.5 text-muted-foreground">
                            <MapPin className="h-4 w-4 text-primary-500" />
                            {provider.address}
                        </span>
                    </div>
                </div>

                <div className="flex shrink-0 gap-2.5">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handleShare}
                        aria-label="Compartir"
                    >
                        <Share2 className="h-[18px] w-[18px]" />
                    </Button>
                    <Button
                        variant={isFavorite ? 'default' : 'outline'}
                        onClick={() => toggleFavorite(provider.id)}
                    >
                        <Heart
                            className={cn(
                                'h-[18px] w-[18px]',
                                isFavorite && 'fill-current'
                            )}
                        />
                        {isFavorite ? 'Guardado' : 'Guardar'}
                    </Button>
                </div>
            </div>

            {/* Two columns */}
            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
                {/* Main */}
                <div className="order-2 space-y-10 lg:order-1">
                    <AboutSection provider={provider} />

                    {providerServices.length > 0 && (
                        <section>
                            <h2 className="mb-4 font-display text-xl font-bold text-foreground">
                                Servicios y reservas
                            </h2>
                            <ServiceList services={providerServices} providerId={provider.id} />
                        </section>
                    )}

                    <section>
                        <div className="mb-5 flex items-center justify-between gap-3">
                            <h2 className="font-display text-xl font-bold text-foreground">
                                Reseñas
                            </h2>
                            <Button variant="outline" onClick={() => setShowReviewForm(true)}>
                                <PenLine className="h-4 w-4" />
                                Escribir reseña
                            </Button>
                        </div>
                        <ReviewList
                            reviews={reviews}
                            avgRating={avgRating}
                            reviewCount={reviews.length}
                        />
                    </section>
                </div>

                {/* Sticky sidebar */}
                <aside className="order-1 space-y-4 lg:order-2 lg:sticky lg:top-20 lg:h-fit">
                    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
                        <div className="mb-4 flex items-end justify-between">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Desde
                                </p>
                                <p className="font-display text-2xl font-extrabold text-foreground">
                                    {provider.priceRange}
                                    <span className="ml-1.5 text-sm font-medium text-muted-foreground">
                                        {priceRangeLabel(provider.priceRange)}
                                    </span>
                                </p>
                            </div>
                            <div className="flex items-center gap-1 rounded-full bg-accent-50 px-2.5 py-1 dark:bg-accent-900/30">
                                <Star className="h-3.5 w-3.5 fill-accent-500 text-accent-500" />
                                <span className="text-sm font-bold text-accent-700 dark:text-accent-300">
                                    {avgRating.toFixed(1)}
                                </span>
                            </div>
                        </div>
                        <ContactButtons
                            phone={provider.phone}
                            whatsapp={provider.whatsapp}
                            email={provider.email}
                            providerName={provider.name}
                        />
                    </div>

                    <OpeningHours provider={provider} />
                    <LocationCard provider={provider} />
                </aside>
            </div>

            {showReviewForm && (
                <ReviewForm
                    providerId={provider.id}
                    providerName={provider.name}
                    onSubmit={handleSubmitReview}
                    onCancel={() => setShowReviewForm(false)}
                />
            )}
        </main>
    )
}
