'use client'

import { Search, MapPin } from 'lucide-react'
import { Input } from '@/components/ui/input'
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
        <div className="flex gap-2">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <Input
                    type="text"
                    placeholder="Buscar servicios (ej: plomero, electricista...)"
                    value={query}
                    onChange={(e) => onQueryChange(e.target.value)}
                    className="pl-10"
                />
            </div>
            <Button
                onClick={onLocationRequest}
                disabled={locationLoading}
                variant="outline"
                className="shrink-0"
            >
                <MapPin className="mr-2 h-4 w-4" />
                {locationLoading ? 'Obteniendo...' : 'Usar mi ubicación'}
            </Button>
        </div>
    )
}
