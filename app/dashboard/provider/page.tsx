'use client'

import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import {
    Star,
    MessageSquare,
    Images,
    Wrench,
    CalendarCheck,
    UserCog,
    TrendingUp,
    ChevronRight,
} from 'lucide-react'
import { DashboardShell } from '@/components/layout/dashboard-shell'
import { Rating } from '@/components/ui/rating'
import { Avatar } from '@/components/ui/avatar'
import { providers } from '@/lib/mock-data/providers'
import { reviewsStore } from '@/lib/mock-data/reviews-store'
import { timeAgo } from '@/lib/utils'

const STAT_CONFIG = [
    { key: 'rating', label: 'Valoración media', icon: Star, tile: 'bg-accent-100 text-accent-600 dark:bg-accent-900/40' },
    { key: 'reviews', label: 'Reseñas totales', icon: MessageSquare, tile: 'bg-primary-100 text-primary-600 dark:bg-primary-950' },
    { key: 'photos', label: 'Fotos en galería', icon: Images, tile: 'bg-violet-100 text-violet-600 dark:bg-violet-950/50' },
    { key: 'status', label: 'Estado del perfil', icon: TrendingUp, tile: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50' },
] as const

const QUICK_ACTIONS = [
    { href: '/dashboard/provider/profile', label: 'Editar perfil', desc: 'Actualiza tu información', icon: UserCog },
    { href: '/dashboard/provider/photos', label: 'Gestionar fotos', desc: 'Añade o elimina imágenes', icon: Images },
    { href: '/dashboard/provider/services', label: 'Mis servicios', desc: 'Define qué ofreces', icon: Wrench },
    { href: '/dashboard/provider/bookings', label: 'Reservas', desc: 'Gestiona tus citas', icon: CalendarCheck },
]

export default function ProviderDashboardPage() {
    const { user, isAuthenticated } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isAuthenticated || user?.role !== 'provider') router.push('/')
    }, [isAuthenticated, user, router])

    if (!isAuthenticated || user?.role !== 'provider') return null

    const provider = providers.find((p) => p.id === user.providerId)
    const reviews = provider ? reviewsStore.getByProviderId(provider.id) : []

    const stats: Record<string, { value: string; sub: string }> = {
        rating: { value: (provider?.avgRating ?? 0).toFixed(1), sub: `${reviews.length} reseñas` },
        reviews: { value: String(reviews.length), sub: 'Opiniones de clientes' },
        photos: { value: String(provider?.photos.length ?? 0), sub: 'Visibles para clientes' },
        status: { value: 'Activo', sub: 'Perfil público' },
    }

    return (
        <DashboardShell
            title={`Hola, ${user.name.split(' ')[0]} 👋`}
            description={
                provider
                    ? `Tu perfil "${provider.name}" está activo y visible.`
                    : 'Configura tu perfil para empezar a recibir clientes.'
            }
        >
            {/* Hero banner */}
            <div className="mb-6 overflow-hidden rounded-2xl bg-brand-gradient p-6 text-white shadow-glow sm:p-8">
                <p className="text-sm font-medium text-white/80">Resumen de actividad</p>
                <h2 className="mt-1 font-display text-2xl font-bold">
                    {reviews.length > 0
                        ? `${reviews.length} clientes ya han opinado sobre ti`
                        : 'Empieza a destacar entre la competencia'}
                </h2>
                <p className="mt-1.5 max-w-lg text-white/80">
                    Mantén tu perfil actualizado, sube fotos de calidad y responde a las
                    reservas rápido para aparecer más arriba en los resultados.
                </p>
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {STAT_CONFIG.map(({ key, label, icon: Icon, tile }) => (
                    <div
                        key={key}
                        className="rounded-2xl border border-border bg-card p-5 shadow-card"
                    >
                        <div className={`grid h-10 w-10 place-items-center rounded-xl ${tile}`}>
                            <Icon className="h-5 w-5" />
                        </div>
                        <p className="mt-3 font-display text-2xl font-extrabold text-foreground">
                            {stats[key]?.value}
                        </p>
                        <p className="text-sm font-medium text-foreground">{label}</p>
                        <p className="text-xs text-muted-foreground">{stats[key]?.sub}</p>
                    </div>
                ))}
            </div>

            {/* Quick actions */}
            <h3 className="mb-4 mt-8 font-display text-lg font-bold text-foreground">
                Acciones rápidas
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
                {QUICK_ACTIONS.map(({ href, label, desc, icon: Icon }) => (
                    <Link
                        key={href}
                        href={href}
                        className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-lifted"
                    >
                        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white dark:bg-primary-950">
                            <Icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="font-semibold text-foreground">{label}</p>
                            <p className="text-sm text-muted-foreground">{desc}</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                    </Link>
                ))}
            </div>

            {/* Recent reviews */}
            <h3 className="mb-4 mt-8 font-display text-lg font-bold text-foreground">
                Reseñas recientes
            </h3>
            <div className="rounded-2xl border border-border bg-card shadow-card">
                {reviews.length > 0 ? (
                    <ul className="divide-y divide-border">
                        {reviews.slice(0, 5).map((review) => (
                            <li key={review.id} className="flex items-start gap-3 p-5">
                                <Avatar name={review.userName} size="sm" />
                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <p className="font-semibold text-foreground">
                                            {review.userName}
                                        </p>
                                        <span className="text-xs text-muted-foreground">
                                            {timeAgo(review.createdAt)}
                                        </span>
                                    </div>
                                    <Rating value={review.rating} size="sm" className="mt-0.5" />
                                    <p className="mt-1.5 text-sm text-muted-foreground">
                                        {review.comment}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="p-10 text-center text-muted-foreground">
                        Aún no has recibido reseñas.
                    </div>
                )}
            </div>
        </DashboardShell>
    )
}
