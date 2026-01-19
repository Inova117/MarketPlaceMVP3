'use client'

import { categories } from '@/lib/mock-data/categories'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface FilterSidebarProps {
    category: string
    radius: number
    ratingMin: number | undefined
    priceRange: string
    onCategoryChange: (category: string) => void
    onRadiusChange: (radius: number) => void
    onRatingMinChange: (rating: number | undefined) => void
    onPriceRangeChange: (price: string) => void
    onClearFilters: () => void
}

export function FilterSidebar({
    category,
    radius,
    ratingMin,
    priceRange,
    onCategoryChange,
    onRadiusChange,
    onRatingMinChange,
    onPriceRangeChange,
    onClearFilters,
}: FilterSidebarProps) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="font-display text-lg font-bold text-slate-900">
                    Filtros
                </h2>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClearFilters}
                    className="text-sm"
                >
                    <X className="mr-1 h-4 w-4" />
                    Limpiar
                </Button>
            </div>

            <div className="space-y-6">
                {/* Category Filter */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Categoría
                    </label>
                    <select
                        value={category}
                        onChange={(e) => onCategoryChange(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-600"
                    >
                        <option value="">Todas las categorías</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Distance Slider */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Distancia: {(radius / 1000).toFixed(1)} km
                    </label>
                    <input
                        type="range"
                        min="1000"
                        max="20000"
                        step="1000"
                        value={radius}
                        onChange={(e) => onRadiusChange(Number(e.target.value))}
                        className="w-full accent-primary-600"
                    />
                    <div className="mt-1 flex justify-between text-xs text-slate-500">
                        <span>1 km</span>
                        <span>20 km</span>
                    </div>
                </div>

                {/* Rating Filter */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Calificación mínima
                    </label>
                    <div className="space-y-2">
                        {[5, 4, 3].map((rating) => (
                            <label key={rating} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="rating"
                                    checked={ratingMin === rating}
                                    onChange={() => onRatingMinChange(rating)}
                                    className="h-4 w-4 accent-primary-600"
                                />
                                <span className="text-sm text-slate-700">
                                    {rating}+ estrellas
                                </span>
                            </label>
                        ))}
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="rating"
                                checked={ratingMin === undefined}
                                onChange={() => onRatingMinChange(undefined)}
                                className="h-4 w-4 accent-primary-600"
                            />
                            <span className="text-sm text-slate-700">Todas</span>
                        </label>
                    </div>
                </div>

                {/* Price Range Filter */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Rango de precio
                    </label>
                    <div className="space-y-2">
                        {['$', '$$', '$$$', '$$$$'].map((price) => (
                            <label key={price} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="price"
                                    checked={priceRange === price}
                                    onChange={() => onPriceRangeChange(price)}
                                    className="h-4 w-4 accent-primary-600"
                                />
                                <span className="text-sm text-slate-700">{price}</span>
                            </label>
                        ))}
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="price"
                                checked={priceRange === ''}
                                onChange={() => onPriceRangeChange('')}
                                className="h-4 w-4 accent-primary-600"
                            />
                            <span className="text-sm text-slate-700">Todos</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}
