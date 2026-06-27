import * as React from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ButtonVariant =
    | 'default'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'accent'
    | 'destructive'
    | 'link'

export type ButtonSize = 'default' | 'sm' | 'lg' | 'xl' | 'icon'

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
    size?: ButtonSize
    loading?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
    default:
        'bg-primary-600 text-white shadow-soft hover:bg-primary-700 hover:shadow-glow active:scale-[0.98]',
    secondary:
        'bg-muted text-foreground hover:bg-border active:scale-[0.98]',
    outline:
        'border border-border bg-surface text-foreground hover:border-primary-300 hover:bg-primary-50/60 active:scale-[0.98] dark:hover:bg-primary-950/40',
    ghost: 'text-foreground hover:bg-muted active:scale-[0.98]',
    accent: 'bg-accent-500 text-white shadow-soft hover:bg-accent-600 hover:shadow-glow-accent active:scale-[0.98]',
    destructive:
        'bg-danger text-white shadow-soft hover:brightness-110 active:scale-[0.98]',
    link: 'text-primary-600 underline-offset-4 hover:underline',
}

const sizeClasses: Record<ButtonSize, string> = {
    default: 'h-10 px-4 text-sm gap-2',
    sm: 'h-8 px-3 text-sm gap-1.5',
    lg: 'h-11 px-6 text-[15px] gap-2',
    xl: 'h-12 px-8 text-base gap-2.5',
    icon: 'h-10 w-10',
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = 'default',
            size = 'default',
            loading = false,
            disabled,
            children,
            ...props
        },
        ref
    ) => {
        return (
            <button
                className={cn(
                    'inline-flex select-none items-center justify-center whitespace-nowrap rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
                    variantClasses[variant],
                    sizeClasses[size],
                    className
                )}
                ref={ref}
                disabled={disabled || loading}
                {...props}
            >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {children}
            </button>
        )
    }
)
Button.displayName = 'Button'

export { Button }
