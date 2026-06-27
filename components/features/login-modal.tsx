'use client'

import { useState } from 'react'
import { UserRound, Store, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Modal, ModalHeader } from '@/components/ui/modal'
import { useToast } from '@/components/ui/toast'
import { useAuth, type UserRole } from '@/contexts/auth-context'
import { cn } from '@/lib/utils'

interface LoginModalProps {
    isOpen: boolean
    onClose: () => void
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const { login } = useAuth()
    const { toast } = useToast()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState<UserRole>('user')
    const [error, setError] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        try {
            login(email, password, role)
            toast({
                variant: 'success',
                title: '¡Bienvenido de nuevo!',
                description: 'Has iniciado sesión correctamente.',
            })
            onClose()
            setEmail('')
            setPassword('')
        } catch {
            setError('Credenciales no válidas. Usa los accesos de demo de abajo.')
        }
    }

    const fillDemo = (r: UserRole) => {
        setRole(r)
        setEmail(r === 'user' ? 'user@demo.com' : 'provider@demo.com')
        setPassword('demo123')
        setError('')
    }

    const roles: { value: UserRole; label: string; icon: typeof UserRound }[] = [
        { value: 'user', label: 'Cliente', icon: UserRound },
        { value: 'provider', label: 'Proveedor', icon: Store },
    ]

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="max-w-md">
            <ModalHeader
                title="Iniciar sesión"
                description="Accede para guardar favoritos y reservar."
                onClose={onClose}
            />

            <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-6">
                {/* Role */}
                <div>
                    <label className="mb-2 block text-sm font-semibold text-foreground">
                        Tipo de cuenta
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                        {roles.map(({ value, label, icon: Icon }) => {
                            const active = role === value
                            return (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => setRole(value)}
                                    className={cn(
                                        'flex items-center justify-center gap-2 rounded-xl border-2 px-3 py-3 text-sm font-semibold transition-all',
                                        active
                                            ? 'border-primary-600 bg-primary-50 text-primary-700 dark:bg-primary-950/50 dark:text-primary-300'
                                            : 'border-border text-muted-foreground hover:border-primary-300'
                                    )}
                                >
                                    <Icon className="h-4 w-4" />
                                    {label}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-semibold text-foreground">
                        Email
                    </label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={role === 'user' ? 'user@demo.com' : 'provider@demo.com'}
                        required
                    />
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="password" className="mb-2 block text-sm font-semibold text-foreground">
                        Contraseña
                    </label>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="demo123"
                        required
                    />
                </div>

                {error && (
                    <div className="rounded-xl border border-danger/30 bg-danger-subtle p-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
                        {error}
                    </div>
                )}

                <Button type="submit" size="lg" className="w-full">
                    Iniciar sesión
                </Button>

                {/* Demo credentials */}
                <div className="rounded-xl border border-border bg-muted/60 p-3.5">
                    <p className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                        <Sparkles className="h-3.5 w-3.5 text-primary-600" />
                        Accesos de demostración
                    </p>
                    <div className="mt-2.5 grid grid-cols-2 gap-2">
                        <button
                            type="button"
                            onClick={() => fillDemo('user')}
                            className="rounded-lg border border-border bg-surface px-2.5 py-2 text-left text-xs transition-colors hover:border-primary-300"
                        >
                            <span className="block font-semibold text-foreground">Cliente</span>
                            <span className="block text-muted-foreground">user@demo.com</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => fillDemo('provider')}
                            className="rounded-lg border border-border bg-surface px-2.5 py-2 text-left text-xs transition-colors hover:border-primary-300"
                        >
                            <span className="block font-semibold text-foreground">Proveedor</span>
                            <span className="block text-muted-foreground">provider@demo.com</span>
                        </button>
                    </div>
                </div>
            </form>
        </Modal>
    )
}
