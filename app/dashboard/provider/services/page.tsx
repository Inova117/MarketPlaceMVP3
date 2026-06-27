'use client'

import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, Clock, Wrench } from 'lucide-react'
import { DashboardShell } from '@/components/layout/dashboard-shell'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/components/ui/toast'
import { services as mockServices } from '@/lib/mock-data/services'
import { formatPrice } from '@/lib/utils'
import type { Service } from '@/lib/types'

export default function ProviderServicesPage() {
    const { user, isAuthenticated } = useAuth()
    const router = useRouter()
    const { toast } = useToast()
    const [services, setServices] = useState<Service[]>([])

    useEffect(() => {
        if (!isAuthenticated || user?.role !== 'provider') {
            router.push('/')
            return
        }
        setServices(mockServices.filter((s) => s.providerId === user.providerId))
    }, [isAuthenticated, user, router])

    if (!isAuthenticated || user?.role !== 'provider') return null

    const handleDelete = (serviceId: string) => {
        if (confirm('¿Eliminar este servicio?')) {
            setServices((prev) => prev.filter((s) => s.id !== serviceId))
            toast({
                variant: 'info',
                title: 'Servicio eliminado',
                description: 'En la demo los cambios no se guardan.',
            })
        }
    }

    return (
        <DashboardShell
            title="Mis servicios"
            description="Define los servicios que tus clientes pueden reservar."
            actions={
                <Button onClick={() => toast({ variant: 'info', title: 'Función de demostración' })}>
                    <Plus className="h-4 w-4" />
                    Nuevo servicio
                </Button>
            }
        >
            {services.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-card"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <h3 className="font-display font-bold text-foreground">
                                    {service.name}
                                </h3>
                                <Badge variant={service.isActive ? 'success' : 'default'}>
                                    {service.isActive ? 'Activo' : 'Inactivo'}
                                </Badge>
                            </div>
                            <p className="mt-2 flex-1 text-sm text-muted-foreground">
                                {service.description}
                            </p>
                            <div className="mt-3 flex items-center gap-3">
                                <span className="font-display text-xl font-extrabold text-foreground">
                                    {formatPrice(service.price)}
                                </span>
                                <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                                    <Clock className="h-3.5 w-3.5" />
                                    {service.duration} min
                                </span>
                            </div>
                            <div className="mt-4 flex gap-2 border-t border-border pt-4">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1"
                                    onClick={() => toast({ variant: 'info', title: 'Función de demostración' })}
                                >
                                    <Pencil className="h-3.5 w-3.5" />
                                    Editar
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleDelete(service.id)}
                                    className="text-danger hover:bg-danger-subtle dark:hover:bg-red-950/40"
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface py-16 text-center">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-muted">
                        <Wrench className="h-7 w-7 text-muted-foreground" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold text-foreground">
                        Aún no tienes servicios
                    </h3>
                    <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                        Crea tu primer servicio para que los clientes puedan reservar contigo.
                    </p>
                    <Button
                        className="mt-5"
                        onClick={() => toast({ variant: 'info', title: 'Función de demostración' })}
                    >
                        <Plus className="h-4 w-4" />
                        Crear servicio
                    </Button>
                </div>
            )}
        </DashboardShell>
    )
}
