import * as React from 'react'
import { cn, getInitials, categoryAccent } from '@/lib/utils'

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    name: string
    src?: string | undefined
    size?: 'sm' | 'md' | 'lg'
}

const sizes = {
    sm: 'h-9 w-9 text-xs',
    md: 'h-11 w-11 text-sm',
    lg: 'h-14 w-14 text-base',
}

export function Avatar({ name, src, size = 'md', className, ...props }: AvatarProps) {
    return (
        <div
            className={cn(
                'relative flex shrink-0 items-center justify-center overflow-hidden rounded-full font-semibold text-white ring-2 ring-surface',
                !src && `bg-gradient-to-br ${categoryAccent(name)}`,
                sizes[size],
                className
            )}
            {...props}
        >
            {src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={src} alt={name} className="h-full w-full object-cover" />
            ) : (
                <span>{getInitials(name)}</span>
            )}
        </div>
    )
}
