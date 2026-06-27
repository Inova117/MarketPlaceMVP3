'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    LayoutDashboard,
    UserCog,
    Images,
    Wrench,
    CalendarCheck,
    ExternalLink,
    ArrowLeft,
} from 'lucide-react'
import { Navbar } from './navbar'
import { useAuth } from '@/contexts/auth-context'
import { cn } from '@/lib/utils'

const NAV = [
    { href: '/dashboard/provider', label: 'Resumen', icon: LayoutDashboard, exact: true },
    { href: '/dashboard/provider/profile', label: 'Perfil', icon: UserCog },
    { href: '/dashboard/provider/photos', label: 'Fotos', icon: Images },
    { href: '/dashboard/provider/services', label: 'Servicios', icon: Wrench },
    { href: '/dashboard/provider/bookings', label: 'Reservas', icon: CalendarCheck },
]

interface DashboardShellProps {
    title: string
    description?: string
    actions?: React.ReactNode
    children: React.ReactNode
}

export function DashboardShell({
    title,
    description,
    actions,
    children,
}: DashboardShellProps) {
    const pathname = usePathname()
    const { user } = useAuth()

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="container py-8">
                <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
                    {/* Sidebar nav */}
                    <aside className="lg:sticky lg:top-20 lg:h-fit">
                        <Link
                            href="/"
                            className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Volver al marketplace
                        </Link>
                        <nav className="space-y-1 rounded-2xl border border-border bg-card p-2 shadow-card">
                            {NAV.map(({ href, label, icon: Icon, exact }) => {
                                const active = exact
                                    ? pathname === href
                                    : pathname.startsWith(href)
                                return (
                                    <Link
                                        key={href}
                                        href={href}
                                        className={cn(
                                            'flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                                            active
                                                ? 'bg-primary-600 text-white shadow-soft'
                                                : 'text-foreground hover:bg-muted'
                                        )}
                                    >
                                        <Icon className="h-[18px] w-[18px]" />
                                        {label}
                                    </Link>
                                )
                            })}
                            {user?.providerId && (
                                <Link
                                    href={`/providers/${user.providerId}`}
                                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                >
                                    <ExternalLink className="h-[18px] w-[18px]" />
                                    Ver perfil público
                                </Link>
                            )}
                        </nav>
                    </aside>

                    {/* Content */}
                    <div>
                        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
                            <div>
                                <h1 className="font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                                    {title}
                                </h1>
                                {description && (
                                    <p className="mt-1 text-muted-foreground">{description}</p>
                                )}
                            </div>
                            {actions}
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
