'use client'

import { MapPin, Clock, DollarSign } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import type { Provider } from '@/lib/types'

interface ProviderInfoProps {
    provider: Provider
}

export function ProviderInfo({ provider }: ProviderInfoProps) {
    const daysOfWeek = [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
    ]
    const dayNames: Record<string, string> = {
        monday: 'Lunes',
        tuesday: 'Martes',
        wednesday: 'Miércoles',
        thursday: 'Jueves',
        friday: 'Viernes',
        saturday: 'Sábado',
        sunday: 'Domingo',
    }

    return (
        <div className="space-y-6">
            {/* Description */}
            <Card>
                <CardContent className="p-6">
                    <h3 className="mb-3 font-display text-lg font-bold text-slate-900">
                        Descripción
                    </h3>
                    <p className="text-slate-700">{provider.description}</p>
                </CardContent>
            </Card>

            {/* Info Grid */}
            <div className="grid gap-4 sm:grid-cols-3">
                {/* Hours */}
                <Card>
                    <CardContent className="p-6">
                        <div className="mb-3 flex items-center gap-2 text-slate-900">
                            <Clock className="h-5 w-5" />
                            <h3 className="font-semibold">Horarios</h3>
                        </div>
                        <div className="space-y-1 text-sm">
                            {daysOfWeek.map((day) => {
                                const hours = provider.hours?.[day]
                                return (
                                    <div key={day} className="flex justify-between">
                                        <span className="text-slate-600">{dayNames[day]}</span>
                                        <span className="font-medium text-slate-900">
                                            {hours ? `${hours.open} - ${hours.close}` : 'Cerrado'}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Price Range */}
                <Card>
                    <CardContent className="p-6">
                        <div className="mb-3 flex items-center gap-2 text-slate-900">
                            <DollarSign className="h-5 w-5" />
                            <h3 className="font-semibold">Precio</h3>
                        </div>
                        <div className="text-3xl font-bold text-primary-600">
                            {provider.priceRange}
                        </div>
                        <p className="mt-1 text-sm text-slate-600">Rango de precio</p>
                    </CardContent>
                </Card>

                {/* Location */}
                <Card>
                    <CardContent className="p-6">
                        <div className="mb-3 flex items-center gap-2 text-slate-900">
                            <MapPin className="h-5 w-5" />
                            <h3 className="font-semibold">Ubicación</h3>
                        </div>
                        <p className="text-sm text-slate-700">{provider.address}</p>
                        {provider.phone && (
                            <p className="mt-2 text-sm text-slate-600">Tel: {provider.phone}</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
