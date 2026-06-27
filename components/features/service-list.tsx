'use client'

import { useState } from 'react'
import { Calendar, Clock, PackageOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BookingModal } from './booking-modal'
import { formatPrice } from '@/lib/utils'
import type { Service } from '@/lib/types'

interface ServiceListProps {
    services: Service[]
    providerId: string
}

export function ServiceList({ services, providerId }: ServiceListProps) {
    const [selectedService, setSelectedService] = useState<Service | null>(null)

    if (services.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface py-12 text-center">
                <PackageOpen className="h-9 w-9 text-muted-foreground" />
                <p className="mt-3 text-sm text-muted-foreground">
                    Este proveedor aún no ha publicado servicios reservables.
                </p>
            </div>
        )
    }

    return (
        <>
            <div className="grid gap-4 sm:grid-cols-2">
                {services.map((service) => (
                    <div
                        key={service.id}
                        className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-card transition-all hover:border-primary-300 hover:shadow-lifted"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <h3 className="font-display font-bold text-foreground">
                                {service.name}
                            </h3>
                            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {service.duration} min
                            </span>
                        </div>
                        <p className="mt-2 flex-1 text-sm text-muted-foreground">
                            {service.description}
                        </p>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="font-display text-2xl font-extrabold text-foreground">
                                {formatPrice(service.price)}
                            </span>
                            <Button size="sm" onClick={() => setSelectedService(service)}>
                                <Calendar className="h-4 w-4" />
                                Reservar
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedService && (
                <BookingModal
                    isOpen={!!selectedService}
                    onClose={() => setSelectedService(null)}
                    service={selectedService}
                    providerId={providerId}
                />
            )}
        </>
    )
}
