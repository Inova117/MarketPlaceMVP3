'use client'

import { Search, MapPin, Loader2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SearchBarProps {
    query: string
    onQueryChange: (query: string) => void
    onLocationRequest: () => void
    locationLoading: boolean
}

export function SearchBar({
    query,
    onQueryChange,
    onLocationRequest,
    locationLoading,
}: SearchBarProps) {
    return (
        <div className="flex flex-col gap-2.5 rounded-2xl border border-border bg-surface p-2 shadow-card sm:flex-row sm:items-center sm:rounded-full sm:pl-5">
            <div className="relative flex flex-1 items-center">
                <Search className="pointer-events-none h-5 w-5 shrink-0 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="¿Qué necesitas? Ej: plomero, peluquería, taller…"
                    value={query}
                    onChange={(e) => onQueryChange(e.target.value)}
                    className="w-full border-0 bg-transparent px-3 py-2.5 text-[15px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0"
                />
                {query && (
                    <button
                        onClick={() => onQueryChange('')}
                        className="mr-1 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        aria-label="Limpiar búsqueda"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>
            <Button
                onClick={onLocationRequest}
                disabled={locationLoading}
                size="lg"
                className="shrink-0 rounded-full sm:rounded-full"
            >
                {locationLoading ? (
                    <Loader2 className="h-[18px] w-[18px] animate-spin" />
                ) : (
                    <MapPin className="h-[18px] w-[18px]" />
                )}
                {locationLoading ? 'Localizando…' : 'Usar mi ubicación'}
            </Button>
        </div>
    )
}
