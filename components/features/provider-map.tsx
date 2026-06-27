'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { Navigation, Star, X, MapPin } from 'lucide-react'
import { formatDistance } from '@/lib/geo-utils'
import { cn, categoryAccent, optimizeImage } from '@/lib/utils'
import type { Provider } from '@/lib/types'

interface ProviderMapProps {
    providers: (Provider & { distance?: number })[]
    userLat?: number | null
    userLng?: number | null
    highlightedId?: string | null
    selectedId?: string | null
    onHover?: (id: string | null) => void
    onSelect?: (id: string | null) => void
}

interface Positioned {
    provider: Provider & { distance?: number }
    x: number
    y: number
}

const PAD = 10 // percentage padding inside the map viewport

function project(
    lat: number,
    lng: number,
    bounds: { minLat: number; maxLat: number; minLng: number; maxLng: number }
) {
    const latRange = bounds.maxLat - bounds.minLat || 1
    const lngRange = bounds.maxLng - bounds.minLng || 1
    const x = PAD + ((lng - bounds.minLng) / lngRange) * (100 - PAD * 2)
    // invert latitude so north is up
    const y = PAD + ((bounds.maxLat - lat) / latRange) * (100 - PAD * 2)
    return { x, y }
}

export function ProviderMap({
    providers,
    userLat,
    userLng,
    highlightedId,
    selectedId,
    onHover,
    onSelect,
}: ProviderMapProps) {
    const { positioned, userPos } = useMemo(() => {
        const lats = providers.map((p) => p.latitude)
        const lngs = providers.map((p) => p.longitude)
        if (userLat != null && userLng != null) {
            lats.push(userLat)
            lngs.push(userLng)
        }
        const bounds = {
            minLat: Math.min(...lats),
            maxLat: Math.max(...lats),
            minLng: Math.min(...lngs),
            maxLng: Math.max(...lngs),
        }
        const positioned: Positioned[] = providers.map((provider) => ({
            provider,
            ...project(provider.latitude, provider.longitude, bounds),
        }))
        const userPos =
            userLat != null && userLng != null
                ? project(userLat, userLng, bounds)
                : null
        return { positioned, userPos }
    }, [providers, userLat, userLng])

    const selected = providers.find((p) => p.id === selectedId) ?? null

    return (
        <div className="relative h-[clamp(420px,70vh,760px)] w-full overflow-hidden rounded-2xl border border-border bg-[#eaedf5] shadow-card dark:bg-[#0e1018]">
            {/* Stylized map base */}
            <div className="absolute inset-0">
                {/* park / water blobs */}
                <div className="absolute left-[8%] top-[12%] h-40 w-52 rounded-[40%] bg-emerald-200/50 blur-md dark:bg-emerald-900/20" />
                <div className="absolute bottom-[10%] right-[14%] h-48 w-64 rounded-[45%] bg-sky-200/50 blur-md dark:bg-sky-900/20" />
                <div className="absolute right-[6%] top-[20%] h-28 w-28 rounded-[40%] bg-emerald-200/40 blur-md dark:bg-emerald-900/15" />
                {/* street grid */}
                <div
                    className="absolute inset-0 opacity-[0.5] dark:opacity-[0.18]"
                    style={{
                        backgroundImage:
                            'linear-gradient(to right, rgba(120,130,160,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(120,130,160,0.25) 1px, transparent 1px)',
                        backgroundSize: '64px 64px',
                    }}
                />
                {/* diagonal avenues */}
                <div className="absolute -left-1/4 top-1/3 h-2.5 w-[150%] -rotate-12 bg-white/70 dark:bg-white/5" />
                <div className="absolute -left-1/4 top-2/3 h-2 w-[150%] rotate-6 bg-white/60 dark:bg-white/5" />
                <div className="absolute left-1/3 top-[-20%] h-[140%] w-2.5 rotate-12 bg-white/70 dark:bg-white/5" />
            </div>

            {/* Header chip */}
            <div className="pointer-events-none absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full bg-surface/90 px-3 py-1.5 text-xs font-semibold text-foreground shadow-soft backdrop-blur">
                <MapPin className="h-3.5 w-3.5 text-primary-600" />
                {providers.length} {providers.length === 1 ? 'resultado' : 'resultados'} en el mapa
            </div>

            {/* User location */}
            {userPos && (
                <div
                    className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${userPos.x}%`, top: `${userPos.y}%` }}
                >
                    <span className="absolute -inset-3 animate-pulse-ring rounded-full bg-sky-500/40" />
                    <span className="relative block h-4 w-4 rounded-full border-2 border-white bg-sky-500 shadow-md" />
                </div>
            )}

            {/* Provider markers */}
            {positioned.map(({ provider, x, y }) => {
                const active = provider.id === highlightedId || provider.id === selectedId
                return (
                    <button
                        key={provider.id}
                        className="group absolute z-10 -translate-x-1/2 -translate-y-full focus:outline-none"
                        style={{ left: `${x}%`, top: `${y}%`, zIndex: active ? 30 : 10 }}
                        onMouseEnter={() => onHover?.(provider.id)}
                        onMouseLeave={() => onHover?.(null)}
                        onClick={() => onSelect?.(provider.id)}
                        aria-label={provider.name}
                    >
                        <span
                            className={cn(
                                'flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold text-white shadow-lifted transition-all duration-200',
                                'bg-gradient-to-br',
                                categoryAccent(provider.category),
                                active ? 'scale-125 ring-2 ring-white' : 'group-hover:scale-110'
                            )}
                        >
                            <Star className="h-3 w-3 fill-white" />
                            {provider.avgRating.toFixed(1)}
                        </span>
                        <span
                            className={cn(
                                'mx-auto block h-2 w-2 -translate-y-[3px] rotate-45 bg-white',
                                active ? 'opacity-100' : 'opacity-80'
                            )}
                        />
                        {/* hover tooltip */}
                        <span className="pointer-events-none absolute bottom-full left-1/2 mb-1 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-foreground px-2 py-1 text-[11px] font-medium text-background opacity-0 transition-opacity group-hover:block group-hover:opacity-100">
                            {provider.name}
                        </span>
                    </button>
                )
            })}

            {/* Selected provider card (docked bottom) */}
            {selected && (
                <div className="absolute inset-x-3 bottom-3 z-40 animate-fade-up sm:inset-x-auto sm:left-3 sm:w-80">
                    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-lifted">
                        <div className="flex">
                            <div className="h-24 w-24 shrink-0 bg-muted">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={optimizeImage(
                                        selected.photos[0] ||
                                            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
                                        300
                                    )}
                                    alt={selected.name}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="min-w-0 flex-1 p-3">
                                <div className="flex items-start justify-between gap-2">
                                    <p className="truncate font-display text-sm font-bold text-foreground">
                                        {selected.name}
                                    </p>
                                    <button
                                        onClick={() => onSelect?.(null)}
                                        className="-mr-1 -mt-1 rounded-md p-0.5 text-muted-foreground hover:text-foreground"
                                        aria-label="Cerrar"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                                <p className="text-xs text-muted-foreground">{selected.category}</p>
                                <div className="mt-1 flex items-center gap-1 text-xs">
                                    <Star className="h-3.5 w-3.5 fill-accent-400 text-accent-400" />
                                    <span className="font-semibold text-foreground">
                                        {selected.avgRating.toFixed(1)}
                                    </span>
                                    <span className="text-muted-foreground">
                                        ({selected.reviewCount})
                                    </span>
                                    {selected.distance !== undefined && (
                                        <span className="ml-auto font-medium text-foreground">
                                            {formatDistance(selected.distance)}
                                        </span>
                                    )}
                                </div>
                                <Link
                                    href={`/providers/${selected.id}`}
                                    className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary-600 hover:underline"
                                >
                                    Ver perfil
                                    <Navigation className="h-3 w-3" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Attribution */}
            <div className="pointer-events-none absolute bottom-2 right-3 z-20 text-[10px] font-medium text-slate-500/80 dark:text-slate-400/60">
                Cerca Maps · vista de demostración
            </div>
        </div>
    )
}
