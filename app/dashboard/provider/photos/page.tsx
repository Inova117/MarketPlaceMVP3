'use client'

import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { providers } from '@/lib/mock-data/providers'

export default function ProviderPhotosPage() {
    const { user, isAuthenticated } = useAuth()
    const router = useRouter()

    const [provider] = useState(() =>
        providers.find((p) => p.id === user?.providerId)
    )

    const [photos, setPhotos] = useState<string[]>(provider?.photos || [])
    const [newPhotoUrl, setNewPhotoUrl] = useState('')

    useEffect(() => {
        if (!isAuthenticated || user?.role !== 'provider') {
            router.push('/')
        }
    }, [isAuthenticated, user, router])

    if (!isAuthenticated || user?.role !== 'provider') {
        return null
    }

    const handleAddPhoto = () => {
        if (newPhotoUrl.trim()) {
            setPhotos([...photos, newPhotoUrl])
            setNewPhotoUrl('')
            alert('Foto añadida! (Demo - cambios no se guardan)')
        }
    }

    const handleRemovePhoto = (index: number) => {
        setPhotos(photos.filter((_, i) => i !== index))
        alert('Foto eliminada! (Demo - cambios no se guardan)')
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
                        Gestionar Fotos
                    </h1>
                    <p className="mt-1 text-sm text-slate-600">
                        Añade o elimina fotos de tu galería
                    </p>
                </div>
            </header>

            {/* Main Content */}
            <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Add Photo */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Añadir Nueva Foto</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-2">
                            <Input
                                value={newPhotoUrl}
                                onChange={(e) => setNewPhotoUrl(e.target.value)}
                                placeholder="https://ejemplo.com/foto.jpg"
                                className="flex-1"
                            />
                            <Button onClick={handleAddPhoto}>
                                <Upload className="mr-2 h-4 w-4" />
                                Añadir
                            </Button>
                        </div>
                        <p className="mt-2 text-xs text-slate-600">
                            Pega la URL de una imagen de tus trabajos
                        </p>
                    </CardContent>
                </Card>

                {/* Photo Grid */}
                <Card>
                    <CardHeader>
                        <CardTitle>Galería ({photos.length} fotos)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {photos.length > 0 ? (
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {photos.map((photo, index) => (
                                    <div key={index} className="group relative aspect-square overflow-hidden rounded-lg">
                                        <img
                                            src={photo}
                                            alt={`Foto ${index + 1}`}
                                            className="h-full w-full object-cover"
                                        />
                                        <button
                                            onClick={() => handleRemovePhoto(index)}
                                            className="absolute right-2 top-2 rounded-full bg-red-600 p-2 text-white opacity-0 transition-opacity hover:bg-red-700 group-hover:opacity-100"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-12 text-center">
                                <Upload className="mx-auto h-12 w-12 text-slate-400" />
                                <p className="mt-4 text-slate-600">No hay fotos aún</p>
                                <p className="text-sm text-slate-500">Añade fotos de tus trabajos para atraer más clientes</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
