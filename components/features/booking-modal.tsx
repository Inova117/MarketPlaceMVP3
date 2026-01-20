'use client'

import { useState } from 'react'
import { X, Calendar, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/auth-context'
import { bookingsStore } from '@/lib/mock-data/bookings-store'
import type { Service } from '@/lib/types'

interface BookingModalProps {
    isOpen: boolean
    onClose: () => void
    service: Service
    providerId: string
}

export function BookingModal({ isOpen, onClose, service, providerId }: BookingModalProps) {
    const { user, isAuthenticated } = useAuth()
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [notes, setNotes] = useState('')

    if (!isOpen) return null

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!isAuthenticated || !user) {
            alert('Debes iniciar sesión para reservar')
            return
        }

        // Create booking
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

        alert('¡Solicitud de reserva enviada! El proveedor te confirmará pronto.')
        onClose()

        // Reset form
        setDate('')
        setTime('')
        setNotes('')
    }

    // Generate available time slots (9am - 6pm)
    const timeSlots = []
    for (let hour = 9; hour <= 18; hour++) {
        timeSlots.push(`${hour.toString().padStart(2, '0')}:00`)
        if (hour < 18) {
            timeSlots.push(`${hour.toString().padStart(2, '0')}:30`)
        }
    }

    // Get minimum date (tomorrow)
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const minDate = tomorrow.toISOString().split('T')[0]

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="font-display text-2xl font-bold text-slate-900">
                        Reservar Servicio
                    </h2>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Service Preview */}
                <div className="mb-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <h3 className="font-semibold text-slate-900">{service.name}</h3>
                    <p className="mt-1 text-sm text-slate-600">{service.description}</p>
                    <div className="mt-3 flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary-600">€{service.price}</span>
                        <span className="flex items-center gap-1 text-sm text-slate-500">
                            <Clock className="h-4 w-4" />
                            {service.duration} min
                        </span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Date */}
                    <div>
                        <label htmlFor="date" className="mb-2 block text-sm font-medium text-slate-700">
                            Fecha
                        </label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                            <Input
                                id="date"
                                type="date"
                                value={date}
                                min={minDate}
                                onChange={(e) => setDate(e.target.value)}
                                className="pl-10"
                                required
                            />
                        </div>
                    </div>

                    {/* Time */}
                    <div>
                        <label htmlFor="time" className="mb-2 block text-sm font-medium text-slate-700">
                            Hora
                        </label>
                        <select
                            id="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
                            required
                        >
                            <option value="">Selecciona una hora</option>
                            {timeSlots.map((slot) => (
                                <option key={slot} value={slot}>
                                    {slot}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Notes */}
                    <div>
                        <label htmlFor="notes" className="mb-2 block text-sm font-medium text-slate-700">
                            Notas (opcional)
                        </label>
                        <textarea
                            id="notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={3}
                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
                            placeholder="Comentarios adicionales..."
                        />
                    </div>

                    {!isAuthenticated && (
                        <div className="rounded-lg bg-yellow-50 p-3">
                            <p className="text-sm text-yellow-800">
                                Debes <strong>iniciar sesión</strong> para reservar
                            </p>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={!isAuthenticated}>
                            Confirmar Reserva
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
