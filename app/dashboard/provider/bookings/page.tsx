'use client'

import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Check, X, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { bookingsStore } from '@/lib/mock-data/bookings-store'
import { services } from '@/lib/mock-data/services'
import type { Booking } from '@/lib/types'

export default function ProviderBookingsPage() {
    const { user, isAuthenticated } = useAuth()
    const router = useRouter()
    const [bookings, setBookings] = useState<Booking[]>([])
    const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed'>('pending')

    useEffect(() => {
        if (!isAuthenticated || user?.role !== 'provider') {
            router.push('/')
            return
        }

        loadBookings()

        // Subscribe to changes
        const unsubscribe = bookingsStore.subscribe(() => {
            loadBookings()
        })

        return () => {
            unsubscribe()
        }
    }, [isAuthenticated, user, router])

    const loadBookings = () => {
        if (user?.providerId) {
            const providerBookings = bookingsStore.getByProviderId(user.providerId)
            setBookings(providerBookings)
        }
    }

    if (!isAuthenticated || user?.role !== 'provider') {
        return null
    }

    const handleAccept = (bookingId: string) => {
        bookingsStore.updateStatus(bookingId, 'confirmed')
        alert('Reserva confirmada!')
    }

    const handleReject = (bookingId: string) => {
        bookingsStore.updateStatus(bookingId, 'rejected')
        alert('Reserva rechazada')
    }

    const filteredBookings = bookings.filter((b) => {
        if (filter === 'all') return true
        if (filter === 'pending') return b.status === 'pending'
        if (filter === 'confirmed') return b.status === 'confirmed'
        return true
    })

    const getServiceName = (serviceId: string) => {
        const service = services.find((s) => s.id === serviceId)
        return service?.name || 'Servicio desconocido'
    }

    const getStatusBadge = (status: Booking['status']) => {
        const styles = {
            pending: 'bg-yellow-100 text-yellow-700',
            confirmed: 'bg-green-100 text-green-700',
            rejected: 'bg-red-100 text-red-700',
            completed: 'bg-blue-100 text-blue-700',
            cancelled: 'bg-slate-100 text-slate-700',
        }
        const labels = {
            pending: 'Pendiente',
            confirmed: 'Confirmada',
            rejected: 'Rechazada',
            completed: 'Completada',
            cancelled: 'Cancelada',
        }
        return (
            <span className={`rounded-full px-2 py-1 text-xs font-medium ${styles[status]}`}>
                {labels[status]}
            </span>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="border-b border-slate-200 bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <Link href="/dashboard/provider">
                        <Button variant="ghost" size="sm" className="mb-2">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Volver al Dashboard
                        </Button>
                    </Link>
                    <h1 className="font-display text-3xl font-bold text-slate-900">
                        Mis Reservas
                    </h1>
                    <p className="mt-1 text-sm text-slate-600">
                        Gestiona las solicitudes de reserva de tus clientes
                    </p>
                </div>
            </header>

            {/* Main Content */}
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Filters */}
                <div className="mb-6 flex gap-2">
                    <Button
                        variant={filter === 'pending' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilter('pending')}
                    >
                        Pendientes ({bookings.filter((b) => b.status === 'pending').length})
                    </Button>
                    <Button
                        variant={filter === 'confirmed' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilter('confirmed')}
                    >
                        Confirmadas ({bookings.filter((b) => b.status === 'confirmed').length})
                    </Button>
                    <Button
                        variant={filter === 'all' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilter('all')}
                    >
                        Todas ({bookings.length})
                    </Button>
                </div>

                {/* Bookings List */}
                {filteredBookings.length > 0 ? (
                    <div className="space-y-4">
                        {filteredBookings.map((booking) => (
                            <Card key={booking.id}>
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3">
                                                <Calendar className="h-5 w-5 text-slate-400" />
                                                <div>
                                                    <h3 className="font-semibold text-slate-900">
                                                        {getServiceName(booking.serviceId)}
                                                    </h3>
                                                    <p className="text-sm text-slate-600">
                                                        {new Date(booking.date).toLocaleDateString('es-ES', {
                                                            weekday: 'long',
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                        })} a las {booking.time}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="mt-4 flex items-center gap-4 text-sm">
                                                <span className="font-medium">€{booking.totalPrice}</span>
                                                {getStatusBadge(booking.status)}
                                            </div>
                                            {booking.notes && (
                                                <p className="mt-2 text-sm text-slate-600">
                                                    Nota: {booking.notes}
                                                </p>
                                            )}
                                        </div>

                                        {booking.status === 'pending' && (
                                            <div className="ml-4 flex gap-2">
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleAccept(booking.id)}
                                                    className="bg-green-600 hover:bg-green-700"
                                                >
                                                    <Check className="mr-1 h-4 w-4" />
                                                    Aceptar
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleReject(booking.id)}
                                                    className="text-red-600 hover:bg-red-50"
                                                >
                                                    <X className="mr-1 h-4 w-4" />
                                                    Rechazar
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <Calendar className="h-12 w-12 text-slate-400" />
                            <h3 className="mt-4 text-lg font-semibold text-slate-900">
                                No hay reservas
                            </h3>
                            <p className="mt-2 text-sm text-slate-600">
                                {filter === 'pending'
                                    ? 'No tienes solicitudes pendientes'
                                    : 'Aún no has recibido reservas'}
                            </p>
                        </CardContent>
                    </Card>
                )}
            </main>
        </div>
    )
}
