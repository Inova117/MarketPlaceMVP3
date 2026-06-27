import type { Metadata, Viewport } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/auth-context'
import { ThemeProvider } from '@/components/theme-provider'
import { ToastProvider } from '@/components/ui/toast'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})
const outfit = Outfit({
    subsets: ['latin'],
    variable: '--font-outfit',
    display: 'swap',
})

export const metadata: Metadata = {
    title: {
        default: 'Cerca — Encuentra lo mejor cerca de ti',
        template: '%s · Cerca',
    },
    description:
        'Marketplace local con geolocalización: descubre profesionales y negocios verificados cerca de ti, lee reseñas reales y reserva en segundos.',
    keywords: ['marketplace', 'local', 'servicios', 'geolocalización', 'reservas', 'reseñas'],
    authors: [{ name: 'Zerion Studio' }],
    openGraph: {
        title: 'Cerca — Encuentra lo mejor cerca de ti',
        description:
            'Descubre profesionales y negocios verificados cerca de ti. Reseñas reales y reservas en segundos.',
        type: 'website',
        locale: 'es_ES',
    },
}

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#ffffff' },
        { media: '(prefers-color-scheme: dark)', color: '#101019' },
    ],
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="es" suppressHydrationWarning>
            <body className={`${inter.variable} ${outfit.variable} font-sans`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    <AuthProvider>
                        <ToastProvider>{children}</ToastProvider>
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}
