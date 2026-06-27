'use client'

import { useEffect, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    children: ReactNode
    className?: string
    /** max width tailwind class, e.g. 'max-w-md' */
    size?: string
}

export function Modal({
    isOpen,
    onClose,
    children,
    className,
    size = 'max-w-md',
}: ModalProps) {
    useEffect(() => {
        if (!isOpen) return
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', onKey)
        document.body.style.overflow = 'hidden'
        return () => {
            document.removeEventListener('keydown', onKey)
            document.body.style.overflow = ''
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 z-[70] flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm animate-fade-in sm:items-center sm:p-4"
            onMouseDown={onClose}
            role="dialog"
            aria-modal="true"
        >
            <div
                className={cn(
                    'max-h-[92vh] w-full overflow-y-auto rounded-t-3xl border border-border bg-surface shadow-lifted animate-fade-up scrollbar-thin sm:rounded-3xl',
                    size,
                    className
                )}
                onMouseDown={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    )
}

export function ModalHeader({
    title,
    description,
    onClose,
}: {
    title: string
    description?: string
    onClose: () => void
}) {
    return (
        <div className="flex items-start justify-between gap-4 border-b border-border p-5 sm:p-6">
            <div>
                <h2 className="font-display text-xl font-bold text-foreground">{title}</h2>
                {description && (
                    <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                )}
            </div>
            <button
                onClick={onClose}
                className="-mr-1 -mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Cerrar"
            >
                <X className="h-5 w-5" />
            </button>
        </div>
    )
}
