'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import {
    Heart,
    LogIn,
    LogOut,
    LayoutDashboard,
    Repeat,
    ChevronDown,
    Store,
    UserRound,
} from 'lucide-react'
import { Logo } from './logo'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { LoginModal } from '@/components/features/login-modal'
import { useAuth } from '@/contexts/auth-context'
import { useFavorites } from '@/hooks/use-favorites'
import { cn } from '@/lib/utils'

export function Navbar() {
    const { user, isAuthenticated, logout, switchRole } = useAuth()
    const { favorites } = useFavorites()
    const [showLogin, setShowLogin] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function onClick(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false)
            }
        }
        document.addEventListener('mousedown', onClick)
        return () => document.removeEventListener('mousedown', onClick)
    }, [])

    return (
        <>
            <header className="sticky top-0 z-40 border-b border-border/70 glass">
                <div className="container flex h-16 items-center justify-between gap-4">
                    <Logo />

                    <div className="flex items-center gap-2 sm:gap-3">
                        <Link
                            href="/favorites"
                            className="relative inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-surface px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                        >
                            <Heart
                                className={cn(
                                    'h-[18px] w-[18px]',
                                    favorites.size > 0 && 'fill-rose-500 text-rose-500'
                                )}
                            />
                            <span className="hidden sm:inline">Favoritos</span>
                            {favorites.size > 0 && (
                                <span className="grid h-5 min-w-5 place-items-center rounded-full bg-primary-600 px-1 text-[11px] font-bold text-white">
                                    {favorites.size}
                                </span>
                            )}
                        </Link>

                        <ThemeToggle />

                        {isAuthenticated && user ? (
                            <div className="relative" ref={menuRef}>
                                <button
                                    onClick={() => setMenuOpen((v) => !v)}
                                    className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-surface pl-1.5 pr-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                                >
                                    <Avatar name={user.name} size="sm" className="h-7 w-7 text-[11px]" />
                                    <span className="hidden max-w-28 truncate sm:inline">
                                        {user.name.split(' ')[0]}
                                    </span>
                                    <ChevronDown
                                        className={cn(
                                            'h-4 w-4 text-muted-foreground transition-transform',
                                            menuOpen && 'rotate-180'
                                        )}
                                    />
                                </button>

                                {menuOpen && (
                                    <div className="absolute right-0 top-full mt-2 w-64 origin-top-right animate-scale-in overflow-hidden rounded-2xl border border-border bg-surface shadow-lifted">
                                        <div className="flex items-center gap-3 border-b border-border p-4">
                                            <Avatar name={user.name} size="md" />
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-semibold text-foreground">
                                                    {user.name}
                                                </p>
                                                <p className="truncate text-xs text-muted-foreground">
                                                    {user.email}
                                                </p>
                                                <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-primary-600">
                                                    {user.role === 'provider' ? (
                                                        <>
                                                            <Store className="h-3 w-3" /> Proveedor
                                                        </>
                                                    ) : (
                                                        <>
                                                            <UserRound className="h-3 w-3" /> Cliente
                                                        </>
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-1.5">
                                            {user.role === 'provider' && (
                                                <Link
                                                    href="/dashboard/provider"
                                                    onClick={() => setMenuOpen(false)}
                                                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                                                >
                                                    <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
                                                    Mi dashboard
                                                </Link>
                                            )}
                                            <button
                                                onClick={() => {
                                                    switchRole(user.role === 'user' ? 'provider' : 'user')
                                                    setMenuOpen(false)
                                                }}
                                                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                                            >
                                                <Repeat className="h-4 w-4 text-muted-foreground" />
                                                Cambiar a {user.role === 'user' ? 'proveedor' : 'cliente'}
                                            </button>
                                            <button
                                                onClick={() => {
                                                    logout()
                                                    setMenuOpen(false)
                                                }}
                                                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-danger transition-colors hover:bg-danger-subtle dark:hover:bg-red-950/40"
                                            >
                                                <LogOut className="h-4 w-4" />
                                                Cerrar sesión
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Button onClick={() => setShowLogin(true)}>
                                <LogIn className="h-[18px] w-[18px]" />
                                <span className="hidden sm:inline">Iniciar sesión</span>
                            </Button>
                        )}
                    </div>
                </div>
            </header>

            <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
        </>
    )
}
