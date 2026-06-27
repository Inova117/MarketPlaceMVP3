'use client'

import { categories } from '@/lib/mock-data/categories'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { SlidersHorizontal, Star, RotateCcw } from 'lucide-react'
import { cn, priceRangeLabel } from '@/lib/utils'

interface FilterSidebarProps {
    category: string
    radius: number
    ratingMin: number | undefined
    priceRange: string
    openNow: boolean
    onCategoryChange: (category: string) => void
    onRadiusChange: (radius: number) => void
    onRatingMinChange: (rating: number | undefined) => void
    onPriceRangeChange: (price: string) => void
    onOpenNowChange: (openNow: boolean) => void
    onClearFilters: () => void
    activeCount?: number
}

function FieldLabel({ children }: { children: React.ReactNode }) {
    return (
        <span className="mb-2.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {children}
        </span>
    )
}

export function FilterSidebar({
    category,
    radius,
    ratingMin,
    priceRange,
    openNow,
    onCategoryChange,
    onRadiusChange,
    onRatingMinChange,
    onPriceRangeChange,
    onOpenNowChange,
    onClearFilters,
    activeCount = 0,
}: FilterSidebarProps) {
    return (
        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4 text-primary-600" />
                    <h2 className="font-display text-base font-bold text-foreground">Filtros</h2>
                    {activeCount > 0 && (
                        <span className="grid h-5 min-w-5 place-items-center rounded-full bg-primary-600 px-1 text-[11px] font-bold text-white">
                            {activeCount}
                        </span>
                    )}
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClearFilters}
                    className="text-muted-foreground"
                >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Limpiar
                </Button>
            </div>

            <div className="space-y-6">
                {/* Category */}
                <div>
                    <FieldLabel>Categoría</FieldLabel>
                    <Select
                        value={category}
                        onChange={(e) => onCategoryChange(e.target.value)}
                    >
                        <option value="">Todas las categorías</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </Select>
                </div>

                {/* Distance */}
                <div>
                    <div className="mb-2.5 flex items-center justify-between">
                        <FieldLabel>Distancia máxima</FieldLabel>
                        <span className="text-sm font-bold text-primary-600">
                            {(radius / 1000).toFixed(0)} km
                        </span>
                    </div>
                    <input
                        type="range"
                        min="1000"
                        max="20000"
                        step="1000"
                        value={radius}
                        onChange={(e) => onRadiusChange(Number(e.target.value))}
                        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary-600"
                    />
                    <div className="mt-1.5 flex justify-between text-xs text-muted-foreground">
                        <span>1 km</span>
                        <span>20 km</span>
                    </div>
                </div>

                {/* Rating */}
                <div>
                    <FieldLabel>Calificación mínima</FieldLabel>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { value: undefined, label: 'Todas' },
                            { value: 3, label: '3+' },
                            { value: 4, label: '4+' },
                            { value: 5, label: '5' },
                        ].map((opt) => {
                            const active = ratingMin === opt.value
                            return (
                                <button
                                    key={opt.label}
                                    onClick={() => onRatingMinChange(opt.value)}
                                    className={cn(
                                        'inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors',
                                        active
                                            ? 'border-primary-600 bg-primary-600 text-white'
                                            : 'border-border bg-surface text-foreground hover:border-primary-300'
                                    )}
                                >
                                    {opt.value && (
                                        <Star
                                            className={cn(
                                                'h-3.5 w-3.5',
                                                active ? 'fill-white' : 'fill-accent-400 text-accent-400'
                                            )}
                                        />
                                    )}
                                    {opt.label}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Price */}
                <div>
                    <FieldLabel>Rango de precio</FieldLabel>
                    <div className="grid grid-cols-2 gap-2">
                        {['', '$', '$$', '$$$', '$$$$'].map((price) => {
                            const active = priceRange === price
                            return (
                                <button
                                    key={price || 'all'}
                                    onClick={() => onPriceRangeChange(price)}
                                    className={cn(
                                        'rounded-xl border px-3 py-2 text-sm font-medium transition-colors',
                                        active
                                            ? 'border-primary-600 bg-primary-50 text-primary-700 dark:bg-primary-950/50 dark:text-primary-300'
                                            : 'border-border bg-surface text-foreground hover:border-primary-300',
                                        price === '' && 'col-span-2'
                                    )}
                                >
                                    {price === '' ? 'Cualquier precio' : `${price} · ${priceRangeLabel(price)}`}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Open now toggle */}
                <div className="flex items-center justify-between rounded-xl border border-border bg-surface px-3.5 py-3">
                    <div>
                        <p className="text-sm font-semibold text-foreground">Abierto ahora</p>
                        <p className="text-xs text-muted-foreground">Solo disponibles ya</p>
                    </div>
                    <button
                        role="switch"
                        aria-checked={openNow}
                        onClick={() => onOpenNowChange(!openNow)}
                        className={cn(
                            'relative h-6 w-11 shrink-0 rounded-full transition-colors',
                            openNow ? 'bg-primary-600' : 'bg-muted'
                        )}
                    >
                        <span
                            className={cn(
                                'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform',
                                openNow ? 'translate-x-[22px]' : 'translate-x-0.5'
                            )}
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}
