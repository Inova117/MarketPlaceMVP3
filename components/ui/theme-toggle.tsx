'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

export function ThemeToggle({ className }: { className?: string }) {
    const { resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    const isDark = resolvedTheme === 'dark'

    return (
        <button
            type="button"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={cn(
                'inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-foreground transition-colors hover:bg-muted',
                className
            )}
            aria-label="Cambiar tema"
        >
            {mounted ? (
                isDark ? (
                    <Sun className="h-[18px] w-[18px]" />
                ) : (
                    <Moon className="h-[18px] w-[18px]" />
                )
            ) : (
                <div className="h-[18px] w-[18px]" />
            )}
        </button>
    )
}
