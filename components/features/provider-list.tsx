'use client'

import { ProviderCard } from './provider-card'
import type { Provider } from '@/lib/types'

interface ProviderListProps {
    providers: (Provider & { distance?: number })[]
    onFavoriteToggle?: (providerId: string) => void
    favorites?: Set<string>
}

export function ProviderList({
    providers,
    onFavoriteToggle,
    favorites = new Set(),
}: ProviderListProps) {
    if (providers.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-lg font-medium text-slate-900">
                    No se encontraron proveedores
                </p>
                <p className="mt-2 text-sm text-slate-600">
                    Intenta ajustar los filtros o ampliar el radio de búsqueda
                </p>
            </div>
        )
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {providers.map((provider) => (
                <ProviderCard
                    key={provider.id}
                    provider={provider}
                    onFavoriteToggle={onFavoriteToggle}
                    isFavorite={favorites.has(provider.id)}
                />
            ))}
        </div>
    )
}
