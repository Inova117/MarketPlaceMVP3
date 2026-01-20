'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, LogIn, User, LogOut, LayoutDashboard } from 'lucide-react'
import { SearchBar } from '@/components/features/search-bar'
import { FilterSidebar } from '@/components/features/filter-sidebar'
import { ProviderList } from '@/components/features/provider-list'
import { Button } from '@/components/ui/button'
import { LoginModal } from '@/components/features/login-modal'
import { useGeolocation } from '@/hooks/use-geolocation'
import { useProviders } from '@/hooks/use-providers'
import { useFavorites } from '@/hooks/use-favorites'
import { useAuth } from '@/contexts/auth-context'
import { BackendFloatButton } from '@/components/backend-float-button'

export default function HomePage() {
    const [query, setQuery] = useState('')
    const [category, setCategory] = useState('')
    const [radius, setRadius] = useState(5000)
    const [ratingMin, setRatingMin] = useState<number | undefined>(undefined)
    const [priceRange, setPriceRange] = useState('')
    const [openNow, setOpenNow] = useState(false)
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showUserMenu, setShowUserMenu] = useState(false)

    const { latitude, longitude, loading, error, requestLocation } =
        useGeolocation()

    const { providers, count } = useProviders({
        userLat: latitude,
        userLng: longitude,
        radius,
        category,
        ratingMin,
        priceRange,
        openNow,
        query,
    })

    const { favorites, toggleFavorite } = useFavorites()
    const { user, isAuthenticated, logout, switchRole } = useAuth()

    const handleClearFilters = () => {
        setCategory('')
        setRadius(5000)
        setRatingMin(undefined)
        setPriceRange('')
        setOpenNow(false)
        setQuery('')
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="border-b border-slate-200 bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="font-display text-3xl font-bold text-slate-900">
                                Marketplace Local
                            </h1>
                            <p className="mt-1 text-sm text-slate-600">
                                Encuentra servicios cerca de ti
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link href="/favorites">
                                <Button variant="outline">
                                    <Heart className="mr-2 h-5 w-5" />
                                    Favoritos ({favorites.size})
                                </Button>
                            </Link>

                            {isAuthenticated && user ? (
                                <div className="relative">
                                    <Button
                                        variant="outline"
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                    >
                                        <User className="mr-2 h-5 w-5" />
                                        {user.name}
                                    </Button>

                                    {showUserMenu && (
                                        <div className="absolute right-0 top-full mt-2 w-64 rounded-lg border border-slate-200 bg-white shadow-lg">
                                            <div className="border-b border-slate-200 p-3">
                                                <p className="text-sm font-medium text-slate-900">
                                                    {user.name}
                                                </p>
                                                <p className="text-xs text-slate-600">{user.email}</p>
                                                <p className="mt-1 text-xs font-medium text-primary-600">
                                                    {user.role === 'provider' ? '🏪 Proveedor' : '👤 Usuario'}
                                                </p>
                                            </div>
                                            <div className="p-2">
                                                {user.role === 'provider' && (
                                                    <Link href="/dashboard/provider">
                                                        <button className="flex w-full items-center gap-2 rounded px-3 py-2 text-sm text-slate-700 hover:bg-slate-100">
                                                            <LayoutDashboard className="h-4 w-4" />
                                                            Mi Dashboard
                                                        </button>
                                                    </Link>
                                                )}
                                                <button
                                                    onClick={() => {
                                                        switchRole(user.role === 'user' ? 'provider' : 'user')
                                                        setShowUserMenu(false)
                                                    }}
                                                    className="flex w-full items-center gap-2 rounded px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
                                                >
                                                    <User className="h-4 w-4" />
                                                    Cambiar a {user.role === 'user' ? 'Proveedor' : 'Usuario'}
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        logout()
                                                        setShowUserMenu(false)
                                                    }}
                                                    className="flex w-full items-center gap-2 rounded px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                                                >
                                                    <LogOut className="h-4 w-4" />
                                                    Cerrar Sesión
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Button onClick={() => setShowLoginModal(true)}>
                                    <LogIn className="mr-2 h-5 w-5" />
                                    Iniciar Sesión
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Search Bar */}
                <div className="mb-8">
                    <SearchBar
                        query={query}
                        onQueryChange={setQuery}
                        onLocationRequest={requestLocation}
                        locationLoading={loading}
                    />
                    {error && (
                        <p className="mt-2 text-sm text-red-600">{error}</p>
                    )}
                    {latitude && longitude && (
                        <p className="mt-2 text-sm text-green-600">
                            ✓ Ubicación obtenida
                        </p>
                    )}
                </div>

                {/* Filters + Results */}
                <div className="grid gap-8 lg:grid-cols-4">
                    {/* Sidebar */}
                    <aside className="lg:col-span-1">
                        <FilterSidebar
                            category={category}
                            radius={radius}
                            ratingMin={ratingMin}
                            priceRange={priceRange}
                            openNow={openNow}
                            onCategoryChange={setCategory}
                            onRadiusChange={setRadius}
                            onRatingMinChange={setRatingMin}
                            onPriceRangeChange={setPriceRange}
                            onOpenNowChange={setOpenNow}
                            onClearFilters={handleClearFilters}
                        />
                    </aside>

                    {/* Results */}
                    <div className="lg:col-span-3">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-slate-900">
                                {count} {count === 1 ? 'resultado' : 'resultados'}
                            </h2>
                        </div>
                        <ProviderList
                            providers={providers}
                            onFavoriteToggle={toggleFavorite}
                            favorites={favorites}
                        />
                    </div>
                </div>
            </main>

            {/* Login Modal */}
            <LoginModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
            />

            {/* Backend Float Button */}
            <BackendFloatButton />
        </div>
    )
}
