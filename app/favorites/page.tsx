'use client'

import { Heart } from 'lucide-react'
import Link from 'next/link'
import { providers } from '@/lib/mock-data/providers'
import { useFavorites } from '@/hooks/use-favorites'
import { ProviderCard } from '@/components/features/provider-card'
import { Button } from '@/components/ui/button'

export default function FavoritesPage() {
    const { favorites, isLoaded, toggleFavorite } = useFavorites()

    const favoriteProviders = providers.filter((p) => favorites.has(p.id))

    if (!isLoaded) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <p className="text-slate-600">Cargando favoritos...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="border-b border-slate-200 bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="font-display text-3xl font-bold text-slate-900">
                                Mis Favoritos
                            </h1>
                            <p className="mt-1 text-sm text-slate-600">
                                {favoriteProviders.length}{' '}
                                {favoriteProviders.length === 1 ? 'proveedor guardado' : 'proveedores guardados'}
                            </p>
                        </div>
                        <Link href="/">
                            <Button variant="outline">Volver a búsqueda</Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {favoriteProviders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="mb-4 rounded-full bg-slate-100 p-6">
                            <Heart className="h-12 w-12 text-slate-400" />
                        </div>
                        <h2 className="mb-2 font-display text-2xl font-bold text-slate-900">
                            No tienes favoritos aún
                        </h2>
                        <p className="mb-6 max-w-md text-slate-600">
                            Empieza a guardar tus proveedores favoritos haciendo clic en el ícono de
                            corazón en las tarjetas de proveedores.
                        </p>
                        <Link href="/">
                            <Button>Explorar proveedores</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {favoriteProviders.map((provider) => (
                            <ProviderCard
                                key={provider.id}
                                provider={provider}
                                onFavoriteToggle={toggleFavorite}
                                isFavorite={true}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}
