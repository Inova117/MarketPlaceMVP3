'use client'

import { SearchX } from 'lucide-react'
import { ProviderCard } from './provider-card'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import type { Provider } from '@/lib/types'

interface ProviderListProps {
    providers: (Provider & { distance?: number })[]
    onFavoriteToggle?: (providerId: string) => void
    favorites?: Set<string>
    loading?: boolean
    highlightedId?: string | null
    onHover?: (id: string | null) => void
    onClearFilters?: () => void
    columns?: 2 | 3
}

function CardSkeleton() {
    return (
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <Skeleton className="h-44 w-full rounded-none" />
            <div className="space-y-3 p-4">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
            </div>
        </div>
    )
}

export function ProviderList({
    providers,
    onFavoriteToggle,
    favorites = new Set(),
    loading = false,
    highlightedId,
    onHover,
    onClearFilters,
    columns = 3,
}: ProviderListProps) {
    const gridCols =
        columns === 2
            ? 'sm:grid-cols-2'
            : 'sm:grid-cols-2 lg:grid-cols-3'

    if (loading) {
        return (
            <div className={`grid gap-5 ${gridCols}`}>
                {Array.from({ length: 6 }).map((_, i) => (
                    <CardSkeleton key={i} />
                ))}
            </div>
        )
    }

    if (providers.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface py-16 text-center">
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-muted">
                    <SearchX className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-foreground">
                    No encontramos resultados
                </h3>
                <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
                    Prueba a ampliar el radio de búsqueda, cambiar de categoría o quitar
                    algunos filtros.
                </p>
                {onClearFilters && (
                    <Button variant="outline" className="mt-5" onClick={onClearFilters}>
                        Limpiar filtros
                    </Button>
                )}
            </div>
        )
    }

    return (
        <div className={`grid gap-5 ${gridCols}`}>
            {providers.map((provider, i) => (
                <div
                    key={provider.id}
                    className="animate-fade-up"
                    style={{ animationDelay: `${Math.min(i * 40, 320)}ms` }}
                >
                    <ProviderCard
                        provider={provider}
                        onFavoriteToggle={onFavoriteToggle}
                        isFavorite={favorites.has(provider.id)}
                        highlighted={highlightedId === provider.id}
                        onHover={onHover}
                    />
                </div>
            ))}
        </div>
    )
}
