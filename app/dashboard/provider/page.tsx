'use client'

import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { LayoutDashboard, User, Image, BarChart3, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { providers } from '@/lib/mock-data/providers'
import { reviewsStore } from '@/lib/mock-data/reviews-store'

export default function ProviderDashboardPage() {
    const { user, isAuthenticated } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isAuthenticated || user?.role !== 'provider') {
            router.push('/')
        }
    }, [isAuthenticated, user, router])

    if (!isAuthenticated || user?.role !== 'provider') {
        return null
    }

    // Get provider data
    const provider = providers.find((p) => p.id === user.providerId)
    const reviews = provider ? reviewsStore.getByProviderId(provider.id) : []

    // Calculate stats
    const totalReviews = reviews.length
    const avgRating = provider?.avgRating || 0
    const totalPhotos = provider?.photos.length || 0

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="border-b border-slate-200 bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <Link href="/">
                                <Button variant="ghost" size="sm" className="mb-2">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Volver al Marketplace
                                </Button>
                            </Link>
                            <h1 className="font-display text-3xl font-bold text-slate-900">
                                Dashboard del Proveedor
                            </h1>
                            <p className="mt-1 text-sm text-slate-600">
                                Gestiona tu perfil y servicios
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Welcome */}
                <div className="mb-8 rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 p-6 text-white">
                    <h2 className="text-2xl font-bold">¡Bienvenido, {user.name}!</h2>
                    <p className="mt-2 text-primary-100">
                        {provider ? `Tu perfil "${provider.name}" está activo` : 'Configura tu perfil para empezar'}
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Rating Promedio</CardTitle>
                            <BarChart3 className="h-4 w-4 text-slate-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{avgRating.toFixed(1)} ⭐</div>
                            <p className="text-xs text-slate-600">De {totalReviews} reviews</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
                            <User className="h-4 w-4 text-slate-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalReviews}</div>
                            <p className="text-xs text-slate-600">Opiniones de clientes</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Fotos</CardTitle>
                            <Image className="h-4 w-4 text-slate-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalPhotos}</div>
                            <p className="text-xs text-slate-600">En tu galería</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Visibilidad</CardTitle>
                            <LayoutDashboard className="h-4 w-4 text-slate-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">Activo</div>
                            <p className="text-xs text-slate-600">Perfil público</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <div className="mb-8">
                    <h2 className="mb-4 text-xl font-bold text-slate-900">Acciones Rápidas</h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <Link href="/dashboard/provider/profile">
                            <Card className="cursor-pointer transition-shadow hover:shadow-lg">
                                <CardContent className="flex items-center gap-4 p-6">
                                    <div className="rounded-lg bg-primary-100 p-3">
                                        <User className="h-6 w-6 text-primary-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">Editar Perfil</h3>
                                        <p className="text-sm text-slate-600">Actualiza tu información</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>

                        <Link href="/dashboard/provider/photos">
                            <Card className="cursor-pointer transition-shadow hover:shadow-lg">
                                <CardContent className="flex items-center gap-4 p-6">
                                    <div className="rounded-lg bg-blue-100 p-3">
                                        <Image className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">Gestionar Fotos</h3>
                                        <p className="text-sm text-slate-600">Añade o elimina imágenes</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>

                        <Link href={`/providers/${user.providerId}`}>
                            <Card className="cursor-pointer transition-shadow hover:shadow-lg">
                                <CardContent className="flex items-center gap-4 p-6">
                                    <div className="rounded-lg bg-green-100 p-3">
                                        <LayoutDashboard className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">Ver Perfil Público</h3>
                                        <p className="text-sm text-slate-600">Como lo ven los clientes</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>
                </div>

                {/* Recent Reviews */}
                <div>
                    <h2 className="mb-4 text-xl font-bold text-slate-900">Reviews Recientes</h2>
                    <Card>
                        <CardContent className="p-6">
                            {reviews.length > 0 ? (
                                <div className="space-y-4">
                                    {reviews.slice(0, 5).map((review) => (
                                        <div key={review.id} className="border-b border-slate-200 pb-4 last:border-0">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <p className="font-medium text-slate-900">{review.userName}</p>
                                                    <div className="mt-1 flex items-center gap-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-slate-300'}>
                                                                ⭐
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <p className="mt-2 text-sm text-slate-600">{review.comment}</p>
                                                </div>
                                                <span className="text-xs text-slate-500">
                                                    {new Date(review.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-slate-600">No hay reviews aún</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}
