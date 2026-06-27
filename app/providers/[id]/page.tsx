import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ChevronRight } from 'lucide-react'
import { providers } from '@/lib/mock-data/providers'
import { reviewsStore } from '@/lib/mock-data/reviews-store'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { ProviderPageClient } from './provider-page-client'

export function generateStaticParams() {
    return providers.map((provider) => ({ id: provider.id }))
}

export function generateMetadata({
    params,
}: {
    params: { id: string }
}): Metadata {
    const provider = providers.find((p) => p.id === params.id)
    if (!provider) return { title: 'Proveedor no encontrado' }
    return {
        title: provider.name,
        description: provider.description,
    }
}

export default function ProviderPage({ params }: { params: { id: string } }) {
    const provider = providers.find((p) => p.id === params.id)
    if (!provider) notFound()

    const initialReviews = reviewsStore.getByProviderId(provider.id)

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Navbar />

            {/* Breadcrumb */}
            <div className="border-b border-border bg-surface">
                <nav className="container flex items-center gap-1.5 py-3 text-sm text-muted-foreground">
                    <Link href="/" className="transition-colors hover:text-foreground">
                        Inicio
                    </Link>
                    <ChevronRight className="h-3.5 w-3.5" />
                    <span className="transition-colors hover:text-foreground">
                        {provider.category}
                    </span>
                    <ChevronRight className="h-3.5 w-3.5" />
                    <span className="truncate font-medium text-foreground">
                        {provider.name}
                    </span>
                </nav>
            </div>

            <ProviderPageClient provider={provider} initialReviews={initialReviews} />

            <Footer />
        </div>
    )
}
