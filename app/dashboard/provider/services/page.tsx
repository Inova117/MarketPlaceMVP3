'use client'

import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Plus, Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { services as mockServices } from '@/lib/mock-data/services'
import type { Service } from '@/lib/types'

export default function ProviderServicesPage() {
    const { user, isAuthenticated } = useAuth()
    const router = useRouter()
    const [services, setServices] = useState<Service[]>([])

    useEffect(() => {
        if (!isAuthenticated || user?.role !== 'provider') {
            router.push('/')
            return
        }

        // Load services for this provider
        const providerServices = mockServices.filter(
            (s) => s.providerId === user.providerId
        )
        setServices(providerServices)
    }, [isAuthenticated, user, router])

    if (!isAuthenticated || user?.role !== 'provider') {
        return null
    }

    const handleDelete = (serviceId: string) => {
        if (confirm('¿Eliminar este servicio?')) {
            setServices(services.filter((s) => s.id !== serviceId))
            alert('Servicio eliminado (Demo - cambios no se guardan)')
        }
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
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="font-display text-3xl font-bold text-slate-900">
                                Mis Servicios
                            </h1>
                            <p className="mt-1 text-sm text-slate-600">
                                Gestiona los servicios que ofreces
                            </p>
                        </div>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Nuevo Servicio
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {services.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {services.map((service) => (
                            <Card key={service.id}>
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <CardTitle className="text-lg">{service.name}</CardTitle>
                                            <p className="mt-1 text-2xl font-bold text-primary-600">
                                                €{service.price}
                                            </p>
                                        </div>
                                        <div
                                            className={`rounded-full px-2 py-1 text-xs font-medium ${service.isActive
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-slate-100 text-slate-600'
                                                }`}
                                        >
                                            {service.isActive ? 'Activo' : 'Inactivo'}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-slate-600">{service.description}</p>
                                    <p className="mt-2 text-sm text-slate-500">
                                        Duración: {service.duration} min
                                    </p>

                                    <div className="mt-4 flex gap-2">
                                        <Button variant="outline" size="sm" className="flex-1">
                                            <Edit className="mr-1 h-3 w-3" />
                                            Editar
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleDelete(service.id)}
                                            className="text-red-600 hover:bg-red-50"
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <Plus className="h-12 w-12 text-slate-400" />
                            <h3 className="mt-4 text-lg font-semibold text-slate-900">
                                No hay servicios
                            </h3>
                            <p className="mt-2 text-sm text-slate-600">
                                Crea tu primer servicio para que los clientes puedan reservar
                            </p>
                            <Button className="mt-4">
                                <Plus className="mr-2 h-4 w-4" />
                                Crear Servicio
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </main>
        </div>
    )
}
