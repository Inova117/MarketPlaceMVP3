'use client'

import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RatingProps {
    value: number
    /** Number of stars; defaults to 5 */
    max?: number
    size?: 'sm' | 'md' | 'lg'
    className?: string
    /** When set, renders interactive buttons */
    onChange?: (value: number) => void
    onHover?: (value: number) => void
}

const sizeMap = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
}

/** Read-only star rating with half-star precision via overlay. */
export function Rating({ value, max = 5, size = 'md', className }: RatingProps) {
    return (
        <div className={cn('inline-flex items-center', className)} aria-label={`${value} de ${max}`}>
            {Array.from({ length: max }).map((_, i) => {
                const fill = Math.max(0, Math.min(1, value - i))
                return (
                    <span key={i} className="relative">
                        <Star className={cn(sizeMap[size], 'text-border')} />
                        <span
                            className="absolute inset-0 overflow-hidden"
                            style={{ width: `${fill * 100}%` }}
                        >
                            <Star className={cn(sizeMap[size], 'fill-accent-400 text-accent-400')} />
                        </span>
                    </span>
                )
            })}
        </div>
    )
}

interface StarInputProps {
    value: number
    hovered: number
    onChange: (value: number) => void
    onHover: (value: number) => void
}

/** Interactive 1–5 star input. */
export function StarInput({ value, hovered, onChange, onHover }: StarInputProps) {
    return (
        <div className="flex gap-1.5" onMouseLeave={() => onHover(0)}>
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => onChange(star)}
                    onMouseEnter={() => onHover(star)}
                    className="rounded-md transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40"
                    aria-label={`${star} estrella${star > 1 ? 's' : ''}`}
                >
                    <Star
                        className={cn(
                            'h-9 w-9 transition-colors',
                            star <= (hovered || value)
                                ? 'fill-accent-400 text-accent-400'
                                : 'text-border'
                        )}
                    />
                </button>
            ))}
        </div>
    )
}
