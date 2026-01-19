'use client'

import { useState, useEffect, createContext, useContext } from 'react'

export type UserRole = 'user' | 'provider'

export interface User {
    id: string
    name: string
    email: string
    role: UserRole
    providerId?: string // If role is provider
}

interface AuthContextType {
    user: User | null
    isAuthenticated: boolean
    login: (email: string, password: string, role: UserRole) => void
    logout: () => void
    switchRole: (role: UserRole) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const STORAGE_KEY = 'marketplace-auth'

// Mock users for demo
const MOCK_USERS: Record<string, User> = {
    'user@demo.com': {
        id: 'user-1',
        name: 'María López',
        email: 'user@demo.com',
        role: 'user',
    },
    'provider@demo.com': {
        id: 'provider-1',
        name: 'Juan Ramírez',
        email: 'provider@demo.com',
        role: 'provider',
        providerId: '1', // Links to provider in mock data
    },
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)

    // Load user from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY)
            if (stored) {
                setUser(JSON.parse(stored))
            }
        } catch (error) {
            console.error('Error loading auth:', error)
        }
    }, [])

    // Save user to localStorage whenever it changes
    useEffect(() => {
        if (user) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
        } else {
            localStorage.removeItem(STORAGE_KEY)
        }
    }, [user])

    const login = (email: string, _password: string, role: UserRole) => {
        // In real app, validate password
        const mockUser = MOCK_USERS[email]
        if (mockUser && mockUser.role === role) {
            setUser(mockUser)
        } else {
            throw new Error('Invalid credentials')
        }
    }

    const logout = () => {
        setUser(null)
    }

    const switchRole = (role: UserRole) => {
        if (!user) return

        // Switch to the mock user of the requested role
        const newEmail = role === 'user' ? 'user@demo.com' : 'provider@demo.com'
        const newUser = MOCK_USERS[newEmail]
        if (newUser) {
            setUser(newUser)
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                login,
                logout,
                switchRole,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}
