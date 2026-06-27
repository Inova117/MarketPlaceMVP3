import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Logo({
    className,
    showWordmark = true,
}: {
    className?: string
    showWordmark?: boolean
}) {
    return (
        <Link
            href="/"
            className={cn('group inline-flex items-center gap-2.5', className)}
            aria-label="Cerca — inicio"
        >
            <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-brand-gradient text-white shadow-glow transition-transform duration-300 group-hover:scale-105">
                <MapPin className="h-5 w-5" fill="currentColor" strokeWidth={1.5} />
            </span>
            {showWordmark && (
                <span className="flex flex-col leading-none">
                    <span className="font-display text-lg font-extrabold tracking-tight text-foreground">
                        Cerca
                    </span>
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                        Marketplace local
                    </span>
                </span>
            )}
        </Link>
    )
}
