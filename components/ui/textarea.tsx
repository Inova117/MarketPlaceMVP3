import * as React from 'react'
import { cn } from '@/lib/utils'

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                ref={ref}
                className={cn(
                    'flex w-full rounded-xl border border-input bg-surface px-3.5 py-2.5 text-sm text-foreground shadow-xs transition-colors',
                    'placeholder:text-muted-foreground',
                    'focus-visible:border-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/30',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    className
                )}
                {...props}
            />
        )
    }
)
Textarea.displayName = 'Textarea'

export { Textarea }
