'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth, type UserRole } from '@/contexts/auth-context'

interface LoginModalProps {
    isOpen: boolean
    onClose: () => void
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const { login } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState<UserRole>('user')
    const [error, setError] = useState('')

    if (!isOpen) return null

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        try {
            login(email, password, role)
            onClose()
        } catch (err) {
            setError('Credenciales inválidas. Usa: user@demo.com o provider@demo.com')
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="font-display text-2xl font-bold text-slate-900">
                        Iniciar Sesión
                    </h2>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Role Selection */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Tipo de cuenta
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                type="button"
                                onClick={() => setRole('user')}
                                className={`rounded-lg border-2 p-3 text-sm font-medium transition ${role === 'user'
                                        ? 'border-primary-600 bg-primary-50 text-primary-700'
                                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                                    }`}
                            >
                                👤 Usuario
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole('provider')}
                                className={`rounded-lg border-2 p-3 text-sm font-medium transition ${role === 'provider'
                                        ? 'border-primary-600 bg-primary-50 text-primary-700'
                                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                                    }`}
                            >
                                🏪 Proveedor
                            </button>
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
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
                        <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
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

                    {/* Demo Credentials */}
                    <div className="rounded-lg bg-blue-50 p-3">
                        <p className="text-xs font-medium text-blue-900">Demo Credentials:</p>
                        <p className="mt-1 text-xs text-blue-700">
                            Usuario: user@demo.com / demo123
                        </p>
                        <p className="text-xs text-blue-700">
                            Proveedor: provider@demo.com / demo123
                        </p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="rounded-lg bg-red-50 p-3">
                            <p className="text-sm text-red-800">{error}</p>
                        </div>
                    )}

                    {/* Submit */}
                    <Button type="submit" className="w-full">
                        Iniciar Sesión
                    </Button>
                </form>
            </div>
        </div>
    )
}
