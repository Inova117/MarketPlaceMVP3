'use client'

import { useState } from 'react'
import { Calendar, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookingModal } from './booking-modal'
import type { Service } from '@/lib/types'

interface ServiceListProps {
    services: Service[]
    providerId: string
}

export function ServiceList({ services, providerId }: ServiceListProps) {
    const [selectedService, setSelectedService] = useState<Service | null>(null)
    const [showBookingModal, setShowBookingModal] = useState(false)

    const handleBookService = (service: Service) => {
        setSelectedService(service)
        setShowBookingModal(true)
    }

    const handleCloseModal = () => {
        setShowBookingModal(false)
        setSelectedService(null)
    }

    if (services.length === 0) {
        return (
            <Card>
                <CardContent className="py-8 text-center">
                    <p className="text-slate-600">
                        Este proveedor aún no ha definido servicios reservables
                    </p>
                </CardContent>
            </Card>
        )
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Servicios Disponibles</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {services.map((service) => (
                            <div
                                key={service.id}
                                className="rounded-lg border border-slate-200 p-4 transition-shadow hover:shadow-md"
                            >
                                <h3 className="font-semibold text-slate-900">{service.name}</h3>
                                <p className="mt-2 text-sm text-slate-600">{service.description}</p>

                                <div className="mt-4 flex items-center justify-between">
                                    <div>
                                        <span className="text-2xl font-bold text-primary-600">
                                            €{service.price}
                                        </span>
                                        <span className="ml-2 flex items-center gap-1 text-sm text-slate-500">
                                            <Clock className="h-4 w-4" />
                                            {service.duration} min
                                        </span>
                                    </div>
                                </div>

                                <Button
                                    className="mt-4 w-full"
                                    onClick={() => handleBookService(service)}
                                >
                                    <Calendar className="mr-2 h-4 w-4" />
                                    Reservar
                                </Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {selectedService && (
                <BookingModal
                    isOpen={showBookingModal}
                    onClose={handleCloseModal}
                    service={selectedService}
                    providerId={providerId}
                />
            )}
        </>
    )
}
