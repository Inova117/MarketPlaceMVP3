'use client'

import { useState, useEffect, useMemo } from 'react'
import {
    Sparkles,
    Wrench,
    Zap,
    Scissors,
    Car,
    Trees,
    Hammer,
    Star,
    Users,
    LayoutGrid,
    Map as MapIcon,
    CheckCircle2,
} from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { SearchBar } from '@/components/features/search-bar'
import { FilterSidebar } from '@/components/features/filter-sidebar'
import { ProviderList } from '@/components/features/provider-list'
import { ProviderMap } from '@/components/features/provider-map'
import { Select } from '@/components/ui/select'
import { useGeolocation } from '@/hooks/use-geolocation'
import { useProviders } from '@/hooks/use-providers'
import { useFavorites } from '@/hooks/use-favorites'
import { providers as allProviders } from '@/lib/mock-data/providers'
import { categories } from '@/lib/mock-data/categories'
import { cn } from '@/lib/utils'

const QUICK_CATEGORIES = [
    { name: 'Plomería', icon: Wrench },
    { name: 'Electricidad', icon: Zap },
    { name: 'Belleza', icon: Scissors },
    { name: 'Limpieza', icon: Sparkles },
    { name: 'Automotriz', icon: Car },
    { name: 'Jardinería', icon: Trees },
    { name: 'Carpintería', icon: Hammer },
]

type SortKey = 'relevance' | 'rating' | 'reviews' | 'distance'
type ViewMode = 'list' | 'map'

