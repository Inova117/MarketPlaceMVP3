'use client'

import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Check, X, CalendarClock } from 'lucide-react'
import { DashboardShell } from '@/components/layout/dashboard-shell'
import { Button } from '@/components/ui/button'
import { Badge, type BadgeVariant } from '@/components/ui/badge'
import { useToast } from '@/components/ui/toast'
import { bookingsStore } from '@/lib/mock-data/bookings-store'
import { services } from '@/lib/mock-data/services'
import { formatPrice, cn } from '@/lib/utils'
import type { Booking } from '@/lib/types'

const STATUS: Record<Booking['status'], { label: string; variant: BadgeVariant }> = {
    pending: { label: 'Pendiente', variant: 'warning' },
    confirmed: { label: 'Confirmada', variant: 'success' },
    rejected: { label: 'Rechazada', variant: 'danger' },
    completed: { label: 'Completada', variant: 'primary' },
    cancelled: { label: 'Cancelada', variant: 'default' },
}

export default function ProviderBookingsPage() {
    const { user, isAuthenticated } = useAuth()
    const router = useRouter()
    const { toast } = useToast()
    const [bookings, setBookings] = useState<Booking[]>([])
    const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed'>('pending')

    useEffect(() => {
        if (!isAuthenticated || user?.role !== 'provider') {
            router.push('/')
            return
        }
        const load = () => {
            if (user?.providerId) {
                setBookings(bookingsStore.getByProviderId(user.providerId))
            }
        }
        load()
        const unsubscribe = bookingsStore.subscribe(load)
        return () => {
            unsubscribe()
        }
    }, [isAuthenticated, user, router])

    if (!isAuthenticated || user?.role !== 'provider') return null

    const handleAccept = (id: string) => {
        bookingsStore.updateStatus(id, 'confirmed')
        toast({ variant: 'success', title: 'Reserva confirmada' })
    }
    const handleReject = (id: string) => {
        bookingsStore.updateStatus(id, 'rejected')
        toast({ variant: 'info', title: 'Reserva rechazada' })
    }

    const filtered = bookings.filter((b) =>
        filter === 'all' ? true : b.status === filter
    )
    const getServiceName = (id: string) =>
        services.find((s) => s.id === id)?.name ?? 'Servicio'

    const counts = {
        pending: bookings.filter((b) => b.status === 'pending').length,
        confirmed: bookings.filter((b) => b.status === 'confirmed').length,
        all: bookings.length,
    }

    return (
        <DashboardShell
            title="Mis reservas"
            description="Gestiona las solicitudes de reserva de tus clientes."
        >
            {/* Filter tabs */}
            <div className="mb-6 inline-flex rounded-xl border border-border bg-surface p-1">
                {(['pending', 'confirmed', 'all'] as const).map((key) => (
                    <button
                        key={key}
                        onClick={() => setFilter(key)}
                        className={cn(
                            'rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors',
                            filter === key
                                ? 'bg-primary-600 text-white'
                                : 'text-muted-foreground hover:text-foreground'
                        )}
                    >
                        {key === 'pending' ? 'Pendientes' : key === 'confirmed' ? 'Confirmadas' : 'Todas'}{' '}
                        ({counts[key]})
                    </button>
                ))}
            </div>

            {filtered.length > 0 ? (
                <div className="space-y-4">
                    {filtered.map((booking) => (
                        <div
                            key={booking.id}
                            className="rounded-2xl border border-border bg-card p-5 shadow-card"
                        >
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div className="flex gap-3">
                                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-950">
                                        <CalendarClock className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground">
                                            {getServiceName(booking.serviceId)}
                                        </h3>
                                        <p className="text-sm capitalize text-muted-foreground">
                                            {new Date(booking.date).toLocaleDateString('es-ES', {
                                                weekday: 'long',
                                                day: 'numeric',
                                                month: 'long',
                                            })}{' '}
                                            · {booking.time}
                                        </p>
                                        <div className="mt-2 flex items-center gap-3">
                                            <span className="font-semibold text-foreground">
                                                {formatPrice(booking.totalPrice)}
                                            </span>
                                            <Badge variant={STATUS[booking.status].variant}>
                                                {STATUS[booking.status].label}
                                            </Badge>
                                        </div>
                                        {booking.notes && (
                                            <p className="mt-2 rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground">
                                                “{booking.notes}”
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {booking.status === 'pending' && (
                                    <div className="flex gap-2">
                                        <Button size="sm" onClick={() => handleAccept(booking.id)}>
                                            <Check className="h-4 w-4" />
                                            Aceptar
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleReject(booking.id)}
                                        >
                                            <X className="h-4 w-4" />
                                            Rechazar
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface py-16 text-center">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-muted">
                        <CalendarClock className="h-7 w-7 text-muted-foreground" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold text-foreground">
                        No hay reservas
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {filter === 'pending'
                            ? 'No tienes solicitudes pendientes.'
                            : 'Aún no has recibido reservas en esta vista.'}
                    </p>
                </div>
            )}
        </DashboardShell>
    )
}
