'use client'

import { useEffect, useState } from 'react'
import { Clock, MapPin, ShieldCheck, Award, Zap } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { isOpenNow } from '@/lib/geo-utils'
import { priceRangeLabel } from '@/lib/utils'
import type { Provider } from '@/lib/types'

const DAYS: { key: string; label: string }[] = [
    { key: 'monday', label: 'Lunes' },
    { key: 'tuesday', label: 'Martes' },
    { key: 'wednesday', label: 'Miércoles' },
    { key: 'thursday', label: 'Jueves' },
    { key: 'friday', label: 'Viernes' },
    { key: 'saturday', label: 'Sábado' },
    { key: 'sunday', label: 'Domingo' },
]

const JS_DAY_TO_KEY = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
]

export function AboutSection({ provider }: { provider: Provider }) {
    const highlights = [
        { icon: ShieldCheck, label: 'Perfil verificado' },
        { icon: Award, label: `${provider.reviewCount} reseñas` },
        { icon: Zap, label: 'Responde rápido' },
    ]

    return (
        <section>
            <h2 className="font-display text-xl font-bold text-foreground">Acerca de</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
                {provider.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
                {highlights.map(({ icon: Icon, label }) => (
                    <span
                        key={label}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-medium text-foreground"
                    >
                        <Icon className="h-4 w-4 text-primary-600" />
                        {label}
                    </span>
                ))}
            </div>
        </section>
    )
}

export function OpeningHours({ provider }: { provider: Provider }) {
    const [todayKey, setTodayKey] = useState<string | null>(null)
    const open = useOpenNow(provider)

    useEffect(() => {
        setTodayKey(JS_DAY_TO_KEY[new Date().getDay()] as string)
    }, [])

    if (!provider.hours) return null

    return (
        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary-600" />
                    <h3 className="font-display text-sm font-bold text-foreground">Horario</h3>
                </div>
                <Badge variant={open ? 'success' : 'default'}>
                    {open ? 'Abierto ahora' : 'Cerrado'}
                </Badge>
            </div>
            <dl className="space-y-1.5 text-sm">
                {DAYS.map(({ key, label }) => {
                    const hours = provider.hours?.[key]
                    const isToday = key === todayKey
                    return (
                        <div
                            key={key}
                            className={
                                'flex items-center justify-between rounded-lg px-2 py-1 ' +
                                (isToday ? 'bg-primary-50 dark:bg-primary-950/40' : '')
                            }
                        >
                            <dt
                                className={
                                    isToday
                                        ? 'font-semibold text-primary-700 dark:text-primary-300'
                                        : 'text-muted-foreground'
                                }
                            >
                                {label}
                                {isToday && ' · hoy'}
                            </dt>
                            <dd
                                className={
                                    hours
                                        ? 'font-medium text-foreground'
                                        : 'text-muted-foreground'
                                }
                            >
                                {hours ? `${hours.open} – ${hours.close}` : 'Cerrado'}
                            </dd>
                        </div>
                    )
                })}
            </dl>
        </div>
    )
}

export function LocationCard({ provider }: { provider: Provider }) {
    return (
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
            <div className="relative h-36 bg-[#eaedf5] dark:bg-[#0e1018]">
                <div
                    className="absolute inset-0 opacity-60 dark:opacity-20"
                    style={{
                        backgroundImage:
                            'linear-gradient(to right, rgba(120,130,160,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(120,130,160,0.3) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                    }}
                />
                <div className="absolute -left-10 top-10 h-2 w-[160%] -rotate-12 bg-white/70 dark:bg-white/5" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
                    <MapPin className="h-8 w-8 fill-primary-600 text-white drop-shadow" strokeWidth={1.5} />
                </div>
            </div>
            <div className="p-5">
                <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary-600" />
                    <h3 className="font-display text-sm font-bold text-foreground">Ubicación</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{provider.address}</p>
                <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-sm">
                    <span className="text-muted-foreground">Rango de precio</span>
                    <span className="font-semibold text-foreground">
                        {provider.priceRange} · {priceRangeLabel(provider.priceRange)}
                    </span>
                </div>
            </div>
        </div>
    )
}

// Re-evaluate "open now" on the client only (avoids hydration mismatch)
function useOpenNow(provider: Provider): boolean {
    const [open, setOpen] = useState(false)
    useEffect(() => {
        setOpen(isOpenNow(provider.hours))
    }, [provider])
    return open
}
