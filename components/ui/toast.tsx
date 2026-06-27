'use client'

import {
    createContext,
    useCallback,
    useContext,
    useState,
    type ReactNode,
} from 'react'
import { CheckCircle2, AlertCircle, Info, X, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

type ToastVariant = 'success' | 'error' | 'info' | 'warning'

interface Toast {
    id: number
    title: string
    description?: string | undefined
    variant: ToastVariant
}

interface ToastInput {
    title: string
    description?: string | undefined
    variant?: ToastVariant
    duration?: number
}

interface ToastContextValue {
    toast: (input: ToastInput) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

const config: Record<
    ToastVariant,
    { icon: typeof CheckCircle2; accent: string; ring: string }
> = {
    success: { icon: CheckCircle2, accent: 'text-emerald-500', ring: 'ring-emerald-500/20' },
    error: { icon: AlertCircle, accent: 'text-red-500', ring: 'ring-red-500/20' },
    warning: { icon: AlertTriangle, accent: 'text-amber-500', ring: 'ring-amber-500/20' },
    info: { icon: Info, accent: 'text-primary-500', ring: 'ring-primary-500/20' },
}

let idCounter = 0

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([])

    const dismiss = useCallback((id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
    }, [])

    const toast = useCallback(
        ({ title, description, variant = 'info', duration = 4000 }: ToastInput) => {
            const id = ++idCounter
            setToasts((prev) => [...prev, { id, title, description, variant }])
            window.setTimeout(() => dismiss(id), duration)
        },
        [dismiss]
    )

    return (
        <ToastContext.Provider value={{ toast }}>
            {children}
            <div className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-2.5">
                {toasts.map((t) => {
                    const { icon: Icon, accent, ring } = config[t.variant]
                    return (
                        <div
                            key={t.id}
                            role="status"
                            className={cn(
                                'pointer-events-auto flex animate-slide-in-right items-start gap-3 rounded-2xl border border-border bg-surface p-4 shadow-lifted ring-1',
                                ring
                            )}
                        >
                            <Icon className={cn('mt-0.5 h-5 w-5 shrink-0', accent)} />
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-semibold text-foreground">{t.title}</p>
                                {t.description && (
                                    <p className="mt-0.5 text-sm text-muted-foreground">
                                        {t.description}
                                    </p>
                                )}
                            </div>
                            <button
                                onClick={() => dismiss(t.id)}
                                className="rounded-md p-0.5 text-muted-foreground transition-colors hover:text-foreground"
                                aria-label="Cerrar notificación"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    )
                })}
            </div>
        </ToastContext.Provider>
    )
}

export function useToast() {
    const ctx = useContext(ToastContext)
    if (!ctx) {
        throw new Error('useToast must be used within a ToastProvider')
    }
    return ctx
}
