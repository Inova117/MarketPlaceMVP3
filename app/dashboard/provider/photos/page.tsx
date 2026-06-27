'use client'

import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Plus, X, ImagePlus } from 'lucide-react'
import { DashboardShell } from '@/components/layout/dashboard-shell'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/toast'
import { providers } from '@/lib/mock-data/providers'

export default function ProviderPhotosPage() {
    const { user, isAuthenticated } = useAuth()
    const router = useRouter()
    const { toast } = useToast()
    const [provider] = useState(() =>
        providers.find((p) => p.id === user?.providerId)
    )
    const [photos, setPhotos] = useState<string[]>(provider?.photos || [])
    const [newPhotoUrl, setNewPhotoUrl] = useState('')

    useEffect(() => {
        if (!isAuthenticated || user?.role !== 'provider') router.push('/')
    }, [isAuthenticated, user, router])

    if (!isAuthenticated || user?.role !== 'provider') return null

    const handleAdd = () => {
        const url = newPhotoUrl.trim()
        if (!url) return
        setPhotos((prev) => [...prev, url])
        setNewPhotoUrl('')
        toast({ variant: 'success', title: 'Foto añadida' })
    }

    const handleRemove = (index: number) => {
        setPhotos((prev) => prev.filter((_, i) => i !== index))
        toast({ variant: 'info', title: 'Foto eliminada' })
    }

    return (
        <DashboardShell
            title="Gestionar fotos"
            description="Las imágenes de calidad atraen hasta 3× más clientes."
        >
            {/* Add */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
                <label htmlFor="photo-url" className="mb-2 block text-sm font-semibold text-foreground">
                    Añadir nueva foto
                </label>
                <div className="flex flex-col gap-2.5 sm:flex-row">
                    <Input
                        id="photo-url"
                        value={newPhotoUrl}
                        onChange={(e) => setNewPhotoUrl(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAdd())}
                        placeholder="https://ejemplo.com/foto.jpg"
                        className="flex-1"
                    />
                    <Button onClick={handleAdd} className="shrink-0">
                        <Plus className="h-4 w-4" />
                        Añadir foto
                    </Button>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                    Pega la URL de una imagen de tus trabajos.
                </p>
            </div>

            {/* Grid */}
            <h3 className="mb-4 mt-8 font-display text-lg font-bold text-foreground">
                Galería · {photos.length} {photos.length === 1 ? 'foto' : 'fotos'}
            </h3>
            {photos.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {photos.map((photo, index) => (
                        <div
                            key={index}
                            className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-muted"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={photo}
                                alt={`Foto ${index + 1}`}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <button
                                onClick={() => handleRemove(index)}
                                className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-danger text-white opacity-0 shadow-md transition-opacity hover:brightness-110 group-hover:opacity-100"
                                aria-label="Eliminar foto"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface py-16 text-center">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-muted">
                        <ImagePlus className="h-7 w-7 text-muted-foreground" />
                    </div>
                    <p className="mt-4 font-semibold text-foreground">Aún no hay fotos</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Añade fotos de tus trabajos para destacar.
                    </p>
                </div>
            )}
        </DashboardShell>
    )
}
