'use client'

import { Heart, Compass } from 'lucide-react'
import Link from 'next/link'
import { providers } from '@/lib/mock-data/providers'
import { useFavorites } from '@/hooks/use-favorites'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { ProviderList } from '@/components/features/provider-list'
import { Button } from '@/components/ui/button'

export default function FavoritesPage() {
    const { favorites, isLoaded, toggleFavorite } = useFavorites()
    const favoriteProviders = providers.filter((p) => favorites.has(p.id))

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Navbar />

            <main className="container flex-1 py-10">
                <div className="mb-8">
                    <span className="eyebrow mb-2">
                        <Heart className="h-3.5 w-3.5" />
                        Tu colección
                    </span>
                    <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground">
                        Mis favoritos
                    </h1>
                    <p className="mt-1.5 text-muted-foreground">
                        {isLoaded
                            ? `${favoriteProviders.length} ${
                                  favoriteProviders.length === 1
                                      ? 'proveedor guardado'
                                      : 'proveedores guardados'
                              }`
                            : 'Cargando…'}
                    </p>
                </div>

                {!isLoaded ? (
                    <ProviderList providers={[]} loading />
                ) : favoriteProviders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-surface py-20 text-center">
                        <div className="grid h-20 w-20 place-items-center rounded-3xl bg-brand-gradient-soft dark:bg-primary-950/40">
                            <Heart className="h-10 w-10 text-primary-500" />
                        </div>
                        <h2 className="mt-5 font-display text-2xl font-bold text-foreground">
                            Aún no tienes favoritos
                        </h2>
                        <p className="mt-2 max-w-md text-muted-foreground">
                            Pulsa el corazón en cualquier proveedor para guardarlo aquí y
                            acceder rápidamente cuando lo necesites.
                        </p>
                        <Link href="/" className="mt-6">
                            <Button size="lg">
                                <Compass className="h-[18px] w-[18px]" />
                                Explorar proveedores
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <ProviderList
                        providers={favoriteProviders}
                        onFavoriteToggle={toggleFavorite}
                        favorites={favorites}
                    />
                )}
            </main>

            <Footer />
        </div>
    )
}
