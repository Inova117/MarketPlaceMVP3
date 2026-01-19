import { z } from 'zod'

// Environment variable schema
const envSchema = z.object({
    NEXT_PUBLIC_MAPBOX_TOKEN: z.string().optional(),
    NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
})

// Validate environment variables
export function validateEnv() {
    try {
        return envSchema.parse({
            NEXT_PUBLIC_MAPBOX_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
            NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
            NODE_ENV: process.env.NODE_ENV,
        })
    } catch (error) {
        console.error('❌ Invalid environment variables:', error)
        throw new Error('Invalid environment variables')
    }
}

// Export validated env
export const env = validateEnv()
