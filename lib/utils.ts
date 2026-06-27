import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/** Initials from a full name, e.g. "María López" -> "ML" */
export function getInitials(name: string): string {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? '')
        .join('')
}

/** Format a number as euros, e.g. 65 -> "65 €", 0 -> "Gratis" */
export function formatPrice(amount: number): string {
    if (amount === 0) return 'Gratis'
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0,
    }).format(amount)
}

/** Human-readable label for a price range tier */
export function priceRangeLabel(range: string): string {
    const labels: Record<string, string> = {
        $: 'Económico',
        $$: 'Moderado',
        $$$: 'Premium',
        $$$$: 'Exclusivo',
    }
    return labels[range] ?? range
}

/** Relative time in Spanish, e.g. "hace 3 días" */
export function timeAgo(dateInput: string | Date): string {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
    const intervals: [number, string, string][] = [
        [31536000, 'año', 'años'],
        [2592000, 'mes', 'meses'],
        [604800, 'semana', 'semanas'],
        [86400, 'día', 'días'],
        [3600, 'hora', 'horas'],
        [60, 'minuto', 'minutos'],
    ]
    for (const [secs, singular, plural] of intervals) {
        const count = Math.floor(seconds / secs)
        if (count >= 1) {
            return `hace ${count} ${count === 1 ? singular : plural}`
        }
    }
    return 'hace un momento'
}

/** Add crop/quality params to Unsplash URLs for crisp, fast images. */
export function optimizeImage(url: string, width = 800): string {
    if (!url.includes('images.unsplash.com')) return url
    if (url.includes('?')) return url
    return `${url}?auto=format&fit=crop&w=${width}&q=80`
}

/** Deterministic gradient class for a category badge / avatar fallback */
export function categoryAccent(seed: string): string {
    const palettes = [
        'from-indigo-500 to-violet-500',
        'from-violet-500 to-fuchsia-500',
        'from-sky-500 to-indigo-500',
        'from-amber-500 to-orange-500',
        'from-emerald-500 to-teal-500',
        'from-rose-500 to-pink-500',
        'from-cyan-500 to-blue-500',
        'from-fuchsia-500 to-purple-500',
    ]
    let hash = 0
    for (let i = 0; i < seed.length; i++) {
        hash = (hash << 5) - hash + seed.charCodeAt(i)
        hash |= 0
    }
    return palettes[Math.abs(hash) % palettes.length] as string
}
