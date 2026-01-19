'use client'

import { Star, MapPin, Heart } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { formatDistance } from '@/lib/geo-utils'
import type { Provider } from '@/lib/types'
import Link from 'next/link'

interface ProviderCardProps {
    provider: Provider & { distance?: number }
    onFavoriteToggle?: ((providerId: string) => void) | undefined
    isFavorite?: boolean
}

export function ProviderCard({
    provider,
    onFavoriteToggle,
    isFavorite = false,
}: ProviderCardProps) {
    const photoUrl = provider.photos[0] || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab'

    return (
        <Card className="overflow-hidden transition-shadow hover:shadow-md">
            <Link href={`/providers/${provider.id}`}>
                <div className="relative h-48 w-full overflow-hidden bg-slate-200">
                    <img
                        src={photoUrl}
                        alt={provider.name}
                        className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                    {onFavoriteToggle && (
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                onFavoriteToggle(provider.id)
                            }}
                            className="absolute right-3 top-3 rounded-full bg-white p-2 shadow-md transition-colors hover:bg-slate-50"
                            aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                        >
                            <Heart
                                className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-slate-600'
                                    }`}
                            />
                        </button>
                    )}
                </div>
            </Link>
            <CardContent className="p-4">
                <div className="mb-2 flex items-start justify-between">
                    <div className="flex-1">
                        <Link href={`/providers/${provider.id}`}>
                            <h3 className="font-display text-lg font-bold text-slate-900 hover:text-primary-600">
                                {provider.name}
                            </h3>
                        </Link>
                        <p className="text-sm text-slate-600">{provider.category}</p>
                    </div>
                    <span className="ml-2 shrink-0 text-sm font-medium text-slate-700">
                        {provider.priceRange}
                    </span>
                </div>

                <div className="mb-3 flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-slate-900">{provider.avgRating}</span>
                    <span className="text-sm text-slate-500">
                        ({provider.reviewCount} reviews)
                    </span>
                </div>

                {provider.distance !== undefined && (
                    <div className="flex items-center gap-1 text-sm text-slate-600">
                        <MapPin className="h-4 w-4" />
                        <span>{formatDistance(provider.distance)}</span>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
