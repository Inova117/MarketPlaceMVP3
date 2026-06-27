'use client'

import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Save } from 'lucide-react'
import { DashboardShell } from '@/components/layout/dashboard-shell'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/toast'
import { providers } from '@/lib/mock-data/providers'
import { categories } from '@/lib/mock-data/categories'

function Field({
    label,
    htmlFor,
    required,
    children,
}: {
    label: string
    htmlFor: string
    required?: boolean
    children: React.ReactNode
}) {
    return (
        <div>
            <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold text-foreground">
                {label} {required && <span className="text-danger">*</span>}
            </label>
            {children}
        </div>
    )
}

export default function ProviderProfilePage() {
    const { user, isAuthenticated } = useAuth()
    const router = useRouter()
    const { toast } = useToast()
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
        hours: 'Lun-Vie 09:00 - 18:00',
    })

    useEffect(() => {
        if (!isAuthenticated || user?.role !== 'provider') router.push('/')
    }, [isAuthenticated, user, router])

    if (!isAuthenticated || user?.role !== 'provider') return null

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        toast({
            variant: 'success',
            title: 'Perfil actualizado',
            description: 'En la demo los cambios no se guardan permanentemente.',
        })
    }

    const set = (field: string, value: string) =>
        setFormData((prev) => ({ ...prev, [field]: value }))

    return (
        <DashboardShell
            title="Editar perfil"
            description="Actualiza la información que ven tus clientes."
        >
            <form onSubmit={handleSubmit}>
                <div className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-card">
                    <Field label="Nombre del negocio" htmlFor="name" required>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => set('name', e.target.value)}
                            placeholder="Ej: Plomería García"
                            required
                        />
                    </Field>

                    <Field label="Categoría" htmlFor="category" required>
                        <Select
                            id="category"
                            value={formData.category}
                            onChange={(e) => set('category', e.target.value)}
                            required
                        >
                            <option value="">Selecciona una categoría</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </Select>
                    </Field>

                    <Field label="Descripción" htmlFor="description">
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => set('description', e.target.value)}
                            rows={4}
                            placeholder="Describe tus servicios, experiencia y lo que te hace diferente…"
                        />
                    </Field>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Teléfono" htmlFor="phone" required>
                            <Input
                                id="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => set('phone', e.target.value)}
                                placeholder="+34 600 123 456"
                                required
                            />
                        </Field>
                        <Field label="WhatsApp" htmlFor="whatsapp">
                            <Input
                                id="whatsapp"
                                type="tel"
                                value={formData.whatsapp}
                                onChange={(e) => set('whatsapp', e.target.value)}
                                placeholder="+34 600 123 456"
                            />
                        </Field>
                    </div>

                    <Field label="Email" htmlFor="email" required>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => set('email', e.target.value)}
                            placeholder="contacto@ejemplo.com"
                            required
                        />
                    </Field>

                    <Field label="Dirección" htmlFor="address" required>
                        <Input
                            id="address"
                            value={formData.address}
                            onChange={(e) => set('address', e.target.value)}
                            placeholder="Calle Principal 123, Madrid"
                            required
                        />
                    </Field>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Rango de precios" htmlFor="priceRange">
                            <Select
                                id="priceRange"
                                value={formData.priceRange}
                                onChange={(e) => set('priceRange', e.target.value)}
                            >
                                <option value="">Selecciona</option>
                                <option value="$">$ · Económico</option>
                                <option value="$$">$$ · Moderado</option>
                                <option value="$$$">$$$ · Premium</option>
                                <option value="$$$$">$$$$ · Exclusivo</option>
                            </Select>
                        </Field>
                        <Field label="Horario" htmlFor="hours">
                            <Input
                                id="hours"
                                value={formData.hours}
                                onChange={(e) => set('hours', e.target.value)}
                                placeholder="Lun-Vie 9:00-18:00"
                            />
                        </Field>
                    </div>

                    <div className="flex justify-end gap-3 border-t border-border pt-5">
                        <Link href="/dashboard/provider">
                            <Button type="button" variant="outline">
                                Cancelar
                            </Button>
                        </Link>
                        <Button type="submit">
                            <Save className="h-4 w-4" />
                            Guardar cambios
                        </Button>
                    </div>
                </div>
            </form>
        </DashboardShell>
    )
}
