'use client'

import { useState } from 'react'
import { Calendar, Clock, LogIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Modal, ModalHeader } from '@/components/ui/modal'
import { useToast } from '@/components/ui/toast'
import { useAuth } from '@/contexts/auth-context'
import { bookingsStore } from '@/lib/mock-data/bookings-store'
import { formatPrice } from '@/lib/utils'
import type { Service } from '@/lib/types'

interface BookingModalProps {
    isOpen: boolean
    onClose: () => void
    service: Service
    providerId: string
}

const TIME_SLOTS = (() => {
    const slots: string[] = []
    for (let hour = 9; hour <= 18; hour++) {
        slots.push(`${hour.toString().padStart(2, '0')}:00`)
        if (hour < 18) slots.push(`${hour.toString().padStart(2, '0')}:30`)
    }
    return slots
})()

export function BookingModal({ isOpen, onClose, service, providerId }: BookingModalProps) {
    const { user, isAuthenticated } = useAuth()
    const { toast } = useToast()
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [notes, setNotes] = useState('')

    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const minDate = tomorrow.toISOString().split('T')[0]

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!isAuthenticated || !user) {
            toast({
                variant: 'warning',
                title: 'Inicia sesión para reservar',
                description: 'Necesitas una cuenta para confirmar la reserva.',
            })
            return
        }

        bookingsStore.create({
            providerId,
            userId: user.id,
            serviceId: service.id,
            date,
            time,
            status: 'pending',
            totalPrice: service.price,
            notes,
        })

        toast({
            variant: 'success',
            title: 'Solicitud enviada',
            description: 'El proveedor confirmará tu reserva pronto.',
        })
        onClose()
        setDate('')
        setTime('')
        setNotes('')
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="max-w-md">
            <ModalHeader title="Reservar servicio" onClose={onClose} />

            <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-6">
                {/* Service preview */}
                <div className="rounded-2xl border border-border bg-muted/60 p-4">
                    <h3 className="font-semibold text-foreground">{service.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{service.description}</p>
                    <div className="mt-3 flex items-center justify-between">
                        <span className="font-display text-2xl font-extrabold text-primary-600">
                            {formatPrice(service.price)}
                        </span>
                        <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {service.duration} min
                        </span>
                    </div>
                </div>

                {/* Date */}
                <div>
                    <label htmlFor="date" className="mb-2 block text-sm font-semibold text-foreground">
                        Fecha
                    </label>
                    <div className="relative">
                        <Calendar className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground" />
                        <Input
                            id="date"
                            type="date"
                            value={date}
                            min={minDate}
                            onChange={(e) => setDate(e.target.value)}
                            className="pl-11"
                            required
                        />
                    </div>
                </div>

                {/* Time */}
                <div>
                    <label htmlFor="time" className="mb-2 block text-sm font-semibold text-foreground">
                        Hora
                    </label>
                    <Select
                        id="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    >
                        <option value="">Selecciona una hora</option>
                        {TIME_SLOTS.map((slot) => (
                            <option key={slot} value={slot}>
                                {slot}
                            </option>
                        ))}
                    </Select>
                </div>

                {/* Notes */}
                <div>
                    <label htmlFor="notes" className="mb-2 block text-sm font-semibold text-foreground">
                        Notas <span className="font-normal text-muted-foreground">(opcional)</span>
                    </label>
                    <Textarea
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={3}
                        placeholder="Detalles adicionales para el proveedor…"
                    />
                </div>

                {!isAuthenticated && (
                    <div className="flex items-center gap-2.5 rounded-xl border border-warning/30 bg-warning-subtle p-3.5 text-sm text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">
                        <LogIn className="h-4 w-4 shrink-0" />
                        Inicia sesión para confirmar tu reserva.
                    </div>
                )}

                <div className="flex justify-end gap-3 border-t border-border pt-5">
                    <Button type="button" variant="outline" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button type="submit" disabled={!isAuthenticated}>
                        Confirmar reserva
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
