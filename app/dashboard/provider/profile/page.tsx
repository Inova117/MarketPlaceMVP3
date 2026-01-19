'use client'

import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { providers } from '@/lib/mock-data/providers'

export default function ProviderProfilePage() {
    const { user, isAuthenticated } = useAuth()
    const router = useRouter()

    const provider = providers.find((p) => p.id === user?.providerId)

    const [formData, setFormData] = useState({
        name: provider?.name || '',
        category: provider?.category || '',
        description: provider?.description || '',
        phone: provider?.phone || '',
        whatsapp: provider?.whatsapp || '',
        email: provider?.email || '',
        address: provider?.address || '',
        priceRange: provider?.priceRange || '',
        hours: 'Lun-Vie 09:00 - 18:00', // Simplified for demo text input
    })

    useEffect(() => {
        if (!isAuthenticated || user?.role !== 'provider') {
            router.push('/')
        }
    }, [isAuthenticated, user, router])

    if (!isAuthenticated || user?.role !== 'provider') {
        return null
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // In real app, save to backend
        alert('Perfil actualizado exitosamente! (Demo - cambios no se guardan)')
    }

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
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
                        Editar Perfil
                    </h1>
                    <p className="mt-1 text-sm text-slate-600">
                        Actualiza la información de tu negocio
                    </p>
                </div>
            </header>

            {/* Main Content */}
            <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Información Básica</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">
                                    Nombre del Negocio *
                                </label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    placeholder="Ej: Plomería García"
                                    required
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label htmlFor="category" className="mb-2 block text-sm font-medium text-slate-700">
                                    Categoría *
                                </label>
                                <select
                                    id="category"
                                    value={formData.category}
                                    onChange={(e) => handleChange('category', e.target.value)}
                                    className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
                                    required
                                >
                                    <option value="">Selecciona una categoría</option>
                                    <option value="Plomería">Plomería</option>
                                    <option value="Electricidad">Electricidad</option>
                                    <option value="Limpieza">Limpieza</option>
                                    <option value="Jardinería">Jardinería</option>
                                    <option value="Pintura">Pintura</option>
                                    <option value="Carpintería">Carpintería</option>
                                </select>
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="description" className="mb-2 block text-sm font-medium text-slate-700">
                                    Descripción
                                </label>
                                <textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => handleChange('description', e.target.value)}
                                    rows={4}
                                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
                                    placeholder="Describe tus servicios..."
                                />
                            </div>

                            {/* Contact Info */}
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-700">
                                        Teléfono *
                                    </label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => handleChange('phone', e.target.value)}
                                        placeholder="+34 600 123 456"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="whatsapp" className="mb-2 block text-sm font-medium text-slate-700">
                                        WhatsApp
                                    </label>
                                    <Input
                                        id="whatsapp"
                                        type="tel"
                                        value={formData.whatsapp}
                                        onChange={(e) => handleChange('whatsapp', e.target.value)}
                                        placeholder="+34 600 123 456"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                                    Email *
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    placeholder="contacto@ejemplo.com"
                                    required
                                />
                            </div>

                            {/* Address */}
                            <div>
                                <label htmlFor="address" className="mb-2 block text-sm font-medium text-slate-700">
                                    Dirección *
                                </label>
                                <Input
                                    id="address"
                                    value={formData.address}
                                    onChange={(e) => handleChange('address', e.target.value)}
                                    placeholder="Calle Principal 123, Madrid"
                                    required
                                />
                            </div>

                            {/* Business Info */}
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="priceRange" className="mb-2 block text-sm font-medium text-slate-700">
                                        Rango de Precios
                                    </label>
                                    <select
                                        id="priceRange"
                                        value={formData.priceRange}
                                        onChange={(e) => handleChange('priceRange', e.target.value)}
                                        className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
                                    >
                                        <option value="">Selecciona</option>
                                        <option value="$">$ - Económico</option>
                                        <option value="$$">$$ - Moderado</option>
                                        <option value="$$$">$$$ - Premium</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="hours" className="mb-2 block text-sm font-medium text-slate-700">
                                        Horario
                                    </label>
                                    <Input
                                        id="hours"
                                        value={formData.hours}
                                        onChange={(e) => handleChange('hours', e.target.value)}
                                        placeholder="Lun-Vie 9:00-18:00"
                                    />
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end gap-3 pt-4">
                                <Link href="/dashboard/provider">
                                    <Button type="button" variant="outline">
                                        Cancelar
                                    </Button>
                                </Link>
                                <Button type="submit">
                                    <Save className="mr-2 h-4 w-4" />
                                    Guardar Cambios
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </main>
        </div>
    )
}
