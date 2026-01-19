'use client'

/**
 * Simple client-side rate limiter using localStorage
 * Prevents spam submissions without requiring a backend
 */

interface RateLimitConfig {
    maxAttempts: number
    windowMs: number
}

const DEFAULT_CONFIG: RateLimitConfig = {
    maxAttempts: 5,
    windowMs: 60000, // 1 minute
}

export class ClientRateLimiter {
    private key: string
    private config: RateLimitConfig

    constructor(key: string, config: Partial<RateLimitConfig> = {}) {
        this.key = `ratelimit_${key}`
        this.config = { ...DEFAULT_CONFIG, ...config }
    }

    private getAttempts(): { count: number; resetAt: number } {
        try {
            const stored = localStorage.getItem(this.key)
            if (!stored) {
                return { count: 0, resetAt: Date.now() + this.config.windowMs }
            }
            return JSON.parse(stored)
        } catch {
            return { count: 0, resetAt: Date.now() + this.config.windowMs }
        }
    }

    private setAttempts(count: number, resetAt: number): void {
        try {
            localStorage.setItem(this.key, JSON.stringify({ count, resetAt }))
        } catch (error) {
            console.error('Rate limiter storage error:', error)
        }
    }

    check(): { allowed: boolean; remaining: number; resetIn: number } {
        const now = Date.now()
        const attempts = this.getAttempts()

        // Reset if window expired
        if (now >= attempts.resetAt) {
            this.setAttempts(0, now + this.config.windowMs)
            return {
                allowed: true,
                remaining: this.config.maxAttempts - 1,
                resetIn: this.config.windowMs,
            }
        }

        // Check if limit exceeded
        if (attempts.count >= this.config.maxAttempts) {
            return {
                allowed: false,
                remaining: 0,
                resetIn: attempts.resetAt - now,
            }
        }

        return {
            allowed: true,
            remaining: this.config.maxAttempts - attempts.count - 1,
            resetIn: attempts.resetAt - now,
        }
    }

    increment(): void {
        const attempts = this.getAttempts()
        this.setAttempts(attempts.count + 1, attempts.resetAt)
    }

    reset(): void {
        try {
            localStorage.removeItem(this.key)
        } catch (error) {
            console.error('Rate limiter reset error:', error)
        }
    }
}

// Pre-configured rate limiters
export const reviewRateLimiter = new ClientRateLimiter('review_submit', {
    maxAttempts: 3,
    windowMs: 300000, // 5 minutes
})
