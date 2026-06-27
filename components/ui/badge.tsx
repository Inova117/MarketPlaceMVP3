import * as React from 'react'
import { cn } from '@/lib/utils'

export type BadgeVariant =
    | 'default'
    | 'primary'
    | 'accent'
    | 'success'
    | 'warning'
    | 'danger'
    | 'outline'

const variants: Record<BadgeVariant, string> = {
    default: 'bg-muted text-muted-foreground',
    primary: 'bg-primary-100 text-primary-700 dark:bg-primary-950 dark:text-primary-300',
    accent: 'bg-accent-100 text-accent-700 dark:bg-accent-900/40 dark:text-accent-300',
    success: 'bg-success-subtle text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300',
    warning: 'bg-warning-subtle text-amber-700 dark:bg-amber-950/50 dark:text-amber-300',
    danger: 'bg-danger-subtle text-red-700 dark:bg-red-950/50 dark:text-red-300',
    outline: 'border border-border text-foreground',
}

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold',
                variants[variant],
                className
            )}
            {...props}
        />
    )
}
