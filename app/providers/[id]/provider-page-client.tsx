'use client'

import { useState } from 'react'
import { Star, MapPin, Plus } from 'lucide-react'
import { reviewsStore } from '@/lib/mock-data/reviews-store'
import { services as mockServices } from '@/lib/mock-data/services'
import { Button } from '@/components/ui/button'
import { ProviderGallery } from '@/components/features/provider-gallery'
import { ProviderInfo } from '@/components/features/provider-info'
import { ContactButtons } from '@/components/features/contact-buttons'
import { ReviewList } from '@/components/features/review-list'
import { ReviewForm, type ReviewFormData } from '@/components/features/review-form'
import { ServiceList } from '@/components/features/service-list'
import type { Provider, Review } from '@/lib/types'

interface ProviderPageClientProps {
    provider: Provider
    initialReviews: Review[]
}

export function ProviderPageClient({
    provider,
    initialReviews,
}: ProviderPageClientProps) {
    const [showReviewForm, setShowReviewForm] = useState(false)
    const [reviews, setReviews] = useState(initialReviews)

    const handleSubmitReview = (data: ReviewFormData) => {
        // Add review to store
        reviewsStore.addReview({
            providerId: data.providerId,
            userId: 'current-user', // In real app, get from auth
            userName: 'Usuario Actual', // In real app, get from auth
            rating: data.rating,
            comment: data.comment,
            photoUrl: data.photoUrl || undefined,
        })

        // Update local state
        setReviews(reviewsStore.getByProviderId(provider.id))
        setShowReviewForm(false)

        // Show success message (could use toast notification)
        alert('¡Review publicada exitosamente!')
    }

    return (
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Provider Header */}
            <div className="mb-8">
                <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <h1 className="font-display text-4xl font-bold text-slate-900">
                            {provider.name}
                        </h1>
                        <p className="mt-2 text-lg text-slate-600">{provider.category}</p>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center gap-2">
                            <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                            <span className="text-3xl font-bold text-slate-900">
                                {provider.avgRating}
                            </span>
                        </div>
                        <p className="mt-1 text-sm text-slate-600">
                            {provider.reviewCount} reviews
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="h-5 w-5" />
                    <span>{provider.address}</span>
                </div>
            </div>

            {/* Contact Buttons */}
            <div className="mb-8">
                <ContactButtons
                    phone={provider.phone}
                    whatsapp={provider.whatsapp}
                    email={provider.email}
                    providerName={provider.name}
                />
            </div>

            {/* Gallery */}
            <div className="mb-8">
                <ProviderGallery photos={provider.photos} providerName={provider.name} />
            </div>

            {/* Info */}
            <div className="mb-8">
                <ProviderInfo provider={provider} />
            </div>

            {/* Services */}
            {mockServices.filter((s) => s.providerId === provider.id).length > 0 && (
                <div className="mb-8">
                    <h2 className="mb-4 font-display text-2xl font-bold text-slate-900">
                        Servicios y Reservas
                    </h2>
                    <ServiceList
                        services={mockServices.filter((s) => s.providerId === provider.id && s.isActive)}
                        providerId={provider.id}
                    />
                </div>
            )}

            {/* Reviews */}
            <div>
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="font-display text-2xl font-bold text-slate-900">
                        Reviews
                    </h2>
                    <Button onClick={() => setShowReviewForm(true)}>
                        <Plus className="mr-2 h-5 w-5" />
                        Escribir Review
                    </Button>
                </div>
                <ReviewList
                    reviews={reviews}
                    avgRating={provider.avgRating}
                    reviewCount={reviews.length}
                />
            </div>

            {/* Review Form Modal */}
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
