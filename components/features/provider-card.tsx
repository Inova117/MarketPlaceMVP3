'use client'

import { MapPin, Heart, BadgeCheck, Clock } from 'lucide-react'
import Link from 'next/link'
import { Rating } from '@/components/ui/rating'
import { Badge } from '@/components/ui/badge'
import { formatDistance, isOpenNow } from '@/lib/geo-utils'
import { cn, optimizeImage } from '@/lib/utils'
import type { Provider } from '@/lib/types'

interface ProviderCardProps {
    provider: Provider & { distance?: number }
    onFavoriteToggle?: ((providerId: string) => void) | undefined
    isFavorite?: boolean
    highlighted?: boolean
    onHover?: ((id: string | null) => void) | undefined
}

const FALLBACK_PHOTO =
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'

export function ProviderCard({
    provider,
    onFavoriteToggle,
    isFavorite = false,
    highlighted = false,
    onHover,
}: ProviderCardProps) {
    const photoUrl = provider.photos[0] || FALLBACK_PHOTO
    const open = isOpenNow(provider.hours)
    const isTopRated = provider.avgRating >= 4.7

    return (
        <article
            onMouseEnter={() => onHover?.(provider.id)}
            onMouseLeave={() => onHover?.(null)}
            className={cn(
                'group relative flex flex-col overflow-hidden rounded-2xl border bg-card shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lifted',
                highlighted ? 'border-primary-400 ring-2 ring-primary-500/30' : 'border-border'
            )}
        >
            <Link href={`/providers/${provider.id}`} className="relative block">
                <div className="relative h-44 w-full overflow-hidden bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={optimizeImage(photoUrl, 800)}
                        alt={provider.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

                    {/* Top-left badges */}
                    <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                        <span className="rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-semibold text-slate-800 shadow-sm backdrop-blur">
                            {provider.category}
                        </span>
                        {isTopRated && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-primary-600/95 px-2.5 py-0.5 text-xs font-semibold text-white shadow-sm backdrop-blur">
                                <BadgeCheck className="h-3 w-3" /> Top
                            </span>
                        )}
                    </div>

                    {/* Price pill */}
                    <span className="absolute bottom-3 left-3 rounded-full bg-black/55 px-2.5 py-0.5 text-xs font-bold text-white backdrop-blur">
                        {provider.priceRange}
                    </span>
                </div>
            </Link>

            {onFavoriteToggle && (
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        onFavoriteToggle(provider.id)
                    }}
                    className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 shadow-md backdrop-blur transition-all hover:scale-110 hover:bg-white"
                    aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                >
                    <Heart
                        className={cn(
                            'h-[18px] w-[18px] transition-colors',
                            isFavorite ? 'fill-rose-500 text-rose-500' : 'text-slate-600'
                        )}
                    />
                </button>
            )}

            <div className="flex flex-1 flex-col p-4">
                <div className="flex items-start justify-between gap-2">
                    <Link href={`/providers/${provider.id}`} className="min-w-0">
                        <h3 className="truncate font-display text-base font-bold text-foreground transition-colors group-hover:text-primary-600">
                            {provider.name}
                        </h3>
                    </Link>
                    <Badge variant={open ? 'success' : 'default'} className="shrink-0">
                        <Clock className="h-3 w-3" />
                        {open ? 'Abierto' : 'Cerrado'}
                    </Badge>
                </div>

                <div className="mt-1.5 flex items-center gap-1.5">
                    <Rating value={provider.avgRating} size="sm" />
                    <span className="text-sm font-semibold text-foreground">
                        {provider.avgRating.toFixed(1)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                        ({provider.reviewCount})
                    </span>
                </div>

                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                    {provider.description}
                </p>

                <div className="mt-3 flex items-center gap-1.5 border-t border-border pt-3 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 shrink-0 text-primary-500" />
                    <span className="truncate">{provider.address}</span>
                    {provider.distance !== undefined && (
                        <span className="ml-auto shrink-0 font-semibold text-foreground">
                            {formatDistance(provider.distance)}
                        </span>
                    )}
                </div>
            </div>
        </article>
    )
}