export default function HomePage() {
    const [query, setQuery] = useState('')
    const [category, setCategory] = useState('')
    const [radius, setRadius] = useState(20000)
    const [ratingMin, setRatingMin] = useState<number | undefined>(undefined)
    const [priceRange, setPriceRange] = useState('')
    const [openNow, setOpenNow] = useState(false)
    const [sort, setSort] = useState<SortKey>('relevance')
    const [view, setView] = useState<ViewMode>('list')
    const [highlightedId, setHighlightedId] = useState<string | null>(null)
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    const { latitude, longitude, loading, error, requestLocation } = useGeolocation()

    const { providers } = useProviders({
        userLat: latitude,
        userLng: longitude,
        radius,
        category,
        ratingMin,
        priceRange,
        openNow,
        query,
    })

    const sortedProviders = useMemo(() => {
        const list = [...providers]
        switch (sort) {
            case 'rating':
                return list.sort((a, b) => b.avgRating - a.avgRating)
            case 'reviews':
                return list.sort((a, b) => b.reviewCount - a.reviewCount)
            case 'distance':
                return list.sort(
                    (a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity)
                )
            default:
                return list
        }
    }, [providers, sort])

    const { favorites, toggleFavorite } = useFavorites()

    const activeCount =
        (category ? 1 : 0) +
        (ratingMin ? 1 : 0) +
        (priceRange ? 1 : 0) +
        (openNow ? 1 : 0) +
        (radius !== 20000 ? 1 : 0)

    const handleClearFilters = () => {
        setCategory('')
        setRadius(20000)
        setRatingMin(undefined)
        setPriceRange('')
        setOpenNow(false)
        setQuery('')
    }

    const avgRating = useMemo(
        () =>
            (
                allProviders.reduce((s, p) => s + p.avgRating, 0) / allProviders.length
            ).toFixed(1),
        []
    )

    const scrollToResults = () => {
        document.getElementById('resultados')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Navbar />

            {/* ===== Hero ===== */}
            <section className="relative overflow-hidden border-b border-border bg-mesh">
                <div className="container relative py-14 sm:py-20">
                    <div className="mx-auto max-w-3xl text-center">
                        <span className="eyebrow mb-4 justify-center">
                            <Sparkles className="h-3.5 w-3.5" />
                            Marketplace local con geolocalización
                        </span>
                        <h1 className="text-balance font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                            Encuentra lo mejor{' '}
                            <span className="gradient-text">cerca de ti</span>
                        </h1>
                        <p className="mx-auto mt-5 max-w-xl text-balance text-base text-muted-foreground sm:text-lg">
                            Descubre profesionales y negocios verificados a tu alrededor.
                            Compara reseñas reales, precios y disponibilidad — y reserva en
                            segundos.
                        </p>

                        <div className="mx-auto mt-8 max-w-2xl">
                            <SearchBar
                                query={query}
                                onQueryChange={setQuery}
                                onLocationRequest={requestLocation}
                                locationLoading={loading}
                            />
                            {error && (
                                <p className="mt-2 text-sm text-danger">{error}</p>
                            )}
                            {latitude && longitude && (
                                <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                                    <CheckCircle2 className="h-4 w-4" />
                                    Ubicación detectada — ordenando por cercanía
                                </p>
                            )}
                        </div>

                        {/* Quick categories */}
                        <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
                            {QUICK_CATEGORIES.map(({ name, icon: Icon }) => {
                                const active = category === name
                                return (
                                    <button
                                        key={name}
                                        onClick={() => {
                                            setCategory(active ? '' : name)
                                            scrollToResults()
                                        }}
                                        className={cn(
                                            'inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium shadow-xs transition-all',
                                            active
                                                ? 'border-primary-600 bg-primary-600 text-white'
                                                : 'border-border bg-surface text-foreground hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-soft'
                                        )}
                                    >
                                        <Icon className="h-4 w-4" />
                                        {name}
                                    </button>
                                )
                            })}
                        </div>

                        {/* Stats */}
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
                            <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-primary-600" />
                                <span className="font-bold text-foreground">
                                    {allProviders.length}+
                                </span>
                                <span className="text-muted-foreground">profesionales</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Star className="h-4 w-4 fill-accent-400 text-accent-400" />
                                <span className="font-bold text-foreground">{avgRating}</span>
                                <span className="text-muted-foreground">valoración media</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <LayoutGrid className="h-4 w-4 text-primary-600" />
                                <span className="font-bold text-foreground">
                                    {categories.length}
                                </span>
                                <span className="text-muted-foreground">categorías</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== Results ===== */}
            <main id="resultados" className="container scroll-mt-20 py-10">
                <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
                    {/* Sidebar */}
                    <aside className="lg:sticky lg:top-20 lg:h-fit">
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
                            activeCount={activeCount}
                        />
                    </aside>

                    {/* Content */}
                    <div>
                        {/* Toolbar */}
                        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <h2 className="font-display text-xl font-bold text-foreground">
                                    {sortedProviders.length}{' '}
                                    {sortedProviders.length === 1 ? 'resultado' : 'resultados'}
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    {category || 'Todas las categorías'}
                                    {latitude && longitude ? ' · cerca de tu ubicación' : ''}
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <Select
                                    value={sort}
                                    onChange={(e) => setSort(e.target.value as SortKey)}
                                    className="h-10 w-auto min-w-[170px] rounded-xl text-sm"
                                >
                                    <option value="relevance">Más relevantes</option>
                                    <option value="rating">Mejor valorados</option>
                                    <option value="reviews">Más reseñas</option>
                                    {latitude && longitude && (
                                        <option value="distance">Más cercanos</option>
                                    )}
                                </Select>

                                <div className="flex rounded-xl border border-border bg-surface p-1">
                                    <button
                                        onClick={() => setView('list')}
                                        className={cn(
                                            'inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-sm font-medium transition-colors',
                                            view === 'list'
                                                ? 'bg-primary-600 text-white'
                                                : 'text-muted-foreground hover:text-foreground'
                                        )}
                                        aria-label="Vista de lista"
                                    >
                                        <LayoutGrid className="h-4 w-4" />
                                        <span className="hidden sm:inline">Lista</span>
                                    </button>
                                    <button
                                        onClick={() => setView('map')}
                                        className={cn(
                                            'inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-sm font-medium transition-colors',
                                            view === 'map'
                                                ? 'bg-primary-600 text-white'
                                                : 'text-muted-foreground hover:text-foreground'
                                        )}
                                        aria-label="Vista de mapa"
                                    >
                                        <MapIcon className="h-4 w-4" />
                                        <span className="hidden sm:inline">Mapa</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Map view */}
                        {view === 'map' && mounted && (
                            <div className="mb-6">
                                <ProviderMap
                                    providers={sortedProviders}
                                    userLat={latitude}
                                    userLng={longitude}
                                    highlightedId={highlightedId}
                                    selectedId={selectedId}
                                    onHover={setHighlightedId}
                                    onSelect={setSelectedId}
                                />
                            </div>
                        )}

                        {/* List (always in list view, below map in map view) */}
                        <ProviderList
                            providers={sortedProviders}
                            onFavoriteToggle={toggleFavorite}
                            favorites={favorites}
                            loading={!mounted}
                            highlightedId={highlightedId}
                            onHover={setHighlightedId}
                            onClearFilters={handleClearFilters}
                            columns={view === 'map' ? 2 : 3}
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
